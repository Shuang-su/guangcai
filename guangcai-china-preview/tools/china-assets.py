"""Direct PSD channel decoding and deterministic artwork data derivation. No Photoshop.
RGB is never interpreted as physical height. All derived files share the PSD frame.
"""
from pathlib import Path
import struct, json, hashlib, zlib
import numpy as np
from PIL import Image, ImageFilter, ImageDraw

ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/'assets/source/china-lines.psd'
OUT=ROOT/'public/china'; OUT.mkdir(exist_ok=True)
EVIDENCE=ROOT/'evidence'; EVIDENCE.mkdir(exist_ok=True)
FRAME=(777,2243,6210,4608)
SIZE=(4096,1783)

def decode(raw,w,h):
    comp=struct.unpack('>H',raw[:2])[0]
    if comp==0: return raw[2:]
    if comp==2: return zlib.decompress(raw[2:])
    if comp!=1: raise ValueError(f'Unsupported channel compression {comp}')
    sizes=struct.unpack('>'+str(h)+'H',raw[2:2+h*2]); off=2+h*2; result=bytearray()
    for size in sizes:
        row=raw[off:off+size]; off+=size; j=0; line=bytearray()
        while j<len(row):
            n=row[j]; j+=1
            if n<128: line.extend(row[j:j+n+1]); j+=n+1
            elif n>128: line.extend(row[j:j+1]*(257-n)); j+=1
        assert len(line)==w
        result.extend(line)
    return bytes(result)

def read_psd(path):
    layers=[]; resources=[]
    with path.open('rb') as f:
        def u32():return struct.unpack('>I',f.read(4))[0]
        def u16():return struct.unpack('>H',f.read(2))[0]
        header=struct.unpack('>4sH6sHIIHH',f.read(26))
        assert header[0]==b'8BPS' and header[1]==1 and header[-2:]==(8,3)
        f.seek(u32(),1); re=f.tell()+4; length=u32(); re=f.tell()+length
        while f.tell()+12<=re:
            sig=f.read(4); rid=u16(); n=f.read(1)[0]; f.seek(n+(-(n+1))%2,1)
            length=u32(); resources.append(rid); f.seek(length+length%2,1)
        f.seek(re); lm=u32(); li=u32(); li_start=f.tell(); count=abs(struct.unpack('>h',f.read(2))[0])
        for i in range(count):
            y,x,b,r=struct.unpack('>iiii',f.read(16)); nc=u16()
            channels=[(struct.unpack('>h',f.read(2))[0],u32()) for _ in range(nc)]
            blend=f.read(12); ln=u32(); end=f.tell()+ln
            f.seek(u32(),1);f.seek(u32(),1);n=f.read(1)[0];name=f.read(n).decode('gb18030',errors='replace');f.seek((-(n+1))%4,1)
            tags=[]
            while f.tell()+12<=end:
                sig=f.read(4);key=f.read(4);length=u32();data=f.read(length);f.seek(length%2,1);tags.append(key.decode('ascii'))
                if key==b'luni':name=data[4:4+struct.unpack('>I',data[:4])[0]*2].decode('utf-16be')
            f.seek(end);layers.append(dict(name=name,box=(x,y,r,b),channels=channels,tags=tags))
        for layer in layers:
            x,y,r,b=layer['box'];w,h=r-x,b-y
            for cid,length in layer['channels']:
                raw=f.read(length)
                if cid==-1 and w and h:layer['alpha']=Image.frombytes('L',(w,h),decode(raw,w,h))
    return layers,resources

layers,resources=read_psd(SOURCE)
EXTRACTED=ROOT/'assets/extracted';EXTRACTED.mkdir(exist_ok=True)
for i,layer in enumerate(layers):
    if 'alpha' in layer and layer['name'] in ['东方明珠线','广州塔线','深圳平安大厦线','长城线','天坛线','字']:
        layer['alpha'].save(EXTRACTED/f'layer-{i}-alpha.png')
