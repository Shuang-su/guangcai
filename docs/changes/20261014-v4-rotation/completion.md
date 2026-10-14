# Completion record

The auto-rotation speed changes from +0.7 to -0.7. Rotation speed magnitude, user drag controls, models, materials and assets remain unchanged.

Validation completed before deployment:
- Existing 20 tests passed; TypeScript/Vite production build passed. Unchanged texture prebuild was skipped with npm --ignore-scripts run build.
- Browser UI start/stop: previous public version moved -0.05369625254336817 radians in 900 ms; updated local production moved +0.05369625254336805 radians. Same magnitude, opposite direction.
- Stop settled drift is below 0.000001 radians; both runs had zero page errors. Evidence: guangcai-china-preview/output/playwright/v4-rotation/{before,after}.json.

Published and verified:
- Source checkpoint: fc3722cd13bd387bc574cb75f1464f7ee06318f6.
- V4 deployment: 6acec92d0ea6dae54a033d56. Public browser movement is +0.05580670205135686 radians / 900 ms, with zero page exceptions and stable stop after damping settles. Timing varies with browser rendering cadence.
- All 404 public files match Netlify SHA-1 and the archived SHA-256 manifest. Snapshot added by same-volume rename to avoid an unnecessary duplicate on the nearly-full data volume.
- V4 and V3 have no Git repo/provider/branch binding. V3 remains at 6ace443df7425f433e717eb0.
- GitHub currently reports no automated checks. Existing local tests, production build and runtime checks are the validation evidence. Initial stop smoke omitted damping settling time; corrected browser check passed without changing product damping.

User authorized push and merge of this update. PR #15 will be merged into its existing codex/china-3.0 base after the release checkpoint is pushed. PR #13 remains outside this merge scope; this does not advance main. Merge status and commit will be verified from GitHub, separately from the manual deployment.
