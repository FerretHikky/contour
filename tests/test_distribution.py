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
    manifest = {"schemaVersion": 1, "repository": consumer.REPOSITORY, "version": "1.0.0", "revision": "a" * 40,
                "files": {name: hashlib.sha256(data).hexdigest() for name, data in files.items()}}
    with zipfile.ZipFile(output, "w") as archive:
        for name, data in files.items():
            archive.writestr(name, data)
        archive.writestr("contour-manifest.json", json.dumps(manifest))
    return output.getvalue()


class DistributionTests(unittest.TestCase):
    def test_api_credentials_are_not_sent_to_release_asset_urls(self):
        import os
        with patch.dict(os.environ, {"GH_TOKEN": "ephemeral-test-token"}):
            with patch.object(consumer, "urlopen", return_value=io.BytesIO(b"ok")) as request:
                consumer.download("https://api.github.com/repos/" + consumer.REPOSITORY + "/releases/latest")
                self.assertEqual(request.call_args.args[0].get_header("Authorization"), "Bearer ephemeral-test-token")
            with patch.object(consumer, "urlopen", return_value=io.BytesIO(b"ok")) as request:
                consumer.download("https://github.com/" + consumer.REPOSITORY + "/releases/download/v1.0.0/contour-v1.0.0.zip")
                self.assertIsNone(request.call_args.args[0].get_header("Authorization"))

    def test_version_cannot_inject_an_api_path(self):
        with patch.object(consumer, "download") as request:
            with self.assertRaises(ValueError):
                consumer.release("../../another-repository")
            request.assert_not_called()

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

    def test_consumer_hosting_identity_is_never_replaced_by_library(self):
        files = {
            "design/design-system/generated/web/core-ui.css": b"core",
            "design/design-system/web/core-ui.js": b"core",
            "design/design-system/web/icon-glyphs.js": b"icon",
            "design/brand/colors/tokens.css": b"colors",
            "design/brand/foundations/tokens.css": b"foundations",
            "design/brand/typography/typography.css": b"type",
            "design/design-system/site/.openai/hosting.json": b"foreign-project",
        }
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            identity = root / "design/design-system/site/.openai/hosting.json"
            identity.parent.mkdir(parents=True)
            identity.write_bytes(b"product-project")
            with patch.object(consumer, "ROOT", root), patch.object(consumer, "LOCK", root / "contour.lock.json"):
                consumer.install("reflower", bundle(files), "local-test")
                self.assertEqual(identity.read_bytes(), b"product-project")
                self.assertNotIn(identity.relative_to(root).as_posix(), json.loads(consumer.LOCK.read_text())["managedFiles"])

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
