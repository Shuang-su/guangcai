import { icons } from "../ui/graphics";
const clip = (v: number) => Math.max(0, Math.min(1, v));
export function introMarkup() {
  return `<section class="intro-scroll" aria-label="上滑推进的分层开场"><div class="intro-stage"><div class="intro-landscape" aria-hidden="true"></div><div class="intro-glow" aria-hidden="true"></div><div class="intro-light" aria-hidden="true"></div><svg class="intro-lines" viewBox="0 0 800 1000" fill="none" aria-hidden="true">${Array.from({ length: 14 }, (_, i) => `<path d="M${-160 + i * 9} ${700 + i * 6} C${40 + i * 19} ${140 - i * 12} ${650 - i * 8} ${970 - i * 21} ${820 + i * 7} ${110 - i * 3}" stroke="${["#ad4138", "#6b979e", "#b89b64", "#8995b1"][i % 4]}" stroke-width="${i % 4 === 0 ? 1.8 : 0.75}" pathLength="1"/>`).join("")}</svg><div class="intro-orbit" aria-hidden="true"></div><img class="intro-cup" src="${import.meta.env.BASE_URL}media/white-cup.png" alt="真实一号杯模型的中性白瓷渲染图"><div class="intro-copy"><p class="chapter-label">序 · 微光</p><h1>一束微光<br>万千可能</h1><p class="intro-description">以一笔心意，开启添彩之旅</p></div><div class="intro-controls"><button class="scroll-hint" data-action="advance-intro">上滑，循光而行<span>${icons.next}</span></button><button class="primary intro-finish" data-action="complete-scroll">开始添彩 ${icons.next}</button><div class="intro-track"><span></span></div><p class="intro-motion-note">随手指推进 · 下滑可回看</p></div></div></section>`;
}
export function bindIntro(host: HTMLElement, onFinished: () => void) {
  const stage = host.querySelector<HTMLElement>(".intro-stage")!,
    root = host.querySelector<HTMLElement>(".intro-scroll")!;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let frame = 0,
    progress = 0;
  const chapter = host.querySelector<HTMLElement>(".chapter-label")!,
    title = host.querySelector("h1")!,
    description = host.querySelector<HTMLElement>(".intro-description")!,
    hint = host.querySelector<HTMLElement>(".scroll-hint")!,
    finish = host.querySelector<HTMLElement>(".intro-finish")!;
  const chapters = [
    ["序 · 微光", "一束微光<br>万千可能", "以一笔心意，开启添彩之旅"],
    ["一 · 相遇", "线与线相遇<br>心与心相连", "山海相逢，交织多彩的可能"],
    ["二 · 共彩", "万彩汇聚<br>东方雅韵", "把一份祝愿，寄于一器之间"],
    ["三 · 落定", "一器承雅韵<br>五笔添新彩", "从这里，开始你的五次添彩"],
  ];
  let previous = -1;
  if (reduced) {
    root.classList.add("reduced");
    host.querySelector<HTMLElement>(".intro-motion-note")!.textContent =
      "已减少动态效果 · 点击继续";
  }
  const update = () => {
    frame = 0;
    if (!reduced)
      progress = clip(
        (window.scrollY - root.offsetTop) /
          Math.max(1, root.offsetHeight - innerHeight),
      );
    const reveal = clip((progress - 0.1) / 0.56),
      cup = clip((progress - 0.62) / 0.27);
    stage.style.setProperty("--p", String(progress));
    stage.style.setProperty("--line-reveal", String(reveal));
    stage.style.setProperty("--cup", String(cup));
    stage.style.setProperty("--land-y", `${(1 - progress) * 130}px`);
    stage.style.setProperty("--line-y", `${(progress - 0.5) * -160}px`);
    stage.style.setProperty("--cup-y", `${(1 - cup) * 80}px`);
    const i = Math.min(3, Math.floor(progress * 4));
    if (i !== previous) {
      previous = i;
      chapter.textContent = chapters[i][0];
      title.innerHTML = chapters[i][1];
      description.textContent = chapters[i][2];
    }
    const end = progress > 0.94;
    finish.hidden = !end;
    hint.hidden = end;
    hint.innerHTML = `${reduced ? "继续" : "上滑，循光而行"}<span>${icons.next}</span>`;
    stage.querySelector<HTMLElement>(".intro-track span")!.style.transform =
      `scaleX(${progress})`;
    stage.dataset.progress = progress.toFixed(3);
  };
  const scroll = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  const advance = () => {
    if (reduced) {
      progress = clip(progress + 0.34);
      update();
    } else
      window.scrollTo({
        top:
          root.offsetTop +
          Math.min(1, progress + 0.34) * (root.offsetHeight - innerHeight),
        behavior: "smooth",
      });
  };
  hint.addEventListener("click", advance);
  finish.addEventListener("click", onFinished);
  window.addEventListener("scroll", scroll, { passive: true });
  window.addEventListener("resize", scroll);
  update();
  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("scroll", scroll);
    window.removeEventListener("resize", scroll);
  };
}
