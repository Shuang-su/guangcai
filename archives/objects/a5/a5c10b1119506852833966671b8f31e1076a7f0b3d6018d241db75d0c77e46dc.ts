import { BufferGeometry } from "three";
import { GeometryParams } from "./parameters";
import { contour, flute } from "./contour";
import { Surface, lerp, stitchNormals } from "./surface";
export type PartMaterial =
  | "porcelain"
  | "body"
  | "handle"
  | "saucer"
  | "gold"
  | "foot"
  | "bottom";
export interface Part {
  geometry: BufferGeometry;
  material: PartMaterial;
  name: string;
}
type Ring = {
  y: number;
  inset: number;
  region: "outer" | "inner" | "gold" | "foot" | "under";
  scale?: number;
};
export function makeBody(p: GeometryParams): Part[] {
  const arcN = p.quality === "high" ? 200 : 128,
    flatN = p.fluteCount * 10,
    rings: Ring[] = [];
  const add = (
    y: number,
    inset: number,
    region: Ring["region"],
    scale?: number,
  ) => rings.push({ y, inset, region, scale });
  // Closed porcelain cross section, travelling outer foot -> lip -> cavity -> floor -> underside.
  for (let i = 0; i <= 8; i++) {
    const a = ((i / 8) * Math.PI) / 2;
    add(
      p.footInset * (1 - Math.cos(a)),
      p.footInset * (1 - Math.sin(a)),
      "outer",
    );
  }
  const levels = p.quality === "high" ? 72 : 44;
  for (let i = 1; i <= levels; i++)
    add(lerp(p.footInset, p.height - p.lipRadius, i / levels), 0, "outer");
  for (let i = 1; i <= 16; i++) {
    const a = (i / 16) * Math.PI;
    add(
      p.height - p.lipRadius + Math.sin(a) * p.lipRadius,
      (p.wallThickness / 2) * (1 - Math.cos(a)),
      i < 10 ? "gold" : "inner",
    );
  }
  for (let i = 1; i <= 30; i++)
    add(
      lerp(
        p.height - p.lipRadius,
        p.bottomThickness + p.innerFloorRadius,
        i / 30,
      ),
      p.wallThickness,
      "inner",
    );
  for (let i = 1; i <= 8; i++) {
    const a = ((i / 8) * Math.PI) / 2;
    add(
      p.bottomThickness + p.innerFloorRadius - p.innerFloorRadius * Math.sin(a),
      p.wallThickness + p.innerFloorRadius * (1 - Math.cos(a)),
      "inner",
    );
  }
  add(p.bottomThickness, p.wallThickness + p.innerFloorRadius, "inner", 0.72);
  add(p.bottomThickness, p.wallThickness + p.innerFloorRadius, "inner", 0.32);
  add(p.bottomThickness, p.wallThickness + p.innerFloorRadius, "inner", 0);
  // The two separate centre fans are joined through the solid floor, not a hollow tube.
  add(p.bottomRecessDepth, 4, "under", 0);
  add(p.bottomRecessDepth, 4, "under", 0.32);
  add(p.bottomRecessDepth, 4, "under", 0.75);
  add(p.bottomRecessDepth, 4, "under");
  add(0.6, 3.2, "under");
  add(0, p.footInset + p.footWidth, "foot");
  add(0, p.footInset, "foot");
  const buckets = new Map<PartMaterial, Surface>();
  for (const m of ["body", "porcelain", "gold", "foot", "bottom"] as const)
    buckets.set(m, new Surface());
  const positions = rings.map((row) => {
    const r =
      lerp(
        p.radiusBottom,
        p.radiusTop,
        Math.max(0, Math.min(1, row.y / p.height)),
      ) - row.inset;
    const pts = contour(
      r,
      p.flatCutDepth,
      Math.max(0.7, p.flatTransitionRadius - row.inset),
      arcN,
      flatN,
    );
    return pts.map((q) => {
      let x = q.x,
        z = q.z;
      if (row.region === "outer" && q.flatT !== undefined) {
        let rootFade = 1;
        for (const ry of [p.handleBottom, p.handleTop])
          rootFade *=
            1 -
            Math.exp(
              -(((row.y - ry) / p.fluteRootHeightFade) ** 2) -
                (z / p.fluteRootWidthFade) ** 2,
            ) *
              0.88;
        x +=
          flute(
            q.flatT,
            row.y,
            p.height,
            p.fluteCount,
            p.fluteDepth,
            p.fluteEdgeFade,
          ) * rootFade;
      }
      return { ...q, x: x * (row.scale ?? 1), z: z * (row.scale ?? 1) };
    });
  });
  for (let j = 0; j < rings.length - 1; j++) {
    const a = rings[j],
      b = rings[j + 1],
      n = positions[j].length;
    if (a.scale === 0 && b.scale === 0) continue;
    for (let k = 0; k < n; k++) {
      const next = (k + 1) % n;
      let m: PartMaterial = "porcelain";
      if (a.region === "under" && b.region === "under") m = "bottom";
      else if (a.region === "foot" && b.region === "foot") m = "foot";
      else if (
        (a.region === "outer" && b.region === "gold") ||
        a.region === "gold"
      )
        m = "gold";
      else if (a.region === "outer" && b.region === "outer" && k < arcN)
        m = "body";
      const s = buckets.get(m)!;
      const uv = (ri: number, ki: number): [number, number] => [
        positions[ri][ki].u,
        rings[ri].y / p.height,
      ];
      const ids = [
        [j, k],
        [j, next],
        [j + 1, next],
        [j + 1, k],
      ].map(([ri, ki]) =>
        s.add(
          [positions[ri][ki].x, rings[ri].y, positions[ri][ki].z],
          ...uv(ri, ki),
        ),
      );
      if (a.scale === 0) s.tri(ids[0], ids[3], ids[2]);
      else if (b.scale === 0) s.tri(ids[0], ids[2], ids[1]);
      else s.quad(...(ids as [number, number, number, number]), true);
    }
  }
  const out = [...buckets].map(([material, s]) => ({
    geometry: s.geometry(),
    material,
    name: material === "body" ? "body-art" : `body-${material}`,
  }));
  stitchNormals(out.map((x) => x.geometry));
  return out;
}
