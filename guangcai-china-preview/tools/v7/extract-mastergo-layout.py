"""Derive reviewable sources from normal-UI Copy SVG exports; never read editor internals."""
from pathlib import Path
from xml.etree import ElementTree as E
import copy,hashlib,json,shutil,re
ROOT=Path(__file__).resolve().parents[2]
RAW=ROOT/'.codex-work/downloads/mastergo-20261020'
SOURCE=ROOT/'assets/source/v7.1.5/mastergo'
MASTER=ROOT/'assets/masters/v7.1.5'
NS={'s':'http://www.w3.org/2000/svg'}
for p in [SOURCE,MASTER/'labels',ROOT/'.codex-work/cache/v7.1.5/mastergo-cities']:p.mkdir(parents=True,exist_ok=True)
def sha(b):return hashlib.sha256(b).hexdigest()
def svg(content,view='0 0 1939 815',w=1939,h=815):return f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{w}" height="{h}" viewBox="{view}">{content}</svg>'
def xml(e):return E.tostring(e,encoding='unicode')
prior=json.loads((ROOT/'public/city-compare/data.json').read_text())
old=json.loads((ROOT/'.codex-work/tmp/deferred-mastergo-labels/masters/layout.json').read_text())
old={c['id']:c for c in old['cities']}
phrase_sources={'together':'shanghai','ocean':'shenzhen','open':'xiamen','sharing':'zhengzhou'}
paths={}
for ident,city in phrase_sources.items():
 r=E.parse(RAW/(city+'.svg')).getroot();paths[sha(xml(r.find('s:g',NS)[-1]).encode())]=ident
report={'date':'2026-10-20','method':'MasterGo normal UI Copy SVG; CUA; no private editor API','sourceUrl':'https://mastergo.com/file/207427706578154?fileOpenFrom=home&page_id=M&shareId=207427706578154&state=LanHuVX','canvas':[1939,815],'canonicalFrame':{'left':1539,'top':190,'width':127,'height':423},'canonicalText':{'left':1570,'top':249,'width':116,'height':343,'fontSize':66},'cities':[],'exceptions':[]}
frame_sha=None;canonical_frame=None
for c in prior['cities']:
 ident=c['id'];b=(RAW/(ident+'.svg')).read_bytes();r=E.fromstring(b);defs=r.find('s:defs',NS);g=r.find('s:g',NS);assert [int(r.get(k)) for k in ['width','height']]==[1939,815]
 shutil.copyfile(RAW/(ident+'.svg'),SOURCE/(ident+'.svg'))
 used=[q for q in g if q.get('mask') and len(q)]
 assert len(used)==1,(ident,'ambiguous visible frame')
 fg=used[0];maskid=fg.get('mask')[5:-1];mask=next(x for x in defs if x.get('id')==maskid);mr=mask.find('s:rect',NS);pid=mr.get('fill')[5:-1];pattern=next(x for x in defs if x.get('id')==pid)
 assert [float(pattern.get(k)) for k in ['x','y','width','height']]==[1539,190,127,423]
 image=pattern.find('s:image',NS);href=image.get('{http://www.w3.org/1999/xlink}href') or image.get('href');fs=sha(href.encode())
 if frame_sha is None:frame_sha=fs;canonical_frame='<defs>'+xml(pattern)+xml(mask)+'</defs>'+xml(fg)
 assert fs==frame_sha,(ident,'frame pixels differ; refresh normal UI export before accepting')
 text=g[-1];assert text.tag.endswith('g') and len(text)==1 and text[0].tag.endswith('path')
 key=sha(xml(text).encode());slogan=paths.get(key)
 if ident=='chengdu' and slogan is None:
  # Validate the measured +6px translation against the current canonical text.
  open_r=E.parse(RAW/'xiamen.svg').getroot();canonical_d=open_r.find('s:g',NS)[-1][0].get('d');actual_d=text[0].get('d')
  command=lambda d:re.findall(r'[A-Za-z]',d)
  assert command(actual_d)==command(canonical_d) and set(command(actual_d))<=set('MLCZ')
  number=lambda d:[float(x) for x in re.findall(r'-?\d+(?:\.\d+)?',d)]
  aa,bb=number(actual_d),number(canonical_d);assert len(aa)==len(bb)
  assert all(abs((x-y)-(6 if i%2 else 0))<.0001 for i,(x,y) in enumerate(zip(aa,bb)))
  slogan='open' 
 assert slogan,(ident,'unknown text outlines')
 label=svg('<defs>'+xml(pattern)+xml(mask)+'</defs>'+xml(fg)+xml(text),'1539 190 127 423',127,423)
 (MASTER/'labels'/(ident+'.svg')).write_text(label)
 if ident==phrase_sources[slogan]:(MASTER/('slogan-'+slogan+'.svg')).write_text(label)
 # Keep only the city image rectangle, its pattern and outer canvas clipping.
 cityrect=next(q for q in g if q.tag.endswith('rect') and (q.get('fill') or '').startswith('url('))
 citypid=cityrect.get('fill')[5:-1];citypattern=next(q for q in defs if q.get('id')==citypid)
 clip=next(q for q in defs if q.tag.endswith('clipPath'))
 citysvg=svg('<defs>'+xml(clip)+xml(citypattern)+'</defs><g clip-path="'+g.get('clip-path')+'">'+xml(cityrect)+'</g>')
 (ROOT/'.codex-work/cache/v7.1.5/mastergo-cities'/(ident+'.svg')).write_text(citysvg)
 row={'id':ident,'name':c['name'],'slogan':slogan,'frame':report['canonicalFrame'],'text':{**report['canonicalText'],'top':255 if ident=='chengdu' else 249},'previousReferenceFrame':old.get(ident,{}).get('frame'),'sourceFile':'assets/source/v7.1.5/mastergo/'+ident+'.svg','sha256':sha(b),'bytes':len(b),'frameImageSha256':fs,'frameUnified':True,'textUnified':ident!='chengdu','cityImageRect':{k:float(citypattern.get(k)) for k in ['x','y','width','height']}}
 report['cities'].append(row)
 if ident=='chengdu':report['exceptions'].append({'cityId':ident,'kind':'textVerticalOffset','sourceDeltaY':6,'productionDeltaY':0,'action':'Use the same canonical open-slogan outlines and position as Xiamen; original retained for comparison.'})
for ident in ['cooperation','innovation']:
 # These two selectable phrases are absent from the 23 current boards. Use the
 # approved outlined glyphs and apply the measured 66px size and four baselines.
 oldsvg=E.parse(ROOT/f'assets/masters/v7.1.2/slogan-{ident}.svg').getroot();glyphs=[p for p in oldsvg.iter() if p.tag.endswith('path') and p.get('data-character')];assert len(glyphs)==4
 text='<g transform="translate(1570 249)">'+''.join(f'<path transform="translate(0 {base}) scale(.066 -.066)" d="{p.get("d")}" fill="#D5972E"/>' for p,base in zip(glyphs,[66,140,215,289]))+'</g>'
 (MASTER/('slogan-'+ident+'.svg')).write_text(svg(canonical_frame+text,'1539 190 127 423',127,423))
report['frameImageSha256']=frame_sha;report['passed']=len(report['cities'])==23;report['missingPhrasesInReference']=['cooperation','innovation'];report['deadSourceNodes']={'guangzhou':'Empty old mask group has no rendered children.','shijiazhuang':'Old text lies outside the clipped canvas; current visible text matches sharing.'}
(MASTER/'layout.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(json.dumps({'passed':report['passed'],'frames':23,'textPositionExceptions':report['exceptions']},ensure_ascii=False))
