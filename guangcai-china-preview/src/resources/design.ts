import type {Selection} from '../styles/city-selection';
import type {ResourceManifest,DesignConfig} from './types';
import {normalizeAppearance} from '../styles/city-appearance';
export function exportDesign(selection:Selection,manifest:ResourceManifest):DesignConfig{
 const cityId=selection.variant.replace(/^v6-/,'').replace(/-(gold|red|green|purple|blue)$/,'');
 const design={schemaVersion:1 as const,resourceReleaseId:manifest.releaseId,modelVersion:manifest.modelVersion,recipeVersion:manifest.recipeVersion,cityId,sloganId:selection.text,appearance:structuredClone(selection.appearance!)};
 validateDesign(design,manifest);return design;
}
export function validateDesign(value:unknown,manifest:ResourceManifest):DesignConfig{
 const d=value as DesignConfig;
 if(!d||d.schemaVersion!==1||d.resourceReleaseId!==manifest.releaseId||d.modelVersion!==manifest.modelVersion||d.recipeVersion!==manifest.recipeVersion||!Object.hasOwn(manifest.cities,d.cityId)||!Object.hasOwn(manifest.slogans,d.sloganId))throw Error('作品使用了未知或不支持的资源版本');
 const exact=(obj:object,keys:string[])=>Object.keys(obj).length===keys.length&&keys.every(k=>Object.hasOwn(obj,k));
 if(!exact(d,['schemaVersion','resourceReleaseId','modelVersion','recipeVersion','cityId','sloganId','appearance'])||!d.appearance||!exact(d.appearance,['preset','hue','saturation','lightness','material','materialX','relief']))throw Error('作品字段不符合数据契约');
 const a=normalizeAppearance(d.appearance);
 for(const key of ['hue','saturation','lightness','material','materialX','relief'] as const)if((d.appearance[key]??.5)!==a[key])throw Error('作品参数超出范围');
 return {schemaVersion:1,resourceReleaseId:d.resourceReleaseId,modelVersion:d.modelVersion,recipeVersion:d.recipeVersion,cityId:d.cityId,sloganId:d.sloganId,appearance:a};
}
