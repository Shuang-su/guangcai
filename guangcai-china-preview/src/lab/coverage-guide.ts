import {BufferGeometry,Float32BufferAttribute,Group,LineBasicMaterial,LineSegments,Mesh,MeshBasicMaterial,Vector3} from 'three';
import type {Product} from '../geometry/product';

export function citySurfaceMetrics(product:Product){
 const body=product.cup.getObjectByName('cup-wall-and-recessed-foot') as Mesh;
 const g=body.geometry,index=g.index!,position=g.getAttribute('position'),uv=g.getAttribute('uv1');
 const ids=new Set<number>();for(const group of g.groups)if(group.materialIndex===3)for(let i=group.start;i<group.start+group.count;i++)ids.add(index.getX(i));
 const ys=[...ids].map(i=>position.getY(i)),bottom=Math.min(...ys),top=Math.max(...ys);
 const meridian=[...ids].filter(i=>Math.abs(uv.getX(i))<1e-7).sort((a,b)=>position.getY(a)-position.getY(b));let length=0;
 for(let i=1;i<meridian.length;i++)length+=new Vector3().fromBufferAttribute(position,meridian[i]).distanceTo(new Vector3().fromBufferAttribute(position,meridian[i-1]));
 const angle=Math.PI*2-body.userData.bandRadians;
 return {radius:product.parameters.radius,nominalHeight:product.parameters.height,angleDegrees:angle*180/Math.PI,reservedDegrees:body.userData.bandRadians*180/Math.PI,widthMm:product.parameters.radius*angle,heightMm:top-bottom,bottomY:bottom,topY:top,meridianLengthMm:length};
}

