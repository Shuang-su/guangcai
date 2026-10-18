#!/usr/bin/env python3
"""Archive valid AppleDouble pack companions before/after a Git command.

No arguments performs cleanup only. Other arguments are passed to Git verbatim.
Real Git packs/indexes, unknown files and symlinks are never removed.
"""
import datetime
import hashlib
import json
import os
from pathlib import Path
import re
import stat
import struct
import subprocess
import sys

NAME = re.compile(r'^\._pack-[0-9a-f]{40,64}\.(?:idx|pack|rev|promisor|keep|bitmap|mtimes)$')
WARNING = re.compile(r'^error: non-monotonic index (.+)$')
MAX_METADATA_BYTES = 16 * 1024 * 1024


def git_common_dir(root):
    gitdir = root / '.git'
    if gitdir.is_file():
        text = gitdir.read_text().strip()
        if not text.startswith('gitdir: ') or '\n' in text:
            raise ValueError('Invalid worktree Git pointer')
        gitdir = (root / text[8:]).resolve()
    if not gitdir.is_dir():
        raise ValueError('Not a Git checkout')
    common = gitdir / 'commondir'
    if common.is_file():
        gitdir = (gitdir / common.read_text().strip()).resolve()
    if not (gitdir / 'objects/pack').is_dir():
        raise ValueError('Git pack directory is unavailable')
    return gitdir


def is_appledouble(data):
    if len(data) < 26:
        return False
    magic, version = struct.unpack_from('>II', data)
    count = struct.unpack_from('>H', data, 24)[0]
    header_end = 26 + count * 12
    if magic != 0x00051607 or version != 0x00020000 or not count or header_end > len(data):
        return False
    for i in range(count):
        _, offset, length = struct.unpack_from('>III', data, 26 + 12 * i)
        if offset < header_end or offset + length > len(data):
            return False
    return True


def read_metadata(path):
    with open(path, 'rb', opener=lambda p, flags: os.open(p, flags | os.O_NOFOLLOW)) as f:
        info = os.fstat(f.fileno())
        if not stat.S_ISREG(info.st_mode) or info.st_size > MAX_METADATA_BYTES:
            raise ValueError('Refusing non-regular or oversized metadata: ' + str(path))
        data = f.read(MAX_METADATA_BYTES + 1)
    if not is_appledouble(data):
        raise ValueError('Refusing file without a valid AppleDouble header: ' + str(path))
    return data


def clean(root):
    root = root.resolve()
    packdir = git_common_dir(root) / 'objects/pack'
    backupdir = root / '.codex-work/receipts/git-appledouble'
    removed = []
    error = None
    try:
        for path in sorted(packdir.glob('._pack-*')):
            if not NAME.fullmatch(path.name):
                raise ValueError('Refusing unexpected Git companion name: ' + str(path))
            original = path.with_name(path.name[2:])
            if path.is_symlink() or original.is_symlink() or not original.is_file():
                raise ValueError('Refusing symlink or missing real pack counterpart: ' + str(path))
            original_info = original.stat()
            data = read_metadata(path)
            sha = hashlib.sha256(data).hexdigest()
            backupdir.mkdir(parents=True, exist_ok=True)
            backup = backupdir / (sha + '.appledouble')
            if not backup.exists():
                with backup.open('xb') as f:
                    f.write(data)
                    f.flush()
                    os.fsync(f.fileno())
            if backup.is_symlink() or backup.read_bytes() != data:
                raise ValueError('Metadata backup verification failed: ' + str(backup))
            now = original.stat()
            if (now.st_size, now.st_mtime_ns) != (original_info.st_size, original_info.st_mtime_ns):
                raise ValueError('Real pack changed concurrently; retry when Git is idle')
            if read_metadata(path) != data:
                raise ValueError('Metadata changed concurrently; retry when Git is idle')
            path.unlink()
            removed.append({'path': str(path), 'sha256': sha, 'backup': str(backup), 'bytes': len(data)})
    except Exception as exc:
        error = str(exc)
        raise
    finally:
        if removed or error:
            backupdir.mkdir(parents=True, exist_ok=True)
            stamp = datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%S%fZ')
            receipt = {'removedMetadata': removed, 'error': error, 'realGitFilesRemoved': 0}
            (backupdir / f'{stamp}-{os.getpid()}.json').write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + '\n')
    return removed


def run(root, args, git='git'):
    before = clean(root)
    if not args:
        print(f'Archived and removed {len(before)} Git metadata companions; real Git files unchanged.')
        return 0
    # Preserve stdout (including binary `git show` output) and the original Git exit code.
    result = subprocess.run([git, '-C', str(root), *args], stderr=subprocess.PIPE)
    try:
        after = clean(root)
    except (OSError, ValueError):
        sys.stderr.buffer.write(result.stderr)
        sys.stderr.buffer.flush()
        raise
    cleaned = {Path(r['path']).resolve() for r in before + after}
    filtered = 0
    for line in result.stderr.splitlines(keepends=True):
        match = WARNING.fullmatch(line.decode(errors='replace').rstrip('\r\n'))
        target = (root / match[1]).resolve() if match else None
        if result.returncode == 0 and target in cleaned:
            filtered += 1
        else:
            sys.stderr.buffer.write(line)
    sys.stderr.buffer.flush()
    if before or after or filtered:
        print(f'Git metadata: preserved {len(before) + len(after)} companions; '
              f'condensed {filtered} matching metadata-only diagnostics; Git exit {result.returncode}.', file=sys.stderr)
    return result.returncode


if __name__ == '__main__':
    try:
        raise SystemExit(run(Path(__file__).resolve().parents[1], sys.argv[1:]))
    except (OSError, ValueError) as exc:
        print('Git metadata cleanup stopped: ' + str(exc), file=sys.stderr)
        raise SystemExit(2)
