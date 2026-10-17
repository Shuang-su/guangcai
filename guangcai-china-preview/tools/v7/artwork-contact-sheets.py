"""Readable evidence only; production fill changes stay in reviewed SVG layers."""
from pathlib import Path
import json,sys
import numpy as np
from PIL import Image,ImageDraw,ImageFont
sys.dont_write_bytecode=True
import importlib.util
spec=importlib.util.spec_from_file_location('city_audit',Path(__file__).with_name('audit-city-fill.py'));module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module);inspect=module.inspect
ROOT=Path(__file__).resolve().parents[2];OUT=ROOT/'evidence/v7.1.2';FONT=ImageFont.truetype(str(ROOT/'assets/source/v7.1.2/fonts/SourceHanSerifCN-Bold.otf'),20)
def manifest(v):
 root=ROOT/'public/releases'/v;c=json.loads((root/'catalog.json').read_text());return root,json.loads((root/c['manifestUrl']).read_text())
a,old=manifest('v7-2');b,new=manifest('v7-3');post=[]
for city,box in [('xiamen',(900,1390,1130,1580)),('xian',(2250,1540,2380,1630))]:
 sheet=Image.new('RGB',(1000,500),'#faf6eb');draw=ImageDraw.Draw(sheet)
 for i,(root,m,label) in enumerate([(a,old,'修复前 v7-2'),(b,new,'修复后 v7-3')]):
  im=Image.open(root/m['cities'][city]['levels']['detail']['mask']['url']).convert('RGB');ar=np.asarray(im);rgb=np.zeros_like(ar);rgb[ar[:,:,1]>127]=[0,180,60];rgb[ar[:,:,0]>127]=[255,220,50]
  crop=Image.fromarray(rgb).crop(box);scale=min(470/crop.width,410/crop.height);crop=crop.resize((int(crop.width*scale),int(crop.height*scale)),Image.Resampling.NEAREST);sheet.paste(crop,(i*500+15,60));draw.text((i*500+15,15),label,font=FONT,fill='#302c26')
 sheet.save(OUT/f'{city}-before-after.png')
 for tier,level in new['cities'][city]['levels'].items():
  holes,gaps=inspect(np.asarray(Image.open(b/level['mask']['url']).convert('RGB')));post.append({'city':city,'tier':tier,'closedHoles':[{k:v for k,v in r.items() if k!='runs'} for r in holes],'openCandidates':gaps})
assert not next(r for r in post if r['city']=='xian' and r['tier']=='detail')['closedHoles']
(OUT/'cities/after.json').write_text(json.dumps(post,ensure_ascii=False,indent=2)+'\n')
sheet=Image.new('RGB',(6*240,820),'#f8f5ef');draw=ImageDraw.Draw(sheet)
for i,(ident,s) in enumerate(new['slogans'].items()):
 mask=Image.open(b/s['asset']['url']).convert('L');mask.thumbnail((210,720),Image.Resampling.LANCZOS);gold=Image.new('RGB',mask.size,'#c49533');sheet.paste(gold,(i*240+15,65),mask);draw.text((i*240+25,20),s['text'],font=FONT,fill='#362e21')
sheet.save(OUT/'slogans-contact.png')
print('after repair scans and visual comparisons written')
