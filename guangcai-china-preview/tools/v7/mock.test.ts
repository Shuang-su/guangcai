import test from 'node:test';import assert from 'node:assert/strict';import {once} from 'node:events';
import {createMockServer} from './mock-server';
test('mock preserves ownership, idempotency, revisions, immutable public snapshots and revocation',async()=>{
 const server=await createMockServer();server.listen(0,'127.0.0.1');await once(server,'listening');const base=`http://127.0.0.1:${(server.address() as {port:number}).port}/api/v1/`;
 const request=async(path:string,method='GET',body?:unknown,user='alice',headers={})=>{const r=await fetch(base+path,{method,headers:{'Content-Type':'application/json',...(user?{Cookie:'mock-user='+user}:{}),...headers},body:body===undefined?undefined:JSON.stringify(body)});return {status:r.status,body:r.status===204?null:await r.json()};};
 try{
 const boot=await request('bootstrap'),design=boot.body.defaultDesign;
 assert.equal((await request('works','POST',{title:'Example',design},'')).status,401);
 const legacy=await request('works','POST',{title:'Pinned legacy',design:{...design,resourceReleaseId:'v7-1'}});assert.equal(legacy.status,201);assert.equal(legacy.body.design.resourceReleaseId,'v7-1');
 const current=await request('works','POST',{title:'Pinned current',design:{...design,resourceReleaseId:'v7-9'}});assert.equal(current.status,201);assert.equal(current.body.design.resourceReleaseId,'v7-9');
 const first=await request('works','POST',{title:'Example',design},'alice',{'Idempotency-Key':'test'});assert.equal(first.status,201);const id=first.body.id;
 assert.equal((await request('works','POST',{title:'Example',design},'alice',{'Idempotency-Key':'test'})).body.id,id);
 assert.equal((await request('works','POST',{title:'Other',design},'alice',{'Idempotency-Key':'test'})).status,409);
 assert.equal((await request('works/'+id,'GET',undefined,'bob')).status,404);assert.equal((await request('works','GET',undefined,'bob')).body.items.length,0);
 const share=await request('works/'+id+'/shares','POST',{revision:1});assert.equal(share.status,201);
 const revised={...design,cityId:'beijing'};assert.equal((await request('works/'+id,'PUT',{title:'Changed',revision:1,design:revised})).status,200);
 assert.equal((await request('works/'+id,'PUT',{title:'Changed',revision:1,design:revised})).status,409);
 const publicRead=await request('public/shares/'+share.body.token,'GET',undefined,'');assert.equal(publicRead.status,200);assert.equal(publicRead.body.design.cityId,'shenzhen');assert.ok(!JSON.stringify(publicRead.body).includes('alice'));
 assert.equal((await request('shares/'+share.body.id,'DELETE')).status,204);assert.equal((await request('public/shares/'+share.body.token,'GET',undefined,'')).status,410);
 assert.equal((await request('works','POST',{title:'Invalid',design:{...design,resourceReleaseId:'missing'}})).status,400);
 assert.equal((await request('works/'+id,'DELETE')).status,204);assert.equal((await request('works/'+id)).status,404);
 }finally{server.closeAllConnections();await new Promise<void>(r=>server.close(()=>r()));}
});

test('split-origin mock permits only configured credentialed API clients',async()=>{
 const origin='http://127.0.0.1:5277',server=await createMockServer(undefined,'/cup/',{allowedOrigins:[origin],runtimeConfig:{apiBase:'http://127.0.0.1:5278/cup/api/v1/'}});server.listen(0,'127.0.0.1');await once(server,'listening');const base=`http://127.0.0.1:${(server.address() as {port:number}).port}/cup/`;
 try{
  const preflight=await fetch(base+'api/v1/works',{method:'OPTIONS',headers:{Origin:origin,'Access-Control-Request-Method':'POST','Access-Control-Request-Headers':'content-type,idempotency-key'}});assert.equal(preflight.status,204);assert.equal(preflight.headers.get('access-control-allow-origin'),origin);assert.equal(preflight.headers.get('access-control-allow-credentials'),'true');
  const allowed=await fetch(base+'api/v1/session',{headers:{Origin:origin,Cookie:'mock-user=alice'}});assert.equal((await allowed.json()).userId,'alice');assert.equal(allowed.headers.get('vary'),'Origin');
  const rejected=await fetch(base+'api/v1/session',{headers:{Origin:'https://not-allowed.example'}});assert.equal(rejected.status,403);assert.equal(rejected.headers.get('access-control-allow-origin'),null);
  assert.equal((await fetch(base+'api/v1/works',{headers:{Origin:origin}})).status,401);
  assert.match(await fetch(base+'runtime-config.js').then(r=>r.text()),/5278/);
 }finally{server.closeAllConnections();await new Promise<void>(r=>server.close(()=>r()));}
});
