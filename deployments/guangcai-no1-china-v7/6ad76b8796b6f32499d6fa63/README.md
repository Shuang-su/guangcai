# V7.1.12 发布归档

部署：6ad76b8796b6f32499d6fa63；源码：006e32681b686ed161b2aa710a67831e9b3bc9b3；正式入口：https://guangcai-no1-china-v7.netlify.app/。

site/下1252份文件完整保存在Git索引/提交树中，本机采用skip-worktree，不在工作目录再展开整站副本。1246个文件复用上一版已有Git对象，6个变化文件写入新对象；1212个不同对象本地均存在。文件SHA-1/SHA-256与Netlify服务端逐项核对。

files.json固定发布内容，archive-object-map.json提供文件到Git对象的映射，archive-storage.json记录对象复用核对。可以按Git对象或提交路径读回任一文件，恢复完整站点前先准备有足够空间的输出目录。不要把本机未展开视为归档丢失。

旧后缀页沿用6ad6fcdcf1f9e6ca6c7c5330对应的发布内容；正式主页更新至7.1.12。公网浏览器回读见verification.json与本轮完成记录。
