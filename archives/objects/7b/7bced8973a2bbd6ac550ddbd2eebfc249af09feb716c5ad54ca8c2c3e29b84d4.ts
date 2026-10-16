import { test } from "node:test";
import assert from "node:assert/strict";
import { defaults, validateParams } from "../src/geometry/parameters.ts";
import { makeBody } from "../src/geometry/body.ts";
import {
  makeHandle,
  makeLid,
  makeSaucer,
} from "../src/geometry/accessories.ts";
import { contour, flute } from "../src/geometry/contour.ts";
const p = { ...defaults };
function audit(parts: ReturnType<typeof makeBody>) {
  let volume = 0,
    triangles = 0;
  const edges = new Map<string, number>();
  for (const { geometry: g } of parts) {
    const a = g.getAttribute("position"),
      n = g.getAttribute("normal"),
      uv = g.getAttribute("uv"),
      index = g.index!;
    for (let i = 0; i < a.count; i++) {
      for (const v of [
        a.getX(i),
        a.getY(i),
        a.getZ(i),
        n.getX(i),
        n.getY(i),
        n.getZ(i),
        uv.getX(i),
        uv.getY(i),
      ])
        assert.ok(Number.isFinite(v));
      assert.ok(Math.hypot(n.getX(i), n.getY(i), n.getZ(i)) > 0.9);
    }
    const point = (i: number) => [a.getX(i), a.getY(i), a.getZ(i)];
    const key = (i: number) =>
      point(i)
        .map((x) => Math.round(x * 1000))
        .join(",");
    for (let j = 0; j < index.count; j += 3) {
      const ids = [index.getX(j), index.getX(j + 1), index.getX(j + 2)];
      for (const i of ids) assert.ok(i >= 0 && i < a.count);
      const [A, B, C] = ids.map(point),
        u = B.map((x, i) => x - A[i]),
        v = C.map((x, i) => x - A[i]),
        cross = [
          u[1] * v[2] - u[2] * v[1],
          u[2] * v[0] - u[0] * v[2],
          u[0] * v[1] - u[1] * v[0],
        ];
      assert.ok(Math.hypot(...cross) > 1e-8, "nondegenerate triangle");
      volume +=
        (A[0] * (B[1] * C[2] - B[2] * C[1]) +
          A[1] * (B[2] * C[0] - B[0] * C[2]) +
          A[2] * (B[0] * C[1] - B[1] * C[0])) /
        6;
      triangles++;
      for (let k = 0; k < 3; k++) {
        const e = [key(ids[k]), key(ids[(k + 1) % 3])].sort().join("|");
        edges.set(e, (edges.get(e) || 0) + 1);
      }
    }
  }
  const bad = [...edges].filter(([, count]) => count !== 2);
  assert.equal(
    bad.length,
    0,
    `closed surface, first open edges ${JSON.stringify(bad.slice(0, 3))}`,
  );
  assert.ok(volume > 0, "outward winding and positive volume");
  return { volume, triangles };
}
for (const [name, fn] of [
  ["body", makeBody],
  ["handle", makeHandle],
  ["lid", makeLid],
  ["saucer", makeSaucer],
] as const)
  test(`${name}: closed, finite, outward, nondegenerate mesh`, () => {
    const a = audit(fn(p));
    assert.ok(a.triangles > 100);
  });
