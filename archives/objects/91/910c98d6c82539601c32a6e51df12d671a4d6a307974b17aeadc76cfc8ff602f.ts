import { Color, MeshPhysicalMaterial, Vector2, type Texture } from 'three';
export type Region = 'body' | 'handle' | 'saucer';
export type MaterialMode = 'pbr' | 'porcelain' | 'clay' | 'normal' | 'metalness';
export function makeMaterials() {
  const porcelain = new MeshPhysicalMaterial({color:'#efeee7',metalness:0,roughness:.16,clearcoat:1,clearcoatRoughness:.065,ior:1.5});
  const gold = new MeshPhysicalMaterial({color:'#edbe59',metalness:1,roughness:.135,clearcoat:.22,clearcoatRoughness:.16});
  const foot = new MeshPhysicalMaterial({color:'#e7e5de',metalness:0,roughness:.42,clearcoat:.25});
  const painted = () => new MeshPhysicalMaterial({color:0xffffff,metalness:1,roughness:1,clearcoat:1,clearcoatRoughness:.11,normalScale:new Vector2(.65,.65),clearcoatNormalScale:new Vector2(.35,.35)});
  const regions: Record<Region,MeshPhysicalMaterial> = {body:painted(),handle:painted(),saucer:painted()};
  return {porcelain,gold,foot,regions};
}
export type Materials = ReturnType<typeof makeMaterials>;
export type Maps = {baseColor:Texture;normal?:Texture;metalness?:Texture;roughness?:Texture;height?:Texture};
export function setRegionMaps(material: MeshPhysicalMaterial,maps:Maps){
  material.color.set(0xffffff); material.map=maps.baseColor;
  material.normalMap=maps.normal??null; material.clearcoatNormalMap=maps.normal??null;
  material.metalnessMap=maps.metalness??null; material.metalness=maps.metalness?1:0;
  material.roughnessMap=maps.roughness??null; material.roughness=maps.roughness?1:.29;
  // Height is retained as source evidence. Micro-relief uses aligned normals,
  // never silhouette displacement on low-poly UV boundaries.
  material.needsUpdate=true;
}
export const neutralColor = new Color('#c1c0bc');
