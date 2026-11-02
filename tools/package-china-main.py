"""Package only the formal China Cup root page, without changing production.
python3 -B tools/package-china-main.py /new/output/directory --build-root /validated/build
Published build: add --deploy-id ID to verify against the saved deployment manifest.
"""
from pathlib import Path
import argparse
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
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('output', type=Path)
parser.add_argument('--build-root', type=Path)
parser.add_argument('--deploy-id', help='Published Netlify deployment matching the existing build')
args = parser.parse_args()
out = args.output.resolve()
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
version = json.loads((app / 'package.json').read_text())['version']
bootstrap = json.loads((app / 'public/api/v1/bootstrap.json').read_text())
if args.deploy_id:
    assert args.build_root, 'Published packaging requires an existing build directory'
    assert re.fullmatch(r'[0-9a-f]{24}', args.deploy_id), 'Invalid deployment ID'
    deploy_id = args.deploy_id
    site = args.build_root.resolve()
    archive = repo / 'deployments/guangcai-no1-china-v7' / deploy_id
    production = json.loads((archive / 'files.json').read_text())
    deployment = json.loads((archive / 'deployment.json').read_text())
    release = json.loads((site / 'release.json').read_text())
    assert deployment['deployId'] == deploy_id and deployment['state'] == 'ready'
    assert release['version'] == version and release['sourceCommit'] == deployment['sourceCommit']
    assert release['resourceRelease'] == bootstrap['releaseId']
    assert json.loads((site / 'api/v1/bootstrap.json').read_text()) == bootstrap
    critical = ['src', 'vendor', 'public', 'assets', 'index.html', 'package.json', 'package-lock.json', 'vite.config.ts', 'tsconfig.json']
    assert not git('diff', release['sourceCommit'], commit, '--', *['guangcai-china-preview/' + p for p in critical]).strip(), 'Source differs from published build'
elif args.build_root:
    deploy_id = None
    site = args.build_root.resolve()
    build_source = json.loads((site / 'build-source.json').read_text())
    assert build_source['sourceCommit'] == commit and build_source['version'] == version, 'Build source checkpoint differs'
    assert f'V{version}</dd>' in (site / 'index.html').read_text(), 'Stale build version'
    build_bootstrap = json.loads((site / 'api/v1/bootstrap.json').read_text())
    assert build_bootstrap == bootstrap, 'Build and source resource versions differ'
    production = {'/' + p.relative_to(site).as_posix(): record(p.relative_to(site).as_posix(), p.read_bytes())
                  for p in site.rglob('*') if p.is_file() and not p.name.startswith('.')}
    release = {'version': version, 'sourceCommit': commit, 'resourceRelease': bootstrap['releaseId'],
               'kind': 'local-build-not-deployed'}
    production['/release.json'] = record('release.json', encode(release))
else:
    deploy_id = '6ad6fcdcf1f9e6ca6c7c5330'
    archive = repo / 'deployments/guangcai-no1-china-v7' / deploy_id
    site = archive / 'site'
    production = json.loads((archive / 'files.json').read_text())
    release = json.loads((site / 'release.json').read_text())
    assert release['version'] == version, 'Current source requires a current --build-root'
runtime = [f'releases/v7-{i}' for i in range(1, int(bootstrap['releaseId'].split('-')[-1]) + 1)] + ['api/v1/bootstrap.json', 'api/v1/bootstrap-v7-9.json', 'icons',
           'backgrounds', 'runtime-config.js', 'manifest.webmanifest', 'third-party']
