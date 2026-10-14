import { BufferGeometry, Float32BufferAttribute } from "three";
export type P3 = [number, number, number];
export class Surface {
  positions: number[] = [];
  uvs: number[] = [];
  indices: number[] = [];
  add(p: P3, u = 0, v = 0) {
    const i = this.positions.length / 3;
    this.positions.push(...p);
    this.uvs.push(u, v);
    return i;
  }
  tri(a: number, b: number, c: number) {
    this.indices.push(a, b, c);
  }
  quad(a: number, b: number, c: number, d: number, flip = false) {
    if (flip) {
      this.tri(a, c, b);
      this.tri(a, d, c);
    } else {
      this.tri(a, b, c);
      this.tri(a, c, d);
    }
  }
  geometry() {
    const g = new BufferGeometry();
    g.setAttribute("position", new Float32BufferAttribute(this.positions, 3));
    g.setAttribute("uv", new Float32BufferAttribute(this.uvs, 2));
    g.setIndex(this.indices);
    g.computeVertexNormals();
    g.computeBoundingBox();
    g.computeBoundingSphere();
    return g;
  }
}
export function smooth(a: number, b: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}
export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
/** Weld only the lighting normals at coincident UV/material seam vertices. */
export function stitchNormals(gs: BufferGeometry[]) {
  const buckets = new Map<string, Array<[BufferGeometry, number]>>();
  for (const g of gs) {
    const a = g.getAttribute("position");
    for (let i = 0; i < a.count; i++) {
      const key = [a.getX(i), a.getY(i), a.getZ(i)]
        .map((v) => Math.round(v * 10000))
        .join(",");
      const b = buckets.get(key) || [];
      b.push([g, i]);
      buckets.set(key, b);
    }
  }
  for (const b of buckets.values()) {
    let x = 0,
      y = 0,
      z = 0;
    for (const [g, i] of b) {
      const n = g.getAttribute("normal");
      x += n.getX(i);
      y += n.getY(i);
      z += n.getZ(i);
    }
    const l = Math.hypot(x, y, z) || 1;
    for (const [g, i] of b)
      g.getAttribute("normal").setXYZ(i, x / l, y / l, z / l);
  }
}
