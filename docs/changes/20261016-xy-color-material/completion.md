# 阶段记录

基线：743af2cb785c88ae2e7b38f585b6cab1fa9e729a；功能分支：codex/xy-color-material；关联 Issue #25。

## 参数与渲染阶段
- 增加 materialX，默认 0.5；保留 material 纵轴及旧 finish API。
- 增加方形色轮正反映射；材质中间列保持旧曲线，横向独立影响填面粗糙度与清漆层。
- 新增 4 项映射／兼容／uniform 验证；28 项应用测试和 TypeScript 检查通过。
- 尚未进行新控件浏览器验收；UI、回归和最终交付继续进行。
- 本地提交 SHA 在下一阶段记录，避免将提交自身的 SHA 写入自身造成循环。
