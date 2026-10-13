import { BufferGeometry, Float32BufferAttribute, Vector2 } from 'three';
export type ProfilePoint = [number, number];

/** True surface of revolution. Profile ordered underside -> exterior -> interior.
 * Normals use the analytic meridian tangent; angular seam normals agree exactly.
 * Indices are grouped by material, never an overlapping decal plane. */
export function revolve(profile: ProfilePoint[], segments = 240,
  options: { start?: number; material?: (segment: number, angleIndex: number) => number; uv?: (r: number, y: number, theta: number, j: number) => [number, number] } = {}) {
  const pos: number[] = [], normal: number[] = [], uv: number[] = [];
  const buckets = new Map<number, number[]>();
  const start = options.start ?? 0, rows = profile.length;
  for (let i = 0; i <= segments; i++) {
    const theta = start + i / segments * Math.PI * 2;
    for (let j = 0; j < rows; j++) {
      const [r, y] = profile[j];
      const prev = profile[Math.max(0, j - 1)], next = profile[Math.min(rows - 1, j + 1)];
      const tangent = new Vector2(next[0] - prev[0], next[1] - prev[1]).normalize();
      pos.push(r * Math.cos(theta), y, r * Math.sin(theta));
      normal.push(tangent.y * Math.cos(theta), -tangent.x, tangent.y * Math.sin(theta));
      uv.push(...(options.uv?.(r, y, theta, j) ?? [i / segments, j / (rows - 1)]));
    }
  }
  for (let j = 0; j < rows - 1; j++) for (let i = 0; i < segments; i++) {
    const a = i * rows + j, b = (i + 1) * rows + j;
    const m = options.material?.(j, i) ?? 0;
    const bucket = buckets.get(m) ?? []; buckets.set(m, bucket);
    if (profile[j][0] > 0) bucket.push(a, a + 1, b);
    if (profile[j + 1][0] > 0) bucket.push(b, a + 1, b + 1);
  }
  const g = new BufferGeometry(), indices: number[] = [];
  for (const [m, data] of buckets) { g.addGroup(indices.length, data.length, m); indices.push(...data); }
  g.setAttribute('position', new Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new Float32BufferAttribute(normal, 3));
  g.setAttribute('uv', new Float32BufferAttribute(uv, 2)); g.setIndex(indices);
  g.computeBoundingBox(); g.computeBoundingSphere(); return g;
}

export function arc(cx: number, cy: number, radius: number, from: number, to: number, steps = 10): ProfilePoint[] {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const a = from + (to - from) * i / steps;
    return [cx + radius * Math.cos(a), cy + radius * Math.sin(a)];
  });
}
