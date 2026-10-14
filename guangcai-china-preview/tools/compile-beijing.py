"""Source-locked Beijing maps. Ink, coverage and pigment are independent.

The imagegen trial is evidence only: it changed roofs/clouds and failed the 4K
request. Runtime geometry is reconstructed from the supplied alpha, never AI ink.
"""
from pathlib import Path
import json, hashlib, gzip, struct
import numpy as np
from PIL import Image, ImageFilter, ImageDraw, ImageFont

ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/'assets/source/beijing/beijing-lines-original.png'
M=ROOT/'assets/masters/beijing-4.3'; OUT=ROOT/'public/cities/v4'
E=ROOT/'evidence/beijing-4.3'; REVIEW=ROOT/'public/review/beijing-4.3'
W,H=4096,1783; SIZE=(W,H)
for p in [M,OUT,E,REVIEW]:p.mkdir(parents=True,exist_ok=True)

def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def image(a):return Image.fromarray(np.uint8(np.clip(np.round(a),0,255)))
def float_blur(a,sigma):
    radius=max(1,int(np.ceil(sigma*3)));x=np.arange(-radius,radius+1,dtype=np.float32)
    kernel=np.exp(-x*x/(2*sigma*sigma));kernel/=kernel.sum()
    for axis in (0,1):
        pad=[(0,0),(0,0)];pad[axis]=(radius,radius);padded=np.pad(a,pad,mode='edge');result=np.zeros_like(a)
        for i,k in enumerate(kernel):
            region=[slice(None),slice(None)];region[axis]=slice(i,i+a.shape[axis]);result+=padded[tuple(region)]*k
        a=result
    return a

source=Image.open(SOURCE).convert('RGBA');alpha=np.asarray(source)[:,:,3].copy()
sw,sh=source.size
# Keep all substantial strokes, including the small plaque glyphs; delete only
# disconnected subpixel speckles. Source RGB is near-black and is not height.
core=np.asarray(Image.fromarray((alpha>=48).astype('uint8')*255).filter(ImageFilter.MaxFilter(3)))>0
clean=np.where(core & (alpha>=5),alpha,0).astype('uint8')
content_bottom=int(np.where(clean>=48)[0].max())+1
ink=clean[:content_bottom]
image(clean).save(M/'source-ink-clean.png')

# The upper envelope closes mountains downwards. An explicitly authored cloud
# boundary keeps foreground cloud interiors white; it is a semantic fill mask,
# not a reinterpretation of the supplied stroke or the relief field.
cloud_boundary=[(0,718),(30,699),(74,687),(119,692),(150,706),(181,714),
 (205,700),(248,702),(284,712),(312,699),(342,707),(381,707),(415,692),
 (443,694),(463,710),(435,720),(453,726),(500,710),(544,706),(575,714),
 (596,735),(605,744),(650,744),(689,755),(739,767),(784,775),(846,783),
 (882,791),(921,779),(955,782),(980,796),(1005,747),(1045,727),
 (1083,727),(1112,739),(1100,748),(1140,750),(1208,750),(1244,724),
 (1274,720),(1293,734),(1305,746),(1380,747),(1406,751),(1420,760),
 (1460,769),(1518,769),(1541,780),(1580,790),(1634,766),(1680,749),
 (1720,739),(1760,734),(1804,741),(1845,748),(1890,750),(1941,755)]
guide=sorted({x:y for x,y in cloud_boundary}.items())
bottom=np.interp(np.arange(sw),[p[0] for p in guide],[p[1] for p in guide])
# Continuous minimum-cost contour through source ink. Independent per-column
# snapping can jump between cloud lines and leave vertical color tears. Keep
# consecutive samples within four source pixels and prefer the authored region.
low=640;ys=np.arange(low,content_bottom);count=len(ys)
cost=8*(1-ink[low:].astype('float32')/255)**2+.004*(ys[:,None]-bottom[None,:])**2
previous=cost[:,0].copy();parents=np.zeros((sw,count),dtype='int16')
for x in range(1,sw):
    candidates=[]
    for d in range(-4,5):
        shifted=np.full(count,np.inf,dtype='float32')
        if d<0:shifted[:d]=previous[-d:]
        elif d>0:shifted[d:]=previous[:-d]
        else:shifted=previous.copy()
        candidates.append(shifted+.35*abs(d))
    choices=np.stack(candidates);best=np.argmin(choices,axis=0)
    parents[x]=np.arange(count)-(best-4)
    previous=cost[:,x]+choices[best,np.arange(count)]
