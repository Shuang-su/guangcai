#!/usr/bin/env python3
"""Validate imported files and frozen deploys without network or Node dependencies."""
import hashlib
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def sha256(path):
    digest = hashlib.sha256()
    with path.open('rb') as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b''):
            digest.update(chunk)
    return digest.hexdigest()


def main():
    manifests = sorted((ROOT / 'docs/archive').glob('*-inventory.json'))
    if not manifests:
        print('No imported snapshot inventory is present on this branch.', file=sys.stderr)
        return 1
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
              'scope': 'Imported source, assets, evidence and frozen deployment bytes; no claim of device or visual acceptance.'}
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 1 if failures else 0


if __name__ == '__main__':
    raise SystemExit(main())
