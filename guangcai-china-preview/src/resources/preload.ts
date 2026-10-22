import type {ResourceManifest,Tier,Label} from './types';
import {resolveSlogan} from './slogans';
const unique=(labels:Label[])=>[...new Map(labels.map(label=>[label.asset.sha256,label])).values()];
export const sloganLabels=(manifest:ResourceManifest,cityId?:string)=>unique(cityId
 ?Object.keys(manifest.slogans).flatMap(id=>{const label=resolveSlogan(manifest,cityId,id);return label?[label]:[];})
 :[...Object.values(manifest.slogans),...Object.values(manifest.cities).flatMap(c=>Object.values(c.slogans??{}))]);
export const cityLibrary=(manifest:ResourceManifest,cityId?:string)=>[
 ...Object.values(manifest.cities).flatMap(c=>[c.levels.light.mask,c.levels.light.normal,c.thumbnail]),
 ...sloganLabels(manifest,cityId).map(s=>s.asset)
];
export function neighborAssets(manifest:ResourceManifest,cityId:string,tier:Tier,order=Object.keys(manifest.cities)){
 const index=order.indexOf(cityId);if(index<0)throw Error('Unknown preload city');
 const ids=[...new Set([cityId,order[(index+order.length-1)%order.length],order[(index+1)%order.length]])];
 return [...ids.flatMap(id=>[manifest.cities[id].levels[tier].mask,manifest.cities[id].levels[tier].normal]),...ids.flatMap(id=>Object.values(manifest.cities[id].slogans??{}).map(label=>label.asset))];
}
