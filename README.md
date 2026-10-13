# 3 WG / JBER Airfield Driving

A responsive React study companion for Elmendorf Airfield. Includes 57 explained questions, guided practice, knowledge checks with hidden feedback, topic selection, question flags, retained answers during navigation, category results, missed-question retries, printable results, and an airfield explorer with a clean study sketch, selectable landmarks, the original Elmendorf diagram, a readable legend, and zoom/fit controls.

Content was reviewed against the supplied DAFI 13-213 with DAFGM2026-01 (30 September 2026) and the 3 WG supplement (22 September 2023, certified current 19 February 2026). See [the content review](docs/content-review.md) for source precedence, corrections, scoring, and verification limits. This app is a practice aid; official certification remains with ADPM/ADTCS.

## Run locally

```sh
npm ci
npm start
```

If port 3000 is occupied:

```sh
PORT=3107 npm start
```

## Verify and build

```sh
CI=true npm test -- --watchAll=false --runInBand
npm run build
```

The existing GitHub Pages homepage remains configured in `package.json`. The production build is generated in `build/`. Building does not publish the site.

## Maintain training content

- `src/files/questions.json`: question IDs, categories, options, and diagram usage.
- `src/files/answers.json`: paired answer IDs, explanations, paragraph/figure citations, and publication keys.
- `src/files/course.js`: categories, official publication links, and edition information.
- `src/images/elmendorf-map.jpeg`: original Attachment 13 raster from the supplied 3 WG supplement. Use the current WADPM-issued map for operational navigation.

No personal information is required, collected, or stored. A session stays in memory while navigating between overview, resources, and practice; page reload starts over.
