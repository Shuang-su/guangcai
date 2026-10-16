import { activityConfig } from "../domain/activity";
export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const i = new Image();
    i.decoding = "async";
    const timer = setTimeout(
      () => reject(new Error("图片素材读取超时")),
      15000,
    );
    i.onload = () => {
      clearTimeout(timer);
      resolve(i);
    };
    i.onerror = () => {
      clearTimeout(timer);
      reject(new Error("图片素材读取失败"));
    };
    i.src = url;
  });
}
export async function createPoster(cup: Blob): Promise<Blob> {
  const objectUrl = URL.createObjectURL(cup);
  try {
    const [image, bg] = await Promise.all([
      loadImage(objectUrl),
      loadImage(`${import.meta.env.BASE_URL}media/landscape.webp`),
    ]);
    await document.fonts.ready;
    const c = document.createElement("canvas");
    c.width = 1080;
    c.height = 1500;
    const ctx = c.getContext("2d");
    if (!ctx) throw new Error("当前环境无法生成海报");
    ctx.fillStyle = "#f6f3ec";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.globalAlpha = 0.8;
    ctx.drawImage(bg, 0, 0, c.width, c.height);
    ctx.globalAlpha = 1;
    ctx.strokeStyle = "#b79a65";
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 40, 1000, 1420);
    ctx.strokeRect(51, 51, 978, 1398);
    ctx.fillStyle = "#a58b59";
    ctx.textAlign = "center";
    ctx.font = '64px "Songti SC", "Noto Serif CJK SC", serif';
    ctx.fillText("为 APEC 添彩", 540, 183);
    ctx.font = '27px "Songti SC", serif';
    ctx.fillText("一器承雅韵 · 五笔添新彩", 540, 244);
    ctx.font = "16px sans-serif";
    ctx.fillStyle = "#79715f";
    ctx.fillText("APEC CHINA 2026", 540, 292);
    const ribbon = (color: string, dy: number) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-50, 1120 + dy);
      ctx.bezierCurveTo(240, 720 + dy, 800, 1070 + dy, 1130, 650 + dy);
      ctx.stroke();
    };
    ribbon("#bc9b60", 0);
    ribbon("#8aaeb0", 22);
    ribbon("#b46558", 44);
    ctx.drawImage(image, 50, 320, 980, 980);
    ctx.fillStyle = "#172b4a";
    ctx.font = '38px "Songti SC", serif';
    ctx.fillText(activityConfig.styleName, 540, 1260);
    ctx.font = '23px "PingFang SC", sans-serif';
    ctx.fillStyle = "#686b6e";
    ctx.fillText("数字款式示意", 540, 1313);
    ctx.font = '20px "PingFang SC", sans-serif';
    ctx.fillText("预设款式，与五步选择暂未关联", 540, 1380);
    return await new Promise<Blob>((resolve, reject) =>
      c.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("海报生成失败，请重试"))),
        "image/png",
      ),
    );
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}
