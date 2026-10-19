"""Experimental assets only. Reuse the reviewed line/closed-fill/half-float pipeline."""
import importlib.util,json,sys
sys.dont_write_bytecode=True
from pathlib import Path
HERE=Path(__file__).resolve().parent
sys.path.insert(0,str(HERE.parent))
spec=importlib.util.spec_from_file_location('citycompiler',HERE/'compile-city-alignment.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
m.OUT=m.ROOT/'public/dev-assets';m.SOURCES=m.ROOT/'.codex-work/cache/v7.1.5/lab-inputs'
m.fill_correction=lambda ident:(None,b'')
result={}
for e in json.loads((m.SOURCES/'inputs.json').read_text()):
 city,proof=m.compile_city(e,tiers_spec=(('standard',2048),));level=city['levels']['standard'];city['levels']={k:level for k in ['light','standard','detail']};city.update(cityId=e['cityId'],experimental=True,rasterWidth=2048)
 result[e['id']]=city
m.immutable(m.OUT/'cities.json',(json.dumps(result,ensure_ascii=False,indent=2)+'\n').encode())
print('Experimental variants compiled:',len(result),flush=True)
