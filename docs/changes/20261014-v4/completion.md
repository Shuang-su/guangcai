# V4 completion record (in progress)

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
