export const activityConfig = Object.freeze({
  phase: "preview",
  gsEnabled: false,
  rulesVersion: "preview-20260930",
  resultsPublished: false,
  modelVersion: "no1-round-20260929",
  styleVersion: "original-h5-1k-v1",
  styleId: "original",
  styleName: "花蝶 · 金地",
  demo: true,
  posterTemplateVersion: "waterink-v2",
} as const);
export const steps = [
  {
    id: "openness",
    short: "开放",
    title: "为开放添一线",
    question: "你希望这一笔，如何抵达远方？",
    options: [
      ["sea", "向海而开", "向外延展，拥抱更广阔"],
      ["cross", "海路交汇", "交汇汇聚，通向更多可能"],
      ["star", "星湾相连", "以点为星，照亮彼此的远方"],
      ["tide", "潮汐相拥", "顺应潮汐，在流动中彼此成就"],
    ],
  },
  {
    id: "innovation",
    short: "创新",
    title: "为创新添一形",
    question: "让新意，从怎样的形态生长？",
    options: [
      ["bloom", "繁花盛放", "层层绽放，生出新的想象"],
      ["birds", "百鸟和鸣", "各有其声，共鸣成章"],
      ["butterfly", "蝶舞新生", "轻盈舒展，向新而生"],
      ["garden", "花鸟相生", "万物相映，灵感共生"],
    ],
  },
  {
    id: "cooperation",
    short: "合作",
    title: "为合作添一重",
    question: "让彼此的心意，如何相遇？",
    options: [
      ["weave", "交织", "一线相牵，经纬相连"],
      ["reflect", "相映", "互为光彩，彼此照见"],
      ["cluster", "共簇", "聚少成多，同心成景"],
      ["relay", "接力", "一程相续，一路同行"],
    ],
  },
  {
    id: "prosperity",
    short: "繁荣",
    title: "为繁荣添一彩",
    question: "选一抹心意，共绘繁荣。",
    options: [
      ["blue", "海纳蓝", "包容如海"],
      ["gold", "同心金", "同心共进"],
      ["green", "共融绿", "共生共荣"],
      ["red", "繁盛红", "万象繁盛"],
    ],
  },
  {
    id: "future",
    short: "未来",
    title: "为未来添一愿",
    question: "把怎样的祝愿，送向明天？",
    options: [
      ["mountain", "山海相连", "山海虽远，心意相通"],
      ["new", "新意共生", "在相遇中，生长新的可能"],
      ["together", "携手同行", "以同行之力，赴更远之约"],
      ["future", "共赴繁荣", "愿每一种美好，都被看见"],
    ],
  },
] as const;
export type StepId = (typeof steps)[number]["id"];
export type Choices = Partial<Record<StepId, string>>;
export interface Draft {
  version: 1;
  step: number;
  choices: Choices;
  updatedAt: string;
}
export interface ResultRecord {
  id: string;
  modelVersion: string;
  styleVersion: string;
  styleId: "original";
  demo: true;
  createdAt: string;
  posterTemplateVersion?: string;
  poster: Blob;
  cup: Blob;
  publicPreference: boolean;
}
export interface Session {
  version: 1;
  introSeen: boolean;
  completed: boolean;
  draft: Draft;
}
export const freshDraft = (): Draft => ({
  version: 1,
  step: 0,
  choices: {},
  updatedAt: new Date().toISOString(),
});
export const freshSession = (): Session => ({
  version: 1,
  introSeen: false,
  completed: false,
  draft: freshDraft(),
});
export function validChoice(step: number, value: unknown) {
  return steps[step]?.options.some((o) => o[0] === value) ?? false;
}
export function isComplete(draft: Draft) {
  return steps.every((s, i) => validChoice(i, draft.choices[s.id]));
}
export function restoreSession(value: unknown): Session {
  const clean = freshSession();
  if (!value || typeof value !== "object") return clean;
  const v = value as Partial<Session>;
  if (v.version !== 1) return clean;
  clean.introSeen = v.introSeen === true;
  clean.completed = v.completed === true;
  if (v.draft?.version === 1) {
    for (let i = 0; i < steps.length; i++) {
      const key = steps[i].id,
        val = v.draft.choices?.[key];
      if (validChoice(i, val)) clean.draft.choices[key] = val;
    }
    if (v.draft.choices?.prosperity === "purple" && !clean.completed) clean.draft.step = 3;
    const firstIncomplete = steps.findIndex((s) => !clean.draft.choices[s.id]);
    clean.draft.step = Math.max(
      0,
      Math.min(
        v.draft.choices?.prosperity === "purple" && !clean.completed ? 3 : Number.isInteger(v.draft.step) ? v.draft.step : 0,
        firstIncomplete < 0 ? 4 : firstIncomplete,
      ),
    );
  }
  return clean;
}
export function choose(draft: Draft, step: number, value: string): Draft {
  if (!validChoice(step, value)) throw new Error("未知选项");
  return {
    ...draft,
    step,
    choices: { ...draft.choices, [steps[step].id]: value },
    updatedAt: new Date().toISOString(),
  };
}
export function entryRoute(session: Session) {
  return session.completed
    ? "/ranking"
    : session.introSeen
      ? "/home"
      : "/intro";
}
export function fixedResultIdentity() {
  return {
    modelVersion: activityConfig.modelVersion,
    styleVersion: activityConfig.styleVersion,
    styleId: activityConfig.styleId,
    demo: true as const,
  };
}
