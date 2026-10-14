python3 - <<'PY'
from pathlib import Path
p=Path('src/main.ts');s=p.read_text().replace('if(await fitArtwork();\nmanager.apply(defaultPack))','if(await manager.apply(defaultPack))');s=s.replace("manager.apply(defaultPack).then", "fitArtwork();\nmanager.apply(defaultPack).then");p.write_text(s)
p=Path('src/geometry/parameters.ts');s=p.read_text().replace('height: 112','height: 103').replace('saucerRadius: 70','saucerRadius: 75.5');p.write_text(s)
p=Path('src/interaction/reference-views.ts');s=p.read_text().replace("export const references={","export const references={\n  '1220':{label:'1220 · 产品侧面比例',part:'all',camera:[-8,122,395],target:[13,57,0]},");p.write_text(s)
p=Path('tools/reference-captures.mjs');s=p.read_text().replace("const ids=['1197'","const ids=['1220','1197'").replace("page.on('pageerror',e=>errors.push(e.message))","page.on('pageerror',e=>{errors.push(e.message);console.log(e.message)})");p.write_text(s)
PY
npm run textures