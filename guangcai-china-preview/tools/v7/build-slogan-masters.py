"""Derive font outlines and a scalable frame from the supplied MasterGo reference."""
from pathlib import Path
import base64,hashlib,io,json,subprocess,xml.etree.ElementTree as ET
import numpy as np
from PIL import Image
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
import vtracer
ROOT=Path(__file__).resolve().parents[2];SOURCE=ROOT/'assets/source/v7.1.2';OUT=ROOT/'assets/masters/v7.1.2';EVIDENCE=ROOT/'evidence/v7.1.2';TMP=ROOT/'.codex-work/tmp/v7.1.2';NS='http://www.w3.org/2000/svg';ET.register_namespace('',NS)
for p in [OUT,EVIDENCE,TMP]:p.mkdir(parents=True,exist_ok=True)
def sha(b):return hashlib.sha256(b).hexdigest()
def svg(body):return f'<svg xmlns="{NS}" width="209" height="694" viewBox="0 0 209 694">{body}</svg>'
def render(body,scale=1):
    js="import sharp from 'sharp';const b=[];for await(const x of process.stdin)b.push(x);process.stdout.write(await sharp(Buffer.concat(b),{density:72*Number(process.argv[1])}).ensureAlpha().png().toBuffer());"
    result=subprocess.run(['node','--input-type=module','-e',js,str(scale)],cwd=ROOT,input=body.encode(),stdout=subprocess.PIPE,stderr=subprocess.PIPE,check=True)
    return Image.open(io.BytesIO(result.stdout)).convert('RGBA')
reference=(SOURCE/'mastergo-slogan-reference.svg').read_bytes();tree=ET.fromstring(reference);path=next(n for n in tree.iter() if n.tag.endswith('path'))
text_reference=svg(ET.tostring(path,encoding='unicode'));text_alpha=np.asarray(render(text_reference,8))[:,:,3];occupied=np.any(text_alpha>127,axis=1);ys=np.flatnonzero(occupied);blank=[];start=None
for y in range(int(ys[0]),int(ys[-1])+1):
    if not occupied[y] and start is None:start=y
    if occupied[y] and start is not None:blank.append((y-start,start,y));start=None
