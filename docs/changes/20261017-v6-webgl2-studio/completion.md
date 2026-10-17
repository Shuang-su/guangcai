# V6 工作记录

关联 Issue： https://github.com/Shuang-su/guangcai/issues/27 。起点 f0c0cc3；分支 codex/v6-webgl2-studio。

## 第一阶段：玻璃后端

已保存 Glass-HQ 9f5bfc7 的 108 个上游文件与 MIT 许可，并实现与原接口兼容的 WebGL2 材质图后端。原 GPU 文件保持原样；迁移补丁记录见 vendor/glass-hq/PATCHES.md。

验证：141 项上游 core/DOM 测试通过；本机 Chrome 中 28 组 WebGPU/WebGL2 输入输出全部逐字节一致，包括两张平面。材质图证据为 evidence/glass-v6/parity-initial.json。第一次上游测试因 ExFAT 的 AppleDouble 文件被误收集而失败，改用排除 ._ 的明确文件清单后通过，没有改写测试逻辑。

仍在进行：消费者界面、素材编译与组合、缓存拆分、完整回归、独立发布和远端合并。此记录不代表整个 V6 已完成。

首个 checkpoint SHA 由下一阶段记录补入，避免提交自引用。

## 用户中途反馈

2026-10-17：用户指出 slogan-open-proof.webp “字重不对好像”，提供同一金字参考图。确认 FontFace 已加载官方子集，weight=400；六套 WOFF/WOFF2 输出一致，没有合成加粗。首版字号占边框宽度 0.56、末字触及下卷纹，现改为 0.44，并调整四字中心与留白。原始字体未改写。此项排版修订不宣称与参考图笔画完全一致，待用户视觉反馈。

## 第二阶段：素材与消费者界面

第一阶段 checkpoint：d37253f3e222a2b2f7f5ea1bebce5760a37bd83f，已推送任务分支。

已编译 23 个原稿城市，保留原始 PNG、可编辑 SVG、结构／填色／法线及来源哈希；23 城全部全填色，外部天空留白。六组东方大楷文字与描摹边框使用独立共享贴图；字体两格式输出一致。新文字、金线和边框固定金色。结构与文字缓存独立，城市两组、文字六组有界缓存，调色／质感仅更新参数。

三个入口复用同一模型和材质：消费者仅构建必要控件，开发页保留旧 26 图样和新 23 城（共 49 项），审计页保留两个后端、23 城和六个字框对照。

根据用户连续反馈，界面调整为四分类、三槽双向循环的底部菜单；五个方形颜色同时可见，入口“自定义”，二级仅显示对齐的返回／重置按钮与顶部操作横杆。一级可收起；城市居中显示三张完整卡片及两侧半张，透明描线缩略图裁掉多余留白。分类模糊过渡、面板高度动画、色块展开与明度条延迟显现均已实现。

用户发现重复弹出的背景框：消费者自己已驱动高度过渡，又启用了原库 fluid 弹簧，两者叠加造成光学轮廓持续追赶。消费者关闭这一个可选布局弹簧，由单一尺寸动画驱动；原上游动效源码和审计 fluid 演示保留。静止连续截图验证外框稳定。

复测发现旧滚动吸附会把 transform 定位的城市卡片滚出可视范围，已取消 native snap 并改为 overflow:clip；五张可见、三张完整、两张半露通过实际浏览器几何检查。

当前源码本地 39 项测试和 98 项浏览器检查已通过；后续正式构建流水线、线上回读和合并结果继续追加，不以此段代表已发布。五个原脉冲／原生手势／控件／按压放大文件与 V5.4.2 摘要一致。两台 iPhone 实际震动与 SVG 合成性能仍待真机确认。

正式构建阶段核验：39 项单元与契约测试通过，23 城及六字框检查通过（208.886 秒；后续 UI 轮次按全部测试输入／输出 SHA-256 复用，修改资产会重新检查）。三个入口 TypeScript/Vite 构建通过；构建产物上的 107 项 V6 浏览器检查以及 70 项旧触感路径检查通过。1331 个待发布文件已整理。动态导入与共享 Three.js 包体积产生构建提示，未产生编译错误。此阶段尚未发布，下一轮追加祝福语原库交互形变后再核验和发布。

