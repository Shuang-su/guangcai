import fs from 'node:fs';
import vm from 'node:vm';
const folder = new URL('./', import.meta.url);
for (const label of ['original', 'china']) {
  const calls = JSON.parse(fs.readFileSync(new URL(label+'-exec-calls.json',folder),'utf8'));
  const records = [], errors = [], saved = new Map();
  for (const call of calls) {
    const tools = new Proxy({}, {get: (_, name) => async (...args) => {
      if (['apply_patch','exec_command'].includes(String(name))) records.push({...call, code:undefined, tool:String(name), input:args[0]});
      return {output:'',exit_code:0,content:[{type:'text',text:'{}'}]};
    }});
    const context = vm.createContext({tools, ALL_TOOLS:[], text:()=>{}, image:()=>{}, generatedImage:()=>{}, notify:()=>{},
      store:(k,v)=>saved.set(k,v),load:k=>saved.get(k),setTimeout:fn=>{fn();return 0},clearTimeout:()=>{},exit:()=>{throw Error('exit')},yield_control:async()=>{}});
    try { await new vm.Script('(async()=>{'+call.code+'\n})()').runInContext(context,{timeout:1000}); }
    catch (error) { errors.push({line:call.line,error:String(error).slice(0,200)}); }
  }
  fs.writeFileSync(new URL(label+'-operations.json',folder),JSON.stringify(records,null,2));
  fs.writeFileSync(new URL(label+'-extraction-errors.json',folder),JSON.stringify(errors,null,2));
  console.log(JSON.stringify({label,operations:records.length,patches:records.filter(r=>r.tool==='apply_patch').length,commands:records.filter(r=>r.tool==='exec_command').length,errors:errors.length}));
}
