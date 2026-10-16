const wrap = (body: string, box = "0 0 24 24") =>
  `<svg viewBox="${box}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
export const icons = {
  back: wrap('<path d="m14 5-7 7 7 7"/>'),
  next: wrap('<path d="m9 5 7 7-7 7"/>'),
  home: wrap('<path d="m3 10 9-7 9 7v11h-6v-7H9v7H3z"/>'),
  rank: wrap(
    '<path d="M8 3h8v8a4 4 0 0 1-8 0zM8 5H4v3a4 4 0 0 0 4 4m8-7h4v3a4 4 0 0 1-4 4M12 15v5m-4 1h8"/>',
  ),
  reset: wrap('<path d="M4 10a8 8 0 1 1 1 8M4 4v6h6"/>'),
  plus: wrap('<path d="M12 5v14M5 12h14"/>'),
  minus: wrap('<path d="M5 12h14"/>'),
  check: wrap('<path d="m5 12 4 4L19 6"/>'),
  close: wrap('<path d="m6 6 12 12M6 18 18 6"/>'),
  play: wrap('<path d="m9 5 11 7-11 7z"/>'),
  move: wrap(
    '<path d="M12 2v20M2 12h20m-13-7 3-3 3 3M9 19l3 3 3-3M5 9l-3 3 3 3m14-6 3 3-3 3"/>',
  ),
};
export const ribbons = `<svg viewBox="0 0 800 380" fill="none" aria-hidden="true"><path d="M-80 365C70 80 170 120 390 185S710 260 890 30" stroke="#b49359"/><path d="M-90 350C120 65 190 130 400 190S730 210 870 15" stroke="#378c9a"/><path d="M-40 380C100 100 200 140 400 205S780 255 885 50" stroke="#b44338"/><path d="M-20 400C80 150 215 165 405 218S790 275 900 75" stroke="#b49359"/></svg>`;
const colors: Record<string, string> = {
  blue: "#257eae",
  purple: "#8973aa",
  gold: "#c3a053",
  green: "#60897b",
  red: "#b34c43",
};
export function motif(id: string, index: number) {
  if (colors[id])
    return `<span class="color-chip" style="--swatch:${colors[id]}"></span>`;
  let body = "";
  if (
    [
      "sea",
      "cross",
      "star",
      "tide",
      "weave",
      "reflect",
      "cluster",
      "relay",
    ].includes(id)
  ) {
    if (id === "star")
      body =
        '<path d="m9 42 28-28 25 29 29-32M37 14l22 4 3 25"/><path d="m37 7 2 5 5 2-5 2-2 5-2-5-5-2 5-2zM62 35l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/><circle cx="9" cy="42" r="2"/><circle cx="91" cy="11" r="2"/>';
    else if (id === "tide")
      body = Array.from(
        { length: 5 },
        (_, i) =>
          `<path d="M${8 - i * 6} 53q22 ${-64 + i * 8} 44 0q22 ${-64 + i * 8} 44 0"/>`,
      ).join("");
    else
      body = Array.from(
        { length: 6 },
        (_, i) =>
          `<path d="M5 ${49 - i * 2}C${20 + i * 4} ${40 - i * 4} ${51 + i * 6} ${id === "cross" ? 52 - i * 5 : 17 - i * 3} 98 ${4 + i * 7}"/>`,
      ).join("");
  } else if (["bloom", "garden", "birds", "butterfly"].includes(id)) {
    if (id === "butterfly")
      body =
        '<path d="M50 42V14m0 14C18-5 5 14 29 32c-20 4-8 26 21 8m0-12C82-5 95 14 71 32c20 4 8 26-21 8M46 10l4 7 4-7"/>';
    else if (id === "birds")
      body =
        '<path d="M7 36q15-27 38 0 18-30 45-24M31 46q12-24 25 0 19-22 35-10"/>';
    else
      body =
        Array.from(
          { length: 8 },
          (_, i) =>
            `<ellipse cx="50" cy="18" rx="7" ry="16" transform="rotate(${i * 45} 50 31)"/>`,
        ).join("") + '<circle cx="50" cy="31" r="6"/>';
  } else
    body = `<path d="M2 50 27 14 46 40 68 7 99 50M18 50l25-28 22 28"/><circle cx="${75 - index * 4}" cy="12" r="5"/>`;
  return wrap(body, "0 0 104 60");
}
