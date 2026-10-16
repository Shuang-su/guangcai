/** Review-only authoring proof; does not touch runtime assets or catalog. */
import {readFile,writeFile,rename} from 'node:fs/promises';
import sharp from 'sharp';
const master='assets/masters/beijing-vector/',out='public/review/beijing-vector/';
const glyph=await readFile(master+'plaque-source.png');
let svg=(await readFile(master+'pen-roof.svg','utf8')).replace('plaque-source.png','data:image/png;base64,'+glyph.toString('base64'));
await sharp(Buffer.from(svg)).resize(1215,765).flatten({background:'#fff'}).png().toFile(out+'pen-roof.png');
let lines=svg.replace(/<g id="fill-regions"[\s\S]*?<\/g>/,'').replace(/stroke="#[a-fA-F0-9]+"/g,'stroke="#222222"');
await writeFile(master+'pen-roof-lines.svg',lines);
await sharp(Buffer.from(lines)).resize(1215,765).flatten({background:'#fff'}).png().toFile(out+'pen-roof-lines.png');
await sharp('assets/source/beijing/beijing-lines-original.png').extract({left:535,top:214,width:405,height:255}).flatten({background:'#fff'}).resize(1215,765).png().toFile(out+'source-roof.png');
await sharp('assets/extracted/layer-6-alpha.png').negate().resize(1215).png().toFile(out+'china-psd-standard.png');
await sharp('assets/masters/beijing-4.3/imagegen-upscale-candidate.png').extract({left:535,top:214,width:405,height:255}).flatten({background:'#fff'}).resize(1215,765).png().toFile(out+'rejected-roof.png');
const test={date:'2026-10-14',status:'authoring-method-study-only',productionChanged:false,sourceFrame:[535,214,405,255],outerStroke:2.4,innerStroke:1.15,units:'source pixels, visual standard only; not a manufacturing tolerance',source:'user Beijing PNG',styleStandard:'original China PSD / 天坛线',penPaths:'explicitly authored cubic Bezier paths; not imagegen or automatic trace',text:'original source plaque glyph bitmap preserved, not vector-redrawn',notComplete:['lower temple tiers','railings and stairs','Great Wall','mountain and cloud fills','full 4K material integration','manufacturing acceptance']};
await writeFile(out+'review.json',JSON.stringify(test,null,2)+'\n');
