import test from "node:test";
import assert from "node:assert/strict";
import {
  choose,
  entryRoute,
  fixedResultIdentity,
  freshDraft,
  freshSession,
  isComplete,
  restoreSession,
  steps,
} from "../src/domain/activity";
test("first visit, incomplete return and completed return use distinct routes", () => {
  const s = freshSession();
  assert.equal(entryRoute(s), "/intro");
  s.introSeen = true;
  assert.equal(entryRoute(s), "/home");
  s.completed = true;
  assert.equal(entryRoute(s), "/ranking");
});
test("draft updates are immutable; every step validates its own options", () => {
  const d = freshDraft();
  const next = choose(d, 0, "sea");
  assert.deepEqual(d.choices, {});
  assert.equal(next.choices.openness, "sea");
  assert.throws(() => choose(next, 1, "sea"));
  assert.throws(() => choose(next, 6, "sea"));
});
test("all 1024 possible choice paths resolve to exactly the same fixed identity", () => {
  const initial = fixedResultIdentity();
  let count = 0;
  const walk = (d: ReturnType<typeof freshDraft>, i: number) => {
    if (i === 5) {
      assert.ok(isComplete(d));
      assert.deepEqual(fixedResultIdentity(), initial);
      count++;
      return;
    }
    for (const o of steps[i].options) walk(choose(d, i, o[0]), i + 1);
  };
  walk(freshDraft(), 0);
  assert.equal(count, 1024);
});
test("invalid stored choices, step numbers and schema versions do not bypass steps", () => {
  assert.deepEqual(restoreSession({ version: 0 }).draft.choices, {});
  const s = restoreSession({
    version: 1,
    draft: {
      version: 1,
      step: 99,
      choices: {
        openness: "sea",
        innovation: "forged",
        future: "future",
        admin: "red",
      },
    },
  });
  assert.equal(s.draft.step, 1);
  assert.equal(s.draft.choices.innovation, undefined);
  assert.equal(Object.keys(s.draft.choices).length, 2);
  assert.ok(!isComplete(s.draft));
});
test("returning to change an earlier choice keeps the remaining choices", () => {
  let d = freshDraft();
  steps.forEach((s, i) => {
    d = choose(d, i, s.options[0][0]);
  });
  d = choose(d, 0, "star");
  assert.ok(isComplete(d));
  assert.equal(d.choices.future, "mountain");
  assert.equal(d.choices.openness, "star");
});

test("retiring purple preserves other choices and completed results", () => {
 const draft={version:1,step:4,choices:{openness:'sea',innovation:'bloom',cooperation:'weave',prosperity:'purple',future:'mountain'}};
 const s=restoreSession({version:1,introSeen:true,completed:false,draft});
 assert.equal(s.draft.step,3); assert.equal(s.draft.choices.prosperity,undefined);
 assert.equal(Object.keys(s.draft.choices).length,4);
 const done=restoreSession({version:1,introSeen:true,completed:true,draft});
 assert.equal(done.completed,true);
});
