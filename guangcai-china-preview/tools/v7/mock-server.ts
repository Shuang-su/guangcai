import {createServer, type IncomingMessage, type ServerResponse} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import {resolve,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {randomUUID,randomBytes} from 'node:crypto';
import {validateDesign} from '../../src/resources/design';
import type {DesignConfig,ResourceManifest} from '../../src/resources/types';

type Work={id:string;owner:string;title:string;revision:number;design:DesignConfig;createdAt:string;updatedAt:string};
type Share={id:string;token:string;owner:string;workId:string;revision:number;title:string;design:DesignConfig;revoked:boolean};
// Intentionally local, synthetic, in-memory reference service. Restart clears data.
export interface MockOptions {allowedOrigins?:string[];runtimeConfig?:{bootstrapUrl?:string;apiBase?:string;assetBase?:string}}
export async function createMockServer(root=resolve('.codex-work/deploy/v7-integration'),base='/',options:MockOptions={}){
 const origins=new Set(options.allowedOrigins??[]);for(const origin of origins)if(new URL(origin).origin!==origin||!/^https?:/.test(origin))throw Error('Use exact HTTP(S) origins');
 if(!/^\/[a-zA-Z0-9/_-]*\/$/.test(base)&&base!=='/')throw Error('MOCK_BASE must be an absolute path ending in /');
 const bootstrap=JSON.parse(await readFile(resolve(root,'api/v1/bootstrap.json'),'utf8'));
 const manifests=new Map<string,ResourceManifest>();for(const id of ['v7-1','v7-2','v7-3','v7-4','v7-5','v7-6','v7-7','v7-8']){const catalog=JSON.parse(await readFile(resolve(root,'releases',id,'catalog.json'),'utf8'));manifests.set(id,JSON.parse(await readFile(resolve(root,'releases',id,catalog.manifestUrl),'utf8')));}
 const works=new Map<string,Work>(),shares=new Map<string,Share>(),idempotency=new Map<string,{body:string;workId:string}>();
 const json=(res:ServerResponse,status:number,value:unknown)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(value));};
 const fail=(status:number,message:string)=>Object.assign(Error(message),{status});
 async function body(req:IncomingMessage){if(!req.headers['content-type']?.startsWith('application/json'))throw fail(415,'JSON required');let text='';for await(const chunk of req){text+=chunk;if(Buffer.byteLength(text)>32768)throw fail(413,'Body too large');}try{return JSON.parse(text);}catch{throw fail(400,'Invalid JSON');}}
 function design(value:unknown){try{const manifest=manifests.get((value as DesignConfig)?.resourceReleaseId);if(!manifest)throw Error('Unsupported resource release');return validateDesign(value,manifest);}catch(e){throw fail(400,String(e));}}
 const title=(value:unknown)=>{if(typeof value!=='string'||!value.trim()||value.length>120)throw fail(400,'Title must contain 1–120 characters');return value.trim();};
 const user=(req:IncomingMessage)=>{const value=req.headers.cookie?.match(/(?:^|;\s*)mock-user=(alice|bob)(?:;|$)/)?.[1];if(!value)throw fail(401,'Choose a mock user');return value;};
 const own=(req:IncomingMessage,id:string)=>{const w=works.get(id);if(!w||w.owner!==user(req))throw fail(404,'Work not found');return w;};
 const publicWork=({owner,...w}:Work)=>w;
 return createServer(async(req,res)=>{
  try{
   const url=new URL(req.url??'/',`http://${req.headers.host}`);if(!url.pathname.startsWith(base))throw fail(404,'Unknown base path');
   const route='/'+url.pathname.slice(base.length),method=req.method??'GET';
   const origin=req.headers.origin;
   if(route.startsWith('/api/')){
    res.setHeader('Vary','Origin');
    if(origin){if(origin!==url.origin&&!origins.has(origin))throw fail(403,'Origin mismatch');res.setHeader('Access-Control-Allow-Origin',origin);res.setHeader('Access-Control-Allow-Credentials','true');}
    if(method==='OPTIONS'){
     const headers=String(req.headers['access-control-request-headers']??'').toLowerCase().split(',').map(s=>s.trim()).filter(Boolean);
     if(!origin||!['GET','POST','PUT','DELETE'].includes(String(req.headers['access-control-request-method']))||headers.some(h=>!['content-type','idempotency-key'].includes(h)))throw fail(403,'Preflight not allowed');
     res.writeHead(204,{'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE','Access-Control-Allow-Headers':'Content-Type, Idempotency-Key','Access-Control-Max-Age':'600'});res.end();return;
    }
   }
   if(route==='/runtime-config.js'){res.writeHead(200,{'Content-Type':'application/javascript','Cache-Control':'no-store'});res.end('window.GUANGCAI_CONFIG='+JSON.stringify({bootstrapUrl:base+'api/v1/bootstrap',apiBase:base+'api/v1/',assetBase:base,...options.runtimeConfig})+';');return;}
   if(route==='/api/v1/bootstrap'&&method==='GET'){json(res,200,bootstrap);return;}
   if(route==='/api/v1/mock/session'&&method==='POST'){const value=(await body(req)).user;if(value!==null&&!['alice','bob'].includes(value))throw fail(400,'Use alice, bob or null');res.setHeader('Set-Cookie',`mock-user=${value??''}; HttpOnly; SameSite=Lax; Path=${base}${value===null?'; Max-Age=0':''}`);json(res,200,{mock:true,userId:value});return;}
   if(route==='/api/v1/session'&&method==='GET'){let id=null;try{id=user(req);}catch{}json(res,200,{mock:true,userId:id});return;}
   if(route==='/api/v1/works'&&method==='GET'){const owner=user(req);json(res,200,{items:[...works.values()].filter(w=>w.owner===owner).map(publicWork)});return;}
   if(route==='/api/v1/works'&&method==='POST'){
    const owner=user(req),input=await body(req),config=design(input.design),name=title(input.title),key=req.headers['idempotency-key'];
    const fingerprint=JSON.stringify({title:name,design:config}),scope=typeof key==='string'?owner+':'+key:null,existing=scope?idempotency.get(scope):undefined;
    if(existing){if(existing.body!==fingerprint)throw fail(409,'Idempotency key reused with different data');const work=works.get(existing.workId);if(!work)throw fail(409,'Original work was deleted');json(res,200,publicWork(work));return;}
    if(works.size>=1000)throw fail(507,'Mock capacity reached; restart to reset');
    const now=new Date().toISOString(),work:Work={id:randomUUID(),owner,title:name,design:config,revision:1,createdAt:now,updatedAt:now};works.set(work.id,work);if(scope)idempotency.set(scope,{body:fingerprint,workId:work.id});json(res,201,publicWork(work));return;
   }
   const workRoute=route.match(/^\/api\/v1\/works\/([^/]+)$/);
   if(workRoute){const work=own(req,workRoute[1]);if(method==='GET'){json(res,200,publicWork(work));return;}if(method==='PUT'){const input=await body(req);if(input.revision!==work.revision)throw fail(409,'Revision conflict');const config=design(input.design),name=title(input.title);work.design=config;work.title=name;work.revision++;work.updatedAt=new Date().toISOString();json(res,200,publicWork(work));return;}if(method==='DELETE'){works.delete(work.id);for(const s of shares.values())if(s.workId===work.id)s.revoked=true;res.writeHead(204);res.end();return;}}
   const createShare=route.match(/^\/api\/v1\/works\/([^/]+)\/shares$/);
   if(createShare&&method==='POST'){const work=own(req,createShare[1]),input=await body(req);if(input.revision!==work.revision)throw fail(409,'Revision conflict');const share:Share={id:randomUUID(),token:randomBytes(24).toString('base64url'),owner:work.owner,workId:work.id,revision:work.revision,title:work.title,design:structuredClone(work.design),revoked:false};shares.set(share.id,share);json(res,201,{id:share.id,url:base+'integration/?share='+share.token,token:share.token,revision:share.revision});return;}
   const revoke=route.match(/^\/api\/v1\/shares\/([^/]+)$/);if(revoke&&method==='DELETE'){const s=shares.get(revoke[1]);if(!s||s.owner!==user(req))throw fail(404,'Share not found');s.revoked=true;res.writeHead(204);res.end();return;}
   const shared=route.match(/^\/api\/v1\/public\/shares\/([^/]+)$/);if(shared&&method==='GET'){const s=[...shares.values()].find(s=>s.token===shared[1]);if(!s)throw fail(404,'Share not found');if(s.revoked)throw fail(410,'Share revoked');json(res,200,{title:s.title,revision:s.revision,design:s.design});return;}
   if(route.startsWith('/api/'))throw fail(404,'Unknown API route');
   if(!['GET','HEAD'].includes(method))throw fail(405,'Method not allowed');
   const file=resolve(root,'.'+decodeURIComponent(route)+(route.endsWith('/')?'index.html':''));if(!file.startsWith(resolve(root)+sep))throw fail(403,'Invalid path');
   let info;try{info=await stat(file);}catch{throw fail(404,'File not found');}if(!info.isFile())throw fail(404,'File not found');
   const mime:Record<string,string>={'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.gz':'application/octet-stream','.wasm':'application/wasm'};
   res.writeHead(200,{'Content-Type':mime[extname(file)]??'application/octet-stream','Content-Length':info.size,'Access-Control-Allow-Origin':'*','Timing-Allow-Origin':'*','Cache-Control':route.includes('/assets/')?'public, max-age=31536000, immutable':'no-cache'});
   if(method==='HEAD')res.end();else createReadStream(file).pipe(res);
  }catch(e){const error=e as Error&{status?:number};json(res,error.status??500,{error:{code:error.status??500,message:error.message}});}
 });
}
if(process.argv[1]&&fileURLToPath(import.meta.url)===resolve(process.argv[1])){
 const server=await createMockServer(resolve(process.env.MOCK_ROOT??'.codex-work/deploy/v7-integration'),process.env.MOCK_BASE??'/',{allowedOrigins:(process.env.MOCK_ORIGINS??'').split(',').filter(Boolean),runtimeConfig:{...(process.env.MOCK_API_BASE?{apiBase:process.env.MOCK_API_BASE,bootstrapUrl:new URL('bootstrap',process.env.MOCK_API_BASE).href}:{}),...(process.env.MOCK_ASSET_BASE?{assetBase:process.env.MOCK_ASSET_BASE}:{})}});
 server.listen(Number(process.env.PORT??5271),'127.0.0.1',()=>console.log(`V7 reference mock: http://127.0.0.1:${process.env.PORT??5271}${process.env.MOCK_BASE??'/'} (in-memory synthetic data)`));
}
