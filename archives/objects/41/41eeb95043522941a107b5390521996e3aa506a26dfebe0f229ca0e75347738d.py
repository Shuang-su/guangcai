from pathlib import Path
import json,hashlib,subprocess,gzip,struct
import numpy as np
from PIL import Image
R=Path(__file__).resolve().parents[1];P=R/'public/fixed';M=R/'assets/masters/v3-restored';checks=[]
def check(label,ok):
 assert ok,label
 checks.append(label)
def digest(p):return hashlib.sha256(p.read_bytes()).hexdigest()
master=json.loads((P/'manifest.json').read_text());check('Every floral segment is restored; no low-resolution fallback',not master['pilot'] and len(master['parts'])==12 and all(not p.get('fallback',False) for p in master['parts']))
for region,desc in master['regions'].items():
 shapes=[]
 for channel in ['baseColor','normal','metalness','roughness','height']:
  im=Image.open(P/f'{region}-{channel}.png');shapes.append(list(im.size))
 check(region+' channels are aligned',all(s==desc['size'] for s in shapes))
 height=np.array(Image.open(P/f'{region}-height.png'));check(region+' height retains more than 8-bit precision',len(np.unique(height))>256 and height.max()>255)
 if region=='saucer':
  for channel in ['baseColor','normal','metalness','roughness','height']:
   a=np.array(Image.open(P/f'saucer-{channel}.png'));full=np.concatenate([a[32:544,32:8160],a[608:1120,32:8160]],1)
   for row in range(2):
    start=row*576;x=row*8128;expected=full[:,np.arange(x-32,x+8128+32)%16256]
    check('saucer '+channel+f' row {row} exact periodic guards',np.array_equal(a[start+32:start+544],expected) and np.array_equal(a[start],expected[0]) and np.array_equal(a[start+575],expected[-1]))
  b=gzip.decompress((P/'saucer-normal.hfn.gz').read_bytes());w,h,_=struct.unpack('<III',b[4:16]);a=np.frombuffer(b[16:],'<f2').reshape(h,w,4)[::-1];full=np.concatenate([a[32:544,32:8160],a[608:1120,32:8160]],1)
  for row in range(2):check('half-float normals keep exact wrap guards '+str(row),np.array_equal(a[row*576+32:row*576+544],full[:,np.arange(row*8128-32,row*8128+8160)%16256]))
# Hash the unchanged city pack against the previous published source, not a rebuilt expectation.
base='073167bed69ae46eb716e13bc9ad2de0bfea0084';protected=[]
for p in sorted((R/'public/china').glob('*')):
 if p.is_file():
  rel='guangcai-china-preview/'+str(p.relative_to(R));prior=subprocess.check_output(['git','show',base+':'+rel],cwd=R)
  check('unchanged city source '+p.name,hashlib.sha256(prior).hexdigest()==digest(p));protected.append(str(p.relative_to(R)))
for rel in ['src/geometry/product.ts','src/geometry/parameters.ts','src/styles/city-artwork.ts','src/materials/porcelain.ts','src/materials/render-standard.ts','src/studio/studio.ts','src/studio/lid-reflections.ts','src/studio/local-reflections.ts','src/ui/background.ts']:
 prior=subprocess.check_output(['git','show',base+':guangcai-china-preview/'+rel],cwd=R);check('unchanged protected code '+rel,hashlib.sha256(prior).hexdigest()==digest(R/rel));protected.append(rel)
sources=[{'path':str(p.relative_to(R)),'bytes':p.stat().st_size,'sha256':digest(p)} for p in sorted(M.rglob('*')) if p.is_file()]
outputs=[{'path':str(p.relative_to(R)),'bytes':p.stat().st_size,'sha256':digest(p)} for p in sorted(P.glob('*')) if p.is_file()]
report={'checks':checks,'passed':len(checks),'protectedBaseline':base,'protectedFiles':protected,'sourceFiles':sources,'outputFiles':outputs,'limits':'AI-generated strokes and washes are reconstructed; this verifies packing, precision, provenance and scope, not exact source drawing fidelity or physical device acceptance.'}
(R/'evidence/floral-restored/assets.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(json.dumps({'passed':len(checks),'sourceFiles':len(sources),'protectedFiles':len(protected)}))
