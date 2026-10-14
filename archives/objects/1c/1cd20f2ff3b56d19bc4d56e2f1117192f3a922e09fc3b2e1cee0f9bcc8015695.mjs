import vm from 'node:vm';
let input='';for await(const chunk of process.stdin)input+=chunk;
const {code,data,fallback}=JSON.parse(input),written={},errors=[];
const fs={readFile:async p=>{p=String(p);if(p in written)return written[p];if(p in data)return data[p];if(p in fallback)return fallback[p];throw Error('missing virtual file: '+p)},writeFile:async(p,s)=>{written[String(p)]=String(s)}};
const assert=Object.assign((x,m)=>{if(!x)throw Error(m??'assert')},{equal:(a,b,m)=>{if(a!==b)throw Error(m??'equal')},ok:(x,m)=>{if(!x)throw Error(m??'ok')}});
const source=code.replace(/import\s*\{([^}]+)\}\s*from\s*['"]node:fs\/promises['"];?/g,'const {$1}=FS;').replace(/import\s+assert\s+from\s*['"]node:assert\/strict['"];?/g,'');
const context=vm.createContext({FS:fs,assert,console:{log(){}},process:{env:{}},URL});
try{await new vm.Script('(async()=>{'+source+'\n})()').runInContext(context,{timeout:1000});}catch(e){errors.push(String(e))}
process.stdout.write(JSON.stringify({written,errors}));
