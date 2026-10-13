#!/usr/bin/env python3
"""Verify historical source from pinned commits and frozen deploys on disk."""
import hashlib
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXPECTED = {
    'original-inventory.json': 'original',
    'china-inventory.json': '2.0',
    'china-2.1-inventory.json': '2.1',
    'china-2.2-inventory.json': '2.2',
}


def sha256(path):
    digest = hashlib.sha256()
    with path.open('rb') as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b''):
            digest.update(chunk)
    return digest.hexdigest()


def main():
    manifests = sorted((ROOT / 'docs/archive').glob('*-inventory.json'))
    present = {path.name for path in manifests}
    missing = sorted(set(EXPECTED) - present)
    if missing:
        print(json.dumps({'complete': False, 'missingManifests': missing}, indent=2))
        return 1
    unavailable = []
    for manifest in manifests:
        data = json.loads(manifest.read_text())
        if manifest.name in EXPECTED and data.get('version') != EXPECTED[manifest.name]:
            print(json.dumps({'complete': False, 'invalidVersion': manifest.name}))
            return 1
        revision = data.get('verifyAtCommit')
        if not revision or subprocess.run(
                ['git', '-C', str(ROOT), 'cat-file', '-e', revision + '^{commit}'],
                stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL).returncode:
            unavailable.append({'manifest': manifest.name, 'revision': revision})
    if unavailable:
        print(json.dumps({'complete': False, 'historyUnavailable': unavailable,
                          'remedy': 'Use a full Git clone. For a shallow clone, run git fetch --unshallow origin. Source ZIPs do not contain historical Git objects.'}, indent=2))
        return 2
    reports, failures = [], []
    for manifest in manifests:
        data = json.loads(manifest.read_text())
        revision = data.get('verifyAtCommit')
        history = subprocess.Popen(['git', '-C', str(ROOT), 'cat-file', '--batch'],
                                   stdin=subprocess.PIPE, stdout=subprocess.PIPE) if revision else None
        for entry in data['files']:
            if history:
                history.stdin.write((revision + ':' + entry['path'] + '\n').encode())
                history.stdin.flush()
                header = history.stdout.readline().decode().strip().split()
                if len(header) != 3 or header[1] != 'blob':
                    failures.append({'path': entry['path'], 'reason': 'missing from historical commit'})
                    continue
                size = int(header[2])
                digest = hashlib.sha256()
                remaining = size
                while remaining:
                    chunk = history.stdout.read(min(1024 * 1024, remaining))
                    if not chunk:
                        raise RuntimeError('Unexpected end of git cat-file output')
                    digest.update(chunk)
                    remaining -= len(chunk)
                history.stdout.read(1)
                if size != entry['bytes'] or digest.hexdigest() != entry['sha256']:
                    failures.append({'path': entry['path'], 'reason': 'historical content differs from import'})
                if entry['path'].startswith('deployments/'):
                    path = ROOT / entry['path']
                    if not path.is_file() or path.stat().st_size != entry['bytes'] or sha256(path) != entry['sha256']:
                        failures.append({'path': entry['path'], 'reason': 'frozen deployment differs in working tree'})
                continue
            path = ROOT / entry['path']
            if not path.is_file():
                failures.append({'path': entry['path'], 'reason': 'missing'})
            elif path.stat().st_size != entry['bytes'] or sha256(path) != entry['sha256']:
                failures.append({'path': entry['path'], 'reason': 'content differs from import'})
        if history:
            history.stdin.close()
            history.stdout.close()
            if history.wait() != 0:
                raise RuntimeError('git cat-file failed')
        reports.append({'version': data['version'], 'files': len(data['files']),
                        'bytes': sum(item['bytes'] for item in data['files']),
                        'revision': revision or 'working-tree'})
    result = {'complete': not failures, 'versions': reports, 'failures': failures,
              'scope': 'Historical source/assets/evidence are checked at pinned commits; frozen deployments are also checked on disk. Current development source is validated by builds/tests, not compared to an older release.'}
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 1 if failures else 0


if __name__ == '__main__':
    raise SystemExit(main())