tests = ['geometry', 'float-normal', 'fixed-atlas', 'fixed-quality', 'city-selection', 'xy-controls',
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
package['scripts']['test:blessings'] = 'tsx --test tools/v7/blessings.test.ts'
package['handoffScope'] = 'formal-root-only'
config = (app / 'vite.config.ts').read_text().split('export default defineConfig')[0]
config = re.sub(r'for\(const item of \[.*?\]\)', 'for(const item of ' + json.dumps(runtime) + ')', config)
config = config.replace('|dev-assets', '')
config += "export default defineConfig(({command})=>({base:process.env.APP_BASE??'/',plugins:[entryVersion(),wgslVitePlugin(),rawNormalFiles(),runtimeFiles()],publicDir:command==='serve'?'public':false,cacheDir:'.codex-work/cache/vite',server:{port:5270,strictPort:true,watch:{ignored:['**/.codex-work/**']}},build:{outDir:'.codex-work/deploy/v7-build',chunkSizeWarningLimit:650,rolldownOptions:{input:['index.html']}}}));\n"
tsconfig = json.loads((app / 'tsconfig.json').read_text())
tsconfig['include'] = ['src']
overrides = {'package.json': encode(package), 'vite.config.ts': config.encode(), 'tsconfig.json': encode(tsconfig)}
font_sources = {'assets/source/v7.1.2/fonts/SourceHanSerifCN-Bold.otf', 'assets/source/v7.1.2/fonts/LICENSE.txt'}
blessing_tools = {'tools/v7/build-city-blessings.py', 'tools/v7/compile-city-blessings.mjs', 'tools/v7/blessings.test.ts',
                  'evidence/v7.1.2/slogans-source.json', 'integration/BLESSINGS.md'}


def selected(name):
    if name in blessing_tools:
        return True
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
    if not selected(relative) or (not (app / relative).exists() and relative not in font_sources):
        continue
    assert stage == '0' and mode in {'100644', '100755'}
    assert not any(p in {'.git', '.netlify', '.codex-work', 'node_modules'} or p.startswith('._') or p.startswith('.env') for p in Path(relative).parts)
    entries.append((relative, blob, mode))
out.mkdir(parents=True)
identity = {'version': package['version'], 'scope': 'formal-root-only', 'snapshotCommit': commit,
            'productionSourceCommit': release['sourceCommit'], 'deployId': deploy_id, 'resourceRelease': release['resourceRelease'],
            'artifactKind': 'published-snapshot' if deploy_id else 'local-build-not-deployed',
            'reusedExistingBuild': True, 'rebuildPerformed': False,
            'sourceOverrides': list(overrides), 'formalShenzhen': 'original; no Phase II APEC', 'githubSync': 'pending-account-suspended'}
bootstrap = json.loads((app / 'public/api/v1/bootstrap.json').read_text())
current = {**identity, 'bootstrap': bootstrap, 'catalog': json.loads((app / 'public' / bootstrap['catalogUrl']).read_text()),
           'manifest': json.loads((app / 'public' / bootstrap['manifestUrl']).read_text())}
readme = f'''# 中国杯 V{version} 正式主页开发交付

只包含无后缀正式主页，唯一 HTML 入口为 index.html。七视角及花纹提清策略已包含；正式深圳保留原稿。
V7.1.13包含原六句祝福语、五句新固定文案和23城“我爱城市”，默认我爱深圳；五六字框向上加高、底边不变。
本包来源提交：{commit}；资源版本：{release['resourceRelease']}。
构建来源：{identity['artifactKind']}；部署ID：{deploy_id or '未部署'}。
本次直接筛选现成构建并核对发布清单，没有重新构建、安装依赖或更改线上。

- source-main.tar.gz：当前可维护源码、运行资源、所需工具和测试，无 node_modules、凭据、Git历史或构建缓存。
- production-main.tar.gz：可托管的静态主页，完整资源保留以兼容已有作品，无 dev/compare/APEC 页面。
- package-receipt.json、source-files.json、production-files.json：版本与逐文件SHA-256清单。

解开源码包后进入 source/guangcai-china-preview，使用 npm ci、npm run dev；npm run build 生成静态文件。
npm test 运行基础及花纹策略测试；npm run test:blessings 运行祝福语与字框边界测试。
这些命令供接手开发者后续使用，本次打包没有执行。构建默认仅 index.html；部署时以静态包 production/site 为站点根目录。
直接查看现成产物：在 production/site 中执行 python3 -m http.server 8080，然后访问 http://127.0.0.1:8080/。
修改祝福语素材的生成方式见源码内 integration/BLESSINGS.md；字体及许可、SVG母版和生成工具均随源码包提供。
应通过 HTTP(S) 访问，不能以 file:// 打开。默认使用同源 api/v1/bootstrap.json 和 releases；
runtime-config.js 可配置后端和资源地址，包内不含真实身份或服务凭据。
花纹近看优先高分彩色，法线/ORM按预算分档，保留16位法线及原有显存预算。
实体手机视觉与真实后端线路验收按接入环境另行完成。
'''.encode()
source_records = []
with tarfile.open(out / 'source-main.tar.gz', 'w:gz', compresslevel=3) as tar:
    for number, (name, blob, mode) in enumerate(entries, 1):
        file = app / name
        if file.exists():
            assert stat.S_ISREG(file.lstat().st_mode), name
            original = file.read_bytes()
        else:
            assert name in font_sources
            original = git('cat-file', 'blob', blob)
        assert not original.startswith(b'version https://git-lfs.github.com/spec/v1\n'), 'Unresolved LFS source: ' + name
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
        data = encode(release) if args.build_root and not deploy_id and name == 'release.json' else (site / name).read_bytes()
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
