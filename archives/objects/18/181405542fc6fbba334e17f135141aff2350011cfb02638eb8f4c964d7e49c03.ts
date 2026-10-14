import {Group,BufferGeometry,Float32BufferAttribute,Mesh,MeshBasicMaterial,DoubleSide,AdditiveBlending,Vector3} from 'three';
const smooth=(a:number,b:number,x:number)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t);};
/** Key-shape light strands: point -> travelling lines -> orbit -> the actual projected cup rim. */
export class IntroLight{
 readonly root=new Group();
 private bands:Mesh<BufferGeometry,MeshBasicMaterial>[]=[];
 private samples=180;
 constructor(){
  for(let k=0;k<22;k++){
   const geometry=new BufferGeometry();geometry.setAttribute('position',new Float32BufferAttribute(new Float32Array((this.samples+1)*2*3),3));
   const ids:number[]=[];for(let i=0;i<this.samples;i++){const n=i*2;ids.push(n,n+1,n+2,n+1,n+3,n+2);}geometry.setIndex(ids);
   const material=new MeshBasicMaterial({color:k%5===0?'#bddde9':k%4===0?'#f1d5ff':'#fff0c5',transparent:true,opacity:.6,blending:AdditiveBlending,depthTest:false,depthWrite:false,side:DoubleSide});
   const mesh=new Mesh(geometry,material);mesh.frustumCulled=false;this.bands.push(mesh);this.root.add(mesh);
  }
 }
 update(p:number,w:number,h:number,ring:{x:number,y:number,r:number}){
  this.root.visible=p<.755;
  const morph=smooth(.36,.61,p),tight=smooth(.54,.67,p),fade=1-smooth(.675,.755,p);
  const cx=w*.5+(ring.x-w*.5)*tight,cy=h*.57+(ring.y-h*.57)*tight;
  this.bands.forEach((m,k)=>{
   const pos=m.geometry.getAttribute('position'),phase=k*.13,wide=k<4?3.4:.34;
   m.material.opacity=fade*(k<4?.14:.26+(k%4)*.12)*(.18+smooth(0,.1,p)*.82);
   for(let i=0;i<=this.samples;i++){
    const t=i/this.samples,angle=t*Math.PI*2+p*9+(k-11)*.014*(1-tight);
    const radius=(w*.30*(1-tight)+ring.r*tight)+(k-11)*1.8*(1-tight);
    const freeX=w*((t-.5)*(1.8-1.35*(1-smooth(0,.16,p)))+.5);
    const freeY=h*.60+Math.sin(t*7.6-p*12+phase)*h*(.02+smooth(0,.18,p)*.18)*Math.sin(t*Math.PI);
    const x=freeX*(1-morph)+(cx+Math.cos(angle)*radius)*morph;
    const y=freeY*(1-morph)+(cy+Math.sin(angle)*radius*(.52+.48*tight))*morph;
    const glow=wide*(.18+.82*Math.pow(Math.sin(Math.PI*t),.45));
    const nx=Math.cos(angle)*morph,ny=(1-morph)+Math.sin(angle)*morph;
    pos.setXYZ(i*2,x-nx*glow,y-ny*glow,210+k*.1);
    pos.setXYZ(i*2+1,x+nx*glow,y+ny*glow,210+k*.1);
   }
   pos.needsUpdate=true;
  });
 }
 dispose(){this.bands.forEach(m=>{m.geometry.dispose();m.material.dispose();});}
}
