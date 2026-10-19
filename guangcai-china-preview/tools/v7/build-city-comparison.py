"""Build the requested 23-city comparison from source bytes and runtime channels.

No source artwork is redrawn. Source previews show the extracted original ink;
full originals stay in the repository. Run with Pillow and NumPy.
"""
from pathlib import Path
import hashlib, io, json, subprocess, os
import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'public/city-compare'
ASSETS = OUT / 'images'
EVIDENCE = ROOT / 'evidence/v7.1.4'


def load(release):
    root = ROOT / 'public/releases' / release
    catalog = json.loads((root / 'catalog.json').read_text())
    return root, json.loads((root / catalog['manifestUrl']).read_text())


def bounds(a, threshold=127):
    yy, xx = np.where(a > threshold)
    return [int(xx.min()), int(yy.min()), int(xx.max()+1), int(yy.max()+1)]


def ink(image):
    a = np.asarray(image.convert('RGBA'), dtype=np.float32)
    return np.maximum(a[:,:,0]-a[:,:,2],0)*a[:,:,3]/255


def proof(channel):
    image = Image.new('RGB', (channel.shape[1],channel.shape[0]), '#fffdf7')
    image.paste('#ae7c26',(0,0,*image.size),Image.fromarray(np.uint8(channel)))
    return image


def flat(mask):
    a = np.asarray(mask.convert('RGB'))
    image = Image.new('RGB',mask.size,'#fffdf7')
    image.paste('#397962',(0,0,*image.size),Image.fromarray(a[:,:,1]))
    image.paste('#c49a42',(0,0,*image.size),Image.fromarray(a[:,:,0]))
    return image


def save(image, name, width=1939):
    if image.width > width:
        image = image.resize((width,round(image.height*width/image.width)),Image.Resampling.LANCZOS)
    image.save(ASSETS/name,format='WEBP',lossless=True,method=6)
    return 'images/'+name


def aligned_iou(old, new, dy):
    # Compare after the measured vertical registration, without counting it as
    # a new building. Tolerance is reported separately; raw IoU is shift-sensitive.
    shifted = np.zeros_like(old)
    if dy >= 0:
        shifted[dy:] = old[:len(old)-dy] if dy else old
    else:
        shifted[:dy] = old[-dy:]
    a, b = shifted > 127, new > 127
    return float(np.count_nonzero(a & b)/max(1,np.count_nonzero(a | b)))


