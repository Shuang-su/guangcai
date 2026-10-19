# 后台同事从这里开始

2026-10-19 V7.1.4说明：应用bootstrap现为 `v7-5`（23城描线与底部更新；文字/字框沿用v7-4）。此目录既有Excel/配置JSON保留为V7.1.3/v7-4历史导出，不能直接当作v7-5最新资源表；接入时以版本化bootstrap/catalog/manifest及更新的作品Schema为准。新增浏览入口 `/city-compare/`、`/bezier-lab/` 属本站查看页，不改公司身份/数据库/COS接入契约。

适用版本：V7.1.3，默认资源 `v7-4`，兼容旧作品 `v7-1`、`v7-2`、`v7-3`。精确数据基线见 JSON 的 sourceCommit 和 sources。本包是现有配置的数据字典和映射参考；公司尚未提供后台模板，因此不声称可直接导入公司管理后台。

- [Excel 配置表](V7后台配置数据表.xlsx)：六张表，包含23城、五套配色、材质参数、六组祝福语和195项资源。
- [完整 JSON](backend-config.json)：与Excel同源，保留数值精度、来源提交及哈希，便于程序读取。
- [本轮验证记录](verification.json)：导出一致性、资源文件哈希、Excel读回、参数边界及模拟接口保存/还原结果。
- [逐项性能实现](../PERFORMANCE.md) · [接口与部署](../README.md) · [OpenAPI](../contracts/openapi.json) · [作品 Schema](../contracts/design.schema.json) · [资源 Schema](../contracts/resource-manifest.schema.json)。

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

1. 将 `releases/v7-1/`、`releases/v7-2/`、`releases/v7-3/`、`releases/v7-4/` 四个目录上传COS，保留层级和哈希文件名。新版本复用旧文件，不能只上传v7-4。
2. 后台建立资源发布记录，保存releaseId、catalog/manifest路径、模型版本、配方版本。建立城市目录时录入 `cities[].extension`；建立配色目录时录入五套颜色及完整默认appearance。
3. 配置公开 `runtime-config.js` 的 bootstrapUrl、apiBase、assetBase。资源描述中的原始URL以manifest为基准解析；不要直接拼到网站根或把当前Netlify域名写死在业务数据里。
4. 前端初始化取得 `window.cupViewer` 后调用 `whenReady()`；从后台记录组装合法DesignConfig，用 `importDesign()` 应用。失败返回false时保留原作品，不将“选择中”状态当成已完成。
5. 保存前调用 `exportDesign()`。作品保存用户归属、标题、修订号和DesignConfig；登录归属由服务端可信会话确定。当前还在加载时导出会拒绝，应等待设计器就绪。
6. 还原使用保存的完整DesignConfig及其资源版本。清晰度、DPR、缓存、是否磨砂、设备内存提示均不存入作品。

完整默认作品在JSON的 `defaultDesign`，亦见 [example-design.json](../contracts/example-design.json)。接口最小示例：

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


## V7.1.3 / v7-4 花纸映射与补洞

`ResourceManifest.fixedMapping`为可选字符串，只接受`source-layout-v3`和`source-layout-v4`。缺省为v3；v7-4明确声明v4。它属于资源发布，不属于DesignConfig，也不是后台随意切换花纸方向的开关。v4将三部件颜色、ORM、基础/清漆法线的逻辑U统一为`1-(u+offsetU)`，杯身花纹纵向改为`(y-0.12)/(height-2.42)`，材质覆盖下沿至0.12mm。杯碟先变换逻辑U，再按图集分区采样。法线切线基使用变换后UV，不要再翻法线X。

新增9个杯身资源，轻量425×1024、标准850×2048、细节1024×2466；总描述仍195项。把手、杯碟、城市、祝福语均引用旧文件。两处源图孔位由独立遮罩填金，保留白花瓣和彩绘及模型白瓷连接件。JSON新增`fixedMapping`、`fixedCorrection`、`handleDimensions`交接说明字段，不改变HTTP返回结构。详见[evidence/v7.1.3](../../evidence/v7.1.3/README.md)。

跨版本导入时，前端暂时锁定编辑和导出，保留旧资源租约，新花纸/当前高清城市/六组文字/标识全部就绪后提交。中途失败恢复旧版本及作品，WebGL丢失则取消候选，从最后已提交版本轻量恢复。并发importDesign明确拒绝，调用方应等待Promise后再继续；onDesignChange只通知完整已提交作品。后台必须保留作品原releaseId，不能保存时强制改为最新。资源清晰度、缓存、设备能力和映射不另写入作品。

把手模型核查：名义宽14mm，含金边14.90mm，外廓伸出37.44mm，上下连接中心高89.095/33.475mm（从杯底计），中心距55.62mm。把手轴对杯身居中；相对旧57°花纹中心偏1.126mm。把手主带和连接点不调整；按追加反馈仅补足上连接白瓷下沿（lowerHaunch 2.5→5mm，旧版本恢复原形状）。数据为模型计算，非生产测量。

杯碟近看提清补充：固定部件近看时城市最高standard，桌面也按原预算降低DPR以留出高清花纸空间；底部标识启用各向异性过滤。详见性能文档的V7.1.3追加反馈段。
