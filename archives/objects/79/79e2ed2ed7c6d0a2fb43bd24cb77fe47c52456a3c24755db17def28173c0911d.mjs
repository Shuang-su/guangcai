import fs from "node:fs/promises";
import sharp from "sharp";
import assert from "node:assert/strict";
import crypto from "node:crypto";
const report = {
  checks: [],
  edgeChecks: [],
  note: "Checks pixel-coordinate agreement and content boundaries; does not certify semantic correctness of every gold brushstroke.",
};
const raw = async (path, gray = false) => {
  let s = sharp(path);
  if (gray) s = s.greyscale();
  return s.raw().toBuffer({ resolveWithObject: true });
};
const manifest = JSON.parse(
  await fs.readFile("assets/masters/manifest.json", "utf8"),
);
for (const [name, m] of Object.entries(manifest.masters)) {
  assert.equal(
    crypto
      .createHash("sha256")
      .update(await fs.readFile(`assets/masters/${name}-master.png`))
      .digest("hex"),
    m.sha256,
  );
  report.checks.push(`${name} mother hash unchanged`);
}
for (const tier of ["high", "low"])
  for (const name of ["body", "band"]) {
    const path = `public/artwork/${tier}/${name}`;
    const normal = await raw(path + "-normal.png");
    for (const variant of name === "body" ? ["white", "gold"] : ["gold"]) {
      const images = await Promise.all([
        raw(path + `-${variant}-color.webp`),
        raw(path + `-${variant}-orm.png`),
        raw(path + `-${variant}-coat.png`),
      ]);
      assert.ok(
        images.every(
          (x) =>
            x.info.width === normal.info.width &&
            x.info.height === normal.info.height,
        ),
      );
      for (const suffix of [
        "normal",
        `${variant}-color`,
        `${variant}-orm`,
        `${variant}-coat`,
      ]) {
        const bin = await fs.readFile(path + "-" + suffix + ".ktx2");
        assert.equal(bin.subarray(1, 7).toString(), "KTX 20");
      }
      report.checks.push(`${tier}/${name}/${variant} size and KTX2 header`);
    }
  }
await fs.mkdir("evidence", { recursive: true });
for (const name of ["body", "band"]) {
  const height = await raw(`assets/masters/${name}-height.png`, true),
    normal = await raw(`public/artwork/high/${name}-normal.png`),
    color = await raw(`public/artwork/high/${name}-gold-color.webp`),
    metal = await raw(`public/artwork/high/${name}-gold-orm.png`);
  const { width: w, height: h } = height.info;
  let boundary = 0,
    normalOnBoundary = 0,
    flat = 0,
    flatNormal = 0;
  const contour = Buffer.alloc(w * h * 4),
    metalGray = Buffer.alloc(w * h),
    raised = Buffer.alloc(w * h);
  for (let y = 2; y < h - 2; y++)
    for (let x = 2; x < w - 2; x++) {
      const i = y * w + x,
        gradient =
          Math.abs(height.data[i + 1] - height.data[i - 1]) +
          Math.abs(height.data[i + w] - height.data[i - w]),
        n = Math.hypot(
          normal.data[i * 3] - 127.5,
          normal.data[i * 3 + 1] - 127.5,
        );
      metalGray[i] = metal.data[i * 3 + 2];
      raised[i] = height.data[i];
      if (gradient > 30) {
        boundary++;
        if (n > 1.5) normalOnBoundary++;
        contour[i * 4] = 255;
        contour[i * 4 + 1] = 30;
        contour[i * 4 + 2] = 80;
        contour[i * 4 + 3] = 130;
      }
      if (height.data[i] === 0 && gradient === 0) {
        flat++;
        if (n < 3) flatNormal++;
      }
    }
  assert.ok(
    normalOnBoundary / boundary > 0.85,
    `${name}: normal relief follows colour-derived height edges`,
  );
  assert.ok(
    flatNormal / flat > 0.94,
    `${name}: background must not acquire unrelated bump`,
  );
  report.edgeChecks.push({
    name,
    boundaryPixels: boundary,
    normalAgreement: normalOnBoundary / boundary,
    flatNormalAgreement: flatNormal / flat,
  });
  const fullOverlay = await sharp(color.data, {
    raw: { width: w, height: h, channels: 3 },
  })
    .composite([{ input: contour, raw: { width: w, height: h, channels: 4 } }])
    .png()
    .toBuffer();
  const overlay = await sharp(fullOverlay).resize(640).png().toBuffer();
  const m = await sharp(metalGray, {
    raw: { width: w, height: h, channels: 1 },
  })
    .resize(640)
    .png()
    .toBuffer();
  const hmap = await sharp(raised, {
    raw: { width: w, height: h, channels: 1 },
  })
    .resize(640)
    .png()
    .toBuffer();
  const ph = (await sharp(overlay).metadata()).height;
  await sharp({
    create: { width: 1920, height: ph, channels: 3, background: "#ffffff" },
  })
    .composite([
      { input: overlay, left: 0, top: 0 },
      { input: m, left: 640, top: 0 },
      { input: hmap, left: 1280, top: 0 },
    ])
    .png()
    .toFile(`evidence/${name}-alignment.png`);
}

const coverage = await sharp("assets/masters/body-master.png")
  .resize(1760, 880)
  .ensureAlpha()
  .raw()
  .toBuffer();
const gold = await raw("public/artwork/high/body-gold-orm.png"),
  white = await raw("public/artwork/high/body-white-orm.png");
let error = 0,
  edgePixels = 0,
  edgeError = 0;
for (let i = 0; i < 1760 * 880; i++) {
  const alpha = coverage[i * 4 + 3] < 24 ? 0 : coverage[i * 4 + 3] / 255,
    delta = Math.abs(
      (gold.data[i * 3 + 2] - white.data[i * 3 + 2]) / 255 - (1 - alpha),
    );
  error += delta;
  if (alpha > 0.05 && alpha < 0.95) {
    edgePixels++;
    edgeError += delta;
  }
}
assert.ok(error / (1760 * 880) < 0.004);
assert.ok(edgeError / edgePixels < 0.005);
report.edgeChecks.push({
  name: "body-metal-vs-mother-coverage",
  edgePixels,
  meanError: error / (1760 * 880),
  edgeMeanError: edgeError / edgePixels,
});
await fs.writeFile(
  "evidence/asset-validation.json",
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
