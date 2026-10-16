import { Vector3 } from "three";
import { GeometryParams } from "./parameters";
import { Part, PartMaterial } from "./body";
import { ribbon } from "./ribbon";
import { Surface, stitchNormals } from "./surface";
type Profile = [number, number, PartMaterial];
export function lathe(profile: Profile[], n: number, name: string): Part[] {
  const surfaces = new Map<PartMaterial, Surface>();
  for (let j = 0; j < profile.length - 1; j++) {
    const [r0, y0, m] = profile[j],
      [r1, y1] = profile[j + 1];
    if (!surfaces.has(m)) surfaces.set(m, new Surface());
    const s = surfaces.get(m)!;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * 2 * Math.PI,
        b = ((i + 1) / n) * 2 * Math.PI;
      const ids = [
        [r0, y0, a, i / n],
        [r0, y0, b, (i + 1) / n],
        [r1, y1, b, (i + 1) / n],
        [r1, y1, a, i / n],
      ].map(([r, y, q, u]) =>
        s.add([r * Math.cos(q), y, r * Math.sin(q)], u, (y - 3) / 10),
      );
      if (r0 === 0) s.tri(ids[0], ids[3], ids[2]);
      else if (r1 === 0) s.tri(ids[0], ids[2], ids[1]);
      else s.quad(...(ids as [number, number, number, number]), true);
    }
  }
  const out = [...surfaces].map(([material, s]) => ({
    geometry: s.geometry(),
    material,
    name: `${name}-${material}`,
  }));
  stitchNormals(out.map((x) => x.geometry));
  return out;
}
export function makeHandle(p: GeometryParams) {
  const x = p.radiusTop - p.flatCutDepth - 0.8,
    y = p.handleTop,
    b = p.handleBottom,
    r = p.handleReach;
  return ribbon(
    [
      new Vector3(x, y, 0),
      new Vector3(x + r * 0.74, y - 0.8, 0),
      new Vector3(x + r, y - 5, 0),
      new Vector3(x + r * 0.97, y - 24, 0),
      new Vector3(x + r * 0.7, b + 12, 0),
      new Vector3(x + 5, b + 1, 0),
      new Vector3(x, b, 0),
    ],
    p.handleWidth,
    p.handleThickness,
    p.quality === "high" ? 160 : 96,
    "handle",
    true,
    false,
    {
      rootFlare: p.handleRootFlare,
      rootBlend: p.handleRootBlend,
      ribDepth: 0,
      ribCount: 1,
    },
  );
}
export function makeLid(p: GeometryParams) {
  const R = p.lidRadius,
    h = p.lidThickness,
    n = p.quality === "high" ? 200 : 128;
  const parts = lathe(
    [
      [0, h, "porcelain"],
      [R * 0.5, h - 0.1, "porcelain"],
      [R - 2, h - 1, "porcelain"],
      [R - 0.5, h - 1.4, "gold"],
      [R, h - 2, "gold"],
      [R - 0.2, h - 2.6, "gold"],
      [R - 1.2, h - 3, "porcelain"],
      [
        Math.min(
          p.radiusTop - 4,
          p.radiusTop - p.flatCutDepth - p.wallThickness - 1,
        ),
        0.2,
        "porcelain",
      ],
      [
        Math.min(
          p.radiusTop - 4,
          p.radiusTop - p.flatCutDepth - p.wallThickness - 1,
        ),
        0.2 - p.lidLocatorDepth,
        "porcelain",
      ],
      [
        Math.min(
          p.radiusTop - 4 - p.lidLocatorWall,
          p.radiusTop - p.flatCutDepth - p.wallThickness - 1 - p.lidLocatorWall,
        ),
        -p.lidLocatorDepth,
        "porcelain",
      ],
      [
        Math.min(
          p.radiusTop - 4 - p.lidLocatorWall,
          p.radiusTop - p.flatCutDepth - p.wallThickness - 1 - p.lidLocatorWall,
        ),
        0.1,
        "porcelain",
      ],
      [0, 0.3, "porcelain"],
    ],
    n,
    "lid",
  );
  // This profile traverses outward then downward: flip to face away from the solid.
  for (const part of parts) {
    const ix = part.geometry.index!;
    for (let i = 0; i < ix.count; i += 3) {
      const b = ix.getX(i + 1);
      ix.setX(i + 1, ix.getX(i + 2));
      ix.setX(i + 2, b);
    }
    part.geometry.computeVertexNormals();
  }
  stitchNormals(parts.map((x) => x.geometry));
  const span = p.knobSpan / 2,
    H = p.knobHeight;
  const knob = ribbon(
    [
      new Vector3(-span, h - 0.5, 0),
      new Vector3(-span * 0.85, h + H * 0.55, 0),
      new Vector3(0, h + H, 0),
      new Vector3(span * 0.85, h + H * 0.55, 0),
      new Vector3(span, h - 0.5, 0),
    ],
    p.knobWidth,
    p.knobThickness,
    100,
    "knob",
    false,
    true,
    {
      rootFlare: p.handleRootFlare,
      rootBlend: p.handleRootBlend,
      ribDepth: p.knobFluteDepth,
      ribCount: p.knobFluteCount,
    },
  );
  return [...parts, ...knob];
}
export function makeSaucer(p: GeometryParams) {
  const r = p.saucerRadius,
    h = p.saucerHeight;
  const parts = lathe(
    [
      [0, 3, "porcelain"],
      [40, 3, "porcelain"],
      [44, 3.2, "porcelain"],
      [51, 3.7, "porcelain"],
      [60, 5, "porcelain"],
      [r - 4, h - 2.2, "porcelain"],
      [r - 1, h - 0.6, "gold"],
      [r, h - 1, "gold"],
      [r - 0.1, h - 2, "saucer"],
      [r - 1.1, h - 4, "saucer"],
      [r - 3.5, 4, "saucer"],
      [r - 4.6, 2, "gold"],
      [r - 6, 1.6, "gold"],
      [47, 1.6, "porcelain"],
      [45, 0, "foot"],
      [42.5, 0, "porcelain"],
      [41, 1.4, "porcelain"],
      [0, 1.5, "porcelain"],
    ],
    p.quality === "high" ? 256 : 160,
    "saucer",
  ).map((part) => {
    const ix = part.geometry.index!;
    for (let i = 0; i < ix.count; i += 3) {
      const b = ix.getX(i + 1);
      ix.setX(i + 1, ix.getX(i + 2));
      ix.setX(i + 2, b);
    }
    part.geometry.computeVertexNormals();
    return part;
  });
  stitchNormals(parts.map((x) => x.geometry));
  return parts;
}
