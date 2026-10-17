import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {createMockServer} from './mock-server';
import {validateDesign} from '../../src/resources/design';
import {collectBackendData} from './export-backend-data';
const app=resolve(dirname(fileURLToPath(import.meta.url)),'../..');
const read=async(p:string)=>JSON.parse(await readFile(resolve(app,p),'utf8'));
const d=await read('integration/backend-handoff/backend-config.json');
assert.deepEqual(await collectBackendData(d.sourceCommit),d,'JSON export differs from sources');
const book=await read('.codex-work/tmp/backend-handoff/xlsx-readback.json');
const sheet=(name:string)=>book.sheets.find((s:any)=>s.sheet===name);
assert.equal(sheet('城市配置').rows.length,23);assert.equal(sheet('颜色配置').rows.length,5);assert.equal(sheet('祝福语').rows.length,6);assert.equal(sheet('资源明细').rows.length,195);
for(const row of sheet('城市配置').rows){const city=d.cities.find((c:any)=>c.cityId===row[1]);assert.deepEqual(JSON.parse(row[12]),city.extension);}
for(const row of sheet('颜色配置').rows){const color=d.colors.find((c:any)=>c.preset===row[1]);assert.deepEqual(JSON.parse(row[12]),color.appearance);assert.deepEqual(JSON.parse(row[6]),color.hsl);}
// Independent HSL reference: hue sectors from integer RGB, S = delta/(255-|max+min-255|).
for(const c of d.colors){
 const [r,g,b]=c.darkRgb255,hi=Math.max(r,g,b),lo=Math.min(r,g,b),delta=hi-lo;
 const h=delta===0?0:((hi===r?(g-b)/delta:hi===g?(b-r)/delta+2:(r-g)/delta+4)*60+360)%360;
 const expected=[h,delta===0?0:100*delta/(255-Math.abs(hi+lo-255)),(hi+lo)/510*100];
 expected.forEach((n,i)=>assert(Math.abs(n-c.hsl[i])<1e-10));
}
for(const m of d.materialSamples){
 assert.equal(m.metalness,m.material);
 const rough=m.materialX===0?.75:m.materialX===1?.08:(1-m.material)*.31+m.material*72/255;
 const coat=m.materialX===0?0:m.materialX===1?1:((1-m.material)*191+m.material*26)/255;
 assert(Math.abs(m.roughness-rough)<1e-12);assert(Math.abs(m.clearcoat-coat)<1e-12);
}
const manifest=await read('public/'+d.manifestPath);
const city=JSON.parse(sheet('城市配置').rows.find((r:any)=>r[1]==='xian')[12]);
const appearance=JSON.parse(sheet('颜色配置').rows.find((r:any)=>r[1]==='blue')[12]);
const design={...book.defaultDesign,cityId:city.cityId,appearance:{...appearance,material:.5,materialX:.5,relief:1.25}};
validateDesign(design,manifest);
for(const [key,value] of [['hue',361],['saturation',-1],['lightness',101],['material',1.1],['materialX',-0.1],['relief',3]] as const)
 assert.throws(()=>validateDesign({...design,appearance:{...design.appearance,[key]:value}},manifest));
for(const lightness of [0,100])validateDesign({...design,appearance:{...design.appearance,lightness}},manifest);
assert.throws(()=>validateDesign({...design,cityId:'new-city'},manifest));
assert.throws(()=>validateDesign({...design,appearance:{...design.appearance,colorGamut:[0,1]}},manifest));
const server=await createMockServer(resolve(app,'public'));
await new Promise<void>(r=>server.listen(0,'127.0.0.1',r));
try{
 const address=server.address();assert(address&&typeof address==='object');const base=`http://127.0.0.1:${address.port}/api/v1/`;
 const session=await fetch(base+'mock/session',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({user:'alice'})});assert.equal(session.status,200);
 const cookie=session.headers.get('set-cookie')!.split(';')[0];
 const saved=await fetch(base+'works',{method:'POST',headers:{cookie,'content-type':'application/json','idempotency-key':'backend-workbook-roundtrip'},body:JSON.stringify({title:'表格导入西安开放蓝',design})});assert.equal(saved.status,201);
 const work=await saved.json();assert.deepEqual(work.design,design);
 const restored=await fetch(base+'works/'+work.id,{headers:{cookie}});assert.equal(restored.status,200);assert.deepEqual((await restored.json()).design,design);
 const bob=await fetch(base+'works/'+work.id,{headers:{cookie:'mock-user=bob'}});assert.equal(bob.status,404);
}finally{server.closeAllConnections();await new Promise<void>((resolve,reject)=>server.close(e=>e?reject(e):resolve()));}
const files=['backend-config.json','V7后台配置数据表.xlsx'];const hashes=[];
for(const name of files){const b=await readFile(resolve(app,'integration/backend-handoff',name));hashes.push({name,bytes:b.length,sha256:createHash('sha256').update(b).digest('hex')});}
const result={sourceCommit:d.sourceCommit,resourceReleaseId:d.resourceReleaseId,counts:{cities:23,colors:5,slogans:6,resources:195},xlsxReopenedExact:true,sourceAndFileHashesVerified:true,hslIndependentReference:true,materialNineSamples:true,rangeAndUnknownFieldsRejected:true,excelToMockSaveRestore:true,accountIsolation:true,files:hashes,scope:'数据与交接导出；不是新增真机或COS验收'};
await writeFile(resolve(app,'integration/backend-handoff/verification.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
