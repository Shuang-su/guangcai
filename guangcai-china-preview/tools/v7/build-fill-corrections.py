"""Materialize only visually reviewed coverage corrections in 4096x1783 coordinates."""
from pathlib import Path
import hashlib,json
import numpy as np
from PIL import Image
from importlib.util import spec_from_file_location,module_from_spec
ROOT=Path(__file__).resolve().parents[2]
spec=spec_from_file_location('audit',Path(__file__).with_name('audit-city-fill.py'));audit=module_from_spec(spec);spec.loader.exec_module(audit)
before=json.loads((ROOT/'evidence/v7.1.2/cities/before.json').read_text());old=ROOT/'public/releases/v7-2';catalog=json.loads((old/'catalog.json').read_text());manifest=json.loads((old/catalog['manifestUrl']).read_text());masters=ROOT/'assets/masters/v7.1.2';records=[]
for ident in ['xiamen','xian']:
    asset=manifest['cities'][ident]['levels']['detail']['mask'];source=(old/asset['url']).read_bytes();a=np.asarray(Image.open(old/asset['url']).convert('RGB'));regions=[]
    if ident=='xiamen':
        cover=a[:,:,1]>127;y=np.arange(1783)[:,None];top=np.argmax(cover,axis=0);bottom=1782-np.argmax(cover[::-1],axis=0);candidates=(y>=top)&(y<=bottom)&~cover&cover.any(axis=0)
        found=[c for c in audit.components(candidates) if c['bbox']==[952,1455,1073,1541]];assert len(found)==1 and found[0]['pixels']==2950
        runs=found[0]['runs'];regions=[{'kind':'open-contour-missing-fill','bbox':found[0]['bbox'],'pixels':2950,'reason':'建筑后方树丛：上方连续树冠描线与下方屋面之间漏填；只闭合已确认树丛内部，保留右侧楼间天空。'}]
        paths=''.join(f'<path d="M{l} {y}H{r}V{y+1}H{l}Z"/>' for l,y,r in runs)
    else:
        holes=next(c for c in before['cities'] if c['id']==ident)['tiers']['detail']['enclosed'];assert [h['pixels'] for h in holes]==[26,10,4]
        paths=''
        for h in holes:
            l,t,r,b=h['bbox'];l-=1;t-=1;r+=1;b+=1;paths+=f'<rect x="{l}" y="{t}" width="{r-l}" height="{b-t}"/>';regions.append({'kind':'internal-battlement-seam','bbox':[l,t,r,b],'originalHolePixels':h['pixels'],'reason':'右侧城墙垛口内部细缝；扩一像素覆盖缝边半透明值，仍处于已填建筑内部。'})
    body=f'<svg xmlns="http://www.w3.org/2000/svg" width="4096" height="1783" viewBox="0 0 4096 1783"><metadata>Fill-only correction from v7-2 {ident}; R outline and normal unchanged</metadata><g id="coverage-corrections" fill="white">{paths}</g></svg>\n'
    dest=masters/f'{ident}-coverage-correction.svg';dest.write_text(body);records.append({'cityId':ident,'sourceAssetSha256':hashlib.sha256(source).hexdigest(),'correction':str(dest.relative_to(ROOT)),'correctionSha256':hashlib.sha256(body.encode()).hexdigest(),'regions':regions})
cues={
'shanghai':'东方明珠球体两侧、收分塔身与楼间留白为外部天空；楼面、支撑内部及山坡完整。',
'urumqi':'尖塔逐层外檐和高塔外侧留白正常，门窗、塔体及树丛完整。',
'beijing':'祈年殿外檐下方为外部天空；央视、塔身、台阶、长城内部完整。低清城垛细点为边缘缩放。',
'nanjing':'城楼外檐与左塔挑檐外部留白；墙面和山坡完整，标准档1像素候选位于边缘。',
'nanchang':'摩天轮外缘/吊舱间、塔楼外檐为外部留白；轮盘、建筑内部完整。',
'xiamen':'确认建筑后方树丛开口漏填；建筑与双子塔之间狭缝属于楼间天空，低清封闭候选不填。',
'hohhot':'五塔各层挑檐外侧和屋顶装饰间隙为外部天空；庙宇内部完整。',
'harbin':'电视塔收分外侧、教堂穹顶外部与十字架两侧保留天空；墙面完整。',
'tianjin':'时钟弯曲外轮廓、摩天轮支架外侧与吊舱间为天空；轮盘与桥体完整。',
'taiyuan':'双塔挑檐两侧及小亭檐下为外部天空；塔层与墙面完整。低清候选处于轮廓边缘。',
'guangzhou':'五羊外轮廓、广州塔收分两侧为天空；雕塑内部和楼体完整。',
'chengdu':'候选集中于亭台外檐与后方树丛之间的外部天空；缩图闭合的狭小天空仍保留。桥拱内部已实填。',
'jingdezhen':'楼阁外檐和烟囱外侧为外部天空；厂房、窑体与墙面完整。',
'hangzhou':'U形楼中央开口是外部天空；楼体、桥体、体育场内部完整。',
'wuhan':'黄鹤楼外檐、电视塔外侧为天空；桥体与楼面内部完整。',
'shenyang':'电视塔收分两侧、宫殿外檐为天空；圆形建筑与宫殿内部完整。',
'shenzhen':'高楼、桥体、体育场、背景山坡完整；细竖条候选是楼体外边缘抗锯齿。',
'shijiazhuang':'塔檐与楼檐外侧留白正常；桥拱、桥体和建筑内部完整。',
'xian':'保留上轮大面补填；确认右侧城墙3处微缝。左侧寺庙与塔身之间的低清细点属于外部天空。',
'zhengzhou':'塔楼挑檐和电视塔收分外侧为天空；楼体、桥及山坡完整。',
'chongqing':'洪崖洞檐角外侧及楼间缝为天空；桥体与建筑面完整。低清孤点处于外轮廓。',
'changchun':'塔身外侧及站房外檐为天空；楼体和钟楼完整。低清孤点位于檐下外部。',
'qingdao':'五月风外轮廓、电视塔收分外侧、亭阁挑檐为天空；雕塑与楼体内部完整。'}
review=[]
for city in before['cities']:
    review.append({'cityId':city['id'],'name':city['name'],'sourceSha256':city['sourceSha256'],'sourceMatchesUserFolder':city['sourceMatchesUserFolder'],'reviewImage':city['id']+'-review.jpg','reviewed':True,'decision':cues[city['id']],'openCandidateCount':len(city['tiers']['detail']['openCandidates']),'correction':next((r for r in records if r['cityId']==city['id']),None),'lowerTierPolicy':'Use full-resolution contour to distinguish exterior sky/antialias aliasing from missing interior fill; no global flood-fill.'})
(ROOT/'evidence/v7.1.2/cities/review.json').write_text(json.dumps({'sourceRelease':'v7-2','referenceIdentityFile':'reference-identities.json','referenceUse':'21 APEC region editions are material/style references, not one-to-one domestic-city sources','cities':review,'corrections':records},ensure_ascii=False,indent=2)+'\n');print(json.dumps(records,ensure_ascii=False))
