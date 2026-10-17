import fs from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {createRequire} from 'node:module';
import assert from 'node:assert/strict';

// Artifact Tool is an authoring dependency, not a consumer/runtime dependency.
const require=createRequire(process.env.ARTIFACT_NODE_MODULES?resolve(process.env.ARTIFACT_NODE_MODULES,'../package.json'):import.meta.url);
const {Workbook,SpreadsheetFile,FileBlob}=await import(pathToFileURL(require.resolve('@oai/artifact-tool')).href);
const app=resolve(dirname(fileURLToPath(import.meta.url)),'../..');
const output=resolve(app,process.argv[2]??'integration/backend-handoff');
const previews=resolve(app,'.codex-work/tmp/backend-handoff');await fs.mkdir(previews,{recursive:true});
const d=JSON.parse(await fs.readFile(resolve(output,'backend-config.json'),'utf8'));
const wb=Workbook.create(),j=v=>v==null?'—':typeof v==='string'?v:JSON.stringify(v);
const built=[];
function sheet(name,title,headers,rows,widths,heights=38){
 const s=wb.worksheets.add(name);s.showGridLines=false;
 const area=s.getRangeByIndexes(0,0,rows.length+5,headers.length);
 area.format.font={name:'Arial',size:10,color:'#302A23'};area.format.verticalAlignment='center';
 s.getRange('A2').values=[[title]];s.getRange('A2').format.font={name:'Arial',size:16,bold:true,color:'#795423'};
 s.getRange('A3').values=[[`V${d.productVersion} / ${d.resourceReleaseId} / ${d.sourceCommit.slice(0,12)} · JSON为配置参考，作品接口保持原格式`]];
 s.getRange('A3').format.font={italic:true,size:10,color:'#665D51'};
 const range=s.getRangeByIndexes(4,0,rows.length+1,headers.length);range.values=[headers,...rows];
 const table=s.tables.add(`A5:${col(headers.length)}${rows.length+5}`,true,'ConfigTable'+built.length);table.style='TableStyleLight1';table.showFilterButton=true;
 const header=s.getRangeByIndexes(4,0,1,headers.length);header.format={fill:'#795423',font:{name:'Arial',size:10,bold:true,color:'#FFFFFF'},wrapText:true,horizontalAlignment:'center',rowHeight:32};
 const body=s.getRangeByIndexes(5,0,rows.length,headers.length);body.format.wrapText=true;body.format.rowHeight=heights;
 for(let r=0;r<rows.length;r++)s.getRangeByIndexes(r+5,0,1,headers.length).format.fill=r%2?'#FFFFFF':'#F8F4ED';
 widths.forEach((w,i)=>s.getRangeByIndexes(0,i,rows.length+5,1).format.columnWidth=w);
 s.freezePanes.freezeRows(5);s.freezePanes.freezeColumns(3);
 for(let r=0;r<rows.length;r++)for(let c=0;c<headers.length;c++)if(typeof rows[r][c]==='number'){
  const cell=s.getCell(r+5,c);cell.setNumberFormat(Number.isInteger(rows[r][c])?'0':'0.##############');cell.format.horizontalAlignment='right';
 }
 built.push({name,headers,rows});return s;
}
function col(n){let s='';while(n){n--;s=String.fromCharCode(65+n%26)+s;n=Math.floor(n/26);}return s;}
const fields=sheet('录入说明与字段','后台配置与作品保存字段',
 ['字段路径','中文含义','类型','必填','默认值','允许值或范围','存储位置','说明'],
 d.fields.map(f=>[f.path,f.label,f.type,f.required?'是':'否',j(f.default),j(f.allowed),f.storage,f.note]),
 [32,22,16,9,34,72,24,105],55);
const extra=d.fields.length+8;
fields.getRange(`A${extra}`).values=[['深圳默认作品 JSON（H列完整复制）']];fields.getRange(`H${extra}`).values=[[JSON.stringify(d.defaultDesign)]];
fields.getRange(`H${extra}`).format.wrapText=true;fields.getRange(`H${extra}`).format.rowHeight=110;
fields.getRange(`A${extra+2}`).values=[['数据来源（完整提交与文件哈希见JSON sources）']];
d.sources.forEach((s,i)=>{fields.getRange(`H${extra+2+i}`).values=[[s.url]];fields.getRange(`H${extra+2+i}`).format.wrapText=true;fields.getRange(`H${extra+2+i}`).format.rowHeight=34;});

