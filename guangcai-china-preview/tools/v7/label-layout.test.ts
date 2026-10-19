import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs/promises';import path from 'node:path';import {createHash} from 'node:crypto';import sharp from 'sharp';
async function manifest(id:string){const root='public/releases/'+id,c=JSON.parse(await fs.readFile(root+'/catalog.json','utf8'));return {root,m:JSON.parse(await fs.readFile(root+'/'+c.manifestUrl,'utf8'))};}
test('v7-6 changes only the six label resources and preserves all reviewed artwork maps',async()=>{
 const old=await manifest('v7-5'),next=await manifest('v7-6');assert.equal(next.m.releaseId,'v7-6');
 const normalize=(v:any,root:string):any=>{if(v&&typeof v==='object'){if(v.url&&v.sha256)return {...v,url:path.resolve(root,v.url)};return Object.fromEntries(Object.entries(v).map(([k,x])=>[k,normalize(x,root)]));}return v;};
 for(const k of ['cities','fixed','mark','fixedMapping'])assert.deepEqual(normalize(next.m[k],next.root),normalize(old.m[k],old.root));
 assert.equal(Object.keys(next.m.slogans).length,6);for(const [id,label]of Object.entries(next.m.slogans) as [string,any][]){assert.notEqual(label.asset.sha256,old.m.slogans[id].asset.sha256);const bytes=await fs.readFile(path.resolve(next.root,label.asset.url));assert.equal(createHash('sha256').update(bytes).digest('hex'),label.asset.sha256);}
});
test('all city frames have canonical coordinates; Chengdu correction retains source and uses shared production glyphs',async()=>{
 const layout=JSON.parse(await fs.readFile('assets/masters/v7.1.5/layout.json','utf8'));assert.equal(layout.cities.length,23);for(const c of layout.cities)assert.deepEqual(c.frame,{left:1539,top:190,width:127,height:423});assert.deepEqual(layout.cities.filter((c:any)=>!c.textUnified).map((c:any)=>c.id),['chengdu']);
 const source=await fs.readFile('assets/masters/v7.1.5/labels/chengdu.svg'),canonical=await fs.readFile('assets/masters/v7.1.5/slogan-open.svg');assert.notDeepEqual(source,canonical);
 const [a,b]=await Promise.all([sharp(source).ensureAlpha().extractChannel('alpha').raw().toBuffer(),sharp(canonical).ensureAlpha().extractChannel('alpha').raw().toBuffer()]);assert.notDeepEqual(a,b);
});
