import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createHaptics,createHapticTrack} from '../src/ui/haptics';
import {chooseHapticBackend} from '../src/ui/ios-haptics';
test('native vibration, older iOS labels and newer trusted gestures select separate paths',()=>{
 const c={vibrate:false,touchPoints:5,switchSupported:true,labelForwardsTrusted:true,userAgent:'Version/18.6 Mobile Safari/605.1'};
 assert.equal(chooseHapticBackend(c),'ios-label');
 assert.equal(chooseHapticBackend({...c,userAgent:'Version/26.4 Mobile Safari/605.1'}),'ios-label');
 assert.equal(chooseHapticBackend({...c,userAgent:'Version/26.5 Mobile Safari/605.1'}),'ios-gesture');
 assert.equal(chooseHapticBackend({...c,userAgent:'Version/27.0 Mobile Safari/605.1'}),'ios-gesture');
 assert.equal(chooseHapticBackend({...c,labelForwardsTrusted:false}),'ios-gesture');
 assert.equal(chooseHapticBackend({...c,userAgent:'iPhone OS 26_5 like Mac OS X CriOS/140.0'}),'ios-gesture');
 assert.equal(chooseHapticBackend({...c,vibrate:true}),'vibration');
 assert.equal(chooseHapticBackend({...c,userAgent:'Version/17.4 Mobile Safari/605.1'}),'none');
 assert.equal(chooseHapticBackend({...c,switchSupported:false}),'none');
 assert.equal(chooseHapticBackend({...c,touchPoints:0}),'none');
 assert.equal(chooseHapticBackend({...c,userAgent:'future WebKit'}),'ios-gesture');
});
test('haptics require trusted touch intent and respect reduced motion/visibility gating',()=>{
 const calls:number[]=[];let allowed=false;
 const h=createHaptics({allowed:()=>allowed,vibrate:n=>{calls.push(n);return true;},now:()=>1000});
 assert.equal(h.pulse({isTrusted:true,pointerType:'touch'}),false);allowed=true;
 assert.equal(h.pulse({isTrusted:false,pointerType:'touch'}),false);
 assert.equal(h.pulse({isTrusted:true,pointerType:'mouse'}),false);
 assert.equal(h.pulse({isTrusted:true}),false);assert.deepEqual(calls,[]);
 assert.equal(h.pulse({isTrusted:true,pointerType:'touch'}),true);assert.deepEqual(calls,[8]);
});
test('haptics rate limit detents and bound pulse length',()=>{
 let now=0;const calls:number[]=[];
 const h=createHaptics({allowed:()=>true,vibrate:n=>{calls.push(n);return true;},now:()=>now}),event={isTrusted:true,pointerType:'touch'};
 h.pulse(event,1000);now=54;h.pulse(event);now=55;h.pulse(event,1);assert.deepEqual(calls,[16,4]);
});
test('unsupported or rejected motor requests cannot break the interaction',()=>{
 const event={isTrusted:true,pointerType:'touch'};
 assert.equal(createHaptics({allowed:()=>true,vibrate:()=>false,now:()=>0}).pulse(event),false);
 assert.equal(createHaptics({allowed:()=>true,vibrate:()=>{throw new Error('disabled');},now:()=>0}).pulse(event),false);
});

test('movement haptics follow distance and cell crossings without reacting to finger jitter',()=>{
 const track=createHapticTrack();track.reset(0,0,20);
 assert.equal(track.move(.3,.2,20),false);assert.equal(track.move(.5,.3,20),false);
 for(let i=0;i<1000;i++)assert.equal(track.move(i%2?1:-1,0,20),false);
 assert.equal(track.move(6,0,20),false);assert.equal(track.move(11,0,20),true);
 assert.equal(track.move(16,0,20),false);assert.equal(track.move(28,0,20),true);
 track.reset(0,0,20);assert.equal(track.move(0,16,20),true);
});
