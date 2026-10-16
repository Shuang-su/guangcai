import json,re,os,subprocess
from pathlib import Path
session=Path('/Users/shuangsu/.codex/sessions/2026/09/21/rollout-2026-09-21T14-43-34-01a0c2b4-a71f-75e2-95f0-737a645229ea.jsonl')
root=Path('/Volumes/Prism/GuangcaiCeramic/guangcai-viewer');old='/Users/shuangsu/Documents/New project/.codex-work/worktrees/guangcai/guangcai-viewer'
os.chdir(root);counts={'patches':0,'files':0,'updates':0}
def patch(text):
 lines=text.splitlines();i=0
 while i<len(lines):
  line=lines[i]
  if line.startswith('*** Add File: '):
   filename=line.split(': ',1)[1];i+=1;content=[]
   while i<len(lines) and not lines[i].startswith('*** '):content.append(lines[i][1:]);i+=1
   if filename.startswith(old):
    p=Path(filename.replace(old,str(root),1));p.parent.mkdir(parents=True,exist_ok=True);p.write_text('\n'.join(content)+'\n');counts['files']+=1
  elif line.startswith('*** Update File: '):
   filename=line.split(': ',1)[1];p=Path(filename.replace(old,str(root),1));i+=1
   if not filename.startswith(old):continue
   text=p.read_text()
   while i<len(lines) and not lines[i].startswith('*** '):
    if lines[i].startswith('@@'):i+=1
    before=[];after=[]
    while i<len(lines) and not lines[i].startswith('@@') and not lines[i].startswith('*** '):
     t=lines[i];i+=1
     if t.startswith((' ','-')):before.append(t[1:])
     if t.startswith((' ','+')):after.append(t[1:])
    a='\n'.join(before);b='\n'.join(after)
    if a not in text:raise RuntimeError('Unmatched patch '+str(p))
    text=text.replace(a,b,1)
   p.write_text(text);counts['updates']+=1
  else:i+=1
for line in session.open():
 o=json.loads(line);v=o.get('payload',{})
 if o.get('type')!='response_item' or v.get('type')!='custom_tool_call' or v.get('name')!='exec':continue
 code=v.get('input','')
 if 'recovery.py' in code:continue
 for m in re.finditer(r'tools\.apply_patch\(("(?:\\.|[^"\\])*")\)',code):patch(json.loads(m.group(1)));counts['patches']+=1
 for m in re.finditer(r'cmd:("(?:\\.|[^"\\])*")',code):
  cmd=json.loads(m.group(1))
  for f,tag,body in re.findall(r"cat > ([^\s]+) <<'([A-Z]+)'\n(.*?)\n\2",cmd,re.S):
   if f.startswith(('tools/','tests/','.codex-work/qa/')) or f=='vite.config.ts':p=root/f;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(body+'\n');counts['files']+=1
  for py in re.findall(r"python3 - <<'PY'\n(.*?)\nPY",cmd,re.S):
   if "p='src/" not in py and "p=Path('src/" not in py and "p='tools/" not in py:continue
   if 'ktx-unpacked' in py:py="from pathlib import Path\n"+py[py.index("p=Path('src/"):]
   subprocess.run(['/usr/bin/python3','-c',py],cwd=root,check=True);counts['updates']+=1
print(counts)
