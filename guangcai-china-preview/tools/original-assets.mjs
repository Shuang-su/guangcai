import {spawnSync} from 'node:child_process';
import {homedir} from 'node:os';
const candidates=[process.env.PYTHON,'python3',`${homedir()}/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3`].filter(Boolean);
const python=candidates.find(p=>spawnSync(p,['-c','import PIL, numpy'],{stdio:'ignore'}).status===0);
if(!python)throw new Error('Asset export requires Python 3 with Pillow (LittleCMS) and NumPy. Install tools/requirements-assets.txt or set PYTHON to that interpreter.');
for(const [cmd,args]of [[python,['tools/extract-original-floral.py']],[process.execPath,['tools/derive-original-fixed.mjs']]]){const r=spawnSync(cmd,args,{stdio:'inherit'});if(r.status!==0)process.exit(r.status??1);}
