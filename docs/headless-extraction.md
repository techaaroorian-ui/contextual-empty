# Yuwbrndr extraction and alpha scope

The temporary Aar Craft integration in Yuwbrndr has been reverted. Yuwbrndr returns to its existing interface and build dependencies while the reusable packages are developed and released here. No local package dependency is reintroduced before registry publication.

## First extraction

- Ordered Collection: shared immutable selection, insertion, neighbor selection after deletion, bounded counts, updates, and reordering. Derived from slide operations. Slide payload, generated IDs, duplicate naming, export, and persistence remain product responsibilities.
- File Intake: whole-batch validation with quota, size, optional MIME/extension acceptance, and structured errors. Derived from asset uploads. Validating first prevents partial object-URL allocation before rejection. URLs, storage, and upload service remain product responsibilities.

Both expose framework-independent ESM cores and optional `/react` hooks. This is headless state and behavior, not a complete accessible widget library. React examples use native labeled controls; framework-independent Node tests prove the cores load and operate without React or the DOM.

The second extraction adds Dialog/Sheet and Collection Picker. Dialog uses native browser modality with explicit dismissal and focus restoration. Collection Picker adds filtering, disabled-option handling, keyboard navigation, typeahead, and explicit single selection. Both have optional React hooks and no CSS dependency. Browser interaction coverage lives in the docs smoke script. Resizable workspace panels and async-action lifecycles remain future work.

Aar Craft supplies optional styles for these behaviors and an opt-in Contextual Empty adapter. See [styling boundaries](./styling-boundaries.md); Aar Craft applications do not need a separate visual stylesheet per headless package.

## Release and adoption

The root workspace is private and is not published as a single `techaaroorian-ui` package. Publish each public package under the `@techaaroorian-ui` scope with the `alpha` dist-tag. Stable `latest` must remain separate. Changesets prerelease mode records independently computed versions; package versions need not match.

Before publishing: package builds, framework-independent behavior tests, React integration examples, docs lint/build, browser smoke checks, and dry-run package inspection. Authentication and publish access to the npm scope are required. Publication remains pending until registry versions can be verified.

After publication, install exact alpha versions in Yuwbrndr and first replace slide operations and batch validation without changing their presentation. Then adopt Aar Craft and rebuild the workspace following [adaptive-layout.md](./adaptive-layout.md). Verify imports, exports, sharing, artwork isolation, and existing tests at each stage.
