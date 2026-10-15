"""Compile a registry of source-aligned, editable city masters and shared V5 maps.

Requires Pillow, NumPy and vtracer (see requirements-v5.txt), plus local Node/sharp.
Run from any directory. No color variant is baked into a city structure pack.
"""
from pathlib import Path
import io,json,hashlib,struct,gzip,subprocess,sys,shutil,re,xml.etree.ElementTree as ET
import numpy as np
from PIL import Image,ImageFilter,ImageDraw,ImageFont
import vtracer

ROOT=Path(__file__).resolve().parents[1]
MASTER=ROOT/'assets/masters/v5';OUT=ROOT/'public/cities/v5'
TMP=ROOT/'.codex-work/tmp/v5';EVIDENCE=ROOT/'evidence/city-v5'
for p in [OUT,TMP,EVIDENCE]:p.mkdir(parents=True,exist_ok=True)
SPEC=json.loads((MASTER/'cities.json').read_text());MW,MH=SPEC['masterSize'];W,H=SPEC['runtimeSize']
ids=[c['id'] for c in SPEC['cities']]
if len(ids)!=len(set(ids)) or any(not re.fullmatch(r'[a-z][a-z0-9-]*',i) or i=='china' for i in ids):raise ValueError('City IDs must be unique lowercase slugs; china is reserved for the legacy pack')
NS='http://www.w3.org/2000/svg'
ET.register_namespace('',NS)
def digest(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def png(a):
 b=io.BytesIO();Image.fromarray(np.uint8(np.clip(a,0,255))).save(b,format='PNG');return b.getvalue()
def vector(a):
 # Fit pixel contours locally; never reconstruct landmarks from idealized primitives.
 svg=vtracer.convert_raw_image_to_svg(png(255-a),img_format='png',colormode='binary',mode='spline',filter_speckle=0,corner_threshold=60,length_threshold=2,path_precision=3)
 tree=ET.fromstring(svg);return '\n'.join(ET.tostring(x,encoding='unicode').replace('ns0:','').replace(':ns0','') for x in tree)
def render(svg):
 js="import sharp from 'sharp';let b=[];for await(const x of process.stdin)b.push(x);process.stdout.write(await sharp(Buffer.concat(b)).png().toBuffer());"
 result=subprocess.run(['node','--input-type=module','-e',js],input=svg.encode(),stdout=subprocess.PIPE,stderr=subprocess.PIPE,cwd=ROOT,check=True)
 return np.asarray(Image.open(io.BytesIO(result.stdout)).convert('RGBA'))[:,:,3]
def doc(body,width=W,height=H,view=f'0 0 {MW} {MH}'):
 return f'<svg xmlns="{NS}" width="{width}" height="{height}" viewBox="{view}">{body}</svg>'
def blur(a,sigma):
 r=max(1,int(np.ceil(3*sigma)));x=np.arange(-r,r+1);k=np.exp(-x*x/(2*sigma*sigma));k/=k.sum()
 for axis in [0,1]:
  pads=[(0,0)]*2;pads[axis]=(r,r);p=np.pad(a,pads,mode='edge');out=np.zeros_like(a,dtype=np.float32)
  for i,v in enumerate(k):
   sl=[slice(None)]*2;sl[axis]=slice(i,i+a.shape[axis]);out+=p[tuple(sl)]*v
  a=out
 return a
def save_webp(a,name):
 p=OUT/(name+'.webp');Image.fromarray(np.uint8(a)).save(p,lossless=True,method=6);return p.name
records={};audits=[]
for city in SPEC['cities']:
 ident=city['id'];source=ROOT/city['source'];im=Image.open(source).convert('RGBA');a=np.asarray(im).astype(np.float32);sw,sh=im.size
 if city['extraction']=='black-ink-white':
  ink=255-np.mean(a[:,:,:3],axis=2);binary=ink>85
  # Close fill boundaries independently. These helper segments are NEVER ink.
  barrier=Image.fromarray(np.uint8(np.pad(binary,4))*255)
  draw=ImageDraw.Draw(barrier)
  for polyline in city.get('fillClosures',[]):draw.line([(x+4,y+4) for x,y in polyline],fill=255,width=3)
  barrier=barrier.filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.MinFilter(3))
  area=barrier.copy();ImageDraw.floodfill(area,(0,0),128)
  for x,y in city.get('holeSeeds',[]):
   seed=(x+4,y+4)
   if area.getpixel(seed)==255:raise ValueError(f'{ident}: hole seed lies on a stroke: {(x,y)}')
   if area.getpixel(seed)==0:ImageDraw.floodfill(area,seed,64)
  cover=(np.asarray(area)[4:-4,4:-4]!=128)&(np.asarray(area)[4:-4,4:-4]!=64)
 elif city['extraction']=='orange-ink':
  ink=np.maximum(0,a[:,:,0]-a[:,:,2]);binary=ink>70
  # Outside flooding only establishes candidates; explicit semantic holes win.
  barriers=Image.fromarray(np.uint8(binary)*255).filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.MinFilter(3))
  area=barriers.copy()
  for seed in [(0,0),(sw-1,0),(0,sh-1),(sw-1,sh-1)]:
   if area.getpixel(seed)==0:ImageDraw.floodfill(area,seed,128)
  cover=np.asarray(area)!=128
 else:
  alpha=a[:,:,3]/255;ink=(255-np.mean(a[:,:,:3],axis=2))*alpha;binary=ink>85;cover=alpha>.5
 # Isolated anti-alias/color residue is not a new architectural stroke.
 # A 3-pixel support around solid ink keeps fine connected details.
 support=np.asarray(Image.fromarray(np.uint8(ink>130)*255).filter(ImageFilter.MaxFilter(3)))>0
 binary&=support
 cavity=Image.fromarray(np.uint8(cover)*255)
 for seed in [(0,0),(sw-1,0),(0,sh-1),(sw-1,sh-1)]:
  if cavity.getpixel(seed)==0:ImageDraw.floodfill(cavity,seed,128)
 holes=Image.fromarray(np.uint8(np.asarray(cavity)==0)*255);draw=ImageDraw.Draw(holes)
 for poly in city.get('holes',[]):draw.polygon([tuple(p) for p in poly],fill=255)
 holes=np.asarray(holes)>0;cover=(cover&~holes)|binary
 authoring=city.get('authoring',{});native=authoring.get('mode')=='landmarks'
 if native and '--trace' in sys.argv:raise ValueError('Landmark masters must be rebuilt explicitly with build-city-landmarks.py; bitmap tracing would discard authored geometry')
 content=np.where(cover);bottom=authoring['baseline'] if native else int(content[0].max())+1
 aw,ah=authoring['size'] if native else (sw,sh)
 scale=min(MW/aw,MH/ah);dy=SPEC['baseline']-bottom*scale;dx=(MW-aw*scale)/2
 transform=f'translate({dx:.6f} {dy:.6f}) scale({scale:.9f})'
 guides=f'<g id="guides" display="none" fill="none" stroke="#28a0d0"><rect width="{MW}" height="{MH}"/><path d="M0 {SPEC["baseline"]} H{MW}"/><rect x="{MW*.845:.3f}" y="0" width="{MW*.155:.3f}" height="{MH*.54:.3f}"/></g>'
 # Both groups are actual editable vector paths, not an embedded raster.
 master_path=MASTER/(ident+'.svg')
 if native and not master_path.exists():raise ValueError('Missing landmark master; run build-city-landmarks.py first')
 if not native and (not master_path.exists() or '--trace' in sys.argv):
  ink_vector=vector(np.uint8(binary)*255);fill_vector=vector(np.uint8(cover)*255);holes_vector=vector(np.uint8(holes)*255)
  master=f'<title>{city["name"]} V5 — generated artwork, faithful contour extraction</title><metadata>Source {city["source"]}; {digest(source)}; original generated image is authoritative artwork; locally fitted ink contours, not programmatically reconstructed landmarks.</metadata>{guides}<g id="fill" transform="{transform}">{fill_vector.replace("#000000","#dddddd")}</g><g id="holes" transform="{transform}" display="none">{holes_vector}</g><g id="lines" transform="{transform}">{ink_vector}</g>'
  master_path.write_text(doc(master,MW,MH))
 # Committed SVG is authoritative after initial tracing; do not overwrite edits.
 tree=ET.fromstring(master_path.read_text())
 if tree.get('viewBox')!=f'0 0 {MW} {MH}':raise ValueError('Master viewBox must match the PSD frame')
 metadata=tree.find(f'{{{NS}}}metadata')
 if metadata is None or digest(source) not in (metadata.text or ''):raise ValueError(f'{ident}: source provenance changed; inspect the SVG before explicitly rebuilding with --trace')
 groups={g.get('id'):g for g in tree if g.tag.endswith('g')}
 for key in ['fill','holes','lines']:
  if key not in groups:raise ValueError(f'{ident}: missing editable {key} group')
 fill_group=ET.tostring(groups['fill'],encoding='unicode');ink_group=ET.tostring(groups['lines'],encoding='unicode')
 hole_group=ET.fromstring(ET.tostring(groups['holes']));hole_group.attrib.pop('display',None)
 # Hole edits subtract fill only; they can never invent an embossed outline.
 for node in hole_group.iter():
  if node.tag.endswith('path'):node.set('fill','#000000')
 hole_group=ET.tostring(hole_group,encoding='unicode')
 # Existing V4 placement occurs exactly once after authoring coordinates.
 p=SPEC['placement'];outer=f'translate({MW*p["offsetU"]} {MH*(1-p["scale"]-p["offsetV"])}) scale({p["scale"]})'
 def raster(body):return render(doc(f'<g transform="{outer}">{body}</g>'))
 lines=raster(ink_group)
 fill_mask=f'<defs><mask id="fill-holes" maskUnits="userSpaceOnUse" x="0" y="0" width="{MW}" height="{MH}"><rect width="{MW}" height="{MH}" fill="white"/>{hole_group}</mask></defs><g mask="url(#fill-holes)">{fill_group}</g>'
 coverage=np.maximum(raster(fill_mask),lines)
 # Native-coordinate comparison proves that curves/details survived tracing.
 native_view=f'{dx} {dy} {sw*scale} {sh*scale}'
 traced=render(doc(ink_group,sw,sh,native_view))>127
 original_support=np.asarray(Image.fromarray(np.uint8(binary)*255).filter(ImageFilter.MaxFilter(3)))>0
 traced_support=np.asarray(Image.fromarray(np.uint8(traced)*255).filter(ImageFilter.MaxFilter(3)))>0
 fidelity={'originalStrokeRecallWithin1px':float((binary&traced_support).sum()/max(1,binary.sum())),'tracedStrokePrecisionWithin1px':float((traced&original_support).sum()/max(1,traced.sum()))} if not native else None
 mask=np.stack([lines,coverage,np.zeros_like(lines)],axis=2);maskfile=save_webp(mask,ident+'-structure')
 height=blur(lines.astype(np.float32)/255,.65)
 Image.fromarray(np.rint(height*65535).astype('uint16')).save(MASTER/(ident+'-height16.png'))
 gy,gx=np.gradient(height);norm=np.stack([-gx*2.1,gy*2.1,np.ones_like(height)],axis=2);norm/=np.linalg.norm(norm,axis=2,keepdims=True)
 normal=np.ones((H,W,4),dtype='<f2');normal[:,:,:3]=norm*.5+.5
 npth=OUT/(ident+'-normal.hfn.gz');npth.write_bytes(gzip.compress(b'HFN1'+struct.pack('<III',W,H,1)+normal[::-1].tobytes(),compresslevel=6,mtime=0))
 label=Image.new('L',(W,H));d=ImageDraw.Draw(label)
 d.text((W*.81,H*.257),city['name'],font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Songti.ttc',112),fill=255,anchor='mm')
 d.text((W*.81,H*.335),ident.upper(),font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf',83),fill=255,anchor='mm')
 labelFile=save_webp(np.asarray(label),ident+'-label')
 # Inspectable flat output is evidence; runtime tint is entirely parameterized.
 c=coverage.astype(np.float32)[:,:,None]/255;l=lines.astype(np.float32)[:,:,None]/255
 flat=np.array([255,253,247])*(1-c)+np.array([54,132,101])*(c-l)+np.array([220,178,81])*l
 thumb=OUT/(ident+'-thumb.webp');Image.fromarray(np.uint8(flat)).resize((768,334),Image.Resampling.LANCZOS).save(thumb,quality=94)
 Image.fromarray(np.uint8(flat)).resize((1536,669),Image.Resampling.LANCZOS).save(EVIDENCE/(ident+'-flat.png'))
 Image.fromarray(lines).save(EVIDENCE/(ident+'-lines.png'));Image.fromarray(coverage).save(EVIDENCE/(ident+'-coverage.png'))
 # White-backed proof is rendered from the actual runtime line channel.
 review=ROOT/'public/review/v5';review.mkdir(parents=True,exist_ok=True)
 proof=np.repeat((255-lines)[:,:,None],3,axis=2)
 Image.fromarray(proof).resize((1900,827),Image.Resampling.LANCZOS).save(review/(ident+'-line-review.png'))
 shutil.copyfile(source,review/(ident+'-black.png'))
 record={'mask':maskfile,'normal':npth.name,'label':labelFile,'thumbnail':thumb.name}
 records[ident]={'name':city['name'],**record}
 audit={'id':ident,'source':city['source'],'sourceSha256':digest(source),'sourceSize':[sw,sh],'authoring':authoring,'masterSize':[MW,MH],'runtimeSize':[W,H],'sourceToMaster':{'scale':scale,'offset':[dx,dy],'contentBottom':bottom},'placementAppliedOnce':p,'sourceInkPixels':int(binary.sum()),'runtimeLinePixels':int((lines>127).sum()),'masterSha256':digest(MASTER/(ident+'.svg')),'maps':{k:{'file':v,'sha256':digest(OUT/v)} for k,v in record.items()},'candidate':city.get('candidate',False),'holePolygons':city.get('holes',[]),'holeSeeds':city.get('holeSeeds',[]),'fillClosures':city.get('fillClosures',[]),'traceFidelity':fidelity}
 audits.append(audit);print(ident,record,flush=True)
template=doc(f'<title>City master — PSD frame 5433 × 2365 at 600 ppi</title>{guides}<g id="fill"/><g id="holes"/><g id="lines"/>',MW,MH)
(MASTER/'template.svg').write_text(template)
(OUT/'catalog.json').write_text(json.dumps({'version':5,'cities':records},ensure_ascii=False,indent=2)+'\n')
(ROOT/'src/styles/city-catalog-v5.json').write_text(json.dumps({'version':5,'cities':records},ensure_ascii=False,indent=2)+'\n')
(EVIDENCE/'derivation.json').write_text(json.dumps({'version':5,'cities':audits,'method':'generated-image artwork with source-faithful spline contours; independent fill-only closure and semantic holes; line-only relief; original native resolution recorded'},ensure_ascii=False,indent=2)+'\n')
review=ROOT/'public/review/v5';review.mkdir(parents=True,exist_ok=True)
for name in ['template',*records]:shutil.copyfile(MASTER/(name+'.svg'),review/(name+'.svg'))
for name in records:shutil.copyfile(EVIDENCE/(name+'-flat.png'),review/(name+'-flat.png'))
if (MASTER/'landmarks/manifest.json').exists():
 (review/'landmarks').mkdir(exist_ok=True)
 for file in (MASTER/'landmarks').glob('*'):
  if not file.name.startswith('.') and file.suffix in ['.svg','.json']:shutil.copyfile(file,review/'landmarks'/file.name)
