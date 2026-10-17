"""Inspect immutable v7-2 coverage; write diagnostics, never rewrite source artwork."""
from pathlib import Path
import argparse,hashlib,json
import numpy as np
from PIL import Image,ImageDraw,ImageFont

ROOT=Path(__file__).resolve().parents[2]
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def components(mask):
    """4-connected run-length labeling, including tiny holes; no morphology."""
    h,w=mask.shape;parents=[];runs=[];previous=[]
    def find(i):
        while parents[i]!=i:parents[i]=parents[parents[i]];i=parents[i]
        return i
    for y,row in enumerate(mask):
        delta=np.diff(np.pad(row.astype(np.int8),(1,1)));starts=np.flatnonzero(delta==1);ends=np.flatnonzero(delta==-1);current=[];j=0
        for left,right in zip(starts,ends):
            idx=len(parents);parents.append(idx);runs.append((int(left),y,int(right)));current.append(idx)
            while j<len(previous) and runs[previous[j]][2]<=left:j+=1
            k=j
            while k<len(previous) and runs[previous[k]][0]<right:
                parents[find(idx)]=find(previous[k]);k+=1
        previous=current
    result={}
    for idx,(left,y,right) in enumerate(runs):
        key=find(idx);r=result.setdefault(key,{'pixels':0,'bbox':[left,y,right,y+1],'boundary':False,'runs':[]});r['pixels']+=right-left;r['bbox']=[min(r['bbox'][0],left),min(r['bbox'][1],y),max(r['bbox'][2],right),max(r['bbox'][3],y+1)];r['boundary']|=left==0 or right==w or y==0 or y==h-1;r['runs'].append([left,y,right])
    return sorted(result.values(),key=lambda r:r['pixels'],reverse=True)
def inspect(a):
    cover=a[:,:,1]>127;holes=[r for r in components(~cover) if not r['boundary']]
    h,w=cover.shape;y=np.arange(h)[:,None];top=np.argmax(cover,axis=0);bottom=h-1-np.argmax(cover[::-1],axis=0)
    candidates=(y>=top)&(y<=bottom)&~cover&cover.any(axis=0)
    gaps=[{k:v for k,v in r.items() if k!='runs'} for r in components(candidates) if r['pixels']>=100]
    return holes,gaps

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--original-dir',type=Path);parser.add_argument('--reference-dir',type=Path);args=parser.parse_args()
    release=ROOT/'public/releases/v7-2';catalog=json.loads((release/'catalog.json').read_text());manifest=json.loads((release/catalog['manifestUrl']).read_text());spec=json.loads((ROOT/'assets/masters/v6/cities.json').read_text());sources={c['id']:c for c in spec['cities']}
    out=ROOT/'evidence/v7.1.2/cities';out.mkdir(parents=True,exist_ok=True);cache=ROOT/'.codex-work/tmp/v7.1.2/cities';cache.mkdir(parents=True,exist_ok=True)
    font=ImageFont.truetype(str(ROOT/'assets/source/v7.1.2/fonts/SourceHanSerifCN-Bold.otf'),20)
    rows=[];overview=[]
    for ident,city in manifest['cities'].items():
        source=ROOT/sources[ident]['source'];row={'id':ident,'name':city['name'],'source':sources[ident]['source'],'sourceSha256':sha(source),'sourceMatchesUserFolder':None,'referenceKind':'APEC material/full-fill reference, not a matching domestic-city photograph','tiers':{}}
        if args.original_dir:
            supplied=args.original_dir/(city['name']+'@2x.png');row['sourceMatchesUserFolder']=source.read_bytes()==supplied.read_bytes();assert row['sourceMatchesUserFolder']
        for tier,level in city['levels'].items():
            file=release/level['mask']['url'];a=np.asarray(Image.open(file).convert('RGB'));holes,gaps=inspect(a)
            row['tiers'][tier]={'assetSha256':sha(file),'size':[a.shape[1],a.shape[0]],'enclosed':holes,'openCandidates':gaps}
            if tier!='detail':continue
            rgb=np.zeros_like(a);rgb[a[:,:,1]>127]=[32,151,79];rgb[a[:,:,0]>127]=[255,209,70]
            image=Image.fromarray(rgb);draw=ImageDraw.Draw(image)
            for i,g in enumerate(gaps):draw.rectangle(g['bbox'],outline='#eb6bde',width=2);draw.text((g['bbox'][0],max(0,g['bbox'][1]-22)),str(i+1),font=font,fill='#ffffff')
            points=np.argwhere((a[:,:,0]>127)|(a[:,:,1]>127));y0,x0=points.min(0);y1,x1=points.max(0);bounds=[int(x0),int(y0),int(x1)+1,int(y1)+1];row['detailBounds']=bounds
            mid=(bounds[0]+bounds[2])//2;panel=Image.new('RGB',(1600,590),'#f7f2e9');pd=ImageDraw.Draw(panel);pd.text((12,8),f'{city["name"]} {ident} / purple boxes: exterior-connected candidates, not automatic fill',font=font,fill='#30261e')
            for i,(l,r) in enumerate([(bounds[0],mid+40),(mid-40,bounds[2])]):
                crop=image.crop((l,bounds[1],r,bounds[3]));crop.thumbnail((790,535));panel.paste(crop,(i*800+(800-crop.width)//2,45+(535-crop.height)//2))
            panel.save(out/(ident+'-review.jpg'),quality=92)
            small=Image.fromarray(rgb).crop(bounds);small.thumbnail((780,270));tile=Image.new('RGB',(800,310),'#f7f2e9');ImageDraw.Draw(tile).text((10,5),city['name']+' '+ident,font=font,fill='#30261e');tile.paste(small,((800-small.width)//2,35));overview.append(tile)
        rows.append(row);print(ident,{t:len(v['enclosed']) for t,v in row['tiers'].items()},flush=True)
    for page in range(2):
        subset=overview[page*12:page*12+12];sheet=Image.new('RGB',(1600,310*((len(subset)+1)//2)),'white')
        for i,tile in enumerate(subset):sheet.paste(tile,((i%2)*800,(i//2)*310))
        sheet.save(out/f'overview-{page+1}.jpg',quality=92)
    (out/'before.json').write_text(json.dumps({'release':'v7-2','threshold':127,'connectedness':4,'cities':rows},ensure_ascii=False,indent=2)+'\n')
    if args.reference_dir:
        names=['新西兰','墨西哥','马来西亚','泰国','日本','新加坡','文莱','韩国','俄罗斯','菲律宾','智利','加拿大','印度尼西亚','澳大利亚','巴布亚新几内亚','秘鲁','美国','香港','越南','中国','中国台北']
        files=sorted(p for p in args.reference_dir.glob('*.JPG') if not p.name.startswith('._'));assert len(files)==len(names)
        refs=[{'file':p.name,'sha256':sha(p),'labelReadFromPhoto':name,'matchesDomesticCityId':None,'use':'gold fill / outline / porcelain material reference'} for p,name in zip(files,names)]
        (out/'reference-identities.json').write_text(json.dumps(refs,ensure_ascii=False,indent=2)+'\n')
if __name__=='__main__':main()