第二阶段 checkpoint：cc22d52ff2869ed406609d4b33151fa41d66e870。完整原稿、23 城／六字框、消费者／开发／审计入口与截至本阶段的 UI 修订已提交，工作树当时干净。随后按新反馈追加祝福语原库交互动效，单独验证和提交。

祝福语动效补充已完成：使用原库 interactive 控制器及原弹簧，hover 高光、拖拽拉伸与回位不改变网格顺序。首次检查发现原库 lg-surface 在尚未生成 clip-path 前隐藏，与“按 computed visibility 注册”构成循环，已改用页面／ARIA 可见状态注册。最新本地 110 项浏览器检查通过，包括三项 hover／拖动／回位检查；再次正式构建与线上核验继续执行。

第三阶段前置 checkpoint：52f7732（祝福语原库 hover／拖动形变）。该提交正式构建通过 110 项 V6 检查与 70 项旧触感检查。随后收到远裁剪和工具菜单新反馈，旧 prepare 已失效，修订后重新构建。

已复现固定 far=2500 与 OrbitControls maxDistance=3000 不一致导致远侧几何被切除，改为按整组模型包围球与相机距离动态扩展远面，保留 near=.5。新增真实模型顶点包围范围回归（含旋转、平移、拆解）。视角改为右上角当前视角触发胶囊＋七项弹出菜单；旋转／暂停和复位为图标；自定义加图标和磨砂胶囊。使用现有原库 Regular 材质和触感绑定，五个核心触感文件未改动。

旋转无效的原因是相机定位过渡仍在将相机拉回原目标；启用自动旋转时解除这个相机 tween，模型部件的拆解过渡仍完成。OrbitControls.update 接收 dt，速度提高约 29%。新增浏览器断言实际方位角变化，不能仅依据 auto=true 判断成功。

最初的菜单 CSS 缩放被用户指出与原版不符，已替换为原库液滴连接路径，等待原库 glass:exited 再隐藏；首次集成时发现新 popup 在材质准备期间不可聚焦，已使键盘能进入语义菜单而轮廓仍被裁切。

色块和城市原来由独立 RAF 改变位置，而光学取样及 15ms 合成节流可能落后一帧。消费者改用原 addAnimator 共享取样时序，并显式启用逐帧合成。城市使用完整材质图＋视口 alpha 裁切，避免逐帧生成截断轮廓。独立运动检查采样城市 24 帧／15 个位置、色彩 23 帧／14 个位置，可见图形与 SVG 高光矩形误差均为 0 CSS px；这不是帧率或 iPhone 性能声明。

收起把手按最后反馈修正为“条本身”带金色的液态玻璃 36×6 小胶囊，外部为透明点击区，没有胶囊外框。图标统一为立方体环绕箭头和简洁回转箭头。完整构建与线上验证仍待下段追加。

后续用户视觉修订已实现：城市列表达到面板两边、卡片 1:1；色彩轨道与裁切视口解耦，两端添加同色副本，静止五项；去掉 CSS border/inset-shadow 与原库轮廓的冲突；小把手调浅香槟金；菜单字体固定字重，并保留连续点击时弹簧的当前位置和速度。底部菜单外胶囊采用原库 interactive 的轻微形变。

验证中捕获并修复两处集成错误：提前清除 popup 的 ending 标记会在隐藏元素上重新启动原库 morph，导致空 endpoints；现在保持 closed/ending 状态直至再次打开。增加色彩副本后原库默认 16 表面上限不足，消费者明确设置有界上限 32（最重颜色页 23 个表面，副本共用材质图）；循环两端同时预备，避免副本首次进入的单帧高光空缺。8 次快速菜单开关无异常，城市／色彩运动图层位置检查重新通过。

