import sharp from 'sharp';import{mkdir,writeFile,copyFile}from'node:fs/promises';
const dir='assets/masters/v3-restored';await mkdir(dir+'/inputs',{recursive:true});
const s='assets/masters/v3-hq/saucer-continuous.png',m=await sharp(s).metadata(),tiled=await sharp({create:{width:m.width*3,height:m.height,channels:3,background:'#fff'}}).composite([0,1,2].map(i=>({input:s,left:i*m.width,top:0}))).png().toBuffer();
const parts=[{id:'saucer-00',start:-384,width:768,height:195,generated:'pilot-generated.png'}];
for(let i=1;i<9;i++){const start=Math.round(i*m.width/9)-450,id='saucer-'+String(i).padStart(2,'0');await sharp(tiled).extract({left:m.width+start,top:0,width:900,height:m.height}).png().toFile(`${dir}/inputs/${id}.png`);parts.push({id,start,width:900,height:195,generated:id+'-generated.png'});}
await copyFile('assets/masters/v3/body.png',dir+'/inputs/body.png');
for(const [id,top]of [['handle-top',0],['handle-bottom',798]])await sharp('assets/masters/v3/handle.png').extract({left:0,top,width:148,height:926}).png().toFile(`${dir}/inputs/${id}.png`);
await writeFile(dir+'/layout.json',JSON.stringify({sourceSize:[6924,195],virtualTarget:[16256,512],saucer:parts,handle:{top:[0,926],bottom:[798,926]},scope:'Generative high-definition restoration; underlying motifs and placement constrained by supplied source; source originals retained.'},null,2));console.log(parts);
