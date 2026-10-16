import {PerspectiveCamera,Vector3} from 'three';
import {applyPose,type Pose} from '../src/interaction/calibration';
import {writeFileSync} from 'node:fs';
const camera=new PerspectiveCamera();const W=process.env.REF==='1230'?1368:1200,H=process.env.REF==='1230'?1824:1200;
function ring(p:Pose,r:number,y:number){applyPose(camera,p,W,H);return Array.from({length:360},(_,i)=>{const a=i*Math.PI/180;const v=new Vector3(r*Math.cos(a),y,r*Math.sin(a)).project(camera);return[(v.x+1)*W/2,(1-v.y)*H/2];});}
const id=process.env.REF??'1220';
const refs=id==='1220'?[
{r:75.5,y:17.35,target:[221,867],edge:'left'},{r:75.5,y:17.35,target:[954,867],edge:'right'},
{r:75.5,y:17.35,target:[589,953],edge:'bottom'},
{r:45.5,y:109,target:[369,425],edge:'left'},{r:45.5,y:109,target:[811,425],edge:'right'},
{r:45.5,y:109,target:[590,390],edge:'top'},{r:45.5,y:109,target:[590,467],edge:'bottom'},
]:[
{r:75.5,y:17.35,target:[54,875],edge:'left'},{r:75.5,y:17.35,target:[1332,875],edge:'right'},
{r:75.5,y:17.35,target:[692,250],edge:'top'},{r:75.5,y:17.35,target:[692,1522],edge:'bottom'},
{r:62.7,y:0,target:[142,882],edge:'left'},{r:62.7,y:0,target:[1240,882],edge:'right'},
];
function point(p:Pose,ref:typeof refs[number]){const pts=ring(p,ref.r,ref.y);const ax=ref.edge==='left'||ref.edge==='right'?0:1;const sign=ref.edge==='left'||ref.edge==='top'?-1:1;return pts.reduce((a,b)=>sign*b[ax]>sign*a[ax]?b:a);}
const pose=(v:number[]):Pose=>({yaw:0,pitch:v[0],roll:v[1],distance:v[2],fov:v[5],cx:v[3],cy:v[4],targetY:id==='1220'?57:4});
const score=(v:number[])=>{if(v[2]<100||v[2]>1200||Math.abs(v[0])>89.9||v[5]<10||v[5]>70)return 1e10;const p=pose(v);return refs.reduce((s,r)=>{const pt=point(p,r);return s+(pt[0]-r.target[0])**2+(pt[1]-r.target[1])**2;},0);};
function minimize(start:number[],steps:number[],cost:(x:number[])=>number){let s=[start,...steps.map((v,i)=>start.map((x,j)=>x+(i===j?v:0)))].map(x=>({x,y:cost(x)}));for(let iter=0;iter<1800;iter++){s.sort((a,b)=>a.y-b.y);const n=start.length,c=start.map((_,j)=>s.slice(0,n).reduce((v,a)=>v+a.x[j]/n,0));const at=(k:number)=>{const x=c.map((v,j)=>v+k*(c[j]-s[n].x[j]));return{x,y:cost(x)}};const r=at(1);if(r.y<s[0].y){const e=at(2);s[n]=e.y<r.y?e:r;}else if(r.y<s[n-1].y)s[n]=r;else{const k=r.y<s[n].y?.5:-.5,q=at(k);if(q.y<Math.min(r.y,s[n].y))s[n]=q;else s=s.map((a,i)=>i?{x:a.x.map((v,j)=>(v+s[0].x[j])/2),y:0}:a).map(a=>({x:a.x,y:cost(a.x)}));}}return s.sort((a,b)=>a.y-b.y)[0];}
const result=minimize(id==='1220'?[12,0,600,.49,.59,23]:[-78,0,250,.5,.48,45],[2,1,30,.01,.01,3],score),p=pose(result.x);
const landmarks=refs.map(r=>({...r,projected:point(p,r),errorPx:Math.hypot(...point(p,r).map((v,i)=>v-r.target[i]))}));
writeFileSync(`../evidence/overlays/${id}-fit.json`,JSON.stringify({photo:`IMG_${id}`,photoSize:[W,H],method:'Manual approximate contour landmarks, least squares perspective camera fit; geometry fixed.',pose:p,rmsPx:Math.sqrt(result.y/refs.length),landmarks},null,2));console.log(JSON.stringify({id,pose:p,rmsPx:Math.sqrt(result.y/refs.length)},null,2));
