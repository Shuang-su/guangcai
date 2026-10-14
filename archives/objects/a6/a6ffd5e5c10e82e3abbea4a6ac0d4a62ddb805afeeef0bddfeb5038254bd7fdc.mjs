import fs from "node:fs/promises";
import { createHash } from "node:crypto";
import sharp from "sharp";
const checks = [];
const check = (name, ok) => {
  if (!ok) throw new Error(name);
  checks.push(name);
};
for (const region of ["body", "handle", "saucer"]) {
  let expected;
  for (const channel of ["baseColor", "normal", "roughness", "metalness"]) {
    const m = await sharp(`public/artwork/${region}-${channel}.png`).metadata();
    const shape = `${m.width}x${m.height}`;
    expected ??= shape;
    check(
      `${region}/${channel} aligned and mobile-sized`,
      shape === expected && m.width <= 1024 && m.height <= 1024,
    );
  }
}
for (const f of [
  "white-cup.png",
  "styled-cup.png",
  "landscape.webp",
  "glass-ribbon.webp",
]) {
  const m = await sharp(`public/media/${f}`).metadata();
  check(`${f} decodes`, !!m.width && !!m.height);
  if (f.includes("ribbon")) check("glass ribbon retains alpha", m.hasAlpha);
}
const source = JSON.parse(
  await fs.readFile("docs/source-integrity.json", "utf8"),
);
for (const file of source) {
  const hash = createHash("sha256")
    .update(await fs.readFile(file.source))
    .digest("hex");
  check(
    `original unchanged: ${file.source.split("/").at(-1)}`,
    hash === file.sha256,
  );
}
const manifest = [];
async function walk(dir){for(const entry of await fs.readdir(dir,{withFileTypes:true})){
 if(entry.name.startsWith('.'))continue;const file=`${dir}/${entry.name}`;
 if(entry.isDirectory()){await walk(file);continue;}
 const b=await fs.readFile(file);manifest.push({file,bytes:b.length,sha256:createHash('sha256').update(b).digest('hex')});
}}
for(const dir of ['public/artwork','public/media','public/marks','public/materials'])await walk(dir);
const pure=JSON.parse(await fs.readFile('assets/source/visual-v2/pure-pattern-manifest.json','utf8'));
check('20 distinct pure pattern options',pure.assets.length===20&&new Set(pure.assets.map(a=>a.id)).size===20);
for(const a of pure.assets){
 const m=await sharp(`public/media/options/${a.id}.webp`).metadata();check(`${a.id} full card pattern`,m.width===640&&m.height===480);
 for(const kind of ['normal','roughness','metalness','clearcoat']){
  const n=await sharp(`public/materials/options/${a.id}-${kind}.png`).metadata();check(`${a.id} ${kind} aligned`,n.width===256&&n.height===192&&n.width/n.height===m.width/m.height);
 }
}
const inkButton=await sharp('public/media/ui/ink-button.webp').metadata();
check('Ink button decodes at runtime size',inkButton.width===1000&&inkButton.height>200);
check('Ink button retains transparent silhouette',inkButton.hasAlpha===true);
for(const kind of ['cyan-baseColor','blue-baseColor','coral-baseColor','amber-baseColor','mint-baseColor','violet-baseColor','normal','roughness','metalness','clearcoat']){
 const m=await sharp(`public/materials/ribbons/${kind}.png`).metadata();
 check(`ribbon ${kind} decodes and shares UV extent`,m.width===768&&m.height===192);
}
const metal=await sharp('public/materials/ribbons/metalness.png').stats();
check('Ribbon glass is dielectric across the entire map',metal.channels.every(c=>c.max===0));
await fs.writeFile(
  "docs/runtime-assets.json",
  JSON.stringify(manifest, null, 2),
);
console.log(
  JSON.stringify(
    {
      passed: checks.length,
      checks,
      bytes: manifest.reduce((n, f) => n + f.bytes, 0),
    },
    null,
    2,
  ),
);
