"""Read-only byte-duplicate audit; write only explicit JSON output, never delete."""
import argparse
import collections
import hashlib
import json
import pathlib
import stat
import subprocess

parser = argparse.ArgumentParser()
parser.add_argument("--root", required=True, type=pathlib.Path)
parser.add_argument("--output", required=True, type=pathlib.Path)
args = parser.parse_args()
root = args.root.resolve()
args.output.mkdir(parents=True, exist_ok=True)
globs = ["**/.git/**", "**/node_modules/**", "**/._*", "**/.DS_Store",
         "**/.netlify/**", "**/.env*", "**/20261015-duplicate-audit/**",
         "**/20261015-attachment-resolution-and-duplicates/**"]
cmd = ["rg", "--files", "--hidden", "--no-ignore", "-0"]
for g in globs:
    cmd += ["-g", "!" + g]
cmd += ["."]
paths = subprocess.run(cmd, cwd=root, check=True, capture_output=True).stdout.split(b"\0")
rows, errors = [], []
excluded = 0
for raw in paths:
    if not raw:
        continue
    rel = pathlib.Path(raw.decode())
    parts = rel.parts
    dependency = any(p in {".venv", "venv", "_cacache", "_npx", "ms-playwright", "pip", "__pycache__"} for p in parts)
    # Browser binaries under cache/playwright are disposable dependencies;
    # output/playwright holds acceptance evidence and MUST remain in this audit.
    browser_cache = any(parts[n:n+2] == ("cache", "playwright") for n in range(len(parts)-1))
    if str(rel).startswith("历史工程/本地恢复资料/") or dependency or browser_cache:
        excluded += 1
        continue
    path = root / rel
    try:
        s = path.lstat()
        if not stat.S_ISREG(s.st_mode):
            continue
        cloud = bool(getattr(s, "st_flags", 0) & getattr(stat, "SF_DATALESS", 0x40000000))
        if cloud:
            raise ValueError("cloud placeholder")
        rows.append(dict(path=str(rel), bytes=s.st_size, allocatedBytes=s.st_blocks*512,
                         mtimeNs=s.st_mtime_ns, device=s.st_dev, inode=s.st_ino, cloud=False))
    except Exception as e:
        errors.append(dict(path=str(rel), error=str(e)))
by_size = collections.defaultdict(list)
for r in rows:
    by_size[r["bytes"]].append(r)
by_hash = collections.defaultdict(list)
hashed_count = hashed_bytes = 0
for size, items in by_size.items():
    if len(items) < 2:
        continue
    for r in items:
        p = root / r["path"]
        try:
            before = p.stat()
            if (before.st_size, before.st_mtime_ns) != (r["bytes"], r["mtimeNs"]):
                raise ValueError("changed since inventory")
            with p.open("rb") as f:
                digest = hashlib.file_digest(f, "sha256").hexdigest()
            after = p.stat()
            if (after.st_size, after.st_mtime_ns) != (before.st_size, before.st_mtime_ns):
                raise ValueError("changed while hashing")
            by_hash[digest].append(r)
            hashed_count += 1
            hashed_bytes += size
        except Exception as e:
            errors.append(dict(path=r["path"], error=str(e)))
groups = []
for digest, items in by_hash.items():
    if len(items) < 2:
        continue
    physical = {(r["device"], r["inode"]):r for r in items}
    allocations = [r["allocatedBytes"] for r in physical.values()]
    groups.append(dict(sha256=digest, bytesPerFile=items[0]["bytes"], files=items,
                       copies=len(items), physicalCopies=len(physical),
                       redundantLogicalBytes=items[0]["bytes"]*(len(physical)-1),
                       redundantAllocatedUpperBound=sum(allocations)-min(allocations)))
groups.sort(key=lambda g: (-g["redundantAllocatedUpperBound"], g["sha256"]))
summary = dict(date="2026-10-15", root=str(root), inventoriedFiles=len(rows),
               inventoriedLogicalBytes=sum(r["bytes"] for r in rows),
               inventoriedAllocatedBytes=sum(r["allocatedBytes"] for r in rows),
               hashedFiles=hashed_count, hashedBytes=hashed_bytes, duplicateGroups=len(groups),
               filesInDuplicateGroups=sum(g["copies"] for g in groups),
               redundantLogicalBytes=sum(g["redundantLogicalBytes"] for g in groups),
               redundantAllocatedUpperBound=sum(g["redundantAllocatedUpperBound"] for g in groups),
               errors=errors, excluded="Git internals, dependencies, cache/playwright browser binaries (not output/playwright evidence), AppleDouble, Finder metadata, .netlify, .env names, local-only recovery records, this audit output; no symlink traversal.",
               deletedFiles=0, notADeletionAllowlist=True)
for name, value in [("inventory.json",dict(root=str(root),rows=rows,excluded=excluded,errors=errors)),
                    ("duplicates.json",dict(summary=summary,groups=groups))]:
    (args.output/name).write_text(json.dumps(value,ensure_ascii=False,indent=2)+"\n")
print(json.dumps(summary,ensure_ascii=False,indent=2))
if errors:
    raise SystemExit(1)
