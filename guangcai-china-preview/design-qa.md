# V6 consumer design QA — 2026-10-17

final result: passed

Scope: the supplied cup layout plus camera/color videos, **as revised by the user's explicit UI corrections**. This is an implementation review, not user aesthetic approval or iPhone device acceptance.

## Visual truth and normalized evidence

- Full layout: supplied `素材原件/低代码V2.2~V2.5/永丰源-添彩3.png`, 750×1624, normalized to 393×852. Current `consumer-presets.png` is 393×852 CSS px, DPR 1. Combined input: `.codex-work/tmp/v6-qa/comparison-layout.png`.
- Five-color state and expanded color state: supplied `素材原件/色盘/ScreenRecording_10-16-2026 13-25-46_1.mov`, source contact sheet `.codex-work/tmp/v6-reference/color-old-0.jpg`; matched overview/editor crops normalized to 393px wide. Current captures: `.codex-work/tmp/v6-qa/final/consumer-presets.png` and `color-393x852.png`. Combined focused comparison: `.codex-work/tmp/v6-qa/comparison-controls.png`.
- Main loop reference: supplied `ScreenRecording_10-17-2026 00-44-33_1.mov`, contact sheet `.codex-work/tmp/v6-reference/color-video-contact.jpg`. User correction sets four categories, three visible, bidirectional; latest correction places the strip at the bottom.
- Actual-browser review: local Chrome at `http://127.0.0.1:5260/`; in-app browser tab 12 separately opened and screenshot-reviewed. Browser plugin is not available; repo Playwright used for repeatable QA. Console/page exceptions checked by the QA runner.

Reference camera UI and product UI have different content, background and density. Only relevant control regions are compared for behavior; this report does not claim full-screen pixel identity.

## Findings and iteration history

1. [P1, fixed] Initial UI used three static categories and exposed the color pad immediately. Replaced with four cyclic categories (city/color/material/slogan), with three visible, and two-level color navigation.
2. [P2, fixed] First cyclic prototype showed only three presets. User explicitly requires all five simultaneously. Five square presets now remain visible at rest; both directions wrap, and clicking an outer preset selects that precise preset.
3. [P2, fixed] Initial secondary header mixed a palette title and H/S/L readout with back/reset. Removed visible text, aligned icon buttons on one row, added the requested centered short handle. Accessible names remain.
4. [P2, fixed] Category strip was above content. Moved its actual DOM after content; body/menu order now agrees visually and for keyboard navigation. Entry label is “自定义”.
5. [P2, fixed] Slogan text was oversized and touched the lower curls. Font remains official Regular/400; size reduced from 0.56 to 0.44 frame width and four glyph centers spaced. WOFF/WOFF2 masks match. Exact optical stroke weight compared with AI reference is a user aesthetic follow-up, not a claim of matching a different font.
6. Post-fix combined screenshots above show five presets, bottom category strip, clear glass surface, aligned secondary controls and short handle. No current clipping/overlap in six tested viewport sizes.

## Required fidelity surfaces

- Typography: UI uses existing legible system font; selected labels retain contrast and weight. Cup uses supplied Dongfang DaKai Regular without synthetic bold. No missing slogan glyphs. Smaller nonselected preset labels fit all five columns.
- Spacing/layout: selected central square is enlarged; secondary pad expands from selected square and shrinks back; category content has scale/fade transition. Back/reset are equal 40px boxes at aligned edges; short-screen 1.24 press enlargement is retained. No horizontal overflow at 360×640, 375×667, 393×715, 393×852, 852×393 and 1365×900.
- Colors/tokens: existing five product palettes retained; gold lines/text/frame remain independent. Light translucent Glass-HQ surfaces intentionally replace dark camera panels and opaque yellow mockup card. Keyboard focus ring remains visible.
- Image quality: actual Three.js cup, supplied city artwork and original fixed floral textures are used. Frame is traced SVG from the supplied PNG at user's request; icons are licensed Heroicons assets. Palette gradients and pad are functional parameter controls, not substitute image artwork.
- Copy/content: seven right controls are camera views; category names are 城市／色彩／质感／祝福语. “自定义” only; no visible H/S/L readout. No marketing headings, account, works gallery or publish buttons per scope.

## Interaction evidence and intentional differences

Both category directions wrap through all four; palette directions wrap through all five. Current preset opens the editor; side preset selection updates the cup; back keeps the choice. Reused XY/lightness inputs keep the original touch/haptic nodes; rapid edits change parameters without loading city maps. The main category bar hides during editor use. Reduced-motion disables transition movement.

The vertical lightness rail remains beside the color pad, matching the established cup controls; the reference's horizontal adjustment rail is not introduced. Cup framing is interactive and replaces the static reference product image. Decorative marketing copy and bottom app navigation are intentionally absent.

