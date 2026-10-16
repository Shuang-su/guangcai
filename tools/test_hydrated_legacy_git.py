"""Regression checks for corruption and missing files in restored history proofs."""
import copy
import importlib.util
import json
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location('legacy_verify', Path(__file__).with_name('verify-hydrated-legacy-git.py'))
verify = importlib.util.module_from_spec(spec)
spec.loader.exec_module(verify)


class VerificationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.reader = staticmethod(verify.repository_reader())
        cls.manifest = json.loads(cls.reader(verify.DIRECTORY + '/hydrated-manifest.json'))

    def test_originals_pass(self):
        self.assertEqual(verify.verify(self.manifest, self.reader)['verifiedOriginalCommits'], 2)

    def test_changed_file_fails(self):
        victim = self.manifest['snapshots'][0]['files'][0]['archivePath']
        def read(path):
            data = self.reader(path)
            return data + b'corrupt' if path == victim else data
        with self.assertRaises(AssertionError):
            verify.verify(self.manifest, read)

    def test_missing_file_fails(self):
        data = copy.deepcopy(self.manifest)
        data['snapshots'][0]['files'].pop()
        with self.assertRaises(AssertionError):
            verify.verify(data, self.reader)

    def test_wrong_tree_fails(self):
        data = copy.deepcopy(self.manifest)
        data['snapshots'][0]['trees']['guangcai-viewer']['gitTree'] = '0' * 40
        with self.assertRaises(AssertionError):
            verify.verify(data, self.reader)

    def test_changed_commit_fails(self):
        victim = verify.DIRECTORY + '/' + self.manifest['snapshots'][0]['payloadFile']
        def read(path):
            return self.reader(path) + (b'corrupt' if path == victim else b'')
        with self.assertRaises(AssertionError):
            verify.verify(self.manifest, read)


if __name__ == '__main__':
    unittest.main()
