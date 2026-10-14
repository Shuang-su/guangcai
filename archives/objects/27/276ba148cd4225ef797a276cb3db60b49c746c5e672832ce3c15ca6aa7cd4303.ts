import { CatmullRomCurve3, Vector3 } from "three";
import { Surface, stitchNormals } from "./surface";
import { Part, PartMaterial } from "./body";
/** Sweep a rounded, broad ribbon, never a circular tube. Cross section normals use a stable planar frame. */
export function ribbon(
  path: Vector3[],
  width: number,
  thickness: number,
  steps: number,
  name: string,
  art: boolean,
  fluted = false,
  options = { rootFlare: 0.4, rootBlend: 32, ribDepth: 0.12, ribCount: 18 },
): Part[] {
  const curve = new CatmullRomCurve3(path, false, "centripetal");
  const edge = Math.min(thickness * 0.35, 1.3),
    cross: { a: number; b: number; material: PartMaterial }[] = [];
  // In the path XY plane, local a is outward; local b is the wide Z dimension.
  const corners = [
    [thickness / 2 - edge, width / 2 - edge, 0],
    [-thickness / 2 + edge, width / 2 - edge, Math.PI / 2],
    [-thickness / 2 + edge, -width / 2 + edge, Math.PI],
    [thickness / 2 - edge, -width / 2 + edge, Math.PI * 1.5],
  ];
  for (const [ca, cb, start] of corners)
    for (let i = 0; i <= 6; i++) {
      const q = start + ((i / 6) * Math.PI) / 2;
      cross.push({
        a: ca + edge * Math.cos(q),
        b: cb + edge * Math.sin(q),
        material: "porcelain",
      });
    }
  const surfaces = new Map<PartMaterial, Surface>();
  for (const m of ["porcelain", "gold", "handle"] as const)
    surfaces.set(m, new Surface());
  const pts = curve.getSpacedPoints(steps),
    lengths = [0];
  for (let i = 1; i < pts.length; i++)
    lengths.push(lengths[i - 1] + pts[i].distanceTo(pts[i - 1]));
  function point(i: number, k: number): [number, number, number] {
    const t = i / steps,
      tan = curve.getTangentAt(t).normalize(),
      normal = new Vector3(-tan.y, tan.x, 0),
      q = cross[k];
    // Broad, flared root cuffs meet the ceramic body in a smooth shallow overlap.
    const root =
      1 +
      options.rootFlare *
        (Math.exp(-t * options.rootBlend) +
          Math.exp(-(1 - t) * options.rootBlend));
    let a = q.a * root;
    if (fluted && q.a > 0)
      a +=
        options.ribDepth *
        Math.cos(t * options.ribCount * 2 * Math.PI) *
        Math.sin(Math.PI * t) ** 0.3;
    const v = pts[i].clone().addScaledVector(normal, a);
    v.z += q.b * root;
    return [v.x, v.y, v.z];
  }
  for (let i = 0; i < steps; i++)
    for (let k = 0; k < cross.length; k++) {
      const l = (k + 1) % cross.length,
        midA = (cross[k].a + cross[l].a) / 2,
        midB = (cross[k].b + cross[l].b) / 2;
      let m: PartMaterial =
        Math.abs(midB) > width / 2 - edge * 0.85 ? "gold" : "porcelain";
      if (midA > thickness * 0.35 && Math.abs(midB) < width / 2 - edge * 0.8)
        m = art ? "handle" : "porcelain";
      if (i < 3 || i > steps - 4) m = "gold";
      const s = surfaces.get(m)!;
      const ids = [
        [i, k],
        [i, l],
        [i + 1, l],
        [i + 1, k],
      ].map(([j, q]) =>
        s.add(point(j, q), j / steps, (cross[q].b + width / 2) / width),
      );
      s.quad(...(ids as [number, number, number, number]));
    }
  for (const end of [0, steps]) {
    const s = surfaces.get("porcelain")!,
      center = s.add([pts[end].x, pts[end].y, pts[end].z]);
    for (let k = 0; k < cross.length; k++) {
      const a = s.add(point(end, k)),
        b = s.add(point(end, (k + 1) % cross.length));
      end === 0 ? s.tri(center, b, a) : s.tri(center, a, b);
    }
  }
  const out = [...surfaces]
    .filter(([, s]) => s.indices.length)
    .map(([material, s]) => ({
      geometry: s.geometry(),
      material,
      name: `${name}-${material}`,
    }));
  stitchNormals(out.map((x) => x.geometry));
  return out;
}
