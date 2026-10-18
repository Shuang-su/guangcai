> 当前实现：V7.1.2 / 默认资源 v7-3。[逐项性能机制与故障处理](PERFORMANCE.md) 是交接必读，覆盖高清显示、邻城预载、祝福语、预算、液态降级、上下文恢复和旧版本回放；如以下历史策略描述冲突，以该文档为准。

# V7 资源与模拟接口交接

**后台同事从这里开始：[配置表与完整录入说明](backend-handoff/README.md)**，包含 [Excel](backend-handoff/V7后台配置数据表.xlsx)、[JSON](backend-handoff/backend-config.json) 和 [本轮验证](backend-handoff/verification.json)。城市拓展为JSON引用对象；深浅HEX数组与HSL数组分开说明；材质保存二维参数和配方版本。新增菜单内容仍需同步前端白名单，不能只在后台新增一行。

这里提供现有资源的部署结构、加载协议和可运行的联调参考。正式登录、数据库、业务界面与生产服务由接入方按自己的技术栈实现。

## 本地运行

在 `guangcai-china-preview` 目录执行：

```sh
npm ci --cache .codex-work/cache/npm
npm run build:integration
npm run mock:v7
```

联调产物位于 `.codex-work/deploy/v7-integration/`。访问 http://127.0.0.1:5271/integration/ 。选择 Alice，调整杯子，保存作品；刷新后还原；创建分享后在匿名窗口打开，仍能旋转、近看。切换 Bob 看不到 Alice 的作品。后续编辑不改变已分享快照，撤销后原分享返回 410。

服务只绑定 127.0.0.1，身份为演示 Cookie，数据只在内存，重启清空。`/mock/session` 不应接到生产账号系统。无需 API Key、第三方账号或数据库。

## 独立静态部署

```sh
npm run build
```

产物为 `.codex-work/deploy/v7-build/`，仅含消费者入口、运行代码、195 个资源、目录、静态 bootstrap、背景与图标。上传该目录即可，不需要先启动 mock。`npm run build:audit` 单独生成开发与审计入口，保留旧素材用于比较，不混入消费者发布包。`npm run textures:v7` 只有资源变动时才执行；普通构建不会重新生成或改写原稿。

部署前修改产物的 `runtime-config.js`，所有地址都是公开配置，不放令牌：

```js
window.GUANGCAI_CONFIG = {
  bootstrapUrl: '/api/v1/bootstrap',
  assetBase: 'https://cdn.example.com/cup/',
  apiBase: '/api/v1/'
};
```

省略配置时，前端读取应用根路径下 `api/v1/bootstrap.json`。bootstrap 内的 catalog/manifest 地址相对 `assetBase`（默认应用 base），manifest 内资源 URL 相对 manifest 自身位置。保持 `releases/v7-1/`、`releases/v7-2/`、`releases/v7-3/` 目录结构即可换域名；v7-3按相对URL复用旧版未变资源。不要把路径写成制作机器上的绝对文件路径。

子路径示例：

```sh
APP_BASE=/cup/ npm run build:integration
MOCK_BASE=/cup/ PORT=5273 npm run mock:v7
```

访问 http://127.0.0.1:5273/cup/integration/ 。公司可以将 `/api/v1/bootstrap` 接真实接口，也可以继续使用生成的静态 JSON。两者返回同一数据形状。

## 资源结构与通道

- `releases/v7-3/catalog.json`（当前；v7-1、v7-2目录保留旧作品回放）：23 个城市、六个祝福语、三级清晰度和 manifest 地址。
- `manifest-<hash>.json`：模型版本、材质配方版本、固定花纸、城市结构与法线、文字和底标；每项提供尺寸、编码、传输文件大小、解码大小、GPU/mipmap 估算、来源哈希与内容哈希。
- `assets/<id>-<hash>.webp`：颜色为 sRGB；遮罩、ORM 是线性数据，禁止 CDN 进行有损转码或色彩调整。
- 城市结构上传为 RG8：R 是金线、G 是覆盖；文字上传为 R8，`uvRect=[u,v,width,height]` 采用模型 UV 的左下原点。裁切边缘留保护像素，字形沿用原稿像素。
- 固定花纸 ORM：R 恒为 1（未使用），G 粗糙度，B 金属度。裸金色校正读取 B；法线与颜色始终共享同一图集/UV。图集按段重新缩放并重建 gutter。
- `.hfn.gz`：gzip 封装 HFN1，16字节头后是 bottom-up RGBA binary16 数据。材质法线保留半浮点精度，Worker 解压、校验、传输 ArrayBuffer。普通静态托管使用 `application/octet-stream`，**不设置 Content-Encoding:gzip**；消费者按清单精确校验压缩文件长度和哈希，托管方不得提前解压响应。
- 模型当前由前端参数化生成，照明和反射由版本化配方计算；图片列表本身不能替代模型/材质版本。`china-cup-v6` 与 `porcelain-city-v6` 的语义由对应源码固定。

