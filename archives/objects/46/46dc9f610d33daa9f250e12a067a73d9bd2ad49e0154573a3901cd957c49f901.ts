import { Color, MeshPhysicalMaterial, Vector2, type Texture } from 'three';
import {PORCELAIN} from './porcelain';
import {configureFixedAtlas,type FixedAtlas} from './fixed-atlas';
import { RENDER_STANDARD } from './render-standard';
export type Region = 'body' | 'handle' | 'saucer';
export type MaterialMode = 'pbr' | 'porcelain' | 'clay' | 'normal' | 'metalness';
export function makeMaterials() {
  const porcelain = new MeshPhysicalMaterial({color:PORCELAIN.color,metalness:0,roughness:.16,clearcoat:1,clearcoatRoughness:.065,ior:1.5});
  const gold = new MeshPhysicalMaterial({color:new Color().setRGB(1,.60,.045),metalness:1,roughness:.065,clearcoat:.12,clearcoatRoughness:.075});
  const foot = new MeshPhysicalMaterial({color:'#e7e5de',metalness:0,roughness:.42,clearcoat:.25});
  const mark = new MeshPhysicalMaterial({color:0xffffff,metalness:0,roughness:.22,clearcoat:1,clearcoatRoughness:.065,transparent:true,alphaTest:.02,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1});
  const painted = () => new MeshPhysicalMaterial({color:0xffffff,envMapIntensity:.7,metalness:1,roughness:1,specularIntensity:.85,clearcoat:.40,clearcoatRoughness:.22,normalScale:new Vector2(RENDER_STANDARD.relief,RENDER_STANDARD.relief),clearcoatNormalScale:new Vector2(RENDER_STANDARD.clearcoatRelief,RENDER_STANDARD.clearcoatRelief)});
  const regions: Record<Region,MeshPhysicalMaterial> = {body:painted(),handle:painted(),saucer:painted()};
  // Match the unpainted pixels of city-artwork.ts, including its byte-encoded roughness.
  const wallPorcelain=new MeshPhysicalMaterial({color:PORCELAIN.color,metalness:0,roughness:41/255,clearcoat:1,clearcoatRoughness:.065,ior:1.5});
  const city=wallPorcelain.clone();
  return {porcelain,wallPorcelain,gold,foot,mark,regions,city};
}
export type Materials = ReturnType<typeof makeMaterials>;
export type Maps = {baseColor:Texture;normal?:Texture;metalness?:Texture;roughness?:Texture;height?:Texture};
export function setRegionMaps(material: MeshPhysicalMaterial,maps:Maps,atlas?:FixedAtlas){
  configureFixedAtlas(material,atlas);
  material.normalScale.setScalar(RENDER_STANDARD.relief);
  material.clearcoatNormalScale.setScalar(RENDER_STANDARD.clearcoatRelief);
  material.color.set(0xffffff); material.map=maps.baseColor;
  material.normalMap=maps.normal??null; material.clearcoatNormalMap=maps.normal??null;
  material.metalnessMap=maps.metalness??null; material.metalness=maps.metalness?1:0;
  material.roughnessMap=maps.roughness??null; material.roughness=maps.roughness?1:.29;
  // Height is retained as source evidence. Micro-relief uses aligned normals,
  // never silhouette displacement on low-poly UV boundaries.
  material.needsUpdate=true;
}
export const neutralColor = new Color('#c1c0bc');
