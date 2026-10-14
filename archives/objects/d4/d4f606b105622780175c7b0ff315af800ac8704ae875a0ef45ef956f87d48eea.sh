python3 - <<'PY'
from pathlib import Path
p=Path('tools/overlay-report.mjs');p.write_text(p.read_text().replace('top:-64%','top:-109%'))
PY
QA_URL=http://127.0.0.1:5197/ node tools/reference-captures.mjs