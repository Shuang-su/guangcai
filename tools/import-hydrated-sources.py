"""Add hydrated aliases and explicitly scoped Beijing work evidence to the archive."""
from pathlib import Path
import hashlib
import json
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
D = ROOT / 'docs/changes/20261014-source-consolidation'
SOURCE = Path('/Users/shuangsu/Documents/Codex/guangcai-beijing-4.3')
SECRET = re.compile(rb'(?:-----BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY-----|gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}|sk-[A-Za-z0-9]{32,}|nfp_[A-Za-z0-9]{30,})')


def git(*args, raw=None):
    return subprocess.check_output(['git', *args], cwd=ROOT, input=raw)


def main():
    manifest = json.loads((D / 'source-manifest.json').read_text())
    verified = json.loads((D / 'hydrated-workspace-verification.json').read_text())
    assert verified['summary'] == {'matches': 3593}
    by_sha = {entry['sha256']: entry for entry in manifest['content']}
    paths = [Path(row['path']) for row in verified['files']]
    # These are recorded release/authoring artifacts, not dependency caches.
    for folder in (SOURCE / '.codex-work/deploy', SOURCE / '.codex-work/tmp'):
        paths.extend(p for p in folder.iterdir() if p.is_file() and not p.name.startswith('.'))
    added, aliases, staged = [], 0, []
    for path in paths:
        assert not path.is_symlink()
        info = path.stat()
        assert not info.st_flags & 0x40000000, path
        raw = path.read_bytes()
        if SECRET.search(raw):
            raise RuntimeError(f'Potential credential; not imported: {path.name}')
        if path.suffix == '.json':
            def check(value):
                if isinstance(value, dict):
                    for key, child in value.items():
                        if key.lower() in ('access_token', 'refresh_token', 'authorization', 'password', 'private_key') and child:
                            raise RuntimeError(f'Credential field; not imported: {path.name}')
                        check(child)
                elif isinstance(value, list):
                    for child in value:
                        check(child)
            check(json.loads(raw))
        sha = hashlib.sha256(raw).hexdigest()
        oid = hashlib.sha1(f'blob {len(raw)}\0'.encode() + raw).hexdigest()
        relative = path.relative_to(SOURCE).as_posix()
        record = by_sha.get(sha)
        if record is None:
            assert len(raw) < 50 * 1024 ** 2, 'Use the LFS importer for new large originals'
            stored = git('hash-object', '-w', '--stdin', raw=raw).decode().strip()
            assert stored == oid
            archive = f'archives/objects/{sha[:2]}/{sha}{path.suffix.lower()}'
            git('update-index', '--add', '--cacheinfo', f'100644,{oid},{archive}')
            staged.append(archive)
            record = {'sha256': sha, 'bytes': len(raw), 'storage': 'git-blob',
                      'gitBlob': oid, 'archivePath': archive, 'sources': []}
            manifest['content'].append(record)
            by_sha[sha] = record
            added.append(record)
        if not any(row['root'] == 'internal-beijing' and row['relative'] == relative for row in record['sources']):
            record['sources'].append({'root': 'internal-beijing', 'relative': relative, 'mtime_ns': info.st_mtime_ns})
            aliases += 1
    if staged:
        git('update-index', '--skip-worktree', '--stdin', raw=('\n'.join(staged) + '\n').encode())
    manifest['hydrationFollowup'] = {'date': '2026-10-14', 'verifiedPreviouslyUnreadable': 3593,
        'remainingPreviouslyUnreadable': 0, 'report': 'hydrated-workspace-verification.json',
        'historicalUnreadableListPreserved': True}
    manifest['summary'].update(currentVerifiedContent=len(manifest['content']),
        currentSourceOccurrences=sum(len(row['sources']) for row in manifest['content']),
        verifiedHydratedFiles=3593, currentUnreadableFromInitialInventory=0)
    (D / 'source-manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
    index = D / 'source-index.md'
    if added:
        with index.open('a') as output:
            output.write('\n## 下载完成后的北京工作区补录\n\n此前占位文件的3593处来源现已逐字节核验。以下为本次新增索引内容；重复内容只补充原路径。\n\n')
            for row in added:
                label = row['sources'][0]['relative']
                output.write(f"- [{label}](../../../{row['archivePath']}) — {row['bytes']:,} bytes；`{row['sha256']}`\n")
    print(json.dumps({'newArchiveEntries': len(added), 'newAliases': aliases,
                     'totalContent': len(manifest['content']),
                     'sourceOccurrences': manifest['summary']['currentSourceOccurrences']}))


if __name__ == '__main__':
    main()
