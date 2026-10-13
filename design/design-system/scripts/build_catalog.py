#!/usr/bin/env python3
"""Build the deterministic machine-readable model for the Design System Catalog."""

from __future__ import annotations

import argparse
import copy
import hashlib
import json
import re
import sys
from collections import Counter
from pathlib import Path
from typing import Any


REPO_ROOT = Path(__file__).resolve().parents[3]
SYSTEM_ROOT = REPO_ROOT / "design" / "design-system"
REGISTRY_PATH = SYSTEM_ROOT / "component-registry.json"
GUIDANCE_PATH = SYSTEM_ROOT / "catalog-guidance.json"
CODE_EXAMPLES_PATH = SYSTEM_ROOT / "code-examples.json"
RESOLVED_TOKENS_PATH = SYSTEM_ROOT / "generated" / "tokens.resolved.json"
COLOR_TOKENS_PATH = SYSTEM_ROOT / "generated" / "color-tokens.json"
FOUNDATION_TOKENS_PATH = SYSTEM_ROOT / "generated" / "foundation-tokens.json"
TYPOGRAPHY_TOKENS_PATH = SYSTEM_ROOT / "generated" / "typography-tokens.json"
STRESS_FIXTURES_PATH = SYSTEM_ROOT / "stress-fixtures.json"
ICONS_PATH = REPO_ROOT / "design" / "icons" / "generated" / "index.json"
OUTPUT_PATH = SYSTEM_ROOT / "generated" / "catalog-model.json"
TOKEN_SOURCES = {
    "colorPrimitives": SYSTEM_ROOT / "tokens" / "color-primitives.json",
    "static": SYSTEM_ROOT / "tokens" / "static.json",
    "primitives": SYSTEM_ROOT / "tokens" / "primitives.json",
    "foundations": SYSTEM_ROOT / "tokens" / "foundations.json",
    "typography": SYSTEM_ROOT / "tokens" / "typography.json",
    "context": SYSTEM_ROOT / "tokens" / "context.json",
    "components": SYSTEM_ROOT / "tokens" / "components.json",
    "light": SYSTEM_ROOT / "tokens" / "themes" / "light.json",
    "dark": SYSTEM_ROOT / "tokens" / "themes" / "dark.json",
}

FORBIDDEN_GUIDANCE_FIELDS = {
    "name",
    "status",
    "platforms",
    "category",
    "level",
    "variants",
    "sizes",
    "states",
    "synonyms",
    "purpose",
}
GUIDANCE_TOP_LEVEL_FIELDS = {
    "schemaVersion",
    "components",
    "comparisons",
    "compositions",
    "coreVsFeature",
    "pilotExamples",
    "buildingFeatureSteps",
}
COMPONENT_GUIDANCE_FIELDS = {"useWhen", "dontUseWhen", "anatomy"}
ROUTE_SEGMENTS = {
    "primitive": "primitives",
    "component": "components",
    "pattern": "patterns",
}
ID_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
TOKEN_ALIAS_RE = re.compile(r"^\{([A-Za-z0-9_.-]+)\}$")
ICON_KEY_RE = re.compile(
    r"^    (?:'(?P<quoted>[a-z0-9-]+)'|(?P<bare>[a-z][a-z0-9]*)):\s*\[",
    re.MULTILINE,
)
COLOR_LAYERS = ("primitive", "alias", "context", "static")
CONTEXT_FAMILY_ORDER = ("background", "text", "icon", "border", "overlay")
CODE_EXAMPLE_EXTENSIONS = {
    "html": ".html",
    "tsx": ".tsx",
}


class CatalogBuildError(ValueError):
    """A Catalog source is invalid or cannot produce a safe model."""


def relative(path: Path) -> str:
    return path.relative_to(REPO_ROOT).as_posix()


def load_json(path: Path) -> dict[str, Any]:
    try:
        document = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise CatalogBuildError(f"Не удалось прочитать {relative(path)}: {exc}") from exc
    if not isinstance(document, dict):
        raise CatalogBuildError(f"{relative(path)} должен содержать JSON-объект")
    return document


def require_exact_fields(
    value: dict[str, Any], expected: set[str], context: str
) -> None:
    actual = set(value)
    if actual == expected:
        return
    missing = sorted(expected - actual)
    unknown = sorted(actual - expected)
    raise CatalogBuildError(
        f"{context}: неверные поля; отсутствуют={missing}, неизвестны={unknown}"
    )


def require_non_empty_string(value: Any, context: str) -> str:
    if not isinstance(value, str) or not value.strip():
        raise CatalogBuildError(f"{context} должен быть непустой строкой")
    return value


def require_string_list(value: Any, context: str, *, minimum: int = 1) -> list[str]:
    if not isinstance(value, list) or len(value) < minimum:
        raise CatalogBuildError(
            f"{context} должен быть списком минимум из {minimum} строк"
        )
    for index, item in enumerate(value):
        require_non_empty_string(item, f"{context}[{index}]")
    return value


def validate_identifier(value: Any, context: str) -> str:
    identifier = require_non_empty_string(value, context)
    if not ID_RE.fullmatch(identifier):
        raise CatalogBuildError(f"{context} должен быть kebab-case identifier")
    return identifier


def find_forbidden_guidance_fields(value: Any, path: str = "guidance") -> None:
    if isinstance(value, dict):
        for key, child in value.items():
            if key in FORBIDDEN_GUIDANCE_FIELDS:
                raise CatalogBuildError(
                    f"{path}.{key}: metadata принадлежит Component Registry"
                )
            find_forbidden_guidance_fields(child, f"{path}.{key}")
    elif isinstance(value, list):
        for index, child in enumerate(value):
            find_forbidden_guidance_fields(child, f"{path}[{index}]")


def validate_registry_reference(
    value: Any, known_components: set[str], context: str
) -> str:
    reference = require_non_empty_string(value, context)
    if reference not in known_components:
        raise CatalogBuildError(f"{context}: неизвестный Registry component {reference}")
    return reference


