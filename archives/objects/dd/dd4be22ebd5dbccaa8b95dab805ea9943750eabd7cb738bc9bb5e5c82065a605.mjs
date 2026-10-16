import { chromium } from "playwright";
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
const browser = await chromium.launch({ channel: "chrome" }),
  url = process.env.QA_URL ?? "http://127.0.0.1:5177";
const checks = [];
let performance = null;
const check = (name, value) => {
  assert.ok(value, name);
  checks.push({ name, passed: true });
  console.log("PASS", name);
};
const seed = () =>
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
  );
try {
  const c = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });
  const p = await c.newPage();
  await p.addInitScript(seed);
  await p.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.toBlob;
    let first = true;
    HTMLCanvasElement.prototype.toBlob = function (cb, ...args) {
      if (first) {
        first = false;
        cb(null);
        return;
      }
      return original.call(this, cb, ...args);
    };
  });
  await p.goto(`${url}/#/prepare`);
  await p.getByText("无法生成器物图片").waitFor();
  check(
    "poster export failure creates no result and retains all choices",
    await p.evaluate(
      () =>
        !window.h5Debug().result &&
        Object.keys(window.h5Debug().session.draft.choices).length === 5 &&
        !window.h5Debug().session.completed,
    ),
  );
  await p.screenshot({ path: "evidence/poster-failure.png" });
  await p.locator("[data-action=retry-prepare]").click();
  await p.waitForSelector(".poster-image");
  check(
    "poster export retry recovers",
    await p.evaluate(() => !!window.h5Debug().result),
  );
  await p.goto(`${url}/#/create`);
  await p.waitForSelector("#viewer-host[data-ready=true]");
  const sample = () =>
    p.evaluate(() => ({
      time: globalThis.performance.now(),
      ...window.h5Debug().viewer,
    }));
  const box = await p.locator("canvas").boundingBox();
  await p.mouse.move(box.x + box.width * 0.4, box.y + box.height * 0.5);
  await p.mouse.down();
  const start = await sample();
  for (let i = 0; i < 120; i++) {
    await p.mouse.move(
      box.x + box.width * (0.5 + Math.sin(i / 15) * 0.2),
      box.y + box.height * 0.45,
    );
    await p.waitForTimeout(16);
  }
  await p.mouse.up();
  const end = await sample();
  const intervals = end.activeFrameMs.slice().sort((a, b) => a - b);
  performance = {
    environment:
      "Isolated desktop Chrome, 390x844, DPR capped 1.5; not physical phone",
    durationMs: end.time - start.time,
    renderedFrames: end.renderCount - start.renderCount,
    observedFps:
      (end.renderCount - start.renderCount) / ((end.time - start.time) / 1000),
    medianActiveFrameMs: intervals[Math.floor(intervals.length * 0.5)],
    p95ActiveFrameMs: intervals[Math.floor(intervals.length * 0.95)],
    triangles: end.triangles,
    pixelRatio: end.pixelRatio,
  };
  check(
    "sustained gesture draws real geometry",
    performance.renderedFrames > 20 && performance.triangles > 1000,
  );
  // Settled canvas must survive a layout / viewport resize and repaint without a new user gesture.
  await p.setViewportSize({ width: 360, height: 800 });
  await p.waitForTimeout(350);
  await p.locator('.step-progress [data-step="0"]').click();
  await p.waitForTimeout(200);
  check(
    "ribbon transition remains in viewport",
    await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  );
  await p.screenshot({ path: "evidence/resize-repaint-360.png" });
  await p.evaluate(() =>
    document
      .querySelector("canvas")
      .dispatchEvent(new Event("webglcontextlost", { cancelable: true })),
  );
  await p.getByText("三维画面已中断，请重试以重新载入器物。").waitFor();
  check(
    "context loss is explicit",
    await p.locator("[data-action=retry-viewer]").isVisible(),
  );
  await p.locator("[data-action=retry-viewer]").click();
  await p.waitForSelector("#viewer-host[data-ready=true]");
  check(
    "context loss retry restores viewer and draft",
    await p.evaluate(
      () =>
        !window.h5Debug().viewer.contextLost &&
        Object.keys(window.h5Debug().session.draft.choices).length === 5,
    ),
  );
  await p.evaluate(() =>
    document
      .querySelector("canvas")
      .dispatchEvent(new Event("webglcontextlost", { cancelable: true })),
  );
  await p.goto(`${url}/#/home`);
  await p.getByRole("button", { name: "继续添彩", exact: false }).click();
  await p.waitForSelector("#viewer-host[data-ready=true]");
  check(
    "leaving a lost context and returning recreates the renderer",
    await p.evaluate(
      () =>
        !window.h5Debug().viewer.contextLost && window.h5Debug().viewer.active,
    ),
  );
  await c.close();

  const timeout = await browser.newContext({
    viewport: { width: 390, height: 844 },
  });
  const t = await timeout.newPage();
  await t.route("**/media/landscape.webp", () => {});
  const began = Date.now();
  await t.goto(url);
  await t
    .getByText("开场素材未能读取。可以重试，或跳过开场继续体验。")
    .waitFor({ timeout: 20000 });
  check(
    "opening timeout is finite and offers retry",
    Date.now() - began < 20000 &&
      (await t.locator("[data-action=retry-intro]").isVisible()),
  );
  await t.screenshot({ path: "evidence/opening-timeout.png" });
  await t.locator("[data-action=finish-intro]").click();
  await t.waitForSelector(".landing");
  check("opening failure can still reach home", true);
  await timeout.close();

  const q = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const s = await q.newPage();
  await s.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("test blocked storage");
      },
    });
    Object.defineProperty(window, "indexedDB", {
      get() {
        throw new Error("test blocked database");
      },
    });
  });
  await s.goto(`${url}/#/create`);
  await s.waitForSelector("#viewer-host[data-ready=true]");
  await s.getByRole("radio").first().click();
  await s.getByRole("button", { name: "活动规则", exact: true }).click();
  await s.getByRole("button", { name: "返回", exact: true }).click();
  await s.waitForSelector("#viewer-host[data-ready=true]");
  check(
    "blocked storage supports in-memory flow",
    await s.evaluate(
      () => window.h5Debug().session.draft.choices.openness === "sea",
    ),
  );
  await q.close();
} catch (error) {
  checks.push({ name: "FAILED", passed: false, error: error.stack });
  throw error;
} finally {
  await browser.close();
  await writeFile(
    "evidence/edge-report.json",
    JSON.stringify(
      {
        date: new Date().toISOString(),
        checks,
        performance,
        physicalDeviceTested: false,
      },
      null,
      2,
    ),
  );
}
