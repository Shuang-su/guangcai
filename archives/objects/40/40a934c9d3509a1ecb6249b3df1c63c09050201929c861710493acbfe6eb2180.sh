cat > tools/overlay-captures.mjs <<'EOF'
import {chromium} from 'playwright';
import {writeFile,mkdir,readFile} from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true});
try{
 const page=await browser.newPage({viewport:{width:1500,height:1200},deviceScaleFactor:1.5});
 page.on('pageerror',e=>console.error(e.message));
 await page.goto((process.env.QA_URL??'http://127.0.0.1:5187/')+'compare.html');await page.waitForFunction(()=>window.cupCompare?.ready(),{},{timeout:90000});
 const id=process.env.REF??'1221';await page.evaluate(id=>window.cupCompare.select(id),id);
 if(id==='1221'){const fit=JSON.parse(await readFile('../evidence/saucer-correction/calibration-fit.json'));await page.evaluate(p=>window.cupCompare.setPose(p),fit.pose);}
 await page.waitForTimeout(300);await mkdir('../evidence/overlays',{recursive:true});
 for(const mode of ['pbr','rings','silhouette']){
  await page.selectOption('#mode',mode);await page.evaluate(()=>window.cupCompare.render());
  const image=await page.evaluate(()=>window.cupCompare.capture());await writeFile(`../evidence/overlays/${id}-${mode}.png`,Buffer.from(image.split(',')[1],'base64'));
 }
 await page.selectOption('#mode','pbr');await page.screenshot({path:`../evidence/overlays/${id}-interface.png`});
 await writeFile(`../evidence/overlays/${id}-camera.json`,JSON.stringify(await page.evaluate(()=>window.cupCompare.state()),null,2));
 console.log(id,'overlays saved');
}finally{await browser.close();}
EOF
node tools/overlay-captures.mjs