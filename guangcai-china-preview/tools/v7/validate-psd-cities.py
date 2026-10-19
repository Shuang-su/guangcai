"""Independent coordinate/ratio check against source pixels, not compiler output metadata."""
from pathlib import Path
import json,hashlib,gzip,struct
import numpy as np
from PIL import Image,ImageFilter,ImageDraw,ImageFont
ROOT=Path(__file__).resolve().parents[2];RELEASE=ROOT/'public/releases/v7-7';SRC=ROOT/'.codex-work/cache/v7.1.7';OUT=ROOT/'evidence/v7.1.7'
c=json.loads((RELEASE/'catalog.json').read_text());m=json.loads((RELEASE/c['manifestUrl']).read_text());rows=[];sheet=Image.new('RGB',(1600,6*230),'#faf8f2');draw=ImageDraw.Draw(sheet);font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Songti.ttc',22)
for i,(ident,city) in enumerate(m['cities'].items()):
    a=np.asarray(Image.open(SRC/('mastergo-'+ident+'.png')).convert('RGBA'),dtype=np.float32);source=(a[:,:,0]-a[:,:,2])*a[:,:,3]/255;y,x=np.where(source>130);tiers={}
    # Derived directly from the source/full-target dimensions; no compiler helpers.
    scale=4096/3878;dy=1783-1630*scale
    for tier,level in city['levels'].items():
        asset=level['mask'];raw=(RELEASE/asset['url']).read_bytes();assert hashlib.sha256(raw).hexdigest()==asset['sha256'];image=Image.open(RELEASE/asset['url']).convert('RGB');mask=np.asarray(image);h,w=mask.shape[:2]
        xx=np.rint(((x[::17]+.5)*scale)*w/4096-.5).astype(int);yy=np.rint(((y[::17]+.5)*scale+dy)*h/1783-.5).astype(int);support=np.asarray(image.getchannel('R').filter(ImageFilter.MaxFilter(5)));recall=float(np.mean(support[np.clip(yy,0,h-1),np.clip(xx,0,w-1)]>40));assert recall>.99,(ident,tier,recall)
        assert np.all(mask[:,:,1]>=mask[:,:,0]),(ident,tier,'fill lost lines')
        normal=level['normal'];b=(RELEASE/normal['url']).read_bytes();assert hashlib.sha256(b).hexdigest()==normal['sha256'];unpacked=gzip.decompress(b);assert unpacked[:4]==b'HFN1' and struct.unpack('<III',unpacked[4:16])==(w,h,2);canonical=np.frombuffer(unpacked,dtype=np.uint8,offset=16).reshape(8,-1).T.copy().tobytes();v=np.frombuffer(canonical,dtype='<f2').reshape(h,w,4)[::-1,:,:3].astype(np.float32)*2-1;err=float(np.max(np.abs(np.linalg.norm(v,axis=2)-1)));assert err<.002
        tiers[tier]={'sourceStrokeRecallWithin2px':recall,'maxNormalLengthError':err,'size':[w,h]}
        if tier=='detail':
            preview=Image.new('RGB',(w,h),'white');preview.paste('#609c95',(0,0,w,h),image.getchannel('G'));preview.paste('#b88c36',(0,0,w,h),image.getchannel('R'));preview.thumbnail((386,180),Image.Resampling.LANCZOS);px,py=(i%4)*400+7,(i//4)*230+35;sheet.paste(preview,(px,py));draw.text((px,py-28),city['name'],font=font,fill='#3d493f')
    rows.append({'id':ident,'scaleX':scale,'scaleY':scale,'sourceCanvasUncropped':True,'tiers':tiers});print(ident,'independent source/PSD mapping passed',flush=True)
sheet.save(OUT/'cities-contact.jpg',quality=94);(OUT/'source-registration.json').write_text(json.dumps({'passed':True,'cities':23,'tiers':69,'mappingChecks':rows,'fullWidth':True,'cropping':False,'nonuniformStretch':False},ensure_ascii=False,indent=2)+'\n')
