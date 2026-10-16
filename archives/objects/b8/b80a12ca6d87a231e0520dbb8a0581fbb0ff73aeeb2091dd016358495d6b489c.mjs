import{chromium}from'playwright';
const b=await chromium.launch({channel:'chrome',headless:true});const p=await b.newPage({viewport:{width:430,height:932}});const errors=[];p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
await p.goto('http://127.0.0.1:5177/#/create');await p.waitForSelector('.pbr-ready');await p.waitForTimeout(1600);await p.getByRole('radio').first().click();await p.locator('[data-action=next-step]').click();await p.waitForTimeout(1800);await p.screenshot({path:'evidence/petal-ribbons/cards-430.png'});
await p.setViewportSize({width:780,height:958});await p.waitForTimeout(600);await p.screenshot({path:'evidence/petal-ribbons/cards-780.png',fullPage:true});
await p.goto('http://127.0.0.1:5177/#/intro');await p.waitForSelector('.intro-stage');await p.waitForTimeout(600);
for(const n of [.18,.43,.60,.70,.99]){await p.evaluate(n=>{const root=document.querySelector('.intro-scroll');scrollTo(0,n*(root.offsetHeight-innerHeight));},n);await p.waitForTimeout(350);await p.screenshot({path:`evidence/petal-ribbons/intro-${n}.png`});}
console.log(errors);await b.close();
