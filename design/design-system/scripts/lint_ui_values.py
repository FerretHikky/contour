#!/usr/bin/env python3
"""Enforce Design System boundaries and ratchet legacy visual debt."""

from __future__ import annotations

import argparse
import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path, PurePosixPath
from typing import Iterable, NamedTuple


REPO_ROOT = Path(__file__).resolve().parents[3]
SYSTEM_ROOT = REPO_ROOT / "design" / "design-system"
BASELINE_PATH = SYSTEM_ROOT / "legacy-baseline.json"
EXCEPTIONS_PATH = SYSTEM_ROOT / "lint-exceptions.json"
ICON_REGISTRY = REPO_ROOT / "design" / "icons" / "icons.js"
COMPONENT_REGISTRY = SYSTEM_ROOT / "component-registry.json"
COMPONENT_TOKEN_SOURCE = SYSTEM_ROOT / "tokens" / "components.json"
# Pilot migration established this repository-wide ceiling. Raising it must leave
# reviewed metadata in the baseline (and therefore an explicit code-review diff).
UNREVIEWED_BASELINE_CEILING = 1820

PRODUCT_GLOBS = (
    "services/admin/templates/**/*.html",
    "services/admin/static/**/*.css",
    "services/admin/static/**/*.js",
    "services/admin/app.py",
    "services/admin/admin_web/**/*.py",
    "services/miniapp/static/**/*.html",
    "services/miniapp/static/**/*.css",
    "services/miniapp/static/**/*.js",
    "services/landing/*.html",
    "services/landing/templates/**/*.html",
    "services/landing/static/**/*.css",
    "services/landing/static/**/*.js",
    "services/landing/app.py",
)
STRICT_GLOBS = (
    "design/design-system/web/primitives.css",
    "design/design-system/web/components.css",
    "design/design-system/web/components/**/*.css",
    # The catalog dogfoods Core UI and must obey the same literal-value policy.
    "design/design-system/web/catalog.html",
    "design/design-system/web/catalog.css",
    "design/design-system/web/runtime/catalog.ts",
)
# Exact non-feature inputs. Generated outputs are covered byte-for-byte by
# build_tokens.py --check; the pinned Bootstrap grid is third-party source. Exact
# paths avoid a filename-based escape hatch such as adding another local tokens.css.
EXCLUDED_PATHS = {
    "services/admin/static/vendor/bootstrap-grid.min.css",
    "services/miniapp/static/i18n.js",
    *{
        f"services/{service}/static/icons.js"
        for service in ("admin", "miniapp", "landing")
    },
    *{
        f"services/{service}/static/{path}"
        for service in ("admin", "miniapp", "landing")
        for path in (
            "brand/colors/tokens.css",
            "brand/foundations/tokens.css",
            "brand/typography/typography.css",
            "design-system/core-ui.css",
            "design-system/core-ui.js",
            "design-system/icon-glyphs.js",
        )
    },
}
PRODUCT_ONLY_COLOR_RULES = {
    "direct-primitive-color-id",
    "direct-semantic-color-id",
    "direct-static-color-id",
    "direct-component-color",
    "direct-component-color-id",
}
REMOVED_CONTEXT_COLOR_ROLES = (
    "color.context.background.tertiary.active",
    "color.context.border.focus.default",
    "color.context.border.primary.selected",
)
PUBLIC_COLOR_RULES = {
    "direct-primitive-color",
    "direct-semantic-color",
    "direct-static-color",
    "removed-context-color",
    *PRODUCT_ONLY_COLOR_RULES,
}
PUBLIC_FOUNDATION_RULES = {
    "direct-primitive-dimension",
    "deprecated-space",
    "removed-dimension-alias",
}
CANONICAL_UI_PREFIX = "design/design-system/web/"

BLOCK_COMMENT = re.compile(r"/\*.*?\*/", re.DOTALL)
HTML_COMMENT = re.compile(r"<!--.*?-->", re.DOTALL)
EXCEPTION_ANNOTATION = re.compile(
    r"ds-lint-exception:\s*([a-z][a-z0-9-]{2,63})"
)


def declaration(property_pattern: str) -> re.Pattern[str]:
    return re.compile(
        rf"(?:^|[;{{\s])(?:{property_pattern})\s*:\s*([^;}}]+)",
        re.IGNORECASE,
    )


def _kebab(value: str) -> str:
    return re.sub(r"(?<!^)(?=[A-Z])", "-", value).replace("_", "-").lower()