def validate_guidance(
    guidance: dict[str, Any], registry: dict[str, Any]
) -> None:
    require_exact_fields(guidance, GUIDANCE_TOP_LEVEL_FIELDS, "guidance")
    if guidance["schemaVersion"] != 1:
        raise CatalogBuildError("guidance.schemaVersion должен быть равен 1")
    find_forbidden_guidance_fields(guidance)

    registry_entries = registry.get("components")
    if not isinstance(registry_entries, list):
        raise CatalogBuildError("registry.components должен быть списком")
    known_components = {
        require_non_empty_string(entry.get("name"), "registry.components[].name")
        for entry in registry_entries
        if isinstance(entry, dict)
    }
    stable_components = {
        entry["name"]
        for entry in registry_entries
        if isinstance(entry, dict) and entry.get("status") == "stable"
    }

    component_guidance = guidance["components"]
    if not isinstance(component_guidance, dict):
        raise CatalogBuildError("guidance.components должен быть объектом")
    actual_components = set(component_guidance)
    if actual_components != stable_components:
        raise CatalogBuildError(
            "guidance.components должен точно покрывать stable Registry entries; "
            f"отсутствуют={sorted(stable_components - actual_components)}, "
            f"неизвестны={sorted(actual_components - stable_components)}"
        )
    for component, entry in component_guidance.items():
        if not isinstance(entry, dict):
            raise CatalogBuildError(f"guidance.components.{component} должен быть объектом")
        require_exact_fields(
            entry,
            COMPONENT_GUIDANCE_FIELDS,
            f"guidance.components.{component}",
        )
        require_string_list(entry["useWhen"], f"{component}.useWhen", minimum=2)
        require_string_list(entry["dontUseWhen"], f"{component}.dontUseWhen", minimum=2)
        require_string_list(entry["anatomy"], f"{component}.anatomy", minimum=2)

    comparisons = guidance["comparisons"]
    if not isinstance(comparisons, list) or not comparisons:
        raise CatalogBuildError("guidance.comparisons должен быть непустым списком")
    comparison_ids: set[str] = set()
    for index, comparison in enumerate(comparisons):
        context = f"guidance.comparisons[{index}]"
        if not isinstance(comparison, dict):
            raise CatalogBuildError(f"{context} должен быть объектом")
        require_exact_fields(
            comparison,
            {"id", "title", "choices", "summary"},
            context,
        )
        identifier = validate_identifier(comparison["id"], f"{context}.id")
        if identifier in comparison_ids:
            raise CatalogBuildError(f"{context}.id повторяет {identifier}")
        comparison_ids.add(identifier)
        require_non_empty_string(comparison["title"], f"{context}.title")
        require_non_empty_string(comparison["summary"], f"{context}.summary")
        choices = comparison["choices"]
        if not isinstance(choices, list) or len(choices) < 2:
            raise CatalogBuildError(f"{context}.choices должен содержать минимум 2 выбора")
        for choice_index, choice in enumerate(choices):
            choice_context = f"{context}.choices[{choice_index}]"
            if not isinstance(choice, dict):
                raise CatalogBuildError(f"{choice_context} должен быть объектом")
            require_exact_fields(choice, {"target", "when"}, choice_context)
            validate_registry_reference(
                choice["target"], known_components, f"{choice_context}.target"
            )
            require_non_empty_string(choice["when"], f"{choice_context}.when")

    compositions = guidance["compositions"]
    if not isinstance(compositions, list) or not compositions:
        raise CatalogBuildError("guidance.compositions должен быть непустым списком")
    composition_ids: set[str] = set()
    for index, composition in enumerate(compositions):
        context = f"guidance.compositions[{index}]"
        if not isinstance(composition, dict):
            raise CatalogBuildError(f"{context} должен быть объектом")
        require_exact_fields(composition, {"id", "title", "parts", "note"}, context)
        identifier = validate_identifier(composition["id"], f"{context}.id")
        if identifier in composition_ids:
            raise CatalogBuildError(f"{context}.id повторяет {identifier}")
        composition_ids.add(identifier)
        require_non_empty_string(composition["title"], f"{context}.title")
        require_non_empty_string(composition["note"], f"{context}.note")
        for part_index, part in enumerate(
            require_string_list(composition["parts"], f"{context}.parts", minimum=2)
        ):
            validate_registry_reference(
                part,
                known_components,
                f"{context}.parts[{part_index}]",
            )

    core_vs_feature = guidance["coreVsFeature"]
    if not isinstance(core_vs_feature, dict):
        raise CatalogBuildError("guidance.coreVsFeature должен быть объектом")
    require_exact_fields(
        core_vs_feature,
        {"decisionSteps", "examples"},
        "guidance.coreVsFeature",
    )
    require_string_list(
        core_vs_feature["decisionSteps"],
        "guidance.coreVsFeature.decisionSteps",
        minimum=4,
    )
    examples = core_vs_feature["examples"]
    if not isinstance(examples, list) or not examples:
        raise CatalogBuildError("guidance.coreVsFeature.examples должен быть списком")
    for index, example in enumerate(examples):
        context = f"guidance.coreVsFeature.examples[{index}]"
        if not isinstance(example, dict):
            raise CatalogBuildError(f"{context} должен быть объектом")
        allowed = {"subject", "decision", "reason", "registryRef"}
        actual = set(example)
        required = {"subject", "decision", "reason"}
        if not required <= actual or not actual <= allowed:
            raise CatalogBuildError(f"{context}: неверные поля {sorted(actual)}")
        for field in required:
            require_non_empty_string(example[field], f"{context}.{field}")
        if "registryRef" in example:
            validate_registry_reference(
                example["registryRef"],
                known_components,
                f"{context}.registryRef",
            )

    pilot_examples = guidance["pilotExamples"]
    if not isinstance(pilot_examples, list) or not pilot_examples:
        raise CatalogBuildError("guidance.pilotExamples должен быть непустым списком")
    pilot_ids: set[str] = set()
    for index, example in enumerate(pilot_examples):
        context = f"guidance.pilotExamples[{index}]"
        if not isinstance(example, dict):
            raise CatalogBuildError(f"{context} должен быть объектом")
        require_exact_fields(
            example,
            {"id", "title", "core", "supporting", "feature", "lesson"},
            context,
        )
        identifier = validate_identifier(example["id"], f"{context}.id")
        if identifier in pilot_ids:
            raise CatalogBuildError(f"{context}.id повторяет {identifier}")
        pilot_ids.add(identifier)
        require_non_empty_string(example["title"], f"{context}.title")
        require_non_empty_string(example["lesson"], f"{context}.lesson")
        require_string_list(example["feature"], f"{context}.feature")
        for field in ("core", "supporting"):
            for item_index, item in enumerate(
                require_string_list(example[field], f"{context}.{field}")
            ):
                validate_registry_reference(
                    item,
                    known_components,
                    f"{context}.{field}[{item_index}]",
                )

    require_string_list(
        guidance["buildingFeatureSteps"],
        "guidance.buildingFeatureSteps",
        minimum=8,
    )


def code_example_source_path(value: Any, context: str, extension: str | None = None) -> Path:
    source = require_non_empty_string(value, context)
    path = Path(source)
    if path.is_absolute():
        raise CatalogBuildError(f"{context} должен быть относительным путём внутри repository")
    resolved = (REPO_ROOT / path).resolve()
    if not resolved.is_relative_to(REPO_ROOT.resolve()):
        raise CatalogBuildError(f"{context} выходит за пределы repository")
    if extension is not None and resolved.suffix != extension:
        raise CatalogBuildError(f"{context} должен указывать на файл {extension}")
    if not resolved.is_file():
        raise CatalogBuildError(f"{context}: файл {source} не найден")
    return resolved


