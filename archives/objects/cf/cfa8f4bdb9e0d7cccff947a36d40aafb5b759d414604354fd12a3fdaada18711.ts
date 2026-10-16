import { steps, type Session, type ResultRecord } from '../domain/activity';
import { icons } from './graphics';
import type { DemoWork } from '../services/local';
const base = import.meta.env.BASE_URL;
export const escapeHtml = (v: string) => v.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
export function header(title = '', back = true, skip = false) {
  return `<header class="app-header">${back ? `<button class="icon-button" data-action="back" aria-label="返回">${icons.back}</button>` : '<span></span>'}${title ? `<span class="header-title">${title}</span>` : '<span></span>'}${skip ? '<button class="text-button" data-action="finish-intro">跳过</button>' : `<button class="icon-button rule-trigger" data-action="rules" aria-label="活动规则">${icons.rules}</button>`}</header>`;
}
export function nav(active: 'home'|'ranking') {
  return `<nav class="bottom-nav" aria-label="主导航"><a href="#/home" ${active==='home'?'aria-current="page"':''}>首页</a><span aria-hidden="true">·</span><a href="#/ranking" ${active==='ranking'?'aria-current="page"':''}>共彩榜单</a></nav>`;
}
export function landing(session: Session) {
  return `${header('',false)}<main class="landing"><div class="landing-copy"><h1><span>为 APEC</span><span>添<span class="title-color">彩</span></span></h1><p>一器留白，待你添彩</p></div><div id="viewer-host" class="landing-object" aria-label="一号杯"></div><div class="landing-actions"><button class="primary" data-action="${session.completed?'result':'start'}">${session.completed?'查看我的作品':'开始添彩'}<span>${icons.next}</span></button><button class="text-button" data-action="replay">重温开场 ${icons.play}</button></div></main>${nav('home')}`;
}
export function stepPanel(session: Session) {
  const {step,choices}=session.draft,s=steps[step],selected=choices[s.id];
  return `<section class="step-panel" aria-labelledby="step-title" data-step="${step}"><div class="options" role="radiogroup" aria-required="true" aria-label="${s.title}">${s.options.map((o,i)=>`<button class="option ${selected===o[0]?'selected':''}" role="radio" aria-label="${o[1]}" tabindex="${selected===o[0]||(!selected&&i===0)?0:-1}" aria-checked="${selected===o[0]}" data-choice="${o[0]}" style="--order:${i}"><img src="${base}media/options/${o[0]}.webp" alt="" width="640" height="480" draggable="false"><span class="option-caption">${o[1]}</span><span class="selection-mark" aria-hidden="true">${icons.check}</span></button>`).join('')}</div><div class="step-actions">${step>0?'<button class="text-button previous" data-action="previous-step">'+icons.back+' 上一步</button>':''}<button class="primary" data-action="next-step" ${!selected?'disabled':''}>${step===4?'完成创作':'下一步'} ${icons.next}</button></div></section>`;
}
export function viewerTools() {
  return `<details class="viewer-tools"><summary aria-label="器物操作">${icons.move}</summary><div><button class="icon-button" data-action="zoom-in" aria-label="放大器物">${icons.plus}</button><button class="icon-button" data-action="zoom-out" aria-label="缩小器物">${icons.minus}</button><button class="icon-button" data-action="reset-view" aria-label="复位视角">${icons.reset}</button></div></details>`;
}
export function editor(session: Session) {
  return `${header()}<main class="editor"><h1 class="chapter-title" id="step-title">${steps[session.draft.step].title}</h1><section class="object-area"><div class="viewer-host" id="viewer-host"></div>${viewerTools()}</section><div class="panel-mount">${stepPanel(session)}</div></main>`;
}
export function preparing() {
  return `${header()}<main class="preparing"><h1>为 APEC 添彩</h1><div id="viewer-host" class="prepare-viewer"></div><div class="task-status" role="status"><span class="spinner"></span><span id="task-text">正在生成你的彩瓷作品…</span></div><div id="prepare-error"></div></main>`;
}
export function resultPage(result: ResultRecord|null,posterUrl:string) {
  if(!result) return `${header()}<main class="empty-state"><h1>为 APEC 添彩</h1><button class="primary" data-action="start">开始添彩 ${icons.next}</button></main>`;
  return `${header()}<main class="result-page"><h1>创作完成</h1><figure class="poster-figure"><div class="poster-shell"><div class="poster-preview" aria-hidden="true"><span>为 APEC</span><strong>添彩</strong></div><div id="viewer-host" class="poster-cup-slot"></div><img class="poster-image" src="${posterUrl}" alt="为 APEC 添彩分享海报" width="1080" height="1920"></div><figcaption>长按图片，保存分享海报</figcaption></figure><div class="result-actions"><button class="primary" data-action="view3d">查看 3D 作品 ${icons.next}</button><button class="secondary" data-action="share">分享给好友</button><button class="text-button" data-action="restart">再创作一件</button><a class="text-button" href="#/ranking">共彩榜单</a></div></main>`;
}
export function result3d() {
  return `${header()}<main class="result-viewer"><h1>我的 3D 作品</h1><div id="viewer-host" class="large-viewer"></div>${viewerTools()}<p class="gesture-note">单指旋转 · 双指缩放</p><button class="primary" data-action="result">查看分享海报 ${icons.next}</button></main>`;
}
export function ranking(_works: DemoWork[],hasResult: boolean) {
  return `${header('',false)}<main class="ranking-page auxiliary"><h1>共彩榜单</h1>${hasResult?`<a href="#/result" class="my-work-link"><img src="${base}media/styled-cup.png" alt=""><span>我的共彩作品</span>${icons.next}</a>`:''}<section class="board-lower"><h2>共彩排行</h2><div class="empty-ink" aria-hidden="true"></div></section><button class="primary" data-action="start">我来添彩 ${icons.next}</button></main>${nav('ranking')}`;
}
export function workPage(work: DemoWork|null) {
  return `${header()}<main class="work-detail auxiliary"><h1>${work?'TA 的彩瓷作品':'这件作品暂时无法查看'}</h1>${work?`<img class="work-cup" src="${base}media/styled-cup.png" alt="彩瓷作品"><h2>一起为 APEC 添彩</h2>`:'<p>你仍可创作自己的彩瓷作品</p>'}<button class="primary" data-action="start">我来添彩 ${icons.next}</button><a class="text-button" href="#/ranking">查看共彩榜单</a></main>`;
}
export function rulesContent() {
  return `<h1>活动规则</h1><section><h2>参与方式</h2><ol class="rule-steps">${steps.map(s=>`<li>${s.title}</li>`).join('')}</ol><p>长按图片，保存分享海报</p></section><section><h2>共彩与排行</h2><p>共彩值 · 当前排名 · 共彩排行</p></section><section><h2>结果公布</h2><p aria-label="尚无公布结果">—</p></section><section><h2>礼赠说明</h2><p>陶瓷杯仅作礼品示意<br>实际礼品待定</p></section>`;
}
export function rules() { return `${header()}<main class="rules-page auxiliary">${rulesContent()}<button class="secondary" data-action="back">返回</button></main>`; }
export function awardPage(kind:string,submitted=false) {
  return `${header()}<main class="award-page auxiliary"><h1>共彩礼赠</h1><p>陶瓷杯仅作礼品示意</p><p>实际礼品待定</p>${kind==='postal'?`<a class="secondary" href="#/address">填写收货信息</a>`:'<dl><dt>现场领取码</dt><dd>—</dd><dt>领取时间</dt><dd>—</dd><dt>领取地点</dt><dd>—</dd></dl>'}<a class="text-button" href="#/ranking">共彩榜单</a></main>`;
}
export function address() {
  return `${header()}<main class="address-page auxiliary"><h1>填写收货信息</h1><form><label>收件人<input disabled autocomplete="off"></label><label>手机号码<input disabled autocomplete="off"></label><label>所在地区<input disabled></label><label>详细地址<textarea disabled></textarea></label><button class="primary" disabled>提交收货信息</button></form><p>实际礼品待定</p></main>`;
}
export function errorBlock(message:string,action='retry-viewer') {
  return `<div class="error-state" role="alert"><h2>暂时无法完成</h2><p>${escapeHtml(message)}</p><div><button class="secondary" data-action="${action}">重新加载</button><button class="text-button" data-action="back">返回</button></div></div>`;
}
