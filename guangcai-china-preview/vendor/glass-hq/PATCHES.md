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

## V6.0.3 mobile composition adapter

`GlassSceneOptions.layers` accepts an alternate final compositor using the same measured `LayerLens` frames, original field/overlay maps, capsule slices and morph placements. `clipBounds` is forwarded with the existing layer contract. The independent WebGL2 implementation lives in app `src/ui/glass-raster.ts`, ports the calibrated material tone/tint/coverage operations, and accumulates nested glass in paint order. Source WebGL canvas filtering and SVG image warming are bypassed for this explicit adapter; default SVG/Gecko paths remain. Mobile Gaussian sampling uses two-CSS-pixel spacing and output DPR is bounded to 1.5; final framebuffer output is not claimed byte-identical to browser SVG Gaussian rasterization. The audit-only raster contract validates actual displacement, nested sampling, live updates and clipping pixels. Physical iOS 27 validation is still required.

## V7.1 bounded lifecycle

- Added downstream resource-budget hooks to the WebGL2 map renderer and decoded-map cache; scratch atlas/PBO storage is released after readback. Persistent map lookup stays lazy rather than decoding the entire stored library on startup. Active CPU maps are capped at 8 MiB; stale decode results after teardown do not re-enter the cache.
- Isolated optical compositor is now in application src/ui/glass-raster.ts. It captures a non-preserved Three canvas immediately after actual model rendering, reuses that texture for UI-only animation, and coalesces optical draws. The known GPU estimate includes the default color drawing buffer and all explicit allocations; browser-private swap/compositor storage remains unknown.
- Reuses the transparent output canvas instead of a second accumulated color attachment/final copy; the background uploaded for refraction is sized to the optical display. Re-creatable intermediate targets are released around local reflection captures to limit overlap. Optical formulas, map geometry and protected input/haptic code are unchanged.
- Frame policy accepts a 0.5 ms measurement tolerance around 30fps to avoid degrading on clock quantization. Safari missing deviceMemory does not choose the fallback.
