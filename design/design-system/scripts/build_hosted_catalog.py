#!/usr/bin/env python3
"""Build or verify the deterministic public bundle for the hosted Catalog."""

from __future__ import annotations

import argparse
import os
import re
import shutil
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit


REPO_ROOT = Path(__file__).resolve().parents[3]
DESIGN_ROOT = REPO_ROOT / "design"
SYSTEM_ROOT = DESIGN_ROOT / "design-system"
PUBLIC_ROOT = SYSTEM_ROOT / "site" / "public"

PUBLIC_SOURCES = (
    "design/design-system/web/admin-unavailable.html",
    "design/design-system/web/admin-unavailable.js",
    "design/design-system/web/miniapp-unavailable.html",
    "design/design-system/web/miniapp-unavailable.js",
    "design/design-system/web/catalog.html",
    "design/design-system/web/text-field-mobile-preview.html",
    "design/design-system/web/catalog.css",
    "design/design-system/web/catalog-react.js",
    "design/design-system/web/catalog.js",
    "design/design-system/web/iconography.js",
    "design/icons/generated/index.json",
    "design/icons/generated/line.json",
    "design/icons/generated/solid.json",
    "design/icons/generated/duotone.json",
    "design/design-system/web/components.css",
    "design/design-system/web/core-ui.js",
    "design/design-system/web/icon-glyphs.js",
    "design/design-system/web/icon-data/index.json",
    "design/design-system/web/icon-data/line.json",
    "design/design-system/web/icon-data/solid.json",
    "design/design-system/web/icon-data/duotone.json",
    "design/design-system/web/primitives.css",
    "design/design-system/web/assets/catalog-home-hero.png",
    "design/design-system/web/assets/catalog-foundations-hero.png",
    "design/design-system/web/assets/listing-card-white-roses.png",
    "design/design-system/web/assets/listing-card-figma-bouquet.png",
    "design/design-system/generated/catalog-model.json",
    "design/design-system/generated/web/tokens.css",
    "design/design-system/generated/web/core-ui.css",
    "design/design-system/FOUNDATIONS.md",
    "design/design-system/DESIGN_SYSTEM_CONTRIBUTING.md",
    "design/brand/typography/typography.css",
    "design/brand/typography/fonts/Onest-Cyrillic-Variable.woff2",
    "design/brand/typography/fonts/Onest-Latin-Variable.woff2",
    "design/design-system/web/assets/contour-wordmark.svg",
    "design/design-system/web/assets/contour-wordmark-white.svg",
    "design/design-system/web/assets/contour-mark.svg",
    "design/illustrations/catalog-error-refresh-3d.png",
    "design/illustrations/category-icons-3d/bouquet.png",
    "design/illustrations/profile-listings-card-3d.png",
    "design/illustrations/empty-sprout-3d.png",
    "docs/design-system/PILOT_MIGRATION.md",
    "docs/design-system/COMPONENT_INVENTORY.md",
    "docs/design-system/CATALOG_AUDIT.md",
    "docs/design-system/CATALOG.md",
)

FAVICON_SOURCE = "design/design-system/web/assets/contour-mark.svg"
HTML_REFERENCE_ATTRIBUTES = frozenset({"href", "src"})
CSS_URL_RE = re.compile(r"url\(\s*(['\"]?)([^'\")]+)\1\s*\)")
CSS_IMPORT_RE = re.compile(
    r"@import\s+(?:url\(\s*)?['\"]([^'\"]+)['\"]",
)
JS_ASSET_RE = re.compile(
    r"['\"]([^'\"]+\.(?:avif|css|gif|jpe?g|js|json|md|png|svg|webp|woff2)"
    r"(?:[?#][^'\"]*)?)['\"]",
    re.IGNORECASE,
)


