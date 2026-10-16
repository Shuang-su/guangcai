import type {MapGeometry} from '../../vendor/glass-hq/src/gpu/geometry';
export const glassCases:MapGeometry[]=[];
for(const appearance of ['light','dark'] as const)for(const dpr of [1,2,3])for(const radius of [0,17,'capsule','circle'] as const)glassCases.push({width:123,height:radius==='circle'?123:57,radius,dpr,appearance});
glassCases.push({width:142.5,height:71.25,radius:12,dpr:1.5,outline:[[15,0],[127,0],[142.5,15],[142.5,50],[125,71.25],[12,71.25],[0,52],[0,15]]});
glassCases.push({width:1,height:1,radius:0,dpr:1},{width:393,height:410,radius:28,dpr:2},{width:860,height:48,radius:'capsule',dpr:2});
export function comparePixels(a:{width:number;height:number;pixels:ArrayLike<number>},b:{width:number;height:number;pixels:ArrayLike<number>}){
 if(a.width!==b.width||a.height!==b.height||a.pixels.length!==b.pixels.length)throw new Error('材质图尺寸或平面数量不同');
 let maximum=0,sum=0,overTwo=0;const channels=a.pixels.length;
 for(let i=0;i<channels;i++){const difference=Math.abs(a.pixels[i]-b.pixels[i]);maximum=Math.max(maximum,difference);sum+=difference;if(difference>2)overTwo++;}
 return {width:a.width,height:a.height,channels,maximum,mean:sum/channels,overTwo,withinTwo:1-overTwo/channels,passed:overTwo/channels<.005};
}
