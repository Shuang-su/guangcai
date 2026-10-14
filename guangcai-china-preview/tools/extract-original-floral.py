"""Decode the delivered PSD with its embedded ICC profile; no Photoshop or redrawing."""
from pathlib import Path
from PIL import Image, ImageCms
import struct, io, json, hashlib
import numpy as np

ROOT=Path(__file__).resolve().parents[1]
source=ROOT/'assets/source/floral-export.psd'
out=ROOT/'assets/masters/v3';out.mkdir(parents=True,exist_ok=True)
with source.open('rb') as f:
    def u32():return struct.unpack('>I',f.read(4))[0]
    f.seek(26);f.seek(u32(),1);size=u32();end=f.tell()+size;icc=None
    while f.tell()+12<=end:
        f.read(4);rid=struct.unpack('>H',f.read(2))[0];n=f.read(1)[0]
        f.seek(n+(-(n+1))%2,1);size=u32();data=f.read(size);f.seek(size%2,1)
        if rid==1039:icc=data
assert icc,'A declared CMYK profile is required'
profile=ImageCms.ImageCmsProfile(io.BytesIO(icc))
im=ImageCms.profileToProfile(Image.open(source),profile,ImageCms.createProfile('sRGB'),outputMode='RGB',renderingIntent=0)
im.save(ROOT/'assets/masters/floral-source-v3-srgb.png')
# Bounds are verified against the coloured perimeter, not a global white-pixel key.
# Tiny inset removes printed ochre rules; white flowers and root openings survive.
crops={'body':(5017,122,5654,1656),'handle':(5999,23,6147,1747)}
for name,box in crops.items():im.crop(box).save(out/f'{name}.png')

a=np.asarray(im);mask=(a.max(2).astype(int)-a.min(2))>35
points=[]
for x in range(500,5400,5):
    ys=np.flatnonzero(mask[1950:,x])+1950
    if len(ys):points.append((x,ys[0]))
x,y=np.array(points).T
cx,cy,k=np.linalg.lstsq(np.stack([2*x,2*y,np.ones_like(x)],1),x*x+y*y,rcond=None)[0]
radius=float(np.sqrt(k+cx*cx+cy*cy))
# Full original arc, with the thin printed border cropped away. Top row is the
# outer (upper) edge; the mapping preserves angular order, never mirror-repeats.
t0,t1=-.934,.948
r0,r1=radius-22,3582.0
w,h=round((r0+r1)/2*(t1-t0)),round(r0-r1)+1
theta=np.linspace(t0,t1,w)[None,:];r=np.linspace(r0,r1,h)[:,None]
sx=cx+r*np.sin(theta);sy=cy-r*np.cos(theta)
x0=np.floor(sx).astype(int);y0=np.floor(sy).astype(int);dx=(sx-x0)[...,None];dy=(sy-y0)[...,None]
sample=((a[y0,x0]*(1-dx)+a[y0,x0+1]*dx)*(1-dy)+(a[y0+1,x0]*(1-dx)+a[y0+1,x0+1]*dx)*dy)
sample=np.uint8(np.clip(np.round(sample),0,255))
Image.fromarray(sample).save(out/'saucer.png')
manifest={'source':str(source.relative_to(ROOT)),'sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'sourceSize':list(im.size),'sourceMode':'CMYK','embeddedProfile':ImageCms.getProfileDescription(profile).strip(),'outputProfile':'sRGB','renderingIntent':'perceptual','regions':{'body':{'label':'450 ml 杯','crop':crops['body']},'handle':{'label':'450 杯把','crop':crops['handle']},'saucer':{'label':'151 碟 A01-01','center':[float(cx),float(cy)],'outerCircleRadius':radius,'fitRmsPixels':float(np.std(np.hypot(x-cx,y-cy)-radius)),'radiusRange':[r0,r1],'angleRangeRadians':[t0,t1],'size':[w,h],'direction':'left to right along original arc; outer edge at top','seam':'Trimmed end paper and printed outline. One original arc wraps once; artwork is not a periodic tile. Join is placed toward the handle side.'}},'method':'Direct ICC conversion, rectangular crop and polar resampling; no generative redraw; printed text and rules excluded geometrically.'}
(ROOT/'evidence/source-floral-v3.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
print(json.dumps(manifest,ensure_ascii=False))
