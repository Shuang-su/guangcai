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

Pending: source checkpoint, manual V4 deployment, public readback and immutable archive, then push/PR merge. V3 remains unchanged and Netlify must remain unbound from Git.
