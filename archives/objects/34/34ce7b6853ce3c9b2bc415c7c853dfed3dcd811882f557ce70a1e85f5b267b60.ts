import { Color, MeshPhysicalMaterial, Vector2, type Texture } from "three";
import { RENDER_STANDARD } from "./render-standard";
export type Region = "body" | "handle" | "saucer";
export type MaterialMode =
  | "pbr"
  | "porcelain"
  | "clay"
  | "normal"
  | "metalness";
export function makeMaterials() {
  const porcelain = new MeshPhysicalMaterial({
    color: "#f4f3ed",
    metalness: 0,
    roughness: 0.16,
    clearcoat: 1,
    clearcoatRoughness: 0.065,
    ior: 1.5,
  });
  const gold = new MeshPhysicalMaterial({
    color: new Color().setRGB(1, 0.6, 0.045),
    metalness: 1,
    roughness: 0.065,
    clearcoat: 0.12,
    clearcoatRoughness: 0.075,
  });
  const foot = new MeshPhysicalMaterial({
    color: "#e7e5de",
    metalness: 0,
    roughness: 0.42,
    clearcoat: 0.25,
  });
  const mark = new MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0.22,
    clearcoat: 1,
    clearcoatRoughness: 0.065,
    transparent: true,
    alphaTest: 0.02,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -1,
  });
  const painted = () =>
    new MeshPhysicalMaterial({
      color: 0xffffff,
      envMapIntensity: 0.7,
      metalness: 1,
      roughness: 1,
      clearcoat: 1,
      clearcoatRoughness: 0.11,
      normalScale: new Vector2(RENDER_STANDARD.relief, RENDER_STANDARD.relief),
      clearcoatNormalScale: new Vector2(
        RENDER_STANDARD.clearcoatRelief,
        RENDER_STANDARD.clearcoatRelief,
      ),
    });
  const regions: Record<Region, MeshPhysicalMaterial> = {
    body: painted(),
    handle: painted(),
    saucer: painted(),
  };
  return { porcelain, gold, foot, mark, regions };
}
export type Materials = ReturnType<typeof makeMaterials>;
export type Maps = {
  baseColor: Texture;
  normal?: Texture;
  metalness?: Texture;
  roughness?: Texture;
  height?: Texture;
};
export function setRegionMaps(material: MeshPhysicalMaterial, maps: Maps) {
  material.normalScale.setScalar(RENDER_STANDARD.relief);
  material.clearcoatNormalScale.setScalar(RENDER_STANDARD.clearcoatRelief);
  material.color.set(0xffffff);
  material.map = maps.baseColor;
  material.normalMap = maps.normal ?? null;
  material.clearcoatNormalMap = maps.normal ?? null;
  material.metalnessMap = maps.metalness ?? null;
  material.metalness = maps.metalness ? 1 : 0;
  material.roughnessMap = maps.roughness ?? null;
  material.roughness = maps.roughness ? 1 : 0.29;
  // Height is retained as source evidence. Micro-relief uses aligned normals,
  // never silhouette displacement on low-poly UV boundaries.
  material.needsUpdate = true;
}
export const neutralColor = new Color("#c1c0bc");
