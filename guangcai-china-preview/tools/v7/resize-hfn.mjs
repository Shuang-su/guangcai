import {gunzipSync,gzipSync} from 'node:zlib';
import {DataUtils} from 'three';
export function resizeNormal(source,d,sourceAtlas){
 const raw=gunzipSync(source),w=raw.readUInt32LE(4),h=raw.readUInt32LE(8);
 if(raw.toString('ascii',0,4)!=='HFN1'||raw.length!==16+w*h*8)throw Error('Invalid HFN source');
 if(w===d.w&&h===d.h&&!sourceAtlas)return source;
 const input=new Uint16Array(raw.buffer,raw.byteOffset+16,w*h*4),out=Buffer.alloc(16+d.w*d.h*8);
 out.write('HFN1');out.writeUInt32LE(d.w,4);out.writeUInt32LE(d.h,8);out.writeUInt32LE(1,12);
 const data=new Uint16Array(out.buffer,out.byteOffset+16,d.w*d.h*4);
 const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
 for(let y=0;y<d.h;y++)for(let x=0;x<d.w;x++){
  let sx=(x+.5)*w/d.w-.5,sy=(y+.5)*h/d.h-.5;
  if(sourceAtlas){const a=d.atlas,rh=a.contentHeight+2*a.gutter,row=Math.floor(y/rh);
   sx=sourceAtlas.gutter+clamp((x-a.gutter+.5)/a.contentWidth,0,1)*sourceAtlas.contentWidth-.5;
   sy=row*(sourceAtlas.contentHeight+2*sourceAtlas.gutter)+sourceAtlas.gutter+clamp((y%rh-a.gutter+.5)/a.contentHeight,0,1)*sourceAtlas.contentHeight-.5;
   sx=clamp(sx,sourceAtlas.gutter,sourceAtlas.gutter+sourceAtlas.contentWidth-1);
   sy=clamp(sy,row*(sourceAtlas.contentHeight+2*sourceAtlas.gutter)+sourceAtlas.gutter,(row+1)*(sourceAtlas.contentHeight+2*sourceAtlas.gutter)-sourceAtlas.gutter-1);
  }
  sx=clamp(sx,0,w-1);sy=clamp(sy,0,h-1);
  const x0=Math.floor(sx),y0=Math.floor(sy),x1=Math.min(w-1,x0+1),y1=Math.min(h-1,y0+1),fx=sx-x0,fy=sy-y0;
  const offsets=[((h-1-y0)*w+x0)*4,((h-1-y0)*w+x1)*4,((h-1-y1)*w+x0)*4,((h-1-y1)*w+x1)*4];
  const weights=[(1-fx)*(1-fy),fx*(1-fy),(1-fx)*fy,fx*fy],n=[0,0,0];
  for(let k=0;k<3;k++)for(let j=0;j<4;j++)n[k]+=(DataUtils.fromHalfFloat(input[offsets[j]+k])*2-1)*weights[j];
  const length=Math.hypot(...n)||1,index=((d.h-1-y)*d.w+x)*4;
  for(let k=0;k<3;k++)data[index+k]=DataUtils.toHalfFloat(n[k]/length*.5+.5);
  data[index+3]=DataUtils.toHalfFloat(1);
 }
 return gzipSync(out,{level:9});
}