def _color_component_tokens() -> tuple[tuple[str, ...], tuple[str, ...]]:
    """Return canonical color Component token IDs and generated CSS variables.

    Component tokens inherit ``$type`` from parent DTCG groups, so this traversal
    mirrors that one small part of the generator without importing build_tokens.py.
    The lint therefore follows canonical authoring instead of a second hand-written
    list and cannot silently miss a newly added color Component token.
    """

    document = json.loads(COMPONENT_TOKEN_SOURCE.read_text(encoding="utf-8"))
    identifiers: list[str] = []

    def visit(node: object, path: tuple[str, ...], inherited_type: str | None) -> None:
        if not isinstance(node, dict):
            return
        token_type = node.get("$type", inherited_type)
        if "$value" in node:
            if token_type == "color":
                identifiers.append(".".join(path))
            return
        for key, value in node.items():
            if not key.startswith("$"):
                visit(value, (*path, key), token_type)

    visit(document, (), None)
    variables = tuple(
        "--rf-" + "-".join(_kebab(part) for part in identifier.split(".")[1:])
        for identifier in identifiers
    )
    return tuple(identifiers), variables


COLOR_COMPONENT_TOKEN_IDS, COLOR_COMPONENT_VARIABLES = _color_component_tokens()
REMOVED_CONTEXT_COLOR_VARIABLES = tuple(
    "--rf-" + role.replace(".", "-") for role in REMOVED_CONTEXT_COLOR_ROLES
)


def exact_alternatives(values: Iterable[str]) -> str:
    return "(?:" + "|".join(re.escape(value) for value in values) + ")"


RULES: dict[str, re.Pattern[str]] = {
    "raw-color": re.compile(
        r"(?<![\w-])#[0-9a-fA-F]{3,8}\b|\b(?:rgb|rgba|hsl|hsla)\(",
        re.IGNORECASE,
    ),
    "raw-font-size": declaration(r"font-size"),
    "raw-font-weight": declaration(r"font-weight"),
    "raw-line-height": declaration(r"line-height"),
    "raw-letter-spacing": declaration(r"letter-spacing"),
    "raw-spacing": declaration(
        r"(?:margin|padding|gap|row-gap|column-gap|inset|top|right|bottom|left)(?:-[a-z]+)?"
    ),
    "raw-size": declaration(
        r"(?:width|height|min-width|min-height|max-width|max-height)"
    ),
    "raw-radius": declaration(r"border-radius"),
    "raw-border": declaration(r"border(?:-(?:top|right|bottom|left))?(?:-width)?"),
    "raw-shadow": declaration(r"(?:box-shadow|text-shadow)"),
    "raw-motion": declaration(
        r"(?:transition|transition-duration|animation|animation-duration)"
    ),
    "raw-z-index": declaration(r"z-index"),
    "raw-breakpoint": re.compile(
        r"@media[^\{]*(?:min|max)-(?:width|height)\s*:\s*\d+(?:\.\d+)?(?:px|rem|em)",
        re.IGNORECASE,
    ),
    "direct-primitive-color": re.compile(
        r"var\(\s*--(?:(?:rf-)?color-primitive|primitive)-", re.IGNORECASE
    ),
    "direct-semantic-color": re.compile(
        r"var\(\s*--(?:(?:rf-)?color-(?:alias|semantic)|(?:alias|semantic))-",
        re.IGNORECASE,
    ),
    "direct-static-color": re.compile(
        r"var\(\s*--(?:(?:rf-)?color-static|static)-", re.IGNORECASE
    ),
    "direct-primitive-color-id": re.compile(
        r"(?<![\w.-])color\.primitive\.[a-z0-9_.-]+", re.IGNORECASE
    ),
    "direct-semantic-color-id": re.compile(
        r"(?<![\w.-])color\.(?:alias|semantic)\.[a-z0-9_.-]+", re.IGNORECASE
    ),
    "direct-static-color-id": re.compile(
        r"(?<![\w.-])color\.static\.[a-z0-9_.-]+", re.IGNORECASE
    ),
    "direct-component-color": re.compile(
        rf"var\(\s*{exact_alternatives(COLOR_COMPONENT_VARIABLES)}(?=\s*[,\)])",
        re.IGNORECASE,
    ),
    "direct-component-color-id": re.compile(
        rf"(?<![\w.-]){exact_alternatives(COLOR_COMPONENT_TOKEN_IDS)}(?![\w.-])",
        re.IGNORECASE,
    ),
    "removed-context-color": re.compile(
        rf"(?<![\w.-]){exact_alternatives(REMOVED_CONTEXT_COLOR_ROLES)}(?![\w.-])"
        rf"|(?<![\w-]){exact_alternatives(REMOVED_CONTEXT_COLOR_VARIABLES)}(?![\w-])",
        re.IGNORECASE,
    ),
    "direct-primitive-dimension": re.compile(
        r"var\(\s*--(?:rf-)?dimension-", re.IGNORECASE
    ),
    "deprecated-space": re.compile(
        r"var\(\s*--(?:rf-)?space-", re.IGNORECASE
    ),
    "removed-dimension-alias": re.compile(
        r"var\(\s*--(?:rf-)?(?:sizing|layout|control|touch-target|icon-size)-"
        r"|(?<![\w.-])(?:"
        r"sizing\.[a-z0-9_-]+"
        r"|layout\.(?:page\.padding|section\.gap|card\.padding|form\.gap|sidebar\.width|content\.maxWidth)"
        r"|control\.(?:height\.(?:compact|default|touch)|iconSize|gap|paddingInline)"
        r"|touchTarget\.minimum"
        r"|icon\.size\.(?:xs|sm|md|lg)"
        r")(?![\w.-])",
        re.IGNORECASE,
    ),
    "inline-style": re.compile(r"(?<![\w:-])style\s*=(?![=>])", re.IGNORECASE),
    "inline-svg": re.compile(r"<svg\b", re.IGNORECASE),
}