def main():
    ASSETS.mkdir(parents=True,exist_ok=True);EVIDENCE.mkdir(parents=True,exist_ok=True)
    old_root, old = load('v7-4');new_root, new = load('v7-5')
    sources = json.loads((ROOT/'assets/source/v7.1.4/provenance.json').read_text())['cities']
    review_file=ROOT/'assets/masters/v7.1.4/comparison-review.json'
    reviews=json.loads(review_file.read_text()) if review_file.exists() else {}
    derivation = json.loads((ROOT/'evidence/city-alignment-20261019/derivation.json').read_text())['cities']
    font = ImageFont.truetype('/System/Library/Fonts/Supplemental/Songti.ttc',25)
    rows = []
    selected = set(os.environ.get('CITY_IDS','').split(','))-{''}
    existing = json.loads((OUT/'data.json').read_text())['cities'] if selected else []
    for entry in sources:
        ident = entry['id']
        if selected and ident not in selected:
            rows.append(next(c for c in existing if c['id']==ident));continue
        old_bytes = subprocess.check_output(['git','show','HEAD:guangcai-china-preview/assets/source/v6/'+ident+'.png'],cwd=ROOT.parent)
        new_bytes = (ROOT/'assets/source/v7.1.4'/entry['file']).read_bytes()
        before_source = Image.open(io.BytesIO(old_bytes)).convert('RGBA')
        after_source = Image.open(io.BytesIO(new_bytes)).convert('RGBA')
        before_ink,after_ink = ink(before_source),ink(after_source)
        a,b=before_ink>70,after_ink>70
        aa,bb=np.asarray(before_source),np.asarray(after_source)
        source_record = dict(size=list(before_source.size),beforeBounds=bounds(before_ink,70),afterBounds=bounds(after_ink,70),
            fileChanged=old_bytes!=new_bytes,pixelChanged=not np.array_equal(aa,bb),
            differentPixels=int(np.count_nonzero(np.any(aa!=bb,axis=2))),
            inkChangedPixels=int(np.count_nonzero(a^b)),
            rawInkIoU=float(np.count_nonzero(a&b)/max(1,np.count_nonzero(a|b))),
            beforeSha256=hashlib.sha256(old_bytes).hexdigest(),afterSha256=hashlib.sha256(new_bytes).hexdigest())
        images = dict(sourceBefore=save(proof(before_ink),ident+'-source-before.webp'),sourceAfter=save(proof(after_ink),ident+'-source-after.webp'))
        tier_records=[]
        for tier in ['light','standard','detail']:
            before = np.asarray(Image.open(old_root/old['cities'][ident]['levels'][tier]['mask']['url']).convert('RGB'))
            after = np.asarray(Image.open(new_root/new['cities'][ident]['levels'][tier]['mask']['url']).convert('RGB'))
            h,w=before.shape[:2]
            ob,nb=bounds(before[:,:,0]),bounds(after[:,:,0])
            gap_before,gap_after=h-ob[3],h-nb[3]
            dy=nb[3]-ob[3]
            covariance=np.count_nonzero(before[:,:,1]>127),np.count_nonzero(after[:,:,1]>127)
            tier_records.append(dict(tier=tier,size=[w,h],beforeBounds=ob,afterBounds=nb,beforeGap=gap_before,afterGap=gap_after,
                rawLineIoU=aligned_iou(before[:,:,0],after[:,:,0],0),registeredLineIoU=aligned_iou(before[:,:,0],after[:,:,0],dy),
                translatedRows=dy,coveragePixelsBefore=int(covariance[0]),coveragePixelsAfter=int(covariance[1])))
            if tier=='detail':
                images['flatBefore']=save(flat(Image.fromarray(before)),ident+'-flat-before.webp')
                images['flatAfter']=save(flat(Image.fromarray(after)),ident+'-flat-after.webp')
                # Old-only magenta, new-only cyan, shared gold. Opaque proof colors.
                both=(before[:,:,0]>127)&(after[:,:,0]>127);old_only=(before[:,:,0]>127)&~both;new_only=(after[:,:,0]>127)&~both
                overlay=np.empty_like(before);overlay[:]=[255,253,247];overlay[old_only]=[197,54,125];overlay[new_only]=[0,139,168];overlay[both]=[183,143,60]
                images['overlay']=save(Image.fromarray(overlay),ident+'-overlay.webp')
                # Equal pixel windows, with vertical exaggeration explicitly labeled.
                for value,label in [(before,'Before'),(after,'After')]:
                    crop=flat(Image.fromarray(value)).crop((1536,h-64,2560,h)).resize((1024,256),Image.Resampling.NEAREST)
                    images['bottom'+label]=save(crop,ident+'-bottom-'+label.lower()+'.webp',1024)
                # Compact review sheet: each pair shares its canvas, scale and crop.
                sheet=Image.new('RGB',(1400,1120),'#f7f4ed');draw=ImageDraw.Draw(sheet)
                draw.text((22,12),entry['name']+' · 旧版 / 新版',font=font,fill='#332c21')
                panels=[(proof(before_ink),proof(after_ink),'附件原稿描线'),(flat(Image.fromarray(before)),flat(Image.fromarray(after)),'杯身展开描线与填色')]
                for row,(left,right,title) in enumerate(panels):
                    y=62+row*335;draw.text((22,y),title,font=font,fill='#665437')
                    for col,picture in enumerate([left,right]):
                        picture.thumbnail((674,285),Image.Resampling.LANCZOS);sheet.paste(picture,(col*700+12,y+38))
                ov=Image.fromarray(overlay);ov.thumbnail((1360,300),Image.Resampling.LANCZOS);sheet.paste(ov,(20,740));draw.text((22,1080),'叠图：旧版独有=洋红；新版独有=青；重合=金。位置移动会使细线IoU明显下降。',font=ImageFont.truetype('/System/Library/Fonts/Supplemental/Songti.ttc',19),fill='#665437')
                sheet.save(EVIDENCE/(ident+'-review.jpg'),quality=96)
        assert all(t['afterGap']==0 for t in tier_records), ident+' solid bottom'
        method=next(d for d in derivation if d['id']==ident)
        row=dict(id=ident,name=entry['name'],source=source_record,tiers=tier_records,images=images,
            action='原稿金线边界相同，保留已审查描线并同步到底边' if source_record['inkChangedPixels']==0 else '按新附件描线生成，填色与法线同步到底边',
            method='source-refresh' if source_record['pixelChanged'] else 'bottom-translation',
            notes=[],reviewed=False)
        if ident in reviews and reviews[ident]['sourceSha256']==source_record['afterSha256']:
            row.update(notes=reviews[ident]['notes'],reviewed=reviews[ident]['reviewed'],reviewBasis=reviews[ident]['basis'])
        rows.append(row)
        print(ident,entry['name'],'sourceIoU',round(source_record['rawInkIoU'],4),'bottom',[(t['beforeGap'],t['afterGap']) for t in tier_records],flush=True)
    result=dict(title='23城图案逐项对比',beforeVersion='V7.1.3 / v7-4',afterVersion='V7.1.4 / v7-5',
        scope='同一应用、相机和参数；原稿预览提取附件金线，不公开PSD或原件下载；杯身图是自动化渲染证据。',
        thresholds='边界和底部使用描线通道>127；原稿预览边界使用金色差分>70。IoU对细线位移敏感，不作为质量分数。',
        cityCount=len(rows),cities=rows)
    (OUT/'data.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
    (EVIDENCE/'comparison.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
    (OUT/'index.html').write_text((Path(__file__).with_name('city-comparison-template.html')).read_text())


if __name__=='__main__':main()
