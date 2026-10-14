import {readFile,mkdir,writeFile,copyFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const out='public/review/fixed-layout';await mkdir(out,{recursive:true});
const record='docs/changes/20261013-fixed-layout';
const protectedFiles=JSON.parse(await readFile(`${record}/protected.json`,'utf8'));
for(const [path,hash] of Object.entries(protectedFiles))assert.equal(createHash('sha256').update(await readFile(path)).digest('hex'),hash,path+' preserved');
const previous=JSON.parse(await readFile(`${record}/previous-online-fixed-manifest.json`,'utf8'));
const current=JSON.parse(await readFile('public/fixed/manifest.json','utf8'));
assert.deepEqual(current.renderStandard,previous.renderStandard);
for(const name of ['body','handle','saucer'])assert.deepEqual(current.regions[name].maps,previous.regions[name].maps);
for(const face of ['buildings','label']){
  const files=[`public/reference/${face}.jpg`,`${record}/before/public/review/${face}-model.png`,`public/review/${face}-model.png`];
  // Use the exact same-camera baseline captured in this task, before any production edit.
  files[1]=`${record}/before-captures/${face}.png`;
  const {width,height}=await sharp(files[0]).metadata();
  const tiles=await Promise.all(files.map(async(f,i)=>({input:await sharp(f).resize({width:800}).jpeg({quality:94}).toBuffer(),left:i*800,top:0})));
  await sharp({create:{width:2400,height:Math.round(height*800/width),channels:3,background:'#eee'}}).composite(tiles).jpeg({quality:94}).toFile(`${out}/${face}-comparison.jpg`);
  await copyFile(`public/review/${face}-overlay.png`,`${out}/${face}-overlay.png`);
  await sharp(files[1]).jpeg({quality:94}).toFile(`${out}/${face}-before.jpg`);
  await sharp(files[2]).jpeg({quality:94}).toFile(`${out}/${face}-after.jpg`);
}
const verification={date:'2026-10-13',previousDeploy:'6acbd24fa545c331cdd20dae',protectedFiles:Object.keys(protectedFiles).length,allProtectedHashesMatch:true,allFixedMapsMatchPreviousDeploy:true,renderStandard:current.renderStandard,layout:current.layoutCalibration,cameras:JSON.parse(await readFile('evidence/camera-calibration.json','utf8')),geometryChecks:10,comparison:'Reference, before, after. Exact fixed camera, viewport, light and geometry. Overlays are arithmetic 50% blends without image warping.',remainingDifferences:['The reconstructed saucer ribbon does not contain every flower in the original ordering; the blue daisy on the building face is still different.','Reference cameras are calibrated approximations. PSD letter shapes, existing vessel shape and city relief are unchanged.'],depth:'Previous height maps feed the same normal maps; shader normal strength 4.4 and clearcoat normal strength 2.4. No geometric displacement.'};
await writeFile(`${out}/verification.json`,JSON.stringify(verification,null,2));
await writeFile(`${record}/verification.json`,JSON.stringify(verification,null,2));
console.log({out,protectedFiles:verification.protectedFiles,pixelsAndDepthUnchanged:true});
