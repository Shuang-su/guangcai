# 广彩一号杯 · 外置盘交付

当前可编辑项目、构建和验收证据均位于：
`/Volumes/Prism/Codex/guangcai-viewer-20260929/outputs/`

线上生产版本已发布到独立 Netlify 项目：

- [线上三维观察器](https://guangcai-no1.netlify.app/)
- [线上花纸与生成标准](https://guangcai-no1.netlify.app/texture-standards.html)
- [线上实拍叠图校准](https://guangcai-no1.netlify.app/compare.html?ref=1238)
- [Netlify 项目管理](https://app.netlify.com/projects/guangcai-no1)
- [本次发布固定版本](https://6abbdf78d912b4b6b1d7c3b9--guangcai-no1.netlify.app/)
- [上线记录](guangcai-viewer/docs/changes/20260929-netlify-deployment/completion.md) / [公网验证结果](evidence/deployment/online-qa.json)

线上版本不依赖本机预览服务或外置盘在线。以下本机服务用于继续修改与本地验收：

- [三维观察器](http://127.0.0.1:5187/)
- [花纸与生成标准](http://127.0.0.1:5187/texture-standards.html)：原有款和两套重新生成的满铺花纸，同机位预览、完整原始提示词、母版、45 张 PBR 通道图。
- [牡丹玉兰](http://127.0.0.1:5187/?style=peony-magnolia) / [莲荷双蝶](http://127.0.0.1:5187/?style=lotus-butterfly)
- [盖片与盖把实时叠图](http://127.0.0.1:5187/compare.html?ref=1238)：可调整机位、透明度，保存 PNG 和机位 JSON。
- [5 组实拍叠图](evidence/overlays/index.html)
- [盖把局部对比](evidence/lid-correction/index.html)
- [把手三角根部对比](evidence/handle-correction/index.html)
- [87 张照片与 5 段视频分组](evidence/reference-index.html)
- [22 个观察方向](evidence/comparison.html)
- [可编辑项目说明](guangcai-viewer/README.md)
- [器型修订记录](guangcai-viewer/docs/changes/20260929-reference-corrections/completion.md)
- [花纸重生成完成记录](guangcai-viewer/docs/changes/20260929-texture-variants/completion.md)
- [最终纹理验证](evidence/textures/texture-qa.json)：127 项通过。
- [最终生产服务验证](evidence/textures/production-smoke.json)：51 项通过，含实际返回的 45 张贴图哈希核对。

`guangcai-viewer/dist/` 为生产构建。`src/`、`assets/`、`public/`、`tools/` 和 package-lock.json 一并保留。

本轮重点修正把手上方不等厚三角收分、水平上沿和较硬朗折角；盖片略减薄，盖把拱高与宽面略增，保留白瓷根部和止口。碟的外撇壁、内收肩部、窄圈足以及无溯源标签的底款均保留。

后续花纸修订已固定彩绘微浮雕强度 1.5、曝光系数 1.08。在 `assets/prompts.json` 找回原始提示词，并逐字保留为新款生成请求的前缀，引用原版母版重新生成。杯身、把手和底碟均恢复原版裁切，底碟花叶延伸至上下金边。原有款完整保留；最终新款母版使用 `*-dense-v3.png`，先前稀疏初稿保留但不载入。

最终可视证据见 [三款同机位预览](evidence/textures/standards-desktop.png)、[牡丹玉兰底碟近景](evidence/textures/peony-magnolia-saucer-dense.png)、[莲荷双蝶底碟近景](evidence/textures/lotus-butterfly-saucer-dense.png)。开发预览 5197 同样提供最新内容。

只以产品图的 151 mm 碟径作为已知尺度，其余数值是多角度照片估计。叠图保留轮廓重影和光照差异，不表示实测复原或用户验收通过。花纸是生成的参考风格新稿。

旧 Documents 输出目录未覆盖；其中 external-delivery 是指向本外置盘 outputs 的快捷链接。本地预览服务需要本机和外置盘保持在线。Netlify 采用已构建文件发布，未连接 Git 自动部署；更新方法见项目 README。
