import { BufferGeometry, Curve, Float32BufferAttribute, Vector3 } from 'three';

/** Broad porcelain strap, with a lightly crowned gilded side and rounded edges.
 * Artwork V follows the OUTER rail, never the centreline (bends have different lengths). */
export function ribbon(path: Curve<Vector3>, width: number, thickness: number, segments = 192, decoration = true) {
  const g=new BufferGeometry(),pos:number[]=[],uv:number[]=[],indices:number[]=[],buckets=[[],[],[]] as number[][];
  const ht=thickness/2,hw=width/2,bevel=Math.min(1.05,thickness*.22),flatWidth=width-2*bevel;
  const section:{a:number;b:number;material:number}[]=[];
  // Counter-clockwise section in (outward, width) coordinates. Each edge owns its material.
  for(let corner=0;corner<4;corner++){
    const begin=corner*Math.PI/2,ca=Math.cos(begin+Math.PI/4)>0?ht-bevel:-ht+bevel,cb=Math.sin(begin+Math.PI/4)>0?hw-bevel:-hw+bevel;
    for(let k=0;k<8;k++){const t=begin+k/8*Math.PI/2;section.push({a:ca+bevel*Math.cos(t),b:cb+bevel*Math.sin(t),material:1});}
    const end=begin+Math.PI/2,a=ca+bevel*Math.cos(end),b=cb+bevel*Math.sin(end);
    const nextBegin=(corner+1)*Math.PI/2,nca=Math.cos(nextBegin+Math.PI/4)>0?ht-bevel:-ht+bevel,ncb=Math.sin(nextBegin+Math.PI/4)>0?hw-bevel:-hw+bevel;
    const a2=nca+bevel*Math.cos(nextBegin),b2=ncb+bevel*Math.sin(nextBegin);
    for(let k=0;k<12;k++){
      const t=k/12,aa=a+(a2-a)*t,bb=b+(b2-b)*t;
      // A soft ceramic crown changes reflected strips smoothly across each side.
      const side=corner===0||corner===2,crown=side?.45*Math.sin(t*Math.PI):.035*Math.sin(t*Math.PI);
      section.push({a:aa+(side?0:(corner===3?1:-1)*crown),b:bb+(side?(corner===0?1:-1)*crown:0),material:corner===3&&decoration?2:corner===1?0:1});
    }
  }
  const n=section.length,centres:Vector3[]=[],outwards:Vector3[]=[],lengths=[0];let previous:Vector3|undefined;
  for(let i=0;i<=segments;i++){
    const p=path.getPointAt(i/segments),t=path.getTangentAt(i/segments).normalize(),out=new Vector3(-t.y,t.x,0),rail=p.clone().addScaledVector(out,ht);
    centres.push(p);outwards.push(out);if(previous)lengths.push(lengths[i-1]+rail.distanceTo(previous));previous=rail;
  }
  for(let i=0;i<=segments;i++)for(let j=0;j<=n;j++){
    const s=section[j%n],p=centres[i],out=outwards[i];pos.push(p.x+out.x*s.a,p.y+out.y*s.a,p.z+s.b);
    uv.push(.5+s.b/flatWidth,1-lengths[i]/lengths[segments]);
  }
  for(let i=0;i<segments;i++)for(let j=0;j<n;j++){
    const a=i*(n+1)+j,b=(i+1)*(n+1)+j;buckets[section[j].material].push(a,a+1,b,b,a+1,b+1);
  }
  buckets.forEach((data,m)=>{g.addGroup(indices.length,data.length,m);for(const index of data)indices.push(index);});
  g.setAttribute('position',new Float32BufferAttribute(pos,3));g.setAttribute('uv',new Float32BufferAttribute(uv,2));g.setIndex(indices);g.computeVertexNormals();
  const normals=g.getAttribute('normal');
  for(let i=0;i<=segments;i++){const a=i*(n+1),b=a+n,v=new Vector3().fromBufferAttribute(normals,a).add(new Vector3().fromBufferAttribute(normals,b)).normalize();normals.setXYZ(a,v.x,v.y,v.z);normals.setXYZ(b,v.x,v.y,v.z);}
  g.userData.surfaceMetrics={width:flatWidth,length:lengths[segments],aspect:flatWidth/lengths[segments]};g.computeBoundingBox();return g;
}