LENGTH = re.compile(r"(?<![\w.-])-?\d*\.?\d+(?:px|rem|em|%)\b", re.IGNORECASE)
DURATION = re.compile(r"(?<![\w.-])-?\d*\.?\d+(?:ms|s)\b", re.IGNORECASE)
NUMBER = re.compile(r"(?<![\w.-])-?\d*\.?\d+\b")
TOKEN_REFERENCE = re.compile(r"var\(\s*--[a-zA-Z0-9_-]+\s*\)")

REFERENCE_CONTEXT = re.compile(
    r"(?:@import|\bimport\b|\brequire\s*\(|\b(?:src|href)\s*=|\burl\s*\()",
    re.IGNORECASE,
)
QUOTED_REFERENCE = re.compile(r"['\"]([^'\"\n]+)['\"]")
URL_REFERENCE = re.compile(r"\burl\(\s*([^)'\"\s]+)\s*\)", re.IGNORECASE)
PUBLIC_DESIGN_SYSTEM_ENTRYPOINT = re.compile(
    r"^(?:/?static/)?design-system/core-ui\.(?:css|js)$", re.IGNORECASE
)

LOCAL_CLONE_ALIASES = {
    "custombutton": "Button",
    "primarybutton": "Button",
    "forminput": "TextField",
    "customcard": "Card",
    "loader": "Spinner",
    "popup": "Dialog",
}
CLASS_ATTRIBUTE = re.compile(r"\bclass\s*=\s*['\"]([^'\"]+)['\"]", re.IGNORECASE)
CSS_CLASS = re.compile(r"(?<![\w-])\.([a-zA-Z][a-zA-Z0-9_-]*)")
CODE_DECLARATION = re.compile(
    r"\b(?:class|function|const|let|var)\s+([A-Z][A-Za-z0-9_]*)"
)


class LintException(NamedTuple):
    identifier: str
    rule: str
    path: str
    line_start: int
    line_end: int
    match_text: str
    max_occurrences: int
    reason: str
    owner: str
    review_condition: str


def strip_comments(source: str) -> str:
    def blank(match: re.Match[str]) -> str:
        return "".join("\n" if char == "\n" else " " for char in match.group(0))

    return HTML_COMMENT.sub(blank, BLOCK_COMMENT.sub(blank, source))


def iter_files(globs: Iterable[str]) -> list[Path]:
    files: set[Path] = set()
    for pattern in globs:
        files.update(path for path in REPO_ROOT.glob(pattern) if path.is_file())
    return sorted(
        path
        for path in files
        if path.relative_to(REPO_ROOT).as_posix() not in EXCLUDED_PATHS
    )


def should_count(rule: str, match: re.Match[str]) -> bool:
    if rule in {
        "raw-color",
        "raw-breakpoint",
        "direct-primitive-color",
        "direct-semantic-color",
        "direct-static-color",
        "direct-primitive-color-id",
        "direct-semantic-color-id",
        "direct-static-color-id",
        "direct-component-color",
        "direct-component-color-id",
        "removed-context-color",
        "direct-primitive-dimension",
        "deprecated-space",
        "removed-dimension-alias",
        "inline-style",
        "inline-svg",
    }:
        return True

    # Ignore a pure token reference, but keep scanning everything around it. This
    # catches mixed declarations and literal fallbacks inside var().
    value = TOKEN_REFERENCE.sub("", match.group(1).strip())
    if rule in {"raw-font-size", "raw-spacing", "raw-size", "raw-radius", "raw-border"}:
        return bool(LENGTH.search(value))
    if rule == "raw-font-weight":
        return bool(NUMBER.search(value))
    if rule in {"raw-line-height", "raw-letter-spacing", "raw-z-index"}:
        return bool(NUMBER.search(value))
    if rule == "raw-shadow":
        return value.lower() != "none" and bool(NUMBER.search(value))
    if rule == "raw-motion":
        return bool(DURATION.search(value))
    return True


def _valid_repo_path(value: object) -> bool:
    if not isinstance(value, str) or not value or "*" in value:
        return False
    path = PurePosixPath(value)
    return not path.is_absolute() and ".." not in path.parts and path.as_posix() == value