本轮最终构建通过：40 项单元／契约测试、23 城／六字框资产哈希验证、124 项构建后浏览器检查、城市／色彩同帧高光与原菜单 morph 专项、70 项旧触感分支检查。没有未捕获异常。复测涵盖 7 种屏幕尺寸、放大控件、恢复预设、迅速切换／失败回退、城市 1:1、循环两端副本、远距离完整模型及自动旋转真实移动。1331 个构建文件准备完成。原始素材未变；核心触感 5 文件未变。源码 checkpoint 与独立部署回读记录在下一段补入。

## 独立 V6 发布结果

本轮 UI checkpoint：b016b817d27a4f1196ac2cb729779bd44395ffd2；公开许可补充后的发布源码：45e8c5cfb68adcbd142ff94473b229c846a386b3，两者已推送。最后一次准备重新通过 40 项本地测试、资产检查、124 项构建浏览器检查、光学动画专项和 70 项旧触感分支检查。

独立 V6 已发布：https://guangcai-no1-china-v6.netlify.app/，开发入口 /dev/，审计入口 /audit/；部署 ID `6ad276ccaae8ef493bdd8f97`。Netlify 状态 ready，published_deploy 与本次 ID 一致，1336 个远端摘要匹配，三个入口返回 200，缺失资源返回 404，dev 带 noindex。线上重新通过 124 项浏览器检查和城市／颜色高光同帧、菜单形变／回弹专项。不可变归档 `deployments/guangcai-no1-china-v6/6ad276ccaae8ef493bdd8f97` 的 1336 个文件均逐一 SHA-256 核对。

线上实看发现 Netlify 新站默认注入品牌角标，按既有纯净页面要求执行项目级单字段 built_with_badge_enabled=false。三个入口回读均不再注入 HUD，发布 ID 不变；没有使用本机隐藏状态或遮盖 CSS。独立 in-app 浏览器页面已检查完整杯子、方形卡片、当前视角入口及角标消失。

V5 发布仍为 6ad20c45a7780e55fedba3d7，其他三个受保护站点同样没有变化。原始素材及历史发布未改写。PR #28 已建立并关联，合并及最后 Git 状态随后补记。

尚需实际设备验收：iPhone Air／Safari 27.0.1、iPhone 16 标准版／Safari 26.6.1 的振动输出、玻璃合成性能和触屏动效主观观感。自动化只确认事件、参数、布局和已观察的画面，不代替真机结果。

## iOS 27 Safari 失败与 6.0.1 修复

用户提交的三张真机截图已按原字节归档到 ios27-report/，sources.json 保存来源和 SHA-256。6.0.0 的 iOS 27 层级／截断状态现为“已观察失败”，不再泛称只有待验收；先前通过的结果限定为 Chrome。第一版完整不可变发布归档 checkpoint 为 4614a67。

修复在移动 WebKit 初始化玻璃之前选取 native-backdrop：保留 WebGL 模型在独立未过滤的层，玻璃面板／卡片／按钮使用有界原生 backdrop-filter，UI 在画布上层。原库 input springs、随动高光继续使用，菜单和循环选择器沿用既有交互。完整 SVG 折射与原版 morph 保留在桌面路径；移动兼容模式使用原生磨砂和缩放过渡，不宣称二者视觉等价。诊断和审计页已公开区分。

机制判断参考 WebKit 缺陷 322588（https://bugs.webkit.org/show_bug.cgi?id=322588）：加速 WebGL canvas 可能丢失 CSS SVG reference filter，报告包含 Safari 27 Beta；源库另有大滤镜缓冲、分块与重绘范围的特殊处理。这些与截图吻合，但没有这台 iPhone 的远程图层调试证据，因此不能宣称已经唯一确定 WebKit 内部根因。当前修复直接绕过整屏 SVG/WebGL 合成路径。桌面 WebKit 26.6 没有稳定重现用户截图的整段空白，故最终判断仍需要原设备复测。

