import type {ResourceManifest,Tier} from './types';
export const cityLibrary=(manifest:ResourceManifest)=>[
 ...Object.values(manifest.cities).flatMap(c=>[c.levels.light.mask,c.levels.light.normal,c.thumbnail]),
 ...Object.values(manifest.slogans).map(s=>s.asset)
];
export function neighborAssets(manifest:ResourceManifest,cityId:string,tier:Tier,order=Object.keys(manifest.cities)){
 const index=order.indexOf(cityId);if(index<0)throw Error('Unknown preload city');
 return [...new Set([cityId,order[(index+order.length-1)%order.length],order[(index+1)%order.length]])].flatMap(id=>[manifest.cities[id].levels[tier].mask,manifest.cities[id].levels[tier].normal]);
}
