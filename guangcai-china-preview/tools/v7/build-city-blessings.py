"""Fixed four-character masters using the approved font and current frame.

Requires fontTools 4.60.1. Pass --font if the archived source is not checked out.
No runtime font, tracing, or artwork rescaling is introduced.
"""
from pathlib import Path
import argparse, copy, hashlib, json, xml.etree.ElementTree as ET
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen

ROOT = Path(__file__).resolve().parents[2]
parser = argparse.ArgumentParser()
parser.add_argument('--font', type=Path, default=ROOT/'assets/source/v7.1.2/fonts/SourceHanSerifCN-Bold.otf')
args = parser.parse_args()
font_bytes = args.font.read_bytes()
sha = lambda b: hashlib.sha256(b).hexdigest()
approved = json.loads((ROOT/'evidence/v7.1.2/slogans-source.json').read_text())['font']
assert sha(font_bytes) == approved['sha256'], 'Use the approved font bytes'
font = TTFont(args.font)
assert font['OS/2'].usWeightClass == 700
assert font['head'].unitsPerEm == 1000
glyphs, cmap = font.getGlyphSet(), font.getBestCmap()
ns = 'http://www.w3.org/2000/svg'
ET.register_namespace('', ns)
ET.register_namespace('xlink', 'http://www.w3.org/1999/xlink')
source = ROOT/'assets/masters/v7.1.5/slogan-open.svg'
frame = ET.parse(source).getroot()
# The final group is the text; preserve the original embedded frame/mask exactly.
assert frame[-1].tag == '{'+ns+'}g' and len(frame[-1]) == 1
assert frame[-1][0].tag == '{'+ns+'}path'
frame.remove(frame[-1])
phrases = json.loads((ROOT/'src/styles/new-slogans.json').read_text())
cities = json.loads((ROOT/'src/styles/city-catalog-v6.json').read_text())['cities']
phrases.update({'love-'+city: '我爱'+c['name'] for city,c in cities.items()})
assert len(phrases) == 28
out = ROOT/'assets/masters/v7.1.13'
out.mkdir(parents=True, exist_ok=True)
records = []
for ident, text in phrases.items():
    count = len(text)
    assert 4 <= count <= 6
    size, extra, baselines = {
        4:(66,0,[315,389,464,538]),
        5:(64,57,[258,328,398,468,538]),
        6:(62,113,[198,266,334,402,470,538]),
    }[count]
    root = copy.deepcopy(frame)
    if extra:
        root.set('height',str(423+extra));root.set('viewBox',f'1539 {190-extra} 127 {423+extra}')
        # Extend only the straight middle: ornaments, corner radii and line widths
        # stay unchanged. The lower section remains at its original coordinates.
        artwork = root[-1];root.remove(artwork)
        for name,y,height,transform in [
            ('top',190,80,f'translate(0 {-extra})'),
            ('middle',270,263,f'translate(0 {270-extra}) scale(1 {(263+extra)/263}) translate(0 -270)'),
            ('bottom',533,80,'translate(0 0)'),
        ]:
            clip=ET.SubElement(root[0],'{'+ns+'}clipPath',{'id':'frame-'+name,'clipPathUnits':'userSpaceOnUse'})
            ET.SubElement(clip,'{'+ns+'}rect',{'x':'1539','y':str(y),'width':'127','height':str(height)})
            outer=ET.SubElement(root,'{'+ns+'}g',{'transform':transform})
            inner=ET.SubElement(outer,'{'+ns+'}g',{'clip-path':'url(#frame-'+name+')'})
            inner.append(copy.deepcopy(artwork))
    origin=1603-size/2
    group = ET.SubElement(root, '{'+ns+'}g', {'transform':f'translate({origin:g} 249)'})
    bounds = []
    for ch, baseline in zip(text, baselines):
        assert ord(ch) in cmap, 'Missing glyph: '+ch
        glyph = glyphs[cmap[ord(ch)]]
        pen, box = SVGPathPen(glyphs), BoundsPen(glyphs)
        glyph.draw(pen); glyph.draw(box)
        ET.SubElement(group, '{'+ns+'}path', {
            'data-character':ch, 'transform':f'translate(0 {baseline-249}) scale({size/1000:g} {-size/1000:g})',
            'd':pen.getCommands(), 'fill':'#D5972E'})
        x0,y0,x1,y1 = box.bounds
        bounds.append([origin+x0*size/1000,baseline-y1*size/1000,origin+x1*size/1000,baseline-y0*size/1000])
    # Approved four-character text region remains inside the frame.
    assert all(1548 < b[0] < b[2] < 1658 and 230-extra < b[1] < b[3] < 570 for b in bounds)
    data = ET.tostring(root, encoding='utf-8')+b'\n'
    (out/(ident+'.svg')).write_bytes(data)
    records.append({'id':ident,'text':text,'sha256':sha(data),'glyphBounds':bounds,
                    'fontSize':size,'frame':{'top':190-extra,'height':423+extra,'bottom':613},'trial':count>4})
report = {'font':approved,'fontSize':66,'baselineOffsets':[66,140,215,289],
          'textOrigin':[1570,249],'frameSource':str(source.relative_to(ROOT)),
          'frameSourceSha256':sha(source.read_bytes()),'records':records}
(out/'blessings.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'masters':len(records),'fontSha256':sha(font_bytes)},ensure_ascii=False))
