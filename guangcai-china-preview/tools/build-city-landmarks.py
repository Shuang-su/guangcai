"""Explicit, reproducible landmark construction for the V5 pilot.

Run explicitly to rebuild the editable masters, then run compile-city-v5.py.
Ordinary compilation never overwrites hand-edited SVGs. Coordinates below are
1900 x 828 authoring units, with an invisible alignment guide at y=790.
The temple alone is a faithful contour trace of the original PSD alpha layer.
All other structural strokes are authored vector paths, not bitmap clean-up.
"""
from pathlib import Path
import hashlib, io, json, math, subprocess, xml.etree.ElementTree as ET
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
import vtracer

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets/masters/v5'
PARTS = OUT / 'landmarks'
PARTS.mkdir(parents=True, exist_ok=True)
NS = 'http://www.w3.org/2000/svg'
ET.register_namespace('', NS)
MW, MH, BASE = 5433, 2365, 790
SCALE = min(MW/1900, MH/828)
TRANSFORM = f'translate({(MW-1900*SCALE)/2} {2360-BASE*SCALE}) scale({SCALE})'

def sha(path): return hashlib.sha256(path.read_bytes()).hexdigest()
def path(d, **attrs):
    more = ' '.join(f'{k.replace("_", "-")}="{v}"' for k,v in attrs.items())
    return f'<path d="{d}" {more}/>'
def line(x1,y1,x2,y2): return path(f'M{x1:.3f} {y1:.3f} L{x2:.3f} {y2:.3f}')
def rect(x,y,w,h): return f'<rect x="{x}" y="{y}" width="{w}" height="{h}"/>'
def polygon(points): return path('M'+' L'.join(f'{x:.3f} {y:.3f}' for x,y in points)+' Z')
def part(ident, silhouette, detail='', holes='', outline=None, source='authored vector'):
    return dict(id=ident, silhouette=silhouette, detail=detail, holes=holes,
                outline=silhouette if outline is None else outline, source=source)
def clip(ident, geometry, body):
    return f'<defs><clipPath id="{ident}">{geometry}</clipPath></defs><g clip-path="url(#{ident})">{body}</g>'
def trace(a):
    b=io.BytesIO();Image.fromarray(np.uint8(255-a)).save(b,format='PNG')
    svg=vtracer.convert_raw_image_to_svg(b.getvalue(),img_format='png',colormode='binary',mode='polygon',filter_speckle=0,corner_threshold=60,length_threshold=3.5,path_precision=3)
    return ''.join(ET.tostring(x,encoding='unicode') for x in ET.fromstring(svg))

def temple():
    source=ROOT/'assets/extracted/layer-6-alpha.png'
    ink=np.asarray(Image.open(source))>127
    # The padded outside remains floodable even where original ink touches edges.
    barrier=Image.fromarray(np.uint8(np.pad(ink,4))*255).filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.MinFilter(3))
    area=barrier.copy();ImageDraw.floodfill(area,(0,0),128)
    cover=np.uint8(np.asarray(area)[4:-4,4:-4]!=128)*255
    scale=850/2870; transform=f'translate(335 {BASE-1782*scale}) scale({scale})'
    fill=f'<g transform="{transform}">{trace(cover)}</g>'
    strokes=f'<g transform="{transform}">{trace(np.uint8(ink)*255)}</g>'
    return part('hall-of-prayer', fill, strokes, outline='', source=f'original PSD layer-6-alpha.png sha256:{sha(source)}')

def lattice(quad):
    def point(u,v):
        a,b,c,d=quad
        return ((1-v)*((1-u)*a[0]+u*b[0])+v*((1-u)*d[0]+u*c[0]),
                (1-v)*((1-u)*a[1]+u*b[1])+v*((1-u)*d[1]+u*c[1]))
    strokes=[]
    for sign in [-1,1]:
        for k in np.arange(-2,3,.5):
            lo,hi=((0-k)/1.6,(1-k)/1.6) if sign==1 else ((k-1)/1.6,k/1.6)
            lo,hi=max(0,lo),min(1,hi)
            pts=[point(k+sign*1.6*v,v) for v in np.linspace(lo,hi,12)] if hi>lo else []
            if len(pts)>1: strokes.append(path('M'+' L'.join(f'{x:.2f} {y:.2f}' for x,y in pts)))
    return ''.join(strokes)

