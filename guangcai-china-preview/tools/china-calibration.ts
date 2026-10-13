import {PerspectiveCamera,Vector3} from 'three';
import {applyPose,type Pose} from '../src/interaction/calibration';
import {writeFileSync} from 'node:fs';
const camera=new PerspectiveCamera();
const cases=[{id:'buildings',width:960,height:872,yaw:-166,targets:[[226,732,98,140],[76,890,553,700]]},{id:'label',width:1168,height:1032,yaw:4,targets:[[254,849,110,174],[62,1033,640,852]]}];
function optimize(start:number[],steps:number[],cost:(v:number[])=>number){let s=[start,...steps.map((a,j)=>start.map((b,k)=>b+(j===k?a:0)))].map(x=>({x,y:cost(x)}));for(let iter=0;iter<800;iter++){s.sort((a,b)=>a.y-b.y);const n=start.length,c=start.map((_,j)=>s.slice(0,n).reduce((sum,a)=>sum+a.x[j]/n,0));const at=(k:number)=>{const x=c.map((v,j)=>v+k*(c[j]-s[n].x[j]));return{x,y:cost(x)}};const r=at(1);if(r.y<s[0].y){const e=at(2);s[n]=e.y<r.y?e:r;}else if(r.y<s[n-1].y)s[n]=r;else{const q=at(r.y<s[n].y?.5:-.5);if(q.y<Math.min(r.y,s[n].y))s[n]=q;else s=s.map((a,i)=>i?{x:a.x.map((v,j)=>(v+s[0].x[j])/2),y:0}:a).map(a=>({x:a.x,y:cost(a.x)}));}}return s.sort((a,b)=>a.y-b.y)[0];}
const results=[];
for(const ref of cases){
 const pose=(v:number[]):Pose=>({yaw:ref.yaw,pitch:v[0],distance:v[1],fov:v[2],cx:v[3],cy:v[4],roll:0,targetY:57});
 const bounds=(p:Pose,r:number,y:number)=>{applyPose(camera,p,ref.width,ref.height);let minX=1e8,maxX=-1e8,minY=1e8,maxY=-1e8;for(let j=0;j<180;j++){const a=j*Math.PI/90,v=new Vector3(r*Math.cos(a),y,r*Math.sin(a)).project(camera),x=(v.x+1)*ref.width/2,yy=(1-v.y)*ref.height/2;minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,yy);maxY=Math.max(maxY,yy);}return[minX,maxX,minY,maxY];};
 const projected=(p:Pose)=>[bounds(p,45.4,110.8),bounds(p,75.5,17.35)];
 const cost=(v:number[])=>{if(v[0]<0||v[0]>25||v[1]<180||v[1]>1800||v[2]<3||v[2]>55)return 1e10;return projected(pose(v)).reduce((s,pts,k)=>s+pts.reduce((ss,n,j)=>ss+(n-ref.targets[k][j])**2,0),0);};
 const fit=optimize([8,900,10,.5,.51],[2,100,2,.03,.03],cost);
 results.push({...ref,pose:pose(fit.x),projected:projected(pose(fit.x)),rmsPx:Math.sqrt(fit.y/8),method:'Manual approximate lid and saucer rim extrema; fixed geometry, perspective camera fit, no image warp. RMS only describes 8 chosen bounds.'});
}
writeFileSync('evidence/camera-calibration.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results));
