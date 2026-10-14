export function mountInterface(app: HTMLDivElement) {
  app.innerHTML = `<canvas tabindex="0" aria-label="陶瓷杯。拖拽旋转，滚轮或双指缩放，点杯盖开合，点把手换款。按 H 查看说明。" aria-describedby="instructions"></canvas><p id="instructions" class="sr-only">S 切换款式，L 开合杯盖，V 切换整套、单杯与翻底，R 复位。方向键旋转，加减号缩放。</p><div id="status" class="sr-only" aria-live="polite"></div><div id="error" role="alert" hidden></div><dialog aria-label="观察器物"><h1>观察器物</h1><dl><dt>拖拽 · 单指滑动</dt><dd>旋转观察</dd><dt>滚轮 · 双指捏合</dt><dd>放大与缩小</dd><dt>点杯盖 · L</dt><dd>开合杯盖</dd><dt>点把手 · S</dt><dd>白地／金地</dd><dt>双点杯身 · V</dt><dd>整套／单杯／翻底</dd><dt>双点空白 · R</dt><dd>恢复初始视角</dd><dt>长按空白 · H</dt><dd>显示操作说明</dd></dl><p>纹样依据产品照片近似重建。器型尺寸为可调推定值。</p><button autofocus>继续观赏</button></dialog>`;
  const canvas = app.querySelector("canvas")!,
    dialog = app.querySelector("dialog")!,
    status = document.querySelector("#status")!,
    error = document.querySelector<HTMLDivElement>("#error")!;
  dialog.querySelector("button")!.onclick = () => dialog.close();
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog && e.clientX < dialog.getBoundingClientRect().left)
      dialog.close();
  });
  function fail(e: unknown) {
    console.error(e);
    error.hidden = false;
    error.textContent = `暂时无法完成显示：${e instanceof Error ? e.message : String(e)}。请检查浏览器的图形加速和本地资源连接后刷新。`;
  }

  return { canvas, dialog, status, error, fail };
}
