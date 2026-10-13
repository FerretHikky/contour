#!/usr/bin/env python3
"""Validate the machine-readable Reflower Core UI component registry."""

from __future__ import annotations

import argparse
import json
import re
import sys
from collections import Counter
from pathlib import Path
from typing import Any


REPO_ROOT = Path(__file__).resolve().parents[3]
DEFAULT_REGISTRY = REPO_ROOT / "design" / "design-system" / "component-registry.json"

PASCAL_CASE = re.compile(r"^[A-Z][A-Za-z0-9]*$")
SEMVER = re.compile(r"^\d+\.\d+\.\d+$")
SIMPLE_CLASS_SYMBOL = re.compile(r"^\.([a-z][a-z0-9_-]*)$")
LIFECYCLE = {"experimental", "beta", "stable", "deprecated"}
LIFECYCLE_ORDER = ["experimental", "beta", "stable", "deprecated"]
LEVELS = {"primitive", "component", "pattern"}
STABLE_STRATEGY_PLATFORMS = {"web", "ios", "android"}
REQUIRED_REGISTRY_KEYS = {
    "schemaVersion",
    "registryVersion",
    "catalogVersions",
    "description",
    "lifecycle",
    "governance",
    "levels",
    "categories",
    "platformCatalog",
    "platformSemantics",
    "components",
}
CATALOG_VERSION_ROUTES = {
    "foundations/colors",
    "foundations/dimensions",
    "foundations/typography",
    "foundations/elevation",
    "foundations/motion",
    "foundations/grid",
    "foundations/icons",
    "foundations/media",
    "primitives",
    "components",
    "patterns",
    "guidelines/terminology",
    "guidelines/comparisons",
    "guidelines/composition",
    "guidelines/core-or-feature",
    "guidelines/real-product",
    "guidelines/do-dont",
    "guidelines/building-feature",
    "guidelines/accessibility",
    "guidelines/specimens",
    "guidelines/migration",
}
GOVERNANCE_KEYS = {
    "lifecycleOrder",
    "promotionCriteria",
    "stableArtifacts",
    "catalogPlacement",
    "patternPromotion",
}
PROMOTION_CRITERIA_KEYS = {"experimentalToBeta", "betaToStable"}
PROMOTION_STAGE_KEYS = {
    "minimumIndependentProductionUseCases",
    "requiredEvidence",
}
STABLE_ARTIFACT_KEYS = {"documentation", "catalogs", "contractTests"}
CATALOG_PLACEMENT_KEYS = {
    "componentLevel",
    "templateLevel",
    "templateRoute",
    "templateDefinition",
    "minimumTemplateDependencies",
}
MINIMUM_TEMPLATE_DEPENDENCIES = 2
PATTERN_PROMOTION_KEYS = {"minimumIndependentProductionUseCases", "evidence"}
PATTERN_EVIDENCE_KEYS = {
    "candidate",
    "registryEntry",
    "seenIn",
    "decision",
    "reviewCondition",
}
PATTERN_DECISIONS = {"collect-evidence", "feature-composition", "pattern-review"}
PROMOTION_RULES = {
    "experimentalToBeta": {
        "minimum": 1,
        "requiredEvidence": {
            "canonicalImplementation",
            "documentedPublicContract",
            "accessibilityContract",
            "documentedStates",
            "contractTests",
            "platformStrategy",
        },
    },
    "betaToStable": {
        "minimum": 2,
        "requiredEvidence": {
            "apiUsedWithoutFeatureWorkarounds",
            "accessibilityContractComplete",
            "documentedStatesCovered",
            "contractTests",
            "webAndMobileStrategy",
            "migrationReviewHasNoCriticalGaps",
        },
    },
}
REQUIRED_COMPONENT_KEYS = {
    "name",
    "synonyms",
    "category",
    "level",
    "status",
    "replacement",
    "platforms",
    "purpose",
    "summary",
    "variants",
    "sizes",
    "states",
    "dependencies",
    "accessibility",
    "platformDifferences",
    "implementation",
}
IMPLEMENTATION_KEYS = {"canonical", "legacyReferences"}
CANONICAL_IMPLEMENTATION_KEYS = {"platform", "file", "symbols"}


class DuplicateKeyError(ValueError):
    """Raised when a JSON object contains the same key more than once."""


def unique_object(pairs: list[tuple[str, Any]]) -> dict[str, Any]:
    result: dict[str, Any] = {}
    for key, value in pairs:
        if key in result:
            raise DuplicateKeyError(f"повторяющийся JSON key: {key}")
        result[key] = value
    return result


