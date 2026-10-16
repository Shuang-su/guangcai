python3 - <<'PY'
from pathlib import Path
p=Path('src/compare.ts');s=p.read_text().replace("new URLSearchParams(location.search).get('ref')in calibrations", "(new URLSearchParams(location.search).get('ref')??'') in calibrations");p.write_text(s)
p=Path('src/ui/interface.ts');s=p.read_text().replace('原照片分组与对照图见交付目录。','原照片分组与对照图见交付目录。 <a href="./compare.html">打开实拍叠图校准</a>');p.write_text(s)
p=Path('docs/changes/20260929-reference-corrections/request.md');p.write_text(p.read_text()+'\n- 验收时需要仔细调整角度，然后重叠你做出来的效果和实拍图，用于对比。\n')
p=Path('docs/changes/20260929-reference-corrections/plan.md');p.write_text(p.read_text()+'\n- 增加真实 WebGL 模型与原比例实拍的透明叠图；精调俯仰、方位、滚转、焦距和取景中心，保存 PNG 与相机 JSON。优先匹配碟侧缘、整体比例、碟底；报告匹配依据和剩余偏差。\n')
PY
./node_modules/.bin/tsc --noEmit