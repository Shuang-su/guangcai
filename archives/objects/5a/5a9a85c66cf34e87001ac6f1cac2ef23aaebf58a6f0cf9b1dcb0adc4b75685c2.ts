import {createHash} from 'node:crypto';
import {buildProduct as original} from '/Volumes/Prism/Codex/guangcai-viewer-20260929/outputs/guangcai-viewer/src/geometry/product.ts';
import {buildProduct as current} from '../src/viewer/geometry/product.ts';
import {makeMaterials} from '../src/viewer/materials/materials.ts';
const hash=(fn:any)=>{const p=fn(makeMaterials());const meshes:any[]=[];p.root.traverse((o:any)=>{if(o.isMesh){const h=createHash('sha256');for(const key of ['position','normal','uv'])if(o.geometry.attributes[key])h.update(Buffer.from(o.geometry.attributes[key].array.buffer));if(o.geometry.index)h.update(Buffer.from(o.geometry.index.array.buffer));h.update(JSON.stringify(o.geometry.groups));meshes.push({name:o.name,hash:h.digest('hex'),vertices:o.geometry.attributes.position.count});}});p.dispose();return meshes;};
const source=hash(original),h5=hash(current);console.log(JSON.stringify({source,identical:JSON.stringify(source)===JSON.stringify(h5)},null,2));
