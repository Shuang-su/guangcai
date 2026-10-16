from pathlib import Path
import os, hashlib, json, time, collections
ROOT=Path('/Volumes/Prism_初号機/广彩/guangcai-v4-workspace')
roots={
 'original-materials':'/Volumes/Prism_初号機/广彩',
 'prism-formal':'/Volumes/Prism/Codex/guangcai-github-20261013',
 'prism-viewer':'/Volumes/Prism/Codex/guangcai-viewer-20260929',
 'prism-prototype':'/Volumes/Prism/Codex/3d-vite-typescript-three-js-buffergeometry',
 'prism-ceramic':'/Volumes/Prism/GuangcaiCeramic',
 'internal-beijing':'/Users/shuangsu/Documents/Codex/guangcai-beijing-4.3',
 'legacy-main-worktree':'/Volumes/Prism/Codex/guangcai-github-20261013/.codex-work/main-index',
 'legacy-history-worktree':'/Volumes/Prism/Codex/guangcai-github-20261013/.codex-work/reconstruction',
 'formal-target':str(ROOT),
}
known={}
for line in (ROOT/'.codex-work/tmp/reachable-objects.txt').read_text().splitlines():
 oid,_,name=line.partition(' ');known[oid]=name
skip_dirs={'.git','node_modules','.codex-work','.netlify','.venv','venv','__pycache__','.pytest_cache'}
rows=[];excluded=[];errors=[]
for label,root in roots.items():
 root=Path(root)
 if not root.exists():errors.append({'root':str(root),'error':'missing'});continue
 for base,ds,fs in os.walk(root):
  for d in ds[:]:
   p=Path(base)/d
   if d in skip_dirs or (label=='original-materials' and d=='guangcai-v4-workspace'):
    ds.remove(d);excluded.append({'path':str(p),'reason':'dependency/cache/metadata/credentials or separately inventoried worktree'})
  for name in fs:
   p=Path(base)/name
   if name.startswith('._') or name in ('.DS_Store','.git') or name.startswith('.env'):
    excluded.append({'path':str(p),'reason':'filesystem metadata / git pointer / environment'});continue
   if p.is_symlink():
    excluded.append({'path':str(p),'reason':'symlink (not followed)','target':os.readlink(p)});continue
   if 'docs/changes/20261014-source-consolidation' in str(p):continue
   try:
    st=p.stat()
    if getattr(st,'st_flags',0)&0x40000000:
     errors.append({'path':str(p),'error':'dataless cloud placeholder; content not locally verified','bytes':st.st_size});continue
    h=hashlib.sha256();g=hashlib.sha1(f'blob {st.st_size}\0'.encode())
    with p.open('rb') as f:
     for chunk in iter(lambda:f.read(4*1024**2),b''):h.update(chunk);g.update(chunk)
    oid=g.hexdigest()
    rows.append({'root':label,'relative':str(p.relative_to(root)),'path':str(p),'bytes':st.st_size,'allocated':st.st_blocks*512,'mtime_ns':st.st_mtime_ns,'sha256':h.hexdigest(),'gitBlob':oid,'reachable':oid in known,'gitPath':known.get(oid)})
   except Exception as e:errors.append({'path':str(p),'error':str(e)})
 print(label, len(rows), flush=True)
groups=collections.defaultdict(list)
for row in rows:groups[row['sha256']].append(row)
missing=[r[0] for r in groups.values() if not any(x['reachable'] for x in r)]
report={'roots':roots,'files':rows,'excluded':excluded,'errors':errors,'summary':{'files':len(rows),'unique':len(groups),'missingUnique':len(missing),'missingBytes':sum(r['bytes'] for r in missing),'missingLargeFiles':[{k:r[k] for k in ['path','bytes','sha256']} for r in missing if r['bytes']>100*1024**2]}}
(ROOT/'.codex-work/tmp/source-audit.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(report['summary'],ensure_ascii=False),flush=True)
