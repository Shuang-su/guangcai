import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fixedQualityCandidates,compatibleAtlas} from '../src/resources/fixed-quality';

test('manual hero zoom can request sharp saucer color without downgrading the city',()=>{
 const options=fixedQualityCandidates('hero',true);
 assert(options.some(q=>q.colors.saucer==='detail'&&q.tiers.saucer==='standard'&&q.tiers.body==='light'));
 assert.equal(fixedQualityCandidates('hero',false)[0].colors.saucer,'standard');
});
test('isolated parts do not spend the quality budget on hidden floral surfaces',()=>{
 assert(fixedQualityCandidates('lid',true).every(q=>Object.values(q.tiers).every(t=>t==='light')));
 assert(fixedQualityCandidates('cup',true).every(q=>q.tiers.saucer==='light'&&q.colors.saucer==='light'));
 assert(fixedQualityCandidates('saucer',false).every(q=>q.tiers.body==='light'&&q.colors.handle==='light'));
 assert(fixedQualityCandidates('cup',false).some(q=>q.colors.body==='standard'&&q.tiers.body==='light'),'body color can sharpen within a smaller relief budget');
});
test('4K color and 2K relief share the same normalized atlas on every supported release',()=>{
 for(let n=1;n<=9;n++){
  const catalog=JSON.parse(readFileSync(`public/releases/v7-${n}/catalog.json`,'utf8'));
  const m=JSON.parse(readFileSync(`public/releases/v7-${n}/${catalog.manifestUrl}`,'utf8'));
  assert(compatibleAtlas(m.fixed.saucer.standard.atlas,m.fixed.saucer.detail.atlas),`v7-${n} atlas alignment`);
  assert(!compatibleAtlas(m.fixed.saucer.light.atlas,m.fixed.saucer.detail.atlas),`v7-${n} rejects different gutters`);
 }
});
