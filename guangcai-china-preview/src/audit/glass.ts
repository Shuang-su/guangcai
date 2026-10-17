import {createGlassScene,attachSelectionLens} from '../../vendor/glass-hq/src/dom/index';
import {getMaterialRenderer} from '../../vendor/glass-hq/src/dom/renderer';
import {materialBackend} from '../../vendor/glass-hq/src/dom/backend';
import type {MapGeometry} from '../../vendor/glass-hq/src/gpu/geometry';
import '../../vendor/glass-hq/src/styles.css';
import './glass.css';
import {WebGL2MaterialRenderer} from '../../vendor/glass-hq/src/webgl2/index';

async function lifecycle(){
 const geometry={width:64,height:40,radius:14,dpr:1};
 const results:{name:string;passed:boolean}[]=[];
 const batchRenderer=new WebGL2MaterialRenderer();await batchRenderer.warmed;
 const one=await batchRenderer.render(geometry);
 const many=await Promise.all(Array.from({length:40},()=>batchRenderer.render(geometry)));
 results.push({name:'40 queued requests cross batch limit with identical pixels',passed:many.every(p=>p.pixels.every((v,i)=>v===one.pixels[i]))});
 const pending=batchRenderer.render(geometry).then(()=>false,()=>true);batchRenderer.dispose();
 results.push({name:'dispose rejects pending requests',passed:await pending});
 results.push({name:'disposed renderer rejects new requests',passed:await batchRenderer.render(geometry).then(()=>false,()=>true)});
 const lostRenderer=new WebGL2MaterialRenderer();await lostRenderer.warmed;
 const gl=lostRenderer.canvas.getContext('webgl2')!,ext=gl.getExtension('WEBGL_lose_context');
 if(ext){const lost=new Promise<void>(resolve=>lostRenderer.canvas.addEventListener('webglcontextlost',()=>resolve(),{once:true}));ext.loseContext();await lost;results.push({name:'context loss rejects requests',passed:await lostRenderer.render(geometry).then(()=>false,()=>true)});}else results.push({name:'context-loss extension available',passed:false});
 lostRenderer.dispose();
 for(let i=0;i<3;i++){const fresh=new WebGL2MaterialRenderer();await fresh.warmed;const p=await fresh.render(geometry);results.push({name:'fresh context after disposal '+i,passed:p.pixels.every((v,j)=>v===one.pixels[j])});fresh.dispose();}
 return results;
}

document.querySelector('#app')!.innerHTML=`<div class="audit-glass-scene"><div class="audit-glass-content"><canvas width="900" height="600"></canvas></div><div class="audit-controls"><div class="audit-tabs" role="tablist" aria-label="玻璃动效"><div class="audit-indicator"></div>${['城市','颜色','祝福'].map((x,i)=>`<button role="tab" aria-selected="${i===0}">${x}</button>`).join('')}</div><div class="audit-panel"><span>Glass-HQ · ${materialBackend}</span><button id="resize">展开 / 收起</button></div></div></div><p id="result" role="status">准备材质图…</p>`;
const root=document.querySelector<HTMLElement>('.audit-glass-scene')!,content=root.querySelector<HTMLElement>('.audit-glass-content')!,panel=root.querySelector<HTMLElement>('.audit-panel')!,tabs=root.querySelector<HTMLElement>('.audit-tabs')!,indicator=root.querySelector<HTMLElement>('.audit-indicator')!;
let diagnostics:unknown,ready=false,error='';
const scene=createGlassScene(root,{onDiagnostic:d=>{diagnostics=d;}});
scene.setContent(content);scene.addSurface(panel,{material:'clear',radius:28,fluid:true});scene.addSurface(tabs,{material:'regular',radius:'capsule'});scene.addSurface(indicator,{material:'clear',radius:'capsule'});scene.addAnimator(attachSelectionLens(indicator,()=> 'full'));
const buttons=[...tabs.querySelectorAll<HTMLButtonElement>('[role=tab]')];buttons.forEach(b=>b.onclick=()=>{buttons.forEach(x=>{x.setAttribute('aria-selected',String(x===b));x.tabIndex=x===b?0:-1;});});
document.querySelector<HTMLButtonElement>('#resize')!.onclick=()=>panel.classList.toggle('expanded');
const canvas=content.querySelector('canvas')!,ctx=canvas.getContext('2d')!;let raf=0;
const draw=(now:number)=>{ctx.fillStyle='#d9e3e5';ctx.fillRect(0,0,900,600);for(let i=0;i<16;i++){ctx.fillStyle=['#678b86','#e7c7a5','#e6eded','#8d9bac'][i%4];ctx.beginPath();ctx.arc((i*83+now*.025)%1050-75,90+(i*137)%600,75,0,Math.PI*2);ctx.fill();}ctx.fillStyle='#182d32';ctx.font='48px sans-serif';ctx.fillText('实时画面 · LIVE',170,330);raf=requestAnimationFrame(draw);};raf=requestAnimationFrame(draw);
const renderer=getMaterialRenderer();renderer.then(async r=>{await r.warmed;ready=true;document.querySelector('#result')!.textContent=`${materialBackend} 已就绪`;},e=>{error=String(e);document.querySelector('#result')!.textContent=error;});
Object.assign(window,{glassAudit:{backend:materialBackend,lifecycle,status:()=>({ready,error,diagnostics}),render:async(g:MapGeometry)=>{const p=await(await renderer).render(g);return {...p,pixels:Array.from(p.pixels)};},renderMany:async(gs:MapGeometry[])=>Promise.all(gs.map(async g=>{const p=await(await renderer).render(g);return {...p,pixels:Array.from(p.pixels)};})),dispose:async()=>{cancelAnimationFrame(raf);scene.dispose();(await renderer).dispose();}}});

// Available only in the explicit audit entry, never on the consumer page.
import {rasterContract} from './raster-contract';
Object.assign(window,{rasterContract});