## Follow-up and acceptance boundaries

- iPhone Air Safari 27.0.1 and iPhone 16 Safari 26.6.1: real SVG-composition performance, physical pulse and touch feel remain pending device acceptance.
- Minor optical spacing/material tone can be adjusted after the user tries this preview; no unresolved P0/P1/P2 implementation finding in the reviewed states.
- Full checks and source manifests are recorded in the preparation/release evidence; screenshots do not substitute for actual motor verification.

## Final live-feedback iteration

User requested a centered city carousel with **three complete cards and two half cards**, transparent line thumbnails, less empty space inside cards, collapsible first-level panel, inset bottom menu text, blur transitions, and a calmer glass frame. The new `.city-cards` uses a four-slot pitch with five visible identities; original scroll-snap was removed after it moved transform-positioned cards out of view. This regression was reproduced, fixed with `overflow: clip` and no native snap, and checked again in the actual browser. Transparent alpha thumbnails are cropped from the unchanged line channel; card height is reduced on mobile.

The top handle now works for click and vertical swipe. Collapsed state keeps the handle and bottom categories; selecting a category reopens it. Blur/fade/scale transitions surround category changes, with one 420ms DOM height transition. The color pad grows from the selected swatch with subtle overshoot; lightness and toolbar have delayed reveals. Existing input nodes are reused.

[P1, fixed] User observed a repeatedly popping background frame. Both the page height transition and upstream `fluid` layout spring were active. Consumer outer glass now follows the page's single size transition; audit retains the original fluid demonstration. Idle screenshot comparison after transition shows no repeated frame movement (only a small number of pixels from existing control afterglow). `panel-settling.json` and repeated screenshot assertion record this check.

Final captures: `.codex-work/tmp/v6-qa/final/consumer-city.png`, `consumer-presets.png`, `color-360x640.png`, `color-393x852.png`; short-screen image was opened and reviewed after these fixes. Final QA is scoped to implemented requirements and browser evidence; physical-device and subjective typography approval remain separate.

Durable selected evidence is saved under `evidence/ui-v6/` (latest layout comparison, city, presets, normal/short-screen editor, pressed state, dev and audit). Supplied layout and live-feedback screenshots are preserved under `assets/source/v6/references/` with SHA-256 provenance.

## Final material and clipping corrections

User's live screenshots revealed a remaining embedded-window composition problem after the earlier idle-frame check. Independent Chrome screenshots alone were insufficient. The consumer now registers the actual content container as the outer surface, with a single height/width animation; shrinking reaches exactly the bottom menu's rectangle. No experimental SVG coordinate changes were retained in upstream source. Original background, compositor, materials and shape controllers remain.

Cities and slogans now use upstream **Regular** frosted liquid glass, and palette swatches use **Clear + tint**. Only visible option surfaces are registered (up to six); the 23-city catalog is not rendered as 23 lenses. A reproduced optical overflow at the two half cards is fixed using the original `registerShapeContainer` / `concentric` resolver, so both DOM and optical geometry respect the carousel boundary. Selected options use pale gold fill rather than extra CSS outlines; the central category lens is 26% of the strip, leaving space to adjacent labels.

The reset icon rotation and 420ms parameter interpolation are restored. Pad and lightness expansion start together. Main menu and secondary navigation taps request one haptic through the existing native-button path; continuous drag haptic source files remain unchanged. Latest screenshots are re-captured for release; physical confirmation remains pending.

Final slogan interaction: upstream `interactive:true` keeps six grid identities fixed, lights on hover and applies the original press/stretch/release springs. Desktop hover adds a 1.025 scale; reduced motion skips it. The first validation caught the upstream `.lg-surface` pre-clip visibility rule: visible-option registration must follow panel/ARIA state, not computed visibility before registration. This circular condition was fixed. Fresh 110-check run confirms hover illumination, held drag deformation, spring return, current selection and haptic requests. `slogan-drag.png` captures the pressed state.

## Final follow-up: camera toolbar and synchronized optical motion

The latest feedback supersedes the earlier concentric-crop approach and handle styling. The camera rail is now a compact top-right eye/view capsule with an original Glass-HQ joined-drop popup (`morphFrom`, `detach`, `neck`, upstream spring/exit). Rotation uses a cube/orbit icon; reset uses a return arrow, with shared gold line weight. Customize is a visible 40px frosted capsule with an adjustments icon. The handle is only a 36×6 tinted liquid-glass bar inside an invisible 64×24 hit area, with fixed-position hover illumination; no outer frame.

The actual far clipping defect was reproduced at distance 2500, then repaired by expanding the far plane around the model bounds without changing the near plane or user zoom limit. Screenshots at 2500/3000 show the complete saucer. Automatic rotation now takes over an unfinished camera pose transition, advances by dt and runs at -0.9 (previous -0.7).