def parse_exception_document(document: object) -> tuple[list[LintException], list[str]]:
    errors: list[str] = []
    if not isinstance(document, dict):
        return [], ["lint exceptions: root должен быть object"]
    if document.get("$schemaVersion") != 1:
        errors.append("lint exceptions: $schemaVersion должен быть 1")
    raw_entries = document.get("exceptions")
    if not isinstance(raw_entries, list):
        return [], [*errors, "lint exceptions: exceptions должен быть array"]

    entries: list[LintException] = []
    identifiers: set[str] = set()
    for index, raw in enumerate(raw_entries):
        prefix = f"lint exceptions[{index}]"
        if not isinstance(raw, dict):
            errors.append(f"{prefix}: запись должна быть object")
            continue
        identifier = raw.get("id")
        if not isinstance(identifier, str) or not re.fullmatch(
            r"[a-z][a-z0-9-]{2,63}", identifier
        ):
            errors.append(f"{prefix}: id должен быть kebab-case")
            continue
        if identifier in identifiers:
            errors.append(f"{prefix}: duplicate id {identifier}")
            continue
        identifiers.add(identifier)

        rule = raw.get("rule")
        scope = raw.get("scope")
        reason = raw.get("reason")
        owner = raw.get("owner")
        review_condition = raw.get("reviewCondition")
        if rule not in RULES:
            errors.append(f"{prefix}: неизвестное rule {rule!r}")
        if not isinstance(scope, dict):
            errors.append(f"{prefix}: scope должен быть object")
            continue
        path = scope.get("path")
        line_start = scope.get("lineStart")
        line_end = scope.get("lineEnd")
        match_text = scope.get("match")
        max_occurrences = scope.get("maxOccurrences")
        if not _valid_repo_path(path):
            errors.append(f"{prefix}: scope.path должен быть точным repo-relative path")
        if (
            not isinstance(line_start, int)
            or isinstance(line_start, bool)
            or not isinstance(line_end, int)
            or isinstance(line_end, bool)
            or line_start < 1
            or line_end < line_start
            or line_end - line_start > 24
        ):
            errors.append(f"{prefix}: scope lines должны задавать диапазон не шире 25 строк")
        if not isinstance(match_text, str) or len(match_text.strip()) < 3:
            errors.append(f"{prefix}: scope.match должен быть точным literal-фрагментом")
        if (
            not isinstance(max_occurrences, int)
            or isinstance(max_occurrences, bool)
            or not 1 <= max_occurrences <= 5
        ):
            errors.append(f"{prefix}: scope.maxOccurrences должен быть от 1 до 5")
        if not isinstance(reason, str) or len(reason.strip()) < 20:
            errors.append(f"{prefix}: reason должен объяснять необходимость исключения")
        if not isinstance(owner, str) or len(owner.strip()) < 3:
            errors.append(f"{prefix}: owner обязателен")
        if not isinstance(review_condition, str) or len(review_condition.strip()) < 15:
            errors.append(f"{prefix}: reviewCondition обязателен")
        if any(
            message.startswith(prefix)
            for message in errors
        ):
            continue
        entries.append(
            LintException(
                identifier=identifier,
                rule=rule,
                path=path,
                line_start=line_start,
                line_end=line_end,
                match_text=match_text,
                max_occurrences=max_occurrences,
                reason=reason.strip(),
                owner=owner.strip(),
                review_condition=review_condition.strip(),
            )
        )
    return entries, errors


def load_exceptions(path: Path = EXCEPTIONS_PATH) -> list[LintException]:
    try:
        document = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise ValueError(f"Нет корректного lint exception registry: {path}") from exc
    entries, errors = parse_exception_document(document)
    if errors:
        raise ValueError("\n".join(errors))
    return entries


def _relative_path(path: Path) -> str:
    try:
        return path.resolve().relative_to(REPO_ROOT.resolve()).as_posix()
    except ValueError:
        return path.as_posix()


def _annotation_lines(source: str) -> dict[str, list[int]]:
    result: dict[str, list[int]] = defaultdict(list)
    for match in EXCEPTION_ANNOTATION.finditer(source):
        result[match.group(1)].append(source.count("\n", 0, match.start()) + 1)
    return result


def _consume_exception(
    *,
    relative: str,
    rule: str,
    match: re.Match[str],
    source: str,
    annotations: dict[str, list[int]],
    exceptions: Iterable[LintException],
    usage: Counter[str],
) -> bool:
    line = source.count("\n", 0, match.start()) + 1
    matched_text = match.group(0)
    for exception in exceptions:
        if (
            exception.path != relative
            or exception.rule != rule
            or not exception.line_start <= line <= exception.line_end
            or exception.match_text not in matched_text
            or usage[exception.identifier] >= exception.max_occurrences
        ):
            continue
        if not any(
            0 <= line - annotation_line <= 2
            for annotation_line in annotations.get(exception.identifier, [])
        ):
            continue
        usage[exception.identifier] += 1
        return True
    return False


