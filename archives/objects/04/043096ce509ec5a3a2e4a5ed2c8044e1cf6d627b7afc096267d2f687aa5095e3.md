# 完成记录：Netlify 生产部署

## 交付结果

- 生产站点：https://guangcai-no1.netlify.app/
- 花纸与标准：https://guangcai-no1.netlify.app/texture-standards.html
- 实拍叠图：https://guangcai-no1.netlify.app/compare.html?ref=1238
- 项目管理：https://app.netlify.com/projects/guangcai-no1
- 本次固定版本：https://6abbdf78d912b4b6b1d7c3b9--guangcai-no1.netlify.app/
- 团队：Shuang-su’s team；项目 ID `cdc49df3-1e59-4e37-99ac-962584f050a6`。
- 部署 ID `6abbdf78d912b4b6b1d7c3b9`；Netlify 返回 `ready`、`production`，无错误，发布时间 `2026-09-29T15:55:48.779Z`。

## 平台选择与实际操作

读取 Sites 和 Netlify 的当前站点列表、账号能力及官方部署文档。两边均无本项目既有部署；Netlify 已有可用团队和 CLI 登录。选择创建独立 Netlify 项目，直接发布经过本地验证的 Vite 静态构建。Sites 新站默认私有且采用平台源码版本工作流，本次独立展示链接用 Netlify 更直接。

1. 确认源目录非 Git 仓库、外置盘剩余空间充足；依赖缓存、发布暂存和产物均放在外置盘项目内。
2. 新增 `netlify.toml`，指定 `npm run build` 与 `dist`；保留三个 HTML 入口和真实资源 404，设置哈希脚本长缓存、稳定名称花纸重验证缓存。
3. TypeScript 和 Vite 构建成功。将 78 个文件、59,837,669 字节复制为发布暂存副本，并保存逐文件 SHA-256 清单。
4. 创建并关联 `guangcai-no1`，从发布副本执行生产部署。使用 Netlify API 回读状态，确认 ready 与生产 URL。
5. 公网检查发现平台默认角标覆盖手机底部观察按钮。按 Netlify 官方的项目级设置关闭 `built_with_badge_enabled`，再次访问确认没有 HUD 注入脚本，移动端按钮完整可见。未变更套餐或计费设置。
6. 保存桌面、手机、花纸标准和实拍叠图的实际公网截图。更新 README、交付说明、发布清单与本记录。

## 验证

最终线上专项共 **98 项通过，78 个发布文件核验完成，无浏览器运行异常**，证据为 `evidence/deployment/online-qa.json`。

- 无需登录即可访问 HTTPS 生产页面，WebGL 场景成功渲染。
- 原版、牡丹玉兰、莲荷双蝶均完成在线加载；法线强度 1.5、曝光 1.08 保持固定，换款不变更几何。
- 视角切换、手机首次打开、三款标准页预览、实拍照片及 50% 透明叠图正常。
- 缺失贴图返回 404；哈希脚本和稳定花纸的缓存响应头符合配置。
- 75 个静态资源 SHA-256 与本地发布副本完全一致，包括全部 45 张 PBR 图。三个 HTML 页面在剔除平台已确认的托管说明注释后，内容哈希也与本地一致。
- `badge-status.json` 确认项目角标已关闭，公网不再注入 HUD 脚本。

初次严格 HTML 原字节哈希检查失败，原因是 Netlify 在响应中注入托管说明注释和默认角标脚本，不是项目文件损坏。排查后关闭角标，仅对已确认的平台注释做精确归一化；所有其他内容仍逐字节核验。保留最初的检查记录 `online-qa-initial.json`，最终检查为 complete=true。

## 源码与后续更新

源码、生成母版、PBR 贴图、构建和证据继续位于 `/Volumes/Prism/Codex/guangcai-viewer-20260929/outputs/`。公网服务不依赖本机进程或外置盘在线。

本项目采用本地构建发布，未连接 Git 自动部署。后续修改后构建，再对同一 Netlify 项目执行生产部署即可沿用现有网址；操作命令见 README。当前源目录不是 Git 仓库，按用户约定未初始化 Git，因此没有 checkpoint commit。

此轮验证确认部署与现有内容的一致性、浏览器功能及布局；未重新宣称器型达到实测精度或等同用户最终验收。
