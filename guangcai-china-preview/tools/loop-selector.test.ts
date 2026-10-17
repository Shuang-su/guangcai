import {test} from 'node:test';
import assert from 'node:assert/strict';
import {loopIndex,loopOffset} from '../src/ui/loop-selector';
test('four menus and five palettes cycle both ways with three menu slots and five palette slots',()=>{
 for(const count of [4,5])for(let current=0;current<count;current++)for(const direction of [-1,1]){
  assert.equal(loopIndex(current+count*direction,count),current);
  const positions=Array.from({length:count},(_,i)=>loopOffset(i,current,count,direction));
  assert.equal(new Set(positions).size,count);assert.equal(positions.filter(p=>Math.abs(p)<(count===5?2.5:1.5)).length,count===5?5:3);
  assert.equal(positions[loopIndex(current+direction,count)],direction);
 }
});
