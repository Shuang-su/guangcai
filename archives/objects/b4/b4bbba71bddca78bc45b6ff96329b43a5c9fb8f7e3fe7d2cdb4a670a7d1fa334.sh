python3 - <<'PY'
from pathlib import Path
p=Path('src/interaction/reference-views.ts');s=p.read_text().replace("export const references={", "export const references={\n  '1221-detail':{label:'1221 · 侧缘轮廓放大',part:'saucer',camera:[69,9.5,82],target:[69,9,0],detail:true},");p.write_text(s)
p=Path('src/interaction/views.ts');s=p.read_text().replace('for(let iteration=0;iteration<3;iteration++){',"for(let iteration=0;iteration<('detail' in pose?0:3);iteration++){");p.write_text(s)
p=Path('tools/reference-captures.mjs');s=p.read_text().replace("'1237','1236'];", "'1237','1236','1221-detail'];");p.write_text(s)
p=Path('tools/reference-gallery.mjs');s=p.read_text().replace("'1237','1236'];", "'1237','1236','1221-detail'];").replace("const notes={", "const notes={'1221-detail':'对应用户红线反馈：检查花带外撇、下沿内收台阶和窄底足。此机位专门放大右侧轮廓。',").replace('reference-previews/IMG_${id}.jpg','reference-previews/IMG_${id.split(\'-\')[0]}.jpg');p.write_text(s)
for f in ['README.md','docs/changes/20260929-reference-corrections/plan.md']:
 p=Path(f);p.write_text(p.read_text().replace('21 个','22 个'))
PY
cat > tools/saucer-closeup.mjs <<'EOF'
import {chromium} from 'playwright';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage({viewport:{width:800,height:800},deviceScaleFactor:1.5});
 await page.goto(process.env.QA_URL??'http://127.0.0.1:5187/');await page.waitForFunction(()=>window.cupViewer?.ready());
 await page.evaluate(()=>window.cupViewer.reference('1221-detail'));await page.waitForTimeout(800);
 await page.addStyleTag({content:'header,footer,#open-settings,#settings,#status{display:none!important}'});
 await page.screenshot({path:'../evidence/saucer-correction/after-pbr.png'});
 await page.evaluate(()=>{const el=document.getElementById('material-mode');el.value='clay';el.dispatchEvent(new Event('change',{bubbles:true}));});await page.waitForTimeout(500);
 await page.screenshot({path:'../evidence/saucer-correction/after-clay.png'});
}finally{await browser.close();}
EOF