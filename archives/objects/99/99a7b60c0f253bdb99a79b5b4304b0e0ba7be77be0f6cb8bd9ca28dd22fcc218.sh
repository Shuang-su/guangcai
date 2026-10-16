cat > tools/overlay-qa.mjs <<'EOF'
import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true});const checks=[],errors=[];
try{
 const page=await browser.newPage({viewport:{width:1400,height:1000}});page.on('pageerror',e=>errors.push(e.message));
 const url=(process.env.QA_URL??'http://127.0.0.1:5187/')+'compare.html';await page.goto(url);await page.waitForFunction(()=>window.cupCompare?.ready());
 for(const id of ['1221','1220','1230']){await page.selectOption('#reference',id);await page.waitForFunction(id=>window.cupCompare.state().id===id&&document.getElementById('photo').complete,id);await page.waitForTimeout(150);const s=await page.evaluate(()=>window.cupCompare.state());assert.equal(s.id,id);assert.equal(s.parameters.saucerRadius,75.5);checks.push(`${id}: same physical saucer and corresponding photo loaded`);}
 await page.selectOption('#reference','1221');await page.waitForTimeout(200);
 const original=await page.evaluate(()=>window.cupCompare.state().pose);await page.fill('#roll','3.5');await page.fill('#pitch','-2');
 assert.equal(await page.evaluate(()=>window.cupCompare.state().pose.roll),3.5);checks.push('camera roll and pitch controls change the actual 3D projection');
 await page.reload();await page.waitForFunction(()=>window.cupCompare?.ready());assert.equal(await page.evaluate(()=>window.cupCompare.state().pose.roll),3.5);checks.push('edited camera survives reload');
 await page.click('#reset-pose');await page.waitForTimeout(200);assert.equal(await page.evaluate(()=>window.cupCompare.state().pose.roll),original.roll);checks.push('reset restores the reviewed pose');
 await page.click('#photo-only');assert.equal(await page.locator('#model').evaluate(e=>e.style.opacity),'0');
 await page.click('#model-only');assert.equal(await page.locator('#photo').evaluate(e=>e.style.visibility),'hidden');
 await page.click('#overlay');assert.equal(await page.locator('#model').evaluate(e=>e.style.opacity),'0.5');checks.push('photo / model / overlay toggles');
 for(const mode of ['clay','silhouette','rings','pbr']){await page.selectOption('#mode',mode);assert.equal(await page.evaluate(()=>window.cupCompare.state().mode),mode);}checks.push('four display modes');
 const png=await page.evaluate(()=>window.cupCompare.capture());assert.ok(png.startsWith('data:image/png;base64,'));checks.push('PNG combines the original aspect photo with transparent WebGL canvas');
 const downloadPromise=page.waitForEvent('download');await page.click('#save-pose');const download=await downloadPromise;assert.equal(download.suggestedFilename(),'IMG_1221-camera.json');checks.push('camera JSON download');
 await page.setViewportSize({width:390,height:844});await page.waitForTimeout(150);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth===innerWidth));checks.push('mobile overlay keeps photo aspect without horizontal overflow');
 assert.deepEqual(errors,[]);await writeFile('../evidence/overlay-qa.json',JSON.stringify({url,checks,errors,date:new Date().toISOString()},null,2));console.log(JSON.stringify({passed:checks.length,errors}));
}finally{await browser.close();}
EOF
cat ARTWORK.md; tail -10 ../evidence/textures-log.txt; ps -Ao pid,ppid,etime,command | rg 'derive-pbr|tsc|vite build'