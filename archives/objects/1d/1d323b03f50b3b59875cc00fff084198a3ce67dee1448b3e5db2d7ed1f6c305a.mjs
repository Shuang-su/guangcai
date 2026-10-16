import { chromium, webkit } from "playwright";
import fs from "node:fs/promises";
import assert from "node:assert/strict";
const out = "evidence";
await fs.mkdir(out, { recursive: true });
const report = {
  started: new Date().toISOString(),
  cases: [],
  errors: [],
  devices: [],
  limits: ["Browser emulation on Mac; no physical phone tested."],
};
const engines = process.argv.includes("--webkit")
  ? [["webkit", webkit]]
  : [["chromium", chromium]];
const pause = (p) => p.waitForTimeout(850);
const state = (p) => p.evaluate(() => cupViewer.inspect());
async function check(name, fn) {
  try {
    const data = await fn();
    report.cases.push({ name, pass: true, data });
    console.log("PASS", name);
  } catch (e) {
    report.cases.push({ name, pass: false, error: String(e) });
    console.log("FAIL", name, String(e));
  }
}
for (const [name, engine] of engines) {
  let browser;
  try {
    browser = await engine.launch({
      headless: true,
      ...(name === "chromium" ? { channel: "chrome" } : {}),
      timeout: 45000,
    });
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });
    const p = await context.newPage();
    let expectedErrors = false;
    const logs = [];
    p.on("pageerror", (e) => logs.push(String(e)));
    p.on("console", (m) => {
      if (m.type() === "error" && !expectedErrors) logs.push(m.text());
    });
    await p.goto("http://127.0.0.1:5173");
    await p.waitForSelector('canvas[data-ready="true"]', { timeout: 45000 });
    await pause(p);
    const original = await state(p);
    await check(name + " initial scene", async () => {
      assert.equal(original.style, "gold");
      assert.equal(await p.locator("dialog").isVisible(), false);
      assert.equal(await p.locator("#error").isVisible(), false);
      return original;
    });
    await p.screenshot({ path: `${out}/${name}-gold-hero-1440x900.png` });
    await check(name + " mouse lid hit", async () => {
      assert.equal(await p.evaluate(() => cupViewer.pick(720, 280)), "lid");
      await p.mouse.click(720, 280);
      await pause(p);
      assert.equal((await state(p)).lidOpen, true);
    });
    await check(
      name + " handle changes style without geometry replacement",
      async () => {
        await p.evaluate(() => cupViewer.resetView());
        await pause(p);
        assert.equal(
          await p.evaluate(() => cupViewer.pick(900, 440)),
          "handle",
        );
        await p.mouse.click(900, 440);
        await p.waitForFunction(() => cupViewer.inspect().style === "white");
        assert.deepEqual((await state(p)).geometryIds, original.geometryIds);
      },
    );
    await check(name + " drag does not click handle", async () => {
      await p.mouse.move(900, 440);
      await p.mouse.down();
      await p.mouse.move(980, 470, { steps: 12 });
      await p.mouse.up();
      await pause(p);
      assert.equal((await state(p)).style, "white");
      await p.evaluate(() => cupViewer.resetView());
      await pause(p);
    });
    await check(name + " mouse wheel zoom", async () => {
      const before = await p.locator("canvas").getAttribute("data-metrics");
      await p.mouse.wheel(0, -160);
      await pause(p);
      const after = await p.locator("canvas").getAttribute("data-metrics");
      assert.notDeepEqual(JSON.parse(before).camera, JSON.parse(after).camera);
      await p.evaluate(() => cupViewer.resetView());
      await pause(p);
    });
    await check(
      name + " double click body cycles and blank resets",
      async () => {
        await p.mouse.dblclick(650, 450, { delay: 80 });
        await pause(p);
        assert.equal((await state(p)).view, "single");
        await p.mouse.dblclick(650, 450, { delay: 80 });
        await pause(p);
        assert.equal((await state(p)).view, "bottom");
        assert.ok(
          (await state(p)).cupBounds[1] > 0.01,
          "bottom clears tabletop",
        );
        await p.mouse.dblclick(100, 100, { delay: 80 });
        await pause(p);
        assert.equal((await state(p)).view, "assembly");
        assert.equal((await state(p)).style, "white");
      },
    );
    await check(name + " help and keyboard equivalents", async () => {
      await p.keyboard.press("h");
      assert.equal(await p.locator("dialog").isVisible(), true);
      await p.getByRole("button", { name: "继续观赏" }).click();
      await p.keyboard.press("l");
      await pause(p);
      assert.equal((await state(p)).lidOpen, true);
      await p.keyboard.press("v");
      await pause(p);
      assert.equal((await state(p)).view, "single");
      await p.keyboard.press("r");
      await pause(p);
      assert.equal((await state(p)).lidOpen, false);
    });
    await check(
      name + " interrupted animation and latest style wins",
      async () => {
        await p.evaluate(async () => {
          cupViewer.setView("bottom");
          setTimeout(() => cupViewer.setView("single"), 90);
          setTimeout(() => cupViewer.resetView(), 170);
          await Promise.all([
            cupViewer.setStyle("gold"),
            cupViewer.setStyle("white"),
            cupViewer.setStyle("gold"),
          ]);
        });
        await pause(p);
        const s = await state(p);
        assert.equal(s.style, "gold");
        assert.equal(s.view, "assembly");
        assert.deepEqual(s.geometryIds, original.geometryIds);
      },
    );
    await check(
      name + " failed style leaves displayed style intact",
      async () => {
        expectedErrors = true;
        const result = await p.evaluate(async () => {
          const { catalog } = await import("/src/styles/catalog.ts");
          const broken = structuredClone(catalog("high")[0]);
          broken.id = "broken";
          broken.regions.body.baseColor = {
            png: "/deliberately-missing-art.png",
          };
          try {
            await cupViewer.setStyle(broken);
            return "unexpected";
          } catch {
            return cupViewer.inspect().style;
          }
        });
        expectedErrors = false;
        assert.equal(result, "gold");
        await p.evaluate(() => cupViewer.setStyle("gold"));
      },
    );
    await check(
      name + " single image clears prior relief and metal mask",
      async () => {
        const s = await p.evaluate(async () => {
          const c = document.createElement("canvas");
          c.width = c.height = 16;
          const x = c.getContext("2d");
          x.fillStyle = "#ae3e4c";
          x.fillRect(0, 0, 16, 16);
          await cupViewer.replaceArtwork(
            "body",
            await new Promise((r) => c.toBlob(r)),
          );
          return cupViewer.inspect();
        });
        assert.deepEqual(s.regions.body, {
          normal: false,
          metalness: false,
          clearcoatNormal: false,
          metallic: 0,
        });
        assert.deepEqual(s.geometryIds, original.geometryIds);
        await p.evaluate(() => cupViewer.setStyle("gold"));
      },
    );
    await check(
      name + " uncompressed fallback keeps artwork orientation",
      async () => {
        await p.evaluate(() => cupViewer.resetView());
        await p.locator("canvas").evaluate((c) => c.blur());
        await pause(p);
        await p.screenshot({ path: `${out}/${name}-ktx-baseline.png` });
        await p.evaluate(async () => {
          const { catalog } = await import("/src/styles/catalog.ts");
          const pack = structuredClone(catalog("high")[0]);
          for (const r of Object.values(pack.regions))
            for (const v of Object.values(r))
              if (v && typeof v === "object" && "ktx2" in v) delete v.ktx2;
          pack.id = "gold-png";
          await cupViewer.setStyle(pack);
        });
        await pause(p);
        assert.equal((await state(p)).style, "gold-png");
        await p.screenshot({ path: `${out}/${name}-png-fallback.png` });
        await p.evaluate(() => cupViewer.setStyle("gold"));
      },
    );
    await check(name + " resource counts across repeated changes", async () => {
      const snapshots = [];
      for (let i = 0; i < 8; i++) {
        await p.evaluate(
          (s) => cupViewer.setStyle(s),
          i % 2 ? "gold" : "white",
        );
        await p.waitForTimeout(80);
        snapshots.push(await state(p));
      }
      assert.equal(new Set(snapshots.map((s) => s.geometries)).size, 1);
      assert.equal(new Set(snapshots.slice(1).map((s) => s.textures)).size, 1);
      return snapshots.map(({ style, geometries, textures }) => ({
        style,
        geometries,
        textures,
      }));
    });
    await check(
      name + " white style preserves gold handle and saucer",
      async () => {
        await p.evaluate(() => cupViewer.setStyle("white"));
        const s = await state(p);
        assert.equal(s.regions.handle.metalness, true);
        assert.equal(s.regions.saucer.metalness, true);
      },
    );
    await check(name + " static render rests", async () => {
      await pause(p);
      const a = (await state(p)).frameCount;
      await p.waitForTimeout(500);
      assert.equal((await state(p)).frameCount, a);
      return { stoppedAt: a };
    });
    await p.locator("canvas").evaluate((c) => c.blur());
    for (const style of ["gold", "white"]) {
      await p.evaluate((s) => cupViewer.setStyle(s), style);
      await p.evaluate(() => cupViewer.resetView());
      await pause(p);
      await p.screenshot({ path: `${out}/${name}-${style}-hero-1440x900.png` });
      for (const [view, camera, target] of [
        ["front", [0, 1.05, 4.3], [0, 0.68, 0]],
        ["side", [4.3, 1.35, 0.02], [0, 0.68, 0]],
        ["open-top", [1.65, 4.8, 2.35], [0, 0.8, 0]],
        ["bottom", [2.25, 1.82, 3.65], [0, 0.68, 0]],
        ["detail", [2.2, 1.1, 1.1], [0.25, 0.85, 0]],
      ]) {
        await p.evaluate(
          ({ view, camera, target }) => {
            cupViewer.resetView();
            if (view === "open-top") cupViewer.setLidOpen(true);
            if (view === "bottom") cupViewer.setView("bottom");
            if (view === "detail") cupViewer.setView("single");
            cupViewer.camera(camera, target);
          },
          { view, camera, target },
        );
        await pause(p);
        await p.screenshot({ path: `${out}/${name}-${style}-${view}.png` });
      }
    }
    await p.evaluate(() => {
      cupViewer.resetView();
      cupViewer.debug("uv");
    });
    await pause(p);
    await p.screenshot({ path: `${out}/${name}-uv.png` });
    await p.evaluate(() => cupViewer.debug("beauty"));
    await check(name + " warm moving frame timings", async () => {
      const data = await p.evaluate(async () => {
        const intervals = [];
        let previous = performance.now();
        for (let i = 0; i < 160; i++) {
          await new Promise(requestAnimationFrame);
          const now = performance.now();
          if (i >= 40) intervals.push(now - previous);
          previous = now;
          cupViewer.camera([
            Math.sin(i * 0.01) * 3.8,
            1.82,
            Math.cos(i * 0.01) * 3.8,
          ]);
        }
        intervals.sort((a, b) => a - b);
        const gl = document.querySelector("canvas").getContext("webgl2");
        const e = gl?.getExtension("WEBGL_debug_renderer_info");
        return {
          p50: intervals[Math.floor(intervals.length * 0.5)],
          p95: intervals[Math.floor(intervals.length * 0.95)],
          renderer: e
            ? gl.getParameter(e.UNMASKED_RENDERER_WEBGL)
            : "unavailable",
          state: cupViewer.inspect(),
          resources: performance
            .getEntriesByType("resource")
            .reduce((s, r) => s + r.transferSize, 0),
        };
      });
      return data;
    });
    report.devices.push({
      engine: name,
      version: browser.version(),
      viewport: "1440x900",
      state: await state(p),
    });
    await p.setViewportSize({ width: 1920, height: 1080 });
    await p.evaluate(() => cupViewer.resetView());
    await pause(p);
    await p.screenshot({ path: `${out}/${name}-white-hero-1920x1080.png` });
    await check(name + " no unexpected browser errors", async () => {
      assert.deepEqual(logs, []);
    });
    await context.close();
    for (const size of [
      { width: 390, height: 844 },
      { width: 430, height: 932 },
      { width: 844, height: 390 },
    ]) {
      const c = await browser.newContext({
        viewport: size,
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
      });
      const page = await c.newPage();
      await page.goto("http://127.0.0.1:5173");
      await page.waitForSelector('canvas[data-ready="true"]');
      await pause(page);
      await check(`${name} touch ${size.width}x${size.height}`, async () => {
        const w = size.width,
          h = size.height;
        const candidates = [];
        for (let y = 0.25; y < 0.73; y += 0.08)
          for (let x = 0.3; x < 0.86; x += 0.06)
            candidates.push([w * x, h * y]);
        const points = await page.evaluate((points) => {
          const out = {};
          for (const [x, y] of points) {
            const hit = cupViewer.pick(x, y);
            if (["body", "handle", "lid"].includes(hit) && !out[hit])
              out[hit] = [x, y];
          }
          return out;
        }, candidates);
        assert.ok(
          points.lid && points.handle && points.body,
          JSON.stringify(points),
        );
        await page.touchscreen.tap(...points.lid);
        await pause(page);
        assert.equal((await state(page)).lidOpen, true);
        await page.touchscreen.tap(...points.handle);
        await page.waitForFunction(() => cupViewer.inspect().style === "white");
        await page.touchscreen.tap(...points.body);
        await page.waitForTimeout(90);
        await page.touchscreen.tap(...points.body);
        await pause(page);
        assert.equal((await state(page)).view, "single");
        await page.touchscreen.tap(20, 20);
        await page.waitForTimeout(90);
        await page.touchscreen.tap(20, 20);
        await pause(page);
        assert.equal((await state(page)).view, "assembly");
        return points;
      });
      await page.screenshot({
        path: `${out}/${name}-white-mobile-${size.width}x${size.height}.png`,
      });
      report.devices.push({
        engine: name,
        viewport: `${size.width}x${size.height}`,
        emulated: true,
        state: await state(page),
      });
      await c.close();
    }
    const reduced = await browser.newContext({
      reducedMotion: "reduce",
      viewport: { width: 1440, height: 900 },
    });
    const rp = await reduced.newPage();
    await rp.goto("http://127.0.0.1:5173");
    await rp.waitForSelector('canvas[data-ready="true"]');
    await check(name + " reduced motion", async () => {
      await rp.evaluate(() => cupViewer.setView("bottom"));
      await rp.waitForTimeout(40);
      assert.equal((await state(rp)).view, "bottom");
    });
    await check(name + " dispose releases GPU geometry", async () => {
      const result = await rp.evaluate(() => {
        const api = cupViewer;
        api.dispose();
        return api.inspect();
      });
      assert.equal(result.geometries, 0);
    });
    await reduced.close();
  } catch (e) {
    report.errors.push({ engine: name, error: String(e), stack: e.stack });
    console.log("ENGINE FAILED", name, String(e));
  } finally {
    await browser?.close();
  }
}
await fs.writeFile(
  `${out}/verification-${engines[0][0]}.json`,
  JSON.stringify(report, null, 2),
);
console.log(
  JSON.stringify(
    {
      cases: report.cases.length,
      failures: report.cases.filter((c) => !c.pass),
      errors: report.errors,
    },
    null,
    2,
  ),
);
if (report.errors.length || report.cases.some((c) => !c.pass))
  process.exitCode = 1;
