cp ../evidence/saucer-correction/calibration-fit.json ../../work/first-overlay-fit.json
python3 - <<'PY'
from pathlib import Path
p=Path('tools/fit-calibration.ts');s=p.read_text().replace('r:68.7,y:5.9','r:70.2,y:5.9');p.write_text(s)
PY
./node_modules/.bin/tsx tools/fit-calibration.ts