浏览器插件未提供，按 frontend-testing-debugging 使用项目 Playwright。WebKit 26.6 安装到另一项目卷的 .codex-work/cache/v6-webkit：初号機卷安装解包报 ENOSPC，停止后未更改系统缓存或原件。脚本通过 PLAYWRIGHT_BROWSERS_PATH 指定缓存，不提交本机路径。WebKit 回归使用真实 WebKit 引擎加 iPhone UA／移动尺寸（桌面引擎 touch emulation 的 maxTouchPoints 为 0，因此 UA 用于覆盖移动策略），不是在 Chrome 里伪装 Safari，也不是 iOS 27 真机验证。

开发检查发现兼容模式不能沿用原库等待 clip-path 的隐藏规则，已针对 compatible 状态恢复可见性；模型放大后的命中测试与截图均重新通过。当前本地 WebKit 专项 72 项通过，完整最终构建和发布回读随后补记。

6.0.1 最终准备已通过：42 项单元／契约、资产检查、124 项 Chrome 构建回归、原版运动专项、72 项真实 WebKit 26.6 移动尺寸检查、70 项原触感事件分支。中断后重新跑完最终流水线，没有采用未结束的进程结果。

对用户 GPU 判定疑问追加调用链检查：杯子为 Three WebGLRenderer（WebGL2）；完整玻璃材质图由 dom/backend.ts 固定选 WebGL2，只有 /audit/ 且 backend=webgpu 才初始化原版 WebGPU 材质图。另有独立 hdr-surface.ts 使用 WebGPU 输出可选色盘 HDR，高动态范围＋安全上下文＋navigator.gpu＋adapter/device/configuration 检测后启用，失败保留 SDR；它没有 UA 平台过滤。不能把整个页面描述为完全不含 WebGPU。

追加 6 组运行记录（backend-proof.json）：Chrome 与真实桌面 WebKit 各测原生环境、删除 navigator.gpu、requestAdapter 返回 null；为触达 HDR 能力分支强制 dynamic-range: high。Chrome 原生实际创建两个 WebGPU HDR context，调用栈只来自 hdr-surface；另外两种情况下只有杯子和材质图两个 WebGL2 context。WebKit 本机原生未提供 navigator.gpu，absent 与 null-adapter 同样正常。六组均拖动调色成功、零 pageerror；未证明所有 iOS 27 渲染均正确。移动 WebKit 原生磨砂是单独的合成兼容措施，不是用 UA 决定 WebGPU 支持与否，也不会禁用已有 HDR 能力检测。

6.0.1 发布源码 checkpoint：a2319370175259f1ee22b9ecfd75167041faa91e。独立 V6 部署 6ad28d933b40920e67613f89 已 verified，线上 124 项 Chrome、运动专项及 72 项 WebKit 检查通过；1336 文件远端摘要与本地不可变归档 SHA-256 均核对。四个受保护旧站保持原部署。

后续真机反馈仍存在功能问题：菜单无法点击、准备提示停留、Safari 上下边缘非沉浸；用户进一步确认在其他菜单调整一段时间后返回城市会卡在高度过渡中途，完整玻璃和磨砂模式都可复现。因此 PR 继续 Draft，6.0.1 不代表真机验收完成。下一修复检查共用的加载锁定、提示生命周期、隐藏列表几何及面板测量顺序。

6.0.2 问题定位：consumer-panel 初始化把整个面板设为 inert，main 等所有高清素材结束才 ready；截图可见基础杯子不代表固定花纹已全部解码，故在慢链路上仍不能点菜单。另 selection.busy 结束且没有 error 时没有状态文案分支，导致“正在准备 深圳 纯金”遗留。现取消整面板初始锁定，并按真实 startup pending 更新提示与最终 ready。

城市过渡的共用逻辑问题已确认：ResizeObserver 在 display:none 期间回报零宽度，旧代码把 step 改成 1，进而把城市卡片尺寸写成 -5px；重新显示又在 refresh 前测量动画终点。现在保留最后有效尺寸，先 refresh 再确定高度终点。该修复同时适用于完整玻璃和原生磨砂。

