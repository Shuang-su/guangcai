import json,re,hashlib
from pathlib import Path
session=Path('/Users/shuangsu/.codex/sessions/2026/09/21/rollout-2026-09-21T14-43-34-01a0c2b4-a71f-75e2-95f0-737a645229ea.jsonl')
notes=[]
for line in session.open():
 try:d=json.loads(line)
 except:continue
 p=d.get('payload',{})
 if p.get('type')=='function_call' and 'image_gen__imagegen' in str(p.get('arguments','')):
  a=p['arguments']
  # Store only arguments passed to image generation, excluding unrelated tool commands.
  match=re.search(r'image_gen__imagegen\((\{[\s\S]*?\})\)',a)
  if match:notes.append(match.group(1))
base=Path('assets/masters');(base/'generation-prompts.md').write_text('# 花纸生成记录\n\n两张母版由本次会话的图像生成工具依据产品照片生成；生成内容并非官方花纸扫描。\n\n'+''.join(f'## 生成 {i+1}\n\n```json\n{t}\n```\n\n' for i,t in enumerate(notes)))
refs=[]
for name in ['IMG_0962.PNG','IMG_0961.PNG','IMG_0960.PNG','IMG_0958.PNG','IMG_0965.PNG','IMG_0964.PNG','IMG_0963.PNG','IMG_0959.PNG']:
 p=Path('/Users/shuangsu/Downloads')/name
 refs.append({'file':name,'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()})
(base/'references.json').write_text(json.dumps(refs,ensure_ascii=False,indent=2))
print('Prompts',len(notes),'references',len(refs))
