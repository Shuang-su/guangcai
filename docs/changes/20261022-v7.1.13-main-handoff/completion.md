# V7.1.13 正式主页开发交付完成

2026-10-22。按用户要求复用现成生产暂存打包，仅无后缀正式主页；没有运行构建、安装依赖、重跑应用测试或部署。

## 交付内容

- 总包：/Volumes/Prism_初号機/广彩/guangcai-main/.codex-work/deploy/中国杯-V7.1.13-正式主页开发交付.zip
- 总包字节：1044449067；SHA-256：e1d3f84f8e51b13f7ad142a12b6cce09ef5f1794014f1b5e97b9f10c3d429813。
- 源码包：source-main.tar.gz，673252728字节，1082个清单文件。
- 静态包：production-main.tar.gz，370564367字节，687个清单文件。
- 包含README-开发交付.md、CURRENT-RESOURCES.json、SOURCE_REVISION.json、逐文件清单、压缩包摘要与回读报告。

## 来源与范围

直接使用guangcai-china-preview/.codex-work/deploy/v7.1.13-production，筛选已发布主入口依赖，部署6ad9e0c4e4871da75c6b4316，生产源码78530b7ea1c67bcdd8a6871c81697d6c6519e2e8，资源v7-10。源码snapshot为bcf257151e62005165745f0fcd6e87cae60cbfd2。源代码与已发布程序的关键目录diff为空；静态文件逐一对照已保存服务器发布清单。

源码交付副本仅调整package脚本、Vite单入口/资源目录及tsconfig范围，生产应用源码未修改。包内保留原六句＋新五句＋我爱城市、23城长短名称；包含离线字体/许可、新母版与生成工具。旧资源保留用于已保存作品兼容。唯一HTML入口均为index.html，不含dev、compare、APEC页面或素材，不含node_modules、凭据、Git历史、构建缓存或AppleDouble文件。

## 包回读验证

- 源码1082文件、静态687文件的长度与SHA-256全部匹配。
- 2788条资源描述引用均在静态包内解析且摘要一致。
- 默认love-city，12个祝福选项，23个城市专属文字。
- 两包各自唯一HTML入口检查通过；源码生成配置仅构建index.html。
- ZIP CRC回读通过，SHA-256边车文件已生成。
- 未重复构建和浏览器验收；本轮验证仅针对交付包边界与完整性，不声称新的运行/实体设备测试。

打包工具适配checkpoint：bcf25715。完成记录随后纳入文档checkpoint。本地已准备交付，未向外部联系人发送，未推送GitHub，线上版本未变。
