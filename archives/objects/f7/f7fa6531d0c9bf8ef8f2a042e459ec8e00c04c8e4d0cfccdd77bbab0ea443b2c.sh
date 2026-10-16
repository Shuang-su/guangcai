cat > tools/snapshot.mjs <<'EOF'
import {chromium} from 'playwright';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1280,height:960},deviceScaleFactor:1});
page.on('pageerror',e=>console.log('PAGE_ERROR',e.message));
await page.goto('http://127.0.0.1:5187/');
await page.waitForFunction(()=>window.cupViewer?.ready(),{timeout:60000});
await page.waitForTimeout(1500);
console.log(await page.evaluate(()=>window.cupViewer.debug()));
await page.screenshot({path:'../evidence/hero-reference-pass1.png'});
await browser.close();
EOF
node tools/snapshot.mjs