"""Compile the full MasterGo canvas once into the PSD-shaped runtime frame.

No ink-bounds fitting, per-city bottom movement, or second layout scale is applied.
"""
from pathlib import Path
import sys,json,io,importlib.util,gzip,struct
import numpy as np
from PIL import Image,ImageDraw,ImageFilter
ROOT=Path(__file__).resolve().parents[2];HERE=Path(__file__).resolve().parent
sys.path.insert(0,str(HERE));sys.dont_write_bytecode=True
spec=importlib.util.spec_from_file_location('reviewed_channels',HERE/'compile-city-alignment.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
CONFIG=json.loads((ROOT/'assets/masters/v7.1.7/mapping.json').read_text());INPUT=ROOT/'.codex-work/cache/v7.1.7';OUT=ROOT/'public/releases/v7-7';LAB=ROOT/'public/dev-assets';EVIDENCE=ROOT/'evidence/v7.1.7';EVIDENCE.mkdir(parents=True,exist_ok=True)
W,H=CONFIG['runtime'];s=CONFIG['scale']/2;dx,dy=CONFIG['offset'];reports=[];cities={};experimental={}
for e in json.loads((INPUT/'inputs.json').read_text()):
    source=(INPUT/e['file']).read_bytes();assert m.sha(source)==e['sha256'];a=np.asarray(Image.open(io.BytesIO(source)).convert('RGBA'),dtype=np.float32)
    assert list(a.shape[:2][::-1])==[3878,1630]
    ink=np.clip(a[:,:,0]-a[:,:,2],0,255)*a[:,:,3]/255
    support=np.asarray(Image.fromarray(np.uint8(ink>130)*255).filter(ImageFilter.MaxFilter(3)))>0;ink[~support]=0
    left,top,right,bottom=m.bounds(ink);barrier=Image.fromarray(np.uint8(np.pad(ink[:bottom]>70,4))*255)
    ImageDraw.Draw(barrier).line([(left+4,bottom+3),(right+3,bottom+3)],fill=255,width=1)
    barrier=barrier.filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.MinFilter(3));flood=barrier.copy();ImageDraw.floodfill(flood,(0,0),128)
    fill=np.zeros_like(ink,dtype=np.uint8);fill[:bottom]=np.uint8(np.asarray(flood)[4:-4,4:-4]!=128)*255;fill=np.maximum(fill,np.uint8(ink))
    def place(channel):
        # Extend only the canvas edge for antialias filtering, never individual ink bounds.
        padded=np.pad(np.uint8(channel),((0,8),(0,0)),mode='edge')
        return np.asarray(Image.fromarray(padded).transform((W,H),Image.Transform.AFFINE,(1/s,0,-dx/s,0,1/s,-dy/s),resample=Image.Resampling.BICUBIC))
    lines,coverage=place(ink),place(fill);coverage=np.maximum(coverage,lines);vectors=m.normal_vectors(lines)
    m.OUT=LAB if e.get('experimental') else OUT;levels={};tiers={}
    for tier,w in ([('standard',2048)] if e.get('experimental') else [('light',1024),('standard',2048),('detail',4096)]):
        h=round(H*w/W);size=(w,h)
        line=np.asarray(Image.fromarray(lines).resize(size,Image.Resampling.LANCZOS));cover=np.asarray(Image.fromarray(coverage).resize(size,Image.Resampling.LANCZOS));cover=np.maximum(cover,line)
        mask=Image.fromarray(np.stack([line,cover,np.zeros_like(line)],axis=2));raw=gzip.decompress(m.normal_map(vectors,size));planes=np.frombuffer(raw,dtype=np.uint8,offset=16).reshape(-1,8).T.tobytes();normal=gzip.compress(raw[:12]+struct.pack('<I',2)+planes,compresslevel=9,mtime=0)
        levels[tier]={'mask':m.emit(e['id']+'-'+tier+'-mask',m.webp(mask),size,source,2),'normal':m.emit(e['id']+'-'+tier+'-normal',normal,size,source,4,'hfn1-gzip')}
        tiers[tier]={'size':list(size),'lineBounds':m.bounds(line),'coverageBounds':m.bounds(cover)}
    entry={'name':e['name'],'levels':levels}
    if e.get('experimental'):
        entry.update(cityId=e['cityId'],experimental=True,rasterWidth=2048);entry['levels']={k:levels['standard'] for k in ['light','standard','detail']};experimental[e['id']]=entry
    else:cities[e['id']]=entry
    reports.append({'id':e['id'],'sourceSha256':e['sha256'],'sourceSvgSha256':e['svgSha256'],'canvas':[3878,1630],'uniformScale':s,'offset':[dx,dy],'perCityTranslation':False,'tiers':tiers})
    # Ignored complete channels are kept for an independent full-canvas overlay check.
    Image.fromarray(lines).save(INPUT/(e['id']+'-runtime-lines.png'))
    (EVIDENCE/'city-build-progress.json').write_text(json.dumps({'completed':len(reports),'total':25,'last':e['id']}))
    print(e['id'],'mapped with shared PSD matrix',flush=True)
(INPUT/'compiled-cities.json').write_text(json.dumps(cities,ensure_ascii=False,indent=2)+'\n');(INPUT/'compiled-experiments.json').write_text(json.dumps(experimental,ensure_ascii=False,indent=2)+'\n')
(EVIDENCE/'city-derivation.json').write_text(json.dumps({'mapping':CONFIG,'cities':reports,'sourceGeometryChanged':False},ensure_ascii=False,indent=2)+'\n')
