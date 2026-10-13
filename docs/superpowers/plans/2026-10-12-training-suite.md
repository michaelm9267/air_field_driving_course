# 3 WG / JBER Training Suite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Deliver all seven approved improvements as usable, tested additions to the Elmendorf study companion.

**Architecture:** Keep the existing React/static deployment and navy/teal design. Add focused training components driven by sourced lesson data, a shared progress hook, a progress dashboard, and a local briefing editor. The existing knowledge quiz becomes the sixth launchable module alongside five new training modules; winter/night scenarios share the general decision engine.

**Tech Stack:** Existing React 18, CSS/SVG, Jest/Testing Library, localStorage, and optional browser speech synthesis. No new product dependency or backend.

**Spec:** `docs/superpowers/specs/2026-10-12-training-suite-design.md`, approved by the user.

## Global constraints

- Preserve existing quiz, reference desk, published diagram, and session retention.
- Store no names, ranks, units, certification numbers, or voice recordings.
- Treat exercises and clearances as simulated training; do not fabricate operational routes, closures, or current hot spots.
- Source every exercise from the supplied September 2026 parent guidance and 3 WG supplement, resolving local additions and conflicts.
- Keep quiz map assessments separate from unrestricted reference-map annotations.
- Render imported briefing text safely and accept only http/https source links.
- Maintain keyboard operation, transcripts, text map alternatives, reduced-motion behavior, and layouts down to 320 pixels.
- Do not publish externally or copy source PDFs into public assets.
- This checkout has no Git repository. Back up before product edits; record task completion in an execution ledger instead of creating commits/worktrees.

## Review focus

1. Malformed/unavailable browser storage must not stop training; test read, write, quota, and unsupported-schema failures in Task 1.
2. Retries and rerenders must not inflate first-attempt accuracy or duplicate completions; test stable result IDs and submission events in Tasks 2 and 6.
3. Map zoom/touch sizing must not shift answers or expose answers prematurely; test normalized target positions and browser zoom behavior in Task 3.
4. Unsupported audio and reduced-motion preferences must retain usable text flows; test speech cancellation/fallback and paused visual descriptions in Tasks 4 and 5.
5. Imported draft content and date boundaries must not masquerade as current shared notices; test malformed/unsafe import, local-date expiry, and draft labels in Task 7.

## Task 1: Shared study results and resilient storage

**Create:** `src/study/progress.js`, `src/study/useStudyProgress.js`, `src/study/progress.test.js`.

**Interfaces:**
- `readStudyState(storage) -> { state, warning }` and `writeStudyState(storage, state) -> { warning }` use key `jber-airfield-study-v1`.
- State is `{ version: 1, remember: boolean, results: [], quizHistory: [], drafts: [] }`.
- Exercise results extend the approved interface with `id`, `completed`, and `firstAttemptCorrect`; `correct` denotes the first-attempt outcome, not an erased retry history.
- `useStudyProgress()` exposes `{ state, warning, recordExercise(result), recordQuiz(result), saveDrafts(drafts), setRemember(enabled), clearProgress() }`.

- [x] Write tests asserting invalid JSON/version and thrown reads yield an empty usable state; a quota failure returns a warning; duplicate event IDs produce one record; memory-off records update memory without writing attempts.
- [x] Run `CI=true npm test -- --watchAll=false --runInBand src/study/progress.test.js`; inspect the expected failures before implementation.
- [x] Implement schema validation, guarded storage access, result deduplication, and hook. Persist the user's memory setting once when changed; after disabling, stop result/draft writes. Keep any already saved history until the user explicitly clears it.
- [x] Run the complete test suite and record results in `docs/superpowers/plans/training-suite-execution.md`.

## Task 2: General and winter/night decision scenarios

**Create:** `src/study/scenarios.js`, `src/components/training/ScenarioTrainer.jsx`, `src/components/training/ScenarioTrainer.test.js`, `src/components/training/ExerciseFeedback.jsx`.

**Interfaces:**
- `scenarioCollections` maps `scenarios` and `winter` to exercise arrays.
- Each exercise has `id`, `title`, `situation`, `steps`, and sources. Each step supplies choices with stable IDs, `correctChoice`, explanations, and wrong-choice consequences.
- `ScenarioTrainer({ moduleId, exercises, onResult })` emits one result per completed attempt through the Task 1 interface. `ExerciseFeedback({ correct, explanation, reference, source })` renders reusable sourced feedback.

