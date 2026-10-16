"""Offline text-only replay. No historical shell commands, deploys or network run.
Path and shutil refer only to an in-memory map; source reads from archive fallback
are logged. Only curated source stages are exported under this scratch directory.
"""
import ast, builtins, fnmatch, hashlib, io, json, os, posixpath, re, subprocess, types
from pathlib import Path as RealPath

ROOT=RealPath(__file__).resolve().parents[2]
HERE=RealPath(__file__).resolve().parent
OLD='/Users/shuangsu/Documents/Codex/2026-09-29/3d-vite-typescript-three-js-buffergeometry'
LIVE='/Volumes/Prism/Codex/guangcai-viewer-20260929'
tracked=lambda p: bool(re.match(r'^(src/|tools/|package(?:-lock)?\.json$|index\.html$|compare\.html$|tsconfig\.json$|vite\.config\.ts$|netlify\.toml$)',p))

class Replay:
 def __init__(self,name,initial=None):
  self.name=name;self.project='guangcai-viewer' if name=='original' else 'guangcai-china-preview'
  self.data=dict(initial or {});self.fallback={};self.reads=[];self.events=[];self.errors=[];self.cwd='';self.line=0
  for folder in [self.project,'evidence']:
   for f in (ROOT/folder).rglob('*'):
    if f.is_symlink() or not f.is_file() or any(x in f.parts for x in ['node_modules','.codex-work','dist']):continue
    if f.stat().st_size>1000000:continue
    try:s=f.read_text()
    except (UnicodeDecodeError,OSError):continue
    self.fallback[(str(f.relative_to(ROOT/self.project)) if folder==self.project else '../'+str(f.relative_to(ROOT)))]=s
  for f in (RealPath(LIVE)/'work/recovery').glob('*'):
   if f.is_file():self.fallback['../../work/recovery/'+f.name]=f.read_text()
  self.Path=self.make_path()
 def normalize(self,p):
  p=str(p).replace(OLD,LIVE)
  if p.startswith(LIVE+'/outputs/'+self.project+'/'):p=p.split('/outputs/'+self.project+'/',1)[1]
  elif p==LIVE+'/outputs/'+self.project:p='.'
  elif p.startswith(LIVE+'/outputs/'):p='../'+p.split('/outputs/',1)[1]
  elif p=='outputs/'+self.project:p='.'
  elif p.startswith('outputs/'+self.project+'/'):p=p.split('outputs/'+self.project+'/',1)[1]
  elif p.startswith('outputs/'):p='../'+p.split('outputs/',1)[1]
  elif p.startswith(LIVE+'/work/'):p='../../work/'+p.split('/work/',1)[1]
  elif p.startswith('work/'):p='../../'+p
  elif p.startswith('/'):return 'UNAVAILABLE:'+p
  p=posixpath.normpath(p)
  if p=='../'+self.project:p='.'
  if p.startswith('../'+self.project+'/'):p=p[len('../'+self.project+'/'):]
  return p
 def read(self,p):
  if p in self.data:return self.data[p]
  if p in self.fallback:
   if tracked(p):self.reads.append({'line':self.line,'path':p})
   return self.fallback[p]
  raise FileNotFoundError(p)
 def write(self,p,s):
  self.data[p]=s
  if tracked(p):self.events.append({'line':self.line,'path':p,'sha256':hashlib.sha256(s.encode()).hexdigest()})
 def make_path(self):
  owner=self
  class Path:
   def __init__(self,*parts):self.p=owner.normalize(posixpath.join(*(str(p) for p in parts)))
   def __str__(self):return self.p
   def __fspath__(self):return self.p
   def __truediv__(self,x):return Path(self.p,str(x))
   def __lt__(self,x):return self.p<str(x)
   @property
   def name(self):return posixpath.basename(self.p)
   @property
   def parent(self):return Path(posixpath.dirname(self.p))
   def with_name(self,n):return self.parent/n
   def read_text(self,*a,**kw):return owner.read(self.p)
   def read_bytes(self):return self.read_text().encode()
   def write_text(self,s,*a,**kw):owner.write(self.p,s);return len(s)
   def write_bytes(self,s):return self.write_text(s.decode())
   def mkdir(self,*a,**kw):pass
   def exists(self):return self.p in owner.data or self.p in owner.fallback
   def is_file(self):return self.exists()
   def glob(self,p):return [Path(k) for k in sorted(set(owner.data)|set(owner.fallback)) if fnmatch.fnmatch(k,self.p+'/'+p)]
   def rglob(self,p):return [Path(k) for k in sorted(set(owner.data)|set(owner.fallback)) if k.startswith(self.p+'/') and fnmatch.fnmatch(posixpath.basename(k),p)]
   def relative_to(self,p):return Path(posixpath.relpath(self.p,str(p)))
  return Path
 def python(self,s):
  # Imports are a strict allowlist. Historical Python only edits virtual files.
  def cp(a,b,*args,**kw):return self.Path(b).write_bytes(self.Path(a).read_bytes())
  imports={'pathlib':types.SimpleNamespace(Path=self.Path),'json':json,'re':re,'hashlib':hashlib,'shutil':types.SimpleNamespace(copy2=cp,copyfile=cp),'datetime':__import__('datetime'),'math':__import__('math')}
  def imp(name,*a,**kw):
   if name not in imports:raise ImportError('disabled import '+name)
   return imports[name]
  env={'__builtins__':{k:v for k,v in vars(builtins).items() if k not in ['open','eval','exec','compile','input','__import__','breakpoint']},'__name__':'__replay__'}
  def vopen(p,mode='r',*a,**kw):
   p=self.normalize(p);owner=self
   class Buffer(io.StringIO):
    def close(buf):
     if not buf.closed and ('w' in mode or 'a' in mode):owner.write(p,buf.getvalue())
     super().close()
   buf=Buffer('' if 'w' in mode else self.read(p))
   if 'a' in mode:buf.seek(0,2)
   return buf
  env['__builtins__']['__import__']=imp;env['__builtins__']['print']=lambda *a,**k:None
  env['__builtins__']['open']=vopen
  tree=ast.parse(s)
  # Record each failed statement; later independent assignments may still restore
  # source. This is NOT considered proof of success: endpoints are checked below.
  for node in tree.body:
   try:exec(compile(ast.Module(body=[node],type_ignores=[]),'<historical-text>','exec'),env)
   except Exception as e:self.errors.append({'line':self.line,'pythonLine':node.lineno,'error':str(e)[:180]})
 def patch(self,s):
  lines=s.splitlines();i=1
  while i<len(lines) and lines[i]!='*** End Patch':
   h=lines[i];i+=1
   if not re.match(r'\*\*\* (Add|Update|Delete) File: ',h):continue
   kind,p=h[4:].split(' File: ',1);p=self.normalize(p);body=[]
   while i<len(lines) and not lines[i].startswith('*** '):body.append(lines[i]);i+=1
   if not tracked(p):continue
   try:
    if kind=='Add':self.write(p,'\n'.join(x[1:] for x in body)+'\n');continue
    if kind=='Delete':self.data.pop(p,None);continue
    src=self.read(p).splitlines();cursor=0
    for chunk in re.split(r'(?m)^@@[^\n]*\n?', '\n'.join(body)):
     if not chunk:continue
     ls=chunk.splitlines();before=[x[1:] for x in ls if x[:1] in (' ','-')];after=[x[1:] for x in ls if x[:1] in (' ','+')]
     found=next((j for j in range(cursor,len(src)-len(before)+1) if src[j:j+len(before)]==before),None)
     if found is None:raise ValueError('context missing '+str(before[:2]))
     src[found:found+len(before)]=after;cursor=found+len(after)
    self.write(p,'\n'.join(src)+'\n')
   except Exception as e:self.errors.append({'line':self.line,'patch':p,'error':str(e)[:300]})
 def command(self,s):
  # Only literal heredoc writes, Python virtual edits, and reviewed source copies.
  if self.name=='original' and self.line==1243:self.write('tools/fit-other-calibrations.ts',self.read('tools/fit-calibration.ts'))
  for m in re.finditer(r"(?m)^(cat >{1,2} ([^\n]+?) <<'?(\w+)'?|(?:python3|/[^\n ]*/python3) - <<'?(\w+)'?)\n",s):
   end=s.find('\n'+(m[3] or m[4]),m.end())
   if end<0:continue
   body=s[m.end():end]
   if m[2]:
    p=self.normalize(m[2])
    if tracked(p) or p.startswith('../../work/'):
     self.write(p,(self.read(p) if m[1].startswith('cat >>') else '')+body+'\n')
   elif any(x in body for x in ['write_text','write_bytes','open(']) and not any(x in body for x in ['codex/sessions','copytree(','staging=','release-manifest']):self.python(body)
  if self.name=='china':
   for m in re.finditer(r"(?m)^node --input-type=module(?: -)? <<'?(\w+)'?\n",s):
    end=s.find('\n'+m[1],m.end());body=s[m.end():end]
    if not ("readFile" in body and 'writeFile' in body and any(p in body for p in ['package.json','netlify.toml','tools/china-online-qa.mjs'])):continue
    result=json.loads(subprocess.run(['node',str(HERE/'replay-js.mjs')],input=json.dumps({'code':body,'data':self.data,'fallback':self.fallback}),text=True,capture_output=True,check=True).stdout)
    for p,txt in result['written'].items():self.write(self.normalize(p),txt)
    for e in result['errors']:self.errors.append({'line':self.line,'jsError':e})
 def save(self,key):
  d={k:v for k,v in self.data.items() if tracked(k)}
  (HERE/f'{self.name}-{key}.json').write_text(json.dumps(d,ensure_ascii=False,indent=2))
 def run(self,milestones,skip=None):
  ops=json.loads((HERE/f'{self.name}-operations.json').read_text());skip=skip or set()
  for idx,o in enumerate(ops):
   self.line=o['line']
   if self.line>max(milestones):break
   if self.line in skip:continue
   if o['tool']=='apply_patch':self.patch(o['input'])
   else:self.command(o['input'].get('cmd',''))
   if self.name=='original' and self.line==788:
    self.python(self.data.get('../../work/refine_latest.py',''))
   if self.name=='original' and self.line==1725:
    self.write('src/interaction/views.ts',self.fallback['../../work/recovery/exact-views.txt'])
   if self.line in milestones and (idx+1==len(ops) or ops[idx+1]['line']!=self.line):self.save(milestones[self.line])
  (HERE/f'{self.name}-replay-diagnostics.json').write_text(json.dumps({'errors':self.errors,'fallbackSourceReads':self.reads,'events':self.events},ensure_ascii=False,indent=2))

if __name__=='__main__':
 orig=Replay('original')
 orig.run({149:'01-initial',903:'02-refinement',1436:'03-saucer',2033:'04-handle-lid',2481:'05-dense',2809:'06-final'},skip={1014,1467,1641,1675,1744})
 china=Replay('china',{k:v for k,v in orig.fallback.items() if False})
 # China's observed creation was a copy of the released original. Seed it from
 # the verified source endpoint, independently of partial original replay.
 original=Replay('original').fallback
 china.data={k:v for k,v in original.items() if tracked(k)}
 china.run({275:'01-initial',444:'02-foot',562:'03-matte',652:'04-lines',954:'05-reflections',1476:'06-webp',1761:'07-pan',1986:'08-crops',2215:'09-relief',2349:'10-deeper',2675:'11-layout'},skip={199,2725})
