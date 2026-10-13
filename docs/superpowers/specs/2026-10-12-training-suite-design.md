# 3 WG / JBER interactive training suite

## Approved intent

The user requested implementation of all seven proposed improvements: decision scenarios, interactive map drills, simulated radio practice, animated visual recognition, JBER winter/night scenarios, saved study progress, and a locally maintained briefing. The objective is a more effective Elmendorf airfield-driving study companion, retaining the existing quiz, reference desk, and published diagram.

The user approved this written specification in the conversation. Implementation-plan review is the remaining planning gate.

## Architecture and delivery

Extend the existing React application with a Training page containing five new study modules plus the existing knowledge-practice module and a separate Local Briefing page. Winter/night practice is a dedicated scenario collection using the same decision engine as the general scenarios. Add a Progress page, and integrate existing quiz results into its history. Keep the existing React/CSS design system and static GitHub Pages deployment model; no backend, paid service, login, or new product dependency is needed.

Use separate components for decision exercises, radio exercises, visual recognition, map drills, progress, and briefing maintenance. Store lesson content independently from rendering. Shared exercise results have one interface: `{ moduleId, exerciseId, correct, completedAt }`; quiz results additionally retain question IDs and category outcomes. Store no names, ranks, units, certification numbers, or voice recordings.

Deliver all additions in this workspace, verify them, and leave the local preview available. Publishing externally is not part of this change.

## 1. Decision scenarios

Provide at least six multistep exercises covering runway radio failure, disabled vehicles in the CMA, unclear ATC instructions, aircraft right of way, separated escort groups, and FOD after unimproved-surface travel.

Each exercise presents the situation and the immediate decision. Selecting an option reveals why it is correct or unsafe, with the source paragraph. Incorrect choices show a short simulated consequence and allow retry. Correct choices advance to the next decision. A scenario's successful completion requires all steps to be answered correctly; the result records whether the first attempt was correct separately from eventual completion so retries do not erase the learning gap.

No exercise runs a real vehicle-control system or contacts ATC. Clearly identify every simulated clearance and training situation.

## 2. Interactive map drills

Use the unchanged published Elmendorf diagram for identifying real features. Provide at least six exercises, including both runways, Airfield Management/Tower area, CMA legend recognition, and recognition of instrument/VFR hold markings.

For location exercises, expose selectable overlays on verified image features with touch-sized controls and keyboard equivalents. Record positions as normalized source-image coordinates so zoom and screen size cannot shift answer targets. Include an alternative text/list mode for users unable to use the visual targets.

Add a training route exercise that asks the learner to sequence required stopping, clearance, readback, visual-check, crossing, and crossing-complete reporting decisions. Depict the route as an explicitly simulated instructional sequence. Do not present an invented route as an approved Elmendorf route or fabricate current hot spots. Real hold positions are taught from the published diagram and source figures.

Hide answer overlays until the learner selects a response; keep the existing unrestricted reference map separate from an active assessment.

## 3. Radio communications trainer

Provide at least six radio exercises covering hold-short readback, route/readback restrictions, unclear instructions and “say again,” “go ahead,” runway-crossing completion reports, and escort communication.

Use browser speech synthesis for optional playback of clearly labeled simulated Tower instructions. Always expose the transcript; if speech is unavailable, the same exercise works completely through text. Supply Play and Stop controls, and cancel speech when leaving the trainer or changing exercises.

Let learners construct readbacks using selectable phrase segments. Evaluate required information and sequence against explicit accepted answers rather than an opaque language-model grader. Explain missing runway designations, hold-short restrictions, call signs, or unauthorized movement. No microphone permission, external audio service, or recording is needed.

## 4. Visual recognition

Provide animated training representations of all five vehicle light-gun signals, runway guard lights, mandatory runway signs, taxiway direction/location signs, and VFR/instrument hold markings. Use SVG/CSS with large labels and an accessible description.

Provide Learn and Check modes. Learn mode includes the meaning and source. Check mode hides the meaning until the learner answers. Use slow, restrained animation; honor reduced-motion preferences and expose a Pause animation control. A static textual indication of steady, flashing, or alternating remains available when animation is paused.

All examples are training illustrations, not live signals. Distinguish colors used in the diagram legend from colors of actual pavement markings.

## 5. Winter and night training

Provide at least four multistep scenarios covering snow/ice speed decisions, obscured or faded markings, headlights near moving aircraft, and restricted-visibility operations. Reuse the decision exercise interface and feedback behavior.

Teach the supplied September 2026 changes where they supersede older text, including headlights/parking-light procedures and revised speed paragraph numbering. Preserve Elmendorf-specific stop requirements at instrument hold positions. Do not model visibility as a blanket permission to move or substitute the app for local weather/airfield restrictions.

