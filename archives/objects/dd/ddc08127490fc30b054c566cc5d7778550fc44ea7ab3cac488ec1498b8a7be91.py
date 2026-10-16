"""Compile AI-restored fixed decals. Originals and generated inputs remain separate.
Color restoration happens in imagegen; this file registers, joins and derives PBR data.
"""
from pathlib import Path
import json,sys,gzip,struct,hashlib
import numpy as np
from PIL import Image
R=Path(__file__).resolve().parents[1];M=R/'assets/masters/v3-restored';active='--activate' in sys.argv;O=R/('public/fixed' if active else 'public/fixed-restored');O.mkdir(exist_ok=True)
pilot='--pilot' in sys.argv
layout=json.loads((M/'layout.json').read_text());reports=[]
def sm(a,b,x):
 t=np.clip((x-a)/(b-a),0,1);return t*t*(3-2*t)
def blur(a,sigma,periodic=False):
 out=a.astype(np.float32);r=int(np.ceil(sigma*3));k=np.exp(-np.arange(-r,r+1,dtype=np.float32)**2/(2*sigma*sigma));k/=k.sum()
 for axis in [0,1]:
  pads=[(0,0)]*a.ndim;pads[axis]=(r,r);p=np.pad(out,pads,mode='wrap' if axis==1 and periodic else 'edge');out=np.zeros_like(out)
  for j,v in enumerate(k):
   sl=[slice(None)]*a.ndim;sl[axis]=slice(j,j+a.shape[axis]);out+=p[tuple(sl)]*v
 return out
def close_lines(a,periodic=False):
 # Close tiny discontinuities along drawn ink without lifting painting grain.
 out=a
 for op in [np.maximum,np.minimum]:
  p=np.pad(out,((2,2),(0,0)),mode='edge');p=np.pad(p,((0,0),(2,2)),mode='wrap' if periodic else 'edge');out=p[:a.shape[0],:a.shape[1]].copy()
  for yy in range(5):
   for xx in range(5):out=op(out,p[yy:yy+a.shape[0],xx:xx+a.shape[1]])
 return out
def box(a,r):
 p=np.pad(a,((r,r),(r,r)),mode='edge');s=np.pad(p,((1,0),(1,0))).cumsum(0).cumsum(1);n=r*2+1
 return (s[n:,n:]-s[:-n,n:]-s[n:,:-n]+s[:-n,:-n])/(n*n)
def registered(file,source,size,id):
 # Coarse colour registration constrains restored motifs to source layout.
 # Fine restored brush strokes are not matched back to low-resolution pixels.
 if not file.exists():
  if not pilot:raise FileNotFoundError(file)
  reports.append({'id':id,'fallback':True});return np.asarray(source.resize(size,Image.Resampling.BICUBIC)).copy()
 image=Image.open(file).convert('RGB');generatedSize=list(image.size);crop=None
 if id.startswith('handle-'):
  a=np.asarray(image);columns=np.flatnonzero((a.min(2)<235).mean(0)>.4);crop=[int(columns[0]),0,int(columns[-1]+1),image.height];image=image.crop(crop)
 sw,sh=source.size
 scale=min(1,420/max(sw,sh));w=max(32,round(sw*scale));h=max(32,round(sh*scale))
 a=np.asarray(source.resize((w,h)),dtype=np.float32)/255;b=np.asarray(image.resize((w,h)),dtype=np.float32)/255
 # Remove mean palette bias from the geometric match only, never from output.
 b=np.clip((b-b.mean((0,1)))*np.maximum(.04,a.std((0,1)))/np.maximum(.04,b.std((0,1)))+a.mean((0,1)),0,1)
 gx=np.unique(np.r_[np.arange(0,w,12),w-1]);gy=np.unique(np.r_[np.arange(0,h,12),h-1]);best=np.full((len(gy),len(gx)),1e9);dxs=np.zeros_like(best);dys=np.zeros_like(best)
 rx=max(3,round(w*.065));ry=max(3,round(h*.065));pad=np.pad(b,((ry,ry),(rx,rx),(0,0)),mode='edge')
 for dy in range(-ry,ry+1):
  for dx in range(-rx,rx+1):
   d=np.mean((a-pad[ry+dy:ry+dy+h,rx+dx:rx+dx+w])**2,2);cost=box(d,5)[np.ix_(gy,gx)]+.000035*(dx*dx+dy*dy);win=cost<best;best[win]=cost[win];dxs[win]=dx;dys[win]=dy
 dxs=blur(dxs,.7);dys=blur(dys,.7);dxs[:,0]=0;dxs[:,-1]=0;dys[0,:]=0;dys[-1,:]=0
 # Mesh coordinates: UL, LL, LR, UR, sampled from the generated image.
 ow,oh=size;xs=np.rint(gx/(w-1)*ow).astype(int);ys=np.rint(gy/(h-1)*oh).astype(int)
 points=np.stack([(gx[None,:]+dxs)/(w-1)*image.width,(gy[:,None]+dys)/(h-1)*image.height],2)
 mesh=[]
 for y in range(len(gy)-1):
  for x in range(len(gx)-1):
   mesh.append(((int(xs[x]),int(ys[y]),int(xs[x+1]),int(ys[y+1])),tuple(np.concatenate([points[y,x],points[y+1,x],points[y+1,x+1],points[y,x+1]]))))
 out=image.transform(size,Image.Transform.MESH,mesh,Image.Resampling.BICUBIC)
 reports.append({'id':id,'generatedSize':generatedSize,'paddingCrop':crop,'sourceSize':[sw,sh],'outputSize':list(size),'maxCoarseShiftSourcePixels':[float(np.abs(dxs).max()/scale),float(np.abs(dys).max()/scale)],'sha256':hashlib.sha256(file.read_bytes()).hexdigest()})
 return np.asarray(out).copy()
