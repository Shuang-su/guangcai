import datetime
import hashlib
import json
import shutil
import sys
from pathlib import Path
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parents[2]
SOURCE = Path('/Volumes/Prism/Codex/guangcai-viewer-20260929/outputs')
SKIP = {'node_modules', '.codex-work', '.netlify', 'dist', '.git'}


def digest(path):
    h = hashlib.sha256()
    with path.open('rb') as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b''):
            h.update(chunk)
    return h.hexdigest()


def copy_file(source, target, records):
    if source.is_symlink():
        raise RuntimeError(f'Unexpected source symlink: {source}')
    if target.exists():
        raise RuntimeError(f'Refusing to overwrite: {target}')
    before = digest(source)
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(source, target)
    after = digest(source)
    copied = digest(target)
    if before != after or copied != before:
        raise RuntimeError(f'Source changed while copying: {source}')
    records.append({'path': target.relative_to(ROOT).as_posix(),
                    'source': str(source), 'bytes': target.stat().st_size,
                    'sha256': copied})


def copy_tree(source, target, records):
    for entry in sorted(source.iterdir()):
        if entry.name in SKIP or entry.name == '.DS_Store' or entry.name.startswith('._'):
            continue
        if entry.is_symlink():
            raise RuntimeError(f'Unexpected source symlink: {entry}')
        if entry.is_dir():
            copy_tree(entry, target / entry.name, records)
        elif entry.is_file():
            copy_file(entry, target / entry.name, records)


version = sys.argv[1]
assert version in ('original', 'china')
records = []
if version == 'original':
    project = 'guangcai-viewer'
    site = 'guangcai-no1'
    deploy = '6abbdf78d912b4b6b1d7c3b9'
    manifest = SOURCE / 'evidence/deployment/release-manifest.json'
    staging = SOURCE / project / '.codex-work/deploy/netlify-20260929'
    copy_tree(SOURCE / 'evidence', ROOT / 'evidence', records)
    for name in ('DELIVERY.md', 'delivery-manifest.json'):
        copy_file(SOURCE / name, ROOT / name, records)
else:
    project = 'guangcai-china-preview'
    site = 'guangcai-no1-china'
    deploy = '6acbd24fa545c331cdd20dae'
    manifest = SOURCE / project / 'evidence/deployment/release-manifest.json'
    staging = SOURCE / project / '.codex-work/deploy/china-20261012-floral-relief-deeper/site'
copy_tree(SOURCE / project, ROOT / project, records)
release = json.loads(manifest.read_text())
for entry in release['files']:
    src = staging / entry['path']
    assert digest(src) == entry['sha256'], str(src)
    copy_file(src, ROOT / 'deployments' / site / deploy / entry['path'], records)
records.sort(key=lambda item: item['path'])
result = {'version': version, 'importedAt': datetime.datetime.now(ZoneInfo('Asia/Shanghai')).isoformat(),
          'sourceRoot': str(SOURCE), 'site': site, 'deployId': deploy,
          'gitHistoryBeforeImport': False,
          'excluded': sorted(SKIP | {'.DS_Store', '._*'}), 'files': records}
(ROOT / f'docs/archive/{version}-inventory.json').write_text(json.dumps(result, ensure_ascii=False, indent=2)+'\n')
print(json.dumps({'version':version, 'files':len(records), 'bytes':sum(item['bytes'] for item in records), 'publishedFiles':len(release['files'])}))
