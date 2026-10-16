import {
  freshSession,
  restoreSession,
  type Session,
  type ResultRecord,
} from "../domain/activity";
const SESSION_KEY = "apec-h5-session-v1";
let memoryResult: ResultRecord | null = null;
export let storageWarning = "";
export function loadSession(): Session {
  try {
    return restoreSession(
      JSON.parse(localStorage.getItem(SESSION_KEY) ?? "null"),
    );
  } catch {
    storageWarning = "浏览器未开放本地保存，本次体验将在当前页面保留。";
    return freshSession();
  }
}
export function saveSession(session: Session) {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return true;
  } catch {
    storageWarning = "本地空间不足或保存受限；离开页面可能丢失本次记录。";
    return false;
  }
}
function database(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("apec-h5-demo-v1", 1);
    req.onupgradeneeded = () => req.result.createObjectStore("results");
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
    req.onblocked = () => reject(new Error("本地存储暂时被占用"));
  });
}
async function resultTransaction<T>(
  mode: IDBTransactionMode,
  action: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  const db = await database();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("results", mode);
    const req = action(tx.objectStore("results"));
    tx.oncomplete = () => {
      db.close();
      resolve(req.result);
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error);
    };
    tx.onabort = () => {
      db.close();
      reject(tx.error ?? new Error("本地保存失败"));
    };
  });
}
export interface ActivityService {
  getResult(): Promise<ResultRecord | null>;
  saveResult(result: ResultRecord): Promise<void>;
  clearResult(): Promise<void>;
  getBoard(): Promise<DemoWork[]>;
  getWork(id: string): Promise<DemoWork | null>;
}
export interface DemoWork {
  id: string;
  title: string;
  author: string;
  demo: true;
  styleId: "original";
}
const workSeeds: DemoWork[] = [
  {
    id: "demo-01",
    title: "一器之间，山海相逢",
    author: "山海来信",
    demo: true,
    styleId: "original",
  },
  {
    id: "demo-02",
    title: "让美好，彼此相映",
    author: "同心之约",
    demo: true,
    styleId: "original",
  },
  {
    id: "demo-03",
    title: "共绘一抹东方雅韵",
    author: "向新而行",
    demo: true,
    styleId: "original",
  },
];
export const localService: ActivityService = {
  async getResult() {
    try {
      return (
        (await resultTransaction("readonly", (s) => s.get("latest"))) ??
        memoryResult
      );
    } catch {
      return memoryResult;
    }
  },
  async saveResult(result) {
    memoryResult = result;
    try {
      await resultTransaction("readwrite", (s) => s.put(result, "latest"));
    } catch {
      storageWarning = "成果仅保留在当前页面；浏览器未能持久保存图片。";
    }
  },
  async clearResult() {
    memoryResult = null;
    try {
      await resultTransaction("readwrite", (s) => s.delete("latest"));
    } catch {}
  },
  async getBoard() {
    return workSeeds.map((w) => ({ ...w }));
  },
  async getWork(id) {
    return workSeeds.find((w) => w.id === id) ?? null;
  },
};
