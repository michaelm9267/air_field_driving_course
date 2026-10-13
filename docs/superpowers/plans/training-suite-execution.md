# Execution ledger — plan: 2026-10-12-training-suite.md

User approved the specification and plan; YES selects recommended native execution.
Backup: /tmp/airfield-before-training. No Git repository exists; work in place.
Pre-flight: Tasks 2–5 emit exercise results consumed by Task 1/6; preserve first-attempt outcome separately from completion.
Pre-flight: Task 6 adds explicit quiz submit events; Task 8 passes stable progress callbacks and preserves mounted sessions.
Pre-flight: Task 7 uses Task 1 draft persistence; storage-disabled mode must still permit editing/export in memory.
Pre-flight: Task 4 audio must stop when a mounted module becomes inactive, not only on unmount.
Ruling: Training has five new modules plus existing quiz practice — resolves original module-count wording without adding unrelated scope.
Task 1: complete — 15 tests pass. Storage recovery, quota warning, event deduplication, and corrected quiz history verified. Memory-off UI verification follows in Task 6.
Task 2: complete — 16 tests pass. Six general and four winter/night scenarios each have two decisions and source citations. Wrong decisions block progression and are retained in first-attempt history.
Task 3: verification — initial run found an ambiguous test selector matching two text alternatives; anchored the target selector. Normalized map targets, neutral overlays, text alternative, markings and simulated route sequence implemented. Browser scaling checks pending final integration.
Task 3: complete — normalized map tests pass; full Task 4 suite confirms no regressions.
Task 4: complete — 22 tests pass, including incomplete/complete readbacks, transcript fallback, and speech cancellation when inactive.
Task 5: complete — 24 tests pass. Eleven recognition examples, hidden check explanations, pause text and reduced-motion CSS implemented.
Ruling: Dashboard first-attempt accuracy applies to trainer attempts, while quiz results report submitted answers — practice quiz learners can change choices after feedback, so final quiz answers must not be mislabeled as first attempts.
Ruling: Briefing attribution fields request roles, not personal names — preserves the approved privacy constraint while supporting local maintenance context.
Task 6: complete — 27 tests pass. Existing quiz emits stable history events, first-attempt trainer metrics remain distinct, memory-off avoids new writes, and clearing requires confirmation.
Task 7: complete — 31 tests pass. Four bundled training references, safe date/link/schema validation, literal text rendering, local draft editor, import/export and maintenance instructions implemented.
Task 8: started — native sequential implementation; no product dependencies added.
Final review: no critical content/security errors. Fixed first-attempt overwrite after exploratory later choices, added unresolved quiz category breakdown, and stopped speech on browser-tab visibility changes. Regression tests watched fail, then 37 tests passed.
Ruling: Added explicit Try again to every completed trainer — makes repeated practice possible without selecting a different exercise first; new attempts receive new IDs. Regression verifies two distinct scenario results. Full suite: 38 tests pass.
Workspace change: an external Git initialization/merge occurred during final verification, producing 16 add/add conflicts with the original Dyess app. Backed up conflict contents to /tmp/airfield-merge-conflict-backup and resolved in favor of the reviewed JBER versions, preserving newly appended CSS and unstaged review fixes. Conflict files staged as resolved; no merge commit or publish performed.
Task 8: complete — full suite 38/38 passed; production build compiled successfully. Independent review findings fixed. Browser checks passed across desktop, 390 px and 320 px, covering all seven additions, persistence/reload, memory-off, text alternatives, speech fallback/cancel, animation pause/reduced motion, valid/unsafe import, JSON download and draft reload.
Artifacts: docs/training-browser-check.json and preview-training-lab, preview-study-progress, preview-local-briefing, preview-training-mobile PNGs. Automated browser runner: /tmp/airfield-browser/training-check.cjs.
Handoff: local preview http://localhost:3107. Existing deployment remains unchanged. All merge conflicts resolved; existing merge remains uncommitted. No external publication performed.
