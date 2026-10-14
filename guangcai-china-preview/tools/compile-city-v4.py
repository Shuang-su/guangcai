"""Compile source-aligned masks and pigment layers; RGB brightness is not relief height.
Creative ornaments/skyline are saved imagegen outputs. China structure is PSD-derived.
"""
from pathlib import Path
import numpy as np
from PIL import Image, ImageFilter, ImageDraw, ImageFont
import json, hashlib, gzip, struct

ROOT=Path(__file__).resolve().parents[1]; M=ROOT/'assets/masters/v4'; OUT=ROOT/'public/cities/v4'
OUT.mkdir(parents=True,exist_ok=True); W,H=4096,1783; SIZE=(W,H)
def rgb(s):return np.array([int(s[i:i+2],16) for i in (1,3,5)],dtype=np.float32)
def im(a):return Image.fromarray(np.uint8(np.clip(np.round(a),0,255)))
def arr(p,mode='L'):return np.array(Image.open(p).convert(mode).resize(SIZE,Image.Resampling.LANCZOS),dtype=np.float32)
def blur(a,n):return np.array(im(a).filter(ImageFilter.GaussianBlur(n)),dtype=np.float32)
def floatBlur(a,sigma):
    radius=max(1,int(np.ceil(sigma*3)));x=np.arange(-radius,radius+1,dtype=np.float32);kernel=np.exp(-x*x/(2*sigma*sigma));kernel/=kernel.sum()
    for axis in (0,1):
        pad=[(0,0),(0,0)];pad[axis]=(radius,radius);padded=np.pad(a,pad,mode='edge');result=np.zeros_like(a)
        for i,k in enumerate(kernel):
            region=[slice(None),slice(None)];region[axis]=slice(i,i+a.shape[axis]);result+=padded[tuple(region)]*k
        a=result
    return a
def placeHeight(a):
    source=Image.fromarray(a.astype('float32'));canvas=Image.new('F',SIZE)
    canvas.paste(source.resize((round(W*.82),round(H*.82)),Image.Resampling.LANCZOS),(round(W*.047),H-round(H*.82)))
    return np.clip(np.array(canvas,dtype=np.float32),0,255)
def placed(a):
    src=im(a); canvas=Image.new(src.mode,SIZE); canvas.paste(src.resize((round(W*.82),round(H*.82)),Image.Resampling.LANCZOS),(round(W*.047),H-round(H*.82)));return np.array(canvas,dtype=np.float32)
def save(a,name):
    p=OUT/(name+'.webp');im(a).save(p,lossless=True,method=6);return p.name
def normal(height,name):
    field=height/255;dy,dx=np.gradient(field);n=np.stack([-dx*2.1,dy*2.1,np.ones_like(field)],axis=-1);n/=np.linalg.norm(n,axis=-1,keepdims=True)
    data=np.ones((H,W,4),dtype='<f2');data[:,:,:3]=n*.5+.5
    raw=b'HFN1'+struct.pack('<III',W,H,1)+data[::-1].tobytes();p=OUT/(name+'.hfn.gz');p.write_bytes(gzip.compress(raw,compresslevel=6,mtime=0))
    Image.fromarray(np.round(field*65535).astype('uint16')).save(M/(name+'-height16.png'));return p.name

chinaMask=arr(ROOT/'public/china/metalness.png');chinaLines=arr(ROOT/'public/china/lines.png')
sz=arr(M/'shenzhen-lines-generated.png','RGBA'); szMask=sz[:,:,3]; szLines=(1-np.mean(sz[:,:,:3],axis=2)/255)*szMask
# Remove transparent border and carry the ground baseline to the frame bottom.
ys,xs=np.where(szMask>128); box=(max(0,int(xs.min())-2),max(0,int(ys.min())-25),min(W,int(xs.max())+3),int(ys.max())+1)
def fitSz(a):return np.array(im(a).crop(box).resize(SIZE,Image.Resampling.LANCZOS),dtype=np.float32)
szMask,szLines=fitSz(szMask),fitSz(szLines)
save(placed(chinaLines),'china-structural-lines');save(placed(szLines),'shenzhen-structural-lines')
im(szMask).save(M/'shenzhen-coverage.png');im(szLines).save(M/'shenzhen-lines.png')

