import{chromium}from'playwright';import{readFile}from'node:fs/promises';
const root='.codex-work/tmp/relief-separation',out='output/playwright/relief-separation';
const data=async name=>'data:image/png;base64,'+(await readFile(`${root}/${name}`)).toString('base64');
const browser=await chromium.launch({channel:'chrome',headless:true});const p=await browser.newPage({viewport:{width:1440,height:1000}});
try{await p.goto('http://127.0.0.1:5208/');await p.waitForFunction(()=>window.cupViewer?.ready());const pack=await p.evaluate(()=>window.cupViewer.debug().city.pack);await p.addStyleTag({content:'header,footer,aside,.open-settings,#status{display:none!important}'});
 const rough=await data('roughness.png');
 for(const [name,changes]of[5,6.5].map(g=>[`relief-${g}`,{roughness:rough,normal:null}])){
  if(changes.normal===null)changes.normal=await data(`normal-${Number(name.split('-')[1]).toFixed(1)}.png`);
  await p.evaluate(pack=>window.cupViewer.applyCityArtwork(pack),{...pack,...changes});await p.evaluate(()=>window.cupViewer.setView('detail'));await p.waitForTimeout(1800);await p.screenshot({path:`${out}/${name}-detail.png`});
  await p.evaluate(()=>window.cupViewer.setView('hero'));await p.waitForTimeout(1800);await p.screenshot({path:`${out}/${name}-hero.png`});
 }
}finally{await browser.close();}
