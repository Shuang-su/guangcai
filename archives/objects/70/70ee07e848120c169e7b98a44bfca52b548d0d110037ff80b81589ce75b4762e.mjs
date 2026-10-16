import sharp from "sharp";
import fs from "node:fs/promises";
import crypto from "node:crypto";
await fs.mkdir("public/artwork", { recursive: true });
const manifest = {
  version: 1,
  uvLayout: "guangcai-v1",
  method:
    "Generated transparent colour master; alpha is coverage; hue-region classes define enamel and gold-line semantics, never luminance-to-height. Normal is a finite-difference bake of labelled microheight.",
  units: "millimetres",
  masters: {},
  outputs: [],
};
for (const name of ["body", "band"]) {
  const path = `assets/masters/${name}-master.png`;
  const original = await fs.readFile(path);
  manifest.masters[name] = {
    sha256: crypto.createHash("sha256").update(original).digest("hex"),
    ...(await sharp(original).metadata()),
  };
  let input = original;
  if (name === "band")
    input = await sharp(original).trim({ threshold: 20 }).toBuffer();
  for (const tier of ["high", "low"]) {
    const width =
      name === "body"
        ? tier === "high"
          ? 1760
          : 1024
        : tier === "high"
          ? 2048
          : 1024;
    const { data, info } = await sharp(input)
      .resize({
        width,
        height: name === "body" ? width / 2 : (width * 3) / 16,
        fit: "fill",
      })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const { width: w, height: h } = info,
      n = w * h;
    const alpha = new Float32Array(n),
      goldInk = new Float32Array(n),
      height = new Float32Array(n),
      semantic = Buffer.alloc(n * 3);
    for (let i = 0; i < n; i++) {
      const r = data[i * 4] / 255,
        g = data[i * 4 + 1] / 255,
        b = data[i * 4 + 2] / 255;
      const a = data[i * 4 + 3] < 24 ? 0 : data[i * 4 + 3] / 255;
      alpha[i] = a;
      const ink =
        r > g * 1.1 && r < g * 1.65 && g > b * 1.15 && g < b * 3.0 && g > 0.22;
      const leaf = g > r * 0.84 && g > b * 1.07;
      goldInk[i] = ink ? a * 0.6 : 0;
      height[i] = a * (ink ? 0.025 : leaf ? 0.036 : 0.054);
      semantic[i * 3] = ink ? Math.round(a * 255) : 0;
      semantic[i * 3 + 1] = leaf ? Math.round(a * 255) : 0;
      semantic[i * 3 + 2] = !leaf && !ink ? Math.round(a * 255) : 0;
    }
    // A periodic edge blend on strip colour/coverage prevents a visible saucer wrap seam.
    if (name === "band") {
      const band = 24;
      for (let y = 0; y < h; y++)
        for (let x = 0; x < band; x++) {
          const l = y * w + x,
            r = y * w + w - 1 - x,
            t = (1 - x / band) * 0.5;
          for (let c = 0; c < 4; c++) {
            const a = data[l * 4 + c],
              b = data[r * 4 + c];
            data[l * 4 + c] = a * (1 - t) + b * t;
            data[r * 4 + c] = b * (1 - t) + a * t;
          }
          for (const a of [alpha, goldInk, height]) {
            const av = a[l],
              bv = a[r];
            a[l] = av * (1 - t) + bv * t;
            a[r] = bv * (1 - t) + av * t;
          }
        }
    }
    const heightBytes = Buffer.alloc(n);
    for (let i = 0; i < n; i++) heightBytes[i] = (height[i] / 0.065) * 255;
    const smooth = await sharp(heightBytes, {
      raw: { width: w, height: h, channels: 1 },
    })
      .blur(0.65)
      .greyscale()
      .raw()
      .toBuffer();
    const normal = Buffer.alloc(n * 3);
    const pitch = (name === "body" ? 217 : 86) / w;
    for (let y = 0; y < h; y++)
      for (let x = 0; x < w; x++) {
        const i = y * w + x,
          ix0 = y * w + Math.max(0, x - 1),
          ix1 = y * w + Math.min(w - 1, x + 1),
          iy0 = Math.max(0, y - 1) * w + x,
          iy1 = Math.min(h - 1, y + 1) * w + x;
        const dx = (((smooth[ix1] - smooth[ix0]) / 255) * 0.065) / (2 * pitch),
          dy = (((smooth[iy1] - smooth[iy0]) / 255) * 0.065) / (2 * pitch),
          len = Math.hypot(dx, dy, 1);
        normal[i * 3] = ((-dx / len) * 0.5 + 0.5) * 255;
        normal[i * 3 + 1] = ((dy / len) * 0.5 + 0.5) * 255;
        normal[i * 3 + 2] = ((1 / len) * 0.5 + 0.5) * 255;
      }
    await fs.mkdir(`public/artwork/${tier}`, { recursive: true });
    const prefix = `public/artwork/${tier}/${name}`;
    await sharp(normal, { raw: { width: w, height: h, channels: 3 } })
      .png()
      .toFile(`${prefix}-normal.png`);
    if (tier === "high") {
      await sharp(semantic, { raw: { width: w, height: h, channels: 3 } })
        .png()
        .toFile(`assets/masters/${name}-semantic.png`);
      await sharp(heightBytes, { raw: { width: w, height: h, channels: 1 } })
        .png()
        .toFile(`assets/masters/${name}-height.png`);
    }
    for (const variant of name === "body" ? ["white", "gold"] : ["gold"]) {
      const color = Buffer.alloc(n * 3),
        orm = Buffer.alloc(n * 3),
        coat = Buffer.alloc(n * 3),
        bg = variant === "gold" ? [192, 139, 58] : [245, 243, 234];
      for (let i = 0; i < n; i++) {
        const a = alpha[i],
          metal = Math.min(1, (variant === "gold" ? 1 - a : 0) + goldInk[i]);
        for (let c = 0; c < 3; c++)
          color[i * 3 + c] = data[i * 4 + c] * a + bg[c] * (1 - a);
        orm[i * 3] = 255;
        orm[i * 3 + 1] = (metal * 0.28 + (1 - metal) * 0.3) * 255;
        orm[i * 3 + 2] = metal * 255;
        coat[i * 3] = (metal * 0.12 + (1 - metal) * 0.68) * 255;
        coat[i * 3 + 1] = 0.19 * 255;
        coat[i * 3 + 2] = 0;
      }
      await sharp(color, { raw: { width: w, height: h, channels: 3 } })
        .webp({ quality: 96 })
        .toFile(`${prefix}-${variant}-color.webp`);
      await sharp(orm, { raw: { width: w, height: h, channels: 3 } })
        .png()
        .toFile(`${prefix}-${variant}-orm.png`);
      await sharp(coat, { raw: { width: w, height: h, channels: 3 } })
        .png()
        .toFile(`${prefix}-${variant}-coat.png`);
      manifest.outputs.push({
        name,
        variant,
        tier,
        width: w,
        height: h,
        master: manifest.masters[name].sha256,
      });
    }
  }
}
await fs.writeFile(
  "assets/masters/manifest.json",
  JSON.stringify(manifest, null, 2),
);
await fs.mkdir("public/basis", { recursive: true });
for (const f of ["basis_transcoder.js", "basis_transcoder.wasm"])
  await fs.copyFile(
    `node_modules/three/examples/jsm/libs/basis/${f}`,
    `public/basis/${f}`,
  );
console.log(
  "Baked aligned colour, ORM, clearcoat and tangent normals from two masters.",
);