母版、来源、字体、SVG 与旧发布仍保存在原路径。生成器是单向派生，不覆盖原稿。将新资源发布到新 releaseId；不要覆盖已经引用的 `v7-1` 或哈希 URL。作品当前仅支持已实现的版本，未知版本明确报错，不隐式替换。

`decodedBytes` 是目标纹理通道的数据大小，不是浏览器进程总内存。运行时 `fetchedBodyBytes` 是成功读取的文件字节；网络头、协议及重试成本应读取 Resource Timing 或网络面板。图形资源估算计入 mipmap、深度、MSAA、反射临时缓冲，以及玻璃合成和材质图生成的多个 WebGL 上下文；CPU 解码缓存独立记录。不包含驱动、浏览器内部交换链、CSS 合成和系统浏览器开销；不是系统可用 RAM。

## 前端接口

设计器脚本完成执行后取得接口，再等待资源与首帧就绪；不要给全部下载设置固定总时限：

```js
const viewer = window.cupViewer;
const stopLoading = viewer.onLoadStateChange(state => console.log(state));
await viewer.whenReady({signal: new AbortController().signal});
stopLoading();
const design = viewer.exportDesign();
const applied = await viewer.importDesign(design);
const unsubscribe = viewer.onDesignChange(next => console.log(next));
const pngDataUrl = viewer.capture(); // 显式渲染后捕获，平时不保留 drawing buffer
unsubscribe();
```

`exportDesign()` 导出成功应用的状态，资源加载中会拒绝导出，避免保存“界面已选但尚未渲染”的状态。`importDesign()` 完整成功返回 true，失败保留当前作品并返回 false；不支持的资源或非法参数直接抛错。订阅只发布作品参数变化，高清替换、DPR 和设备策略不改变作品。

同源 iframe 样例使用上述接口。嵌入第三方域名时，请由接入方提供限定 origin 的消息桥或组件封装，不能直接访问跨域 iframe，也不要通过 URL 传登录凭据。

## 公司数据映射参考

| 实体 | 关键字段 | 关系 |
|---|---|---|
| 已有用户/身份映射 | 稳定 userId；必要时 issuer + subject | 一个用户拥有多个作品 |
| 资源发布 | releaseId、manifest 地址、模型/配方版本 | 多个作品复用同一资源版本 |
| 作品 | id、ownerId、title、revision、时间戳 | 所有权从可信会话取得 |
| 作品修订 | workId、revision、DesignConfig | 记录参数与版本，不复制贴图 |
| 分享 | id、随机 token、workId、revision、快照、撤销状态 | 固定分享时的修订，公开结果不返回 ownerId |

可用关系数据库实现，也可映射到公司现有数据服务。建议对 `(workId, revision)` 和分享 token 建唯一约束；用户作品列表按 ownerId / updatedAt 索引；更新通过 revision 乐观锁。mock 保存当前修订和独立分享快照，生产需要历史时持久化单独修订表。

具体 HTTP 契约见 `contracts/openapi.json`，资源和作品格式见对应 JSON Schema。mock 演示 401、404、409、410、请求幂等、匿名只读和分享撤销；公司身份适配只替换会话获取及后端 ownerId 来源，前端不得指定所有者。

## CDN、缓存与发布