(EXTRACTED/'layout.json').write_text(json.dumps([{'index':i,'name':l['name'],'box':l['box']} for i,l in enumerate(layers)],ensure_ascii=False,indent=2))
W,H=FRAME[2]-FRAME[0],FRAME[3]-FRAME[1]
raw=np.zeros((H,W),dtype=np.uint8); clean=raw.copy(); metal=raw.copy(); label=raw.copy(); cleanup=[]
for layer in layers:
    name=layer['name']
    if name not in ['东方明珠线','广州塔线','深圳平安大厦线','长城线','天坛线','字']:continue
    arr=np.array(layer['alpha']); x,y,r,b=layer['box'];xx,yy=x-FRAME[0],y-FRAME[1]
    if name=='字':label[yy:yy+arr.shape[0],xx:xx+arr.shape[1]]=arr;continue
    # Remove only very faint residue away from confidently painted strokes.
    core=Image.fromarray((arr>=48).astype('uint8')*255)
    support=np.array(core.filter(ImageFilter.MaxFilter(5)))>0
    normalized=np.where(support,arr,0).astype('uint8')
    # Suppress disconnected faint speckles; dense valid crosshatching remains.
    normalized[normalized<5]=0
    raw[yy:yy+arr.shape[0],xx:xx+arr.shape[1]]=np.maximum(raw[yy:yy+arr.shape[0],xx:xx+arr.shape[1]],arr)
    clean[yy:yy+arr.shape[0],xx:xx+arr.shape[1]]=np.maximum(clean[yy:yy+arr.shape[0],xx:xx+arr.shape[1]],normalized)
    # Independent per-building silhouette. Wall/mountains close vertically to their
    # original baseline; buildings fill horizontal enclosed width, preserving eaves.
    contour=normalized>=80; fill=np.zeros_like(arr)
    if name=='长城线':
        for col in range(arr.shape[1]):
            rows=np.flatnonzero(contour[:,col])
            if rows.size:fill[rows[0]:,col]=255
    else:
        for row in range(arr.shape[0]):
            cols=np.flatnonzero(contour[row])
            if cols.size:fill[row,cols[0]:cols[-1]+1]=255
    fill=np.maximum(fill,normalized)
    metal[yy:yy+arr.shape[0],xx:xx+arr.shape[1]]=np.maximum(metal[yy:yy+arr.shape[0],xx:xx+arr.shape[1]],fill)
    cleanup.append({'layer':name,'removedAlphaSum':int(arr.sum(dtype=np.int64)-normalized.sum(dtype=np.int64)),'retainedPixelsAtAlpha128':int((normalized>=128).sum()),'originalPixelsAtAlpha128':int((arr>=128).sum())})

# The PSD guide has 5-9 transparent pixels below the drawing. Remove that
# guide-only bottom padding from all channels together so art reaches the foot.
CONTENT_BOTTOM=2360
# Carry the independently reconstructed metal face through the last few pixels
# of baseline antialiasing. Only columns already occupied near the foot extend.
metal[CONTENT_BOTTOM-10:CONTENT_BOTTOM]=np.maximum(metal[CONTENT_BOTTOM-10:CONTENT_BOTTOM],metal[CONTENT_BOTTOM-10:CONTENT_BOTTOM].max(axis=0))
def resize(arr):return Image.fromarray(arr[:CONTENT_BOTTOM]).resize(SIZE,Image.Resampling.LANCZOS)
def save(arr,name):
    im=arr if isinstance(arr,Image.Image) else Image.fromarray(arr)
    im.save(OUT/name)
    return im
raw_img=resize(raw);stroke=resize(clean);metal_img=resize(metal);label_img=resize(label)
save(raw_img,'lines-original.png');save(stroke,'lines.png');save(metal_img,'metalness.png');save(label_img,'label.png')
# Two rounded stroke profiles keep a defined crest and a softer shoulder.
# Neither the metal silhouette nor RGB color contributes to this height field.
height_field=(np.array(stroke.filter(ImageFilter.GaussianBlur(.65)),dtype=np.float32)*.8
              +np.array(stroke.filter(ImageFilter.GaussianBlur(1.35)),dtype=np.float32)*.2)
