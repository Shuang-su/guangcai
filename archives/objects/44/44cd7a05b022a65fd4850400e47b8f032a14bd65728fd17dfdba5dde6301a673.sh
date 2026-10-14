python3 - <<'PY'
from pathlib import Path
import json,re
p=Path('src/interaction/calibration.ts');s=p.read_text()
for id,file in [('1221','../evidence/saucer-correction/calibration-fit.json'),('1220','../evidence/overlays/1220-fit.json'),('1230','../evidence/overlays/1230-fit.json')]:
 pose=json.loads(Path(file).read_text())['pose'];s=re.sub(r"('"+id+r"':\{label:[^\n]*?pose:)\{[^}]+\}",lambda m:m[1]+json.dumps(pose),s)
p.write_text(s)
PY
cat assets/surface-metrics.json; tail -15 ../evidence/geometry-test.txt; tail -10 ../evidence/build-log.txt