def add_error(errors: list[str], location: str, message: str) -> None:
    errors.append(f"{location}: {message}")


def is_non_empty_string(value: Any) -> bool:
    return isinstance(value, str) and bool(value.strip())


def validate_exact_keys(
    errors: list[str],
    location: str,
    value: dict[str, Any],
    expected: set[str],
) -> None:
    missing = expected - set(value)
    extra = set(value) - expected
    if missing:
        add_error(errors, location, f"нет обязательных полей: {sorted(missing)}")
    if extra:
        add_error(errors, location, f"неизвестные поля: {sorted(extra)}")


def validate_string_list(
    errors: list[str],
    location: str,
    value: Any,
    *,
    allow_empty: bool = True,
    pascal_case: bool = False,
) -> list[str]:
    if not isinstance(value, list):
        add_error(errors, location, "ожидался массив строк")
        return []
    if not allow_empty and not value:
        add_error(errors, location, "массив не должен быть пустым")

    result: list[str] = []
    seen: set[str] = set()
    for index, item in enumerate(value):
        item_location = f"{location}[{index}]"
        if not is_non_empty_string(item):
            add_error(errors, item_location, "ожидалась непустая строка")
            continue
        key = item.casefold()
        if key in seen:
            add_error(errors, item_location, f"повторяющееся значение {item!r}")
            continue
        seen.add(key)
        if pascal_case and not PASCAL_CASE.fullmatch(item):
            add_error(errors, item_location, f"{item!r} должно быть PascalCase")
        result.append(item)
    return result


def safe_repo_file(errors: list[str], location: str, raw_path: Any) -> Path | None:
    if not is_non_empty_string(raw_path):
        add_error(errors, location, "ожидался непустой repo-relative file path")
        return None
    relative = Path(raw_path)
    if relative.is_absolute() or ".." in relative.parts:
        add_error(errors, location, "путь должен быть безопасным и относительным к репозиторию")
        return None
    resolved = (REPO_ROOT / relative).resolve()
    try:
        resolved.relative_to(REPO_ROOT)
    except ValueError:
        add_error(errors, location, "путь выходит за границы репозитория")
        return None
    if not resolved.is_file():
        add_error(errors, location, f"файл не существует: {raw_path}")
        return None
    return resolved


def validate_artifact_files(
    errors: list[str],
    location: str,
    value: Any,
    *,
    suffix: str,
    parent: str | None = None,
) -> list[Path]:
    raw_paths = validate_string_list(errors, location, value, allow_empty=False)
    files: list[Path] = []
    for index, raw_path in enumerate(raw_paths):
        item_location = f"{location}[{index}]"
        relative = Path(raw_path)
        if relative.suffix != suffix:
            add_error(errors, item_location, f"ожидался файл {suffix}")
        if parent is not None and (not relative.parts or relative.parts[0] != parent):
            add_error(errors, item_location, f"файл должен находиться в {parent}/")
        resolved = safe_repo_file(errors, item_location, raw_path)
        if resolved is not None:
            files.append(resolved)
    return files


