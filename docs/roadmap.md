# Aar Craft roadmap

The framework earns its value through repeated use, understandable rules, and reliable integration. Attractive specimens are a starting point. Yuwbrndr is the first proving ground.

## Subtle improvements with a purpose

| Improvement | What it helps | How we judge it |
| --- | --- | --- |
| Immediate keyboard focus | Locating your next action | Navigate the editor without a mouse |
| Stable selected states | Knowing the active mode | Switch design/slides and app themes |
| Consistent action hierarchy | Finding export and creation actions | One primary action per working area |
| Semantic surfaces | Understanding panel boundaries | Compare light/dark with readable text |
| Stable control dimensions | Avoiding shifting layouts | Busy/copy/success labels fit their controls |
| Explicit status feedback | Understanding asynchronous actions | Loading, success, error, and disabled are distinct |
| Touch-aware density | Keeping a compact editor usable | Coarse pointers retain 44 px controls |
| Short, purposeful motion | Understanding change | Reduced motion preserves all information |
| Scoped styling | Keeping authored artwork independent | App theme does not recolor exported content |

## 1. Yuwbrndr adoption: foundation

Status: initial slice implemented and verified locally. See `yuwbrndr/docs/aar-craft-adoption.md` for the boundary and local dependency setup. Production build and 29 tests pass; browser checks cover the cases below. Lint completes with existing warnings in the application.

Deliver a local CSS package integration, product-specific theme tokens, shell/toolbar styling, primary export treatment, focus, and reduced-motion handling. Yuwbrndr's interface uses Aar Craft and product CSS with no Tailwind compiler. A frozen legacy stylesheet preserves existing layouts while components migrate. Keep authored artwork and canvas palettes independent. Preserve existing controls and behavior.

Exit evidence: production build without Tailwind installed, existing tests, browser checks for both app themes, toolbar actions, mobile overflow, preserved geometry, and artwork isolation.

## 2. Yuwbrndr adoption: component migration

Replace legacy utility class strings and color patches in the sidebar, slide strip, editor chrome, menus, dialogs, and notifications with Aar components, semantic roles, and named product compositions. Delete the frozen legacy stylesheet once all interface consumers migrate. Add consistent field/help/error patterns, pressed/expanded semantics, and keyboard overlay behavior. Leave syntax highlighting and authored canvas palettes as separate systems.

Exit evidence: all editor routes and overlays reviewed in both themes, keyboard flows verified, current exports unchanged, no new theme-specific utility overrides.

## 3. Refine the language from evidence

Record observations from editing, importing, sharing, and exporting. Tune hierarchy, typography, spacing, control sizing, selection, and motion based on those tasks. Every added component needs a real product use case and examples of its states.

Exit evidence: documented design decisions, reviewed screenshots, contrast checks for shipped themes, long-text/zoom/mobile cases, and a clear token contract.

## 4. Prove reuse

Adopt a second product, initially PDFManager or steprndr. Keep the same component anatomy with a different palette and density. Resolve needs common to both products in the framework; keep domain-specific compositions in the apps.

Exit evidence: two products use one CSS release without app-specific selectors inside the package.

## 5. Release and maintain

Verify Tailwind v3 and v4 independently. Document plain HTML use, custom themes, migration, reduced motion, supported browsers, versioning, and breaking-change policy. Package only CSS and required metadata. Maintain reviewed visual baselines and behavior checks.

Exit evidence: reproducible package build, consumer installation examples, compatibility matrix, changelog, and an initial version ready for publication.

## 6. Aar Craft inside authored designs

Add explicit renderer support for Aar Craft HTML, alongside current Tailwind-style design markup. Inject versioned framework CSS into the isolated preview document and include it in export rendering. Provide design theme controls independent of the application theme. Do not expose app stylesheet rules to artwork.

Exit evidence: the same design renders in preview and exported PNG; switching application theme leaves the design unchanged; renderer mode and theme survive sharing. Tailwind interoperability remains an optional framework feature for other consumers, rather than a dependency of Yuwbrndr's interface.

## Learning alongside implementation

For each change: name the concept, show it in Yuwbrndr, explain the tradeoff, and verify its effect. Start with semantic roles and scope; then action hierarchy, density, state communication, and motion. Avoid adding animation merely to make the interface look busy.
