import { Vector3, Quaternion, Euler } from "three";
import { buildProduct } from "../geometry/product";
export type ViewMode = "assembly" | "single" | "bottom";
type Product = ReturnType<typeof buildProduct>;
export class ViewController {
  mode: ViewMode = "assembly";
  lidOpen = false;
  active = false;
  start = 0;
  private fromCup = new Vector3();
  private toCup = new Vector3();
  private fromQ = new Quaternion();
  private toQ = new Quaternion();
  private fromLid = new Vector3();
  private toLid = new Vector3();
  constructor(
    private product: Product,
    private invalidate: () => void,
    private reduced = matchMedia("(prefers-reduced-motion: reduce)").matches,
  ) {}
  transition() {
    const p = this.product;
    this.fromCup.copy(p.cup.position);
    this.fromQ.copy(p.cup.quaternion);
    this.fromLid.copy(p.lid.position);
    this.toCup.set(
      0,
      this.mode === "assembly" ? 3.2 : this.mode === "single" ? 23 : 130,
      0,
    );
    this.toQ.setFromEuler(
      new Euler(
        this.mode === "bottom" ? -Math.PI * 0.78 : 0,
        0,
        this.mode === "bottom" ? -0.16 : 0,
      ),
    );
    this.toLid.set(
      this.lidOpen ? -12 : 0,
      p.params.height + 3.2 + (this.lidOpen ? 37 : 0),
      this.lidOpen ? -32 : 0,
    );
    p.lid.visible = this.mode === "assembly";
    p.saucer.visible = this.mode === "assembly";
    this.start = performance.now();
    this.active = true;
    this.invalidate();
    if (this.reduced) this.update(this.start + 700);
  }
  setView(mode: ViewMode) {
    this.mode = mode;
    this.transition();
  }
  setLidOpen(open: boolean) {
    this.lidOpen = open;
    this.transition();
  }
  cycle() {
    this.setView(
      this.mode === "assembly"
        ? "single"
        : this.mode === "single"
          ? "bottom"
          : "assembly",
    );
  }
  update(now: number) {
    if (!this.active) return false;
    const t = Math.min(1, (now - this.start) / 680),
      e = t * t * (3 - 2 * t),
      p = this.product;
    p.cup.position.lerpVectors(this.fromCup, this.toCup, e);
    p.cup.quaternion.slerpQuaternions(this.fromQ, this.toQ, e);
    const delayed = Math.max(0, Math.min(1, (t - 0.35) / 0.65)),
      early = Math.min(1, t / 0.65);
    const d = delayed * delayed * (3 - 2 * delayed),
      f = early * early * (3 - 2 * early);
    p.lid.position.lerpVectors(this.fromLid, this.toLid, this.lidOpen ? d : f);
    p.lid.position.y =
      this.fromLid.y + (this.toLid.y - this.fromLid.y) * (this.lidOpen ? f : d);
    this.active = t < 1;
    return this.active;
  }
}
