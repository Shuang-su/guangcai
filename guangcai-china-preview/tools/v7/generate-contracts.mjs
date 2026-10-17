import fs from 'node:fs/promises';
const bootstrap=JSON.parse(await fs.readFile('public/api/v1/bootstrap.json')),manifest=JSON.parse(await fs.readFile('public/'+bootstrap.manifestUrl));
const object=(properties,required=Object.keys(properties))=>({type:'object',additionalProperties:false,properties,required});
const string={type:'string'},number=(minimum,maximum)=>({type:'number',minimum,maximum});
const design={$schema:'https://json-schema.org/draft/2020-12/schema',$id:'urn:guangcai:design:1',title:'DesignConfig',...object({schemaVersion:{const:1},resourceReleaseId:{enum:['v7-1','v7-2','v7-3']},modelVersion:{const:'china-cup-v6'},recipeVersion:{const:'porcelain-city-v6'},cityId:{enum:Object.keys(manifest.cities)},sloganId:{enum:Object.keys(manifest.slogans)},appearance:object({preset:{enum:['gold','red','green','purple','blue']},hue:number(0,360),saturation:number(0,100),lightness:number(0,100),material:number(0,1),materialX:number(0,1),relief:number(0,2)})})};
const positive={type:'integer',minimum:1},hash={type:'string',pattern:'^[a-f0-9]{64}$'};
const asset=object({id:string,url:{type:'string',format:'uri-reference'},sha256:hash,sourceSha256:hash,encoding:{enum:['webp','hfn1-gzip']},width:{type:'integer',minimum:1,maximum:8192},height:{type:'integer',minimum:1,maximum:8192},bytes:positive,decodedBytes:positive,gpuBytes:positive,channels:{enum:[1,2,4]},colorSpace:{enum:['srgb','linear']}});
const atlas=object({rows:{type:'integer',minimum:2,maximum:4},contentWidth:positive,contentHeight:positive,gutter:{type:'integer',minimum:8,maximum:128}});
const fixed=object({baseColor:{$ref:'#/$defs/asset'},normal:{$ref:'#/$defs/asset'},orm:{$ref:'#/$defs/asset'},atlas:{$ref:'#/$defs/atlas'}},['baseColor','normal','orm']);
const city=object({mask:{$ref:'#/$defs/asset'},normal:{$ref:'#/$defs/asset'}});
const tiers=type=>object(Object.fromEntries(['light','standard','detail'].map(t=>[t,type])));
const resource={$schema:'https://json-schema.org/draft/2020-12/schema',$id:'urn:guangcai:resource-manifest:1',title:'ResourceManifest',$defs:{asset,atlas},...object({schemaVersion:{const:1},releaseId:string,modelVersion:string,recipeVersion:string,fixed:object(Object.fromEntries(['body','handle','saucer'].map(r=>[r,tiers(fixed)]))),cities:{type:'object',minProperties:1,additionalProperties:object({name:string,thumbnail:{$ref:'#/$defs/asset'},levels:tiers(city)})},slogans:{type:'object',minProperties:1,additionalProperties:object({text:string,asset:{$ref:'#/$defs/asset'},uvRect:{type:'array',items:number(0,1),minItems:4,maxItems:4}})},mark:{$ref:'#/$defs/asset'}})};
const bootstrapSchema=object({schemaVersion:{const:1},releaseId:string,catalogUrl:string,manifestUrl:string,defaultDesign:{$ref:'#/components/schemas/DesignConfig'}});
const response=(description,schema)=>({description,...(schema?{content:{'application/json':{schema}}}:{})});
const work=object({id:string,title:{type:'string',minLength:1,maxLength:120},revision:positive,design:{$ref:'#/components/schemas/DesignConfig'},createdAt:string,updatedAt:string});
const workInput=object({title:{type:'string',minLength:1,maxLength:120},design:{$ref:'#/components/schemas/DesignConfig'}});
const request=schema=>({required:true,content:{'application/json':{schema}}});
const param=name=>({name,in:'path',required:true,schema:string});
const errors={400:response('Invalid input'),401:response('Authentication required'),403:response('Origin not allowed'),404:response('Not found or not owned'),409:response('Revision or idempotency conflict')};
const openapi={openapi:'3.1.0',info:{title:'Guangcai V7 resource and integration reference',version:'1.0.0',description:'Resource delivery contract plus optional in-memory sample API. Company identity and database implementation remain external.'},servers:[{url:'/api/v1'}],components:{schemas:{DesignConfig:{...design,$id:undefined,$schema:undefined},Work:work}},paths:{
 '/bootstrap':{get:{summary:'Active release and default design',responses:{200:response('Bootstrap',bootstrapSchema)}}},
 '/session':{get:{summary:'Mock session; replace with company adapter',responses:{200:response('Synthetic session',object({mock:{const:true},userId:{type:['string','null']}}))}}},
 '/mock/session':{post:{summary:'LOCAL MOCK ONLY: select alice, bob or anonymous',requestBody:request(object({user:{enum:['alice','bob',null]}})),responses:{200:response('Mock session selected'),...errors}}},
 '/works':{get:{summary:'List own works',responses:{200:response('Works',object({items:{type:'array',items:{$ref:'#/components/schemas/Work'}}})),...errors}},post:{summary:'Create a work',parameters:[{name:'Idempotency-Key',in:'header',schema:string}],requestBody:request(workInput),responses:{201:response('Created',work),200:response('Idempotent replay',work),...errors}}},
 '/works/{id}':{parameters:[param('id')],get:{responses:{200:response('Own work',work),...errors}},put:{requestBody:request(object({...workInput.properties,revision:positive})),responses:{200:response('Updated work',work),...errors}},delete:{responses:{204:response('Deleted and shares revoked'),...errors}}},
 '/works/{id}/shares':{parameters:[param('id')],post:{requestBody:request(object({revision:positive})),responses:{201:response('Immutable snapshot link',object({id:string,url:string,token:string,revision:positive})),...errors}}},
 '/shares/{id}':{parameters:[param('id')],delete:{responses:{204:response('Share revoked'),...errors}}},
 '/public/shares/{token}':{parameters:[param('token')],get:{summary:'Anonymous read-only snapshot',responses:{200:response('Public design',object({title:string,revision:positive,design:{$ref:'#/components/schemas/DesignConfig'}})),404:response('Missing'),410:response('Revoked')}}}
 }};
await fs.mkdir('integration/contracts',{recursive:true});
for(const [name,data]of Object.entries({'design.schema.json':design,'resource-manifest.schema.json':resource,'openapi.json':openapi,'example-design.json':bootstrap.defaultDesign}))await fs.writeFile('integration/contracts/'+name,JSON.stringify(data,null,2)+'\n');
console.log('Wrote schemas, OpenAPI and example design');