- [x] Write tests where an incorrect first choice followed by correction completes the exercise with `firstAttemptCorrect: false`; wrong choices cannot advance; next exercise clears feedback; completed content moves focus to its heading.
- [x] Run the focused tests and verify these behaviors fail before adding code.
- [x] Implement six general exercises (radio failure, disabled CMA vehicle, unclear instruction, aircraft priority, separated escort, FOD) and four winter/night exercises (snow/ice speed, faded/obscured markings, headlights, visibility). Every scenario has at least two decisions and cited feedback.
- [x] Verify content against source extracts, run the whole test suite, and update the ledger.

## Task 3: Published map drills and crossing sequence

**Create:** `src/study/mapDrills.js`, `src/components/training/MapTrainer.jsx`, `src/components/training/MapTrainer.test.js`.

**Interfaces:**
- `mapDrills` exports six identification exercises plus one crossing-sequence exercise.
- Location targets use `{ id, label, x, y }`, where `x`/`y` are normalized source-image percentages; before submission labels identify neutral targets A/B/C rather than their answers.
- `MapTrainer({ onResult })` supports published-image target selection, a text alternative, zoom/fit controls, and a route sequence built from stable step IDs.

- [x] Write tests asserting wrong target feedback, correct result emission, identical normalized target placement after zoom, no pre-answer target-name leakage, working text selection, and rejection of an out-of-order crossing sequence.
- [x] Run and inspect the focused failing tests.
- [x] Implement runway 06/24, runway 16/34, Management/Tower, CMA legend, VFR marking, and instrument marking drills. Use the published image for locations and sourced illustrative markings where recognition is required. Implement simulated crossing sequence: stop short, obtain specific clearance, read back, visually scan, cross, report off/location.
- [x] Run the full suite and inspect desktop/mobile target scaling in the browser; update the ledger.

## Task 4: Simulated radio trainer

**Create:** `src/study/radioExercises.js`, `src/components/training/RadioTrainer.jsx`, `src/components/training/RadioTrainer.test.js`.

**Interfaces:**
- `radioExercises` contains six exercises with `id`, `transcript`, labeled phrase segments, accepted ordered segment-ID sequences, explanation, reference, and source.
- `RadioTrainer({ onResult })` constructs an answer from selectable segments; learners can remove/reset segments before checking.

- [x] Write tests rejecting a missing hold-short restriction or runway number, accepting the complete prescribed sequence, keeping the transcript available without speech, and canceling a supported speech adapter when switching exercises or unmounting.
- [x] Run and verify the expected failures. Mock only the external speech API, not answer evaluation.
- [x] Implement hold-short, route restrictions, say-again, go-ahead, crossing-complete, and escort exercises. Add optional Play/Stop browser speech, visible transcript, unavailable-audio message, and cleanup. Explain that synthetic speech is a training convenience and accepted phrase ordering follows the exercise, not an operational speech-recognition system.
- [x] Run the entire suite and update the ledger.

## Task 5: Animated signal and marking recognition

**Create:** `src/study/visualExercises.js`, `src/components/training/VisualTrainer.jsx`, `src/components/training/SignalIllustration.jsx`, `src/components/training/VisualTrainer.test.js`.
**Modify:** `src/App.css` for restrained animations, paused states, and reduced motion.

**Interfaces:**
- `visualExercises` exports all five vehicle light-gun signals plus runway guard lights, mandatory runway signs, taxiway direction/location signs, and VFR/instrument markings (11 examples).
- `SignalIllustration({ kind, paused })` provides a semantic image description identifying the visual pattern without revealing its meaning.
- `VisualTrainer({ onResult })` exposes Learn/Check modes and pause control.

- [x] Write tests showing Check mode hides meanings/references until an answer, Learn reveals explanations, Pause preserves a textual flashing/steady/alternating cue, and changing examples clears feedback.
- [x] Run the focused tests and inspect failures.
- [x] Implement large SVG/CSS examples, explicit answer choices, sourced feedback, slow animation, and a reduced-motion CSS override. No visual meaning depends only on animation or color.
- [x] Run the full suite and inspect reduced-motion behavior in a real browser; update the ledger.

## Task 6: Progress dashboard and quiz integration

**Create:** `src/components/StudyProgress.jsx`, `src/components/StudyProgress.test.js`.
**Modify:** `src/components/QuestionBox.jsx`, `src/App.test.js`.

