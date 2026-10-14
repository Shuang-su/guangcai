node --input-type=module <<'JS'
import fs from 'node:fs/promises';import crypto from 'node:crypto';import {execFileSync} from 'node:child_process';
const lock=JSON.parse(await fs.readFile('package-lock.json','utf8')),p=lock.packages['node_modules/typescript'];
const response=await fetch(p.resolved);if(!response.ok)throw Error(response.status);const bytes=Buffer.from(await response.arrayBuffer());
if('sha512-'+crypto.createHash('sha512').update(bytes).digest('base64')!==p.integrity)throw Error('integrity mismatch');
const filename='.codex-work/cache/typescript-locked.tgz';await fs.writeFile(filename,bytes);execFileSync('tar',['-xzf',filename,'--strip-components=1','-C','node_modules/typescript']);console.log('Restored exact TypeScript',p.version,bytes.length);
JS
kill -TERM 18927
npm run build