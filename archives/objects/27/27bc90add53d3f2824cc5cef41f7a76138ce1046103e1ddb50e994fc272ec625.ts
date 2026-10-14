export interface GeometryParams {
  height: number;
  radiusTop: number;
  radiusBottom: number;
  flatCutDepth: number;
  flatTransitionRadius: number;
  wallThickness: number;
  bottomThickness: number;
  bottomRecessDepth: number;
  lipRadius: number;
  fluteCount: number;
  fluteDepth: number;
  fluteEdgeFade: number;
  handleReach: number;
  handleWidth: number;
  handleThickness: number;
  handleTop: number;
  handleBottom: number;
  lidRadius: number;
  lidThickness: number;
  knobHeight: number;
  knobSpan: number;
  innerFloorRadius: number;
  footInset: number;
  footWidth: number;
  fluteRootHeightFade: number;
  fluteRootWidthFade: number;
  handleRootFlare: number;
  handleRootBlend: number;
  knobWidth: number;
  knobThickness: number;
  knobFluteDepth: number;
  knobFluteCount: number;
  lidLocatorDepth: number;
  lidLocatorWall: number;
  saucerRadius: number;
  saucerHeight: number;
  quality: "high" | "medium";
}
/** Millimetres. All values are modelling estimates except the pictured nominal 151 mm saucer diameter. */
export const defaults: GeometryParams = {
  height: 112,
  radiusTop: 42.5,
  radiusBottom: 41.8,
  flatCutDepth: 9.5,
  flatTransitionRadius: 4,
  wallThickness: 2.6,
  bottomThickness: 5,
  bottomRecessDepth: 1.7,
  lipRadius: 1.1,
  fluteCount: 16,
  fluteDepth: 0.18,
  fluteEdgeFade: 0.12,
  handleReach: 31,
  handleWidth: 10.5,
  handleThickness: 4.6,
  handleTop: 94,
  handleBottom: 29,
  lidRadius: 44.6,
  lidThickness: 3.6,
  knobHeight: 15,
  knobSpan: 28,
  innerFloorRadius: 3,
  footInset: 2,
  footWidth: 1,
  fluteRootHeightFade: 4,
  fluteRootWidthFade: 8,
  handleRootFlare: 0.4,
  handleRootBlend: 32,
  knobWidth: 7,
  knobThickness: 3.5,
  knobFluteDepth: 0.12,
  knobFluteCount: 18,
  lidLocatorDepth: 2,
  lidLocatorWall: 2,
  saucerRadius: 75.5,
  saucerHeight: 13,
  quality: "high",
};
export function validateParams(p: GeometryParams) {
  for (const [k, v] of Object.entries(p))
    if (typeof v === "number" && (!Number.isFinite(v) || v <= 0))
      throw Error(`Invalid ${k}`);
  if (
    p.wallThickness >= Math.min(p.radiusTop, p.radiusBottom) * 0.15 ||
    p.bottomThickness >= p.height * 0.2
  )
    throw Error("Wall or floor is too thick");
  if (
    p.flatCutDepth >= p.radiusBottom * 0.55 ||
    p.flatTransitionRadius >= p.radiusBottom - p.flatCutDepth
  )
    throw Error("Invalid D section");
  if (
    p.fluteDepth >= p.wallThickness * 0.5 ||
    !Number.isInteger(p.fluteCount) ||
    p.fluteCount < 3 ||
    p.fluteCount > 40
  )
    throw Error("Unsafe flutes");
  if (
    p.handleBottom >= p.handleTop ||
    p.handleTop >= p.height - p.wallThickness
  )
    throw Error("Invalid handle roots");
  if (
    p.fluteEdgeFade >= 0.5 ||
    p.lipRadius > p.wallThickness ||
    p.innerFloorRadius > p.radiusBottom * 0.2 ||
    p.handleThickness >= p.handleWidth ||
    p.footInset + p.footWidth > p.radiusBottom * 0.2 ||
    !Number.isInteger(p.knobFluteCount)
  )
    throw Error("Invalid fillet or ribbon section");
  if (p.bottomRecessDepth >= p.bottomThickness - 1)
    throw Error("Insufficient floor thickness");
}
