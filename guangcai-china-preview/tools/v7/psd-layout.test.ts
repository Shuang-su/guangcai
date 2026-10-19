import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs/promises';import path from 'node:path';import sharp from 'sharp';
import {sloganLabels,cityLibrary} from '../../src/resources/preload';
import type {ResourceManifest} from '../../src/resources/types';
const root='public/releases/v7-7';
async function manifest(){const c=JSON.parse(await fs.readFile(root+'/catalog.json','utf8'));return JSON.parse(await fs.readFile(root+'/'+c.manifestUrl,'utf8')) as ResourceManifest;}
test('PSD calibration keeps both axes equal, the complete canvas, full width and common bottom',async()=>{
 const p=JSON.parse(await fs.readFile('assets/masters/v7.1.7/mapping.json','utf8'));
 assert.deepEqual(p.psdBounds,[777,2243,6210,4608]);assert.deepEqual(p.psdFrame,[5433,2365]);assert.deepEqual(p.runtime,[4096,1783]);
 const scale=4096/1939;assert.equal(p.scale,scale);assert.deepEqual(p.offset,[0,1783-815*scale]);assert.ok(Math.abs((815*scale)/(1939*scale)-815/1939)<1e-12);assert.ok(p.topGapFraction>0.0344&&p.topGapFraction<0.0345);
 const build=JSON.parse(await fs.readFile('evidence/v7.1.7/city-derivation.json','utf8'));assert.equal(build.cities.length,25);for(const c of build.cities){assert.equal(c.uniformScale,scale/2);assert.deepEqual(c.offset,p.offset);assert.equal(c.perCityTranslation,false);}
});
test('new full-source city resources differ from the old mapping while fixed florals stay identical',async()=>{
 const m=await manifest(),c=JSON.parse(await fs.readFile('public/releases/v7-6/catalog.json','utf8')),old=JSON.parse(await fs.readFile('public/releases/v7-6/'+c.manifestUrl,'utf8'));
 const normalize=(v:any,base:string):any=>v&&typeof v==='object'?v.url&&v.sha256?{...v,url:path.resolve(base,v.url)}:Object.fromEntries(Object.entries(v).map(([k,x])=>[k,normalize(x,base)])):v;
 assert.deepEqual(normalize(m.fixed,root),normalize(old.fixed,'public/releases/v7-6'));assert.equal(m.mark.sha256,old.mark.sha256);
 for(const [id,city]of Object.entries(m.cities))for(const t of ['light','standard','detail'] as const)assert.notEqual(city.levels[t].mask.sha256,old.cities[id].levels[t].mask.sha256,id+' '+t);
 assert.equal(Object.keys(m.cities).length,23);assert.equal(Object.keys(m.slogans).length,6);assert.equal(sloganLabels(m).length,7);assert.equal(cityLibrary(m).length,76);
});
test('Chengdu original lettering is preserved and preloaded with its actual placement',async()=>{
 const m=await manifest(),override=m.cities.chengdu.slogans!.open;assert.ok(override);assert.notEqual(override.asset.sha256,m.slogans.open.asset.sha256);assert.ok(cityLibrary(m).some(a=>a.sha256===override.asset.sha256));
 const a=await sharp(path.resolve(root,override.asset.url)).raw().toBuffer(),b=await sharp(path.resolve(root,m.slogans.open.asset.url)).raw().toBuffer();assert.notDeepEqual(a,b);
});
