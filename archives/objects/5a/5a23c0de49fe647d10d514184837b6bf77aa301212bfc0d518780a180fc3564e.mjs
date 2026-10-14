import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import sharp from "sharp";
const bin =
  process.env.KTX_TOOL ||
  path.resolve(
    ".codex-work/cache/ktx-unpacked/KTX-Software-4.4.2-Darwin-arm64-tools.pkg/Payload/usr/local/bin/toktx",
  );
await fs.mkdir(".codex-work/cache/encode", { recursive: true });
let count = 0;
for (const tier of ["high", "low"])
  for (const file of await fs.readdir(`public/artwork/${tier}`)) {
    if (!/\.(png|webp)$/.test(file)) continue;
    const input = `public/artwork/${tier}/${file}`,
      output = input.replace(/\.(png|webp)$/, ".ktx2");
    if (
      !process.argv.includes("--force") &&
      (await fs.stat(output).catch(() => null))?.mtimeMs >
        (await fs.stat(input)).mtimeMs
    )
      continue;
    const isColor = file.includes("-color"),
      png = file.endsWith(".png")
        ? input
        : `.codex-work/cache/encode/${tier}-${file}.png`;
    if (png !== input) await sharp(input).png().toFile(png);
    const run = spawnSync(
      bin,
      [
        "--t2",
        "--lower_left_maps_to_s0t0",
        "--encode",
        "uastc",
        "--uastc_quality",
        "2",
        "--zcmp",
        "9",
        "--genmipmap",
        "--assign_oetf",
        isColor ? "srgb" : "linear",
        output,
        png,
      ],
      { encoding: "utf8" },
    );
    if (run.status !== 0) throw Error(run.stderr || run.stdout);
    count++;
  }
console.log(`Encoded ${count} KTX2 UASTC textures with mipmaps.`);
