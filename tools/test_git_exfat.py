import hashlib
import importlib.util
import io
from pathlib import Path
import struct
import subprocess
import tempfile
import unittest
from contextlib import redirect_stderr
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('git_exfat', Path(__file__).with_name('git-exfat.py'))
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class ExfatCleanupTests(unittest.TestCase):
    def setUp(self):
        staging = ROOT / '.codex-work/tmp'
        staging.mkdir(parents=True, exist_ok=True)
        self.tmp = tempfile.TemporaryDirectory(dir=staging)
        self.root = Path(self.tmp.name)
        self.packdir = self.root / '.git/objects/pack'
        self.packdir.mkdir(parents=True)
        self.real = self.packdir / ('pack-' + 'a' * 40 + '.idx')
        self.real.write_bytes(b'real Git index bytes must survive')
        self.sidecar = self.real.with_name('._' + self.real.name)
        # ExFAT can create its own provenance companion while constructing this fixture.
        if self.sidecar.exists(): self.sidecar.unlink()
        self.data = struct.pack('>II16sHIII', 0x00051607, 0x00020000, b'Mac OS X        ', 1, 9, 38, 3) + b'abc'

    def tearDown(self):
        self.tmp.cleanup()

    def test_valid_metadata_is_backed_up_and_real_index_unchanged(self):
        self.sidecar.write_bytes(self.data)
        original = self.real.read_bytes()
        removed = module.clean(self.root)
        self.assertEqual(len(removed), 1)
        self.assertFalse(self.sidecar.exists())
        self.assertEqual(Path(removed[0]['backup']).read_bytes(), self.data)
        self.assertEqual(self.real.read_bytes(), original)
        self.assertEqual(module.clean(self.root), [])

    def test_unknown_content_is_preserved(self):
        self.sidecar.write_bytes(b'not metadata')
        with self.assertRaises(ValueError): module.clean(self.root)
        self.assertEqual(self.sidecar.read_bytes(), b'not metadata')
        self.assertTrue(self.real.exists())

    def test_symlink_is_never_followed(self):
        outside = self.root / 'outside'
        outside.write_bytes(self.data)
        self.sidecar.symlink_to(outside)
        with self.assertRaises(ValueError): module.clean(self.root)
        self.assertEqual(outside.read_bytes(), self.data)

    def test_missing_counterpart_is_preserved(self):
        self.real.unlink()
        self.sidecar.write_bytes(self.data)
        with self.assertRaises(ValueError): module.clean(self.root)
        self.assertTrue(self.sidecar.exists())

    def test_corrupt_existing_backup_blocks_deletion(self):
        self.sidecar.write_bytes(self.data)
        folder = self.root / '.codex-work/receipts/git-appledouble'
        folder.mkdir(parents=True)
        (folder / (hashlib.sha256(self.data).hexdigest() + '.appledouble')).write_bytes(b'wrong')
        with self.assertRaises(ValueError): module.clean(self.root)
        self.assertTrue(self.sidecar.exists())

    def test_real_index_name_is_never_selected(self):
        self.assertEqual(module.clean(self.root), [])
        self.assertTrue(self.real.exists())

    def capture_run(self, status, stderr):
        buffer = io.BytesIO()
        stream = io.TextIOWrapper(buffer, encoding='utf-8')
        result = subprocess.CompletedProcess([], status, stderr=stderr)
        with patch.object(module.subprocess, 'run', return_value=result), redirect_stderr(stream):
            code = module.run(self.root, ['fetch', 'origin', 'main'])
        stream.flush()
        return code, buffer.getvalue()

    def test_git_failure_and_stderr_are_preserved(self):
        self.sidecar.write_bytes(self.data)
        error = f'error: non-monotonic index {self.sidecar}\nfatal: actual failure\n'.encode()
        code, output = self.capture_run(128, error)
        self.assertEqual(code, 128)
        self.assertIn(error, output)
        self.assertTrue(self.real.exists())

    def test_only_verified_metadata_diagnostic_is_condensed(self):
        self.sidecar.write_bytes(self.data)
        error = f'error: non-monotonic index {self.sidecar}\nwarning: retain this message\n'.encode()
        code, output = self.capture_run(0, error)
        self.assertEqual(code, 0)
        self.assertNotIn(b'error: non-monotonic index', output)
        self.assertIn(b'warning: retain this message', output)
        self.assertIn(b'condensed 1', output)

    def test_real_index_diagnostic_is_never_filtered(self):
        error = f'error: non-monotonic index {self.real}\n'.encode()
        code, output = self.capture_run(0, error)
        self.assertEqual(code, 0)
        self.assertEqual(output, error)


if __name__ == '__main__': unittest.main()
