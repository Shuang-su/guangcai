# Completion

Main was updated first as requested: PR #13 merged on 2026-10-14 into main at 408d68cf763762f64e6fa893988eb47426e01485. This includes V4 PR #15 and the published rotation reversal.

Root cause: narrowing the fixed floral sector to 57 degrees retained a 3-degree plain strip (27–30 degrees) inside the reserved 60-degree sector. The strip used the separate bright porcelain environment while the adjacent city wall used a local reflection probe. Loading and loaded frames therefore showed different brightness across an otherwise continuous cylinder.

Fix: assign the remaining strip its own cup-wall glaze material, with the same encoded roughness, porcelain-only calibration and shared reflection probe as neighboring blank city pixels. Use that glaze as the floral sector's temporary material until its fixed pack has applied. Keep city UV1 and all city triangles, source dimensions, floral boundary, imagery, normals, exposure and gold parameters unchanged. Dispose the additional material with the viewer.

Validation:
- Existing 20 unit/geometry/float-normal/selection tests passed. Geometry hash tests preserve cup positions, normals and city UV1/indices.
- TypeScript and Vite build passed; unchanged texture export was skipped.
- tools/v4-body-seam-qa.mjs ran against production preview: delayed loading; original gold; China green and Shenzhen teal; metal/paint changes; shared fixed maps/geometry/exposure; reflection enable/disable; mobile viewport; zero page/shader exceptions.
- Same-camera clay render is byte-identical before/after. Boundary brightness jump in the loading frame dropped from 34.21 to below 0.4 levels on a 0–255 scale; the loaded boundary also passes the <0.4 regression threshold. Precise sample results are stored in output/playwright/v4-body-seam/after/qa.json. This is a browser-rendered comparison, not physical-device acceptance.
- Added a public same-camera comparison section at evidence.html#body-seam.

Source checkpoint: 6b35efb104019472cea3679ea26cfee1e13ffc8b.

Manually published V4 deployment 6aced018c70635a1ad24cbbe. All 408 public files match Netlify SHA-1 and local archived SHA-256. Archived by same-volume staging rename. Public browser checks passed with zero page/shader errors; loading boundary jump is 0.091111/255 and loaded original/China/Shenzhen samples have no brightness jump at the old seam boundary. All texture assets remain byte-identical to the preceding deployment; only runtime JS, entry HTML and comparison evidence changed.

V3 remains at 6ace443df7425f433e717eb0. Both sites have no Git binding. Release/evidence checkpoint is to be pushed with the scoped fix PR targeting main, preserving separate manual deployment history. Browser/mobile emulation does not replace physical-device acceptance.