sheet('城市配置','23座城市与拓展 JSON',
 ['顺序','城市ID','名称','资源版本','manifest发布路径','缩略图资源ID','低清遮罩ID','低清法线ID','标准遮罩ID','标准法线ID','细节遮罩ID','细节法线ID','拓展JSON（完整复制）'],
 d.cities.map(c=>[c.order,c.cityId,c.name,d.resourceReleaseId,d.manifestPath,c.resourceIds.thumbnail,c.resourceIds.light.mask,c.resourceIds.light.normal,c.resourceIds.standard.mask,c.resourceIds.standard.normal,c.resourceIds.detail.mask,c.resourceIds.detail.normal,JSON.stringify(c.extension)]),
 [9,20,16,14,60,39,37,37,40,40,38,38,170],60);
const colors=sheet('颜色配置','五套配色与默认作品参数',
 ['顺序','预设ID','菜单名称','深色 HEX','浅色 HEX','深浅数组 [dark,light]','默认HSL [H,S,L]','深色RGB [0..255]','浅色RGB [0..255]','material','materialX','relief','完整 appearance JSON','色彩空间'],
 d.colors.map(c=>[c.order,c.preset,c.name,c.darkHex,c.lightHex,JSON.stringify(c.hexPair),JSON.stringify(c.hsl),JSON.stringify(c.darkRgb255),JSON.stringify(c.lightRgb255),c.appearance.material,c.appearance.materialX,c.appearance.relief,JSON.stringify(c.appearance),c.colorSpace]),
 [9,15,18,17,17,38,65,25,25,14,14,12,110,16],50);
d.colors.forEach((c,i)=>{colors.getCell(i+5,3).format.fill=c.darkHex;colors.getCell(i+5,3).format.font={color:c.preset==='gold'?'#302A23':'#FFFFFF'};colors.getCell(i+5,4).format.fill=c.lightHex;});
colors.getRange('A13').values=[['H: 0～360；S/L: 0～100。UI明度滑块20～65。hexPair不是运行时字段；当前UI渐变light→dark。']];
colors.getRange('A15').values=[['默认HSL由深色转换；实际浅色随预设的H/S/L差值联动，不能简单固定浅色HEX或直接RGB插值。']];

const material=sheet('材质参数','二维材质参数与固定金线',
 ['参数','类型','最小','最大','默认或预设','保存位置','作用与规则','来源'],
 [['material','number',0,1,'同心金1；其余0','appearance.material','纵轴t；metalness=t；同时决定中心列粗糙度和清漆','city-appearance.ts materialAt'],
 ['materialX','number',0,1,0.5,'appearance.materialX','横轴x；左侧粗糙/无清漆，右侧低粗糙/全清漆；见公式','city-appearance.ts materialAt'],
 ['relief','number',0,2,1,'appearance.relief','基础法线和清漆法线强度均为0.7×relief；当前UI不暴露滑块','city-parametric.ts update'],
 ['recipeVersion','string',null,null,d.recipeVersion,'DesignConfig.recipeVersion','计算规则版本与前端代码绑定','ResourceManifest'],
 ['固定金线','object',null,null,JSON.stringify(d.goldLine),'前端配方','固定金线不受填色材质调整影响','GOLD_LINE']],
 [23,16,12,12,75,30,105,38],55);
material.getRange('A13').values=[['连续材质的9个参考采样（不是9个可选预设）']];
material.getRange('A15:E24').values=[['material(t)','materialX(x)','metalness','roughness','clearcoat'],...d.materialSamples.map(m=>[m.material,m.materialX,m.metalness,m.roughness,m.clearcoat])];
material.getRange('A15:E15').format={fill:'#795423',font:{color:'#FFFFFF',bold:true},rowHeight:28};material.getRange('A16:E24').setNumberFormat('0.000000');material.getRange('A16:E24').format.rowHeight=26;material.getRange('A16:E24').format.horizontalAlignment='right';
material.getRange('G15:G20').values=[['中心粗糙度 r = 0.31 + (72/255 − 0.31) × t'],['中心清漆 c = 191/255 + (26/255 − 191/255) × t'],['x<0.5：base + (left − base) × (1 − 2x)'],['x≥0.5：base + (right − base) × (2x − 1)'],['roughness 的 left/right 为0.75/0.08'],['clearcoat 的 left/right 为0/1']];
material.getRange('G15:G20').format.rowHeight=26;

