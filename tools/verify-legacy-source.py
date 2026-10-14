"""Independently verify original commit payloads, tree links and archived bytes."""
from pathlib import Path
import base64
import hashlib
import json
import subprocess

ROOT = Path(__file__).resolve().parents[1]
DIRECTORY = ROOT / 'docs/history/20260921-original-git'


def identity(kind, raw):
    return hashlib.sha1(f'{kind} {len(raw)}\0'.encode() + raw).hexdigest()


def entries(raw):
    result = []
    while raw:
        mode, raw = raw.split(b' ', 1)
        name, raw = raw.split(b'\0', 1)
        assert len(raw) >= 20
        result.append((mode.decode(), name.decode(), raw[:20].hex()))
        raw = raw[20:]
    return result


def main():
    manifest = json.loads((DIRECTORY / 'manifest.json').read_text())
    trees = manifest['trees']
    files = {row['path']: row for row in manifest['files']}
    assert len(files) == len(manifest['files'])
    tree_entries = {}
    for path, row in trees.items():
        raw = base64.b64decode(row['payloadBase64'], validate=True)
        assert identity('tree', raw) == row['gitTree'], path
        tree_entries[path] = entries(raw)
        for mode, name, oid in tree_entries[path]:
            child = name if path == '.' else path + '/' + name
            if child in trees:
                assert mode == '40000' and trees[child]['gitTree'] == oid, child
            if child in files:
                assert files[child]['mode'] == mode and files[child]['gitBlob'] == oid, child
            if path == 'guangcai-viewer' or path.startswith('guangcai-viewer/') or path == 'docs/changes/20260921-guangcai-showcase':
                assert child in trees or child in files, child
    assert trees['.']['gitTree'] == manifest['verifiedRootTree']
    for row in manifest['originalCommitPayloads']:
        raw = (DIRECTORY / row['payloadFile']).read_bytes()
        assert identity('commit', raw) == row['originalSha']
        assert raw.decode().splitlines()[0] == 'tree ' + row['originalTree']
        if row['originalSha'] == manifest['verifiedSnapshotCommit']:
            assert row['originalTree'] == manifest['verifiedRootTree']
    for path, row in files.items():
        raw = subprocess.check_output(['git', 'show', ':' + row['archivePath']], cwd=ROOT)
        assert len(raw) == row['bytes'], path
        assert identity('blob', raw) == row['gitBlob'], path
        assert hashlib.sha256(raw).hexdigest() == row['sha256'], path
    print(json.dumps({'verifiedOriginalCommitPayloads': len(manifest['originalCommitPayloads']),
                      'verifiedProjectFiles': len(files), 'verifiedTreePayloads': len(trees),
                      'finalRootMatchesOriginalCommit': True}))


if __name__ == '__main__':
    main()
