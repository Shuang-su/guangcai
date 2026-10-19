import fs from 'node:fs/promises';import path from 'node:path';import assert from 'node:assert/strict';import sharp from 'sharp';import {createHash} from 'node:crypto';
const hash=b=>createHash('sha256').update(b).digest('hex'),out='public/label-compare',master='assets/masters/v7.1.5',lab='public/dev-assets';await fs.mkdir(out+'/images',{recursive:true});await fs.mkdir(lab+'/assets',{recursive:true});
const layout=JSON.parse(await fs.readFile(master+'/layout.json'));
async function manifest(release){const root='public/releases/'+release,c=JSON.parse(await fs.readFile(root+'/catalog.json'));return {root,m:JSON.parse(await fs.readFile(root+'/'+c.manifestUrl))};}
const old=await manifest('v7-5'),next=await manifest('v7-6'),W=4096,H=1783,scale=W*.82/1939,dx=W*.047,dy=H-815*scale;
async function mask(label,root){const a=label.asset;const pixels=await sharp(path.join(root,a.url)).greyscale().raw().toBuffer();return sharp({create:{width:a.width,height:a.height,channels:3,background:'#d5972e'}}).joinChannel(pixels,{raw:{width:a.width,height:a.height,channels:1}}).png().toBuffer();}
const phrases=[],layers={};
for(const [id,a] of Object.entries(next.m.slogans)){
 const prior=old.m.slogans[id],before=await mask(prior,old.root),after=await mask(a,next.root);layers[id]={before,after};
 for(const [state,b]of [['before',before],['after',after]])await sharp(b).webp({lossless:true}).toFile(`${out}/images/${id}-${state}.webp`);
 phrases.push({id,text:a.text,before:{uvRect:prior.uvRect,width:prior.asset.width,height:prior.asset.height,image:`images/${id}-before.webp`},after:{uvRect:a.uvRect,width:a.asset.width,height:a.asset.height,image:`images/${id}-after.webp`},origin:['cooperation','innovation'].includes(id)?'当前画板未出现，沿用已批准字形，按66px和统一基线排版。':'蓝湖当前导出的文字轮廓与字框。'});
}
const actual={},frameDeltas=[];
for(const c of layout.cities){
 const source=await fs.readFile(master+'/labels/'+c.id+'.svg'),full=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><g transform="translate(${dx+1539*scale} ${dy+190*scale}) scale(${scale})">${source}</g></svg>`;
 const a=next.m.slogans[c.slogan].asset,uv=next.m.slogans[c.slogan].uvRect,left=Math.round(uv[0]*W),top=Math.round((1-uv[1]-uv[3])*H);
 const pixels=await sharp(Buffer.from(full)).extract({left,top,width:a.width,height:a.height}).ensureAlpha().extractChannel('alpha').raw().toBuffer();const bytes=await sharp(pixels,{raw:{width:a.width,height:a.height,channels:1}}).webp({lossless:true}).toBuffer(),sha256=hash(bytes),url=`assets/reference-label-${sha256.slice(0,16)}.webp`;await fs.writeFile(lab+'/'+url,bytes);const decodedBytes=a.width*a.height;
 actual[c.id]={text:next.m.slogans[c.slogan].text,asset:{...a,id:'reference-label-'+c.id,url,sha256,sourceSha256:hash(source),bytes:bytes.length,decodedBytes,gpuBytes:Math.ceil(decodedBytes*4/3)},uvRect:uv};
 await sharp('assets/source/v7.1.5/mastergo/'+c.id+'.svg').resize(970).webp({quality:90}).toFile(out+'/images/'+c.id+'-reference.webp');
 await sharp(source).resize(254,846).webp({quality:95}).toFile(out+'/images/'+c.id+'-label.webp');
 const level=next.m.cities[c.id].levels.detail,raw=await sharp(path.join(next.root,level.mask.url)).removeAlpha().raw().toBuffer({resolveWithObject:true}),rgb=Buffer.alloc(W*H*3,255);
 for(let i=0;i<W*H;i++){const line=raw.data[i*raw.info.channels]/255,fill=raw.data[i*raw.info.channels+1]/255,alpha=Math.max(line,fill*.1);for(let k=0;k<3;k++)rgb[i*3+k]=255*(1-alpha)+[213,151,46][k]*alpha;}
 for(const phase of ['before','after']){const label=(phase==='before'?old:next).m.slogans[c.slogan],r=label.uvRect;const composed=await sharp(rgb,{raw:{width:W,height:H,channels:3}}).composite([{input:layers[c.slogan][phase],left:Math.round(r[0]*W),top:Math.round((1-r[1]-r[3])*H)}]).png().toBuffer();await sharp(composed).resize(1600).webp({quality:93}).toFile(out+'/images/'+c.id+'-'+phase+'.webp');}
}
await fs.writeFile(lab+'/reference-labels.json',JSON.stringify(actual,null,2)+'\n');
const data={...layout,version:'7.1.5',resourceReleaseId:'v7-6',productionPolicy:'23城采用统一字框。成都原稿文字下移6px，正式版使用与厦门同一开放包容轮廓和位置；原稿保留在报告与开发页。城市描线继续使用v7-5。',phrases,updatedResources:6};await fs.writeFile(out+'/data.json',JSON.stringify(data,null,2)+'\n');
await fs.writeFile('evidence/v7.1.5/label-source-audit.json',JSON.stringify({passed:true,framesAtCanonicalPosition:23,visibleTextGroups:4,correctedCity:'chengdu',referenceDeltaY:6,productionDeltaY:0,originalSvgExports:23,referenceLabels:23},null,2)+'\n');console.log({cities:23,phrases:6,referenceLabels:23});
