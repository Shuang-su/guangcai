python3 - <<'PY'
from pathlib import Path
p=Path('src/interaction/views.ts');s=p.read_text().replace("this.setAuto(false);this.view=view;", "this.setAuto(false);this.view=view;this.studio.camera.up.set(0,1,0);")
s=s.replace("this.controls.minDistance=50;this.controls.update();this.onChange();", """this.controls.minDistance=50;this.controls.update();
    // Keep the reference direction, but fit the complete visible piece at any viewport.
    p.root.updateMatrixWorld(true);
    const bounds=new Box3();
    for(const part of [p.cup,p.lid,p.saucer])if(part.visible)bounds.union(new Box3().setFromObject(part));
    for(let iteration=0;iteration<3;iteration++){
      this.studio.camera.updateMatrixWorld(true);let scale=1;
      for(const x of [bounds.min.x,bounds.max.x])for(const y of [bounds.min.y,bounds.max.y])for(const z of [bounds.min.z,bounds.max.z]){
        const v=new Vector3(x,y,z).project(this.studio.camera);scale=Math.max(scale,Math.abs(v.x)/.9,Math.abs(v.y)/.88);
      }
      if(scale<=1.001)break;
      this.studio.camera.position.sub(this.controls.target).multiplyScalar(scale).add(this.controls.target);this.controls.update();
    }
    if(id==='1168'){this.studio.camera.up.set(1,0,0);this.studio.camera.lookAt(this.controls.target);}
    this.onChange();""")
p.write_text(s)
PY
node tools/reference-captures.mjs