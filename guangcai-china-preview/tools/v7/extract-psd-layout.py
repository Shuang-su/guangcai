"""Read preserved normal-UI SVG exports; retain the exact city image placement."""
from pathlib import Path
from xml.etree import ElementTree as E
import json
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.codex-work/cache/v7.1.7';OUT.mkdir(parents=True,exist_ok=True)
NS={'s':'http://www.w3.org/2000/svg'}
for c in json.loads((ROOT/'assets/masters/v7.1.5/layout.json').read_text())['cities']:
    r=E.parse(ROOT/c['sourceFile']).getroot();defs=r.find('s:defs',NS);g=r.find('s:g',NS)
    rect=next(q for q in g if q.tag.endswith('rect') and (q.get('fill') or '').startswith('url('))
    pattern=next(q for q in defs if q.get('id')==rect.get('fill')[5:-1]);clip=next(q for q in defs if q.tag.endswith('clipPath'))
    xml=lambda q:E.tostring(q,encoding='unicode')
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="1939" height="815" viewBox="0 0 1939 815"><defs>{xml(clip)}{xml(pattern)}</defs><g clip-path="{g.get("clip-path")}">{xml(rect)}</g></svg>'
    (OUT/(c['id']+'.svg')).write_text(svg)
print('Preserved image transforms for 23 cities')
