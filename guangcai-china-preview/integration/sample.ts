import type {DesignConfig} from '../src/resources/types';
import {appBase,config} from '../src/resources/client';
type Viewer={ready:()=>boolean;exportDesign:()=>DesignConfig;importDesign:(d:DesignConfig)=>Promise<boolean>;onDesignChange:(f:(d:DesignConfig)=>void)=>()=>void};
const $=<T extends HTMLElement>(id:string)=>document.getElementById(id) as T;
const frame=$<HTMLIFrameElement>('viewer');frame.src=appBase;
const apiBase=new URL(config.apiBase??'api/v1/',appBase);
const status=(text:string)=>{$('status').textContent=text;};
let viewer:Viewer,selected:{id:string;revision:number}|undefined,shareId='',release=()=>{};
async function api(path:string,method='GET',body?:unknown,headers:Record<string,string>={}){const response=await fetch(new URL(path,apiBase),{method,credentials:'include',headers:{'Content-Type':'application/json',...headers},body:body===undefined?undefined:JSON.stringify(body)});if(response.status===204)return null;const data=await response.json();if(!response.ok)throw Error(`${response.status}: ${data.error?.message??'请求失败'}`);return data;}
const run=(work:()=>Promise<void>)=>void work().catch(e=>status(String(e)));
async function list(){const data=await api('works');const select=$<HTMLSelectElement>('works');select.replaceChildren(new Option('请选择',''),...data.items.map((w:{title:string;id:string})=>new Option(w.title,w.id)));if(selected)select.value=selected.id;}
for(const b of document.querySelectorAll<HTMLButtonElement>('button'))b.disabled=true;
frame.onload=()=>run(async()=>{
 const until=Date.now()+60000;while(!((frame.contentWindow as unknown as {cupViewer?:Viewer})?.cupViewer?.ready())){if(Date.now()>until)throw Error('观察器启动超时');await new Promise(r=>setTimeout(r,100));}
 viewer=(frame.contentWindow as unknown as {cupViewer:Viewer}).cupViewer;release();release=viewer.onDesignChange(d=>{$('design').textContent=JSON.stringify(d,null,2);});$('design').textContent=JSON.stringify(viewer.exportDesign(),null,2);
 for(const b of document.querySelectorAll<HTMLButtonElement>('button'))b.disabled=false;
 const token=new URL(location.href).searchParams.get('share');if(token){const shared=await api('public/shares/'+encodeURIComponent(token));if(!await viewer.importDesign(shared.design))throw Error('分享作品还原失败');$<HTMLInputElement>('title').value=shared.title;status('已匿名还原分享快照，可旋转和近看。');}else status('观察器已就绪。选择演示身份后可保存作品。');
 const session=await api('session');$<HTMLSelectElement>('identity').value=session.userId??'';if(session.userId)await list();
});
$<HTMLSelectElement>('identity').onchange=()=>run(async()=>{await api('mock/session','POST',{user:$<HTMLSelectElement>('identity').value||null});selected=undefined;$<HTMLSelectElement>('works').replaceChildren(new Option('请选择',''));if($<HTMLSelectElement>('identity').value)await list();status('模拟身份已切换。');});
$('save').onclick=()=>run(async()=>{const w=await api('works','POST',{title:$<HTMLInputElement>('title').value,design:viewer.exportDesign()},{'Idempotency-Key':crypto.randomUUID()});selected=w;await list();status('作品已保存，可刷新页面后还原。');});
$('refresh').onclick=()=>run(list);
$('load').onclick=()=>run(async()=>{const w=await api('works/'+$<HTMLSelectElement>('works').value);if(!await viewer.importDesign(w.design))throw Error('作品还原失败');selected=w;$<HTMLInputElement>('title').value=w.title;status('已还原作品修订 '+w.revision);});
$('update').onclick=()=>run(async()=>{if(!selected)throw Error('先保存或还原一个作品');selected=await api('works/'+selected.id,'PUT',{revision:selected.revision,title:$<HTMLInputElement>('title').value,design:viewer.exportDesign()});await list();status('已更新作品。');});
$('share').onclick=()=>run(async()=>{if(!selected)throw Error('先保存或还原一个作品');const s=await api('works/'+selected.id+'/shares','POST',{revision:selected.revision});shareId=s.id;const a=$<HTMLAnchorElement>('share-link');a.href=new URL(s.url,location.origin).href;a.textContent=a.href;status('此链接固定到当前修订，匿名窗口可查看。');});
$('revoke').onclick=()=>run(async()=>{if(!shareId)throw Error('本页尚未创建分享');await api('shares/'+shareId,'DELETE');status('分享已撤销。');});
window.addEventListener('pagehide',()=>release());
