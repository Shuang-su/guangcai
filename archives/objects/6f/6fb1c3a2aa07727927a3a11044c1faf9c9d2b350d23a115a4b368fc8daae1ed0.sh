python3 - <<'PY'
from pathlib import Path
p=Path('tools/fit-other-calibrations.ts');s=p.read_text().replace('const W=1200,H=1200','const W=process.env.REF===\'1230\'?1368:1200,H=process.env.REF===\'1230\'?1824:1200');p.write_text(s)
p=Path('tools/overlay-captures.mjs');s=p.read_text().replace("if(id==='1221'){const fit=JSON.parse(await readFile('../evidence/saucer-correction/calibration-fit.json'));", "{const fit=JSON.parse(await readFile(id==='1221'?'../evidence/saucer-correction/calibration-fit.json':`../evidence/overlays/${id}-fit.json`));");p.write_text(s)
PY
REF=1230 ./node_modules/.bin/tsx tools/fit-other-calibrations.ts