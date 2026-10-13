#!/usr/bin/env python3
"""Check the high-value Core UI visual matrix against a reviewed baseline."""

from __future__ import annotations

import argparse
import functools
import json
import tempfile
import threading
from dataclasses import dataclass
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any


REPO_ROOT = Path(__file__).resolve().parents[3]
SYSTEM_ROOT = REPO_ROOT / "design" / "design-system"
BASELINE_PATH = SYSTEM_ROOT / "visual-baseline.json"
FIXTURES_PATH = SYSTEM_ROOT / "stress-fixtures.json"
HASH_SIZE = 16
MAX_HASH_DISTANCE = 52
MAX_GEOMETRY_DELTA = 3.0
MAX_FLOWING_CATALOG_GEOMETRY_RATIO = 0.015
FLOWING_CATALOG_CASES = {
    "catalog-textfield-detail-light",
    "catalog-colors-light",
    "catalog-colors-mobile-dark",
}


@dataclass(frozen=True)
class VisualCase:
    name: str
    selector: str
    theme: str = "light"
    state: str = "default"
    viewport: tuple[int, int] = (1280, 1400)
    route: str = "guidelines/specimens"


CASES = (
    VisualCase("button-static-matrix-light", "#visual-actions"),
    VisualCase("button-static-matrix-dark", "#visual-actions", theme="dark"),
    VisualCase(
        "button-primary-hover-light",
        "#visual-button-primary",
        state="hover",
    ),
    VisualCase(
        "button-primary-focus-light",
        "#visual-button-primary",
        state="focus",
    ),
    VisualCase("textfield-static-matrix-light", "#visual-fields"),
    VisualCase("textfield-static-matrix-dark", "#visual-fields", theme="dark"),
    VisualCase(
        "textfield-filled-light",
        "#visual-field-default",
        state="filled",
    ),
    VisualCase(
        "textfield-focus-light",
        "#visual-field-default",
        state="focus",
    ),
    VisualCase("card-static-matrix-light", "#visual-cards"),
    VisualCase(
        "card-interactive-focus-dark",
        "#visual-card-interactive",
        theme="dark",
        state="focus",
    ),
    VisualCase(
        "dialog-open-light",
        "#catalog-dialog",
        state="dialog-open",
        viewport=(768, 900),
    ),
    VisualCase(
        "bottom-sheet-open-dark",
        "#catalog-sheet",
        theme="dark",
        state="dialog-open",
        viewport=(390, 844),
    ),
    VisualCase(
        "card-stress-light",
        "#visual-cards",
        state="stress",
        viewport=(390, 844),
    ),
    VisualCase(
        "catalog-overview-light",
        "#catalog-shell",
        viewport=(1280, 900),
        route="overview",
    ),
    VisualCase(
        "catalog-overview-mobile-dark",
        "#catalog-shell",
        theme="dark",
        viewport=(390, 844),
        route="overview",
    ),
    VisualCase(
        "catalog-textfield-detail-light",
        "#catalog-entity-page",
        viewport=(1280, 1400),
        route="components/text-field",
    ),
    VisualCase(
        "catalog-colors-light",
        "#catalog-foundation-page",
        viewport=(1280, 1400),
        route="foundations/colors",
    ),
    VisualCase(
        "catalog-colors-mobile-dark",
        "#catalog-foundation-page",
        theme="dark",
        viewport=(390, 844),
        route="foundations/colors",
    ),
)


class _QuietStaticHandler(SimpleHTTPRequestHandler):
    def log_message(self, format: str, *args: object) -> None:
        pass


def _average_hash(png: bytes) -> str:
    import cv2
    import numpy as np

    encoded = np.frombuffer(png, dtype=np.uint8)
    image = cv2.imdecode(encoded, cv2.IMREAD_GRAYSCALE)
    if image is None:
        raise ValueError("Chromium returned an unreadable screenshot")
    resized = cv2.resize(image, (HASH_SIZE, HASH_SIZE), interpolation=cv2.INTER_AREA)
    bits = resized >= float(resized.mean())
    packed = np.packbits(bits.reshape(-1)).tobytes()
    return packed.hex()


def _hash_distance(left: str, right: str) -> int:
    pairs = zip(bytes.fromhex(left), bytes.fromhex(right))
    return sum((left_byte ^ right_byte).bit_count() for left_byte, right_byte in pairs)


