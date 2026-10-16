# Local WebGL2 port

Pinned upstream: 9f5bfc7daa7be5d20a41b94d841b8f065de655fc. All imported package source, tests and MIT license are retained.

- Added src/webgl2/index.ts and maps.frag: same tessellation, atlas bands, two unpremultiplied RGBA8 planes, geometry limits and material equations. RGBA32F segment texture, PBO/fence readback; no cup screenshot capture.
- dom/renderer.ts selects the WebGL2 backend by default; original gpu/index.ts and maps.wgsl remain unchanged. Only /audit/ documents may select WebGPU.
- dom/maps.ts cache version includes backend and shader source.
- dom/index.ts starts the existing warmer without requiring navigator.gpu.
- Upstream DOM controllers, material graph, geometry, PNG encoder and spring implementation are unchanged.

Initial validation: 141 upstream core/DOM tests pass. 28 WebGPU/WebGL2 map comparisons (light/dark, radii, DPR, custom outline, fractional and panel geometry) were byte-identical in the local Chrome run. Safari and physical-device results are a separate acceptance layer.

Consumer motion adapter: `GlassSceneOptions.synchronizedMotion` is an opt-in that bypasses the original 15ms filter-composition throttle, allowing an external DOM animator registered through the original `addAnimator` API to update its shape and optical rim in the same frame, including high-refresh displays. Original default behavior, material formulas, spring and morph algorithms remain unchanged. The consumer view menu uses upstream `morphFrom`, `detach`, `neck`, and `glass:exited`; it does not approximate the joined drop with CSS scale.

Carousel optical viewport: optional `SurfaceOptions.clipTo` crops the placed field and overlay planes with an SVG alpha mask. The complete original rounded-card material map is cached once; moving across the viewport no longer bakes a new truncated contour or introduces a false bright vertical edge. The consumer prewarms one extra neighboring card on each side (seven optical surfaces, five visible). Material algorithms and map pixels remain unchanged. This adapter targets the current WebKit/Chromium single-scene composition path; Gecko's separate layers are not a verified target in this release.
