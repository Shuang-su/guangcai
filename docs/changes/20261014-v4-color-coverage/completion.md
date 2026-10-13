# V4 color coverage correction

Request: “颜色没覆盖全”, with screenshot of the green-gold China cup.
Issue #14 / Draft PR #15, continued on codex/china-4.0 from 13b15ee. Current production before correction: 6aceb7c1c85f347fb86ce86d.

## Cause and change

The exporter applied a rectangular cream tint to every China gold-line variant below source y=0.85 and left of x=0.48. This bleached railings, stairs and tower bases at a shared horizontal boundary. The maps loaded successfully; this was an incorrect pigment override rather than missing network content or insufficient relief.

Removed that override. Green/red/purple/blue pigments now continue through the full architectural silhouette. The gold ink, geometry, UV placement, coverage, metalness, roughness, clearcoat, float normals, 16-bit heights and independent lettering are preserved. White petals in the ornament layer remain white. Original gold, two line-art styles and both Shenzhen styles are unchanged.

Updated aligned masters, hashed pigment maps/thumbnails, four-style material gallery frames, structural overlays and the variant overview. Added a same-camera before/after section at evidence.html#color-coverage. Existing deployed snapshots remain immutable.

## Verification before publish

- 20 unit/geometry/normal/selection tests passed.
- Export check: 100% of sampled opaque nonmetal lower-building interiors retain palette saturation for all four variants (over 141,000 tested pixels per variant).
- Existing and new catalogs confirm unchanged identity for every non-color channel, every structural-line digest, all lettering assets, and all channels of the other four styles.
- Browser before: 13 checks, no runtime/shader errors. Browser after: 15 checks, no runtime/shader errors; four corrected variants across three finishes, unchanged fixed maps/geometry/porcelain and RGBA16F normals.
- Same-camera default gold and relief-gray frame comparisons pass mean pixel difference <0.01/255.
- TypeScript/Vite production build passed; final build includes the refreshed evidence gallery.
- Actual screenshots and checks are saved in public/review/v4-color-coverage and output/playwright/v4-color-coverage.

## Publication

Manual V4 production update and server readback pending at this source checkpoint. No V3/old-site update or Git deployment binding is included. Public verification, immutable archive and final checkpoint will be recorded in deployment.json and the release closeout.

This correction addresses pigment coverage. It does not change relief depth, replace the fixed Guangcai pattern, or claim a physical-device/manufacturing acceptance.