def _style_fingerprint(locator: Any) -> dict[str, str]:
    return locator.evaluate(
        """element => {
            const style = getComputedStyle(element);
            return {
                backgroundColor: style.backgroundColor,
                borderColor: style.borderColor,
                borderRadius: style.borderRadius,
                boxShadow: style.boxShadow,
                color: style.color,
                display: style.display,
                opacity: style.opacity,
                outlineColor: style.outlineColor,
                outlineStyle: style.outlineStyle,
                position: style.position,
            };
        }"""
    )


def _prepare_case(page: Any, case: VisualCase, fixtures: dict[str, Any]) -> Any:
    page.locator("html").evaluate(
        "(element, theme) => { element.dataset.theme = theme; }",
        case.theme,
    )
    locator = page.locator(case.selector)

    if case.state == "hover":
        locator.hover()
    elif case.state == "focus":
        locator.focus()
    elif case.state == "filled":
        locator.fill(fixtures["text"]["localized"]["ky"])
        locator.blur()
    elif case.state == "dialog-open":
        locator.evaluate("element => element.showModal()")
    elif case.state == "stress":
        page.locator("#visual-card-interactive").evaluate(
            """(card, fixture) => {
                card.dir = fixture.text.rtlReady.dir;
                card.querySelector("#visual-card-title").textContent =
                    fixture.text.longUnbroken;
                card.querySelector("#visual-card-description").textContent =
                    fixture.text.localized.uz + " — " + fixture.text.long;
                card.querySelector("#visual-card-price").textContent =
                    fixture.number.large;
                const image = card.querySelector("#visual-card-image");
                image.src = fixture.image.failed;
            }""",
            fixtures,
        )
        page.wait_for_timeout(100)

    locator.wait_for(state="visible")
    return locator


def capture_matrix() -> dict[str, dict[str, Any]]:
    try:
        from playwright.sync_api import sync_playwright
    except ImportError as exc:
        raise RuntimeError("Visual regression requires Playwright") from exc

    fixtures = json.loads(FIXTURES_PATH.read_text(encoding="utf-8"))
    handler = functools.partial(_QuietStaticHandler, directory=str(REPO_ROOT))
    server = ThreadingHTTPServer(("127.0.0.1", 0), handler)
    server_thread = threading.Thread(target=server.serve_forever, daemon=True)
    server_thread.start()
    catalog_url = (
        f"http://127.0.0.1:{server.server_port}/"
        "design/design-system/web/catalog.html"
    )
    result: dict[str, dict[str, Any]] = {}

    try:
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch()
            try:
                page = browser.new_page(
                    viewport={"width": 1280, "height": 1400},
                    device_scale_factor=1,
                    reduced_motion="reduce",
                )
                for case in CASES:
                    page.set_viewport_size(
                        {"width": case.viewport[0], "height": case.viewport[1]}
                    )
                    page.goto(
                        f"{catalog_url}#{case.route}",
                        wait_until="networkidle",
                    )
                    page.evaluate("document.fonts ? document.fonts.ready : Promise.resolve()")
                    page.evaluate(
                        """async () => {
                            const images = Array.from(document.images);
                            await Promise.all(images.map(image => {
                                if (image.complete) return Promise.resolve();
                                return new Promise(resolve => {
                                    image.addEventListener('load', resolve, { once: true });
                                    image.addEventListener('error', resolve, { once: true });
                                });
                            }));
                            await Promise.all(images.map(image =>
                                image.decode ? image.decode().catch(() => undefined) : undefined
                            ));
                        }"""
                    )
                    page.evaluate(
                        "() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))"
                    )
                    locator = _prepare_case(page, case, fixtures)
                    box = locator.bounding_box()
                    if box is None:
                        raise AssertionError(f"{case.name}: selector has no bounding box")
                    if locator.evaluate(
                        """element =>
                            !element.matches('input, textarea, select') &&
                            element.scrollWidth > element.clientWidth + 1"""
                    ):
                        raise AssertionError(f"{case.name}: horizontal overflow")
                    png = locator.screenshot(
                        animations="disabled",
                        caret="hide",
                        scale="css",
                    )
                    # Screenshot waits for a stable layout. Measure that same
                    # layout, not an earlier frame during responsive reflow.
                    box = locator.bounding_box()
                    if box is None:
                        raise AssertionError(f"{case.name}: selector has no bounding box")
                    result[case.name] = {
                        "hash": _average_hash(png),
                        "height": round(box["height"], 2),
                        "route": case.route,
                        "style": _style_fingerprint(locator),
                        "theme": case.theme,
                        "viewport": list(case.viewport),
                        "width": round(box["width"], 2),
                    }
            finally:
                browser.close()
    finally:
        server.shutdown()
        server.server_close()
        server_thread.join(timeout=5)

    return result


