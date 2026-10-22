import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const prior='public/releases/v7-9',root='public/releases/v7-10',masters='assets/masters/v7.1.13';
const hash=b=>createHash('sha256').update(b).digest('hex');
const cat=JSON.parse(await fs.readFile(prior+'/catalog.json'));
const old=JSON.parse(await fs.readFile(prior+'/'+cat.manifestUrl)),m=structuredClone(old);
function rebase(value){if(value&&typeof value==='object'){if(value.url&&value.sha256)value.url=path.relative(root,path.resolve(prior,value.url)).split(path.sep).join('/');else Object.values(value).forEach(rebase);}}
rebase(m);m.releaseId='v7-10';
const mapping=JSON.parse(await fs.readFile('assets/masters/v7.1.7/mapping.json'));
const [W,H]=mapping.runtime,s=mapping.scale,[dx,dy]=mapping.offset;
const ref=m.slogans.open,[u,v,w,h]=ref.uvRect,left=Math.round(u*W),originalTop=Math.round((1-v-h)*H);
await fs.mkdir(root+'/assets',{recursive:true});
const records=JSON.parse(await fs.readFile(masters+'/blessings.json')).records;
let addedBytes=0;
for(const record of records){
 const source=await fs.readFile(`${masters}/${record.id}.svg`);
 assert.equal(hash(source),record.sha256);
 const full=Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><g transform="translate(${dx+1539*s} ${dy+record.frame.top*s}) scale(${s})">${source}</g></svg>`);
 const raw=await sharp(full).ensureAlpha().extractChannel('alpha').raw().toBuffer();
 // Fixed crop and UV: replacing characters cannot move or resize the frame.
 const extension=Math.ceil((190-record.frame.top)*s),top=originalTop-extension;
 const width=ref.asset.width,height=ref.asset.height+extension,pixels=Buffer.alloc(width*height);
 for(let y=0;y<height;y++)raw.copy(pixels,y*width,(top+y)*W+left,(top+y)*W+left+width);
 const bytes=await sharp(pixels,{raw:{width,height,channels:1}}).webp({lossless:true}).toBuffer();
 const sha256=hash(bytes),url=`assets/slogan-${record.id}-${sha256.slice(0,16)}.webp`;
 await fs.writeFile(root+'/'+url,bytes);addedBytes+=bytes.length;
 const label={asset:{id:'slogan-'+record.id,url,sha256,sourceSha256:record.sha256,encoding:'webp',width,height,bytes:bytes.length,decodedBytes:width*height,gpuBytes:Math.ceil(width*height*4/3),channels:1,colorSpace:'linear'},uvRect:[u,v,w,height/H]};
 if(record.id.startsWith('love-')){const cityId=record.id.slice(5);m.cities[cityId].slogans={...m.cities[cityId].slogans,'love-city':label};}
 else m.slogans[record.id]={text:record.text,...label};
}
m.slogans['love-city']={text:'我爱城市',...m.cities.shenzhen.slogans['love-city']};
const bytes=JSON.stringify(m,null,2)+'\n',manifest='manifest-'+hash(bytes).slice(0,16)+'.json';
await fs.writeFile(root+'/'+manifest,bytes);
await fs.writeFile(root+'/catalog.json',JSON.stringify({...cat,releaseId:m.releaseId,manifestUrl:manifest,cities:Object.fromEntries(Object.entries(m.cities).map(([id,c])=>[id,{name:c.name,thumbnail:c.thumbnail.url}]))},null,2)+'\n');
const bootstrap=JSON.parse(await fs.readFile('public/api/v1/bootstrap.json'));
Object.assign(bootstrap,{releaseId:m.releaseId,catalogUrl:'releases/v7-10/catalog.json',manifestUrl:'releases/v7-10/'+manifest});
Object.assign(bootstrap.defaultDesign,{resourceReleaseId:m.releaseId,cityId:'shenzhen',sloganId:'love-city'});
await fs.writeFile('public/api/v1/bootstrap.json',JSON.stringify(bootstrap,null,2)+'\n');
await fs.mkdir('evidence/v7.1.13',{recursive:true});
const report={releaseId:m.releaseId,manifest,addedLabels:records.length,addedBytes,sharedAdditions:5,cityAdditions:23,longNameTrials:records.filter(r=>r.trial).map(r=>({id:r.id,fontSize:r.fontSize,frame:r.frame})),uvRect:ref.uvRect,dimensions:[ref.asset.width,ref.asset.height],existingAssetsReused:true};
await fs.writeFile('evidence/v7.1.13/resource-build.json',JSON.stringify(report,null,2)+'\n');console.log(report);