chosen=np.zeros(sw,dtype='int16');row=int(np.argmin(previous))
for x in range(sw-1,-1,-1):
    chosen[x]=row+low
    if x:row=int(parents[x,row])
bottom=chosen
coverage=np.zeros_like(ink,dtype=np.uint8)
for x in range(sw):
    rows=np.flatnonzero(ink[:,x]>=80)
    if rows.size:
        top=int(rows[0]);end=min(content_bottom,int(round(bottom[x])))
        if end>top:coverage[top:end,x]=255
# Keep the exact original ink outside filled faces (clouds, isolated fine lines).
coverage=np.maximum(coverage,ink)
image(coverage).save(M/'source-coverage.png')
(M/'fill-regions.json').write_text(json.dumps({'sourceSize':[sw,sh],'contentBottom':content_bottom,'cloudBoundary':cloud_boundary,'method':'upper ink envelope minus explicitly bounded foreground cloud interiors; union original strokes'},indent=2)+'\n')

# One isotropic transform into the existing blank-300deg-v1 region. Preserve
# original top whitespace, remove only empty bottom rows and add frame padding.
scale=min(W*.82/sw,H*.82/content_bottom)
dw,dh=round(sw*scale),round(content_bottom*scale);ox=round(W*.047);oy=H-dh
def placed(a,floating=False):
    src=Image.fromarray(a.astype('float32')) if floating else image(a)
    canvas=Image.new('F' if floating else src.mode,SIZE)
    canvas.paste(src.resize((dw,dh),Image.Resampling.LANCZOS),(ox,oy))
    return np.clip(np.array(canvas,dtype=np.float32),0,255)
lines=placed(ink);cover=placed(coverage)
image(lines).save(M/'beijing-lines-4k.png');image(cover).save(M/'beijing-coverage-4k.png')
aligned_source=np.repeat((255-placed(alpha[:content_bottom]))[:,:,None],3,axis=2)
image(aligned_source).resize((1536,669),Image.Resampling.LANCZOS).save(REVIEW/'source-aligned.webp',quality=98)
height=float_blur(lines,.65)/255
# Exact empty regions remain neutral; only a narrow antialiased support belongs
# to an original stroke. No pigment luminance, baked highlights or grain here.
Image.fromarray(np.round(height*65535).astype('uint16')).save(M/'beijing-height16.png')
dy,dx=np.gradient(height);n=np.stack([-dx*2.1,dy*2.1,np.ones_like(height)],axis=-1)
n/=np.linalg.norm(n,axis=-1,keepdims=True)
normal=np.ones((H,W,4),dtype='<f2');normal[:,:,:3]=n*.5+.5
normal_path=OUT/'beijing-normal.hfn.gz'
normal_path.write_bytes(gzip.compress(b'HFN1'+struct.pack('<III',W,H,1)+normal[::-1].tobytes(),compresslevel=6,mtime=0))

def save(a,name):
    p=OUT/(name+'.webp');image(a).save(p,lossless=True,method=6);return p.name
shared_cover=save(cover,'beijing-coverage');save(lines,'beijing-structural-lines')
def rgb(s):return np.array([int(s[i:i+2],16) for i in (1,3,5)],dtype=np.float32)
palettes=[('gold','纯金','#ffc643','#ffc643','#ddb538'),
 ('green','青绿金线','#176647','#82b89c','#237751'),
 ('red','红金','#941c16','#c94a33','#a92019'),
 ('purple','紫金','#57287f','#ad83c5','#672c86'),
 ('blue','蓝金','#124d80','#75b4d0','#266799')]
