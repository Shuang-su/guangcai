export interface XYPosition {x:number;y:number}
const clamp=(v:number)=>Math.max(0,Math.min(1,v));
export function normalizePosition(value:XYPosition):XYPosition {
 if(!Number.isFinite(value.x)||!Number.isFinite(value.y))throw new Error('调整位置必须为有限数值');
 return {x:clamp(value.x),y:clamp(value.y)};
}
const wrapHue=(h:number)=>((h%360)+360)%360;
/** y points upwards. Hue zero is at the top; saturation reaches every square edge. */
export function colorAtPosition(position:XYPosition,previousHue:number){
 if(!Number.isFinite(previousHue))throw new Error('色相必须为有限数值');
 const p=normalizePosition(position),u=2*p.x-1,v=2*p.y-1;
 const radius=Math.max(Math.abs(u),Math.abs(v));
 return {hue:radius<1e-10?wrapHue(previousHue):wrapHue(Math.atan2(-u,v)*180/Math.PI),saturation:radius*100};
}
export function colorPosition(hue:number,saturation:number):XYPosition {
 if(!Number.isFinite(hue)||!Number.isFinite(saturation))throw new Error('颜色必须为有限数值');
 const angle=wrapHue(hue)*Math.PI/180,u=-Math.sin(angle),v=Math.cos(angle);
 const scale=clamp(saturation/100)/Math.max(Math.abs(u),Math.abs(v));
 return normalizePosition({x:(1+u*scale)/2,y:(1+v*scale)/2});
}
