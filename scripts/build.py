#!/usr/bin/env python3
"""Generate Contour artifacts from canonical sources."""
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
SYSTEM = ROOT / "design/design-system"
for name in ("build_web_runtime.py", "build_iconography.py", "build_tokens.py"):
    subprocess.run([sys.executable, str(SYSTEM / "scripts" / name)], cwd=ROOT, check=True)
subprocess.run(["pnpm", "--dir", str(SYSTEM / "site"), "run", "build:catalog-runtime"], cwd=ROOT, check=True)
for name in ("build_tokens.py", "build_catalog.py", "build_hosted_catalog.py"):
    subprocess.run([sys.executable, str(SYSTEM / "scripts" / name)], cwd=ROOT, check=True)
subprocess.run(["pnpm", "exec", "tsc", "-p", str(SYSTEM / "adapters/react/tsconfig.build.json")], cwd=ROOT, check=True)