def scan_file(
    path: Path,
    *,
    exceptions: Iterable[LintException] = (),
    exception_usage: Counter[str] | None = None,
) -> tuple[Counter[str], dict[str, list[int]]]:
    original_source = path.read_text(encoding="utf-8")
    source = strip_comments(original_source)
    relative = _relative_path(path)
    usage = exception_usage if exception_usage is not None else Counter()
    annotations = _annotation_lines(original_source)
    counts: Counter[str] = Counter()
    lines: dict[str, list[int]] = defaultdict(list)
    for rule, pattern in RULES.items():
        # Canonical Core/Catalog may document and compose internal authoring token
        # IDs. Product code may only address Context colors directly; Component
        # visuals are consumed through public Core classes/JS, not their variables.
        if rule in PRODUCT_ONLY_COLOR_RULES and relative.startswith(CANONICAL_UI_PREFIX):
            continue
        for match in pattern.finditer(source):
            if not should_count(rule, match):
                continue
            if _consume_exception(
                relative=relative,
                rule=rule,
                match=match,
                source=source,
                annotations=annotations,
                exceptions=exceptions,
                usage=usage,
            ):
                continue
            counts[rule] += 1
            if len(lines[rule]) < 5:
                lines[rule].append(source.count("\n", 0, match.start()) + 1)
    return counts, lines


def scan(
    globs: Iterable[str],
    *,
    exceptions: Iterable[LintException] = (),
    exception_usage: Counter[str] | None = None,
) -> tuple[dict[str, Counter[str]], dict[str, dict[str, list[int]]]]:
    counts: dict[str, Counter[str]] = {}
    line_map: dict[str, dict[str, list[int]]] = {}
    for path in iter_files(globs):
        relative = path.relative_to(REPO_ROOT).as_posix()
        file_counts, lines = scan_file(
            path,
            exceptions=exceptions,
            exception_usage=exception_usage,
        )
        if file_counts:
            counts[relative] = file_counts
            line_map[relative] = lines
    return counts, line_map


def registered_icons() -> set[str]:
    index = json.loads((REPO_ROOT / "design/icons/generated/index.json").read_text())
    return {glyph["key"] for glyph in index["glyphs"]}


def used_icons(paths: Iterable[Path]) -> dict[str, set[str]]:
    result: dict[str, set[str]] = defaultdict(set)
    patterns = (
        re.compile(r'data-rf-icon-glyph=["\']([a-z][a-z0-9-]*)["\']'),
        re.compile(r'(?:makeIcon|iconTemplate)\(\s*["\']([a-z][a-z0-9-]*)["\']'),
        re.compile(r'(?:setIconLabel|setIconLabelWithSize|appendSheetRow)\([^,\n]+,\s*["\']([a-z][a-z0-9-]*)["\']'),
    )
    for path in paths:
        source = strip_comments(path.read_text(encoding="utf-8"))
        relative = path.relative_to(REPO_ROOT).as_posix()
        for pattern in patterns:
            result[relative].update(pattern.findall(source))
    return result


def _normalise_reference(value: str) -> str:
    return value.strip().replace("\\", "/").split("?", 1)[0].split("#", 1)[0]


def import_boundary_violations_in_source(
    source: str,
    relative: str,
) -> list[tuple[str, int, str]]:
    violations: list[tuple[str, int, str]] = []
    for line_number, line in enumerate(source.splitlines(), start=1):
        if not REFERENCE_CONTEXT.search(line):
            continue
        references = [match.group(1) for match in QUOTED_REFERENCE.finditer(line)]
        references.extend(match.group(1) for match in URL_REFERENCE.finditer(line))
        for reference in references:
            normalised = _normalise_reference(reference)
            lower = normalised.casefold()
            if PUBLIC_DESIGN_SYSTEM_ENTRYPOINT.search(normalised):
                continue
            if "design-system/" in lower:
                violations.append((relative, line_number, normalised))
                continue
            if re.search(
                r"(?:^|/)generated/(?:web/)?(?:tokens|core-ui)\.(?:css|js|ts|json)$",
                lower,
            ):
                violations.append((relative, line_number, normalised))
    return violations


def find_import_boundary_violations(
    paths: Iterable[Path],
) -> list[tuple[str, int, str]]:
    violations: list[tuple[str, int, str]] = []
    for path in paths:
        relative = path.relative_to(REPO_ROOT).as_posix()
        violations.extend(
            import_boundary_violations_in_source(
                strip_comments(path.read_text(encoding="utf-8")),
                relative,
            )
        )
    return violations


def canonical_clone_aliases() -> dict[str, str]:
    document = json.loads(COMPONENT_REGISTRY.read_text(encoding="utf-8"))
    aliases = dict(LOCAL_CLONE_ALIASES)
    for component in document["components"]:
        canonical = component["name"]
        for synonym in component.get("synonyms", []):
            aliases[re.sub(r"[^a-z0-9]", "", synonym.casefold())] = canonical
        if component.get("status") == "deprecated" and component.get("replacement"):
            aliases[
                re.sub(r"[^a-z0-9]", "", component["name"].casefold())
            ] = component["replacement"]
    return aliases