save(np.round(height_field).astype('uint8'),'height.png')
field=height_field/255
dy,dx=np.gradient(field)
normal=np.stack([-dx*5.0,dy*5.0,np.ones_like(field)],axis=-1)
normal/=np.linalg.norm(normal,axis=-1,keepdims=True)
save(np.round((normal*.5+.5)*255).astype('uint8'),'normal.png')
# Satin metal base and slightly smoother stroke/shoulder reflect independently.
# This mask follows source alpha; it is not a painted highlight or dark outline.
finish=np.asarray(stroke.filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.GaussianBlur(.75)),dtype=np.float32)/255
finish=np.minimum(1,finish*1.15)*(np.asarray(metal_img,dtype=np.float32)/255)
save(np.round(finish*255).astype('uint8'),'line-finish.png')
save(np.round((.40-(.40-.28)*finish)*255).astype('uint8'),'roughness.png')
save(np.full((SIZE[1],SIZE[0],3),[255,198,67],dtype='uint8'),'baseColor.png')
save(np.full((SIZE[1],SIZE[0]),255,dtype='uint8'),'label-roughness.png')
# Alignment and cleanup proof: same origin, no change to any substantial stroke.
diff=np.abs(np.array(raw_img,dtype=np.int16)-np.array(stroke,dtype=np.int16)).astype('uint8')
save(diff,'cleanup-difference.png')
preview=Image.new('RGB',SIZE,'white');preview.paste('#d4ab26',(0,0),metal_img);preview.paste('#7c5c0f',(0,0),stroke);preview.paste('#bb992c',(0,0),label_img)
preview.resize((1600,696)).save(EVIDENCE/'china-atlas-preview.png')
pack={'id':'china-draft-20261011','version':2,'name':'中国 · 临时线稿','layout':'blank-300deg-v1','placement':{'scale':.82,'offsetU':.047,'offsetV':0},'baseColor':'baseColor.png','normal':'normal.png','roughness':'roughness.png','metalness':'metalness.png','height':'height.png'}
(OUT/'city.json').write_text(json.dumps(pack,indent=2,ensure_ascii=False))
audit={'sourceSha256':hashlib.sha256(SOURCE.read_bytes()).hexdigest(),'size':[7016,4961],'frame':FRAME,'outputSize':SIZE,'bottomAnchor':{'psdGuideBottom':4608,'contentBottom':4603,'cupExteriorY':.12,'metalBaselineExtensionPixels':10,'note':'Guide-only transparent padding removed consistently; city material extends onto rounded exterior foot, not underside'},'resourceIds':resources,'savedPaths':any(2000<=r<=2997 for r in resources),'vectorMasks':any(t in ['vmsk','vsms'] for l in layers for t in l['tags']),'layers':[{k:v for k,v in l.items() if k!='alpha'} for l in layers],'cleanup':cleanup,'metalFillMethod':'per-layer row silhouette; wall per-column to original baseline; visual approximation','relief':'stroke-derived normal only; no geometric displacement; convex default','cityMaterial':{'baseRoughness':0.4,'lineRoughness':0.28,'lineFinishMask':'line-finish.png','roundedHeightProfile':{'coreSigmaPx':0.65,'coreWeight':0.8,'shoulderSigmaPx':1.35,'shoulderWeight':0.2},'normalGradientGain':5.0,'normalScale':0.45,'clearcoatCoverage':6/255,'labelRoughness':66/255,'labelClearcoatCoverage':26/255},'text':'PSD original 中国 / CHINA; fixed gold; separate alpha','maps':{p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in OUT.glob('*.png')}}
(EVIDENCE/'psd-audit.json').write_text(json.dumps(audit,indent=2,ensure_ascii=False))
assert all(x['retainedPixelsAtAlpha128']==x['originalPixelsAtAlpha128'] for x in cleanup)
print(json.dumps({'out':str(OUT),'size':SIZE,'cleanup':cleanup},ensure_ascii=False))
