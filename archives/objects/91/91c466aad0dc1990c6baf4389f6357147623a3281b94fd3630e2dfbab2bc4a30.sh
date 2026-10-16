cp tools/fit-calibration.ts tools/fit-other-calibrations.ts
python3 - <<'PY'
from pathlib import Path
p=Path('tools/fit-other-calibrations.ts');s=p.read_text();s=s.replace('const W=1368,H=1824','const W=1200,H=1200')
a=s.index('const refs=');b=s.index('function minimize(',a)
s=s[:a]+'''const id=process.env.REF??'1220';
const refs=id==='1220'?[
{r:75.5,y:17.35,target:[221,867],edge:'left'},{r:75.5,y:17.35,target:[954,867],edge:'right'},
{r:43,y:105.5,target:[378,457],edge:'left'},{r:43,y:105.5,target:[800,457],edge:'right'},
{r:43,y:8.8,target:[385,923],edge:'left'},{r:43,y:8.8,target:[790,923],edge:'right'},
{r:45.5,y:109,target:[369,425],edge:'left'},{r:45.5,y:109,target:[811,425],edge:'right'},
]:[
{r:75.5,y:17.35,target:[54,875],edge:'left'},{r:75.5,y:17.35,target:[1332,875],edge:'right'},
{r:75.5,y:17.35,target:[692,250],edge:'top'},{r:75.5,y:17.35,target:[692,1522],edge:'bottom'},
{r:62.7,y:0,target:[142,882],edge:'left'},{r:62.7,y:0,target:[1240,882],edge:'right'},
];
function point(p:Pose,ref:typeof refs[number]){const pts=ring(p,ref.r,ref.y);const ax=ref.edge==='left'||ref.edge==='right'?0:1;const sign=ref.edge==='left'||ref.edge==='top'?-1:1;return pts.reduce((a,b)=>sign*b[ax]>sign*a[ax]?b:a);}
const pose=(v:number[]):Pose=>({yaw:0,pitch:v[0],roll:v[1],distance:v[2],fov:v[5],cx:v[3],cy:v[4],targetY:id==='1220'?57:4});
const score=(v:number[])=>{if(v[2]<100||v[2]>1200||Math.abs(v[0])>89.9||v[5]<10||v[5]>70)return 1e10;const p=pose(v);return refs.reduce((s,r)=>{const pt=point(p,r);return s+(pt[0]-r.target[0])**2+(pt[1]-r.target[1])**2;},0);};
''' + s[b:]
s=s[:s.index('const result=minimize')]+'''const result=minimize(id==='1220'?[12,0,600,.49,.59,23]:[-78,0,250,.5,.48,45],[2,1,30,.01,.01,3],score),p=pose(result.x);
const landmarks=refs.map(r=>({...r,projected:point(p,r),errorPx:Math.hypot(...point(p,r).map((v,i)=>v-r.target[i]))}));
writeFileSync(`../evidence/overlays/${id}-fit.json`,JSON.stringify({photo:`IMG_${id}`,photoSize:[W,H],method:'Manual approximate contour landmarks, least squares perspective camera fit; geometry fixed.',pose:p,rmsPx:Math.sqrt(result.y/refs.length),landmarks},null,2));console.log(JSON.stringify({id,pose:p,rmsPx:Math.sqrt(result.y/refs.length)},null,2));
'''
p.write_text(s)
PY
./node_modules/.bin/tsx tools/fit-other-calibrations.ts