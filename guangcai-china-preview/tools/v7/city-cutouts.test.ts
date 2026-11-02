import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs/promises';import path from 'node:path';import sharp from 'sharp';import {createHash} from 'node:crypto';
const load=async(id:string)=>{const root='public/releases/'+id,c=JSON.parse(await fs.readFile(root+'/catalog.json','utf8'));return {root,m:JSON.parse(await fs.readFile(root+'/'+c.manifestUrl,'utf8'))};};
const hash=(b:Buffer)=>createHash('sha256').update(b).digest('hex');
test('five background corrections retain all released line bytes and normal hashes at every tier',async()=>{
 const a=await load('v7-8'),b=await load('v7-9'),spec=JSON.parse(await fs.readFile('assets/masters/v7.1.11/background-cutouts.json','utf8'));
 for(const city of Object.keys(spec.cities))for(const tier of ['light','standard','detail']){const old=a.m.cities[city].levels[tier],now=b.m.cities[city].levels[tier];assert.equal(now.normal.sha256,old.normal.sha256);const before=await sharp(path.resolve(a.root,old.mask.url)).removeAlpha().raw().toBuffer(),after=await sharp(path.resolve(b.root,now.mask.url)).removeAlpha().raw().toBuffer();let count=0;for(let i=0;i<before.length;i+=3){assert.equal(after[i],before[i]);assert.equal(after[i+2],before[i+2]);assert.ok(after[i+1]>=after[i]&&after[i+1]<=before[i+1]);if(after[i+1]!==before[i+1])count++;}assert.ok(count>0,city+'/'+tier);}
});
test('explicit background seeds clear while wheel cabins, hubs, supports, building faces and skybridge retain fill',async()=>{
 const a=await load('v7-8'),b=await load('v7-9'),spec=JSON.parse(await fs.readFile('assets/masters/v7.1.11/background-cutouts.json','utf8'));
 const retained:Record<string,number[]>={chongqing:[141,61,121],nanchang:[493,564,565,906,172,943,944],beijing:[162],qingdao:[30,70,181],tianjin:[138,152,32,88]};
 // Coordinates are reviewed component interior seeds, preserved independently of generation.
 const points:Record<string,number[][]>={chongqing:[[849,1010],[994,818],[1185,1036]],nanchang:[[2127,1262],[2235,1536],[2055,1489],[2142,1573],[2340,1002],[2088,1610],[2179,1631]],beijing:[[677,1098]],qingdao:[[876,1253],[536,1115],[1053,1357]],tianjin:[[1480,1140],[1572,1476],[1479,697],[1076,894]]};
 for(const city of Object.keys(spec.cities)){const raw=async(s:any)=>sharp(path.resolve(s.root,s.m.cities[city].levels.detail.mask.url)).removeAlpha().raw().toBuffer();const before=await raw(a),after=await raw(b);for(const r of spec.cities[city].regions){const i=(r.seed[1]*4096+r.seed[0])*3;assert.ok(before[i+1]>240);assert.equal(after[i+1],after[i]);}for(const [x,y]of points[city]){const i=(y*4096+x)*3;assert.equal(after[i+1],before[i+1],city+' retained '+x+','+y);assert.ok(after[i+1]>200,city+' retained fill');}assert.ok(retained[city].length);}
});
test('formal Shenzhen and unrelated resources stay identical; supplied APEC Shenzhen exists only in dev',async()=>{
 const a=await load('v7-8'),b=await load('v7-9'),exp=JSON.parse(await fs.readFile('public/dev-assets/cities.json','utf8')),source=JSON.parse(await fs.readFile('assets/source/v7.1.11/provenance.json','utf8'));
 const digest=(v:any):any=>Array.isArray(v)?v.map(digest):v&&typeof v==='object'?Object.fromEntries(Object.entries(v).filter(([k])=>k!=='url').map(([k,a])=>[k,digest(a)])):v;
 for(const [id,c]of Object.entries(a.m.cities)){if(!['xian','chongqing','nanchang','beijing','qingdao','tianjin'].includes(id))assert.deepEqual(digest(b.m.cities[id]),digest(c));}
 assert.deepEqual(digest(a.m.slogans),digest(b.m.slogans));assert.deepEqual(digest(a.m.fixed),digest(b.m.fixed));assert.equal(b.m.fixedMapping,a.m.fixedMapping);assert.equal(Object.keys(b.m.cities).length,23);assert.ok(!b.m.cities['phase2-shenzhen']);
 assert.equal(exp['phase2-shenzhen'].scope,'dev-only');assert.notEqual(exp['phase2-shenzhen'].levels.standard.mask.sha256,b.m.cities.shenzhen.levels.standard.mask.sha256);
 for(const c of source)assert.equal(hash(await fs.readFile('assets/source/v7.1.11/'+c.file)),c.sha256);
 assert.notEqual(a.m.cities.xian.levels.detail.mask.sourceSha256,b.m.cities.xian.levels.detail.mask.sourceSha256);
});
