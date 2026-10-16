import { chromium } from "playwright";
import assert from "node:assert/strict";
import sharp from "sharp";
import { mkdir, writeFile, readFile } from "node:fs/promises";
const url = process.env.QA_URL ?? "http://127.0.0.1:5177";
const output = "evidence";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const checks = [],
  errors = [],
  requests = [];
const record = (name, detail = true) => {
  assert.ok(detail, name);
  checks.push({ name, passed: true, detail });
  console.log("PASS", name);
};
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  hasTouch: true,
  isMobile: true,
  recordVideo: { dir: output, size: { width: 390, height: 844 } },
});
const page = await context.newPage();
page.on("pageerror", (e) => errors.push(e.message));
page.on("request", (req) => requests.push(req.url()));
const state = () => page.evaluate(() => window.h5Debug());
const shot = async (name) => {
  await page.waitForTimeout(450);
  await page.screenshot({
    path: `${output}/${name}.png`,
    fullPage:
      !name.includes("intro") && !(await page.locator("#viewer-host").count()),
  });
};
const waitViewer = () => page.waitForSelector("#viewer-host[data-ready=true]");
try {
  await page.goto(url);
  await page.waitForSelector(".intro-stage");
  record(
    "first visit enters scroll opening",
    (await state()).route === "/intro",
  );
  record(
    "opening does not fetch Three.js or 3DGS",
    !requests.some((u) =>
      /cup-viewer|three\.|\.sog|\.splat|\.ply|\.ksplat/i.test(u),
    ),
  );
  await shot("mobile-intro-start");
  await page.mouse.wheel(0, 900);
  await page.waitForTimeout(450);
  const p1 = await page.locator(".intro-stage").getAttribute("data-progress");
  record("scroll changes opening progress", Number(p1) > 0.2);
  const transform1 = await page
    .locator(".intro-cup")
    .evaluate((el) => getComputedStyle(el).transform);
  await shot("mobile-intro-middle");
  await page.mouse.wheel(0, -350);
  await page.waitForTimeout(300);
  record(
    "reverse scroll reverses opening",
    Number(await page.locator(".intro-stage").getAttribute("data-progress")) <
      Number(p1),
  );
  await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(350);
  record(
    "opening reaches white porcelain landing",
    await page.locator(".intro-finish").isVisible(),
  );
  await shot("mobile-intro-end");
  await page.locator(".intro-finish").click();
  await page.waitForSelector(".landing");
  record("opening completes into static home", !(await state()).viewer);
  await shot("mobile-home");
  await page.getByRole("button", { name: "开始添彩", exact: false }).click();
  await waitViewer();
  record(
    "creation loads actual geometry",
    (await state()).viewer.meshCount === 11,
  );
  record("creation is neutral white", (await state()).viewer.phase === "white");
  record(
    "next step is gated by selection",
    await page.locator("[data-action=next-step]").isDisabled(),
  );
  await shot("mobile-create-390");
  const pixels = await sharp(`${output}/mobile-create-390.png`)
    .extract({ left: 170, top: 320, width: 420, height: 370 })
    .stats();
  record(
    "first paint contains visible porcelain before interaction",
    pixels.channels[0].stdev > 12,
  );
  const v0 = (await state()).viewer;
  const box = await page.locator("canvas").boundingBox();
  await page.mouse.move(box.x + box.width * 0.35, box.y + box.height * 0.5);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.7, box.y + box.height * 0.55, {
    steps: 15,
  });
  await page.mouse.up();
  await page.waitForTimeout(400);
  const v1 = (await state()).viewer;
  record(
    "drag changes real camera",
    JSON.stringify(v0.camera) !== JSON.stringify(v1.camera),
  );
  await shot("mobile-3d-rotated");
  await page.getByRole("button", { name: "放大器物", exact: true }).click();
  await page.waitForTimeout(150);
  const distance = (v) =>
    Math.hypot(...v.camera.map((x, i) => x - v.target[i]));
  record(
    "zoom changes camera distance",
    distance((await state()).viewer) < distance(v1),
  );
  await page.getByRole("button", { name: "复位视角", exact: true }).click();
  // Actual touch events in a mobile browser context exercise OrbitControls' two-pointer path.
  const cdp = await context.newCDPSession(page);
  const cy = box.y + box.height * 0.45,
    cx = box.x + box.width * 0.45;
  const beforePinch = distance((await state()).viewer);
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [
      { x: cx - 25, y: cy, id: 1 },
      { x: cx + 25, y: cy, id: 2 },
    ],
  });
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchMove",
    touchPoints: [
      { x: cx - 45, y: cy, id: 1 },
      { x: cx + 45, y: cy, id: 2 },
    ],
  });
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await page.waitForTimeout(200);
  record(
    "two-finger pinch changes real camera",
    Math.abs(distance((await state()).viewer) - beforePinch) > 5,
  );
  await page.getByRole("button", { name: "复位视角", exact: true }).click();
  await page.getByRole("radio").nth(0).click();
  record(
    "selection persists and leaves porcelain unchanged",
    (await state()).session.draft.choices.openness === "sea" &&
      (await state()).viewer.phase === "white",
  );
  await page.locator("[data-action=next-step]").click();
  await page.getByRole("radio").nth(2).click();
  await page.getByRole("button", { name: "活动规则", exact: true }).click();
  await page.waitForSelector(".rules-page");
  await page.getByRole("button", { name: "返回", exact: true }).click();
  await waitViewer();
  record(
    "rules return preserves step and choices",
    (await state()).session.draft.step === 1 &&
      (await state()).session.draft.choices.innovation === "butterfly",
  );
  await page.reload();
  await waitViewer();
  record(
    "refresh restores unfinished draft",
    (await state()).session.draft.step === 1 &&
      (await state()).session.draft.choices.openness === "sea",
  );
  await page.locator("[data-action=next-step]").click();
  await page.getByRole("radio").nth(0).click();
  await page.locator("[data-action=next-step]").click();
  await page.getByRole("radio").nth(4).click();
  await shot("mobile-color-step");
  await page.locator("[data-action=next-step]").click();
  await page.getByRole("radio").nth(3).click();
  const whiteBefore = (await state()).viewer;
  record(
    "all five choices leave model white",
    whiteBefore.phase === "white" && !whiteBefore.loaded,
  );
  await page.locator("[data-action=next-step]").click();
  await page.waitForSelector(".poster-image", { timeout: 30000 });
  record(
    "result is a real non-empty image element",
    await page
      .locator(".poster-image")
      .evaluate(
        (img) =>
          img.tagName === "IMG" && img.complete && img.naturalWidth === 1080,
      ),
  );
  const generated = (await state()).result;
  record(
    "fixed style and demo provenance recorded",
    generated.styleVersion === "original-h5-1k-v1" &&
      generated.demo &&
      generated.posterBytes > 10000,
  );
  await shot("mobile-result");
  const posterBytes = await page
    .locator(".poster-image")
    .evaluate(async (img) =>
      Array.from(new Uint8Array(await (await fetch(img.src)).arrayBuffer())),
    );
  await writeFile(`${output}/generated-poster.png`, Buffer.from(posterBytes));
  await page.locator("[data-action=view3d]").click();
  await waitViewer();
  record(
    "P10 matches poster style version",
    (await state()).viewer.style === generated.styleVersion,
  );
  await shot("mobile-result-3d");
  await page.locator("[data-action=result]").click();
  await page.waitForSelector(".poster-image");
  record(
    "return from 3D reuses result",
    generated.id === (await state()).result.id,
  );
  await page.locator("[data-action=share]").click();
  record(
    "share guidance makes no success claim",
    await page
      .getByRole("dialog")
      .getByText(/不生成跨设备作品链接/)
      .isVisible(),
  );
  await page.getByRole("button", { name: "回到海报", exact: true }).click();
  await page.goto(url);
  await page.waitForSelector(".ranking-page");
  record(
    "completed revisit enters ranking demo",
    (await state()).route === "/ranking",
  );
  await shot("mobile-ranking");
  await page.goto(`${url}/#/work/missing`);
  await page.getByText("这份心意暂未找到").waitFor();
  await page.getByRole("button", { name: "我来添彩", exact: false }).click();
  await waitViewer();
  record(
    "invalid share can directly enter creation",
    (await state()).route === "/create",
  );
  await page.goto(`${url}/#/address`);
  await page.waitForSelector("#demo-address");
  record(
    "address demo never accepts personal data",
    (await page
      .locator("input:not([readonly]),textarea:not([readonly])")
      .count()) === 0,
  );
  const reqBefore = requests.length;
  await page
    .getByRole("button", { name: "预览完成状态", exact: false })
    .click();
  await page.getByText("未收集地址，未提交领取申请。").waitFor();
  record(
    "claim preview has no submission request",
    requests.slice(reqBefore).every((u) => !u.includes("/api")),
  );
  for (const [width, height] of [
    [360, 800],
    [430, 932],
    [1280, 900],
  ]) {
    await page.setViewportSize({ width, height });
    await page.goto(`${url}/#/create`);
    await waitViewer();
    await page.locator('.step-progress [data-step="0"]').click();
    await page.waitForTimeout(200);
    record(
      `no horizontal overflow at ${width}`,
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    );
    await shot(`create-${width}`);
  }
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${url}/#/home`);
  await page.waitForSelector(".landing");
  await shot("desktop-home");
  await page.goto(`${url}/#/result`);
  await page.waitForSelector(".poster-image");
  await shot("desktop-result");
  record("normal path console has no page errors", errors.length === 0);
  // Failure paths use isolated contexts; these never alter a user's preview data.
  const failure = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });
  const f = await failure.newPage();
  await f.addInitScript(() => {
    const get = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      return String(type).startsWith("webgl")
        ? null
        : get.call(this, type, ...args);
    };
  });
  await f.goto(`${url}/#/create`);
  await f.getByText("当前环境无法启动 WebGL 2，无法显示三维器物。").waitFor();
  record(
    "WebGL unavailable has explicit retry and return",
    await f.getByRole("button", { name: "重试", exact: true }).isVisible(),
  );
  await f.screenshot({
    path: `${output}/webgl-unavailable.png`,
    fullPage: true,
  });
  await failure.close();
  const broken = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });
  const b = await broken.newPage();
  await b.addInitScript(() =>
    localStorage.setItem(
      "apec-h5-session-v1",
      JSON.stringify({
        version: 1,
        introSeen: true,
        completed: false,
        draft: {
          version: 1,
          step: 4,
          choices: {
            openness: "sea",
            innovation: "bloom",
            cooperation: "weave",
            prosperity: "blue",
            future: "mountain",
          },
        },
      }),
    ),
  );
  await b.route("**/artwork/handle-normal.png", (r) => r.abort());
  await b.goto(`${url}/#/prepare`);
  await b.getByText(/有贴图未能读取/).waitFor();
  record(
    "failed texture package cannot produce success",
    (await b.evaluate(() => window.h5Debug())).result === null &&
      (await b.evaluate(() => window.h5Debug())).viewer.phase === "white",
  );
  await b.screenshot({ path: `${output}/texture-failure.png`, fullPage: true });
  await broken.close();
  const reduced = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  const r = await reduced.newPage();
  await r.goto(url);
  await r.waitForSelector(".intro-scroll.reduced");
  for (let i = 0; i < 3; i++) await r.locator(".scroll-hint").click();
  record(
    "reduced-motion opening remains usable",
    await r.locator(".intro-finish").isVisible(),
  );
  await reduced.close();
  await page.goto(`${url}/#/result`);
  await page.waitForSelector(".poster-image");
  await page.locator("[data-action=restart]").click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "重新体验", exact: true })
    .click();
  await waitViewer();
  record(
    "restart alone clears all five choices and result",
    Object.keys((await state()).session.draft.choices).length === 0 &&
      (await state()).result === null,
  );
  await page.goto(`${url}/#/work/demo-01`);
  await page.getByRole("button", { name: "我来添彩", exact: false }).click();
  await waitViewer();
  record(
    "shared work enters editor without replay",
    (await state()).route === "/create",
  );
} catch (e) {
  await page.screenshot({ path: `${output}/failure.png`, fullPage: true });
  checks.push({ name: "FAILED", passed: false, error: e.stack });
  throw e;
} finally {
  await context.close();
  await page.video().saveAs(`${output}/walkthrough.webm`);
  await browser.close();
  await writeFile(
    `${output}/qa-report.json`,
    JSON.stringify(
      {
        date: new Date().toISOString(),
        browser:
          "Isolated Chrome; IAB visual and interaction checks performed before automation",
        checks,
        errors,
        requestCount: requests.length,
        gsRequests: requests.filter((u) =>
          /\.sog|\.splat|\.ply|\.ksplat/.test(u),
        ),
        physicalDeviceTested: false,
      },
      null,
      2,
    ),
  );
}
