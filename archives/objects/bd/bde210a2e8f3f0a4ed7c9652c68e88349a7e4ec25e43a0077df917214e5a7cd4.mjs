import { chromium, webkit } from "playwright";
import fs from "node:fs/promises";
import assert from "node:assert/strict";
const results = [];
async function test(name, fn) {
  try {
    results.push({ name, pass: true, data: await fn() });
    console.log("PASS", name);
  } catch (e) {
    results.push({ name, pass: false, error: String(e) });
    console.log("FAIL", name, String(e));
  }
}
const b = await chromium.launch({ channel: "chrome", headless: true });
const c = await b.newContext({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
  isMobile: true,
  deviceScaleFactor: 2,
});
const p = await c.newPage();
await p.goto("http://127.0.0.1:5173");
await p.waitForSelector('canvas[data-ready="true"]');
const cd = await c.newCDPSession(p);
const touch = (type, pts) =>
  cd.send("Input.dispatchTouchEvent", {
    type,
    touchPoints: pts.map(([x, y], id) => ({ x, y, id })),
  });
await test("trusted touch drag and pinch suppress clicks", async () => {
  const a = await p.evaluate(() => cupViewer.inspect());
  await touch("touchStart", [[180, 420]]);
  for (let i = 0; i < 12; i++)
    await touch("touchMove", [[180 + i * 5, 420 + i]]);
  await touch("touchEnd", []);
  await p.waitForTimeout(500);
  assert.equal((await p.evaluate(() => cupViewer.inspect())).style, a.style);
  const before = JSON.parse(
    await p.locator("canvas").getAttribute("data-metrics"),
  ).camera;
  await touch("touchStart", [
    [130, 420],
    [240, 420],
  ]);
  for (let i = 0; i < 12; i++)
    await touch("touchMove", [
      [130 - i * 3, 420],
      [240 + i * 3, 420],
    ]);
  await touch("touchEnd", []);
  await p.waitForTimeout(700);
  const after = JSON.parse(
    await p.locator("canvas").getAttribute("data-metrics"),
  ).camera;
  assert.notDeepEqual(before, after);
  assert.equal((await p.evaluate(() => cupViewer.inspect())).style, a.style);
  assert.equal((await p.evaluate(() => cupViewer.inspect())).lidOpen, false);
  return { before, after };
});
await test("long press blank opens temporary instructions", async () => {
  await touch("touchStart", [[20, 20]]);
  await p.waitForTimeout(750);
  await touch("touchEnd", []);
  assert.equal(await p.locator("dialog").isVisible(), true);
  await p.getByRole("button", { name: "继续观赏" }).tap();
});
await test("orientation change retains current style and functional view", async () => {
  await p.evaluate(() => cupViewer.setStyle("white"));
  await p.setViewportSize({ width: 844, height: 390 });
  await p.waitForTimeout(400);
  assert.equal((await p.evaluate(() => cupViewer.inspect())).style, "white");
  await p.screenshot({ path: "evidence/chromium-rotated-landscape.png" });
  await p.setViewportSize({ width: 390, height: 844 });
  await p.evaluate(() => cupViewer.resetView());
  await p.waitForTimeout(900);
  assert.equal((await p.evaluate(() => cupViewer.inspect())).view, "assembly");
});
await test("mobile warm frame timings", async () => {
  return await p.evaluate(async () => {
    const times = [];
    let previous = performance.now();
    for (let i = 0; i < 150; i++) {
      await new Promise(requestAnimationFrame);
      const now = performance.now();
      if (i > 40) times.push(now - previous);
      previous = now;
      cupViewer.camera([
        Math.sin(i * 0.01) * 5.5,
        2.35,
        Math.cos(i * 0.01) * 5.5,
      ]);
    }
    times.sort((a, b) => a - b);
    return {
      p50: times[Math.floor(times.length * 0.5)],
      p95: times[Math.floor(times.length * 0.95)],
      state: cupViewer.inspect(),
    };
  });
});
await b.close();
const disabled = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: ["--disable-webgl"],
});
const dp = await disabled.newPage();
await test("WebGL unavailable shows explicit message", async () => {
  await dp.goto("http://127.0.0.1:5173");
  await dp.locator("#error").waitFor({ state: "visible" });
  const text = await dp.locator("#error").innerText();
  assert.match(text, /暂时无法完成显示/);
  await dp.screenshot({ path: "evidence/webgl-unavailable.png" });
  return text;
});
await disabled.close();
await fs.writeFile(
  "evidence/verification-extra.json",
  JSON.stringify(results, null, 2),
);
if (results.some((r) => !r.pass)) process.exitCode = 1;
