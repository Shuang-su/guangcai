cat > tools/surface-metrics.ts <<'EOF'
import {writeFileSync} from 'node:fs';
import {defaults} from '../src/geometry/parameters';
import {handlePath} from '../src/geometry/handle';
import {ribbon} from '../src/geometry/ribbon';
const p=defaults,g=ribbon(handlePath(p).path,p.handleWidth,p.handleThickness);
const m={body:{width:p.radius*p.bandAngle,length:p.height-5.3},handle:g.userData.surfaceMetrics,saucer:{width:(p.saucerRadius-2.45)*2*Math.PI/4,length:Math.hypot(2.6,6.7)}};
writeFileSync('assets/surface-metrics.json',JSON.stringify(m,null,2));g.dispose();
EOF
npx tsx tools/surface-metrics.ts
python3 - <<'PY'
from pathlib import Path
p=Path('tools/derive-pbr.mjs');s=p.read_text();a=s.index('const configs = [');b=s.index('const manifest =',a)
s=s[:a]+'''const physical=JSON.parse(await readFile('assets/surface-metrics.json','utf8'));
const configs = [
  {name:'body',input:'assets/masters/body-generated.png',width:1024},
  {name:'handle',input:'assets/masters/body-generated.png',crop:[.47,.07,.16,.82],width:320},
  {name:'saucer',input:'assets/masters/band-generated.png',crop:[0,.38,1,.25],width:2172},
].map(c=>({...c,height:Math.round(c.width*physical[c.name].length/physical[c.name].width)}));
''' + s[b:]
s=s.replace('maxReliefMm:.045,','heightCalibration:"Artistic micro-relief only; not measured, no geometric displacement",')
s=s.replace('source.resize(c.width,c.height)','source.resize(c.width,c.height,{fit:"cover",position:"centre"})')
s=s.replace('metal[i]=Math.round(255*gold*.97);','''metal[i]=Math.round(255*gold*.97);
    // Metallic base color represents reflectance, not a shaded ochre photograph.
    for(let k=0;k<3;k++)data[i*3+k]=Math.round(data[i*3+k]*(1-gold)+[255,230,166][k]*gold);''')
s=s.replace('const region={width:w,height:h,maps:{}}','const region={width:w,height:h,physical:physical[c.name],crop:c.crop??null,fit:"cover, uniform scale; all channels use identical pixel coordinates",maps:{}}')
p.write_text(s)
PY
npm run textures > ../../work/textures-log.json
npm run build