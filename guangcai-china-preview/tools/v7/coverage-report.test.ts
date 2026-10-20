import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs/promises';import {createHash} from 'node:crypto';
import {Mesh,LineSegments} from 'three';import {buildProduct} from '../../src/geometry/product';import {makeMaterials} from '../../src/materials/materials';import {materialArea,surfaceRaster} from './surface-area';
import {citySurfaceMetrics,createCoverageGuide} from '../../src/lab/coverage-guide';
const read=async()=>JSON.parse(await fs.readFile('public/coverage/data.json','utf8'));
test('measured city surface uses actual UV material triangles and separates arc, vertical and curved-foot length',async()=>{
 const m=makeMaterials(),p=buildProduct(m),s=citySurfaceMetrics(p),d=await read();
 assert.ok(Math.abs(s.widthMm-43*Math.PI*5/3)<1e-9);assert.ok(Math.abs(s.heightMm-100.58)<1e-4);assert.ok(s.meridianLengthMm>s.heightMm+.8);assert.deepEqual(s,d.surface?Object.fromEntries(Object.entries(d.surface).filter(([k])=>k!=='interpretation')):null);
 assert.deepEqual(d.psd.ppi,[600,600]);assert.ok(Math.abs(d.psd.mm[0]-229.997)<1e-8);assert.ok(Math.abs(d.psd.mm[1]-100.118333333)<1e-8);
 assert.ok(Math.abs(d.differences.gapRuntimePx-61.370293965961764)<1e-10);assert.ok(Math.abs(d.differences.gapPsdPx-81.4025408)<1e-7);assert.ok(Math.abs(d.differences.gapModelMm-3.4619316)<1e-6);
 assert.ok(Math.abs(d.differences.relativeAspectChange*100+2.55785)<1e-4);assert.ok(Math.abs(d.differences.widthDeltaMm+4.84952649)<1e-7);p.dispose();
});
test('71 city versions and all chosen label variants have bounded, source-identifiable measurements',async()=>{
 const d=await read();let n=0;for(const group of Object.values<any>(d.groups))for(const c of Object.values<any>(group.cities)){n++;assert.match(c.asset.sha256,/^[a-f0-9]{64}$/);assert.ok(c.rect[0]>=0&&c.rect[1]>=0&&c.rect[2]>0&&c.rect[3]>0);assert.ok(c.rect[0]+c.rect[2]<=4096&&c.rect[1]+c.rect[3]<=1783);assert.ok(c.bottomGapMm>=0);}
 assert.equal(n,71);assert.equal(Object.keys(d.labels.reference).length,23);assert.notEqual(d.labels.previous.global.open.asset.sha256,d.labels.unified.global.open.asset.sha256);assert.notEqual(d.labels.unified.overrides.chengdu.open.asset.sha256,d.labels.unified.global.open.asset.sha256);
 assert.ok(d.groups.current.cities.shenzhen.modelRectMm[1]>20);assert.ok(d.groups.current.cities.shenzhen.bottomGapMm>.3);assert.ok(d.groups.current.cities.shenzhen.modelRectMm[1]>d.differences.gapModelMm+10);
});
test('diagnostic contours follow actual mesh UV and never alter approved cup geometry or UV buffers',()=>{
 const m=makeMaterials(),p=buildProduct(m),body=p.cup.getObjectByName('cup-wall-and-recessed-foot') as Mesh,g=body.geometry;
 const fingerprint=()=>createHash('sha256').update(Buffer.from(g.getAttribute('position').array.buffer)).update(Buffer.from(g.getAttribute('uv1').array.buffer)).update(Buffer.from(g.index!.array.buffer)).digest('hex'),before=fingerprint(),v=1-61.370293965961764/1783;
 const guide=createCoverageGuide(p,v);assert.equal(guide.debug().enabled,false);assert.ok(guide.debug().lines.every(l=>l.vertices>0));guide.set(true);assert.equal(guide.debug().enabled,true);
 const line=body.getObjectByName('source-top') as LineSegments,a=line.geometry.getAttribute('position'),s=citySurfaceMetrics(p),y=s.bottomY+v*s.heightMm;for(let i=0;i<a.count;i++)assert.ok(Math.abs(a.getY(i)-y)<.066);
 guide.set(true,false);assert.equal(guide.debug().lines.find(l=>l.name==='source-top')!.visible,false);assert.equal(fingerprint(),before);guide.dispose();assert.ok(!body.getObjectByName('lab-coverage-guide'));assert.equal(fingerprint(),before);p.dispose();
});

test('surface occupation is normalized to actual city triangles, including curved foot, not the rectangular canvas',async()=>{
 const m=makeMaterials(),p=buildProduct(m),body=p.cup.getObjectByName('cup-wall-and-recessed-foot') as Mesh,a=surfaceRaster(body,128,56),d=await read();
 assert.ok(Math.abs(a.areaMm2-materialArea(body,3))<1e-8);assert.ok(Math.abs(a.boardCoverage-d.fixed.boardSurfaceCoverage)<1e-10);assert.ok(a.boardCoverage>d.differences.heightCoverage);let sum=0;for(const w of a.weights)sum+=w;assert.ok(Math.abs(sum-a.areaMm2)<1e-7);
 const x=d.groups.current.cities.shenzhen.occupancy.byLabel['unified:ocean'];assert.ok(x.paintedFraction>.25&&x.paintedFraction<.27);assert.ok(Math.abs(x.paintedFraction+x.blankFraction-1)<1e-12);assert.ok(Math.abs(x.paintedMm2+x.blankMm2-a.areaMm2)<1e-7);p.dispose();
});
test('part diagnostics include actual floral meshes, handle join band and saucer wrap boundaries',async()=>{
 const m=makeMaterials(),p=buildProduct(m);p.setFixedMapping('source-layout-v4');const g=createCoverageGuide(p,1-61.370293965961764/1783),d=await read();
 assert.ok(Math.abs(300+d.fixed.visibleBodyDegrees+d.fixed.bodyWhiteRemainderDegrees-360)<1e-9);assert.ok(Math.abs(d.fixed.parts.body.modelSizeMm[0]-42.778019966)<1e-7);assert.deepEqual(d.fixed.parts.saucer.seamsU,[.105,.605]);assert.equal(d.fixed.parts.saucer.tiers.detail.atlas.gutter,16);
 for(const name of ['city','body','handle','saucer','all']){g.set(true,true,name,true);const v=g.debug();assert.ok(v.regions.filter(r=>r.enabled).every(r=>r.highlight&&r.vertices>0));assert.equal(v.regions.filter(r=>r.enabled).length,name==='all'?4:1);}
 g.dispose();assert.ok(!p.cup.getObjectByName('lab-part-handle'));assert.ok(!p.saucer.getObjectByName('lab-part-saucer'));p.dispose();
});
