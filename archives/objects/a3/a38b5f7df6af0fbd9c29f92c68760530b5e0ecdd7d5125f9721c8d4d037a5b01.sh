python3 - <<'PY'
from pathlib import Path
p=Path('src/geometry/product.ts');s=p.read_text()
a=s.index('  const sp:ProfilePoint[]=[');b=s.index('  mesh(\'saucer-bowl',a)
s=s[:a]+'''  const sp:ProfilePoint[]=[
    [0,2.25],[sr-19,2.25],[sr-15.3,2.05],[sr-14.3,1.4],[sr-14.3,.45],[sr-14.1,0],
    [sr-12.8,0],[sr-12.45,.4],[sr-12.4,1.0],
    [sr-12.2,1.6],[sr-11.3,2.7],[sr-10.1,3.7],[sr-8.5,4.0],[sr-6.9,4.15],
    [sr-6.35,4.8],[sr-6.8,5.9],
    [sr-1.3,16.3],[sr-.65,16.7],
    [sr-.15,16.95],[sr,17.35],[sr-.15,17.9],[sr-.65,18.0],
    [sr-1.2,17.5],[sr-2.2,15.5],[sr-3.6,13.4],[sr-6.8,9.3],[sr-11.2,7.5],[r+8,6.25],
    [r+4,6.05],[r+2.65,6.45],[r+2.0,7.0],[r+1.15,7.08],[r+.4,6.65],[r-.4,6.12],[r-2,6.0],[0,6.0]
  ];
  const sideLength=Math.hypot(5.5,10.4);
  const sg=revolve(sp,320,{
    material:j=>j===15?2:j>=8&&j<=14||j>=16&&j<=20||j>=29&&j<=32?1:j===5?3:0,
    uv:(_rr,y,theta)=>[theta/(Math.PI*2)*4,(y-5.9)/10.4],
  });
  sg.userData.surfaceMetrics={width:(sr-4.05)*2*Math.PI/4,length:sideLength,aspect:(sr-4.05)*2*Math.PI/4/sideLength};
  sg.userData.profile=sp;
''' + s[b:]
s=s.replace('IMG_1142/1148/1203: broad near-edge white foot + gold lower shoulder,','IMG_1221 annotated correction + IMG_1148: 125 mm white foot, recessed gold shoulder,').replace('conical flower wall, thin upper lip','more outward-flared flower wall, thin upper lip')
p.write_text(s)
p=Path('tools/surface-metrics.ts');s=p.read_text().replace('saucerRadius-2.45','saucerRadius-4.05').replace('Math.hypot(2.6,10.4)','Math.hypot(5.5,10.4)');p.write_text(s)
p=Path('tools/geometry.test.ts');s=p.read_text().replace('near-edge saucer foot','inset saucer foot').replace('minFoot/defaults.saucerRadius>.87','minFoot/defaults.saucerRadius>.80').replace('maxFoot/defaults.saucerRadius>.9','maxFoot/defaults.saucerRadius<.85');p.write_text(s)
p=Path('tools/reference-gallery.mjs');s=p.read_text().replace('近外缘白瓷圈足','内收白瓷圈足').replace('大圈足、宽金色下肩','内收圈足、凹进的金色下肩');p.write_text(s)
p=Path('README.md');s=p.read_text().replace('近外缘','内收');p.write_text(s)
p=Path('docs/changes/20260929-reference-corrections/request.md');s=p.read_text()+'''\n10. 用户再次指出“碟的器形还是不对”，并用两张红线标注图比较：当前模型下边缘鼓出，实物外壁更外撇，花带下方明显内收，再过渡到更窄的底足。标注图副本保存在 evidence/saucer-correction/。\n''';p.write_text(s)
p=Path('docs/changes/20260929-reference-corrections/plan.md');s=p.read_text().replace('近外缘白瓷足','内收白瓷足').replace('依据底碟多视图重建外撇花带、上下金边、下方金色台阶','依据底碟多视图和红线反馈重建更外撇的花带、上下薄金边、花带下面向内收的金色台阶');p.write_text(s)
PY
mkdir -p ../evidence/saucer-correction
cp /var/folders/pm/18l5wnt52tqddscrs6w9538r0000gn/T/codex-clipboard-d9e2336b-8b28-4849-8e2c-9e58d89db027.png ../evidence/saucer-correction/before-annotated.png
cp /var/folders/pm/18l5wnt52tqddscrs6w9538r0000gn/T/codex-clipboard-bfe6ea57-007a-499c-8731-982222687493.png ../evidence/saucer-correction/reference-annotated.png
npm test > ../evidence/geometry-test.txt
npm run textures > ../../work/textures-log-final.json
npm run build > ../evidence/build-log.txt