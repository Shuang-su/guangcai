import { test } from "node:test";
import assert from "node:assert/strict";
import { MeshPhysicalMaterial } from "three";
import { MaterialLibrary } from "../src/materials/materials.ts";
const style = (id: string) =>
  ({
    id,
    label: id,
    uvLayout: "guangcai-v1",
    master: "test",
    regions: { body: { id }, handle: { id }, saucer: { id } },
  }) as any;
function harness() {
  const applied: string[] = [];
  const lib = Object.create(MaterialLibrary.prototype) as MaterialLibrary;
  Object.assign(lib, {
    generation: 0,
    active: {},
    disposed: false,
    apply: (m: any) => applied.push(m.body.name),
  });
  return { lib, applied };
}
test("a complete style switches once, after all three regions finish", async () => {
  const { lib, applied } = harness();
  lib.create = async (m: any, r) => {
    await new Promise((ok) => setTimeout(ok, r === "body" ? 10 : 0));
    const mat = new MeshPhysicalMaterial();
    mat.name = m.id;
    return mat;
  };
  await lib.setStyle(style("white"));
  assert.deepEqual(applied, ["white"]);
  assert.equal(Object.keys(lib.active).length, 3);
  lib.release(lib.active);
});
test("failed style preserves the previous material set and releases staged materials", async () => {
  const { lib, applied } = harness();
  let disposed = 0;
  lib.create = async (m: any, r) => {
    if (m.id === "broken" && r === "handle") throw Error("missing map");
    const mat = new MeshPhysicalMaterial();
    mat.name = m.id;
    mat.addEventListener("dispose", () => disposed++);
    return mat;
  };
  await lib.setStyle(style("gold"));
  const before = lib.active;
  await assert.rejects(lib.setStyle(style("broken")));
  assert.equal(lib.active, before);
  assert.deepEqual(applied, ["gold"]);
  assert.equal(disposed, 2);
  lib.release(lib.active);
});
test("latest style wins even when an older request fails later", async () => {
  const { lib, applied } = harness();
  lib.create = async (m: any, r) => {
    if (m.id === "old") {
      await new Promise((ok) => setTimeout(ok, 15));
      if (r === "body") throw Error("late failure");
    }
    const mat = new MeshPhysicalMaterial();
    mat.name = m.id;
    return mat;
  };
  const old = lib.setStyle(style("old"));
  const latest = lib.setStyle(style("new"));
  assert.equal(await latest, true);
  assert.equal(await old, false);
  assert.deepEqual(applied, ["new"]);
  lib.release(lib.active);
});
test("a mismatched UV contract is rejected without loading", async () => {
  const { lib } = harness();
  lib.create = async () => {
    throw Error("must not load");
  };
  await assert.rejects(
    lib.setStyle({ ...style("invalid"), uvLayout: "other" }),
    /UV layout/,
  );
});
