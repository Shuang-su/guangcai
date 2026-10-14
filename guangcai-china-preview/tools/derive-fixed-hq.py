"""PBR data from the original decals. Float height -> half-float normals.

The only authored image change is the separately saved generated seam insert.
Upsampling improves sampling, not the information content of the original PSD.
"""
from pathlib import Path
import gzip, hashlib, json, struct
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/fixed'
MASTER = ROOT / 'assets/masters/v3-hq'
OUT.mkdir(exist_ok=True); MASTER.mkdir(exist_ok=True)
layout = json.loads((ROOT/'src/styles/fixed-layout.json').read_text())
physical = json.loads((ROOT/'assets/surface-metrics.json').read_text())
physical['body']['width'] *= .5 + layout['body']['visibleEndFraction']
physical['saucer']['width'] *= 4
sizes = {'body': (1024, 2466), 'handle': (320, 3728), 'saucer': (8192, 384)}

def smooth(a, b, x):
    t = np.clip((x-a)/(b-a), 0, 1)
    return t*t*(3-2*t)

def blur(a, sigma, periodic=False):
    result = a.astype(np.float32)
    r = int(np.ceil(sigma*3))
    k = np.exp(-np.arange(-r,r+1,dtype=np.float32)**2/(2*sigma*sigma)); k /= k.sum()
    for axis in [0,1]:
        pads = [(0,0)] * a.ndim; pads[axis] = (r,r)
        p = np.pad(result, pads, mode='wrap' if periodic and axis == 1 else 'edge')
        result = np.zeros_like(result)
        for offset, weight in enumerate(k):
            sl = [slice(None)]*a.ndim; sl[axis] = slice(offset,offset+a.shape[axis])
            result += p[tuple(sl)] * weight
    return result

def resize(a, size, periodic=False):
    if periodic:
        joined = np.concatenate([a,a,a], axis=1)
        b = np.asarray(Image.fromarray(joined).resize((size[0]*3,size[1]), Image.Resampling.BICUBIC))
        return b[:,size[0]:2*size[0]].copy()
    return np.asarray(Image.fromarray(a).resize(size, Image.Resampling.BICUBIC)).copy()

seam = Image.open(MASTER/'seam-repair-generated.png').convert('RGB')
# The generated result includes white top/bottom padding; crop only that padding.
sa = np.asarray(seam); rows = np.where((sa.min(2) < 220).mean(1) > .75)[0]
seam = seam.crop((0,int(rows[0]),seam.width,int(rows[-1]+1)))
report = {'version':8, 'method':'Float32 semantic silhouette/ink height, 16-bit height masters, RGBA16F tangent normals; lossless runtime data',
          'precisionNote':'Resampling preserves source motifs; it does not create missing source detail.',
          'seam':{'generatedSource':'assets/masters/v3-hq/seam-repair-generated.png','prompt':'assets/masters/v3-hq/seam-prompt.txt','crop':[0,int(rows[0]),sa.shape[1],int(rows[-1]+1)],'patchWidthSourcePixels':768,'featherSourcePixels':128,'periodicU':True}, 'regions':{}}
manifest = {'version':8,'name':'原始广彩花纸 · 高精度连续花带','mapping':'source-layout-v3','regions':{},
            'renderStandard':{'relief':4.4,'clearcoatRelief':2.4,'exposure':1.08},
            'provenance':'Original ICC-converted PSD layout; localized seam repair is separately generated and identified.',
            'method':report['method'],'heightCalibration':'Visual micro-relief; no measured physical height or geometric displacement.'}
