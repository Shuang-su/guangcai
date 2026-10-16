import { smooth } from "./surface";
export interface ContourPoint {
  x: number;
  z: number;
  part: "art" | "white";
  u: number;
  flatT?: number;
}
/** Analytic tangent fillets: fillet centre lies on the inset circle and inset cutting plane. */
export function contour(
  r: number,
  cut: number,
  fillet: number,
  arcN: number,
  flatN: number,
): ContourPoint[] {
  const c = r - cut,
    cx = c - fillet,
    cz = Math.sqrt((r - fillet) ** 2 - cx ** 2),
    a = Math.atan2(cz, cx),
    out: ContourPoint[] = [];
  for (let i = 0; i <= arcN; i++) {
    const t = i / arcN,
      th = a + (2 * Math.PI - 2 * a) * t;
    out.push({ x: r * Math.cos(th), z: r * Math.sin(th), part: "art", u: t });
  }
  const fN = 12;
  for (let i = 1; i <= fN; i++) {
    const th = -a + (a * i) / fN;
    out.push({
      x: cx + fillet * Math.cos(th),
      z: -cz + fillet * Math.sin(th),
      part: "white",
      u: 0,
    });
  }
  for (let i = 1; i <= flatN; i++) {
    const t = i / flatN;
    out.push({ x: c, z: -cz + 2 * cz * t, part: "white", u: t, flatT: t });
  }
  for (let i = 1; i < fN; i++) {
    const th = (a * i) / fN;
    out.push({
      x: cx + fillet * Math.cos(th),
      z: cz + fillet * Math.sin(th),
      part: "white",
      u: 1,
    });
  }
  return out;
}
export function flute(
  t: number,
  y: number,
  height: number,
  count: number,
  depth: number,
  edgeFade: number,
) {
  const side = smooth(0, edgeFade, t) * smooth(0, edgeFade, 1 - t);
  const vertical = smooth(1, 4, y) * smooth(0.4, 2.5, height - y);
  return depth * Math.cos(2 * Math.PI * t * count) * side * vertical;
}