全屏边界：根 html/body 扩展真实柔光背景供 Safari 采样，取消固定 theme-color；保留 viewport-fit=cover，增加 apple-mobile-web-app-capable / black-translucent 和 standalone manifest。普通 Safari 浏览器工具栏并非网页 DOM，不能用 CSS 强行隐藏；主屏幕独立启动与实际 iOS 27 边缘采样仍待设备验收。参考 Apple Configuring Web Applications 和 WebKit Designing Websites for iPhone X。

6.0.1 线上直接采样确认：城市列表隐藏宽度 0，--city-card-size 为 -5px（city-before-6.0.1.json）。6.0.2 构建后专项在 Chrome 和真实桌面 WebKit 各通过 21 项，共 42 项；故意拦住固定花纹的浮点法线请求，仍可触屏切菜单／进出自定义，图样加载完成后提示正确显示“正在载入花纹”，花纹释放加载完成后提示清空。三轮其他菜单调整再返回城市，隐藏尺寸有效、动画目标与最终高度误差小于 1px、卡片 1:1、卡片与菜单无重叠。

完整最终准备通过 42 项单元／契约、资产检查、124 项 Chrome、运动专项、72 项 WebKit、42 项加载／城市回归及 70 项原触感分支。原始素材和五个已确认输入／触感实现文件保持字节不变。源码 checkpoint 与线上回读随后补记。

6.0.2 源码 checkpoint：81cd1f9efc805074cec72fbbdb71f920270ce20e，已推送。独立 V6 部署 6ad295b03953db1e0b268b8f 已 verified：1337 个远端文件摘要匹配，完整不可变归档再次逐一 SHA-256 核对；线上 124 项 Chrome、运动专项、72 项 WebKit、42 项慢加载／触屏／城市返回检查均通过。四个旧站部署完全保持。归档核对后回收本轮可再生成的 .codex-work/deploy/v6-build，原件、源码、不可变发布文件保留。

当前仍有明确验收边界：iPhone 用户页保持原生磨砂兼容，完整液态折射尚未恢复与验收；这不是 iPhone 硬件不能实现玻璃的结论。普通 Safari 地址栏不能由页面 CSS 隐藏；主屏幕独立启动的实际 iOS 27 状态栏处理仍需真机。WebKit 对应问题可见 https://bugs.webkit.org/show_bug.cgi?id=206854 和 https://www2.webkit.org/show_bug.cgi?id=317153 。PR #28 继续 Draft，未合并，未创建或移动标签。

## 6.0.3：移动 WebKit 独立折射与面板收起锚点

本轮实现保留 Glass-HQ 原位移场、高光、覆盖图、胶囊切片、形变和交互弹簧，把最终材质图合成移植到透明 WebGL2 图层。模型画布不再经过 SVG 引用滤镜；有色玻璃、Regular 磨砂折射与嵌套父玻璃取样都在独立累积缓冲中完成。原曲线和 tint 常量复用，模糊采用两 CSS 像素采样步长，输出 DPR 限定 1.5，因此没有声称最终像素与浏览器 SVG 栅格化逐字节相同。原图已解码时在第一帧直接上传；实际初始化或上下文丢失才进入可操作的 native-backdrop，并在诊断里保留原因。五个触感／二维输入核心文件未改。

收起跳位的具体原因是 collapsed CSS 把胶囊从 absolute/bottom 改为 relative 正常文档流。现在两种状态保留相同底部锚点，胶囊内距与宽度跟随外框 420ms 过渡；内容按展开关键帧逆序淡出、缩回，不再跳到面板顶部。城市 ResizeObserver 的高度写入移至下一帧，显式切回城市时仍先同步 refresh 再测量动画终点。

本轮回答了祝福语来源：边框母版为 SVG，阿里妈妈东方大楷文字与边框在构建时合成 4096×1783 无损 WebP 遮罩，运行时由杯身 UV 和固定金色材质渲染；菜单标签为 HTML 文字，未改动该素材链。

