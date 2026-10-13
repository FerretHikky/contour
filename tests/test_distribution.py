"""Distribution integrity and consumer isolation contracts."""
import hashlib
import importlib.util
import io
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
import zipfile

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("consumer", ROOT / "scripts/consumer.py")
consumer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(consumer)


def bundle(files):
    output = io.BytesIO()
    manifest = {"repository": consumer.REPOSITORY, "version": "1.0.0", "revision": "a" * 40,
                "files": {name: hashlib.sha256(data).hexdigest() for name, data in files.items()}}
    with zipfile.ZipFile(output, "w") as archive:
        for name, data in files.items():
            archive.writestr(name, data)
        archive.writestr("contour-manifest.json", json.dumps(manifest))
    return output.getvalue()


class DistributionTests(unittest.TestCase):
    def test_archive_paths_cannot_escape_consumer(self):
        for name in ("../outside.py", "/absolute.py", "design\\outside.py"):
            with self.subTest(name=name), self.assertRaises(ValueError):
                consumer.read_bundle(bundle({name: b"invalid"}))

    def test_symlink_archive_entry_is_rejected(self):
        output = io.BytesIO()
        with zipfile.ZipFile(output, "w") as archive:
            entry = zipfile.ZipInfo("design/link")
            entry.external_attr = 0o120777 << 16
            archive.writestr(entry, "../../outside")
        with self.assertRaises(ValueError):
            consumer.read_bundle(output.getvalue())

    def test_manifest_detects_corrupted_file(self):
        original = bundle({"design/test.css": b"approved"})
        output = io.BytesIO()
        with zipfile.ZipFile(io.BytesIO(original)) as source, zipfile.ZipFile(output, "w") as target:
            for name in source.namelist():
                target.writestr(name, b"changed" if name == "design/test.css" else source.read(name))
        with self.assertRaisesRegex(ValueError, "checksum mismatch"):
            consumer.read_bundle(output.getvalue())

    def test_local_core_edits_are_rejected(self):
        with tempfile.TemporaryDirectory() as directory, patch.object(consumer, "ROOT", Path(directory)):
            path = Path(directory) / "managed.css"
            path.write_bytes(b"approved")
            lock = {"repository": consumer.REPOSITORY, "managedFiles": {"managed.css": consumer.digest(b"approved")}}
            consumer.check(lock)
            path.write_bytes(b"local override")
            with self.assertRaisesRegex(ValueError, "edit Contour upstream"):
                consumer.check(lock)

    def test_update_installs_sources_without_executing_downloaded_code(self):
        files = {
            "design/design-system/generated/web/core-ui.css": b"core",
            "design/design-system/web/core-ui.js": b"core",
            "design/design-system/web/icon-glyphs.js": b"icon",
            "design/brand/colors/tokens.css": b"colors",
            "design/brand/foundations/tokens.css": b"foundations",
            "design/brand/typography/typography.css": b"type",
            "design/design-system/scripts/build_tokens.py": b"raise RuntimeError('must never execute')",
        }
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            with patch.object(consumer, "ROOT", root), patch.object(consumer, "LOCK", root / "contour.lock.json"):
                consumer.install("reflower", bundle(files), "local-test")
                consumer.check(json.loads(consumer.LOCK.read_text()))
                self.assertTrue((root / "design/design-system/scripts/build_tokens.py").is_file())


if __name__ == "__main__":
    unittest.main()