- HTTPS；资源返回正确 MIME；跨域资源允许前端 Origin。公开静态资源可 `Access-Control-Allow-Origin: *`，账号 API 使用公司的凭据与 Origin 策略。
- 哈希资产长期缓存；bootstrap 与 `runtime-config.js` 使用 no-cache。发布先上传全部资源并校验哈希，再切 bootstrap。旧 release 保留供已有作品引用。
- 可对 JS/CSS/JSON 启用 Brotli/gzip；不要二次处理 `.hfn.gz`，不要对数据 WebP 自动“优化”。跨域性能统计可配置 `Timing-Allow-Origin`。
- 缺失资产返回 404，不回退成 index.html；开发审计入口与联调页按需单独发布。
- 纯静态回滚只切回上一版 bootstrap/应用入口，保持既有资源 URL 不变。

## 验证与边界

`npm test`、`npm run test:v7`、`npm run check:v7-assets`、`npm run qa:v7`。浏览器检查、设备模拟、字节预算是真实 iPhone 验收的前置证据，不能代替 iPhone 13 mini / iOS18 连续30分钟及触感测试。最新实测数字见 `evidence/v7/` 和仓库变更记录。

上下文恢复语义参考 [MDN webglcontextrestored](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/webglcontextrestored_event)：恢复后旧 GPU 对象无效，需要重新创建。本项目在丢失事件阶段释放 GPU 对象并保留作品状态，恢复后从轻量档重建。

## V7.1 加载与玻璃策略

`getLoadState()` / `onLoadStateChange(callback)` 返回 `{phase, receivedBytes, totalBytes, lastProgressAt, error}`。phase 是 loading、rendering、ready、error、disposed；最近字节进度是毫秒时间戳，没有进度时为0。`whenReady({signal})` 在完整画面可进入时完成，真实失败/销毁/取消时拒绝，失败后可重新订阅并重试。加载页失败点击重新加载会复用已验证文件，不必重下全部城市。

网络队列最多2项、解码队列1项；非空数据块重置120秒无进度超时。临时网络/408/429/5xx最多3次，间隔400/800ms；用户取消和错误长度/哈希/404不重试。后台暂停排队任务和空闲超时，继续到达的数据仍正常处理。

默认尝试原液态材质。手机常态128MiB、临时峰值192MiB；预算紧张时释放闲置缓存、调整模型DPR并拒绝非必要高清。玻璃在独立WebGL2图层合成，模型绘制后捕获一次，UI动画复用；反射计算期间释放可再生的玻璃中间缓冲。进一步超预算、连续两个2秒窗口P95>33.3ms（含0.5ms计时精度容差），或上下文失败时回退磨砂，本次会话不反复恢复。Safari没有deviceMemory不是失败；诊断中缺失为null，不能当成0。

原5MiB/6秒与全部预加载选择不相容。当前要求全部低清+当前及相邻高清、6组文字准备完成后进入；受控10Mbps/100ms冷缓存目标15秒。Netlify跨地域耗时单独记录；实际COS线路需上线环境复测。

## 三个独立地址与子路径联调

同源iframe是指联调页和设计器来自同一个前端站点；API和资源可以在其他Origin。已有示例用Cookie会话（credentials: include），API必须返回精确Origin及Access-Control-Allow-Credentials，不能用星号。真实跨站Cookie还需公司按SameSite/Secure和浏览器策略适配；可由公司同站网关代理。不要以mock的Cookie代替正式身份认证。

运行 `npm run qa:v7-split` 可在本机随机端口启动前端、API、资源三个服务，使用 `/cup/` 子路径构建，验证账号、保存/重载、分享与撤销。模拟服务仅绑定127.0.0.1、只用合成用户、内存存储，关闭即清空。也可以通过 MOCK_ORIGINS（逗号分隔的精确Origin）、MOCK_API_BASE、MOCK_ASSET_BASE 注入地址。Origin `null`、未列出的Origin和任意请求头不会自动放行。生产服务必须排除 `/mock/session`。

## 交付验收状态

源码和预览完成不等于真机体验验收。iPhone Air/iOS27.0.1、iPad mini6/iPadOS16.6.1 已由用户确认V6折射正常；合并后的V7仍需复测。iPhone13mini/iOS18连续30分钟、物理触感和正式COS联调单独记录。具体候选、提交、自动化和未通过目标见本轮变更记录。


当前默认资源v7-4及V7.1.3花纸改动见[后台表与版本兼容说明](backend-handoff/README.md#v713--v7-4-花纸映射与补洞)。COS需保留v7-1～v7-4四个目录；旧作品不能强制改releaseId。新映射字段不属于作品参数。
