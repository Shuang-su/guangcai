"""Verify the September 21 snapshot against its authentic Git tree identity.

Only Guangcai files are referenced in the archive. The mixed repository's
unrelated ancestors are not imported or rewritten. Source files are read only.
"""
from pathlib import Path
import base64
import hashlib
import json
import os
import stat
import zlib

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path('/Volumes/Prism/GuangcaiCeramic')
OLD_GIT = Path('/Users/shuangsu/Documents/New project/.git')
OUT = ROOT / 'docs/history/20260921-original-git'
SCOPE = ('guangcai-viewer', 'docs/changes/20260921-guangcai-showcase')
COMMITS = ('a84650f7efe04a789efa9e94c65d0bac138dd117',
           '40fb17b1e00bf9f5e1f3d2d79d060674ec8eecc0')
EXPECTED_TREE = '43f3b0d8370c4ceb376b6854a6547c94dd65f251'
SKIP = {'.DS_Store', '.git', 'node_modules', 'dist', '.codex-work', '.netlify'}


def identity(kind, raw):
    return hashlib.sha1(f'{kind} {len(raw)}\0'.encode() + raw).hexdigest()


def collect(source, inventory):
    trees, files = {}, []
    by_sha = {row['sha256']: row for row in inventory['content']}

    def visit(path):
        entries = []
        for child in path.iterdir():
            if child.name in SKIP or child.name.startswith('._'):
                continue
            relative = child.relative_to(source).as_posix()
            info = child.lstat()
            if stat.S_ISLNK(info.st_mode):
                mode, raw = '120000', os.readlink(child).encode()
                oid = identity('blob', raw)
            elif stat.S_ISDIR(info.st_mode):
                mode, oid = '40000', visit(child)
                entries.append((mode, child.name, oid))
                continue
            else:
                if getattr(info, 'st_flags', 0) & 0x40000000:
                    raise RuntimeError(f'Source is not hydrated: {child}')
                mode = '100755' if info.st_mode & stat.S_IXUSR else '100644'
                raw = child.read_bytes()
                oid = identity('blob', raw)
            entries.append((mode, child.name, oid))
            if any(relative == scope or relative.startswith(scope + '/') for scope in SCOPE):
                sha = hashlib.sha256(raw).hexdigest()
                archived = by_sha.get(sha)
                if not archived:
                    raise RuntimeError(f'Content has no archived recovery path: {relative}')
                files.append({'path': relative, 'mode': mode, 'gitBlob': oid,
                              'sha256': sha, 'bytes': len(raw),
                              'archivePath': archived['archivePath']})
        entries.sort(key=lambda row: (row[1] + ('/' if row[0] == '40000' else '')).encode())
        raw = b''.join(f'{mode} {name}\0'.encode() + bytes.fromhex(oid)
                       for mode, name, oid in entries)
        oid = identity('tree', raw)
        relative = path.relative_to(source).as_posix()
        # Keep the root-to-project path and project trees; unrelated child
        # object IDs are provenance only, not their contents or source files.
        if relative in ('.', 'docs', 'docs/changes') or any(
                relative == scope or relative.startswith(scope + '/') for scope in SCOPE):
            trees[relative] = {'gitTree': oid, 'payloadBase64': base64.b64encode(raw).decode()}
        return oid

    root_tree = visit(source)
    if root_tree != EXPECTED_TREE:
        raise RuntimeError(f'Working copy does not match authentic tree: {root_tree}')
    return trees, files


def main():
    inventory = json.loads((ROOT / 'docs/changes/20261014-source-consolidation/source-manifest.json').read_text())
    trees, files = collect(SOURCE, inventory)
    commit_rows = []
    OUT.mkdir(parents=True, exist_ok=True)
    for oid in COMMITS:
        path = OLD_GIT / 'objects' / oid[:2] / oid[2:]
        if path.stat().st_flags & 0x40000000:
            raise RuntimeError(f'Commit header is still dataless: {oid}')
        inflated = zlib.decompress(path.read_bytes())
        header, raw = inflated.split(b'\0', 1)
        assert header == f'commit {len(raw)}'.encode()
        assert identity('commit', raw) == oid
        name = oid + '.commit.txt'
        (OUT / name).write_bytes(raw)
        commit_rows.append({'originalSha': oid, 'payloadFile': name,
                            'originalTree': raw.decode().splitlines()[0].split()[1]})
    report = {'schema': 1, 'date': '2026-10-14', 'sourceWorkspace': str(SOURCE),
              'sourceGit': str(OLD_GIT), 'sourceRef': 'codex/guangcai-ceramic-showcase',
              'verifiedSnapshotCommit': COMMITS[-1], 'verifiedRootTree': EXPECTED_TREE,
              'originalCommitPayloads': commit_rows, 'trees': trees, 'files': files,
              'summary': {'projectFiles': len(files), 'treePayloads': len(trees),
                          'bytesReferenced': sum(row['bytes'] for row in files)},
              'boundary': 'Final snapshot and two authentic commit headers verified. Initial commit tree and complete mixed ancestry are not claimed recovered.'}
    (OUT / 'manifest.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps(report['summary']))


if __name__ == '__main__':
    main()