sheet('祝福语','六组裁切遮罩与UV定位',
 ['顺序','祝福语ID','文字','资源ID','宽(px)','高(px)','uvRect [u,v,width,height]','编码与加载'],
 d.slogans.map(s=>[s.order,s.id,s.text,s.assetId,s.width,s.height,JSON.stringify(s.uvRect),`${s.fontFamily} Bold ${s.fontWeight}；${s.resourceReleaseId}；WebP线性R8；4px护边；六组首屏预热；字体仅制作使用`]),
 [9,20,20,30,12,12,105,85],65);

sheet('资源明细','195项运行资源与传输格式',
 ['资源ID','所属对象','用途','档位','编码','色彩空间','宽(px)','高(px)','清单通道','文件字节','清单decodedBytes','清单gpuBytes','运行格式','运行保留字节','运行GPU估算','原始URL','发布根相对路径','当前预览URL','SHA256','sourceSHA256'],
 d.resources.map(a=>[a.id,a.owner,a.purpose,a.tier,a.encoding,a.colorSpace,a.width,a.height,a.channels,a.bytes,a.decodedBytes,a.gpuBytes,a.runtimeFormat,a.runtimeRetainedBytes,a.runtimeGpuBytes,a.url,a.publishPath,a.previewUrl,a.sha256,a.sourceSha256]),
 [43,22,18,16,20,18,13,13,13,19,22,22,18,22,22,100,110,135,90,90],42);

wb.recalculate();
for(const b of built){
 const values=wb.worksheets.getItem(b.name).getRangeByIndexes(4,0,b.rows.length+1,b.headers.length).values;
 assert.deepEqual(values,[b.headers,...b.rows]);
}
const errors=await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:20},maxChars:1500});
await fs.writeFile(resolve(previews,'formula-check.txt'),errors.ndjson);
const file=resolve(output,'V7后台配置数据表.xlsx');await (await SpreadsheetFile.exportXlsx(wb)).save(file);
// Reopen the delivered XLSX and verify JSON cells and numeric precision, not only in-memory data.
const reopened=await SpreadsheetFile.importXlsx(await FileBlob.load(file));
try{await fs.rename(file+'.inspect.ndjson',resolve(previews,'xlsx-import-inspection.ndjson'));}catch(e){if(e.code!=='ENOENT')throw e;}
const snapshots=[];
for(const b of built){
 const values=reopened.worksheets.getItem(b.name).getRangeByIndexes(4,0,b.rows.length+1,b.headers.length).values;
 assert.deepEqual(values,[b.headers,...b.rows]);snapshots.push({sheet:b.name,headers:b.headers,rows:values.slice(1)});
}
await fs.writeFile(resolve(previews,'xlsx-readback.json'),JSON.stringify({defaultDesign:JSON.parse(reopened.worksheets.getItem('录入说明与字段').getRange(`H${extra}`).values[0][0]),sheets:snapshots},null,2));
for(const [i,b] of built.entries()){
 const range=b.name==='材质参数'?'A13:G24':b.name==='颜色配置'?'A1:G11':b.name==='祝福语'?'A1:H11':'A1:H9';
 const image=await wb.render({sheetName:b.name,range,scale:1,format:'png'});
 await fs.writeFile(resolve(previews,`sheet-${i+1}.png`),new Uint8Array(await image.arrayBuffer()));
}
for(const [name,range] of [['城市配置','M5:M7'],['颜色配置','M5:N10'],['资源明细','P5:T7'],['材质参数','A1:H10']]){
 const image=await wb.render({sheetName:name,range,scale:1,format:'png'});
 await fs.writeFile(resolve(previews,`detail-${name}.png`),new Uint8Array(await image.arrayBuffer()));
}
console.log(JSON.stringify({file,sheets:built.map(b=>({name:b.name,rows:b.rows.length})),reopenedExact:true,previews}));
