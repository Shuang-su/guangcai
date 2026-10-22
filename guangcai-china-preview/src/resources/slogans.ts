import {consumerSlogans,sloganText,type Slogan} from '../styles/slogans';
import type {ResourceManifest,Label} from './types';

/** A city-specific phrase must never fall back to another city's wording. */
export function resolveSlogan(manifest:ResourceManifest,cityId:string,id:string):Label|undefined {
 if(!Object.hasOwn(manifest.cities,cityId)||!Object.hasOwn(manifest.slogans,id))return;
 const city=manifest.cities[cityId];
 return city.slogans?.[id]??(id==='love-city'?undefined:manifest.slogans[id]);
}
export function availableSlogans(manifest:ResourceManifest,cityId:string){
 return (Object.keys(consumerSlogans) as Slogan[]).flatMap(id=>resolveSlogan(manifest,cityId,id)?[{id,text:sloganText(id,manifest.cities[cityId].name)}]:[]);
}
