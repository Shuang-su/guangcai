import type { Draft, ResultRecord } from "../domain/activity";
// Integration boundary only. No remote transport, auth or attribution runs in this edition.
export interface RemoteActivityPort {
  getConfiguration(): Promise<{
    phase: "preview" | "active" | "closed";
    gsEnabled: boolean;
    rulesVersion: string;
    resultsPublished: boolean;
  }>;
  createWork(input: {
    draft: Draft;
    modelVersion: string;
    styleVersion: string;
    poster: Blob;
  }): Promise<{ workId: string; publicUrl: string }>;
  getWork(workId: string): Promise<{
    workId: string;
    modelVersion: string;
    styleVersion: string;
    posterUrl: string;
  }>;
  getRanking(cursor?: string): Promise<{
    items: { workId: string; rank: number; score: number }[];
    nextCursor?: string;
  }>;
  setPublic(workId: string, isPublic: boolean): Promise<void>;
  getAward(): Promise<{
    kind: "none" | "pending" | "postal" | "pickup";
    claimStatus: "unavailable" | "available" | "submitted" | "received";
  }>;
  recordReferral(input: {
    sourceWorkId: string;
    createdWorkId: string;
  }): Promise<void>;
}
export interface GaussianModule {
  load(asset: unknown): Promise<void>;
  on(event: "ready" | "error", handler: (detail?: unknown) => void): () => void;
  exit(): void;
  dispose(): void;
}
export type LocalDemoResult = ResultRecord; // Cannot be cast to a remote work or a share URL.
