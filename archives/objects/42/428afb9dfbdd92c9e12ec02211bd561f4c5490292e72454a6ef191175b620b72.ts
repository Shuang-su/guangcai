import { CupViewer } from "../viewer/cup-viewer";
const viewer = new CupViewer(
  document.querySelector<HTMLElement>("#stage")!,
  (message) => {
    throw new Error(message);
  },
);
const dataUrl = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(blob);
  });
Object.assign(window, {
  mediaRenderer: {
    async render(kind: "white" | "styled") {
      if (kind === "white") viewer.neutral();
      else await viewer.fixed();
      return dataUrl(await viewer.capture(1200, 1200));
    },
    debug: () => viewer.debug(),
  },
});
