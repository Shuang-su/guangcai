import type { MaterialBackend } from "../webgl2/index.js";
import { materialBackend } from './backend.js';
/** The GPU renderer, and vgpu with it, load on first use rather than with the
 * page, so an app's initial bundle carries neither. */
export function getMaterialRenderer(): Promise<MaterialBackend> {
  return materialBackend==='webgpu'
    ? import("../gpu/index.js").then((gpu) => gpu.getMaterialRenderer())
    : import("../webgl2/index.js").then((gpu) => gpu.getMaterialRenderer());
}
