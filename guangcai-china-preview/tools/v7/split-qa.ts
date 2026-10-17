// Browser plugin not available. Three distinct local origins, real browser CORS.
import {execFileSync} from 'node:child_process';import {once} from 'node:events';import {resolve} from 'node:path';import {mkdir,writeFile} from 'node:fs/promises';import assert from 'node:assert/strict';import {chromium} from 'playwright';import {createMockServer,type MockOptions} from './mock-server';
const out='.codex-work/tmp/v7-sync/split',root=resolve('.codex-work/deploy/v7-split');await mkdir(out,{recursive:true});
execFileSync('npm',['run','build:integration','--','--outDir',root],{env:{...process.env,APP_BASE:'/cup/'},stdio:'pipe'});
const servers:Awaited<ReturnType<typeof createMockServer>>[]=[],errors:string[]=[],checks:string[]=[];
const start=async(options:MockOptions={})=>{const s=await createMockServer(root,'/cup/',options);servers.push(s);s.listen(0,'127.0.0.1');await once(s,'listening');return `http://127.0.0.1:${(s.address() as {port:number}).port}`;};
let browser:Awaited<ReturnType<typeof chromium.launch>>|undefined;
try{
 const frontendOptions:MockOptions={runtimeConfig:{}},frontend=await start(frontendOptions),api=await start({allowedOrigins:[frontend]}),cdn=await start();
 Object.assign(frontendOptions.runtimeConfig!,{bootstrapUrl:api+'/cup/api/v1/bootstrap',apiBase:api+'/cup/api/v1/',assetBase:cdn+'/cup/'});
 browser=await chromium.launch({channel:'chrome'});const page=await browser.newPage({viewport:{width:1440,height:1000}}),origins=new Set<string>();page.on('response',r=>{if(r.ok())origins.add(new URL(r.url()).origin);});page.on('pageerror',e=>errors.push(e.message));
 await page.goto(frontend+'/cup/integration/');await page.waitForFunction(()=>!document.querySelector<HTMLButtonElement>('#save')!.disabled,null,{timeout:120000});checks.push('subpath viewer ready through cross-origin bootstrap/CDN');
 assert.ok(origins.has(api)&&origins.has(cdn));
 await page.selectOption('#identity','alice');await page.fill('#title','分域联调作品');await page.click('#save');await page.waitForFunction(()=>document.querySelector('#status')!.textContent!.includes('作品已保存'));checks.push('credentialed CORS create');
 await page.click('#share');await page.waitForFunction(()=>!!document.querySelector<HTMLAnchorElement>('#share-link')?.href);const share=await page.locator('#share-link').getAttribute('href');assert.equal(new URL(share!).origin,frontend);
 const anonymous=await browser.newPage();await anonymous.goto(share!);await anonymous.waitForFunction(()=>document.querySelector('#status')!.textContent!.includes('已匿名还原'),null,{timeout:120000});checks.push('anonymous share restores on frontend origin');
 await page.selectOption('#identity','bob');await page.click('#refresh');await page.waitForTimeout(200);assert.equal(await page.locator('#works option').count(),1);checks.push('Bob cannot list Alice works');
 await page.selectOption('#identity','alice');await page.click('#revoke');await page.waitForFunction(()=>document.querySelector('#status')!.textContent!.includes('已撤销'));await anonymous.reload();await anonymous.waitForFunction(()=>document.querySelector('#status')!.textContent!.includes('410'),null,{timeout:120000});checks.push('revoked anonymous share returns 410');
 await page.reload();await page.waitForFunction(()=>!document.querySelector<HTMLButtonElement>('#load')!.disabled,null,{timeout:120000});await page.waitForFunction(()=>document.querySelectorAll('#works option').length===2);await page.selectOption('#works',{index:1});await page.click('#load');await page.waitForFunction(()=>document.querySelector('#status')!.textContent!.includes('已还原作品修订'));checks.push('session and saved work survive frontend reload');
 assert.equal(errors.length,0);await page.screenshot({path:out+'/integration.png'});await writeFile(out+'/report.json',JSON.stringify({passed:true,frontend,api,cdn,base:'/cup/',checks,errors},null,2));console.log({passed:true,checks});
}catch(e){await writeFile(out+'/report.json',JSON.stringify({passed:false,error:String(e),checks,errors},null,2));throw e;}finally{await browser?.close();for(const s of servers){s.closeAllConnections();await new Promise<void>(r=>s.close(()=>r()));}}
