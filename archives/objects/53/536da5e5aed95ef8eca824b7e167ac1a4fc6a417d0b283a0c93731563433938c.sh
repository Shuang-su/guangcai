python3 - <<'PY'
from pathlib import Path
for file in ['src/geometry/ribbon.ts','src/geometry/product.ts']:
 p=Path(file);s=p.read_text().replace('indices.push(...data);','for(const index of data)indices.push(index);').replace('ki.push(...data);','for(const index of data)ki.push(index);');p.write_text(s)
PY
node tools/snapshot.mjs