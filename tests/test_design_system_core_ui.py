"""Canonical registry, Core UI Web adapter and accessibility contracts."""

from __future__ import annotations

import copy
import functools
import importlib.util
import json
import os
import subprocess
import sys
import threading
import unittest
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

try:
    from playwright.sync_api import sync_playwright
except ImportError:  # обычный статический прогон не требует браузера
    sync_playwright = None


ROOT = Path(__file__).resolve().parents[1]
SYSTEM = ROOT / "design" / "design-system"
RUN_E2E = os.environ.get("RUN_BROWSER_E2E") == "1"

REGISTRY_SPEC = importlib.util.spec_from_file_location(
    "reflower_component_registry_validator",
    SYSTEM / "scripts" / "validate_component_registry.py",
)
REGISTRY_VALIDATOR = importlib.util.module_from_spec(REGISTRY_SPEC)
REGISTRY_SPEC.loader.exec_module(REGISTRY_VALIDATOR)


class _QuietStaticHandler(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass


class CoreUILibraryTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.registry = json.loads(
            (SYSTEM / "component-registry.json").read_text(encoding="utf-8")
        )
        cls.by_name = {
            component["name"]: component
            for component in cls.registry["components"]
        }
        cls.catalog = (SYSTEM / "web" / "catalog.html").read_text(encoding="utf-8")
        cls.catalog_react_source = (
            SYSTEM / "site" / "catalog" / "catalog-shell.tsx"
        ).read_text(encoding="utf-8")
        cls.behavior = (SYSTEM / "web" / "core-ui.js").read_text(encoding="utf-8")
        cls.component_css = "\n".join(
            path.read_text(encoding="utf-8")
            for path in sorted((SYSTEM / "web" / "components").glob("*.css"))
        )

    def test_component_registry_validator_passes(self):
        result = subprocess.run(
            [
                sys.executable,
                str(SYSTEM / "scripts" / "validate_component_registry.py"),
            ],
            cwd=ROOT,
            check=False,
            capture_output=True,
            text=True,
        )
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertIn("Component registry: OK", result.stdout)

    def test_component_registry_rejects_broken_contracts(self):
        def errors_after(change):
            document = copy.deepcopy(self.registry)
            entries = {item["name"]: item for item in document["components"]}
            entries["governance"] = document["governance"]
            change(entries)
            errors, _, _ = REGISTRY_VALIDATOR.validate_registry(document)
            return "\n".join(errors)

        cases = {
            "missing card summary": (
                lambda entries: entries["Icon"].pop("summary"),
                "summary",
            ),
            "long card summary": (
                lambda entries: entries["Icon"].update(summary="Т" * 101),
                "summary",
            ),
            "multiline card summary": (
                lambda entries: entries["Icon"].update(summary="Иконка.\nОписание."),
                "summary",
            ),
            "dependency cycle": (
                lambda entries: entries["Text"]["dependencies"].append("Text"),
                "cycle:",
            ),
            "stable without implementation": (
                lambda entries: entries["Button"]["implementation"].update(
                    canonical=[]
                ),
                "stable component требует canonical implementation",
            ),
            "stable without mobile strategy": (
                lambda entries: entries["Button"]["platformDifferences"].pop("ios"),
                "stable component требует стратегии",
            ),
            "stable transitively depending on experimental": (
                lambda entries: entries["Text"]["dependencies"].append("Dialog"),
                "stable component не может зависеть от experimental",
            ),
            "beta without reference implementation": (
                lambda entries: entries["ListItem"]["implementation"].update(
                    canonical=[]
                ),
                "beta component требует canonical reference implementation",
            ),
            "deprecated without replacement": (
                lambda entries: entries["Modal"].update(replacement=None),
                "deprecated требует replacement",
            ),
            "pattern promoted after one screen": (
                lambda entries: (
                    entries["governance"]["patternPromotion"]["evidence"][0].update(
                        seenIn=["Mini App CatalogListingsScreen"],
                        decision="collect-evidence",
                    ),
                ),
                "до второго независимого use case",
            ),
        }
        for name, (change, expected) in cases.items():
            with self.subTest(name=name):
                self.assertIn(expected, errors_after(change))

    def test_registry_governance_is_structured_and_pilot_patterns_are_not_promoted(
        self,
    ):
        self.assertEqual(self.registry["schemaVersion"], 2)
        self.assertEqual(self.registry["registryVersion"], "1.18.0")
        governance = self.registry["governance"]
        self.assertEqual(
            governance["lifecycleOrder"],
            ["experimental", "beta", "stable", "deprecated"],
        )
        self.assertEqual(
            governance["promotionCriteria"]["experimentalToBeta"][
                "minimumIndependentProductionUseCases"
            ],
            1,
        )
        self.assertEqual(
            governance["promotionCriteria"]["betaToStable"][
                "minimumIndependentProductionUseCases"
            ],
            2,
        )
        stable_artifacts = governance["stableArtifacts"]
        self.assertTrue(stable_artifacts["documentation"])
        self.assertTrue(stable_artifacts["catalogs"])
        self.assertTrue(stable_artifacts["contractTests"])
        placement = governance["catalogPlacement"]
        self.assertEqual(placement["componentLevel"], "component")
        self.assertEqual(placement["templateLevel"], "pattern")
        self.assertEqual(placement["templateRoute"], "patterns")
        self.assertEqual(placement["minimumTemplateDependencies"], 2)
        self.assertIn("Templates", placement["templateDefinition"])
        self.assertTrue(
            all(
                len(component["dependencies"])
                >= placement["minimumTemplateDependencies"]
                for component in self.registry["components"]
                if component["level"] == placement["templateLevel"]
            )
        )

        evidence = {
            entry["candidate"]: entry
            for entry in governance["patternPromotion"]["evidence"]
        }
        self.assertEqual(
            set(evidence),
            {
                "FilterBar",
                "CardList",
                "StandaloneFormLayout",
                "FullscreenSettingsFlow",
            },
        )
        self.assertEqual(len(evidence["FilterBar"]["seenIn"]), 2)
        self.assertEqual(evidence["FilterBar"]["decision"], "pattern-review")
        self.assertEqual(self.by_name["FilterBar"]["status"], "beta")
        self.assertEqual(len(evidence["CardList"]["seenIn"]), 1)
        self.assertEqual(evidence["CardList"]["decision"], "collect-evidence")
        self.assertEqual(self.by_name["CardList"]["status"], "experimental")
        for candidate in ("StandaloneFormLayout", "FullscreenSettingsFlow"):
            self.assertIsNone(evidence[candidate]["registryEntry"])
            self.assertEqual(evidence[candidate]["decision"], "feature-composition")
            self.assertNotIn(candidate, self.by_name)

    def test_registry_rejects_weakened_governance_and_missing_stable_evidence(self):
        def errors_after(change):
            document = copy.deepcopy(self.registry)
            change(document)
            errors, _, _ = REGISTRY_VALIDATOR.validate_registry(document)
            return "\n".join(errors)

        cases = {
            "schema downgrade": (
                lambda document: document.update(schemaVersion=1),
                "поддерживается только schemaVersion = 2",
            ),
            "unknown root field": (
                lambda document: document.update(unreviewed=True),
                "неизвестные поля: ['unreviewed']",
            ),
            "weaken beta to stable": (
                lambda document: document["governance"]["promotionCriteria"][
                    "betaToStable"
                ].update(minimumIndependentProductionUseCases=1),
                "критерий нельзя ослаблять",
            ),
            "weaken pattern review": (
                lambda document: document["governance"]["patternPromotion"].update(
                    minimumIndependentProductionUseCases=1
                ),
                "pattern review требует ровно два",
            ),
            "misroute templates": (
                lambda document: document["governance"]["catalogPlacement"].update(
                    templateRoute="components"
                ),
                "ожидалось 'patterns'",
            ),
            "template without composition": (
                lambda document: next(
                    component
                    for component in document["components"]
                    if component["level"] == "pattern"
                ).update(dependencies=["Button"]),
                "Template должен собирать минимум два",
            ),
            "pattern review before second screen": (
                lambda document: document["governance"]["patternPromotion"][
                    "evidence"
                ][0].update(
                    seenIn=["Mini App CatalogListingsScreen"],
                    decision="pattern-review",
                ),
                "pattern-review запрещён до второго",
            ),
            "malformed pattern link": (
                lambda document: document["governance"]["patternPromotion"][
                    "evidence"
                ][0].update(registryEntry=[]),
                "ожидалось PascalCase имя или null",
            ),
            "stable documentation missing": (
                lambda document: document["governance"]["stableArtifacts"].update(
                    documentation=[]
                ),
                "stable component не упомянут в canonical documentation",
            ),
            "stable catalog evidence missing": (
                lambda document: document["governance"]["stableArtifacts"].update(
                    catalogs=[]
                ),
                "stable component не представлен canonical symbol в catalog",
            ),
            "stable contract tests missing": (
                lambda document: document["governance"]["stableArtifacts"].update(
                    contractTests=[]
                ),
                "stable component не связан с именем и canonical symbol",
            ),
        }
        for name, (change, expected) in cases.items():
            with self.subTest(name=name):
                self.assertIn(expected, errors_after(change))

    def test_stable_core_v1_is_explicit_and_complex_behavior_is_not_stable(self):
        stable = {
            name
            for name, component in self.by_name.items()
            if component["status"] == "stable"
        }
        self.assertEqual(
            stable,
            {
                "Radio",
                "Button",
                "Icon",
                "IconButton",
                "TextField",
                "Switch",
                "Checkbox",
                "Chip",
                "Tab",
                "Tabs",
                "Badge",
                "Alert",
                "SegmentedControl",
                "Skeleton",
                "EmptyState",
                "Dropdown",
                "TabBar",
                "NavigationBar",
            },
        )
        for name in ("Toast", "Dialog", "BottomSheet"):
            self.assertNotEqual(self.by_name[name]["status"], "stable", name)

    def test_canonical_terminology_has_deprecated_replacements(self):
        self.assertNotIn("Input", self.by_name)
        self.assertEqual(self.by_name["Modal"]["status"], "deprecated")
        self.assertEqual(self.by_name["Modal"]["replacement"], "Dialog")
        for canonical in (
            "TextField",
            "Chip",
            "Toast",
            "Spinner",
            "ListItem",
        ):
            self.assertIn(canonical, self.by_name)


    def test_range_is_not_an_input_variant(self):
        slider_entry = self.by_name["Slider"]
        self.assertEqual(slider_entry["level"], "component")
        self.assertEqual(slider_entry["category"], "control")
        self.assertEqual(slider_entry["status"], "beta")
        self.assertIsNone(slider_entry["replacement"])
        self.assertNotIn("Slider", self.by_name["TextField"]["variants"])
        self.assertIn("native-range-semantics", slider_entry["accessibility"])
        self.assertIn("Number TextField", slider_entry["purpose"])

    def test_stable_components_define_web_and_mobile_contracts(self):
        for name, component in self.by_name.items():
            if component["status"] != "stable":
                continue
            with self.subTest(component=name):
                differences = component["platformDifferences"]
                self.assertIn("web", differences)
                self.assertIn("ios", differences)
                self.assertIn("android", differences)
                self.assertTrue(component["accessibility"])
                self.assertTrue(component["implementation"]["canonical"])

    def test_text_and_search_fields_keep_focus_and_autofill_purpose_explicit(self):
        text_field = self.by_name["TextField"]
        self.assertNotIn("SearchField", self.by_name)
        self.assertIn("search", text_field["variants"])
        search_source = (SYSTEM / "examples/text-field/search.html").read_text()

        self.assertIn("no-core-owned-initial-focus", text_field["accessibility"])
        self.assertIn(
            "autocomplete-purpose-matches-field-purpose",
            text_field["accessibility"],
        )
        self.assertIn(
            "non-auth-autofill-opt-out-preserves-auth-purposes",
            text_field["accessibility"],
        )
        self.assertIn('type="search"', search_source)
        self.assertIn('autocomplete="off"', search_source)
        self.assertNotIn("autofocus", search_source)
        self.assertIn("one-time-code", text_field["platformDifferences"]["web"])
        self.assertIn('data-rf-autofill="off"', search_source)
        self.assertNotIn("autofocus", self.catalog)

    def test_public_css_entrypoint_loads_all_core_groups(self):
        entrypoint = (SYSTEM / "web" / "components.css").read_text(encoding="utf-8")
        for group in (
            "actions",
            "forms",
            "content",
            "navigation",
            "feedback",
            "overlays",
            "disclosure",
            "patterns",
        ):
            self.assertIn(f'components/{group}.css', entrypoint)

    def test_icon_primitive_has_four_token_sizes_and_predictable_svg_container(self):
        primitives = (SYSTEM / "web" / "primitives.css").read_text(encoding="utf-8")
        icons = (ROOT / "design" / "icons" / "icons.js").read_text(encoding="utf-8")
        icon = self.by_name["Icon"]

        self.assertEqual(icon["sizes"], ["xs", "sm", "md", "lg"])
        self.assertEqual(icon["variants"], ["brand", "primary", "secondary", "tertiary", "danger", "success"])
        self.assertEqual(icon["styles"], ["line", "solid", "duotone"])
        self.assertIn("flex:0 0 auto", primitives)
        self.assertIn("line-height:var(--rf-spacing-0)", primitives)
        self.assertIn("vertical-align:middle", primitives)
        self.assertIn(".rf-icon>svg{display:block;width:100%;height:100%", primitives)
        for size in ("xs", "sm", "md", "lg"):
            self.assertIn(f".rf-icon--{size}", primitives)
        self.assertNotIn(".rf-icon--xl", primitives)
        self.assertIn("stroke: 'currentColor'", icons)
        self.assertIn("preserveAspectRatio: 'xMidYMid meet'", icons)
        self.assertIn("focusable: 'false'", icons)
        self.assertIn("host.setAttribute('aria-hidden', 'true')", icons)
        for name in ("shopping-bag-filled", "mail-filled", "circle-user-filled"):
            self.assertIn(f"'{name}':", icons)

    def test_field_icon_slots_use_control_tokens_and_one_trailing_owner(self):
        forms = (SYSTEM / "web" / "components" / "forms.css").read_text(encoding="utf-8")
        actions = (SYSTEM / "web" / "components" / "actions.css").read_text(encoding="utf-8")

        self.assertIn(".rf-text-field__trailing-icon", forms)
        self.assertIn(".rf-text-field__action", forms)
        self.assertIn("width:var(--rf-spacing-24);height:var(--rf-spacing-24)", forms)
        self.assertIn(".rf-text-field--with-trailing-icon", forms)
        self.assertNotIn(".rf-text-field__actions", forms)
        self.assertNotIn(".rf-text-field--with-actions", forms)
        self.assertNotIn("var(--rf-control-height-compact) * 2", forms)
        self.assertIn(
            ".rf-icon-button>.rf-icon,.rf-icon-button>.rf-button__content>.rf-icon{width:var(--rf-spacing-16)",
            actions,
        )


    def test_stable_reference_api_is_present(self):
        for symbol in (
            ".rf-button",
            ".rf-icon-button",
            ".rf-text-field-group",
            ".rf-text-field",
            ".rf-card",
            ".rf-badge",
            ".rf-alert",
            ".rf-segmented-control",
            ".rf-skeleton",
            ".rf-empty-state",
            ".rf-navigation-bar",
            ".rf-navigation-bar__item",
        ):
            self.assertIn(symbol, self.component_css)

    def test_stable_navigation_bar_covers_variants_states_and_accessibility(self):
        navigation = (SYSTEM / "web" / "components" / "navigation.css").read_text(
            encoding="utf-8"
        )
        component = self.by_name["TabBar"]

        self.assertEqual(component["status"], "stable")
        self.assertEqual(component["variants"], ["bottom"])
        self.assertEqual(self.by_name["NavigationBar"]["variants"], ["top"])
        for symbol in (
            ".rf-navigation-bar--top",
            ".rf-navigation-bar--bottom",
            '.rf-navigation-bar__item[aria-current="page"]',
            '.rf-navigation-bar__item[aria-disabled="true"]',
            ".rf-navigation-bar__item[hidden]",
            ".rf-navigation-bar__item:focus-visible",
            "var(--rf-spacing-44)",
            "env(safe-area-inset-bottom)",
        ):
            self.assertIn(symbol, navigation)
        self.assertEqual(component["level"], "component")
        self.assertNotIn("NavigationBar", component["synonyms"])
        for variant in ("bottom",):
            example = (SYSTEM / "examples/tab-bar" / f"{variant}.html").read_text()
            self.assertIn(f'class="rf-navigation-bar rf-navigation-bar--{variant}"', example)
            self.assertEqual(example.count('aria-current="page"'), 1)
            self.assertIn('data-i18n-aria-label="nav.label"', example)

    def test_aspect_ratio_direct_image_fills_the_reserved_slot(self):
        primitives = (SYSTEM / "web" / "primitives.css").read_text(encoding="utf-8")
        self.assertIn(
            ".rf-aspect-ratio>.rf-image{position:absolute;"
            "inset:var(--rf-spacing-0)}",
            primitives,
        )
        self.assertIn(".rf-image{display:block;width:100%;height:100%;object-fit:cover}", primitives)
        self.assertIn(".rf-image--contain{object-fit:contain}", primitives)

    def test_feedback_states_honor_the_native_hidden_attribute(self):
        patterns = (SYSTEM / "web" / "components" / "patterns.css").read_text(
            encoding="utf-8"
        )
        self.assertIn(
            ".rf-state[hidden],.rf-empty-state[hidden],"
            ".rf-error-state[hidden]{display:none}",
            patterns,
        )
        for name in ("EmptyState", "ErrorState"):
            self.assertIn("hidden", self.by_name[name]["states"])

    def test_illustrated_error_state_has_spot_media_and_tight_copy(self):
        patterns = (SYSTEM / "web" / "components" / "patterns.css").read_text(
            encoding="utf-8"
        )
        self.assertIn(
            ".rf-error-state--illustrated{gap:var(--rf-spacing-4)}",
            patterns,
        )
        self.assertIn(
            "width:var(--rf-spacing-128);height:var(--rf-spacing-128)",
            patterns,
        )
        error_state = self.by_name["ErrorState"]
        self.assertIn("illustrated", error_state["variants"])
        self.assertIn("spot128", error_state["sizes"])
        self.assertIn("Image", error_state["dependencies"])

    def test_segmented_control_selected_state_uses_brand_role(self):
        components = json.loads(
            (SYSTEM / "tokens" / "components.json").read_text(encoding="utf-8")
        )
        segmented = components["component"]["segmentedControl"]
        self.assertEqual(
            segmented["selectedBackground"]["$value"],
            "{color.context.background.brand.default}",
        )
        self.assertEqual(
            segmented["selectedText"]["$value"],
            "{color.context.text.inverse.default}",
        )
        self.assertEqual(
            segmented["background"]["$value"],
            "{color.context.background.primary.default}",
        )

    def test_chip_default_background_uses_primary_context_role(self):
        components = json.loads(
            (SYSTEM / "tokens" / "components.json").read_text(encoding="utf-8")
        )
        chip = components["component"]["chip"]
        self.assertEqual(
            chip["background"]["$value"],
            "{color.context.background.primary.default}",
        )
        self.assertEqual(
            chip["selectedBackground"]["$value"],
            "{color.context.background.brand.default}",
        )

    def test_navigation_bar_uses_primary_and_brand_background_roles(self):
        components = json.loads(
            (SYSTEM / "tokens" / "components.json").read_text(encoding="utf-8")
        )
        navigation = components["component"]["navigation"]
        self.assertEqual(
            navigation["containerBackground"]["$value"],
            "{color.context.background.primary.default}",
        )
        self.assertEqual(
            navigation["selectedBackground"]["$value"],
            "{color.context.background.brand.default}",
        )
        self.assertEqual(
            navigation["selectedText"]["$value"],
            "{color.context.text.inverse.default}",
        )

    def test_text_field_floating_label_tokens_are_component_owned(self):
        components = json.loads(
            (SYSTEM / "tokens" / "components.json").read_text(encoding="utf-8")
        )
        text_field = components["component"]["textField"]
        self.assertEqual(
            text_field["labelRestTextStyle"]["$value"],
            "{typography.style.body.s}",
        )
        self.assertEqual(
            text_field["labelFloatTextStyle"]["$value"],
            "{typography.style.body.xs}",
        )
        self.assertEqual(
            text_field["labelError"]["$value"],
            "{color.context.text.error}",
        )
        for token in (
            "labelInsetBlock",
            "contentPaddingBlockStart",
            "contentPaddingBlockEnd",
        ):
            self.assertEqual(text_field[token]["$type"], "dimension")
        self.assertEqual(
            text_field["size"]["sm"]["paddingInline"]["$value"],
            "{spacing.16}",
        )
        self.assertEqual(text_field["radius"]["$value"], "{radius.2xl}")

    def test_segmented_control_options_fill_equal_widths(self):
        forms = (SYSTEM / "web" / "components" / "forms.css").read_text(
            encoding="utf-8"
        )
        self.assertIn(
            ".rf-segmented-control__item{position:relative;display:flex;"
            "flex:1 1 0;min-width:0}",
            forms,
        )
        self.assertIn(
            ".rf-segmented-control__label{width:100%;min-height:",
            forms,
        )
        self.assertIn(".rf-segmented-control__count{min-width:", forms)
        self.assertIn(
            "padding:var(--rf-spacing-0) "
            "var(--rf-segmented-control-count-padding-inline)",
            forms,
        )
        self.assertIn(
            ".rf-segmented-control__input:checked+.rf-segmented-control__label "
            ".rf-segmented-control__count{background:",
            forms,
        )

    def test_compact_webview_controls_preserve_touch_and_input_contracts(self):
        actions = (SYSTEM / "web" / "components" / "actions.css").read_text(
            encoding="utf-8"
        )
        content = (SYSTEM / "web" / "components" / "content.css").read_text(
            encoding="utf-8"
        )
        forms = (SYSTEM / "web" / "components" / "forms.css").read_text(
            encoding="utf-8"
        )
        self.assertIn("@media(pointer:coarse)", actions)
        self.assertIn(".rf-button--s,.rf-icon-button--s", actions)
        self.assertNotIn(".rf-button--icon-only", actions)
        self.assertIn("var(--rf-spacing-44)", actions)
        self.assertIn('@media(pointer:coarse){.rf-chip{position:relative}.rf-chip::before', content)
        self.assertIn('min-height:var(--rf-spacing-44);height:100%;transform:translateY(-50%)', content)
        for size, height in [('lg', 40), ('md', 32), ('sm', 24)]:
            self.assertIn(f'.rf-chip--{size}{{min-height:var(--rf-spacing-{height})', content)
        self.assertIn(
            ".rf-segmented-control__label{min-height:"
            "var(--rf-spacing-44)}",
            forms,
        )
        self.assertIn("var(--rf-typography-body-medium-font-size)", forms)
        self.assertIn(
            "var(--rf-selection-control-switch-width) - "
            "var(--rf-selection-control-switch-thumb)",
            forms,
        )

    def test_list_item_slots_center_icons_inside_assigned_containers(self):
        content = (SYSTEM / "web" / "components" / "content.css").read_text(
            encoding="utf-8"
        )
        self.assertIn(
            ".rf-list-item__leading,.rf-list-item__trailing{display:flex;"
            "flex:0 0 auto;align-items:center;justify-content:center}",
            content,
        )

    def test_stable_interactive_controls_expose_visible_focus_without_feature_css(self):
        actions = (SYSTEM / "web" / "components" / "actions.css").read_text(
            encoding="utf-8"
        )
        content = (SYSTEM / "web" / "components" / "content.css").read_text(
            encoding="utf-8"
        )
        forms = (SYSTEM / "web" / "components" / "forms.css").read_text(
            encoding="utf-8"
        )
        self.assertIn(
            ".rf-button:focus-visible,.rf-icon-button:focus-visible",
            actions,
        )
        self.assertIn("var(--rf-button-focus-ring)", actions)
        self.assertIn("var(--rf-color-context-border-brand-default)", (SYSTEM / "web" / "primitives.css").read_text())
        self.assertIn(".rf-text-field:focus-visible", forms)
        self.assertIn(".rf-card--interactive:focus-visible", content)
        self.assertIn(
            ".rf-text-field__action{position:absolute;inset-block:var(--rf-spacing-0)",
            forms,
        )

    def test_catalog_covers_core_anatomy_states_and_accessibility(self):
        for contract in (
            'data-loading="true"',
            'aria-busy="true"',
            'aria-invalid="true"',
            "readonly",
            "disabled",
            'aria-disabled="true"',
            'role="switch"',
            'role="tablist"',
            'role="tabpanel"',
            'aria-selected="true"',
            'aria-haspopup="menu"',
            'role="menu"',
            'aria-current="page"',
            'aria-live="polite"',
            'role="status"',
            '<dialog class="rf-dialog"',
            '<details class="rf-accordion__item">',
            'class="rf-empty-state"',
            'class="rf-error-state rf-error-state--illustrated"',
        ):
            self.assertIn(contract, self.catalog)
        self.assertNotIn("<svg", self.catalog)
        self.assertNotIn("<svg", self.catalog_react_source)

    def test_web_behavior_has_required_keyboard_and_focus_paths(self):
        for contract in (
            'event.key === "ArrowRight"',
            'event.key === "ArrowLeft"',
            'event.key === "Home"',
            'event.key === "End"',
            'event.key === "Escape"',
            "showModal()",
            "opener.focus()",
            "document.getElementById(panelId)",
            "event.stopImmediatePropagation()",
            '["click", "auxclick", "keydown"]',
            "blockDisabledAction, true",
            'event.key === "Tab"',
            "setItemFocus",
            "initializeTabs(document)",
            "initializeTabs(node)",
            "tabsInitialized",
            'addEventListener("focusout"',
            "close(true)",
            'aria-disabled="true"',
            'aria-selected',
            'aria-expanded',
        ):
            self.assertIn(contract, self.behavior)
        self.assertNotIn('querySelector("#" + tab.getAttribute', self.behavior)

    def test_disabled_and_inverse_feedback_states_are_unambiguous(self):
        forms = (SYSTEM / "web" / "components" / "forms.css").read_text(
            encoding="utf-8"
        )
        feedback = (SYSTEM / "web" / "components" / "feedback.css").read_text(
            encoding="utf-8"
        )
        self.assertIn(
            ":disabled{border-color:var(--rf-color-context-border-primary-disabled)",
            forms,
        )
        self.assertIn("[readonly]:not(:disabled)", forms)
        self.assertIn(".rf-toast__close{", feedback)
        self.assertIn("background:transparent;color:inherit;cursor:pointer", feedback)
        self.assertIn(".rf-toast__close:focus-visible{", feedback)
        self.assertNotIn(".rf-toast .rf-icon-button", feedback)

    def test_filter_bar_has_canonical_layout_and_catalog_contract(self):
        patterns = (SYSTEM / "web" / "components" / "patterns.css").read_text(
            encoding="utf-8"
        )
        catalog = (SYSTEM / "web" / "catalog.js").read_text(encoding="utf-8")
        entry = self.by_name["FilterBar"]

        self.assertEqual(entry["status"], "beta")
        self.assertTrue(entry["implementation"]["canonical"])
        for selector in (
            ".rf-filter-bar{",
            ".rf-filter-bar__controls{",
            ".rf-filter-bar__group{",
            ".rf-filter-bar__active{",
            ".rf-filter-bar__meta{",
            '.rf-filter-bar[aria-busy="true"]',
        ):
            self.assertIn(selector, patterns)
        self.assertIn(
            ".rf-filter-bar{min-width:0;display:flex;flex-direction:column;"
            "gap:var(--rf-spacing-8)",
            patterns,
        )
        self.assertIn(
            ".rf-filter-bar--stacked .rf-filter-bar__group--grow{flex-basis:auto}",
            patterns,
        )
        self.assertIn("entry.name === 'FilterBar'", catalog)
        self.assertIn('data-playground="filter-bar"', catalog)
        self.assertIn("Inline / filtered", catalog)
        self.assertIn("Stacked / loading", catalog)
        self.assertIn("Collapsible", catalog)
        content = (SYSTEM / "web" / "components" / "content.css").read_text(
            encoding="utf-8"
        )
        self.assertIn('.rf-chip[aria-current="page"]', content)
        self.assertIn(".rf-chip:focus-visible", content)

    @unittest.skipUnless(
        RUN_E2E and sync_playwright,
        "Нужны RUN_BROWSER_E2E=1 и Playwright",
    )
    def test_browser_core_ui_interactions_and_forced_colors(self):
        handler = functools.partial(_QuietStaticHandler, directory=str(ROOT))
        server = ThreadingHTTPServer(("127.0.0.1", 0), handler)
        server_thread = threading.Thread(target=server.serve_forever, daemon=True)
        server_thread.start()
        catalog_url = (
            f"http://127.0.0.1:{server.server_port}/"
            "design/design-system/web/catalog.html"
        )

        try:
            with sync_playwright() as playwright:
                browser = playwright.chromium.launch()
                try:
                    page = browser.new_page()
                    page.goto(
                        catalog_url + "#guidelines/specimens",
                        wait_until="networkidle",
                    )

                    loading_button = page.locator(
                        '.rf-button[data-loading="true"]'
                    ).first
                    loading_button.evaluate(
                        """button => {
                            window.loadingTargetCalls = 0;
                            const recordCall = () => { window.loadingTargetCalls += 1; };
                            button.addEventListener("click", recordCall);
                            button.addEventListener("keydown", recordCall);
                        }"""
                    )
                    loading_button.dispatch_event("click")
                    loading_button.focus()
                    page.keyboard.press("Enter")
                    page.keyboard.press("Space")
                    self.assertEqual(page.evaluate("window.loadingTargetCalls"), 0)

                    active_tab = page.locator("#tab-active")
                    archive_tab = page.locator("#tab-archive")
                    active_tab.focus()
                    page.keyboard.press("ArrowDown")
                    self.assertEqual(
                        page.evaluate("document.activeElement.id"), "tab-active"
                    )
                    self.assertEqual(active_tab.get_attribute("aria-selected"), "true")
                    self.assertEqual(
                        archive_tab.get_attribute("aria-selected"), "false"
                    )

                    page.keyboard.press("ArrowRight")
                    self.assertEqual(
                        page.evaluate("document.activeElement.id"), "tab-archive"
                    )
                    self.assertEqual(active_tab.get_attribute("aria-selected"), "false")
                    self.assertEqual(
                        archive_tab.get_attribute("aria-selected"), "true"
                    )
                    page.keyboard.press("Tab")
                    self.assertEqual(
                        page.evaluate("document.activeElement.id"), "panel-archive"
                    )
                    self.assertEqual(
                        page.locator("#panel-archive").get_attribute("tabindex"), "0"
                    )

                    disabled_choice = page.locator(
                        ".rf-choice:has(.rf-choice__input:disabled)"
                    ).first
                    disabled_switch = page.locator(
                        ".rf-switch:has(.rf-switch__input:disabled)"
                    ).first
                    self.assertEqual(
                        disabled_choice.evaluate(
                            "element => getComputedStyle(element).cursor"
                        ),
                        "not-allowed",
                    )
                    self.assertEqual(
                        disabled_switch.evaluate(
                            "element => getComputedStyle(element).cursor"
                        ),
                        "not-allowed",
                    )

                    default_segment = page.locator(
                        ".rf-segmented-control:not(.rf-segmented-control--sm) "
                        ".rf-segmented-control__label"
                    ).first
                    small_segment = page.locator(
                        ".rf-segmented-control--sm .rf-segmented-control__label"
                    ).first
                    default_box = default_segment.bounding_box()
                    small_box = small_segment.bounding_box()
                    self.assertIsNotNone(default_box)
                    self.assertIsNotNone(small_box)
                    self.assertGreater(default_box["height"], small_box["height"])

                    hidden_state_displays = page.evaluate(
                        """() => Object.fromEntries(['rf-state', 'rf-empty-state', 'rf-error-state'].map(className => {
                                const element = document.createElement('div');
                                element.className = className;
                                element.hidden = true;
                                document.body.append(element);
                                const hidden = getComputedStyle(element).display;
                                element.hidden = false;
                                const shown = getComputedStyle(element).display;
                                element.remove();
                                return [className, {hidden, shown}];
                            }))"""
                    )
                    self.assertEqual(hidden_state_displays, {
                        "rf-state": {"hidden": "none", "shown": "flex"},
                        "rf-empty-state": {"hidden": "none", "shown": "flex"},
                        "rf-error-state": {"hidden": "none", "shown": "flex"},
                    })

                    forced_context = browser.new_context(forced_colors="active")
                    try:
                        forced_page = forced_context.new_page()
                        forced_page.goto(
                            catalog_url + "#guidelines/specimens",
                            wait_until="networkidle",
                        )

                        def style_fingerprint(selector):
                            return forced_page.locator(selector).first.evaluate(
                                """element => {
                                    const style = getComputedStyle(element);
                                    return {
                                        color: style.color,
                                        backgroundColor: style.backgroundColor,
                                        borderTop: style.borderTop,
                                        borderRight: style.borderRight,
                                        borderBottom: style.borderBottom,
                                        borderLeft: style.borderLeft,
                                        outline: style.outline,
                                        opacity: style.opacity,
                                        textDecoration: style.textDecorationLine,
                                    };
                                }"""
                            )

                        segmented_states = (
                            style_fingerprint(
                                ".rf-segmented-control__input:checked + "
                                ".rf-segmented-control__label"
                            ),
                            style_fingerprint(
                                ".rf-segmented-control__input:not(:checked):not(:disabled) + "
                                ".rf-segmented-control__label"
                            ),
                            style_fingerprint(
                                ".rf-segmented-control__input:disabled + "
                                ".rf-segmented-control__label"
                            ),
                        )
                        self.assertEqual(
                            len(
                                {
                                    json.dumps(state, sort_keys=True)
                                    for state in segmented_states
                                }
                            ),
                            3,
                        )
                        self.assertNotEqual(
                            style_fingerprint('.rf-tab[aria-selected="true"]'),
                            style_fingerprint('.rf-tab[aria-selected="false"]'),
                        )
                    finally:
                        forced_context.close()
                finally:
                    browser.close()
        finally:
            server.shutdown()
            server.server_close()
            server_thread.join(timeout=5)

    def test_inventory_contains_real_audit_and_migration_map(self):
        inventory = (
            ROOT / "docs" / "design-system" / "COMPONENT_INVENTORY.md"
        ).read_text(encoding="utf-8")
        for section in (
            "Каноническая терминология",
            "Выбранный стабильный Core UI v1",
            "Current → canonical migration map",
            "Отложено в Core UI v2",
            "Что намеренно не создаётся",
        ):
            self.assertIn(section, inventory)

        def first_column(section):
            return {
                line.split("|")[1].strip()
                for line in section.splitlines()
                if line.startswith("| ")
                and not line.startswith("| ---")
                and not line.startswith("| Canonical")
            }

        component_section = inventory.split(
            "## Полный component registry", 1
        )[1].split("## Product and platform pattern registry", 1)[0]
        component_names = {
            entry["name"]
            for entry in self.registry["components"]
            if entry["level"] == "component"
        }
        self.assertEqual(first_column(component_section), component_names)

        primitive_section = inventory.split("## Core UI v1: primitives", 1)[1].split(
            "## Выбранный стабильный Core UI v1", 1
        )[0]
        primitive_names = {
            entry["name"]
            for entry in self.registry["components"]
            if entry["level"] == "primitive" and entry["status"] != "deprecated"
        }
        self.assertEqual(first_column(primitive_section), primitive_names)

        pattern_section = inventory.split(
            "## Product and platform pattern registry", 1
        )[1].split("## Отложено в Core UI v2", 1)[0]
        pattern_names = {
            entry["name"]
            for entry in self.registry["components"]
            if entry["level"] == "pattern"
        }
        self.assertTrue(pattern_names <= first_column(pattern_section))


if __name__ == "__main__":
    unittest.main()
