# 后台同事从这里开始 · V7.1.2 / v7-3（2026-10-18）

**当前已发布：六组思源宋体 CN Bold、与新SVG一致的字框和字距；23城来源及填色复核完成，补齐厦门树丛开口和西安右城墙3处微小空点。** 只增加两城三级G覆盖，原稿、R描线、法线、花纸、配色、材质和菜单字体保持不变。旧作品按v7-1/v7-2原版本还原。

- [用户预览](https://guangcai-no1-china-v7.netlify.app/?v=7.1.2) · [固定V7.1.2部署](https://6ad3be04e1ca085185e3e395--guangcai-no1-china-v7.netlify.app/)
- [下载Excel配置表](https://github.com/Shuang-su/guangcai/raw/86e75755052cd80b56ddefdd237f5d90a7d0a2fb/guangcai-china-preview/integration/backend-handoff/V7%E5%90%8E%E5%8F%B0%E9%85%8D%E7%BD%AE%E6%95%B0%E6%8D%AE%E8%A1%A8.xlsx) · [完整JSON](https://github.com/Shuang-su/guangcai/blob/86e75755052cd80b56ddefdd237f5d90a7d0a2fb/guangcai-china-preview/integration/backend-handoff/backend-config.json)
- [字体、参考原件与23城逐项复核](https://github.com/Shuang-su/guangcai/blob/86e75755052cd80b56ddefdd237f5d90a7d0a2fb/guangcai-china-preview/evidence/v7.1.2/README.md) · [本轮验证](https://github.com/Shuang-su/guangcai/blob/86e75755052cd80b56ddefdd237f5d90a7d0a2fb/guangcai-china-preview/evidence/v7.1.2/verification.json) · [公网回读](https://github.com/Shuang-su/guangcai/blob/86e75755052cd80b56ddefdd237f5d90a7d0a2fb/guangcai-china-preview/evidence/v7.1.2/qa/online/report.json)
- [交付记录](https://github.com/Shuang-su/guangcai/blob/86e75755052cd80b56ddefdd237f5d90a7d0a2fb/docs/changes/20261018-v7.1.2-font-fill/completion.md) · [上一轮V7.1.1正文存档](https://github.com/Shuang-su/guangcai/blob/86e75755052cd80b56ddefdd237f5d90a7d0a2fb/docs/changes/20261018-v7.1.2-font-fill/issue29-v7.1.1-history.md)

资源/表格数据来源固定为制作提交3dee288；上述文件链接固定交付提交86e75755052cd80b56ddefdd237f5d90a7d0a2fb。表格只是字段映射参考，前端不直接读取Excel。公司后台模板确定后再映射，不新增作品字段。

[PR #32](https://github.com/Shuang-su/guangcai/pull/32) 已合并到main（`1e2ec499720b37deb4648fb4487d3abbf25ef2a5`），包含本轮全部资源、代码、表格、验证和发布归档；内置盘临时构建目录已清理，持久交付在Prism。V6部署保持6ad314a2a5e661a14e469026。本轮桌面Chrome/WebKit和数据校验通过；iPhone13mini/iOS18连续30分钟、Air/mini6的V7.1.2复测、正式COS/公司身份联调仍待验收。原5MiB/6秒目标仍未达到，本轮10Mbps/100ms为13.390–13.461秒、12,106,184字节。不能把桌面模拟帧耗当作真机承诺。

---

# 后台同事从这里开始

适用版本：V7.1.2，默认资源 `v7-3`，兼容旧作品 `v7-1`、`v7-2`。精确数据基线见 JSON 的 sourceCommit 和 sources。本包是现有配置的数据字典和映射参考；公司尚未提供后台模板，因此不声称可直接导入公司管理后台。

- [Excel 配置表](https://github.com/Shuang-su/guangcai/blob/86e75755052cd80b56ddefdd237f5d90a7d0a2fb/guangcai-china-preview/integration/backend-handoff/V7%E5%90%8E%E5%8F%B0%E9%85%8D%E7%BD%AE%E6%95%B0%E6%8D%AE%E8%A1%A8.xlsx)：六张表，包含23城、五套配色、材质参数、六组祝福语和195项资源。
- [完整 JSON](https://github.com/Shuang-su/guangcai/blob/86e75755052cd80b56ddefdd237f5d90a7d0a2fb/guangcai-china-preview/integration/backend-handoff/backend-config.json)：与Excel同源，保留数值精度、来源提交及哈希，便于程序读取。
- [本轮验证记录](https://github.com/Shuang-su/guangcai/blob/86e75755052cd80b56ddefdd237f5d90a7d0a2fb/guangcai-china-preview/integration/backend-handoff/verification.json)：导出一致性、资源文件哈希、Excel读回、参数边界及模拟接口保存/还原结果。
- [逐项性能实现](https://github.com/Shuang-su/guangcai/blob/86e75755052cd80b56ddefdd237f5d90a7d0a2fb/guangcai-china-preview/integration/PERFORMANCE.md) · [接口与部署](https://github.com/Shuang-su/guangcai/blob/86e75755052cd80b56ddefdd237f5d90a7d0a2fb/guangcai-china-preview/integration/README.md) · [OpenAPI](https://github.com/Shuang-su/guangcai/blob/86e75755052cd80b56ddefdd237f5d90a7d0a2fb/guangcai-china-preview/integration/contracts/openapi.json) · [作品 Schema](https://github.com/Shuang-su/guangcai/blob/86e75755052cd80b56ddefdd237f5d90a7d0a2fb/guangcai-china-preview/integration/contracts/design.schema.json) · [资源 Schema](https://github.com/Shuang-su/guangcai/blob/86e75755052cd80b56ddefdd237f5d90a7d0a2fb/guangcai-china-preview/integration/contracts/resource-manifest.schema.json)。

## 1. 三个常见问题

### 城市的拓展数据是什么类型，去哪里拿？

类型是 **JSON object**。后台资源目录的一条城市记录保存稳定ID、中文名、资源发布版本、模型/配方版本、manifest路径，以及七个资源ID：一张缩略图、三级遮罩及三级法线。

直接取 `backend-config.json` 的 `cities[].extension`，Excel“城市配置”最后一列是相同的完整JSON。其 `resourceIds` 是本交接包建议的引用结构，**不是给现有 DesignConfig 添加的新字段**。完整尺寸、字节数、通道、哈希和URL在 `resources[]` 中，也能从原始manifest的 `cities[cityId]` 取得。ID只在指定资源版本内解析，不跨版本拼接。

```js
const city = handoff.cities.find(c => c.cityId === 'shenzhen');
const extension = city.extension; // object，建议后台JSON列
const textForStringField = JSON.stringify(extension); // 后台只支持文本时才序列化
const restoredExtension = JSON.parse(textForStringField); // 读取时解析一次
const maskId = restoredExtension.resourceIds.standard.mask;
const mask = handoff.resources.find(a => a.id === maskId);
// 换COS时，publishPath相对发布根；原始url则相对manifest所在目录。
const maskUrl = new URL(mask.publishPath, 'https://cdn.example.com/cup/').href;
```

图片存COS/CDN；数据库保存引用。作品中只保存 `cityId` 与版本，所有作品共用资源。不要把PNG、SVG、Base64或整套纹理写进每件作品。缩略图仅用于菜单；杯身必须使用结构遮罩与法线。城市遮罩R是金线、G是填色覆盖；颜色和PBR由前端参数计算。

### “颜色的色域数组”应填什么？

本项目前端没有 `colorGamut` 或“色域数组”字段。后台若使用这一名称，先确认它要求的是色板、HSL还是RGB；以下是三类明确的数据，不能互换。

| 数据 | 类型与顺序 | 使用位置 |
| --- | --- | --- |
| `hexPair` | `string[2]`，`[darkHex, lightHex]`，sRGB | 配色参考；UI渐变按light到dark显示 |
| `hsl` | `number[3]`，`[H, S, L]`，H为度，S/L为0～100 | 由深色HEX转换的默认值；作品拆成三个具名字段 |
| `darkRgb255 / lightRgb255` | `number[3]`，`[R,G,B]`，每项0～255 | 对接需要RGB的后台字段；不是Three线性RGB |

| 预设ID | 菜单名称 | darkHex | lightHex | 默认material |
| --- | --- | --- | --- | --- |
| purple | 焕新紫 | #57287f | #ad83c5 | 0 |
| red | 繁盛红 | #941c16 | #c94a33 | 0 |
| gold | 同心金 | #ffc643 | #ffc643 | 1 |
| blue | 开放蓝 | #124d80 | #75b4d0 | 0 |
| green | 共融绿 | #176647 | #82b89c | 0 |

例如同心金的默认HSL为 `[41.80851063829786,100,63.13725490196078]`。保存用 `appearance.hue / saturation / lightness`，不是把整个数组传给现有作品接口。调色后浅色按该预设原来的H/S/L差值联动，转换为sRGB，再由Three解码成线性颜色交给着色器；不能把两端颜色简单固定或把sRGB数值当作线性RGB。

数据契约支持 H=0～360、S/L=0～100；消费界面的明度滑块限制为20～65。导入作品时不得擅自把0～100裁成20～65。颜色面板坐标使用朝上的Y轴；中心饱和度为0，方形边缘饱和度为100，色相由方向角决定，中心保留原色相。作品存HSL，不存控件坐标。

颜色显示值是sRGB数据定义，不代表设备物理色域，也不保证屏幕截图与实际瓷器颜色一致。本文没有新增广色域配置协议。

### 材质该录入什么？

作品保存 `recipeVersion` 和 `appearance.material / materialX / relief`。这三个字段都是number，不是名称或百分数字符串。

| 字段 | 范围 | 默认 | 作用 |
| --- | --- | --- | --- |
| material | 0～1 | 金色1，其余0 | 二维控件纵轴t；金属度等于t，也影响中心粗糙度与清漆 |
| materialX | 0～1 | 0.5 | 横轴x；向左粗糙、向右光滑且清漆更强 |
| relief | 0～2 | 1 | 基础/清漆法线强度均为0.7×relief；消费者UI当前未暴露该滑块 |

当前配方 `porcelain-city-v6`：中心粗糙度 `r=0.31+(72/255−0.31)×t`；中心清漆 `c=191/255+(26/255−191/255)×t`。x<0.5时从中心向左端线性插值，x≥0.5时向右端线性插值。粗糙度左右端为0.75/0.08，清漆左右端为0/1。Excel九个点只是连续曲面的参考采样。

金线固定为 `#dcb251`、metalness=1、roughness=0.23、clearcoat=26/255。花纸由固定baseColor、normal和ORM表达；ORM的G是粗糙度、B是金属度。填色、金线、文字与固定花纸有不同规则，不能把一个全局材质值乘到整只杯子上。金属度、粗糙度、清漆等派生值无需另存到作品。

## 2. 实际录入与保存流程

1. 将 `releases/v7-1/`、`releases/v7-2/`、`releases/v7-3/` 三个目录上传COS，保留层级和哈希文件名。新版本复用旧文件，不能只上传v7-3。
2. 后台建立资源发布记录，保存releaseId、catalog/manifest路径、模型版本、配方版本。建立城市目录时录入 `cities[].extension`；建立配色目录时录入五套颜色及完整默认appearance。
3. 配置公开 `runtime-config.js` 的 bootstrapUrl、apiBase、assetBase。资源描述中的原始URL以manifest为基准解析；不要直接拼到网站根或把当前Netlify域名写死在业务数据里。
4. 前端初始化取得 `window.cupViewer` 后调用 `whenReady()`；从后台记录组装合法DesignConfig，用 `importDesign()` 应用。失败返回false时保留原作品，不将“选择中”状态当成已完成。
5. 保存前调用 `exportDesign()`。作品保存用户归属、标题、修订号和DesignConfig；登录归属由服务端可信会话确定。当前还在加载时导出会拒绝，应等待设计器就绪。
6. 还原使用保存的完整DesignConfig及其资源版本。清晰度、DPR、缓存、是否磨砂、设备内存提示均不存入作品。

完整默认作品在JSON的 `defaultDesign`，亦见 [example-design.json](https://github.com/Shuang-su/guangcai/blob/86e75755052cd80b56ddefdd237f5d90a7d0a2fb/guangcai-china-preview/integration/contracts/example-design.json)。接口最小示例：

```js
await viewer.whenReady();
const response = await fetch(apiBase + 'works', {
  method: 'POST', credentials: 'include',
  headers: {'Content-Type': 'application/json', 'Idempotency-Key': crypto.randomUUID()},
  body: JSON.stringify({title: '我的中国杯', design: viewer.exportDesign()})
});
if (!response.ok) throw new Error(`保存失败: ${response.status}`);
const work = await response.json();
const restored = await fetch(apiBase + 'works/' + work.id, {credentials:'include'});
if (!restored.ok) throw new Error(`读取失败: ${restored.status}`);
if (!await viewer.importDesign((await restored.json()).design)) throw new Error('资源未能完整应用');
```

更新使用 `PUT works/{id}` 并提交已读revision；409时先重新读取，不盲目覆盖。401按公司登录流程处理。mock仅为本地合成账号、内存存储，不能承担生产认证。分享是确定修订的快照，公开响应无账号归属，撤销后410。详细请求/响应以OpenAPI为准。

## 3. 后台配置能改变什么

| 操作 | 公司后台职责 | 当前前端/资源工程必须同步的部分 |
| --- | --- | --- |
| 选现有城市、祝福语、配色或保存用户参数 | 按现有ID和字段保存、返回合法DesignConfig | 调用importDesign；保留就绪与失败处理 |
| 换API/COS域名或子路径 | 配置三个公开地址、CORS、MIME和缓存 | 无需重画资源；检查相对路径与同源iframe/跨域桥 |
| 改菜单名称或顺序 | 可维护业务目录，但不会自动改变当前消费者菜单 | `consumer-panel.ts`、`city-catalog-v6.json`、`slogans.ts`仍在前端编译；同步UI和邻城预载顺序 |
| 新增城市 | 新ID与新资源发布记录 | 制作审核母版、三级mask/normal/thumbnail、manifest/catalog；更新城市目录、DesignConfig schema生成器及校验；验证预载预算 |
| 新增配色 | 新预设ID、深浅色和默认参数 | `palettes`、Palette类型、normalizeAppearance、菜单顺序/名称、schema生成器；自定义HSL使用现有preset即可，无需新增预设 |
| 新增祝福语 | 新ID和文案 | 使用授权字体/边框生成裁切R8和uvRect，更新目录、slogans及schema；重新核算预热占用 |
| 新资源/模型/配方版本 | 上传新目录，发布记录保持旧版本可查 | 当前client与mock有版本支持列表；同步兼容分支、契约及版本回放测试，不能只更改版本字符串 |

本次没有把静态菜单改成后台动态驱动，也没有新增数据库产品、后台框架或“导入Excel”接口。数据表中的映射对象可用于公司模板；接入代码最终应遵循现有资源与作品契约。

## 4. 资源字段的误用防护

- `bytes` 是文件体字节，下载按它和sha256校验；HTTP头与重试成本不在其中。
- HFN的 `decodedBytes/gpuBytes/channels=4` 描述原始RGBA16F。当前运行时保留XY的RG16F，每像素4字节，GPU含mipmap按4/3估算；Excel另列运行值。两者都不是Safari进程内存或机器剩余RAM。
- `uvRect=[u,v,width,height]` 为左下原点的归一化UV。atlas参数与每个档位绑定；完整固定花纸结构保留在JSON的 `fixed` 中。
- `.hfn.gz` 返回原gzip文件，MIME为 `application/octet-stream`，不要设置 `Content-Encoding:gzip`。数据WebP不要做有损转码、自动调色、尺寸变换。
- 可变bootstrap/runtime-config不长缓存；内容哈希资源长缓存且不可覆盖。旧作品引用的资源版本继续保留。

## 5. 再生成与核验

在 `guangcai-china-preview` 执行。普通应用构建不需要电子表格依赖，也不会运行这些导出工具。

```sh
npm run export:backend-data -- <已提交的资源源码SHA>
# 在具备 @oai/artifact-tool 的文档工具环境执行；指定其node_modules目录。
ARTIFACT_NODE_MODULES=/path/to/authoring/node_modules node tools/v7/export-backend-workbook.mjs
npm run check:backend-handoff
```

JSON导出直接调用项目的配色和材质函数，并用TypeScript AST读取UI字面量，不执行浏览器模块。来源文件必须与指定提交逐字节一致，否则导出拒绝。升级源码时指定新的真实提交；不能手改表格后仍保留旧来源SHA。

Excel使用Artifact Tool生成，保存后重新打开，对比每个表格单元格；长JSON保持合法文本，浮点完整值以JSON和单元格底层数值保存，材质九点表仅显示六位小数。构建缓存、渲染预览及Excel读回数据在 `.codex-work/tmp/backend-handoff/`；交接目录仅保留最终文件。验证脚本从已读回Excel取西安、开放蓝和自定义材质，实际调用mock保存、读取并校验隔离。

数据导出检查覆盖本轮配置与文档。历史V7浏览器性能证据见PERFORMANCE；iPhone 13 mini/iOS18连续30分钟、实体触感、Air/mini6的V7复测以及正式COS/账号联调仍待验收。

## V7.1.2 / v7-3 资源差异

六组文字改用思源宋体 CN Bold 700，与新SVG参考的字框和间距一致；每张288×936，4px护边，uvRect更新。六组R8含mipmap共2,156,544字节，运行时不下载字体。JSON typography保存字体版本、哈希、来源及母版。两个城市共六张mask替换：厦门树丛与西安小接缝只增加G覆盖；R描线、法线、缩略图均不变。共195项资源，其他项按相对路径复用。模型、配方、城市和配色ID及作品schemaVersion保持原值。旧作品使用原release，不能自动迁移到v7-3。

本次21张参考照片属于亚太地区杯款，并非23座国内城市的一一对应图；只作为填色表现参考。逐城判断与源哈希见 `evidence/v7.1.2/cities/review.json`。


---

# V7.1.2 性能机制与故障处理交接

本文件逐项说明消费者页面的运行机制、取舍、诊断与验证。当前代码沿用 V6.0.4 的几何、金线/配色/材质、杯壁局部反射、杯盖平面反射和触感输入路径。对应 Issue #29；本轮纠错证据在 `evidence/v7-corrections/`，V7.1.0 历史证据在 `evidence/v7-sync/`。自动化与实体设备验收分别记录。

后台录入先看 [配置表、JSON与字段映射](https://github.com/Shuang-su/guangcai/blob/86e75755052cd80b56ddefdd237f5d90a7d0a2fb/guangcai-china-preview/integration/backend-handoff/README.md)。V7.1.2沿用V7.1.1的运行策略；本轮回归见 `evidence/v7.1.2/qa/`，历史数字仍明确指向 `evidence/v7-corrections/`。桌面回归不构成真机验收。源码路径相对 `guangcai-china-preview/`。这些机制当前由前端实现，公司后端主要负责稳定的版本、资源字节与业务数据，不应另造一套下载/提清门槛覆盖它们。

## 1. 进入门槛：已下载与已显示是两件事

| 接入核对 | 具体实现与责任 |
| --- | --- |
| 触发 | 冷启动、重新加载；上下文恢复走第10节的轻量例外。 |
| 流程 | bootstrap→manifest→必要文件校验→解码上传→当前高清材质应用→模型与玻璃首帧→开放设计操作。 |
| 数据 | Bootstrap、ResourceManifest；LoadState的phase/receivedBytes/totalBytes/lastProgressAt/error。 |
| 阈值 | 23城轻量+缩略图、当前±1城高清、六文字；手机当前2048、桌面4096；不能设固定总秒数判失败。 |
| 失败与诊断 | phase=error保留重试入口；检查quality.cityTier与实际normal.width，下载100%不代表就绪。 |
| 源码 | `src/main.ts`、`src/resources/readiness.ts`、`src/ui/entry-loading.ts`。 |
| 历史验证 | `tools/v7/startup-qa.mjs`、`tools/v7/entry-qa.mjs`；`evidence/v7-corrections/startup/startup-qa.json`。 |
| 接入方 | 嵌入端等待whenReady；后端准确返回manifest和字节，不用自制进度条提前显示空杯。 |

1. 获取 bootstrap 与指定版本 manifest，校验版本、尺寸、字节数和编码约束。
2. 首先准备固定花纸轻量档、杯底标识、背景、当前城市与文字。设计区域在加载层下保持 `inert` 与透明，允许布局和玻璃预热，但用户看不到空杯。
3. 下载并 SHA-256 校验全部 23 城的轻量遮罩/法线和缩略图、六组裁切文字，以及当前城市和左右各一座的高清文件。文件预载仅进入压缩字节缓存，不把 23 城全部解码为 GPU 纹理。
4. 六组文字一次解码并上传。手机当前城市实际切到 standard（2048 宽），桌面切到 detail（4096 宽），等待材质替换、模型首帧与玻璃准备完成后才允许进入。
5. 上下文恢复例外：先用已经缓存的 light 重建，恢复可用后再升级，避免在恢复阶段集中分配高清资源。

加载页的总量/完成量来自本轮资源清单和实际流读取，不是时间动画。速度反映收到的文件字节；纹理/缓冲是工程估算，不是机器总内存。JS heap 仅在浏览器提供时显示，Safari 缺失时显示不可用，不伪造。完成下载仍可能处于解码、上传、反射生成和首帧阶段。

**纠错**：7.1.0 只保证高清文件预载，主视角仍等近看才尝试显示，预算又可能拒绝升级。7.1.1 的门槛明确包含当前城市高清材质已应用；回归同时检查 `quality.cityTier` 与实际 normal.width，不能只看请求成功。

入口：`src/main.ts` initialize、`resources/readiness.ts`、`ui/entry-loading.ts`。嵌入端使用 `whenReady({signal})` 或 `onLoadStateChange`；不另设固定总加载秒数冒充失败。

## 2. 城市切换与动态相邻预载

| 接入核对 | 具体实现与责任 |
| --- | --- |
| 触发 | 当前城市变化、选择稳定，以及初始化后预载。 |
| 流程 | 取消旧邻城任务→优先当前城→预载左右各一城→按预算解码→整组替换；首尾环绕。 |
| 数据 | 城市ID、light/standard/detail的mask/normal、当前选择的appearance；预载仅保留编码文件。 |
| 阈值 | 稳定约350ms自动升级；手机2048、桌面4096；每侧1个邻城。 |
| 失败与诊断 | 保留当前可用材质；过期结果释放。查看debug().preload、quality.error及解码阶段。 |
| 源码 | `src/resources/preload.ts`、`src/styles/city-artwork.ts`、`src/main.ts` warmNeighbors/upgradeQuality。 |
| 历史验证 | `tools/v7/preload.test.ts`、`tools/v7/city-glass-qa.mjs`；`evidence/v7-corrections/city-webkit/report.json`。 |
| 接入方 | 保留目录ID和顺序；换菜单顺序须同步前端。不得把预载全城误实现为全城GPU常驻。 |

- 城市顺序与选择器一致，首尾环绕。每次选中当前城市后，旧邻城任务取消，先确保当前高清文件，再预载左/右各一城。手机“高清”指 2048，桌面指 4096；不把所有 4096 常驻。
- 已缓存的低清可先完成切换；稳定约 350ms 后自动切到当前高清，主视角也升级。近看/缩放只额外决定固定花纸区域是否升级，不再是城市高清的必需条件。
- 高清候选完整下载、哈希、解码和尺寸检查后，整组材质一次替换。失败或被新选择取消时保留已有可用图；调色、材质、文字参数不会因提清改变。
- 最新选择获胜，过期请求和排队任务取消。无法打断的结果返回后释放，不反向覆盖新城市。
- 文件预载不等于 GPU 预热；相邻城市首次显示仍有解码/上传成本。低清切换和高清完成耗时分别记录，不能把低清响应时间称为高清完成。

入口：`resources/preload.ts`、`styles/city-selection.ts`、`styles/city-artwork.ts`、main warmNeighbors/upgradeQuality。`debug().preload.neighborCity/neighborError`、`quality.error` 可定位重试或预算拒绝。

## 3. 清晰度与固定图集

| 接入核对 | 具体实现与责任 |
| --- | --- |
| 触发 | 发布资源时生成各档；运行时近看/缩放检查可见部件质量。 |
| 流程 | 母版分区缩放与护边重建→带atlas参数发布→选择部件档位→验证后替换。调色只改uniform。 |
| 数据 | 城市RG遮罩；固定baseColor、normal、ORM；atlas的rows/contentWidth/contentHeight/gutter。 |
| 阈值 | 城市宽1024/2048/4096；消费者不加载原始8K花纸；档位遵守预算。 |
| 失败与诊断 | 预算不足保留现有档位；尺寸/哈希错误拒绝。接缝排查UV、gutter和档位一致性。 |
| 源码 | `tools/v7/compile-resources.mjs`、`src/resources/quality.ts`、`src/materials/fixed-atlas.ts`。 |
| 历史验证 | `tools/v7/validate-resources.mjs`；`evidence/v7-corrections/validation.json`；母版与视觉对比另见相应证据。 |
| 接入方 | COS原样托管数据贴图与参数，禁用自动有损转码/缩放；更新资源必须新版本。 |

城市展开宽度为 1024/2048/4096；固定花纸按最大边长分三级。花纸每个分区单独缩放、重建复制护边，再更新 atlas 参数，避免直接缩整张图造成分区串色与法线接缝。消费者不加载原始 8K 母版。

颜色/结构遮罩为 WebP；城市 R 是金线、G 是覆盖区域，颜色和材质由参数着色。固定花纸粗糙度存 G、金属度存 B，共用 ORM；金底校正同样读取 B。消费者颜色变化不生成新图片。

近看花碟只申请对应花碟档位；近看把手申请把手及相连杯身饰带。先核算候选常态占用，超预算延后升级并保留已有图，不通过回退城市高清来腾空间。光照/两类反射继续保留。

## 4. 高精度法线：磁盘 RGBA16F，运行时 RG16F

| 接入核对 | 具体实现与责任 |
| --- | --- |
| 触发 | 法线候选进入单Worker解码队列。 |
| 流程 | 校验压缩字节→按声明长度解压→校验HFN头/尺寸/数值→保留半浮点XY→基础与清漆法线重建正Z。 |
| 数据 | HFN1 gzip：16字节头+bottom-up RGBA binary16；清单通道4，运行RG16F通道2。 |
| 阈值 | 源8字节/像素、运行4字节/像素；mipmap乘4/3；不是转8位。 |
| 失败与诊断 | 长度/哈希/HFN/负Z非法拒绝；inflate长期不回复按第6节终止；检查decodeTask.phase。 |
| 源码 | `src/resources/decode.worker.ts`、`inflate.ts`、`hfn.ts`、`texture-budget.ts`、`src/materials/packed-normals.ts`。 |
| 历史验证 | `tools/v7/packed-normals.test.ts`全部78项解压/XY位值及角度验证；线上逐城检查无重试见online/report.json。 |
| 接入方 | 不解包、不重压缩或转格式；HTTP不给Content-Encoding:gzip；按清单保留原字节。 |

HFN1 gzip 文件及来源哈希保持完整。Worker 用固定版本 fflate 解压器按清单长度预分配输出；SHA-256、gzip声明长度、HFN头/尺寸/值范围均校验。运行时只保留原始半浮点X/Y，Three的RG法线分支重建正Z；清漆法线也在强度缩放之前重建Z，保留既有图集UV修正。

每个法线像素GPU和保留CPU数据从8字节降到4字节，GPU mipmap估算乘4/3。XY没有转为8位。manifest `decodedBytes/gpuBytes` 仍描述文件RGBA源表达；运行时使用 `texture-budget.ts` 按实际RG16F估算，二者不能混淆。

78张各档法线逐字节验证：固定解压器输出与Node原生gzip完全相同；XY半浮点位值完全相同；重建方向与归一化原法线最大差约 **0.081835°**。这不是最终渲染像素完全相同声明，mipmap/强高光仍需画面回归。负Z或非法值拒绝，不默默翻面。

**真实停等修复**：WebKit逐城回归记录到文件缓存完整、网络空闲，但 `decodeTask.phase=inflate` 持续停留，Worker超时重试后仍可能停等。原生 `DecompressionStream` 从正式Worker路径移除，使用Three锁定依赖附带的fflate，仍在单个可终止Worker执行。改后WebKit逐城高清、快速切换、版本回放通过。排查中的RGBA8编码候选未采用；不能把早期测试服务旧清单/自动化等待问题误判成GPU格式缺陷。

入口：`decode.worker.ts`、`inflate.ts`、`texture-budget.ts`、`materials/packed-normals.ts`；测试 `packed-normals.test.ts` 检查全部资源解压/精度、长度拒绝和图集清漆重建。

## 5. 祝福语：裁切 R8，不在切换时画整张 4K

| 接入核对 | 具体实现与责任 |
| --- | --- |
| 触发 | 首屏准备六组遮罩；文字选择变化时更换已持有引用。 |
| 流程 | 构建时字体+SVG边框光栅化→裁字框→记录UV→一次上传六组→切换纹理/参数。 |
| 数据 | WebP线性遮罩，GPU R8；uvRect=[u,v,width,height]，左下原点归一化坐标。 |
| 阈值 | 4px护边；六组含mipmap约2.06MiB；不保留六张完整4K展开图。 |
| 失败与诊断 | 首屏遮罩失败保留加载错误；字框错位查UV，字形变化查母版/字体/裁切，不重画运行时Canvas。 |
| 源码 | `tools/v7/build-slogan-masters.py`、`tools/v7/compile-v7-3.mjs`、`src/materials/city-parametric.ts`、`src/main.ts` sloganLeases。 |
| 历史验证 | `tools/v7/validate-resources.mjs`六组裁切像素比对；浏览器文字切换见chrome/report.json、webkit/report.json。 |
| 接入方 | 后台保存sloganId并发布对应遮罩/UV；新祝福语需走编译与前端白名单更新，不能只返回文案。 |

v7-3字形/边框来自新的字体与 SVG 制作母版，运行时使用构建出的遮罩，不直接渲染 SVG。只保留实际字框包围区域和 4px 护边；`uvRect` 把它定位回杯身 4096×1783 原展开坐标。六组文字合计约 2.06MiB GPU（含 mipmap），首屏统一上传，切换只替换已持有纹理/均匀参数。无整张展开画布重绘、无重复反射捕获。v7-1/v7-2保留旧字形。v7-3更换为思源宋体 CN Bold 700，按新SVG参考重建矢量字框和四行字心，六张均288×936，含mipmap共2,156,544字节；字体仅用于制作，消费者不下载字体，菜单标签仍是原DOM文字。

入口：`compile-resources.mjs`、`city-parametric.ts`、main sloganLeases；`validate-resources.mjs` 检查六组裁切像素。

## 6. 队列、取消与下载容错

| 接入核对 | 具体实现与责任 |
| --- | --- |
| 触发 | 图片、法线请求或解码入队；切城/销毁/后台时取消或暂停。 |
| 流程 | 共享网络队列→精确字节读取/校验→单解码任务→完成后交付；取消贯穿排队、退避与结果释放。 |
| 数据 | ArrayBuffer与描述中的bytes/sha256；HTTP状态、AbortSignal、Worker消息。 |
| 阈值 | 请求2、解码1；下载120秒无非空数据进度；网络/408/429/5xx最多3次，退避400/800ms；Worker15秒无回复只重试1次。 |
| 失败与诊断 | 404/哈希/长度/主动取消不重试；后台不计无进度超时；不要把持续大文件下载当超时。 |
| 源码 | `src/resources/queue.ts`、`download.ts`、`pool.ts`、`decode.worker.ts`、`src/styles/download-bytes.ts`。 |
| 历史验证 | `tools/v7/download.test.ts`、`runtime.test.ts`；`evidence/v7-corrections/retry/report.json`。 |
| 接入方 | 缺文件正确返回404而非SPA HTML；服务器支持稳定流式传输；网关超时策略配合持续下载。 |

网络并发 2，解码并发 1；图片与法线共享额度。法线 SHA-256、固定解压器解压和验证在 Worker；精确长度读取直接拷入预分配缓冲，避免末尾再合并整份大文件。Worker 15 秒无回复会终止并仅重试一次；主动取消不重试。

文件下载沿用 V6.0.4 的 **120 秒无进度**期限：每个非空数据块重置计时，持续下载可超过120秒总时长；空块不续期。后台暂停时不计闲置超时，返回前台重置。网络错误、408/429/5xx 最多3次，400/800ms退避；404、错误长度、哈希失败直接报错。取消也结束排队和退避，不把取消当故障重新下载。

法线 URL 的 `.hfn.gz` 是应用协议容器：HTTP 必须返回原 gzip 字节，`Content-Type: application/octet-stream`，**不设置 Content-Encoding:gzip**，避免 CDN/浏览器透明解压后哈希与长度不符。Vite、mock 与 COS 配置说明一致。

## 7. 两层缓存与替换峰值

| 接入核对 | 具体实现与责任 |
| --- | --- |
| 触发 | 资源入缓存、申请GPU候选、替换、释放、临时反射分配。 |
| 流程 | 预留在途成本→检查常态/事务峰值→引用计数与LRU→整组交换→释放旧引用→回落预算。 |
| 数据 | 文件编码字节、实际纹理格式+mipmap、受管渲染目标；CPU临时内存单列。 |
| 阈值 | 编码手机12/桌面24MiB；GPU常态128/256MiB、峰值192/384MiB。 |
| 失败与诊断 | 淘汰闲置与拒绝非必要升级；异常/取消也结束beginSwap事务；不是浏览器总RAM承诺。 |
| 源码 | `src/resources/encoded-cache.ts`、`pool.ts`、`texture-budget.ts`、`src/main.ts`。 |
| 历史验证 | `tools/v7/runtime.test.ts`、`glass-policy.test.ts`；city-webkit/report.json和performance/report.json。 |
| 接入方 | 不另缓存已解码的23套全城纹理；不把后台图片压缩率等同于GPU占用降低。 |

| 层 | 手机 / 桌面额度 | 内容 | 淘汰与释放 |
| --- | --- | --- | --- |
| 压缩文件 | 12 / 24 MiB | 已校验 WebP/HFN；预留排队及在途字节 | 固定轻量、23城轻量、文字和缩略图固定保留；邻城高清按最近使用淘汰 |
| GPU 纹理与受管渲染目标 | 常态128 / 256 MiB；峰值192 / 384 MiB | 当前图、候选图、反射/阴影/画布/玻璃 | 引用计数+字节预算；淘汰同时 texture.dispose、ImageBitmap.close、清空CPU数据引用 |

两种额度不能相加冒充进程内存限制。还存在 CPU 解压临时数据、几何/程序、DOM/CSS、图片解码、驱动与浏览器缓冲，应用无法完整测得；`decodedBytes` 和玻璃 CPU 字节单列。Safari 进程上限没有公开可依赖的查询。

**切城误降级修复**：旧实现把旧城市+候选城市的短暂叠加按128MiB常态判断，触发会话永久磨砂。现在材质事务 `beginSwap()` 标记替换期间，允许到192MiB峰值，结束后释放旧引用并裁剪回常态。峰值仍始终检查，取消/异常也必须结束自己的事务。

## 8. 反射、阴影、环境和按需渲染

| 接入核对 | 具体实现与责任 |
| --- | --- |
| 触发 | 相机、器件或实际影响捕获结果的材质变化；静止/后台退出连续绘制。 |
| 流程 | 标记失效→必要时重捕获→复用环境与模型纹理→动画完成停绘；截图显式绘制后立即读取。 |
| 数据 | 局部反射、杯盖平面反射、PMREM颜色、阴影和玻璃临时目标，不是后端图片接口。 |
| 阈值 | 512局部探针、1024盖面；反射临时预留约66MiB，生成后释放PMREM深度约9MiB。 |
| 失败与诊断 | 检查目标生命周期和预算；preserveDrawingBuffer=false时直接读未重绘画布可能为空。 |
| 源码 | `src/main.ts`、`src/studio/local-reflections.ts`、`src/studio/lid-reflections.ts`；具体失效调用由main统一安排。 |
| 历史验证 | Chrome/WebKit画面、空闲渲染与capture检查；`evidence/v7-corrections/chrome/report.json`、webkit/report.json。 |
| 接入方 | 使用viewer.capture；保留页面可见性和失效调度，不加永久requestAnimationFrame驱动整个模型。 |

- 保留512局部杯壁探针和1024杯盖平面反射。相机/器件/可见材质真正影响结果时更新；杯壁在局部探针捕获时本来隐藏，切换其城市/文字不再重复捕获。
- 环境 PMREM 生成需要深度，生成后用同格式 GPU 纹理复制保留颜色并释放原深度附件，三份静态环境约省9MiB。保留反射色彩和半浮点精度。
- 生成局部反射的66MiB临时预留与新旧贴图一起核算；捕获前暂时释放可重建的玻璃中间缓冲，捕获后再建。
- 静止、自动旋转关闭、动画完成后停止模型与玻璃重复绘制；UI变化可以复用已捕获模型图。先同步绘制模型再取其画布，避免 `preserveDrawingBuffer=false` 时拿到清空帧。
- 消费者关闭 preserveDrawingBuffer。导出接口显式绘制后立即捕获。
- 后台停止RAF、暂停非必要队列；恢复时重置帧耗计时。

## 9. 液态玻璃保留和回退条件

| 接入核对 | 具体实现与责任 |
| --- | --- |
| 触发 | 初始尝试液态；分配预算、持续前台活动帧耗或上下文错误改变策略。 |
| 流程 | 手机独立WebGL2合成→复用模型捕获→先清闲置缓存/降低主DPR→持续不足才回退原生磨砂。 |
| 数据 | glass.backend/error/memory、资源预算、活动帧P95；缺失deviceMemory为null。 |
| 阈值 | 玻璃DPR≤1.25；主DPR初始1.5、1～2、步长0.25；连续两个2秒窗口P95>约33.83ms。 |
| 失败与诊断 | 加载/切换/解码/近看升级/静止/后台不计入持续帧耗；回退本会话锁定，重进再尝试。 |
| 源码 | `src/resources/glass-policy.ts`、`src/ui/glass-studio.ts`、`src/main.ts`。 |
| 历史验证 | `tools/v7/glass-policy.test.ts`、`glass-qa.mjs`、`city-glass-qa.mjs`；liquid/liquid-qa.json与逐城报告。 |
| 接入方 | 不按iPhone型号或Safari无内存接口强制磨砂；新UI合成层需重新核算帧耗与缓冲预算。 |

手机 WebKit 使用独立 WebGL2 光学合成，保留材质图、嵌套折射、裁剪与 V6 收起动画。玻璃输出上限1.25 DPR；DOM文字保持设备原生清晰度。背景只上传当前可见的1 CSS像素裁切，不再上传大量屏外区域；主背景仍使用原图。UI-only帧复用模型纹理；材质图按可见使用加载并限制解码缓存。

降级判断依据实际受管分配估算和前台持续帧耗，不按 iPhone型号/iOS版本禁用，也不把 `navigator.deviceMemory` 缺失当低内存。该接口即使存在也是粗粒度提示，不是可用RAM。

1. 分配超预算先淘汰闲置纹理、降低主画面DPR（手机初始1.5，范围1～2，步长.25）。
2. 高清升级先检查预算；放不下就保留已有清晰度。
3. 最低DPR仍无法容纳真实常态/峰值，或连续两个2秒前台活动窗口 P95 超过约33.83ms，回退原生磨砂。
4. 初始加载、资源切换/解码、近看升级、静止与后台不计入持续交互帧耗窗口。孤立慢帧不直接触发。
5. WebGL丢失也进入可交互磨砂；本次会话锁定，防止来回抖动。重新进入页面再尝试液态。

必须同时观察 `glass.backend/error/memory` 与 `resources`。`webgl2-isolated` 表示手机光学层、`webgl2` 表示桌面路径、`native-backdrop` 表示回退。不能仅凭CSS class存在就声称折射有效；测试有像素位移、嵌套、裁剪和首帧检查。

## 10. 上下文丢失与重建

| 接入核对 | 具体实现与责任 |
| --- | --- |
| 触发 | WebGL上下文丢失/恢复事件。 |
| 流程 | 保存成功应用的作品参数与版本→取消过期任务并释放GPU→显示准备层→重建轻量资源/反射→恢复后提清。 |
| 数据 | DesignConfig、已验证编码文件；旧WebGL对象不可复用。 |
| 阈值 | 从light开始而非一次申请全部高清；仍遵守128/192MiB手机预算及请求/解码限额。 |
| 失败与诊断 | 继续显示错误与重试；玻璃可磨砂；检查恢复首帧，不露出半完成空杯。 |
| 源码 | `src/main.ts`上下文事件、`src/resources/readiness.ts`、`pool.ts`。 |
| 历史验证 | 故障注入与恢复场景见 `evidence/v7-corrections/retry/report.json`；不能代替真实Safari内存终止测试。 |
| 接入方 | 不因事件清空后台作品，不偷偷换最新资源版本；容器保留加载/重试状态。 |

保存的是当前作品参数和资源版本。丢失时取消过期资源、清空GPU租约及渲染目标、遮挡设计并重新进入准备状态。恢复时先重建轻量花纸/城市/环境及两种反射，再自动提清；不会马上解码所有最高档。六组文字恢复后仍可直接切换。失败继续保留加载错误和重试入口，不能露出半完成空杯。

## 11. 城市填色修正、资源版本与旧作品回放

| 接入核对 | 具体实现与责任 |
| --- | --- |
| 触发 | 发布确认的填色/字形修正，或导入指定旧release的作品。 |
| 流程 | 独立修正层派生三级G与新文字→v7-3清单→未变资源引用旧版；导入按作品release加载。 |
| 数据 | 修正SVG、mask哈希、sourceSha256；R金线和HFN法线保留。 |
| 阈值 | v7-3新增两城6个mask和6组文字；旧v7-1/v7-2不覆盖；未知版本明确拒绝。 |
| 失败与诊断 | 找不到旧目录会404；检查manifest相对路径、源/派生哈希与填色点。 |
| 源码 | `tools/v7/compile-v7-3.mjs`、`build-fill-corrections.py`、`src/resources/client.ts`、`design.ts`、`tools/v7/mock-server.ts`。 |
| 验证 | 本轮 `evidence/v7.1.2/resource-validation.json`、`qa/city-webkit/report.json` 三版本回放；旧西安大补面证据仍保留在v7-corrections。 |
| 接入方 | 保留三个目录和历史作品引用；新资源版本同步白名单、契约及兼容分支，先上传校验再切入口。 |

v7-2 只替换西安三个清晰度的填色 G 通道：塔下两层、檐口接缝、右侧山坡和城墙漏填。源 PNG、V6 SVG、所有 R 金线和 HFN 法线保持字节不变；可审查补面为 `assets/masters/v7/xian-fill-correction.svg`，生成器 `patch-xian.mjs`，记录源哈希与修正哈希。每档验证原漏填点变满、外部天空不变、其他通道不变。

v7-1 的 catalog/manifest/资源不覆盖。v7-2 的其他资源引用 `../v7-1/`，避免复制整包。导入 DesignConfig 按指定发布版本加载对应 manifest；mock也校验该版本。旧作品保持v7-1的外观，新作品默认v7-3。未知版本明确拒绝，不能静默用最新资源替换。线上需同时发布v7-1、v7-2、v7-3三个目录。基础编译器遇到已经存在的v7-1目录入口会拒绝覆盖；常规build不编译资源。制作新资源版本时要先定义新releaseId和审核修正层，再生成新清单，不能直接重跑冻结的母版编译覆盖已发布入口。

v7-3继续复用旧资源，只新增6张文字遮罩与厦门/西安各3张城市遮罩。先扫描所有23城各档G通道的封闭空点和列间空隙，再按原稿逐城人工判断；不能把天空连通的开口一律填满，也不能按高度扫涂。厦门确认树丛轮廓开口，西安确认右城墙3处微小接缝。修正层分别为 `assets/masters/v7.1.2/xiamen-coverage-correction.svg`、`xian-coverage-correction.svg`，仅在其足迹内取G通道最大值。三级R/B逐像素不变、法线和缩略图哈希不变，304项原稿/旧版本保护文件逐字节通过。来源与每城判断见 `evidence/v7.1.2/cities/review.json`，校验入口 `tools/v7/validate-v7-3.mjs`。

v7-2是上一轮西安大补面；v7-3当前发布流程为新修正层→v7-3清单→同步client/mock/schema白名单→新旧三版本回放。后台保存作品release不变；缺少旧版文件时明确失败，不用最新图片顶替。

## 12. 部署与验收边界

| 接入核对 | 具体实现与责任 |
| --- | --- |
| 触发 | 静态部署到COS、接公司身份/API、保存/还原/分享，或更新资源入口。 |
| 流程 | 上传资源并核验→配置公开地址和响应头→切bootstrap→验证就绪/保存/旧版/分享；归属从服务端会话取得。 |
| 数据 | Bootstrap、DesignConfig、ResourceManifest、OpenAPI；本次Excel/JSON只提供映射参考。 |
| 阈值 | 哈希URL长期immutable；bootstrap/runtime-config不长缓存；有凭据API精确Origin，公开资源可*。 |
| 失败与诊断 | 401登录、409修订/幂等冲突、410已撤销；缺资源404；检查CORS/MIME/字节而非盲目重试。 |
| 源码 | `integration/contracts/`、`src/resources/client.ts`、`tools/v7/mock-server.ts`、`tools/v7/split-qa.ts`。 |
| 历史验证 | `evidence/v7-corrections/split/report.json`、handoff-verification.json、online/report.json；本轮数据证据见backend-handoff/verification.json。 |
| 接入方 | 公司负责正式身份、数据库、权限、CDN和上线联调；删除生产mock入口。真机30分钟与COS时延另验，不把Netlify/桌面模拟数字当生产承诺。 |

公司 COS/CDN 接入只替换公开 bootstrap/API/assetBase 配置。不可变哈希资源长缓存；bootstrap与runtime-config可更新且不长缓存。配置 CORS、Timing-Allow-Origin、MIME 与上面的 gzip规则；有 Cookie 的业务 API 只允许明确 Origin，不用 `*`。

保存仅提交 DesignConfig 和版本引用，不保存清晰度、DPR、缓存或设备档位；归属从公司服务端登录会话取得。账号、修订、409并发、幂等、分享快照、撤销及匿名数据最小化见交接主文档/OpenAPI；模拟登录仅供本地。

全部低清+邻城高清策略会增加首次字节数。原5MiB/6秒目标不得标为通过；10Mbps/100ms条件与当前15秒工程观察线分别报告。Netlify跨地区等待不等于COS效果。桌面Chrome/WebKit模拟并不证明iPhone进程内存、真实30fps或马达触感。

仍需实体 iPhone13mini/iOS18 连续30分钟（23城、6文字、近看、旋转、拆解、快速切换、前后台）以及用户Air/mini6上的V7复测。V6在后两台设备的用户确认不能代替V7验收。生产COS和正式后端联调留在上线阶段。


### V7.1.1 已记录的本地结果

45基础+31V7单元、195资源、六组文字像素；Chrome/WebKit各85项应用/联调、各24次高清城市检查及快速切换/双版本回放；玻璃53、加载50、故障恢复、三Origin子路径六条均通过。10Mbps/100ms三轮13.595–13.604秒、每轮12,132,070传输字节；资源清单91项10,928,395字节。初始纹理约27.41MiB，375×812常态图形约122.68MiB，记录峰值191.87MiB。帧间隔P95 16.8ms仅是M1 Pro桌面模拟。真机仍pending。


### V7.1.2 本轮验证（2026-10-18）

源码与字形数据基线 `3dee2885886faf4b42f01618593ced0e69b964be`。基础45项、V7 31项、195资源与304个保护文件通过；Chrome/WebKit各85项应用/联调、各24次高清切城及快速切换/三版本回放通过；液态玻璃53项、入口50项、故障恢复、三Origin子路径6项以及新字形/两城纯金与彩色固定相机17项通过。结果在 `evidence/v7.1.2/verification.json` 及其报告链接。

10Mbps/100ms三轮冷启动13.390～13.461秒，每轮12,106,184传输字节，工程15秒观察线通过，原5MiB/6秒目标未达到。清单预载91项10,902,597字节。初始纹理28,742,320字节、渲染目标预留99,890,004字节，合计约122.67MiB；观察峰值201,188,680字节（191.87MiB），属于应用估算，不是Safari进程RSS。帧间隔P95约16.8ms来自M1 Pro桌面Chrome，不能代替实体手机验收。新字体遮罩总GPU含mipmap2,156,544字节，未增加消费者字体请求。

后台Excel/JSON当前为v7-3：23城、5配色、6文字、195资源，完整读回相等、HSL独立公式、材质9点、边界拒绝以及从表格取配置进行mock保存/还原/账号隔离全部通过。正式COS、iPhone30分钟与Air/mini6本轮复测仍待验收。

