import { activityConfig } from '../domain/activity';
export function loadImage(url:string):Promise<HTMLImageElement>{
 return new Promise((resolve,reject)=>{const i=new Image();i.decoding='async';const timer=setTimeout(()=>reject(new Error('图片素材读取超时')),15000);i.onload=()=>{clearTimeout(timer);resolve(i);};i.onerror=()=>{clearTimeout(timer);reject(new Error('图片素材读取失败'));};i.src=url;});
}
export async function createPoster(cup:Blob):Promise<Blob>{
 const url=URL.createObjectURL(cup);
 try{
  const [image,bg]=await Promise.all([loadImage(url),loadImage(`${import.meta.env.BASE_URL}media/v2/result-portrait.webp`)]);
  await document.fonts.ready;
  const c=document.createElement('canvas');c.width=1080;c.height=1920;const ctx=c.getContext('2d');if(!ctx)throw new Error('当前环境无法生成海报');
  ctx.drawImage(bg,0,0,1080,1920);
  ctx.textAlign='center';ctx.fillStyle='#ae925b';
  ctx.font='110px "Songti SC", "STSong", serif';ctx.fillText('为 APEC',540,245);
  ctx.font='150px "Songti SC", "STSong", serif';ctx.fillText('添彩',540,420);
  // This rectangle is shared with .poster-cup-slot for the live-to-image handoff.
  ctx.drawImage(image,54,460.8,972,972);
  ctx.fillStyle='#8d7953';ctx.font='40px "Songti SC", serif';ctx.fillText(activityConfig.styleName,540,1575);
  return await new Promise((resolve,reject)=>c.toBlob(b=>b?resolve(b):reject(new Error('作品生成失败')),'image/png'));
 }finally{URL.revokeObjectURL(url);}
}
