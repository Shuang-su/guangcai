import {readFile,writeFile,copyFile} from 'node:fs/promises';
import sharp from 'sharp';
const root='public/review/v4-color-coverage';
for(const id of ['china-green','china-red','china-purple','china-blue']){
 const before=await sharp(`${root}/before/${id}-enamel-detail.png`).extract({left:140,top:210,width:745,height:580}).jpeg({quality:94}).toBuffer();
 const after=await sharp(`${root}/after/${id}-enamel-detail.png`).extract({left:140,top:210,width:745,height:580}).jpeg({quality:94}).toBuffer();
 await sharp({create:{width:1490,height:580,channels:3,background:'#ffffff'}}).composite([{input:before,left:0,top:0},{input:after,left:745,top:0}]).jpeg({quality:94}).toFile(`${root}/${id}-comparison.jpg`);
}
const ids=['china-green','china-red','china-purple','china-blue','china-blue-line','china-purple-line','shenzhen-red','shenzhen-teal'];
const tiles=await Promise.all(ids.map(async(id,i)=>({input:await sharp(`public/review/v4/${id}-enamel-hero.jpg`).resize(440,360).toBuffer(),left:(i%4)*440,top:Math.floor(i/4)*360})));
await sharp({create:{width:1760,height:720,channels:3,background:'#bbb'}}).composite(tiles).jpeg({quality:91}).toFile('public/review/v4/variants-overview.jpg');
await copyFile('output/playwright/v4-color-coverage/asset-check.json',root+'/asset-check.json');
const section=`<!-- COVERAGE FIX BEGIN --><section id="color-coverage"><h2>V4 · 建筑下部颜色覆盖修正</h2><p>修正青绿、红金、紫金、蓝金四款的下部断色：原导出脚本曾用矩形米白区域统一覆盖建筑底部，现在栏杆、台阶及塔身下部都延续所选配色。金线、凹凸、图样轮廓和白色花瓣保持原样。</p><figure><a href="review/v4-color-coverage/china-green-comparison.jpg"><img src="review/v4-color-coverage/china-green-comparison.jpg" alt="青绿款同机位修正前后对比"></a><figcaption>左：修正前的米白覆盖。右：修正后连续的青绿填色。同机位、同灯光、同材质。</figcaption></figure><p>${[['china-red','红金'],['china-purple','紫金'],['china-blue','蓝金']].map(([id,name])=>`<a href="review/v4-color-coverage/${id}-comparison.jpg">${name}同机位前后对照</a>`).join(' · ')} · <a href="review/v4-color-coverage/asset-check.json">颜色及未变通道检查</a></p><p>下方 V4 材质画廊已更新为修正后的实景截图。原版纯金和凹凸灰模的同机位画面保持一致。</p></section><!-- COVERAGE FIX END -->`;
let html=await readFile('public/evidence.html','utf8');html=html.replace(/<!-- COVERAGE FIX BEGIN -->[\s\S]*?<!-- COVERAGE FIX END -->/,'');html=html.replace('<!-- V4 BEGIN -->',section+'<!-- V4 BEGIN -->');await writeFile('public/evidence.html',html);