def clone_candidates_in_source(source: str) -> list[tuple[str, str]]:
    names: set[str] = set()
    for value in CLASS_ATTRIBUTE.findall(source):
        names.update(value.split())
    names.update(CSS_CLASS.findall(source))
    names.update(CODE_DECLARATION.findall(source))
    candidates: list[tuple[str, str]] = []
    aliases = canonical_clone_aliases()
    for name in sorted(names, key=str.casefold):
        normalised = re.sub(r"[^a-z0-9]", "", name.casefold())
        canonical = aliases.get(normalised)
        if canonical:
            candidates.append((name, canonical))
    return candidates


def find_clone_candidates(
    paths: Iterable[Path],
) -> dict[str, list[tuple[str, str]]]:
    result: dict[str, list[tuple[str, str]]] = {}
    for path in paths:
        candidates = clone_candidates_in_source(
            strip_comments(path.read_text(encoding="utf-8"))
        )
        if candidates:
            result[path.relative_to(REPO_ROOT).as_posix()] = candidates
    return result


def _validate_violations(violations: object) -> list[str]:
    errors: list[str] = []
    if not isinstance(violations, dict):
        return ["legacy baseline: violations должен быть object"]
    for path, raw_counts in violations.items():
        if not _valid_repo_path(path) or not isinstance(raw_counts, dict):
            errors.append(f"legacy baseline: некорректный scope {path!r}")
            continue
        for rule, count in raw_counts.items():
            if rule not in RULES:
                errors.append(f"legacy baseline: неизвестное rule {rule!r} в {path}")
            if not isinstance(count, int) or isinstance(count, bool) or count < 0:
                errors.append(f"legacy baseline: {path}/{rule} должен быть non-negative int")
    return errors


def _violation_total(violations: dict[str, dict[str, int]]) -> int:
    return sum(sum(counts.values()) for counts in violations.values())


def parse_baseline_document(document: object) -> tuple[dict[str, dict[str, int]], list[str]]:
    if not isinstance(document, dict):
        return {}, ["legacy baseline: root должен быть object"]
    errors: list[str] = []
    if document.get("$schemaVersion") != 2:
        errors.append("legacy baseline: $schemaVersion должен быть 2")
    violations = document.get("violations")
    errors.extend(_validate_violations(violations))
    if not isinstance(violations, dict):
        return {}, errors
    maximum_total = document.get("$maximumTotal")
    total = _violation_total(violations)
    if maximum_total != total:
        errors.append(
            "legacy baseline: $maximumTotal должен точно совпадать с суммой scoped limits"
        )
    review = document.get("$baselineReview")
    if maximum_total > UNREVIEWED_BASELINE_CEILING and review is None:
        errors.append(
            "legacy baseline: рост выше approved ceiling требует $baselineReview"
        )
    if review is not None:
        if not isinstance(review, dict):
            errors.append("legacy baseline: $baselineReview должен быть object или null")
        else:
            required = (
                "id",
                "owner",
                "reason",
                "previousTotal",
                "approvedTotal",
                "scopedIncreases",
            )
            if any(key not in review for key in required):
                errors.append("legacy baseline: reviewed increase содержит не все поля")
            elif (
                not isinstance(review["id"], str)
                or not re.fullmatch(r"[A-Z][A-Z0-9-]{2,63}", review["id"])
                or not isinstance(review["owner"], str)
                or len(review["owner"].strip()) < 3
                or not isinstance(review["reason"], str)
                or len(review["reason"].strip()) < 20
                or not isinstance(review["previousTotal"], int)
                or not isinstance(review["approvedTotal"], int)
                or review["approvedTotal"] < maximum_total
                or not isinstance(review["scopedIncreases"], list)
                or not review["scopedIncreases"]
                or not all(
                    isinstance(scope, str) and scope
                    for scope in review["scopedIncreases"]
                )
            ):
                errors.append("legacy baseline: некорректный explicit reviewed increase")
    return violations, errors


def load_baseline_document(path: Path = BASELINE_PATH) -> dict[str, object]:
    try:
        document = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise ValueError("Нет корректного legacy baseline") from exc
    _, errors = parse_baseline_document(document)
    if errors:
        raise ValueError("\n".join(errors))
    return document


def load_baseline() -> dict[str, dict[str, int]]:
    return load_baseline_document()["violations"]


def serialise(
    counts: dict[str, Counter[str]],
    *,
    review: dict[str, object] | None,
) -> dict[str, object]:
    violations = {
        path: dict(sorted(file_counts.items()))
        for path, file_counts in sorted(counts.items())
    }
    return {
        "$schemaVersion": 2,
        "$description": (
            "Legacy UI debt ratchet. Scoped counts may decrease; every scoped increase "
            "requires an explicit reviewed baseline update."
        ),
        "$maximumTotal": _violation_total(violations),
        "$baselineReview": review,
        "violations": violations,
    }


