#!/usr/bin/env python3
"""Create a deterministic, allowlisted release bundle with per-file and archive hashes."""
import hashlib
import json
from pathlib import Path
import re
import subprocess
import sys
import zipfile

ROOT = Path(__file__).resolve().parents[1]
OUT = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "dist"
version = json.loads((ROOT / "package.json").read_text())["version"]
if not re.fullmatch(r"[1-9][0-9]*\.[0-9]+\.[0-9]+", version):
    raise SystemExit("Stable release version required")
revision = subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=ROOT, text=True).strip()
prefixes = ("design/", "docs/design-system/", "tests/test_design_system_core")
names = subprocess.check_output(["git", "ls-files", "-z"], cwd=ROOT).decode().split("\0")
files = {}
for name in sorted(names):
    if not name or not (name.startswith(prefixes) or name in ("package.json", "contour.css", "README.md", "docs/phone-field.md")):
        continue
    if any(part in ("node_modules", ".env", ".git", "__pycache__") for part in Path(name).parts):
        raise SystemExit("Unexpected release path: " + name)
    path = ROOT / name
    if path.is_symlink():
        raise SystemExit("Symlinks are not release inputs: " + name)
    files[name] = path.read_bytes()
manifest = {"schemaVersion": 1, "repository": "FerretHikky/contour", "version": version,
            "revision": revision, "files": {name: hashlib.sha256(content).hexdigest() for name, content in files.items()}}
files["contour-manifest.json"] = (json.dumps(manifest, ensure_ascii=False, indent=2) + "\n").encode()
OUT.mkdir(parents=True, exist_ok=True)
archive = OUT / ("contour-v" + version + ".zip")
with zipfile.ZipFile(archive, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as output:
    for name, content in sorted(files.items()):
        info = zipfile.ZipInfo(name, date_time=(2026, 1, 1, 0, 0, 0))
        info.compress_type = zipfile.ZIP_DEFLATED
        info.external_attr = 0o100644 << 16
        output.writestr(info, content)
checksum = hashlib.sha256(archive.read_bytes()).hexdigest()
archive.with_suffix(".zip.sha256").write_text(checksum + "  " + archive.name + "\n")
print(str(archive))
