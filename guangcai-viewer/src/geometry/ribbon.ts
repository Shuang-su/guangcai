import { BufferGeometry, Curve, Float32BufferAttribute, Vector3 } from 'three';

/** Sweep a rounded rectangular section: local a points outside the handle,
 * b spans its broad width. No circular tube approximation. Open ends bury in roots.
 * materials: 0 porcelain inner surface, 1 gilded side/bevel, 2 artwork outer face. */
export function ribbon(path: Curve<Vector3>, width: number, thickness: number, segments = 128, decoration = true) {
  const g = new BufferGeometry(), pos: number[] = [], normals: number[] = [], uvs: number[] = [];
  const section: { a: number; b: number; na: number; nb: number; material: number }[] = [];
  const halfT = thickness / 2, halfW = width / 2, bevel = Math.min(1.15, thickness * .22);
  // Clockwise section viewed along the descending centreline, with duplicate
  // boundary vertices for material/UV changes. Flat faces + true rounded bevels.
  for (let corner = 0; corner < 4; corner++) {
    const sa = corner < 2 ? 1 : -1, sb = corner === 0 || corner === 3 ? 1 : -1;
    const begin = [0, Math.PI / 2, Math.PI, Math.PI * 1.5][corner];
    for (let k = 0; k <= 6; k++) {
      const angle = begin + k / 6 * Math.PI / 2;
      const na = Math.cos(angle), nb = Math.sin(angle);
      // section travels outer -> +width -> inner -> -width
      const ca = Math.cos(begin + Math.PI / 4) > 0 ? halfT - bevel : -halfT + bevel;
      const cb = Math.sin(begin + Math.PI / 4) > 0 ? halfW - bevel : -halfW + bevel;
      section.push({ a: ca + bevel * na, b: cb + bevel * nb, na, nb, material: sa + sb });
    }
  }
  const n = section.length, buckets = [[], [], []] as number[][];
  const lengths: number[] = [0]; let previous = path.getPointAt(0);
  for (let i = 1; i <= segments; i++) { const p = path.getPointAt(i / segments); lengths.push(lengths[i - 1] + p.distanceTo(previous)); previous = p; }
  for (let i = 0; i <= segments; i++) {
    const t = i / segments, p = path.getPointAt(t), tangent = path.getTangentAt(t).normalize();
    const outward = new Vector3(-tangent.y, tangent.x, 0);
    for (let j = 0; j <= n; j++) {
      const s = section[j % n];
      pos.push(p.x + outward.x * s.a, p.y + outward.y * s.a, p.z + s.b);
      normals.push(outward.x * s.na, outward.y * s.na, s.nb);
      uvs.push((s.b + halfW) / width, 1 - lengths[i] / lengths[segments]);
    }
  }
  for (let i = 0; i < segments; i++) for (let j = 0; j < n; j++) {
    const a = i * (n + 1) + j, b = (i + 1) * (n + 1) + j;
    const s = section[j], next = section[(j + 1) % n];
    const outer = s.a > halfT - .01 && next.a > halfT - .01;
    const inner = s.a < -halfT + .01 && next.a < -halfT + .01;
    const mat = outer && decoration ? 2 : inner ? 0 : 1;
    buckets[mat].push(a, a + 1, b, b, a + 1, b + 1);
  }
  const indices: number[] = [];
  buckets.forEach((data, m) => { g.addGroup(indices.length, data.length, m); indices.push(...data); });
  g.setAttribute('position', new Float32BufferAttribute(pos, 3)); g.setAttribute('normal', new Float32BufferAttribute(normals, 3));
  g.setAttribute('uv', new Float32BufferAttribute(uvs, 2)); g.setIndex(indices); g.computeBoundingBox(); return g;
}
