"""Verify both historical snapshots from this repository, without the old disk."""
import argparse
import base64
import hashlib
import json
from pathlib import Path, PurePosixPath
import subprocess

ROOT = Path(__file__).resolve().parents[1]
DIRECTORY = 'docs/history/20260921-original-git'
SCOPES = ('guangcai-viewer', 'docs/changes/20260921-guangcai-showcase')
COMMITS = ('a84650f7efe04a789efa9e94c65d0bac138dd117', '40fb17b1e00bf9f5e1f3d2d79d060674ec8eecc0')
TREES = ('4b728f8b2423190be00db2b4e78cf44de726b965', '43f3b0d8370c4ceb376b6854a6547c94dd65f251')


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


def verify(manifest, read):
    assert tuple(manifest['scopes']) == SCOPES
    assert tuple(s['originalSha'] for s in manifest['snapshots']) == COMMITS
    maps, unique = [], set()
    for number, snap in enumerate(manifest['snapshots']):
        raw = read(DIRECTORY + '/' + snap['payloadFile'])
        assert identity('commit', raw) == snap['originalSha'], 'Commit identity'
        headers = raw.split(b'\n\n', 1)[0].decode().splitlines()
        assert headers[0] == 'tree ' + TREES[number]
        assert snap['originalTree'] == TREES[number]
        parents = [h.split()[1] for h in headers if h.startswith('parent ')]
        assert snap['parents'] == parents
        assert parents == [COMMITS[0] if number else '707a7e5163899654c826d49000c9b8483572d704']
        trees = snap['trees']
        files = {r['path']: r for r in snap['files']}
        assert len(files) == len(snap['files']) == 154
        visited_trees, visited_files = set(), set()

        def walk(path, expected):
            row = trees[path]
            payload = base64.b64decode(row['payloadBase64'], validate=True)
            assert row['gitTree'] == expected == identity('tree', payload), path
            visited_trees.add(path)
            for mode, name, child_id in entries(payload):
                child = name if path == '.' else path + '/' + name
                in_scope = any(child == s or child.startswith(s + '/') for s in SCOPES)
                ancestor = any(s.startswith(child + '/') for s in SCOPES)
                if mode == '40000' and (in_scope or ancestor):
                    walk(child, child_id)
                elif in_scope:
                    f = files[child]
                    assert f['mode'] == mode and f['gitBlob'] == child_id, child
                    source_path = f['archivePath']
                    p = PurePosixPath(source_path)
                    assert not p.is_absolute() and '..' not in p.parts
                    assert source_path.startswith('archives/objects/') or source_path == DIRECTORY + '/initial-completion.md'
                    data = read(source_path)
                    assert len(data) == f['bytes'], child
                    assert identity('blob', data) == child_id, child
                    assert hashlib.sha256(data).hexdigest() == f['sha256'], child
                    visited_files.add(child)
                    unique.add(child_id)
        walk('.', TREES[number])
        assert visited_trees == set(trees) and visited_files == set(files)
        maps.append({p: f['gitBlob'] for p, f in files.items()})
    changed = [p for p in sorted(maps[0].keys() | maps[1].keys()) if maps[0].get(p) != maps[1].get(p)]
    assert changed == manifest['changedPaths'] == [SCOPES[1] + '/completion.md']
    return {'verifiedOriginalCommits': 2, 'filesPerSnapshot': [154, 154],
            'treesPerSnapshot': [len(s['trees']) for s in manifest['snapshots']],
            'uniqueScopedBlobs': len(unique), 'changedPaths': changed,
            'bothRootsMatchOriginalCommits': True, 'oldSourceRequired': False}


def repository_reader(ref=None):
    cache = {}

    def read(path):
        if path not in cache:
            local = ROOT / path
            if ref is None and local.is_file():
                cache[path] = local.read_bytes()
            else:
                cache[path] = subprocess.check_output(['git', 'show', f'{ref or "HEAD"}:{path}'], cwd=ROOT)
        return cache[path]
    return read


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--ref', help='Verify a committed revision; default uses working files and archived HEAD blobs')
    args = parser.parse_args()
    read = repository_reader(args.ref)
    print(json.dumps(verify(json.loads(read(DIRECTORY + '/hydrated-manifest.json')), read)))


if __name__ == '__main__':
    main()
