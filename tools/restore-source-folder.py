"""Restore an archived source folder without executing old scripts.

Example: python3 tools/restore-source-folder.py prism-viewer /path/to/empty-folder
Use --list to list supported source roots. Git metadata, credentials and dependencies
are deliberately separate. Requires local Git LFS objects for large source files.
"""
import argparse,hashlib,json,os,shutil,subprocess
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('source',nargs='?');parser.add_argument('destination',nargs='?');parser.add_argument('--list',action='store_true');parser.add_argument('--prefix',default='')
    args=parser.parse_args()
    manifest=json.loads((ROOT/'docs/changes/20261014-source-consolidation/source-manifest.json').read_text())
    if args.list:print(json.dumps(manifest['roots'],ensure_ascii=False,indent=2));return
    if not args.source or not args.destination:parser.error('source and destination are required')
    if args.source not in manifest['roots']:parser.error('unknown source root')
    dest=Path(args.destination).resolve();assert not dest.exists() or not any(dest.iterdir()),'Destination must be empty'
    wanted={}
    for entry in manifest['content']:
        for alias in entry['sources']:
            if alias['root']==args.source:
                rel=Path(alias['relative']);assert not rel.is_absolute() and '..' not in rel.parts
                if args.prefix:
                    prefix=Path(args.prefix);assert not prefix.is_absolute() and '..' not in prefix.parts
                    if not rel.is_relative_to(prefix):continue
                    rel=rel.relative_to(prefix)
                wanted[rel]=(entry,alias)
    assert wanted,'No archived files for source'
    dest.mkdir(parents=True,exist_ok=True)
    required=sum(e['bytes'] for e,_ in wanted.values())
    assert shutil.disk_usage(dest).free>required*1.3+256*1024**2,'Insufficient free space'
    common=Path(subprocess.check_output(['git','rev-parse','--git-common-dir'],cwd=ROOT).decode().strip())
    if not common.is_absolute():common=ROOT/common
    for rel,(entry,alias) in wanted.items():
        sha=entry['sha256']
        if entry['storage']=='git-lfs':
            raw=(common/'lfs/objects'/sha[:2]/sha[2:4]/sha).read_bytes()
        else:raw=subprocess.check_output(['git','cat-file','blob',entry['gitBlob']],cwd=ROOT)
        assert len(raw)==entry['bytes'] and hashlib.sha256(raw).hexdigest()==sha
        p=dest/rel;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(raw)
        if alias.get('mtime_ns'):os.utime(p,ns=(alias['mtime_ns'],alias['mtime_ns']))
    print(json.dumps({'restoredFiles':len(wanted),'bytes':required,'destination':str(dest)},ensure_ascii=False))
if __name__=='__main__':main()
