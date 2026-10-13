# Maintaining local training briefings

The Local Briefing page displays `src/files/briefings.json`. Its bundled cards are training references, not live operational notices. The editor creates local drafts and does not publish to other users or authenticate ADPM authority.

1. Prepare entries in the editor, using role attribution rather than personal names. Enter an effective date, review/expiry date, source citation, and http/https source link.
2. Export local drafts as JSON. Device-memory settings control whether drafts survive closing the app; export important drafts before clearing study data or using memory-off mode.
3. Have the appropriate local authority review the content and operational applicability outside this application.
4. Replace the bundled data file with the reviewed `schemaVersion: 1` JSON, preserving the entry fields shown in `public/briefing-example.json`.
5. Run the tests and production build. Use the existing deployment workflow when publication is authorized.

Imports accept at most 100 entries and 256 KB. Invalid dates, unsafe source links, malformed data, and duplicate IDs are rejected. Imports never silently overwrite existing local drafts. Existing IDs can be edited in the editor, or assigned new IDs in the JSON before import.

A review date is inclusive; an entry is marked expired starting the next local calendar date. Expiry is a review prompt, not evidence that an underlying regulation expired. Updates to authoritative instructions must be checked separately.

Do not include classified/CUI operational information, personal names, certification numbers, or sensitive unit records in this static site. Do not represent a locally entered author/reviewer role as authenticated approval. Current closures and hot spots require authorized source information; this app supplies none automatically.
