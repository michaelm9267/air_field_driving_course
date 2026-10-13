# 3 WG / JBER Airfield Driving

A responsive Elmendorf airfield-driving study companion built with React. It includes the 57-question quiz and source references, a clean map explorer, and an interactive Training Lab:

- Six multistep decision scenarios and four winter/night scenarios.
- Seven published-map/marking drills, including a simulated crossing sequence and text alternatives.
- Six radio exercises with phrase construction, optional speech playback, and transcripts.
- Eleven signal/sign/marking examples with Learn/Check modes, paused descriptions, and reduced-motion support.
- Device-saved study progress, first-attempt trainer accuracy, quiz weak-category review, and recent activity.
- Four dated local training references plus a local draft editor with validated JSON import/export.

Content was reviewed against the supplied DAFI 13-213 with DAFGM2026-01 (30 September 2026) and the 3 WG supplement (22 September 2023, certified current 19 February 2026). See [content review](docs/content-review.md) for source precedence and limitations. Official certification remains with ADPM/ADTCS.

## Run locally

```sh
npm ci
npm start
```

If port 3000 is occupied, use `PORT=3107 npm start`. The current development preview uses port 3107.

## Verify and build

```sh
CI=true npm test -- --watchAll=false --runInBand
CI=true npm run build
```

The GitHub Pages homepage remains configured in `package.json`. The production build goes to `build/`; building does not publish the app.

## Maintain content

`src/files/questions.json` and `answers.json` are the paired quiz bank. `src/files/course.js` holds category/publication metadata. Training content lives in `src/study/scenarios.js`, `mapDrills.js`, `radioExercises.js`, and `visualExercises.js`.

The original map is `src/images/elmendorf-map.jpeg`. Its published resolution is preserved; the clean SVG study sketch is separate. Use the current WADPM-issued map for operations.

Bundled briefing content lives in `src/files/briefings.json`. See [briefing maintenance](docs/briefing-maintenance.md) for the review, JSON exchange, rebuild, and authorized deployment workflow. Local drafts are not shared or authenticated operational notices.

## Device data

Study history and complete local drafts use localStorage key `jber-airfield-study-v1`. Disabling memory stops new activity/draft writes while retaining previously saved history. Turning memory back on saves the current session state. Clear study data requires confirmation and also clears local drafts; export important drafts first. Blocked/corrupt storage falls back to in-memory study with a warning.

No student names, ranks, units, certification numbers, microphone recordings, or official qualification status are collected. Briefing attribution requests role text. Any draft entered on a shared browser profile may be visible to other users of that profile.
