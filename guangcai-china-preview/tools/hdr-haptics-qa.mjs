import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
const out=process.env.QA_OUT??'../.codex-work/tmp/hdr-haptics/qa';await mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true}),checks=[],errors=[],evidence={};
const check=(name,value)=>{assert.ok(value,name);checks.push(name);console.log('PASS',name);};
async function open(mode,mobile=false){
 const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1200,height:900},isMobile:mobile,hasTouch:mobile});
 await context.addInitScript(mode=>{
  window._hapticCalls=[];window._hdrSamples=[];window._hdrDevices=[];window._adapterRequests=0;window._gpuFailures=[];window._hdrReadbackBudget=8;
  Object.defineProperty(navigator,'vibrate',{configurable:true,value:duration=>{window._hapticCalls.push({duration,time:performance.now()});return true;}});
  const media=window.matchMedia.bind(window);window.matchMedia=query=>{const m=media(query);if(query==='(dynamic-range: high)')Object.defineProperty(m,'matches',{get:()=>mode!=='sdr'});return m;};
  if(mode==='no-gpu')Object.defineProperty(navigator,'gpu',{value:undefined});
  if(navigator.gpu){
   const create=GPUDevice.prototype.createRenderPipelineAsync;GPUDevice.prototype.createRenderPipelineAsync=function(desc){return create.call(this,desc).catch(error=>{window._gpuFailures.push(String(error));throw error;});};
   const request=navigator.gpu.requestAdapter.bind(navigator.gpu);navigator.gpu.requestAdapter=(...args)=>{window._adapterRequests++;return request(...args);};
   const configure=GPUCanvasContext.prototype.configure,getTexture=GPUCanvasContext.prototype.getCurrentTexture,submit=GPUQueue.prototype.submit,writeBuffer=GPUQueue.prototype.writeBuffer;let target=null,linearGain=1;GPUQueue.prototype.writeBuffer=function(buffer,offset,data,...rest){if(data instanceof Float32Array&&data.length===4)linearGain=data[0];return writeBuffer.call(this,buffer,offset,data,...rest);};
   GPUCanvasContext.prototype.configure=function(config){
    if(this.canvas.className.startsWith('xy-hdr')){
     const copy={...config};if(mode==='ignored')delete copy.toneMapping;
     if(mode==='hdr')copy.usage=GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC;
     this._qaDevice=copy.device;if(!window._hdrDevices.includes(copy.device))window._hdrDevices.push(copy.device);
     return configure.call(this,copy);
    }return configure.call(this,config);
   };
   GPUCanvasContext.prototype.getCurrentTexture=function(){const texture=getTexture.call(this);if(mode==='hdr'&&this.canvas.className.startsWith('xy-hdr'))target={texture,canvas:this.canvas,device:this._qaDevice};return texture;};
   GPUQueue.prototype.submit=function(commands){
    const current=target;target=null;
    if(!current||window._hdrReadbackBudget<=0)return submit.call(this,commands);window._hdrReadbackBudget--;const gain=linearGain;
    const {texture,canvas,device}=current,buffer=device.createBuffer({size:256,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});
    const encoder=device.createCommandEncoder(),x=Math.floor(canvas.width/2),y=canvas.classList.contains('xy-hdr-field')?Math.round(18*canvas.width/canvas.parentElement.clientWidth):Math.floor(canvas.height/2);
    const raw=canvas.classList.contains('xy-hdr-field')?[...canvas.parentElement.querySelector('.xy-background').getContext('2d').getImageData(x,y,1,1).data].slice(0,3).map(v=>v/255):[1,1,1];
    encoder.copyTextureToBuffer({texture,origin:[x,y]},{buffer,bytesPerRow:256},[1,1]);
    const result=submit.call(this,[...commands,encoder.finish()]);
    buffer.mapAsync(GPUMapMode.READ).then(()=>{
     const half=n=>{const sign=n&0x8000?-1:1,e=(n>>10)&31,m=n&1023;return sign*(e?2**(e-15)*(1+m/1024):2**(-14)*m/1024);};
     window._hdrSamples.push({surface:canvas.className,gain,raw,rgba:[...new Uint16Array(buffer.getMappedRange().slice(0,8))].map(half)});buffer.unmap();buffer.destroy();
    });return result;
   };
  }
 },mode);
 const page=await context.newPage();page.on('pageerror',e=>errors.push(mode+': '+e.message));page.on('console',m=>{if(m.type()==='error')errors.push(mode+': '+m.text());});
 await page.goto(process.env.QA_URL??'http://127.0.0.1:5236/');await page.waitForFunction(()=>window.cupViewer?.ready(),null,{timeout:180000});
 await page.locator('#open-artwork').click();await page.locator('.city-selector summary').click();await page.locator('[data-theme="beijing"]').click();await page.waitForFunction(()=>!window.cupViewer.debug().selection.busy);await page.locator('[data-variant="beijing-green"]').click();await page.waitForFunction(()=>!window.cupViewer.debug().selection.busy);
 return {page,context};
}
async function press(page){const pad=page.locator('#color-pad');await pad.scrollIntoViewIfNeeded();await page.waitForTimeout(400);const b=await pad.boundingBox();await page.mouse.move(b.x+b.width*.7,b.y+b.height*.3);await page.mouse.down();}
try{
 {
  const {page,context}=await open('sdr');await press(page);await page.waitForTimeout(300);
  check('SDR display uses existing controls without requesting a second GPU device',await page.evaluate(()=>window._adapterRequests===0)&&await page.locator('#color-pad .xy-hdr-field').getAttribute('data-hdr-state')==='sdr-display');
  check('mouse input does not request mobile haptics',await page.evaluate(()=>window._hapticCalls.length===0));await page.mouse.up();await page.screenshot({path:out+'/sdr-fallback.png'});await context.close();
 }
 {
  const {page,context}=await open('hdr');await page.locator('#fill-lightness').press('End');await page.waitForTimeout(450);await press(page);
  await page.waitForFunction(()=>[...document.querySelectorAll('#color-pad [data-hdr-state]')].every(c=>['ready','unavailable'].includes(c.dataset.hdrState)),null,{timeout:15000});evidence.initialization=await page.evaluate(()=>({states:[...document.querySelectorAll('#color-pad [data-hdr-state]')].map(e=>({...e.dataset})),failures:window._gpuFailures}));console.log('HDR initialization',JSON.stringify(evidence.initialization));check('HDR initialization succeeds',evidence.initialization.states.every(s=>s.hdrState==='ready'));
  await page.waitForFunction(()=>window._hdrSamples.length>=4);const samples=await page.evaluate(()=>window._hdrSamples);evidence.gpuSamples=samples;
  check('actual GPU uses rgba16float extended canvases',await page.locator('#color-pad .xy-hdr-field').getAttribute('data-hdr-format')==='rgba16float/extended');
  check('selector float output exceeds SDR white',samples.some(s=>s.surface==='xy-hdr-selector'&&s.rgba[0]>1.2));
  check('colour-field float highlights retain values above one',samples.some(s=>s.surface==='xy-hdr-field'&&Math.max(...s.rgba.slice(0,3))>1.2));
  const decode=c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4;check('HDR preserves channel ratios by applying exposure in linear light',samples.every(s=>s.raw.every((c,i)=>Math.abs(decode(s.rgba[i])-decode(c)*s.gain)<.008)));
  check('both HDR surfaces share one GPU device',await page.evaluate(()=>window._hdrDevices.length===1));
  const uploads=await page.locator('#color-pad .xy-hdr-field').getAttribute('data-hdr-uploads'),memory=await page.evaluate(()=>window.cupViewer.debug().memory);
  for(let i=0;i<20;i++){const b=await page.locator('#color-pad').boundingBox();await page.mouse.move(b.x+b.width*(.25+i*.02),b.y+b.height*.65);}
  check('drag reuses HDR source texture and existing 3D programs',uploads===await page.locator('#color-pad .xy-hdr-field').getAttribute('data-hdr-uploads')&&JSON.stringify(memory)===JSON.stringify(await page.evaluate(()=>window.cupViewer.debug().memory)));
  await page.screenshot({path:out+'/extended-output-configured.png'});await page.mouse.up();await page.waitForTimeout(800);
  check('HDR surfaces hide after the existing short release animation',await page.locator('#color-pad .xy-hdr-field').isVisible()===false&&await page.locator('#color-pad .xy-hdr-selector').isVisible()===false);
  await page.locator('#fill-lightness').press('Home');await page.waitForTimeout(450);await page.evaluate(()=>{window._hdrSamples=[];window._hdrReadbackBudget=8;});await press(page);await page.waitForFunction(()=>window._hdrSamples.length>=4);const low=await page.evaluate(()=>window._hdrSamples);evidence.lowLightSamples=low;check('low lightness retains the same linear-light colour response',low.every(s=>s.raw.every((c,i)=>Math.abs(decode(s.rgba[i])-decode(c)*s.gain)<.008)));await page.screenshot({path:out+'/hdr-low-lightness.png'});await page.evaluate(()=>window._hdrDevices[0].destroy());await page.waitForFunction(()=>document.querySelector('#color-pad .xy-hdr-field').dataset.hdrState==='unavailable');
  check('GPU loss returns to visible SDR controls without losing input',await page.locator('#color-pad .xy-background').isVisible()&&!await page.locator('#color-pad .xy-hdr-field').isVisible());await page.mouse.up();await page.locator('#color-pad').press('ArrowLeft');await context.close();
 }
 for(const mode of ['no-gpu','ignored']){
  const {page,context}=await open(mode);await press(page);await page.waitForFunction(()=>document.querySelector('#color-pad .xy-hdr-field').dataset.hdrState==='unavailable');
  check(`${mode}: unsupported HDR falls back without altering the control`,!await page.locator('#color-pad .xy-hdr-field').isVisible()&&await page.locator('#color-pad .xy-background').isVisible());await page.mouse.up();await context.close();
 }
 {
  const {page,context}=await open('sdr',true);await page.evaluate(()=>window._hapticCalls=[]);
  await page.locator('#color-pad').tap();await page.waitForTimeout(200);await page.locator('#reset-palette').tap();await page.waitForTimeout(600);await page.locator('#adjust-material-tab').tap();await page.waitForTimeout(400);
  const pulses=await page.evaluate(()=>window._hapticCalls);evidence.hapticRequests=pulses;
  check('trusted touch requests short activate/reset/tab pulses',pulses.length>=3&&pulses.every(p=>p.duration>=4&&p.duration<=16));
  check('haptic requests are rate limited across controls',pulses.every((p,i)=>!i||p.time-pulses[i-1].time>=54));
  const cdp=await context.newCDPSession(page),pad=page.locator('#material-pad');await pad.scrollIntoViewIfNeeded();const box=await pad.boundingBox();
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:box.x+box.width*.25,y:box.y+box.height*.35,id:0}]});await page.waitForTimeout(400);
  const expanded=await pad.boundingBox(),scale=await pad.evaluate(e=>e.getBoundingClientRect().width/e.clientWidth),reference=await pad.locator('.xy-reference').evaluate(e=>({x:+e.dataset.x,y:+e.dataset.y}));
  const x=expanded.x+18*scale+reference.x*(expanded.width-36*scale),y=expanded.y+18*scale+(1-reference.y)*(expanded.height-36*scale),previous=await page.evaluate(()=>window._hapticCalls.length);
  await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y,id:0}]});await page.waitForTimeout(120);
  check('entering the default material point requests one light detent',await page.evaluate(()=>window._hapticCalls.length)===previous+1&&await page.evaluate(()=>window._hapticCalls.at(-1).duration)===8);
  for(let i=1;i<=3;i++){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+i*.25,y:y-.25,id:0}]});await page.waitForTimeout(100);}
  await cdp.send('Input.dispatchTouchEvent',{type:'touchCancel',touchPoints:[]});
  check('remaining near the same detent and cancelling do not repeatedly vibrate',await page.evaluate(()=>window._hapticCalls.length)===previous+1);
  const moveBox=await pad.boundingBox();await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:moveBox.x+moveBox.width*.2,y:moveBox.y+moveBox.height*.4,id:0}]});await page.waitForTimeout(400);
  const movingBox=await pad.boundingBox(),edge=18*movingBox.width/await pad.evaluate(e=>e.clientWidth),tickStart=await page.evaluate(()=>window._hapticCalls.length);
  for(let i=0;i<6;i++){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:movingBox.x+edge+(.25+i*.1)*(movingBox.width-2*edge),y:movingBox.y+edge+.4*(movingBox.height-2*edge),id:0}]});await page.waitForTimeout(75);}
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});const movement=await page.evaluate(start=>window._hapticCalls.slice(start),tickStart);evidence.movementHaptics=movement;
  check('travelling through the point grid requests discrete light ticks',movement.filter(p=>p.duration===4).length>=3);
  evidence.hapticRequests=await page.evaluate(()=>window._hapticCalls);
  check('movement ticks retain a minimum 55ms interval',evidence.hapticRequests.every((p,i,a)=>!i||p.time-a[i-1].time>=54));
  const before=evidence.hapticRequests.length;await page.emulateMedia({reducedMotion:'reduce'});await page.locator('#material-pad').tap();await page.locator('#reset-palette').tap();
  check('reduced motion suppresses mobile vibration requests',await page.evaluate(()=>window._hapticCalls.length)===before);
  await page.emulateMedia({reducedMotion:'no-preference'});await page.locator('#reset-palette').evaluate(e=>e.click());
  check('programmatic clicks cannot trigger motor requests',await page.evaluate(()=>window._hapticCalls.length)===before);
  await page.screenshot({path:out+'/mobile-controls.png'});await context.close();
 }
 check('no application or GPU errors',errors.length===0);
}finally{
 await writeFile(out+'/qa.json',JSON.stringify({checks,errors,evidence,environment:'Installed headless Chrome; real WebGPU device and float readback. HDR display media query forced only in HDR test cases. Vibrate mocked to inspect requests.',physicalHDRDisplay:false,physicalMotor:false},null,2)+'\n');await browser.close();
}