def validate_governance(
    errors: list[str], value: Any
) -> tuple[list[Path], list[Path], list[Path], int, list[dict[str, Any]]]:
    documentation: list[Path] = []
    catalogs: list[Path] = []
    contract_tests: list[Path] = []
    pattern_minimum = 2
    pattern_evidence: list[dict[str, Any]] = []

    if not isinstance(value, dict):
        add_error(errors, "governance", "ожидался object")
        return documentation, catalogs, contract_tests, pattern_minimum, pattern_evidence
    validate_exact_keys(errors, "governance", value, GOVERNANCE_KEYS)

    lifecycle_order = value.get("lifecycleOrder")
    if lifecycle_order != LIFECYCLE_ORDER:
        add_error(
            errors,
            "governance.lifecycleOrder",
            f"ожидался порядок {LIFECYCLE_ORDER}",
        )

    promotion = value.get("promotionCriteria")
    if not isinstance(promotion, dict):
        add_error(errors, "governance.promotionCriteria", "ожидался object")
    else:
        validate_exact_keys(
            errors,
            "governance.promotionCriteria",
            promotion,
            PROMOTION_CRITERIA_KEYS,
        )
        for stage, rule in PROMOTION_RULES.items():
            stage_location = f"governance.promotionCriteria.{stage}"
            configured = promotion.get(stage)
            if not isinstance(configured, dict):
                add_error(errors, stage_location, "ожидался object")
                continue
            validate_exact_keys(errors, stage_location, configured, PROMOTION_STAGE_KEYS)
            if configured.get("minimumIndependentProductionUseCases") != rule["minimum"]:
                add_error(
                    errors,
                    f"{stage_location}.minimumIndependentProductionUseCases",
                    f"критерий нельзя ослаблять: требуется {rule['minimum']}",
                )
            evidence = set(
                validate_string_list(
                    errors,
                    f"{stage_location}.requiredEvidence",
                    configured.get("requiredEvidence"),
                    allow_empty=False,
                )
            )
            if evidence != rule["requiredEvidence"]:
                add_error(
                    errors,
                    f"{stage_location}.requiredEvidence",
                    "набор обязательных evidence не совпадает с governance contract",
                )

    stable_artifacts = value.get("stableArtifacts")
    if not isinstance(stable_artifacts, dict):
        add_error(errors, "governance.stableArtifacts", "ожидался object")
    else:
        validate_exact_keys(
            errors,
            "governance.stableArtifacts",
            stable_artifacts,
            STABLE_ARTIFACT_KEYS,
        )
        documentation = validate_artifact_files(
            errors,
            "governance.stableArtifacts.documentation",
            stable_artifacts.get("documentation"),
            suffix=".md",
        )
        catalogs = validate_artifact_files(
            errors,
            "governance.stableArtifacts.catalogs",
            stable_artifacts.get("catalogs"),
            suffix=".html",
        )
        contract_tests = validate_artifact_files(
            errors,
            "governance.stableArtifacts.contractTests",
            stable_artifacts.get("contractTests"),
            suffix=".py",
            parent="tests",
        )

    catalog_placement = value.get("catalogPlacement")
    if not isinstance(catalog_placement, dict):
        add_error(errors, "governance.catalogPlacement", "ожидался object")
    else:
        validate_exact_keys(
            errors,
            "governance.catalogPlacement",
            catalog_placement,
            CATALOG_PLACEMENT_KEYS,
        )
        expected_values = {
            "componentLevel": "component",
            "templateLevel": "pattern",
            "templateRoute": "patterns",
            "minimumTemplateDependencies": MINIMUM_TEMPLATE_DEPENDENCIES,
        }
        for key, expected in expected_values.items():
            if catalog_placement.get(key) != expected:
                add_error(
                    errors,
                    f"governance.catalogPlacement.{key}",
                    f"ожидалось {expected!r}",
                )
        if not is_non_empty_string(catalog_placement.get("templateDefinition")):
            add_error(
                errors,
                "governance.catalogPlacement.templateDefinition",
                "нужно явное определение Template",
            )

    pattern_promotion = value.get("patternPromotion")
    if not isinstance(pattern_promotion, dict):
        add_error(errors, "governance.patternPromotion", "ожидался object")
    else:
        validate_exact_keys(
            errors,
            "governance.patternPromotion",
            pattern_promotion,
            PATTERN_PROMOTION_KEYS,
        )
        configured_minimum = pattern_promotion.get(
            "minimumIndependentProductionUseCases"
        )
        if configured_minimum != 2:
            add_error(
                errors,
                "governance.patternPromotion.minimumIndependentProductionUseCases",
                "pattern review требует ровно два независимых production use cases",
            )
        else:
            pattern_minimum = configured_minimum

        raw_evidence = pattern_promotion.get("evidence")
        if not isinstance(raw_evidence, list) or not raw_evidence:
            add_error(
                errors,
                "governance.patternPromotion.evidence",
                "ожидался непустой массив evidence entries",
            )
        else:
            seen_candidates: set[str] = set()
            for index, entry in enumerate(raw_evidence):
                entry_location = f"governance.patternPromotion.evidence[{index}]"
                if not isinstance(entry, dict):
                    add_error(errors, entry_location, "ожидался object")
                    continue
                validate_exact_keys(
                    errors, entry_location, entry, PATTERN_EVIDENCE_KEYS
                )
                candidate = entry.get("candidate")
                if not is_non_empty_string(candidate):
                    add_error(errors, f"{entry_location}.candidate", "нужно имя")
                elif not PASCAL_CASE.fullmatch(candidate):
                    add_error(
                        errors,
                        f"{entry_location}.candidate",
                        f"{candidate!r} должно быть PascalCase",
                    )
                elif candidate.casefold() in seen_candidates:
                    add_error(
                        errors,
                        f"{entry_location}.candidate",
                        f"повторяющийся candidate {candidate!r}",
                    )
                else:
                    seen_candidates.add(candidate.casefold())

                registry_entry = entry.get("registryEntry")
                if registry_entry is not None and (
                    not is_non_empty_string(registry_entry)
                    or not PASCAL_CASE.fullmatch(registry_entry)
                ):
                    add_error(
                        errors,
                        f"{entry_location}.registryEntry",
                        "ожидалось PascalCase имя или null",
                    )

                use_cases = validate_string_list(
                    errors,
                    f"{entry_location}.seenIn",
                    entry.get("seenIn"),
                    allow_empty=False,
                )
                decision = entry.get("decision")
                if (
                    not is_non_empty_string(decision)
                    or decision not in PATTERN_DECISIONS
                ):
                    add_error(
                        errors,
                        f"{entry_location}.decision",
                        f"ожидалось одно из {sorted(PATTERN_DECISIONS)}",
                    )
                if not is_non_empty_string(entry.get("reviewCondition")):
                    add_error(
                        errors,
                        f"{entry_location}.reviewCondition",
                        "нужно явное условие следующего review",
                    )
                if len(use_cases) < pattern_minimum and decision == "pattern-review":
                    add_error(
                        errors,
                        f"{entry_location}.decision",
                        "pattern-review запрещён до второго независимого use case",
                    )
                if len(use_cases) >= pattern_minimum and decision == "collect-evidence":
                    add_error(
                        errors,
                        f"{entry_location}.decision",
                        "после второго use case нужно решение pattern-review или feature-composition",
                    )
                if decision == "feature-composition" and registry_entry is not None:
                    add_error(
                        errors,
                        f"{entry_location}.registryEntry",
                        "feature-composition не должна иметь registry entry",
                    )
                pattern_evidence.append(entry)

    return documentation, catalogs, contract_tests, pattern_minimum, pattern_evidence