def _scoped_increases(
    counts: dict[str, Counter[str]],
    baseline: dict[str, dict[str, int]],
) -> list[tuple[str, str, int, int]]:
    return [
        (path, rule, count, int(baseline.get(path, {}).get(rule, 0)))
        for path, file_counts in counts.items()
        for rule, count in file_counts.items()
        if count > int(baseline.get(path, {}).get(rule, 0))
    ]


def reviewed_increase_metadata(
    *,
    previous_total: int,
    approved_total: int,
    increases: list[tuple[str, str, int, int]],
    review_id: str | None,
    review_owner: str | None,
    review_reason: str | None,
) -> dict[str, object]:
    if (
        not review_id
        or not re.fullmatch(r"[A-Z][A-Z0-9-]{2,63}", review_id)
        or not review_owner
        or len(review_owner.strip()) < 3
        or not review_reason
        or len(review_reason.strip()) < 20
    ):
        raise ValueError(
            "Baseline increase требует --review-id, --review-owner и содержательный "
            "--review-reason."
        )
    return {
        "id": review_id,
        "owner": review_owner.strip(),
        "reason": review_reason.strip(),
        "previousTotal": previous_total,
        "approvedTotal": approved_total,
        "scopedIncreases": [
            f"{path}:{rule} {allowed}->{current}"
            for path, rule, current, allowed in increases
        ],
    }


