import type { CupStyle, DecorationRegion } from "./styles/catalog";
import type { ViewMode } from "./interactions/views";
export interface CupViewerAPI {
  setStyle(style: CupStyle | string): Promise<void>;
  replaceArtwork(region: DecorationRegion, image: File | Blob): Promise<void>;
  setView(mode: ViewMode): void;
  setLidOpen(open: boolean): void;
  resetView(): void;
  dispose(): void;
  camera(
    position: [number, number, number],
    target?: [number, number, number],
  ): void;
  debug(mode: "beauty" | "normal" | "uv" | "neutral"): void;
  pick(x: number, y: number): string;
  inspect(): Record<string, unknown>;
}
declare global {
  interface Window {
    cupViewer: CupViewerAPI;
  }
}