def code_examples_model(
    code_examples: dict[str, Any], registry: dict[str, Any]
) -> dict[str, Any]:
    """Validate copy-ready examples and embed their real source in the Catalog model."""
    code_examples = copy.deepcopy(code_examples)
    require_exact_fields(
        code_examples,
        {"schemaVersion", "adapters", "components"},
        "codeExamples",
    )
    if code_examples["schemaVersion"] != 2:
        raise CatalogBuildError("codeExamples.schemaVersion должен быть равен 2")

    known_platforms = set(
        require_string_list(registry.get("platformCatalog"), "registry.platformCatalog")
    )
    registry_entries = registry.get("components")
    if not isinstance(registry_entries, list):
        raise CatalogBuildError("registry.components должен быть списком")
    entries_by_name = {
        require_non_empty_string(entry.get("name"), "registry.components[].name"): entry
        for entry in registry_entries
        if isinstance(entry, dict)
    }

    adapters = code_examples["adapters"]
    if not isinstance(adapters, dict) or not adapters:
        raise CatalogBuildError("codeExamples.adapters должен быть непустым объектом")
    for adapter_id, adapter in adapters.items():
        context = f"codeExamples.adapters.{adapter_id}"
        validate_identifier(adapter_id, f"{context}.id")
        if not isinstance(adapter, dict):
            raise CatalogBuildError(f"{context} должен быть объектом")
        require_exact_fields(adapter, {"label", "platforms", "implementations"}, context)
        require_non_empty_string(adapter["label"], f"{context}.label")
        platforms = require_string_list(adapter["platforms"], f"{context}.platforms")
        unknown_platforms = sorted(set(platforms) - known_platforms)
        if unknown_platforms:
            raise CatalogBuildError(
                f"{context}.platforms содержит неизвестные Registry platforms {unknown_platforms}"
            )
        if len(platforms) != len(set(platforms)):
            raise CatalogBuildError(f"{context}.platforms содержит повторы")
        implementations = adapter["implementations"]
        if not isinstance(implementations, dict) or not implementations:
            raise CatalogBuildError(f"{context}.implementations должен быть непустым объектом")
        for component_name, implementation in implementations.items():
            if component_name not in entries_by_name:
                raise CatalogBuildError(
                    f"{context}.implementations: неизвестный Registry component {component_name}"
                )
            code_example_source_path(
                implementation,
                f"{context}.implementations.{component_name}",
            )

    components = code_examples["components"]
    if not isinstance(components, dict) or not components:
        raise CatalogBuildError("codeExamples.components должен быть непустым объектом")
    seen_targets: set[tuple[str, str, str, str, str]] = set()
    for component_name, component in components.items():
        context = f"codeExamples.components.{component_name}"
        registry_entry = entries_by_name.get(component_name)
        if registry_entry is None:
            raise CatalogBuildError(f"{context}: component отсутствует в Registry")
        if not isinstance(component, dict):
            raise CatalogBuildError(f"{context} должен быть объектом")
        require_exact_fields(component, {"variants"}, context)
        variants = component["variants"]
        if not isinstance(variants, dict) or not variants:
            raise CatalogBuildError(f"{context}.variants должен быть непустым объектом")
        registry_variants = set(registry_entry.get("variants", []))
        canonical_files = {
            record.get("file")
            for record in registry_entry.get("implementation", {}).get("canonical", [])
            if isinstance(record, dict)
        }
        actual_variants = set(variants)
        if actual_variants != registry_variants:
            raise CatalogBuildError(
                f"{context}.variants должен точно покрывать Registry variants; "
                f"отсутствуют={sorted(registry_variants - actual_variants)}, "
                f"неизвестны={sorted(actual_variants - registry_variants)}"
            )
        for variant, example in variants.items():
            example_context = f"{context}.variants.{variant}"
            if not isinstance(example, dict):
                raise CatalogBuildError(f"{example_context} должен быть объектом")
            example_fields = {"previewLabel", "description", "targets"}
            if component_name == "IconButton":
                example_fields.add("previewIcon")
            require_exact_fields(example, example_fields, example_context)
            require_non_empty_string(example["previewLabel"], f"{example_context}.previewLabel")
            if component_name == "IconButton":
                require_non_empty_string(example["previewIcon"], f"{example_context}.previewIcon")
            require_non_empty_string(example["description"], f"{example_context}.description")
            targets = example["targets"]
            if not isinstance(targets, list) or not targets:
                raise CatalogBuildError(f"{example_context}.targets должен быть непустым списком")
            target_labels: set[str] = set()
            for target_index, target in enumerate(targets):
                target_context = f"{example_context}.targets[{target_index}]"
                if not isinstance(target, dict):
                    raise CatalogBuildError(f"{target_context} должен быть объектом")
                require_exact_fields(
                    target,
                    {
                        "platforms",
                        "targetLabel",
                        "adapter",
                        "language",
                        "languageLabel",
                        "file",
                    },
                    target_context,
                )
                platforms = require_string_list(
                    target["platforms"], f"{target_context}.platforms"
                )
                unknown_platforms = sorted(set(platforms) - known_platforms)
                if unknown_platforms:
                    raise CatalogBuildError(
                        f"{target_context}.platforms содержит неизвестные Registry platforms "
                        f"{unknown_platforms}"
                    )
                if len(platforms) != len(set(platforms)):
                    raise CatalogBuildError(f"{target_context}.platforms содержит повторы")
                target_label = require_non_empty_string(
                    target["targetLabel"], f"{target_context}.targetLabel"
                )
                if target_label in target_labels:
                    raise CatalogBuildError(
                        f"{target_context}.targetLabel повторяет {target_label}"
                    )
                target_labels.add(target_label)
                adapter_id = validate_identifier(target["adapter"], f"{target_context}.adapter")
                adapter = adapters.get(adapter_id)
                if adapter is None:
                    raise CatalogBuildError(f"{target_context}.adapter: неизвестный adapter {adapter_id}")
                unsupported_platforms = sorted(set(platforms) - set(adapter["platforms"]))
                if unsupported_platforms:
                    raise CatalogBuildError(
                        f"{target_context}: adapter {adapter_id} не поддерживает platforms "
                        f"{unsupported_platforms}"
                    )
                adapter_implementation = adapter["implementations"].get(component_name)
                if adapter_implementation is None:
                    raise CatalogBuildError(
                        f"{target_context}: adapter {adapter_id} не объявляет implementation "
                        f"для {component_name}"
                    )
                if adapter_implementation not in canonical_files:
                    raise CatalogBuildError(
                        f"{target_context}: implementation adapter {adapter_id} не является "
                        f"canonical Registry implementation для {component_name}"
                    )
                language = validate_identifier(target["language"], f"{target_context}.language")
                extension = CODE_EXAMPLE_EXTENSIONS.get(language)
                if extension is None:
                    raise CatalogBuildError(
                        f"{target_context}.language: неподдерживаемый source language {language}"
                    )
                require_non_empty_string(target["languageLabel"], f"{target_context}.languageLabel")
                source_path = code_example_source_path(
                    target["file"], f"{target_context}.file", extension
                )
                source = source_path.read_text(encoding="utf-8")
                if not source.strip():
                    raise CatalogBuildError(f"{target_context}.file должен быть непустым")
                for platform in platforms:
                    uniqueness_key = (
                        component_name,
                        variant,
                        platform,
                        adapter_id,
                        language,
                    )
                    if uniqueness_key in seen_targets:
                        raise CatalogBuildError(
                            f"{target_context} перекрывает уже объявленный "
                            f"component/variant/platform/adapter/language target"
                        )
                    seen_targets.add(uniqueness_key)
                target["code"] = source.rstrip() + "\n"

    return code_examples


