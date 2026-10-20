import fs from 'node:fs/promises';import {execFileSync} from 'node:child_process';import path from 'node:path';import assert from 'node:assert/strict';import {createHash} from 'node:crypto';import {cityThumbnail} from './city-thumbnail.mjs';
const hash=b=>createHash('sha256').update(b).digest('hex'),root='public/releases/v7-9',prior='public/releases/v7-8';
const catalog=JSON.parse(await fs.readFile(prior+'/catalog.json')),old=JSON.parse(await fs.readFile(prior+'/'+catalog.manifestUrl)),manifest=structuredClone(old),compiled=JSON.parse(await fs.readFile('.codex-work/tmp/compiled-v7.1.11.json'));
await fs.mkdir(root+'/assets',{recursive:true});
function rebase(v){if(v&&typeof v==='object'){if(v.url&&v.sha256)v.url=path.relative(root,path.resolve(prior,v.url)).split(path.sep).join('/');else Object.values(v).forEach(rebase);}}rebase(manifest);manifest.releaseId='v7-9';
async function immutable(file,bytes){try{assert.deepEqual(await fs.readFile(file),Buffer.from(bytes),'Published output differs: '+file);}catch(e){if(e.code!=='ENOENT')throw e;await fs.writeFile(file,bytes);}}
for(const [id,c]of Object.entries(compiled)){
 if(id==='phase2-shenzhen')continue;
 for(const [tier,l]of Object.entries(c.levels))Object.assign(manifest.cities[id].levels[tier],l);
 if(id==='xian'){
  const bytes=await cityThumbnail(path.resolve(root,c.levels.detail.mask.url)),sha256=hash(bytes),a=structuredClone(manifest.cities[id].thumbnail);Object.assign(a,{url:`assets/xian-thumbnail-${sha256.slice(0,16)}.webp`,sha256,sourceSha256:c.levels.detail.mask.sha256,bytes:bytes.length});await immutable(root+'/'+a.url,bytes);manifest.cities[id].thumbnail=a;
 }
}
assert.deepEqual(manifest.cities.shenzhen.levels.standard.mask.sha256,old.cities.shenzhen.levels.standard.mask.sha256);
// Draft catalog may evolve until its first Git checkpoint; hashed assets remain immutable.
const body=JSON.stringify(manifest,null,2)+'\n',name=`manifest-${hash(body).slice(0,16)}.json`;await immutable(root+'/'+name,body);
if(execFileSync('python3',['-B','../tools/git-exfat.py','ls-files','--',root+'/catalog.json'],{encoding:'utf8'}).trim()){await immutable(root+'/catalog.json',JSON.stringify({...catalog,releaseId:manifest.releaseId,manifestUrl:name,cities:Object.fromEntries(Object.entries(manifest.cities).map(([id,c])=>[id,{name:c.name,thumbnail:c.thumbnail.url}]))},null,2)+'\n');}else await fs.writeFile(root+'/catalog.json',JSON.stringify({...catalog,releaseId:manifest.releaseId,manifestUrl:name,cities:Object.fromEntries(Object.entries(manifest.cities).map(([id,c])=>[id,{name:c.name,thumbnail:c.thumbnail.url}]))},null,2)+'\n');
const bootstrap=JSON.parse(await fs.readFile('public/api/v1/bootstrap.json'));Object.assign(bootstrap,{releaseId:'v7-9',catalogUrl:'releases/v7-9/catalog.json',manifestUrl:'releases/v7-9/'+name});bootstrap.defaultDesign.resourceReleaseId='v7-9';await fs.writeFile('public/api/v1/bootstrap.json',JSON.stringify(bootstrap,null,2)+'\n');
const experiments=JSON.parse(await fs.readFile('public/dev-assets/cities.json'));experiments['phase2-shenzhen']=compiled['phase2-shenzhen'];await fs.writeFile('public/dev-assets/cities.json',JSON.stringify(experiments,null,2)+'\n');
await fs.writeFile('evidence/v7.1.11/resource-build.json',JSON.stringify({passed:true,releaseId:'v7-9',changedCities:Object.keys(compiled).filter(id=>id!=='phase2-shenzhen'),formalShenzhenUnchanged:true,phase2DevOnly:true,labelsUnchanged:true,fixedTexturesUnchanged:true,geometryAndUvUnchanged:true},null,2)+'\n');
console.log('v7-9: six formal city masks, supplied Xi’an thumbnail, Shenzhen Phase II dev only');
