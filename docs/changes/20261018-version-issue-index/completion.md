# README与版本Issue索引

基线：`23f6bfb67a2fd4a3e709c6aa2aa82d3f5d9e96ec`，分支：`codex/v7-version-issue-index`。

## 实际修改

- 根README此前仍标V7.1.2，现同步V7.1.3 / v7-4、固定预览、实拍/白瓷/高清修正、195资源和实际验证边界；保留V6及历史证据。
- 应用README区分当前版本与V6/V7.1.2历史说明，明确V6字体与V7.1.2换字体的时间，避免旧`build使用v7-3`文字被当成当前默认。
- VERSION_HISTORY新增V7.1.3部署源码、部署ID、版本Issue与验证记录。
- [版本Issue #35](https://github.com/Shuang-su/guangcai/issues/35)补建于2026-10-18，保存本版范围、PR #34、固定预览、已验证项、未通过性能目标及待验收项。
- [Issue #29](https://github.com/Shuang-su/guangcai/issues/29)改为稳定开发交接总入口，增加版本索引；更新前再次检查正文、标题和updatedAt，原29,926字符交接正文完整保留在新前言之后。
- 新增`.github/ISSUE_TEMPLATE/version-release.md`，README和AGENTS写明每小版本独立记录与关闭条件。此前版本仍引用原PR/历史记录，不伪造历史Issue。

## 验证与发布边界

本轮是文档与Issue维护，未修改运行代码、资源或产品版本，未重跑应用构建/浏览器测试，未重新部署。README中的45+33测试、250文件与9资源哈希、性能数据属于既有V7.1.3发布证据。

V7.1.3仍待实体iPhone/iPad复测、真实COS与公司身份联调；原5MiB/6秒目标未达标。Issue #35及#29保持开启。

76个本地Markdown链接通过（历史sparse路径按Git对象核对），18个去重后的Issue固定提交目标存在。Issue #35正文与准备文本逐字一致；#29正文与准备文本逐字一致，原正文完整保留，两者状态均为OPEN。`git diff --check`通过。核验摘要见`verification.json`。

首次核验工具把URL的`#标题锚点`当成文件路径而误报，剥离fragment后重验全部通过；没有为检查器修改已有正确链接。V6字体说明同时与原编译器记录核对。

文档与核验checkpoint：`3df7543eb1e0b471703ece50d192e3647ee95628`（`docs(v7): refresh release readmes and track each version in an issue`）。提交后工作树干净；本段随后作为记录补充提交。推送与main合并以关联文档PR及远端回读为准，不由本地commit推断。
