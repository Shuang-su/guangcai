import './ui/styles.css';
import {createScenery} from './ui/scenery';
import {activityConfig,choose,entryRoute,freshDraft,isComplete,steps,type ResultRecord} from './domain/activity';
import {loadSession,saveSession,storageWarning,localService} from './services/local';
import {createPoster,loadImage} from './media/poster';
import {bindIntro,introMarkup} from './media/intro';
import * as pages from './ui/pages';
import {icons} from './ui/graphics';
import type {CupViewer} from './viewer/cup-viewer';
const app=document.querySelector<HTMLDivElement>('#app')!;
const art=document.createElement('div');art.id='page-art';art.setAttribute('aria-hidden','true');
art.innerHTML='<div class="paper-grain"></div><div class="paper-scene home-art"></div><div class="paper-scene result-art"></div><div class="intro-night"></div><img class="ink-foreground" src="'+import.meta.env.BASE_URL+'media/v2/mountain-layer.webp" alt="">';
document.body.prepend(art);
const scenery=createScenery(art);
let session=loadSession(),result:ResultRecord|null=null,viewer:CupViewer|null=null,revision=0;
let cleanup=()=>{},posterUrl='',busy=false,route='',bootstrapped=false,changingStep=false;
const base=import.meta.env.BASE_URL;
function persist(){saveSession(session);}
function go(path:string,replace=false){if(location.hash===`#${path}`){void render();return;}if(replace){history.replaceState(null,'',`#${path}`);void render();}else location.hash=path;}
function readRoute(){return location.hash.slice(1)||entryRoute(session);}
function setPoster(){if(posterUrl)URL.revokeObjectURL(posterUrl);posterUrl=result?URL.createObjectURL(result.poster):'';}
function contextError(message:string){const host=document.querySelector<HTMLElement>('#viewer-host');viewer?.show(false);if(host)host.innerHTML=pages.errorBlock(message);}
async function mountViewer(host:HTMLElement,fixed:boolean,token:number,animate=false){
 const module=await import('./viewer/cup-viewer');if(token!==revision)return null;
 if(viewer?.unavailable){viewer.dispose();viewer=null;}
 host.innerHTML='';
 if(!viewer)viewer=new module.CupViewer(host,contextError);else viewer.mount(host);
 viewer.setPresentation(route.slice(1),document.querySelector<HTMLElement>('.options'));
 viewer.resume();
 if(fixed){await viewer.fixed(animate);if(token!==revision){if(route==='/create'||route==='/home'||route==='/intro')viewer.neutral();return null;}}
 else if(route!=='/prepare'||viewer.debug().phase!=='fixed') viewer.neutral();
 host.dataset.ready='true';return viewer;
}
async function loadOpening(token:number){
 app.innerHTML=`${pages.header('',false,true)}<main class="loading-page"><h1>为 APEC 添彩</h1><span class="spinner" role="status" aria-label="正在加载"></span><div id="loading-error"></div></main>`;
 try{
  await Promise.all(['media/v2/home-portrait.webp','media/v2/porcelain-flower.webp','media/v2/enamel-bird.webp','media/v2/enamel-butterfly.webp'].map(p=>loadImage(base+p)));
  if(token!==revision)return;
  app.innerHTML=pages.header('',false,true)+introMarkup();
  const v=await mountViewer(document.querySelector('#viewer-host')!,false,token);if(!v)return;
  cleanup=bindIntro(app,()=>{session.introSeen=true;persist();go('/create');},p=>v.setIntroProgress(p));
 }catch(e){if(token===revision){const host=document.querySelector('#loading-error')??document.querySelector('#viewer-host');if(host)host.innerHTML=pages.errorBlock((e as Error).message,'retry-intro');}}
}
function finishIntro(){session.introSeen=true;persist();go('/home');}
async function prepare(token:number){
 if(!isComplete(session.draft)){go('/create',true);return;}
 busy=true;app.innerHTML=pages.preparing();
 try{
  const v=await mountViewer(document.querySelector('#viewer-host')!,false,token);if(!v||token!==revision)return;
  v.focusPoster();await v.fixed(true);await v.settled();if(token!==revision)return;
  const cup=await v.capture(1000,1000);const poster=await createPoster(cup);if(token!==revision)return;
  result={id:`local-${crypto.randomUUID()}`,modelVersion:activityConfig.modelVersion,styleVersion:activityConfig.styleVersion,styleId:'original',demo:true,createdAt:new Date().toISOString(),posterTemplateVersion:activityConfig.posterTemplateVersion,poster,cup,publicPreference:false};
  await localService.saveResult(result);if(token!==revision)return;
  session.completed=true;persist();setPoster();go('/result',true);
 }catch(e){if(token===revision){document.querySelector('#task-text')!.textContent='作品生成失败';document.querySelector('#prepare-error')!.innerHTML=pages.errorBlock((e as Error).message,'retry-prepare');}}
 finally{busy=false;}
}
async function showResult(token:number){
 // Regenerate only a stale visual template, preserving result identity and choices.
 if(result&&result.posterTemplateVersion!==activityConfig.posterTemplateVersion){
  const previous=result;
  app.innerHTML=pages.preparing();
  try{
   const v=await mountViewer(document.querySelector('#viewer-host')!,true,token);if(!v)return;
   v.focusPoster();await v.settled();if(token!==revision)return;
   const cup=await v.capture(1000,1000),poster=await createPoster(cup);if(token!==revision)return;
   result={...previous,cup,poster,posterTemplateVersion:activityConfig.posterTemplateVersion};
   await localService.saveResult(result);setPoster();
  }catch(e){if(token===revision)app.innerHTML=pages.header()+pages.errorBlock((e as Error).message,'result');return;}
 }
 if(token!==revision)return;app.innerHTML=pages.resultPage(result,posterUrl);
 if(!result){viewer?.show(false);return;}
 const image=document.querySelector<HTMLImageElement>('.poster-image')!;
 try{
  const v=await mountViewer(document.querySelector('#viewer-host')!,true,token);if(!v)return;
  v.focusPoster();await Promise.all([v.settled(),image.decode()]);if(token!==revision)return;
  image.classList.add('ready');setTimeout(()=>{if(token===revision)viewer?.show(false);},200);
 }catch(e){image.classList.add('ready');contextError((e as Error).message);}
}
async function render(){
 const token=++revision;if(document.querySelector('dialog'))viewer?.pauseInteraction(false);document.querySelectorAll('dialog').forEach(d=>d.remove());cleanup();cleanup=()=>{};
 route=readRoute();window.scrollTo({top:0,behavior:'instant'});app.className=`route-${route.split('/')[1]||'home'}`;
 const scene=route==='/intro'?'intro':route==='/home'?'home':['/result','/view3d'].includes(route)?'result':['/create','/prepare'].includes(route)?'create':'auxiliary';
 document.body.dataset.scene=scene;scenery.setScene(scene);
 document.title=`${route==='/create'?'五次添彩':route==='/ranking'?'共彩榜单':'为 APEC 添彩'}`;
 if(!['/intro','/home','/create','/prepare','/result','/view3d'].includes(route)){viewer?.show(false);viewer?.pause();}
 switch(route){
  case '/intro':await loadOpening(token);break;
  case '/home':
   app.innerHTML=pages.landing(session);
   try{await mountViewer(document.querySelector('#viewer-host')!,false,token);}catch(e){if(token===revision)contextError((e as Error).message);}break;
  case '/create':
   app.innerHTML=pages.editor(session);
   try{const v=await mountViewer(document.querySelector('#viewer-host')!,false,token);v?.ribbons.setChapter(session.draft.step);}catch(e){if(token===revision)contextError((e as Error).message);}break;
  case '/prepare':await prepare(token);break;
  case '/result':await showResult(token);break;
  case '/view3d':
   if(!result){go('/result',true);return;}app.innerHTML=pages.result3d();
   try{await mountViewer(document.querySelector('#viewer-host')!,true,token);}catch(e){if(token===revision)contextError((e as Error).message);}break;
  case '/ranking':app.innerHTML=pages.ranking([],!!result);break;
  case '/rules':app.innerHTML=pages.rules();break;
  case '/awards/postal':app.innerHTML=pages.awardPage('postal');break;
  case '/awards/pickup':app.innerHTML=pages.awardPage('pickup');break;
  case '/address':app.innerHTML=pages.address();break;
  case '/address/done':app.innerHTML=pages.awardPage('postal',true);break;
  default:
   if(route.startsWith('/work/')){const w=await localService.getWork(route.split('/')[2]??'');if(token===revision)app.innerHTML=pages.workPage(w);}
   else app.innerHTML=pages.header()+`<main class="empty-state"><h1>为 APEC 添彩</h1><a class="primary" href="#/home">首页</a></main>`;
 }
 if(token===revision&&route!=='/intro'){const h=app.querySelector<HTMLElement>('h1');if(h){h.tabIndex=-1;h.focus({preventScroll:true});}}
}
function updatePanel(animate=false){
 const mount=document.querySelector<HTMLElement>('.panel-mount')!;
 document.querySelector('#step-title')!.textContent=steps[session.draft.step].title;
 mount.innerHTML=pages.stepPanel(session);mount.classList.remove('entering');
 viewer?.setPresentation('create',document.querySelector<HTMLElement>('.options'));
 if(animate){viewer?.ribbons.setChapter(session.draft.step);document.querySelector<HTMLElement>('#step-title')?.focus({preventScroll:true});}
}
/** Keep the glass host and texture bindings stable while only selection / controls change. */
function syncOptionState(){
 const {step,choices}=session.draft,selected=choices[steps[step].id];
 document.querySelectorAll<HTMLButtonElement>('.option').forEach((button,index)=>{
  const active=button.dataset.choice===selected;
  button.classList.toggle('selected',active);button.setAttribute('aria-checked',String(active));
  button.tabIndex=active||(!selected&&index===0)?0:-1;
 });
 const next=document.querySelector<HTMLButtonElement>('[data-action="next-step"]');
 const previous=document.querySelector<HTMLButtonElement>('[data-action="previous-step"]');
 if(next)next.disabled=changingStep||!selected;
 if(previous)previous.disabled=changingStep;
}
async function changeStep(direction:number){
 if(changingStep)return;changingStep=true;
 document.querySelector('.option-error')?.remove();
 const token=revision;
 document.querySelector<HTMLElement>('.options')!.inert=true;
 document.querySelectorAll<HTMLButtonElement>('.step-actions button').forEach(b=>b.disabled=true);
 const swap=()=>{if(token!==revision)return;session.draft.step=Math.max(0,Math.min(4,session.draft.step+direction));persist();updatePanel(true);document.querySelector<HTMLElement>('.options')!.inert=true;};
 try{
  const targetStep=Math.max(0,Math.min(4,session.draft.step+direction));
  await Promise.all(steps[targetStep].options.map(o=>loadImage(base+'media/options/'+o[0]+'.webp')));
  if(token!==revision)return;
  if(viewer&&!viewer.unavailable){viewer.resume();await viewer.ribbons.transition(swap,direction);}else swap();
 }catch{if(token===revision)document.querySelector('.step-actions')?.insertAdjacentHTML('afterend','<p class="option-error" role="alert">选项图片加载失败，请重试。</p>');}
 finally{changingStep=false;if(token===revision){document.querySelector<HTMLElement>('.options')!.inert=false;syncOptionState();}}
}
function openDialog(type:'share'|'restart'|'rules'){
 const trigger=document.activeElement as HTMLElement;
 const dialog=document.createElement('dialog');dialog.className=`dialog ${type==='rules'?'rules-dialog':''}`;
 const content=type==='rules'?pages.rulesContent():type==='share'?'<h2>分享给好友</h2><p>长按图片，保存分享海报</p><button class="primary dialog-confirm">我知道了</button>':'<h2>再创作一件</h2><div class="dialog-actions"><button class="secondary dialog-cancel">返回</button><button class="primary dialog-confirm">开始添彩</button></div>';
 dialog.innerHTML=`<button class="icon-button dialog-close" aria-label="关闭">${icons.close}</button>${content}`;
 document.body.append(dialog);
 viewer?.pauseInteraction(true);
 let closed=false;
 const close=()=>{if(closed)return;closed=true;dialog.close();dialog.remove();viewer?.pauseInteraction(false);trigger?.focus({preventScroll:true});};
 dialog.querySelector('.dialog-close')!.addEventListener('click',close);dialog.querySelector('.dialog-cancel')?.addEventListener('click',close);dialog.addEventListener('cancel',e=>{e.preventDefault();close();});
 dialog.querySelector('.dialog-confirm')?.addEventListener('click',async()=>{if(type==='restart'){session.draft=freshDraft();session.completed=false;result=null;setPoster();persist();await localService.clearResult();close();viewer?.reset();go('/create');}else close();});
 dialog.showModal();
}
app.addEventListener('click',async e=>{
 const el=(e.target as Element).closest<HTMLElement>('button,a');if(!el||el.hasAttribute('disabled'))return;
 if(el.dataset.choice&&route==='/create'&&!changingStep){
  const value=el.dataset.choice;session.draft=choose(session.draft,session.draft.step,value);persist();syncOptionState();
  const index=steps[session.draft.step].options.findIndex(o=>o[0]===value);viewer?.ribbons.select(index);
  document.querySelector<HTMLElement>(`[data-choice="${value}"]`)?.focus({preventScroll:true});return;
 }
 switch(el.dataset.action){
  case 'start':go('/create');break;
  case 'finish-intro':finishIntro();break;
  case 'replay':go('/intro');break;
  case 'retry-intro':void render();break;
  case 'rules':openDialog('rules');break;
  case 'back':
   if(route==='/view3d')go('/result');else if(route==='/prepare')go('/create');else if(route==='/address')go('/awards/postal');else if(route.startsWith('/awards')||route.startsWith('/work'))go('/ranking');else go('/home');break;
  case 'next-step':
   if(!session.draft.choices[steps[session.draft.step].id])return;
   if(changingStep)return;if(session.draft.step<4){await changeStep(1);}else go('/prepare');break;
  case 'previous-step':await changeStep(-1);break;
  case 'view3d':go('/view3d');break;
  case 'result':go('/result');break;
  case 'share':openDialog('share');break;
  case 'restart':openDialog('restart');break;
  case 'zoom-in':viewer?.zoom(.85);break;
  case 'zoom-out':viewer?.zoom(1.15);break;
  case 'reset-view':viewer?.reset();break;
  case 'retry-viewer':viewer?.dispose();viewer=null;void render();break;
  case 'retry-prepare':void render();break;
 }
});
app.addEventListener('keydown',e=>{
 const target=(e.target as Element).closest<HTMLElement>('[role="radio"]');
 if(!target||changingStep||route!=='/create'||!['ArrowRight','ArrowLeft','ArrowUp','ArrowDown','Home','End'].includes(e.key))return;
 e.preventDefault();const options=steps[session.draft.step].options,current=options.findIndex(o=>o[0]===target.dataset.choice);
 const shift=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:e.key==='ArrowDown'?2:-2;
 const next=e.key==='Home'?0:e.key==='End'?3:(current+shift+4)%4;
 session.draft=choose(session.draft,session.draft.step,options[next][0]);persist();syncOptionState();viewer?.ribbons.select(next);document.querySelector<HTMLElement>(`[data-choice="${options[next][0]}"]`)?.focus();
});
window.addEventListener('hashchange',()=>{if(bootstrapped)void render();});
document.addEventListener('visibilitychange',()=>{if(document.hidden)viewer?.pause();else viewer?.resume();});
window.addEventListener('pagehide',()=>viewer?.pause());
Object.assign(window,{h5Debug:()=>({route,session:structuredClone(session),result:result?{id:result.id,modelVersion:result.modelVersion,styleVersion:result.styleVersion,posterTemplateVersion:result.posterTemplateVersion,demo:result.demo,posterBytes:result.poster.size}:null,viewer:viewer?.debug(),gsEnabled:false,busy,storageWarning})});
async function boot(){
 result=await localService.getResult();
 if(result&&(!(result.poster instanceof Blob)||result.styleVersion!==activityConfig.styleVersion||result.modelVersion!==activityConfig.modelVersion))result=null;
 if(session.completed&&!result){session.completed=false;persist();}
 setPoster();bootstrapped=true;if(!location.hash)history.replaceState(null,'',`#${entryRoute(session)}`);await render();
}
void boot();
if(import.meta.hot)import.meta.hot.dispose(()=>{cleanup();viewer?.dispose();art.remove();if(posterUrl)URL.revokeObjectURL(posterUrl);});
