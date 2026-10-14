python3 - <<'PY'
from pathlib import Path
p=Path('src/materials/materials.ts');s=p.read_text().replace('setRGB(1,.79,.38)','setRGB(1,.76,.25)').replace('roughness:.105','roughness:.065');p.write_text(s)
p=Path('src/studio/studio.ts');s=p.read_text().replace('setScalar(.28)','setScalar(.18)');a=s.index('  const cards:');b=s.index('  for(const[x,y,z,w,h,intensity]',a)
s=s[:a]+'''  const cards:[number,number,number,number,number,number][]=[
    [-24,12,28,18,38,3],[28,20,-18,14,38,3],[0,44,0,32,9,4],
    [-10,-35,-10,70,60,.7],[-20,8,-36,32,35,.45],
    [5,38,30,32,3,4],[32,4,25,7,32,2.8],
    [10,5,39,17,40,.008],[-35,1,15,10,40,.015],[-10,5,-39,12,36,.008],
    [35,-4,-10,14,24,.025],
  ];
''' + s[b:];p.write_text(s)
PY