class _HtmlReferences(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.references: list[str] = []

    def handle_starttag(
        self,
        _tag: str,
        attrs: list[tuple[str, str | None]],
    ) -> None:
        for name, value in attrs:
            if name in HTML_REFERENCE_ATTRIBUTES and value:
                self.references.append(value)
            elif name == "srcset" and value:
                self.references.extend(
                    candidate.strip().split()[0]
                    for candidate in value.split(",")
                    if candidate.strip()
                )


def _destination_for(source_relative: Path) -> Path:
    if source_relative.parts[0] == "design":
        return Path(*source_relative.parts[1:])
    return source_relative


def expected_files() -> dict[Path, Path]:
    """Return destination-relative paths mapped to canonical source files."""
    sources = [Path(item) for item in PUBLIC_SOURCES]
    component_root = SYSTEM_ROOT / "web" / "components"
    sources.extend(
        path.relative_to(REPO_ROOT)
        for path in sorted(component_root.glob("*.css"))
    )
    asset_root = SYSTEM_ROOT / "web" / "assets" / "catalog-home"
    sources.extend(
        path.relative_to(REPO_ROOT)
        for path in sorted(asset_root.glob("*.png"))
    )

    expected: dict[Path, Path] = {}
    for source_relative in sources:
        source = (REPO_ROOT / source_relative).resolve()
        if not source.is_file() or not source.is_relative_to(REPO_ROOT):
            raise ValueError(f"Hosted Catalog source is missing or unsafe: {source_relative}")
        destination = _destination_for(source_relative)
        if destination in expected:
            raise ValueError(f"Duplicate hosted Catalog destination: {destination}")
        expected[destination] = source

    favicon = (REPO_ROOT / FAVICON_SOURCE).resolve()
    if not favicon.is_file() or not favicon.is_relative_to(REPO_ROOT):
        raise ValueError(f"Hosted Catalog favicon is missing or unsafe: {FAVICON_SOURCE}")
    expected[Path("favicon.svg")] = favicon
    return dict(sorted(expected.items(), key=lambda item: item[0].as_posix()))


def _references_for(path: Path) -> list[str]:
    suffix = path.suffix.lower()
    if suffix not in {".html", ".css", ".js"}:
        return []
    text = path.read_text(encoding="utf-8")
    if suffix == ".html":
        parser = _HtmlReferences()
        parser.feed(text)
        return parser.references
    if suffix == ".css":
        references = [match.group(2).strip() for match in CSS_URL_RE.finditer(text)]
        references.extend(match.group(1).strip() for match in CSS_IMPORT_RE.finditer(text))
        return references
    return [match.group(1).strip() for match in JS_ASSET_RE.finditer(text)]


def resolve_public_reference(base_file: Path, reference: str) -> Path | None:
    """Resolve a local browser reference and reject paths outside the bundle."""
    parsed = urlsplit(reference.strip())
    if parsed.scheme or parsed.netloc or not parsed.path or parsed.path.startswith("//"):
        return None
    if parsed.path.startswith("#") or reference.startswith(("data:", "mailto:", "tel:")):
        return None
    if "\\" in parsed.path:
        raise ValueError(f"Backslashes are forbidden in hosted Catalog paths: {reference}")

    public_root = PUBLIC_ROOT.resolve()
    base = base_file.resolve()
    if not base.is_relative_to(public_root):
        raise ValueError(f"Hosted Catalog reference base is outside public/: {base_file}")
    base_url = "https://catalog.invalid/" + base.relative_to(public_root).as_posix()
    resolved_path = urlsplit(urljoin(base_url, reference)).path
    candidate = (public_root / resolved_path.lstrip("/")).resolve()
    if not candidate.is_relative_to(public_root):
        raise ValueError(f"Hosted Catalog reference escapes public/: {reference}")
    return candidate


def reference_errors(expected: dict[Path, Path] | None = None) -> list[str]:
    """Return missing or unsafe local references in the staged runtime bundle."""
    errors: list[str] = []
    manifest = expected if expected is not None else expected_files()
    runtime_files = sorted(
        relative
        for relative in manifest
        if relative.suffix.lower() in {".html", ".css", ".js"}
    )
    for relative in runtime_files:
        path = PUBLIC_ROOT / relative
        if not path.is_file():
            errors.append(f"missing reference source: {relative.as_posix()}")
            continue
        for reference in _references_for(path):
            try:
                target = resolve_public_reference(path, reference)
            except ValueError as error:
                errors.append(f"{relative.as_posix()}: {error}")
                continue
            if target is not None and not target.is_file():
                errors.append(
                    f"{relative.as_posix()}: missing {reference} "
                    f"({target.relative_to(PUBLIC_ROOT.resolve()).as_posix()})"
                )
    return errors


def _unsafe_public_entries() -> list[str]:
    if not PUBLIC_ROOT.exists() and not PUBLIC_ROOT.is_symlink():
        return []
    if PUBLIC_ROOT.is_symlink():
        return ["unsafe symlink: ."]

    errors: list[str] = []
    for root, directories, files in os.walk(PUBLIC_ROOT, followlinks=False):
        for name in (*directories, *files):
            path = Path(root) / name
            relative = path.relative_to(PUBLIC_ROOT).as_posix()
            if path.is_symlink():
                errors.append(f"unsafe symlink: {relative}")
            elif not path.is_dir() and not path.is_file():
                errors.append(f"unsafe special entry: {relative}")
    return sorted(errors)


def _current_files() -> set[Path]:
    if not PUBLIC_ROOT.exists():
        return set()
    return {
        path.relative_to(PUBLIC_ROOT)
        for path in PUBLIC_ROOT.rglob("*")
        if path.is_file() and not path.is_symlink()
    }


def check_bundle(expected: dict[Path, Path]) -> list[str]:
    current = _current_files()
    expected_paths = set(expected)
    errors = [
        *_unsafe_public_entries(),
        *(f"missing: {path.as_posix()}" for path in sorted(expected_paths - current)),
        *(f"unexpected: {path.as_posix()}" for path in sorted(current - expected_paths)),
    ]
    for relative in sorted(expected_paths & current):
        if (PUBLIC_ROOT / relative).read_bytes() != expected[relative].read_bytes():
            errors.append(f"stale: {relative.as_posix()}")
    if not errors:
        errors.extend(reference_errors(expected))
    return errors


def build_bundle(expected: dict[Path, Path]) -> None:
    if PUBLIC_ROOT.is_symlink():
        raise ValueError(f"Hosted Catalog public root must not be a symlink: {PUBLIC_ROOT}")
    if PUBLIC_ROOT.exists():
        shutil.rmtree(PUBLIC_ROOT)
    for relative, source in expected.items():
        destination = PUBLIC_ROOT / relative
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(source, destination)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--check",
        action="store_true",
        help="verify the committed bundle without changing files",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    try:
        expected = expected_files()
    except ValueError as error:
        print(error, file=sys.stderr)
        return 1

    if args.check:
        errors = check_bundle(expected)
        if errors:
            print("Hosted Catalog bundle is stale:", file=sys.stderr)
            for error in errors:
                print(f"- {error}", file=sys.stderr)
            print(
                "Run design/design-system/scripts/build_hosted_catalog.py",
                file=sys.stderr,
            )
            return 1
        print(f"Hosted Catalog bundle is current ({len(expected)} files).")
        return 0

    build_bundle(expected)
    errors = check_bundle(expected)
    if errors:
        print("Hosted Catalog bundle failed reference validation:", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1
    print(f"Built hosted Catalog bundle ({len(expected)} files).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
