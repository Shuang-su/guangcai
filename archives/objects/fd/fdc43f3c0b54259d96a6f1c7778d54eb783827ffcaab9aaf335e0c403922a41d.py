import json,re,os,subprocess
from pathlib import Path
root=Path('/Volumes/Prism/Codex/guangcai-viewer-20260929')
old='/Users/shuangsu/Documents/Codex/2026-09-29/3d-vite-typescript-three-js-buffergeometry'
log=Path('/Users/shuangsu/.codex/sessions/2026/09/29/rollout-2026-09-29T19-56-52-01a0ed06-5ea9-7532-a412-9c5a7a53716e.jsonl')
selected={99,107,131,140,148,215,230,245,309,461,508,515,521,577,592,615,622,682,707,738,753,787,795,809,819,847,902,909,915,1013,1047,1110,1118,1131,1198,1205,1212,1219,1242,1249,1256,1296,1309,1324,1338,1352,1411,1435}
issues=[]
def apply_patch(patch):
 lines=patch.splitlines();i=1
 while i<len(lines) and lines[i]!='*** End Patch':
  header=lines[i];kind,path=header[4:].split(' File: ',1);i+=1
  if path.startswith(old):path=str(root)+path[len(old):]
  p=Path(path);p=p if p.is_absolute() else root/p
  assert p.is_relative_to(root),p
  body=[]
  while i<len(lines) and not lines[i].startswith('*** '):body.append(lines[i]);i+=1
  if kind=='Add':p.parent.mkdir(parents=True,exist_ok=True);p.write_text('\n'.join(x[1:] for x in body)+'\n');continue
  assert kind=='Update',kind
  src=p.read_text().splitlines();cursor=0
  for chunk in re.split(r'(?m)^@@[^\n]*\n?', '\n'.join(body)):
   if not chunk:continue
   ls=chunk.splitlines();before=[x[1:] for x in ls if x[:1] in (' ','-')];after=[x[1:] for x in ls if x[:1] in (' ','+')]
   found=None
   for j in range(cursor,len(src)-len(before)+1):
    if src[j:j+len(before)]==before:found=j;break
   if found is None:raise ValueError(f'context missing {p} {before[:2]}')
   src[found:found+len(before)]=after;cursor=found+len(after)
  p.write_text('\n'.join(src)+'\n')
for i,line in enumerate(log.open()):
 if i>1435:break
 if i not in selected:continue
 v=json.loads(line)['payload'];a=v.get('arguments',v.get('input',''))
 for m in re.finditer(r'tools\.apply_patch\(("(?:\\.|[^"\\])*")\)',a):
  try:apply_patch(json.loads(m[1]));print(i,'patch ok',flush=True)
  except Exception as e:issues.append([i,str(e)]);print(i,'ERROR',e,flush=True)
 for n,m in enumerate(re.finditer(r'tools\.exec_command\(\{cmd:("(?:\\.|[^"\\])*")',a)):
  cmd=json.loads(m[1]);tail=a[m.end():].split('}));',1)[0];w=re.search(r'"?workdir"?\s*:\s*("(?:\\.|[^"\\])*")',tail);wd=json.loads(w[1]) if w else old
  cwd=Path(wd.replace(old,str(root)));cwd.mkdir(parents=True,exist_ok=True);os.chdir(cwd)
  if i==1242:Path('tools/fit-other-calibrations.ts').write_text(Path('tools/fit-calibration.ts').read_text())
  # Restore only reviewed source-writing heredocs, never full commands or npm/CLI actions.
  blocks=re.finditer(r"(?m)^(cat > ([^\n]+?) <<'(\w+)'|python3 - <<'(\w+)')\n",cmd)
  for b in blocks:
   end=cmd.index('\n'+(b[3] or b[4]),b.end());content=cmd[b.end():end]
   try:
    if b[2]:
     p=Path(b[2]);p.parent.mkdir(parents=True,exist_ok=True);p.write_text(content+'\n')
    else:
     if i==1013:continue
     exec(compile(content,f'recovery-{i}-{n}','exec'),{'__name__':'__main__'})
   except Exception as e:issues.append([i,str(e)]);print(i,'ERROR',e,flush=True)
  if i==787 and 'cat > work/refine_latest.py' in cmd:exec(compile(Path('work/refine_latest.py').read_text(),'refine_latest.py','exec'),{'__name__':'__main__'})
  if i==1242:
   # The command copies the fitting template before editing it; handled separately on second pass below.
   pass
  print(i,'heredocs restored',flush=True)
(root/'work/recovery/issues.json').write_text(json.dumps(issues,ensure_ascii=False,indent=2));print('issues',issues)
