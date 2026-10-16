import {
  activityConfig,
  isComplete,
  steps,
  type Session,
  type ResultRecord,
} from "../domain/activity";
import { icons, motif, ribbons } from "./graphics";
import type { DemoWork } from "../services/local";
const base = import.meta.env.BASE_URL;
export const escapeHtml = (v: string) =>
  v.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
export function header(title = "为 APEC 添彩", back = false, skip = false) {
  return `<header class="app-header">${back ? `<button class="icon-button" data-action="back" aria-label="返回">${icons.back}</button>` : `<a class="brand" href="#/home">为 APEC 添彩<span class="brand-lines">${ribbons}</span></a>`}${back ? `<span class="header-title">${title}</span>` : ""}${title === "活动规则" ? '<span class="header-spacer" aria-hidden="true"></span>' : skip ? '<button class="text-button" data-action="finish-intro">跳过</button>' : '<button class="text-button" data-action="rules">活动规则 ' + icons.next + "</button>"}</header>`;
}
export function nav(active: "home" | "ranking") {
  return `<nav class="bottom-nav" aria-label="主导航"><a href="#/home" ${active === "home" ? 'aria-current="page"' : ""}>${icons.home}<span>首页</span></a><a href="#/ranking" ${active === "ranking" ? 'aria-current="page"' : ""}>${icons.rank}<span>共彩榜</span></a></nav>`;
}
export function landing(session: Session) {
  const draft = Object.keys(session.draft.choices).length > 0;
  return `${header()}<main class="landing scenery"><div class="landing-copy"><h1>一器承雅韵<br>五笔添新彩</h1><p class="poem"><span></span>以广彩之美，共赴山海之约<span></span></p></div><div class="landing-object"><img src="${base}media/white-cup.png" alt="一号杯白瓷静态渲染，进入体验后可旋转观察" fetchpriority="high"><div class="landing-ribbon" aria-hidden="true"><img src="${base}media/glass-ribbon.webp" alt=""></div></div><div class="landing-actions"><button class="primary silk" data-action="start">${draft ? "继续添彩" : "开始添彩"} ${icons.next}</button><button class="text-button muted" data-action="replay">重温开场 ${icons.play}</button>${draft ? `<p class="small-note">已保存你的 ${Object.keys(session.draft.choices).length} 笔心意</p>` : ""}</div><p class="landing-footnote">东方雅韵 · 五次添彩</p></main>${nav("home")}`;
}
export function stepPanel(session: Session) {
  const { step, choices } = session.draft,
    s = steps[step],
    selected = choices[s.id];
  return `<section class="step-panel" aria-labelledby="step-title" data-step="${step}"><div class="step-heading"><span class="step-fraction">${String(step + 1).padStart(2, "0")} / 05</span><h1 id="step-title">${s.title}</h1><p>${s.question}</p></div><div class="options ${step === 3 ? "colors" : ""}" role="radiogroup" aria-required="true" aria-label="${s.title}">${s.options.map((o, i) => `<button class="option ${selected === o[0] ? "selected" : ""}" role="radio" tabindex="${selected === o[0] || (!selected && i === 0) ? 0 : -1}" aria-checked="${selected === o[0]}" data-choice="${o[0]}"><span class="option-art">${motif(o[0], i)}</span><span class="option-copy"><strong>${o[1]}</strong><small>${o[2]}</small></span><span class="radio-indicator">${selected === o[0] ? icons.check : ""}</span></button>`).join("")}</div><div class="step-actions">${step > 0 ? '<button class="secondary" data-action="previous-step">上一步</button>' : ""}<button class="primary silk" data-action="next-step" ${!selected ? "disabled" : ""}>${step === 4 ? "完成添彩" : "下一步"} ${icons.next}</button></div><p class="small-note">选择仅作体验记录，暂不改变杯体与成果</p><p class="autosave" role="status">${selected ? "已记录这笔心意" : "选一份心意，继续添彩"}</p></section>`;
}
export function progress(session: Session) {
  const i = session.draft.step,
    firstIncomplete = steps.findIndex((s) => !session.draft.choices[s.id]);
  return `<ol class="step-progress" aria-label="五次添彩进度">${steps.map((s, index) => `<li class="${index === i ? "current" : ""} ${session.draft.choices[s.id] ? "done" : ""}"><button data-step="${index}" ${index > (firstIncomplete < 0 ? 4 : firstIncomplete) ? "disabled" : ""} ${index === i ? 'aria-current="step"' : ""}><span>${index + 1}</span><small>${s.short}</small></button></li>`).join("")}</ol>`;
}
export function viewerTools() {
  return `<div class="viewer-tools"><button class="icon-button" data-action="zoom-in" aria-label="放大器物">${icons.plus}</button><button class="icon-button" data-action="zoom-out" aria-label="缩小器物">${icons.minus}</button><button class="icon-button" data-action="reset-view" aria-label="复位视角">${icons.reset}</button></div>`;
}
export function editor(session: Session) {
  return `${header("五次添彩", true)}<main class="editor"><div class="progress-mount">${progress(session)}</div><section class="object-area" aria-label="器物观察区"><div class="viewer-host" id="viewer-host"><div class="viewer-loading" role="status"><span class="spinner"></span>正在准备白瓷器物</div></div>${viewerTools()}<p class="gesture-note">拖动旋转 · 双指缩放或移动</p></section><div class="glass-divider" aria-hidden="true"><img src="${base}media/glass-ribbon.webp" alt=""><span class="ribbon-sheen"></span></div><div class="panel-mount">${stepPanel(session)}</div></main>`;
}
export function preparing() {
  return `${header("添彩成器", true)}<main class="preparing"><h1>让雅韵，落于一器</h1><p>正在准备「花蝶 · 金地」数字款式</p><div id="viewer-host" class="prepare-viewer"></div><div class="task-status" role="status"><span class="spinner"></span><span id="task-text">载入完整材质包</span></div><p class="small-note">预设款式效果示意，与五步选择暂未关联</p><div id="prepare-error"></div></main>`;
}
export function resultPage(result: ResultRecord | null, posterUrl: string) {
  if (!result)
    return `${header("添彩成果", true)}<main class="empty-state"><h1>还没有本地成果</h1><p>完成五次添彩，留下一份心意。</p><button class="primary silk" data-action="start">开始添彩 ${icons.next}</button></main>`;
  return `${header("添彩完成", true)}<main class="result-page scenery"><div class="result-intro"><h1>一器之间，万彩共生</h1><p>收藏这一份东方雅韵</p></div><figure class="poster-figure"><img class="poster-image" src="${posterUrl}" alt="花蝶金地数字款式海报，可长按图片保存" width="1080" height="1500"><figcaption>长按图片保存 · 数字款式示意</figcaption></figure><div class="result-actions"><button class="primary silk" data-action="view3d">查看 3D ${icons.next}</button><button class="secondary ink" data-action="share">分享引导</button><button class="text-button" data-action="restart">重新体验</button><a class="text-button" href="#/ranking">共彩榜 ${icons.next}</a></div><p class="demo-note">当前为预设款式效果示意，与五步选择暂未关联</p><label class="public-choice"><input type="checkbox" data-action="public-preference" ${result.publicPreference ? "checked" : ""}> 愿意公开展示这份心意</label><p class="small-note">仅记录本地意愿，真实参榜待服务接入</p></main>`;
}
export function result3d() {
  return `${header("花蝶 · 金地", true)}<main class="result-viewer"><div class="result-3d-heading"><h1>细看一器雅韵</h1><p>与海报相同的数字款式</p></div><div id="viewer-host" class="large-viewer"><div class="viewer-loading"><span class="spinner"></span>正在载入器物</div></div>${viewerTools()}<p class="gesture-note">拖动旋转 · 双指缩放或移动 · 双击复位</p><p class="small-note">普通 Web3D 模型 · 数字款式示意</p><button class="secondary ink" data-action="result">返回海报</button></main>`;
}
export function ranking(works: DemoWork[], hasResult: boolean) {
  return `${header()}<main class="ranking-page scenery"><h1>共彩成章</h1><p class="lead">每一份心意，都让美好更丰盈</p><div class="board-note">共彩榜页面演示 · 以下为示例内容，暂无真实排名</div>${hasResult ? '<a href="#/result" class="my-work-link">查看我的本地成果 ' + icons.next + "</a>" : ""}<div class="work-list">${works.map((w, i) => `<a class="work-row" href="#/work/${w.id}"><span class="work-index">${String(i + 1).padStart(2, "0")}<small>示例</small></span><img src="${base}media/styled-cup.png" alt="花蝶金地预设款式"><span><strong>${w.title}</strong><small>${w.author} · 示例署名</small></span><span class="row-arrow">${icons.next}</span></a>`).join("")}</div><section class="board-lower"><h2>把心意，添进山海</h2><button class="primary silk" data-action="start">${hasResult ? "再看五次添彩" : "我来添彩"} ${icons.next}</button><div class="award-links"><a href="#/awards/postal">邮寄领取流程示意</a><a href="#/awards/pickup">现场领取流程示意</a></div><p class="small-note">结果尚未公布 · 奖项与时间以正式规则为准</p></section></main>${nav("ranking")}`;
}
export function workPage(work: DemoWork | null) {
  return `${header("共彩心意", true)}<main class="work-detail scenery">${work ? `<h1>${escapeHtml(work.title)}</h1><p>${escapeHtml(work.author)} · 示例署名</p><img class="work-cup" src="${base}media/styled-cup.png" alt="花蝶金地数字款式示意"><h2>花蝶 · 金地</h2><p class="demo-note">示例作品 · 预设款式效果展示</p>` : '<div class="empty-state"><h1>这份心意暂未找到</h1><p>作品可能已失效，你仍可以开始自己的添彩体验。</p></div>'}<button class="primary silk" data-action="start">我来添彩 ${icons.next}</button><p class="small-note">当前示例不会产生分享归因或真实排名</p></main>`;
}
export function rules() {
  return `${header("活动规则", true)}<main class="rules-page scenery"><h1>以彩为约，共赴山海</h1><p class="rule-version">体验说明 · ${activityConfig.rulesVersion}</p><section><h2>一 · 五次添彩</h2><p>依次为开放、创新、合作、繁荣与未来选择一份心意。每步单选，可返回修改，草稿保存在当前浏览器。</p></section><section><h2>二 · 数字款式示意</h2><p>五步选择仅作体验记录，暂不改变器型、花纸或海报。完成后统一展示「花蝶 · 金地」。海报由同一套三维模型与材质实际渲染。</p><p>现有花纸为 AI 风格新稿，材质细节为艺术近似；不代表原厂纹样复刻或实物扫描。</p></section><section><h2>三 · 保存与分享</h2><p>在成果页长按海报图片保存。当前版本仅提供本地体验，不提供跨设备作品链接，不记录真实分享归因。浏览器清理数据后，本地草稿与成果可能丢失。</p></section><section><h2>四 · 共彩与领奖</h2><p>共彩榜、获奖及领取流程为前端演示。真实活动时间、奖项、资格与领取办法尚待正式规则公布。示例编号不能用于领取，本版不采集真实地址。</p></section><section><h2>五 · 关于赏瓷</h2><p>创作与成果查看使用普通 Web3D 器物。实物扫描赏瓷将在真实资产准备好后另行开放。</p></section><button class="secondary ink" data-action="back">返回体验</button></main>`;
}
export function awardPage(kind: string, submitted = false) {
  const postal = kind === "postal";
  return `${header(postal ? "邮寄领取示意" : "现场领取示意", true)}<main class="award-page scenery"><div class="seal">示意</div><h1>${submitted ? "流程预览完成" : postal ? "一份雅礼，寄予心意" : "以瓷为礼，共赴相约"}</h1><p class="demo-note">以下为页面流程示意，非真实获奖结果</p>${submitted ? '<p>未收集地址，未提交领取申请。</p><a class="primary silk" href="#/ranking">返回共彩榜</a>' : postal ? '<p>真实结果公布后，可在此查看邮寄资格与状态。</p><dl><dt>奖项</dt><dd>待正式规则公布</dd><dt>领取状态</dt><dd>演示状态 · 不可实际领取</dd></dl><a class="primary silk" href="#/address">预览邮寄表单 ' + icons.next + "</a>" : '<div class="pickup-placeholder"><span>现场领取码示意</span><strong>DEMO · 无效</strong><p>真实领取码将在资格确认后生成</p></div><dl><dt>领取地点</dt><dd>待公布</dd><dt>领取时间</dt><dd>待公布</dd></dl><button class="secondary ink" data-action="back">返回共彩榜</button>'}</main>`;
}
export function address() {
  return `${header("邮寄表单示意", true)}<main class="address-page"><h1>让心意，抵达身边</h1><p class="demo-note">只读示例 · 请勿填写真实个人信息</p><form id="demo-address"><label>收件人<input value="示例收件人" readonly aria-readonly="true"></label><label>联系电话<input value="138 **** 0000" readonly aria-readonly="true"></label><label>省市地区<input value="广东省 · 深圳市（示例）" readonly aria-readonly="true"></label><label>详细地址<textarea readonly aria-readonly="true">仅用于展示表单布局，不采集或提交真实地址。</textarea></label><button class="primary silk" type="submit">预览完成状态 ${icons.next}</button></form><p class="small-note">本次操作不发送网络请求，不产生领取申请。</p></main>`;
}
export function errorBlock(message: string, action = "retry-viewer") {
  return `<div class="error-state" role="alert"><h2>暂时无法完成</h2><p>${escapeHtml(message)}</p><div><button class="secondary" data-action="${action}">重试</button><button class="text-button" data-action="back">返回</button></div></div>`;
}
