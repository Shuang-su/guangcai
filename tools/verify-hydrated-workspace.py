"""Recheck previously unavailable source files without changing the source.

The historical inventory stays immutable. This follow-up records a byte hash
against its committed blob or frozen deployment blob, not just name/size.
"""
from pathlib import Path
import argparse
import hashlib
import json
import stat


def inspect(entry):
    path = Path(entry['path'])
    expected = entry.get('committedBlob') or entry.get('buildArchiveBlob')
    result = {'path': str(path), 'expectedBlob': expected}
    try:
        info = path.lstat()
        if not stat.S_ISREG(info.st_mode):
            return dict(result, status='not-regular-file')
        if getattr(info, 'st_flags', 0) & 0x40000000:
            return dict(result, status='still-dataless', bytes=info.st_size)
        digest = hashlib.sha256()
        blob = hashlib.sha1(f'blob {info.st_size}\0'.encode())
        with path.open('rb') as source:
            for chunk in iter(lambda: source.read(4 * 1024 ** 2), b''):
                digest.update(chunk)
                blob.update(chunk)
        after = path.stat()
        if (info.st_size, info.st_mtime_ns) != (after.st_size, after.st_mtime_ns):
            return dict(result, status='changed-during-read')
        return dict(result, bytes=info.st_size, sha256=digest.hexdigest(),
                    gitBlob=blob.hexdigest(), mtime_ns=info.st_mtime_ns,
                    status='matches' if expected == blob.hexdigest() else 'different-or-unmapped')
    except OSError as error:
        return dict(result, status='unreadable', error=str(error))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--manifest', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    inventory = json.loads(args.manifest.read_text())
    results = [inspect(entry) for entry in inventory['unreadable']]
    counts = {key: sum(row['status'] == key for row in results)
              for key in sorted({row['status'] for row in results})}
    report = {'schema': 1, 'date': '2026-10-14', 'sourceInventory': str(args.manifest),
              'verification': 'actual downloaded bytes versus Git blob identity',
              'summary': counts, 'files': results}
    args.output.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps(counts, ensure_ascii=False))
    raise SystemExit(0 if counts.get('matches', 0) == len(results) else 1)