容量与失败记录：第一次资产检查用到系统 Python 缺少 numpy，随后改为现有 bundled Python；通过指纹复核重用未变化的资产检查。两次构建／写入遭遇 ENOSPC，其中有效构建已完成、后续 QA 写报告时空间不足。定位到无进程占用、无索引的 Git 临时包 tmp_pack_tw2MJ9（1590165504 字节）和 tmp_pack_I3xknk（229113856 字节），连同两个 AppleDouble 伴随文件完整备份、双向 SHA256 验证后移出原卷，未改动有效 Git 对象包。恢复目录：/Users/shuangsu/Codex/guangcai-v6-recovery/.codex-work/cache/abandoned-git-packs-20261017/；recovery.json 和 verified.json 保存精确来源与摘要。macOS 随主体删除伴随 ._ 文件导致一次 ENOENT，复查四份备份均完整、原四路径均已离开；Git connectivity fsck 通过。测试缓存分别在 /Volumes/Prism/广彩/.codex-work/cache/v6-before-6.0.3-20261017/ 和 v6-tmp-preserved-20261017/ 按逐文件哈希搬存，没有清理原稿、模型或发布归档。部署工具增加可选同卷原子移动构建到归档，并再按已发布清单回读，避免重复占用约 1.3GiB。

最终打包与线上检查、源码 checkpoint 和部署摘要由本节后续发布回读补齐。物理 iPhone Air / Safari 27.0.1、iPhone 16 / Safari 26.6.1 的最终效果和帧率仍需真机复测；桌面 WebKit 26.6 的成功不等于真机验收。

6.0.3 最终打包结果：42 项单元／契约、哈希一致的 23 城／六套字体边框资产、124 项 Chrome、原库同帧高光与菜单 morph、74 项 WebKit、42 项慢加载／城市返回、49 项独立折射像素／首帧／四菜单底部锚点／上下文丢失检查、70 项原触感分支全部通过。构建清单 1336 个文件，发布时再增加 release.json。build-6.0.3.json、webkit-6.0.3.json、liquid-6.0.3.json、startup-6.0.3.json 与 evidence/ui-v6/safari-6.0.3/ 保存本轮证据；无应用运行时错误。

6.0.3 发布候选：源码 checkpoint `2ad92f6352119a014637da1b46f0e7ed788ab82d` 已推送；部署 `6ad30bc420f569fd63dd9068` 已在 V6 发布，1337 项服务器摘要匹配、旧站未改变，但线上完整 QA 未通过，未标记验证完成。Chrome 网络证据显示杯碟法线为 24,283,080 字节，120 秒时仍下载了 17,055,301 字节，应用总时长 AbortController 中断了正常进度并从头重试。候选完整文件已按准备清单回读，并保存到不可变归档，deployment.json 明确 published-online-qa-failed。

容量后续：再次发现无人占用的 tmp_pack_erBDJL（含伴随文件共 1,704,726,528 字节），以同样逐文件哈希方法搬存到内置盘 recovery 下 abandoned-git-packs-20261017-repeat/。为防止容量不足期间自动维护反复产生临时包，仅在本仓库把 gc.auto 从未设置改为 0、maintenance.auto 从未设置改为 false；旧值保存为 automatic-maintenance-before.json，未修改全局 Git 配置。有效对象包与历史仍保留。

## 6.0.4：持续传输不中断

新增 downloadBytes 流式读取，保留原 120 秒容忍度但按最后一个非空数据块重置空闲计时；fetch、gzip 检测、HFN 格式、RGBA16F 精度和三次重试都保留。正常持续传输不再被总时长强制丢弃。新增三个传输契约均通过；直接从线上读回 24,283,080 字节杯碟法线，耗时 28.8 秒，SHA256 与本地原件完全一致，见 progress-download-6.0.4.json。QA_READY_TIMEOUT 仅配置线上慢链路等待，所有功能、素材完成、点击和像素断言保留。

最终打包通过：45 项单元／契约、未改变资产的哈希复核、124 项 Chrome、原库运动同步、74 项 WebKit、42 项慢加载／城市返回、49 项独立玻璃／首帧／收起检查、70 项原触感分支；新构建 1336 项，发布附加 release.json。源码 checkpoint、部署和线上结果在下方发布回读记录。
