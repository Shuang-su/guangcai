"""Portable current source and exact production; no fetch or stale build.
Usage: node tools/v7/package-handoff.mjs --output /new/folder --deploy-id ID
"""
import argparse
import hashlib
import io
import json
import os
from pathlib import Path
import stat
import subprocess
import tarfile

repo = Path(__file__).resolve().parents[3]
app = repo / 'guangcai-china-preview'


def git(*args):
    return subprocess.check_output(['python3', '-B', str(repo / 'tools/git-exfat.py'), *args], cwd=repo)


def encode(value):
    return (json.dumps(value, ensure_ascii=False, indent=2) + '\n').encode()


def record(file, name):
    assert stat.S_ISREG(file.lstat().st_mode), name
    data = file.read_bytes()
    return {'path': name, 'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest()}, data


def forbidden(name):
    return any(p in {'.git', '.netlify', '.codex-work', 'node_modules', '.DS_Store', '.npmrc'}
               or p.startswith('._') or p.startswith('.env') for p in Path(name).parts)


def add(tar, name, data, mode=0o644):
    member = tarfile.TarInfo(name)
    member.size, member.mode, member.mtime = len(data), mode, timestamp
    tar.addfile(member, io.BytesIO(data))


parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--output', required=True, type=Path)
parser.add_argument('--deploy-id', required=True)
args = parser.parse_args()
out = args.output.expanduser().resolve()
assert not out.exists(), 'Output must be new; never overwrite a handoff'
assert not git('status', '--porcelain').strip(), 'Commit reviewed source first'
commit = git('rev-parse', 'HEAD').decode().strip()
timestamp = int(git('show', '-s', '--format=%ct', 'HEAD').decode().strip())
version = json.loads((app / 'package.json').read_text())['version']
archive = repo / 'deployments/guangcai-no1-china-v7' / args.deploy_id
deployment = json.loads((archive / 'deployment.json').read_text())
published = json.loads((archive / 'site/release.json').read_text())
assert published['version'] == version and deployment['deployId'] == args.deploy_id
bootstrap = json.loads((app / 'public/api/v1/bootstrap.json').read_text())
manifest = json.loads((app / 'public' / bootstrap['manifestUrl']).read_text())
catalog = json.loads((app / 'public' / bootstrap['catalogUrl']).read_text())
assert manifest['releaseId'] == bootstrap['releaseId'] == published['resourceRelease']
descriptors = []


def collect(value):
    if isinstance(value, dict):
        if 'url' in value and 'sha256' in value:
            name = os.path.normpath(str(Path(bootstrap['manifestUrl']).parent / value['url']))
            item, _ = record(app / 'public' / name, name)
            assert item['sha256'] == value['sha256'], name
            descriptors.append({**value, 'publicPath': name})
        else:
            for child in value.values():
                collect(child)
    elif isinstance(value, list):
        for child in value:
            collect(child)


collect(manifest)
assert len(descriptors) == 196
selection = ['guangcai-china-preview', 'docs', 'README.md', 'VERSION_HISTORY.md', 'AGENTS.md',
             'WORKSPACE_LOCATIONS.md', 'tools/git-exfat.py', 'tools/README-exfat.md']
files, unavailable = [], []
for entry in git('ls-files', '--stage', '-z', '--', *selection).split(b'\0'):
    if not entry:
        continue
    metadata, name = entry.split(b'\t', 1)
    mode, blob, stage = metadata.decode().split()
    name = name.decode()
    assert not forbidden(name), name
    if not (repo / name).exists():
        unavailable.append(name)
        continue
    assert stage == '0' and mode in {'100644', '100755'}, name
    files.append((name, blob, mode))
required = ['src/', 'public/releases/', 'tools/', 'vendor/', 'integration/']
assert not [p for p in unavailable if any(p.startswith('guangcai-china-preview/' + q) for q in required)]
out.mkdir(parents=True)
print(f'Packaging {len(files)} files; listing {len(unavailable)} unavailable historical paths.', flush=True)
revision = {'version': version, 'snapshotCommit': commit, 'productionSourceCommit': published['sourceCommit'],
            'deployId': args.deploy_id, 'resourceRelease': bootstrap['releaseId'],
            'githubMerge': 'pending-account-suspended', 'snapshotKind': 'present tracked current app and supporting records; no Git history',
            'sourceFiles': len(files), 'unavailableHistoricalPaths': len(unavailable)}
current = {**revision, 'bootstrap': bootstrap, 'catalog': catalog, 'manifest': manifest,
           'resourceDescriptors': descriptors, 'devOnly': {'phase2Shenzhen': '/artwork-dev/?art=phase2'},
           'legacyBackendWorkbook': 'Historical v7-4 / 195 descriptors; use this v7-9 JSON for current resources'}
generated = {'SOURCE_REVISION.json': encode(revision), 'CURRENT-RESOURCES.json': encode(current),
             'unavailable-history.json': encode({'reason': 'sparse history; no GitHub fetch', 'paths': unavailable}),
             'README-开发交付.md': (repo / 'docs/changes/20261020-v7.1.11-offline-handoff/handoff-readme.md').read_bytes()}
source_records = []
with tarfile.open(out / 'source.tar.gz', 'w:gz', compresslevel=3) as tar:
    for number, (name, blob, mode) in enumerate(files, 1):
        item, data = record(repo / name, name)
        assert hashlib.sha1(f'blob {len(data)}\0'.encode() + data).hexdigest() == blob, name
        source_records.append({**item, 'gitBlob': blob, 'mode': mode})
        add(tar, 'source/' + name, data, int(mode, 8) & 0o777)
        if number % 400 == 0:
            print(f'Source: {number}/{len(files)} hashed and archived', flush=True)
    generated['source-files.json'] = encode({'revision': revision, 'files': source_records})
    for name, data in generated.items():
        add(tar, 'source/' + name, data)
for name, data in generated.items():
    (out / name).write_bytes(data)
expected = json.loads((archive / 'files.json').read_text())
production_records = []
with tarfile.open(out / 'production.tar.gz', 'w:gz', compresslevel=3) as tar:
    for name, expected_item in sorted(expected.items()):
        clean = name.lstrip('/')
        assert '..' not in Path(clean).parts and not forbidden(clean), clean
        item, data = record(archive / 'site' / clean, 'site/' + clean)
        assert item['sha256'] == expected_item['sha256'] and item['bytes'] == expected_item['bytes'], clean
        production_records.append(item)
        add(tar, 'production/site/' + clean, data)
    for name in ['files.json', 'deployment.json', 'verification.json']:
        add(tar, 'production/' + name, (archive / name).read_bytes())
(out / 'production-files.json').write_bytes(encode({'deployId': args.deploy_id, 'files': production_records}))
receipt = {**revision, 'sourceBytes': sum(r['bytes'] for r in source_records),
           'productionFiles': len(production_records), 'productionBytes': sum(r['bytes'] for r in production_records),
           'archives': [record(out / name, name)[0] for name in ['source.tar.gz', 'production.tar.gz']]}
(out / 'package-receipt.json').write_bytes(encode(receipt))
print(json.dumps(receipt, ensure_ascii=False, indent=2), flush=True)
