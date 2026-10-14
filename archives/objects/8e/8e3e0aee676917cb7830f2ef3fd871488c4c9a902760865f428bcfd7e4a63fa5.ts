import {
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  Texture,
  TextureLoader,
  SRGBColorSpace,
  NoColorSpace,
  RepeatWrapping,
  WebGLRenderer,
} from "three";
import { KTX2Loader } from "three/addons/loaders/KTX2Loader.js";
import {
  CupStyle,
  DecorationRegion,
  MapSource,
  PBRMapSet,
} from "../styles/catalog";
export function fixedMaterials() {
  return {
    porcelain: new MeshPhysicalMaterial({
      color: 0xf8f6ec,
      roughness: 0.26,
      metalness: 0,
      clearcoat: 0.72,
      clearcoatRoughness: 0.15,
      ior: 1.5,
      transmission: 0,
    }),
    gold: new MeshPhysicalMaterial({
      color: 0xe8b35e,
      roughness: 0.235,
      metalness: 1,
      clearcoat: 0.12,
      clearcoatRoughness: 0.25,
    }),
    bottom: new MeshPhysicalMaterial({
      color: 0xf4f1e7,
      roughness: 0.35,
      metalness: 0,
      clearcoat: 0.4,
      clearcoatRoughness: 0.22,
      transmission: 0,
    }),
    foot: new MeshStandardMaterial({
      color: 0xe5dfd1,
      roughness: 0.68,
      metalness: 0,
    }),
  };
}
export class MaterialLibrary {
  loader = new TextureLoader();
  ktx: KTX2Loader;
  generation = 0;
  active: Partial<Record<DecorationRegion, MeshPhysicalMaterial>> = {};
  disposed = false;
  constructor(
    private renderer: WebGLRenderer,
    private apply: (m: Record<DecorationRegion, MeshPhysicalMaterial>) => void,
  ) {
    this.ktx = new KTX2Loader()
      .setTranscoderPath(`${import.meta.env.BASE_URL}basis/`)
      .detectSupport(renderer);
  }
  async load(source: MapSource, color: boolean, owned: Set<Texture>) {
    let texture: Texture;
    try {
      if (!source.ktx2) throw Error("Uncompressed source");
      texture = await this.ktx.loadAsync(source.ktx2);
    } catch {
      texture = await this.loader.loadAsync(source.png);
    }
    const loaded = texture;
    texture = loaded.clone();
    loaded.dispose();
    owned.add(texture);
    texture.colorSpace = color ? SRGBColorSpace : NoColorSpace;
    texture.anisotropy = Math.min(
      8,
      this.renderer.capabilities.getMaxAnisotropy(),
    );
    texture.needsUpdate = true;
    return texture;
  }
  async create(maps: PBRMapSet, region: DecorationRegion, owned: Set<Texture>) {
    const cache = new Map<string, Promise<Texture>>();
    const get = (s: MapSource | undefined, color = false) => {
      if (!s) return Promise.resolve(null);
      const key = s.png + color;
      let p = cache.get(key);
      if (!p) {
        p = this.load(s, color, owned);
        cache.set(key, p);
      }
      return p;
    };
    const result = await Promise.allSettled([
      get(maps.baseColor, true),
      get(maps.normal),
      get(maps.roughness),
      get(maps.metalness),
      get(maps.clearcoat),
      get(maps.clearcoatRoughness),
      get(maps.clearcoatNormal),
    ]);
    const failure = result.find((r) => r.status === "rejected");
    if (failure?.status === "rejected") throw failure.reason;
    const [
      map,
      normalMap,
      roughnessMap,
      metalnessMap,
      clearcoatMap,
      clearcoatRoughnessMap,
      clearcoatNormalMap,
    ] = result.map((r) => (r.status === "fulfilled" ? r.value : null));
    const sizes = [
      map,
      normalMap,
      roughnessMap,
      metalnessMap,
      clearcoatMap,
      clearcoatRoughnessMap,
      clearcoatNormalMap,
    ]
      .filter(Boolean)
      .map((t) => {
        const im = t!.image as { width: number; height: number };
        return `${im.width}x${im.height}`;
      });
    if (new Set(sizes).size > 1)
      throw Error("PBR maps must have matching dimensions within a region");
    if (region !== "body")
      for (const t of new Set([
        map,
        normalMap,
        roughnessMap,
        metalnessMap,
        clearcoatMap,
        clearcoatRoughnessMap,
        clearcoatNormalMap,
      ]))
        if (t) {
          t.wrapS = RepeatWrapping;
          t.repeat.x = region === "saucer" ? 8 : 1.8;
        }
    const mat = new MeshPhysicalMaterial({
      map,
      normalMap,
      roughnessMap,
      metalnessMap,
      clearcoatMap,
      clearcoatRoughnessMap,
      clearcoatNormalMap,
      metalness: metalnessMap ? 1 : 0,
      roughness: roughnessMap ? 1 : 0.28,
      clearcoat: clearcoatMap ? 1 : 0.7,
      clearcoatRoughness: clearcoatRoughnessMap ? 1 : 0.19,
      ior: 1.5,
    });
    const response = maps.response;
    if (response) {
      for (const key of [
        "roughness",
        "metalness",
        "clearcoat",
        "clearcoatRoughness",
        "ior",
      ] as const)
        if (response[key] !== undefined) mat[key] = response[key]!;
    }
    mat.normalScale.setScalar(response?.normalScale ?? 0.22);
    mat.clearcoatNormalScale.setScalar(response?.clearcoatNormalScale ?? 0.15);
    mat.name = `art-${region}`;
    return mat;
  }
  async setStyle(style: CupStyle): Promise<boolean> {
    if (this.disposed) throw Error("Viewer disposed");
    if (style.uvLayout !== "guangcai-v1")
      throw Error("UV layout does not match this geometry");
    const generation = ++this.generation,
      owned = new Set<Texture>(),
      regions: DecorationRegion[] = ["body", "handle", "saucer"];
    const results = await Promise.allSettled(
      regions.map((r) => this.create(style.regions[r], r, owned)),
    );
    const mats = results
      .filter((r) => r.status === "fulfilled")
      .map((r) => (r as PromiseFulfilledResult<MeshPhysicalMaterial>).value);
    const failure = results.find((r) => r.status === "rejected");
    if (failure || generation !== this.generation || this.disposed) {
      for (const m of mats) m.dispose();
      for (const t of owned) t.dispose();
      if (generation !== this.generation || this.disposed) return false;
      if (failure?.status === "rejected") throw failure.reason;
      return false;
    }
    const next = Object.fromEntries(
      regions.map((r, i) => [r, mats[i]]),
    ) as Record<DecorationRegion, MeshPhysicalMaterial>;
    const old = this.active;
    this.apply(next);
    this.active = next;
    this.release(old);
    return true;
  }
  async replaceArtwork(region: DecorationRegion, image: File | Blob) {
    if (!["body", "handle", "saucer"].includes(region))
      throw Error("Unknown artwork region");
    if (this.disposed) throw Error("Viewer disposed");
    const generation = ++this.generation,
      url = URL.createObjectURL(image);
    let map: Texture | undefined;
    try {
      map = await this.loader.loadAsync(url);
      if (generation !== this.generation || this.disposed) {
        map.dispose();
        return;
      }
      map.colorSpace = SRGBColorSpace;
      map.anisotropy = Math.min(
        8,
        this.renderer.capabilities.getMaxAnisotropy(),
      );
      const material = new MeshPhysicalMaterial({
        map,
        metalness: 0,
        roughness: 0.28,
        clearcoat: 0.7,
        clearcoatRoughness: 0.18,
      });
      const old = this.active[region];
      this.active = { ...this.active, [region]: material };
      this.apply(this.active as Record<DecorationRegion, MeshPhysicalMaterial>);
      if (old) this.release({ [region]: old });
    } finally {
      URL.revokeObjectURL(url);
    }
  }
  release(materials: Partial<Record<DecorationRegion, MeshPhysicalMaterial>>) {
    const textures = new Set<Texture>();
    for (const m of Object.values(materials)) {
      for (const value of Object.values(m))
        if (value instanceof Texture) textures.add(value);
      m.dispose();
    }
    for (const t of textures) t.dispose();
  }
  dispose() {
    this.disposed = true;
    this.generation++;
    this.release(this.active);
    this.ktx.dispose();
  }
}
