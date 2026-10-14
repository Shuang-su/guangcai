cat > tools/saucer-profile.ts <<'EOF'
import {writeFileSync} from 'node:fs';
import {Mesh} from 'three';
import {buildProduct} from '../src/geometry/product';
import {makeMaterials} from '../src/materials/materials';
const product=buildProduct(makeMaterials());
const mesh=product.saucer.children[0] as Mesh;
const profile=mesh.geometry.userData.profile as [number,number][];
const side=profile.slice(5,23);
const before=[[66.5,0],[68.1,0],[68.6,.4],[68.9,1],[69.9,1.35],[70.9,1.75],[71.3,2.35],[71.1,3.1],[70.9,3.5],[71.4,4.15],[71.75,4.7],[74.35,15.1],[74.85,16.3],[75.45,16.8],[75.5,17.25],[75.35,17.7],[74.85,17.75],[74.3,17.3]];
const path=(data:number[][])=>data.map(([r,y],i)=>`${i?'L':'M'} ${(r-59)*16+66} ${360-y*16}`).join(' ');
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="980" height="520" viewBox="0 0 980 520"><rect width="980" height="520" fill="#f0eeea"/><g font-family="system-ui, sans-serif" fill="#292929"><text x="40" y="40" font-size="24">底碟侧缘 · 同尺度剖面对照</text><path d="${path(before)}" fill="none" stroke="#c17777" stroke-width="3" stroke-dasharray="7 5"/><path d="${path(side)}" fill="none" stroke="#353f42" stroke-width="4"/><path d="M65 362 H360" stroke="#aaa"/><text x="440" y="110" font-size="19">上沿：保持薄金口沿</text><text x="440" y="167" font-size="19">花带：径向外撇 5.5 mm（原 2.6 mm）</text><text x="440" y="224" font-size="19">下沿：向内收进金色肩部，削去凸鼓</text><text x="440" y="281" font-size="19">底足：外径约 125.4 mm（原约 137.2 mm）</text><text x="440" y="355" font-size="16" fill="#965d5d">虚线：修改前</text><text x="610" y="355" font-size="16">实线：当前模型</text><text x="40" y="440" font-size="17">依据 IMG_1221 红线反馈，结合 IMG_1148 / IMG_1226 复核。</text><text x="40" y="474" font-size="15" fill="#666">仅碟口直径 151 mm 来自产品参数；剖面各尺寸为照片比例估计，非实测制造尺寸。</text></g></svg>`;
writeFileSync('../evidence/saucer-correction/profile.svg',svg);
writeFileSync('../evidence/saucer-correction/profile.json',JSON.stringify({profile,flowerRadialChange:5.5,flowerHeight:10.4,footOuterDiameter:125.4,outerDiameter:151,units:'mm',estimated:true},null,2));product.dispose();
EOF
npx tsx tools/saucer-profile.ts
python3 - <<'PY'
from pathlib import Path
p=Path('tools/reference-captures.mjs');s=p.read_text().replace("await page.goto('http://127.0.0.1:5187/');", "await page.goto(process.env.QA_URL??'http://127.0.0.1:5187/');");p.write_text(s)
p=Path('tools/reference-gallery.mjs');s=p.read_text().replace('检查花带高度和底圈结构；','检查花带更外撇的轮廓、向内收进的金肩和窄底足；').replace('<div class="bar">','<p><a href="saucer-correction/profile.svg">查看红线反馈后的侧缘剖面对照</a></p><div class="bar">');p.write_text(s)
PY