import type {BufferGeometry} from 'three';
import type {FixedMapping} from '../resources/types';

/** Change material coverage, never the cup shape or city UV. Reuse GPU buffers. */
export function fixedBodyMapping(geometry:BufferGeometry,rows:number,visibleSegments:number,height:number){
 const index=geometry.index!,uv=geometry.getAttribute('uv2'),position=geometry.getAttribute('position');
 const originalIndex=Array.from(index.array),originalGroups=geometry.groups.map(g=>({...g})),originalUV=Array.from(uv.array);
 const buckets=new Map<number,number[]>();
 for(const group of originalGroups)for(let at=group.start;at<group.start+group.count;at+=3){
  const ids=originalIndex.slice(at,at+3),j=Math.min(...ids.map(id=>id%rows)),i=Math.min(...ids.map(id=>Math.floor(id/rows)));
  const material=group.materialIndex===0&&j>=6&&j<=8&&i<visibleSegments?1:group.materialIndex!;
  const bucket=buckets.get(material)??[];buckets.set(material,bucket);bucket.push(...ids);
 }
 const extendedIndex:number[]=[],extendedGroups:typeof originalGroups=[];
 for(const [material,data]of buckets){extendedGroups.push({start:extendedIndex.length,count:data.length,materialIndex:material});for(const id of data)extendedIndex.push(id);}
 let current:FixedMapping='source-layout-v3';
 return (mapping:FixedMapping='source-layout-v3')=>{
  if(current===mapping)return false;
  const extended=mapping==='source-layout-v4',indices=extended?extendedIndex:originalIndex,groups=extended?extendedGroups:originalGroups;
  index.array.set(indices);index.needsUpdate=true;geometry.clearGroups();groups.forEach(g=>geometry.addGroup(g.start,g.count,g.materialIndex));
  for(let i=0;i<uv.count;i++)uv.setY(i,extended?(position.getY(i)-.12)/(height-2.42):originalUV[i*2+1]);
  uv.needsUpdate=true;current=mapping;geometry.userData.fixedMapping=mapping;return true;
 };
}
