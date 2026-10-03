# TechAaroorian UI documentation

One collection site with independent package pages:

- `#/` — collection overview and TechAaroorian UI identity.
- `#/aar-craft` — CSS setup, themes, component specimens, workbench, motion, and design lessons.
- `#/contextual-empty` — React setup, presets, compound API, styling, accessibility guidance, and working examples.
- `#/guides/icons` — optional Lucide integration, labeled buttons, status, and empty-state examples.
- `#/guides/versioning` — manifest versions, independent package policy, and Changesets workflow.

From the repository root run `npm run dev --workspace apps/docs`. Build with `npm run build --workspace apps/docs`; lint with `npm run lint --workspace apps/docs`. The existing contextual-empty package must be built before a fresh docs checkout can resolve its dist exports.

Run `npm run test:visual --workspace apps/docs` with the server running to exercise navigation, direct-link reloads, mobile overflow, live examples, and Aar Craft theme/motion checks. Screenshots are saved under `visual-artifacts/` for human review.

Routes use hashes, so static hosts do not need history-fallback rewrites. Collection branding stays in the shared shell; package branding lives within each package page. Contextual Empty is independent of Aar Craft even though the docs host uses Aar Craft for presentation.