def beijing():
    # A curved masonry edge falls to the floor; the fill's closing edge is invisible.
    knots=[(970,690),(1120,650),(1290,724),(1435,682),(1585,737),(1680,715),(1848,790)]
    def wall_y(x):
        for (a,ya),(b,yb) in zip(knots,knots[1:]):
            if a<=x<=b:
                t=(x-a)/(b-a);return ya+(yb-ya)*(3*t*t-2*t*t*t)
        return knots[-1][1]
    points=[]
    for x in range(970,1849,8):
        # Crenellations fade with the final physical band as it reaches the floor.
        taper=min(1,max(0,(1848-x)/90))
        rise=8*taper if ((x-970)//8)%2==0 else 0
        points.append((x,wall_y(x)-rise))
        points.append((min(x+8,1848),wall_y(min(x+8,1848))-rise))
    points.append((1848,790))
    edge='M'+' L'.join(f'{x:.2f} {y:.2f}' for x,y in points)
    lower=[(x,wall_y(x)+24*min(1,(1848-x)/160)) for x in range(970,1849,4)]+[(1848,790)]
    lower_d='M'+' L'.join(f'{x:.2f} {min(y,790):.2f}' for x,y in lower)
    parts=[part('great-wall',path(edge+' L970 790 Z'),path(lower_d),outline=path(edge))]
    for i,x in enumerate([1120,1435,1680]):
        y=wall_y(x)
        d=f'M{x-24} {y+24} V{y-34} h9 v7 h9 v-7 h12 v7 h9 v-7 h9 V{y+24} Z'
        details=line(x-24,y-18,x+24,y-18)+line(x+13,y-18,x+13,y+24)
        details+=rect(x-12,y-8,4,11)+rect(x+2,y-8,4,11)
        parts.append(part(f'watchtower-{i+1}',path(d),details))
    cctv_shape='M30 790 L86 456 L211 420 L302 456 L340 790 Z'
    cctv_hole='M170 555 L227 545 L239 702 L146 702 Z'
    silhouette=path(cctv_shape+' '+cctv_hole,fill_rule='evenodd',clip_rule='evenodd')
    grid=lattice([(86,456),(211,420),(211,790),(30,790)])+lattice([(211,420),(302,456),(340,790),(211,790)])
    # Structural soffit; no lattice enters the central opening.
    soffit='M145 530 L211 511 L253 528 L227 545 L170 555 Z'
    facade=path(cctv_shape+' '+cctv_hole+' '+soffit,fill_rule='evenodd',clip_rule='evenodd')
    detail=clip('cctv-facade',facade,grid)+path(soffit+' M211 420 V511 M211 511 V538')
    parts.append(part('cctv-headquarters',silhouette,detail,path(cctv_hole)))
    zun='M350 790 C358 607 367 353 357 228 L344 193 Q405 149 466 193 L453 228 C443 353 452 607 460 790 Z'
    ribs=''
    for t in np.linspace(.12,.88,7):
        x0=344+122*t;x1=357+96*t;xb=350+110*t
        ribs+=path(f'M{x0:.2f} {193-13*math.sin(t*math.pi):.2f} C{x1:.2f} 315 {xb:.2f} 560 {xb:.2f} 790')
    for y in [225,300,395,500,615,710]:
        ribs+=path(f'M340 {y} Q405 {y-12} 470 {y}')
    parts.append(part('china-zun',path(zun),clip('zun-facade',path(zun),ribs)))
    parts.append(temple())
    return parts

def shenzhen():
    parts=[]
    rounded='M86 790 L86 572 Q88 416 146 352 Q202 416 204 572 L204 790 Z'
    inner='M105 790 L105 573 Q107 437 146 378 Q183 437 185 573 L185 790'
    detail=path(inner+' M146 379 V790 M96 790 V572 Q98 429 146 364 Q194 429 194 572 V790')
    detail+=clip('west-windows',path('M114 790 V570 Q117 444 146 392 Q175 444 176 570 V790 Z'),''.join(line(114,y,176,y) for y in range(420,785,16)))
    parts.append(part('west-rounded-tower',path(rounded),detail))
    twin='M246 790 V434 Q248 416 259 416 V397 H279 V416 Q299 423 319 416 V397 H339 V416 Q351 416 353 434 V790 Z'
    detail=path('M264 397 V351 M274 397 V357 M324 397 V348 M334 397 V356 M246 440 H353 M255 448 H344 M255 448 V790 M344 448 V790')
    detail+=rect(286,448,27,89)
    for y in range(456,777,14):
        detail+=line(261,y,282,y)+line(318,y,338,y)
        if y>540: detail+=line(282,y,318,y)
    parts.append(part('twin-spire-tower',path(twin),detail))
    ping='M418 790 L450 169 L492 86 L534 169 L566 790 Z'
    detail=path('M432 790 L461 173 L492 103 L523 173 L552 790 M461 173 H523 M467 173 L456 790 M517 173 L530 790 M450 169 L461 173 M534 169 L523 173')
    for x in [475,484,492,500,509]: detail+=line(x,176,x,790)
    for y in [200,309,443,582,718]:detail+=line(465,y,521,y)+line(465,y+8,521,y+8)
    detail+=path('M450 304 L466 443 L437 652 L456 790 M534 304 L518 443 L547 652 L530 790')
    parts.append(part('ping-an-tower',path(ping),clip('ping-facade',path(ping),detail)))
    small='M565 790 V592 Q566 548 592 548 Q617 548 619 592 V790 Z'
    detail=path('M573 790 V592 Q574 559 592 559 Q610 559 611 592 V790')
    detail+=clip('middle-rounded-windows',path(small),''.join(line(574,y,610,y) for y in range(582,781,13)))
    parts.append(part('middle-rounded-tower',path(small),detail))
    block='M630 790 V553 L650 543 L664 552 V790 Z'
    parts.append(part('middle-step-tower',path(block),path('M650 543 V790 M637 563 V790 M656 563 V790')+''.join(line(637,y,650,y) for y in range(585,780,18))))
    block='M671 790 V498 L710 482 L743 497 V790 Z'
    detail=path('M710 482 V790')
    for x in [681,691,701]: detail+=line(x,501,x,790)
    for x in [719,728,737]: detail+=line(x,503,x,790)
    for y in [525,611,703]: detail+=line(674,y,709,y-11)+line(711,y-11,740,y)
    parts.append(part('middle-faceted-tower',path(block),detail))
    east='M761 790 C759 613 762 392 831 305 C900 392 903 613 901 790 Z'
    detail=''
    for x in [775,789,803,817,831,845,859,873,887]:
        detail+=path(f'M831 310 Q{x} 389 {x} 790')
    for y in [492,507,642,657]:detail+=path(f'M750 {y} Q831 {y-16} 912 {y}')
    grid=''
    for x in range(722,928,22):
        grid+=line(x,354,x+65,455)+line(x,354,x-65,455)
    detail+=clip('east-diagrid-band',rect(751,354,161,101),grid)
    parts.append(part('east-braced-tower',path(east),clip('east-facade',path(east),detail)))
    # Civic Center is the final landmark; no bridge, ramp or invented filler.
    body='M577 744 L655 757 L809 721 L916 699 L1009 714 L1171 756 L1320 748 V790 H577 Z'
    opening='M905 722 Q950 713 995 722 V757 L980 770 H920 L905 757 Z'
    bodyshape=path(body+' '+opening,fill_rule='evenodd',clip_rule='evenodd')
    detail=path('M809 727 V790 M833 722 V790 M862 716 V790 M892 714 V790 M1007 720 V790 M1035 727 V790 M1063 736 V790')
    detail+=rect(586,757,203,28)+rect(1100,757,210,28)
    for y in [765,774]:detail+=line(590,y,785,y)+line(1104,y,1306,y)
    detail+=path('M895 790 L916 770 H983 L1003 790 M915 778 H987 M908 784 H995')
    detail+=path(opening)
    parts.append(part('civic-center-body',bodyshape,detail,path(opening)))
    roof='M555 699 C653 773 762 708 846 684 C922 656 970 661 1069 706 C1176 754 1267 731 1355 699 C1329 731 1323 747 1309 758 C1181 778 1081 751 989 717 C919 690 855 718 775 744 C677 777 596 767 555 699 Z'
    detail=path('M562 704 C650 750 754 696 846 680 C923 648 974 658 1074 698 C1174 742 1270 717 1348 704 M570 714 C655 770 763 720 846 695 C923 666 974 675 1069 716 C1180 761 1268 742 1338 715')
    detail+='<ellipse cx="947" cy="686" rx="5" ry="10"/>'
    parts.append(part('civic-center-roof',path(roof),detail))
    return parts

def style_geometry(geometry, fill):
    # Traced temple paths carry their own fill; normalize only paint, never geometry.
    return geometry.replace('fill="#000000"',f'fill="{fill}"')

def assemble(parts, ident, standalone=False):
    fills=[];lines=[];holes=[]
    for i,p in enumerate(parts):
        geom=style_geometry(p['silhouette'],'#dddddd')
        fills.append(f'<g id="fill-{p["id"]}" fill="#dddddd">{geom}</g>')
        if p['holes']:holes.append(p['holes'])
        occluders=''.join(style_geometry(q['silhouette'],'#000000') for q in parts[i+1:])
        mid=f'{ident}-occlude-{i}'
        defs=f'<defs><mask id="{mid}" maskUnits="userSpaceOnUse" x="0" y="0" width="1900" height="828"><rect width="1900" height="828" fill="white"/><g fill="black">{occluders}</g></mask></defs>'
        # Each landmark's true outline is distinct from its hidden fill closure.
        outline=f'<g fill="none" stroke="#000" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round">{p["outline"]}</g>'
        detail=f'<g fill="none" stroke="#000" stroke-width="1.65" stroke-linejoin="round" stroke-linecap="round">{p["detail"]}</g>'
        if p['id']=='hall-of-prayer':detail=p['detail'] # Exact PSD stroke contours.
        lines.append(f'<g id="lines-{p["id"]}">{defs}<g mask="url(#{mid})">{outline}{detail}</g></g>')
    transform='' if standalone else f' transform="{TRANSFORM}"'
    return f'<g id="fill"{transform}>{"".join(fills)}</g><g id="holes" display="none"{transform}>{"".join(holes)}</g><g id="lines"{transform}>{"".join(lines)}</g>'

def svg(body,w,h):return f'<svg xmlns="{NS}" width="{w}" height="{h}" viewBox="0 0 {w} {h}">{body}</svg>'
def raster(svg_text,target,width=1900):
    js="import sharp from 'sharp';let a=[];for await(const b of process.stdin)a.push(b);await sharp(Buffer.concat(a)).resize(Number(process.argv[2])).png().toFile(process.argv[1]);"
    subprocess.run(['node','--input-type=module','-e',js,str(target),str(width)],input=svg_text.encode(),cwd=ROOT,check=True)

manifest={'method':'landmarks-first; authored vector components plus original PSD temple contour',
          'authoringSize':[1900,828],'baseline':BASE,'cities':{}}
spec=json.loads((OUT/'cities.json').read_text())
for ident,parts in [('beijing',beijing()),('shenzhen',shenzhen())]:
    city=next(c for c in spec['cities'] if c['id']==ident)
    source=ROOT/city['source']
    metadata=f'<metadata>Reference {city["source"]}; {sha(source)}; landmarks-first authored vectors; original PSD temple contour.</metadata>'
    guides=f'<g id="guides" display="none" fill="none" stroke="#28a0d0"><rect width="{MW}" height="{MH}"/><path d="M0 2360 H{MW}"/><rect x="4590.885" y="0" width="842.115" height="1277.1"/></g>'
    master=svg(f'<title>{city["name"]} V5 — landmark construction</title>{metadata}{guides}{assemble(parts,ident)}',MW,MH)
    (OUT/f'{ident}.svg').write_text(master)
    manifest['cities'][ident]=[]
    for p in parts:
        component=svg(f'<title>{p["id"]}</title>{assemble([p],ident+"-"+p["id"],True)}',1900,828)
        filename=f'{ident}-{p["id"]}.svg';(PARTS/filename).write_text(component)
        manifest['cities'][ident].append({'id':p['id'],'file':filename,'source':p['source'],'sha256':sha(PARTS/filename)})
    # Review PNG is a deterministic export of final SVG, not the rejected AI study.
    black=svg(assemble(parts,ident+'-preview',True).replace('#dddddd','#ffffff'),1900,828)
    raster(black,ROOT/f'public/review/v5/{ident}-black.png')
    review=black.replace(f'viewBox="0 0 1900 828">',f'viewBox="0 0 1900 828"><rect width="1900" height="828" fill="white"/>',1)
    raster(review,ROOT/f'public/review/v5/{ident}-line-review.png')
    (PARTS/f'{ident}-assembled.svg').write_text(black)
    city['authoring']={'mode':'landmarks','size':[1900,828],'baseline':BASE,'manifest':'assets/masters/v5/landmarks/manifest.json'}
    city['candidate']=True
    city['reference']='Original PSD temple + authored landmarks; curved wall ending' if ident=='beijing' else 'Existing skyline reconstructed as landmarks; right bridge removed per user'
(PARTS/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
(OUT/'cities.json').write_text(json.dumps(spec,ensure_ascii=False,indent=2)+'\n')
print('Rebuilt Beijing and Shenzhen landmark masters and review images.')
