import test from 'node:test';import assert from 'node:assert/strict';import {waitForLabPreview} from '../../src/lab/readiness';
test('a preview still progressing after 120 seconds can finish without a false timeout',async()=>{
 const original=Object.getOwnPropertyDescriptor(globalThis,'performance');let elapsed=0,prepared=false;
 Object.defineProperty(globalThis,'performance',{configurable:true,value:{now:()=>elapsed}});
 const viewer={ready:()=>prepared,getLoadState:()=>({phase:prepared?'ready':'loading'}),debug:()=>({selection:{busy:!prepared},quality:{upgrading:false}})};
 try{const value=await waitForLabPreview(()=>viewer,async()=>{elapsed+=30000;prepared=elapsed>=180000;});assert.equal(value,viewer);assert.equal(elapsed,180000);}finally{if(original)Object.defineProperty(globalThis,'performance',original);}
});
test('the lab reports an actual viewer error without waiting indefinitely',async()=>{
 await assert.rejects(waitForLabPreview(()=>({ready:()=>false,getLoadState:()=>({phase:'error',error:'资源摘要校验失败'}),debug:()=>({selection:{busy:false},quality:{upgrading:false}})}),async()=>{assert.fail('actual errors must not keep polling');}),/资源摘要校验失败/);
});