def kebab_case(value: str) -> str:
    with_acronyms = re.sub(r"([A-Z]+)([A-Z][a-z])", r"\1-\2", value)
    return re.sub(r"([a-z0-9])([A-Z])", r"\1-\2", with_acronyms).lower()


def registry_model(registry: dict[str, Any]) -> dict[str, Any]:
    entries = registry["components"]
    statuses = list(registry["governance"]["lifecycleOrder"])
    levels = list(registry["levels"])
    categories = list(registry["categories"])
    platforms = list(registry["platformCatalog"])

    by_status = Counter(entry["status"] for entry in entries)
    by_level = Counter(entry["level"] for entry in entries)
    by_category = Counter(entry["category"] for entry in entries)
    by_platform_target = Counter(
        platform for entry in entries for platform in entry["platforms"]
    )
    by_platform_canonical = {
        platform: sum(
            any(
                implementation["platform"] == platform
                for implementation in entry["implementation"]["canonical"]
            )
            for entry in entries
        )
        for platform in platforms
    }

    records = []
    for entry in entries:
        slug = kebab_case(entry["name"])
        route = f"{ROUTE_SEGMENTS[entry['level']]}/{slug}"
        search_parts = [
            entry["name"],
            *entry["synonyms"],
            entry["category"],
            entry["level"],
            entry["status"],
            entry["purpose"],
            *entry["variants"],
            *entry["sizes"],
            *entry["states"],
        ]
        if entry["replacement"]:
            search_parts.append(entry["replacement"])
        records.append(
            {
                "slug": slug,
                "route": route,
                "searchText": " ".join(search_parts).casefold(),
                "registry": entry,
            }
        )

    return {
        "schemaVersion": registry["schemaVersion"],
        "registryVersion": registry["registryVersion"],
        "catalogVersions": registry["catalogVersions"],
        "description": registry["description"],
        "lifecycle": registry["lifecycle"],
        "governance": registry["governance"],
        "levels": levels,
        "categories": categories,
        "platformCatalog": platforms,
        "platformSemantics": registry["platformSemantics"],
        "counts": {
            "total": len(entries),
            "byStatus": {status: by_status[status] for status in statuses},
            "byLevel": {level: by_level[level] for level in levels},
            "byCategory": {category: by_category[category] for category in categories},
            "byPlatformTarget": {
                platform: by_platform_target[platform] for platform in platforms
            },
            "byPlatformCanonical": {
                platform: by_platform_canonical[platform] for platform in platforms
            },
            "byLevelAndStatus": {
                level: {
                    status: sum(
                        entry["level"] == level and entry["status"] == status
                        for entry in entries
                    )
                    for status in statuses
                }
                for level in levels
            },
        },
        "entries": records,
    }


def count_dtcg_tokens(value: Any) -> int:
    if isinstance(value, dict):
        if "$value" in value:
            return 1
        return sum(count_dtcg_tokens(child) for child in value.values())
    if isinstance(value, list):
        return sum(count_dtcg_tokens(child) for child in value)
    return 0


def flatten_dtcg_values(
    value: Any,
    prefix: tuple[str, ...] = (),
) -> dict[str, Any]:
    if not isinstance(value, dict):
        return {}
    if "$value" in value:
        if not prefix:
            raise CatalogBuildError("DTCG token не имеет canonical path")
        return {".".join(prefix): value["$value"]}
    flattened: dict[str, Any] = {}
    for key, child in value.items():
        if key.startswith("$"):
            continue
        child_values = flatten_dtcg_values(child, (*prefix, key))
        duplicate = flattened.keys() & child_values.keys()
        if duplicate:
            raise CatalogBuildError(f"Повторный DTCG token {sorted(duplicate)[0]}")
        flattened.update(child_values)
    return flattened


def merge_token_values(*token_sets: dict[str, Any]) -> dict[str, Any]:
    merged: dict[str, Any] = {}
    for token_set in token_sets:
        duplicate = merged.keys() & token_set.keys()
        if duplicate:
            raise CatalogBuildError(
                f"Token sources повторяют canonical path {sorted(duplicate)[0]}"
            )
        merged.update(token_set)
    return merged


def color_literal(value: Any, context: str) -> str:
    """Return a compact, browser-safe representation of a DTCG sRGB color."""
    if isinstance(value, str) and value.startswith("#"):
        return value.upper()
    if not isinstance(value, dict):
        raise CatalogBuildError(f"{context}: color value должен быть DTCG color")
    hex_value = value.get("hex")
    alpha = value.get("alpha")
    if (
        not isinstance(hex_value, str)
        or not re.fullmatch(r"#[0-9A-Fa-f]{6}", hex_value)
        or not isinstance(alpha, (int, float))
        or isinstance(alpha, bool)
        or not 0 <= alpha <= 1
    ):
        raise CatalogBuildError(f"{context}: color value имеет неверные hex/alpha")
    result = hex_value.upper()
    if alpha < 1:
        result += f"{round(alpha * 255):02X}"
    return result


def flatten_resolved_colors(
    value: Any,
    prefix: tuple[str, ...] = (),
) -> dict[str, str]:
    """Collect only resolved color leaves from a mixed resolved-token tree."""
    if isinstance(value, dict) and {"colorSpace", "components", "alpha", "hex"} <= set(value):
        if not prefix:
            raise CatalogBuildError("Resolved color не имеет canonical path")
        path = ".".join(prefix)
        return {path: color_literal(value, path)}
    if not isinstance(value, dict):
        return {}
    flattened: dict[str, str] = {}
    for key, child in value.items():
        child_values = flatten_resolved_colors(child, (*prefix, key))
        duplicate = flattened.keys() & child_values.keys()
        if duplicate:
            raise CatalogBuildError(f"Повторный resolved color {sorted(duplicate)[0]}")
        flattened.update(child_values)
    return flattened


