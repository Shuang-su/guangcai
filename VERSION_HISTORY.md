# 产品版本与发布索引

本仓库按正常开发项目维护；main 已包含原版与中国杯源码。中国杯后续版本在同一 `guangcai-china-preview/` 目录演进，旧版本通过下表的标签、提交与部署定位。

当前线上独立预览为 **V7.1.10 / v7-8**，前后对比统一为V7.1.4/v7-5→当前V7.1.10/v7-8，compare与独立dev增加实际曲面占比、PSD/模型差异、三部分花纸尺寸与接缝高亮；PR #54/#55/#56已合并部署，公网占比57项＋核心30项通过。正式图案、几何、UV保持既有映射，现有约2.56%比例差已公开。原5MiB/6秒目标、实体设备及COS/身份仍由Issue #47跟踪。

| 版本记录 | 实现与证据 | 验收状态 |
| --- | --- | --- |
| [V7.1.10 · Issue #53](https://github.com/Shuang-su/guangcai/issues/53) | [曲面占比与映射记录](docs/changes/20261020-v7.1.10-coverage-report/completion.md) | 45基础、52V7测试通过；本地及公网核心各30项、占比/23城/部位交互各57项通过；PR #54/#55/#56合并部署，1187文件核验，实体与既有UV差异见#47，资源仍为v7-8 |
| [V7.1.9 · Issue #51](https://github.com/Shuang-su/guangcai/issues/51) | [完整卡片线稿记录](docs/changes/20261020-v7.1.9-city-thumbnails/completion.md) | 45基础、45V7测试及29项页面回归通过；本地/公网卡片各92项通过，PR #52合并/部署，回执见完成记录 |
| [V7.1.8 · Issue #49](https://github.com/Shuang-su/guangcai/issues/49) | [入口版本记录](docs/changes/20261020-v7.1.8-entry-version/completion.md) | PR #50合并/部署；入口与运行时7.1.8，沿用v7-7设计；本地/线上核心28项通过 |
| [V7.1.7 · Issue #47](https://github.com/Shuang-su/guangcai/issues/47) | [PSD整版记录](docs/changes/20261020-v7.1.7-psd-layout/completion.md) | PR #48合并/部署，23城69档原稿核对、45基础与43V7测试，正式43项、开发86项及线上26项通过；入口版本标识转V7.1.8修正 |
| [V7.1.6 · Issue #45](https://github.com/Shuang-su/guangcai/issues/45) | [修正记录](docs/changes/20261020-v7.1.6-lab-readiness/completion.md) | PR #46已合并/部署；本地41+86项、V7测试39项，最终线上核心24项通过 |
| [V7.1.5 · Issue #43](https://github.com/Shuang-su/guangcai/issues/43) | [字框对比](https://guangcai-no1-china-v7.netlify.app/label-compare/) · [独立开发预览](https://guangcai-no1-china-v7.netlify.app/artwork-dev/) · [本轮记录](docs/changes/20261020-v7.1.5-label-layout-lab/completion.md) | PR #44已合并/生产文件核验；开发页慢网累计超时转V7.1.6修复 |
| [V7.1.4 · Issue #41](https://github.com/Shuang-su/guangcai/issues/41) | [逐城对比](https://guangcai-no1-china-v7.netlify.app/city-compare/) · [两城SVG试绘](https://guangcai-no1-china-v7.netlify.app/bezier-lab/) · [完成记录](docs/changes/20261019-v7.1.4-city-comparison-publish/completion.md) | 23城描线与底部更新；旧文字字框；合并部署回执在完成记录 |
| [V7.1.3 · Issue #35](https://github.com/Shuang-su/guangcai/issues/35) | [PR #34](https://github.com/Shuang-su/guangcai/pull/34) · [固定预览](https://6ad4995927bf346abcf5fcf4--guangcai-no1-china-v7.netlify.app/) · [完整记录](docs/changes/20261018-v7.1.3-floral-correction/completion.md) | 已合并/部署，Issue保持开启，待验收项见正文 |
| V7.1.2 · 历史记录 | [PR #32](https://github.com/Shuang-su/guangcai/pull/32) · [完整记录](docs/changes/20261018-v7.1.2-font-fill/completion.md) · [当时Issue正文存档](docs/changes/20261018-v7.1.3-floral-correction/issue29-v7.1.2-history.md) | 当时未单开版本Issue，保留原证据 |
| [V7开发交接总入口 #29](https://github.com/Shuang-su/guangcai/issues/29) | 后台表格、性能机制、接口与接入责任 | 跨版本持续维护 |

| 版本 | 标签 | 源码提交 | 实际部署 ID | 内容 |
| --- | --- | --- | --- | --- |
| 7.1.10 独立预览 | 未新增标签 | `a5ae402db7a8f074a5a56edbe63b6c2f3ab04724` | `6ad6c3ad0d1a73552408b968` | 真实城市网格图案/白瓷占比、PSD/模型毫米差、三部分花纸与实验高亮；公网57+30项、1187文件核验 |
| 7.1.9 独立预览 | 未新增标签 | `097690d748fa9dbefbb6b181acdb4d8e5fa7ef48` | `6ad6af47aa240e6a1c47b305` | 完整23城金色透明缩略图；城市和字框保持v7-7原数据，公网卡片92项及页面29项通过 |
| 7.1.8 独立预览 | 未新增标签 | `9c300a20d63125ba33fb6c8f55e7172a9b6d0810` | `6ad66823d01490f2bb745e5a` | 统一正式/开发iframe入口版本标识；沿用v7-7整版资源，最终公开28项通过 |
| 7.1.7 独立预览 | 未新增标签 | `aba6d1a5488683b7ae51cc193c6433bab45873f0` | `6ad665ed5a65f73c7d481d66` | PSD整版等比重标定、取消82%缩小；线上核心26项通过；加载版本标识后续修正 |
| 7.1.6 独立预览 | 未新增标签 | `36bb8bc4b7c647104fa14380c51448b84f2039ea` | `6ad64f4df744e9df794ecaee` | 开发页取消错误总等待上限，实际错误仍显示；沿用v7-6设计资源；线上核心24项通过 |
| 7.1.5 独立预览 | 未新增标签 | `02753e0640d52c2cf04b429ea606c23938aaa085` | `6ad648aee2d03ef0182627b9` | 统一字框、字框报告与独立开发页；冷加载等待后续由V7.1.6修正 |
| 7.1.4 独立预览 | 未新增标签 | `5991ec274757b984b2b19873d254027829bf2e48` | `6ad61f84c8773f7fd5ee6756` | v7-5城市描线/69档底边；保留旧文字字框；/city-compare/与/bezier-lab/；PR #42合并及公网核验通过 |
| 7.1.3 独立预览 | 未新增标签 | `3283d27147e080913b5bddf3a7e88ddec7351a7a` | `6ad4995927bf346abcf5fcf4` | v7-4实拍花纹方向、底边、金底补洞、上连接白瓷与杯碟近看高清；跨版本原子还原及后台表更新；V6不变 |
| 7.1.2 独立预览 | 未新增标签 | `6a9c4d3bd8ff237b11a9039070a9836083fdd224` | `6ad3be04e1ca085185e3e395` | 思源宋体CN Bold六组祝福语与字框、23城填色复核、厦门/西安G补面、v7-3及后台表更新；V6不变 |
| 1.0 | `v1.0` | `152a791b51faaa28e4a565809b3250cf7fc75346` | `6abbdf78d912b4b6b1d7c3b9` | 原版一号杯 |
| 2.0 | `v2.0` | `e50528015a727ea0689a0ca277a0ab2f6731cf8e` | `6acbd24fa545c331cdd20dae` | 中国杯上线基线 |
| 2.1 | `v2.1` | `17e5d12635a0036ade6fcaf42747b525e0daab6f` | `6ace09922a1b2f8945a7a41c` | 花纹布局与饰带宽度 |
| 2.2 | `v2.2` | `b2c2bd4dd0fee80ad073ae34087dfe588a671740` | `6ace111ab0415c9455a3c6f8` | 移动端柔光背景、本地图片预览与响应式修正 |
| 3.0 预览 | `v3.0` | `9400eaf7f65452cbaa68bee563b9793c632d17ae` | `6ace443df7425f433e717eb0` | 原始花纸、白瓷、平盖倒影、新背景；固定纹样高清重建、连续单周图集与高精度凹凸，手动发布 |
| 4.0 预览 | `v4.0` | `6b35efb104019472cea3679ea26cfee1e13ffc8b` | `6aced018c70635a1ad24cbbe` | 中国／深圳九款图样、三种新款材质、可选文字；包含颜色覆盖、旋转方向及杯身接缝修正，手动发布 |
| 4.1 预览 | `v4.1` | `591d8c56b0819143a2bdab454068fd30921a2977` | `6acef244237630dba7fa87fe` | 金底伪高度清理与侧边釉层反光；按用户要求回溯命名，部署时 UI / package 仍为 4.0 / 4.0.0 |
| 4.2 预览 | `v4.2` | `ee6e1aff10bf2f9892babc375e723bf360d9d63e` | `6acefdc52ef3d568cd9acedd` | 独立金底清洗覆盖，保留原始花纹颜色和黄果皮，通道同步；界面/package 4.2/4.2.0 |
| 4.3 预览 | `v4.3` | `8d54f7ee8091a1b5ccf6eb3646d8a269e0abdff7` | `6acf18984f3abc04fe3cab18` | 北京五款配色、13种材质组合、可选北京文字；原稿对齐与16位高度/浮点法线；界面/package 4.3/4.3.0 |
| 5.0 独立预览 | 未打标签 | `bb61e94d0739a48041e2198f62998c6a76affc3b` | `6ad0aae20e2edbe1f1a3b3c4` | 北京/深圳详细生图、固定金线、连续材质和HSL；带验证的独立V5发布流水线，旧站不变 |
| 5.1 独立预览 | 未打标签 | `84ef937e2daa576c12358e9722eab8142c25d423` | `6ad1932bbe33ebee7d4bc174` | 新增 11 城图样；北京 2／深圳 2 与旧款共存，13 个城市图样加中国旧款 |
| 5.2 独立预览 | 未打标签 | `934a633c29101824aa62e883df6356230be7ca58` | `6ad1e24b44638fd7a03d3824` | 新增 14 张全填色城市稿，27 套图样加中国；包含最新 XY 调色／材质、明度反馈、HDR 与触感 |
| 5.3 独立预览 | 未打标签 | `3288a5e7e29d501c56c2c10421a9dc35ca0f88a2` | `6ad1e6cde46366079e077a4c` | 全库城市全填色；天津／青岛新黑线稿直接替换旧稿，25 套城市构图加中国 |
| 5.4 独立预览 | 未打标签 | `fb2ce4078d47d618da908348c2d3eaf4a57b65bb` | `6ad1f73c185ae5e7e363f9b6` | iOS 新旧触感路径 |
| 5.4.1 独立预览 | 未打标签 | `e715ed194cee85d635e81d745e15fbff36ab6df9` | `6ad1fef61332ac9c795b3c15` | 原生 touchmove 连续脉冲和缩放坐标修正 |
| 5.4.2 独立预览 | 未打标签 | `156dc368e357ed84f6731d90abc1dc71bf886b8d` | `6ad20c45a7780e55fedba3d7` | 短屏幕控件放大恢复，保持已确认的脉冲实现 |
| 6.0 独立预览 | 未打标签 | `45e8c5cfb68adcbd142ff94473b229c846a386b3` | `6ad276ccaae8ef493bdd8f97` | 23 城／六字框、用户／开发／审计三入口、忠实 WebGL2 玻璃后端、循环与相机交互；V5 保留 |

旧版本首次入库没有原生 Git 历史；实际修改时间与补录提交时间分开记载。[HISTORY.md](HISTORY.md) 保存恢复的 16 个源码节点，全部已进入 main 的可达历史。表中 1.0/2.0/2.1 使用移除本机依赖链接后的提交，应用源码与各发布基线一致；历史 package.json 的内部编号保留原值，产品版本以本索引为准。3.0 开始同步维护产品 package 版本。

2026-10-16 当前状态：4.3–5.4.2 的完整版本链已由 [PR #26](https://github.com/Shuang-su/guangcai/pull/26) 合入 main（`bbf645b`）；PR #22 已随之合并。下文各阶段的“未推送／未合并”保留为当时事实。线上仍是 V5.4.2，已有标签不移动，Git 整理不触发重新部署。

## 查找与继续开发

完整克隆后可用 `git show v2.0:guangcai-china-preview/src/main.ts` 查看旧代码；需要运行旧版时在独立 worktree 检出标签，勿覆盖当前未提交改动。新功能从 main 建功能分支，同一版本可有多个按真实改动划分的 commit，产品版本、源码提交、Git 标签和部署 ID 分别记录。

[Issue #1](https://github.com/Shuang-su/guangcai/issues/1)、[#2](https://github.com/Shuang-su/guangcai/issues/2)、[#3](https://github.com/Shuang-su/guangcai/issues/3)、[#7](https://github.com/Shuang-su/guangcai/issues/7) 对应 1.0、2.0、2.1 和历史恢复；PR #4、#5、#6、#8 已按依赖顺序合入 main。[Issue #9](https://github.com/Shuang-su/guangcai/issues/9) 跟踪 2.2 与持续开发接入。

## 验证与部署边界

历史迁移验证中，1.0 与 2.2 分别重新安装锁定依赖，6/10 项几何测试及 TypeScript/Vite 构建通过；重新构建的 78/135 个发布文件与当时清单逐个匹配。2.0 的 122 项、2.1 的 131 项发布一致性证据及中途源码验证见历史记录。该轮未重跑全部旧版浏览器或真机验收；这些结果不代表当前代码的重新验证。

实际发布字节保存在 `deployments/<站点>/<部署 ID>/`。`docs/archive/*-inventory.json` 固定到源码提交；`tools/verify-archive.py` 同时检查历史对象及工作树发布快照。旧站保持现有部署，不连接 Git 自动发布。Git 标签与上线记录分别核实，不以 PR 合并推断线上已更新。

## 3.0 与 4.0 当前状态（2026-10-14）

- **源码已合并：** V4 [PR #15](https://github.com/Shuang-su/guangcai/pull/15) 先合入 `codex/china-3.0`；[PR #13](https://github.com/Shuang-su/guangcai/pull/13) 随后合入 `main`，合并提交 `408d68cf763762f64e6fa893988eb47426e01485`。后续接缝修正 [PR #16](https://github.com/Shuang-su/guangcai/pull/16) 也已合入 `main`，合并提交 `4e6566d56d0a1cb7e2b4495078551e554f37cd86`。
- **独立站已发布：** [3.0 高清预览](https://guangcai-no1-china-v3.netlify.app/) 和 [4.0 主题预览](https://guangcai-no1-china-v4.netlify.app/) 分别使用上表的部署；没有连接 Git 自动部署。
- **标签已补齐：** 2026-10-14 按用户要求补建并推送 annotated tags `v3.0`、`v4.0`，分别指向表中已部署的源码提交，未移动历史标签或重新部署。该次补标签时的中国杯 `package.json` 为 `4.0.0`。

3.0 高清重建发布保存了 147 个上传文件；当时公网 145 个文件 SHA-256 一致，2 个 HTML 扣除已知 Netlify 后处理后匹配。[高清重建发布记录](guangcai-china-preview/docs/changes/20261013-v3-restored/release.json) · [上一版精度修订记录](guangcai-china-preview/docs/changes/20261013-v3-floral-hq/release.json) · [首次 3.0 发布记录](guangcai-china-preview/docs/changes/20261013-v3/release.json)。

V4 最新接缝修正完成 20 项测试、构建及公网浏览器回归；408 个发布文件经清单核对。测试范围与限制以原始记录为准，浏览器模拟不等于真实设备验收。本次文档同步未重跑应用测试或重新部署。

- [V4 请求、计划与完成记录](docs/changes/20261014-v4/) · [Issue #14](https://github.com/Shuang-su/guangcai/issues/14)
- [旋转方向修正记录](docs/changes/20261014-v4-rotation/)
- [杯身接缝修正记录](docs/changes/20261014-v4-body-seam/completion.md) · [部署清单与公网复核](docs/changes/20261014-v4-body-seam/deployment.json)
- [线上素材与对照](https://guangcai-no1-china-v4.netlify.app/evidence.html#v4) · [颜色覆盖对照](https://guangcai-no1-china-v4.netlify.app/evidence.html#color-coverage) · [杯身接缝对照](https://guangcai-no1-china-v4.netlify.app/evidence.html#body-seam)

## 4.1：纹饰凹凸与侧边反光修正

源码 `591d8c56b0819143a2bdab454068fd30921a2977`，手动部署 `6acef244237630dba7fa87fe`。固定花纹去除金底伪高度、改善侧边釉层反光，法线强度维持 4.4／2.4。`v4.0` 仍指向此前发布基线，不移动标签。

[请求、计划、验证与完成记录](docs/changes/20261014-fixed-relief-alignment/completion.md) · [线上对照](https://guangcai-no1-china-v4.netlify.app/evidence.html#fixed-relief-alignment)。

## 4.2：固定花纹金底清洗

原始颜色母图不改写；独立金底清洗遮罩保护黄果皮和花瓣，金属度、粗糙度和高精度法线同步。UI/package 已同步为 4.2/4.2.0。20 项应用测试、7 项 Python 材质测试、构建、公网桌面/手机视口与交互回归通过；466 个应用文件哈希一致。手机为浏览器模拟，未声称真机验收。

Netlify CLI 末尾返回 422，但服务端显示对应命名部署 ready；逐文件 SHA-1、公网页面版本与实际渲染均独立回读确认，未重复部署。V3 不变，两站无 Git 自动部署。

[完成记录](docs/changes/20261014-floral-cleanup-4.2/completion.md) · [部署回读](docs/changes/20261014-floral-cleanup-4.2/deployment.json) · [4.2 对照](https://guangcai-no1-china-v4.netlify.app/evidence.html#floral-cleanup-4.2)。

## 4.3：北京主题与五款配色

基于4.2新增北京纯金、青绿金线、红金、紫金、蓝金，共13种有效材质组合。原1942×810透明线稿等比放大为4096×1783通道，16位高度和RGBA16F法线共用结构；生成式候选改变建筑，未采用。全站三个主题十四款，默认中国纯金不变。

21项应用、4项素材、76项浏览器、24项背景和17项生产预览检查通过，生产构建成功。浏览器模拟手机，尚未真机验收。来源、对照与实际发布状态见[完成记录](docs/changes/20261014-beijing-4.3/completion.md)。

手动更新V4部署 `6acf18984f3abc04fe3cab18`，834个应用文件与发布SHA-1完全匹配。V3保持 `6ace443df7425f433e717eb0`，两站Git自动部署绑定为空。[PR #22](https://github.com/Shuang-su/guangcai/pull/22) 记录源码合并状态；[部署与逐文件回读](docs/changes/20261014-beijing-4.3/deployment.json)。


## V5 / 5.0.0：两城结构母版与自由创作（本地，未发布）

2026-10-15，分支 `codex/city-v5`，功能 checkpoint `04fbd4e95e33d87fe14f38c38608502388dd3db1`。北京按本轮新请求去掉前景波浪，以原 PSD 天坛线条为参考，建筑统一到底线；深圳沿用已有母稿。统一 5433×2365 SVG 模板与 4096×1783 运行资源。两城各五色预设、HSL 调色、固定金线和统一材质滑杆；移除轻浮雕彩绘，旧 paint 输入归一到彩釉。

本轮从已保留的 4.3/钢笔样段提交 `787c5b6` 建分支；fetch 核实远端 main 仍是 `928ab24`，不宣称已合并。没有新 tag、PR 或部署。[完整实施与验证记录](docs/changes/20261015-city-v5/completion.md)。

## 5.0 独立预览（2026-10-15）

[在线 V5](https://guangcai-no1-china-v5.netlify.app/) · [图样与填色复核](https://guangcai-no1-china-v5.netlify.app/review/v5/) · [请求、计划、验证与部署记录](docs/changes/20261015-v5-generated-pipeline/completion.md)。源码仍在 `codex/city-v5` 的本地 checkpoint，未推送、未合入 main、未打 tag。独立站没有 Git 自动部署绑定；在线45项检查通过不代表实物制造或真实手机验收。


## 5.1 独立预览（2026-10-16）

新增 11 张用户原稿；北京 2／深圳 2 与旧款并列保留，13 个城市图样加中国旧款。新稿保持原构图；固定金线、五色、HSL、材质与法线浮雕共用既有参数。8 项素材、24 项应用和本地／线上各 61 项浏览器检查通过。原始文件与旧两城哈希均核对，974 个发布文件摘要匹配。

[在线 V5.1](https://guangcai-no1-china-v5.netlify.app) · [本次不可变预览](https://6ad1932bbe33ebee7d4bc174--guangcai-no1-china-v5.netlify.app) · [13 组原稿与填色对照](https://guangcai-no1-china-v5.netlify.app/review/v5/) · [完整记录](docs/changes/20261016-v5-eleven-city/completion.md)。源码分支 `codex/city-v5-eleven-source`；未 push／PR／合并／tag，旧站部署不变。浏览器手机模拟不等于真实设备或工厂验收。

## 5.1 后续本地开发：14 张透明黑线城市稿（2026-10-16，未发布）

基于最新二维调色／材质、HDR 与触感实现 `523b49f`，在 `codex/city-v5-fourteen-black` 增加 12 座新城市及天津 2／青岛 2，共 23 座城市、27 套城市图样，加中国旧款共 28 个选项。本批按用户要求统一填满闭合区域，不额外处理镂空；金线固定，已有 13 套图样继续保留。

9 项素材、34 项应用、124 项浏览器检查及 14 张新稿杯面目视检查通过；原稿、旧资产和最新前端源码摘要核对成功。本轮仅本地实施与 checkpoint，沿用 V5.1／5.1.0 编号，未更新上方线上部署。[完整记录与本地预览](docs/changes/20261016-v5-fourteen-black/completion.md)。

## 5.2 独立预览（2026-10-16）

按用户授权，把最新 14 城和二维调色／材质、明度反馈、HDR 与触感更新到现有 V5 站点。产品编号为 V5.2／5.2.0，共 23 座城市、27 套城市图样，加中国旧款共 28 个选项；本批新稿全填色、不额外处理镂空。

本地 9 项素材、34 项应用、124 项浏览器检查与线上 124 项检查通过；1087 个发布条目及本地不可变快照核对完成。源码 `934a633`，部署 `6ad1e24b44638fd7a03d3824`；旧站部署 ID 未变，未 push／PR／合并／tag。[在线 V5.2](https://guangcai-no1-china-v5.netlify.app/) · [不可变预览](https://6ad1e24b44638fd7a03d3824--guangcai-no1-china-v5.netlify.app/) · [发布记录与验证](docs/changes/20261016-v52-release/completion.md)。

## 5.3 全填色与同城新稿替换（2026-10-16，已发布）

用户要求旧图也统一全填色，并用 V5.2 新稿替代重复旧稿。25 套城市构图全部取消额外镂空；天津／青岛直接采用新黑线稿，去掉天津 2／青岛 2 选项，共 26 个选择。10 项素材、34 项应用、本地和线上各 122 项浏览器检查通过；1087 个发布条目核对，旧站未变。源码 `3288a5e`，部署 `6ad1e6cde46366079e077a4c`。[在线 V5.3](https://guangcai-no1-china-v5.netlify.app/) · [实施与发布记录](docs/changes/20261016-v53-full-fill/completion.md)。

## 5.4 iOS 新旧触感兼容（2026-10-16，已发布）

引入旧标签点击与新版真实 switch 手势两种 iOS 路径；持续拖动采用原生 switch 手势，保留 Android 原生 Vibration。只作用于现有创作控件，固定金线、全填色与 26 项选择保持。10 项素材、35 项应用、122 项完整页面及 53 项触感分支检查通过，尚无真实 iPhone 马达验收。[实施、来源与验证记录](docs/changes/20261016-ios-haptics/completion.md)。

源码 `fb2ce40`，部署 `6ad1f73c185ae5e7e363f9b6`；线上 122 项完整回归及 53 项触感分支模拟通过，1088 个发布文件与不可变快照摘要核对完成。Netlify 标识继续关闭，旧站不变；未 push／PR／合并／tag。网页事件验证不代表真实手机马达验收。[在线 V5.4](https://guangcai-no1-china-v5.netlify.app/) · [不可变预览](https://6ad1f73c185ae5e7e363f9b6--guangcai-no1-china-v5.netlify.app/)。

## 5.4.1 拖动脉冲修正（2026-10-16，已发布，实机待复测）

用户实机反馈 V5.4 只有第一下震动。修正原生目标初始化、刻度请求到真实 touchmove 的时序、方向保持与控件缩放坐标，增加按需本地诊断入口。旧版本在加强后的初始化测试中复现失败，修正版本专项通过；硬件震感仍待用户复测。[实施与验证记录](docs/changes/20261016-ios-drag-pulses/completion.md)。

源码 `e715ed1`，部署 `6ad1fef61332ac9c795b3c15`。本地／线上各 122 项完整回归与 70 项触感分支检查通过，1088 个发布文件与不可变快照匹配。用户报告的 iPhone Air／Safari 27.0.1、iPhone 16／Safari 26.6.1 均归入新版路径；实际连续震感尚待这两台设备复测。[在线 V5.4.1](https://guangcai-no1-china-v5.netlify.app/) · [本地诊断入口](https://guangcai-no1-china-v5.netlify.app/?haptics-debug)。

V5.4.1 后续用户确认连续脉冲可用；快速拖动仅震动未跟上，数值正常。每次启动仍有延迟，与 WebKit 原生 switch 约 200 ms 识别等待相符。另记录较短视口的整块放大限制；本次仅诊断记录更新，没有重新发布。[诊断与用户反馈](docs/changes/20261016-ios-startup-audit/completion.md)。

## 5.4.2 短屏幕放大恢复（2026-10-16，已发布）

通过短手机响应式面板间距与高度修正，为原有色盘、材质盘和明度条保留 1.24 倍放大空间。7 个触感／交互／构图文件与 V5.4.1 保持字节一致，连续脉冲逻辑不变。[实施与验证](docs/changes/20261016-short-screen-lift/completion.md)。

源码 `156dc36`，部署 `6ad20c45a7780e55fedba3d7`；本地 10 项素材、35 项应用、122 项完整回归、135 项短屏幕检查与 70 项触感回归通过。线上 135 项专项及同部署串行复测 122 项完整检查通过，1088 个文件与不可变快照匹配；首次深圳加载超时记录保留。脉冲核心源码未改，旧站与关闭的 Netlify 标识保持。[在线 V5.4.2](https://guangcai-no1-china-v5.netlify.app/)。

## 2026-10-17 V6 发布

[用户创作页](https://guangcai-no1-china-v6.netlify.app/) · [开发页](https://guangcai-no1-china-v6.netlify.app/dev/) · [审计页](https://guangcai-no1-china-v6.netlify.app/audit/)

V6 使用独立站点，原 V5、V4 和其他历史站部署 ID 均经 API 前后核验未变。发布产物按部署 ID 原样保存，线上文件摘要、路由、124 项浏览器检查及动画专项通过；站点级关闭 Netlify 品牌角标。没有连接 Git 自动部署，没有新增或移动标签。真机触感与 Safari 性能单独待验收。详见 `docs/changes/20261017-v6-webgl2-studio/`。

## 2026-10-17 V7 本地候选（未发布）

基于V6.0.1源码a231937，新增分级资源、Worker解码、按预算缓存与按需渲染，保留反射；交付资源协议、作品数据契约和本地保存/分享mock样例。资源checkpoint为94b5acf。消费者、审计及联调分别构建；真机验收与正式上线仍为独立步骤。完整记录见 `docs/changes/20261017-v7-progressive-resources/`。

## 2026-10-17 V7.0.1 独立预览（真机待测）

[预览站点](https://guangcai-no1-china-v7.netlify.app/) · [固定部署](https://6ad2ffb0fe9651b1a32349cc--guangcai-no1-china-v7.netlify.app/)

源码 `922fad662aecaad16e1b874c6e8d62e8f453dab3`，部署 `6ad2ffb0fe9651b1a32349cc`。同步 V6.0.2 的启动、城市返回与 Safari 元信息修复，保留 V7 分级资源。220 个文件摘要已核验，Chrome 线上 81 项通过；桌面 WebKit 公网长流程发现解码停等，未通过，继续修复。当前网络首屏约 9.8 秒，线上 6 秒目标未达标。V6 及四个旧站发布 ID 未变，未连接 Git 自动部署。详见 `docs/changes/20261017-v7-preview-release/completion.md`。

## 2026-10-17 V7.0.2 加载后进入设计（独立预览已更新）

[预览站点](https://guangcai-no1-china-v7.netlify.app/) · [固定部署](https://6ad3052bc8c052a7d6ccac6b--guangcai-no1-china-v7.netlify.app/)

源码 `bb51f75e26f0fc630900d6f27e85d79a2dd1e1c2`，部署 `6ad3052bc8c052a7d6ccac6b`。新增进入前的真实首屏材质进度、读取速度、耗时和内存信息，完整场景实际绘制后才进入设计；缺失素材可重载，法线解码超时可有界重建。图片改为文档图像解码，WebKit 公网连续切换不再复现旧的解码停等。Chrome/WebKit 线上各 81 项、入口专项各 25 项通过，220 个文件摘要一致；V6 及旧站未重发。公网首次进入仍有波动，6 秒目标及真实 iPhone 30 分钟稳定性未作为已通过。记录见 `docs/changes/20261017-v7-entry-loading/completion.md`。

## 2026-10-17 V7.0.3 城市文件预载与祝福语热切换（独立预览）

[预览站点](https://guangcai-no1-china-v7.netlify.app/) · [固定部署](https://6ad30cb653bc7aa8da1871a5--guangcai-no1-china-v7.netlify.app/)

源码 `8e05ba76f06747ea4e76278f9f962582c04146a5`，部署 `6ad30cb653bc7aa8da1871a5`。按用户选择，在进入前准备 23 城低清、全部缩略图、六句祝福语与当前/相邻高清文件；城市按需解码，六句 R8 字形遮罩提前上传，切换不再请求或重解码。固定低清缓存支持资源源站不可用时恢复。默认预载 10.42 MiB，手机文件缓存 12 MiB。消费者/阻断源站/入口等本地检查通过；220 个服务端文件与公开资源已核对。10Mbps 冷缓存本地模拟约 13.4 秒，公网单独诊断首次约 106 秒，旧 5 MiB / 6 秒性能目标仍未通过；iPhone 真机继续待测。V7 界面基线仍为 V6.0.2，未包含本轮期间另行提交的 V6.0.3 独立玻璃合成器。详见 `docs/changes/20261017-v7-city-preload/completion.md`。

V7.0.3 发布后 Chrome 线上 83 项完整回归与 WebKit 56 项资源预载专项通过；线上完整 Chrome 冷启动另一次观测 123.312 秒，性能未达标状态保持。源站阻断后切换/恢复、全部 220 个归档文件及旧站指针均核对通过。

## 2026-10-17 V7.0.4 解压副本与反射重复工作优化

[独立 V7 预览](https://guangcai-no1-china-v7.netlify.app/) · [固定部署](https://6ad3147e6442c07e80613f7d--guangcai-no1-china-v7.netlify.app/)

源码 `9d3a6f42bc980cd8fb86715d386126b0e30371dd`，部署 `6ad3147e6442c07e80613f7d`。按声明长度直接填充网络/解压缓冲，去掉完整原始数据二次拼接；城市/文字不再触发被隐藏杯壁的无效局部反射捕获，花纸升级只刷新一次。三种固定视角前后像素一致，原有反射与字形保留；同机 Chrome 23 城事务中位数 34.9→16.0ms，仅为桌面测试。42+16 个中国杯测试、两引擎各 83 项完整/32 项专项/25 项入口检查及线上 WebKit 32 项通过。220 份发布归档核对，V6 由另一任务在此后独立发布，未被本任务改动。网络首次加载和 iPhone 物理验收仍未通过。详见 `docs/changes/20261017-v7-render-hotspots/completion.md`。

## 2026-10-17 V7.1.0 V6.0.4 整合与接入候选

在 V7.0.4 基础上同步 V6.0.4 独立液态折射、收起锚点和无进度下载超时，适配非保留画布和按需绘制，增加多上下文资源计量及磨砂回退。完整预加载、裁切文字、输入触感保持。新增可取消准备状态 API、失败缓存重试、三地址/子路径模拟联调与COS部署说明。源码 checkpoint、独立V7部署及真机状态在本轮完成记录补齐；不等同生产发布或真机验收。

## 2026-10-17 V7.1.1 高清实际应用、切城玻璃和西安全填色

当前城市高清在进入前实际应用，切城稳定后自动提清并预载左右城市；材质替换重叠按峰值预算管理，避免正常切城永久回退磨砂。Worker使用固定长度的便携gzip解压，解决WebKit原生解压流停等；法线使用原始半浮点XY，减少常驻量。静态环境释放无用深度，保留两种反射。西安内部补齐为新资源v7-2，金线/法线不变，v7-1保留回放。详细机制见 integration/PERFORMANCE.md，完整检查及后续独立部署见本轮完成记录；真机验收仍pending。

V7.1.1发布源码快照 `4189efcf325540d489213edbdc21419d8291f846`（功能修正 `209da08`），独立部署 `6ad336a18e5052baf0191481`。服务器225文件摘要匹配，V6及四个旧站指针不变。[固定预览](https://6ad336a18e5052baf0191481--guangcai-no1-china-v7.netlify.app/)；线上浏览器回读另记 verification.json。
