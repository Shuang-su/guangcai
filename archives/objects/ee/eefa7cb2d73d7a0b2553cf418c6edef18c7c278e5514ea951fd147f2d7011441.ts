import { Raycaster, Vector2, PerspectiveCamera, Group } from "three";
export type Hit = "body" | "handle" | "lid" | "saucer" | "blank";
export interface GestureActions {
  lid: () => void;
  style: () => void;
  cycle: () => void;
  reset: () => void;
  help: () => void;
}
export function bindGestures(
  canvas: HTMLCanvasElement,
  camera: PerspectiveCamera,
  root: () => Group,
  actions: GestureActions,
) {
  const ray = new Raycaster(),
    pointer = new Vector2(),
    active = new Map<
      number,
      { x: number; y: number; time: number; hit: Hit }
    >();
  let multi = false,
    longTimer = 0,
    longFired = false,
    lastTap = { time: 0, hit: "blank" as Hit, x: 0, y: 0 };
  function hit(x: number, y: number): Hit {
    const r = canvas.getBoundingClientRect();
    pointer.set(
      ((x - r.left) / r.width) * 2 - 1,
      (-(y - r.top) / r.height) * 2 + 1,
    );
    ray.setFromCamera(pointer, camera);
    root().updateWorldMatrix(true, true);
    const hits = ray.intersectObject(root(), true).filter((h) => {
      let o: any = h.object;
      while (o) {
        if (!o.visible) return false;
        o = o.parent;
      }
      return true;
    });
    return hits[0]?.object.userData.part || "blank";
  }
  function down(e: PointerEvent) {
    longFired = false;
    const h = hit(e.clientX, e.clientY);
    active.set(e.pointerId, {
      x: e.clientX,
      y: e.clientY,
      time: performance.now(),
      hit: h,
    });
    if (active.size > 1) {
      multi = true;
      clearTimeout(longTimer);
    } else if (h === "blank") {
      longTimer = window.setTimeout(() => {
        longFired = true;
        actions.help();
      }, 650);
    }
  }
  function move(e: PointerEvent) {
    const a = active.get(e.pointerId);
    if (a && Math.hypot(e.clientX - a.x, e.clientY - a.y) > 7)
      clearTimeout(longTimer);
  }
  function up(e: PointerEvent) {
    clearTimeout(longTimer);
    const a = active.get(e.pointerId);
    active.delete(e.pointerId);
    const wasMulti = multi;
    if (!active.size) multi = false;
    if (
      !a ||
      wasMulti ||
      longFired ||
      Math.hypot(e.clientX - a.x, e.clientY - a.y) > 7 ||
      performance.now() - a.time > 550
    )
      return;
    const h = hit(e.clientX, e.clientY);
    if (h !== a.hit) return;
    const now = performance.now(),
      double =
        lastTap.hit === h &&
        now - lastTap.time < 330 &&
        Math.hypot(e.clientX - lastTap.x, e.clientY - lastTap.y) < 22;
    if (double && (h === "body" || h === "blank")) {
      h === "body" ? actions.cycle() : actions.reset();
      lastTap.time = 0;
      return;
    }
    lastTap = { time: now, hit: h, x: e.clientX, y: e.clientY };
    if (h === "lid") actions.lid();
    if (h === "handle") actions.style();
  }
  const cancel = () => {
    clearTimeout(longTimer);
    active.clear();
    multi = false;
  };
  function key(e: KeyboardEvent) {
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLSelectElement ||
      e.target instanceof HTMLTextAreaElement
    )
      return;
    const k = e.key.toLowerCase();
    if (document.querySelector("dialog[open]") && !["h", "?"].includes(k))
      return;
    if (k === "h" || k === "?") actions.help();
    if (k === "l") actions.lid();
    if (k === "s") actions.style();
    if (k === "v") actions.cycle();
    if (k === "r") actions.reset();
  }
  canvas.addEventListener("pointerdown", down);
  canvas.addEventListener("pointermove", move);
  canvas.addEventListener("pointerup", up);
  canvas.addEventListener("pointercancel", cancel);
  window.addEventListener("keydown", key);
  return {
    hit,
    dispose() {
      cancel();
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", cancel);
      window.removeEventListener("keydown", key);
    },
  };
}
