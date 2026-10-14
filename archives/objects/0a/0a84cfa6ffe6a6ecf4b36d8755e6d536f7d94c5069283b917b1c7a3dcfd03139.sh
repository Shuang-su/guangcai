python3 - <<'PY'
from pathlib import Path
p=Path('src/styles/style-manager.ts');s=p.read_text().replace('const source=texture.image.width/texture.image.height,target=aspects[region];','const img=texture.image as HTMLImageElement;\n      const source=img.width/img.height,target=aspects[region];');p.write_text(s)
p=Path('src/main.ts');s=p.read_text().replace('m.map.image.width,m.map.image.height','(m.map.image as HTMLImageElement).width,(m.map.image as HTMLImageElement).height');p.write_text(s)
p=Path('src/studio/studio.ts');s=p.read_text().replace('setScalar(.18)','setScalar(.55)').replace('environmentIntensity=.85','environmentIntensity=1.0').replace("DirectionalLight('#fffdf5',.85)","DirectionalLight('#fffdf5',1.4)").replace("'#737270',.32","'#737270',.5");p.write_text(s)
p=Path('src/materials/materials.ts');s=p.read_text().replace('setRGB(1,.76,.25)','setRGB(1,.71,.18)');p.write_text(s)
p=Path('src/geometry/ribbon.ts');s=p.read_text().replace('side?.27','side?.45');p.write_text(s)
# Only the assembly casts the table contact shadow. Isolated parts are suspended studies.
p=Path('src/main.ts');s=p.read_text().replace('studio.contact.update(product.root);studio.renderer.render','studio.contact.update(product.root);studio.floor.visible=product.saucer.visible&&product.cup.visible;studio.renderer.render');p.write_text(s)
p=Path('src/interaction/reference-views.ts');s=p.read_text().replace("camera:[-8,122,395],target:[13,57,0]", "camera:[-8,139,465],target:[13,57,0]").replace("camera:[8,75,170]", "camera:[8,88,215]").replace("camera:[0,30,280]", "camera:[0,36,360]");p.write_text(s)
PY
node tools/reference-captures.mjs