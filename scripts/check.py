#!/usr/bin/env python3
"""Verify generated outputs and run inherited Core contracts, including real browsers."""
import argparse
import os
from pathlib import Path
import subprocess
import sys
import unittest

ROOT = Path(__file__).resolve().parents[1]
SYSTEM = ROOT / "design/design-system"
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--browser", action="store_true")
args = parser.parse_args()
for name in ("build_web_runtime.py", "build_iconography.py", "build_tokens.py", "build_catalog.py", "build_hosted_catalog.py"):
    subprocess.run([sys.executable, str(SYSTEM / "scripts" / name), "--check"], cwd=ROOT, check=True)
subprocess.run([sys.executable, str(SYSTEM / "scripts/validate_component_registry.py")], cwd=ROOT, check=True)
os.environ["RUN_BROWSER_E2E"] = "1" if args.browser else "0"
result = unittest.TextTestRunner(verbosity=1).run(unittest.defaultTestLoader.discover(str(ROOT / "tests")))
if not result.wasSuccessful() or (args.browser and result.skipped):
    raise SystemExit(1)