variants=[
 ('china-green','中国 · 青绿金线','china','green',3,'#176647','#82b89c','#237751'),
 ('china-red','中国 · 红金','china','red',4,'#941c16','#c94a33','#a92019'),
 ('china-purple','中国 · 紫金','china','purple',5,'#57287f','#ad83c5','#672c86'),
 ('china-blue','中国 · 蓝金','china','blue',6,'#124d80','#75b4d0','#266799'),
 ('china-blue-line','中国 · 蓝色线描','china',None,7,'#69bee4','#b9c2e4','#245a90'),
 ('china-purple-line','中国 · 紫色线描','china',None,8,'#b48bd6','#d5b5e5','#6f348b'),
 ('shenzhen-red','深圳 · 红金','shenzhen','shenzhen-red',1,'#951c14','#c56838','#ae221b'),
 ('shenzhen-teal','深圳 · 青蓝金线','shenzhen','shenzhen-teal',2,'#125264','#70a7ac','#327e85'),
]
records=[]
for id,name,theme,deco,ref,dark,light,textColor in variants:
    mask,lines=(chinaMask,chinaLines) if theme=='china' else (szMask,szLines)
    lineStyle=deco is None
    y=np.linspace(0,1,H,dtype=np.float32)[:,None,None];t=np.clip((y-.28)/.72,0,1)
    color=np.broadcast_to(rgb(dark)*(1-t)+rgb(light)*t,(H,W,3)).copy()
    # Carry the selected pigment through the complete architectural silhouette.
    # A rectangular cream override used to bleach rails, stairs and the tower
    # base at the same height. White petals remain in the separate ornament layer.
    ink=rgb(textColor) if lineStyle else rgb('#dcb251')
    lf=np.clip(lines/255,0,1);color=color*(1-lf[:,:,None])+ink*lf[:,:,None]
    ornaments=np.zeros((H,W,4),dtype=np.float32)
    if deco:
        ornaments=arr(M/(deco+'-ornaments.png'),'RGBA')
        # Clean only low-alpha generation residue; keep white petal interiors.
        ornaments[:,:,3]=np.where(ornaments[:,:,3]<12,0,ornaments[:,:,3])
        # Reserve the final UV text region (also fits the taller Shenzhen frame).
        ornaments[0:round(H*((.60-.18)/.82)),round(W*((.74-.047)/.82)):W,3]=0
        # Tiny guard margin prevents cut artwork touching the fixed floral sector.
        edge=np.minimum(np.arange(W),np.arange(W)[::-1]);ornaments[:,:,3]*=np.clip(edge/18,0,1)[None,:]
    ma=mask/255;oa=ornaments[:,:,3]/255
    coverage=ma+oa*(1-ma)
    denom=np.maximum(coverage,1e-5)
    base=(color*ma[:,:,None]+ornaments[:,:,:3]*oa[:,:,None]*(1-ma[:,:,None]))/denom[:,:,None]
    # Decorative relief uses extracted ink contours only, never color-wash luminance.
    gray=np.mean(ornaments[:,:,:3],axis=2); contour=np.maximum(0,blur(gray,2)-gray-8)/70
    decoLines=np.clip(contour,0,1)*oa*(1-ma)
    height=floatBlur(lines, .65)+floatBlur(decoLines*100,.65)
    metal=np.zeros_like(mask) if lineStyle else np.clip(lf+decoLines*.6,0,1)*255
    coverage=placed(coverage*255);base=placed(base);metal=placed(metal);height=placeHeight(height)
    rough=255*(.31-.08*metal/255);coat=np.full((H,W),191,dtype=np.float32)
    maps={k:save(a,id+'-'+k) for k,a in [('baseColor',base),('coverage',coverage),('metalness',metal),('roughness',rough),('clearcoat',coat)]}
    maps['normal']=normal(height,id)
    preview=base*(coverage/255)[:,:,None]+np.array([255,253,247])*(1-coverage/255)[:,:,None]
    im(preview).resize((768,334),Image.Resampling.LANCZOS).save(OUT/(id+'-thumb.webp'),quality=92)
    # Flat atlas evidence carries original authoring coordinates plus placement.
    im(preview).save(M/(id+'-aligned.png'))
    records.append({'id':id,'name':name,'theme':theme,'reference':ref,'lineStyle':lineStyle,'textColor':textColor,'thumbnail':id+'-thumb.webp','maps':maps,'structureSha256':hashlib.sha256(im(placed(lines)).tobytes()).hexdigest()})
    print(id,flush=True)

# Text is independently authored, never recognized from generated raster lettering.
label=Image.open(ROOT/'public/china/label.png').convert('L');label.save(OUT/'label-china.webp',lossless=True)
fontPath='/System/Library/Fonts/Supplemental/Songti.ttc';latinPath='/System/Library/Fonts/Supplemental/Arial.ttf'
def textMask(kind):
    image=Image.new('L',SIZE);d=ImageDraw.Draw(image)
    if kind=='shenzhen':
        f=ImageFont.truetype(fontPath,112);e=ImageFont.truetype(latinPath,83)
        d.text((W*.81,H*.257),'深圳',font=f,fill=255,anchor='mm');d.text((W*.81,H*.335),'SHENZHEN',font=e,fill=255,anchor='mm')
    else:
        text={'he':'和合共彩','create':'共创美好'}[kind];cx=W*.81;top=H*.19;bottom=H*.59;half=113
        f=ImageFont.truetype(fontPath,122)
        for i,c in enumerate(text):d.text((cx,top+(bottom-top-3*136)/2+i*136),c,font=f,fill=255,anchor='mm')
        for pad in [0,10]:d.rounded_rectangle((cx-half-pad,top-12-pad,cx+half+pad,bottom+pad),radius=38,outline=255,width=4)
    image.save(OUT/('label-'+kind+'.webp'),lossless=True)
for k in ['shenzhen','he','create']:textMask(k)
(OUT/'catalog.json').write_text(json.dumps({'version':4,'size':SIZE,'placementBaked':{'scale':.82,'offsetU':.047,'offsetV':0},'variants':records},ensure_ascii=False,indent=2)+'\n')
sources=[ROOT/'assets/source/china-lines.psd',ROOT/'public/china/lines.png',ROOT/'public/china/metalness.png',M/'shenzhen-lines-generated.png']
(M/'provenance.json').write_text(json.dumps({'sourceHashes':{str(p.relative_to(ROOT)):hashlib.sha256(p.read_bytes()).hexdigest() for p in sources},'layout':[777,2243,6210,4608],'workingSize':SIZE,'chinaStructure':'existing PSD-derived masks; identical across all six palettes','shenzhenStructure':'one generated line master shared by both palettes','pigment':'reference palette with broad unlit vertical washes; ornaments from saved imagegen outputs','normals':'floating point gradients of structural ink; 16-bit height and RGBA16F, no baked RGB shading','labels':{'china':'original PSD alpha','shenzhen':'深圳 / SHENZHEN','he':'和合共彩','create':'共创美好','font':fontPath},'catalog':records},ensure_ascii=False,indent=2)+'\n')
