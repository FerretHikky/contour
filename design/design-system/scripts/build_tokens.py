#!/usr/bin/env python3
"""Validate Reflower DTCG tokens and build deterministic platform outputs."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Iterable
from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit


REPO_ROOT = Path(__file__).resolve().parents[3]
SYSTEM_ROOT = REPO_ROOT / "design" / "design-system"
TOKEN_ROOT = SYSTEM_ROOT / "tokens"
SCHEMA = "https://www.designtokens.org/schemas/2025.10/format.json"

FOUNDATION_SOURCE = TOKEN_ROOT / "foundations.json"
TYPOGRAPHY_SOURCE = TOKEN_ROOT / "typography.json"
TYPOGRAPHY_MOBILE_SOURCE = TOKEN_ROOT / "typography-mobile.json"
TYPOGRAPHY_MODE_EXTENSION = "com.reflower.typographyMode"
CORE_SOURCES = (
    FOUNDATION_SOURCE,
    TOKEN_ROOT / "primitives.json",
    TOKEN_ROOT / "static.json",
    TYPOGRAPHY_SOURCE,
)
COLOR_PRIMITIVE_SOURCE = TOKEN_ROOT / "color-primitives.json"
CONTEXT_SOURCE = TOKEN_ROOT / "context.json"
COMPONENT_SOURCE = TOKEN_ROOT / "components.json"
TOKEN_MIGRATIONS_SOURCE = SYSTEM_ROOT / "token-migrations.json"
THEME_SOURCES = {
    "light": TOKEN_ROOT / "themes" / "light.json",
    "dark": TOKEN_ROOT / "themes" / "dark.json",
}

MASTER_COLOR_CSS = REPO_ROOT / "design" / "brand" / "colors" / "tokens.css"
MASTER_COLOR_JSON = REPO_ROOT / "design" / "brand" / "colors" / "tokens.json"
MASTER_FOUNDATION_CSS = (
    REPO_ROOT / "design" / "brand" / "foundations" / "tokens.css"
)
MASTER_TYPOGRAPHY_CSS = (
    REPO_ROOT / "design" / "brand" / "typography" / "typography.css"
)
MASTER_TYPOGRAPHY_FONT_ROOT = (
    REPO_ROOT / "design" / "brand" / "typography" / "fonts"
)
GENERATED_ROOT = SYSTEM_ROOT / "generated"
GENERATED_WEB = GENERATED_ROOT / "web"
WEB_ROOT = SYSTEM_ROOT / "web"
WEB_PRIMITIVES_CSS = WEB_ROOT / "primitives.css"
WEB_COMPONENT_ENTRYPOINT = WEB_ROOT / "components.css"
WEB_BEHAVIOR_JS = WEB_ROOT / "core-ui.js"
REACT_ROOT = SYSTEM_ROOT / "adapters" / "react"
ICONS_SOURCE = REPO_ROOT / "design" / "icons" / "icons.js"

CSS_BLOCK_COMMENT_RE = re.compile(r"/\*.*?\*/", re.DOTALL)
COMPONENT_IMPORT_RE = re.compile(
    r"@import\s+url\((?P<quote>[\"'])\./"
    r"(?P<path>components/[a-z0-9-]+\.css)"
    r"(?:\?v=[A-Za-z0-9._-]+)?(?P=quote)\);"
)

ALIAS_RE = re.compile(r"^\{([A-Za-z0-9_.-]+)\}$")
CAMEL_RE = re.compile(r"(?<!^)(?=[A-Z])")
TOKEN_PATH_RE = re.compile(r"^[A-Za-z0-9_-]+(?:\.[A-Za-z0-9_-]+)+$")
SEMVER_RE = re.compile(r"^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$")

PRIMITIVE_COLOR_RAMPS = (
    "coral",
    "gray",
    "green",
    "red",
    "blue",
    "yellow",
    "orange",
)
ALIAS_COLOR_RAMPS = (
    "brand",
    "neutral",
    "success",
    "error",
    "warning",
    "info",
)
ALIAS_RAMP_SOURCES = {
    "brand": "coral",
    "neutral": "gray",
    "success": "green",
    "error": "red",
    "warning": "orange",
    "info": "blue",
}
ALIAS_NAMED_COLOR_ALIASES = {
    "color.alias.neutral.canvas": {
        "light": "{color.primitive.gray.0}",
        "dark": "{color.primitive.gray.11}",
    },
}
COLOR_STEPS = tuple(str(step) for step in range(11))
GRAY_COLOR_STEPS = COLOR_STEPS + ("11",)
OVERLAY_NAMES = (
    "transparent",
    "hover",
    "active",
    "selected",
    "disabled",
    "scrim",
    "backdrop",
    "skeletonBase",
    "skeletonHighlight",
)
RAMP_EXTENSION = "com.reflower.colorRamp"

DIMENSION_SCALE = (
    ("0", 0),
    ("1", 1),
    ("2", 2),
    ("4", 4),
    ("8", 8),
    ("12", 12),
    ("16", 16),
    ("20", 20),
    ("24", 24),
    ("28", 28),
    ("32", 32),
    ("36", 36),
    ("40", 40),
    ("44", 44),
    ("48", 48),
    ("56", 56),
    ("64", 64),
    ("72", 72),
    ("80", 80),
    ("96", 96),
    ("112", 112),
    ("120", 120),
    ("128", 128),
    ("160", 160),
    ("248", 248),
    ("480", 480),
    ("560", 560),
    ("1600", 1600),
)
LEGACY_DIMENSION_CONSTRAINT_STEPS = ("112", "248", "480", "560", "1600")
OPACITY_SCALE = (("0", 0), ("10", 0.1), ("20", 0.2), ("50", 0.5), ("70", 0.7), ("100", 1))
SPACING_SCALE = (
    "0", "2", "4", "8", "12", "16", "20", "24", "32", "40", "44", "48",
    "64", "80", "96", "112", "128", "160", "248", "480", "560", "1600",
)
RADIUS_SCALE = (
    ("none", "0"),
    ("xs", "2"),
    ("sm", "4"),
    ("md", "8"),
    ("lg", "12"),
    ("xl", "16"),
    ("2xl", "24"),
    ("3xl", "32"),
    ("4xl", "40"),
    ("5xl", "48"),
    ("6xl", "64"),
    ("full", "160"),
)
BORDER_WIDTH_SCALE = (
    ("none", "0"),
    ("thin", "1"),
    ("medium", "2"),
    ("heavy", "4"),
)
LEGACY_SPACE_SCALE = (
    ("0", "dimension.0"),
    ("1", "dimension.4"),
    ("2", "dimension.8"),
    ("3", "dimension.12"),
    ("4", "dimension.16"),
    ("5", "dimension.20"),
    ("6", "dimension.24"),
    ("8", "dimension.32"),
    ("10", "dimension.40"),
    ("12", "dimension.48"),
    ("16", "dimension.64"),
)
TYPOGRAPHY_FAMILY_NAMES = ("title", "headline", "body")
TYPOGRAPHY_FONT_STACK = ("Onest", "system-ui", "-apple-system", "Segoe UI", "sans-serif")
TYPOGRAPHY_WEIGHT_SCALE = (("regular", 400), ("medium", 500), ("bold", 700))
TYPOGRAPHY_SIZE_SCALE = (
    ("3xs", 8),
    ("2xs", 10),
    ("xs", 12),
    ("s", 14),
    ("m", 16),
    ("l", 18),
    ("xl", 20),
    ("2xl", 22),
    ("3xl", 24),
    ("4xl", 32),
    ("5xl", 40),
    ("6xl", 48),
    ("7xl", 56),
)
TYPOGRAPHY_LINE_HEIGHT_SCALE = (
    ("4xs", 10),
    ("3xs", 12),
    ("2xs", 14),
    ("xs", 16),
    ("s", 18),
    ("m", 20),
    ("l", 22),
    ("xl", 24),
    ("2xl", 26),
    ("3xl", 28),
    ("4xl", 32),
    ("5xl", 40),
    ("6xl", 48),
    ("7xl", 56),
    ("8xl", 64),
)
TYPOGRAPHY_STYLES = (
    ("display", "xl", "title", "7xl", "8xl", "bold", "normal"),
    ("display", "l", "title", "6xl", "7xl", "bold", "normal"),
    ("display", "m", "title", "5xl", "6xl", "bold", "normal"),
    ("display", "s", "title", "4xl", "5xl", "bold", "normal"),
    ("title", "xl", "title", "3xl", "4xl", "bold", "normal"),
    ("title", "l", "title", "xl", "3xl", "bold", "normal"),
    ("title", "m", "title", "xl", "xl", "bold", "normal"),
    ("title", "s", "title", "l", "l", "bold", "normal"),
    ("headline", "xl", "headline", "5xl", "6xl", "medium", "normal"),
    ("headline", "l", "headline", "4xl", "5xl", "medium", "normal"),
    ("headline", "m", "headline", "3xl", "3xl", "medium", "normal"),
    ("headline", "s", "headline", "xl", "xl", "medium", "normal"),
    ("headline", "xs", "headline", "m", "m", "medium", "normal"),
    ("headline", "xxs", "headline", "s", "xs", "medium", "normal"),
    ("body", "xl", "body", "xl", "xl", "regular", "normal"),
    ("body", "l", "body", "l", "l", "regular", "normal"),
    ("body", "m", "body", "m", "m", "regular", "normal"),
    ("body", "s", "body", "s", "s", "regular", "normal"),
    ("body", "xs", "body", "xs", "xs", "regular", "normal"),
    ("body", "xxs", "body", "2xs", "2xs", "regular", "normal"),
)
TYPOGRAPHY_MOBILE_STYLES = TYPOGRAPHY_STYLES
TYPOGRAPHY_MODE_STYLES = {
    "desktop": TYPOGRAPHY_STYLES,
    "mobile": TYPOGRAPHY_MOBILE_STYLES,
}
ONEST_CYRILLIC_UNICODE_RANGES = (
    (0x0301, 0x0301),
    (0x0400, 0x045F),
    (0x0490, 0x0491),
    (0x04A2, 0x04A3),
    (0x04AE, 0x04AF),
    (0x04B0, 0x04B1),
    (0x04E8, 0x04E9),
    (0x2116, 0x2116),
)


class TokenError(ValueError):
    """A token source is invalid or cannot be resolved."""


@dataclass(frozen=True)
class Token:
    name: str
    value: Any
    token_type: str | None
    description: str | None = None


def load_json(path: Path) -> dict[str, Any]:
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise TokenError(f"Не удалось прочитать {path.relative_to(REPO_ROOT)}: {exc}") from exc
    if not isinstance(data, dict):
        raise TokenError(f"{path.relative_to(REPO_ROOT)} должен содержать JSON-объект")
    if data.get("$schema") != SCHEMA:
        raise TokenError(
            f"{path.relative_to(REPO_ROOT)} должен использовать schema {SCHEMA}"
        )
    return data


def color_from_hex(hex_value: str, alpha: int | float = 1) -> dict[str, Any]:
    if not re.fullmatch(r"#[0-9A-Fa-f]{6}", hex_value):
        raise TokenError(f"Некорректный HEX в color ramp: {hex_value}")
    channels = [int(hex_value[index : index + 2], 16) for index in (1, 3, 5)]
    return {
        "colorSpace": "srgb",
        "components": [round(channel / 255, 6) for channel in channels],
        "alpha": alpha,
        "hex": hex_value.upper(),
    }


def interpolate_hex_between(
    start_hex: str, target_hex: str, amount: int | float
) -> str:
    """Interpolate two opaque sRGB colors channel by channel."""
    start = [int(start_hex[index : index + 2], 16) for index in (1, 3, 5)]
    target = [int(target_hex[index : index + 2], 16) for index in (1, 3, 5)]
    amount = float(amount)
    if not 0 <= amount <= 1:
        raise TokenError(f"Color ramp amount должен быть в диапазоне 0…1: {amount}")
    mixed = [
        int(channel + (target_channel - channel) * amount + 0.5)
        for channel, target_channel in zip(start, target)
    ]
    return "#" + "".join(f"{channel:02X}" for channel in mixed)


def interpolate_hex(seed_hex: str, mix: int | float) -> str:
    """Mix an sRGB seed toward white (positive) or black (negative)."""
    amount = abs(float(mix))
    if not 0 <= amount <= 1:
        raise TokenError(f"Color ramp mix должен быть в диапазоне -1…1: {mix}")
    target_hex = "#FFFFFF" if mix >= 0 else "#000000"
    return interpolate_hex_between(seed_hex, target_hex, amount)


def load_color_primitives() -> tuple[dict[str, Token], dict[str, Any]]:
    """Expand the color-family seeds into deterministic opaque 0..10 ramps."""
    document = load_json(COLOR_PRIMITIVE_SOURCE)
    try:
        primitive = document["color"]["primitive"]
        recipe = primitive["$extensions"][RAMP_EXTENSION]
    except (KeyError, TypeError) as exc:
        raise TokenError(
            f"{COLOR_PRIMITIVE_SOURCE.relative_to(REPO_ROOT)}: отсутствует {RAMP_EXTENSION}"
        ) from exc

    if not isinstance(primitive, dict) or primitive.get("$type") != "color":
        raise TokenError("color-primitives.json: color.primitive должен иметь $type=color")
    groups = {key for key in primitive if not key.startswith("$")}
    if groups != set(PRIMITIVE_COLOR_RAMPS):
        raise TokenError(
            "color-primitives.json: обязательны только рампы "
            + ", ".join(PRIMITIVE_COLOR_RAMPS)
        )
    if not isinstance(recipe, dict):
        raise TokenError("color-primitives.json: ramp recipe должен быть объектом")
    if recipe.get("version") != 2 or recipe.get("colorSpace") != "srgb":
        raise TokenError("color-primitives.json: поддерживается только recipe v2/srgb")
    if recipe.get("steps") != list(COLOR_STEPS) or recipe.get("seedStep") != "5":
        raise TokenError("color-primitives.json: recipe должен объявлять steps 0..10 и seedStep=5")
    mix = recipe.get("mix")
    if not isinstance(mix, dict) or set(mix) != set(COLOR_STEPS) or mix.get("5") != 0:
        raise TokenError("color-primitives.json: recipe.mix должен полностью описывать 0..10")
    gray_anchor_steps = recipe.get("grayAnchorSteps")
    if gray_anchor_steps != ["0", "1", "5", "10", "11"]:
        raise TokenError(
            "color-primitives.json: Gray должен объявлять anchors 0, 1, 5, 10 и 11"
        )
    tokens: dict[str, Token] = {}
    for ramp in PRIMITIVE_COLOR_RAMPS:
        group = primitive[ramp]
        expected_source_steps = (
            set(gray_anchor_steps)
            if ramp == "gray"
            else {"5"}
        )
        if (
            not isinstance(group, dict)
            or {key for key in group if not key.startswith("$")} != expected_source_steps
        ):
            expected = ", ".join(sorted(expected_source_steps, key=int))
            raise TokenError(
                f"color.primitive.{ramp}: source должен содержать только anchors {expected}"
            )

        source_hex: dict[str, str] = {}
        for source_step in expected_source_steps:
            source_node = group[source_step]
            name = f"color.primitive.{ramp}.{source_step}"
            if not isinstance(source_node, dict) or "$value" not in source_node:
                raise TokenError(f"{name}: отсутствует $value")
            source_value = source_node["$value"]
            validate_color(source_value, name)
            if source_value.get("alpha", 1) != 1:
                raise TokenError(f"{name}: primitive anchor должен быть opaque")
            source_hex[source_step] = str(source_value["hex"]).upper()

        seed_hex = source_hex["5"]
        if ramp == "gray":
            if (
                source_hex["0"] != "#FFFFFF"
                or source_hex["10"] != "#34343A"
                or source_hex["11"] != "#18181B"
            ):
                raise TokenError(
                    "color.primitive.gray: anchors 0/10/11 должны быть "
                    "#FFFFFF/#34343A/#18181B"
                )
            light_profile = float(mix["1"])
            dark_profile = abs(float(mix["10"]))
            if light_profile <= 0 or dark_profile <= 0:
                raise TokenError(
                    "color-primitives.json: Gray profile требует положительный light mix "
                    "и отрицательный dark mix"
                )
        for step in GRAY_COLOR_STEPS if ramp == "gray" else COLOR_STEPS:
            if ramp != "gray":
                hex_value = interpolate_hex(seed_hex, mix[step])
            elif step in source_hex:
                hex_value = source_hex[step]
            elif int(step) < 5:
                hex_value = interpolate_hex_between(
                    seed_hex,
                    source_hex["1"],
                    float(mix[step]) / light_profile,
                )
            else:
                hex_value = interpolate_hex_between(
                    seed_hex,
                    source_hex["10"],
                    abs(float(mix[step])) / dark_profile,
                )
            name = f"color.primitive.{ramp}.{step}"
            tokens[name] = Token(
                name=name,
                value=color_from_hex(hex_value),
                token_type="color",
                description=(
                    group.get("$description")
                    if step == "5" and isinstance(group.get("$description"), str)
                    else None
                ),
            )
    return tokens, recipe


def flatten_tokens(
    node: dict[str, Any],
    prefix: tuple[str, ...] = (),
    inherited_type: str | None = None,
) -> dict[str, Token]:
    current_type = node.get("$type", inherited_type)
    if "$value" in node:
        if not prefix:
            raise TokenError("Токен без имени")
        name = ".".join(prefix)
        return {
            name: Token(
                name=name,
                value=node["$value"],
                token_type=current_type,
                description=node.get("$description"),
            )
        }

    result: dict[str, Token] = {}
    for key, value in node.items():
        if key.startswith("$"):
            continue
        if not isinstance(value, dict):
            raise TokenError(f"Группа {'.'.join(prefix + (key,))} должна быть объектом")
        child_tokens = flatten_tokens(value, prefix + (key,), current_type)
        duplicate = result.keys() & child_tokens.keys()
        if duplicate:
            raise TokenError(f"Повторный токен: {sorted(duplicate)[0]}")
        result.update(child_tokens)
    return result


def merge_token_sets(*sets: dict[str, Token]) -> dict[str, Token]:
    merged: dict[str, Token] = {}
    for token_set in sets:
        duplicate = merged.keys() & token_set.keys()
        if duplicate:
            raise TokenError(f"Токен объявлен дважды: {sorted(duplicate)[0]}")
        merged.update(token_set)
    return merged


def typography_style_contract(
    styles: tuple[tuple[str, str, str, str, str, str, str], ...],
) -> dict[str, dict[str, str]]:
    """Return the exact public Style to Primitive alias contract for a mode."""
    contract: dict[str, dict[str, str]] = {}
    for (
        role,
        size,
        family,
        primitive_size,
        primitive_line_height,
        weight,
        letter_spacing,
    ) in styles:
        contract[f"typography.style.{role}.{size}"] = {
            "fontFamily": f"{{font.family.{family}}}",
            "fontSize": f"{{font.size.{primitive_size}}}",
            "fontWeight": f"{{font.weight.{weight}}}",
            "letterSpacing": f"{{font.letterSpacing.{letter_spacing}}}",
            "lineHeight": f"{{font.lineHeight.{primitive_line_height}}}",
        }
    return contract


def load_typography_modes(core: dict[str, Token]) -> dict[str, dict[str, Token]]:
    """Expand the explicit Mobile override source into the full public path contract."""
    desktop_document = load_json(TYPOGRAPHY_SOURCE)
    desktop_extension = desktop_document.get("$extensions", {}).get(
        TYPOGRAPHY_MODE_EXTENSION
    )
    if desktop_extension != {"mode": "desktop", "default": True}:
        raise TokenError(
            "typography.json: Desktop mode должен быть явным default mode"
        )

    mobile_document = load_json(TYPOGRAPHY_MOBILE_SOURCE)
    mobile_extension = mobile_document.get("$extensions", {}).get(
        TYPOGRAPHY_MODE_EXTENSION
    )
    if not isinstance(mobile_extension, dict):
        raise TokenError(
            f"typography-mobile.json: отсутствует {TYPOGRAPHY_MODE_EXTENSION}"
        )
    required_metadata = {
        "mode": "mobile",
        "inherits": TYPOGRAPHY_SOURCE.name,
        "mediaQuery": "(max-width: 639px)",
        "publicPathContract": "inherit-exact",
    }
    for key, expected in required_metadata.items():
        if mobile_extension.get(key) != expected:
            raise TokenError(
                f"typography-mobile.json: {key} должен быть {expected!r}"
            )

    overrides = mobile_extension.get("overrides")
    if not isinstance(overrides, dict) or not all(
        isinstance(name, str) and isinstance(value, str)
        for name, value in overrides.items()
    ):
        raise TokenError("typography-mobile.json: overrides должен быть string map")

    desktop_contract = typography_style_contract(TYPOGRAPHY_STYLES)
    mobile_contract = typography_style_contract(TYPOGRAPHY_MOBILE_STYLES)
    expected_overrides: dict[str, str] = {}
    if desktop_contract != mobile_contract:
        raise TokenError(
            "Typography v2 использует mode-stable Styles; Mobile contract не может отличаться"
        )
    if overrides != expected_overrides:
        missing = sorted(set(expected_overrides) - set(overrides))
        extra = sorted(set(overrides) - set(expected_overrides))
        changed = sorted(
            name
            for name in set(overrides) & set(expected_overrides)
            if overrides[name] != expected_overrides[name]
        )
        raise TokenError(
            "typography-mobile.json: responsive overrides расходятся: "
            f"нет={missing}, лишние={extra}, неверные={changed}"
        )

    mobile = dict(core)
    for name, value in overrides.items():
        desktop_token = core.get(name)
        if desktop_token is None:
            raise TokenError(f"typography-mobile.json: неизвестный override {name}")
        mobile[name] = Token(
            name=name,
            value=value,
            token_type=desktop_token.token_type,
            description=desktop_token.description,
        )
    return {"desktop": core, "mobile": mobile}


def iter_aliases(value: Any) -> Iterable[str]:
    if isinstance(value, str):
        match = ALIAS_RE.fullmatch(value)
        if match:
            yield match.group(1)
    elif isinstance(value, list):
        for item in value:
            yield from iter_aliases(item)
    elif isinstance(value, dict):
        for item in value.values():
            yield from iter_aliases(item)


def resolve_value(
    value: Any,
    tokens: dict[str, Token],
    stack: tuple[str, ...] = (),
) -> Any:
    if isinstance(value, str):
        match = ALIAS_RE.fullmatch(value)
        if not match:
            return value
        target = match.group(1)
        if target not in tokens:
            owner = stack[-1] if stack else "неизвестный токен"
            raise TokenError(f"{owner} ссылается на отсутствующий {target}")
        if target in stack:
            cycle = " → ".join((*stack, target))
            raise TokenError(f"Циклическая ссылка токенов: {cycle}")
        return resolve_value(tokens[target].value, tokens, (*stack, target))
    if isinstance(value, list):
        return [resolve_value(item, tokens, stack) for item in value]
    if isinstance(value, dict):
        return {key: resolve_value(item, tokens, stack) for key, item in value.items()}
    return value


def validate_color(value: Any, name: str) -> None:
    if not isinstance(value, dict):
        raise TokenError(f"{name}: color должен быть объектом DTCG, а не HEX-строкой")
    if value.get("colorSpace") != "srgb":
        raise TokenError(f"{name}: первая версия генератора поддерживает только sRGB")
    components = value.get("components")
    if not isinstance(components, list) or len(components) != 3:
        raise TokenError(f"{name}: у sRGB должны быть три components")
    if any(not isinstance(item, (int, float)) or not 0 <= item <= 1 for item in components):
        raise TokenError(f"{name}: sRGB components должны быть в диапазоне 0…1")
    alpha = value.get("alpha", 1)
    if not isinstance(alpha, (int, float)) or not 0 <= alpha <= 1:
        raise TokenError(f"{name}: alpha должен быть в диапазоне 0…1")
    if not re.fullmatch(r"#[0-9A-Fa-f]{6}", str(value.get("hex", ""))):
        raise TokenError(f"{name}: hex fallback должен состоять из шести цифр")


def validate_dimension(value: Any, name: str, allowed_units: set[str]) -> None:
    if not isinstance(value, dict) or set(value) != {"value", "unit"}:
        raise TokenError(f"{name}: dimension должен содержать value и unit")
    if not isinstance(value["value"], (int, float)) or value["unit"] not in allowed_units:
        units = ", ".join(sorted(allowed_units))
        raise TokenError(f"{name}: неверное измерение; допустимы {units}")


def validate_resolved_type(value: Any, token: Token) -> None:
    token_type = token.token_type
    if token_type == "color":
        validate_color(value, token.name)
    elif token_type == "dimension":
        validate_dimension(value, token.name, {"px", "rem"})
    elif token_type == "duration":
        validate_dimension(value, token.name, {"ms", "s"})
    elif token_type == "cubicBezier":
        if not isinstance(value, list) or len(value) != 4 or not all(
            isinstance(item, (int, float)) for item in value
        ):
            raise TokenError(f"{token.name}: cubicBezier должен содержать четыре числа")
    elif token_type == "fontFamily":
        if not isinstance(value, list) or not value or not all(
            isinstance(item, str) for item in value
        ):
            raise TokenError(f"{token.name}: fontFamily должен быть непустым списком")
    elif token_type == "fontWeight":
        if not isinstance(value, (int, float)) or not 1 <= value <= 1000:
            raise TokenError(f"{token.name}: fontWeight должен быть числом 1…1000")
    elif token_type == "number":
        if not isinstance(value, (int, float)):
            raise TokenError(f"{token.name}: number должен быть числом")
    elif token_type == "string":
        if not isinstance(value, str):
            raise TokenError(f"{token.name}: string должен быть строкой")
    elif token_type == "shadow":
        if not isinstance(value, list):
            raise TokenError(f"{token.name}: shadow должен быть списком")
        for index, shadow in enumerate(value):
            if not isinstance(shadow, dict):
                raise TokenError(f"{token.name}[{index}]: shadow должен быть объектом")
            validate_color(shadow.get("color"), f"{token.name}[{index}].color")
            for key in ("offsetX", "offsetY", "blur", "spread"):
                validate_dimension(shadow.get(key), f"{token.name}[{index}].{key}", {"px", "rem"})
    elif token_type == "typography":
        required = {"fontFamily", "fontSize", "fontWeight", "letterSpacing", "lineHeight"}
        if not isinstance(value, dict) or set(value) != required:
            raise TokenError(f"{token.name}: typography должен содержать {sorted(required)}")
        validate_resolved_type(
            value["fontFamily"], Token(f"{token.name}.fontFamily", value["fontFamily"], "fontFamily")
        )
        validate_resolved_type(
            value["fontSize"], Token(f"{token.name}.fontSize", value["fontSize"], "dimension")
        )
        validate_resolved_type(
            value["fontWeight"], Token(f"{token.name}.fontWeight", value["fontWeight"], "fontWeight")
        )
        validate_resolved_type(
            value["letterSpacing"],
            Token(f"{token.name}.letterSpacing", value["letterSpacing"], "dimension"),
        )
        validate_resolved_type(
            value["lineHeight"],
            Token(f"{token.name}.lineHeight", value["lineHeight"], "dimension"),
        )
    elif token_type is None:
        raise TokenError(f"{token.name}: не указан $type")


def expected_context_names() -> set[str]:
    names: set[str] = set()

    def add(surface: str, roles: dict[str, tuple[str, ...]]) -> None:
        for role, suffixes in roles.items():
            prefix = f"color.context.{surface}.{role}"
            names.update(prefix if not suffix else f"{prefix}.{suffix}" for suffix in suffixes)

    add(
        "background",
        {
            "canvas": ("",),
            "base": ("default", "hover", "active", "disabled", "selected"),
            "primary": ("default", "hover", "active", "selected"),
            "secondary": ("default", "hover", "active", "selected"),
            "tertiary": ("default", "hover", "selected"),
            "brand": ("subtle", "default", "hover", "active", "disabled", "selected"),
            "inverse": ("default", "hover", "active"),
            "success": ("primary", "secondary", "hover", "active"),
            "error": ("primary", "secondary.default", "secondary.hover", "secondary.active"),
            "warning": ("primary", "secondary"),
            "info": ("primary", "secondary"),
            "skeleton": ("base", "highlight"),
        },
    )
    text_or_icon = {
        "primary": ("default", "disabled", "selected"),
        "secondary": ("default", "selected"),
        "tertiary": ("default",),
        "brand": ("default", "hover", "active", "disabled"),
        "inverse": ("default",),
        "success": ("",),
        "error": ("",),
        "warning": ("",),
        "info": ("",),
    }
    add("text", text_or_icon)
    add("icon", {**text_or_icon, "successInverse": ("",)})
    add(
        "border",
        {
            "primary": ("default", "hover", "active", "disabled"),
            "secondary": ("default", "hover", "active"),
            "tertiary": ("default",),
            "brand": ("default", "hover", "active", "disabled", "selected"),
            "inverse": ("default", "disabled"),
            "success": ("",),
            "error": ("",),
            "warning": ("",),
            "info": ("",),
            "focus": ("inverse",),
        },
    )
    names.update(
        f"color.context.overlay.{name}"
        for name in (
            "transparent",
            "hover",
            "active",
            "selected",
            "disabled",
            "scrim",
            "backdrop",
            "skeleton.base",
            "skeleton.highlight",
        )
    )
    return names


def relative_luminance(color: dict[str, Any]) -> float:
    def linear(channel: float) -> float:
        return channel / 12.92 if channel <= 0.04045 else ((channel + 0.055) / 1.055) ** 2.4

    red, green, blue = (linear(float(channel)) for channel in color["components"])
    return 0.2126 * red + 0.7152 * green + 0.0722 * blue


def contrast_ratio(foreground: dict[str, Any], background: dict[str, Any]) -> float:
    first = relative_luminance(foreground)
    second = relative_luminance(background)
    return (max(first, second) + 0.05) / (min(first, second) + 0.05)


def foundation_semantic_aliases() -> dict[str, str]:
    aliases = {f"spacing.{step}": f"dimension.{step}" for step in SPACING_SCALE}
    aliases.update({f"radius.{name}": f"dimension.{step}" for name, step in RADIUS_SCALE})
    aliases.update(
        {f"border.width.{name}": f"dimension.{step}" for name, step in BORDER_WIDTH_SCALE}
    )
    return aliases


def validate_foundation_architecture(
    core: dict[str, Token], components: dict[str, Token]
) -> None:
    expected_dimensions = {f"dimension.{name}": value for name, value in DIMENSION_SCALE}
    actual_dimensions = {name for name in core if name.startswith("dimension.")}
    if actual_dimensions != set(expected_dimensions):
        raise TokenError("Dimension contract должен содержать ровно 28 утверждённых шагов")
    for name, expected in expected_dimensions.items():
        token = core[name]
        if token.token_type != "dimension" or token.value != {"value": expected, "unit": "px"}:
            raise TokenError(f"{name}: неверный primitive Dimension literal")

    expected_opacity = {f"opacity.{name}": value for name, value in OPACITY_SCALE}
    actual_opacity = {name for name in core if name.startswith("opacity.")}
    if actual_opacity != set(expected_opacity):
        raise TokenError("Opacity contract должен содержать ровно 6 утверждённых шагов")
    for name, expected in expected_opacity.items():
        token = core[name]
        if token.token_type != "number" or token.value != expected:
            raise TokenError(f"{name}: неверный primitive Opacity literal")

    semantic = foundation_semantic_aliases()
    for name, target in semantic.items():
        if name not in core:
            raise TokenError(f"Foundation Semantic token отсутствует: {name}")
        token = core[name]
        if token.token_type != "dimension" or token.value != f"{{{target}}}":
            raise TokenError(f"{name}: должен ссылаться на {{{target}}}")

    canonical_prefixes = (
        "spacing.", "radius.", "sizing.", "icon.size.",
        "layout.", "control.", "touchTarget.",
    )
    actual_canonical = {
        name for name in core if name.startswith(canonical_prefixes)
    } | {
        name
        for name in core
        if name.startswith("border.width.")
        and name.rsplit(".", 1)[-1] in {item[0] for item in BORDER_WIDTH_SCALE}
    }
    if actual_canonical != set(semantic):
        missing = sorted(set(semantic) - actual_canonical)
        extra = sorted(actual_canonical - set(semantic))
        raise TokenError(f"Foundation Semantic contract расходится: нет={missing}, лишние={extra}")

    expected_legacy_space = {
        f"space.{name}": f"{{{target}}}" for name, target in LEGACY_SPACE_SCALE
    }
    actual_legacy_space = {name for name in core if name.startswith("space.")}
    if actual_legacy_space != set(expected_legacy_space):
        raise TokenError("Legacy space compatibility contract изменён")
    for name, expected_alias in expected_legacy_space.items():
        if core[name].value != expected_alias:
            raise TokenError(f"{name}: legacy alias должен сохранять прежний размер")

    legacy_border = {
        "border.width.default": "{dimension.1}",
        "border.width.thick": "{border.width.medium}",
        "border.width.selected": "{border.width.medium}",
        "border.width.focus": "{dimension.4}",
    }
    for name, expected_alias in legacy_border.items():
        if name not in core or core[name].value != expected_alias:
            raise TokenError(f"{name}: legacy border alias изменён")

    for token in components.values():
        if token.token_type != "dimension":
            continue
        targets = list(iter_aliases(token.value))
        if not isinstance(token.value, str) or len(targets) != 1:
            raise TokenError(
                f"{token.name}: component dimension должен быть ровно одним alias"
            )
        target = targets[0]
        if target not in semantic:
            raise TokenError(
                f"{token.name}: component dimension должен ссылаться только на Alias"
            )


def validate_typography_architecture(
    core: dict[str, Token],
    components: dict[str, Token],
    *,
    mode: str = "desktop",
) -> None:
    styles = TYPOGRAPHY_MODE_STYLES.get(mode)
    if styles is None:
        raise TokenError(f"Неизвестный Typography mode: {mode}")
    family_names = {f"font.family.{name}" for name in TYPOGRAPHY_FAMILY_NAMES}
    weight_values = dict(TYPOGRAPHY_WEIGHT_SCALE)
    weight_names = {f"font.weight.{name}" for name in weight_values}
    size_names = {f"font.size.{name}" for name, _size in TYPOGRAPHY_SIZE_SCALE}
    line_names = {
        f"font.lineHeight.{name}" for name, _value in TYPOGRAPHY_LINE_HEIGHT_SCALE
    }
    letter_values = {
        "font.letterSpacing.tight": {"value": -0.04, "unit": "rem"},
        "font.letterSpacing.normal": {"value": 0, "unit": "rem"},
    }
    primitive_names = family_names | weight_names | size_names | line_names | set(letter_values)
    actual_primitives = {name for name in core if name.startswith("font.")}
    if actual_primitives != primitive_names:
        raise TokenError("Typography Primitive contract содержит лишние или пропущенные пути")

    for name in family_names:
        token = core[name]
        if (
            token.token_type != "fontFamily"
            or tuple(token.value) != TYPOGRAPHY_FONT_STACK
            or list(iter_aliases(token.value))
        ):
            raise TokenError(f"{name}: Font Family Primitive должен быть прямым значением")
    for name, value in weight_values.items():
        token = core[f"font.weight.{name}"]
        if token.token_type != "fontWeight" or token.value != value:
            raise TokenError(f"font.weight.{name}: неверный Font Weight Primitive")
    for name, size in TYPOGRAPHY_SIZE_SCALE:
        size_token = core[f"font.size.{name}"]
        if size_token.token_type != "dimension" or size_token.value != {"value": size, "unit": "px"}:
            raise TokenError(f"font.size.{name}: неверный Font Size Primitive")
    for name, line_height in TYPOGRAPHY_LINE_HEIGHT_SCALE:
        line_token = core[f"font.lineHeight.{name}"]
        expected = {"value": line_height, "unit": "px"}
        if line_token.token_type != "dimension" or line_token.value != expected:
            raise TokenError(
                f"font.lineHeight.{name}: должен быть px Dimension {line_height}px"
            )
    for name, value in letter_values.items():
        token = core[name]
        if token.token_type != "dimension" or token.value != value:
            raise TokenError(f"{name}: Letter Spacing должен быть rem Dimension Primitive")

    expected_styles = typography_style_contract(styles)
    actual_styles = {name for name in core if name.startswith("typography.style.")}
    if actual_styles != set(expected_styles):
        raise TokenError("Text Style contract содержит лишние или пропущенные роли")
    for name, expected_style in expected_styles.items():
        token = core[name]
        if token.token_type != "typography" or token.value != expected_style:
            raise TokenError(
                f"{name}: Text Style должен состоять напрямую из Primitive font.* aliases"
            )
    actual_semantic = {
        name for name in core if name.startswith("typography.semantic.")
    }
    if actual_semantic:
        raise TokenError(
            "typography.semantic.* удалён: Styles ссылаются на Primitive напрямую"
        )
    actual_component_styles = {
        name for name in core if name.startswith("typography.component.")
    }
    if actual_component_styles:
        raise TokenError(
            "typography.component.* удалён: единственный публичный Typography API — typography.style.*"
        )

    referenced_primitives = {
        target
        for name in expected_styles
        for target in iter_aliases(core[name].value)
    }
    invalid_targets = sorted(referenced_primitives - primitive_names)
    if invalid_targets:
        raise TokenError(
            f"Typography Styles ссылаются вне Primitive contract: {invalid_targets}"
        )
    for token in components.values():
        if token.token_type != "typography":
            continue
        aliases = list(iter_aliases(token.value))
        if len(aliases) != 1 or not aliases[0].startswith("typography.style."):
            raise TokenError(
                f"{token.name}: component typography обязан ссылаться напрямую на typography.style.*"
            )
        if aliases[0] not in core:
            raise TokenError(f"{token.name}: отсутствует публичный Text Style {aliases[0]}")


def validate_typography_modes(
    modes: dict[str, dict[str, Token]], components: dict[str, Token]
) -> None:
    if set(modes) != set(TYPOGRAPHY_MODE_STYLES):
        raise TokenError("Typography contract должен содержать Desktop и Mobile modes")
    for mode, tokens in modes.items():
        validate_typography_architecture(tokens, components, mode=mode)

    desktop = modes["desktop"]
    mobile = modes["mobile"]
    desktop_paths = {name for name in desktop if name.startswith("typography.")}
    mobile_paths = {name for name in mobile if name.startswith("typography.")}
    if desktop_paths != mobile_paths:
        raise TokenError("Desktop/Mobile Typography обязаны иметь одинаковые public paths")

    for name in desktop_paths:
        if desktop[name] != mobile[name]:
            raise TokenError(f"{name}: Figma Typography v2 должен быть mode-stable")

    for mode, tokens in modes.items():
        typography_lookup = merge_token_sets(tokens, components)
        for token in typography_lookup.values():
            if token.name.startswith(("font.", "typography.")) or token.token_type == "typography":
                resolved = resolve_value(token.value, typography_lookup, (token.name,))
                validate_resolved_type(resolved, token)

        role_sizes: dict[str, list[float]] = {}
        for (
            role,
            size,
            _family,
            _primitive_size,
            _primitive_line_height,
            _weight,
            _tracking,
        ) in TYPOGRAPHY_MODE_STYLES[mode]:
            style_name = f"typography.style.{role}.{size}"
            value = resolve_value(
                tokens[style_name].value,
                tokens,
                (style_name,),
            )["fontSize"]
            role_sizes.setdefault(role, []).append(float(value["value"]))
        for role, sizes in role_sizes.items():
            if any(first < second for first, second in zip(sizes, sizes[1:])):
                raise TokenError(f"{mode}: {role} sizes не должны увеличиваться")


def validate_architecture(
    core: dict[str, Token],
    context: dict[str, Token],
    components: dict[str, Token],
    themes: dict[str, dict[str, Token]],
    typography_modes: dict[str, dict[str, Token]] | None = None,
) -> None:
    validate_foundation_architecture(core, components)
    if typography_modes is None:
        validate_typography_architecture(core, components)
    else:
        validate_typography_modes(typography_modes, components)
    expected_primitive = {
        f"color.primitive.{ramp}.{step}"
        for ramp in PRIMITIVE_COLOR_RAMPS
        for step in (GRAY_COLOR_STEPS if ramp == "gray" else COLOR_STEPS)
    }
    actual_primitive = {name for name in core if name.startswith("color.primitive.")}
    if actual_primitive != expected_primitive:
        raise TokenError(
            "Primitive contract должен содержать шесть рамп × 11 шагов "
            "и Gray × 12 шагов"
        )
    static_names = {name for name in core if name.startswith("color.static.")}
    if static_names != {"color.static.black", "color.static.white"}:
        raise TokenError("Static contract должен содержать только black и white")
    unexpected_core_colors = {
        name
        for name in core
        if name.startswith("color.")
        and not name.startswith(("color.primitive.", "color.static."))
    }
    if unexpected_core_colors:
        raise TokenError(f"Неканонические Core colors: {sorted(unexpected_core_colors)}")
    for name in expected_primitive | static_names:
        token = core[name]
        if list(iter_aliases(token.value)) or token.token_type != "color":
            raise TokenError(f"{name}: Primitive/Static должен быть прямым color literal")
        validate_color(token.value, name)
        if token.value.get("alpha", 1) != 1:
            raise TokenError(f"{name}: Primitive/Static обязан быть opaque")

    expected_context = expected_context_names()
    if set(context) != expected_context:
        missing = sorted(expected_context - set(context))
        extra = sorted(set(context) - expected_context)
        raise TokenError(f"Context contract расходится: нет={missing}, лишние={extra}")
    for token in context.values():
        targets = list(iter_aliases(token.value))
        if token.token_type != "color" or len(targets) != 1 or not targets[0].startswith(
            "color.alias."
        ):
            raise TokenError(f"{token.name}: Context color должен alias Alias")

    if themes["light"].keys() != themes["dark"].keys():
        missing_dark = sorted(themes["light"].keys() - themes["dark"].keys())
        missing_light = sorted(themes["dark"].keys() - themes["light"].keys())
        raise TokenError(
            "Light/dark themes имеют разный контракт: "
            f"нет в dark={missing_dark}, нет в light={missing_light}"
        )

    expected_semantic = {
        f"color.alias.{ramp}.{step}"
        for ramp in ALIAS_COLOR_RAMPS
        for step in COLOR_STEPS
    } | set(ALIAS_NAMED_COLOR_ALIASES) | {
        f"color.alias.overlay.{name}" for name in OVERLAY_NAMES
    }
    expected_theme = expected_semantic | {
        "elevation.none",
        "elevation.sm",
        "elevation.md",
        "elevation.lg",
        "elevation.overlay",
    }

    for theme_name, theme in themes.items():
        if set(theme) != expected_theme:
            missing = sorted(expected_theme - set(theme))
            extra = sorted(set(theme) - expected_theme)
            raise TokenError(f"{theme_name}: Alias contract расходится: нет={missing}, лишние={extra}")
        for ramp in ALIAS_COLOR_RAMPS:
            primitive_ramp = ALIAS_RAMP_SOURCES[ramp]
            for step in COLOR_STEPS:
                name = f"color.alias.{ramp}.{step}"
                primitive_step = step if theme_name == "light" else str(10 - int(step))
                expected_alias = f"{{color.primitive.{primitive_ramp}.{primitive_step}}}"
                if theme[name].value != expected_alias:
                    raise TokenError(
                        f"{name}: {theme_name} должен ссылаться на {expected_alias}"
                    )
        for name, aliases in ALIAS_NAMED_COLOR_ALIASES.items():
            expected_alias = aliases[theme_name]
            if theme[name].value != expected_alias:
                raise TokenError(
                    f"{name}: {theme_name} должен ссылаться на {expected_alias}"
                )
        for overlay in OVERLAY_NAMES:
            name = f"color.alias.overlay.{overlay}"
            token = theme[name]
            if list(iter_aliases(token.value)):
                raise TokenError(f"{name}: overlay обязан быть direct RGBA literal")
            validate_color(token.value, name)
            if token.value.get("alpha", 1) >= 1:
                raise TokenError(f"{name}: overlay alpha должен быть < 1")

    for token in components.values():
        if token.token_type != "color":
            continue
        targets = list(iter_aliases(token.value))
        if len(targets) != 1 or not targets[0].startswith("color.context."):
            raise TokenError(f"{token.name}: component color должен alias только Context")

    for theme_name, theme in themes.items():
        lookup = merge_token_sets(core, theme, context, components)
        for token in lookup.values():
            resolved = resolve_value(token.value, lookup, (token.name,))
            validate_resolved_type(resolved, token)

        for name, token in theme.items():
            if not (name.startswith("color.alias.") or name.startswith("elevation.")):
                raise TokenError(f"{theme_name}: token вне color.alias/elevation: {name}")
            for target in iter_aliases(token.value):
                if not target.startswith("color.primitive."):
                    raise TokenError(f"{name}: Alias color должен вести только в Primitive")

        basic_surface = resolve_value(
            context["color.context.background.base.default"].value,
            lookup,
            ("color.context.background.base.default",),
        )
        tertiary_text = resolve_value(
            context["color.context.text.tertiary.default"].value,
            lookup,
            ("color.context.text.tertiary.default",),
        )
        if contrast_ratio(tertiary_text, basic_surface) < 4.5:
            raise TokenError(f"{theme_name}: tertiary text не достигает WCAG 4.5:1")
        for status in ("success", "error", "warning", "info"):
            status_background = resolve_value(
                context[f"color.context.background.{status}.primary"].value,
                lookup,
                (f"color.context.background.{status}.primary",),
            )
            status_text = resolve_value(
                context[f"color.context.text.{status}"].value,
                lookup,
                (f"color.context.text.{status}",),
            )
            status_border = resolve_value(
                context[f"color.context.border.{status}"].value,
                lookup,
                (f"color.context.border.{status}",),
            )
            if contrast_ratio(status_text, status_background) < 4.5:
                raise TokenError(
                    f"{theme_name}: {status} text/background не достигает WCAG 4.5:1"
                )
            if min(
                contrast_ratio(status_border, status_background),
                contrast_ratio(status_border, basic_surface),
            ) < 3:
                raise TokenError(
                    f"{theme_name}: {status} border не достигает WCAG 3:1"
                )


def kebab(part: str) -> str:
    return CAMEL_RE.sub("-", part).replace("_", "-").lower()


def css_var(name: str) -> str:
    parts = name.split(".")
    if parts[0] == "component":
        parts = parts[1:]
    return "--rf-" + "-".join(kebab(part) for part in parts)


def number(value: int | float) -> str:
    if isinstance(value, float):
        rendered = f"{value:.6f}".rstrip("0").rstrip(".")
        return "0" if rendered == "-0" else rendered
    return str(value)


def css_unicode_range(ranges: tuple[tuple[int, int], ...]) -> str:
    return ",".join(
        f"U+{start:04X}" if start == end else f"U+{start:04X}-{end:04X}"
        for start, end in ranges
    )


def css_color(value: dict[str, Any]) -> str:
    alpha = value.get("alpha", 1)
    if alpha == 0:
        return "transparent"
    if alpha == 1:
        return value["hex"].lower()
    channels = [round(component * 255) for component in value["components"]]
    return f"rgb({channels[0]} {channels[1]} {channels[2]} / {number(alpha * 100)}%)"


def css_dimension(value: dict[str, Any]) -> str:
    if value["value"] == 0:
        return "0"
    return f"{number(value['value'])}{value['unit']}"


def css_shadow(value: list[dict[str, Any]]) -> str:
    if not value:
        return "none"
    layers = []
    for shadow in value:
        layers.append(
            " ".join(
                (
                    css_dimension(shadow["offsetX"]),
                    css_dimension(shadow["offsetY"]),
                    css_dimension(shadow["blur"]),
                    css_dimension(shadow["spread"]),
                    css_color(shadow["color"]),
                )
            )
        )
    return ",".join(layers)


def css_literal(value: Any, token_type: str | None) -> str:
    if token_type == "color":
        return css_color(value)
    if token_type in {"dimension", "duration"}:
        return css_dimension(value)
    if token_type == "cubicBezier":
        return "cubic-bezier(" + ",".join(number(item) for item in value) + ")"
    if token_type == "fontFamily":
        return ",".join(
            json.dumps(item, ensure_ascii=False) if " " in item or item == "Onest" else item
            for item in value
        )
    if token_type == "shadow":
        return css_shadow(value)
    if isinstance(value, (int, float)):
        return number(value)
    return str(value)


def expand_composite(value: Any, tokens: dict[str, Token]) -> Any:
    if isinstance(value, str):
        match = ALIAS_RE.fullmatch(value)
        if match and tokens[match.group(1)].token_type == "typography":
            return expand_composite(tokens[match.group(1)].value, tokens)
    return value


def css_entries(token: Token, lookup: dict[str, Token]) -> list[tuple[str, str]]:
    value = expand_composite(token.value, lookup)
    if token.token_type == "typography":
        if not isinstance(value, dict):
            return []
        entries = []
        for key, child in value.items():
            child_type = {
                "fontFamily": "fontFamily",
                "fontSize": "dimension",
                "fontWeight": "fontWeight",
                "letterSpacing": "dimension",
                "lineHeight": "dimension",
            }[key]
            match = ALIAS_RE.fullmatch(child) if isinstance(child, str) else None
            rendered = f"var({css_var(match.group(1))})" if match else css_literal(child, child_type)
            entries.append((f"{css_var(token.name)}-{kebab(key)}", rendered))
        return entries

    match = ALIAS_RE.fullmatch(value) if isinstance(value, str) else None
    rendered = f"var({css_var(match.group(1))})" if match else css_literal(value, token.token_type)
    return [(css_var(token.name), rendered)]


def render_declarations(
    tokens: dict[str, Token], lookup: dict[str, Token], indent: str = "  "
) -> list[str]:
    lines: list[str] = []
    for name in sorted(tokens):
        for variable, value in css_entries(tokens[name], lookup):
            lines.append(f"{indent}{variable}:{value};")
    return lines


def old_primitive_bridge() -> dict[str, str]:
    return token_migration_bridge("legacy-primitive-v1")


def _exact_manifest_keys(
    value: Any,
    expected: set[str],
    location: str,
) -> dict[str, Any]:
    if not isinstance(value, dict):
        raise TokenError(f"{location}: ожидался JSON-объект")
    missing = expected - set(value)
    extra = set(value) - expected
    if missing or extra:
        raise TokenError(
            f"{location}: неверные поля; нет={sorted(missing)}, лишние={sorted(extra)}"
        )
    return value


def _semver_tuple(value: Any, location: str) -> tuple[int, int, int]:
    if not isinstance(value, str):
        raise TokenError(f"{location}: ожидалась SemVer-строка")
    match = SEMVER_RE.fullmatch(value)
    if match is None:
        raise TokenError(f"{location}: ожидался SemVer MAJOR.MINOR.PATCH")
    return tuple(int(part) for part in match.groups())


def load_token_migrations() -> dict[str, Any]:
    """Read and strictly validate the public color-token lifecycle contract."""

    try:
        relative = TOKEN_MIGRATIONS_SOURCE.relative_to(REPO_ROOT)
    except ValueError:
        relative = TOKEN_MIGRATIONS_SOURCE
    try:
        document = json.loads(TOKEN_MIGRATIONS_SOURCE.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise TokenError(f"Не удалось прочитать {relative}: {exc}") from exc

    root = _exact_manifest_keys(
        document,
        {"schemaVersion", "description", "policy", "migrations"},
        relative.as_posix(),
    )
    if root["schemaVersion"] != 1:
        raise TokenError(f"{relative}: schemaVersion должен быть равен 1")
    if not isinstance(root["description"], str) or not root["description"].strip():
        raise TokenError(f"{relative}: description должна быть непустой строкой")

    policy = _exact_manifest_keys(
        root["policy"],
        {"publicApiLayers", "internalAuthoringLayers", "lifecycle"},
        f"{relative}.policy",
    )
    if policy["publicApiLayers"] != ["context"]:
        raise TokenError(f"{relative}.policy: только Context является public color API")
    if policy["internalAuthoringLayers"] != ["primitive", "alias", "static"]:
        raise TokenError(
            f"{relative}.policy: Primitive/Alias/Static должны быть internal authoring layers"
        )
    expected_lifecycle = {
        "stable": {
            "newUsage": "allowed",
            "replacement": "not-required",
            "removal": "major-version-only",
        },
        "deprecated": {
            "newUsage": "forbidden",
            "replacement": "required",
            "compatibility": "required-until-removeIn",
            "removal": "at-removeIn",
        },
    }
    if policy["lifecycle"] != expected_lifecycle:
        raise TokenError(f"{relative}.policy.lifecycle: lifecycle rules расходятся")

    migrations = root["migrations"]
    if not isinstance(migrations, list) or not migrations:
        raise TokenError(f"{relative}.migrations: ожидается непустой список")
    canonical_colors = (
        expected_context_names()
        | {
            f"color.primitive.{ramp}.{step}"
            for ramp in PRIMITIVE_COLOR_RAMPS
            for step in (GRAY_COLOR_STEPS if ramp == "gray" else COLOR_STEPS)
        }
        | {"color.static.black", "color.static.white"}
        | {
            f"color.alias.{ramp}.{step}"
            for ramp in ALIAS_COLOR_RAMPS
            for step in COLOR_STEPS
        }
        | set(ALIAS_NAMED_COLOR_ALIASES)
        | {f"color.alias.overlay.{name}" for name in OVERLAY_NAMES}
    )
    migration_ids: list[str] = []
    all_sources: set[str] = set()
    all_targets: set[str] = set()
    bridges: dict[str, dict[str, str]] = {}
    allowed_channels = {"css", "catalog-deep-link"}
    allowed_layers = {"context", "primitive", "alias", "semantic", "static"}
    allowed_kinds = {"rename", "consolidate"}
    for migration_index, raw_migration in enumerate(migrations):
        location = f"{relative}.migrations[{migration_index}]"
        migration_fields = {
            "id",
            "description",
            "layer",
            "status",
            "deprecatedIn",
            "removeIn",
            "channels",
            "entries",
        }
        if isinstance(raw_migration, dict) and "kind" in raw_migration:
            migration_fields.add("kind")
        migration = _exact_manifest_keys(
            raw_migration,
            migration_fields,
            location,
        )
        migration_id = migration["id"]
        if (
            not isinstance(migration_id, str)
            or re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", migration_id) is None
        ):
            raise TokenError(f"{location}.id: нужен непустой kebab-case id")
        if migration_id in bridges:
            raise TokenError(f"{location}.id: повторный migration id {migration_id}")
        migration_ids.append(migration_id)
        if migration["layer"] not in allowed_layers:
            raise TokenError(f"{location}.layer: неизвестный color layer")
        migration_kind = migration.get("kind", "rename")
        if migration_kind not in allowed_kinds:
            raise TokenError(f"{location}.kind: неизвестный тип migration")
        if migration["status"] != "deprecated":
            raise TokenError(f"{location}.status: compatibility paths должны быть deprecated")
        if (
            not isinstance(migration["description"], str)
            or not migration["description"].strip()
        ):
            raise TokenError(f"{location}.description: нужна непустая строка")
        deprecated_in = _semver_tuple(
            migration["deprecatedIn"], f"{location}.deprecatedIn"
        )
        remove_in = _semver_tuple(migration["removeIn"], f"{location}.removeIn")
        if deprecated_in >= remove_in:
            raise TokenError(f"{location}: removeIn должен быть позже deprecatedIn")
        channels = migration["channels"]
        if (
            not isinstance(channels, list)
            or not channels
            or any(channel not in allowed_channels for channel in channels)
            or len(channels) != len(set(channels))
        ):
            raise TokenError(f"{location}.channels: неизвестный или повторный channel")

        entries = migration["entries"]
        if not isinstance(entries, list) or not entries:
            raise TokenError(f"{location}.entries: ожидается непустой список")
        bridge: dict[str, str] = {}
        for entry_index, raw_entry in enumerate(entries):
            entry_location = f"{location}.entries[{entry_index}]"
            entry = _exact_manifest_keys(raw_entry, {"from", "to"}, entry_location)
            old_name = entry["from"]
            canonical_name = entry["to"]
            if not isinstance(old_name, str) or TOKEN_PATH_RE.fullmatch(old_name) is None:
                raise TokenError(f"{entry_location}.from: неверный token path")
            if (
                not isinstance(canonical_name, str)
                or TOKEN_PATH_RE.fullmatch(canonical_name) is None
            ):
                raise TokenError(f"{entry_location}.to: неверный token path")
            if not old_name.startswith("color.") or not canonical_name.startswith("color."):
                raise TokenError(f"{entry_location}: migration должен связывать color paths")
            if old_name in all_sources:
                raise TokenError(f"{old_name}: повторный migration source")
            if old_name in canonical_colors:
                raise TokenError(f"{old_name}: deprecated path не должен быть canonical token")
            if canonical_name not in canonical_colors:
                raise TokenError(f"{old_name}: replacement {canonical_name} отсутствует")
            if old_name == canonical_name:
                raise TokenError(f"{old_name}: migration не должен ссылаться сам на себя")
            bridge[old_name] = canonical_name
            all_sources.add(old_name)
            all_targets.add(canonical_name)
        if list(bridge) != sorted(bridge):
            raise TokenError(f"{location}.entries: записи должны быть отсортированы по from")
        bridges[migration_id] = bridge

    if migration_ids != sorted(migration_ids):
        raise TokenError(f"{relative}.migrations: группы должны быть отсортированы по id")
    required_contracts = {
        "context-role-consolidation": {
            "kind": "consolidate",
            "layer": "context",
            "deprecatedIn": "1.13.1",
            "removeIn": "2.0.0",
            "channels": ["css", "catalog-deep-link"],
            "entries": 3,
            "targets": 3,
        },
        "context-status-intensity": {
            "kind": "rename",
            "layer": "context",
            "deprecatedIn": "1.15.0",
            "removeIn": "2.0.0",
            "channels": ["css", "catalog-deep-link"],
            "entries": 10,
            "targets": 10,
        },
        "context-v1-to-v2": {
            "layer": "context",
            "deprecatedIn": "1.12.0",
            "removeIn": "2.0.0",
            "channels": ["css", "catalog-deep-link"],
            "entries": 59,
            "targets": 50,
        },
        "primitive-brand-to-coral": {
            "layer": "primitive",
            "deprecatedIn": "1.12.0",
            "removeIn": "2.0.0",
            "channels": ["css"],
            "entries": 11,
            "targets": 11,
        },
        "legacy-color-role-to-context": {
            "layer": "context",
            "deprecatedIn": "1.11.14",
            "removeIn": "2.0.0",
            "channels": ["css"],
            "entries": 73,
            "targets": 49,
        },
        "legacy-primitive-v1": {
            "layer": "primitive",
            "deprecatedIn": "1.11.14",
            "removeIn": "2.0.0",
            "channels": ["css"],
            "entries": 58,
            "targets": 49,
        },
    }
    migration_by_id = {migration["id"]: migration for migration in migrations}
    missing_contracts = set(required_contracts) - set(migration_by_id)
    if missing_contracts:
        raise TokenError(f"{relative}.migrations: нет обязательных групп {sorted(missing_contracts)}")
    for migration_id, contract in required_contracts.items():
        migration = migration_by_id[migration_id]
        bridge = bridges[migration_id]
        for key in ("layer", "deprecatedIn", "removeIn", "channels"):
            if migration[key] != contract[key]:
                raise TokenError(f"{relative}.{migration_id}: неверный {key}")
        if migration.get("kind", "rename") != contract.get("kind", "rename"):
            raise TokenError(f"{relative}.{migration_id}: неверный kind")
        if len(bridge) != contract["entries"] or len(set(bridge.values())) != contract["targets"]:
            raise TokenError(f"{relative}.{migration_id}: неверная полнота mapping")
    expected_brand_bridge = {
        f"color.primitive.brand.{step}": f"color.primitive.coral.{step}"
        for step in COLOR_STEPS
    }
    if bridges["primitive-brand-to-coral"] != expected_brand_bridge:
        raise TokenError(f"{relative}.primitive-brand-to-coral: mapping расходится")
    chained = all_sources & all_targets
    if chained:
        raise TokenError(f"{relative}: migration chain запрещён: {sorted(chained)}")
    return root


def token_migration_bridge(migration_id: str) -> dict[str, str]:
    """Return one validated color migration group by its stable id."""

    for migration in load_token_migrations()["migrations"]:
        if migration["id"] == migration_id:
            return {entry["from"]: entry["to"] for entry in migration["entries"]}
    raise TokenError(f"Неизвестный color token migration: {migration_id}")


def context_v1_to_v2_bridge() -> dict[str, str]:
    """Return the published Context migration from the canonical lifecycle source."""

    return token_migration_bridge("context-v1-to-v2")


def context_role_consolidation_bridge() -> dict[str, str]:
    """Return removed Context roles and their stable replacements."""

    return token_migration_bridge("context-role-consolidation")


def context_status_intensity_bridge() -> dict[str, str]:
    """Return deprecated status intensity names and their primary/secondary paths."""

    return token_migration_bridge("context-status-intensity")


def old_color_role_bridge() -> dict[str, str]:
    return token_migration_bridge("legacy-color-role-to-context")


def legacy_aliases(
    core: dict[str, Token], context: dict[str, Token], components: dict[str, Token]
) -> dict[str, str]:
    aliases: dict[str, str] = {}

    # Typography v2 keeps the historical CSS API for one migration cycle while
    # the canonical DTCG graph remains strictly Primitive → Semantic → Style.
    aliases.update(
        {
            "--rf-font-family-base": css_var("font.family.body"),
            "--font-family-base": css_var("font.family.body"),
            "--rf-font-line-height-tight": css_var("font.lineHeight.7xl"),
            "--rf-font-line-height-heading": css_var("font.lineHeight.5xl"),
            "--rf-font-line-height-label": css_var("font.lineHeight.m"),
            "--rf-font-line-height-caption": css_var("font.lineHeight.xs"),
            "--rf-font-line-height-body": css_var("font.lineHeight.xl"),
            "--rf-font-letter-spacing-display": css_var("font.letterSpacing.tight"),
            "--rf-font-letter-spacing-heading-large": css_var("font.letterSpacing.tight"),
            "--rf-font-letter-spacing-heading": css_var("font.letterSpacing.tight"),
        }
    )
    removed_typography_primitives = {
        "font.family.primary": "font.family.body",
        "font.family.secondary": "font.family.title",
        "font.family.mono": "font.family.body",
        "font.weight.semibold": "font.weight.medium",
        "font.size.sm": "font.size.s",
        "font.size.md": "font.size.m",
        "font.size.lg": "font.size.l",
        "font.lineHeight.sm": "font.lineHeight.m",
        "font.lineHeight.md": "font.lineHeight.xl",
        "font.lineHeight.lg": "font.lineHeight.3xl",
    }
    for removed, replacement in removed_typography_primitives.items():
        aliases[css_var(removed)] = css_var(replacement)
        aliases["--" + "-".join(kebab(part) for part in removed.split("."))] = (
            css_var(replacement)
        )
    # Typography v2 removes the old DTCG paths, but their CSS variables keep
    # the exact v1 metrics for one migration cycle. This avoids guessing how
    # historical Heading/Label/Code roles map onto the new Figma groups.
    legacy_style_values = {
        "display.large": ("title", "6xl", "7xl", "bold", "tight"),
        "display.medium": ("title", "5xl", "6xl", "bold", "tight"),
        "heading.large": ("title", "5xl", "6xl", "bold", "tight"),
        "heading.medium": ("title", "4xl", "5xl", "bold", "tight"),
        "heading.small": ("title", "2xl", "3xl", "bold", "tight"),
        "headline.large": ("headline", "2xl", "3xl", "medium", "normal"),
        "headline.medium": ("headline", "l", "3xl", "medium", "normal"),
        "headline.small": ("headline", "m", "xl", "medium", "normal"),
        "body.large": ("body", "l", "3xl", "regular", "normal"),
        "body.medium": ("body", "m", "xl", "regular", "normal"),
        "body.small": ("body", "s", "m", "regular", "normal"),
        "label.large": ("headline", "m", "xl", "medium", "normal"),
        "label.medium": ("headline", "s", "m", "medium", "normal"),
        "label.small": ("headline", "xs", "xs", "medium", "normal"),
        "code.medium": ("body", "m", "xl", "regular", "normal"),
        "code.small": ("body", "s", "m", "regular", "normal"),
    }
    legacy_style_targets: dict[str, dict[str, str]] = {}
    for name, (family, size, line_height, weight, tracking) in legacy_style_values.items():
        targets = {
            "font-family": css_var(f"font.family.{family}"),
            "font-size": css_var(f"font.size.{size}"),
            "font-weight": css_var(f"font.weight.{weight}"),
            "letter-spacing": css_var(f"font.letterSpacing.{tracking}"),
            "line-height": css_var(f"font.lineHeight.{line_height}"),
        }
        legacy_style_targets[name] = targets
        for prop, target in targets.items():
            aliases[f"--rf-typography-style-{name.replace('.', '-')}-{prop}"] = target

    legacy_typography_helpers = {
        "display-large": "display.large",
        "display-medium": "display.medium",
        "heading-h1": "heading.large",
        "heading-h2": "heading.medium",
        "heading-h3": "heading.small",
        "body-large": "body.large",
        "body-medium": "body.medium",
        "body-small": "body.small",
        "label-large": "label.large",
        "label-medium": "label.medium",
        "label-small": "label.small",
        "caption": "label.small",
    }
    for legacy, old_style in legacy_typography_helpers.items():
        for prop, target in legacy_style_targets[old_style].items():
            aliases[f"--rf-typography-{legacy}-{prop}"] = target

    for name, token in core.items():
        # Composite typography tokens expand into property-specific variables.
        if token.token_type == "typography":
            continue
        if name.startswith("color.primitive."):
            old = "--primitive-" + "-".join(kebab(part) for part in name.split(".")[2:])
        else:
            old = "--" + "-".join(kebab(part) for part in name.split("."))
        aliases[old] = css_var(name)

    # The canonical migration source owns the renamed Primitive compatibility API.
    for old_name, canonical_name in token_migration_bridge(
        "primitive-brand-to-coral"
    ).items():
        aliases[css_var(old_name)] = css_var(canonical_name)
        aliases["--primitive-" + "-".join(old_name.split(".")[2:])] = css_var(
            canonical_name
        )

    # Dimension constraints were folded into the single Primitive Dimension
    # scale. Keep the historical CSS variables readable until the next major
    # release; canonical JSON and TypeScript expose only dimension.<step>.
    for step in LEGACY_DIMENSION_CONSTRAINT_STEPS:
        aliases[f"--rf-dimension-constraint-{step}"] = css_var(f"dimension.{step}")
        aliases[f"--dimension-constraint-{step}"] = css_var(f"dimension.{step}")
    aliases["--rf-dimension-1-5"] = css_var("dimension.2")
    aliases["--dimension-1-5"] = css_var("dimension.2")

    # Value-based semantic spacing intentionally exposes an unprefixed
    # Primitive→Semantic bridge as requested by the public foundation API.
    for step in SPACING_SCALE:
        aliases[f"--spacing-{step}"] = f"--dimension-{step}"

    for name, token in context.items():
        aliases["--" + "-".join(kebab(part) for part in name.split("."))] = css_var(name)

    # Context v2 keeps the published v1 CSS variables readable for one
    # migration cycle. Canonical JSON/TypeScript records expose only v2 paths.
    for old_name, canonical_name in context_v1_to_v2_bridge().items():
        old_prefixed = css_var(old_name)
        canonical_prefixed = css_var(canonical_name)
        if old_prefixed != canonical_prefixed:
            aliases[old_prefixed] = canonical_prefixed
        old_short = "--" + "-".join(kebab(part) for part in old_name.split("."))
        canonical_short = "--" + "-".join(
            kebab(part) for part in canonical_name.split(".")
        )
        if old_short != canonical_short:
            aliases[old_short] = canonical_prefixed

    # Removed duplicate Context roles remain readable until the next major
    # version, while canonical outputs expose only their stable replacements.
    for old_name, canonical_name in context_role_consolidation_bridge().items():
        canonical_prefixed = css_var(canonical_name)
        aliases[css_var(old_name)] = canonical_prefixed
        aliases["--" + "-".join(kebab(part) for part in old_name.split("."))] = (
            canonical_prefixed
        )

    # Status surfaces use Primary/Secondary consistently in Catalog, Figma and
    # canonical code while the published Default/Strong paths remain readable.
    for old_name, canonical_name in context_status_intensity_bridge().items():
        canonical_prefixed = css_var(canonical_name)
        aliases[css_var(old_name)] = canonical_prefixed
        aliases["--" + "-".join(kebab(part) for part in old_name.split("."))] = (
            canonical_prefixed
        )

    alias_contract = set()
    for source in THEME_SOURCES.values():
        alias_contract.update(flatten_tokens(load_json(source)))
    for name in alias_contract:
        aliases["--" + "-".join(kebab(part) for part in name.split("."))] = css_var(name)

    for old_name, canonical_name in old_primitive_bridge().items():
        aliases[css_var(old_name)] = css_var(canonical_name)
        legacy_name = "--primitive-" + "-".join(
            kebab(part) for part in old_name.split(".")[2:]
        )
        aliases[legacy_name] = css_var(canonical_name)

    for old_name, context_name in old_color_role_bridge().items():
        aliases[css_var(old_name)] = css_var(context_name)
        aliases["--" + "-".join(kebab(part) for part in old_name.split("."))] = css_var(
            old_name
        )

    for name, token in components.items():
        # Typography composites expand to five CSS variables; a single legacy
        # alias would otherwise point to a variable that is never emitted.
        if token.token_type == "typography":
            continue
        short = name.removeprefix("component.")
        aliases["--" + "-".join(kebab(part) for part in short.split("."))] = css_var(name)

    aliases.update(
        {
            "--color-background-base": css_var("color.background.primary"),
            "--color-background-subtle": css_var("color.background.secondary"),
            "--color-border-default": css_var("color.border.primary"),
            "--color-border-subtle": css_var("color.border.secondary"),
            "--color-accent-background": css_var("color.action.secondary"),
            "--color-accent-background-strong": css_var("color.action.secondaryHover"),
            "--color-accent-default": css_var("color.action.primary"),
            "--color-accent-hover": css_var("color.action.primaryHover"),
            "--color-accent-pressed": css_var("color.action.primaryPressed"),
            "--color-accent-text": css_var("color.action.secondaryText"),
            "--color-accent-icon": css_var("color.action.secondaryText"),
            "--color-on-accent": css_var("color.action.onPrimary"),
            "--color-brand-background-strong": css_var("color.brand.backgroundStrong"),
            "--color-brand-default": css_var("color.brand.primary"),
            "--color-on-brand": css_var("color.brand.onBrand"),
            # These two historical icon aliases were intentionally invariant
            # in dark mode. New UI uses the theme-aware --rf-color-icon-* roles.
            "--color-icon-accent": css_var("color.primitive.petal.700"),
            "--color-icon-inverse": css_var("color.primitive.warm.0"),
            "--color-success-bg": css_var("color.status.success.background"),
            "--color-success-border": css_var("color.status.success.border"),
            "--color-success-text": css_var("color.status.success.text"),
            "--color-success-solid": css_var("color.status.success.default"),
            "--color-on-success": css_var("color.status.success.onStatus"),
            "--color-warning-bg": css_var("color.status.warning.background"),
            "--color-warning-border": css_var("color.status.warning.border"),
            "--color-warning-text": css_var("color.status.warning.text"),
            "--color-warning-solid": css_var("color.status.warning.default"),
            "--color-on-warning": css_var("color.status.warning.onStatus"),
            "--color-error-bg": css_var("color.status.error.background"),
            "--color-error-border": css_var("color.status.error.border"),
            "--color-error-text": css_var("color.status.error.text"),
            "--color-error-solid": css_var("color.status.error.default"),
            "--color-on-error": css_var("color.status.error.onStatus"),
            "--color-info-bg": css_var("color.status.info.background"),
            "--color-info-border": css_var("color.status.info.border"),
            "--color-info-text": css_var("color.status.info.text"),
            "--color-info-solid": css_var("color.status.info.default"),
            "--color-on-info": css_var("color.status.info.onStatus"),
            "--button-primary-bg": css_var("component.button.primary.background"),
            "--button-primary-bg-hover": css_var("component.button.primary.backgroundHover"),
            "--button-primary-bg-pressed": css_var("component.button.primary.backgroundPressed"),
            "--button-primary-bg-disabled": css_var("component.button.disabled.background"),
            "--button-primary-text-disabled": css_var("component.button.disabled.text"),
            "--button-secondary-bg": css_var("component.button.secondary.background"),
            "--button-secondary-bg-hover": css_var("component.button.secondary.backgroundHover"),
            # Legacy product variables now resolve directly to TextField;
            # there is no separate Input component or token group.
            "--input-background": css_var("component.textField.background"),
            "--input-background-disabled": css_var("component.textField.backgroundDisabled"),
            "--input-background-read-only": css_var("component.textField.backgroundReadOnly"),
            "--input-height": css_var("component.textField.size.md.height"),
            "--input-padding-inline": css_var("component.textField.size.md.paddingInline"),
            "--input-radius": css_var("component.textField.radius"),
            "--input-bg": css_var("component.textField.background"),
            "--input-bg-disabled": css_var("component.textField.backgroundDisabled"),
            # Preserve the legacy field appearance. The TextField contract
            # deliberately uses stronger, accessible placeholder and border
            # roles, but old screens migrate to it separately.
            "--input-text": "--color-text-primary",
            "--input-placeholder": "--color-text-tertiary",
            "--input-border": "--color-border-default",
            "--input-border-hover": "--color-border-strong",
            "--input-border-focus": "--color-accent-default",
            "--input-border-error": "--color-error-border",
            "--shadow-xs": css_var("elevation.sm"),
            "--shadow-elevation": css_var("elevation.md"),
            "--shadow-card": css_var("elevation.lg"),
            "--shadow-popover": css_var("elevation.overlay"),
            # Preserve the established declarations while canonical --rf-*
            # variables are introduced alongside them.
            "--radius-card": css_var("radius.lg"),
            "--radius-pill": css_var("radius.full"),
            "--radius-control": css_var("radius.md"),
            "--duration-fast": css_var("motion.duration.fast"),
            "--duration-default": css_var("motion.duration.normal"),
            "--duration-slow": css_var("motion.duration.slow"),
            "--motion-fast": css_var("motion.duration.fast"),
            "--ease-standard": css_var("motion.easing.standard"),
            "--z-sticky": css_var("zIndex.sticky"),
            "--z-dropdown": css_var("zIndex.dropdown"),
            "--z-modal": css_var("zIndex.modal"),
            "--z-toast": css_var("zIndex.toast"),
            "--line-height-tight": css_var("font.lineHeight.7xl"),
            "--line-height-heading": css_var("font.lineHeight.5xl"),
            "--line-height-body": css_var("font.lineHeight.xl"),
            "--navigation-container-bg": "--color-surface-disabled",
            "--navigation-selected-bg": css_var("component.navigation.selectedBackground"),
            "--navigation-selected-text": css_var("component.navigation.selectedText"),
            "--navigation-bg": css_var("component.navigation.background"),
            "--navigation-text": css_var("component.navigation.text"),
            "--navigation-text-active": css_var("component.navigation.textActive"),
            "--navigation-active-bg": css_var("component.navigation.activeBackground"),
            "--navigation-divider": css_var("component.navigation.divider"),
            "--chip-neutral-bg": css_var("color.surface.tertiary"),
            "--chip-neutral-border": css_var("color.border.primary"),
            "--chip-neutral-text": css_var("color.text.primary"),
            "--chip-selected-bg": css_var("color.action.primary"),
            "--chip-selected-text": css_var("color.action.onPrimary"),
            "--danger": css_var("color.status.error.text"),
        }
    )
    return aliases


def render_aliases(aliases: dict[str, str], allowed: set[str] | None = None) -> list[str]:
    lines = []
    for old, canonical in sorted(aliases.items()):
        if allowed is None or old in allowed:
            value = f"var({canonical})" if canonical.startswith("--") else canonical
            lines.append(f"  {old}:{value};")
    return lines


def token_category(token: Token) -> str:
    if token.name.startswith("font.") or token.name.startswith("typography."):
        return "typography"
    if token.token_type in {"color", "shadow"}:
        return "color"
    return "foundation"


def mobile_typography_overrides(
    modes: dict[str, dict[str, Token]],
) -> dict[str, Token]:
    desktop = modes["desktop"]
    mobile = modes["mobile"]
    overrides = {
        name: token
        for name, token in mobile.items()
        if name.startswith("typography.style.")
        and name in desktop
        and token.value != desktop[name].value
    }
    if overrides:
        raise TokenError(
            "Typography v2 использует одну Figma scale: Mobile overrides запрещены"
        )
    return overrides


def render_mobile_typography_blocks(
    modes: dict[str, dict[str, Token]],
) -> list[str]:
    overrides = mobile_typography_overrides(modes)
    if not overrides:
        return []
    lookup = modes["mobile"]
    lines = ["", '[data-typography-mode="mobile"] {']
    lines += render_declarations(overrides, lookup)
    lines += ["}", "", "@media(max-width:639px){", ":root:not([data-typography-mode]) {"]
    lines += render_declarations(overrides, lookup)
    lines += ["}", "}"]
    return lines


def render_css_outputs(
    core: dict[str, Token],
    context: dict[str, Token],
    components: dict[str, Token],
    themes: dict[str, dict[str, Token]],
    typography_modes: dict[str, dict[str, Token]] | None = None,
) -> tuple[str, str, str, str]:
    typography_modes = typography_modes or load_typography_modes(core)
    light_lookup = merge_token_sets(core, themes["light"], context, components)
    dark_lookup = merge_token_sets(core, themes["dark"], context, components)
    aliases = legacy_aliases(core, context, components)

    base_all = merge_token_sets(core, context, components)
    color_base = {name: token for name, token in base_all.items() if token_category(token) == "color"}
    foundation_base = {
        name: token for name, token in base_all.items() if token_category(token) == "foundation"
    }
    typography_base = {
        name: token for name, token in base_all.items() if token_category(token) == "typography"
    }
    light_theme = themes["light"]
    dark_theme = themes["dark"]

    header = "/* Generated by design/design-system/scripts/build_tokens.py. Do not edit. */"
    color_lines = [header, ":root {", "  color-scheme:light;"]
    color_lines += render_declarations(color_base, light_lookup)
    color_lines += render_declarations(light_theme, light_lookup)
    color_alias_names = {
        old
        for old, canonical in aliases.items()
        if canonical.startswith("--rf-color-")
        or canonical.startswith("--rf-elevation-")
        or canonical.startswith("--rf-button-")
        or canonical.startswith("--rf-text-field-")
        or canonical.startswith("--rf-card-")
        or canonical.startswith("--rf-surface-")
        or canonical.startswith("--rf-icon-")
        or canonical.startswith("--rf-text-")
        or canonical.startswith("--rf-navigation-")
        or old
        in {
            "--input-text",
            "--input-placeholder",
            "--input-border",
            "--input-border-hover",
            "--input-border-focus",
            "--input-border-error",
        }
    }
    color_lines += render_aliases(aliases, color_alias_names)
    color_lines += ["}", "", '[data-theme="dark"] {', "  color-scheme:dark;"]
    color_lines += render_declarations(dark_theme, dark_lookup)
    color_lines += [
        "}",
        "",
        "::selection{background:var(--rf-color-selection-background);color:var(--rf-color-selection-text)}",
        ":where(a,button,input,select,textarea,[tabindex]):focus-visible{outline:var(--rf-border-width-medium) solid var(--rf-color-focus-ring);outline-offset:var(--rf-spacing-0);box-shadow:none}",
        "@media(forced-colors:active){:where(a,button,input,select,textarea,[tabindex]):focus-visible{outline-color:Highlight}}",
        "@media(prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto!important;animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}",
        "",
    ]

    foundation_lines = [header, ":root {"]
    foundation_lines += render_declarations(foundation_base, light_lookup)
    foundation_alias_names = {
        old
        for old, canonical in aliases.items()
        if old not in color_alias_names and not canonical.startswith("--rf-font-") and not canonical.startswith("--rf-typography-")
    }
    foundation_lines += render_aliases(aliases, foundation_alias_names)
    foundation_lines += ["}", ""]

    typography_lines = [
        header,
        '@font-face{font-family:"Onest";src:url("./fonts/Onest-Cyrillic-Variable.woff2") format("woff2-variations");font-style:normal;font-weight:100 900;font-display:swap;unicode-range:'
        + css_unicode_range(ONEST_CYRILLIC_UNICODE_RANGES)
        + "}",
        '@font-face{font-family:"Onest";src:url("./fonts/Onest-Latin-Variable.woff2") format("woff2-variations");font-style:normal;font-weight:100 900;font-display:swap;unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}',
        "",
        ":root {",
    ]
    typography_lines += render_declarations(typography_base, light_lookup)
    typography_alias_names = {
        old
        for old, canonical in aliases.items()
        if canonical.startswith("--rf-font-") or canonical.startswith("--rf-typography-")
    }
    typography_lines += render_aliases(aliases, typography_alias_names)
    typography_lines += ["}"]
    typography_lines += render_mobile_typography_blocks(typography_modes)
    typography_lines += [
        "",
        "html,body,button,input,textarea,select{font-family:var(--rf-font-family-body)}",
        ".text-display{font-family:var(--rf-typography-style-display-large-font-family);font-size:var(--rf-typography-style-display-large-font-size);font-weight:var(--rf-typography-style-display-large-font-weight);letter-spacing:var(--rf-typography-style-display-large-letter-spacing);line-height:var(--rf-typography-style-display-large-line-height)}",
        ".text-heading-1{font-family:var(--rf-typography-style-heading-large-font-family);font-size:var(--rf-typography-style-heading-large-font-size);font-weight:var(--rf-typography-style-heading-large-font-weight);letter-spacing:var(--rf-typography-style-heading-large-letter-spacing);line-height:var(--rf-typography-style-heading-large-line-height)}",
        ".text-heading-2{font-family:var(--rf-typography-style-heading-medium-font-family);font-size:var(--rf-typography-style-heading-medium-font-size);font-weight:var(--rf-typography-style-heading-medium-font-weight);letter-spacing:var(--rf-typography-style-heading-medium-letter-spacing);line-height:var(--rf-typography-style-heading-medium-line-height)}",
        ".text-body{font-family:var(--rf-typography-style-body-medium-font-family);font-size:var(--rf-typography-style-body-medium-font-size);font-weight:var(--rf-typography-style-body-medium-font-weight);letter-spacing:var(--rf-typography-style-body-medium-letter-spacing);line-height:var(--rf-typography-style-body-medium-line-height)}",
        ".text-label{font-family:var(--rf-typography-style-label-medium-font-family);font-size:var(--rf-typography-style-label-medium-font-size);font-weight:var(--rf-typography-style-label-medium-font-weight);letter-spacing:var(--rf-typography-style-label-medium-letter-spacing);line-height:var(--rf-typography-style-label-medium-line-height)}",
        ".text-caption{font-family:var(--rf-typography-style-label-small-font-family);font-size:var(--rf-typography-style-label-small-font-size);font-weight:var(--rf-typography-style-label-small-font-weight);letter-spacing:var(--rf-typography-style-label-small-letter-spacing);line-height:var(--rf-typography-style-label-small-line-height)}",
        "",
    ]

    unified_lines = [header, ":root {", "  color-scheme:light;"]
    unified_lines += render_declarations(base_all, light_lookup)
    unified_lines += render_declarations(light_theme, light_lookup)
    unified_lines += render_aliases(aliases)
    unified_lines += ["}"]
    unified_lines += render_mobile_typography_blocks(typography_modes)
    unified_lines += ["", '[data-theme="dark"] {', "  color-scheme:dark;"]
    unified_lines += render_declarations(dark_theme, dark_lookup)
    unified_lines += [
        "}",
        "",
        "::selection{background:var(--rf-color-selection-background);color:var(--rf-color-selection-text)}",
        ":where(a,button,input,select,textarea,[tabindex]):focus-visible{outline:var(--rf-border-width-medium) solid var(--rf-color-focus-ring);outline-offset:var(--rf-spacing-0);box-shadow:none}",
        "@media(forced-colors:active){:where(a,button,input,select,textarea,[tabindex]):focus-visible{outline-color:Highlight}}",
        "@media(prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto!important;animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}",
        "",
    ]

    return (
        "\n".join(color_lines),
        "\n".join(foundation_lines),
        "\n".join(typography_lines),
        "\n".join(unified_lines),
    )


def insert_tree(tree: dict[str, Any], path: list[str], token: dict[str, Any]) -> None:
    cursor = tree
    for part in path[:-1]:
        cursor = cursor.setdefault(part, {})
    cursor[path[-1]] = token


def resolved_payload(
    core: dict[str, Token],
    context: dict[str, Token],
    components: dict[str, Token],
    themes: dict[str, dict[str, Token]],
) -> dict[str, Any]:
    payload: dict[str, Any] = {"core": {}, "themes": {}}
    for name, token in sorted(core.items()):
        value = resolve_value(token.value, core, (name,))
        insert_tree(payload["core"], name.split("."), value)
    for theme_name, theme in themes.items():
        lookup = merge_token_sets(core, theme, context, components)
        theme_tree: dict[str, Any] = {
            "alias": {},
            "context": {},
            "component": {},
            "elevation": {},
        }
        for name, token in sorted(theme.items()):
            if name.startswith("color.alias."):
                insert_tree(
                    theme_tree["alias"],
                    name.removeprefix("color.alias.").split("."),
                    resolve_value(token.value, lookup, (name,)),
                )
            elif name.startswith("elevation."):
                insert_tree(
                    theme_tree["elevation"],
                    name.removeprefix("elevation.").split("."),
                    resolve_value(token.value, lookup, (name,)),
                )
        for name, token in sorted(context.items()):
            insert_tree(
                theme_tree["context"],
                name.removeprefix("color.context.").split("."),
                resolve_value(token.value, lookup, (name,)),
            )
        for name, token in sorted(components.items()):
            insert_tree(
                theme_tree["component"],
                name.removeprefix("component.").split("."),
                resolve_value(token.value, lookup, (name,)),
            )
        payload["themes"][theme_name] = theme_tree
    return payload


def compatibility_color_json(
    core: dict[str, Token],
    context: dict[str, Token],
    themes: dict[str, dict[str, Token]],
) -> str:
    document: dict[str, Any] = {
        "$schema": SCHEMA,
        "$description": "Generated compatibility export. Edit design/design-system/tokens instead.",
        "color": {
            "primitive": {},
            "static": {},
            "alias": {"light": {}, "dark": {}},
            "context": {"light": {}, "dark": {}},
        },
    }
    primitive_lookup = core
    for name, token in sorted(core.items()):
        if name.startswith("color.primitive."):
            insert_tree(
                document["color"]["primitive"],
                name.split(".")[2:],
                {"$type": token.token_type, "$value": resolve_value(token.value, primitive_lookup, (name,))},
            )
        elif name.startswith("color.static."):
            insert_tree(
                document["color"]["static"],
                name.split(".")[2:],
                {"$type": token.token_type, "$value": resolve_value(token.value, primitive_lookup, (name,))},
            )
    for theme_name, theme in themes.items():
        lookup = merge_token_sets(core, theme, context)
        for name, token in sorted(theme.items()):
            if not name.startswith("color.alias."):
                continue
            insert_tree(
                document["color"]["alias"][theme_name],
                name.removeprefix("color.alias.").split("."),
                {"$type": token.token_type, "$value": resolve_value(token.value, lookup, (name,))},
            )
        for name, token in sorted(context.items()):
            insert_tree(
                document["color"]["context"][theme_name],
                name.removeprefix("color.context.").split("."),
                {"$type": token.token_type, "$value": resolve_value(token.value, lookup, (name,))},
            )
    return json.dumps(document, ensure_ascii=False, indent=2) + "\n"


def color_record(token: Token) -> dict[str, Any]:
    record: dict[str, Any] = {"name": token.name, "type": "color"}
    aliases = list(iter_aliases(token.value))
    if aliases:
        if len(aliases) != 1 or not isinstance(token.value, str):
            raise TokenError(f"{token.name}: color manifest поддерживает один полный alias")
        record["alias"] = token.value
    else:
        record["value"] = token.value
    return record


def color_tokens_manifest(
    core: dict[str, Token],
    context: dict[str, Token],
    components: dict[str, Token],
    themes: dict[str, dict[str, Token]],
    recipe: dict[str, Any],
) -> dict[str, Any]:
    token_migrations = load_token_migrations()
    primitive = [
        color_record(core[name])
        for name in sorted(core)
        if name.startswith("color.primitive.")
    ]
    static = [
        color_record(core[name]) for name in sorted(core) if name.startswith("color.static.")
    ]
    alias = {
        theme_name: [
            color_record(theme[name])
            for name in sorted(theme)
            if name.startswith("color.alias.")
        ]
        for theme_name, theme in themes.items()
    }
    context_records = [color_record(context[name]) for name in sorted(context)]
    component = [
        color_record(components[name])
        for name in sorted(components)
        if components[name].token_type == "color"
    ]
    ramp = {
        "algorithm": "linear-srgb-channel-mix-with-segmented-neutral-anchors",
        "colorSpace": recipe["colorSpace"],
        "steps": recipe["steps"],
        "seedStep": recipe["seedStep"],
        "mix": recipe["mix"],
        "grayAnchorSteps": recipe["grayAnchorSteps"],
    }
    return {
        "schemaVersion": 1,
        "generatedFrom": [
            COLOR_PRIMITIVE_SOURCE.relative_to(REPO_ROOT).as_posix(),
            (TOKEN_ROOT / "static.json").relative_to(REPO_ROOT).as_posix(),
            THEME_SOURCES["light"].relative_to(REPO_ROOT).as_posix(),
            THEME_SOURCES["dark"].relative_to(REPO_ROOT).as_posix(),
            CONTEXT_SOURCE.relative_to(REPO_ROOT).as_posix(),
            COMPONENT_SOURCE.relative_to(REPO_ROOT).as_posix(),
            TOKEN_MIGRATIONS_SOURCE.relative_to(REPO_ROOT).as_posix(),
        ],
        "policy": token_migrations["policy"],
        "migrations": token_migrations["migrations"],
        "ramp": ramp,
        "layers": {
            "primitive": primitive,
            "static": static,
            "alias": alias,
            "context": context_records,
            "component": component,
        },
    }


def foundation_record(token: Token, layer: str, lookup: dict[str, Token]) -> dict[str, Any]:
    record: dict[str, Any] = {
        "layer": layer,
        "name": token.name,
        "type": token.token_type,
    }
    aliases = list(iter_aliases(token.value))
    if aliases:
        if len(aliases) != 1 or not isinstance(token.value, str):
            raise TokenError(f"{token.name}: foundation manifest поддерживает один полный alias")
        record["alias"] = token.value
    else:
        record["value"] = token.value
    record["resolved"] = resolve_value(token.value, lookup, (token.name,))
    return record


def foundation_tokens_manifest(core: dict[str, Token]) -> dict[str, Any]:
    primitive_names = [f"dimension.{name}" for name, _value in DIMENSION_SCALE] + [
        f"opacity.{name}" for name, _value in OPACITY_SCALE
    ]
    semantic_names = (
        [f"spacing.{step}" for step in SPACING_SCALE]
        + [f"radius.{name}" for name, _step in RADIUS_SCALE]
        + [f"border.width.{name}" for name, _step in BORDER_WIDTH_SCALE]
    )
    primitive = [foundation_record(core[name], "primitive", core) for name in primitive_names]
    semantic = [foundation_record(core[name], "semantic", core) for name in semantic_names]
    if len(primitive) != 34 or len(semantic) != 38:
        raise TokenError("Foundation manifest contract должен содержать 34 Primitive и 38 параметров")
    return {
        "schemaVersion": 1,
        "generatedFrom": [FOUNDATION_SOURCE.relative_to(REPO_ROOT).as_posix()],
        "layers": {"primitive": primitive, "semantic": semantic},
    }


def typography_tokens_manifest(
    core: dict[str, Token],
    typography_modes: dict[str, dict[str, Token]] | None = None,
) -> dict[str, Any]:
    typography_modes = typography_modes or load_typography_modes(core)

    def record(name: str, layer: str, lookup: dict[str, Token]) -> dict[str, Any]:
        token = lookup[name]
        item: dict[str, Any] = {
            "layer": layer,
            "name": name,
            "type": token.token_type,
            "resolved": resolve_value(token.value, lookup, (name,)),
        }
        aliases = list(iter_aliases(token.value))
        if isinstance(token.value, str) and len(aliases) == 1:
            item["alias"] = token.value
        elif aliases:
            item["branches"] = [
                {"property": prop, "alias": value}
                for prop, value in token.value.items()
            ]
        else:
            item["value"] = token.value
        return item

    def layers_for(lookup: dict[str, Token]) -> dict[str, list[dict[str, Any]]]:
        names = {
            "primitive": sorted(name for name in lookup if name.startswith("font.")),
            "textStyle": sorted(
                name for name in lookup if name.startswith("typography.style.")
            ),
        }
        return {
            layer: [record(name, layer, lookup) for name in layer_names]
            for layer, layer_names in names.items()
        }

    layers = layers_for(typography_modes["desktop"])
    counts = {name: len(records) for name, records in layers.items()}
    if counts != {
        "primitive": 36,
        "textStyle": 20,
    }:
        raise TokenError(f"Typography manifest имеет неверные counts: {counts}")

    mode_sources = {
        "desktop": TYPOGRAPHY_SOURCE.relative_to(REPO_ROOT).as_posix(),
        "mobile": TYPOGRAPHY_MOBILE_SOURCE.relative_to(REPO_ROOT).as_posix(),
    }
    mode_contracts: dict[str, Any] = {}
    for mode, lookup in typography_modes.items():
        mode_layers = layers_for(lookup)
        mode_counts = {
            layer: len(records) for layer, records in mode_layers.items()
        }
        if mode_counts != counts:
            raise TokenError(
                f"Typography {mode} mode имеет неверные counts: {mode_counts}"
            )
        mode_contracts[mode] = {
            "source": mode_sources[mode],
            "mediaQuery": None if mode == "desktop" else "(max-width: 639px)",
            "counts": mode_counts,
            "layers": mode_layers,
        }
    return {
        "schemaVersion": 3,
        "generatedFrom": [
            (TOKEN_ROOT / "primitives.json").relative_to(REPO_ROOT).as_posix(),
            TYPOGRAPHY_SOURCE.relative_to(REPO_ROOT).as_posix(),
            TYPOGRAPHY_MOBILE_SOURCE.relative_to(REPO_ROOT).as_posix(),
            COMPONENT_SOURCE.relative_to(REPO_ROOT).as_posix(),
        ],
        "settings": {
            "primaryFamily": "Onest",
            "baseFontSize": {"value": 16, "unit": "px"},
            "scale": "Figma Typography: 20 public Styles in four base groups",
            "lineHeight": "15 independent px Dimensions from the Figma scale",
            "letterSpacing": "All 20 public Styles use normal tracking (0rem)",
            "publicApi": "typography.style.* only",
            "platformModes": ["desktop", "mobile"],
        },
        "counts": counts,
        "layers": layers,
        "modes": mode_contracts,
    }


def read_core_source(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except OSError as exc:
        raise TokenError(
            f"Не удалось прочитать {path.relative_to(REPO_ROOT)}: {exc}"
        ) from exc


def core_component_sources() -> list[Path]:
    entrypoint = read_core_source(WEB_COMPONENT_ENTRYPOINT)
    without_comments = CSS_BLOCK_COMMENT_RE.sub("", entrypoint)
    imports: list[Path] = []
    remainder = without_comments
    for match in COMPONENT_IMPORT_RE.finditer(without_comments):
        relative = Path(match.group("path"))
        source = WEB_ROOT / relative
        if source.parent != WEB_ROOT / "components":
            raise TokenError(
                f"Недопустимый Core UI import: {relative.as_posix()}"
            )
        if source in imports:
            raise TokenError(
                f"Повторный Core UI import: {relative.as_posix()}"
            )
        imports.append(source)
        remainder = remainder.replace(match.group(0), "", 1)

    if remainder.strip():
        raise TokenError(
            "web/components.css должен содержать только component imports"
        )
    if not imports:
        raise TokenError("web/components.css не содержит component imports")
    return imports


def core_ui_css_bundle() -> bytes:
    sources = [WEB_PRIMITIVES_CSS, *core_component_sources()]
    sections = [
        "/* Generated by design/design-system/scripts/build_tokens.py. Do not edit. */"
    ]
    for path in sources:
        source = read_core_source(path).rstrip()
        if "@import" in CSS_BLOCK_COMMENT_RE.sub("", source):
            raise TokenError(
                f"Core UI source содержит вложенный import: {path.relative_to(REPO_ROOT)}"
            )
        sections.append(
            f"/* Source: {path.relative_to(REPO_ROOT).as_posix()} */\n{source}"
        )
    return ("\n\n".join(sections) + "\n").encode()


def core_ui_behavior() -> bytes:
    try:
        return WEB_BEHAVIOR_JS.read_bytes()
    except OSError as exc:
        raise TokenError(
            f"Не удалось прочитать {WEB_BEHAVIOR_JS.relative_to(REPO_ROOT)}: {exc}"
        ) from exc


def consumer_services():
    """Existing service roots only; standalone Contour never creates product trees."""
    return tuple(name for name in ("admin", "miniapp", "landing")
                 if (REPO_ROOT / "services" / name).is_dir())


def build_outputs() -> dict[Path, bytes]:
    color_primitives, ramp_recipe = load_color_primitives()
    core_parts = [color_primitives] + [
        flatten_tokens(load_json(path)) for path in CORE_SOURCES
    ]
    core = merge_token_sets(*core_parts)
    typography_modes = load_typography_modes(core)
    context = flatten_tokens(load_json(CONTEXT_SOURCE))
    components = flatten_tokens(load_json(COMPONENT_SOURCE))
    themes = {
        name: flatten_tokens(load_json(path)) for name, path in THEME_SOURCES.items()
    }
    validate_architecture(
        core,
        context,
        components,
        themes,
        typography_modes=typography_modes,
    )

    color_css, foundation_css, typography_css, unified_css = render_css_outputs(
        core, context, components, themes, typography_modes
    )
    resolved = resolved_payload(core, context, components, themes)
    resolved_json = json.dumps(resolved, ensure_ascii=False, indent=2) + "\n"
    color_manifest = color_tokens_manifest(
        core, context, components, themes, ramp_recipe
    )
    color_manifest_json = json.dumps(color_manifest, ensure_ascii=False, indent=2) + "\n"
    foundation_manifest = foundation_tokens_manifest(core)
    foundation_manifest_json = (
        json.dumps(foundation_manifest, ensure_ascii=False, indent=2) + "\n"
    )
    typography_manifest = typography_tokens_manifest(core, typography_modes)
    typography_manifest_json = (
        json.dumps(typography_manifest, ensure_ascii=False, indent=2) + "\n"
    )
    tokens_ts = (
        "// Generated by design/design-system/scripts/build_tokens.py. Do not edit.\n"
        "export const reflowerTokens = "
        + json.dumps(resolved, ensure_ascii=False, indent=2)
        + " as const;\n\nexport type ReflowerTheme = keyof typeof reflowerTokens.themes;\n"
    )
    core_ui_css = core_ui_css_bundle()
    core_ui_js = core_ui_behavior()

    outputs: dict[Path, bytes] = {
        MASTER_COLOR_CSS: color_css.encode(),
        MASTER_COLOR_JSON: compatibility_color_json(core, context, themes).encode(),
        MASTER_FOUNDATION_CSS: foundation_css.encode(),
        MASTER_TYPOGRAPHY_CSS: typography_css.encode(),
        GENERATED_WEB / "tokens.css": unified_css.encode(),
        GENERATED_WEB / "tokens.ts": tokens_ts.encode(),
        GENERATED_WEB / "core-ui.css": core_ui_css,
        GENERATED_ROOT / "tokens.resolved.json": resolved_json.encode(),
        GENERATED_ROOT / "color-tokens.json": color_manifest_json.encode(),
        GENERATED_ROOT / "foundation-tokens.json": foundation_manifest_json.encode(),
        GENERATED_ROOT / "typography-tokens.json": typography_manifest_json.encode(),
        REACT_ROOT / "typography.css": typography_css.encode(),
        REACT_ROOT / "tokens.css": unified_css.encode(),
        REACT_ROOT / "styles.css": core_ui_css,
        REACT_ROOT / "fonts" / "Onest-Cyrillic-Variable.woff2": (
            MASTER_TYPOGRAPHY_FONT_ROOT / "Onest-Cyrillic-Variable.woff2"
        ).read_bytes(),
        REACT_ROOT / "fonts" / "Onest-Latin-Variable.woff2": (
            MASTER_TYPOGRAPHY_FONT_ROOT / "Onest-Latin-Variable.woff2"
        ).read_bytes(),
        REACT_ROOT / "fonts" / "OFL.txt": (
            MASTER_TYPOGRAPHY_FONT_ROOT / "OFL.txt"
        ).read_bytes(),
    }

    for service in consumer_services():
        brand = REPO_ROOT / "services" / service / "static" / "brand"
        outputs[brand / "colors" / "tokens.css"] = outputs[MASTER_COLOR_CSS]
        outputs[brand / "foundations" / "tokens.css"] = outputs[MASTER_FOUNDATION_CSS]
        outputs[brand / "typography" / "typography.css"] = outputs[MASTER_TYPOGRAPHY_CSS]
        service_core = REPO_ROOT / "services" / service / "static" / "design-system"
        outputs[service_core / "core-ui.css"] = core_ui_css
        outputs[service_core / "core-ui.js"] = core_ui_js
    icon_roots = [SYSTEM_ROOT / "web", REACT_ROOT] + [
        REPO_ROOT / "services" / service / "static" / "design-system"
        for service in consumer_services()
    ]
    for icon_root in icon_roots:
        if icon_root != SYSTEM_ROOT / "web":
            outputs[icon_root / "icon-glyphs.js"] = (SYSTEM_ROOT / "web" / "icon-glyphs.js").read_bytes()
        for name in ("index", "line", "solid", "duotone"):
            outputs[icon_root / "icon-data" / f"{name}.json"] = (
                REPO_ROOT / "design" / "icons" / "generated" / f"{name}.json"
            ).read_bytes()
    outputs.update(versioned_service_html_outputs(outputs))
    outputs.update(versioned_catalog_html_outputs(outputs))
    return outputs


def versioned_service_html_outputs(generated: dict[Path, bytes]) -> dict[Path, bytes]:
    """Bind CSS/JS URLs to their content, including newly generated Core assets.

    Updating templates along with assets prevents a browser's warm cache from
    combining new markup with an older Core contract. No runtime hashing needed.
    """
    patterns = (
        re.compile(
            r"(?P<url>\{\{\s*url_for\('static',\s*filename='"
            r"(?P<path>[^']+\.(?:css|js))'\)\s*\}\})(?:\?v=[^\s\"'<>]+)?"
        ),
        re.compile(
            r"(?<=[\"'])(?P<url>(?:/miniApp/)?/?static/"
            r"(?P<path>[^\s\"'?#<>]+\.(?:css|js)))(?:\?v=[^\s\"'<>]+)?"
        ),
    )
    result = {}
    for service in consumer_services():
        root = REPO_ROOT / "services" / service
        static = root / "static"

        def replace(match):
            asset = static / match["path"]
            if not asset.resolve().is_relative_to(static.resolve()):
                raise TokenError(f"Static asset escapes service root: {asset}")
            data = generated.get(asset)
            if data is None:
                if not asset.is_file():
                    raise TokenError(f"Missing static asset: {asset}")
                data = asset.read_bytes()
            digest = hashlib.sha256(data).hexdigest()[:16]
            return f'{match["url"]}?v={digest}'

        templates = set(root.glob("*.html"))
        for folder in (root / "templates", static):
            templates.update(folder.rglob("*.html"))
        for template in sorted(templates):
            original = template.read_text(encoding="utf-8")
            versioned = original
            for pattern in patterns:
                versioned = pattern.sub(replace, versioned)
            if versioned != original:
                result[template] = versioned.encode()
    return result


def versioned_catalog_html_outputs(generated: dict[Path, bytes]) -> dict[Path, bytes]:
    """Version Catalog runtime assets together with the generated Core bundle.

    Catalog uses the same import-free Core CSS as product consumers. Hash all
    local CSS/JS links, not just the entrypoint, so an ordinary reload cannot
    combine a new Catalog with cached tokens, behavior, or presentation.
    """
    template = REPO_ROOT / "design/design-system/web/catalog.html"
    original = template.read_text(encoding="utf-8")
    pending = {path.resolve(): data for path, data in generated.items()}
    pattern = re.compile(
        r"(?P<prefix><(?:link|script)\b[^>]*?\b(?:href|src)=)(?P<quote>[\"'])"
        r"(?P<url>[^\"']+)(?P=quote)",
        re.IGNORECASE,
    )

    def replace(match):
        parsed = urlsplit(match["url"])
        if parsed.scheme or parsed.netloc or Path(parsed.path).suffix not in {".css", ".js"}:
            return match[0]
        asset = (template.parent / parsed.path).resolve()
        if not asset.is_relative_to((REPO_ROOT / "design").resolve()):
            raise TokenError(f"Catalog asset escapes design root: {asset}")
        data = pending.get(asset)
        if data is None:
            if not asset.is_file():
                raise TokenError(f"Missing Catalog asset: {asset}")
            data = asset.read_bytes()
        digest = hashlib.sha256(data).hexdigest()[:16]
        query = [(key, value) for key, value in parse_qsl(parsed.query, keep_blank_values=True) if key != "v"]
        query.append(("v", digest))
        url = urlunsplit(parsed._replace(query=urlencode(query)))
        return f'{match["prefix"]}{match["quote"]}{url}{match["quote"]}'

    versioned = pattern.sub(replace, original)
    return {template: versioned.encode()} if versioned != original else {}


def write_or_check(outputs: dict[Path, bytes], check: bool) -> int:
    stale = []
    retired = [REACT_ROOT / "icons-runtime.js"] + [
        REPO_ROOT / "services" / service / "static" / "icons.js"
        for service in consumer_services()
    ]
    for path in retired:
        if path.exists():
            if check:
                stale.append(path.relative_to(REPO_ROOT))
            else:
                path.unlink()
    for path, expected in outputs.items():
        actual = path.read_bytes() if path.exists() else None
        if actual == expected:
            continue
        if check:
            stale.append(path.relative_to(REPO_ROOT))
            continue
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(expected)

    if stale:
        print("Design System outputs устарели:", file=sys.stderr)
        for path in stale:
            print(f"- {path}", file=sys.stderr)
        print(
            "Запустите: python3 design/design-system/scripts/build_tokens.py",
            file=sys.stderr,
        )
        return 1
    if check:
        print(f"Design System tokens: {len(outputs)} outputs актуальны.")
    else:
        print(f"Design System tokens: обновлено {len(outputs)} outputs.")
    return 0


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--check",
        action="store_true",
        help="ничего не менять и завершиться ошибкой при устаревших outputs",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    try:
        outputs = build_outputs()
    except TokenError as exc:
        print(f"Design System token error: {exc}", file=sys.stderr)
        return 1
    return write_or_check(outputs, args.check)


if __name__ == "__main__":
    raise SystemExit(main())
