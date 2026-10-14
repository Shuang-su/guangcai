import "./ui/styles.css";
import {
  activityConfig,
  choose,
  entryRoute,
  freshDraft,
  isComplete,
  steps,
  type ResultRecord,
} from "./domain/activity";
import {
  loadSession,
  saveSession,
  storageWarning,
  localService,
} from "./services/local";
import { createPoster, loadImage } from "./media/poster";
import { bindIntro, introMarkup } from "./media/intro";
import * as pages from "./ui/pages";
import { icons } from "./ui/graphics";
import type { CupViewer } from "./viewer/cup-viewer";

const app = document.querySelector<HTMLDivElement>("#app")!;
let session = loadSession(),
  result: ResultRecord | null = null,
  viewer: CupViewer | null = null,
  revision = 0;
let cleanup = () => {},
  returnTo = "/home",
  posterUrl = "",
  busy = false,
  route = "";
const base = import.meta.env.BASE_URL;
let bootstrapped = false;
function persist() {
  saveSession(session);
}
function go(path: string, replace = false) {
  if (location.hash === `#${path}`) {
    void render();
    return;
  }
  if (replace) {
    history.replaceState(null, "", `#${path}`);
    void render();
  } else location.hash = path;
}
function readRoute() {
  return location.hash.slice(1) || entryRoute(session);
}
function toast(message: string) {
  document.querySelector(".toast")?.remove();
  const n = document.createElement("div");
  n.className = "toast";
  n.role = "status";
  n.textContent = message;
  document.body.append(n);
  setTimeout(() => n.remove(), 5000);
}
function setPoster() {
  if (posterUrl) URL.revokeObjectURL(posterUrl);
  posterUrl = result ? URL.createObjectURL(result.poster) : "";
}
function contextError(message: string) {
  const host = document.querySelector<HTMLElement>("#viewer-host");
  if (host) {
    viewer?.pause();
    host.innerHTML = pages.errorBlock(message);
  }
}
async function mountViewer(host: HTMLElement, fixed: boolean, token: number) {
  const module = await import("./viewer/cup-viewer");
  if (token !== revision) return null;
  if (viewer?.unavailable) {
    viewer.dispose();
    viewer = null;
  }
  if (!viewer) {
    host.innerHTML = "";
    viewer = new module.CupViewer(host, contextError);
  } else {
    host.innerHTML = "";
    viewer.mount(host);
  }
  if (fixed) {
    await viewer.fixed();
    if (token !== revision) {
      if (route === "/create") viewer.neutral();
      return null;
    }
  } else viewer.neutral();
  viewer.resume();
  host.dataset.ready = "true";
  return viewer;
}
async function loadOpening() {
  const token = revision;
  app.innerHTML = `${pages.header("为 APEC 添彩", false, true)}<main class="loading-page"><div class="loading-mark">彩</div><h1>循光，赴一场山海之约</h1><p id="loading-status" role="status">正在读取开场素材</p><span class="spinner"></span><div id="loading-error"></div></main>`;
  try {
    await Promise.all(
      [
        "media/landscape.webp",
        "media/white-cup.png",
        "media/glass-ribbon.webp",
      ].map((p) => loadImage(`${base}${p}`)),
    );
    if (token !== revision) return;
    app.innerHTML = `${pages.header("为 APEC 添彩", false, true)}${introMarkup()}`;
    cleanup = bindIntro(app, finishIntro);
  } catch {
    if (token === revision)
      document.querySelector("#loading-error")!.innerHTML = pages.errorBlock(
        "开场素材未能读取。可以重试，或跳过开场继续体验。",
        "retry-intro",
      );
  }
}
function finishIntro() {
  session.introSeen = true;
  persist();
  go("/home");
}
async function prepare(token: number) {
  if (!isComplete(session.draft)) {
    go("/create", true);
    return;
  }
  busy = true;
  app.innerHTML = pages.preparing();
  try {
    const v = await mountViewer(
      document.querySelector<HTMLElement>("#viewer-host")!,
      true,
      token,
    );
    if (!v || token !== revision) return;
    document.querySelector("#task-text")!.textContent = "渲染器物与海报";
    const cup = await v.capture(1000, 1000);
    const poster = await createPoster(cup);
    if (token !== revision) return;
    result = {
      id: `local-${crypto.randomUUID()}`,
      modelVersion: activityConfig.modelVersion,
      styleVersion: activityConfig.styleVersion,
      styleId: "original",
      demo: true,
      createdAt: new Date().toISOString(),
      poster,
      cup,
      publicPreference: false,
    };
    await localService.saveResult(result);
    if (token !== revision) return;
    session.completed = true;
    persist();
    setPoster();
    go("/result", true);
    if (storageWarning) toast(storageWarning);
  } catch (e) {
    if (token !== revision) return;
    document.querySelector("#task-text")!.textContent = "成果尚未完成";
    document.querySelector("#prepare-error")!.innerHTML = pages.errorBlock(
      (e as Error).message,
      "retry-prepare",
    );
  } finally {
    busy = false;
  }
}
async function render() {
  const token = ++revision;
  document.querySelectorAll("dialog").forEach((dialog) => dialog.remove());
  cleanup();
  cleanup = () => {};
  viewer?.pause();
  route = readRoute();
  window.scrollTo({ top: 0, behavior: "instant" });
  app.className = `route-${route.split("/")[1] || "home"}`;
  document.title = `${route === "/create" ? "五次添彩" : route === "/ranking" ? "共彩榜" : route === "/result" ? "添彩成果" : "为 APEC 添彩"} · 东方雅韵`;
  switch (route) {
    case "/intro":
      await loadOpening();
      break;
    case "/home":
      app.innerHTML = pages.landing(session);
      break;
    case "/create":
      app.innerHTML = pages.editor(session);
      try {
        await mountViewer(
          document.querySelector<HTMLElement>("#viewer-host")!,
          false,
          token,
        );
      } catch (e) {
        if (token === revision) contextError((e as Error).message);
      }
      break;
    case "/prepare":
      await prepare(token);
      break;
    case "/result":
      app.innerHTML = pages.resultPage(result, posterUrl);
      break;
    case "/view3d":
      if (!result) {
        go("/result", true);
        return;
      }
      app.innerHTML = pages.result3d();
      try {
        await mountViewer(
          document.querySelector<HTMLElement>("#viewer-host")!,
          true,
          token,
        );
      } catch (e) {
        if (token === revision) contextError((e as Error).message);
      }
      break;
    case "/ranking": {
      const works = await localService.getBoard();
      if (token !== revision) return;
      app.innerHTML = pages.ranking(works, !!result);
      break;
    }
    case "/rules":
      app.innerHTML = pages.rules();
      break;
    case "/awards/postal":
      app.innerHTML = pages.awardPage("postal");
      break;
    case "/awards/pickup":
      app.innerHTML = pages.awardPage("pickup");
      break;
    case "/address":
      app.innerHTML = pages.address();
      break;
    case "/address/done":
      app.innerHTML = pages.awardPage("postal", true);
      break;
    default:
      if (route.startsWith("/work/")) {
        const id = route.split("/")[2] ?? "";
        const w = await localService.getWork(id);
        if (token !== revision) return;
        app.innerHTML = pages.workPage(w);
      } else {
        app.innerHTML =
          pages.header("页面未找到", true) +
          `<main class="empty-state"><h1>这一页还未展开</h1><a class="primary silk" href="#/home">返回首页</a></main>`;
      }
  }
  if (token === revision && route !== "/intro") {
    const h = app.querySelector<HTMLElement>("h1");
    if (h) {
      h.tabIndex = -1;
      h.focus({ preventScroll: true });
    }
  }
}
function updatePanel(animate = false) {
  if (animate) window.scrollTo({ top: 0, behavior: "instant" });
  document.querySelector(".progress-mount")!.innerHTML =
    pages.progress(session);
  document.querySelector(".panel-mount")!.innerHTML = pages.stepPanel(session);
  const ribbon = document.querySelector<HTMLElement>(".glass-divider");
  if (animate && ribbon) {
    ribbon.classList.remove("sweeping");
    void ribbon.offsetWidth;
    ribbon.classList.add("sweeping");
  }
  if (animate)
    document
      .querySelector<HTMLElement>("#step-title")
      ?.focus({ preventScroll: true });
}
function openDialog(type: "share" | "restart") {
  const dialog = document.createElement("dialog");
  dialog.className = "dialog";
  dialog.innerHTML = `<button class="icon-button dialog-close" aria-label="关闭">${icons.close}</button>${type === "share" ? '<h2>把东方雅韵，分享给朋友</h2><p>回到海报，长按保存图片，再从相册分享给朋友。</p><p class="small-note">当前为本地演示，不生成跨设备作品链接，也不记录真实分享归因。</p><button class="primary silk dialog-confirm">回到海报</button>' : '<h2>重新落笔，添一份新彩</h2><p>本浏览器中的五步选择和当前成果将被清空。</p><div class="dialog-actions"><button class="secondary dialog-cancel">保留这份心意</button><button class="primary silk dialog-confirm">重新体验</button></div>'}`;
  document.body.append(dialog);
  const close = () => {
    dialog.close();
    dialog.remove();
  };
  dialog.querySelector(".dialog-close")!.addEventListener("click", close);
  dialog.querySelector(".dialog-cancel")?.addEventListener("click", close);
  dialog.addEventListener("cancel", () => dialog.remove());
  dialog
    .querySelector(".dialog-confirm")!
    .addEventListener("click", async () => {
      if (type === "restart") {
        session.draft = freshDraft();
        session.completed = false;
        result = null;
        setPoster();
        persist();
        await localService.clearResult();
        close();
        go("/create");
      } else close();
    });
  dialog.showModal();
}
app.addEventListener("click", async (e) => {
  const element = (e.target as Element).closest<HTMLElement>("button,a");
  if (!element || element.hasAttribute("disabled")) return;
  const value = element.dataset.choice;
  if (value && route === "/create") {
    session.draft = choose(session.draft, session.draft.step, value);
    persist();
    updatePanel();
    return;
  }
  if (element.dataset.step !== undefined && route === "/create") {
    session.draft.step = Number(element.dataset.step);
    persist();
    updatePanel(true);
    return;
  }
  switch (element.dataset.action) {
    case "start":
      go("/create");
      break;
    case "finish-intro":
      finishIntro();
      break;
    case "replay":
      go("/intro");
      break;
    case "retry-intro":
      void render();
      break;
    case "rules":
      returnTo = route;
      go("/rules");
      break;
    case "back":
      if (route === "/rules") go(returnTo);
      else if (route === "/view3d") go("/result");
      else if (route === "/prepare") go("/create");
      else if (route === "/address") go("/awards/postal");
      else if (route.startsWith("/awards") || route.startsWith("/work"))
        go("/ranking");
      else go("/home");
      break;
    case "next-step":
      if (!session.draft.choices[steps[session.draft.step].id]) return;
      if (session.draft.step < 4) {
        session.draft.step++;
        persist();
        updatePanel(true);
      } else go("/prepare");
      break;
    case "previous-step":
      session.draft.step = Math.max(0, session.draft.step - 1);
      persist();
      updatePanel(true);
      break;
    case "view3d":
      go("/view3d");
      break;
    case "result":
      go("/result");
      break;
    case "share":
      openDialog("share");
      break;
    case "restart":
      openDialog("restart");
      break;
    case "zoom-in":
      viewer?.zoom(0.85);
      break;
    case "zoom-out":
      viewer?.zoom(1.15);
      break;
    case "reset-view":
      viewer?.reset();
      break;
    case "retry-viewer":
      viewer?.dispose();
      viewer = null;
      void render();
      break;
    case "retry-prepare":
      viewer?.dispose();
      viewer = null;
      void render();
      break;
  }
});
app.addEventListener("keydown", (e) => {
  const target = (e.target as Element).closest<HTMLElement>('[role="radio"]');
  if (
    !target ||
    route !== "/create" ||
    ![
      "ArrowRight",
      "ArrowLeft",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End",
    ].includes(e.key)
  )
    return;
  e.preventDefault();
  const options = steps[session.draft.step].options,
    current = options.findIndex((o) => o[0] === target.dataset.choice);
  const next =
    e.key === "Home"
      ? 0
      : e.key === "End"
        ? options.length - 1
        : (current +
            (["ArrowRight", "ArrowDown"].includes(e.key)
              ? 1
              : options.length - 1)) %
          options.length;
  session.draft = choose(session.draft, session.draft.step, options[next][0]);
  persist();
  updatePanel();
  document
    .querySelector<HTMLElement>(`[data-choice="${options[next][0]}"]`)
    ?.focus();
});
app.addEventListener("change", async (e) => {
  const t = e.target as HTMLInputElement;
  if (t.dataset.action === "public-preference" && result) {
    result.publicPreference = t.checked;
    await localService.saveResult(result);
    toast("已记录本地意愿；真实公开参榜待服务接入。");
  }
});
app.addEventListener("submit", (e) => {
  if ((e.target as HTMLFormElement).id === "demo-address") {
    e.preventDefault();
    go("/address/done");
  }
});
window.addEventListener("hashchange", () => {
  if (bootstrapped) void render();
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) viewer?.pause();
  else if (["/create", "/prepare", "/view3d"].includes(route)) viewer?.resume();
});
window.addEventListener("pagehide", () => viewer?.pause());
// Read-only inspection interface for integration tests; no production mutations exposed.
Object.assign(window, {
  h5Debug: () => ({
    route,
    session: structuredClone(session),
    result: result
      ? {
          id: result.id,
          modelVersion: result.modelVersion,
          styleVersion: result.styleVersion,
          demo: result.demo,
          posterBytes: result.poster.size,
        }
      : null,
    viewer: viewer?.debug(),
    gsEnabled: false,
    busy,
  }),
});
async function boot() {
  result = await localService.getResult();
  if (
    result &&
    (!(result.poster instanceof Blob) ||
      result.styleVersion !== activityConfig.styleVersion ||
      result.modelVersion !== activityConfig.modelVersion)
  )
    result = null;
  if (session.completed && !result) {
    session.completed = false;
    persist();
  }
  setPoster();
  bootstrapped = true;
  if (!location.hash) history.replaceState(null, "", `#${entryRoute(session)}`);
  await render();
  if (storageWarning) toast(storageWarning);
}
void boot();
if (import.meta.hot)
  import.meta.hot.dispose(() => {
    cleanup();
    viewer?.dispose();
    if (posterUrl) URL.revokeObjectURL(posterUrl);
  });
