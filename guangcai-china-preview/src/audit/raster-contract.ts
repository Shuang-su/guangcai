import {createRasterGlass} from '../ui/glass-raster';
import {getMaterialMaps} from '../../vendor/glass-hq/src/dom/maps';
import type {LayerLens} from '../../vendor/glass-hq/src/dom/lens-layers';

/** Audit-only pixel probe: a known gradient makes displacement observable
 * independently of the Three scene and of screenshots that merely look shiny. */
export async function rasterContract(){
 const root=document.createElement('div');root.style.cssText='position:fixed;left:0;top:0;width:256px;height:160px;z-index:9999;background:white';
 const content=document.createElement('div'),source=document.createElement('canvas');source.width=256;source.height=160;content.append(source);root.append(content);document.body.append(root);
 const context=source.getContext('2d')!;
 const paint=(inverted=false)=>{for(let x=0;x<256;x++){context.fillStyle=`rgb(${inverted?255-x:x},80,120)`;context.fillRect(x,0,1,160);}};paint();
 const plane=(r:number,g:number,b:number,a:number)=>{const c=document.createElement('canvas');c.width=c.height=2;const ctx=c.getContext('2d')!;ctx.fillStyle=`rgba(${r},${g},${b},${a})`;ctx.fillRect(0,0,2,2);return c.toDataURL();};
 const maps={field:plane(192,128,128,1),overlay:plane(0,0,0,0),duration:0};
 const element=document.createElement('div');root.append(element);
 const lens:LayerLens={serial:1,element,options:{material:'clear'},maps,x:32,y:16,w:192,h:128,opacity:1,refraction:0,parents:[],beneath:[],frame:{left:32,top:16,sx:1,sy:1,clientLeft:0,clientTop:0}};
 const errors:string[]=[],renderer=createRasterGlass(root,e=>errors.push(String(e)));
 const read=(x=100,y=80)=>{renderer.captureModel();renderer.render();const c=root.querySelector<HTMLCanvasElement>('.glass-raster')!,gl=c.getContext('webgl2')!,pixel=new Uint8Array(4),dpr=c.width/256;gl.readPixels(Math.floor(x*dpr),c.height-Math.floor(y*dpr)-1,1,1,gl.RGBA,gl.UNSIGNED_BYTE,pixel);return [...pixel];};
 const set=(lenses:LayerLens[])=>{renderer.update(lenses,content,{width:256,height:160});renderer.captureModel();renderer.render();};
 try{
  set([lens]);await new Promise(r=>setTimeout(r,150));const neutral=read();
  lens.refraction=20;set([lens]);const refracted=read();
  const child={...lens,serial:2,parents:[lens]};set([lens,child]);const nested=read();
  paint(true);const live=read();paint();
  lens.clipBounds={x:80,y:40,width:80,height:80};set([lens]);const clipped=read(50,80),inside=read(100,80);delete lens.clipBounds;
  lens.maps=await getMaterialMaps({width:192,height:128,radius:24,dpr:2,appearance:'light'});set([lens]);const firstFrame=read(128,80);await new Promise(r=>setTimeout(r,150));const corner=read(32,16),edge=read(35,80),center=read(128,80);
  return {neutral,refracted,nested,live,clipped,inside,firstFrame,corner,edge,center,errors,debug:renderer.debug()};
 }finally{renderer.dispose();root.remove();}
}
