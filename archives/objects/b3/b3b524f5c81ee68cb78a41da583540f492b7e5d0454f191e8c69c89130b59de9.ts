/** Millimetres. Photo-based estimates, NOT measurements or production CAD. */
export interface Dimensions {
  radius: number; height: number; wall: number; bottom: number;
  bandAngle: number; handleReach: number; handleWidth: number; handleThickness: number;
  saucerRadius: number; lidOverhang: number;
}
export const defaults: Dimensions = {
  radius: 43, height: 112, wall: 2.2, bottom: 5.5,
  bandAngle: Math.PI / 3, handleReach: 33, handleWidth: 14, handleThickness: 4.8,
  saucerRadius: 70, lidOverhang: 2.4,
};
export function validateDimensions(p: Dimensions) {
  for (const v of Object.values(p)) if (!Number.isFinite(v) || v <= 0) throw new Error('尺寸必须为有限正数');
  if (p.wall >= p.radius / 4 || p.bottom >= p.height / 4 || p.saucerRadius <= p.radius + 10 || p.bandAngle >= Math.PI) throw new Error('尺寸超出有效器型范围');
}
