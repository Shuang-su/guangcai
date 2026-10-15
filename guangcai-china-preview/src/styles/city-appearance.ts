export const palettes = {
 gold:{name:'纯金',dark:'#ffc643',light:'#ffc643',material:1},
 green:{name:'青绿',dark:'#176647',light:'#82b89c',material:0},
 red:{name:'朱红',dark:'#941c16',light:'#c94a33',material:0},
 purple:{name:'紫',dark:'#57287f',light:'#ad83c5',material:0},
 blue:{name:'蓝',dark:'#124d80',light:'#75b4d0',material:0},
} as const;
export type Palette=keyof typeof palettes;
export interface Appearance {preset:Palette;hue:number;saturation:number;lightness:number;material:number;relief:number}
const clamp=(x:number,a=0,b=1)=>Math.min(b,Math.max(a,x));
export function hexHsl(hex:string):[number,number,number]{
 const [r,g,b]=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255),max=Math.max(r,g,b),min=Math.min(r,g,b),d=max-min,l=(max+min)/2;
 let h=0;if(d)h=max===r?((g-b)/d+(g<b?6:0)):max===g?(b-r)/d+2:(r-g)/d+4;
 return [h*60,d?d/(1-Math.abs(2*l-1))*100:0,l*100];
}
export function hslRgb(h:number,s:number,l:number):[number,number,number]{
 s=clamp(s/100);l=clamp(l/100);h=((h%360)+360)%360/60;
 const c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs(h%2-1)),m=l-c/2;
 const rgb=h<1?[c,x,0]:h<2?[x,c,0]:h<3?[0,c,x]:h<4?[0,x,c]:h<5?[x,0,c]:[c,0,x];
 return rgb.map(v=>v+m) as [number,number,number];
}
export function presetAppearance(preset:Palette):Appearance{
 const [hue,saturation,lightness]=hexHsl(palettes[preset].dark);
 return {preset,hue,saturation,lightness,material:palettes[preset].material,relief:1};
}
export function normalizeAppearance(value:Appearance):Appearance{
 if(!value||!Object.hasOwn(palettes,value.preset))throw new Error('未知配色预设');
 for(const key of ['hue','saturation','lightness','material','relief'] as const)if(!Number.isFinite(value[key]))throw new Error('创作参数必须为有限数值');
 return {...value,hue:clamp(value.hue,0,360),saturation:clamp(value.saturation,0,100),lightness:clamp(value.lightness,0,100),material:clamp(value.material),relief:clamp(value.relief,0,2)};
}
export function appearanceColors(a:Appearance):{dark:[number,number,number];light:[number,number,number]}{
 const p=palettes[a.preset],base=hexHsl(p.dark),light=hexHsl(p.light);
 return {dark:hslRgb(a.hue,a.saturation,a.lightness),light:hslRgb(a.hue+light[0]-base[0],a.saturation+light[1]-base[1],a.lightness+light[2]-base[2])};
}
export function materialAt(t:number){return {metalness:t,roughness:.31+(72/255-.31)*t,clearcoat:191/255+(26/255-191/255)*t};}
export const GOLD_LINE=Object.freeze({color:'#dcb251',metalness:1,roughness:.23,clearcoat:26/255});