def resolved_color_for(
    canonical_name: str,
    flattened: dict[str, str],
    context: str,
) -> str:
    """Match a canonical token even if the resolved payload already scopes its root."""
    if canonical_name in flattened:
        return flattened[canonical_name]
    canonical_parts = canonical_name.split(".")
    matches: list[tuple[int, str]] = []
    for candidate, resolved_value in flattened.items():
        candidate_parts = candidate.split(".")
        if (
            len(candidate_parts) <= len(canonical_parts)
            and canonical_parts[-len(candidate_parts) :] == candidate_parts
        ) or (
            len(canonical_parts) <= len(candidate_parts)
            and candidate_parts[-len(canonical_parts) :] == canonical_parts
        ):
            matches.append((min(len(candidate_parts), len(canonical_parts)), resolved_value))
    if not matches:
        raise CatalogBuildError(f"{context}: нет resolved color для {canonical_name}")
    longest = max(score for score, _ in matches)
    values = {value for score, value in matches if score == longest}
    if len(values) != 1:
        raise CatalogBuildError(f"{context}: resolved color {canonical_name} неоднозначен")
    return values.pop()


def color_alias_trace(
    name: str,
    raw_value: Any,
    lookup: dict[str, Any],
) -> tuple[list[str], str]:
    """Resolve one color while retaining the alias targets after the record name."""
    trace: list[str] = []
    seen = {name}
    value = raw_value
    while isinstance(value, str):
        match = TOKEN_ALIAS_RE.fullmatch(value)
        if not match:
            return trace, color_literal(value, name)
        target = match.group(1)
        if target in seen:
            cycle = " → ".join((name, *trace, target))
            raise CatalogBuildError(f"Циклическая token alias chain: {cycle}")
        if target not in lookup:
            raise CatalogBuildError(f"{name}: alias ссылается на отсутствующий {target}")
        trace.append(target)
        seen.add(target)
        value = lookup[target]
    return trace, color_literal(value, name)


def token_alias_trace(
    name: str,
    raw_value: Any,
    lookup: dict[str, Any],
) -> tuple[list[str], Any]:
    """Resolve a generic DTCG alias chain while retaining every canonical target."""
    trace: list[str] = []
    seen = {name}
    value = raw_value
    while isinstance(value, str):
        match = TOKEN_ALIAS_RE.fullmatch(value)
        if not match:
            return trace, value
        target = match.group(1)
        if target in seen:
            cycle = " → ".join((name, *trace, target))
            raise CatalogBuildError(f"Циклическая token alias chain: {cycle}")
        if target not in lookup:
            raise CatalogBuildError(f"{name}: alias ссылается на отсутствующий {target}")
        trace.append(target)
        seen.add(target)
        value = lookup[target]
    return trace, value


def compact_component_value(value: Any, context: str) -> Any:
    """Keep component trace values exact but compact enough for the browser model."""
    if isinstance(value, dict):
        if {"colorSpace", "components", "alpha", "hex"} <= set(value):
            return color_literal(value, context)
        if set(value) == {"value", "unit"}:
            number = value["value"]
            unit = value["unit"]
            if not isinstance(number, (int, float)) or isinstance(number, bool):
                raise CatalogBuildError(f"{context}.value должен быть числом")
            if not isinstance(unit, str):
                raise CatalogBuildError(f"{context}.unit должен быть строкой")
            return f"{number:g}{unit}"
        return {
            key: compact_component_value(child, f"{context}.{key}")
            for key, child in value.items()
        }
    if isinstance(value, list):
        return [
            compact_component_value(child, f"{context}[{index}]")
            for index, child in enumerate(value)
        ]
    if isinstance(value, (str, int, float)) and not isinstance(value, bool):
        return value
    raise CatalogBuildError(f"{context}: неподдерживаемое resolved token value")


def nested_alias_branches(
    value: Any,
    lookup: dict[str, Any],
    prefix: tuple[str, ...] = (),
) -> list[dict[str, Any]]:
    """Expose branches inside composite typography/shadow token values."""
    if isinstance(value, str) and TOKEN_ALIAS_RE.fullmatch(value):
        label = ".".join(prefix) or "value"
        trace, _ = token_alias_trace(label, value, lookup)
        return [{"property": label, "trace": trace}]
    if isinstance(value, dict):
        return [
            branch
            for key, child in value.items()
            for branch in nested_alias_branches(child, lookup, (*prefix, key))
        ]
    if isinstance(value, list):
        return [
            branch
            for index, child in enumerate(value)
            for branch in nested_alias_branches(child, lookup, (*prefix, str(index)))
        ]
    return []


def component_foundation(trace: list[str]) -> tuple[str | None, str | None, str]:
    """Map an exact alias trace to its Catalog foundation destination."""
    routes = (
        ("foundations/colors", ("color.context.", "color.alias.", "color.primitive.", "color.static."), "Color"),
        ("foundations/typography", ("typography.", "font."), "Typography"),
        (
            "foundations/dimensions",
            (
                "spacing.", "radius.", "border.width.", "dimension.", "opacity.",
            ),
            "Dimensions",
        ),
        ("foundations/elevation", ("elevation.",), "Elevation"),
        ("foundations/motion", ("motion.",), "Motion"),
        ("foundations/media", ("media.",), "Media"),
    )
    for route, prefixes, label in routes:
        for target in trace:
            if target.startswith(prefixes):
                return route, target, label
    return None, None, "Component-specific"


def value_at_path(root: dict[str, Any], path: list[str], context: str) -> Any:
    value: Any = root
    for segment in path:
        if not isinstance(value, dict) or segment not in value:
            raise CatalogBuildError(f"{context}: resolved token path отсутствует")
        value = value[segment]
    return value


