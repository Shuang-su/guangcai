import { defineConfig, type Plugin } from 'vite';
import { wgslVitePlugin } from '@vgpu/wgsl/loader-vite';
import {cp,mkdir,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {createReadStream,statSync} from 'node:fs';
// Vite/sirv treats a .gz suffix as HTTP content encoding. These hashed files
// are gzip containers in the resource protocol and must arrive byte-exact.
function rawNormalFiles():Plugin {
 let base='/';return {name:'v7-byte-exact-normals',apply:'serve',configResolved(c){base=c.base;},configureServer(server){
  server.middlewares.use((req,res,next)=>{const pathname=new URL(req.url??'/', 'http://localhost').pathname,prefix=base+'releases/v7-1/assets/';if(!pathname.startsWith(prefix))return next();const name=pathname.slice(prefix.length);if(!/^[a-z0-9-]+\.hfn\.gz$/.test(name))return next();
   const file=resolve('public/releases/v7-1/assets',name);try{const size=statSync(file).size;res.writeHead(200,{'Content-Type':'application/octet-stream','Content-Length':size,'Cache-Control':'no-cache'});if(req.method==='HEAD')res.end();else createReadStream(file).pipe(res);}catch{res.statusCode=404;res.end('Resource missing');}
  });
 }};
}
function runtimeFiles():Plugin {
 let out='';
 return {name:'v7-runtime-files',apply:'build',configResolved(c){out=c.build.outDir;},async closeBundle(){
  for(const item of ['releases/v7-1','api/v1/bootstrap.json','icons','backgrounds','runtime-config.js','manifest.webmanifest','third-party']){
   await mkdir(resolve(out,item,'..'),{recursive:true});await cp(resolve('public',item),resolve(out,item),{recursive:true});
  }
  const headers='/releases/*\n  Access-Control-Allow-Origin: *\n  Timing-Allow-Origin: *\n  Cache-Control: public, max-age=31536000, immutable\n\n/api/*\n  Cache-Control: no-cache\n\n/runtime-config.js\n  Cache-Control: no-cache\n';
  await writeFile(resolve(out,'_headers'),headers);
 }};
}
export default defineConfig(({command,mode})=>{
 const audit=mode==='audit';
 return {base:process.env.APP_BASE??'/',plugins:[wgslVitePlugin(),rawNormalFiles(),...(!audit?[runtimeFiles()]:[])],publicDir:command==='serve'||audit?'public':false,cacheDir:'.codex-work/cache/vite',server:{port:5270,strictPort:true},build:{outDir:audit?'.codex-work/deploy/v7-audit':mode==='integration'?'.codex-work/deploy/v7-integration':'.codex-work/deploy/v7-build',chunkSizeWarningLimit:650,rolldownOptions:{input:audit?['dev/index.html','audit/index.html','audit/glass.html']:mode==='integration'?['index.html','integration/index.html']:['index.html']}}};
});
