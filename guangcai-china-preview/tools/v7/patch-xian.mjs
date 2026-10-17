// A new immutable release reuses every old asset except three fill masks.
// Original PNG/SVG, outline R, normal HFN and v7-1 stay byte-identical.
import fs from 'node:fs/promises';import path from 'node:path';import {createHash} from 'node:crypto';import sharp from 'sharp';import assert from 'node:assert/strict';
const hash=b=>createHash('sha256').update(b).digest('hex'),oldRoot='public/releases/v7-1',root='public/releases/v7-2';
const oldCatalog=JSON.parse(await fs.readFile(oldRoot+'/catalog.json')),old=JSON.parse(await fs.readFile(oldRoot+'/'+oldCatalog.manifestUrl));
const correction=await fs.readFile('assets/masters/v7/xian-fill-correction.svg'),source=await fs.readFile('public/cities/v6/xian-structure.webp');
assert.equal(hash(source),'f40d9db47adcf17ae97bccb97c30eac0e851feb61bdee2c7184021383fcd3886');
const group=correction.toString().match(/<g id="fill-corrections"[\s\S]*<\/g>/)[0];
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="4096" height="1783" viewBox="0 0 5433 2365"><g transform="translate(255.351 425.7) scale(.82)"><g transform="translate(0 82.00670448684878) scale(1.4009798865394534)">${group}</g></g></svg>`;
const coverage=await sharp(Buffer.from(svg)).ensureAlpha().raw().toBuffer(),original=await sharp(source).removeAlpha().raw().toBuffer({resolveWithObject:true}),data=Buffer.from(original.data);let changed=0;
for(let i=0;i<4096*1783;i++){const j=i*original.info.channels+1,n=Math.max(data[j],coverage[i*4+3]);if(n!==data[j])changed++;data[j]=n;}
assert.ok(changed>1000&&changed<100000);
const manifest=structuredClone(old);manifest.releaseId='v7-2';
function walk(value){if(value&&typeof value==='object'){if(value.url&&value.sha256)value.url='../v7-1/'+value.url;else for(const v of Object.values(value))walk(v);}}walk(manifest);
await fs.mkdir(root+'/assets',{recursive:true});
async function immutable(file,bytes){try{assert.deepEqual(await fs.readFile(file),Buffer.from(bytes),'Cannot overwrite immutable release '+file);}catch(e){if(e.code!=='ENOENT')throw e;await fs.writeFile(file,bytes);}}
const proof=[];for(const [tier,level] of Object.entries(manifest.cities.xian.levels)){
 const a=level.mask,prior=await sharp(oldRoot+'/'+old.cities.xian.levels[tier].mask.url).removeAlpha().raw().toBuffer({resolveWithObject:true}),overlay=await sharp(Buffer.from(svg)).resize(a.width,a.height).ensureAlpha().raw().toBuffer();
 const pixels=Buffer.from(prior.data);for(let i=0;i<a.width*a.height;i++)pixels[i*3+1]=Math.max(pixels[i*3+1],overlay[i*4+3]);
 const bytes=await sharp(pixels,{raw:prior.info}).webp({lossless:true}).toBuffer();
 a.sha256=hash(bytes);a.sourceSha256=hash(Buffer.concat([source,correction]));a.bytes=bytes.length;a.url=`assets/xian-${tier}-mask-${a.sha256.slice(0,16)}.webp`;
 await immutable(path.join(root,a.url),bytes);proof.push({tier,width:a.width,height:a.height,sha256:a.sha256});
}
const bytes=JSON.stringify(manifest,null,2)+'\n',name=`manifest-${hash(bytes).slice(0,16)}.json`;await immutable(root+'/'+name,bytes);
const catalog={...oldCatalog,releaseId:manifest.releaseId,manifestUrl:name,cities:Object.fromEntries(Object.entries(manifest.cities).map(([id,c])=>[id,{name:c.name,thumbnail:c.thumbnail.url}]))};await immutable(root+'/catalog.json',JSON.stringify(catalog,null,2)+'\n');
const bootstrap=JSON.parse(await fs.readFile('public/api/v1/bootstrap.json'));Object.assign(bootstrap,{releaseId:'v7-2',catalogUrl:'releases/v7-2/catalog.json',manifestUrl:'releases/v7-2/'+name});bootstrap.defaultDesign.resourceReleaseId='v7-2';await fs.writeFile('public/api/v1/bootstrap.json',JSON.stringify(bootstrap,null,2)+'\n');
await fs.mkdir('evidence/v7-corrections',{recursive:true});await fs.writeFile('evidence/v7-corrections/xian.json',JSON.stringify({sourceSha256:hash(source),correctionSha256:hash(correction),changedCoveragePixels:changed,lineChannelUnchanged:true,normalFilesUnchanged:true,releaseId:manifest.releaseId,tiers:proof},null,2)+'\n');
await sharp(data,{raw:original.info}).resize(1536).png().toFile('.codex-work/tmp/v7-sync/xian/structure-after.png');console.log({release:manifest.releaseId,changed});
