#!/usr/bin/env python3
"""Build or verify browser-compatible JavaScript from canonical TypeScript sources."""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path


SYSTEM_ROOT = Path(__file__).resolve().parents[1]
RUNTIME_ROOT = SYSTEM_ROOT / "web" / "runtime"
WEB_ROOT = SYSTEM_ROOT / "web"
GENERATED_NOTICE = (
    "/* Generated from design/design-system/web/runtime/{name}.ts. "
    "Do not edit this JavaScript directly. */\n"
)
RUNTIMES = {
    "core-ui": RUNTIME_ROOT / "core-ui.ts",
    "catalog": RUNTIME_ROOT / "catalog.ts",
}


def rendered_source(name: str, source: Path) -> bytes:
    text = source.read_text(encoding="utf-8")
    if re.search(r"^\s*(?:import|export)\s", text, re.MULTILINE):
        raise ValueError(
            f"{source.relative_to(SYSTEM_ROOT)} must remain a browser-compatible "
            "TypeScript script without runtime imports or exports"
        )
    return (GENERATED_NOTICE.format(name=name) + text).encode()


def expected_outputs() -> dict[Path, bytes]:
    return {
        WEB_ROOT / f"{name}.js": rendered_source(name, source)
        for name, source in RUNTIMES.items()
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()

    stale: list[str] = []
    for output, expected in expected_outputs().items():
        if args.check:
            if not output.is_file() or output.read_bytes() != expected:
                stale.append(output.relative_to(SYSTEM_ROOT).as_posix())
        else:
            output.write_bytes(expected)

    if stale:
        print("Stale TypeScript runtime outputs: " + ", ".join(stale), file=sys.stderr)
        return 1
    if args.check:
        print("TypeScript runtime outputs are current.")
    else:
        print("Generated browser runtimes from TypeScript sources.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