test("D section has an actual flat side and tangent circular transitions", () => {
  const pts = contour(42.5, 9.5, 4, 200, 160),
    flat = pts.filter((p) => p.flatT !== undefined);
  for (const q of flat) assert.equal(q.x, 33);
  assert.ok(pts.some((p) => p.x < -42));
  assert.ok(flat.at(-1)!.z - flat[0].z > 40);
});
test("flutes displace geometry and fade at edges", () => {
  assert.equal(flute(0, 60, 112, 16, 0.42, 0.12), 0);
  assert.equal(flute(1, 60, 112, 16, 0.42, 0.12), 0);
  assert.ok(Math.abs(flute(0.5, 60, 112, 16, 0.42, 0.12)) > 0.4);
});
test("body artwork UV uses only outer arc, stays in 0..1", () => {
  const part = makeBody(p).find((p) => p.material === "body")!,
    a = part.geometry.getAttribute("position"),
    uv = part.geometry.getAttribute("uv");
  for (let i = 0; i < a.count; i++) {
    assert.ok(a.getX(i) < 33);
    assert.ok(uv.getX(i) >= 0 && uv.getX(i) <= 1);
    assert.ok(uv.getY(i) >= 0 && uv.getY(i) <= 1);
  }
});
test("changing quality preserves exact flat section and support bounds", () => {
  for (const quality of ["high", "medium"] as const) {
    const parts = makeBody({ ...p, quality });
    let min = Infinity,
      max = -Infinity;
    for (const { geometry: g } of parts) {
      g.computeBoundingBox();
      min = Math.min(min, g.boundingBox!.min.y);
      max = Math.max(max, g.boundingBox!.max.y);
    }
    assert.equal(min, 0);
    assert.ok(Math.abs(max - p.height) < 1e-5);
  }
});
test("reject parameters that break physical wall or floor", () => {
  for (const change of [
    { wallThickness: 20 },
    { bottomRecessDepth: 5 },
    { fluteDepth: 2 },
    { flatCutDepth: 35 },
    { height: NaN },
    { handleBottom: 100 },
  ])
    assert.throws(() => validateParams({ ...p, ...change }));
});
test("minimum wall clearance survives waves at several heights", () => {
  let minimum = Infinity;
  for (const y of [8, 29, 56, 94, 104]) {
    const radius =
      p.radiusBottom + ((p.radiusTop - p.radiusBottom) * y) / p.height;
    const outer = contour(
        radius,
        p.flatCutDepth,
        p.flatTransitionRadius,
        600,
        640,
      ),
      inner = contour(
        radius - p.wallThickness,
        p.flatCutDepth,
        Math.max(0.7, p.flatTransitionRadius - p.wallThickness),
        600,
        640,
      );
    for (const q of outer) {
      const x =
        q.x +
        (q.flatT === undefined
          ? 0
          : flute(
              q.flatT,
              y,
              p.height,
              p.fluteCount,
              p.fluteDepth,
              p.fluteEdgeFade,
            ));
      for (let i = 0; i < inner.length; i++) {
        const a = inner[i],
          b = inner[(i + 1) % inner.length],
          dx = b.x - a.x,
          dz = b.z - a.z,
          t = Math.max(
            0,
            Math.min(
              1,
              ((x - a.x) * dx + (q.z - a.z) * dz) / (dx * dx + dz * dz),
            ),
          );
        minimum = Math.min(
          minimum,
          Math.hypot(x - a.x - dx * t, q.z - a.z - dz * t),
        );
      }
    }
  }
  assert.ok(minimum > 2.35, `minimum sampled wall ${minimum} mm`);
});
test("quality preserves decorated surface U/V anchors", () => {
  for (const fn of [makeBody, makeHandle]) {
    const limits = [];
    for (const quality of ["high", "medium"] as const) {
      const art = fn({ ...p, quality }).find(
        (x) => x.material === (fn === makeBody ? "body" : "handle"),
      )!;
      const u = art.geometry.getAttribute("uv");
      const mid = [];
      for (let i = 0; i < u.count; i++)
        if (Math.abs(u.getX(i) - 0.5) < 1e-6) mid.push(u.getY(i));
      assert.ok(mid.length > 0);
      limits.push([Math.min(...mid), Math.max(...mid)]);
    }
    assert.ok(Math.abs(limits[0][0] - limits[1][0]) < 1e-5);
    assert.ok(Math.abs(limits[0][1] - limits[1][1]) < 1e-5);
  }
});
