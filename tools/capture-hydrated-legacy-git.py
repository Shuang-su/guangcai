"""Read the two authentic Guangcai commits; never write to the mixed source repo."""
import argparse
import base64
import hashlib
import json
import os
from pathlib import Path
import subprocess
import zlib

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'docs/history/20260921-original-git'
COMMITS = ('a84650f7efe04a789efa9e94c65d0bac138dd117',
           '40fb17b1e00bf9f5e1f3d2d79d060674ec8eecc0')
SCOPES = ('guangcai-viewer', 'docs/changes/20260921-guangcai-showcase')


def oid(kind, raw):
    return hashlib.sha1(f'{kind} {len(raw)}\0'.encode() + raw).hexdigest()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source-git', type=Path, required=True)
    args = parser.parse_args()
    source = args.source_git.resolve()

    def git(*cmd):
        return subprocess.check_output(['git', '--git-dir=' + str(source), *cmd], timeout=30)

    local_files = dataless = 0
    for directory, _, names in os.walk(source):
        for name in names:
            path = Path(directory) / name
            if path.is_symlink():
                continue
            local_files += 1
            dataless += bool(path.lstat().st_flags & 0x40000000)
    if dataless:
        raise RuntimeError('Source still contains cloud placeholders')
    inventory = json.loads((ROOT / 'docs/changes/20261014-source-consolidation/source-manifest.json').read_text())
    by_hash = {r['sha256']: r for r in inventory['content']}
    snapshots = []
    for commit in COMMITS:
        payload = git('cat-file', 'commit', commit)
        assert oid('commit', payload) == commit
        assert payload == (OUT / (commit + '.commit.txt')).read_bytes()
        headers = payload.split(b'\n\n', 1)[0].decode().splitlines()
        tree = headers[0].split()[1]
        parents = [h.split()[1] for h in headers if h.startswith('parent ')]
        trees, files = {}, []

        def visit(path, tree_id):
            raw = git('cat-file', 'tree', tree_id)
            assert oid('tree', raw) == tree_id
            trees[path] = {'gitTree': tree_id, 'payloadBase64': base64.b64encode(raw).decode()}
            for row in git('ls-tree', '-z', tree_id).split(b'\0'):
                if not row:
                    continue
                meta, name = row.split(b'\t', 1)
                mode, kind, child_id = meta.decode().split()
                child = name.decode() if path == '.' else path + '/' + name.decode()
                in_scope = any(child == s or child.startswith(s + '/') for s in SCOPES)
                ancestor = any(s.startswith(child + '/') for s in SCOPES)
                if kind == 'tree' and (in_scope or ancestor):
                    visit(child, child_id)
                elif kind == 'blob' and in_scope:
                    blob = git('cat-file', 'blob', child_id)
                    assert oid('blob', blob) == child_id
                    sha = hashlib.sha256(blob).hexdigest()
                    archived = by_hash.get(sha)
                    if archived:
                        assert archived['storage'] == 'git-blob'
                        archive_path = archived['archivePath']
                    else:
                        assert commit == COMMITS[0] and child == SCOPES[1] + '/completion.md'
                        target = OUT / 'initial-completion.md'
                        target.write_bytes(blob)
                        archive_path = target.relative_to(ROOT).as_posix()
                    files.append({'path': child, 'mode': mode, 'gitBlob': child_id,
                                  'sha256': sha, 'bytes': len(blob), 'archivePath': archive_path})
        visit('.', tree)
        snapshots.append({'originalSha': commit, 'payloadFile': commit + '.commit.txt',
                          'parents': parents, 'originalTree': tree, 'trees': trees,
                          'files': sorted(files, key=lambda x: x['path'])})
    legacy = json.loads((OUT / 'manifest.json').read_text())
    assert snapshots[-1]['trees'] == legacy['trees']
    assert snapshots[-1]['files'] == sorted(legacy['files'], key=lambda x: x['path'])
    before, after = [{r['path']: r['gitBlob'] for r in s['files']} for s in snapshots]
    changed = [p for p in sorted(before.keys() | after.keys()) if before.get(p) != after.get(p)]
    assert changed == [SCOPES[1] + '/completion.md']
    fsck = subprocess.run(['git', '--git-dir=' + str(source), 'fsck', '--full', '--no-reflogs'],
                          capture_output=True, text=True, timeout=60)
    messages = (fsck.stdout + fsck.stderr).splitlines()
    odd = 'objects/fa/459406f8b4115a55d9415f56bdc23bf7cc3956 2'
    normal = odd[:-2]
    duplicates = (source / odd).read_bytes()
    assert duplicates == (source / normal).read_bytes()
    assert hashlib.sha1(zlib.decompress(duplicates)).hexdigest() == 'fa459406f8b4115a55d9415f56bdc23bf7cc3956'
    unexpected = [m for m in messages if not m.startswith('dangling blob ') and
                  m != 'bad sha1 file: ' + str(source / odd)]
    assert fsck.returncode == 0 and not unexpected, unexpected
    report = {'schema': 1, 'verifiedDate': '2026-10-15', 'sourceGit': str(source),
              'scopes': SCOPES, 'snapshots': snapshots, 'changedPaths': changed,
              'sourceAudit': {'localFiles': local_files, 'datalessFiles': dataless,
                              'fsckReturncode': fsck.returncode,
                              'danglingBlobs': sum(m.startswith('dangling blob ') for m in messages),
                              'duplicateObject': {'path': odd, 'identicalTo': normal,
                                                  'sha256': hashlib.sha256(duplicates).hexdigest(),
                                                  'bytes': len(duplicates), 'action': 'preserved'},
                              'unexpectedMessages': unexpected},
              'boundary': 'Authentic commit payloads, root-to-project tree proofs and complete scoped files for both snapshots. Unrelated subtrees and mixed ancestor history are not imported; no original refs are created or merged.'}
    (OUT / 'hydrated-manifest.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps({'snapshots': len(snapshots), 'filesPerSnapshot': [len(s['files']) for s in snapshots],
                      'changedPaths': changed, 'sourceAudit': report['sourceAudit']}, ensure_ascii=False))


if __name__ == '__main__':
    main()
