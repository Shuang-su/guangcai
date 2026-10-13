# V4 completion record

Issue: https://github.com/Shuang-su/guangcai/issues/14
Branch: codex/china-4.0
Base: 5af1f73aaacbb7ce1662e4ebbe4de0f15a6f231b (V3 release closeout); published V3 source 9400eaf7f65452cbaa68bee563b9793c632d17ae.

## Source stage
- Independent full-history Git clone on 初号機; source directory remains guangcai-china-preview. Original workspaces and V3 deployment remain unchanged.
- Eight user reference images copied with SHA-256. Built-in imagegen produced six independent ornament layers and one shared Shenzhen line master; complete prompts and outputs saved.
- China architecture reuses PSD-derived structure; Shenzhen palettes share one master. Colors, coverage, metalness, roughness, coat and RGBA16F normals are independently aligned. 16-bit source heights retain over 64,000 distinct levels.
- Independent checked labels: 中国 / CHINA, 深圳 / SHENZHEN, 和合共彩, 共创美好. Text is not taken from generated lettering.
- Original application: six tests and TypeScript/Vite build passed in this clone before its generated dependencies/output were removed to recover disk space. China application: 20 tests passed, including selection/race semantics and preserved geometry.
- First visual samples rendered without shader/page errors. Default-gold model region versus V3 baseline mean channel difference <0.01/255. Full V4 browser matrix is still running; this is not yet deployment completion.

Remaining: complete browser/visual checks, evidence page, build, manual V4 deployment and live readback, Draft PR and final records. No physical-phone or manufacturing acceptance is claimed.

## Implementation and review stage
- Source checkpoint: 5b96503. Selection UI, catalog transactions and backward-compatible city material channels are now implemented. City coverage is separate from metalness and porcelain calibration; hidden text removes its frame.
- Default-gold crop against V3 measured mean byte difference 0.00000132, with identical geometry, fixed flowers, source city maps, global exposure, studio and structural-gold code.
- Visual review found an upper-right blue peony overlapping China text. A separately saved imagegen revision removed that cluster; lower peonies, birds and clouds remain. Final UV text reservation replaces the earlier pre-placement rectangle. Original generation is preserved as blue-ornaments-before-text-reserve.png and in the first checkpoint.
- Floating height filtering/placement prevents 8-bit quantization before 16-bit export. Precision and text-zone measurements are saved with the masters. All eight label regions contain no opaque artwork overlap (China maximum 0/255, Shenzhen residual 1/255).
- Browser fault-test fixture initially reused an already decoded image; replaced it with an intercepted float-normal request. A developer hot reload interrupted a later geometry-identity check; final regression runs against a static production build. These interruptions are not claimed as passing acceptance.
- Background regression: 24 checks passed, including local uploads, decode failure retention, stale-load handling, portrait/landscape and disposal. Unit/geometry/normal suite: 20 tests passed.
- Netlify V4 site created independently: cbb885ed-16d0-41a2-9ab0-055c0c3ce234. build_settings is empty; no Git repo/provider/branch. Built-with badge disabled. No production deploy yet.

## Visual limits
The new assets are source-aligned previews. China structural ink remains PSD-derived, while fills are controlled reference palettes and broad unlit washes. Generated ornaments and the shared Shenzhen master are not exact replicas of the reference artwork. Generated originals are 1900 × 828, resampled into the common 4096 × 1783 frame. Text frames are independently authored rounded borders, not copied calligraphic frames. Relief is shader-based and is not a physical-depth or manufacturing claim. Browser mobile emulation does not constitute physical iPhone/Android acceptance.

## Pre-deployment validation
- Production build: TypeScript and Vite passed. China tests: 20/20. V4 production-browser regression: 82/82, zero shader/page exceptions. Background regression: 24/24. The untouched original application had 6/6 tests plus a successful build in this clone.
- Evidence: all 8 × 3 × 4 = 96 finish/view images, plus 16 gray/off images, separate lettering captures, references, aligned atlases and structural overlays. These are real rendered frames, not imagegen cup mockups.
- Browser sizes 320×667, 390×844, 844×390, 1440×1000, including touch emulation. Right drag, two-finger pan, camera reset versus artwork reset, last-wins updates, decode/network failure rollback and GPU texture-count stability passed.
- Initial runtime transfer measured locally ~52.2 MB, dominated by retained high-detail V3 flowers. New variants are not requested on the initial screen; identical maps share content-hashed URLs. Local timings are not public-network or physical-phone timing claims.
- Source/model proof: geometry, studio, structural gold and original China/fixed source-channel files have no diff against V3 base.
