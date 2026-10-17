import {test} from 'node:test';
import assert from 'node:assert/strict';
import {downloadBytes} from '../src/styles/download-bytes';

const streamed=(interval:number,count:number):typeof fetch=>async(_url,options)=>{
 let tick:ReturnType<typeof setInterval>;
 const body=new ReadableStream<Uint8Array>({start(controller){let n=0;tick=setInterval(()=>{controller.enqueue(new Uint8Array([++n]));if(n===count){clearInterval(tick);controller.close();}},interval);options?.signal?.addEventListener('abort',()=>{clearInterval(tick);controller.error(new DOMException('Aborted','AbortError'));},{once:true});},cancel(){clearInterval(tick);}});
 return new Response(body);
};
test('a progressing transfer survives longer than its idle deadline',async()=>{
 const bytes=await downloadBytes(new URL('https://example.test/normal.gz'),100,streamed(25,8));
 assert.deepEqual([...new Uint8Array(bytes)],[1,2,3,4,5,6,7,8]);
});
test('a stalled transfer is aborted instead of holding startup forever',async()=>{
 await assert.rejects(downloadBytes(new URL('https://example.test/normal.gz'),30,streamed(200,1)),{name:'AbortError'});
});
test('failed HTTP status is rejected without waiting for a body',async()=>{
 await assert.rejects(downloadBytes(new URL('https://example.test/normal.gz'),30,async()=>new Response(null,{status:503})),/503/);
});
