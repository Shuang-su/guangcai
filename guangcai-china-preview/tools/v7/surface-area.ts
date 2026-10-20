import {Mesh,Vector3} from 'three';
export function materialArea(mesh:Mesh,material:number){const g=mesh.geometry,p=g.getAttribute('position'),ix=g.index!;let total=0;for(const group of g.groups)if(group.materialIndex===material)for(let i=group.start;i<group.start+group.count;i+=3){const a=new Vector3().fromBufferAttribute(p,ix.getX(i)),b=new Vector3().fromBufferAttribute(p,ix.getX(i+1)),c=new Vector3().fromBufferAttribute(p,ix.getX(i+2));total+=b.sub(a).cross(c.sub(a)).length()/2;}return total;}
// Actual indexed triangles, with a centre sample per 4K texture pixel. Each
// triangle has a constant UV-to-surface Jacobian; normalize quadrature to its
// exact total geometric area so the all-painted reference is exactly 100%.
export function surfaceRaster(mesh:Mesh,width:number,height:number){
 const g=mesh.geometry,p=g.getAttribute('position'),uv=g.getAttribute('uv1'),ix=g.index!,weights=new Float64Array(width*height);let area=0,frameArea=0;
 const sourceV=1-61.370293965961764/1783;
 for(const group of g.groups)if(group.materialIndex===3)for(let i=group.start;i<group.start+group.count;i+=3){
  const ids=[0,1,2].map(j=>ix.getX(i+j)),xyz=ids.map(j=>new Vector3().fromBufferAttribute(p,j)),t=ids.map(j=>[uv.getX(j),uv.getY(j)]),cross=(a:number[],b:number[],c:number[])=>(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);
  const denominator=cross(t[0],t[1],t[2]),uvArea=Math.abs(denominator)/2,physical=xyz[1].clone().sub(xyz[0]).cross(xyz[2].clone().sub(xyz[0])).length()/2,density=physical/uvArea;area+=physical;
  let polygon=t;const clipped:number[][]=[];for(let j=0;j<polygon.length;j++){const a=polygon[j],b=polygon[(j+1)%polygon.length],inA=a[1]<=sourceV,inB=b[1]<=sourceV;if(inA)clipped.push(a);if(inA!==inB){const f=(sourceV-a[1])/(b[1]-a[1]);clipped.push([a[0]+f*(b[0]-a[0]),sourceV]);}}let clippedArea=0;for(let j=0;j<clipped.length;j++){const a=clipped[j],b=clipped[(j+1)%clipped.length];clippedArea+=a[0]*b[1]-a[1]*b[0];}frameArea+=Math.abs(clippedArea)/2*density;
  const left=Math.max(0,Math.floor(Math.min(...t.map(v=>v[0]))*width)),right=Math.min(width-1,Math.ceil(Math.max(...t.map(v=>v[0]))*width)),top=Math.max(0,Math.floor((1-Math.max(...t.map(v=>v[1])))*height)),bottom=Math.min(height-1,Math.ceil((1-Math.min(...t.map(v=>v[1])))*height));
  for(let y=top;y<=bottom;y++)for(let x=left;x<=right;x++){const q=[(x+.5)/width,1-(y+.5)/height],a=cross(t[1],t[2],q)/denominator,b=cross(t[2],t[0],q)/denominator,c=1-a-b;if(a>=-1e-9&&b>=-1e-9&&c>=-1e-9)weights[y*width+x]=density/(width*height);}
 }
 let sampled=0;for(const w of weights){if(!w)throw Error('Uncovered UV sample');sampled+=w;}const normalization=area/sampled;for(let i=0;i<weights.length;i++)weights[i]*=normalization;
 return {weights,areaMm2:area,boardAreaMm2:frameArea,boardCoverage:frameArea/area,quadratureNormalization:normalization};
}
