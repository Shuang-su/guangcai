"""Package only the formal China Cup root page, without changing production.
python3 -B tools/package-china-main.py /new/output/directory
"""
from pathlib import Path
import hashlib
import io
import json
import re
import stat
import subprocess
import sys
import tarfile

repo = Path(__file__).resolve().parent.parent
app = repo / 'guangcai-china-preview'
out = Path(sys.argv[1]).resolve()
assert not out.exists(), 'Refuse to replace an existing package'


def git(*args):
    return subprocess.check_output(['python3', '-B', str(repo / 'tools/git-exfat.py'), *args], cwd=repo)


def encode(value):
    return (json.dumps(value, ensure_ascii=False, indent=2) + '\n').encode()


def record(name, data):
    return {'path': name, 'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest()}


def add(tar, name, data, mode=0o644):
    member = tarfile.TarInfo(name)
    member.size, member.mode, member.mtime = len(data), mode, timestamp
    tar.addfile(member, io.BytesIO(data))


assert not git('status', '--porcelain').strip(), 'Commit reviewed packaging first'
commit = git('rev-parse', 'HEAD').decode().strip()
timestamp = int(git('show', '-s', '--format=%ct', 'HEAD').decode().strip())
deploy_id = '6ad6fcdcf1f9e6ca6c7c5330'
archive = repo / 'deployments/guangcai-no1-china-v7' / deploy_id
site = archive / 'site'
production = json.loads((archive / 'files.json').read_text())
release = json.loads((site / 'release.json').read_text())
runtime = [f'releases/v7-{i}' for i in range(1, 10)] + ['api/v1/bootstrap.json', 'icons',
           'backgrounds', 'runtime-config.js', 'manifest.webmanifest', 'third-party']
tests = ['geometry', 'float-normal', 'fixed-atlas', 'city-selection', 'xy-controls',
         'haptics', 'v6-selection', 'loop-selector', 'glass-compat', 'download-bytes']


def runtime_file(name):
    return any(name == p or name.startswith(p + '/') for p in runtime)


# Follow every original compiled asset filename mentioned by the root graph.
asset_names = {p.name for p in (site / 'assets').iterdir() if p.is_file() and not p.name.startswith('.')}
queue, compiled = ['index.html'], set()
while queue:
    name = queue.pop()
    text = (site / name).read_text()
    for asset in asset_names:
        target = 'assets/' + asset
        if asset in text and target not in compiled:
            compiled.add(target)
            if asset.endswith(('.js', '.css')):
                queue.append(target)
assert not any(p.startswith('assets/index-') for p in compiled), 'Lab entry leaked into root graph'
static_paths = sorted(p.lstrip('/') for p in production if p.lstrip('/') in compiled
                      or p.lstrip('/') in {'index.html', '_headers', 'release.json'} or runtime_file(p.lstrip('/')))
assert all(not p.endswith('.html') or p == 'index.html' for p in static_paths)
assert not any(any(part in {'artwork-dev', 'dev-assets', 'label-compare', 'city-compare', 'bezier-lab', 'coverage', 'integration', 'audit', 'dev'} for part in Path(p).parts) for p in static_paths)

package = json.loads((app / 'package.json').read_text())
package['scripts'] = {k: package['scripts'][k] for k in ['dev', 'build', 'preview', 'test']}
package['handoffScope'] = 'formal-root-only'
config = (app / 'vite.config.ts').read_text().split('export default defineConfig')[0]
config = re.sub(r'for\(const item of \[.*?\]\)', 'for(const item of ' + json.dumps(runtime) + ')', config)
config = config.replace('|dev-assets', '')
config += "export default defineConfig(({command})=>({base:process.env.APP_BASE??'/',plugins:[entryVersion(),wgslVitePlugin(),rawNormalFiles(),runtimeFiles()],publicDir:command==='serve'?'public':false,cacheDir:'.codex-work/cache/vite',server:{port:5270,strictPort:true,watch:{ignored:['**/.codex-work/**']}},build:{outDir:'.codex-work/deploy/v7-build',chunkSizeWarningLimit:650,rolldownOptions:{input:['index.html']}}}));\n"
tsconfig = json.loads((app / 'tsconfig.json').read_text())
tsconfig['include'] = ['src']
overrides = {'package.json': encode(package), 'vite.config.ts': config.encode(), 'tsconfig.json': encode(tsconfig)}


def selected(name):
    if name in {'index.html', 'package.json', 'package-lock.json', 'vite.config.ts', 'tsconfig.json'}:
        return True
    if name.startswith(('src/', 'vendor/')):
        return True
    if name.startswith(('assets/source/', 'assets/masters/')) and 'APEC' not in name:
        return True
    if name.startswith('public/'):
        return runtime_file(name[7:]) or name.startswith('public/fixed/')
    return name in {f'tools/{t}.test.ts' for t in tests} or name == 'docs/changes/20261013-fixed-layout/geometry-before.json'


entries = []
for raw in git('ls-files', '--stage', '-z', '--', 'guangcai-china-preview').split(b'\0'):
    if not raw:
        continue
    metadata, raw_path = raw.split(b'\t', 1)
    mode, blob, stage = metadata.decode().split()
    relative = raw_path.decode().removeprefix('guangcai-china-preview/')
    if not selected(relative) or not (app / relative).exists():
        continue
    assert stage == '0' and mode in {'100644', '100755'}
    assert not any(p in {'.git', '.netlify', '.codex-work', 'node_modules'} or p.startswith('._') or p.startswith('.env') for p in Path(relative).parts)
    entries.append((relative, blob, mode))
out.mkdir(parents=True)
identity = {'version': package['version'], 'scope': 'formal-root-only', 'snapshotCommit': commit,
            'productionSourceCommit': release['sourceCommit'], 'deployId': deploy_id, 'resourceRelease': release['resourceRelease'],
            'sourceOverrides': list(overrides), 'formalShenzhen': 'original; no Phase II APEC', 'githubSync': 'pending-account-suspended'}
bootstrap = json.loads((app / 'public/api/v1/bootstrap.json').read_text())
current = {**identity, 'bootstrap': bootstrap, 'catalog': json.loads((app / 'public' / bootstrap['catalogUrl']).read_text()),
           'manifest': json.loads((app / 'public' / bootstrap['manifestUrl']).read_text())}
readme = (repo / 'docs/changes/20261020-v7.1.11-main-only-handoff/handoff-readme.md').read_bytes()
source_records = []
with tarfile.open(out / 'source-main.tar.gz', 'w:gz', compresslevel=3) as tar:
    for number, (name, blob, mode) in enumerate(entries, 1):
        file = app / name
        assert stat.S_ISREG(file.lstat().st_mode), name
        original = file.read_bytes()
        assert hashlib.sha1(f'blob {len(original)}\0'.encode() + original).hexdigest() == blob, name
        data = overrides.get(name, original)
        item = {**record('guangcai-china-preview/' + name, data), 'gitBlob': blob, 'overridden': name in overrides}
        if name in overrides:
            item['originalSha256'] = hashlib.sha256(original).hexdigest()
        source_records.append(item)
        add(tar, 'source/guangcai-china-preview/' + name, data, int(mode, 8) & 0o777)
        if number % 300 == 0:
            print(f'Source {number}/{len(entries)}', flush=True)
    generated = {'SOURCE_REVISION.json': encode(identity), 'CURRENT-RESOURCES.json': encode(current),
                 'README-开发交付.md': readme, 'source-files.json': encode({'identity': identity, 'files': source_records})}
    for name, data in generated.items():
        add(tar, 'source/' + name, data)
for name, data in generated.items():
    (out / name).write_bytes(data)
static_records = []
with tarfile.open(out / 'production-main.tar.gz', 'w:gz', compresslevel=3) as tar:
    for name in static_paths:
        data = (site / name).read_bytes()
        item = record('site/' + name, data)
        assert item['sha256'] == production['/' + name]['sha256'], name
        static_records.append(item)
        add(tar, 'production/site/' + name, data)
    add(tar, 'production/HANDOFF.json', encode(identity))
(out / 'production-files.json').write_bytes(encode({'identity': identity, 'files': static_records}))
receipt = {**identity, 'sourceFiles': len(source_records), 'productionFiles': len(static_records),
           'onlyHtmlEntry': 'index.html', 'archives': []}
for name in ['source-main.tar.gz', 'production-main.tar.gz']:
    data = (out / name).read_bytes()
    receipt['archives'].append(record(name, data))
(out / 'package-receipt.json').write_bytes(encode(receipt))
print(json.dumps(receipt, ensure_ascii=False, indent=2), flush=True)
