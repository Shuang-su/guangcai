# V7.1.8 / v7-7 入口版本标识修正

- 正式HTML、开发iframe HTML由Vite读取package版本统一注入；运行时debug也读取package，修复复制HTML遗留的V7.1.6。构建检查同时断言两个真实HTML版本。
- 设计资源未变：23城69档、6组文字及成都原位覆写、两城SVG、PSD映射和报告继续使用v7-7；V7.1.7发布和26项线上验证原样保留。
- 本轮消费者构建/TS及196项资源构建摘要校验通过；本地28项核心（含两个真实入口版本）通过，线上28项通过，无相关运行或console错误。底层设计验证沿用同一字节资源的V7.1.7：45基础、43V7、69档坐标、43正式页、86报告/开发页；不将旧验证冒充新运行。
- Issue #49；源码checkpoint `9c9bfa8e`，V7.1.7归档checkpoint `46c1c38e`；[PR #50](https://github.com/Shuang-su/guangcai/pull/50)已合并，最终生产源码 `9c300a20d63125ba33fb6c8f55e7172a9b6d0810`。部署 `6ad66823d01490f2bb745e5a`，1159服务端文件摘要匹配，1159文件/498,677,853 bytes全部SHA256回读通过，5个历史站点未变。入口版本标识已验证完成；设计、性能和实机验收继续归入Issue #47。原5MiB/6秒目标、实体iPhone/Safari、实物、长时GPU/触感及正式COS/身份仍待验收。


正式主页：https://guangcai-no1-china-v7.netlify.app/

整版字框报告：https://guangcai-no1-china-v7.netlify.app/label-compare/

独立开发页：https://guangcai-no1-china-v7.netlify.app/artwork-dev/

固定版本：https://6ad66823d01490f2bb745e5a--guangcai-no1-china-v7.netlify.app/

报告和开发选项中的V7.1.7指v7-7设计资源；运行补丁为V7.1.8。完整设计验证见[PSD整版记录](../20261020-v7.1.7-psd-layout/completion.md)。
