// Filled faces are deliberately visible here; main slider keeps V7.1.4 as baseline.
import fs from 'node:fs/promises';import path from 'node:path';import sharp from 'sharp';import {createHash} from 'node:crypto';
const out='public/label-compare',hash=b=>createHash('sha256').update(b).digest('hex');
async function load(id){const root='public/releases/'+id,c=JSON.parse(await fs.readFile(root+'/catalog.json'));return {root,m:JSON.parse(await fs.readFile(root+'/'+c.manifestUrl))};}
const before=await load('v7-8'),after=await load('v7-9'),coverage=JSON.parse(await fs.readFile('public/coverage/data.json'));
const descriptions={xian:'使用新闭合曲线导出稿；塔身和建筑面完整填色，修复原白洞。',chongqing:'仅楼体之间的三处空隙露白瓷；楼面、空中连廊与前景继续填色。',nanchang:'仅轮圈内轮辐间隙露白瓷；座舱、轮辋、轮毂、支架和前景保持填色。',beijing:'仅CCTV大裤衩中央开口露白瓷；两侧楼体及悬挑连接保持填色。',qingdao:'五月的风—电视塔、电视塔—回澜阁之间两处空隙露白瓷，三个建筑本体及前景保持填色。',tianjin:'仅轮圈内轮辐间隙露白瓷；外部座舱、轮辋、中心轮毂、Y形支架和桥面保持填色。'};
const cities=[];
for(const [id,note]of Object.entries(descriptions)){
 const masks=await Promise.all([before,after].map(async s=>{const asset=s.m.cities[id].levels.detail.mask;return {asset,...await sharp(path.resolve(s.root,asset.url)).removeAlpha().raw().toBuffer({resolveWithObject:true})};}));
 const {width:W,height:H}=masks[0].info;let l=W,t=H,r=0,b=0,added=0,removed=0;const delta=Buffer.alloc(W*H*3,255),changedLinePixels=masks[0].data.reduce((sum,v,i)=>sum+(i%3===0&&v!==masks[1].data[i]?1:0),0);
 for(let i=0;i<W*H;i++){
  if(Math.max(masks[0].data[i*3],masks[1].data[i*3])>70){const x=i%W,y=Math.floor(i/W);l=Math.min(l,x);t=Math.min(t,y);r=Math.max(r,x);b=Math.max(b,y);}
  const diff=(masks[1].data[i*3+1]-masks[0].data[i*3+1])/255;added+=Math.max(diff,0);removed+=Math.max(-diff,0);
  if(Math.abs(diff)>.02)for(let k=0;k<3;k++)delta[i*3+k]=Math.round(255*(1-Math.abs(diff))+Math.abs(diff)*(diff>0?[45,151,114]:[208,77,101])[k]);
 }
 const crop={left:Math.max(0,l-20),top:Math.max(0,t-25),width:Math.min(W,r+21)-Math.max(0,l-20),height:Math.min(H,b+21)-Math.max(0,t-25)},images={};
 for(let phase=0;phase<2;phase++){
  const rgb=Buffer.alloc(W*H*3,255),raw=masks[phase].data;
  for(let i=0;i<W*H;i++){const g=raw[i*3+1]/255,a=raw[i*3]/255;for(let k=0;k<3;k++)rgb[i*3+k]=Math.round((255*(1-g)+[229,197,121][k]*g)*(1-a)+[139,93,19][k]*a);}
  const file=`images/repair-${id}-${phase?'after':'before'}.webp`;await sharp(rgb,{raw:{width:W,height:H,channels:3}}).extract(crop).resize({width:1800,withoutEnlargement:true}).webp({quality:96}).toFile(out+'/'+file);images[phase?'after':'before']=file;
 }
 images.delta=`images/repair-${id}-delta.webp`;await sharp(delta,{raw:{width:W,height:H,channels:3}}).extract(crop).resize({width:1800,withoutEnlargement:true}).webp({quality:96}).toFile(out+'/'+images.delta);
 const prior=coverage.groups.prior.cities[id].occupancy.cityPaintMm2,current=coverage.groups.current.cities[id].occupancy.cityPaintMm2;
 cities.push({id,name:after.m.cities[id].name,note,images,crop,addedCoveragePixels:added,removedCoveragePixels:removed,changedLinePixels,beforeMask:masks[0].asset.sha256,afterMask:masks[1].asset.sha256,beforeModelPaintMm2:prior,afterModelPaintMm2:current,deltaModelPaintMm2:current-prior,normalUnchanged:before.m.cities[id].levels.detail.normal.sha256===after.m.cities[id].levels.detail.normal.sha256});
}
await fs.writeFile(out+'/updates.json',JSON.stringify({version:'7.1.11',beforeRelease:'v7-8',afterRelease:'v7-9',mainComparisonBaseline:'v7-5',formalShenzhenUnchanged:true,phase2Url:'/artwork-dev/?art=phase2',cities},null,2)+'\n');console.log('six filled-face and delta comparisons generated');
