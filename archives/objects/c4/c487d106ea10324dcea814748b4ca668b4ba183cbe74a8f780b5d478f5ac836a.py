from pathlib import Path
p=Path('src/viewer/cup-viewer.ts');s=p.read_text()
s=s.replace('  Vector2,','  Vector2, Vector4, WebGLRenderTarget, HalfFloatType, MeshPhysicalMaterial,')
s=s.replace('import { OrbitControls }', 'import { RibbonStage } from "./ribbon-stage";\nimport { OutputPass } from "three/addons/postprocessing/OutputPass.js";\nimport { OrbitControls }')
s=s.replace('  private onContextLoss: () => void;', '''  private onContextLoss: () => void;
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
  private cameraTween: { start: number; from: Vector3; target: Vector3 } | null = null;
  private size = new Vector2();
  private reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  private waiters: Array<() => void> = [];
''')
s=s.replace('    this.canvas.setAttribute(', '''    this.host = host;
    this.container = document.createElement('div');
    this.container.id = 'experience-stage';
    this.container.setAttribute('aria-hidden', 'true');
    this.container.append(this.canvas);
    document.body.prepend(this.container);
    this.canvas.setAttribute(''')
s=s.replace('    this.canvas.tabIndex = 0;\n    host.append(this.canvas);','    this.canvas.tabIndex = -1;')
s=s.replace('new OrbitControls(this.studio.camera, this.canvas)','new OrbitControls(this.studio.camera, host)')
s=s.replace('    this.studio.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));','''    this.studio.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    this.studio.renderer.autoClear = false;
    this.ribbons = new RibbonStage(this.studio.scene.environment);
    for (const material of [...Object.values(this.materials.regions), this.materials.gold]) {
      material.onBeforeCompile = shader => {
        shader.uniforms.reveal = this.reveal;
        shader.fragmentShader = 'uniform float reveal;\\n' + shader.fragmentShader
          .replace('#include <map_fragment>', '#include <map_fragment>\\ndiffuseColor.rgb = mix(vec3(0.905), diffuseColor.rgb, reveal);')
          .replace('#include <metalnessmap_fragment>', '#include <metalnessmap_fragment>\\nmetalnessFactor *= reveal;')
          .replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\\nroughnessFactor = mix(0.16, roughnessFactor, reveal);');
      };
      material.customProgramCacheKey = () => 'continuous-reveal-v2';
    }''')
s=s.replace('    this.canvas.addEventListener("keydown", this.keyControl);','    host.addEventListener("keydown", this.keyControl);')
a=s.index('    this.observer = new ResizeObserver');b=s.index('    new TextureLoader()',a)
s=s[:a]+'''    this.observer = new ResizeObserver(() => this.invalidate());
    this.observer.observe(host);
    window.addEventListener('resize', this.invalidate);
    window.addEventListener('scroll', this.invalidate, { passive: true });
'''+s[b:]
a=s.index('  private draw = (time: number) => {');b=s.index('  get unavailable()',a)
s=s[:a]+'''  private draw = (time: number) => {
    this.raf = 0;
    if (!this.active || this.disposed || this.lost) return;
    if (time - this.lastFrame < 30) { this.invalidate(); return; }
    if (this.lastFrame) this.frameTimes.push(time - this.lastFrame);
    if (this.frameTimes.length > 90) this.frameTimes.shift();
    this.lastFrame = time; this.renderCount++;
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
    } else this.controls.update();
    this.reveal.value = Math.min(1, Math.max(0,(time - this.revealStart) / 950));
    const r = this.rect;
    camera.aspect = r.w / r.h; camera.updateProjectionMatrix();
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
'''+s[b:]
a=s.index('  mount(host: HTMLElement)');b=s.index('  pause() {',a)
s=s[:a]+'''  mount(host: HTMLElement) {
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
  show(visible: boolean) { this.shown = visible; this.invalidate(); }
  resume() { this.active = true; this.invalidate(); }
'''+s[b:]
s=s.replace('  neutral() {\n    this.phase', '  neutral() {\n    this.styleEpoch++;\n    this.phase')
s=s.replace('  async fixed() {\n    if (!this.loaded)', '  async fixed(animate = false) {\n    const epoch = ++this.styleEpoch;\n    if (!this.loaded)')
s=s.replace('    for (const [mesh, material] of this.originals) mesh.material = material;','''    if(epoch !== this.styleEpoch || this.disposed) throw new Error('材质载入已取消');
    this.revealStart = animate && this.phase !== 'fixed' ? performance.now() : -10000;
    this.reveal.value = animate && this.phase !== 'fixed' ? 0 : 1;
    for (const [mesh, material] of this.originals) mesh.material = material;''')
s=s.replace('    this.phase = "fixed";\n    this.invalidate();','''    this.phase = "fixed";
    this.invalidate();
    if(animate) await new Promise(resolve => setTimeout(resolve, this.reduced ? 20 : 1000));''')
a=s.index('  async capture(');b=s.index('\n  debug()',a)
s=s[:a]+'''  async capture(width = 900, height = 900): Promise<Blob> {
    if (this.lost || this.disposed) throw new Error('三维画面不可用');
    const { renderer, scene, camera, contact } = this.studio;
    // Linear HDR scene -> Three's own ACES/sRGB OutputPass -> RGBA readback.
    // The visible canvas and live camera are never resized or repurposed.
    const exportCamera = camera.clone();
    exportCamera.position.set(205,145,300); exportCamera.aspect = width/height;
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
'''+s[b:]
s=s.replace('      renderCount: this.renderCount,','      instanceId: this.instanceId,\n      viewport: {...this.rect},\n      ribbon: this.ribbons.debug(),\n      canvasSize: [this.canvas.width,this.canvas.height],\n      renderCount: this.renderCount,')
s=s.replace('    this.studio.dispose();\n    this.canvas.remove();','''    this.ribbons.dispose();
    this.studio.dispose();
    this.host.removeEventListener('keydown', this.keyControl);
    window.removeEventListener('scroll',this.invalidate);
    window.removeEventListener('resize',this.invalidate);
    this.container.remove();''')
p.write_text(s)
