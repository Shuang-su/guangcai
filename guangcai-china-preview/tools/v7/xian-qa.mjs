import fs from 'node:fs/promises';import sharp from 'sharp';import assert from 'node:assert/strict';
const load=async release=>{const c=JSON.parse(await fs.readFile(`public/releases/${release}/catalog.json`));return JSON.parse(await fs.readFile(`public/releases/${release}/${c.manifestUrl}`));},old=await load('v7-1'),next=await load('v7-2'),rows=[];
for(const [tier,level]of Object.entries(next.cities.xian.levels)){
 const a=level.mask,prior=old.cities.xian.levels[tier],before=await sharp('public/releases/v7-1/'+prior.mask.url).removeAlpha().raw().toBuffer({resolveWithObject:true}),after=await sharp('public/releases/v7-2/'+a.url).removeAlpha().raw().toBuffer({resolveWithObject:true});let changes=0,maxLoss=0;
 for(let i=0;i<a.width*a.height;i++){assert.equal(before.data[i*3],after.data[i*3],'Gold line channel changed');assert.equal(before.data[i*3+2],after.data[i*3+2]);if(before.data[i*3+1]!==after.data[i*3+1])changes++;maxLoss=Math.max(maxLoss,before.data[i*3+1]-after.data[i*3+1]);}assert.ok(changes>0);assert.equal(level.normal.sha256,prior.normal.sha256);
 const point=(x,y)=>{const u=(255.351+.82*1.4009798865394534*x)/5433,v=(425.7+.82*(82.00670448684878+1.4009798865394534*y))/2365;const i=(Math.round(v*a.height)*a.width+Math.round(u*a.width))*3+1;return {before:before.data[i],after:after.data[i]};};
 const faces=[point(830,1220),point(830,1340),point(950,1170),point(2200,1320),point(2370,1490)],sky=[point(1150,1050),point(700,1050)];for(const p of faces){assert.ok(p.before<20);assert.ok(p.after>250);}for(const p of sky)assert.equal(p.after,p.before);
 rows.push({tier,changes,maxLoss,faces,sky,linesUnchanged:true,normalUnchanged:true});
}
await fs.writeFile('evidence/v7-corrections/xian-qa.json',JSON.stringify({passed:true,rows},null,2)+'\n');console.log(JSON.stringify(rows));
