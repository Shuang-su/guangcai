import {spawnSync} from 'node:child_process';
import {homedir} from 'node:os';
const candidates=[process.env.PYTHON,'python3',`${homedir()}/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3`].filter(Boolean);
const python=candidates.find(p=>spawnSync(p,['-c','import PIL, numpy, scipy'],{stdio:'ignore'}).status===0);
if(!python)throw new Error('Fixed decal compilation requires Python 3 with Pillow, NumPy and SciPy; see tools/requirements-assets.txt.');
const result=spawnSync(python,['tools/compile-restored-floral.py','--activate'],{stdio:'inherit'});if(result.status!==0)process.exit(result.status??1);