def quilt(left,right):
 # The path runs through low-disagreement pixels; only a 4px shoulder is blended.
 diff=np.mean((left.astype(np.float32)-right.astype(np.float32))**2,2)/65025
 h,w=diff.shape;diff+=.004*(np.linspace(-1,1,w)[None,:]**8)
 dp=diff[0].copy();back=np.zeros((h,w),np.int8)
 for y in range(1,h):
  opts=np.stack([np.r_[1e9,dp[:-1]],dp,np.r_[dp[1:],1e9]]);choice=opts.argmin(0);back[y]=choice-1;dp=diff[y]+opts[choice,np.arange(w)]
 path=np.zeros(h,dtype=int);path[-1]=dp.argmin()
 for y in range(h-1,0,-1):path[y-1]=path[y]+back[y,path[y]]
 alpha=sm(-2,2,np.arange(w)[None,:]-path[:,None])[:,:,None]
 return np.uint8(np.rint(left*(1-alpha)+right*alpha)),{'overlap':w,'pathMin':int(path.min()),'pathMax':int(path.max()),'meanJoinCost':float(diff[np.arange(h),path].mean())}
def stitch(parts):
 # Each item is an integer start and an image; parts sorted left to right.
 start,canvas=parts[0];canvas=canvas.copy();joins=[]
 for x,new in parts[1:]:
  offset=x-start;overlap=canvas.shape[1]-offset
  if overlap<=0:raise ValueError('uncovered texture interval')
  if overlap>=new.shape[1]:raise ValueError('invalid overlap')
  joined,stats=quilt(canvas[:,offset:],new[:,:overlap]);canvas=np.concatenate([canvas[:,:offset],joined,new[:,overlap:]],1);joins.append({'at':x,**stats})
 return start,canvas,joins
source=Image.open(R/'assets/masters/v3-hq/saucer-continuous.png').convert('RGB');sw,sh=source.size;virtualW,H=16256,512;scale=virtualW/sw;array=np.asarray(source);parts=[]
for part in layout['saucer']:
 start=part['start'];width=part['width'];raw=Image.fromarray(array[:,np.arange(start,start+width)%sw]);outw=round((start+width)*scale)-round(start*scale)
 restored=registered(M/part['generated'],raw,(outw,H),part['id']);parts.append((round(start*scale),restored));Image.fromarray(restored).save(M/(part['id']+'-registered.png'))
parts.append((round((layout['saucer'][0]['start']+sw)*scale),parts[0][1]))
start,wide,joins=stitch(parts);saucer=wide[:,-start:-start+virtualW];Image.fromarray(saucer).save(M/'saucer-restored.png');print('saucer master',saucer.shape,flush=True)
bodySource=Image.open(R/'assets/masters/v3/body.png').convert('RGB');body=registered(M/'body-generated.png',bodySource,(1024,2466),'body')
# Preserve the supplied white attachment cutouts, even if the generator fills them.
paper=np.asarray(bodySource.resize((1024,2466))).min(2)>251;body[paper]=255;Image.fromarray(body).save(M/'body-restored.png')
hSource=Image.open(R/'assets/masters/v3/handle.png').convert('RGB');hp=[];hs=4473/hSource.height
for id,y in [('handle-top',0),('handle-bottom',798)]:
 end=y+926;tile=registered(M/(id+'-generated.png'),hSource.crop((0,y,148,end)),(384,round(end*hs)-round(y*hs)),id);hp.append((round(y*hs),tile.transpose(1,0,2)))
_,horizontal,hjoins=stitch(hp);handle=horizontal.transpose(1,0,2);Image.fromarray(handle).save(M/'handle-restored.png')
style={'name':'固定广彩 · 高清重建彩釉与连续花带','mapping':'source-layout-v3','regions':{}};atlas={'rows':2,'contentWidth':8128,'contentHeight':512,'gutter':32};regional={}
def pack(a):
 # Top row = first half; periodic horizontal guards and clamped vertical guards.
 rows=[]
 for i in range(2):
  x=i*8128;part=a[:,np.arange(x-32,x+8128+32)%16256];pads=[(32,32),(0,0)]+([(0,0)] if a.ndim==3 else []);rows.append(np.pad(part,pads,mode='edge'))
 return np.concatenate(rows,axis=0)
