python3 - <<'PY'
from pathlib import Path
p=Path('src/materials/materials.ts');s=p.read_text().replace('setRGB(1,.67,.115)','setRGB(1,.60,.045)');p.write_text(s)
p=Path('src/studio/studio.ts');s=p.read_text().replace('setScalar(.55)','setScalar(.30)').replace("DirectionalLight('#fffdf5',1.05)","DirectionalLight('#fffdf5',1.2)");p.write_text(s)
p=Path('tools/derive-pbr.mjs');s=p.read_text().replace('[255,230,166]','[255,200,70]');p.write_text(s)
p=Path('src/geometry/product.ts');s=p.read_text().replace('[sr+.15,17.25]','[sr,17.25]');p.write_text(s)
PY
npm run textures > ../../work/textures-log-final.json
node tools/snapshot.mjs