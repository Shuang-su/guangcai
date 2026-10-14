from pathlib import Path
import gzip,hashlib,json,struct,subprocess
import numpy as np
from PIL import Image
R=Path(__file__).resolve().parents[1];P=R/'public/fixed';report={'baseline':'v4.1','regions':{},'checks':[]}
def old(rel):return subprocess.check_output(['git','show','v4.1:guangcai-china-preview/'+rel],cwd=R)
def normal(data):
 b=gzip.decompress(data);w,h,_=struct.unpack('<III',b[4:16]);return np.frombuffer(b[16:],'<f2').reshape(h,w,4)[::-1,:,:3].astype(np.float32)
def unpack(a):return np.concatenate([a[32:544,32:8160],a[608:1120,32:8160]],1)
for name in ['body','handle','saucer']:
 for c in ['baseColor']:
  p=f'public/fixed/{name}-{c}.png';assert (R/p).read_bytes()==old(p);report['checks'].append(name+' '+c+' byte-identical to v4.1')
 a=normal(old(f'public/fixed/{name}-normal.hfn.gz'));b=normal((P/f'{name}-normal.hfn.gz').read_bytes());assert a.shape==b.shape
 data=np.asarray(Image.open(P/f'{name}-metalness.png'),dtype=np.float32);metal=data[:,:,2]/247;ground=data[:,:,0]/255
 if name=='saucer':
  full=unpack(b)
  for row in range(2):
   assert np.array_equal(b[row*576+32:row*576+544],full[:,np.arange(row*8128-32,row*8128+8160)%16256])
  a,b,metal,ground=unpack(a),full,unpack(metal),unpack(ground)
 # A conservative independently measured gold interior (not the generator mask).
 mask=ground>.999
 for axis in [0,1]:
  m=mask.copy()
  for shift in range(-18,19):mask&=np.roll(m,shift,axis)
 mask[:22]=False;mask[-22:]=False
 sa=np.linalg.norm(a[:,:,:2]-.5,axis=2);sb=np.linalg.norm(b[:,:,:2]-.5,axis=2)
 report['regions'][name]={'goldInteriorPixels':int(mask.sum()),'beforeMeanDeviation':float(sa[mask].mean()),'afterMeanDeviation':float(sb[mask].mean()),'beforeMaxDeviation':float(sa[mask].max()),'afterMaxDeviation':float(sb[mask].max()),'heightUniqueValues':int(len(np.unique(np.asarray(Image.open(P/f'{name}-height.png')))))}
 assert sb[mask].max()<1e-7, name+' bare gold must be flat'
 assert report['regions'][name]['heightUniqueValues']>256
for rel in ['src/geometry/product.ts','src/styles/city-artwork.ts','src/materials/render-standard.ts','src/materials/porcelain.ts','src/studio/studio.ts','src/styles/fixed-layout.json']:
 assert (R/rel).read_bytes()==old(rel);report['checks'].append(rel+' byte-identical to v4.1')
(R/'evidence/floral-cleanup-4.2/verification.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
