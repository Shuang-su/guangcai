import './style.css';
import {waitForLabPreview} from './readiness';
import {loadResources} from '../resources/client';
import {presetAppearance,type Palette} from '../styles/city-appearance';
import type {Lettering} from '../styles/city-selection';
import type {CityArtworkPack} from '../styles/city-artwork';
import type {ResourceManifest,Label,Asset} from '../resources/types';
const $=<T extends HTMLElement=HTMLElement>(id:string)=>document.getElementById(id) as T;
const city=$<HTMLSelectElement>('city'),art=$<HTMLSelectElement>('art'),label=$<HTMLSelectElement>('label'),slogan=$<HTMLSelectElement>('slogan'),palette=$<HTMLSelectElement>('palette'),view=$<HTMLSelectElement>('view'),show=$<HTMLInputElement>('show-label'),frame=$<HTMLIFrameElement>('cup');
interface Viewer{getLoadState?:()=>{phase:string;error?:unknown};ready:()=>boolean;debug:()=>{selection:{busy:boolean};quality:{upgrading:boolean};city:{pack:CityArtworkPack}};applyLabArtwork:(p:CityArtworkPack)=>Promise<boolean>;setView:(v:string,instant:boolean)=>void;setCalibration:(p:{cupYaw:number;yaw:number;pitch:number;roll:number;distance:number;fov:number;cx:number;cy:number;targetY:number})=>void;capture:()=>string;setAuto:(v:boolean)=>void}
const applyView=(v:Viewer)=>view.value==='combined'?v.setCalibration({cupYaw:0,yaw:-75,pitch:11,roll:0,distance:660,fov:22,cx:.5,cy:.49,targetY:62}):v.setView(view.value,true);
const getViewer=()=>((frame.contentWindow as unknown as {cupViewer?:Viewer})?.cupViewer);
let generation=0,applied:Record<string,unknown>|undefined;
const waitViewer=()=>waitForLabPreview(getViewer);
const json=async<T>(p:string):Promise<T>=>{const r=await fetch(p);if(!r.ok)throw Error('素材读取失败：'+r.status);return r.json();};
async function start(){
 const [current,previous,unified,experimental,reference,layout]=await Promise.all([loadResources('v7-5'),loadResources('v7-4'),loadResources('v7-6'),json<ResourceManifest['cities']>('/dev-assets/cities.json'),json<Record<string,Label&{text:string}>>('/dev-assets/reference-labels.json'),json<{cities:{id:string;slogan:string}[]}>('/label-compare/data.json')]);
 for(const [id,c]of Object.entries(unified.manifest.cities))city.add(new Option(c.name,id));city.value='shenzhen';
 for(const [id,s]of Object.entries(unified.manifest.slogans))slogan.add(new Option(s.text,id));slogan.value='open';
 const absolutize=(a:Asset):Asset=>({...a,url:new URL('/dev-assets/'+a.url,location.origin).href});
 async function update(){
  const rev=++generation;
  if(art.value==='bezier'&&!['shenzhen','beijing'].includes(city.value)){city.value='shenzhen';$('notice').textContent='已切换至深圳。贝塞尔稿目前仅提供深圳和北京；其余城市可切回现行描线、此前描线或蓝湖画板。';}
  for(const option of city.options)option.disabled=art.value==='bezier'&&!['shenzhen','beijing'].includes(option.value);
  const ref=layout.cities.find(c=>c.id===city.value)!;slogan.disabled=label.value==='reference';if(slogan.disabled)slogan.value=ref.slogan;
  const state={city:city.value,art:art.value,label:label.value,slogan:slogan.value,palette:palette.value,showLabel:show.checked};
  $('status').textContent='正在更新组合…';$('status').dataset.state='loading';$('combination').textContent=unified.manifest.cities[state.city].name+' · '+art.selectedOptions[0].text;
  try{
   const v=await waitViewer();if(rev!==generation)return;
   const appearance=presetAppearance(state.palette as Palette),base=state.art==='previous'?previous:current;
   const pack=base.cityPack({variant:'v6-'+state.city+'-gold',text:state.slogan as Lettering,finish:'metal',appearance},'standard');
   let l=state.label==='previous'?current.manifest.slogans[state.slogan]:unified.manifest.slogans[state.slogan];
   if(state.label==='reference'){const raw=reference[state.city];l={...raw,asset:absolutize(raw.asset)};}
   if(['mastergo','bezier'].includes(state.art)){
    const e=experimental[state.art+'-'+state.city];if(!e)throw Error('本城尚无该实验稿');const lev=e.levels.standard;const level={mask:absolutize(lev.mask),normal:absolutize(lev.normal)};
    pack.runtime={...level,label:l};pack.baseColor=pack.roughness=pack.metalness=pack.coverage=level.mask.url;pack.normal=level.normal.url;pack.parametric={mask:level.mask.url,appearance};
   }else pack.runtime={...pack.runtime!,label:l};
   pack.id='lab-'+state.art+'-'+state.city;pack.name=unified.manifest.cities[state.city].name+' · 开发预览';pack.label={source:l.asset.url,fixedGold:true,hidden:!state.showLabel};
   if(!await v.applyLabArtwork(pack)){if(rev!==generation)return;throw Error('组合未应用，请重试');}if(rev!==generation)return;
   applied={...state,experimental:['mastergo','bezier'].includes(state.art),rasterWidth:pack.runtime!.mask.width,labelAsset:pack.runtime!.label.asset.sha256,cityAsset:pack.runtime!.mask.sha256};
   document.documentElement.dataset.ready='true';$('details').textContent=JSON.stringify(applied,null,2);$('status').dataset.state='ready';$('status').textContent=state.label==='reference'&&state.city==='chengdu'?'已显示蓝湖原稿：成都文字较统一版下移6px。':'组合已应用 · 拖动杯身旋转，滚轮或双指缩放';
   const source=$<HTMLAnchorElement>('source-svg');source.hidden=state.art!=='bezier';if(!source.hidden)source.href='/bezier-lab/'+(state.city==='shenzhen'?'深圳':'北京')+'-独立闭合.svg';
  }catch(e){if(rev!==generation)return;$('status').dataset.state='error';$('status').textContent=String(e);document.documentElement.dataset.ready='false';}
 }
 [city,art,label,slogan,palette,show].forEach(c=>c.addEventListener('change',()=>void update()));
 view.addEventListener('change',()=>{const v=getViewer();if(v)applyView(v);});
 $('reset').addEventListener('click',()=>{city.value='shenzhen';art.value='current';label.value='unified';slogan.value='open';palette.value='gold';show.checked=true;view.value='combined';const v=getViewer();if(v)applyView(v);void update();});
 $('download').addEventListener('click',()=>{if(!applied||$('status').dataset.state!=='ready')return;const a=document.createElement('a');a.href=getViewer()!.capture();a.download=`中国杯-实验-${city.value}-${art.value}-${label.value}.png`;a.click();});
 const v=await waitViewer();v.setAuto(false);applyView(v);await waitViewer();await update();
 Object.assign(window,{artworkLab:{debug:()=>({requested:{city:city.value,art:art.value,label:label.value,slogan:slogan.value},applied,status:$('status').dataset.state})}});
}
void start().catch(e=>{$('status').dataset.state='error';$('status').textContent=String(e);});
