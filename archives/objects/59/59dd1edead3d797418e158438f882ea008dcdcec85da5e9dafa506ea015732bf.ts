import {
  Group,
  Mesh,
  Material,
  MeshPhysicalMaterial,
  BoxGeometry,
  MeshBasicMaterial,
} from "three";
import { defaults, GeometryParams, validateParams } from "./parameters";
import { makeBody, PartMaterial, Part } from "./body";
import { makeHandle, makeLid, makeSaucer } from "./accessories";
import { fixedMaterials } from "../materials/materials";
export function buildProduct(params: GeometryParams = { ...defaults }) {
  validateParams(params);
  const root = new Group(),
    cup = new Group(),
    lid = new Group(),
    saucer = new Group();
  root.name = "product";
  cup.name = "cup";
  lid.name = "lid";
  saucer.name = "saucer";
  root.scale.setScalar(0.01);
  root.add(cup, lid, saucer);
  const fixed = fixedMaterials(),
    placeholder = new MeshPhysicalMaterial({
      color: 0xf4f1e8,
      metalness: 0,
      roughness: 0.25,
      clearcoat: 0.6,
    });
  const mats: Record<PartMaterial, Material> = {
    ...fixed,
    body: placeholder,
    handle: placeholder,
    saucer: placeholder,
  };
  const artMeshes: Mesh[] = [];
  function add(parts: Part[], group: Group, kind: string) {
    for (const part of parts) {
      const mesh = new Mesh(part.geometry, mats[part.material]);
      mesh.name = part.name;
      mesh.userData = { part: kind, region: part.material };
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
      if (["body", "handle", "saucer"].includes(part.material))
        artMeshes.push(mesh);
    }
  }
  add(makeBody(params), cup, "body");
  add(makeHandle(params), cup, "handle");
  add(makeLid(params), lid, "lid");
  add(makeSaucer(params), saucer, "saucer");
  const hitMaterial = new MeshBasicMaterial({ visible: false });
  const handleHit = new Mesh(
    new BoxGeometry(
      params.handleReach - 2,
      params.handleTop - params.handleBottom + 4,
      params.handleWidth + 5,
    ),
    hitMaterial,
  );
  handleHit.position.set(
    params.radiusTop - params.flatCutDepth + params.handleReach / 2 + 2,
    (params.handleTop + params.handleBottom) / 2,
    0,
  );
  handleHit.userData.part = "handle";
  handleHit.name = "handle-touch-target";
  cup.add(handleHit);
  cup.position.y = 3.2;
  lid.position.y = params.height + 3.2;
  root.position.y = 0.005;
  return {
    root,
    cup,
    lid,
    saucer,
    params,
    artMeshes,
    fixed,
    placeholder,
    applyMaterials(materials: Record<string, Material>) {
      for (const mesh of artMeshes)
        mesh.material = materials[mesh.userData.region] || placeholder;
    },
    dispose() {
      root.traverse((o) => {
        if (o instanceof Mesh) o.geometry.dispose();
      });
      for (const m of Object.values(fixed)) m.dispose();
      placeholder.dispose();
      hitMaterial.dispose();
    },
  };
}
