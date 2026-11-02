# 正式活动与资源路径只读核对

日期：2026-11-02（Asia/Shanghai）。

## 正式活动接入回读（2026-11-02）

用户确认的正式活动：[深圳广电「城市共彩」](https://www.sztv.com.cn/huodong/gcyfy/h5/#/home)；[DIY 入口](https://www.sztv.com.cn/huodong/gcyfy/h5/#/create)。Netlify 是开发交付技术预览与固定版本回溯，不是这个正式活动的业务入口。

本次只读确认：首页和 DIY 场景可见，杯身已渲染，默认“我爱深圳”，新增五句及原六句在两页共 12 个选项中显示；没有提交作品、登录或调用有写入效果的业务接口。

- 公开配置：[web3d/config.json](https://www.sztv.com.cn/huodong/gcyfy/h5/web3d/config.json)，默认资源 `v7-10`，包含 v7-1～v7-10 清单。
- 资源根为 `https://gh5tc-1253925857.cos.ap-guangzhou.myqcloud.com/gcyfy/web3d/prod/releases/`。10 份清单和 5 个资源抽样均 HTTP 200、SHA-256 匹配；携带正式站 Origin 请求时均返回 `Access-Control-Allow-Origin: *`，适用于这些公开静态资源，不代表有凭据 API 应使用 *。
- 抽样包含深圳缩略图、低清 mask/normal、我爱深圳文字，以及 #33 的 v7-1 上海缩略图；未做全量 225 资源或全部业务流程验收。
- 生产配置的 defaultDesign.sloganId 为 `open`，业务 DIY 实际初始选择为 `love-city`；以本次可见界面为依据，不能仅据配置默认值判定“我爱深圳未生效”。配置的渲染引擎标识 `guangcai-7.1.12-h5.1` 与资源 v7-10 是不同维度，不能直接当作产品版本回退。
- 已证实静态 COS 接入；正式身份、作品发布/保存/分享、权限隔离与生产稳定性未在本轮验证。下面历史正文中“COS未接入”的笼统描述由本节限定为尚未完成全部业务验收。


## 已知路径案例

上海旧缩略图：

`https://gh5tc-1253925857.cos.ap-guangzhou.myqcloud.com/gcyfy/web3d/prod/releases/v7-1/assets/shanghai-thumbnail-a2ff84e038f47efb.webp`

当前 v7-10 清单的深圳低清 mask 使用 `../v7-7/assets/shenzhen-light-mask-5425b097d75fd45d.webp`，深圳缩略图使用 `../v7-8/assets/shenzhen-thumbnail-75a497dd0b3fd92e.webp`，城市专属文字在当前 v7-10/assets 下。

解析规则为 `new URL(asset.url, manifestUrl)`；内容哈希来自资源离线编译，不是普通 Vite build 随机路径。公开 GET 和 Origin 请求回执见 sztv-readback.json。

## 检查边界

浏览器为桌面内置浏览器：经首页视频入口进入 DIY、关闭操作引导、打开祝福语两页；实际杯身已渲染。未发布作品或提交账户信息，未验证身份、账号隔离、保存/分享或采购等业务，也没有实体手机/微信或长时GPU结果。配置版本与可见行为是本次观察，不能认定业务站构建字节与 Netlify 交付包完全一致。

最初 web 抓取器无法打开该页面，随后 curl/urllib 和真实浏览器成功；这是抓取器限制，不是正式站不可用。
