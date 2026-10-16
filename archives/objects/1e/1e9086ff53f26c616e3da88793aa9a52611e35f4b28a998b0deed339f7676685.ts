import "./style.css";
import type { CupViewerAPI } from "./api";
import { mountInterface } from "./interactions/interface";
import {
  Vector3,
  Box3,
  Color,
  MeshNormalMaterial,
  CanvasTexture,
  MeshBasicMaterial,
  SRGBColorSpace,
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { buildProduct } from "./geometry/product";
import { defaults } from "./geometry/parameters";
import { createStudio } from "./studio/studio";
import { MaterialLibrary } from "./materials/materials";
import {
  catalog,
  CupStyle,
  DecorationRegion,
  TextureTier,
} from "./styles/catalog";
import { ViewController, ViewMode } from "./interactions/views";
import { bindGestures } from "./interactions/gestures";
const app = document.querySelector<HTMLDivElement>("#app")!;
const { canvas, dialog, status, error, fail } = mountInterface(app);
try {
  boot();
} catch (e) {
  fail(e);
}
function boot() {
  const query = new URLSearchParams(location.search),
    mobile = matchMedia("(pointer: coarse)").matches || innerWidth < 700;
  let tier: TextureTier = mobile ? "low" : "high";
  const studio = createStudio(canvas, mobile),
    { renderer, scene, camera } = studio;
  let product = buildProduct({
    ...defaults,
    quality: mobile ? "medium" : "high",
  });
  scene.add(product.root);
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0.68, 0);
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.09;
  controls.minDistance = 1.7;
  controls.maxDistance = 7;
  controls.maxPolarAngle = Math.PI * 0.48;
  controls.update();
  let frame = 0,
    disposed = false,
    pendingFrames = 0,
    styleId = "gold",
    requestedStyle = "gold",
    ready = false,
    sample: number[] = [],
    frameCount = 0,
    qualityLow = false,
    textureError = "";
  let last = 0;
  const intervals: number[] = [];
  function invalidate() {
    if (!disposed && !frame) frame = requestAnimationFrame(render);
  }
  let views = new ViewController(product, () => {renderer.shadowMap.needsUpdate=true;invalidate();});
  const library = new MaterialLibrary(renderer, (m) => {
    product.applyMaterials(m);
    invalidate();
  });
  async function setStyle(style: CupStyle | string) {
    const s =
      typeof style === "string"
        ? catalog(tier).find((x) => x.id === style)
        : style;
    if (!s) throw Error("Unknown style");
    requestedStyle = s.id;
    try {
      const applied = await library.setStyle(s);
      if (applied) {
        styleId = s.id;
        status.textContent = `${s.label}，${views.mode}`;
        canvas.dataset.style = styleId;
        textureError = "";
        error.hidden = true;
        invalidate();
      }
    } catch (e) {
      requestedStyle = styleId;
      textureError = String(e);
      status.textContent = "花纸加载失败，已保留当前款式";
      throw e;
    }
  }
  const fitScale = () => Math.max(1, 0.66 / (innerWidth / innerHeight));
  const reset = () => {
    views.lidOpen = false;
    views.setView("assembly");
    controls.target.set(0, 0.68, 0);
    camera.position
      .set(2.25, 1.82, 3.65)
      .sub(controls.target)
      .multiplyScalar(fitScale())
      .add(controls.target);
    controls.update();
    invalidate();
  };
  const gestures = bindGestures(canvas, camera, () => product.root, {
    lid: () => {
      if (views.mode === "assembly") views.setLidOpen(!views.lidOpen);
    },
    style: () =>
      void setStyle(requestedStyle === "gold" ? "white" : "gold").catch(fail),
    cycle: () => views.cycle(),
    reset,
    help: () => {
      dialog.open ? dialog.close() : dialog.showModal();
    },
  });
  controls.addEventListener("change", () => {
    pendingFrames = 35;
    invalidate();
  });
  function keyboard(e: KeyboardEvent) {
    if (
      dialog.open ||
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLSelectElement ||
      e.target instanceof HTMLTextAreaElement
    )
      return;
    if (e.key.toLowerCase() === "p") {
      renderer.render(scene, camera);
      canvas.toBlob((blob) => {
        if (!blob) return;
        if (import.meta.env.DEV) {
          const name = `${styleId}-${views.mode}-${query.get("camera") || "hero"}-${innerWidth}x${innerHeight}`;
          void fetch(`/__qa/capture?name=${name}`, {
            method: "POST",
            body: blob,
          })
            .then((r) => r.json())
            .then((data) => {
              canvas.dataset.capture = data.saved;
            });
          return;
        }
        const a = document.createElement("a");
        const url = URL.createObjectURL(blob);
        a.href = url;
        a.download = `guangcai-${styleId}-${views.mode}-${Date.now()}.png`;
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 3000);
      });
      return;
    }
    const offset = camera.position.clone().sub(controls.target);
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      offset.applyAxisAngle(
        new Vector3(0, 1, 0),
        e.key === "ArrowLeft" ? 0.12 : -0.12,
      );
      camera.position.copy(controls.target).add(offset);
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      camera.position.y += e.key === "ArrowUp" ? 0.12 : -0.12;
    } else if (e.key === "+" || e.key === "=" || e.key === "-") {
      offset.multiplyScalar(e.key === "-" ? 1.1 : 0.9);
      if (
        offset.length() >= controls.minDistance &&
        offset.length() <= controls.maxDistance
      )
        camera.position.copy(controls.target).add(offset);
    } else return;
    e.preventDefault();
    controls.update();
    invalidate();
  }
  window.addEventListener("keydown", keyboard);
  let lastFit = 1;
  const resize = () => {
    studio.resize(innerWidth, innerHeight);
    const fit = fitScale();
    camera.position
      .sub(controls.target)
      .multiplyScalar(fit / lastFit)
      .add(controls.target);
    lastFit = fit;
    controls.update();
    invalidate();
  };
  window.addEventListener("resize", resize);
  resize();
  if (mobile) reset();
  function render(now: number) {
    frame = 0;
    if (disposed) return;
    const t = performance.now();
    const changing = views.active;
    const animation = views.update(now);
    if (changing) renderer.shadowMap.needsUpdate = true;
    controls.update();
    renderer.render(scene, camera);
    const cpu = performance.now() - t;
    if (ready) {
      sample.push(cpu);
      if (sample.length > 180) sample.shift();
    }
    if (ready && frameCount > 10 && last && now - last < 250) {
      intervals.push(now - last);
      if (intervals.length > 180) intervals.shift();
    }
    frameCount++;
    if (
      ready &&
      intervals.length >= 100 &&
      !qualityLow &&
      intervals.reduce((a, b) => a + b, 0) / intervals.length > 27
    ) {
      qualityLow = true;
      studio.setQuality(true);
      resize();
      if (tier !== "low") {
        tier = "low";
        void setStyle(styleId).catch(fail);
      }
    }
    canvas.dataset.metrics = JSON.stringify({
      style: styleId,
      view: views.mode,
      lid: views.lidOpen,
      tier,
      geometries: renderer.info.memory.geometries,
      textures: renderer.info.memory.textures,
      triangles: renderer.info.render.triangles,
      calls: renderer.info.render.calls,
      frameCount,
      camera: camera.position.toArray(),
      geometryIds: product.artMeshes.map((m) => m.geometry.uuid),
      cpuFrameMs: sample.length
        ? sample.reduce((a, b) => a + b, 0) / sample.length
        : 0,
    });
    canvas.dataset.view = views.mode;
    canvas.dataset.lid = views.lidOpen ? "open" : "closed";
    last = now;
    if (animation || pendingFrames-- > 0) invalidate();
  }
  canvas.addEventListener("webglcontextlost", (e) => {
    e.preventDefault();
    error.hidden = false;
    error.textContent = "图形上下文已暂停。恢复后将自动重新加载。";
  });
  canvas.addEventListener("webglcontextrestored", () => location.reload());
  const originalBackground = scene.background,
    originalFog = scene.fog;
  let debugMaterial: MeshNormalMaterial | MeshBasicMaterial | null = null;
  const api = {
    pick: gestures.hit,
    setStyle,
    setView(mode: ViewMode) {
      if (!["assembly", "single", "bottom"].includes(mode))
        throw Error("Unknown view");
      views.setView(mode);
    },
    setLidOpen(open: boolean) {
      views.setLidOpen(open);
    },
    replaceArtwork: async (region: DecorationRegion, image: File | Blob) => {
      await library.replaceArtwork(region, image);
      invalidate();
    },
    resetView: reset,
    inspect() {
      return {
        ready,
        style: styleId,
        view: views.mode,
        lidOpen: views.lidOpen,
        tier,
        qualityLow,
        geometryIds: product.artMeshes.map((m) => m.geometry.uuid),
        geometries: renderer.info.memory.geometries,
        textures: renderer.info.memory.textures,
        triangles: renderer.info.render.triangles,
        calls: renderer.info.render.calls,
        frameCount,
        cpuFrameMs: sample.length
          ? sample.reduce((a, b) => a + b, 0) / sample.length
          : 0,
        textureError,
        regions: Object.fromEntries(
          Object.entries(library.active).map(([key, m]) => [
            key,
            {
              normal: !!m.normalMap,
              metalness: !!m.metalnessMap,
              clearcoatNormal: !!m.clearcoatNormalMap,
              metallic: m.metalness,
            },
          ]),
        ),
        frameMs: intervals.length
          ? intervals.reduce((a, b) => a + b, 0) / intervals.length
          : 0,
        pixelRatio: renderer.getPixelRatio(),
        reflectionSize: studio.floor.getRenderTarget().width,
        cupBounds: new Box3().setFromObject(product.cup).min.toArray(),
      };
    },
    camera(
      position: [number, number, number],
      target: [number, number, number] = [0, 0.65, 0],
    ) {
      camera.position.set(...position);
      controls.target.set(...target);
      controls.update();
      pendingFrames = 2;
      invalidate();
    },
    debug(mode: "beauty" | "normal" | "uv" | "neutral") {
      if (!import.meta.env.DEV) throw Error("Inspection is available only in development mode");
      if (debugMaterial) {
        if (debugMaterial instanceof MeshBasicMaterial)
          debugMaterial.map?.dispose();
        debugMaterial.dispose();
        debugMaterial = null;
      }
      scene.overrideMaterial = null;
      scene.background = originalBackground;
      scene.fog = originalFog;
      studio.floor.visible = true;
      studio.shadow.visible = true;
      if (mode === "normal") {
        debugMaterial = new MeshNormalMaterial();
        scene.overrideMaterial = debugMaterial;
      }
      if (mode === "neutral") {
        scene.background = new Color("#777777");
        studio.floor.visible = false;
        studio.shadow.visible = false;
        scene.fog = null;
      }
      if (mode === "uv") {
        const c = document.createElement("canvas");
        c.width = c.height = 512;
        const ctx = c.getContext("2d")!;
        for (let y = 0; y < 8; y++)
          for (let x = 0; x < 8; x++) {
            ctx.fillStyle = (x + y) % 2 ? "#303b47" : "#d7d9c8";
            ctx.fillRect(x * 64, y * 64, 64, 64);
            ctx.fillStyle = (x + y) % 2 ? "white" : "black";
            ctx.font = "18px monospace";
            ctx.fillText(`${x},${y}`, x * 64 + 8, y * 64 + 34);
          }
        const map = new CanvasTexture(c);
        map.colorSpace = SRGBColorSpace;
        debugMaterial = new MeshBasicMaterial({ map });
        for (const m of product.artMeshes) m.material = debugMaterial;
      } else product.applyMaterials(library.active);
      invalidate();
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      controls.dispose();
      gestures.dispose();
      if (debugMaterial instanceof MeshBasicMaterial)
        debugMaterial.map?.dispose();
      debugMaterial?.dispose();
      library.dispose();
      product.dispose();
      studio.dispose();
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", keyboard);
    },
  };
  window.cupViewer = api satisfies CupViewerAPI;
  if (import.meta.env.DEV && query.has("debug")) {
    const panel = document.createElement("section");
    panel.className = "debug";
    panel.innerHTML = `<strong>器型校准 · 推定 mm</strong><select aria-label="检查材质"><option value="beauty">正式材质</option><option value="uv">UV 棋盘</option><option value="normal">法线</option><option value="neutral">中性环境</option></select><button>重建器型</button>`;
    const keys = [
      "height",
      "flatCutDepth",
      "wallThickness",
      "fluteDepth",
      "handleReach",
    ] as const;
    for (const k of keys) {
      const l = document.createElement("label");
      l.textContent = k;
      const input = document.createElement("input");
      input.type = "number";
      input.step = ".1";
      input.value = String(product.params[k]);
      input.name = k;
      l.append(input);
      panel.append(l);
    }
    panel.querySelector("select")!.onchange = (e) =>
      api.debug((e.target as HTMLSelectElement).value as any);
    panel.querySelector("button")!.onclick = () => {
      const p = { ...product.params };
      for (const k of keys)
        p[k] = Number(
          panel.querySelector<HTMLInputElement>(`[name="${k}"]`)!.value,
        );
      try {
        const next = buildProduct(p);
        scene.remove(product.root);
        product.dispose();
        product = next;
        scene.add(product.root);
        product.applyMaterials(library.active);
        views = new ViewController(product, () => {renderer.shadowMap.needsUpdate=true;invalidate();});
        invalidate();
      } catch (e) {
        fail(e);
      }
    };
    app.append(panel);
  }
  invalidate();
  void setStyle(query.get("style") === "white" ? "white" : "gold")
    .then(() => {
      ready = true;
      canvas.dataset.ready = "true";
      if (query.get("view")) api.setView(query.get("view") as ViewMode);
      if (query.has("open")) api.setLidOpen(true);
      const presets: Record<string, [number, number, number]> = {
        front: [0, 1.05, 4.3],
        side: [4.3, 1.35, 0.02],
        top: [1.65, 4.8, 2.35],
        detail: [1.75, 1.4, 1.9],
      };
      const preset = presets[query.get("camera") || ""];
      if (preset) api.camera(preset);
      invalidate();
    })
    .catch(fail);
}
