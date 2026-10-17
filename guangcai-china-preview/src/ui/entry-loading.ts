import type {Asset} from '../resources/types';
import type {ResourcePool} from '../resources/pool';
const bytes=(n:number)=>n>=1024**2?`${(n/1024**2).toFixed(2)} MiB`:`${(n/1024).toFixed(0)} KiB`;
export function createEntryLoading(pool:ResourcePool){
 const root=document.querySelector<HTMLElement>('#entry-loading'),app=document.querySelector<HTMLElement>('#app')!;
 if(!root)return;
 const text=(id:string,value:string)=>{const node=root.querySelector<HTMLElement>('#entry-'+id)!;if(node.textContent!==value)node.textContent=value;};
 const bar=root.querySelector<HTMLProgressElement>('progress')!;
 let assets:Asset[]=[],started=performance.now(),prepared=false,leaving=false,entered=false,error='',timer=0,revealTimer=0,epoch=0;
 let samples:Array<{time:number;received:number}>=[];
 const update=()=>{
  if(entered)return;const now=performance.now(),data=pool.progress(assets),memory=pool.debug();
  samples.push({time:now,received:data.received});while(samples.length>2&&samples[1].time<now-3000)samples.shift();
  const seconds=(now-samples[0].time)/1000,rate=seconds>=.4?Math.max(0,data.received-samples[0].received)/seconds:null;
  const percent=data.total?Math.min(100,Math.floor(100*data.received/data.total)):null;
  if(percent===null)bar.removeAttribute('value');else bar.value=percent;
  text('percent',percent===null?'—':`${percent}%`);text('received',bytes(data.received));text('total',data.total?bytes(data.total):'正在计算');
  text('rate',rate===null?'—':bytes(rate)+'/s');text('elapsed',`${((now-started)/1000).toFixed(1)} s`);
  text('graphics',`${((memory.estimatedGpuBytes+memory.reservedRenderTargetBytes)/1024**2).toFixed(1)} / ${(memory.steadyBudget/1024**2).toFixed(0)} MiB`);
  const heap=(performance as Performance&{memory?:{usedJSHeapSize:number}}).memory?.usedJSHeapSize;
  text('heap',typeof heap==='number'&&Number.isFinite(heap)?bytes(heap):'浏览器未提供');
  text('phase',error|| (document.hidden?'页面在后台，加载已暂停':prepared?'画面已准备好':!data.total?'正在读取资源目录':data.completed<data.count?`正在准备花纸与城市 · ${data.completed} / ${data.count}`:'正在准备背景与反射'));
 };
 const begin=()=>{epoch++;clearTimeout(revealTimer);clearInterval(timer);assets=[];samples=[];started=entered?performance.now():0;prepared=leaving=entered=false;error='';root.hidden=false;root.classList.remove('is-leaving');root.dataset.state='loading';app.inert=true;app.setAttribute('aria-hidden','true');update();timer=window.setInterval(update,200);};
 begin();
 return {begin,plan(value:Asset[]){assets=value;update();},prepared(){prepared=true;update();},fail(message:string){error=message;root.dataset.state='error';update();},
  finish(onEntered:()=>void){if(!prepared||entered||leaving||error)return;leaving=true;update();root.classList.add('is-leaving');
   // Called only after a complete scene has actually been rendered.
   const token=epoch;app.inert=false;app.removeAttribute('aria-hidden');revealTimer=window.setTimeout(()=>{if(token!==epoch)return;entered=true;root.hidden=true;root.dataset.state='entered';clearInterval(timer);onEntered();},matchMedia('(prefers-reduced-motion: reduce)').matches?0:220);
  },debug:()=>({prepared,entered,error,...pool.progress(assets)}),dispose(){epoch++;clearTimeout(revealTimer);clearInterval(timer);root.remove();}};
}