def _load_baseline() -> dict[str, Any]:
    try:
        document = json.loads(BASELINE_PATH.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise AssertionError(
            "Visual baseline is missing or invalid; use --update-baseline with review metadata"
        ) from exc
    if document.get("schemaVersion") != 1 or not isinstance(document.get("cases"), dict):
        raise AssertionError("Unsupported visual baseline schema")
    return document


def compare_matrix(current: dict[str, dict[str, Any]] | None = None) -> list[str]:
    baseline = _load_baseline()
    expected = baseline["cases"]
    current = current or capture_matrix()
    errors: list[str] = []

    expected_names = set(expected)
    current_names = set(current)
    if expected_names != current_names:
        errors.append(
            "visual case set changed: "
            f"missing={sorted(expected_names - current_names)}, "
            f"new={sorted(current_names - expected_names)}"
        )

    for name in sorted(expected_names & current_names):
        wanted = expected[name]
        actual = current[name]
        distance = _hash_distance(wanted["hash"], actual["hash"])
        if distance > MAX_HASH_DISTANCE:
            errors.append(
                f"{name}: perceptual hash distance {distance} > {MAX_HASH_DISTANCE}"
            )
        for dimension in ("width", "height"):
            delta = abs(float(wanted[dimension]) - float(actual[dimension]))
            allowed_delta = MAX_GEOMETRY_DELTA
            if dimension == "height" and name in FLOWING_CATALOG_CASES:
                allowed_delta = max(
                    allowed_delta,
                    float(wanted[dimension]) * MAX_FLOWING_CATALOG_GEOMETRY_RATIO,
                )
            if delta > allowed_delta:
                errors.append(
                    f"{name}: {dimension} changed by {delta:.2f}px "
                    f"(allowed {allowed_delta:.2f}px)"
                )
        if wanted["style"] != actual["style"]:
            errors.append(f"{name}: computed-style fingerprint changed")

    return errors


def update_baseline(*, reviewed_by: str, reason: str) -> None:
    document = {
        "$description": (
            "Reviewed high-value Core UI visual baseline. Update only after intentional "
            "Design System review."
        ),
        "algorithm": f"average-hash-{HASH_SIZE}x{HASH_SIZE}",
        "cases": capture_matrix(),
        "review": {
            "owner": reviewed_by,
            "reason": reason,
            "reviewCondition": (
                "Regenerate only for an intentional canonical Core UI visual change."
            ),
        },
        "schemaVersion": 1,
        "tolerance": {
            "flowingCatalogGeometryRatio": MAX_FLOWING_CATALOG_GEOMETRY_RATIO,
            "geometryPx": MAX_GEOMETRY_DELTA,
            "hashDistance": MAX_HASH_DISTANCE,
        },
    }
    BASELINE_PATH.write_text(
        json.dumps(document, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Visual regression: baseline updated — {BASELINE_PATH.relative_to(REPO_ROOT)}")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--update-baseline", action="store_true")
    parser.add_argument("--reviewed-by")
    parser.add_argument("--reason")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    if args.update_baseline:
        if not args.reviewed_by or not args.reason:
            print("--update-baseline requires --reviewed-by and --reason")
            return 2
        update_baseline(reviewed_by=args.reviewed_by, reason=args.reason)
        return 0

    current = capture_matrix()
    errors = compare_matrix(current)
    if errors:
        artifact_dir = Path(tempfile.mkdtemp(prefix="reflower-visual-regression-"))
        (artifact_dir / "current.json").write_text(
            json.dumps(current, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        print(f"Visual regression failed; diagnostic directory: {artifact_dir}")
        for error in errors:
            print(f"- {error}")
        return 1
    print(f"Visual regression: OK, {len(CASES)} high-value states.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
