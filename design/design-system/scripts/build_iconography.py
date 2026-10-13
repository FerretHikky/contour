#!/usr/bin/env python3
"""Compile exact Figma SVG exports for Iconography, Core Icon and React.

Legacy product hosts stay on the old registry until their explicit migration.
Source geometry is never redrawn; only paint roles are normalized for theming.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import math
import re
from pathlib import Path
import xml.etree.ElementTree as ET

from defusedxml import ElementTree as SafeET
from defusedxml.common import DefusedXmlException

ROOT = Path(__file__).resolve().parents[3]
SOURCE = ROOT / "design/icons/figma"
OUTPUT = ROOT / "design/icons/generated"
CUSTOM = ROOT / "design/icons/custom"
STYLES = ("line", "solid", "duotone")
TAGS = {"svg", "g", "path", "rect", "circle", "ellipse", "line", "polyline", "polygon", "defs", "clipPath", "mask"}
ATTRS = {"width", "height", "viewBox", "fill", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin", "fill-rule", "clip-rule", "d", "x", "y", "x1", "y1", "x2", "y2", "cx", "cy", "r", "rx", "ry", "points", "opacity", "fill-opacity", "stroke-opacity", "transform", "id", "clip-path", "mask", "maskUnits", "maskContentUnits", "style"}
ET.register_namespace("", "http://www.w3.org/2000/svg")


class SourceGeometryError(ValueError):
    """The exported Figma source contains non-finite coordinates."""


def normalize(source: str) -> str:
    try:
        root = SafeET.fromstring(source, forbid_dtd=True, forbid_entities=True, forbid_external=True)
    except DefusedXmlException as exc:
        raise ValueError("DTD and entity declarations are not allowed in SVG") from exc
    if root.tag != "{http://www.w3.org/2000/svg}svg" or root.get("viewBox") != "0 0 24 24":
        raise ValueError("Icon must use the source 24 × 24 viewBox")
    for node in root.iter():
        tag = node.tag.rsplit("}", 1)[-1]
        if tag not in TAGS or set(node.attrib) - ATTRS:
            raise ValueError(f"Unexpected SVG content: {tag} {node.attrib}")
        for attr, value in list(node.attrib.items()):
            if re.search(r"nan|infinity", value, re.I):
                raise SourceGeometryError("Non-finite coordinates in source SVG")
            if attr in {"fill", "stroke"}:
                # Source Arrows use bound Reflower foreground/background paints;
                # the rest of the source uses Black / Gray 200. Same two roles.
                if value.lower() in {"black", "#000000", "#000", "#46464b", "#a3435b"}:
                    node.set(attr, "currentColor")
                elif value.lower() in {"#babdcc", "#fff9fa"}:
                    node.set(attr, "currentColor")
                    node.set("class", "rf-icon__tone")
                elif value not in {"none", "white", "#FFFFFF", "#ffffff"}:
                    raise ValueError(f"Unknown source paint: {value}")
            elif attr == "style" and value != "mask-type:alpha":
                raise ValueError(f"Unexpected inline style: {value}")
            elif attr in {"clip-path", "mask"} and not re.fullmatch(r"url\(#[\w-]+\)", value):
                raise ValueError(f"Only local SVG references are allowed: {value}")
    root.attrib.pop("width", None)
    root.attrib.pop("height", None)
    return ET.tostring(root, encoding="unicode")


def normalize_custom(source: str) -> str:
    """Center an owner-supplied monochrome glyph without redrawing or scaling it."""
    root = SafeET.fromstring(source, forbid_dtd=True, forbid_entities=True, forbid_external=True)
    box = [float(value) for value in root.get('viewBox', '').split()]
    if len(box) != 4 or box[:2] != [0, 0] or not all(math.isfinite(v) and 0 < v <= 24 for v in box[2:]):
        raise ValueError('Custom Icon requires a finite viewBox within 24 × 24')
    width, height = box[2:]
    root.set('viewBox', '0 0 24 24')
    # Validate before wrapping; this also rejects active content and external URLs.
    for node in root.iter():
        for attr in ('fill', 'stroke'):
            if node.get(attr) in {'white', '#FFFFFF', '#ffffff'}:
                node.set(attr, 'black')
    normalized = SafeET.fromstring(
        normalize(ET.tostring(root, encoding='unicode')),
        forbid_dtd=True, forbid_entities=True, forbid_external=True,
    )
    group = ET.Element('{http://www.w3.org/2000/svg}g', {'transform': f'translate({(24-width)/2:g} {(24-height)/2:g})'})
    group.extend(list(normalized))
    for child in list(normalized):
        normalized.remove(child)
    normalized.append(group)
    return ET.tostring(normalized, encoding='unicode')


def outputs() -> dict[Path, str]:
    manifest = json.loads((SOURCE / "manifest.json").read_text())
    records = manifest["icons"]
    excluded = json.loads((SOURCE / "excluded-variants.json").read_text())
    excluded_pairs = {(item["style"], item["key"]) for item in excluded}
    if len(records) != 2757 - len(excluded_pairs):
        raise ValueError("Incomplete Figma manifest")
    glyphs: dict[str, dict] = {}
    bundles: dict[str, dict] = {style: {} for style in STYLES}
    for item in records:
        key, style = item["key"], item["style"]
        if style not in STYLES or not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", key):
            raise ValueError(f"Unsafe icon key: {style}/{key}")
        if key in bundles[style]:
            raise ValueError(f"Duplicate key: {style}/{key}")
        source = (SOURCE / style / f"{key}.svg").read_text()
        bundles[style][key] = normalize(source)
        glyph = glyphs.setdefault(key, {"key": key, "name": item["name"], "group": item["group"], "nodes": {}})
        glyph["nodes"][style] = item["nodeId"]
    expected = {(style, key) for style in STYLES for key in glyphs}
    actual = {(style, key) for style, bundle in bundles.items() for key in bundle}
    if actual != expected:
        raise ValueError("Every glyph must have identical Line, Solid and Duotone coverage")
    original_keys = set(glyphs) | {key for _, key in excluded_pairs}
    original_pairs = {(style, key) for style in STYLES for key in original_keys}
    if len(original_keys) != 919 or actual & excluded_pairs or actual | excluded_pairs != original_pairs:
        raise ValueError("Incomplete Figma source accounting")
    source_pairs = {(style, path.stem) for style in STYLES for path in (SOURCE / style).glob('*.svg')}
    if source_pairs != actual:
        raise ValueError("SVG source files must match the manifest exactly")
    custom_records = json.loads((CUSTOM / 'manifest.json').read_text())['icons']
    custom_files = set()
    for item in custom_records:
        key, style = item['key'], item['style']
        if style not in STYLES or not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', key) or key in glyphs:
            raise ValueError('Unsafe or duplicate custom Icon key')
        path = CUSTOM / f'{key}.svg'
        custom_files.add(path)
        bundles[style][key] = normalize_custom(path.read_text())
        glyphs[key] = {'key': key, 'name': item['name'], 'group': item['group'],
                       'nodes': {style: path.relative_to(ROOT).as_posix()},
                       'source': {'kind': 'owner-supplied', 'description': item['source']}}
    if set(CUSTOM.glob('*.svg')) != custom_files:
        raise ValueError('Custom SVG source files must match the manifest exactly')
    result = {}
    versions = {}
    for style, bundle in bundles.items():
        content = json.dumps(bundle, ensure_ascii=False, separators=(",", ":")) + "\n"
        versions[style] = hashlib.sha256(content.encode()).hexdigest()[:16]
        result[OUTPUT / f"{style}.json"] = content
    index = {"source": manifest["source"], "status": manifest["status"], "count": len(glyphs), "styles": list(STYLES), "versions": versions, "available": {style: len(bundle) for style, bundle in bundles.items()}, "samples": {style: bundle["mail"] for style, bundle in bundles.items()}, "glyphs": sorted(glyphs.values(), key=lambda g: g["key"])}
    result[OUTPUT / "index.json"] = json.dumps(index, ensure_ascii=False, separators=(",", ":")) + "\n"
    return result


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    generated = outputs()
    for path, content in generated.items():
        if args.check:
            if not path.exists() or path.read_text() != content:
                raise SystemExit(f"Stale iconography output: {path.relative_to(ROOT)}")
        else:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(content)
    index = json.loads(generated[OUTPUT / 'index.json'])
    print(f"Iconography: {index['count']} glyphs; {sum(index['available'].values())} valid SVGs verified")


if __name__ == "__main__":
    main()
