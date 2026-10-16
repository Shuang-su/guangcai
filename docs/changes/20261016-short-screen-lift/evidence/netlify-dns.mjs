// Task-local workaround for the macOS synthetic DNS mapping of api.netlify.com.
// Addresses returned by Google Public DNS on 2026-10-16 and verified with normal TLS.
// Only affects this process; hostname, SNI and certificate verification remain intact.
import dns from 'node:dns';
import {syncBuiltinESMExports} from 'node:module';
const original=dns.lookup;
const addresses=['3.138.241.213','3.141.83.116'];
dns.lookup=function(hostname,options,callback){
 if(hostname!=='api.netlify.com')return original.apply(this,arguments);
 if(typeof options==='function'){callback=options;options={};}
 const all=typeof options==='object'&&options?.all;
 queueMicrotask(()=>all?callback(null,addresses.map(address=>({address,family:4}))):callback(null,addresses[0],4));
};
syncBuiltinESMExports();
