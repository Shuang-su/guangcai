import {test} from 'node:test';
import assert from 'node:assert/strict';
import {needsIsolatedGlass} from '../src/ui/glass-compat';

test('mobile WebKit uses an unfiltered scene, including iPad desktop UA and iOS browser brands',()=>{
 for(const [userAgent,vendor,maxTouchPoints] of [
  ['Mozilla/5.0 (iPhone; CPU iPhone OS 27_0 like Mac OS X) AppleWebKit/605.1.15 Version/27.0 Mobile Safari/604.1','Apple Computer, Inc.',5],
  ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 Version/26.6 Safari/605.1.15','Apple Computer, Inc.',5],
  ['Mozilla/5.0 (iPhone) AppleWebKit/605.1.15 CriOS/142.0 Mobile/15E148 Safari/604.1','Google Inc.',5],
  ['Mozilla/5.0 (iPhone) AppleWebKit/605.1.15 FxiOS/143.0 Mobile Safari/605.1.15','',0],
 ] as const)assert.equal(needsIsolatedGlass({userAgent,vendor,maxTouchPoints}),true);
});
test('desktop Safari and Android Chromium retain the original optical renderer',()=>{
 for(const [userAgent,vendor,maxTouchPoints] of [
  ['Mozilla/5.0 (Macintosh) AppleWebKit/605.1.15 Version/26.6 Safari/605.1.15','Apple Computer, Inc.',0],
  ['Mozilla/5.0 (Linux; Android) AppleWebKit/537.36 Chrome/144.0 Mobile Safari/537.36','Google Inc.',5],
 ] as const)assert.equal(needsIsolatedGlass({userAgent,vendor,maxTouchPoints}),false);
});
