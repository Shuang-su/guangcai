import fs from 'node:fs/promises';import path from 'node:path';import assert from 'node:assert/strict';import {createHash} from 'node:crypto';import {execFileSync} from 'node:child_process';import sharp from 'sharp';
const sha=b=>createHash('sha256').update(b).digest('hex');
const load=async id=>{const root=`public/releases/${id}`,c=JSON.parse(await fs.readFile(root+'/catalog.json'));return {root,m:JSON.parse(await fs.readFile(root+'/'+c.manifestUrl))};};
const old=await load('v7-2'),next=await load('v7-3'),review=JSON.parse(await fs.readFile('evidence/v7.1.2/cities/review.json')),rows=[];
const protectedFiles=execFileSync('git',['ls-tree','-r','--name-only','43ce3eb68ca2b0aba07b28443d979dc688ea1166','--','public/releases/v7-1','public/releases/v7-2','assets/source/v6','assets/masters/v6'],{encoding:'utf8'}).trim().split('\n').filter(Boolean);
for(const file of protectedFiles){const source=execFileSync('git',['show','43ce3eb68ca2b0aba07b28443d979dc688ea1166:guangcai-china-preview/'+file],{maxBuffer:40*1024*1024});assert.equal(sha(await fs.readFile(file)),sha(source),'Protected source changed: '+file);}
for(const [id,city] of Object.entries(next.m.cities)){
 assert.equal(city.thumbnail.sha256,old.m.cities[id].thumbnail.sha256);
 const correction=review.corrections.find(c=>c.cityId===id);
 for(const [tier,l] of Object.entries(city.levels)){
  const before=old.m.cities[id].levels[tier];assert.equal(l.normal.sha256,before.normal.sha256);assert.equal(l.normal.url,path.relative(next.root,path.resolve(old.root,before.normal.url)));
  if(!correction){assert.equal(l.mask.sha256,before.mask.sha256);continue;}
  const a=await sharp(old.root+'/'+before.mask.url).removeAlpha().raw().toBuffer({resolveWithObject:true}),b=await sharp(next.root+'/'+l.mask.url).removeAlpha().raw().toBuffer({resolveWithObject:true});assert.deepEqual(a.info,b.info);
  const overlay=await sharp(await fs.readFile(correction.correction)).resize(l.mask.width,l.mask.height).ensureAlpha().raw().toBuffer();let changes=0;
  for(let i=0;i<l.mask.width*l.mask.height;i++)for(let k=0;k<3;k++){
   const p=i*3+k;if(k!==1)assert.equal(a.data[p],b.data[p],'Outline or spare channel changed');else{assert.ok(b.data[p]>=a.data[p]);if(a.data[p]!==b.data[p]){assert.ok(overlay[i*4+3]>0,'Changed outside reviewed fill');changes++;}}
  }
  assert.ok(changes>0);rows.push({cityId:id,tier,changedPixels:changes,outlineIdentical:true,normalIdentical:true,outsideCorrectionIdentical:true});
 }
}
const source=JSON.parse(await fs.readFile('evidence/v7.1.2/slogans-source.json'));assert.equal(source.font.weight,700);assert.equal(source.font.sha256,sha(await fs.readFile(source.font.file)));assert.equal(source.slogans.length,6);
const slogans=[];
for(const [id,s] of Object.entries(next.m.slogans)){
 assert.notEqual(s.asset.sha256,old.m.slogans[id].asset.sha256);assert.equal(s.asset.channels,1);assert.equal(s.asset.colorSpace,'linear');
 const {data,info}=await sharp(next.root+'/'+s.asset.url).removeAlpha().raw().toBuffer({resolveWithObject:true});
 for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++)if(x<4||y<4||x>=info.width-4||y>=info.height-4)assert.equal(data[(y*info.width+x)*info.channels],0,'Missing 4px label guard');
 assert.equal(s.asset.sourceSha256,sha(await fs.readFile(`assets/masters/v7.1.2/slogan-${id}.svg`)));slogans.push({id,width:info.width,height:info.height,bytes:s.asset.bytes,gpuBytes:s.asset.gpuBytes});
}
const report={passed:true,protectedFileCount:protectedFiles.length,sourcePngSvgAndOldReleasesUnchanged:true,citiesReviewed:review.cities.length,changedCities:[...new Set(rows.map(r=>r.cityId))],rows,slogans,fontWeight:700,fontRuntimeBytes:0,sloganGpuBytes:slogans.reduce((n,s)=>n+s.gpuBytes,0),referenceGlyphIoU:source.slogans[0].referenceGlyphIoU,referenceFrameIoU:source.reference.frameIoU};assert.equal(review.cities.length,23);assert.equal(rows.length,6);assert.ok(report.sloganGpuBytes<2.1*1024**2);
await fs.writeFile('evidence/v7.1.2/resource-validation.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));
