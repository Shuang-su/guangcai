import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
import {TaskQueue} from '../../src/resources/queue';import {AdaptiveResolution} from '../../src/resources/quality';
import {validateDesign,exportDesign} from '../../src/resources/design';import {parseHFN,readBounded} from '../../src/resources/hfn';
const boot=JSON.parse(readFileSync('public/api/v1/bootstrap.json','utf8')),manifest=JSON.parse(readFileSync('public/'+boot.manifestUrl,'utf8'));
test('queue bounds concurrency, rejects cancelled waiters and resumes after visibility pause',async()=>{
 const q=new TaskQueue(2);let active=0,peak=0;const jobs=Array.from({length:8},()=>q.run(async()=>{active++;peak=Math.max(peak,active);await new Promise(r=>setTimeout(r,10));active--;return 1;}));await Promise.all(jobs);assert.equal(peak,2);
 q.pause(true);const c=new AbortController(),rejected=q.run(async()=>9,c.signal);c.abort();await assert.rejects(rejected,{name:'AbortError'});let ran=false;const resumed=q.run(async()=>{ran=true;});await Promise.resolve();assert.equal(ran,false);q.pause(false);await resumed;assert.equal(ran,true);
});
test('adaptive DPR responds to sustained load, excludes idle gaps and never drops below one',()=>{const q=new AdaptiveResolution(1.5,2);for(let i=0;i<60;i++)q.sample(40);assert.equal(q.ratio,1.25);for(let i=0;i<100;i++)q.sample(800);assert.equal(q.ratio,1.25);for(let i=0;i<300;i++)q.sample(40);assert.equal(q.ratio,1);for(let i=0;i<400;i++)q.sample(16);assert.equal(q.ratio,1.25);});
test('design roundtrip preserves parameters while rejecting unsupported releases and invalid numbers',()=>{const d=validateDesign(boot.defaultDesign,manifest);assert.deepEqual(exportDesign({variant:`v6-${d.cityId}-${d.appearance.preset}`,text:'open',finish:'metal',appearance:d.appearance},manifest),d);for(const patch of [{resourceReleaseId:'future'},{modelVersion:'unknown'},{cityId:'unknown'},{sloganId:'unknown'},{appearance:{...d.appearance,lightness:101}},{appearance:{...d.appearance,material:NaN}}])assert.throws(()=>validateDesign({...d,...patch},manifest));});
test('bounded decompression input rejects excess bytes and HFN headers cannot overallocate',async()=>{await assert.rejects(readBounded(new Blob([new Uint8Array(20)]).stream(),10),/byte budget/);const raw=new ArrayBuffer(24),v=new DataView(raw);v.setUint32(0,0x48464e31);v.setUint32(4,1,true);v.setUint32(8,1,true);v.setUint32(12,1,true);assert.equal(parseHFN(raw).width,1);v.setUint32(4,8192,true);assert.throws(()=>parseHFN(raw));});
test('merged ORM uses blue metalness for the bare-gold override and retains original controls',()=>{assert.match(readFileSync('src/materials/fixed-gold-ground.ts','utf8'),/metalnessMap,vMetalnessMapUv\)\.b/);const protectedFiles=JSON.parse(readFileSync('../docs/changes/20261016-short-screen-lift/protected-haptics.json','utf8'));assert.equal(Object.keys(protectedFiles).length>0,true);});

// A partially received stream must be visible before EOF, with no duplicate byte count.
test('stream progress reports actual cumulative bytes before completion',async()=>{
 let controller!:ReadableStreamDefaultController<Uint8Array>;const seen:number[]=[];
 const stream=new ReadableStream<Uint8Array>({start(c){controller=c;}});
 const result=readBounded(stream,6,n=>seen.push(n));controller.enqueue(new Uint8Array([1,2,3,4]));
 await new Promise(r=>setTimeout(r,0));assert.deepEqual(seen,[4]);
 controller.enqueue(new Uint8Array([5,6]));controller.close();assert.equal((await result).byteLength,6);assert.deepEqual(seen,[4,6]);
});
