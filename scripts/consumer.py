#!/usr/bin/env python3
"""Install immutable Contour releases and verify managed files (standard library only)."""
from __future__ import annotations

import argparse
import hashlib
import io
import json
from pathlib import Path, PurePosixPath
import re
import sys
from urllib.request import Request, urlopen
import zipfile

REPOSITORY = "FerretHikky/contour"
ROOT = Path(__file__).resolve().parents[1]
LOCK = ROOT / "contour.lock.json"
VERSION = re.compile(r"^[1-9][0-9]*\.[0-9]+\.[0-9]+$")


def product_owned(name: str) -> bool:
    return (name.startswith("design/design-system/site/.openai/")
            or name in ("design/design-system/site/wrangler.jsonc", "design/design-system/site/wrangler.toml")
            or PurePosixPath(name).name in ("legacy-baseline.json", "lint-exceptions.json", "icon-legacy-usage.json"))


def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def download(url: str) -> bytes:
    if not url.startswith(("https://api.github.com/repos/" + REPOSITORY + "/",
                           "https://github.com/" + REPOSITORY + "/releases/download/")):
        raise ValueError("Untrusted Contour URL")
    request = Request(url, headers={"User-Agent": "Contour-consumer/1", "Accept": "application/vnd.github+json"})
    with urlopen(request, timeout=60) as response:
        data = response.read(256 * 1024 * 1024 + 1)
    if len(data) > 256 * 1024 * 1024:
        raise ValueError("Contour download exceeds limit")
    return data


def release(version: str | None) -> tuple[str, bytes, str]:
    suffix = "tags/v" + version if version else "latest"
    metadata = json.loads(download("https://api.github.com/repos/" + REPOSITORY + "/releases/" + suffix))
    tag = metadata["tag_name"]
    selected = tag.removeprefix("v")
    if not VERSION.fullmatch(selected) or metadata.get("draft") or metadata.get("prerelease"):
        raise ValueError("Only stable versioned Contour releases are accepted")
    expected_name = "contour-v" + selected + ".zip"
    assets = {asset["name"]: asset for asset in metadata["assets"]}
    archive_url = assets[expected_name]["browser_download_url"]
    checksum = download(assets[expected_name + ".sha256"]["browser_download_url"]).decode().split()[0]
    archive = download(archive_url)
    if not re.fullmatch(r"[a-f0-9]{64}", checksum) or digest(archive) != checksum:
        raise ValueError("Contour archive checksum mismatch")
    return selected, archive, archive_url


def read_bundle(data: bytes) -> tuple[dict, dict[str, bytes]]:
    with zipfile.ZipFile(io.BytesIO(data)) as archive:
        entries = archive.infolist()
        if len(entries) > 5000 or sum(entry.file_size for entry in entries) > 256 * 1024 * 1024:
            raise ValueError("Contour archive exceeds limits")
        files = {}
        for entry in entries:
            name = entry.filename
            path = PurePosixPath(name)
            if path.is_absolute() or ".." in path.parts or "\\" in name or name in files:
                raise ValueError("Invalid Contour archive path")
            if ((entry.external_attr >> 16) & 0o170000) == 0o120000:
                raise ValueError("Contour archives cannot contain symlinks")
            if not entry.is_dir():
                files[name] = archive.read(entry)
    manifest = json.loads(files.pop("contour-manifest.json"))
    if manifest["repository"] != REPOSITORY or not VERSION.fullmatch(manifest["version"]):
        raise ValueError("Invalid Contour manifest identity")
    if set(files) != set(manifest["files"]):
        raise ValueError("Contour manifest file set mismatch")
    for name, content in files.items():
        if digest(content) != manifest["files"][name]:
            raise ValueError("Contour file checksum mismatch: " + name)
    return manifest, files