def component_token_records(
    raw_sources: dict[str, dict[str, Any]],
    color_record_list: list[dict[str, Any]],
    themes: dict[str, Any],
) -> dict[str, list[dict[str, Any]]]:
    """Build complete Component → Foundation → Primitive trace records."""
    component_values = flatten_dtcg_values(raw_sources["components"])
    common_lookup = merge_token_values(
        *(
            flatten_dtcg_values(raw_sources[key])
            for key in ("primitives", "foundations", "typography", "components")
        )
    )

    color_lookups: dict[str, dict[str, Any]] = {"light": {}, "dark": {}}
    for record in color_record_list:
        for theme in ("light", "dark"):
            if record["layer"] in {"primitive", "static", "context"}:
                color_lookups[theme][record["name"]] = record["value"]
            else:
                color_lookups[theme][record["name"]] = record[theme]["value"]

    lookups: dict[str, dict[str, Any]] = {}
    for theme in ("light", "dark"):
        theme_values = {
            name: value
            for name, value in flatten_dtcg_values(raw_sources[theme]).items()
            if not name.startswith("color.")
        }
        lookups[theme] = merge_token_values(
            common_lookup,
            theme_values,
            color_lookups[theme],
        )

    records_by_group: dict[str, list[dict[str, Any]]] = {}
    for name, raw_value in component_values.items():
        parts = name.split(".")
        if len(parts) < 3 or parts[0] != "component":
            raise CatalogBuildError(f"Component token имеет неверный path {name}")
        group = parts[1]
        theme_records: dict[str, dict[str, Any]] = {}
        for theme in ("light", "dark"):
            trace, final_raw = token_alias_trace(name, raw_value, lookups[theme])
            resolved_value = value_at_path(
                themes[theme]["component"],
                parts[1:],
                f"{theme}.{name}",
            )
            theme_records[theme] = {
                "trace": trace,
                "branches": nested_alias_branches(final_raw, lookups[theme]),
                "resolved": compact_component_value(resolved_value, f"{theme}.{name}"),
            }

        route, foundation_token, foundation_label = component_foundation(
            list(dict.fromkeys(
                theme_records["light"]["trace"] + theme_records["dark"]["trace"]
            ))
        )
        record: dict[str, Any] = {
            "name": name,
            "source": compact_component_value(raw_value, f"source.{name}"),
            "foundation": {
                "route": route,
                "token": foundation_token,
                "label": foundation_label,
            },
        }
        if theme_records["light"] == theme_records["dark"]:
            record.update(theme_records["light"])
            record["themeDependent"] = False
        else:
            record["light"] = theme_records["light"]
            record["dark"] = theme_records["dark"]
            record["themeDependent"] = True
        records_by_group.setdefault(group, []).append(record)

    for records in records_by_group.values():
        records.sort(key=lambda record: natural_token_key(record["name"]))
    resolved_groups = set(themes["light"]["component"])
    if set(records_by_group) != resolved_groups:
        raise CatalogBuildError(
            "Component trace groups расходятся с resolved payload: "
            f"source={sorted(records_by_group)}, resolved={sorted(resolved_groups)}"
        )
    return dict(sorted(records_by_group.items()))


def natural_token_key(name: str) -> tuple[tuple[int, Any], ...]:
    return tuple(
        (0, int(part)) if part.isdigit() else (1, part)
        for part in name.split(".")
    )


def context_family_metadata(document: dict[str, Any]) -> list[dict[str, str]]:
    """Expose the canonical Context usage guidance without duplicating copy in Catalog."""
    try:
        context = document["color"]["context"]
    except (KeyError, TypeError) as exc:
        raise CatalogBuildError("Context token source имеет неверную структуру") from exc
    if not isinstance(context, dict):
        raise CatalogBuildError("Context token source color.context должен быть объектом")
    actual = {key for key in context if not key.startswith("$")}
    expected = set(CONTEXT_FAMILY_ORDER)
    if actual != expected:
        raise CatalogBuildError(
            "Context families расходятся с Catalog contract: "
            f"отсутствуют={sorted(expected - actual)}, неизвестны={sorted(actual - expected)}"
        )
    metadata: list[dict[str, str]] = []
    for family in CONTEXT_FAMILY_ORDER:
        group = context[family]
        if not isinstance(group, dict):
            raise CatalogBuildError(f"Context family {family} должен быть объектом")
        description = require_non_empty_string(
            group.get("$description"),
            f"Context family {family}.$description",
        )
        metadata.append(
            {
                "id": family,
                "title": family.title(),
                "allowedSurfaces": description,
            }
        )
    return metadata


def color_records(
    manifest: dict[str, Any],
    resolved: dict[str, Any],
) -> list[dict[str, Any]]:
    """Normalize the generated color manifest and attach compact theme resolution."""
    if manifest.get("schemaVersion") != 1:
        raise CatalogBuildError("Color manifest schemaVersion должен быть равен 1")
    layers = manifest.get("layers")
    if not isinstance(layers, dict):
        raise CatalogBuildError("Color manifest layers должен быть объектом")
    required_layers = {"primitive", "alias", "context", "static", "component"}
    if set(layers) != required_layers:
        raise CatalogBuildError(
            "Color manifest layers расходятся с контрактом: "
            f"отсутствуют={sorted(required_layers - set(layers))}, "
            f"неизвестны={sorted(set(layers) - required_layers)}"
        )

    def record_map(
        entries: Any,
        layer: str,
        *,
        themed: bool = False,
    ) -> dict[str, dict[str, Any]]:
        if not isinstance(entries, list) or not entries:
            raise CatalogBuildError(f"Color manifest {layer} должен быть непустым списком")
        mapped: dict[str, dict[str, Any]] = {}
        prefix = f"color.{layer}."
        for index, entry in enumerate(entries):
            context = f"color manifest {layer}[{index}]"
            if not isinstance(entry, dict):
                raise CatalogBuildError(f"{context} должен быть объектом")
            fields = set(entry)
            if themed:
                if fields not in ({"name", "type", "alias"}, {"name", "type", "value"}):
                    raise CatalogBuildError(f"{context}: неверные поля {sorted(fields)}")
            elif fields != {"name", "type", "value"}:
                raise CatalogBuildError(f"{context}: неверные поля {sorted(fields)}")
            name = require_non_empty_string(entry.get("name"), f"{context}.name")
            if not name.startswith(prefix):
                raise CatalogBuildError(f"{context}.name должен начинаться с {prefix}")
            if entry.get("type") != "color":
                raise CatalogBuildError(f"{context}.type должен быть color")
            if name in mapped:
                raise CatalogBuildError(f"Color manifest повторяет {name}")
            mapped[name] = entry
        return mapped

    try:
        core_colors = flatten_resolved_colors(resolved["core"])
        resolved_themes = {
            theme: flatten_resolved_colors(resolved["themes"][theme])
            for theme in ("light", "dark")
        }
    except (KeyError, TypeError) as exc:
        raise CatalogBuildError("Resolved color payload имеет неверную структуру") from exc

    primitive_manifest = record_map(layers["primitive"], "primitive")
    static_manifest = record_map(layers["static"], "static")
    context_manifest = record_map(layers["context"], "context", themed=True)
    alias_layer = layers["alias"]
    if not isinstance(alias_layer, dict) or set(alias_layer) != {"light", "dark"}:
        raise CatalogBuildError("Color manifest alias должен содержать Light/Dark")
    alias_manifest = {
        theme: record_map(alias_layer[theme], "alias", themed=True)
        for theme in ("light", "dark")
    }
    if set(alias_manifest["light"]) != set(alias_manifest["dark"]):
        raise CatalogBuildError("Color manifest Light/Dark alias paths расходятся")

    primitive_values = {
        name: color_literal(entry["value"], name)
        for name, entry in primitive_manifest.items()
    }
    static_values = {
        name: color_literal(entry["value"], name)
        for name, entry in static_manifest.items()
    }
    for name, expected in (*primitive_values.items(), *static_values.items()):
        actual = resolved_color_for(name, core_colors, name)
        if actual != expected:
            raise CatalogBuildError(f"{name}: manifest={expected}, resolved={actual}")

    alias_values = {
        theme: {
            name: entry.get("alias", entry.get("value"))
            for name, entry in alias_manifest[theme].items()
        }
        for theme in ("light", "dark")
    }
    context_values = {
        name: entry.get("alias", entry.get("value"))
        for name, entry in context_manifest.items()
    }

    records: list[dict[str, Any]] = []
    records.extend(
        {"name": name, "layer": "primitive", "type": "color", "value": value}
        for name, value in sorted(primitive_values.items(), key=lambda item: natural_token_key(item[0]))
    )

    for name in sorted(alias_values["light"], key=natural_token_key):
        record: dict[str, Any] = {"name": name, "layer": "alias", "type": "color"}
        for theme in ("light", "dark"):
            raw_value = alias_values[theme][name]
            lookup = merge_token_values(primitive_values, static_values, alias_values[theme])
            trace, computed = color_alias_trace(name, raw_value, lookup)
            generated = resolved_color_for(name, resolved_themes[theme], f"{theme}.{name}")
            if generated != computed:
                raise CatalogBuildError(
                    f"{theme}.{name}: raw alias resolves to {computed}, generated payload contains {generated}"
                )
            record[theme] = {
                "value": raw_value if isinstance(raw_value, str) else color_literal(raw_value, name),
                "resolved": generated,
                "trace": trace,
            }
        records.append(record)

    for name, raw_value in sorted(context_values.items(), key=lambda item: natural_token_key(item[0])):
        if not isinstance(raw_value, str) or not TOKEN_ALIAS_RE.fullmatch(raw_value):
            raise CatalogBuildError(f"{name}: Context color должен быть alias")
        record = {
            "name": name,
            "layer": "context",
            "type": "color",
            "value": raw_value,
        }
        for theme in ("light", "dark"):
            lookup = merge_token_values(
                primitive_values,
                static_values,
                alias_values[theme],
                context_values,
            )
            trace, computed = color_alias_trace(name, raw_value, lookup)
            if not trace or not trace[0].startswith("color.alias."):
                raise CatalogBuildError(f"{name}: Context color должен ссылаться на Alias")
            generated = resolved_color_for(name, resolved_themes[theme], f"{theme}.{name}")
            if generated != computed:
                raise CatalogBuildError(
                    f"{theme}.{name}: raw alias resolves to {computed}, generated payload contains {generated}"
                )
            record[theme] = {"resolved": generated, "trace": trace}
        records.append(record)

    records.extend(
        {"name": name, "layer": "static", "type": "color", "value": value}
        for name, value in sorted(static_values.items(), key=lambda item: natural_token_key(item[0]))
    )
    return records