Carousel DOM springs now run through the original addAnimator read phase. Consumer-only synchronous composition prevents a high-refresh frame from moving DOM without its rim. City materials use full cached maps and a viewport alpha clip, prewarming one extra neighbor per side; five cards remain visible. A frame trace checks both cities and swatches, including motion/return, with zero CSS-pixel placement mismatch in the observed run. Existing circle/line shader algorithms are unchanged.

Latest local review: far-2500.png, consumer-presets.png, view-menu.png, menu-neck-progress.png and the in-app 393×852 page were inspected. Original source screenshots and all intermediate decisions remain in the record. Physical iPhone motor output, Safari composition speed and subjective typography acceptance remain pending.

Latest accepted corrections: the handle tint is pale champagne; city cards are square and reach both sides of the shell; palette positions are inset but the actual clipping viewport reaches the shell edge, so copies leave at the edge. Repeated palette instances cover both sides of a cyclic seam, including their material maps. They share the original cached pixels and the scene is explicitly bounded to 32 surfaces (23 in the largest palette state). CSS borders/inset shadows were removed from full glass swatches to prevent rectangular borders cutting the original curved highlights. Category text uses one weight, fades at the ends, and keeps position/velocity when interrupted. The tab bar itself uses the original restrained press/release interaction; the larger panel still has one size animation.

A rapid open/close regression was found and fixed in the adapter: keep ending/closed attributes until the next open instead of clearing ending while the menu is already hidden. Original morph source code was preserved. Eight quick opens/closes now produce no errors. Fresh optical frame checks passed after all copies were warmed; the full built verification follows.

## 6.0.1 mobile WebKit correction

The supplied IMG_2141/2142/2143 screenshots establish a real iOS 27 failure in 6.0.0: blank horizontal bands and a WebGL cup drawn over UI glass. The earlier pass applies to Chrome only. Mobile WebKit now uses bounded native backdrop surfaces with an unfiltered scene. It retains upstream input springs and highlights; it does not claim the full SVG refraction path. Desktop WebKit 26.6 with an emulated iPhone UA and mobile viewport is the regression engine, not a physical iOS 27 device. Physical retest remains pending.

## 6.0.2 startup and city return

Device evidence shows that the blanket initial inert lock also blocks menus while fixed floral maps are still pending. The panel now remains usable, with explicit stage status and final clearing. Hidden city strips retain their last nonzero width; the restored 1:1 card geometry is measured before the panel animation target. Root backgrounds and standalone metadata are supplied for Safari edge handling, but ordinary Safari chrome remains browser-controlled. Added delayed-normal-map and repeated touch navigation checks on Chromium and real desktop WebKit; physical iOS 27 retest remains required.

## 6.0.3 isolated liquid composition and reversible panel collapse

Browser plugin not available; repository Playwright is used. The target flow is consumer load -> zoom/rotate model behind glass -> color/city/menu changes -> collapse/reopen -> preserved click and optical boundaries. Mobile WebKit now runs the original Glass-HQ fields, highlights, morph placements and material constants through an independent transparent WebGL2 compositor. It samples the live model, background and previously composed parent glass; it never puts an SVG reference filter on the model canvas. Gaussian sampling is bounded to two CSS pixels and the optical canvas to DPR 1.5 for mobile memory cost; original field maps retain their source resolution. This is a final-composition port, not a claim of byte-identical final SVG output.

Pixel probes on Chrome and WebKit verify scene displacement, nested parent refraction, live source updates, viewport masking, original rounded field/highlight coverage, and context-loss fallback. Four-menu frame traces keep the capsule at the panel bottom while closing. The former jump was caused by changing the capsule from absolute bottom positioning to relative normal flow in the collapsed state. Both states now use the same anchor and animate the inset and width with the shell; contents use reverse fade/scale keyframes. ResizeObserver writes are scheduled outside delivery to avoid WebKit resize feedback during rotation. Local runs passed 47 liquid/collapse checks, 74 WebKit checks and 42 unit/contract checks. Full built and online runs are recorded by the release pipeline. Physical iPhone Air / Safari 27.0.1 and iPhone 16 / Safari 26.6.1 acceptance remains pending.

## 6.0.4 slow transfer follow-up

The published 6.0.3 candidate passed build tests but cold online loading hit the existing 120-second normal-map timeout: the 24,283,080-byte saucer normal was still receiving bytes at 120 seconds (17,055,301 received). Version 6.0.4 changes binary transfer to a 120-second idle deadline reset by arriving chunks (preserving the prior stall tolerance); it preserves the original full-resolution RGBA16F data, gzip decoder and retries. Separate contracts cover a total duration longer than the idle deadline, a genuinely stalled stream and HTTP failure. Online readiness waits can be configured for slow links; functional and pixel assertions are unchanged. No visual assets or haptic files were modified.
