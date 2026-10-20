# V7.1.12 Netlify 正式发布完成记录

2026-10-20。用户请求“通过netlify部署”。正式主页已发布，Netlify状态ready，生产发布指针与部署ID一致。

- 正式入口：https://guangcai-no1-china-v7.netlify.app/
- 本次固定入口：https://6ad76b8796b6f32499d6fa63--guangcai-no1-china-v7.netlify.app/
- siteId：52e02ef9-e2d8-4fcb-98ed-1d14e283c74c。
- 部署ID：6ad76b8796b6f32499d6fa63。
- 正式主页源码：006e32681b686ed161b2aa710a67831e9b3bc9b3；产品7.1.12，资源v7-9。
- 发布归档与版本索引checkpoint：eaa333e70824dc23d425c788880fcaf818575af4。本完成记录随后纳入文档checkpoint。

## 发布内容与范围

套杯、拆解、杯盖、杯身、杯碟、浮雕、花纹七视角和120ms主动花纹提清已上线。默认杯碟花纹尝试2048，手动放大及花纹/杯碟近看优先4096×576彩色；法线/ORM按既有预算分档。城市、文字、花纸源资源和几何沿用v7-9；正式深圳仍是原稿。

此次只更新正式主页及其新编译依赖，旧dev、compare、coverage、bezier-lab和二期深圳实验资源保留6ad6fcdcf1f9e6ca6c7c5330对应内容。未删除后缀页，没有把正式主页包单独覆盖为整站。全站新清单1252份文件，变化6份、1086102字节，Netlify只要求上传这6份。release.json同时写明正式主页源码与保留后缀页的旧部署来源。

应用netlify-deploy技能后，确认本机没有已安装的Netlify CLI；复用项目既有官方文件摘要API及本机Netlify登录。读回目标名称、siteId、旧发布、Git未连接状态后，只允许向固定V7站点创建部署和上传本次部署文件。凭据只在进程内读取，未写入暂存、记录或Git。

## 原交付目录与必要重建

起初已成功读取上一轮包receipt，随后准备暂存时发现 `/Volumes/Prism/广彩交付/` 不再存在。确认卷挂载正常，定向查找项目目录和回收站没有找到移动后的包；本轮没有执行删除该目录的命令。原包链接不能继续当作有效交付入口。

当前应用树与已验证源码006e3268的diff为空，因此从相同应用树重新运行一次 `npm run build -- --outDir <Prism任务暂存>/build --emptyOutDir`。没有安装依赖，也没有重跑已经完成的源码单元测试。TypeScript/Vite构建通过，196项资源校验通过；既有650kB chunk提示保留。此次未重新生成源码/静态交付压缩包。

构建输出选取无后缀主页依赖图，再叠加到旧发布清单；1252份清单与对应来源形成完整发布。仅编译主入口依赖和发布元数据变化，原后缀页逐路径摘要保持一致。

## 服务器与公开页面验证

- Netlify旧发布文件摘要1248份与原本地清单一致，避免覆盖未知的新部署。
- 新部署ready，生产指针为6ad76b8796b6f32499d6fa63；服务端1252份摘要逐项匹配。
- 公开release.json为7.1.12 / v7-9，sourceCommit为006e3268，kind为user-authorized-production。
- 正式入口、release、artwork-dev入口与cup iframe、label-compare、city-compare、bezier-lab公开内容匹配。
- Netlify对HTML自动加入托管说明注释，并将bezier-lab的downloads.html链接转为漂亮URL。初始逐字节比较因此失败；逐处diff确认后，仅严格去除本siteId对应的固定注释、还原这一条已确认链接，归一化摘要与上传文件一致。原始服务器文件摘要无需归一化且全部一致。初始失败日志和原始/归一化摘要均保留。
- 现有Chrome/Playwright执行63项公网检查全部通过，相关控制台/运行错误0。覆盖1440×1000桌面与390×844模拟手机、七项菜单和真实部件显隐、默认2048、自由缩放/花纹/杯碟4096实际颜色尺寸、常态/峰值预算、城市高清档、选择保持、复位、页面身份和无溢出/框架错误覆盖。
- 人工查看公网桌面和手机花纹截图，线条清晰，未见图集接缝。没有新增实体手机验收结论。

证据见evidence/verification.json、online-qa.json、deployment.json以及desktop-flowers.webp、mobile-flowers.webp。已向当前任务排队打开正式URL。

## 可恢复归档与空间

完整发布快照保存在Git提交eaa333e7的 `deployments/guangcai-no1-china-v7/6ad76b8796b6f32499d6fa63/site/` 树。该新快照本机标记skip-worktree，不展开1252份文件；1246份复用已有Git对象，6份新增文件内容约1.09MB。1212个不同对象全部在本地，缺失0；6份变化文件从Git对象读回并核对SHA-256。发布元数据、对象映射、文件摘要和核验结果实际保存于归档目录。

按提交路径可从Git取回任一文件；需要展开全站时先选择有足够空间的目录。本轮未更改既有稀疏检出配置，旧的版本Issue草稿原本已稀疏隐藏，因此从Git读出、追加发布状态并更新其对象，继续保持隐藏。

公网验证与归档对象核对后，删除本轮精确重建的build目录：1247份、518530778逻辑字节。保留小型回执/截图和归档Git对象，没有删除其他部署归档、素材或工作树。清理回执见evidence/cleanup.json。

## 状态边界

Netlify正式发布已完成，源码和发布归档均有本地checkpoint。GitHub账号问题仍待恢复，本轮没有push、GitHub合并或打标签；本地main与其他工作树不变。版本Issue本地草稿、根README、应用README、VERSION_HISTORY和WORKSPACE_LOCATIONS已同步正式发布与交付目录现状。

面向用户的结果：可以直接使用正式主页和本次固定版本链接；七视角及主动4K花纹加载已上线，原开发/对比入口保留，63项公网检查和1252份服务器摘要通过。归档复用Git对象，避免重复展开整站。