def update_baseline(
    counts: dict[str, Counter[str]],
    *,
    review_id: str | None = None,
    review_owner: str | None = None,
    review_reason: str | None = None,
) -> int:
    try:
        previous_document = load_baseline_document()
    except ValueError as exc:
        print(str(exc), file=sys.stderr)
        return 1
    previous = previous_document["violations"]
    increases = _scoped_increases(counts, previous)
    review: dict[str, object] | None = None
    if increases:
        try:
            review = reviewed_increase_metadata(
                previous_total=int(previous_document["$maximumTotal"]),
                approved_total=sum(
                    sum(file_counts.values()) for file_counts in counts.values()
                ),
                increases=increases,
                review_id=review_id,
                review_owner=review_owner,
                review_reason=review_reason,
            )
        except ValueError as exc:
            print(
                f"{exc} Обычный CI fix через baseline запрещён.",
                file=sys.stderr,
            )
            return 1
    else:
        previous_review = previous_document.get("$baselineReview")
        review = previous_review if isinstance(previous_review, dict) else None

    document = serialise(counts, review=review)
    BASELINE_PATH.write_text(
        json.dumps(document, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Design System lint: baseline обновлён — {BASELINE_PATH.relative_to(REPO_ROOT)}")
    return 0


def report_examples(
    title: str,
    failures: list[tuple[str, str, int, int]],
    lines: dict[str, dict[str, list[int]]],
) -> None:
    print(title, file=sys.stderr)
    for path, rule, current, allowed in failures:
        locations = ",".join(str(line) for line in lines.get(path, {}).get(rule, []))
        location_text = f"; первые строки: {locations}" if locations else ""
        print(
            f"- {path}: {rule} = {current}, разрешено {allowed}{location_text}",
            file=sys.stderr,
        )


def unknown_css_tokens(source: str, definitions: set[str]) -> list[tuple[int, str]]:
    """Validate public rf references; optional variables with fallback are legal."""
    clean = strip_comments(source)
    known = definitions | set(re.findall(r"(--rf-[\w-]+)\s*:", clean))
    known.update(re.findall(r"setProperty\(\s*['\"](--rf-[\w-]+)['\"]", clean))
    return [
        (clean.count("\n", 0, match.start()) + 1, match.group(1))
        for match in re.finditer(r"var\(\s*(--rf-[\w-]+)\s*\)", clean)
        if match.group(1) not in known
    ]


def find_unknown_css_tokens() -> list[tuple[str, int, str]]:
    # Canonical component CSS also declares local rf properties (e.g. progress).
    css_files = list((SYSTEM_ROOT / "web").rglob("*.css"))
    css_files += list((SYSTEM_ROOT / "generated/web").glob("*.css"))
    definitions = set(re.findall(
        r"(--rf-[\w-]+)\s*:",
        "\n".join(strip_comments(path.read_text()) for path in css_files),
    ))
    paths = {path for glob in (*STRICT_GLOBS, *PRODUCT_GLOBS) for path in REPO_ROOT.glob(glob)}
    failures = []
    for path in sorted(paths):
        relative = str(path.relative_to(REPO_ROOT))
        if relative in EXCLUDED_PATHS:
            continue
        failures.extend((relative, line, name) for line, name in unknown_css_tokens(path.read_text(), definitions))
    return failures


def check() -> int:
    try:
        exceptions = load_exceptions()
    except ValueError as exc:
        print(str(exc), file=sys.stderr)
        return 1
    exception_usage: Counter[str] = Counter()
    token_failures = find_unknown_css_tokens()
    for path, line, name in token_failures:
        print(f"- {path}:{line}: неизвестный CSS token {name}", file=sys.stderr)
    product_counts, product_lines = scan(
        PRODUCT_GLOBS,
        exceptions=exceptions,
        exception_usage=exception_usage,
    )
    strict_counts, strict_lines = scan(
        STRICT_GLOBS,
        exceptions=exceptions,
        exception_usage=exception_usage,
    )

    strict_failures = [
        (path, rule, count, 0)
        for path, counts in strict_counts.items()
        for rule, count in counts.items()
    ]
    if strict_failures:
        report_examples(
            "Design System source/catalog содержит literal values:",
            strict_failures,
            strict_lines,
        )

    stale_exceptions = [
        exception
        for exception in exceptions
        if exception_usage[exception.identifier] != exception.max_occurrences
    ]
    if stale_exceptions:
        print("Lint exception не совпало с точным annotated scope:", file=sys.stderr)
        for exception in stale_exceptions:
            print(
                f"- {exception.identifier}: использовано "
                f"{exception_usage[exception.identifier]}/{exception.max_occurrences}",
                file=sys.stderr,
            )

    try:
        baseline = load_baseline()
    except ValueError as exc:
        print(str(exc), file=sys.stderr)
        return 1

    ratchet_failures = _scoped_increases(product_counts, baseline)
    if ratchet_failures:
        report_examples(
            "Legacy UI debt вырос:",
            ratchet_failures,
            product_lines,
        )

    public_color_failures = [
        (path, rule, count, 0)
        for path, counts in product_counts.items()
        for rule, count in counts.items()
        if rule in PUBLIC_COLOR_RULES
    ]
    if public_color_failures:
        report_examples(
            "Product-код обращается к внутреннему color API вместо Context:",
            public_color_failures,
            product_lines,
        )

    public_foundation_failures = [
        (path, rule, count, 0)
        for path, counts in product_counts.items()
        for rule, count in counts.items()
        if rule in PUBLIC_FOUNDATION_RULES
    ]
    if public_foundation_failures:
        report_examples(
            "Product-код обращается к Primitive Dimension или deprecated Space:",
            public_foundation_failures,
            product_lines,
        )

    product_files = iter_files(PRODUCT_GLOBS)
    import_failures = find_import_boundary_violations(product_files)
    if import_failures:
        print("Нарушена граница публичного Design System API:", file=sys.stderr)
        for path, line, reference in import_failures:
            print(f"- {path}:{line}: deep/private import {reference}", file=sys.stderr)

    all_icon_files = product_files + iter_files(("design/design-system/web/*.html",))
    known = registered_icons()
    unknown = {
        path: sorted(names - known)
        for path, names in used_icons(all_icon_files).items()
        if names - known
    }
    if unknown:
        print("Использованы незарегистрированные иконки:", file=sys.stderr)
        for path, names in sorted(unknown.items()):
            print(f"- {path}: {', '.join(names)}", file=sys.stderr)

    clone_candidates = find_clone_candidates(product_files)
    if clone_candidates:
        print("Design System audit candidates (warning, не CI failure):", file=sys.stderr)
        for path, candidates in sorted(clone_candidates.items()):
            values = ", ".join(f"{name} → {canonical}" for name, canonical in candidates)
            print(f"- {path}: {values}", file=sys.stderr)

    if (
        strict_failures
        or token_failures
        or stale_exceptions
        or ratchet_failures
        or public_color_failures
        or public_foundation_failures
        or import_failures
        or unknown
    ):
        print(
            "Используйте public Core UI entrypoints, только Context color tokens и "
            "property-specific foundation tokens вместо raw Dimension/Space; "
            "визуал Component подключается через Core classes/JS. "
            "baseline и exceptions меняются только через осознанный review.",
            file=sys.stderr,
        )
        return 1

    total = sum(sum(counts.values()) for counts in product_counts.values())
    print(
        "Design System lint: source/catalog чисты, Context — единственный public "
        "color API, import boundaries соблюдены, "
        f"legacy baseline не вырос ({total} зафиксированных сигналов)."
    )
    return 0


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--update-baseline",
        action="store_true",
        help="зафиксировать уменьшение debt или reviewed increase",
    )
    parser.add_argument("--review-id", help="review/ticket ID для scoped increase")
    parser.add_argument("--review-owner", help="ответственный за reviewed increase")
    parser.add_argument("--review-reason", help="почему violation пока нельзя устранить")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    if not args.update_baseline and any(
        (args.review_id, args.review_owner, args.review_reason)
    ):
        print("Review metadata допустимы только с --update-baseline.", file=sys.stderr)
        return 2
    counts, _ = scan(PRODUCT_GLOBS)
    if args.update_baseline:
        return update_baseline(
            counts,
            review_id=args.review_id,
            review_owner=args.review_owner,
            review_reason=args.review_reason,
        )
    return check()


if __name__ == "__main__":
    raise SystemExit(main())