style = {'name':manifest['name'],'mapping':'source-layout-v3','regions':{}}
for name,size in sizes.items():
    source = np.array(Image.open(ROOT/f'assets/masters/v3/{name}.png').convert('RGB'))
    h0,w0 = source.shape[:2]; periodic = name == 'saucer'
    if periodic:
        # Join lies in the middle of a continuous patch. Original pixels outside
        # the 768px local neighbourhood remain untouched, with cosine shoulders.
        target = np.concatenate([source[:,-384:],source[:,:384]], axis=1).astype(np.float32)
        patch = np.asarray(seam.resize((768,h0),Image.Resampling.LANCZOS)).astype(np.float32)
        x=np.arange(768); a=smooth(0,128,np.minimum(x,767-x))[None,:,None]
        combined=np.uint8(np.clip(np.rint(target*(1-a)+patch*a),0,255))
        source[:,-384:]=combined[:,:384];source[:,:384]=combined[:,384:]
        Image.fromarray(combined).save(MASTER/'seam-final-native.png')
    Image.fromarray(source).save(MASTER/f'{name}-continuous.png')
    rgb=source.astype(np.float32)/255
    # The old AI-master ochre rule rejected this PSD's yellow ground (B~0)
    # but accepted cream petals. Use the measured three original ground inks.
    palette=np.array([[205,173,0],[197,164,20],[157,117,43]],np.float32)/255
    distance=np.minimum.reduce([np.sqrt(((rgb-p)**2).sum(2)) for p in palette])
    gold=1-smooth(8/255,29/255,distance)
    # Broad saturated ochre in the authored seam is still a metal ground.
    if periodic:
        seam_zone=np.zeros((h0,w0),np.float32);seam_zone[:,:384]=1;seam_zone[:,-384:]=1
        ratio=rgb[:,:,1]/np.maximum(.01,rgb[:,:,0]);blue=rgb[:,:,2]/np.maximum(.01,rgb[:,:,0])
        ochre=smooth(.55,.68,ratio)*(1-smooth(.88,.96,ratio))*(1-smooth(.19,.29,blue))*smooth(.35,.5,rgb[:,:,0])
        gold=np.maximum(gold,ochre*seam_zone)
    gold=blur(gold,.45,periodic)
    near=blur(rgb,1.8,periodic)
    contrast=np.maximum(0,(near-rgb).max(2))/np.maximum(.2,near.max(2))
    ink=smooth(.045,.20,contrast)*(1-gold)
    # Preserve narrow coloured ink, remove isolated subpixel specks, and keep all
    # height arithmetic float until after the high-resolution derivative.
    height=blur((92+(1-gold)*24+ink*24)/255,.85,periodic)
    if name=='body':
        paper=smooth(.965,.995,rgb.min(2));height=height*(1-paper)+(92/255)*paper;gold*=1-paper
    height=resize(height.astype(np.float32),size,periodic)
    metal=np.clip(resize(gold.astype(np.float32),size,periodic),0,1)
    color=resize(source,size,periodic).astype(np.float32)
    color=color*(1-metal[:,:,None])+np.array([255,200,70],np.float32)*metal[:,:,None]
    color=np.uint8(np.clip(np.rint(color),0,255))
    w,h=size
    # Scale derivatives with output density so finer sampling doesn't flatten it.
    dx=(np.roll(height,-1,1)-np.roll(height,1,1))*1.6*w/w0
    if not periodic:
        dx[:,0]=dx[:,1];dx[:,-1]=dx[:,-2]
    dy=(np.roll(height,-1,0)-np.roll(height,1,0))*1.6*h/h0
    dy[0]=dy[1];dy[-1]=dy[-2]
    length=np.sqrt(dx*dx+dy*dy+1)
    normal=np.stack([(-dx/length+1)/2,(dy/length+1)/2,(1/length+1)/2],2)
    normal=np.clip(normal,0,1)
    for channel,arr in {'baseColor':color,'metalness':np.uint8(np.rint(metal*247)),
                        'roughness':np.uint8(np.rint((.22*metal+.29*(1-metal))*255)),
                        'normal':np.uint8(np.rint(normal*255))}.items():
        Image.fromarray(arr).save(OUT/f'{name}-{channel}.png')
    hi16=np.uint16(np.rint(np.clip(height,0,1)*65535))
    Image.fromarray(hi16).save(OUT/f'{name}-height.png')
    Image.fromarray(hi16).save(MASTER/f'{name}-height-16.png')
    # Rows are bottom-up for a typed GPU upload (no HTML Image flipY).
    rgba=np.ones((h,w,4),np.float16);rgba[:,:,:3]=normal
    binary=b'HFN1'+struct.pack('<III',w,h,1)+rgba[::-1].astype('<f2').tobytes()
    compressed=gzip.compress(binary,compresslevel=6,mtime=0)
    normal_file=f'{name}-normal.hfn.gz';(OUT/normal_file).write_bytes(compressed)
    urls={c:f'{name}-{c}.png' for c in ['baseColor','normal','height','roughness','metalness']};urls['normal']=normal_file
    offset=layout['saucer']['sourceOffsetU'] if periodic else 0
    style['regions'][name]={**urls,'normalFormat':'rgba16f-gzip-v1','offsetU':offset}
    manifest['regions'][name]={'width':w,'height':h,'sourceSize':[w0,h0],'physical':physical[name],
        'layout':'source-layout-v3','offsetU':offset,'normalFormat':'rgba16f-gzip-v1','maps':{c:{'url':'fixed/'+p,'sha256':hashlib.sha256((OUT/p).read_bytes()).hexdigest()} for c,p in urls.items()}}
    cream=(rgb[:,:,0]>.72)&(rgb[:,:,1]>.65)&(rgb[:,:,2]>.40)&((rgb.max(2)-rgb.min(2))<.40)
    report['regions'][name]={'sourceSize':[w0,h0],'size':[w,h],'normalCompressedBytes':len(compressed),'normalRawBytes':len(binary),
        'floatHeightLevels':len(np.unique(height)),'savedHeightLevels':len(np.unique(hi16)),
        'creamMeanMetalness':float(gold[cream].mean()) if cream.any() else 0,
        'boundaryColorMeanDelta':float(np.abs(color[:,0].astype(float)-color[:,-1]).mean()) if periodic else None,
        'normalHalfFloatMaxError':float(np.max(np.abs(rgba[:,:,:3].astype(np.float32)-normal)))}
    print(name,report['regions'][name],flush=True)
(OUT/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
(OUT/'style.json').write_text(json.dumps(style,ensure_ascii=False,indent=2))
(ROOT/'evidence/floral-hq/derivation.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