**Interfaces:**
- `StudyProgress({ progress, onReviewQuestions, onOpenModule })` consumes the Task 1 hook result.
- Extend `QuestionBox` with optional `onComplete(result)`; emit a stable event once from explicit Finish, including `{ id, completedAt, testMode, outcomes: [{ questionId, category, correct }] }`.
- `onReviewQuestions(questionIds)` launches an existing practice quiz filtered by missed IDs. Later correct quiz outcomes update the latest review suggestion while retaining attempt history.

- [x] Write tests proving a rerender does not duplicate a finished quiz, a corrected review removes its weak-item suggestion without deleting history, memory toggle persists its preference, and clearing requires explicit confirmation.
- [x] Run and inspect failures.
- [x] Implement first-attempt accuracy, completed exercises, recent activity, weak categories, missed-question review, module links, memory setting, storage warnings, and local clear confirmation. Handle an empty history with useful launch actions.
- [x] Run all existing and new tests; update the ledger.

## Task 7: Local briefing editor and JSON exchange

**Create:** `src/files/briefings.json`, `src/study/briefings.js`, `src/components/LocalBriefing.jsx`, `src/components/LocalBriefing.test.js`, `docs/briefing-maintenance.md`, `public/briefing-example.json`.

**Interfaces:**
- Bundled entries contain `id`, `title`, `category`, `body`, `effectiveDate`, `reviewDate`, `sourceCitation`, `sourceUrl`, and author/reviewer attribution.
- `validateBriefing(entry) -> errors`, `parseBriefingImport(text) -> { entries, errors }`, `briefingDateStatus(entry, today) -> 'upcoming' | 'within review period' | 'expired'` use calendar-day comparisons. Review date is inclusive; the following local date is expired.
- `LocalBriefing({ drafts, onSaveDrafts, storageWarning })` maintains local drafts through Task 1 and exports a versioned JSON file.

- [x] Write tests for required fields, malformed dates, review-before-effective dates, unsafe links, duplicate import IDs, malformed JSON, safe literal rendering, and expiry across local date boundaries. Assert imported drafts never become bundled/shared references.
- [x] Run and inspect the expected failures.
- [x] Implement four dated sourced training-reference cards, local editing, validation, file import, JSON download, local-draft labels, and visible expiry/upcoming status. Provide the sample file and exact reviewed-data-file/rebuild workflow. Cap import file size and reject invalid schemas without overwriting valid drafts.
- [x] Run the full suite and browser-check import/export; update the ledger.

## Task 8: Suite navigation, styling, and end-to-end verification

**Create:** `src/components/TrainingHub.jsx`, `src/components/TrainingHub.test.js`.
**Modify:** `src/App.js`, `src/components/Header.jsx`, `src/App.css`, `README.md`, `docs/content-review.md`.

**Interfaces:**
- TrainingHub launches `scenarios`, `map`, `radio`, `visual`, `winter`, and the existing `quiz` module.
- App owns page/module navigation and one shared progress hook. Keep the quiz mounted across page navigation. Keep the active module mounted while its page is hidden; stop audio when leaving the trainer.
- Add Training, Progress, and Local Briefing navigation with a wrapping mobile layout; show progress and training entry points on Overview.

- [x] Write integration tests launching every module, returning to an in-progress exercise, retaining the existing quiz, and starting a short missed-question review from Progress.
- [x] Run and inspect failures.
- [x] Integrate pages/modules and responsive styling. Add predictable heading focus on page/module transitions without focusing hidden content. Update run/content/maintenance documentation and ledger decisions.
- [x] Run `CI=true npm test -- --watchAll=false --runInBand` and `CI=true npm run build`; require successful exits.
- [x] Run browser flows for scenario retry/completion, map/text/sequence drills, radio fallback/playback cleanup, visual hidden answers/reduced motion, reload persistence, memory-off behavior, briefing import/export, and overflow at desktop, 390, and 320 pixels. Save representative previews and a check record.
- [x] Request one independent final code/content review through the review skill. Resolve material findings and repeat affected verification.
- [x] Mark plan/ledger tasks complete only when verified. Report additions, tests, preview URL, and material limits, including local-only drafts/progress and source currency.

## Plan self-review

All seven approved additions map to Tasks 1–8; existing knowledge practice supplies the sixth Training launch card. The shared result/storage interfaces are consistent across consumers. The five identified failure classes each have an owning test step. Source limits, local-only maintenance, no new dependencies, device privacy, and official certification boundaries are preserved. Execution is sequential in the current workspace, with one final independent reviewer.