def compact_foundation_value(value: Any, context: str) -> str | int | float:
    if isinstance(value, bool):
        raise CatalogBuildError(f"{context}: boolean не является foundation value")
    if isinstance(value, (int, float)):
        return value
    if isinstance(value, dict) and set(value) == {"value", "unit"}:
        number = value["value"]
        unit = value["unit"]
        if (
            isinstance(number, bool)
            or not isinstance(number, (int, float))
            or not isinstance(unit, str)
            or not unit
        ):
            raise CatalogBuildError(f"{context}: неверное dimension value")
        return f"{number}{unit}"
    raise CatalogBuildError(f"{context}: неподдерживаемое foundation value")


def foundation_record_group(name: str) -> str:
    for prefix in (
        "border.width",
        "dimension",
        "opacity",
        "spacing",
        "radius",
    ):
        if name == prefix or name.startswith(prefix + "."):
            return prefix
    raise CatalogBuildError(f"Foundation manifest содержит неизвестную группу {name}")


def foundation_records(manifest: dict[str, Any]) -> list[dict[str, Any]]:
    """Normalize the canonical generated Dimension→Semantic manifest."""
    require_exact_fields(
        manifest,
        {"schemaVersion", "generatedFrom", "layers"},
        "foundation manifest",
    )
    if manifest["schemaVersion"] != 1:
        raise CatalogBuildError("Foundation manifest schemaVersion должен быть 1")
    require_string_list(manifest["generatedFrom"], "foundation manifest.generatedFrom")
    layers = manifest["layers"]
    if not isinstance(layers, dict):
        raise CatalogBuildError("Foundation manifest layers должен быть объектом")
    require_exact_fields(layers, {"primitive", "semantic"}, "foundation manifest.layers")

    primitive_values: dict[str, str | int | float] = {}
    normalized: list[dict[str, Any]] = []
    for layer in ("primitive", "semantic"):
        entries = layers[layer]
        if not isinstance(entries, list) or not entries:
            raise CatalogBuildError(f"Foundation manifest {layer} должен быть непустым списком")
        for index, entry in enumerate(entries):
            context = f"foundation manifest.{layer}[{index}]"
            if not isinstance(entry, dict):
                raise CatalogBuildError(f"{context} должен быть объектом")
            expected = (
                {"layer", "name", "type", "value", "resolved"}
                if layer == "primitive"
                else {"layer", "name", "type", "alias", "resolved"}
            )
            require_exact_fields(entry, expected, context)
            if entry["layer"] != layer:
                raise CatalogBuildError(f"{context}.layer должен быть {layer}")
            name = require_non_empty_string(entry["name"], f"{context}.name")
            group = foundation_record_group(name)
            token_type = entry["type"]
            if token_type not in {"dimension", "number"}:
                raise CatalogBuildError(f"{context}.type должен быть dimension/number")
            if any(record["name"] == name for record in normalized):
                raise CatalogBuildError(f"Foundation manifest повторяет {name}")
            resolved = compact_foundation_value(entry["resolved"], f"{context}.resolved")
            if layer == "primitive":
                value = compact_foundation_value(entry["value"], f"{context}.value")
                if value != resolved:
                    raise CatalogBuildError(f"{context}: Primitive value/resolved расходятся")
                primitive_values[name] = value
                normalized.append(
                    {"name": name, "layer": layer, "group": group, "type": token_type, "value": value}
                )
                continue
            alias = require_non_empty_string(entry["alias"], f"{context}.alias")
            match = TOKEN_ALIAS_RE.fullmatch(alias)
            if not match or match.group(1) not in primitive_values:
                raise CatalogBuildError(f"{context}.alias должен ссылаться на Primitive")
            if primitive_values[match.group(1)] != resolved:
                raise CatalogBuildError(f"{context}: alias/resolved расходятся")
            normalized.append(
                {
                    "name": name,
                    "layer": layer,
                    "group": group,
                    "type": token_type,
                    "alias": alias,
                    "resolved": resolved,
                }
            )

    primitives = [record for record in normalized if record["layer"] == "primitive"]
    semantics = [record for record in normalized if record["layer"] == "semantic"]

    def numeric_value(record: dict[str, Any]) -> float:
        value = record.get("value", record.get("resolved"))
        if isinstance(value, (int, float)):
            return float(value)
        match = re.fullmatch(r"(-?(?:\d+(?:\.\d+)?|\.\d+))[A-Za-z%]+", value)
        if not match:
            raise CatalogBuildError(f"{record['name']}: не удалось отсортировать value")
        return float(match.group(1))

    primitives.sort(
        key=lambda record: (
            {
                "dimension": 0,
                "opacity": 1,
            }[record["group"]],
            numeric_value(record),
            natural_token_key(record["name"]),
        )
    )
    group_order = {name: index for index, name in enumerate(
        ("spacing", "radius", "border.width")
    )}
    semantics.sort(
        key=lambda record: (
            group_order[record["group"]],
            numeric_value(record),
            natural_token_key(record["name"]),
        )
    )
    return [*primitives, *semantics]