def projected(profile: str, sources: dict[str, bytes]) -> dict[str, bytes]:
    result = {}
    if profile == "reflower":
        prefixes = ("design/design-system/", "design/icons/", "design/brand/colors/",
                    "design/brand/foundations/", "design/brand/typography/", "docs/design-system/")
        excluded = ("legacy-baseline.json", "lint-exceptions.json", "icon-legacy-usage.json")
        for name, content in sources.items():
            if name.startswith(prefixes) and PurePosixPath(name).name not in excluded and not product_owned(name):
                result[name] = content
        direct = {
            "design/design-system/generated/web/core-ui.css": "design-system/core-ui.css",
            "design/design-system/web/core-ui.js": "design-system/core-ui.js",
            "design/design-system/web/icon-glyphs.js": "design-system/icon-glyphs.js",
            "design/brand/colors/tokens.css": "brand/colors/tokens.css",
            "design/brand/foundations/tokens.css": "brand/foundations/tokens.css",
            "design/brand/typography/typography.css": "brand/typography/typography.css",
        }
        for service in ("admin", "miniapp", "landing"):
            base = "services/" + service + "/static/"
            if not (ROOT / "services" / service).is_dir():
                continue
            for name, destination in direct.items():
                result[base + destination] = sources[name]
            for name, content in sources.items():
                if name.startswith("design/design-system/web/icon-data/"):
                    result[base + "design-system/icon-data/" + PurePosixPath(name).name] = content
                elif name.startswith("design/brand/typography/fonts/") and name.endswith((".woff2", "OFL.txt")):
                    result[base + "brand/typography/fonts/" + PurePosixPath(name).name] = content
    elif profile == "lavlio":
        target = "design/prototypes/storefront/public/contour/"
        direct = {
            "design/design-system/generated/web/core-ui.css": "design-system/core-ui.css",
            "design/design-system/web/core-ui.js": "design-system/core-ui.js",
            "design/design-system/web/icon-glyphs.js": "design-system/icon-glyphs.js",
            "design/brand/colors/tokens.css": "brand/colors/tokens.css",
            "design/brand/foundations/tokens.css": "brand/foundations/tokens.css",
            "design/brand/typography/typography.css": "brand/typography/typography.css",
        }
        for name, destination in direct.items():
            result[target + destination] = sources[name]
        for name, content in sources.items():
            if name.startswith("design/design-system/web/icon-data/"):
                result[target + "design-system/icon-data/" + PurePosixPath(name).name] = content
            elif name.startswith("design/brand/typography/fonts/") and name.endswith((".woff2", "OFL.txt")):
                result[target + "brand/typography/fonts/" + PurePosixPath(name).name] = content
    else:
        raise ValueError("Unknown Contour consumer profile")
    if not result:
        raise ValueError("Empty Contour projection")
    return result


def checked_destination(name: str) -> Path:
    path = PurePosixPath(name)
    if path.is_absolute() or ".." in path.parts or "\\" in name:
        raise ValueError("Invalid managed path")
    destination = ROOT.joinpath(*path.parts)
    if not destination.resolve().is_relative_to(ROOT.resolve()):
        raise ValueError("Managed path escapes consumer")
    return destination


def check(lock: dict) -> None:
    if lock["repository"] != REPOSITORY:
        raise ValueError("Unexpected Contour repository")
    failures = []
    for name, expected in lock["managedFiles"].items():
        path = checked_destination(name)
        if not path.is_file() or digest(path.read_bytes()) != expected:
            failures.append(name)
    if failures:
        raise ValueError("Managed Contour files changed; edit Contour upstream: " + ", ".join(failures))


def version_product_templates() -> None:
    from urllib.parse import urlsplit
    patterns = (
        re.compile(r"(?P<url>\{\{\s*url_for\('static',\s*filename='(?P<path>[^']+\.(?:css|js))'\)\s*\}\})(?:\?v=[^\s\"'<>]+)?"),
        re.compile(r"(?<=[\"'])(?P<url>(?:/miniApp/)?/?static/(?P<path>[^\s\"'?#<>]+\.(?:css|js)))(?:\?v=[^\s\"'<>]+)?"),
    )
    for service in ("admin", "miniapp", "landing"):
        root = ROOT / "services" / service
        static = root / "static"
        templates = set(root.glob("*.html"))
        for folder in (root / "templates", static):
            templates.update(folder.rglob("*.html"))

        def replace(match):
            path = static / urlsplit(match["path"]).path
            if not path.resolve().is_relative_to(static.resolve()) or not path.is_file():
                raise ValueError("Missing or escaping static asset: " + str(path))
            return match["url"] + "?v=" + digest(path.read_bytes())[:16]

        for template in templates:
            original = template.read_text()
            versioned = original
            for pattern in patterns:
                versioned = pattern.sub(replace, versioned)
            if versioned != original:
                template.write_text(versioned)


