import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {EncodedCache} from '../../src/resources/encoded-cache';
import {cityLibrary,neighborAssets} from '../../src/resources/preload';
import type {Asset} from '../../src/resources/types';
const data=new Uint8Array([1,2,3,4]).buffer;
const asset=(id:string):Asset=>({id,url:id,bytes:4,sha256:createHash('sha256').update(new Uint8Array(data)).digest('hex'),sourceSha256:'',encoding:'webp',width:1,height:1,decodedBytes:4,gpuBytes:4,channels:4,colorSpace:'linear'});
const tick=()=>new Promise(r=>setTimeout(r,0));
test('file cache shares pending transfers; cancelling one consumer retains the other',async()=>{
 let finish!:(b:ArrayBuffer)=>void,requests=0,fetchSignal!:AbortSignal;
 const cache=new EncodedCache(8,async(_,signal)=>{requests++;fetchSignal=signal;return new Promise(r=>finish=r);});
 const one=new AbortController(),a=cache.acquire(asset('a'),one.signal),b=cache.acquire(asset('a'));
 const rejected=assert.rejects(a,{name:'AbortError'});await tick();one.abort();await rejected;assert.equal(fetchSignal.aborted,false);finish(data);
 const lease=await b;assert.equal(requests,1);assert.equal(lease.bytes,data);lease.release();assert.equal(cache.debug().bytes,4);cache.dispose();assert.equal(cache.debug().reservedBytes,0);
});
test('last cancellation drops reserved bytes, aborts the fetch and permits a fresh attempt',async()=>{
 let requests=0;const cache=new EncodedCache(4,async(_,signal)=>{requests++;if(requests>1)return data;return new Promise((_,reject)=>signal.addEventListener('abort',()=>reject(new DOMException('cancelled','AbortError'))));});
 const controller=new AbortController(),job=cache.acquire(asset('a'),controller.signal),rejected=assert.rejects(job,{name:'AbortError'});await tick();controller.abort();await rejected;assert.equal(cache.debug().reservedBytes,0);
 const lease=await cache.acquire(asset('a'));lease.release();assert.equal(requests,2);assert.equal(cache.debug().bytes,4);cache.dispose();
});
test('pinned low library survives LRU eviction and active leases prevent unsafe eviction',async()=>{
 const cache=new EncodedCache(12,async()=>data),a=asset('a'),b=asset('b'),c=asset('c'),d=asset('d');cache.pin([a]);
 await cache.prefetch([a,b,c]);await tick();const lease=await cache.acquire(b);await cache.prefetch([d]);assert.equal(cache.has(a),true);assert.equal(cache.has(b),true);assert.equal(cache.has(c),false);assert.equal(cache.has(d),true);assert.equal(cache.debug().peakBytes,12);
 cache.pin([a,d]);await assert.rejects(cache.acquire(c),/budget/);lease.release();await cache.prefetch([c]);assert.equal(cache.has(b),false);assert.throws(()=>cache.pin([a,b,c,d]),/budget/);cache.dispose();
});
test('wrong size and checksum never poison cache, and inflight reservations obey the limit',async()=>{
 let wrong=true;const cache=new EncodedCache(4,async()=>wrong?new Uint8Array(3).buffer:data),a=asset('a');await assert.rejects(cache.acquire(a),/size/);assert.equal(cache.debug().reservedBytes,0);wrong=false;
 await assert.rejects(cache.acquire({...a,sha256:'bad'}),/checksum/);assert.equal(cache.debug().entries,0);
 const held=await cache.acquire(a);await assert.rejects(cache.acquire(asset('b')),/budget/);held.release();cache.dispose();
});
test('manifest preload includes all low masks, normals, thumbnails and cropped slogans; nearby order wraps',()=>{
 const boot=JSON.parse(readFileSync('public/api/v1/bootstrap.json','utf8')),manifest=JSON.parse(readFileSync('public/'+boot.manifestUrl,'utf8'));
 const library=cityLibrary(manifest);assert.equal(Object.keys(manifest.cities).length,23);assert.equal(library.length,75);assert.equal(library.reduce((n,a)=>n+a.bytes,0),6379559);
 const order=Object.keys(JSON.parse(readFileSync('src/styles/city-catalog-v6.json','utf8')).cities);
 const neighbors=neighborAssets(manifest,order[0],'standard',order);assert.deepEqual(neighbors.map(a=>a.id),[order[0],order.at(-1),order[1]].flatMap(id=>[`${id}-standard-mask`,`${id}-standard-normal`]));
 assert.equal(new Set(neighbors.map(a=>a.url)).size,6);assert.ok(library.filter(a=>a.id.startsWith('slogan')).every(a=>a.encoding==='webp'&&a.channels===1));
});
