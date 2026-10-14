python3 - <<'PY'
from pathlib import Path
p=Path('tools/fit-other-calibrations.ts');s=p.read_text();a=s.index("const refs=id==='1220'?[");b=s.index(']:[',a);s=s[:a]+'''const refs=id==='1220'?[
{r:75.5,y:17.35,target:[221,867],edge:'left'},{r:75.5,y:17.35,target:[954,867],edge:'right'},
{r:75.5,y:17.35,target:[589,953],edge:'bottom'},
{r:45.5,y:109,target:[369,425],edge:'left'},{r:45.5,y:109,target:[811,425],edge:'right'},
{r:45.5,y:109,target:[590,390],edge:'top'},{r:45.5,y:109,target:[590,467],edge:'bottom'},
''' + s[b:];p.write_text(s)
PY
./node_modules/.bin/tsx tools/fit-other-calibrations.ts