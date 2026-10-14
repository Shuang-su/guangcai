python3 - <<'PY'
from pathlib import Path
p=Path('src/geometry/product.ts');s=p.read_text().replace('MeshPhysicalMaterial, PlaneGeometry,','MeshPhysicalMaterial,')
a=s.index('  const lr=r+p.lidOverhang;');b=s.index('  cup.position.set',a)
s=s[:a]+'''  const lr=r+p.lidOverhang;
  const lidProfile:ProfilePoint[]=[[0,-1.3],[r-7,-1.3],[r-5,-1.5],[r-4.5,-3.3],[r-3.8,-3.7],[r-3,-3.45],[r-2.7,-1.0],[lr-1,-.35],[lr,-.1],[lr+.3,.6],[lr,1.35],[lr-1,1.65],[r-2,1.9],[r-10,2.65],[14,3.25],[0,3.35]];
  mesh('lid-double-sided-with-seat',revolve(lidProfile,240,{material:j=>j>=8&&j<=10?1:0}),[m.porcelain,m.gold],lid);
  const knobPath=new CatmullRomCurve3(Array.from({length:81},(_,i)=>{
    const a=Math.PI-i/80*Math.PI;return new Vector3(Math.cos(a)*12.8,3.3+Math.sin(a)*10.2,0);
  }));
  const knob=ribbon(knobPath,9.5,4.4,440);
  const striped=new MeshPhysicalMaterial({color:'#f3f2ed',roughness:.16,clearcoat:1,clearcoatRoughness:.06,metalness:0});
  // Stripes belong to the bridge surface itself; no floating decal planes.
  const oldIndex=knob.index!,kuv=knob.getAttribute('uv'),ki:number[]=[],kb=[[],[],[]] as number[][];
  for(const group of knob.groups)for(let i=group.start;i<group.start+group.count;i+=3){
    const ids=[oldIndex.getX(i),oldIndex.getX(i+1),oldIndex.getX(i+2)];
    const v=ids.reduce((sum,id)=>sum+kuv.getY(id),0)/3;
    const material=group.materialIndex===2&&((v*22)%1)<.14?1:group.materialIndex!;
    kb[material].push(...ids);
  }
  knob.clearGroups();kb.forEach((data,m)=>{knob.addGroup(ki.length,data.length,m);ki.push(...data);});knob.setIndex(ki);
  mesh('arched-bridge-knob',knob,[m.porcelain,m.gold,striped],lid);
  for(const x of [-12.8,12.8]){
    const collar=handleCollar(1000,9.5,4.4);collar.translate(-1000,0,0);collar.rotateZ(Math.PI/2);collar.translate(x,3.2,0);
    mesh('knob-porcelain-fillet',collar,m.porcelain,lid);
  }
  const sr=p.saucerRadius;
  // IMG_1142/1148/1203: broad near-edge white foot + gold lower shoulder,
  // conical flower wall, thin upper lip, white sloping annulus and low seat ring.
  const sp:ProfilePoint[]=[
    [0,2.25],[sr-13,2.25],[sr-10.8,2.05],[sr-9.7,1.4],[sr-9.4,.45],[sr-9,0],
    [sr-7.4,0],[sr-6.9,.4],[sr-6.6,1.0],
    [sr-5.6,1.35],[sr-4.6,1.75],[sr-4.2,2.35],[sr-4.4,3.1],[sr-4.6,3.5],
    [sr-4.1,4.15],[sr-3.75,4.7],
    [sr-1.15,11.4],[sr-.65,12.6],
    [sr-.05,13.1],[sr+.15,13.55],[sr-.15,14.0],[sr-.65,14.05],
    [sr-1.2,13.6],[sr-2.25,12.3],[sr-4.0,10.6],[sr-6.8,8.7],[sr-10.3,7.25],[r+8,6.25],
    [r+4,6.05],[r+2.65,6.45],[r+2.0,7.0],[r+1.15,7.08],[r+.4,6.65],[r-.4,6.12],[r-2,6.0],[0,6.0]
  ];
  const sideLength=Math.hypot(2.6,6.7);
  const sg=revolve(sp,320,{
    material:j=>j===15?2:j>=8&&j<=14||j>=16&&j<=20||j>=29&&j<=32?1:j===5?3:0,
    uv:(rr,y,theta)=>[theta/(Math.PI*2)*4,(y-4.7)/6.7],
  });
  sg.userData.surfaceMetrics={width:(sr-2.45)*2*Math.PI/4,length:sideLength,aspect:(sr-2.45)*2*Math.PI/4/sideLength};
  mesh('saucer-bowl-and-continuous-rim',sg,[m.porcelain,m.gold,m.regions.saucer,m.foot],saucer);
''' + s[b:]
p.write_text(s)
p=Path('src/materials/materials.ts');s=p.read_text().replace("color:'#efeee7'","color:'#f4f3ed'").replace("{color:'#edbe59',metalness:1,roughness:.135,clearcoat:.22,clearcoatRoughness:.16}","{color:new Color().setRGB(1,.79,.38),metalness:1,roughness:.105,clearcoat:.12,clearcoatRoughness:.075}")
p.write_text(s)
p=Path('src/studio/studio.ts');s=p.read_text().replace("setScalar(.12)","setScalar(.28)").replace("[[-22,12,24,15,36,5],[23,20,-12,12,40,7],[0,44,0,35,23,5],[-8,-8,-32,18,25,1.5]]","[[-24,12,28,18,38,4],[28,20,-18,14,38,4],[0,44,0,32,9,5],[-10,-25,-32,36,28,.8],[5,38,30,32,3,5],[32,4,25,7,32,2.8]]").replace('scene.environmentIntensity=.95','scene.environmentIntensity=.85').replace("new DirectionalLight('#fff9ed',1.05)","new DirectionalLight('#fffdf5',.85)")
p.write_text(s)
p=Path('index.html');s=p.read_text().replace('<head>','<head><link rel="icon" href="data:,">');p.write_text(s)
PY
npm run build