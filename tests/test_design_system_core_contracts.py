"""Behavior contracts for the framework-independent Core UI Web adapter."""

from __future__ import annotations

import functools
import json
import os
import re
import threading
import unittest
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

try:
    from playwright.sync_api import sync_playwright
except ImportError:  # static contract checks do not require a browser
    sync_playwright = None


ROOT = Path(__file__).resolve().parents[1]
SYSTEM = ROOT / "design" / "design-system"
RUN_E2E = os.environ.get("RUN_BROWSER_E2E") == "1"


class _QuietStaticHandler(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass


class CoreUIStaticContractTests(unittest.TestCase):
    def test_breadcrumbs_beta_contract_is_semantic_and_token_owned(self):
        registry = json.loads((SYSTEM / "component-registry.json").read_text())
        breadcrumbs = next(
            item for item in registry["components"] if item["name"] == "Breadcrumbs"
        )
        self.assertEqual(breadcrumbs["status"], "beta")
        self.assertEqual(breadcrumbs["category"], "navigation")
        self.assertEqual(breadcrumbs["variants"], ["default", "supporting"])
        self.assertEqual(breadcrumbs["sizes"], ["sm", "md"])
        self.assertIn("current-page-on-content", breadcrumbs["accessibility"])
        for selector in (
            ".rf-breadcrumbs{",
            ".rf-breadcrumbs__list{",
            ".rf-breadcrumbs__link",
            ".rf-breadcrumbs__separator",
            ".rf-breadcrumbs__current",
            ".rf-breadcrumbs--supporting",
            ".rf-breadcrumbs--sm",
        ):
            self.assertIn(selector, self.navigation)
        self.assertIn("var(--rf-breadcrumbs-text-current)", self.navigation)
        self.assertIn("var(--rf-breadcrumbs-separator)", self.navigation)

    def test_checkbox_stable_contract(self):
        registry = json.loads((SYSTEM / 'component-registry.json').read_text())
        checkbox = next(item for item in registry['components'] if item['name'] == 'Checkbox')
        self.assertEqual(checkbox['status'], 'stable')
        self.assertEqual(checkbox['platforms'], ['web'])
        self.assertEqual(checkbox['states'], ['unchecked', 'checked', 'indeterminate', 'default', 'hover', 'pressed', 'focused', 'disabled', 'skeleton'])
        self.assertIn('.rf-choice:has(>.rf-choice__control){min-width:var(--rf-spacing-44)', self.forms)
        self.assertIn('accessible-name-required', checkbox['accessibility'])

    @classmethod
    def setUpClass(cls):
        cls.actions = (
            SYSTEM / "web" / "components" / "actions.css"
        ).read_text(encoding="utf-8")
        cls.forms = (
            SYSTEM / "web" / "components" / "forms.css"
        ).read_text(encoding="utf-8")
        cls.content = (
            SYSTEM / "web" / "components" / "content.css"
        ).read_text(encoding="utf-8")
        cls.navigation = (
            SYSTEM / "web" / "components" / "navigation.css"
        ).read_text(encoding="utf-8")
        cls.overlays = (
            SYSTEM / "web" / "components" / "overlays.css"
        ).read_text(encoding="utf-8")
        cls.patterns = (
            SYSTEM / "web" / "components" / "patterns.css"
        ).read_text(encoding="utf-8")
        cls.primitives = (SYSTEM / "web" / "primitives.css").read_text(
            encoding="utf-8"
        )
        cls.behavior = (SYSTEM / "web" / "core-ui.js").read_text(
            encoding="utf-8"
        )
        cls.catalog = (SYSTEM / "web" / "catalog.html").read_text(
            encoding="utf-8"
        )
        cls.catalog_js = (SYSTEM / "web" / "catalog.js").read_text(
            encoding="utf-8"
        )

    def test_bottom_sheet_uses_32px_top_radius_token(self):
        rule = self.overlays.split(".rf-bottom-sheet{", 1)[1].split("}", 1)[0]
        self.assertIn("border-start-start-radius:var(--rf-radius-3xl)", rule)
        self.assertIn("border-start-end-radius:var(--rf-radius-3xl)", rule)
        self.assertIn("border-end-start-radius:var(--rf-radius-none)", rule)
        self.assertIn("border-end-end-radius:var(--rf-radius-none)", rule)
        self.assertIn(
            "background:var(--rf-color-context-background-canvas)", rule
        )

    def test_bottom_sheet_owns_shared_detail_and_action_anatomy(self):
        for selector in (
            ".rf-bottom-sheet-backdrop{",
            ".rf-bottom-sheet__grip{",
            ".rf-bottom-sheet__header{",
            ".rf-bottom-sheet__title{",
            ".rf-bottom-sheet__scroll{",
            ".rf-bottom-sheet__body{",
            ".rf-bottom-sheet__footer{",
            ".rf-bottom-sheet__actions{",
            ".rf-bottom-sheet__hint{",
        ):
            self.assertIn(selector, self.overlays)
        self.assertIn(
            ".rf-bottom-sheet__header>.rf-icon-button{flex:none}", self.overlays
        )
        backdrop_rule = self.overlays.split(
            ".rf-bottom-sheet-backdrop{", 1
        )[1].split("}", 1)[0]
        self.assertIn("position:fixed", backdrop_rule)
        self.assertIn("z-index:var(--rf-z-index-modal)", backdrop_rule)
        self.assertIn(
            "background:var(--rf-color-context-overlay-backdrop)", backdrop_rule
        )
        surface_rule = self.overlays.split(".rf-bottom-sheet{", 1)[1].split("}", 1)[0]
        self.assertIn("position:fixed", surface_rule)
        self.assertIn("display:none", surface_rule)
        self.assertIn("box-shadow:var(--rf-elevation-overlay)", surface_rule)
        footer_rule = self.overlays.split(
            ".rf-bottom-sheet__footer{", 1
        )[1].split("}", 1)[0]
        self.assertIn("position:relative", footer_rule)
        self.assertIn("z-index:var(--rf-z-index-sticky)", footer_rule)
        self.assertIn('class="rf-bottom-sheet__grip" aria-hidden="true"', self.catalog)
        self.assertIn('class="rf-bottom-sheet__header"', self.catalog)
        self.assertIn('class="rf-bottom-sheet__footer"', self.catalog)
        self.assertIn('aria-describedby="sheet-description"', self.catalog)

    def test_feature_card_content_is_top_aligned(self):
        root = self.content.split(".rf-feature-card{", 1)[1].split("}", 1)[0]
        rule = self.content.split(".rf-feature-card__content{", 1)[1].split("}", 1)[0]
        title = self.content.split(".rf-feature-card__title{", 1)[1].split("}", 1)[0]
        description = self.content.split(".rf-feature-card__description{", 1)[1].split("}", 1)[0]
        self.assertIn("color:var(--rf-color-context-text-primary-default)", root)
        self.assertIn("align-self:start", rule)
        self.assertIn("font-size:var(--rf-typography-style-title-xl-font-size)", title)
        self.assertIn("line-height:var(--rf-typography-style-title-xl-line-height)", title)
        self.assertIn("overflow-wrap:break-word", title)
        self.assertIn("word-break:normal", title)
        self.assertIn("font-size:var(--rf-typography-style-body-s-font-size)", description)
        self.assertIn("color:var(--rf-color-context-text-secondary-default)", description)
        self.assertIn("overflow-wrap:break-word", description)
        self.assertIn("word-break:normal", description)
        self.assertIn("renderBannerEntity(item)", self.catalog_js)
        self.assertIn("rf-banner__title", self.catalog_js)
        self.assertIn("bannerPreview", self.catalog_js)

    def test_avatar_large_fallback_scales_with_public_typography(self):
        lg = self.content.split(".rf-avatar--lg{", 1)[1].split("}", 1)[0]
        xl = self.content.split(".rf-avatar--xl{", 1)[1].split("}", 1)[0]
        self.assertIn(
            "font-size:var(--rf-typography-style-headline-xs-font-size)", lg
        )
        self.assertIn(
            "font-size:var(--rf-typography-style-headline-s-font-size)", xl
        )
        self.assertIn('id="visual-avatar"', self.catalog)
        for size in ("xs", "sm", "lg", "xl"):
            self.assertIn(f"rf-avatar--{size}", self.catalog)

    def test_image_owns_centered_error_geometry_and_loading_slot(self):
        root = self.content.split("\n.rf-media-fallback{", 1)[1].split("}", 1)[0]
        icon = self.content.split("\n.rf-media-fallback__icon{", 1)[1].split("}", 1)[0]
        compact = self.content.split(
            ".rf-media-fallback--compact{", 1
        )[1].split("}", 1)[0]
        self.assertIn("position:absolute", root)
        self.assertIn("inset:var(--rf-spacing-0)", root)
        self.assertIn("align-items:center", root)
        self.assertIn("justify-content:center", root)
        self.assertIn(
            "background:var(--rf-color-context-background-secondary-default)", root
        )
        self.assertIn("border-radius:var(--rf-radius-full)", icon)
        self.assertIn("padding:var(--rf-spacing-8)", compact)
        self.assertIn(".rf-media-fallback[hidden]{display:none}", self.content)
        self.assertIn("function renderImageEntity(item)", self.catalog_js)
        self.assertIn('role="img" aria-label="${fallbackLabel}"', self.catalog_js)
        self.assertIn("rf-skeleton rf-skeleton--fill", self.catalog_js)
        self.assertIn('.rf-image-frame[data-state="loading"]', self.content)

    def test_attribute_card_replaced_by_filled_list_item(self):
        self.assertNotIn(".rf-attribute-card", self.content)
        self.assertIn('.rf-list-item--rich[data-surface="filled"]', self.content)

    def test_non_button_content_uses_public_headline_typography(self):
        for selector, scale in (
            (".rf-list-item__title{", "xs"),
        ):
            rule = self.content.split(selector, 1)[1].split("}", 1)[0]
            self.assertIn(
                f"font-family:var(--rf-typography-style-headline-{scale}-font-family)",
                rule,
            )
            self.assertIn(
                f"font-size:var(--rf-typography-style-headline-{scale}-font-size)",
                rule,
            )
            self.assertNotIn("typography-style-button", rule)

        component_root = ROOT / "design" / "design-system" / "web" / "components"
        for stylesheet in component_root.glob("*.css"):
            if stylesheet.name == "actions.css":
                continue
            source = stylesheet.read_text(encoding="utf-8")
            self.assertNotIn(
                "var(--rf-typography-style-button-",
                source,
                f"{stylesheet.name} не должен использовать Button typography вне Button-компонентов",
            )

        description = self.content.split(
            ".rf-list-item__description{", 1
        )[1].split("}", 1)[0]
        self.assertIn(
            "font-size:var(--rf-typography-style-body-s-font-size)",
            description,
        )

    def test_card_list_preserves_column_width_for_incomplete_rows(self):
        grid_rule = self.patterns.split(".rf-card-list--grid{", 1)[1].split(
            "}", 1
        )[0]
        compact_rule = self.patterns.split(
            ".rf-card-list--compact-grid{", 1
        )[1].split("}", 1)[0]
        self.assertIn("repeat(auto-fill", grid_rule)
        self.assertNotIn("auto-fit", grid_rule)
        self.assertIn("var(--rf-spacing-248)", grid_rule)
        self.assertIn("grid-template-columns:repeat(2,minmax(0,1fr))", compact_rule)
        self.assertNotIn("auto-fill", compact_rule)
        self.assertNotIn("auto-fit", compact_rule)

    def test_segmented_control_owns_required_single_selection(self):
        for contract in (
            '"[data-rf-segmented-control],.rf-segmented-control"',
            "function syncSegmentedControl(root)",
            "selected[0] || available[0]",
            "setSegmentedSelection(root, selected[0] || available[0])",
            'option.setAttribute("aria-pressed", active ? "true" : "false")',
            'if (option.checked !== active) option.checked = active',
            "initializeSegmentedControls(document)",
            'attributeFilter: ["aria-disabled", "aria-pressed", "checked", "disabled"]',
        ):
            self.assertIn(contract, self.behavior)

    def test_range_is_a_separate_accessible_component(self):
        for contract in (
            ".rf-slider{",
            ".rf-slider-field__header",
            ".rf-slider-field__value",
            "--rf-slider-progress",
            ".rf-slider:not(:disabled):active",
        ):
            self.assertIn(contract, self.forms)
        for contract in (
            "function syncSlider(input)",
            'input.rf-slider[type=range]',
            'input.style.setProperty("--rf-slider-progress"',
            'root.querySelector("[data-rf-slider-output]")',
            "initializeSliders(document)",
        ):
            self.assertIn(contract, self.behavior)
        self.assertIn("if (entry.name === 'Slider')", self.catalog_js)
        self.assertIn('data-playground="slider"', self.catalog_js)
        self.assertIn("Точное число вводится через Number TextField", self.catalog_js)

    def test_button_loading_has_one_public_intent_and_core_owned_derivations(self):
        loading_example = re.search(
            r'<button class="rf-button rf-button--primary"[^>]*data-loading="true"[^>]*>',
            self.catalog,
        )
        self.assertIsNotNone(loading_example)
        example_tag = loading_example.group(0)
        self.assertNotIn("aria-busy", example_tag)
        self.assertNotIn("aria-disabled", example_tag)
        self.assertNotIn(" disabled", example_tag)

        for contract in (
            'action.getAttribute("data-loading") === "true"',
            'action.setAttribute("aria-busy", "true")',
            'action.setAttribute("aria-disabled", "true")',
            'if ("disabled" in action) action.disabled = true',
            'spinner.setAttribute("aria-hidden", "true")',
            'spinner.className = "rf-button__spinner"',
            'attributeFilter: ["data-loading", "data-skeleton"]',
            "loadingSnapshots.delete(action)",
        ):
            self.assertIn(contract, self.behavior)
        self.assertIn(
            '.rf-button[data-loading="true"]>.rf-button__content',
            self.actions,
        )
        self.assertIn("opacity:0", self.actions)
        self.assertIn("position:absolute", self.actions)

    def test_button_optional_subtitle_reuses_base_typography_and_keeps_label_name(self):
        self.assertIn(".rf-button__copy{", self.actions)
        self.assertIn(".rf-button__label,.rf-button__subtitle{", self.actions)
        self.assertIn(
            "font-family:var(--rf-button-subtitle-text-style-font-family)",
            self.actions,
        )
        self.assertIn('class="rf-button__subtitle"', self.catalog_js)
        self.assertNotIn('class="rf-button__subtitle" aria-hidden="true"', self.catalog_js)
        self.assertIn('name="subtitleEnabled" checked', self.catalog_js)
        self.assertIn("subtitle.hidden = !data.has('subtitleEnabled')", self.catalog_js)

    def test_button_optional_icons_are_independent_decorative_24px_slots(self):
        self.assertIn("iconSwitch('startIcon', 'Показать Start icon')", self.catalog_js)
        self.assertIn("iconSwitch('endIcon', 'Показать End icon')", self.catalog_js)
        self.assertIn('data-playground-start-icon aria-hidden="true" hidden', self.catalog_js)
        self.assertIn('data-playground-end-icon aria-hidden="true" hidden', self.catalog_js)
        self.assertIn(".hidden = !data.has('startIcon')", self.catalog_js)
        self.assertIn(".hidden = !data.has('endIcon')", self.catalog_js)
        self.assertIn(
            ".rf-button>.rf-icon,.rf-button__content>.rf-icon{width:var(--rf-spacing-24);height:var(--rf-spacing-24);flex-shrink:0}",
            self.actions,
        )

    def test_button_variants_have_flat_description_and_source_tabs(self):
        self.assertIn(
            "const buttonExamples = model.codeExamples.components.Button.variants",
            self.catalog_js,
        )
        self.assertIn('class="catalog-button-examples', self.catalog_js)
        self.assertIn('data-button-variant-example="${escapeAttribute(variant)}"', self.catalog_js)
        self.assertIn('>Описание</button>', self.catalog_js)
        self.assertNotIn('>Код</button>', self.catalog_js)
        self.assertIn(
            "const exampleTargetKey = target => `${target.platforms.join('-')}-${target.adapter}-${target.language}`",
            self.catalog_js,
        )
        self.assertIn(
            "const exampleTargetLabel = target => target.targetLabel",
            self.catalog_js,
        )
        self.assertNotIn("catalog-button-example__platform-tabs", self.catalog_js)
        self.assertNotIn("catalog-button-example__language-tabs", self.catalog_js)
        self.assertIn('class="rf-tab-panel catalog-button-example__code-panel"', self.catalog_js)
        self.assertIn('data-copy-code-target="${escapeAttribute(sourceId)}"', self.catalog_js)
        self.assertIn("navigator.clipboard.writeText(source)", self.catalog_js)
        self.assertIn('class="catalog-button-example__code"', self.catalog_js)
        self.assertIn("const iconButtonExamples = model.codeExamples.components.IconButton.variants", self.catalog_js)
        self.assertIn('data-playground="icon-button"', self.catalog_js)
        self.assertIn('data-icon-button-variant-example="${escapeAttribute(variant)}"', self.catalog_js)

    def test_button_and_icon_register_the_real_react_web_adapter(self):
        registry = json.loads(
            (SYSTEM / "component-registry.json").read_text(encoding="utf-8")
        )
        entries = {entry["name"]: entry for entry in registry["components"]}
        button_sources = entries["Button"]["implementation"]["canonical"]
        icon_sources = entries["Icon"]["implementation"]["canonical"]
        icon_button_sources = entries["IconButton"]["implementation"]["canonical"]

        self.assertIn(
            {
                "platform": "web",
                "file": "design/design-system/adapters/react/src/Button.tsx",
                "symbols": ["Button", "ButtonProps", "ButtonVariant", "ButtonSize"],
            },
            button_sources,
        )
        self.assertIn(
            {
                "platform": "web",
                "file": "design/design-system/adapters/react/src/Icon.tsx",
                "symbols": ["Icon", "IconProps"],
            },
            icon_sources,
        )
        self.assertIn(
            {
                "platform": "web",
                "file": "design/design-system/adapters/react/src/IconButton.tsx",
                "symbols": [
                    "IconButton", "IconButtonProps", "IconButtonVariant", "IconButtonSize"
                ],
            },
            icon_button_sources,
        )
        self.assertFalse(
            any(
                source["platform"] in {"ios", "android"}
                or "react-native" in source["file"].lower()
                for source in button_sources + icon_sources + icon_button_sources
            )
        )

    def test_button_state_priority_and_pointer_hover_are_explicit(self):
        self.assertIn("@media(hover:hover) and (pointer:fine)", self.actions)
        for state in (
            ':not(:disabled)',
            ':not([aria-disabled="true"])',
            ':not([data-loading="true"])',
        ):
            self.assertIn(state, self.actions)
        self.assertNotIn(".rf-button--icon-only", self.actions)

    def test_button_icon_slots_use_the_system_icon_contract(self):
        self.assertIn(
            ".rf-button>.rf-icon,.rf-button__content>.rf-icon",
            self.actions,
        )
        self.assertIn("width:var(--rf-spacing-24)", self.actions)
        self.assertIn("height:var(--rf-spacing-24)", self.actions)
        self.assertIn("gap:var(--rf-spacing-8)", self.actions)
        self.assertIn("color:currentColor", self.primitives)
        self.assertIn(".rf-icon>svg{display:block;width:100%;height:100%", self.primitives)
        for icon_name in ('checkmark', 'right-arrow', 'trash-can'):
            self.assertIn(f'data-rf-icon-glyph="{icon_name}"', self.catalog)

    def test_floating_field_derives_label_state_from_native_controls(self):
        for contract in (
            ".rf-text-field__control:has(>.rf-text-field__label)",
            ".rf-text-field-group:has(>.rf-text-field__control>.rf-text-field,",
            ".rf-text-field__control:focus-within>.rf-text-field__label",
            ".rf-text-field:not(:placeholder-shown)",
            ".rf-text-field--multiline:not(:placeholder-shown)",
            ".rf-text-field:-webkit-autofill",
            ':has(>[aria-invalid="true"])>.rf-text-field__label',
            ":has(>:disabled)>.rf-text-field__label",
            "var(--rf-text-field-label-float-text-style-font-size)",
            "var(--rf-text-field-content-padding-block-start)",
            "@media(hover:hover) and (pointer:fine)",
        ):
            self.assertIn(contract, self.forms)
        self.assertNotIn("isFocused", self.forms)
        self.assertNotIn("hasText", self.forms)

        for contract in (
            "function initializeFloatingFields(scope)",
            'child.matches(".rf-text-field,.rf-text-field--multiline,.rf-select,.rf-select-trigger")',
            'field.setAttribute("placeholder", " ")',
            'field.setAttribute("data-rf-floating-placeholder", "")',
            "initializeFloatingFields(document)",
        ):
            self.assertIn(contract, self.behavior)

    def test_catalog_documents_floating_field_content_and_state_matrix(self):
        for contract in (
            "Empty + label / focus",
            "TextField / Multiline state matrix",
            "Placeholder without label",
            "Value without label",
            "Disabled + value",
            "Error / error + focus",
            "Multiline",
            'class="rf-text-field__control"',
            'aria-invalid="true"',
            'aria-describedby="price-error"',
            '${label}</label></span>${message}</div>',
        ):
            self.assertIn(contract, self.catalog + self.catalog_js)

    def test_password_is_one_text_field_composition_with_core_behavior(self):
        for contract in (
            "function passwordFieldFor(toggle)",
            "function togglePasswordVisibility(toggle)",
            'field.type = field.type === "password" ? "text" : "password"',
            'var iconName = visible ? "eye-off" : "eye"',
            'icon.getAttribute("data-rf-icon-glyph") !== iconName',
            'toggle.setAttribute("aria-pressed", visible ? "true" : "false")',
            'toggle.setAttribute("aria-controls", field.id)',
            'field.focus({ preventScroll: true })',
            "field.setSelectionRange(selectionStart, selectionEnd",
            "var disabled = field.disabled",
            "if (toggle.disabled !== disabled) toggle.disabled = disabled",
            '"[data-rf-password-toggle]"',
        ):
            self.assertIn(contract, self.behavior)
        for contract in (
            'type="text" name="username" autocomplete="username"',
            'type="email" name="email" autocomplete="email"',
            'type="tel" name="phone" autocomplete="tel" inputmode="tel" required',
            'type="number" name="quantity" inputmode="decimal" min="1" step="1"',
            'type="password" name="password" autocomplete="${autocomplete}"',
            "passwordInput('state-current-password', 'current-password')",
            "passwordInput('state-new-password', 'new-password', true)",
            "data-rf-password-toggle",
            'data-rf-icon-glyph="eye"',
        ):
            self.assertIn(contract, self.catalog_js)
        for forbidden in ("LoginInput", "EmailInput", "PhoneInput", "PasswordInput"):
            self.assertNotIn(forbidden, self.behavior)
            self.assertNotIn(forbidden, self.catalog_js)

    def test_non_auth_autofill_opt_out_is_explicit_and_preserves_auth_purposes(self):
        for contract in (
            'function applyAutofillPolicy(field)',
            'input[data-rf-autofill="off"],textarea[data-rf-autofill="off"]',
            'field.setAttribute("autocomplete", "off")',
            'field.setAttribute("data-lpignore", "true")',
            'field.setAttribute("data-1p-ignore", "")',
            'field.setAttribute("data-bwignore", "")',
            'field.setAttribute("data-form-type", "other")',
            'field.matches(\'input[type="password"]\')',
            '["username", "current-password", "new-password", "one-time-code"]',
            'initializeAutofillPolicy(document)',
        ):
            self.assertIn(contract, self.behavior)
        for contract in (
            '[data-rf-autofill="off"]::-webkit-contacts-auto-fill-button',
            '[data-rf-autofill="off"]::-webkit-credentials-auto-fill-button',
            'display:none!important',
            'pointer-events:none',
        ):
            self.assertIn(contract, self.forms)
        self.assertIn('autocomplete="off" data-rf-autofill="off"', self.catalog)
        self.assertIn('autocomplete="off" data-rf-autofill="off"', self.catalog_js)

    def test_text_field_leading_icon_and_clear_action_reuse_field_slots(self):
        for contract in (
            ".rf-text-field__icon,.rf-text-field__trailing-icon",
            ".rf-text-field--with-icon",
            ".rf-text-field--with-action",
            'function clearInputValue(action)',
            '"[data-rf-input-clear]"',
            'field.dispatchEvent(new Event("input", { bubbles: true }))',
            'field.dispatchEvent(new Event("change", { bubbles: true }))',
            'field.focus({ preventScroll: true })',
            'var disabled = field.disabled || field.readOnly',
            'if (action.disabled !== disabled) action.disabled = disabled',
            'control.matches(":focus-within")',
            'field.addEventListener("blur"',
            'action.addEventListener("focus"',
            'action.addEventListener("blur"',
        ):
            self.assertIn(contract, self.forms + self.behavior)
        for contract in (
            "Leading + clear",
            'data-rf-icon-glyph="search"',
            'data-rf-input-clear',
            'data-rf-icon-glyph="close"',
            'aria-label="Очистить поиск"',
        ):
            self.assertIn(contract, self.catalog_js)

    def test_date_picker_and_dropdown_reuse_field_and_own_native_or_listbox_behavior(self):
        for contract in (
            ".rf-date-picker::-webkit-calendar-picker-indicator",
            ".rf-date-picker[data-rf-has-value]",
            "function initializeDatePickers(scope)",
            "typeof field.showPicker",
            "trigger.disabled = field.disabled",
            "function initializeSelects(scope)",
            'trigger.setAttribute("aria-haspopup", "listbox")',
            'option.closest(\'[role="listbox"]\').setAttribute("aria-activedescendant", option.id)',
            'event.key === "Escape"',
            'event.key === "Tab"',
            'event.key === "ArrowDown"',
            'event.key === "ArrowUp"',
            'event.key === "Enter"',
            "function positionSelect(root, parts)",
            'parts.listbox.style.transform = "translateX(0px)"',
            "menuRect.right > window.innerWidth - inset",
            'root.setAttribute("data-rf-placement", "top")',
            'window.addEventListener("scroll", repositionOpenSelects, true)',
            'selectHas(root, "multiple")',
            'aria-multiselectable',
            'function filterSelectOptions(root, parts, query)',
            '[data-rf-dropdown-search]',
            'selectOptionAttribute(option, "submenu-target")',
            'event.key === "ArrowRight"',
            'event.key === "ArrowLeft"',
            "function prepareSelectOptions(root)",
            "function syncSelectFromInput(root)",
        ):
            self.assertIn(contract, self.forms + self.behavior)
        for contract in (
            "Selection / anchored / content-fit",
            "Actions / ListItem / open",
            "Selection / grouped",
            "Selection / multiple",
            "Selection / searchable",
            "Selection / cascade / nested submenu",
            "Selection / loading",
            "Focus / native picker",
            "Selection / empty",
            "rf-dropdown__item--destructive",
            'aria-disabled="true"',
            'data-rf-icon-glyph="calendar"',
        ):
            self.assertIn(contract, self.catalog_js)

    def test_number_field_keeps_native_semantics_without_unstable_browser_spinners(self):
        for contract in (
            '.rf-text-field[type="number"]{appearance:textfield}',
            '.rf-text-field[type="number"]::-webkit-inner-spin-button',
            '.rf-text-field[type="number"]::-webkit-outer-spin-button',
            '-webkit-appearance:none',
        ):
            self.assertIn(contract, self.forms)
        self.assertIn(
            'type="number" name="quantity" inputmode="decimal" min="1" step="1"',
            self.catalog_js,
        )

    def test_dropdown_preserves_mode_semantics_and_list_item_anatomy(self):
        for contract in (
            ".rf-dropdown__item[aria-disabled=\"true\"],.rf-dropdown__item:disabled",
            ".rf-dropdown__item--destructive",
            ".rf-dropdown__divider",
            ".rf-dropdown__item.rf-list-item",
            "function initializeDropdowns(scope)",
            "function initializeMenus(scope)",
            "function positionMenu(anchor, trigger, menu)",
            ".rf-dropdown--viewport>.rf-dropdown__panel",
            "width:var(--rf-spacing-248);min-width:0",
            ".rf-dropdown--anchored>.rf-dropdown__panel",
            "min-width:100%",
            "inset-block:calc(100% + var(--rf-spacing-8)) auto",
            'item.getAttribute("aria-disabled") !== "true"',
            "Selection / anchored / content-fit",
            "Actions / ListItem / open",
            "Actions / viewport / tablet compact",
            "@media(pointer:coarse) and (max-width:767px)",
            "Добавить в отложенное",
            'role="option"',
            'role="menuitem"',
        ):
            self.assertIn(contract, self.forms + self.behavior + self.catalog_js + (SYSTEM / "web" / "components" / "dropdown.css").read_text(encoding="utf-8"))

    def test_field_state_priority_is_disabled_then_error_then_focus_then_hover(self):
        disabled_rule = self.forms.split(
            ".rf-text-field:disabled,.rf-text-field--multiline:disabled,.rf-select:disabled,.rf-select-trigger:disabled{",
            1,
        )[1].split("}", 1)[0]
        self.assertIn("background:var(--rf-text-field-background-disabled)", disabled_rule)
        self.assertIn("outline:none", disabled_rule)
        hover_rule = self.forms.split(
            '@media(hover:hover) and (pointer:fine){', 1
        )[1].split("}", 1)[0]
        self.assertIn(':not(:disabled):not([aria-invalid="true"])', hover_rule)
        self.assertIn(
            '.rf-select-trigger[aria-invalid="true"]:focus-visible', self.forms
        )
        error_focus_rule = self.forms.split(
            '.rf-select-trigger[aria-invalid="true"]:focus-visible{', 1
        )[1].split("}", 1)[0]
        self.assertIn("outline:var(--rf-border-width-medium)", error_focus_rule)
        self.assertIn("outline-offset:var(--rf-spacing-0)", error_focus_rule)
        self.assertIn("box-shadow:none", error_focus_rule)


    def test_focus_visible_matrix_is_component_owned_and_semantic(self):
        selectors = {
            "Button": (self.actions, ".rf-button:focus-visible", "medium"),
            "IconButton": (self.actions, ".rf-icon-button:focus-visible", "medium"),
            "Link": (self.primitives, ".rf-link:focus-visible", "medium"),
            "Select": (self.forms, ".rf-select:focus-visible", "medium"),
            "Checkbox/Radio": (self.forms, ".rf-choice__input:focus-visible", "medium"),
            "Switch": (self.forms, ".rf-switch__input:focus-visible", "medium"),
            "Slider": (self.forms, ".rf-slider:focus-visible", "medium"),
            "SegmentedControl": (
                self.forms,
                ".rf-segmented-control__input:focus-visible",
                "medium",
            ),
            "Card": (self.content, ".rf-card--interactive:focus-visible", "medium"),
            "ListItem": (self.content, ".rf-list-item--interactive:focus-visible", "medium"),
            "Tab": (self.navigation, ".rf-tab:focus-visible", "medium"),
            "Breadcrumbs": (
                self.navigation,
                ".rf-breadcrumbs__link:focus-visible",
                "medium",
            ),
            "MenuItem": (self.navigation, ".rf-menu-item:focus-visible", "medium"),
        }
        for component, (stylesheet, selector, width) in selectors.items():
            with self.subTest(component=component):
                self.assertIn(selector, stylesheet)
                matching_rules = re.findall(
                    re.escape(selector) + r"[^{}]*\{([^{}]*)\}",
                    stylesheet,
                )
                focus_rules = [
                    rule
                    for rule in matching_rules
                    if f"--rf-border-width-{width}" in rule
                ]
                self.assertTrue(focus_rules, selector)
                self.assertRegex(
                    "\n".join(focus_rules),
                    r"--rf-(?:button-focus-ring|text-field-border-focus|"
                    r"slider-focus-ring|color-context-border-brand-default)",
                )

        self.assertIn('.rf-text-field:focus-visible{outline:var(--rf-border-width-none) none;box-shadow:none}', self.forms)
        self.assertIn('.rf-text-field:focus,', self.forms)
        for stylesheet in (self.actions, self.forms, self.content, self.navigation):
            self.assertNotIn(
                "outline-offset:var(--rf-border-width-heavy)", stylesheet
            )

        # button.focus.offset is a color halo token, never a length.
        self.assertNotIn("outline-offset:var(--rf-button-focus-offset)", self.actions)
        button_focus_rule = self.actions.split(
            '.rf-button:focus-visible,.rf-icon-button:focus-visible,'
            '.rf-button[data-preview-state="focused"],'
            '.rf-icon-button[data-preview-state="focused"]{',
            1,
        )[1].split("}", 1)[0]
        self.assertIn("outline-offset:var(--rf-spacing-0)", button_focus_rule)
        self.assertIn("box-shadow:none", button_focus_rule)
        self.assertIn(
            "@media(forced-colors:active){.rf-button:focus-visible,.rf-icon-button:focus-visible{outline-color:Highlight}}",
            self.actions,
        )

    def test_field_trailing_action_is_anchored_to_the_control_box(self):
        action_rule = self.forms.split(".rf-text-field__action{", 1)[1].split("}", 1)[0]
        for declaration in (
            "position:absolute",
            "inset-block:var(--rf-spacing-0)",
            "inset-inline-end:var(--rf-spacing-4)",
            "display:flex",
            "align-items:center",
        ):
            self.assertIn(declaration, action_rule)
        control_rule = self.forms.split(".rf-text-field__control", 1)[1].split("}", 1)[0]
        self.assertIn("position:relative", control_rule)

    def test_safe_area_and_product_spacing_are_separate_primitives(self):
        container_rule = self.primitives.split(".rf-container{", 1)[1].split(
            "}", 1
        )[0]
        safe_area_rule = self.primitives.split(".rf-safe-area{", 1)[1].split(
            "}", 1
        )[0]
        self.assertIn("--rf-spacing-16", container_rule)
        self.assertNotIn("safe-area-inset", container_rule)
        self.assertIn("safe-area-inset-top", safe_area_rule)
        self.assertIn("safe-area-inset-right", safe_area_rule)
        self.assertIn("safe-area-inset-bottom", safe_area_rule)
        self.assertIn("safe-area-inset-left", safe_area_rule)
        self.assertNotIn("--rf-spacing-16", safe_area_rule)

    def test_public_typography_styles_have_canonical_and_legacy_css_selectors(self):
        canonical = {
            "display": ("xl", "l", "m", "s"),
            "title": ("xl", "l", "m", "s"),
            "headline": ("xl", "l", "m", "s", "xs", "xxs"),
            "body": ("xl", "l", "m", "s", "xs", "xxs"),
        }
        self.assertEqual(sum(len(sizes) for sizes in canonical.values()), 20)
        for group, sizes in canonical.items():
            for size in sizes:
                with self.subTest(group=group, size=size):
                    selector = f".rf-text--{group}-{size}"
                    selector_start = self.primitives.index(selector)
                    rule_start = self.primitives.index("{", selector_start)
                    rule = self.primitives[rule_start + 1 :].split("}", 1)[0]
                    for property_name in (
                        "font-family",
                        "font-size",
                        "font-weight",
                        "letter-spacing",
                        "line-height",
                    ):
                        self.assertIn(
                            f"{property_name}:var(--rf-typography-style-"
                            f"{group}-{size}-{property_name})",
                            rule,
                        )

        for removed_group in ("button", "input", "chip"):
            self.assertNotIn(f".rf-text--{removed_group}-", self.primitives)

        for selector in (
            ".rf-text--display-large{",
            ".rf-text--display-medium{",
            ".rf-text--heading-h1{",
            ".rf-text--heading-h2{",
            ".rf-text--heading-h3{",
            ".rf-text--headline-large{",
            ".rf-text--headline-medium{",
            ".rf-text--headline-small{",
            ".rf-text--body-large{",
            ".rf-text--body-medium{",
            ".rf-text--body-small{",
            ".rf-text--label-large{",
            ".rf-text--label-medium{",
            ".rf-text--label-small,",
            ".rf-text--code-medium{",
            ".rf-text--code-small{",
        ):
            with self.subTest(legacy_selector=selector):
                self.assertIn(selector, self.primitives)

    def test_component_css_consumes_component_owned_size_and_style_tokens(self):
        button_rules = {
            "m": self.actions.split(".rf-button,.rf-icon-button{", 1)[1].split(
                "}", 1
            )[0],
            "s": self.actions.split(
                ".rf-button--s,.rf-icon-button--s{", 1
            )[1].split("}", 1)[0],
            "l": self.actions.split(
                ".rf-button--l,.rf-icon-button--l{", 1
            )[1].split("}", 1)[0],
        }
        for size, rule in button_rules.items():
            with self.subTest(component="button", size=size):
                for prop in (
                    "font-family",
                    "font-size",
                    "font-weight",
                    "letter-spacing",
                    "line-height",
                ):
                    self.assertIn(
                        f"var(--rf-button-size-{size}-text-style-{prop})",
                        rule,
                    )
                self.assertNotIn("--rf-typography-", rule)

        badge_rules = {
            "md": self.content.split(".rf-badge{", 1)[1].split("}", 1)[0],
            "sm": self.content.split(".rf-badge--sm{", 1)[1].split("}", 1)[0],
        }
        for size, rule in badge_rules.items():
            with self.subTest(component="badge", size=size):
                self.assertIn(
                    f"var(--rf-badge-size-{size}-min-height)",
                    rule,
                )
                self.assertIn(
                    f"var(--rf-badge-size-{size}-padding-inline)",
                    rule,
                )
                for prop in (
                    "font-family",
                    "font-size",
                    "font-weight",
                    "letter-spacing",
                    "line-height",
                ):
                    self.assertIn(
                        f"var(--rf-badge-size-{size}-text-style-{prop})",
                        rule,
                    )
                self.assertNotIn("--rf-icon-size-", rule)
                self.assertNotIn("--rf-typography-", rule)

        self.assertIn(
            "color:var(--rf-button-secondary-text-pressed)",
            self.actions,
        )

    def test_existing_component_tokens_are_not_bypassed_in_core_css(self):
        overlays = (
            SYSTEM / "web" / "components" / "overlays.css"
        ).read_text(encoding="utf-8")
        for selector in (".rf-dialog__header", ".rf-dialog__footer"):
            rules = re.findall(re.escape(selector) + r"\{([^{}]*)\}", overlays)
            with self.subTest(selector=selector):
                self.assertTrue(
                    any("var(--rf-dialog-border)" in rule for rule in rules),
                    rules,
                )
                self.assertFalse(
                    any(
                        "--rf-color-context-border-secondary-default" in rule
                        for rule in rules
                    ),
                    rules,
                )

        focus_rule = self.forms.split(
            ".rf-text-field:focus,", 1
        )[1].split("}", 1)[0]
        self.assertIn("var(--rf-text-field-border-focus)", focus_rule)
        self.assertNotIn("--rf-color-context-border-brand-default", focus_rule)


@unittest.skipUnless(
    RUN_E2E and sync_playwright,
    "RUN_BROWSER_E2E=1 and Playwright are required",
)
class CoreUIBrowserContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        handler = functools.partial(_QuietStaticHandler, directory=str(ROOT))
        cls.server = ThreadingHTTPServer(("127.0.0.1", 0), handler)
        cls.server_thread = threading.Thread(
            target=cls.server.serve_forever,
            daemon=True,
        )
        cls.server_thread.start()
        cls.playwright = sync_playwright().start()
        cls.browser = cls.playwright.chromium.launch()
        cls.catalog_url = (
            f"http://127.0.0.1:{cls.server.server_port}/"
            "design/design-system/web/catalog.html"
        )

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.playwright.stop()
        cls.server.shutdown()
        cls.server.server_close()
        cls.server_thread.join(timeout=5)

    def open_catalog(self):
        page = self.browser.new_page()
        page.goto(self.catalog_url, wait_until="networkidle")
        self.addCleanup(page.close)
        return page

    def open_touch_catalog(self, width, height):
        context = self.browser.new_context(
            viewport={"width": width, "height": height},
            has_touch=True,
            is_mobile=True,
        )
        self.addCleanup(context.close)
        page = context.new_page()
        page.goto(self.catalog_url, wait_until="networkidle")
        return page

    def test_alert_soft_dismissal_cancellation_and_skeleton(self):
        page = self.open_touch_catalog(390, 844)
        page.goto(self.catalog_url + "?alertTab=alert#components/alert")
        output = page.locator('[data-alert-output]')
        close = output.get_by_role("button", name="Закрыть сообщение")
        page.evaluate("document.addEventListener('rf:alert-dismiss', e => e.preventDefault(), {once:true})")
        close.click()
        self.assertTrue(output.locator('.rf-alert').is_visible())
        close.click()
        self.assertTrue(output.locator('.rf-alert').is_hidden())
        page.get_by_role("button", name="State", exact=True).click()
        page.get_by_role("option", name="Skeleton", exact=True).click()
        self.assertIsNotNone(output.locator('.rf-alert').get_attribute('inert'))
        self.assertEqual(output.locator('.rf-alert').get_attribute('aria-busy'), 'true')
        page.get_by_role("button", name="State", exact=True).click()
        page.get_by_role("option", name="Default", exact=True).click()
        title = page.get_by_role("switch", name="Показать Title", exact=True)
        title.uncheck()
        self.assertEqual(output.locator('.rf-alert__title').count(), 0)
        title.check()
        self.assertEqual(output.locator('.rf-alert__title').inner_text(), 'Объявление на проверке')
        self.assertTrue(page.evaluate('document.documentElement.scrollWidth <= innerWidth'))

    def test_toast_lifecycle_persistence_duplicates_and_focus_pause(self):
        page = self.browser.new_page()
        self.addCleanup(page.close)
        page.goto(f"http://127.0.0.1:{self.server.server_port}/design/design-system/web/catalog.html?toastTab=toast#components/toast")
        page.wait_for_function("Boolean(window.ReflowerUI && window.ReflowerUI.showToast)")
        page.clock.install()
        host = page.locator("#catalog-toast-live")
        page.mouse.move(0, 0)
        show = "opts => window.ReflowerUI.showToast(document.querySelector('#catalog-toast-live'),opts)"
        page.evaluate(show, {"message": "Saved", "duration": 5000, "variant": "success"})
        page.clock.run_for(3000)
        page.evaluate(show, {"message": "Saved", "duration": 5000, "variant": "success"})
        page.clock.run_for(2100)
        self.assertTrue(host.is_hidden(), "Duplicate must not restart the timer")
        page.evaluate(show, {"message": "Failed", "variant": "error", "duration": 100})
        page.clock.run_for(10000)
        self.assertTrue(host.is_visible(), "Errors must remain until dismissed")
        host.locator("[data-rf-toast-close]").click()
        self.assertTrue(host.is_hidden())
        page.mouse.move(0, 0)
        page.evaluate(show, {"message": "Paused", "duration": 5000, "variant": "info"})
        host.locator("[data-rf-toast-close]").focus()
        page.clock.run_for(10000)
        self.assertTrue(host.is_visible())
        page.locator('[data-toast-theme]').focus()
        page.clock.run_for(5100)
        self.assertTrue(host.is_hidden())
        page.evaluate(show, {"message": "First", "duration": 1000, "variant": "info"})
        page.clock.run_for(500)
        page.evaluate(show, {"message": "Second", "duration": 5000, "variant": "info"})
        page.clock.run_for(600)
        self.assertEqual(host.locator('.rf-toast__content').inner_text(), 'Second')
        self.assertTrue(host.is_visible(), "Old timer must not dismiss replacement")
        page.clock.run_for(4500)
        self.assertTrue(host.is_hidden())




    @staticmethod
    def mount_standard_dropdown(page):
        page.locator("main").evaluate(
            """root => { root.innerHTML = `
              <div class="rf-dropdown" data-rf-dropdown data-rf-dropdown-mode="selection" style="position:absolute;left:40px;top:80px;width:240px">
                <button id="touch-trigger" class="rf-dropdown__trigger" type="button" data-rf-dropdown-trigger>Все районы</button>
                <div id="touch-menu" class="rf-dropdown__panel" role="listbox" data-rf-dropdown-panel hidden>
                  <button class="rf-dropdown__item rf-list-item" type="button" role="option" data-rf-dropdown-item data-value="all">Все районы</button>
                  <button class="rf-dropdown__item rf-list-item" type="button" role="option" data-rf-dropdown-item data-value="october">Октябрьский район · Бишкек</button>
                  <button class="rf-dropdown__item rf-list-item" type="button" role="option" data-rf-dropdown-item data-value="may">Первомайский район · Бишкек</button>
                </div>
              </div>`; }"""
        )
        page.wait_for_function(
            '() => document.getElementById("touch-trigger").getAttribute("aria-controls") === "touch-menu"'
        )
        page.locator("#touch-trigger").evaluate("trigger => trigger.click()")

    def test_viewport_dropdown_keeps_compact_width_inside_the_viewport(self):
        page = self.open_catalog()
        page.locator("main").evaluate(
            """root => { root.innerHTML = `
              <div class="rf-dropdown rf-dropdown--viewport" data-rf-dropdown data-rf-dropdown-mode="actions" style="position:absolute;right:8px;top:80px">
                <button id="viewport-trigger" class="rf-icon-button" type="button" data-rf-dropdown-trigger aria-label="Open actions">•••</button>
                <div id="viewport-menu" class="rf-dropdown__panel" role="menu" data-rf-dropdown-panel hidden>
                  <button class="rf-dropdown__item rf-list-item" type="button" role="menuitem" data-rf-dropdown-item>Restore listing</button>
                  <button class="rf-dropdown__item rf-list-item rf-dropdown__item--destructive" type="button" role="menuitem" data-rf-dropdown-item>Delete</button>
                </div>
              </div>`; }"""
        )
        page.wait_for_function(
            '() => document.getElementById("viewport-trigger").getAttribute("aria-controls") === "viewport-menu"'
        )
        page.locator("#viewport-trigger").click()
        bounds = page.locator("#viewport-menu").evaluate(
            """element => {
              const box = element.getBoundingClientRect();
              const expected = parseFloat(getComputedStyle(document.documentElement)
                .getPropertyValue('--rf-spacing-248'));
              return {left: box.left, right: box.right, width: box.width,
                expected, viewport: window.innerWidth};
            }"""
        )
        self.assertAlmostEqual(bounds["width"], bounds["expected"], delta=1)
        self.assertGreaterEqual(bounds["left"], 7, bounds)
        self.assertLessEqual(bounds["right"], bounds["viewport"] - 7, bounds)

    def test_coarse_pointer_tablet_keeps_dropdown_compact_and_trigger_bound(self):
        page = self.open_touch_catalog(1024, 768)
        self.mount_standard_dropdown(page)
        bounds = page.locator("#touch-menu").evaluate(
            """element => {
              const box = element.getBoundingClientRect();
              const trigger = document.getElementById('touch-trigger').getBoundingClientRect();
              return {left: box.left, right: box.right, width: box.width,
                position: getComputedStyle(element).position,
                triggerLeft: trigger.left, triggerBottom: trigger.bottom,
                top: box.top, viewport: window.innerWidth};
            }"""
        )
        self.assertEqual(bounds["position"], "absolute", bounds)
        self.assertLessEqual(bounds["width"], 480, bounds)
        self.assertAlmostEqual(bounds["left"], bounds["triggerLeft"], delta=1)
        self.assertGreaterEqual(bounds["top"], bounds["triggerBottom"], bounds)
        self.assertLessEqual(bounds["right"], bounds["viewport"], bounds)

    def test_coarse_pointer_phone_keeps_viewport_safe_mobile_sheet(self):
        page = self.open_touch_catalog(390, 844)
        self.mount_standard_dropdown(page)
        bounds = page.locator("#touch-menu").evaluate(
            """element => {
              const box = element.getBoundingClientRect();
              return {left: box.left, right: box.right, bottom: box.bottom,
                width: box.width, position: getComputedStyle(element).position,
                viewportWidth: window.innerWidth, viewportHeight: window.innerHeight};
            }"""
        )
        self.assertEqual(bounds["position"], "fixed", bounds)
        self.assertAlmostEqual(bounds["left"], 16, delta=1)
        self.assertAlmostEqual(bounds["right"], bounds["viewportWidth"] - 16, delta=1)
        self.assertAlmostEqual(bounds["bottom"], bounds["viewportHeight"] - 16, delta=1)

    def test_button_loading_intent_owns_behavior_semantics_and_layout(self):
        page = self.open_catalog()
        page.locator("main").evaluate(
            """root => {
              root.innerHTML = `
                <button id="loading" class="rf-button rf-button--primary" type="button">
                  <span aria-hidden="true">+</span>Save changes
                </button>
                <button id="disabled" class="rf-button rf-button--secondary" type="button" disabled>Disabled</button>
                <a id="loading-link" class="rf-button rf-button--secondary" href="#done" aria-disabled="false">Open</a>
                <button id="icon-loading" class="rf-icon-button rf-icon-button--secondary" type="button" aria-label="Search">
                  <span aria-hidden="true">?</span>
                </button>
                <div id="dynamic-host"></div>`;
              window.loadingTargetCalls = 0;
              const loading = document.getElementById("loading");
              loading.addEventListener("click", () => { window.loadingTargetCalls += 1; });
              loading.addEventListener("keydown", () => { window.loadingTargetCalls += 1; });
            }"""
        )
        loading = page.locator("#loading")
        initial_box = loading.bounding_box()
        self.assertIsNotNone(initial_box)

        loading.evaluate('button => button.setAttribute("data-loading", "true")')
        page.wait_for_function(
            """() => {
              const button = document.getElementById("loading");
              return button.disabled && button.getAttribute("aria-busy") === "true" &&
                button.querySelectorAll(":scope > .rf-button__spinner").length === 1;
            }"""
        )
        loading_box = loading.bounding_box()
        self.assertIsNotNone(loading_box)
        self.assertAlmostEqual(initial_box["width"], loading_box["width"], delta=0.5)
        self.assertAlmostEqual(initial_box["height"], loading_box["height"], delta=0.5)
        self.assertTrue(loading.is_disabled())
        self.assertEqual(loading.get_attribute("aria-disabled"), "true")
        self.assertEqual(loading.get_attribute("aria-busy"), "true")
        self.assertEqual(
            page.locator("#loading > .rf-button__spinner").get_attribute(
                "aria-hidden"
            ),
            "true",
        )
        self.assertEqual(
            page.locator("#loading > .rf-button__content").evaluate(
                "element => getComputedStyle(element).opacity"
            ),
            "0",
        )
        self.assertEqual(
            page.get_by_role("button", name="Save changes", exact=True).count(),
            1,
        )

        loading.evaluate(
            """button => {
              button.dispatchEvent(new MouseEvent("click", {bubbles: true, cancelable: true}));
              button.dispatchEvent(new MouseEvent("click", {bubbles: true, cancelable: true}));
              button.dispatchEvent(new KeyboardEvent("keydown", {key: "Enter", bubbles: true, cancelable: true}));
              button.dispatchEvent(new KeyboardEvent("keydown", {key: " ", bubbles: true, cancelable: true}));
            }"""
        )
        self.assertEqual(page.evaluate("window.loadingTargetCalls"), 0)

        loading.evaluate('button => button.removeAttribute("data-loading")')
        page.wait_for_function(
            """() => {
              const button = document.getElementById("loading");
              return !button.disabled && !button.hasAttribute("aria-busy") &&
                !button.hasAttribute("aria-disabled") &&
                !button.querySelector(":scope > .rf-button__spinner");
            }"""
        )
        restored_box = loading.bounding_box()
        self.assertIsNotNone(restored_box)
        self.assertAlmostEqual(initial_box["width"], restored_box["width"], delta=0.5)
        self.assertAlmostEqual(initial_box["height"], restored_box["height"], delta=0.5)
        loading.evaluate(
            'button => button.dispatchEvent(new MouseEvent("click", {bubbles: true, cancelable: true}))'
        )
        self.assertEqual(page.evaluate("window.loadingTargetCalls"), 1)

        disabled = page.locator("#disabled")
        disabled.evaluate('button => button.setAttribute("data-loading", "true")')
        page.wait_for_function(
            '() => document.getElementById("disabled").getAttribute("aria-busy") === "true"'
        )
        disabled.evaluate('button => button.removeAttribute("data-loading")')
        page.wait_for_function(
            '() => !document.getElementById("disabled").hasAttribute("aria-busy")'
        )
        self.assertTrue(disabled.is_disabled())
        self.assertIsNone(disabled.get_attribute("aria-disabled"))

        loading_link = page.locator("#loading-link")
        loading_link.evaluate('link => link.setAttribute("data-loading", "true")')
        page.wait_for_function(
            '() => document.getElementById("loading-link").getAttribute("aria-disabled") === "true"'
        )
        loading_link.evaluate('link => link.removeAttribute("data-loading")')
        page.wait_for_function(
            '() => document.getElementById("loading-link").getAttribute("aria-disabled") === "false"'
        )
        self.assertEqual(loading_link.get_attribute("aria-disabled"), "false")
        self.assertIsNone(loading_link.get_attribute("aria-busy"))

        page.locator("#dynamic-host").evaluate(
            """host => {
              host.innerHTML = '<button id="dynamic-loading" class="rf-button rf-button--primary" type="button" data-loading="true">Publish</button>';
            }"""
        )
        page.wait_for_function(
            """() => {
              const button = document.getElementById("dynamic-loading");
              return button.disabled && button.getAttribute("aria-busy") === "true" &&
                !!button.querySelector(":scope > .rf-button__spinner");
            }"""
        )
        dynamic = page.locator("#dynamic-loading")
        dynamic.evaluate('button => button.removeAttribute("data-loading")')
        page.wait_for_function(
            '() => !document.getElementById("dynamic-loading").disabled'
        )

        icon = page.locator("#icon-loading")
        icon.evaluate('button => button.setAttribute("data-loading", "true")')
        page.wait_for_function(
            '() => !!document.querySelector("#icon-loading > .rf-button__spinner")'
        )
        self.assertEqual(page.get_by_role("button", name="Search").count(), 1)
        self.assertEqual(
            page.locator("#icon-loading > .rf-button__spinner").get_attribute(
                "aria-hidden"
            ),
            "true",
        )

    def test_segmented_control_always_keeps_one_available_option_selected(self):
        page = self.open_catalog()
        page.locator("main").evaluate(
            """root => {
              root.innerHTML = `
                <div id="custom-segments" data-rf-segmented-control>
                  <button id="custom-disabled" data-rf-segmented-value="disabled" aria-disabled="true" aria-pressed="false">Disabled</button>
                  <button id="custom-first" data-rf-segmented-value="first" aria-pressed="false">First</button>
                  <button id="custom-second" data-rf-segmented-value="second" aria-pressed="false">Second</button>
                </div>
                <fieldset id="native-segments" class="rf-segmented-control">
                  <label><input id="native-first" class="rf-segmented-control__input" type="radio" name="native">First</label>
                  <label><input id="native-second" class="rf-segmented-control__input" type="radio" name="native">Second</label>
                </fieldset>`;
            }"""
        )
        page.wait_for_function(
            """() => document.getElementById("custom-first").getAttribute("aria-pressed") === "true" &&
              document.getElementById("native-first").checked"""
        )
        self.assertEqual(
            page.locator('#custom-segments [aria-pressed="true"]').count(), 1
        )
        self.assertFalse(page.locator("#custom-disabled").get_attribute("aria-pressed") == "true")
        page.locator("#custom-second").click()
        self.assertEqual(page.locator("#custom-second").get_attribute("aria-pressed"), "true")
        self.assertEqual(page.locator("#custom-first").get_attribute("aria-pressed"), "false")
        self.assertEqual(
            page.locator('#custom-segments [aria-pressed="true"]').count(), 1
        )
        page.locator("#custom-second").evaluate(
            'option => option.setAttribute("aria-disabled", "true")'
        )
        page.wait_for_function(
            '() => document.getElementById("custom-first").getAttribute("aria-pressed") === "true"'
        )
        self.assertEqual(
            page.locator('#custom-segments [aria-pressed="true"]').count(), 1
        )

    def test_floating_field_handles_focus_value_error_disabled_and_textarea(self):
        page = self.open_catalog()
        page.locator("main").evaluate(
            """root => {
              root.innerHTML = `
                <div class="rf-text-field-group"><span class="rf-text-field__control">
                  <input id="floating-empty" class="rf-text-field" type="text">
                  <label class="rf-text-field__label" for="floating-empty">Title</label>
                </span></div>
                <div class="rf-text-field-group"><span class="rf-text-field__control">
                  <input id="floating-placeholder" class="rf-text-field" type="text" placeholder="Placeholder">
                  <label class="rf-text-field__label" for="floating-placeholder">Title</label>
                </span></div>
                <div class="rf-text-field-group"><span class="rf-text-field__control">
                  <input id="autofill-username" class="rf-text-field" type="text" name="username" autocomplete="username">
                  <label class="rf-text-field__label" for="autofill-username">Username</label>
                </span></div>
                <div class="rf-text-field-group"><span class="rf-text-field__control">
                  <input id="autofill-email" class="rf-text-field" type="email" name="email" autocomplete="email">
                  <label class="rf-text-field__label" for="autofill-email">Email</label>
                </span></div>
                <div class="rf-text-field-group"><span class="rf-text-field__control">
                  <input id="search-autofill-off" class="rf-text-field" type="search" data-rf-autofill="off">
                  <label class="rf-text-field__label" for="search-autofill-off">Search</label>
                </span></div>
                <div class="rf-text-field-group"><span class="rf-text-field__control">
                  <input id="floating-error" class="rf-text-field" type="text" aria-invalid="true" aria-describedby="floating-error-message">
                  <label class="rf-text-field__label" for="floating-error">Title</label>
                </span><span id="floating-error-message" class="rf-text-field__error">Error message</span></div>
                <div class="rf-text-field-group"><span class="rf-text-field__control">
                  <input id="floating-disabled" class="rf-text-field" type="text" value="Text" disabled>
                  <label class="rf-text-field__label" for="floating-disabled">Title</label>
                </span></div>
                <div class="rf-text-field-group"><span class="rf-text-field__control">
                  <textarea id="floating-textarea" class="rf-text-field rf-text-field--multiline" placeholder="Description" aria-label="Description">First line\nSecond line</textarea>
                </span></div>
                <div class="rf-text-field-group"><span class="rf-text-field__control">
                  <input id="password-current" class="rf-text-field rf-text-field--with-action" type="password" value="Secret value" autocomplete="current-password">
                  <label class="rf-text-field__label" for="password-current">Password</label>
                  <span class="rf-text-field__action"><button id="password-toggle" class="rf-icon-button rf-icon-button--tertiary" type="button" data-rf-password-toggle data-rf-password-show-label="Show password" data-rf-password-hide-label="Hide password" aria-label="Show password"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="eye" aria-hidden="true"></span></button><button id="password-clear-lower-priority" class="rf-icon-button" type="button" data-rf-input-clear aria-label="Clear password"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="close" aria-hidden="true"></span></button></span>
                </span></div>
                <div class="rf-text-field-group"><span class="rf-text-field__control">
                  <input id="password-new" class="rf-text-field rf-text-field--with-action" type="password" value="New secret" autocomplete="new-password" disabled>
                  <label class="rf-text-field__label" for="password-new">New password</label>
                  <span class="rf-text-field__action"><button id="password-new-toggle" class="rf-icon-button rf-icon-button--tertiary" type="button" data-rf-password-toggle data-rf-password-show-label="Show new password" data-rf-password-hide-label="Hide new password" aria-label="Show new password"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="eye" aria-hidden="true"></span></button></span>
                </span></div>
                <div class="rf-text-field-group"><span class="rf-text-field__control">
                  <span class="rf-text-field__icon rf-icon rf-icon--sm" data-rf-icon-glyph="search" aria-hidden="true"></span>
                  <input id="clearable-text" class="rf-text-field rf-text-field--with-icon rf-text-field--with-action" value="Bouquet">
                  <label class="rf-text-field__label" for="clearable-text">Search</label>
                  <span class="rf-text-field__action"><button id="clearable-text-action" class="rf-icon-button rf-icon-button--tertiary" type="button" data-rf-input-clear aria-label="Clear search"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="close" aria-hidden="true"></span></button></span>
                </span></div>
                <div class="rf-text-field-group"><span class="rf-text-field__control">
                  <input id="clearable-disabled" class="rf-text-field rf-text-field--with-action" value="Locked" disabled>
                  <label class="rf-text-field__label" for="clearable-disabled">Disabled</label>
                  <span class="rf-text-field__action"><button id="clearable-disabled-action" class="rf-icon-button" type="button" data-rf-input-clear aria-label="Clear disabled"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="close" aria-hidden="true"></span></button></span>
                </span></div>
                <input id="placeholder-only" class="rf-text-field" placeholder="Placeholder" aria-label="Standalone field">
                <input id="value-only" class="rf-text-field" value="Text" aria-label="Standalone value">`;
            }"""
        )
        page.wait_for_function(
            '() => document.getElementById("floating-empty").hasAttribute("data-rf-floating-placeholder")'
        )
        page.wait_for_function(
            '() => document.getElementById("search-autofill-off").getAttribute("data-form-type") === "other"'
        )

        search = page.locator("#search-autofill-off")
        self.assertEqual(search.get_attribute("autocomplete"), "off")
        self.assertEqual(search.get_attribute("data-lpignore"), "true")
        self.assertEqual(search.get_attribute("data-1p-ignore"), "")
        self.assertEqual(search.get_attribute("data-bwignore"), "")
        self.assertEqual(search.get_attribute("data-form-type"), "other")
        self.assertIsNone(page.locator("#autofill-username").get_attribute("data-form-type"))
        self.assertIsNone(page.locator("#password-current").get_attribute("data-form-type"))

        empty = page.locator("#floating-empty")
        label = page.locator('label[for="floating-empty"]')
        self.assertEqual(empty.get_attribute("data-rf-floating-placeholder"), "")
        self.assertEqual(label.evaluate("element => getComputedStyle(element).alignSelf"), "center")
        rest_font_size = label.evaluate("element => parseFloat(getComputedStyle(element).fontSize)")

        empty.focus()
        self.assertEqual(label.evaluate("element => getComputedStyle(element).alignSelf"), "start")
        page.wait_for_function(
            """restSize => parseFloat(getComputedStyle(
              document.querySelector('label[for="floating-empty"]')
            ).fontSize) < restSize""",
            arg=rest_font_size,
        )
        float_font_size = label.evaluate("element => parseFloat(getComputedStyle(element).fontSize)")
        self.assertLess(float_font_size, rest_font_size)
        self.assertEqual(empty.evaluate("element => document.activeElement === element"), True)

        clearable = page.locator("#clearable-text")
        clear_action = page.locator("#clearable-text-action")
        self.assertTrue(clear_action.is_hidden())
        self.assertEqual(clear_action.get_attribute("aria-controls"), "clearable-text")
        clearable.focus()
        self.assertFalse(clear_action.is_hidden())
        clearable.press("Tab")
        self.assertTrue(clear_action.evaluate("element => document.activeElement === element"))
        self.assertFalse(clear_action.is_hidden())
        clear_action.press("Enter")
        self.assertEqual(clearable.input_value(), "")
        self.assertTrue(clear_action.is_hidden())
        self.assertTrue(clearable.evaluate("element => document.activeElement === element"))
        clearable.fill("Roses")
        self.assertFalse(clear_action.is_hidden())
        page.locator("#placeholder-only").focus()
        page.wait_for_function(
            "() => document.querySelector('#clearable-text-action').hidden"
        )
        self.assertTrue(page.locator("#clearable-disabled-action").is_disabled())
        self.assertTrue(page.locator("#clearable-disabled-action").is_hidden())
        self.assertTrue(page.locator("#password-clear-lower-priority").is_hidden())

        empty.fill("Text")
        page.locator("#placeholder-only").focus()
        self.assertEqual(label.evaluate("element => getComputedStyle(element).alignSelf"), "start")
        empty.evaluate("element => { element.value = ''; }")

        for field_id in ("autofill-username", "autofill-email"):
            autofilled = page.locator(f"#{field_id}")
            autofilled.evaluate(
                "element => { element.value = element.type === 'email' ? 'flora@example.com' : 'flora'; }"
            )
            self.assertEqual(
                page.locator(f'label[for="{field_id}"]').evaluate(
                    "element => getComputedStyle(element).alignSelf"
                ),
                "start",
            )
        self.assertEqual(label.evaluate("element => getComputedStyle(element).alignSelf"), "center")
        empty.evaluate("element => { element.value = '   '; }")
        self.assertEqual(label.evaluate("element => getComputedStyle(element).alignSelf"), "start")
        empty.evaluate("element => { element.value = ''; }")

        placeholder = page.locator("#floating-placeholder")
        self.assertEqual(
            placeholder.evaluate("element => getComputedStyle(element, '::placeholder').opacity"),
            "0",
        )
        placeholder.focus()
        self.assertEqual(
            placeholder.evaluate("element => getComputedStyle(element, '::placeholder').opacity"),
            "1",
        )

        error = page.locator("#floating-error")
        error.focus()
        focused_error_border = error.evaluate("element => getComputedStyle(element).borderColor")
        self.assertEqual(error.get_attribute("aria-invalid"), "true")
        self.assertEqual(error.get_attribute("aria-describedby"), "floating-error-message")
        self.assertEqual(
            error.evaluate("element => parseFloat(getComputedStyle(element).outlineWidth)"),
            0,
        )
        self.assertLessEqual(
            error.evaluate("element => parseFloat(getComputedStyle(element).outlineWidth)"),
            2,
        )
        self.assertEqual(
            error.evaluate("element => parseFloat(getComputedStyle(element).outlineOffset)"),
            0,
        )
        page.locator("#placeholder-only").focus()
        self.assertEqual(
            error.evaluate("element => getComputedStyle(element).borderColor"),
            focused_error_border,
        )

        disabled = page.locator("#floating-disabled")
        self.assertTrue(disabled.is_disabled())
        self.assertEqual(
            page.locator('label[for="floating-disabled"]').evaluate(
                "element => getComputedStyle(element).alignSelf"
            ),
            "start",
        )
        self.assertEqual(
            page.locator('#floating-textarea').evaluate(
                "element => getComputedStyle(element).resize"
            ),
            "vertical",
        )
        self.assertEqual(page.get_by_role("textbox", name="Title").count(), 4)
        self.assertEqual(page.get_by_role("textbox", name="Description").count(), 1)
        self.assertEqual(page.get_by_role("textbox", name="Standalone field").count(), 1)

        password = page.locator("#password-current")
        password.focus()
        password.evaluate("element => element.setSelectionRange(2, 7, 'forward')")
        toggle = page.locator("#password-toggle")
        toggle.click()
        self.assertEqual(password.get_attribute("type"), "text")
        self.assertEqual(password.get_attribute("autocomplete"), "current-password")
        self.assertEqual(password.input_value(), "Secret value")
        self.assertEqual(toggle.get_attribute("aria-pressed"), "true")
        self.assertEqual(toggle.get_attribute("aria-controls"), "password-current")
        self.assertEqual(toggle.get_attribute("aria-label"), "Hide password")
        self.assertEqual(
            toggle.locator("[data-rf-icon-glyph]").get_attribute("data-rf-icon-glyph"),
            "eye-off",
        )
        self.assertTrue(password.evaluate("element => document.activeElement === element"))
        self.assertEqual(
            password.evaluate(
                "element => [element.selectionStart, element.selectionEnd, element.selectionDirection]"
            ),
            [2, 7, "forward"],
        )
        toggle.press("Enter")
        self.assertEqual(password.get_attribute("type"), "password")
        self.assertEqual(password.input_value(), "Secret value")
        self.assertTrue(password.evaluate("element => document.activeElement === element"))

        new_password = page.locator("#password-new")
        new_toggle = page.locator("#password-new-toggle")
        self.assertEqual(new_password.get_attribute("autocomplete"), "new-password")
        self.assertTrue(new_password.is_disabled())
        self.assertTrue(new_toggle.is_disabled())

    def test_field_auto_wires_label_descriptions_error_priority_and_form_reset(self):
        page = self.open_catalog()
        page.locator("main").evaluate(
            """root => {
              root.innerHTML = `<form id="field-contract-form">
                <div id="auto-field" class="rf-text-field-group">
                  <span class="rf-text-field__control">
                    <input class="rf-text-field rf-text-field--with-action" name="query" value="Initial">
                    <label class="rf-text-field__label">Query</label>
                    <span class="rf-text-field__action"><button type="button" data-rf-input-clear aria-label="Clear">X</button></span>
                  </span>
                  <span class="rf-text-field__hint">Use a short name.</span>
                  <span class="rf-text-field__error" hidden>Query is required.</span>
                </div>
                <div class="rf-text-field-group"><span class="rf-text-field__control">
                  <input class="rf-text-field" name="second">
                  <label class="rf-text-field__label">Query</label>
                </span></div>
                <div class="rf-text-field-group"><span class="rf-text-field__control">
                  <input id="explicit-id" class="rf-text-field" aria-describedby="external-description">
                  <label class="rf-text-field__label" for="wrong-id">Explicit</label>
                </span><span id="field-hint" class="rf-text-field__hint">Hint</span></div>
                <div class="rf-text-field-group"><span class="rf-text-field__control">
                  <input class="rf-text-field rf-text-field--with-action" type="password" value="Secret">
                  <label class="rf-text-field__label">Password</label>
                  <span class="rf-text-field__action"><button type="button" data-rf-password-toggle data-rf-password-show-label="Show" data-rf-password-hide-label="Hide" aria-label="Show"><span data-rf-icon-glyph="eye"></span></button></span>
                </span></div>
              </form><span id="external-description">External</span>`;
            }"""
        )
        page.wait_for_function(
            """() => {
              const field = document.querySelector('#auto-field input');
              const label = document.querySelector('#auto-field label');
              return field.id && label.htmlFor === field.id && field.getAttribute('aria-describedby');
            }"""
        )

        ids = page.locator("#field-contract-form input").evaluate_all(
            "inputs => inputs.map(input => input.id)"
        )
        self.assertEqual(len(ids), len(set(ids)))
        self.assertTrue(all(ids))
        self.assertEqual(
            page.locator("#explicit-id").evaluate("input => input.labels[0].htmlFor"),
            "explicit-id",
        )

        auto_field = page.locator("#auto-field")
        input_control = auto_field.locator("input")
        hint = auto_field.locator(".rf-text-field__hint")
        error = auto_field.locator(".rf-text-field__error")
        self.assertEqual(input_control.get_attribute("aria-describedby"), hint.get_attribute("id"))
        self.assertEqual(error.get_attribute("aria-live"), "polite")
        self.assertEqual(error.get_attribute("aria-atomic"), "true")
        error.evaluate("element => { element.hidden = false; }")
        page.wait_for_function(
            """() => {
              const field = document.querySelector('#auto-field');
              return getComputedStyle(field.querySelector('.rf-text-field__hint')).display === 'none' &&
                field.querySelector('input').getAttribute('aria-describedby') === field.querySelector('.rf-text-field__error').id;
            }"""
        )
        error.evaluate("element => { element.hidden = true; }")
        page.wait_for_function(
            """() => document.querySelector('#auto-field input').getAttribute('aria-describedby') ===
              document.querySelector('#auto-field .rf-text-field__hint').id"""
        )
        self.assertEqual(
            page.locator("#explicit-id").get_attribute("aria-describedby"),
            "external-description field-hint",
        )

        password = page.locator('#field-contract-form input[data-rf-password-field]')
        password_toggle = page.locator("[data-rf-password-toggle]")
        password_toggle.click()
        self.assertEqual(password.get_attribute("type"), "text")
        clear = page.locator("[data-rf-input-clear]")
        self.assertTrue(clear.is_hidden())
        input_control.focus()
        self.assertFalse(clear.is_hidden())
        clear.click()
        self.assertTrue(clear.is_hidden())
        page.locator("#field-contract-form").evaluate("form => form.reset()")
        page.wait_for_function(
            """() => document.querySelector('#field-contract-form input[name=query]').value === 'Initial' &&
              !document.querySelector('[data-rf-input-clear]').hidden &&
              document.querySelector('[data-rf-password-field]').type === 'password'"""
        )
        self.assertEqual(password_toggle.get_attribute("aria-pressed"), "false")
        self.assertEqual(password_toggle.get_attribute("aria-label"), "Show")

    def test_date_picker_and_custom_select_interactions(self):
        page = self.open_catalog()
        page.locator("main").evaluate(
            """root => { root.innerHTML = `
              <div class="rf-text-field-group"><span class="rf-text-field__control">
                <input id="date" class="rf-text-field rf-text-field--with-action rf-date-picker" type="date" value="1992-03-01">
                <label class="rf-text-field__label" for="date">Date</label>
                <span class="rf-text-field__action"><button id="date-open" class="rf-icon-button" data-rf-date-trigger aria-label="Open calendar"></button></span>
              </span></div>
              <div class="rf-text-field-group"><span id="select-root" class="rf-text-field__control rf-dropdown" data-rf-dropdown data-rf-dropdown-mode="selection" style="width:155px;margin-left:auto">
                <input id="select-input" type="hidden" data-rf-dropdown-input name="city">
                <button id="select-trigger" class="rf-dropdown__trigger" type="button" data-rf-dropdown-trigger data-rf-dropdown-placeholder="Choose city"><span data-rf-dropdown-value></span><span data-rf-dropdown-chevron data-rf-icon-glyph="chevron-down"></span></button>
                <label class="rf-text-field__label" for="select-trigger">City</label>
                <div id="select-listbox" class="rf-dropdown__panel" role="listbox" aria-label="Cities" data-rf-dropdown-panel hidden>
                  <button id="option-one" class="rf-dropdown__item rf-list-item" type="button" role="option" data-value="one" aria-selected="false"><span data-rf-dropdown-label>One</span></button>
                  <button id="option-disabled" class="rf-dropdown__item rf-list-item" type="button" role="option" data-value="disabled" aria-selected="false" aria-disabled="true"><span data-rf-dropdown-label>Disabled</span></button>
                  <button id="option-two" class="rf-dropdown__item rf-list-item" type="button" role="option" data-value="two" aria-selected="false"><span data-rf-dropdown-label>Two</span></button>
                </div>
              </span></div>`; }"""
        )
        page.wait_for_function(
            '() => document.getElementById("select-trigger").getAttribute("aria-controls") === "select-listbox"'
        )
        date = page.locator("#date")
        self.assertTrue(date.get_attribute("data-rf-has-value") is not None)
        date.fill("")
        date.dispatch_event("change")
        self.assertIsNone(date.get_attribute("data-rf-has-value"))
        date.evaluate("element => { element.disabled = true; element.setAttribute('disabled', ''); }")
        page.wait_for_function('() => document.getElementById("date-open").disabled')

        trigger = page.locator("#select-trigger")
        trigger.press("ArrowDown")
        self.assertEqual(trigger.get_attribute("aria-expanded"), "true")
        dropdown_bounds = page.locator("#select-listbox").evaluate(
            "element => ({ left: element.getBoundingClientRect().left, right: element.getBoundingClientRect().right, viewport: window.innerWidth, bodyScrollLeft: document.body.scrollLeft })"
        )
        self.assertGreaterEqual(dropdown_bounds["left"], 7, dropdown_bounds)
        self.assertLessEqual(dropdown_bounds["right"], dropdown_bounds["viewport"] - 7, dropdown_bounds)
        self.assertEqual(dropdown_bounds["bodyScrollLeft"], 0, dropdown_bounds)
        self.assertEqual(
            page.locator("#select-listbox").get_attribute("aria-activedescendant"),
            "option-one",
        )
        page.locator("#select-listbox").press("ArrowDown")
        self.assertEqual(
            page.locator("#select-listbox").get_attribute("aria-activedescendant"),
            "option-two",
        )
        page.locator("#select-listbox").press("Enter")
        self.assertEqual(page.locator("#select-input").input_value(), "two")
        self.assertEqual(trigger.get_attribute("aria-expanded"), "false")
        self.assertEqual(page.locator("#option-two").get_attribute("aria-selected"), "true")
        trigger.click()
        page.locator("#select-listbox").press("Escape")
        self.assertEqual(trigger.get_attribute("aria-expanded"), "false")
        self.assertTrue(trigger.evaluate("element => document.activeElement === element"))
        page.locator("#select-listbox").evaluate(
            """listbox => {
              const option = document.createElement('button');
              option.type = 'button';
              option.className = 'rf-dropdown__item rf-list-item';
              option.setAttribute('role', 'option');
              option.setAttribute('data-value', 'three');
              option.setAttribute('aria-selected', 'false');
              option.innerHTML = '<span data-rf-dropdown-label>Three</span>';
              listbox.append(option);
            }"""
        )
        page.wait_for_function("() => document.querySelector('[data-value=three]').id")
        page.locator("#select-input").evaluate(
            """input => {
              input.value = 'three';
              input.dispatchEvent(new Event('input', { bubbles: true }));
            }"""
        )
        self.assertEqual(page.locator("[data-value=three]").get_attribute("aria-selected"), "true")
        self.assertEqual(page.locator("[data-rf-dropdown-value]").inner_text(), "Three")

    def test_focus_visible_ring_covers_the_full_interactive_matrix(self):
        page = self.open_catalog()
        page.locator("main").evaluate(
            """root => {
              root.innerHTML = `
                <button id="focus-button" class="rf-button rf-button--primary">Button</button>
                <button id="focus-icon" class="rf-icon-button rf-icon-button--secondary" aria-label="Icon button">I</button>
                <a id="focus-link" class="rf-link" href="#target">Link</a>
                <input id="focus-field" class="rf-text-field" aria-label="Text field">
                <textarea id="focus-textarea" class="rf-text-field rf-text-field--multiline" aria-label="Text area"></textarea>
                <button id="focus-card" class="rf-card rf-card--interactive">Card</button>
                <button id="focus-list" class="rf-list-item rf-list-item--interactive">List item</button>
                <select id="focus-select" class="rf-select" aria-label="Select"><option>One</option></select>
                <input id="focus-checkbox" class="rf-choice__input" type="checkbox" aria-label="Checkbox">
                <input id="focus-radio" class="rf-choice__input" type="radio" aria-label="Radio">
                <label class="rf-switch"><span class="rf-switch__control">
                  <input id="focus-switch" class="rf-switch__input" type="checkbox" role="switch" aria-label="Switch">
                  <span class="rf-switch__track"></span>
                </span></label>
                <label class="rf-segmented-control__item">
                  <input id="focus-segment" class="rf-segmented-control__input" type="radio" aria-label="Segment">
                  <span class="rf-segmented-control__label">Segment</span>
                </label>
                <button id="focus-tab" class="rf-tab" role="tab" aria-selected="true">Tab</button>
                <div class="rf-menu"><button id="focus-menu" class="rf-menu-item" role="menuitem">Menu item</button></div>`;
            }"""
        )
        focus_targets = (
            ("Button", "#focus-button", False, False),
            ("IconButton", "#focus-icon", False, False),
            ("Link", "#focus-link", False, False),
            ("TextField", "#focus-field", False, True),
            ("Multiline", "#focus-textarea", False, True),
            ("interactive Card", "#focus-card", False, False),
            ("interactive ListItem", "#focus-list", False, False),
            ("Select", "#focus-select", False, True),
            ("Checkbox", "#focus-checkbox", False, False),
            ("Radio", "#focus-radio", False, False),
            ("Switch", "#focus-switch", True, False),
            ("SegmentedControl", "#focus-segment", True, False),
            ("Tab", "#focus-tab", False, False),
            ("MenuItem", "#focus-menu", False, False),
        )
        page.keyboard.press("Tab")
        for component, selector, use_next_sibling, compact in focus_targets:
            with self.subTest(component=component):
                locator = page.locator(selector)
                locator.focus()
                state = locator.evaluate(
                    """(element, useNextSibling) => {
                      const painted = useNextSibling ? element.nextElementSibling : element;
                      const style = getComputedStyle(painted);
                      return {
                        active: document.activeElement === element,
                        focusVisible: element.matches(":focus-visible"),
                        outlineStyle: style.outlineStyle,
                        outlineWidth: parseFloat(style.outlineWidth),
                        outlineOffset: parseFloat(style.outlineOffset),
                        boxShadow: style.boxShadow,
                      };
                    }""",
                    use_next_sibling,
                )
                self.assertTrue(state["active"])
                self.assertTrue(state["focusVisible"])
                if component in ("TextField", "Multiline"):
                    self.assertEqual(state["outlineWidth"], 0)
                    self.assertEqual(state["boxShadow"], "none")
                    self.assertEqual(locator.evaluate("n => getComputedStyle(n).borderTopWidth"), "1px")
                    continue
                self.assertEqual(state["outlineStyle"], "solid")
                self.assertGreater(state["outlineWidth"], 0)
                if component == "Checkbox":
                    self.assertEqual(state["outlineOffset"], -state["outlineWidth"])
                    self.assertEqual(state["boxShadow"], "none")
                if compact:
                    self.assertLessEqual(state["outlineWidth"], 2)
                    self.assertEqual(state["outlineOffset"], 0)
                    self.assertEqual(state["boxShadow"], "none")

    def test_text_field_all_icon_slots_are_24px_and_copy_clears_them(self):
        page = self.open_catalog()
        page.set_viewport_size({"width": 390, "height": 844})
        page.locator("main").evaluate("""root => {
          root.innerHTML = ['sm', 'md', 'lg'].map(size => `
            <div class="rf-text-field-group" id="icons-${size}" style="width:280px">
              <span class="rf-text-field__control">
                <span class="rf-text-field__icon rf-icon rf-icon--sm" data-rf-icon-glyph="search" aria-hidden="true"></span>
                <input id="icons-input-${size}" class="rf-text-field rf-text-field--${size} rf-text-field--with-icon rf-text-field--with-trailing-icon" placeholder=" ">
                <label class="rf-text-field__label" for="icons-input-${size}">Search</label>
                <span class="rf-text-field__trailing-icon rf-icon rf-icon--sm" data-rf-icon-glyph="checkmark" aria-hidden="true"></span>
              </span><span class="rf-text-field__hint">Search by name</span>
            </div>`).join('');
        }""")
        for theme in ("light", "dark"):
            page.locator("html").evaluate("(el, theme) => el.dataset.theme = theme", theme)
            for size in ("sm", "md", "lg"):
                field = page.locator(f"#icons-{size}")
                for value in ("", "Peonies"):
                    field.locator("input").fill(value)
                    metrics = field.evaluate("""el => {
                      const input = el.querySelector('input'), css = getComputedStyle(input);
                      const leading = el.querySelector('.rf-text-field__icon').getBoundingClientRect();
                      const trailing = el.querySelector('.rf-text-field__trailing-icon').getBoundingClientRect();
                      const label = el.querySelector('label').getBoundingClientRect();
                      return {sizes: [leading.width, leading.height, trailing.width, trailing.height],
                        paddings: [parseFloat(css.paddingInlineStart), parseFloat(css.paddingInlineEnd)],
                        leadingGap: label.left - leading.right, trailingGap: trailing.left - label.right,
                        hintInset: parseFloat(getComputedStyle(el.querySelector('.rf-text-field__hint')).marginInlineStart)};
                    }""")
                    with self.subTest(theme=theme, size=size, value=value):
                        self.assertEqual(metrics["sizes"], [24, 24, 24, 24])
                        self.assertEqual(metrics["paddings"], [48, 48])
                        self.assertGreaterEqual(metrics["leadingGap"], 8)
                        self.assertGreaterEqual(metrics["trailingGap"], 8)
                        self.assertEqual(metrics["hintInset"], 48)

    def test_text_field_label_fades_but_descriptions_and_errors_wrap(self):
        page = self.open_catalog()
        page.locator("main").evaluate("""root => {
          root.innerHTML = `<div id="fade-field" class="rf-text-field-group">
            <div class="rf-text-field__control">
              <input id="fade-input" class="rf-text-field" placeholder=" " aria-describedby="fade-description">
              <label class="rf-text-field__label" for="fade-input">Очень длинное название поля ввода</label>
            </div>
            <span id="fade-description" class="rf-text-field__hint">Укажите полное название вашего букета</span>
            <span id="fade-error" class="rf-text-field__error" hidden>Необходимо указать название вашего букета</span>
          </div><textarea class="rf-text-field rf-text-field--multiline" aria-label="Multiline"></textarea>`;
        }""")
        field = page.locator("#fade-field")
        for theme in ("light", "dark"):
            page.locator("html").evaluate("(el, theme) => el.dataset.theme = theme", theme)
            for direction in ("ltr", "rtl"):
                field.evaluate("(el, dir) => el.dir = dir", direction)
                for width in (100, 240, 560):
                    field.evaluate("(el, width) => el.style.width = `${width}px`", width)
                    for invalid in (False, True):
                        field.evaluate("""(el, invalid) => {
                          el.querySelector('input').setAttribute('aria-invalid', String(invalid));
                          el.querySelector('.rf-text-field__error').hidden = !invalid;
                        }""", invalid)
                        message = "#fade-error" if invalid else "#fade-description"
                        for selector in (".rf-text-field__label", message):
                            with self.subTest(theme=theme, direction=direction, width=width, selector=selector):
                                metrics = field.locator(selector).evaluate("""el => {
                                  const css = getComputedStyle(el);
                                  return {height: el.getBoundingClientRect().height, line: parseFloat(css.lineHeight),
                                    wrap: css.whiteSpace, overflow: css.textOverflow, mask: css.maskImage,
                                    text: el.textContent, scroll: el.scrollWidth, width: el.clientWidth};
                                }""")
                                self.assertEqual(metrics["overflow"], "clip")
                                self.assertNotIn("…", metrics["text"])
                                if selector != ".rf-text-field__label":
                                    self.assertEqual(metrics["wrap"], "normal")
                                    self.assertEqual(metrics["mask"], "none")
                                    self.assertEqual(metrics["scroll"], metrics["width"])
                                    if width <= 240:
                                        self.assertGreater(metrics["height"], metrics["line"])
                                else:
                                    self.assertEqual(metrics["wrap"], "nowrap")
                                    self.assertAlmostEqual(metrics["height"], metrics["line"], delta=1)
                                    self.assertIn("linear-gradient", metrics["mask"])
                                    self.assertIn("to left" if direction == "rtl" else "to right", metrics["mask"])
                                    if width == 100:
                                        self.assertGreater(metrics["scroll"], metrics["width"])
                                    if width == 560:
                                        self.assertEqual(metrics["scroll"], metrics["width"])
                        page.wait_for_function("""id => document.querySelector('#fade-input').getAttribute('aria-describedby') === id""", arg=message[1:])
        # Long unbroken user values in either message must not create horizontal overflow.
        for invalid in (False, True):
            field.evaluate("""(el, invalid) => {
              el.style.width = '100px';
              el.querySelector('.rf-text-field__error').hidden = !invalid;
              el.querySelector(invalid ? '.rf-text-field__error' : '.rf-text-field__hint').textContent = 'LongUnbrokenValue'.repeat(12);
            }""", invalid)
            message = field.locator(".rf-text-field__error" if invalid else ".rf-text-field__hint")
            self.assertTrue(message.evaluate("el => el.scrollWidth <= el.clientWidth && getComputedStyle(el).maskImage === 'none'"))
        page.locator("#fade-input").fill("Полный введённый текст")
        self.assertEqual(page.locator("#fade-input").input_value(), "Полный введённый текст")
        for selector in ("#fade-input", "textarea"):
            self.assertEqual(page.locator(selector).evaluate("el => getComputedStyle(el).maskImage"), "none")
        page.locator("textarea").fill("Первая строка\nВторая строка")
        self.assertIn("\n", page.locator("textarea").input_value())

    def test_field_trailing_action_stays_centered_across_anatomy_and_sizes(self):
        page = self.open_catalog()
        page.locator("main").evaluate(
            """root => {
              root.innerHTML = `
                <div id="field-sm" class="rf-text-field-group">
                  <label class="rf-text-field__label" for="input-sm">Small with leading</label>
                  <span class="rf-text-field__control">
                    <span class="rf-text-field__icon" aria-hidden="true">L</span>
                    <input id="input-sm" class="rf-text-field rf-text-field--sm rf-text-field--with-icon rf-text-field--with-action" aria-describedby="hint-sm">
                    <span class="rf-text-field__action"><button class="rf-icon-button rf-icon-button--secondary rf-icon-button--s" aria-label="Clear">X</button></span>
                  </span>
                  <span id="hint-sm" class="rf-text-field__hint">A description that wraps over more than one line without moving the action.</span>
                </div>
                <div id="field-md" class="rf-text-field-group">
                  <label class="rf-text-field__label" for="input-md">Medium error</label>
                  <span class="rf-text-field__control">
                    <input id="input-md" class="rf-text-field rf-text-field--with-action" aria-invalid="true" aria-describedby="error-md">
                    <span class="rf-text-field__action"><button class="rf-icon-button rf-icon-button--secondary" aria-label="Retry">R</button></span>
                  </span>
                  <span id="error-md" class="rf-text-field__error">A multiline validation error remains below the shared field frame.</span>
                </div>
                <div id="field-lg" class="rf-text-field-group">
                  <label class="rf-text-field__label" for="input-lg">Large with leading and error</label>
                  <span class="rf-text-field__control">
                    <span class="rf-text-field__icon" aria-hidden="true">L</span>
                    <input id="input-lg" class="rf-text-field rf-text-field--lg rf-text-field--with-icon rf-text-field--with-action" aria-invalid="true" aria-describedby="hint-lg error-lg">
                    <span class="rf-text-field__action"><button class="rf-icon-button rf-icon-button--secondary rf-icon-button--s" aria-label="Clear">X</button></span>
                  </span>
                  <span id="hint-lg" class="rf-text-field__hint">Description</span>
                  <span id="error-lg" class="rf-text-field__error">Error</span>
                </div>`;
            }"""
        )
        for size in ("sm", "md", "lg"):
            with self.subTest(size=size):
                geometry = page.locator(f"#field-{size}").evaluate(
                    """field => {
                      const input = field.querySelector("input").getBoundingClientRect();
                      const slot = field.querySelector(".rf-text-field__action").getBoundingClientRect();
                      const action = field.querySelector("button").getBoundingClientRect();
                      return {
                        inputCenter: input.top + input.height / 2,
                        iconCenter: field.querySelector(".rf-text-field__icon") ? (() => { const icon = field.querySelector(".rf-text-field__icon").getBoundingClientRect(); return icon.top + icon.height / 2; })() : null,
                        slotCenter: slot.top + slot.height / 2,
                        actionCenter: action.top + action.height / 2,
                        inputTop: input.top,
                        inputHeight: input.height,
                        slotTop: slot.top,
                        slotHeight: slot.height,
                      };
                    }"""
                )
                self.assertAlmostEqual(
                    geometry["inputCenter"], geometry["slotCenter"], delta=0.5
                )
                self.assertAlmostEqual(
                    geometry["inputCenter"], geometry["actionCenter"], delta=0.5
                )
                if geometry["iconCenter"] is not None:
                    self.assertAlmostEqual(
                        geometry["inputCenter"], geometry["iconCenter"], delta=0.5
                    )
                self.assertAlmostEqual(
                    geometry["inputTop"], geometry["slotTop"], delta=0.5
                )
                self.assertAlmostEqual(
                    geometry["inputHeight"], geometry["slotHeight"], delta=0.5
                )

        medium = page.locator("#field-md")
        inline_geometry = medium.evaluate(
            """field => {
              const input = field.querySelector('input').getBoundingClientRect();
              const message = field.querySelector('.rf-text-field__error').getBoundingClientRect();
              return {
                messageAfterControl: field.querySelector('.rf-text-field__error').previousElementSibling.classList.contains('rf-text-field__control'),
                inputLeft: input.left,
                messageLeft: message.left,
                inputBottom: input.bottom,
                messageTop: message.top,
                inputPaddingInline: parseFloat(getComputedStyle(field.querySelector('input')).paddingInlineStart),
              };
            }"""
        )
        self.assertTrue(inline_geometry["messageAfterControl"])
        self.assertGreater(inline_geometry["messageTop"], inline_geometry["inputBottom"])
        self.assertAlmostEqual(
            inline_geometry["messageLeft"] - inline_geometry["inputLeft"],
            inline_geometry["inputPaddingInline"],
            delta=0.5,
        )

        medium.locator("input").focus()
        error_focus = medium.evaluate(
            """field => {
              const input = field.querySelector('input');
              const inputStyle = getComputedStyle(input);
              return {
                inputOutlineWidth: parseFloat(inputStyle.outlineWidth),
                inputOutlineOffset: parseFloat(inputStyle.outlineOffset),
                inputBoxShadow: inputStyle.boxShadow,
              };
            }"""
        )
        self.assertEqual(error_focus["inputBoxShadow"], "none")
        self.assertEqual(error_focus["inputOutlineWidth"], 0)
        self.assertEqual(error_focus["inputOutlineOffset"], 0)

    def test_compact_floating_field_keeps_text_clear_of_rounded_edge(self):
        page = self.open_catalog()
        page.locator("main").evaluate(
            """root => {
              root.innerHTML = `
                <div class="rf-text-field-group">
                  <span class="rf-text-field__control">
                    <input id="compact-field" class="rf-text-field rf-text-field--sm" value="Bouquet" aria-describedby="compact-hint">
                    <label class="rf-text-field__label" for="compact-field">Name</label>
                  </span>
                  <span class="rf-text-field__hint" id="compact-hint">Description</span>
                </div>`;
            }"""
        )
        geometry = page.locator("#compact-field").evaluate(
            """input => {
              const label = input.parentElement.querySelector('.rf-text-field__label');
              const hint = input.closest('.rf-text-field-group').querySelector('.rf-text-field__hint');
              const inputBox = input.getBoundingClientRect();
              return {
                paddingInline: parseFloat(getComputedStyle(input).paddingInlineStart),
                labelInset: label.getBoundingClientRect().left - inputBox.left,
                hintInset: hint.getBoundingClientRect().left - inputBox.left,
              };
            }"""
        )
        self.assertGreaterEqual(geometry["paddingInline"], 16)
        self.assertAlmostEqual(geometry["labelInset"], geometry["paddingInline"], delta=0.5)
        self.assertAlmostEqual(geometry["hintInset"], geometry["paddingInline"], delta=0.5)

    def test_stable_component_accessibility_smoke(self):
        page = self.open_catalog()
        page.goto(f"{self.catalog_url}#guidelines/specimens", wait_until="networkidle")
        self.assertGreater(
            page.get_by_role("button", name="Создать", exact=True).count(),
            0,
        )
        self.assertEqual(page.get_by_role("button", name="Поиск").count(), 1)
        self.assertGreater(
            page.get_by_role("textbox", name="Название").count(),
            0,
        )
        self.assertTrue(page.get_by_role("radio", name="Недоступно").is_disabled())

        invalid = page.locator('input[aria-describedby="price-error"]')
        self.assertEqual(invalid.get_attribute("aria-describedby"), "price-error")
        self.assertEqual(page.locator("#price-error").count(), 1)
        self.assertEqual(
            page.locator('.rf-skeleton[aria-hidden="true"]').count(),
            4,
        )

        specimen_page = page.locator('[id="guidelines/specimens"]')
        for selector in (
            ".rf-button.rf-button--primary",
            '.rf-icon-button[aria-label="Поиск"]',
        ):
            box = specimen_page.locator(selector).first.bounding_box()
            self.assertIsNotNone(box)
            self.assertGreaterEqual(box["height"], 40)
            if "icon-button" in selector:
                self.assertGreaterEqual(box["width"], 40)

        menu_trigger = page.get_by_role("button", name="Действия объявления")
        self.assertEqual(menu_trigger.get_attribute("aria-expanded"), "false")
        menu_trigger.click()
        self.assertEqual(menu_trigger.get_attribute("aria-expanded"), "true")
        self.assertEqual(
            page.evaluate("document.activeElement.getAttribute('role')"),
            "menuitem",
        )
        page.keyboard.press("Escape")
        self.assertEqual(menu_trigger.get_attribute("aria-expanded"), "false")
        self.assertTrue(menu_trigger.evaluate("button => document.activeElement === button"))

        segments = page.locator(
            '.rf-segmented-control:not(.rf-segmented-control--sm) '
            '.rf-segmented-control__input:not(:disabled)'
        )
        segments.nth(0).focus()
        page.keyboard.press("ArrowRight")
        self.assertTrue(segments.nth(1).is_checked())

        dialog_trigger = page.get_by_role("button", name="Открыть Dialog")
        dialog_trigger.click()
        dialog = page.locator("#catalog-dialog")
        self.assertTrue(dialog.evaluate("element => element.open"))
        self.assertEqual(dialog.get_attribute("aria-labelledby"), "dialog-title")
        self.assertEqual(dialog.get_attribute("aria-describedby"), "dialog-description")
        self.assertEqual(page.get_by_role("dialog", name="Снять объявление?").count(), 1)
        page.keyboard.press("Escape")
        self.assertFalse(dialog.evaluate("element => element.open"))
        self.assertTrue(dialog_trigger.evaluate("button => document.activeElement === button"))


if __name__ == "__main__":
    unittest.main()
