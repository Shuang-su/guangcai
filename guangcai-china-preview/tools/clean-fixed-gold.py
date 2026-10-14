"""Clean material DATA only; original pigment images stay byte-for-byte intact.

Gold RGB normalization happens in the opt-in fixed-gold-ground shader. No AI
redraw is installed. Saved pre-clean masks make this operation idempotent.
"""
from pathlib import Path
import gzip,hashlib,json,struct
import numpy as np
from scipy import ndimage as ndi
from PIL import Image
from floral_relief import derive_relief
R=Path(__file__).resolve().parents[1];M=R/'assets/masters/v3-restored';S=R/'assets/masters/v4.2-cleanup';O=R/'public/fixed'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def unpack(a):return np.concatenate([a[32:544,32:8160],a[608:1120,32:8160]],1)
def pack(a):return np.concatenate([np.pad(a[:,np.arange(i*8128-32,i*8128+8160)%16256],[(32,32),(0,0)]+([(0,0)] if a.ndim==3 else []),mode='edge') for i in range(2)],axis=0)

def clean_gold_mask(metal,periodic=False,paper=None,rgb=None):
 halo=32 if periodic else 0
 paint=metal<.5
 padded=np.pad(paint,((0,0),(halo,halo)),mode='wrap') if halo else paint
 labels,_=ndi.label(padded);sizes=np.bincount(labels.ravel());keep=sizes>=36;keep[0]=False
 support=keep[labels];support=support[:,halo:-halo] if halo else support
 mode=('nearest','wrap' if periodic else 'nearest')
 # Yellow fruit/petals can pass the legacy metal classification. A separate
 # stricter bare-ground channel prevents flattening their watercolor pigment.
 trusted=~support
 if rgb is not None:
  r,g,b=rgb[:,:,0],rgb[:,:,1],rgb[:,:,2]
  strict=(r>.34)&(g>.60*r)&(g<.88*r)&(b<.10*r)
  closed=ndi.minimum_filter(ndi.maximum_filter(strict,size=5,mode=mode),size=5,mode=mode)
  trusted&=closed
 clean=ndi.gaussian_filter(trusted.astype(np.float32),.65,mode=mode,truncate=3)
 if paper is not None:clean[paper]=0
 return clean,support

def main():
 report={'version':'4.2.0','method':'registered semantic gold mask; uniform bare-gold pigment in shader; original RGB unchanged','goldSRGB':'#ffc846','relief':[4.4,2.4],'regions':{}}
 for name,native in [('body',637),('handle',148),('saucer',6924)]:
  rgb=np.asarray(Image.open(M/f'{name}-restored.png').convert('RGB'),dtype=np.float32)/255
  original=np.asarray(Image.open(S/f'{name}-metalness-before.png'),dtype=np.float32)/247
  rough=np.asarray(Image.open(S/f'{name}-roughness-before.png'),dtype=np.float32)/255
  periodic=name=='saucer'
  if periodic:original=unpack(original);rough=unpack(rough)
  paper=None
  if name=='body':paper=np.asarray(Image.open(R/'assets/masters/v3/body.png').convert('RGB').resize((1024,2466))).min(2)>251
  protected={str(p.relative_to(R)):sha(p) for p in [M/f'{name}-restored.png',O/f'{name}-baseColor.png']}
  ground,support=clean_gold_mask(original,periodic,paper,rgb)
  metal=original*(1-ground)+ground
  height,normal,stats=derive_relief(rgb,metal,native,periodic,paper)
  mode=('nearest','wrap' if periodic else 'nearest')
  interior=ndi.minimum_filter((ground>.999).astype(np.uint8),size=35,mode=mode)>0
  if paper is not None:interior&=~paper
  assert np.all(metal[interior]==1),name+' gold interiors'
  # Keep pigment roughness; use a uniform gold response only on bare ground.
  rough=rough*(1-ground)+.22*ground
  Image.fromarray(np.uint16(np.rint(height*65535))).save(S/f'{name}-height-16.png')
  # R = opt-in clean-ground coverage; B remains Three.js metalness.
  metalmap=np.stack([ground*255,metal*247,metal*247],2)
  Image.fromarray(np.uint8(np.rint(ground*255))).save(S/f'{name}-gold-mask.png')
  for c,a in [('metalness',np.uint8(np.rint(metalmap))),('roughness',np.uint8(np.rint(rough*255))),('height',np.uint16(np.rint(height*65535))),('normal',np.uint8(np.rint(normal*255)))]:
   Image.fromarray(pack(a) if periodic else a).save(O/f'{name}-{c}.png')
  normal=pack(normal) if periodic else normal;h,w=normal.shape[:2]
  rgba=np.ones((h,w,4),np.float16);rgba[:,:,:3]=normal
  (O/f'{name}-normal.hfn.gz').write_bytes(gzip.compress(b'HFN1'+struct.pack('<III',w,h,1)+rgba[::-1].astype('<f2').tobytes(),compresslevel=6,mtime=0))
  assert all(sha(R/p)==s for p,s in protected.items())
  report['regions'][name]={**stats,'goldInteriorPixels':int(interior.sum()),'goldInteriorRange':[float(metal[interior].min()),float(metal[interior].max())],'originalColorHashes':protected,'cleanMetalSha256':sha(O/f'{name}-metalness.png')}
  print(name,report['regions'][name],flush=True)
 out=R/'evidence/floral-cleanup-4.2';out.mkdir(exist_ok=True);(out/'derivation.json').write_text(json.dumps(report,indent=2)+'\n')
 p=O/'manifest.json';manifest=json.loads(p.read_text());manifest['goldCleanup']={'version':'4.2.0','shader':'fixed-gold-ground','metalnessEncoding':'R: clean gold coverage; B: metalness','report':'evidence/floral-cleanup-4.2/derivation.json','originalRGBUnchanged':True};p.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
 p=O/'style.json';style=json.loads(p.read_text());style['cleanGoldGround']=True;p.write_text(json.dumps(style,ensure_ascii=False,indent=2)+'\n')

if __name__=='__main__':main()
