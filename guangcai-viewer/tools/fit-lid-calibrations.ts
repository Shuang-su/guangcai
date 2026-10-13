import {PerspectiveCamera,Vector3} from 'three';
import {applyPose,type Pose} from '../src/interaction/calibration';
import {writeFileSync} from 'node:fs';
const id=process.env.REF??'1238',W=1368,H=1824,camera=new PerspectiveCamera();
const targets=id==='1238'?[[765,274],[763,1737],[728,1005],[793,1005]]:[[706,99],[666,1623],[646,861],[735,861]];
const pose=(v:number[]):Pose=>({yaw:id==='1238'?0:90,pitch:v[0],roll:v[1],distance:v[2],fov:35,cx:v[3],cy:v[4],targetY:109});
function points(v:number[]){applyPose(camera,pose(v),W,H);const pts=Array.from({length:720},(_,i)=>{const a=i/720*Math.PI*2,p=new Vector3(45.7*Math.cos(a),109,45.7*Math.sin(a)).project(camera);return[(p.x+1)*W/2,(1-p.y)*H/2]});return [pts.reduce((a,b)=>b[1]<a[1]?b:a),pts.reduce((a,b)=>b[1]>a[1]?b:a),pts.reduce((a,b)=>b[0]<a[0]?b:a),pts.reduce((a,b)=>b[0]>a[0]?b:a)];}
const score=(v:number[])=>v[0]<0||v[0]>12||v[2]<130||v[2]>400?1e10:points(v).reduce((s,p,i)=>s+(p[0]-targets[i][0])**2+(p[1]-targets[i][1])**2,0);
function minimize(start:number[],steps:number[],cost:(x:number[])=>number){let s=[start,...steps.map((v,i)=>start.map((x,j)=>x+(i===j?v:0)))].map(x=>({x,y:cost(x)}));for(let iter=0;iter<1800;iter++){s.sort((a,b)=>a.y-b.y);const n=start.length,c=start.map((_,j)=>s.slice(0,n).reduce((v,a)=>v+a.x[j]/n,0));const at=(k:number)=>{const x=c.map((v,j)=>v+k*(c[j]-s[n].x[j]));return{x,y:cost(x)}};const r=at(1);if(r.y<s[0].y){const e=at(2);s[n]=e.y<r.y?e:r;}else if(r.y<s[n-1].y)s[n]=r;else{const k=r.y<s[n].y?.5:-.5,q=at(k);if(q.y<Math.min(r.y,s[n].y))s[n]=q;else s=s.map((a,i)=>i?{x:a.x.map((v,j)=>(v+s[0].x[j])/2),y:0}:a).map(a=>({x:a.x,y:cost(a.x)}));}}return s.sort((a,b)=>a.y-b.y)[0];}

const result=minimize([2,90,180,.55,.52],[1,1,8,.01,.01],score),p=pose(result.x);
const projected=points(result.x),landmarks=targets.map((target,i)=>({target,projected:projected[i],errorPx:Math.hypot(target[0]-projected[i][0],target[1]-projected[i][1])}));
writeFileSync(`../evidence/overlays/${id}-fit.json`,JSON.stringify({photo:`IMG_${id}`,photoSize:[W,H],method:'Approximate four extremal gold-rim points; fixed 35 degree lens. Lid and knob dimensions are not fitted to these points. Knob remains an independent validation target.',pose:p,rmsPx:Math.sqrt(result.y/4),landmarks},null,2));console.log(id,p,Math.sqrt(result.y/4));
