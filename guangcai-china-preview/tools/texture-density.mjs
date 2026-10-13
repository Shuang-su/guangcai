import sharp from 'sharp';
import {writeFile} from 'node:fs/promises';
const styles={original:'public/artwork', 'peony-magnolia':'public/artwork/peony-magnolia', 'lotus-butterfly':'public/artwork/lotus-butterfly'};
const report={note:'Proxy based on the existing ochre color mask, not a semantic ground-truth measurement. Nonmetal mask pixels below 128 count as enamel.',styles:{}};
for(const [id,dir] of Object.entries(styles)){
 report.styles[id]={};
 for(const region of ['body','handle','saucer']){
  const {data,info}=await sharp(dir+'/'+region+'-metalness.png').greyscale().raw().toBuffer({resolveWithObject:true});
  const fraction=(a,b)=>{let paint=0,total=0;for(let y=Math.floor(info.height*a);y<Math.floor(info.height*b);y++)for(let x=0;x<info.width;x++){paint+=data[y*info.width+x]<128?1:0;total++;}return +(paint/total).toFixed(4);};
  report.styles[id][region]={enamelCoverage:fraction(0,1),top20Percent:fraction(0,.2),bottom20Percent:fraction(.8,1)};
 }
}
await writeFile(process.argv[2]??'../evidence/textures/density-final.json',JSON.stringify(report,null,2));
console.log(JSON.stringify(report));