def install(profile: str, data: bytes, url: str) -> None:
    manifest, sources = read_bundle(data)
    files = projected(profile, sources)
    previous = json.loads(LOCK.read_text()) if LOCK.exists() else None
    if previous:
        check(previous)
        if previous["profile"] != profile:
            raise ValueError("Cannot switch Contour consumer profile")
    # Validate every destination before touching the checkout.
    destinations = {name: checked_destination(name) for name in files}
    old_names = set(previous["managedFiles"]) if previous else set()
    retired = {name: checked_destination(name) for name in old_names - set(files) if not product_owned(name)}
    for name, path in destinations.items():
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(files[name])
    for path in retired.values():
        path.unlink(missing_ok=True)
    if profile == "reflower":
        # First adoption can contain old generated catalog assets that were never
        # in a Contour lock. Only complete generator-owned output trees are pruned.
        for directory in ("design/design-system/site/public", "design/design-system/web/icon-data", "design/design-system/generated"):
            for path in (ROOT / directory).rglob("*"):
                if path.is_file() and path.relative_to(ROOT).as_posix() not in files:
                    path.unlink()
        # Do not execute downloaded package code in the PR updater's writable-token job.
        version_product_templates()
    lock = {"schemaVersion": 1, "repository": REPOSITORY, "version": manifest["version"],
            "revision": manifest["revision"], "profile": profile, "archive": url,
            "sha256": digest(data), "managedFiles": {name: digest(content) for name, content in sorted(files.items())}}
    LOCK.write_text(json.dumps(lock, ensure_ascii=False, indent=2) + "\n")
    print("Installed Contour " + manifest["version"] + " (" + profile + ")")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true")
    parser.add_argument("--verify-release", action="store_true", help="compare with the immutable upstream archive, for CI")
    parser.add_argument("--update", action="store_true")
    parser.add_argument("--version")
    parser.add_argument("--profile", choices=("reflower", "lavlio"))
    parser.add_argument("--bundle", type=Path, help="local release bundle for integration tests")
    args = parser.parse_args()
    lock = json.loads(LOCK.read_text()) if LOCK.exists() else None
    if args.check:
        if not lock:
            raise ValueError("Contour lock is missing")
        check(lock)
        if args.verify_release:
            selected, data, _ = release(lock["version"])
            if digest(data) != lock["sha256"]:
                raise ValueError("Pinned Contour release archive changed")
            manifest, sources = read_bundle(data)
            expected = projected(lock["profile"], sources)
            hashes = {name: digest(content) for name, content in expected.items()}
            if selected != lock["version"] or manifest["revision"] != lock["revision"] or hashes != lock["managedFiles"]:
                raise ValueError("Consumer differs from the pinned upstream release")
        print("Contour " + lock["version"] + ": managed files verified")
        return 0
    profile = args.profile or (lock and lock["profile"])
    if not profile:
        raise ValueError("Initial installation requires --profile")
    if lock:
        check(lock)
    if args.bundle:
        install(profile, args.bundle.read_bytes(), "local-integration-bundle")
    else:
        selected, data, url = release(args.version if args.version else (None if args.update else lock and lock["version"]))
        if lock and selected == lock["version"] and digest(data) == lock["sha256"]:
            print("Contour is already current: " + selected)
            return 0
        install(profile, data, url)
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (ValueError, KeyError, OSError) as error:
        print("Contour: " + str(error), file=sys.stderr)
        raise SystemExit(1)
