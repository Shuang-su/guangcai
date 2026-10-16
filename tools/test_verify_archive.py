"""Exercise completeness, missing-history and mutable-source boundaries."""
import contextlib
import importlib.util
import io
import json
import tempfile
import unittest
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import patch

SPEC = importlib.util.spec_from_file_location('verifier', Path(__file__).with_name('verify-archive.py'))
VERIFIER = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(VERIFIER)


class HistoricalVerificationTests(unittest.TestCase):
    def setUp(self):
        cache = VERIFIER.ROOT / '.codex-work/tmp'
        cache.mkdir(parents=True, exist_ok=True)
        self.temporary = tempfile.TemporaryDirectory(dir=cache)
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        (self.root / 'docs/archive').mkdir(parents=True)
        for name, version in VERIFIER.EXPECTED.items():
            self.save(name, {'version': version, 'verifyAtCommit': 'a' * 40, 'files': []})

    def save(self, name, data):
        (self.root / 'docs/archive' / name).write_text(json.dumps(data))

    def run_verifier(self, missing_history=False, contents=b''):
        output = io.StringIO()
        def process(*args, **kwargs):
            return SimpleNamespace(stdin=io.BytesIO(), stdout=io.BytesIO(contents), wait=lambda: 0)
        with patch.object(VERIFIER, 'ROOT', self.root), \
                patch.object(VERIFIER.subprocess, 'run', return_value=SimpleNamespace(returncode=int(missing_history))), \
                patch.object(VERIFIER.subprocess, 'Popen', side_effect=process), \
                contextlib.redirect_stdout(output):
            code = VERIFIER.main()
        return code, json.loads(output.getvalue())

    def test_missing_one_required_inventory_fails(self):
        (self.root / 'docs/archive/china-inventory.json').unlink()
        code, result = self.run_verifier()
        self.assertEqual(code, 1)
        self.assertEqual(result['missingManifests'], ['china-inventory.json'])
        self.assertFalse(result['complete'])

    def test_missing_history_is_explicit_and_never_success(self):
        code, result = self.run_verifier(missing_history=True)
        self.assertEqual(code, 2)
        self.assertFalse(result['complete'])
        self.assertEqual(len(result['historyUnavailable']), len(VERIFIER.EXPECTED))
        self.assertIn('git fetch --unshallow origin', result['remedy'])

    def test_appledouble_metadata_is_not_an_inventory(self):
        metadata = self.root / 'docs/archive/._original-inventory.json'
        metadata.write_bytes(b'\x00\x05\x16\x07\xff')
        code, result = self.run_verifier()
        self.assertEqual(code, 0)
        self.assertTrue(result['complete'])

    def test_wrong_manifest_version_fails(self):
        self.save('china-inventory.json', {'version': 'wrong', 'files': []})
        code, result = self.run_verifier()
        self.assertEqual(code, 1)
        self.assertEqual(result['invalidVersion'], 'china-inventory.json')

    def check_file(self, relative_path):
        original = b'published content'
        current = self.root / relative_path
        current.parent.mkdir(parents=True)
        current.write_bytes(b'ongoing development')
        import hashlib
        self.save('original-inventory.json', {
            'version': 'original', 'verifyAtCommit': 'a' * 40,
            'files': [{'path': relative_path, 'bytes': len(original),
                       'sha256': hashlib.sha256(original).hexdigest()}],
        })
        blob = b'a blob ' + str(len(original)).encode() + b'\n' + original + b'\n'
        return self.run_verifier(contents=blob)

    def test_current_source_can_change_while_history_is_preserved(self):
        code, result = self.check_file('guangcai-viewer/src/main.ts')
        self.assertEqual(code, 0)
        self.assertTrue(result['complete'])

    def test_frozen_deployment_cannot_change(self):
        code, result = self.check_file('deployments/site/deploy/index.html')
        self.assertEqual(code, 1)
        self.assertEqual(result['failures'][0]['reason'], 'frozen deployment differs in working tree')


if __name__ == '__main__':
    unittest.main()
