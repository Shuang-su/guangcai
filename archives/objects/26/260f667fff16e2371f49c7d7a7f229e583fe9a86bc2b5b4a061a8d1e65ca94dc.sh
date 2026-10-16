python3 - <<'PY'
from pathlib import Path
p=Path('src/geometry/product.ts');s=p.read_text().replace('[sr-8.5,4.0],[sr-6.9,4.15]','[sr-8.5,4.0],[sr-5.9,4.15]').replace('[sr-6.35,4.8],[sr-6.8,5.9]','[sr-5.1,4.8],[sr-5.3,5.9]').replace('Math.hypot(5.5,10.4)','Math.hypot(4.0,10.4)').replace('sr-4.05','sr-3.3');p.write_text(s)
p=Path('tools/surface-metrics.ts');s=p.read_text().replace('Math.hypot(5.5,10.4)','Math.hypot(4.0,10.4)').replace('sr-4.05','sr-3.3').replace('saucerRadius-4.05','saucerRadius-3.3');p.write_text(s)
p=Path('tools/saucer-profile.ts');s=p.read_text().replace('5.5 mm','4.0 mm').replace('flowerRadialChange:5.5','flowerRadialChange:4.0');p.write_text(s)
p=Path('src/compare.ts');s=p.read_text().replace("const lines=new Group(),lineMaterial=new LineBasicMaterial({color:'#00efff',depthTest:false});","const depthOnly=new MeshBasicMaterial({colorWrite:false});\nconst lines=new Group(),lineMaterial=new LineBasicMaterial({color:'#00efff',depthTest:true});lines.renderOrder=2;")
s=s.replace('[68.7,5.9],[69.15,4.8]','[70.2,5.9],[70.4,4.8]').replace("mode==='clay'?clay:material", "mode==='clay'?clay:mode==='rings'?depthOnly:material").replace("product.root.visible=mode!=='rings'",'product.root.visible=true').replace('lineMaterial.dispose();clay.dispose();','lineMaterial.dispose();depthOnly.dispose();clay.dispose();')
p.write_text(s)
PY
npm run textures > ../evidence/textures-log.txt && ./node_modules/.bin/tsx tools/saucer-profile.ts && npm test > ../evidence/geometry-test.txt && npm run build > ../evidence/build-log.txt