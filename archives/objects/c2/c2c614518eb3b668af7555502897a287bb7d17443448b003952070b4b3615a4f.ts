export type DecorationRegion = "body" | "handle" | "saucer";
export interface MapSource {
  png: string;
  ktx2?: string;
}
export interface MaterialResponse {
  roughness?: number;
  metalness?: number;
  clearcoat?: number;
  clearcoatRoughness?: number;
  ior?: number;
  normalScale?: number;
  clearcoatNormalScale?: number;
}
export interface PBRMapSet {
  response?: MaterialResponse;
  baseColor: MapSource;
  normal?: MapSource;
  roughness?: MapSource;
  metalness?: MapSource;
  clearcoat?: MapSource;
  clearcoatRoughness?: MapSource;
  clearcoatNormal?: MapSource;
}
export interface CupStyle {
  id: string;
  label: string;
  uvLayout: "guangcai-v1";
  master: string;
  regions: Record<DecorationRegion, PBRMapSet>;
}
export type TextureTier = "high" | "low";
const base = import.meta.env.BASE_URL;
function file(tier: TextureTier, name: string, ext = "png"): MapSource {
  return {
    png: `${base}artwork/${tier}/${name}.${ext}`,
    ktx2: `${base}artwork/${tier}/${name}.ktx2`,
  };
}
function region(tier: TextureTier, name: string, variant: string): PBRMapSet {
  const normal = file(tier, `${name}-normal`),
    orm = file(tier, `${name}-${variant}-orm`),
    coat = file(tier, `${name}-${variant}-coat`);
  return {
    baseColor: file(tier, `${name}-${variant}-color`, "webp"),
    normal,
    roughness: orm,
    metalness: orm,
    clearcoat: coat,
    clearcoatRoughness: coat,
    clearcoatNormal: normal,
  };
}
export function catalog(tier: TextureTier): CupStyle[] {
  return (["gold", "white"] as const).map((id) => ({
    id,
    label: id === "gold" ? "金地广彩" : "白地广彩",
    uvLayout: "guangcai-v1",
    master: "generated-guangcai-20260921-v1",
    regions: {
      body: region(tier, "body", id),
      handle: region(tier, "band", "gold"),
      saucer: region(tier, "band", "gold"),
    },
  }));
}
