// Offline asset build. Isolated headless browser renders our own source; no user browser profile.
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
const url = process.env.MEDIA_URL ?? "http://127.0.0.1:5177";
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1000, height: 1000 },
    deviceScaleFactor: 1,
  });
  await page.goto(`${url}/media-stage.html`);
  await page.waitForFunction(() => window.mediaRenderer);
  for (const kind of ["white", "styled"]) {
    const result = await page.evaluate(
      (k) => window.mediaRenderer.render(k),
      kind,
    );
    await mkdir("public/media", { recursive: true });
    await writeFile(
      `public/media/${kind}-cup.png`,
      Buffer.from(result.split(",")[1], "base64"),
    );
    console.log(
      `Rendered ${kind}-cup.png from actual shared geometry and materials`,
    );
  }
  console.log(await page.evaluate(() => window.mediaRenderer.debug()));
} finally {
  await browser.close();
}
