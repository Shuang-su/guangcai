# 证据说明

- hdr-haptics-qa.json：23 项专项检查及真实 float16 数值。physicalHDRDisplay=false / physicalMotor=false 指该自动化套件未在物理设备验收。
- v5-qa.json：106 项现有回归。
- native-iab.json：内置浏览器无媒体查询覆盖的实际 HDR 配置与帧计数。
- hdr-high-lightness.png / hdr-low-lightness.png：桌面高/低明度激活态，来自专项脚本；是 SDR 截图，不是可展示真实 HDR 的媒体。两张截图的选色点不同，仅用于分别核对端点。
- native-iab-low.png：内置浏览器低端状态，612×900；鼠标/键盘验证，不是实际手机。
- mobile-controls.png：390×844 触摸模拟布局，不是实际手机。
- sdr-fallback.png：SDR 回退布局。

用源码 SHA 与文件哈希核对具体实现；实际硬件亮度和马达手感仍待用户在设备上验收。
