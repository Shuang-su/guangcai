"""Refresh height/normal only from the already registered fixed masters."""
from pathlib import Path
import gzip,hashlib,json,struct
import numpy as np
from PIL import Image
from floral_relief import derive_relief
R=Path(__file__).resolve().parents[1];M=R/'assets/masters/v3-restored';O=R/'public/fixed'
def digest(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def unpack(a):return np.concatenate([a[32:544,32:8160],a[608:1120,32:8160]],1)
def pack(a):
 return np.concatenate([np.pad(a[:,np.arange(i*8128-32,i*8128+8160)%16256],[(32,32),(0,0)]+([(0,0)] if a.ndim==3 else []),mode='edge') for i in range(2)],axis=0)
report={'method':'registered colour master, connected enamel support, gold interiors flattened, periodic float derivatives','normalScale':4.4,'clearcoatNormalScale':2.4,'regions':{}}
for name,native in [('body',637),('handle',148),('saucer',6924)]:
 rgb=np.asarray(Image.open(M/f'{name}-restored.png').convert('RGB'),dtype=np.float32)/255
 metal=np.asarray(Image.open(O/f'{name}-metalness.png'),dtype=np.float32)/247
 if metal.ndim==3:metal=metal[:,:,2] # 4.2 packs cleanup coverage into R; metalness stays in B.
 if name=='saucer':metal=unpack(metal)
 paper=None
 if name=='body':paper=np.asarray(Image.open(R/'assets/masters/v3/body.png').convert('RGB').resize((1024,2466))).min(2)>251
 protected={c:digest(O/f'{name}-{c}.png') for c in ['baseColor','metalness','roughness']}
 height,normal,stats=derive_relief(rgb,metal,native,name=='saucer',paper)
 Image.fromarray(np.uint16(np.rint(height*65535))).save(M/f'{name}-height-16.png')
 if name=='saucer':height=pack(height);normal=pack(normal)
 Image.fromarray(np.uint16(np.rint(height*65535))).save(O/f'{name}-height.png')
 Image.fromarray(np.uint8(np.rint(normal*255))).save(O/f'{name}-normal.png')
 h,w=normal.shape[:2];rgba=np.ones((h,w,4),np.float16);rgba[:,:,:3]=normal
 data=b'HFN1'+struct.pack('<III',w,h,1)+rgba[::-1].astype('<f2').tobytes()
 (O/f'{name}-normal.hfn.gz').write_bytes(gzip.compress(data,compresslevel=6,mtime=0))
 assert all(digest(O/f'{name}-{c}.png')==s for c,s in protected.items())
 report['regions'][name]={**stats,'size':[w,h],'protectedChannels':protected,'normalSha256':digest(O/f'{name}-normal.hfn.gz')}
 print(name,stats,flush=True)
(R/'evidence/fixed-relief-alignment').mkdir(exist_ok=True)
(R/'evidence/fixed-relief-alignment/derivation.json').write_text(json.dumps(report,indent=2)+'\n')

manifest=json.loads((O/"manifest.json").read_text())
manifest["reliefRevision"]={"id":"20261014-fixed-relief-alignment","report":"evidence/fixed-relief-alignment/derivation.json","normalScale":4.4,"clearcoatNormalScale":2.4}
(O/"manifest.json").write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+"\n")