for name,arr,native in [('body',body,637),('handle',handle,148),('saucer',saucer,6924)]:
 periodic=name=='saucer';rgb=arr.astype(np.float32)/255;red=rgb[:,:,0];green=rgb[:,:,1];blue=rgb[:,:,2];ratio=green/np.maximum(.01,red);br=blue/np.maximum(.01,red)
 metal=sm(.34,.45,red)*sm(.62,.70,ratio)*(1-sm(.91,.98,ratio))*(1-sm(.17,.26,br));metal=blur(metal,.65,periodic)
 luma=.2126*red+.7152*green+.0722*blue;near=blur(luma,3.0,periodic);contrast=np.maximum(0,near-luma)/np.maximum(.10,near)
 absolute_ink=1-sm(.36,.76,rgb.max(2))
 stroke=np.maximum(sm(.13,.38,contrast),absolute_ink*.92)*(1-metal)
 stroke=(close_lines(stroke,periodic)>.16).astype(np.float32);stroke=blur(stroke,1.25,periodic)
 enamel=1-metal
 if name=='body':enamel[paper]=0;stroke[paper]=0;metal[paper]=0
 height=(92+blur(enamel,2.4,periodic)*10+stroke*24+blur(stroke,2.8,periodic)*8)/255;height=blur(height,1.15,periodic)
 h,w=height.shape;dx=(np.roll(height,-1,1)-np.roll(height,1,1))*1.6*w/native;dy=(np.roll(height,-1,0)-np.roll(height,1,0))*1.6*w/native
 if not periodic:dx[:,0]=dx[:,1];dx[:,-1]=dx[:,-2]
 dy[0]=dy[1];dy[-1]=dy[-2];length=np.sqrt(dx*dx+dy*dy+1);normal=np.stack([(-dx/length+1)/2,(dy/length+1)/2,(1/length+1)/2],2)
 color=np.uint8(np.clip(np.rint(arr*(1-metal[:,:,None])+np.array([255,200,70])*metal[:,:,None]),0,255));rough=.22*metal+(.235-.025*stroke)*(1-metal)
 maps={'baseColor':color,'normal':np.uint8(np.rint(normal*255)),'height':np.uint16(np.rint(height*65535)),'metalness':np.uint8(np.rint(metal*247)),'roughness':np.uint8(np.rint(rough*255))}
 for channel,data in maps.items():Image.fromarray(pack(data) if periodic else data).save(O/f'{name}-{channel}.png')
 Image.fromarray(maps['height']).save(M/f'{name}-height-16.png')
 if periodic:normal=pack(normal)
 hh,ww=normal.shape[:2];rgba=np.ones((hh,ww,4),np.float16);rgba[:,:,:3]=normal;raw=b'HFN1'+struct.pack('<III',ww,hh,1)+rgba[::-1].astype('<f2').tobytes();encoded=gzip.compress(raw,compresslevel=6,mtime=0);(O/f'{name}-normal.hfn.gz').write_bytes(encoded)
 prefix='' if active else 'fixed-restored/'
 entry={k:f'{prefix}{name}-{k}.png' for k in ['baseColor','normal','height','metalness','roughness']};entry['normal']=f'{prefix}{name}-normal.hfn.gz';entry['normalFormat']='rgba16f-gzip-v1';entry['offsetU']=-.105 if periodic else 0
 if periodic:entry['atlas']=atlas
 style['regions'][name]=entry;regional[name]={'size':[ww,hh],'effectiveSize':[w,h],'sourceSize':list((bodySource if name=='body' else hSource if name=='handle' else source).size),'normalBytes':len(encoded),'normalMaxSlope':float(np.max(np.sqrt(dx*dx+dy*dy))),'heightLevels':int(len(np.unique(maps['height'])))}
 print(name,regional[name],flush=True)
if active:(R/'src/styles/fixed-rendering.json').write_text(json.dumps({'saucer':atlas},indent=2)+'\n')
(O/'style.json').write_text(json.dumps(style,ensure_ascii=False,indent=2));report={'assetVersion':'3.0-floral-restored-1','fixedNormalScale':4.4,'clearcoatNormalScale':2.4,'method':'Generative high-definition restoration; coarse source-layout registration; minimal-difference overlap joins; semantic enamel and raised ink; float height and RGBA16F normal atlas','pilot':pilot,'parts':reports,'saucerJoins':joins,'handleJoins':hjoins,'regions':regional,'atlas':atlas,'limits':'Generated details and strokes are reconstructed, not lossless recovery of the PSD. Actual mobile acceptance remains separate.'};(R/'evidence/floral-restored/derivation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));(O/'manifest.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))

# Keep later height-only corrections reproducible after a full source rebuild.
if active:
 import runpy
 runpy.run_path(str(R/"tools/repair-fixed-relief.py"),run_name="__main__")
 runpy.run_path(str(R/"tools/clean-fixed-gold.py"),run_name="__main__")
