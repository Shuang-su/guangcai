// Artistic material separation on flat option patterns. Never changes cup geometry/material regions.
import sharp from 'sharp';import{mkdir,writeFile}from'node:fs/promises';
const ids=['sea','cross','star','tide','bloom','birds','butterfly','garden','weave','reflect','cluster','relay','blue','gold','green','red','mountain','new','together','future'];
await mkdir('public/materials/options',{recursive:true});
for(const id of ids){
 const{data,info}=await sharp(`public/media/options/${id}.webp`).resize(256,192).removeAlpha().raw().toBuffer({resolveWithObject:true});const{width:w,height:h,channels:c}=info;
 const mask=new Float32Array(w*h);
 for(let i=0;i<w*h;i++){const r=data[i*c]/255,g=data[i*c+1]/255,b=data[i*c+2]/255;mask[i]=Math.min(1,Math.max(0,(Math.min(r-g+.12,g-b)-.06)*6));}
 for(const kind of ['normal','roughness','metalness','clearcoat']){
  const out=Buffer.alloc(w*h*3);
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=y*w+x,m=mask[i];let rgb;
   if(kind==='normal'){const dx=mask[y*w+Math.min(w-1,x+1)]-mask[y*w+Math.max(0,x-1)],dy=mask[Math.min(h-1,y+1)*w+x]-mask[Math.max(0,y-1)*w+x];rgb=[128-dx*20,128-dy*20,255];}
   else{const n=kind==='metalness'?m*205:kind==='roughness'?104-m*42:235-m*80;rgb=[n,n,n];}
   rgb.forEach((v,j)=>out[i*3+j]=Math.round(v));
  }
  await sharp(out,{raw:{width:w,height:h,channels:3}}).png().toFile(`public/materials/options/${id}-${kind}.png`);
 }
}
await writeFile('public/materials/options/manifest.json',JSON.stringify({version:'pure-pattern-pbr-v1',source:'tools/build-option-maps.mjs',ids,baseColor:'../../media/options/<id>.webp',channels:['normal','roughness','metalness','clearcoat'],notes:'Artist-approximated gold/enamel masks from pigment colors, not measured material maps. Used only on option cards; never applied to the cup.'},null,2));console.log('Built PBR map sets for 20 pattern cards');
