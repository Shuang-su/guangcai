import {PerspectiveCamera,Vector3} from 'three';
import {applyPose,type Pose} from '../src/interaction/calibration';
import {writeFileSync} from 'node:fs';
import {buildProduct} from '../src/geometry/product';
import {makeMaterials} from '../src/materials/materials';
const product=buildProduct(makeMaterials());
const lid=product.lid.children[0] as import('three').Mesh;
const lidPosition=lid.geometry.getAttribute('position');
const lidPoints:Vector3[]=[];
for(let i=0;i<lidPosition.count;i++)if(i%16>=8)lidPoints.push(new Vector3().fromBufferAttribute(lidPosition,i).add(product.lid.position));
const camera=new PerspectiveCamera();
const cases=[{id:'left',width:1920,height:1280,yaw:2,targets:[[754,1164,415,490],[618,1297,797,947]]},{id:'right',width:1920,height:1280,yaw:2,targets:[[754,1164,415,490],[618,1297,797,947]]}];
function optimize(start:number[],steps:number[],cost:(v:number[])=>number){let s=[start,...steps.map((a,j)=>start.map((b,k)=>b+(j===k?a:0)))].map(x=>({x,y:cost(x)}));for(let iter=0;iter<800;iter++){s.sort((a,b)=>a.y-b.y);const n=start.length,c=start.map((_,j)=>s.slice(0,n).reduce((sum,a)=>sum+a.x[j]/n,0));const at=(k:number)=>{const x=c.map((v,j)=>v+k*(c[j]-s[n].x[j]));return{x,y:cost(x)}};const r=at(1);if(r.y<s[0].y){const e=at(2);s[n]=e.y<r.y?e:r;}else if(r.y<s[n-1].y)s[n]=r;else{const q=at(r.y<s[n].y?.5:-.5);if(q.y<Math.min(r.y,s[n].y))s[n]=q;else s=s.map((a,i)=>i?{x:a.x.map((v,j)=>(v+s[0].x[j])/2),y:0}:a).map(a=>({x:a.x,y:cost(a.x)}));}}return s.sort((a,b)=>a.y-b.y)[0];}
const results=[];
for(const ref of cases){
 const pose=(v:number[]):Pose=>({cupYaw:ref.id==='left'?180:0,yaw:ref.yaw,pitch:v[0],distance:v[1],fov:v[2],cx:v[3],cy:v[4],roll:0,targetY:57});
 const bounds=(p:Pose,r:number,y:number)=>{applyPose(camera,p,ref.width,ref.height);let minX=1e8,maxX=-1e8,minY=1e8,maxY=-1e8;for(let j=0;j<180;j++){const a=j*Math.PI/90,v=new Vector3(r*Math.cos(a),y,r*Math.sin(a)).project(camera),x=(v.x+1)*ref.width/2,yy=(1-v.y)*ref.height/2;minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,yy);maxY=Math.max(maxY,yy);}return[minX,maxX,minY,maxY];};
 const projected=(p:Pose)=>{applyPose(camera,p,ref.width,ref.height);const pts=lidPoints.map(v=>v.clone().project(camera));return [[Math.min(...pts.map(v=>(v.x+1)*ref.width/2)),Math.max(...pts.map(v=>(v.x+1)*ref.width/2)),Math.min(...pts.map(v=>(1-v.y)*ref.height/2)),Math.max(...pts.map(v=>(1-v.y)*ref.height/2))],bounds(p,75.5,17.35)];};
 const cost=(v:number[])=>{if(v[0]<0||v[0]>25||v[1]<180||v[1]>1800||v[2]<3||v[2]>55)return 1e10;return projected(pose(v)).reduce((s,pts,k)=>s+pts.reduce((ss,n,j)=>ss+(n-ref.targets[k][j])**2,0),0);};
 const fit=optimize([12,1100,15,.5,.54],[2,100,2,.03,.03],cost);
 results.push({...ref,pose:pose(fit.x),projected:projected(pose(fit.x)),rmsPx:Math.sqrt(fit.y/8),method:'Manual approximate lid and saucer rim extrema at normalized 1920x1280; actual flat-lid mesh and saucer rim, perspective camera fit, no image warp. RMS only describes 8 chosen bounds.'});
}
writeFileSync('evidence/camera-calibration-v3.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results));
