import fs from "node:fs/promises";
import { defaults } from "../src/geometry/parameters.ts";
import { makeBody } from "../src/geometry/body.ts";
import { makeHandle, makeSaucer } from "../src/geometry/accessories.ts";
const specs = [
  ["body", makeBody(defaults), "body"],
  ["handle", makeHandle(defaults), "handle"],
  ["saucer", makeSaucer(defaults), "saucer"],
] as const;
const layout: any = {
  id: "guangcai-v1",
  orientation: "U increases along surface travel; V up. Image top is V=1.",
  params: defaults,
  regions: {},
};
await fs.mkdir("assets/uv", { recursive: true });
for (const [name, parts, material] of specs) {
  const g = parts.find((x) => x.material === material)!.geometry,
    u = g.getAttribute("uv"),
    ix = g.index!,
    edges = new Map<string, { a: number[]; b: number[]; count: number }>();
  let minU = Infinity,
    maxU = -Infinity,
    minV = Infinity,
    maxV = -Infinity;
  const p = (i: number) => [u.getX(i), u.getY(i)];
  const key = (v: number[]) => v.map((x) => x.toFixed(6)).join(",");
  for (let i = 0; i < u.count; i++) {
    minU = Math.min(minU, u.getX(i));
    maxU = Math.max(maxU, u.getX(i));
    minV = Math.min(minV, u.getY(i));
    maxV = Math.max(maxV, u.getY(i));
  }
  for (let i = 0; i < ix.count; i += 3)
    for (let k = 0; k < 3; k++) {
      const a = p(ix.getX(i + k)),
        b = p(ix.getX(i + ((k + 1) % 3)));
      const id = [key(a), key(b)].sort().join("|");
      const old = edges.get(id);
      if (old) old.count++;
      else edges.set(id, { a, b, count: 1 });
    }
  const W = 1600,
    H = 1000,
    L = 80,
    T = 100,
    CW = 1440,
    CH = 800;
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="#fff"/><text x="80" y="45" font-family="sans-serif" font-size="27">${name} • guangcai-v1 • normalized UV (not a physical cutting scale)</text><text x="80" y="78" font-family="sans-serif" font-size="18">V=1 at top; U=0 left → U=1 right. Red outline = actual decorated surface boundary.</text>`;
  for (let y = 0; y < 8; y++)
    for (let x = 0; x < 12; x++) {
      svg += `<rect x="${L + (x * CW) / 12}" y="${T + (y * CH) / 8}" width="${CW / 12}" height="${CH / 8}" fill="${(x + y) % 2 ? "#d0d7de" : "#f1eee4"}"/><text x="${L + (x * CW) / 12 + 10}" y="${T + (y * CH) / 8 + 45}" font-family="monospace" font-size="22">${x},${7 - y}</text>`;
    }
  const boundary = [...edges.values()].filter((e) => e.count === 1);
  for (const { a, b } of boundary)
    svg += `<path d="M ${L + a[0] * CW} ${T + (1 - a[1]) * CH} L ${L + b[0] * CW} ${T + (1 - b[1]) * CH}" fill="none" stroke="#bf253d" stroke-width="3"/>`;
  svg += `<text x="80" y="950" font-family="monospace" font-size="19">U [${minU.toFixed(4)}, ${maxU.toFixed(4)}], V [${minV.toFixed(4)}, ${maxV.toFixed(4)}]. Subdivision changes do not change UV origin or direction.</text></svg>`;
  await fs.writeFile(`assets/uv/${name}-template.svg`, svg);
  layout.regions[name] = {
    minU,
    maxU,
    minV,
    maxV,
    decoratedBoundarySegments: boundary.length,
    repeatU: name === "body" ? 1 : name === "handle" ? 1.8 : 8,
  };
  for (const p of parts) p.geometry.dispose();
}
const p = defaults,
  cx = p.radiusTop - p.flatCutDepth - p.flatTransitionRadius,
  cz = Math.sqrt((p.radiusTop - p.flatTransitionRadius) ** 2 - cx ** 2);
layout.regions.body.topArcLengthMm =
  p.radiusTop * (2 * Math.PI - 2 * Math.atan2(cz, cx));
await fs.writeFile("assets/uv/layout.json", JSON.stringify(layout, null, 2));
console.log("Actual geometry UV boundaries and numbered templates exported.");
