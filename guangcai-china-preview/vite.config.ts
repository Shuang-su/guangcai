import { defineConfig, type Plugin } from 'vite';
import { wgslVitePlugin } from '@vgpu/wgsl/loader-vite';
import {cp,mkdir,writeFile} from 'node:fs/promises';
import {resolve,basename} from 'node:path';
import {createReadStream,statSync} from 'node:fs';
// Vite/sirv treats a .gz suffix as HTTP content encoding. These hashed files
// are gzip containers in the resource protocol and must arrive byte-exact.
function rawNormalFiles():Plugin {
 let base='/';return {name:'v7-byte-exact-normals',apply:'serve',configResolved(c){base=c.base;},configureServer(server){
  server.middlewares.use((req,res,next)=>{const pathname=new URL(req.url??'/', 'http://localhost').pathname,relative=pathname.slice(base.length),match=relative.match(/^((?:releases\/v7-[1-7]|dev-assets))\/assets\/(.+)$/);if(!pathname.startsWith(base)||!match)return next();const [,assetRoot,name]=match;if(!/^[a-z0-9-]+\.hfn\.gz$/.test(name))return next();
   const file=resolve('public',assetRoot,'assets',name);try{const size=statSync(file).size;res.writeHead(200,{'Content-Type':'application/octet-stream','Content-Length':size,'Cache-Control':'no-cache'});if(req.method==='HEAD')res.end();else createReadStream(file).pipe(res);}catch{res.statusCode=404;res.end('Resource missing');}
  });
 }};
}
function runtimeFiles():Plugin {
 let out='';
 return {name:'v7-runtime-files',apply:'build',configResolved(c){out=c.build.outDir;},async closeBundle(){
  for(const item of ['releases/v7-1','releases/v7-2','releases/v7-3','releases/v7-4','releases/v7-5','releases/v7-6','releases/v7-7','dev-assets','label-compare','city-compare','bezier-lab','api/v1/bootstrap.json','icons','backgrounds','runtime-config.js','manifest.webmanifest','third-party']){
   await mkdir(resolve(out,item,'..'),{recursive:true});await cp(resolve('public',item),resolve(out,item),{recursive:true,filter:source=>!basename(source).startsWith('._')&&basename(source)!=='.DS_Store'});
  }
  const headers='/dev-assets/*.json\n  Cache-Control: no-cache\n\n/label-compare/data.json\n  Cache-Control: no-cache\n\n/releases/*\n  Access-Control-Allow-Origin: *\n  Timing-Allow-Origin: *\n  Cache-Control: public, max-age=31536000, immutable\n\n/api/*\n  Cache-Control: no-cache\n\n/runtime-config.js\n  Cache-Control: no-cache\n';
  await writeFile(resolve(out,'_headers'),headers);
 }};
}
export default defineConfig(({command,mode})=>{
 const audit=mode==='audit';
 return {base:process.env.APP_BASE??'/',plugins:[wgslVitePlugin(),rawNormalFiles(),...(!audit?[runtimeFiles()]:[])],publicDir:command==='serve'||audit?'public':false,cacheDir:'.codex-work/cache/vite',server:{port:5270,strictPort:true,watch:{ignored:['**/.codex-work/**']}},build:{outDir:audit?'.codex-work/deploy/v7-audit':mode==='integration'?'.codex-work/deploy/v7-integration':'.codex-work/deploy/v7-build',chunkSizeWarningLimit:650,rolldownOptions:{input:audit?['dev/index.html','audit/index.html','audit/glass.html']:mode==='integration'?['index.html','integration/index.html']:[ 'index.html','artwork-dev/index.html','artwork-dev/cup.html']}}};
});
