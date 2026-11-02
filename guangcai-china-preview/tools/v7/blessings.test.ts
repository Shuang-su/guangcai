import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';
import {availableSlogans,resolveSlogan} from '../../src/resources/slogans';
import {sloganLabels,cityLibrary,neighborAssets} from '../../src/resources/preload';
import {exportDesign,validateDesign} from '../../src/resources/design';
import {consumerDefaultSelection,normalizeSelection,selectTheme,SelectionController,type Theme} from '../../src/styles/city-selection';
import {slogans} from '../../src/styles/slogans';
import type {ResourceManifest} from '../../src/resources/types';
const json=(file:string)=>JSON.parse(readFileSync(file,'utf8'));
const boot=json('public/api/v1/bootstrap.json'),m:ResourceManifest=json('public/'+boot.manifestUrl);
const base=path.dirname('public/'+boot.manifestUrl),oldBase='public/releases/v7-9';
const old:ResourceManifest=json(oldBase+'/'+json(oldBase+'/catalog.json').manifestUrl);
const deferred=['urumqi','hohhot','harbin','jingdezhen','shijiazhuang'];
test('all 23 city names resolve independently, including five long-name trials',()=>{
 let supported=0;
 for(const [id,city]of Object.entries(m.cities)){
  const options=availableSlogans(m,id),label=resolveSlogan(m,id,'love-city');
  {supported++;assert.equal(options.length,12);assert.deepEqual(options[0],{id:'love-city',text:'我爱'+city.name});assert.equal(label?.asset.id,'slogan-love-'+id);assert.deepEqual(validateDesign({...boot.defaultDesign,cityId:id},m).cityId,id);}
 }
 assert.equal(supported,23);
});
test('new options retain exact wording/order and old versions expose only their original six',()=>{
 assert.deepEqual(availableSlogans(m,'shenzhen').map(s=>s.text),['我爱深圳','满城好运','快乐满杯','彩运连连','一路生花','彩气满满',...Object.values(slogans)]);
 assert.deepEqual(availableSlogans(old,'shenzhen').map(s=>s.id),Object.keys(slogans));
 assert.equal(resolveSlogan(old,'shenzhen','city-luck'),undefined);
 for(const cityId of ['unknown','__proto__','constructor'])assert.throws(()=>validateDesign({...boot.defaultDesign,cityId,sloganId:'open'},m));
});
test('selection follows love-city across eligible cities, includes long-name trials, and preserves all fixed slogans',async()=>{
 const c=new SelectionController(async()=>true,()=>{},consumerDefaultSelection);
 await c.select(selectTheme(c.current,'v6-beijing'));assert.equal(c.current.text,'love-city');
 for(const id of deferred){await c.select({variant:'v6-shenzhen-gold',text:'love-city'});await c.select(selectTheme(c.current,('v6-'+id) as Theme));assert.equal(c.current.text,'love-city');}
 for(const text of ['city-luck','happy-cup','color-luck','blooming-path','color-energy',...Object.keys(slogans)] as const){
  await c.select({text:text as any});await c.select(selectTheme(c.current,'v6-shanghai'));assert.equal(c.current.text,text);
 }
 await c.restore();assert.deepEqual(c.current,normalizeSelection(consumerDefaultSelection,{}));
});
test('schema 1 roundtrips both new love-city works and original choices without overriding saved text',()=>{
 for(const manifest of [old,m])for(const sloganId of Object.keys(manifest.slogans)){
  const d={...boot.defaultDesign,resourceReleaseId:manifest.releaseId,sloganId};
  assert.deepEqual(exportDesign({variant:'v6-shenzhen-gold',text:sloganId as any,finish:'metal',appearance:d.appearance},manifest),validateDesign(d,manifest));
 }
});
test('failed and superseded city transactions retain an internally consistent committed choice',async()=>{
 const jobs:Array<(ok:boolean)=>void>=[];
 const c=new SelectionController(()=>new Promise(resolve=>jobs.push(resolve)),()=>{},consumerDefaultSelection);
 const a=c.select({variant:'v6-beijing-gold'}),b=c.select({variant:'v6-harbin-gold',text:'ocean'});
 jobs[1](true);await b;jobs[0](true);await a;assert.equal(c.current.variant,'v6-harbin-gold');assert.equal(c.current.text,'ocean');
 const failure=c.select({variant:'v6-shenzhen-gold',text:'love-city'});jobs[2](false);assert.equal(await failure,false);assert.deepEqual(c.desired,c.current);assert.equal(c.current.text,'ocean');
});
test('current-city preload excludes unrelated love labels; neighbors include their own labels',()=>{
 const labels=sloganLabels(m,'shenzhen');assert.equal(labels.length,12);
 assert.equal(cityLibrary(m,'shenzhen').filter(a=>a.id.startsWith('slogan-love-')).length,1);
 assert.equal(sloganLabels(m).length,35,'five shared + twenty-three city + seven original masks');
 const neighbors=neighborAssets(m,'shenzhen','standard',['shenyang','shenzhen','shijiazhuang']);
 assert.ok(neighbors.some(a=>a.id==='slogan-love-shenyang'));assert.ok(!neighbors.some(a=>a.id==='slogan-love-beijing'));
 assert.ok(neighbors.some(a=>a.id==='slogan-love-shijiazhuang'));
});
test('existing artwork assets are hash-identical; new masks preserve exact crop and UV with checked source text',()=>{
 const compare=(before:any,after:any)=>{if(before&&typeof before==='object'){if(before.sha256){assert.equal(after.sha256,before.sha256);assert.equal(after.width,before.width);assert.equal(after.height,before.height);}else for(const k of Object.keys(before))compare(before[k],after[k]);}};
 compare(old.fixed,m.fixed);compare(old.cities,m.cities);compare(old.slogans,m.slogans);compare(old.mark,m.mark);
 const proof=json('assets/masters/v7.1.13/blessings.json');assert.equal(proof.records.length,28);
 for(const record of proof.records){
  const svg=readFileSync('assets/masters/v7.1.13/'+record.id+'.svg','utf8');
  assert.equal([...svg.matchAll(/data-character="([^"]+)"/g)].map(x=>x[1]).join(''),record.text);
  const label=record.id.startsWith('love-')?m.cities[record.id.slice(5)].slogans!['love-city']:m.slogans[record.id];
  assert.deepEqual(label.uvRect.slice(0,3),old.slogans.open.uvRect.slice(0,3));assert.equal(record.frame.bottom,613);assert.equal(label.asset.width,277);
  assert.equal(label.asset.height,903+Math.ceil((190-record.frame.top)*4096/1939));
  if(!record.trial)assert.deepEqual(label.uvRect,old.slogans.open.uvRect);
  assert.equal(createHash('sha256').update(readFileSync(path.resolve(base,label.asset.url))).digest('hex'),label.asset.sha256);
 }
});

test('long frames extend upward while their lower ornament and bottom pixels stay fixed',async()=>{
 const {default:sharp}=await import('sharp');
 const baseline=await sharp(path.resolve(base,m.slogans.open.asset.url)).greyscale().raw().toBuffer();
 for(const city of deferred){
  const label=m.cities[city].slogans!['love-city'];
  const pixels=await sharp(path.resolve(base,label.asset.url)).greyscale().raw().toBuffer();
  assert.deepEqual(pixels.subarray(pixels.length-110*277),baseline.subarray(baseline.length-110*277),city+' lower ornament');
  assert.equal(label.uvRect[1],m.slogans.open.uvRect[1]);
 }
});