gaps=sorted(sorted(blank,reverse=True)[:3],key=lambda r:r[1]);cuts=[int(ys[0])]+[(a+b)//2 for _,a,b in gaps]+[int(ys[-1])+1];boxes=[]
for top,bottom in zip(cuts,cuts[1:]):
    y,x=np.where(text_alpha[top:bottom]>127);boxes.append([float(x.min()/8),float((top+y.min())/8),float((x.max()+1)/8),float((top+y.max()+1)/8)])
font_file=SOURCE/'fonts/SourceHanSerifCN-Bold.otf';font_bytes=font_file.read_bytes();font=TTFont(font_file);assert font['OS/2'].usWeightClass==700;assert font['name'].getDebugName(6)=='SourceHanSerifCN-Bold';glyphs=font.getGlyphSet();cmap=font.getBestCmap();units=font['head'].unitsPerEm
def glyph(ch):
    assert ord(ch) in cmap,'Missing required glyph: '+ch
    g=glyphs[cmap[ord(ch)]];pen=SVGPathPen(glyphs);g.draw(pen);bounds=BoundsPen(glyphs);g.draw(bounds);return pen.getCommands(),bounds.bounds
ratios=[]
for ch,box in zip('开放包容',boxes):
    _,(x0,y0,x1,y1)=glyph(ch);ratios.extend([(box[2]-box[0])*units/(x1-x0),(box[3]-box[1])*units/(y1-y0)])
font_size=round(float(np.median(ratios)),1);centers=[[(b[0]+b[2])/2,(b[1]+b[3])/2] for b in boxes]
for parent in tree.iter():
    for child in list(parent):
        if child is path:parent.remove(child)
frame_reference=ET.tostring(tree,encoding='unicode');frame_alpha=render(frame_reference).getchannel('A');(SOURCE/'frame-reference.png').write_bytes(base64.b64decode(next(v for n in tree.iter() if n.tag.endswith('image') for k,v in n.attrib.items() if k.endswith('href')).split(',')[1]))
trace=Image.fromarray(255-np.asarray(frame_alpha.resize((836,2776),Image.Resampling.LANCZOS)));buf=io.BytesIO();trace.save(buf,format='PNG')
traced=vtracer.convert_raw_image_to_svg(buf.getvalue(),img_format='png',colormode='binary',mode='spline',filter_speckle=0,corner_threshold=60,length_threshold=1,path_precision=4)
tr=ET.fromstring(traced);frame_content=''.join(ET.tostring(n,encoding='unicode') for n in tr if n.tag.endswith('path')).replace('#000000','#ffffff')
frame_group='<g id="frame" transform="scale(.25)">'+frame_content+'</g>';frame_svg=svg(frame_group);(OUT/'slogan-frame.svg').write_text(frame_svg+'\n')
frame_out=render(frame_svg);old=np.asarray(frame_alpha)>127;new=np.asarray(frame_out)[:,:,3]>127;frame_iou=float((old&new).sum()/(old|new).sum());assert frame_iou>.90,frame_iou
phrases={'open':'开放包容','innovation':'创新驱动','cooperation':'合作共赢','sharing':'共建共享','together':'携手同心','ocean':'拥抱瀚海'};records=[]
for ident,phrase in phrases.items():
    body=[];bounds=[]
    for ch,(cx,cy) in zip(phrase,centers):
        commands,(x0,y0,x1,y1)=glyph(ch);scale=font_size/units;tx=cx-(x0+x1)/2*scale;ty=cy+(y0+y1)/2*scale
        body.append(f'<path data-character="{ch}" transform="translate({tx:.8f} {ty:.8f}) scale({scale:.8f} {-scale:.8f})" d="{commands}" fill="white"/>');bounds.append([cx-(x1-x0)*scale/2,cy-(y1-y0)*scale/2,cx+(x1-x0)*scale/2,cy+(y1-y0)*scale/2])
    metadata=f'<metadata>SourceHanSerifCN-Bold; weight 700; font SHA256 {sha(font_bytes)}; reference SHA256 {sha(reference)}</metadata>'
    result=svg(metadata+frame_group+'<g id="glyphs">'+''.join(body)+'</g>');(OUT/f'slogan-{ident}.svg').write_text(result+'\n');render(result,2).save(EVIDENCE/f'slogan-{ident}.png')
    record={'id':ident,'text':phrase,'fontSize':font_size,'glyphBounds':bounds,'master':f'assets/masters/v7.1.2/slogan-{ident}.svg','masterSha256':sha((result+'\n').encode())};records.append(record)
    if ident=='open':
        candidate=np.asarray(render(svg(''.join(body)),8))[:,:,3]>127;reference_ink=text_alpha>127;record['referenceGlyphIoU']=float((candidate&reference_ink).sum()/(candidate|reference_ink).sum());assert record['referenceGlyphIoU']>.94,record['referenceGlyphIoU']
render(frame_reference,2).save(TMP/'frame-before.png');render(frame_svg,2).save(TMP/'frame-after.png')
report={'font':{'file':'assets/source/v7.1.2/fonts/SourceHanSerifCN-Bold.otf','sha256':sha(font_bytes),'bytes':len(font_bytes),'family':font['name'].getDebugName(1),'style':font['name'].getDebugName(2),'version':font['name'].getDebugName(5),'weight':700,'copyright':font['name'].getDebugName(0),'licenseUrl':'https://github.com/adobe-fonts/source-han-serif/blob/release/LICENSE.txt'},'reference':{'svgSha256':sha(reference),'size':[209,694],'glyphBoxes':boxes,'glyphCenters':centers,'derivedFontSize':font_size,'frameIoU':frame_iou,'embeddedRasterFrame':True},'placement':{'canvas':[4096,1783],'centerU':.81,'topV':.09,'heightRatio':.52,'padding':4},'slogans':records}
(EVIDENCE/'slogans-source.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(json.dumps({'fontSize':font_size,'centers':centers,'frameIoU':frame_iou,'openGlyphIoU':records[0]['referenceGlyphIoU']},ensure_ascii=False))
