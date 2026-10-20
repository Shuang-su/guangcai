import type {Asset,Bootstrap,ResourceManifest,Tier,Region,DesignConfig} from './types';
import type {Selection} from '../styles/city-selection';
import type {CityArtworkPack} from '../styles/city-artwork';
import type {StylePack} from '../styles/style-manager';
import fixedLayout from '../styles/fixed-layout.json';
import {sloganLabels} from './preload';
export {exportDesign,validateDesign} from './design';

declare global {interface Window {GUANGCAI_CONFIG?:{bootstrapUrl?:string;assetBase?:string;apiBase?:string}}}
export const appBase=new URL(import.meta.env.BASE_URL,document.baseURI).href;
export const config=window.GUANGCAI_CONFIG??{};
async function json<T>(url:string,signal?:AbortSignal){
 const controller=new AbortController(),abort=()=>controller.abort(signal?.reason),timer=setTimeout(()=>controller.abort(new DOMException('Resource catalog timed out','TimeoutError')),15000);
 signal?.addEventListener('abort',abort,{once:true});if(signal?.aborted)abort();
 try{const response=await fetch(url,{signal:controller.signal});if(!response.ok)throw Error(`资源目录读取失败 (${response.status})`);return await response.json() as T;}
 finally{clearTimeout(timer);signal?.removeEventListener('abort',abort);}
}
export async function loadResources(releaseId?:string,signal?:AbortSignal){
 let bootstrap=await json<Bootstrap>(new URL(config.bootstrapUrl??'api/v1/bootstrap.json',appBase).href,signal);
 if(releaseId&&releaseId!==bootstrap.releaseId){if(!['v7-1','v7-2','v7-3','v7-4','v7-5','v7-6','v7-7','v7-8','v7-9'].includes(releaseId))throw Error('Unsupported resource release');const catalogPath=`releases/${releaseId}/catalog.json`,catalog=await json<{manifestUrl:string}>(new URL(catalogPath,new URL(config.assetBase??appBase,appBase)).href,signal);bootstrap={...bootstrap,releaseId,catalogUrl:catalogPath,manifestUrl:`releases/${releaseId}/${catalog.manifestUrl}`,defaultDesign:{...bootstrap.defaultDesign,resourceReleaseId:releaseId}};}
 if(bootstrap.schemaVersion!==1||!['v7-1','v7-2','v7-3','v7-4','v7-5','v7-6','v7-7','v7-8','v7-9'].includes(bootstrap.releaseId))throw Error('Unsupported resource release');
 const manifestUrl=new URL(bootstrap.manifestUrl,new URL(config.assetBase??appBase,appBase)).href;
 const manifest=await json<ResourceManifest>(manifestUrl,signal);
 if(manifest.schemaVersion!==1||manifest.releaseId!==bootstrap.releaseId||manifest.modelVersion!=='china-cup-v6'||manifest.recipeVersion!=='porcelain-city-v6')throw Error('Unsupported model or recipe');
 if(manifest.fixedMapping!==undefined&&!['source-layout-v3','source-layout-v4'].includes(manifest.fixedMapping))throw Error('Unsupported fixed mapping');
 const assets:Asset[]=[];
 for(const levels of Object.values(manifest.fixed))for(const level of Object.values(levels))assets.push(level.baseColor,level.normal,level.orm);
 for(const city of Object.values(manifest.cities)){assets.push(city.thumbnail);for(const level of Object.values(city.levels))assets.push(level.mask,level.normal);}
 assets.push(...sloganLabels(manifest).map(s=>s.asset),manifest.mark);
 for(const asset of assets){
  if(!asset||![asset.width,asset.height,asset.bytes,asset.decodedBytes,asset.gpuBytes].every(n=>Number.isInteger(n)&&n>0)||asset.width>8192||asset.height>8192||![1,2,4].includes(asset.channels)||!['webp','hfn1-gzip'].includes(asset.encoding)||!['srgb','linear'].includes(asset.colorSpace)||!/^[a-f0-9]{64}$/.test(asset.sha256))throw Error('Invalid resource descriptor');
  const expected=asset.width*asset.height*(asset.encoding==='hfn1-gzip'?8:asset.channels);
  if(asset.decodedBytes!==expected||asset.gpuBytes!==Math.ceil(expected*4/3))throw Error('Invalid resource byte budget');
  asset.url=new URL(asset.url,manifestUrl).href;if(!/^https?:/.test(asset.url))throw Error('Invalid resource URL');
 }
 function cityPack(s:Selection,tier:Tier):CityArtworkPack{
  const cityId=s.variant.replace(/^v6-/,'').replace(/-(gold|red|green|purple|blue)$/,''),city=manifest.cities[cityId],label=city?.slogans?.[s.text]??manifest.slogans[s.text];
  if(!city||!label||!s.appearance)throw Error('Unknown city or slogan');
  const level=city.levels[tier];
  return {id:s.variant,version:7,name:city.name,layout:'blank-300deg-v1',baseColor:level.mask.url,normal:level.normal.url,roughness:level.mask.url,metalness:level.mask.url,coverage:level.mask.url,normalEncoding:'rgba16f',parametric:{mask:level.mask.url,appearance:s.appearance},label:{source:label.asset.url,fixedGold:true},runtime:{...level,label}};
 }
 function fixedPack(tiers:Record<Region,Tier>):StylePack{
  return {name:'V7 分级广彩花纸',mapping:manifest.fixedMapping??'source-layout-v3',cleanGoldGround:true,regions:Object.fromEntries((['body','handle','saucer'] as Region[]).map(region=>{const level=manifest.fixed[region][tiers[region]];return [region,{baseColor:level.baseColor.url,normal:level.normal.url,normalFormat:'rgba16f-gzip-v1',roughness:level.orm.url,metalness:level.orm.url,atlas:level.atlas,runtime:level,...(region==='saucer'?{offsetU:fixedLayout.saucer.sourceOffsetU}:{})}];})) as StylePack['regions']};
 }
 return {bootstrap,manifest,cityPack,fixedPack};
}
export type Resources=Awaited<ReturnType<typeof loadResources>>;
