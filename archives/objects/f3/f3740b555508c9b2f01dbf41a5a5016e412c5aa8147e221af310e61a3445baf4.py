"""Check actual exported pigment at the formerly whitened architectural base."""
import json,os
from pathlib import Path
import numpy as np
from PIL import Image
root=Path(__file__).resolve().parents[1]
path=root/'public/cities/v4';catalog=json.loads((path/'catalog.json').read_text())
baseline_path=os.environ.get('BASELINE_CATALOG')
baseline=json.loads(Path(baseline_path).read_text()) if baseline_path else None
old={v['id']:v for v in baseline['variants']} if baseline else {}
affected={'china-green','china-red','china-purple','china-blue'};results=[]
for v in catalog['variants']:
 if baseline:
  assert v['structureSha256']==old[v['id']]['structureSha256'],v['id']+' structure moved'
  for key,name in v['maps'].items():
   if key!='baseColor' or v['id'] not in affected:assert name==old[v['id']]['maps'][key],v['id']+'/'+key+' unexpectedly changed'
 if v['id'] not in affected:continue
 base=np.asarray(Image.open(path/v['maps']['baseColor']).convert('RGB'),dtype=float)
 cover=np.asarray(Image.open(path/v['maps']['coverage']).convert('L'))
 metal=np.asarray(Image.open(path/v['maps']['metalness']).convert('L'))
 h,w=cover.shape;ys,xs=np.indices((h,w))
 # Bottom, fully opaque interiors excluding metal ink and anti-aliased edges.
 interior=(ys>h*.89)&(ys<h*.99)&(xs>w*.09)&(xs<w*.42)&(cover==255)&(metal<16)
 assert interior.sum()>10000,v['id']+' missing opaque base'
 chroma=(base.max(2)-base.min(2))/np.maximum(base.max(2),1)
 colored=float((chroma[interior]>.22).mean())
 assert colored>.98,f'{v["id"]}: only {colored:.3%} colored architectural base'
 results.append({'variant':v['id'],'interiorPixels':int(interior.sum()),'coloredFraction':colored})
if baseline:assert catalog['labels']==baseline['labels'],'lettering assets changed'
report={'checks':results,'unchangedChannelIdentityChecked':bool(baseline),'threshold':'98% of opaque nonmetal base interiors must have saturation > 0.22'}
output=root/'output/playwright/v4-color-coverage/asset-check.json';output.parent.mkdir(parents=True,exist_ok=True);output.write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report))
