from pathlib import Path
import json,datetime,subprocess
E=Path('evidence/deployment/floral-restored');D=Path('docs/changes/20261013-v3-restored');root=Path('..')
deploy=json.loads((E/'deploy.json').read_text());manifest=json.loads((E/'release-manifest.json').read_text());remote=json.loads((E/'remote-files.json').read_text());delivery=json.loads((E/'delivery.json').read_text());sites=json.loads((E/'site-readback.json').read_text())['sites'];assert remote['allPublicFilesVerified'] and len(remote['files'])==len(manifest['files']);assert len(delivery['checks'])==14 and not delivery['errors'] and not delivery['badRequests'];assert sites[0]['published']==deploy['deploy_id']
source='9400eaf7f65452cbaa68bee563b9793c632d17ae';archive='deployments/guangcai-no1-china-v3/'+deploy['deploy_id'];date=datetime.datetime.now(datetime.timezone.utc).isoformat()
r={'version':'3.0.0','assetVersion':'3.0-floral-restored-1','revision':'Generative HD fixed artwork and seamless full-wrap atlas','status':'manual preview published; visual acceptance pending','date':date,'sourceCommit':source,'siteId':deploy['site_id'],'siteName':deploy['site_name'],'url':deploy['url']+'/','deployId':deploy['deploy_id'],'immutableUrl':deploy['deploy_url']+'/','command':'netlify deploy --prod --dir .codex-work/deploy/v3-restored-20261013/site --site 71306515-d3d5-46a9-8f36-e51f4f3ae480 --no-build --json','manualOnly':True,'gitRepositoryConnected':False,'netlifyBadgeEnabled':False,'files':len(manifest['files']),'totalBytes':manifest['totalBytes'],'publicSha256Match':remote['allSha256Match'],'allPublicFilesVerified':remote['allPublicFilesVerified'],'rawSha256Matches':remote['exactMatches'],'knownProcessedHtml':remote['knownProcessedHtml'],'knownNetlifyProcessing':['nonvisual hosting comment','single prior-deploy evidence link Pretty URL normalization'],'userDesktopLoadingConfirmed':'2026-10-14','archive':archive,'oldSitesUnchanged':sites[1:],'previousDeployId':'6ace32284a3c8d9e272b18ad','pr':'https://github.com/Shuang-su/guangcai/pull/13','prIsDraft':True,'formalTagCreated':False,'delivery':{'checks':len(delivery['checks']),'coldReadyMs':delivery['cold']['readyMs'],'warmReadyMs':delivery['warmReadyMs'],'encodedResourceBytes':sum(x['encodedBodySize'] for x in delivery['cold']['resources']),'scope':delivery['scope'],'verificationNetwork':delivery.get('verificationNetwork'),'errors':delivery['errors'],'badRequests':delivery['badRequests']}}
(D/'release.json').write_text(json.dumps(r,ensure_ascii=False,indent=2)+'\n')
p=D/'completion.md';s=p.read_text();s=s[:s.index('## 发布状态')]+f'''## 发布状态

已手动发布独立 v3：`{r['deployId']}`，源代码 checkpoint `{source}`，源码已推送。147 个上传文件与发布清单、不可变存档逐项 SHA-256 一致；公网 145 个文件字节一致，另外 2 个 HTML 仅包含已核实的 Netlify 注释注入及单条旧证据链接的 Pretty URL 转换，扣除这些确定变化后匹配。发布包，共 {r['totalBytes']:,} 字节（含源贴图下载和对照，不是首屏下载量）。归档在 `{archive}`。

公网交付检查 14 项通过，无控制台或网络错误。本机默认网络两次素材等待超时；诊断无着色器错误，当前成功检查为浏览器进程单独固定到当时 IPv4 A 记录并使用 HTTP/1.1，未修改网站或系统网络设置。此次 Chrome 该连接下冷加载 {r['delivery']['coldReadyMs']/1000:.3f} 秒、缓存加载 {r['delivery']['warmReadyMs']/1000:.3f} 秒，首屏编码资源 {r['delivery']['encodedResourceBytes']:,} 字节。不是实际手机或普遍速度承诺。

2026-10-14 用户反馈“没有什么问题，我能加载出来”，并提供 v3 桌面截图，已保存实际加载成功记录。这不等同于全部视觉或真实手机验收。

Netlify API 确认 v3 与两个旧站均没有 Git 仓库、提供方、分支绑定，旧站部署 ID 未变。浮动角标保持关闭。PR #13 仍为 Draft，未合并、未建立正式 v3.0 标签。上一版与最初 3.0 的独立部署和源代码档案保留。
''';p.write_text(s)
p=root/'VERSION_HISTORY.md';s=p.read_text().replace('`073167bed69ae46eb716e13bc9ad2de0bfea0084` | `6ace32284a3c8d9e272b18ad`','`'+source+'` | `'+r['deployId']+'`').replace('高精度花纹及连续接缝修订，手动发布','固定纹样高清重建、连续单周图集与高精度凹凸，手动发布').replace('108 个文件与公网逐一 SHA-256 匹配','147 个上传文件已存档；公网 145 个文件 SHA-256 一致，2 个 HTML 扣除已知 Netlify 后处理后匹配').replace('[本次精度修订发布记录](guangcai-china-preview/docs/changes/20261013-v3-floral-hq/release.json)','[本次高清重建发布记录](guangcai-china-preview/docs/changes/20261013-v3-restored/release.json) · [上一版精度修订记录](guangcai-china-preview/docs/changes/20261013-v3-floral-hq/release.json)');p.write_text(s)
p=root/'docs/history/deployment-map.json';data=json.loads(p.read_text());assert not any(e['deployId']==r['deployId'] for e in data);data.append({'version':'3.0-preview-floral-restored','commit':source,'deployId':r['deployId'],'siteName':r['siteName'],'immutableUrl':r['immutableUrl'],'verifiedReleaseFiles':r['files'],'allSha256Match':False,'allPublicFilesVerified':True,'rawSha256Matches':145,'processedHtml':2,'status':'manual preview; generated HD fixed artwork and guarded continuous atlas; Draft PR; visual acceptance pending'});p.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
pr=f'''中国杯 3.0 采用原始 450 ml 杯窄饰带、独立把手条和 151 碟花带。PSD 按 ICC 转为 sRGB，保留原稿、裁切与弧长展开记录；固定装饰 UV 与城市替换接口独立，旧花纸包继续兼容。

白瓷独立提亮，首页按单杯参考校准机位；盖面主体压平、保留圆润外缘，增加盖钮实时倒影。移动端采用新柔光背景，保留旧背景、灰底和本地图片预览。城市/文字源文件、城市与结构金色参数、曝光 1.08 保持。

原稿碟花带仅 195 像素高，单纯提高法线精度仍不能恢复柔软的颜色边线。当前版本按原稿约束分段生成高清固定纹样，保存 12 份生成输出、提示词、输入、对位与来源哈希；整圈母版 16256×512，运行时用 8192×1152 两行带护边图集。杯身饰带 1024×2466，把手花条 384×4473。完整周向连接，不使用四段镜像。新增描线、晕染和局部花瓣细节属于生成重建，不宣称原稿像素无损恢复。

彩釉底面、连续墨线凸纹和金底分别派生，采用 16 位高度、RGBA16F 法线和无损颜色/材质贴图；法线强度 4.4 / 2.4。图集颜色、金属、粗糙度、法线、清漆法线和灰模使用同一映射。当前运行时贴图约 52 MB，按要求优先画质。

关联 #11。

- 中国杯 17 项单元测试、53 项浏览器交互、9 项固定包兼容、40 项资产与保护范围核验通过；图集与完整纹理的 PBR 像素对照通过；TypeScript/Vite 构建通过。
- 城市/文字 12 文件与上一部署源码逐字节一致；器型、白瓷、灯光、局部反射及背景实现的 9 文件哈希未变。背景全项测试在首次 3.0 完成，当前再验默认/切换和手机视口；未冒充真实手机/Safari验收。
- [三维预览]({r['url']}) · [高清花纹前后滑杆]({r['url']}evidence.html#floral-restored) · [单杯同机位叠图]({r['url']}evidence.html#floral-update)。手动部署 `{r['deployId']}`，源码 `{source}`。
- 公网 14 项检查在验证浏览器固定当时 IPv4 A 记录并使用 HTTP/1.1 后通过，无运行和网络错误；默认连接先前有两次超时，已保存诊断，不作普遍加载承诺。147 个上传文件与不可变存档逐项 SHA-256 一致；公网 145 文件字节一致，2 个 HTML 经核实仅为已知 Netlify 注释及单条旧证据链接规范化处理。2026-10-14 用户提供桌面加载成功截图。三个 Netlify 站点均无 Git 自动部署绑定，旧站部署未变。

剩余边界：生成细描线与源稿的局部形态/晕染差异、极近看可能辨认的笔触连接、现有盖钮/碟侧轮廓与离线光效差异，以及真实手机/Safari视觉验收。保持 Draft，不合并、不建立正式 v3.0 标签。完成记录：`guangcai-china-preview/docs/changes/20261013-v3-restored/`。
'''
Path('.codex-work/tmp/restored-pr-body.md').write_text(pr)
print(json.dumps({'deployId':r['deployId'],'source':source,'files':r['files'],'delivery':r['delivery']},ensure_ascii=False))
