#!/usr/bin/env python3
"""Require the Icon component; freeze exact existing legacy uses for migration."""
from __future__ import annotations

import hashlib
import json
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
SYSTEM = ROOT / 'design/design-system'
BASELINE = SYSTEM / 'icon-legacy-usage.json'
SCAN_ROOTS = ('services/admin', 'services/miniapp', 'services/landing',
              'design/design-system/web', 'design/design-system/examples',
              'design/design-system/adapters/react/src', 'design/design-system/adapters/react/examples')
EXTENSIONS = {'.html', '.css', '.js', '.mjs', '.cjs', '.jsx', '.ts', '.tsx', '.py'}
# Only these canonical implementation files may load/construct glyph geometry.
# Service copies are generated and verified byte-for-byte by build_tokens --check.
IMPLEMENTATIONS = {
    'design/design-system/web/icon-glyphs.js',
    'design/design-system/web/iconography.js',
    'design/design-system/web/runtime/core-ui.ts',
    'design/design-system/web/core-ui.js',
    'design/design-system/adapters/react/src/Icon.tsx',
    *{f'services/{s}/static/{name}' for s in ('admin', 'miniapp', 'landing')
      for name in ('design-system/core-ui.js', 'design-system/icon-glyphs.js')},
}
# Bundled React contains framework-internal SVG namespace helpers. The authored
# Catalog source remains in the scan; its generated, source-hashed bundle does not.
GENERATED_ARTIFACTS = {
    'design/design-system/web/catalog.js',
    'design/design-system/web/catalog-react.js',
}
# This exact Core declaration describes the loader's return type; it never
# loads glyph data. Keep the rest of this file (and every other .d.ts) scanned.
TYPE_DECLARATION_SIGNATURES = {
    'design/design-system/web/icon-glyphs.d.ts': {
        'export function getIndex(): Promise<typeof import("./icon-data/index.json")>;',
    },
}
PATTERNS = {
    'legacy-attribute': r'''\bdata-lucide\s*=\s*["'][^"']*["']''',
    'legacy-dataset': r'''\bdataset\.lucide\s*=\s*[^;\n]+''',
    'legacy-api': r'''\bReflowerIcons\b(?:\?\.|\.)?(?:\w+)?(?:\([^;\n]*?\))?''',
    'legacy-helper': r'''\b(?:coreIcon|coreIconLabel|iconMarkup|iconLabel)\s*\([^;\n]*?\)''',
    'raw-svg': r'''<svg\b[^>]*>''',
    'svg-constructor': r'''\bcreateElementNS\s*\([^;\n]*?\)|\bcreateElement\s*\(\s*["']svg["']\s*\)''',
    'svg-data-url': r'''data:image/svg\+xml[^\s"'`<>]*''',
    'private-glyph-data': r'''(?:[\w@./-]*(?:icon-glyphs\.(?:js|json)|icon-data/[\w${}.-]+\.json|icons/(?:generated|figma)/[\w/.-]+|icons\.js)|@reflower/core-ui-react/(?:glyphs|icons)|(?:lucide-react|@heroicons/[\w/-]+|react-icons/[\w/-]+|@phosphor-icons/[\w/-]+))''',
    'raw-icon-file': r'''(?:[\w./-]*/)?icons/[\w/-]+\.svg''',
    'private-glyph-directory': r'''(?:icon-data/|icons/(?:generated|figma)/)''',
}


def source_files(root=ROOT):
    return sorted({p for folder in SCAN_ROOTS for p in (root / folder).rglob('*')
                   if p.is_file() and p.suffix in EXTENSIONS
                   and not {'node_modules', '__pycache__', '.venv'}.intersection(p.parts)
                   and p.relative_to(root).as_posix() not in IMPLEMENTATIONS
                   and p.relative_to(root).as_posix() not in GENERATED_ARTIFACTS})


def findings(source, path=None):
    # Do not count documentation comments as active consumption.
    source = re.sub(r'/\*.*?\*/|<!--.*?-->', '', source, flags=re.S)
    declarations = TYPE_DECLARATION_SIGNATURES.get(path, ())
    if declarations:
        source = '\n'.join(line for line in source.splitlines()
                           if line.strip() not in declarations)
    result = []
    for rule, pattern in PATTERNS.items():
        for match in re.finditer(pattern, source, re.I):
            snippet = ' '.join(match.group().split())
            result.append((rule, snippet))
    return result


def signature(rule, snippet):
    return rule + ':' + hashlib.sha256(snippet.encode()).hexdigest()[:24]


def inventory(root=ROOT):
    return {p.relative_to(root).as_posix(): Counter(signature(*f) for f in
            findings(p.read_text(), p.relative_to(root).as_posix()))
            for p in source_files(root) if findings(p.read_text(), p.relative_to(root).as_posix())}


def new_uses(actual, baseline):
    return [(path, key, count - baseline.get(path, {}).get(key, 0))
            for path, counts in actual.items() for key, count in counts.items()
            if count > baseline.get(path, {}).get(key, 0)]


def validate_component_markup(source, glyphs):
    errors = []
    for tag in re.findall(r'<[^>]+\bdata-rf-icon-glyph\s*=[^>]*>', source):
        key = re.search(r'''data-rf-icon-glyph\s*=\s*["']([^"']+)["']''', tag)
        classes = re.search(r'''\bclass\s*=\s*["']([^"']+)["']''', tag)
        if not classes or 'rf-icon' not in classes.group(1).split():
            errors.append('data-rf-icon-glyph requires the rf-icon component')
        if key and not re.search(r'[$<{]', key.group(1)) and key.group(1) not in glyphs:
            errors.append('Unknown Glyph: ' + key.group(1))
        style = re.search(r'''data-rf-icon-style\s*=\s*["']([^"']+)["']''', tag)
        if style and not re.search(r'[$<{]', style.group(1)) and style.group(1) not in ('line', 'solid', 'duotone'):
            errors.append('Unknown Icon Style: ' + style.group(1))
    for tag in re.findall(r'<Icon\s[^>]+>', source):
        name = re.search(r'''\bname\s*=\s*["']([^"']+)["']''', tag)
        if name and name.group(1) not in glyphs:
            errors.append('Unknown React Icon Glyph: ' + name.group(1))
        style = re.search(r'''\biconStyle\s*=\s*["']([^"']+)["']''', tag)
        if style and style.group(1) not in ('line', 'solid', 'duotone'):
            errors.append('Unknown React Icon Style: ' + style.group(1))
    return errors


def check():
    baseline = json.loads(BASELINE.read_text())
    if baseline.get('owner') != 'Reflower' or not baseline.get('reviewCondition'):
        raise ValueError('Icon legacy snapshot must declare owner and migration condition')
    failures = new_uses(inventory(), baseline['uses'])
    for path, key, count in failures:
        print(f'{path}: new Icon bypass ({key}, +{count}); use Icon instead')
    index = json.loads((ROOT / 'design/icons/generated/index.json').read_text())
    glyphs = {g['key'] for g in index['glyphs']}
    errors = []
    for path in source_files():
        for error in validate_component_markup(path.read_text(), glyphs):
            errors.append(f'{path.relative_to(ROOT)}: {error}')
    package = json.loads((SYSTEM / 'adapters/react/package.json').read_text())
    if {'./glyphs', './icons'}.intersection(package['exports']):
        errors.append('React must not expose private or legacy glyph renderers')
    print('\n'.join(errors)) if errors else None
    if failures or errors:
        return 1
    print('Icon boundary: no new direct glyph/legacy uses; public Icon markup is valid.')
    return 0


if __name__ == '__main__':
    raise SystemExit(check())
