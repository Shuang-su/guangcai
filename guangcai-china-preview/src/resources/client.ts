import type {Asset,Bootstrap,ResourceManifest,Tier,Region,DesignConfig} from './types';
import type {Selection} from '../styles/city-selection';
import type {CityArtworkPack} from '../styles/city-artwork';
import type {StylePack} from '../styles/style-manager';
import fixedLayout from '../styles/fixed-layout.json';
import {normalizeAppearance} from '../styles/city-appearance';

declare global {interface Window {GUANGCAI_CONFIG?:{bootstrapUrl?:string;assetBase?:string;apiBase?:string}}}
export const appBase=new URL(import.meta.env.BASE_URL,document.baseURI).href;
export const config=window.GUANGCAI_CONFIG??{};
async function json<T>(url:string){const response=await fetch(url,{signal:AbortSignal.timeout(15000)});if(!response.ok)throw Error(`资源目录读取失败 (${response.status})`);return response.json() as Promise<T>;}
export async function loadResources(){
 const bootstrap=await json<Bootstrap>(new URL(config.bootstrapUrl??'api/v1/bootstrap.json',appBase).href);
 if(bootstrap.schemaVersion!==1||bootstrap.releaseId!=='v7-1')throw Error('Unsupported resource release');
 const manifestUrl=new URL(bootstrap.manifestUrl,config.assetBase??appBase).href;
 const manifest=await json<ResourceManifest>(manifestUrl);
 if(manifest.schemaVersion!==1||manifest.releaseId!==bootstrap.releaseId||manifest.modelVersion!=='china-cup-v6'||manifest.recipeVersion!=='porcelain-city-v6')throw Error('Unsupported model or recipe');
 const assets:Asset[]=[];
 for(const levels of Object.values(manifest.fixed))for(const level of Object.values(levels))assets.push(level.baseColor,level.normal,level.orm);
 for(const city of Object.values(manifest.cities)){assets.push(city.thumbnail);for(const level of Object.values(city.levels))assets.push(level.mask,level.normal);}
 assets.push(...Object.values(manifest.slogans).map(s=>s.asset),manifest.mark);
 for(const asset of assets){
  if(!asset||![asset.width,asset.height,asset.bytes,asset.decodedBytes,asset.gpuBytes].every(n=>Number.isInteger(n)&&n>0)||asset.width>8192||asset.height>8192||![1,2,4].includes(asset.channels)||!['webp','hfn1-gzip'].includes(asset.encoding)||!['srgb','linear'].includes(asset.colorSpace)||!/^[a-f0-9]{64}$/.test(asset.sha256))throw Error('Invalid resource descriptor');
  const expected=asset.width*asset.height*(asset.encoding==='hfn1-gzip'?8:asset.channels);
  if(asset.decodedBytes!==expected||asset.gpuBytes!==Math.ceil(expected*4/3))throw Error('Invalid resource byte budget');
  asset.url=new URL(asset.url,manifestUrl).href;if(!/^https?:/.test(asset.url))throw Error('Invalid resource URL');
 }
 function cityPack(s:Selection,tier:Tier):CityArtworkPack{
  const cityId=s.variant.replace(/^v6-/,'').replace(/-(gold|red|green|purple|blue)$/,''),city=manifest.cities[cityId],label=manifest.slogans[s.text];
  if(!city||!label||!s.appearance)throw Error('Unknown city or slogan');
  const level=city.levels[tier];
  return {id:s.variant,version:7,name:city.name,layout:'blank-300deg-v1',baseColor:level.mask.url,normal:level.normal.url,roughness:level.mask.url,metalness:level.mask.url,coverage:level.mask.url,normalEncoding:'rgba16f',parametric:{mask:level.mask.url,appearance:s.appearance},label:{source:label.asset.url,fixedGold:true},runtime:{...level,label}};
 }
 function fixedPack(tiers:Record<Region,Tier>):StylePack{
  return {name:'V7 分级广彩花纸',mapping:'source-layout-v3',cleanGoldGround:true,regions:Object.fromEntries((['body','handle','saucer'] as Region[]).map(region=>{const level=manifest.fixed[region][tiers[region]];return [region,{baseColor:level.baseColor.url,normal:level.normal.url,normalFormat:'rgba16f-gzip-v1',roughness:level.orm.url,metalness:level.orm.url,atlas:level.atlas,runtime:level,...(region==='saucer'?{offsetU:fixedLayout.saucer.sourceOffsetU}:{})}];})) as StylePack['regions']};
 }
 return {bootstrap,manifest,cityPack,fixedPack};
}
export type Resources=Awaited<ReturnType<typeof loadResources>>;
export function exportDesign(selection:Selection,manifest:ResourceManifest):DesignConfig{
 const cityId=selection.variant.replace(/^v6-/,'').replace(/-(gold|red|green|purple|blue)$/,'');
 const design={schemaVersion:1 as const,resourceReleaseId:manifest.releaseId,modelVersion:manifest.modelVersion,recipeVersion:manifest.recipeVersion,cityId,sloganId:selection.text,appearance:structuredClone(selection.appearance!)};
 validateDesign(design,manifest);return design;
}
export function validateDesign(value:unknown,manifest:ResourceManifest):DesignConfig{
 const d=value as DesignConfig;
 if(!d||d.schemaVersion!==1||d.resourceReleaseId!==manifest.releaseId||d.modelVersion!==manifest.modelVersion||d.recipeVersion!==manifest.recipeVersion||!Object.hasOwn(manifest.cities,d.cityId)||!Object.hasOwn(manifest.slogans,d.sloganId))throw Error('作品使用了未知或不支持的资源版本');
 const a=normalizeAppearance(d.appearance);
 for(const key of ['hue','saturation','lightness','material','materialX','relief'] as const)if((d.appearance[key]??.5)!==a[key])throw Error('作品参数超出范围');
 return {schemaVersion:1,resourceReleaseId:d.resourceReleaseId,modelVersion:d.modelVersion,recipeVersion:d.recipeVersion,cityId:d.cityId,sloganId:d.sloganId,appearance:a};
}
