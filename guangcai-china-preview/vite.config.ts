import { defineConfig, type Plugin } from 'vite';
import { wgslVitePlugin } from '@vgpu/wgsl/loader-vite';
import {cp,mkdir,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
function runtimeFiles():Plugin {
 let out='';
 return {name:'v7-runtime-files',apply:'build',configResolved(c){out=c.build.outDir;},async closeBundle(){
  for(const item of ['releases/v7-1','api/v1/bootstrap.json','icons','backgrounds','runtime-config.js','third-party']){
   await mkdir(resolve(out,item,'..'),{recursive:true});await cp(resolve('public',item),resolve(out,item),{recursive:true});
  }
  const headers='/releases/*\n  Access-Control-Allow-Origin: *\n  Cache-Control: public, max-age=31536000, immutable\n\n/api/*\n  Cache-Control: no-cache\n\n/runtime-config.js\n  Cache-Control: no-cache\n';
  await writeFile(resolve(out,'_headers'),headers);
 }};
}
export default defineConfig(({command,mode})=>{
 const audit=mode==='audit';
 return {base:process.env.APP_BASE??'/',plugins:[wgslVitePlugin(),...(!audit?[runtimeFiles()]:[])],publicDir:command==='serve'||audit?'public':false,cacheDir:'.codex-work/cache/vite',server:{port:5270,strictPort:true},build:{outDir:audit?'.codex-work/deploy/v7-audit':mode==='integration'?'.codex-work/deploy/v7-integration':'.codex-work/deploy/v7-build',chunkSizeWarningLimit:650,rolldownOptions:{input:audit?['dev/index.html','audit/index.html','audit/glass.html']:mode==='integration'?['index.html','integration/index.html']:['index.html']}}};
});