def foundations_model() -> dict[str, Any]:
    raw_sources = {key: load_json(path) for key, path in TOKEN_SOURCES.items()}
    resolved = load_json(RESOLVED_TOKENS_PATH)
    color_manifest = load_json(COLOR_TOKENS_PATH)
    foundation_manifest = load_json(FOUNDATION_TOKENS_PATH)
    typography_manifest = load_json(TYPOGRAPHY_TOKENS_PATH)
    try:
        core = resolved["core"]
        themes = resolved["themes"]
        light = themes["light"]
        dark = themes["dark"]
    except (KeyError, TypeError) as exc:
        raise CatalogBuildError(
            f"{relative(RESOLVED_TOKENS_PATH)} имеет неверную структуру"
        ) from exc

    light_component_groups = set(light["component"])
    dark_component_groups = set(dark["component"])
    if light_component_groups != dark_component_groups:
        raise CatalogBuildError("Light/Dark component token groups расходятся")

    color_record_list = color_records(color_manifest, resolved)
    layer_counts = Counter(record["layer"] for record in color_record_list)
    ramp = color_manifest.get("ramp")
    if not isinstance(ramp, dict):
        raise CatalogBuildError("Color manifest ramp должен быть объектом")
    color_policy = color_manifest.get("policy")
    color_migrations = color_manifest.get("migrations")
    if not isinstance(color_policy, dict):
        raise CatalogBuildError("Color manifest policy должен быть объектом")
    if color_policy.get("publicApiLayers") != ["context"]:
        raise CatalogBuildError("Color manifest должен публиковать только Context layer")
    if not isinstance(color_migrations, list):
        raise CatalogBuildError("Color manifest migrations должен быть списком")
    foundation_record_list = foundation_records(foundation_manifest)
    foundation_layer_counts = Counter(
        record["layer"] for record in foundation_record_list
    )
    foundation_group_counts = Counter(
        record["group"] for record in foundation_record_list
    )
    component_trace = component_token_records(
        raw_sources,
        color_record_list,
        themes,
    )

    return {
        "sourceTokenCounts": {
            key: count_dtcg_tokens(document) for key, document in raw_sources.items()
        },
        "colors": {
            "ramp": ramp,
            "policy": color_policy,
            "migrations": color_migrations,
            "contextFamilies": context_family_metadata(raw_sources["context"]),
            "layerCounts": {
                layer: layer_counts[layer]
                for layer in COLOR_LAYERS
            },
            "records": color_record_list,
        },
        "dimensions": {
            "layerCounts": {
                layer: foundation_layer_counts[layer]
                for layer in ("primitive", "semantic")
            },
            "groupCounts": {
                group: foundation_group_counts[group]
                for group in (
                    "dimension",
                    "opacity",
                    "spacing",
                    "radius",
                    "border.width",
                )
            },
            "records": foundation_record_list,
        },
        "typography": typography_manifest,
        "borderStyles": core["border"]["style"],
        "elevation": {
            "light": light["elevation"],
            "dark": dark["elevation"],
        },
        "motion": core["motion"],
        "breakpoints": core["breakpoint"],
        "media": core["media"],
        "componentTokenTrace": component_trace,
        "componentTokenGroups": sorted(light_component_groups),
    }


def icons_model() -> dict[str, Any]:
    index = load_json(ICONS_PATH)
    return {
        "count": len(index["glyphs"]),
        "index": relative(ICONS_PATH),
        "styles": ["line", "solid", "duotone"],
    }


def build_model() -> dict[str, Any]:
    registry = load_json(REGISTRY_PATH)
    guidance = load_json(GUIDANCE_PATH)
    validate_guidance(guidance, registry)
    code_examples = code_examples_model(load_json(CODE_EXAMPLES_PATH), registry)
    stress_fixtures = load_json(STRESS_FIXTURES_PATH)
    return {
        "schemaVersion": 1,
        "runtimeAssets": {
            "iconography": hashlib.sha256((SYSTEM_ROOT / "web" / "iconography.js").read_bytes()).hexdigest()[:16],
        },
        "generatedFrom": {
            "registry": relative(REGISTRY_PATH),
            "guidance": relative(GUIDANCE_PATH),
            "codeExamples": relative(CODE_EXAMPLES_PATH),
            "resolvedTokens": relative(RESOLVED_TOKENS_PATH),
            "colorTokens": relative(COLOR_TOKENS_PATH),
            "foundationTokens": relative(FOUNDATION_TOKENS_PATH),
            "typographyTokens": relative(TYPOGRAPHY_TOKENS_PATH),
            "tokenSources": [relative(path) for path in TOKEN_SOURCES.values()],
            "icons": relative(ICONS_PATH),
            "stressFixtures": relative(STRESS_FIXTURES_PATH),
        },
        "registry": registry_model(registry),
        "foundations": foundations_model(),
        "icons": icons_model(),
        "codeExamples": code_examples,
        "stressFixtures": stress_fixtures,
        "guidance": guidance,
    }


def render_model(model: dict[str, Any]) -> str:
    return json.dumps(model, ensure_ascii=False, separators=(",", ":")) + "\n"


def write_or_check(expected: str, check: bool) -> int:
    actual = OUTPUT_PATH.read_text(encoding="utf-8") if OUTPUT_PATH.exists() else None
    if actual == expected:
        print("Design System Catalog model: output актуален.")
        return 0
    if check:
        print(
            f"Design System Catalog model устарел: {relative(OUTPUT_PATH)}\n"
            "Запустите: python3 design/design-system/scripts/build_catalog.py",
            file=sys.stderr,
        )
        return 1
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(expected, encoding="utf-8")
    print(f"Design System Catalog model: обновлён {relative(OUTPUT_PATH)}.")
    return 0


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--check",
        action="store_true",
        help="ничего не менять и завершиться ошибкой при устаревшем model",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    try:
        model = build_model()
    except CatalogBuildError as exc:
        print(f"Design System Catalog error: {exc}", file=sys.stderr)
        return 1
    return write_or_check(render_model(model), args.check)


if __name__ == "__main__":
    raise SystemExit(main())