records=[]
for key,name,dark,light,text in palettes:
    ident='beijing-'+key;gold=key=='gold'
    y=np.linspace(0,1,H,dtype=np.float32)[:,None,None]
    t=np.clip((y-.28)/.72,0,1)
    pigment=np.broadcast_to(rgb(dark)*(1-t)+rgb(light)*t,(H,W,3)).copy()
    lf=lines/255
    if not gold:pigment=pigment*(1-lf[:,:,None])+rgb('#dcb251')*lf[:,:,None]
    metal=cover if gold else lines
    rough=255*(.26-.04*np.minimum(1,lf*1.15)) if gold else 255*(.31-.08*metal/255)
    maps={'baseColor':save(pigment,ident+'-baseColor'),'coverage':shared_cover,
          'metalness':save(metal,ident+'-metalness'),'roughness':save(rough,ident+'-roughness'),
          'clearcoat':save(np.full((H,W),26 if gold else 191),ident+'-clearcoat'),
          'normal':normal_path.name}
    preview=pigment*(cover/255)[:,:,None]+np.array([255,253,247])*(1-cover/255)[:,:,None]
    image(preview).resize((1536,669),Image.Resampling.LANCZOS).save(REVIEW/(ident+'-flat.webp'),quality=95)
    image(preview*.5+aligned_source*.5).resize((1536,669),Image.Resampling.LANCZOS).save(REVIEW/(ident+'-overlay.webp'),quality=97)
    image(preview).resize((768,334),Image.Resampling.LANCZOS).save(OUT/(ident+'-thumb.webp'),quality=94)
    records.append({'id':ident,'name':'北京 · '+name,'theme':'beijing','lineStyle':False,'fixedGold':gold,
                    'textColor':text,'thumbnail':ident+'-thumb.webp','maps':maps,
                    'structureSha256':hashlib.sha256(image(lines).tobytes()).hexdigest()})

label=Image.new('L',SIZE);draw=ImageDraw.Draw(label)
font='/System/Library/Fonts/Supplemental/Songti.ttc';latin='/System/Library/Fonts/Supplemental/Arial.ttf'
draw.text((W*.81,H*.257),'北京',font=ImageFont.truetype(font,112),fill=255,anchor='mm')
draw.text((W*.81,H*.335),'BEIJING',font=ImageFont.truetype(latin,83),fill=255,anchor='mm')
label.save(OUT/'label-beijing.webp',lossless=True)
label.resize((1536,669)).save(REVIEW/'label-beijing.png')
catalog_path=OUT/'catalog.json';catalog=json.loads(catalog_path.read_text())
catalog['variants']=[v for v in catalog['variants'] if v['theme']!='beijing']+records
catalog.setdefault('labels',{'china':'label-china.webp','shenzhen':'label-shenzhen.webp','he':'label-he.webp','create':'label-create.webp'})['beijing']='label-beijing.webp'
catalog_path.write_text(json.dumps(catalog,ensure_ascii=False,indent=2)+'\n')

# Same-transform overlay: cyan original source ink and red derived line ink.
overlay=np.full((H,W,3),255,dtype=np.float32)
overlay[:,:,0]-=lines*.65;overlay[:,:,2]-=lines*.65
image(overlay).resize((1536,669)).save(REVIEW/'source-alignment.webp',quality=95)
raw=placed(alpha[:content_bottom]);diff=np.abs(raw-lines)
image(diff*4).resize((1536,669)).save(REVIEW/'cleanup-difference.png')
source_white=Image.new('RGBA',source.size,'white');source_white.alpha_composite(source)
source_white.convert('RGB').save(REVIEW/'source-on-white.webp',quality=98)
candidate=M/'imagegen-upscale-candidate.png'
audit={'sourceSha256':sha(SOURCE),'sourceSize':[sw,sh],'runtimeSize':SIZE,
       'sourceToRuntime':{'scale':scale,'paste':[ox,oy],'resized':[dw,dh],'contentBottom':content_bottom,'isotropic':True},
       'resolution':'source-locked high-quality raster enlargement; no invented source detail',
       'imagegen':{'candidateSha256':sha(candidate),'size':Image.open(candidate).size,'accepted':False,
                   'reason':'candidate redrew roof, wall and cloud details and remained 1941 pixels wide; source geometry wins'},
       'coverage':'independent architectural/terrain semantic fill, cloud interiors remain unfilled',
       'height':'source alpha after one isotropic transform and floating Gaussian .65; not RGB',
       'normal':{'encoding':'rgba16f','gradientGain':2.1,'scale':.7,'paintScale':.22},
       'allVariantsSharedStructure':len({v['structureSha256'] for v in records})==1,
       'plaque':'original source 祈年殿 is never substituted or toggled with the optional 北京 / BEIJING label',
       'cleanup':{'sourceCorePixels':int((alpha>=128).sum()),'cleanCorePixels':int((clean>=128).sum()),'maxRuntimeInkDelta':float(diff.max())},
       'fontSources':[font,latin],'variants':records}
(E/'derivation.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2)+'\n')
assert audit['cleanup']['sourceCorePixels']==audit['cleanup']['cleanCorePixels']
assert audit['allVariantsSharedStructure']
print(json.dumps({'variants':len(records),'size':SIZE,'placement':audit['sourceToRuntime'],'sourceCorePreserved':True},ensure_ascii=False))
