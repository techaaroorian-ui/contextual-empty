# TechAaroorian UI documentation

## Complete example sources

Headless, Contextual Empty, and Lucide previews render standalone example modules. Their code blocks import those same files with Vite's `?raw` loader, so imports, state, handlers, and markup stay synchronized with the previews. The docs build type-checks the examples.

Every code block has syntax highlighting, a filename/language label, a Copy button, and an expandable reading area. Copy writes plain source text, not highlighted HTML. Clipboard denial uses a text-selection fallback; if both paths fail, the block provides an explicit manual-copy message. Long code scrolls inside its own frame on narrow screens.

The headless page includes installation instructions, a React entry file, and the small shared example-layout stylesheet. Aar Loom's getting-started guide provides complete plain HTML and CSS files. Highlight.js and Prettier are docs-only dependencies; public packages remain independent of them.

One collection site with independent package pages:

- `#/` — collection overview and TechAaroorian UI identity.
- `#/aar-loom` — CSS setup, themes, component specimens, workbench, motion, and design lessons.
- `#/contextual-empty` — React setup, presets, compound API, styling, accessibility guidance, and working examples.
- `#/guides/icons` — optional Lucide integration, labeled buttons, status, and empty-state examples.
- `#/guides/versioning` — manifest versions, independent package policy, and Changesets workflow.

From the repository root run `npm run dev --workspace apps/docs`. Build with `npm run build --workspace apps/docs`; lint with `npm run lint --workspace apps/docs`. The existing contextual-empty package must be built before a fresh docs checkout can resolve its dist exports.

Run `npm run test:visual --workspace apps/docs` with the server running to exercise navigation, direct-link reloads, mobile overflow, live examples, and Aar Loom theme/motion checks. Screenshots are saved under `visual-artifacts/` for human review.

Routes use hashes, so static hosts do not need history-fallback rewrites. Collection branding stays in the shared shell; package branding lives within each package page. Contextual Empty is independent of Aar Loom even though the docs host uses Aar Loom for presentation.
