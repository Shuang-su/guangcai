import {hslRgb,type Appearance} from '../styles/city-appearance';
import {colorAtPosition} from '../styles/xy-mapping';
import type {PadPainter} from './xy-pad';

let colorCache:{pixels:number;padding:number;canvas:HTMLCanvasElement}|undefined;
export function colorField(lightness:number):PadPainter {
 return (ctx,size,inset)=>{
  const pixels=Math.min(512,Math.round(size*2)),padding=inset/size;
  if(!colorCache||colorCache.pixels!==pixels||colorCache.padding!==padding){
   const buffer=document.createElement('canvas');buffer.width=buffer.height=pixels;
   const off=buffer.getContext('2d')!,data=off.createImageData(pixels,pixels);
   for(let row=0;row<pixels;row++)for(let col=0;col<pixels;col++){
    const c=colorAtPosition({x:(col/(pixels-1)-padding)/(1-2*padding),y:1-(row/(pixels-1)-padding)/(1-2*padding)},0);
    const rgb=hslRgb(c.hue,c.saturation,50),i=4*(row*pixels+col);
    data.data[i]=Math.round(rgb[0]*255);data.data[i+1]=Math.round(rgb[1]*255);data.data[i+2]=Math.round(rgb[2]*255);data.data[i+3]=255;
   }
   off.putImageData(data,0,0);colorCache={pixels,padding,canvas:buffer};
  }
  // At fixed hue/saturation HSL is affine on either side of L=50%. Reuse the
  // cached chroma field, avoiding per-pixel trigonometry during lightness drags.
  ctx.drawImage(colorCache.canvas,0,0,size,size);
  const l=Math.max(0,Math.min(100,lightness))/100;
  ctx.fillStyle=l<.5?`rgba(0,0,0,${1-2*l})`:`rgba(255,255,255,${2*l-1})`;
  ctx.fillRect(0,0,size,size);
 };
}
/** A tinted navigation field; the cup remains the physically rendered material preview. */
export function materialField(appearance:Appearance):PadPainter {
 const {hue,saturation,lightness}=appearance;
 return (ctx,size)=>{
  const base=ctx.createLinearGradient(0,size,size,0);
  base.addColorStop(0,`hsl(${hue} ${saturation*.45}% ${Math.min(80,lightness+18)}%)`);
  base.addColorStop(.55,`hsl(${hue} ${saturation*.65}% ${Math.max(15,lightness)}%)`);
  base.addColorStop(1,`hsl(${hue} ${saturation*.7}% ${Math.max(10,lightness-15)}%)`);
  ctx.fillStyle=base;ctx.fillRect(0,0,size,size);
  const sheen=ctx.createLinearGradient(0,0,size,size);
  sheen.addColorStop(0,'#ffffff00');sheen.addColorStop(.55,'#ffffff04');sheen.addColorStop(.78,'#ffffff60');sheen.addColorStop(1,'#ffffff08');
  ctx.fillStyle=sheen;ctx.fillRect(0,0,size,size);
 };
}
