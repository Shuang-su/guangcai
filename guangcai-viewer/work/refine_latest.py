from pathlib import Path
root=Path('outputs/guangcai-viewer')
p=root/'src/geometry/product.ts';s=p.read_text().replace('[sr-1.15,11.4],[sr-.65,12.6]','[sr-1.15,15.1],[sr-.65,16.3]').replace('[sr-.05,13.1],[sr+.15,13.55],[sr-.15,14.0],[sr-.65,14.05]','[sr-.05,16.8],[sr+.15,17.25],[sr-.15,17.7],[sr-.65,17.75]').replace('[sr-1.2,13.6],[sr-2.25,12.3],[sr-4.0,10.6],[sr-6.8,8.7],[sr-10.3,7.25]','[sr-1.2,17.3],[sr-2.25,15.5],[sr-4.0,12.7],[sr-6.8,10],[sr-10.3,7.6]').replace('Math.hypot(2.6,6.7)','Math.hypot(2.6,10.4)').replace('(y-4.7)/6.7','(y-4.7)/10.4');p.write_text(s)
p=root/'tools/surface-metrics.ts';s=p.read_text().replace('Math.hypot(2.6,6.7)','Math.hypot(2.6,10.4)');p.write_text(s)
p=root/'src/materials/materials.ts';s=p.read_text().replace('setRGB(1,.71,.18)','setRGB(1,.67,.115)').replace('color:0xffffff,metalness:1','color:0xffffff,envMapIntensity:.7,metalness:1');p.write_text(s)
p=root/'src/studio/studio.ts';s=p.read_text().replace("DirectionalLight('#fffdf5',1.4)","DirectionalLight('#fffdf5',1.05)").replace("'#737270',.5","'#737270',.35");p.write_text(s)
p=root/'src/interaction/reference-views.ts';s=p.read_text().replace('camera:[0,-130,255]','camera:[0,-55,405]').replace('camera:[0,36,360]','camera:[0,-75,405]');p.write_text(s)
p=root/'src/interaction/views.ts';s=p.read_text().replace("if(id==='1168'){", "if(id==='1148'){this.studio.camera.up.set(0,-1,0);this.studio.camera.lookAt(this.controls.target);}\n    if(id==='1168'){");p.write_text(s)
