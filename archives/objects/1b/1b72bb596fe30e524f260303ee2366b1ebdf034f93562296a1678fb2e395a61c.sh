python3 - <<'PY'
from pathlib import Path
p=Path('tools/overlay-captures.mjs');s=p.read_text();s=s.replace("await page.selectOption('#mode','pbr');await page.screenshot", "await page.selectOption('#mode','pbr');await page.click('#model-only');const model=await page.evaluate(()=>window.cupCompare.capture());await writeFile(`../evidence/overlays/${id}-model.png`,Buffer.from(model.split(',')[1],'base64'));await page.click('#overlay');await page.screenshot");p.write_text(s)
PY
node tools/overlay-captures.mjs