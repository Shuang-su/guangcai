import { chromium } from "playwright";
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});
const url = process.env.QA_URL ?? "http://127.0.0.1:5178";
const errors = [],
  failures = [],
  checks = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("response", (r) => {
  if (r.status() >= 400) failures.push(r.url());
});
const ok = (name, value) => {
  assert.ok(value, name);
  checks.push({ name, passed: true });
  console.log("PASS", name);
};
try {
  await page.goto(url);
  await page.waitForSelector(".intro-stage");
  ok("built opening assets resolve", true);
  await page.getByRole("button", { name: "跳过", exact: true }).click();
  await page.waitForSelector(".landing");
  await page.getByRole("button", { name: "开始添彩", exact: false }).click();
  await page.waitForSelector("#viewer-host[data-ready=true]");
  ok(
    "built lazy viewer loads",
    await page.evaluate(() => window.h5Debug().viewer.meshCount === 11),
  );
  await page.waitForTimeout(300);
  await page.screenshot({ path: "evidence/final-creation-mobile.png" });
  for (let i = 0; i < 5; i++) {
    await page.getByRole("radio").first().click();
    await page.locator("[data-action=next-step]").click();
  }
  await page.waitForSelector(".poster-image");
  ok(
    "built fixed materials generate actual poster",
    await page
      .locator(".poster-image")
      .evaluate((i) => i.naturalWidth === 1080),
  );
  await page.screenshot({
    path: "evidence/final-result-mobile.png",
    fullPage: true,
  });
  await page.locator("[data-action=view3d]").click();
  await page.waitForSelector("#viewer-host[data-ready=true]");
  ok(
    "built result 3D matches preset",
    await page.evaluate(
      () =>
        window.h5Debug().viewer.style === window.h5Debug().result.styleVersion,
    ),
  );
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(`${url}/#/create`);
  await page.waitForSelector("#viewer-host[data-ready=true]");
  await page.locator('.step-progress [data-step="0"]').click();
  await page.waitForTimeout(700);
  await page.screenshot({ path: "evidence/final-creation-desktop.png" });
  const overlap = await page.evaluate(() => {
    const r = document.querySelector(".glass-divider").getBoundingClientRect(),
      t = document.querySelector(".viewer-tools").getBoundingClientRect();
    return (
      r.top < t.bottom &&
      r.bottom > t.top &&
      r.left < t.right &&
      r.right > t.left
    );
  });
  ok("desktop layout keeps viewer controls clear", !overlap);
  ok(
    "production no page or resource errors",
    !errors.length && !failures.length,
  );
} catch (error) {
  checks.push({ name: "FAILED", passed: false, error: error.stack });
  throw error;
} finally {
  await browser.close();
  await writeFile(
    "evidence/production-report.json",
    JSON.stringify(
      { date: new Date().toISOString(), checks, errors, failures },
      null,
      2,
    ),
  );
}
