import {readFile, writeFile, mkdir} from 'node:fs/promises';
import {resolve, dirname, relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import ts from 'typescript';
import {palettes, presetAppearance, materialAt, GOLD_LINE} from '../../src/styles/city-appearance';
import {slogans} from '../../src/styles/slogans';
import {validateDesign} from '../../src/resources/design';
import type {Asset, ResourceManifest} from '../../src/resources/types';

const app = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const repo = resolve(app, '..');
const read = (p:string) => readFile(resolve(app,p),'utf8');
const json = async(p:string) => JSON.parse(await read(p));
const sha = (b:Buffer|string) => createHash('sha256').update(b).digest('hex');
const previewBase = 'https://guangcai-no1-china-v7.netlify.app/';

// Read UI labels/order as literals, without importing the browser module or evaluating source.
function literal(node:ts.Expression):unknown {
 if(ts.isAsExpression(node)||ts.isSatisfiesExpression(node))return literal(node.expression);
 if(ts.isStringLiteral(node))return node.text;
 if(ts.isArrayLiteralExpression(node))return node.elements.map(n=>literal(n as ts.Expression));
 if(ts.isObjectLiteralExpression(node))return Object.fromEntries(node.properties.map(p=>{
  assert(ts.isPropertyAssignment(p));return [p.name.getText().replace(/^['"]|['"]$/g,''),literal(p.initializer)];
 }));
 throw Error('UI metadata is no longer a literal; update exporter explicitly');
}
function uiConstant(source:string,name:string){
 const ast=ts.createSourceFile('consumer-panel.ts',source,ts.ScriptTarget.Latest,true);
 for(const s of ast.statements)if(ts.isVariableStatement(s))for(const d of s.declarationList.declarations)
  if(d.name.getText()===name&&d.initializer)return literal(d.initializer);
 throw Error('Missing UI constant: '+name);
}

export async function collectBackendData(sourceRef='HEAD'){
 const sourceCommit=execFileSync('git',['rev-parse',sourceRef+'^{commit}'],{cwd:repo,encoding:'utf8'}).trim();
 const bootstrap=await json('public/api/v1/bootstrap.json');
 const catalogPath=bootstrap.catalogUrl, manifestPath=bootstrap.manifestUrl;
 const catalog=await json('public/'+catalogPath),manifest:ResourceManifest=await json('public/'+manifestPath);
 const schema=await json('integration/contracts/design.schema.json');
 const ui=await read('src/ui/consumer-panel.ts');
 const colorOrder=uiConstant(ui,'paletteOrder') as (keyof typeof palettes)[];
 const colorNames=uiConstant(ui,'paletteNames') as Record<keyof typeof palettes,string>;
 const cityCatalog=await json('src/styles/city-catalog-v6.json');
 const sourcePaths=['package.json','evidence/v7.1.3/resource-build.json','evidence/v7.1.3/handle-dimensions.json','src/geometry/fixed-mapping.ts','src/geometry/product.ts','src/main.ts','src/styles/style-manager.ts','integration/contracts/resource-manifest.schema.json','evidence/v7.1.2/slogans-source.json','evidence/v7.1.2/cities/review.json','src/styles/city-appearance.ts','src/styles/slogans.ts','src/styles/xy-mapping.ts','src/ui/consumer-panel.ts','src/styles/city-catalog-v6.json','src/materials/city-parametric.ts','src/resources/types.ts','src/resources/design.ts','src/resources/texture-budget.ts','integration/contracts/design.schema.json','public/api/v1/bootstrap.json','public/'+catalogPath,'public/'+manifestPath];
 const sources=[];
 for(const p of sourcePaths){
  const bytes=await readFile(resolve(app,p)),gitPath='guangcai-china-preview/'+p;
  const committed=execFileSync('git',['show',sourceCommit+':'+gitPath],{cwd:repo,maxBuffer:4*1024*1024});
  assert.equal(sha(bytes),sha(committed),'Source differs from requested commit: '+p);
  sources.push({path:gitPath,sha256:sha(bytes),url:`https://github.com/Shuang-su/guangcai/blob/${sourceCommit}/${gitPath}`});
 }
 const resources:any[]=[];
 async function asset(a:Asset,owner:string,purpose:string,tier:string){
  const url=new URL(a.url,new URL(manifestPath,previewBase));assert.equal(url.origin,new URL(previewBase).origin);
  const publishPath=decodeURIComponent(url.pathname.slice(1)),file=resolve(app,'public',publishPath);
  assert(!relative(resolve(app,'public'),file).startsWith('..'));
  const bytes=await readFile(file);assert.equal(bytes.length,a.bytes);assert.equal(sha(bytes),a.sha256);
  const runtimeChannels=a.encoding==='hfn1-gzip'?2:a.channels;
  const runtimeBytes=a.width*a.height*runtimeChannels*(a.encoding==='hfn1-gzip'?2:1);
  resources.push({...a,owner,purpose,tier,publishPath,previewUrl:url.href,
   runtimeFormat:a.encoding==='hfn1-gzip'?'RG16F':a.channels===1?'R8':a.channels===2?'RG8':'RGBA8',
   runtimeRetainedBytes:runtimeBytes,runtimeGpuBytes:Math.ceil(runtimeBytes*4/3)});
 }
 for(const [region,levels] of Object.entries(manifest.fixed))for(const [tier,level] of Object.entries(levels)){
  for(const purpose of ['baseColor','normal','orm'] as const)await asset(level[purpose],region,purpose,tier);
 }
 const cities=[];
 for(const [i,cityId] of Object.keys(cityCatalog.cities).entries()){
  const city=manifest.cities[cityId];assert(city);assert.equal(city.name,catalog.cities[cityId].name);
  await asset(city.thumbnail,cityId,'thumbnail','shared');
  for(const [tier,level] of Object.entries(city.levels))for(const purpose of ['mask','normal'] as const)await asset(level[purpose],cityId,purpose,tier);
  const resourceIds={thumbnail:city.thumbnail.id,...Object.fromEntries(Object.entries(city.levels).map(([tier,l])=>[tier,{mask:l.mask.id,normal:l.normal.id}]))};
  cities.push({order:i+1,cityId,name:city.name,thumbnail:city.thumbnail.url,resourceIds,
   extension:{cityId,name:city.name,resourceReleaseId:manifest.releaseId,modelVersion:manifest.modelVersion,recipeVersion:manifest.recipeVersion,manifestUrl:manifestPath,resourceIds}});
 }
 const colors=colorOrder.map((preset,i)=>{
  const p=palettes[preset],a=presetAppearance(preset);
  const rgb=(hex:string)=>[1,3,5].map(n=>parseInt(hex.slice(n,n+2),16));
  return {order:i+1,preset,name:colorNames[preset],sourceName:p.name,colorSpace:'srgb',darkHex:p.dark,lightHex:p.light,
   hexPair:[p.dark,p.light],darkRgb255:rgb(p.dark),lightRgb255:rgb(p.light),hsl:[a.hue,a.saturation,a.lightness],appearance:a};
 });
 const typography=await json('evidence/v7.1.2/slogans-source.json');
 const labels=[];
 for(const [i,[id,text]] of Object.entries(slogans).entries()){
  const s=manifest.slogans[id];assert.equal(s.text,text);await asset(s.asset,id,'slogan','shared');
  labels.push({order:i+1,id,text,assetId:s.asset.id,width:s.asset.width,height:s.asset.height,uvRect:s.uvRect,fontFamily:typography.font.family,fontWeight:typography.font.weight,fontSha256:typography.font.sha256,resourceReleaseId:manifest.releaseId});
 }
 await asset(manifest.mark,'mark','mark','shared');
 const materialSamples=[0,.5,1].flatMap(material=>[0,.5,1].map(materialX=>({material,materialX,...materialAt(material,materialX)})));
 const descriptions:Record<string,[string,string]>={
  schemaVersion:['作品格式版本','当前固定为1'],resourceReleaseId:['资源发布版本','默认v7-4；旧作品v7-1/v7-2/v7-3按原版本回放'],modelVersion:['几何模型版本','模型由前端生成，不是模型图片URL'],recipeVersion:['材质与照明配方版本','绑定源码计算规则；后台不能仅改版本名'],cityId:['城市稳定ID','来自城市配置表；不存中文名代替ID'],sloganId:['祝福语稳定ID','来自祝福语表'],preset:['配色预设ID','决定深浅色偏移及重置默认参数'],hue:['色相','单位度；数组HSL第1项'],saturation:['饱和度','0～100数值；不是0～1'],lightness:['明度','契约0～100；UI滑块20～65'],material:['材质纵轴','0～1；金属度等于该值；同时影响粗糙度与清漆'],materialX:['材质横轴','0～1；默认0.5；调整粗糙度和清漆'],relief:['法线强度系数','0～2；normalScale=clearcoatNormalScale=0.7×relief；当前消费者面板不提供该滑块']};
 const fields:any[]=[];
 const appearanceSchema=schema.properties.appearance;
 for(const [key,def] of [...Object.entries(schema.properties).filter(([key])=>key!=='appearance'),...Object.entries(appearanceSchema.properties)] as [string,any][]){
  const appearance=Object.hasOwn(appearanceSchema.properties,key),path=appearance?'appearance.'+key:key;
  const [label,note]=descriptions[key];
  fields.push({path,label,type:def.type??(typeof def.const==='number'?'integer':'string'),required:true,
   default:appearance?bootstrap.defaultDesign.appearance[key]:bootstrap.defaultDesign[key],
   allowed:def.enum??(def.const!==undefined?[def.const]:{min:def.minimum,max:def.maximum}),storage:'作品 DesignConfig',note});
 }
 fields.push(
  {path:'city.extension',label:'城市拓展数据',type:'object',required:true,default:null,allowed:'见城市表',storage:'后台资源配置',note:'此交接包建议的映射对象；不是新增运行时API。资源描述从manifest按resourceIds查取；仅文本字段时JSON序列化一次。'},
  {path:'color.hexPair',label:'深浅颜色数组',type:'string[2]',required:false,default:null,allowed:'[darkHex,lightHex]',storage:'后台配色参考',note:'sRGB HEX；第1项深色，第2项浅色。UI渐变显示顺序为light到dark。不是作品字段。'},
  {path:'color.hsl',label:'默认HSL数组',type:'number[3]',required:false,default:null,allowed:'[H,S,L]',storage:'后台配色参考',note:'由darkHex换算；作品使用三个具名字段；不是物理显示色域。'},
  {path:'asset',label:'资源描述',type:'object',required:true,default:null,allowed:'ResourceManifest schema',storage:'CDN manifest',note:'id/url/sha256/sourceSha256/encoding/width/height/bytes/decodedBytes/gpuBytes/channels/colorSpace；完整值见资源表。'},
  {path:'slogan.uvRect',label:'祝福语定位',type:'number[4]',required:true,default:null,allowed:'[u,v,width,height]',storage:'CDN manifest',note:'归一化UV，左下原点；不是像素坐标。'},
  {path:'fixedMapping',label:'固定花纸映射版本',type:'string',required:false,default:'source-layout-v3',allowed:['source-layout-v3','source-layout-v4'],storage:'CDN manifest',note:'v7-4声明source-layout-v4：三部件花纹镜像，花纹底边0.12 mm，上连接白瓷下沿补足。缺省按v3。不是DesignConfig字段，不可由后台任意改写旧发布。'},
  {path:'fixed.atlas',label:'花纸图集分区',type:'object',required:false,default:null,allowed:'随对应资源档位',storage:'CDN manifest',note:'rows/contentWidth/contentHeight/gutter随编译产物保留，不可只换图片尺寸。'},
  {path:'quality / DPR / cache / deviceMemory',label:'设备与清晰度状态',type:'runtime',required:false,default:null,allowed:'由前端调度',storage:'不写入作品',note:'未提供的机器内存指标为不可用；禁止当作0。'});
 validateDesign(bootstrap.defaultDesign,manifest);
 for(const color of colors)for(const city of cities)validateDesign({...bootstrap.defaultDesign,cityId:city.cityId,appearance:color.appearance},manifest);
 assert.equal(cities.length,23);assert.equal(colors.length,5);assert.equal(labels.length,6);assert.equal(resources.length,195);
 assert.equal(new Set(resources.map(r=>r.id)).size,195);
 assert.deepEqual(Object.keys(manifest.cities),cities.map(c=>c.cityId));
 return {format:'guangcai-backend-handoff-v1',productVersion:(await json('package.json')).version,sourceCommit,resourceReleaseId:manifest.releaseId,
  modelVersion:manifest.modelVersion,recipeVersion:manifest.recipeVersion,catalogPath,manifestPath,previewBase,
  notice:'配置参考导出，不新增前端接口；城市拓展JSON通过manifest与resourceIds引用完整资源描述。',
  fixedMapping:manifest.fixedMapping??'source-layout-v3',fixedCorrection:await json('evidence/v7.1.3/resource-build.json'),handleDimensions:await json('evidence/v7.1.3/handle-dimensions.json'),typography,fields,cities,colors,materialSamples,goldLine:GOLD_LINE,slogans:labels,resources,fixed:manifest.fixed,defaultDesign:bootstrap.defaultDesign,sources};
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const data=await collectBackendData(process.argv[2]??'HEAD');
 const out=resolve(app,process.argv[3]??'integration/backend-handoff');await mkdir(out,{recursive:true});
 await writeFile(resolve(out,'backend-config.json'),JSON.stringify(data,null,2)+'\n');
 console.log(JSON.stringify({output:relative(app,out),sourceCommit:data.sourceCommit,cities:data.cities.length,colors:data.colors.length,slogans:data.slogans.length,resources:data.resources.length}));
}
