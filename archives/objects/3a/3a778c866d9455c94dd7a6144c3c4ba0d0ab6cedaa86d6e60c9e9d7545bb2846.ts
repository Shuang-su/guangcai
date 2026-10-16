import {
  Box3,
  Color,
  Material,
  Mesh,
  SRGBColorSpace,
  TextureLoader,
  Vector3,
  Vector2,
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { buildProduct } from "./geometry/product";
import { makeMaterials } from "./materials/materials";
import { createStudio } from "./studio/studio";
import { StyleManager, type StylePack } from "./styles/style-manager";
import { activityConfig } from "../domain/activity";

export class CupViewer {
  readonly canvas = document.createElement("canvas");
  private materials = makeMaterials();
  readonly product = buildProduct(this.materials);
  readonly studio: ReturnType<typeof createStudio>;
  readonly controls: OrbitControls;
  private manager: StyleManager;
  private originals = new Map<Mesh, Material | Material[]>();
  private active = true;
  private disposed = false;
  private raf = 0;
  private lastFrame = 0;
  private frameTimes: number[] = [];
  private renderCount = 0;
  private observer: ResizeObserver;
  private phase: "white" | "fixed" = "white";
  private loaded = false;
  private lost = false;
  private onContextLoss: () => void;
  constructor(host: HTMLElement, onError: (message: string) => void) {
    this.canvas.setAttribute(
      "aria-label",
      "一号杯三维器物：拖动旋转，双指缩放或移动",
    );
    this.canvas.tabIndex = 0;
    host.append(this.canvas);
    try {
      this.studio = createStudio(this.canvas, true);
    } catch {
      this.product.dispose();
      throw new Error("当前环境无法启动 WebGL 2，无法显示三维器物。");
    }
    this.studio.scene.add(this.product.root);
    this.studio.scene.background = null;
    this.studio.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    this.product.root.traverse((o) => {
      if (o instanceof Mesh) this.originals.set(o, o.material);
    });
    this.controls = new OrbitControls(this.studio.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.12;
    this.controls.minDistance = 205;
    this.controls.maxDistance = 650;
    this.controls.minPolarAngle = 0.12;
    this.controls.maxPolarAngle = Math.PI - 0.12;
    this.controls.enablePan = true;
    this.controls.screenSpacePanning = true;
    this.controls.zoomSpeed = 0.65;
    this.controls.addEventListener("change", () => {
      this.clampTarget();
      this.invalidate();
    });
    this.manager = new StyleManager(
      this.materials,
      Math.min(4, this.studio.renderer.capabilities.getMaxAnisotropy()),
      () => this.invalidate(),
    );
    const p = this.product.parameters;
    const handle = this.product.cup.getObjectByName(
      "wide-ribbon-handle",
    ) as Mesh;
    const saucer = this.product.saucer.children[0] as Mesh;
    this.manager.fit({
      body: (p.radius * p.bandAngle) / (p.height - 5.3),
      handle: handle.geometry.userData.surfaceMetrics.aspect,
      saucer: saucer.geometry.userData.surfaceMetrics.aspect,
    });
    this.onContextLoss = () => {
      this.lost = true;
      this.pause();
      onError("三维画面已中断，请重试以重新载入器物。");
    };
    this.canvas.addEventListener("webglcontextlost", (e) => {
      e.preventDefault();
      this.onContextLoss();
    });
    this.canvas.addEventListener("dblclick", () => this.reset());
    this.canvas.addEventListener("keydown", this.keyControl);
    this.observer = new ResizeObserver(() => {
      if (this.active) {
        this.studio.resize();
        this.invalidate();
      }
    });
    this.observer.observe(host);
    new TextureLoader().load(
      `${import.meta.env.BASE_URL}marks/auratic-reference.png`,
      (texture) => {
        if (this.disposed) {
          texture.dispose();
          return;
        }
        texture.colorSpace = SRGBColorSpace;
        this.materials.mark.map = texture;
        this.materials.mark.needsUpdate = true;
        this.invalidate();
      },
      undefined,
      () => {},
    );
    this.neutral();
    this.reset();
  }
  private keyControl = (e: KeyboardEvent) => {
    if (
      [
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "+",
        "-",
        "Home",
      ].includes(e.key)
    ) {
      e.preventDefault();
      if (e.key === "Home") this.reset();
      else if (e.key === "+" || e.key === "-")
        this.zoom(e.key === "+" ? 0.85 : 1.15);
      else
        this.orbit(
          e.key === "ArrowLeft" ? -0.18 : e.key === "ArrowRight" ? 0.18 : 0,
          e.key === "ArrowUp" ? -0.12 : e.key === "ArrowDown" ? 0.12 : 0,
        );
    }
  };
  private clampTarget() {
    const t = this.controls.target;
    t.x = Math.max(-35, Math.min(45, t.x));
    t.y = Math.max(30, Math.min(110, t.y));
    t.z = Math.max(-30, Math.min(30, t.z));
  }
  private invalidate = () => {
    if (!this.active || this.disposed || this.lost || this.raf) return;
    this.raf = requestAnimationFrame(this.draw);
  };
  private draw = (time: number) => {
    this.raf = 0;
    if (!this.active || this.disposed || this.lost) return;
    if (time - this.lastFrame < 30) {
      this.invalidate();
      return;
    }
    if (this.lastFrame) this.frameTimes.push(time - this.lastFrame);
    if (this.frameTimes.length > 90) this.frameTimes.shift();
    this.lastFrame = time;
    this.renderCount++;
    this.controls.update();
    this.studio.contact.update(this.product.root);
    this.studio.renderer.render(this.studio.scene, this.studio.camera);
  };
  get unavailable() {
    return this.lost || this.disposed;
  }
  mount(host: HTMLElement) {
    host.append(this.canvas);
    this.observer.disconnect();
    this.observer.observe(host);
    this.active = true;
    this.studio.resize();
    this.reset();
    this.invalidate();
  }
  resume() {
    this.active = true;
    this.studio.resize();
    this.invalidate();
  }
  pause() {
    this.active = false;
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.lastFrame = 0;
  }
  neutral() {
    this.phase = "white";
    for (const [mesh, material] of this.originals) {
      const convert = (m: Material) =>
        Object.values(this.materials.regions).includes(m as never) ||
        m === this.materials.gold
          ? this.materials.porcelain
          : m;
      mesh.material = Array.isArray(material)
        ? material.map(convert)
        : convert(material);
    }
    this.invalidate();
  }
  async fixed() {
    if (!this.loaded) {
      const pack: StylePack = {
        name: activityConfig.styleName,
        regions: Object.fromEntries(
          ["body", "handle", "saucer"].map((region) => [
            region,
            Object.fromEntries(
              ["baseColor", "normal", "roughness", "metalness"].map(
                (channel) => [
                  channel,
                  `${import.meta.env.BASE_URL}artwork/${region}-${channel}.png`,
                ],
              ),
            ),
          ]),
        ) as unknown as StylePack["regions"],
      };
      const applied = await this.manager.apply(pack);
      if (!applied || this.disposed) throw new Error("材质载入已取消");
      this.loaded = true;
    }
    for (const [mesh, material] of this.originals) mesh.material = material;
    this.phase = "fixed";
    this.invalidate();
  }
  reset() {
    const target = new Vector3(7, 63, 0);
    this.controls.target.copy(target);
    const direction = new Vector3(185, 137, 275).sub(target);
    if (this.studio.camera.aspect < 0.9) direction.multiplyScalar(1.25);
    this.studio.camera.position.copy(target).add(direction);
    this.controls.update();
    this.invalidate();
  }
  zoom(factor: number) {
    const c = this.studio.camera,
      t = this.controls.target;
    const d = c.position.clone().sub(t);
    d.setLength(
      Math.max(
        this.controls.minDistance,
        Math.min(this.controls.maxDistance, d.length() * factor),
      ),
    );
    c.position.copy(t).add(d);
    this.controls.update();
    this.invalidate();
  }
  orbit(yaw: number, pitch = 0) {
    const t = this.controls.target,
      d = this.studio.camera.position.clone().sub(t);
    d.applyAxisAngle(new Vector3(0, 1, 0), yaw);
    if (pitch) d.applyAxisAngle(new Vector3(1, 0, 0), pitch);
    this.studio.camera.position.copy(t).add(d);
    this.controls.update();
    this.invalidate();
  }
  setPose(
    position: [number, number, number],
    target: [number, number, number],
  ) {
    this.studio.camera.position.set(...position);
    this.controls.target.set(...target);
    this.controls.update();
    this.invalidate();
  }
  async capture(width = 900, height = 900): Promise<Blob> {
    if (this.lost || this.disposed) throw new Error("三维画面不可用");
    const { renderer, scene, camera, contact } = this.studio;
    const pos = camera.position.clone(),
      target = this.controls.target.clone(),
      aspect = camera.aspect,
      size = renderer.getSize(new Vector2()),
      dpr = renderer.getPixelRatio(),
      enabled = this.controls.enabled;
    this.controls.enabled = false;
    try {
      this.controls.target.set(7, 63, 0);
      camera.position.set(205, 145, 300);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      camera.lookAt(this.controls.target);
      camera.updateMatrixWorld();
      // Use the same default-framebuffer tone mapping as the live view. RenderTarget exports
      // bypass Three's display tone mapping and would change porcelain/gold in the poster.
      renderer.setPixelRatio(1);
      renderer.setSize(width, height, false);
      contact.update(this.product.root);
      renderer.setRenderTarget(null);
      renderer.render(scene, camera);
      return await new Promise<Blob>((resolve, reject) =>
        this.canvas.toBlob(
          (blob) =>
            blob ? resolve(blob) : reject(new Error("无法生成器物图片")),
          "image/png",
        ),
      );
    } finally {
      renderer.setPixelRatio(dpr);
      renderer.setSize(size.x, size.y, false);
      camera.position.copy(pos);
      this.controls.target.copy(target);
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      this.controls.enabled = enabled;
      this.controls.update();
      this.invalidate();
    }
  }

  debug() {
    return {
      renderCount: this.renderCount,
      activeFrameMs: this.frameTimes.filter((t) => t < 100),
      phase: this.phase,
      style: this.phase === "fixed" ? activityConfig.styleVersion : null,
      camera: this.studio.camera.position.toArray(),
      target: this.controls.target.toArray(),
      pixelRatio: this.studio.renderer.getPixelRatio(),
      meshCount: this.originals.size,
      triangles: this.studio.renderer.info.render.triangles,
      memory: { ...this.studio.renderer.info.memory },
      loaded: this.loaded,
      active: this.active,
      contextLost: this.lost,
      bounds: new Box3()
        .setFromObject(this.product.root)
        .getSize(new Vector3())
        .toArray(),
    };
  }
  dispose() {
    if (this.disposed) return;
    this.pause();
    this.disposed = true;
    this.observer.disconnect();
    this.controls.dispose();
    this.manager.dispose();
    this.product.dispose();
    this.materials.mark.map?.dispose();
    for (const m of [
      ...Object.values(this.materials.regions),
      this.materials.porcelain,
      this.materials.gold,
      this.materials.mark,
      this.materials.foot,
    ])
      m.dispose();
    this.studio.dispose();
    this.canvas.remove();
  }
}
