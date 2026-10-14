import {
  Box3,
  Color,
  Material,
  Mesh,
  SRGBColorSpace,
  TextureLoader,
  Vector3,
  Vector2, Vector4, WebGLRenderTarget, HalfFloatType, MeshPhysicalMaterial,
} from "three";
import { RibbonStage } from "./ribbon-stage";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
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
  readonly ribbons: RibbonStage;
  readonly instanceId = crypto.randomUUID();
  private container: HTMLDivElement;
  private host: HTMLElement;
  private rect = { x: 0, y: 0, w: 1, h: 1 };
  private rectStart = { ...this.rect };
  private transitionStart = -10000;
  private mode = 'home';
  private introProgress = 0;
  private reveal = { value: 1 };
  private revealStart = -10000;
  private styleEpoch = 0;
  private shown = true;
  private interactionPaused = false;
  private cameraTween: { start: number; from: Vector3; target: Vector3 } | null = null;
  private size = new Vector2();
  private reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  private waiters: Array<() => void> = [];

  constructor(host: HTMLElement, onError: (message: string) => void) {
    this.host = host;
    this.container = document.createElement('div');
    this.container.id = 'experience-stage';
    this.container.setAttribute('aria-hidden', 'true');
    this.container.append(this.canvas);
    document.body.prepend(this.container);
    this.canvas.setAttribute(
      "aria-label",
      "一号杯三维器物：拖动旋转，双指缩放或移动",
    );
    this.canvas.tabIndex = -1;
    try {
      this.studio = createStudio(this.canvas, true);
    } catch {
      this.product.dispose();this.container.remove();
      throw new Error("当前环境无法启动 WebGL 2，无法显示三维器物。");
    }
    this.studio.scene.add(this.product.root);
    this.studio.scene.background = null;
    this.studio.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    this.studio.renderer.autoClear = false;
    this.studio.renderer.localClippingEnabled = true;
    this.ribbons = new RibbonStage(this.studio.scene.environment);
    for (const material of [...Object.values(this.materials.regions), this.materials.gold]) {
      material.onBeforeCompile = shader => {
        shader.uniforms.reveal = this.reveal;
        shader.fragmentShader = 'uniform float reveal;\n' + shader.fragmentShader
          .replace('#include <map_fragment>', '#include <map_fragment>\ndiffuseColor.rgb = mix(vec3(0.905), diffuseColor.rgb, reveal);')
          .replace('#include <metalnessmap_fragment>', '#include <metalnessmap_fragment>\nmetalnessFactor *= reveal;')
          .replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\nroughnessFactor = mix(0.16, roughnessFactor, reveal);');
      };
      material.customProgramCacheKey = () => 'continuous-reveal-v2';
    }
    this.product.root.traverse((o) => {
      if (o instanceof Mesh) this.originals.set(o, o.material);
    });
    this.controls = new OrbitControls(this.studio.camera, host);
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
    host.addEventListener("keydown", this.keyControl);
    this.observer = new ResizeObserver(() => this.invalidate());
    this.observer.observe(host);
    window.addEventListener('resize', this.invalidate);
    window.addEventListener('scroll', this.invalidate, { passive: true });
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
    if (time - this.lastFrame < 30) { this.invalidate(); return; }
    if (this.lastFrame) this.frameTimes.push(time - this.lastFrame);
    if (this.frameTimes.length > 90) this.frameTimes.shift();
    this.lastFrame = time; this.renderCount++;
    this.container.classList.toggle("covering-options",this.ribbons.transitioning);
    this.drawScene(time);
    if (this.ribbons.visible || time - this.transitionStart < 720 || this.cameraTween || time - this.revealStart < 1000) this.invalidate();
    else { this.waiters.splice(0).forEach(r => r()); }
  };
  private drawScene(time: number) {
    const { renderer, camera, scene, contact } = this.studio;
    const width = innerWidth, height = innerHeight;
    renderer.getSize(this.size);
    if (this.size.x !== width || this.size.y !== height) renderer.setSize(width, height, false);
    renderer.setScissorTest(false); renderer.setViewport(0, 0, width, height);
    renderer.setRenderTarget(null); renderer.clear();
    if (!this.shown) return;
    if (this.host.isConnected) {
      const r = this.host.getBoundingClientRect();
      const dest = { x: r.left, y: r.top, w: Math.max(1,r.width), h: Math.max(1,r.height) };
      const t = this.reduced ? 1 : Math.min(1, Math.max(0, (time - this.transitionStart) / 700));
      const ease = t * t * (3 - 2 * t);
      for (const k of ['x','y','w','h'] as const) this.rect[k] = this.rectStart[k] + (dest[k] - this.rectStart[k]) * ease;
    }
    if (this.cameraTween) {
      const t = Math.min(1, (time - this.cameraTween.start) / (this.reduced ? 1 : 700));
      const e = t*t*(3-2*t);
      camera.position.lerpVectors(this.cameraTween.from, new Vector3(205,145,300), e);
      this.controls.target.lerpVectors(this.cameraTween.target, new Vector3(7,63,0), e);
      camera.lookAt(this.controls.target);
      if(t >= 1) { this.cameraTween = null; this.controls.enableDamping = true; }
    } else if (this.mode === 'intro') {
      const p = this.introProgress, t = Math.max(0, Math.min(1,(p-.66)/.32));
      camera.position.set(205 + (1-t)*260, 145 + (1-t)*55, 300 + (1-t)*220);
      this.controls.target.set(7,63,0); camera.lookAt(this.controls.target);
    } else if(!this.interactionPaused) this.controls.update();
    this.reveal.value = Math.min(1, Math.max(0,(time - this.revealStart) / 950));
    const r = this.rect;
    camera.aspect = r.w / r.h; camera.fov = 30 * Math.max(1, .85 / camera.aspect); camera.updateProjectionMatrix();
    contact.update(this.product.root);
    renderer.setRenderTarget(null); renderer.setScissorTest(false);
    const cupVisible = this.mode !== 'intro' || this.introProgress > .63;
    if (cupVisible && r.y < height && r.y+r.h > 0) {
      renderer.setViewport(r.x, height-r.y-r.h, r.w, r.h);
      renderer.setScissor(Math.max(0,r.x),Math.max(0,height-r.y-r.h),Math.min(width,r.w),Math.min(height,r.h));
      renderer.setScissorTest(true); renderer.render(scene,camera); renderer.setScissorTest(false);
    }
    if(this.ribbons.visible) {
      renderer.setViewport(0,0,width,height); renderer.clearDepth();
      this.ribbons.update(time,width,height); renderer.render(this.ribbons.scene,this.ribbons.camera);
    }
  }
  get unavailable() {
    return this.lost || this.disposed;
  }
  mount(host: HTMLElement) {
    this.host.removeEventListener('keydown', this.keyControl);
    this.controls.disconnect();
    this.host = host; this.controls.connect(host);
    host.addEventListener('keydown', this.keyControl);
    this.observer.disconnect(); this.observer.observe(host);
    this.rectStart = { ...this.rect };
    this.transitionStart = this.renderCount ? performance.now() : -10000;
    this.active = true; this.shown = true; this.invalidate();
  }
  setPresentation(mode: string, cardHost: HTMLElement | null = null) {
    this.mode = mode; this.shown = true;
    const interactive = mode === 'create' || mode === 'view3d';
    this.controls.enabled = interactive;
    this.host.style.touchAction = interactive ? 'none' : 'pan-y';
    this.host.tabIndex = interactive ? 0 : -1;
    this.host.setAttribute('aria-label', interactive ? '单指旋转 · 双指缩放' : '一号杯');
    this.ribbons.configure(mode === 'create' ? 'cards' : mode === 'intro' ? 'intro' : mode === 'prepare' ? 'finish' : 'off', cardHost);
    this.invalidate();
  }
  setIntroProgress(p: number) { this.introProgress = p; this.ribbons.setProgress(p); this.invalidate(); }
  focusPoster() {
    this.controls.enableDamping = false; this.controls.update();
    this.cameraTween = { start: performance.now(), from: this.studio.camera.position.clone(), target: this.controls.target.clone() };
    this.invalidate();
  }
  async settled() {
    const remaining = Math.max(0, 730 - (performance.now() - this.transitionStart), this.cameraTween ? 730 : 0);
    if(remaining) await new Promise(resolve => setTimeout(resolve, this.reduced ? 20 : remaining));
    if(!this.disposed && !this.lost) this.drawScene(performance.now());
  }
  pauseInteraction(paused: boolean) {
    this.interactionPaused = paused;
    const position=this.studio.camera.position.clone(),target=this.controls.target.clone();
    this.controls.enableDamping=false;this.controls.update();
    this.studio.camera.position.copy(position);this.controls.target.copy(target);this.controls.update();
    this.controls.enableDamping=true;
    this.controls.enabled=!paused && (this.mode==='create'||this.mode==='view3d');
  }
  show(visible: boolean) {
    this.shown=visible;
    if(!visible&&!this.lost&&!this.disposed){
      const r=this.studio.renderer;r.setRenderTarget(null);r.setScissorTest(false);r.clear();
      this.ribbons.cards.hide();this.container.classList.remove('covering-options');
    }
    this.invalidate();
  }
  resume() { this.active = true; this.invalidate(); }
  pause() {
    this.active = false;
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.lastFrame = 0;
  }
  neutral() {
    this.styleEpoch++;
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
  async fixed(animate = false) {
    const epoch = ++this.styleEpoch;
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
    if(epoch !== this.styleEpoch || this.disposed) throw new Error('材质载入已取消');
    this.revealStart = animate && this.phase !== 'fixed' ? performance.now() : -10000;
    this.reveal.value = animate && this.phase !== 'fixed' ? 0 : 1;
    for (const [mesh, material] of this.originals) mesh.material = material;
    this.phase = "fixed";
    this.invalidate();
    if(animate) await new Promise(resolve => setTimeout(resolve, this.reduced ? 20 : 1000));
  }
  reset() {
    const target = new Vector3(7, 63, 0);
    this.controls.target.copy(target);
    const direction = new Vector3(185, 137, 275).sub(target);

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
    if (this.lost || this.disposed) throw new Error('三维画面不可用');
    const { renderer, scene, camera, contact } = this.studio;
    // Linear HDR scene -> Three's own ACES/sRGB OutputPass -> RGBA readback.
    // The visible canvas and live camera are never resized or repurposed.
    const exportCamera = camera.clone();
    exportCamera.position.set(205,145,300); exportCamera.aspect = width/height; exportCamera.fov=30;
    exportCamera.lookAt(7,63,0); exportCamera.updateProjectionMatrix();
    const linear = new WebGLRenderTarget(width,height,{type:HalfFloatType, samples: 2});
    const output = new WebGLRenderTarget(width,height);
    const pass = new OutputPass();
    const viewport = renderer.getViewport(new Vector4());
    const scissor = renderer.getScissor(new Vector4());
    const scissorTest = renderer.getScissorTest();
    const oldTarget = renderer.getRenderTarget();
    const pixels = new Uint8Array(width*height*4);
    try {
      renderer.setScissorTest(false); contact.update(this.product.root);
      renderer.setRenderTarget(linear); renderer.clear(); renderer.render(scene,exportCamera);
      pass.render(renderer,output,linear,0,false);
      renderer.readRenderTargetPixels(output,0,0,width,height,pixels);
    } finally {
      renderer.setRenderTarget(oldTarget); renderer.setViewport(viewport);
      renderer.setScissor(scissor); renderer.setScissorTest(scissorTest);
      linear.dispose(); output.dispose(); pass.dispose();
    }
    const canvas = document.createElement('canvas'); canvas.width=width; canvas.height=height;
    const ctx = canvas.getContext('2d'); if(!ctx) throw new Error('无法生成器物图片');
    const data = ctx.createImageData(width,height);
    for(let y=0;y<height;y++) data.data.set(pixels.subarray((height-y-1)*width*4,(height-y)*width*4),y*width*4);
    ctx.putImageData(data,0,0);
    return new Promise((resolve,reject) => canvas.toBlob(b=>b?resolve(b):reject(new Error('无法生成器物图片')),'image/png'));
  }

  debug() {
    return {
      instanceId: this.instanceId,
      viewport: {...this.rect},
      ribbon: this.ribbons.debug(),
      canvasSize: [this.canvas.width,this.canvas.height],
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
      shown: this.shown,
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
    this.ribbons.dispose();
    this.studio.dispose();
    this.host.removeEventListener('keydown', this.keyControl);
    window.removeEventListener('scroll',this.invalidate);
    window.removeEventListener('resize',this.invalidate);
    this.container.remove();
  }
}
