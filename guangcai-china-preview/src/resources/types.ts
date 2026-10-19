import type {FixedAtlas} from '../materials/fixed-atlas';
import type {Appearance} from '../styles/city-appearance';

export type FixedMapping='source-layout-v3'|'source-layout-v4';
export type Tier='light'|'standard'|'detail';
export type Region='body'|'handle'|'saucer';
export interface Asset {
 id:string;url:string;sha256:string;sourceSha256:string;encoding:'webp'|'hfn1-gzip';
 width:number;height:number;bytes:number;decodedBytes:number;gpuBytes:number;
 channels:1|2|4;colorSpace:'srgb'|'linear';
}
export interface FixedLevel {atlas?:FixedAtlas;baseColor:Asset;normal:Asset;orm:Asset}
export interface CityLevel {mask:Asset;normal:Asset}
export interface Label {asset:Asset;uvRect:[number,number,number,number]}
export interface ResourceManifest {
 fixedMapping?:FixedMapping;
 schemaVersion:1;releaseId:string;modelVersion:string;recipeVersion:string;
 fixed:Record<Region,Record<Tier,FixedLevel>>;
 cities:Record<string,{name:string;thumbnail:Asset;levels:Record<Tier,CityLevel>;slogans?:Record<string,Label>}>;
 slogans:Record<string,{text:string}&Label>;mark:Asset;
}
export interface DesignConfig {
 schemaVersion:1;resourceReleaseId:string;modelVersion:string;recipeVersion:string;
 cityId:string;sloganId:string;appearance:Appearance;
}
export interface Bootstrap {schemaVersion:1;releaseId:string;catalogUrl:string;manifestUrl:string;defaultDesign:DesignConfig}