// Intersect the actual city triangles in UV1, including the curved lower foot.
// The guide follows existing geometry; it never changes a texture or its UVs.
export function createCoverageGuide(product:Product,sourceTopV:number){
 const body=product.cup.getObjectByName('cup-wall-and-recessed-foot') as Mesh,g=body.geometry,index=g.index!,uv=g.getAttribute('uv1'),pos=g.getAttribute('position'),normal=g.getAttribute('normal'),root=new Group();root.name='lab-coverage-guide';body.add(root);
 const contours=(axis:0|1,value:number,mesh=body,material=3,attribute='uv1')=>{
  const g=mesh.geometry,index=g.index!,uv=g.getAttribute(attribute),pos=g.getAttribute('position'),normal=g.getAttribute('normal'),points:number[]=[];
  for(const group of g.groups)if(group.materialIndex===material)for(let i=group.start;i<group.start+group.count;i+=3){
   const ids=[0,1,2].map(j=>index.getX(i+j)),hits:Vector3[]=[];
   for(let e=0;e<3;e++){
    const a=ids[e],b=ids[(e+1)%3],x=(axis===0?uv.getX(a):uv.getY(a))-value,y=(axis===0?uv.getX(b):uv.getY(b))-value;
    if(x*y>0||Math.abs(x-y)<1e-9)continue;const t=x/(x-y);if(t<0||t>1)continue;
    const p=new Vector3().fromBufferAttribute(pos,a).lerp(new Vector3().fromBufferAttribute(pos,b),t),n=new Vector3().fromBufferAttribute(normal,a).lerp(new Vector3().fromBufferAttribute(normal,b),t).normalize();p.addScaledVector(n,.065);
    if(!hits.some(h=>h.distanceToSquared(p)<1e-10))hits.push(p);
   }
   if(hits.length===2)points.push(...hits[0].toArray(),...hits[1].toArray());
  }
  return points;
 };
 for(const [name,color,paths]of [
  ['uv-frame',0xc67e29,[[0,0],[0,1],[1,0],[1,1]]],
  ['source-top',0x2580bc,[[1,sourceTopV]]],
 ] as const){const geometry=new BufferGeometry();geometry.setAttribute('position',new Float32BufferAttribute(paths.flatMap(([a,v])=>contours(a,v)),3));const line=new LineSegments(geometry,new LineBasicMaterial({color,depthWrite:false,toneMapped:false}));line.name=name;line.renderOrder=3;root.add(line);}
 const regions:{name:string;root:Group;fill:Mesh}[]=[];
 for(const [name,target,material,color]of [['city',body,3,0x5aa5bb],['body',body,1,0xb34a9a],['handle',product.cup.getObjectByName('wide-ribbon-handle') as Mesh,2,0x698b40],['saucer',product.saucer.getObjectByName('saucer-bowl-and-continuous-rim') as Mesh,2,0x9b61b5]] as const){
  const group=new Group();group.name='lab-part-'+name;target.add(group);const geometry=target.geometry,idx=geometry.index!,p=geometry.getAttribute('position'),n=geometry.getAttribute('normal'),edges=new Map<string,{count:number;points:number[]}>(),triangles:number[]=[];
  const point=(id:number)=>new Vector3().fromBufferAttribute(p,id).addScaledVector(new Vector3().fromBufferAttribute(n,id),.07),key=(id:number)=>[p.getX(id),p.getY(id),p.getZ(id)].map(v=>Math.round(v*1e4)).join(',');
  for(const g of geometry.groups)if(g.materialIndex===material)for(let at=g.start;at<g.start+g.count;at+=3){const ids=[0,1,2].map(j=>idx.getX(at+j));for(const id of ids)triangles.push(...point(id).toArray());for(let j=0;j<3;j++){const a=ids[j],b=ids[(j+1)%3],k=[key(a),key(b)].sort().join('|'),old=edges.get(k);if(old)old.count++;else edges.set(k,{count:1,points:[...point(a).toArray(),...point(b).toArray()]});}}
  const lineGeometry=new BufferGeometry();lineGeometry.setAttribute('position',new Float32BufferAttribute([...edges.values()].filter(e=>e.count===1).flatMap(e=>e.points),3));const outline=new LineSegments(lineGeometry,new LineBasicMaterial({color,depthWrite:false,toneMapped:false}));outline.name='part-outline';outline.visible=name!=='city';outline.renderOrder=3;group.add(outline);
  const fillGeometry=new BufferGeometry();fillGeometry.setAttribute('position',new Float32BufferAttribute(triangles,3));const fill=new Mesh(fillGeometry,new MeshBasicMaterial({color,opacity:.15,transparent:true,depthWrite:false,toneMapped:false}));fill.name='surface-area-denominator';fill.renderOrder=2;group.add(fill);
  const seamPoints=name==='saucer'?[.105,.605].flatMap(v=>contours(0,v,target,material,'uv2')):name==='handle'?[1-2070/4473,1-2403/4473].flatMap(v=>contours(1,v,target,material,'uv2')):[];
  if(seamPoints.length){const sg=new BufferGeometry();sg.setAttribute('position',new Float32BufferAttribute(seamPoints,3));const seam=new LineSegments(sg,new LineBasicMaterial({color:0x248bba,depthWrite:false,toneMapped:false}));seam.name='texture-join-guide';seam.renderOrder=4;group.add(seam);}
  regions.push({name,root:group,fill});group.visible=false;
 }
 root.visible=false;let active=false;
 return {set:(enabled:boolean,showSourceTop=true,part='city',highlight=false)=>{active=enabled;root.visible=enabled&&(part==='city'||part==='all');root.getObjectByName('source-top')!.visible=showSourceTop;for(const r of regions){r.root.visible=enabled&&(r.name===part||part==='all');r.fill.visible=highlight;}},debug:()=>({enabled:active,sourceTopV,lines:root.children.map(o=>({name:o.name,visible:root.visible&&o.visible,vertices:(o as LineSegments).geometry.getAttribute('position').count})),regions:regions.map(r=>({name:r.name,enabled:r.root.visible,highlight:r.fill.visible,vertices:(r.root.getObjectByName('part-outline') as LineSegments).geometry.getAttribute('position').count})),surface:citySurfaceMetrics(product)}),dispose:()=>{for(const group of [root,...regions.map(r=>r.root)]){group.removeFromParent();group.children.forEach(o=>{const l=o as LineSegments;l.geometry.dispose();(l.material as LineBasicMaterial).dispose();});}}};
}
