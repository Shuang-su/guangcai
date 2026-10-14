# V4 completion record

V4 is implemented, manually deployed, and verified from the public URL. The V3 and 2.2 deployments remain unchanged. Code review remains Draft; this record does not claim user visual acceptance or physical-device acceptance.

- Live: https://guangcai-no1-china-v4.netlify.app/
- Comparison gallery: https://guangcai-no1-china-v4.netlify.app/evidence.html#v4
- Issue: https://github.com/Shuang-su/guangcai/issues/14
- Draft PR: https://github.com/Shuang-su/guangcai/pull/15
- Branch: codex/china-4.0, stacked on codex/china-3.0 because V3 PR #13 remains Draft.
- Base: 5af1f73aaacbb7ce1662e4ebbe4de0f15a6f231b. Published V3 source: 9400eaf7f65452cbaa68bee563b9793c632d17ae.
- Source checkpoint: 5b96503 (masters and aligned channels).
- Implementation / deployed source checkpoint: b39b23ae5358e52efea8b09d0324a64634d8124f.
- Deployment archive/readback checkpoint: 9a3f59a. Final closeout adds deployment archive/readback and a release-inventory sidecar filter. It does not change the deployed runtime.

## Delivered behavior

Nine choices: China original gold, green-gold, red-gold, purple-gold, blue-gold, blue line, purple line; Shenzhen red-gold and teal-gold. Eight new choices offer enamel/gold lines, colored metal and light-relief paint. Original gold keeps V3 material behavior and is the initial default.

Independent lettering offers auto, theme name, applicable Shenzhen slogans, or none. China lettering uses the PSD glyphs. Shenzhen names and slogans are separately typeset and checked, with their own frames. Hidden lettering also hides the frame. None persists across themes; Shenzhen-only slogans reset for China. Lettering color follows the variant. No free input.

The responsive theme panel contains thumbnails, material and lettering controls, and restore-default artwork. Camera reset does not reset artwork. Artwork changes preserve camera and background. New variants load only on demand; completed map groups commit atomically, stale loads are discarded, failure retains the current complete appearance, and replaced textures are disposed. Old applyCityArtwork(pack) remains supported.

Coverage, metalness, clearcoat and height/normal data are separate. Porcelain-only calibration excludes nonmetal colored artwork and lettering. Fixed Guangcai, geometry, studio, structural gold, original gold city textures, global exposure and background behavior remain unchanged.

## Source and implementation

Development used an independent full-history clone on 初号機, preserving the existing guangcai-china-preview application directory. Original workspaces were not modified. Caches/staging remain project-local; no Photoshop or separate cloud PSD parsing was used.

Eight references are copied with hashes. Built-in imagegen produced six ornament layers and one shared Shenzhen line master; prompts and native outputs are saved under assets/masters/v4. China structural ink and coverage reuse the PSD-derived source and calibrated placement. Shenzhen palettes share one master. All new runtime channels align to 4096 × 1783. Height masters are 16-bit, normals RGBA16F; float filtering and placement avoid intermediate 8-bit quantization. All eight heights retain over 64,000 distinct values.

Visual inspection found a blue flower cluster overlapping the lettering. A separately saved imagegen revision removed that cluster while retaining lower peonies, birds and clouds. The earlier generation remains saved. Final UV text reservations have no opaque artwork overlaps (China maximum 0/255, Shenzhen residual 1/255).

## Validation

- China unit/geometry/normal suite: 20/20 passed. TypeScript/Vite production build passed.
- Untouched original application: 6/6 tests and build passed in this clone before its generated dependencies/output were removed for disk space.
- V4 static-production browser regression: 82/82 passed; public V4: 81/81 passed. The one local-only check is the V3 pixel baseline. Zero shader errors or uncaught page exceptions.
- Background regression: 24/24 passed, including uploads, decode failure retention, stale loads, portrait/landscape and disposal.
- Viewports: 320×667, 390×844, 844×390, 1440×1000. Right-button pan, emulated two-finger pan, ten inspection views, camera versus artwork reset, fast selection, failure rollback, old API compatibility and stable GPU texture counts passed.
- Evidence includes 96 rendered finish/view images (8 × 3 × 4), 16 gray/off images, separate lettering captures, reference comparisons, aligned atlases and line overlays. These are actual Three.js renders rather than generated cup mockups.
- Default-gold V3/V4 model-region mean byte difference: 0.00000132. Geometry, studio, structural-gold and original China/fixed source channels have no diff against V3 base.
- Public comparison-gallery images and selectors were separately checked; see output/playwright/v4/online/evidence-qa.json.
- Source/record whitespace checks and release-helper syntax check passed. The whole-archive whitespace check reports pre-existing whitespace inside the generated Three.js shader bundle; immutable deployed bytes are preserved rather than reformatted.
- All 367 public content files match Netlify API SHA-1 values, and the immutable local archive matches SHA-256. Netlify lowercases paths in its API; mixed-case runtime URLs also passed browser checks. The extra internal netlify.toml API record is processed configuration, not publicly served content (HTTP 404).

Intermediate test interruptions are retained accurately: an already decoded image bypassed an initial failure fixture, so the fixture was changed to intercept the float-normal request; a development hot reload interrupted one geometry-identity test, so final acceptance used static production. Neither interruption was counted as a passed check.

## Loading observations

The fresh public desktop browser reached default-ready in 9,929 ms, including 1,900 ms deliberate render settling. Runtime resource transfer was 52,188,422 bytes; the retained high-detail fixed flower maps dominate this amount. No new variant textures were requested on the initial screen.

The seven new variants not previously selected in that browser took 1.734–4.266 seconds on their first recorded selection, including 200 ms settling. China green was already warm from UI checks. These are single observations, not repeated cold benchmarks. Public QA used process-only proxy DNS mapping and disabled HTTP/2 to accommodate this machine's network. No OS network setting was changed. No physical mobile-network or phone performance claim is made.

## Deployment and preservation

Manual deployment ID: 6aceb7c1c85f347fb86ce86d. Site ID: cbb885ed-16d0-41a2-9ab0-055c0c3ce234. Netlify readback confirms ready, with no repository, provider or branch binding and no Git auto-deploy. Built-with badge is disabled.

V3 remains at 6ace443df7425f433e717eb0. China 2.2 remains at 6ace111ab0415c9455a3c6f8. Both remain unbound from Git. No merge, release tag, V3 overwrite or old-site rollback was performed.

Immutable content archive: deployments/guangcai-no1-china-v4/6aceb7c1c85f347fb86ce86d (367 content files, 259,134,942 bytes). ExFAT-generated AppleDouble metadata is excluded from content counts and Git. The original staging inventory and normalized release manifest are both retained. The release helper now excludes sidecars even if the filesystem recreates them during copy.

## Remaining visual and device limits

China structure is PSD-derived; the architectural fills use controlled reference palettes and broad unlit washes. The enamel appearance is softer and often lighter than the supplied flat reference, depending on the camera and reflections. Generated ornament shapes and the Shenzhen skyline are reference reconstructions, not exact reproductions. Native generation was 1900 × 828 and resampled to the common output frame; this is not recovery of nonexistent source pixels. Independently authored rounded slogan frames differ from the decorative reference frames.

The current relief is shader-based visual approximation, not a manufacturing depth specification. Browser mobile/touch emulation does not replace physical iPhone/Android or Safari acceptance. Final color, ornament/detail and manufacturing approval remain with the user; the PR therefore stays Draft.
