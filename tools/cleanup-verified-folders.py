"""One-shot, allowlisted 2026-10-14 cleanup; refuses changed/unarchived files.

Requires the recorded byte audit, local recovery copies and verified Git backup.
Does not traverse other projects, the current checkout, or New project/.git.
"""
import hashlib,json,os,shutil,subprocess,time
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
D=ROOT/'docs/changes/20261014-workspace-cleanup'
CURRENT=ROOT.parent.parent
DELETE_ROOTS=[Path(p) for p in (
 '/Volumes/Prism/Codex/guangcai-github-20261013',
 '/Volumes/Prism/Codex/guangcai-viewer-20260929',
 '/Volumes/Prism/Codex/3d-vite-typescript-three-js-buffergeometry',
 '/Volumes/Prism_初号機/广彩/guangcai-china-v3',
)]
INTERNAL=Path('/Users/shuangsu/Documents/Codex/guangcai-beijing-4.3')
def sha(p):
 h=hashlib.sha256()
 with p.open('rb') as f:
  for b in iter(lambda:f.read(4*1024**2),b''):h.update(b)
 return h.hexdigest()
def eligible(p):return any(p.is_relative_to(r) for r in DELETE_ROOTS)
def main():
 audit=json.loads((D/'file-verification.json').read_text())
 assert not audit['errors'] and not audit['dataless']
 manifest=json.loads((ROOT/'docs/changes/20261014-source-consolidation/source-manifest.json').read_text())
 hashes={r['sha256'] for r in manifest['content']}
 recovery=json.loads((D/'local-recovery.json').read_text())
 local={r['source']:r for r in recovery}
 for r in recovery:assert sha(Path(r['destination']))==r['sha256']
 backup=Path('/Volumes/Prism_初号機/广彩/历史工程/Git元数据/guangcai-github-20261013.git.tar.gz')
 assert sha(backup)=='e6a5d29cdab1c44628b5452cf8cbfd4542fa3615347101c30a83d05d7f03c624'
 rows=audit['verified']+audit['unknown']
 for r in rows:
  p=Path(r['path'])
  if not (eligible(p) or p.is_relative_to(INTERNAL)):continue
  assert r['sha256'] in hashes or (str(p) in local and local[str(p)]['sha256']==r['sha256']),p
  assert p.is_file() and not p.is_symlink() and sha(p)==r['sha256'],f'Changed file: {p}'
 # No process may hold an old source directory as its working directory.
 cwd=subprocess.check_output(['lsof','-n','-d','cwd','-Fn']).decode(errors='replace')
 for r in DELETE_ROOTS+[INTERNAL]:assert '\nn'+str(r) not in cwd,f'Active process: {r}'
 result={'started':time.strftime('%Y-%m-%dT%H:%M:%S%z'),'deletedFiles':0,'dependencyPaths':[],'remaining':[]}
 report=D/'physical-cleanup.json'
 def save():report.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
 save()
 # Git manages its own linked-worktree registration; no force removal.
 clean=subprocess.check_output(['git','status','--porcelain'],cwd=INTERNAL).decode()
 assert not clean,clean
 subprocess.run(['git','worktree','remove',str(INTERNAL)],cwd=CURRENT,check=True)
 result['internalWorktreeRemoved']=not INTERNAL.exists();save()
 for r in rows:
  p=Path(r['path'])
  if eligible(p):p.unlink();result['deletedFiles']+=1
 # Only inventoried reinstallable dependencies, never the whole work cache.
 for path in audit['reinstallable']:
  p=Path(path)
  if not p.exists() and not p.is_symlink():continue
  if not (eligible(p) or p.is_relative_to(Path('/Volumes/Prism/GuangcaiCeramic'))):continue
  if p.is_symlink() or p.is_file():p.unlink()
  else:shutil.rmtree(p)
  result['dependencyPaths'].append(path)
 for r in audit['links']:
  p=Path(r['path'])
  if eligible(p) and p.is_symlink():assert os.readlink(p)==r['target'];p.unlink()
 for s in audit['metadata']:
  p=Path(s)
  if eligible(p) and p.exists():p.unlink()
 for s in audit['protected']:
  p=Path(s)
  if not eligible(p):continue
  if p.name=='.git' and p.is_dir():shutil.rmtree(p) # exact verified metadata backup
  elif p.name=='.git' and p.is_file():assert str(p) in local;p.unlink()
  elif p.name=='.netlify':
   for f in p.rglob('*'):
    if f.is_file():assert str(f) in local and sha(f)==local[str(f)]['sha256'];f.unlink()
 for root in DELETE_ROOTS:
  for base,ds,fs in os.walk(root,topdown=False):
   p=Path(base)
   try:p.rmdir()
   except OSError:pass
  if root.exists():result['remaining'] += [str(p) for p in root.rglob('*') if p.is_file() or p.is_symlink()]
 result['finished']=time.strftime('%Y-%m-%dT%H:%M:%S%z')
 result['freeAfter']={v:shutil.disk_usage(v).free for v in ('/System/Volumes/Data','/Volumes/Prism','/Volumes/Prism_初号機')};save()
 print(json.dumps({k:v for k,v in result.items() if k!='dependencyPaths'},ensure_ascii=False))
if __name__=='__main__':main()
