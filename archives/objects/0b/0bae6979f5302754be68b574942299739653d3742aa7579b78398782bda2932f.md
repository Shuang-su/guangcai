# 3.0 Git 接入

1. 保留原非 Git 副本，建立 SHA-256 清单。
2. 从完整 2.2 基线创建 codex/china-3.0，将真实现有变化接入 guangcai-china-preview。
3. 不伪造过程提交；先一个真实接入 checkpoint，再在正式目录继续处理花带定位、可复现工具和验收。
4. 关联 Issue，推送并创建 Draft PR；继续单独完成视觉与新站发布，不触发旧站部署，不打正式 3.0 标签。
