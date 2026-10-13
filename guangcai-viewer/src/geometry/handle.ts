import { BufferGeometry, CubicBezierCurve3, CurvePath, Float32BufferAttribute, Vector3 } from 'three';
import type { Dimensions } from './parameters';

/** Side silhouette fitted to IMG_1154 / 1158 / 1163. Dimensions remain estimates.
 * A short level upper arm, a rounded square shoulder and one continuous lower
 * return; all joins share tangent directions. No separate hooked lower stem. */
export function handlePath(p: Dimensions) {
  const r=p.radius,reach=p.handleReach,upper=p.height*.865,lower=p.height*.325;
  const v=(x:number,y:number)=>new Vector3(r+x,y,0);
  const path=new CurvePath<Vector3>();
  path.add(new CubicBezierCurve3(v(.25,upper),v(5,upper+1.3),v(reach-11,upper+1.3),v(reach-5,upper+1.3)));
  path.add(new CubicBezierCurve3(v(reach-5,upper+1.3),v(reach-1.4,upper+1.3),v(reach,upper-.3),v(reach,upper-4.5)));
  path.add(new CubicBezierCurve3(v(reach,upper-4.5),v(reach,lower+(upper-lower)*.43),v(reach*.76,lower),v(.25,lower)));
  path.arcLengthDivisions=1200;
  return {path,upper,lower};
}

/** Shallow flared porcelain collar follows the cylindrical wall rather than
 * placing a sphere on it. Ends overlap the cup and ribbon to hide their seams. */
export function handleCollar(radius:number,width:number,thickness:number) {
  const points:number[]=[],uvs:number[]=[],indices:number[]=[],n=64;
  const rings=[[-.35,thickness*.79,width*.58],[.1,thickness*.77,width*.58],[.6,thickness*.67,width*.55],[1.35,thickness*.55,width*.50],[2.2,thickness*.42,width*.43]];
  for(let j=0;j<rings.length;j++){
    const [x,ry,rz]=rings[j];
    for(let i=0;i<=n;i++){
      const a=i/n*Math.PI*2,y=Math.sign(Math.cos(a))*Math.pow(Math.abs(Math.cos(a)),.55)*ry,z=Math.sign(Math.sin(a))*Math.pow(Math.abs(Math.sin(a)),.55)*rz;
      points.push(Math.sqrt(radius*radius-z*z)+x,y,z);uvs.push(i/n,j/(rings.length-1));
    }
  }
  for(let j=0;j<rings.length-1;j++)for(let i=0;i<n;i++){
    const a=j*(n+1)+i,b=a+n+1;indices.push(a,a+1,b,b,a+1,b+1);
  }
  const g=new BufferGeometry();g.setAttribute('position',new Float32BufferAttribute(points,3));g.setAttribute('uv',new Float32BufferAttribute(uvs,2));g.setIndex(indices);g.computeVertexNormals();
  // Average the duplicated seam normals for a continuous porcelain highlight.
  const normals=g.getAttribute('normal');
  for(let j=0;j<rings.length;j++){
    const a=j*(n+1),b=a+n,v=new Vector3().fromBufferAttribute(normals,a).add(new Vector3().fromBufferAttribute(normals,b)).normalize();
    normals.setXYZ(a,v.x,v.y,v.z);normals.setXYZ(b,v.x,v.y,v.z);
  }
  g.computeBoundingBox();return g;
}

/** IMG_1237: porcelain spreads into the lid with a tangent fillet, then narrows
 * into the bridge. The ends are buried within the lid and bridge respectively. */
export function knobFoot(width:number,thickness:number){
  const vertices:number[]=[],uvs:number[]=[],indices:number[]=[],segments=64,rings=16;
  for(let j=0;j<=rings;j++){
    const t=j/rings,angle=t*Math.PI/2;
    const y=-.16+2.3*(1-Math.cos(angle));
    const rx=thickness*.5+1.6*(1-Math.sin(angle));
    const rz=width*.5+1.4*(1-Math.sin(angle));
    for(let i=0;i<=segments;i++){
      const a=i/segments*Math.PI*2;
      vertices.push(Math.cos(a)*rx,y,Math.sin(a)*rz);uvs.push(i/segments,t);
    }
  }
  for(let j=0;j<rings;j++)for(let i=0;i<segments;i++){
    const a=j*(segments+1)+i,b=a+segments+1;indices.push(a,b,a+1,b,b+1,a+1);
  }
  const g=new BufferGeometry();g.setAttribute('position',new Float32BufferAttribute(vertices,3));g.setAttribute('uv',new Float32BufferAttribute(uvs,2));g.setIndex(indices);g.computeVertexNormals();
  const normals=g.getAttribute('normal');
  for(let j=0;j<=rings;j++){
    const a=j*(segments+1),b=a+segments,v=new Vector3().fromBufferAttribute(normals,a).add(new Vector3().fromBufferAttribute(normals,b)).normalize();normals.setXYZ(a,v.x,v.y,v.z);normals.setXYZ(b,v.x,v.y,v.z);
  }
  g.computeBoundingBox();return g;
}