def dependency_cycles(graph: dict[str, list[str]]) -> list[list[str]]:
    state: dict[str, int] = {}
    stack: list[str] = []
    cycles: list[list[str]] = []
    reported: set[tuple[str, ...]] = set()

    def visit(name: str) -> None:
        state[name] = 1
        stack.append(name)
        for dependency in graph.get(name, []):
            if dependency not in graph:
                continue
            if state.get(dependency, 0) == 0:
                visit(dependency)
            elif state.get(dependency) == 1:
                start = stack.index(dependency)
                cycle = stack[start:] + [dependency]
                key = tuple(cycle)
                if key not in reported:
                    reported.add(key)
                    cycles.append(cycle)
        stack.pop()
        state[name] = 2

    for component_name in graph:
        if state.get(component_name, 0) == 0:
            visit(component_name)
    return cycles


def validate_registry(document: Any) -> tuple[list[str], Counter[str], Counter[str]]:
    errors: list[str] = []
    status_counts: Counter[str] = Counter()
    level_counts: Counter[str] = Counter()

    if not isinstance(document, dict):
        return ["registry: корень JSON должен быть object"], status_counts, level_counts

    validate_exact_keys(errors, "registry", document, REQUIRED_REGISTRY_KEYS)
    if document.get("schemaVersion") != 2:
        add_error(errors, "schemaVersion", "поддерживается только schemaVersion = 2")
    if not is_non_empty_string(document.get("registryVersion")) or not SEMVER.fullmatch(
        document.get("registryVersion", "")
    ):
        add_error(errors, "registryVersion", "ожидалась версия формата X.Y.Z")
    catalog_versions = document.get("catalogVersions")
    if not isinstance(catalog_versions, dict):
        add_error(errors, "catalogVersions", "ожидался object с версиями разделов Catalog")
    else:
        routes = set(catalog_versions)
        if routes != CATALOG_VERSION_ROUTES:
            add_error(
                errors,
                "catalogVersions",
                f"ожидались ровно {sorted(CATALOG_VERSION_ROUTES)}, получены {sorted(routes)}",
            )
        for route, version in catalog_versions.items():
            if not is_non_empty_string(version) or not SEMVER.fullmatch(version):
                add_error(errors, f"catalogVersions.{route}", "ожидалась версия формата X.Y.Z")
    if not is_non_empty_string(document.get("description")):
        add_error(errors, "description", "нужно непустое описание")

    lifecycle = document.get("lifecycle")
    if not isinstance(lifecycle, dict):
        add_error(errors, "lifecycle", "ожидался object с четырьмя lifecycle status")
    else:
        keys = set(lifecycle)
        if keys != LIFECYCLE:
            add_error(
                errors,
                "lifecycle",
                f"ожидались ровно {sorted(LIFECYCLE)}, получены {sorted(keys)}",
            )
        for status, description in lifecycle.items():
            if not is_non_empty_string(description):
                add_error(errors, f"lifecycle.{status}", "описание не должно быть пустым")

    (
        stable_documentation,
        stable_catalogs,
        stable_contract_tests,
        pattern_minimum,
        pattern_evidence,
    ) = validate_governance(errors, document.get("governance"))

    configured_levels = set(
        validate_string_list(errors, "levels", document.get("levels"), allow_empty=False)
    )
    if configured_levels != LEVELS:
        add_error(errors, "levels", f"ожидались ровно {sorted(LEVELS)}")

    categories = set(
        validate_string_list(
            errors, "categories", document.get("categories"), allow_empty=False
        )
    )
    platform_catalog = set(
        validate_string_list(
            errors,
            "platformCatalog",
            document.get("platformCatalog"),
            allow_empty=False,
        )
    )
    if not is_non_empty_string(document.get("platformSemantics")):
        add_error(errors, "platformSemantics", "нужно объяснить смысл поля platforms")

    components = document.get("components")
    if not isinstance(components, list) or not components:
        add_error(errors, "components", "ожидался непустой массив компонентов")
        return errors, status_counts, level_counts

    component_by_name: dict[str, dict[str, Any]] = {}
    spelling_owner: dict[str, str] = {}

    for index, component in enumerate(components):
        location = f"components[{index}]"
        if not isinstance(component, dict):
            add_error(errors, location, "ожидался object")
            continue
        missing_keys = REQUIRED_COMPONENT_KEYS - set(component)
        extra_keys = set(component) - REQUIRED_COMPONENT_KEYS - {"styles"}
        if missing_keys:
            add_error(errors, location, f"нет обязательных полей: {sorted(missing_keys)}")
        if extra_keys:
            add_error(errors, location, f"неизвестные поля: {sorted(extra_keys)}")

        name = component.get("name")
        if not is_non_empty_string(name):
            add_error(errors, f"{location}.name", "ожидалась непустая строка")
            continue
        if not PASCAL_CASE.fullmatch(name):
            add_error(errors, f"{location}.name", f"{name!r} должно быть PascalCase")
        folded = name.casefold()
        if folded in spelling_owner:
            add_error(
                errors,
                f"{location}.name",
                f"{name!r} конфликтует с {spelling_owner[folded]}",
            )
        else:
            spelling_owner[folded] = f"component {name}"
        if name in component_by_name:
            add_error(errors, f"{location}.name", f"повторяющийся component {name}")
        else:
            component_by_name[name] = component

    for index, component in enumerate(components):
        if not isinstance(component, dict) or not is_non_empty_string(component.get("name")):
            continue
        name = component["name"]
        location = f"components[{index}]({name})"
        synonyms = validate_string_list(
            errors,
            f"{location}.synonyms",
            component.get("synonyms"),
            pascal_case=True,
        )
        for synonym in synonyms:
            folded = synonym.casefold()
            if folded in spelling_owner:
                add_error(
                    errors,
                    f"{location}.synonyms",
                    f"синоним {synonym!r} конфликтует с {spelling_owner[folded]}",
                )
            else:
                spelling_owner[folded] = f"synonym {synonym} of {name}"

    graph: dict[str, list[str]] = {}
    file_cache: dict[Path, str] = {}
    canonical_symbols_by_name: dict[str, list[str]] = {}

    for index, component in enumerate(components):
        if not isinstance(component, dict) or not is_non_empty_string(component.get("name")):
            continue
        name = component["name"]
        location = f"components[{index}]({name})"

        category = component.get("category")
        if category not in categories:
            add_error(errors, f"{location}.category", f"неизвестная category {category!r}")

        level = component.get("level")
        if level not in LEVELS:
            add_error(errors, f"{location}.level", f"неизвестный level {level!r}")
        else:
            level_counts[level] += 1

        status = component.get("status")
        if status not in LIFECYCLE:
            add_error(errors, f"{location}.status", f"неизвестный lifecycle {status!r}")
        else:
            status_counts[status] += 1

        replacement = component.get("replacement")
        if status == "deprecated":
            if not is_non_empty_string(replacement):
                add_error(errors, f"{location}.replacement", "deprecated требует replacement")
            elif replacement == name:
                add_error(errors, f"{location}.replacement", "component не может заменять сам себя")
            elif replacement not in component_by_name:
                add_error(errors, f"{location}.replacement", f"неизвестная замена {replacement!r}")
            elif component_by_name[replacement].get("status") == "deprecated":
                add_error(errors, f"{location}.replacement", "replacement тоже deprecated")
        elif replacement is not None:
            add_error(errors, f"{location}.replacement", "replacement допустим только для deprecated")

        platforms = validate_string_list(
            errors, f"{location}.platforms", component.get("platforms"), allow_empty=False
        )
        for platform in platforms:
            if platform not in platform_catalog:
                add_error(errors, f"{location}.platforms", f"неизвестная platform {platform!r}")

        if not is_non_empty_string(component.get("purpose")):
            add_error(errors, f"{location}.purpose", "purpose не должен быть пустым")
        summary = component.get("summary")
        if not is_non_empty_string(summary) or len(summary) > 100 or "\n" in summary:
            add_error(errors, f"{location}.summary", "нужно короткое описание карточки до 100 символов, без переносов")
        validate_string_list(errors, f"{location}.variants", component.get("variants"))
        validate_string_list(errors, f"{location}.sizes", component.get("sizes"))
        validate_string_list(errors, f"{location}.states", component.get("states"))
        if "styles" in component:
            validate_string_list(errors, f"{location}.styles", component["styles"], allow_empty=False)
        accessibility = validate_string_list(
            errors,
            f"{location}.accessibility",
            component.get("accessibility"),
            allow_empty=False,
        )
        if not accessibility:
            add_error(errors, f"{location}.accessibility", "нужен хотя бы один a11y contract")

        dependencies = validate_string_list(
            errors,
            f"{location}.dependencies",
            component.get("dependencies"),
            pascal_case=True,
        )
        if level == "pattern" and len(dependencies) < MINIMUM_TEMPLATE_DEPENDENCIES:
            add_error(
                errors,
                f"{location}.dependencies",
                "Template должен собирать минимум два зарегистрированных элемента",
            )
        graph[name] = dependencies
        for dependency in dependencies:
            if dependency == name:
                add_error(errors, f"{location}.dependencies", "self-dependency запрещена")
            elif dependency not in component_by_name:
                add_error(
                    errors,
                    f"{location}.dependencies",
                    f"неизвестная dependency {dependency!r}",
                )
        if status == "deprecated" and is_non_empty_string(replacement):
            if replacement not in dependencies:
                add_error(
                    errors,
                    f"{location}.dependencies",
                    "replacement должен быть указан среди dependencies",
                )

        platform_differences = component.get("platformDifferences")
        if not isinstance(platform_differences, dict):
            add_error(errors, f"{location}.platformDifferences", "ожидался object")
        else:
            for platform, difference in platform_differences.items():
                if platform not in platform_catalog:
                    add_error(
                        errors,
                        f"{location}.platformDifferences.{platform}",
                        "platform отсутствует в platformCatalog",
                    )
                if not is_non_empty_string(difference):
                    add_error(
                        errors,
                        f"{location}.platformDifferences.{platform}",
                        "описание не должно быть пустым",
                    )
            if status == "stable":
                missing_strategies = STABLE_STRATEGY_PLATFORMS - set(platform_differences)
                if missing_strategies:
                    add_error(
                        errors,
                        f"{location}.platformDifferences",
                        "stable component требует стратегии для: "
                        + ", ".join(sorted(missing_strategies)),
                    )

        implementation = component.get("implementation")
        if not isinstance(implementation, dict):
            add_error(errors, f"{location}.implementation", "ожидался object")
            continue
        missing_implementation_keys = IMPLEMENTATION_KEYS - set(implementation)
        extra_implementation_keys = set(implementation) - IMPLEMENTATION_KEYS
        if missing_implementation_keys:
            add_error(
                errors,
                f"{location}.implementation",
                f"нет полей: {sorted(missing_implementation_keys)}",
            )
        if extra_implementation_keys:
            add_error(
                errors,
                f"{location}.implementation",
                f"неизвестные поля: {sorted(extra_implementation_keys)}",
            )

        canonical = implementation.get("canonical")
        if not isinstance(canonical, list):
            add_error(errors, f"{location}.implementation.canonical", "ожидался массив")
            canonical = []
        legacy_references = validate_string_list(
            errors,
            f"{location}.implementation.legacyReferences",
            implementation.get("legacyReferences"),
        )
        for reference_index, reference in enumerate(legacy_references):
            safe_repo_file(
                errors,
                f"{location}.implementation.legacyReferences[{reference_index}]",
                reference,
            )

        if status == "stable" and not canonical:
            add_error(
                errors,
                f"{location}.implementation.canonical",
                "stable component требует canonical implementation",
            )
        if status == "beta" and not canonical:
            add_error(
                errors,
                f"{location}.implementation.canonical",
                "beta component требует canonical reference implementation",
            )

        implemented_platforms: set[str] = set()
        seen_implementations: set[tuple[str, str, tuple[str, ...]]] = set()
        canonical_symbols_by_name[name] = []
        for implementation_index, entry in enumerate(canonical):
            entry_location = (
                f"{location}.implementation.canonical[{implementation_index}]"
            )
            if not isinstance(entry, dict):
                add_error(errors, entry_location, "ожидался object")
                continue
            missing_entry_keys = CANONICAL_IMPLEMENTATION_KEYS - set(entry)
            extra_entry_keys = set(entry) - CANONICAL_IMPLEMENTATION_KEYS
            if missing_entry_keys:
                add_error(errors, entry_location, f"нет полей: {sorted(missing_entry_keys)}")
            if extra_entry_keys:
                add_error(errors, entry_location, f"неизвестные поля: {sorted(extra_entry_keys)}")

            platform = entry.get("platform")
            if platform not in platform_catalog:
                add_error(errors, f"{entry_location}.platform", f"неизвестная platform {platform!r}")
            else:
                implemented_platforms.add(platform)
                if platform not in platforms:
                    add_error(
                        errors,
                        f"{entry_location}.platform",
                        "canonical implementation platform отсутствует в component.platforms",
                    )

            implementation_file = safe_repo_file(
                errors, f"{entry_location}.file", entry.get("file")
            )
            symbols = validate_string_list(
                errors,
                f"{entry_location}.symbols",
                entry.get("symbols"),
                allow_empty=False,
            )
            canonical_symbols_by_name[name].extend(symbols)
            key = (str(platform), str(entry.get("file")), tuple(symbols))
            if key in seen_implementations:
                add_error(errors, entry_location, "повторяющаяся canonical implementation")
            seen_implementations.add(key)

            if implementation_file is not None:
                if implementation_file not in file_cache:
                    try:
                        file_cache[implementation_file] = implementation_file.read_text(
                            encoding="utf-8"
                        )
                    except UnicodeDecodeError:
                        add_error(errors, f"{entry_location}.file", "implementation должна быть текстовой")
                        file_cache[implementation_file] = ""
                source = file_cache[implementation_file]
                for symbol in symbols:
                    if symbol not in source:
                        add_error(
                            errors,
                            f"{entry_location}.symbols",
                            f"symbol {symbol!r} не найден в {entry.get('file')}",
                        )

        if status == "stable":
            missing_platform_implementations = set(platforms) - implemented_platforms
            if missing_platform_implementations:
                add_error(
                    errors,
                    f"{location}.implementation.canonical",
                    "stable component не реализован для: "
                    + ", ".join(sorted(missing_platform_implementations)),
                )

    for index, entry in enumerate(pattern_evidence):
        location = f"governance.patternPromotion.evidence[{index}]"
        candidate = entry.get("candidate")
        registry_entry = entry.get("registryEntry")
        use_cases = entry.get("seenIn")
        if registry_entry is None:
            if is_non_empty_string(candidate) and candidate in component_by_name:
                add_error(
                    errors,
                    f"{location}.registryEntry",
                    f"candidate {candidate!r} уже существует в registry",
                )
            continue
        if not is_non_empty_string(registry_entry):
            continue
        if registry_entry not in component_by_name:
            add_error(
                errors,
                f"{location}.registryEntry",
                f"неизвестный registry component {registry_entry!r}",
            )
            continue
        linked = component_by_name[registry_entry]
        if registry_entry != candidate:
            add_error(
                errors,
                f"{location}.registryEntry",
                "registry entry должен совпадать с canonical candidate name",
            )
        if linked.get("level") != "pattern":
            add_error(
                errors,
                f"{location}.registryEntry",
                "pattern evidence может ссылаться только на level=pattern",
            )
        if (
            isinstance(use_cases, list)
            and len(use_cases) < pattern_minimum
            and linked.get("status") != "experimental"
        ):
            add_error(
                errors,
                f"{location}.seenIn",
                "до второго независимого use case registry pattern обязан оставаться experimental",
            )

    def artifact_sources(paths: list[Path], location: str) -> list[str]:
        sources: list[str] = []
        for path in paths:
            if path not in file_cache:
                try:
                    file_cache[path] = path.read_text(encoding="utf-8")
                except UnicodeDecodeError:
                    add_error(errors, location, f"файл должен быть текстовым: {path}")
                    file_cache[path] = ""
            sources.append(file_cache[path])
        return sources

    documentation_sources = artifact_sources(
        stable_documentation, "governance.stableArtifacts.documentation"
    )
    catalog_sources = artifact_sources(
        stable_catalogs, "governance.stableArtifacts.catalogs"
    )
    contract_test_sources = artifact_sources(
        stable_contract_tests, "governance.stableArtifacts.contractTests"
    )

    def contains_symbol(sources: list[str], symbol: str) -> bool:
        pattern = re.compile(
            rf"(?<![A-Za-z0-9_-]){re.escape(symbol)}(?![A-Za-z0-9_-])"
        )
        return any(pattern.search(source) for source in sources)

    for name, component in component_by_name.items():
        if component.get("status") != "stable":
            continue
        name_pattern = re.compile(
            rf"(?<![A-Za-z0-9]){re.escape(name)}(?![A-Za-z0-9])"
        )
        if not any(name_pattern.search(source) for source in documentation_sources):
            add_error(
                errors,
                f"components({name}).governance.documentation",
                "stable component не упомянут в canonical documentation",
            )

        symbol_probes = []
        for symbol in canonical_symbols_by_name.get(name, []):
            match = SIMPLE_CLASS_SYMBOL.fullmatch(symbol)
            if match:
                symbol_probes.append(match.group(1))
        if not symbol_probes or not any(
            contains_symbol(catalog_sources, probe) for probe in symbol_probes
        ):
            add_error(
                errors,
                f"components({name}).governance.catalog",
                "stable component не представлен canonical symbol в catalog",
            )
        if not any(
            name_pattern.search(source) for source in contract_test_sources
        ) or not any(
            contains_symbol(contract_test_sources, probe) for probe in symbol_probes
        ):
            add_error(
                errors,
                f"components({name}).governance.contractTests",
                "stable component не связан с именем и canonical symbol в contract tests",
            )

    for stable_name, stable_component in component_by_name.items():
        if stable_component.get("status") != "stable":
            continue
        pending = [(dependency, [stable_name, dependency]) for dependency in graph[stable_name]]
        visited: set[str] = set()
        while pending:
            dependency, path = pending.pop()
            if dependency in visited or dependency not in component_by_name:
                continue
            visited.add(dependency)
            if component_by_name[dependency].get("status") == "experimental":
                add_error(
                    errors,
                    f"components({stable_name}).dependencies",
                    "stable component не может зависеть от experimental: "
                    + " -> ".join(path),
                )
                continue
            pending.extend(
                (nested, [*path, nested]) for nested in graph.get(dependency, [])
            )

    for cycle in dependency_cycles(graph):
        add_error(errors, "dependencies", "cycle: " + " -> ".join(cycle))

    return errors, status_counts, level_counts


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "registry",
        nargs="?",
        type=Path,
        default=DEFAULT_REGISTRY,
        help="путь к component-registry.json",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    registry_path = args.registry
    if not registry_path.is_absolute():
        registry_path = (Path.cwd() / registry_path).resolve()
    try:
        document = json.loads(
            registry_path.read_text(encoding="utf-8"), object_pairs_hook=unique_object
        )
    except OSError as exc:
        print(f"Component registry: не удалось прочитать {registry_path}: {exc}", file=sys.stderr)
        return 1
    except (json.JSONDecodeError, DuplicateKeyError) as exc:
        print(f"Component registry: некорректный JSON: {exc}", file=sys.stderr)
        return 1

    errors, status_counts, level_counts = validate_registry(document)
    if errors:
        print("Component registry validation failed:", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    total = sum(status_counts.values())
    statuses = ", ".join(f"{name}={status_counts[name]}" for name in sorted(LIFECYCLE))
    levels = ", ".join(f"{name}={level_counts[name]}" for name in sorted(LEVELS))
    print(f"Component registry: OK, {total} entries ({statuses}; {levels}).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