## 6. Personal study progress

Persist study results on the user's device using a versioned localStorage record. Show completed exercises, first-attempt accuracy, recent activity, weak topics, and suggested review links. Integrate completed existing quiz sessions without recording the same submission repeatedly.

Provide a short review session from missed question IDs in the existing bank. A later correct answer may mark that item reviewed while retaining earlier attempt history. Distinguish module completion from first-attempt accuracy.

Provide a “Remember progress on this device” setting and a clear-data action requiring an explicit local confirmation. Turning memory off stops further persistent writes. Handle unavailable storage, invalid JSON, obsolete schemas, and quota errors without breaking training; communicate that the current session can continue without saved progress. Save no official qualification status and issue no certification document.

Use browser/device dates for activity display. Historical publication review dates remain explicit source metadata, not automatically relabeled as current.

## 7. Local briefing and maintenance

Add a briefing page with dated, sourced training-reference cards drawn from verified local content. Initial cards cover source editions, winter procedures, instrument hold requirements, and the official ADPM/ADTCS training path. Label these as training references; they are not live closures or current operational advisories.

Provide a local draft editor with fields for title, category, text, effective date, review/expiry date, source citation/link, and author/reviewer attribution. Require a title, body, valid dates, and source before a draft can be marked complete. Render text safely; accept only http/https links. Clearly label edited/imported entries as local drafts.

Support validated JSON import and export so the ADPM can prepare and exchange briefing content without changing JSX. Include a sample content file and maintenance instructions. Bundled shared entries are updated by replacing the reviewed briefing data file and rebuilding/deploying the app. A local draft is not a shared or authenticated publication; the interface must say this plainly.

Expired entries remain visible with an expired status and their dates. Do not infer that an advisory is authoritative merely because an author/reviewer field is filled. No live notices or hot spots are fabricated, and no cross-user publishing backend is represented as available.

## Navigation and accessibility

Add Training, Progress, and Local Briefing destinations, keeping Overview, Resources, and My session. Use a wrapping or compact mobile navigation layout without horizontal page overflow. Add clear module launch cards and a home-page entry into the suite.

Use visible keyboard focus, semantic headings, correctly labeled controls, text feedback independent of color, and predictable focus after exercise transitions. Keep targets usable at 320-pixel viewport width. Offer text alternatives for map exercises, transcripts for radio playback, and reduced-motion behavior for animated recognition.

An existing quiz session remains available while browsing other pages. Exercise state remains available within the current module; switching exercises resets transient feedback intentionally. Persistent history is separate from current answer state.

## Source policy

Use the supplied DAFI 13-213 with DAFGM2026-01 dated 30 September 2026, and the 3 WG supplement dated 22 September 2023, certified current 19 February 2026. Each exercise includes an explanation and paragraph/figure citation. Review all new content against both sources for local additions and conflicts.

Direct official download requests previously returned HTTP 403. Retain the existing source-review limitation and official publication links. Do not copy the parent PDF or its CUI-marked memorandum into public assets. The published map already included in the app remains the original raster from the unrestricted supplement.

The study suite supplements official training. Practical familiarization, check-rides, normal-color-vision verification, official tests, and AF Form 483 issuance remain outside the app.

## Verification and acceptance

- All seven additions are accessible from the application and have functioning user flows, not placeholder cards.
- Existing quiz, answer retention, feedback hiding, scoring, map-view switching, and mobile behavior continue to work.
- Tests demonstrate first-attempt versus corrected completion, map targets at different scales, accepted/invalid radio readbacks, hidden visual answers, storage corruption/unavailability, duplicate quiz submissions, draft validation/import, expiry display, and keyboard focus.
- Browser checks exercise the complete training flows, text/audio fallback, reduced motion, progress across reloads, draft import/export, and layouts at desktop, 390 pixels, and 320 pixels.
- The complete test suite passes and the production build succeeds.
- A final independent code/content review is completed and material findings are resolved.

## Implementation sequence

1. Shared lesson/result schema and safe local progress storage.
2. General and winter/night decision content with the reusable scenario engine.
3. Published-diagram map drills and route-sequence exercise.
4. Radio trainer with optional speech playback and phrase construction.
5. Animated signs/light-gun recognition with learn/check modes.
6. Progress dashboard and integration with existing quiz results.
7. Briefing data, local maintenance editor, JSON exchange, and dated-status display.
8. Navigation/home integration, full browser checks, production build, and independent review.

Implementation is performed sequentially in the current workspace. This checkout has no Git repository, so Git worktrees and commits are unavailable; preserve a local pre-change backup instead.
