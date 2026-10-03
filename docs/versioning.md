# Independent package versioning

TechAaroorian UI is a collection, not one synchronized release. Aar Craft and Contextual Empty each have their own package version and changelog. The private docs app is not published. Displayed versions come from package manifests.

## Contract and stability

Both packages currently declare 0.1.0. These are manifest versions, not proof of publication. Keep existing versions until a release is prepared; do not invent retrospective release dates or overwrite a published version.

SemVer treats 0.y.z as initial development: https://semver.org/.

Our pre-1.0 convention is **patch** for compatible additions and fixes, **minor** for breaking changes. Once a package reaches 1.0, use patch for compatible fixes, minor for compatible features, and major for breaking changes. A breaking change must include migration notes.

Aar Craft's public contract includes documented classes, attributes, tokens, exported CSS paths, and interaction/accessibility behavior. Removing tokens, changing component anatomy, or altering theme scope can be breaking even if there is no JavaScript API. Contextual Empty's contract includes exports, props, callbacks, DOM/state attributes, and its documented CSS hooks.

## Changesets workflow

1. Run `npm run changeset` after changing a public package. Select affected packages and write a consumer-facing summary. Avoid package bumps for docs-only changes.
2. Inspect the pending plan with `npm run changeset:status`. Pending records should represent actual changes, not scheduled future features.
3. Apply the plan with `npm run version:packages`. This updates manifests, changelogs, and package-lock.json without publishing.
4. Build, test, inspect package contents, and review the version diff with `npm run release:check`.
5. Commit the release diff. Publish deliberately with `npm run release` or the manual release workflow. Changesets skips versions already in the registry and creates package-specific release tags when it publishes.

Changesets usage: https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md.

For previews use `npm exec changeset pre enter next`, add changesets, and version normally; publish on the next dist-tag. Exit with `npm exec changeset pre exit` when preparing the stable release. Preview preparation must also be reviewed; it does not happen automatically on every merge.

## Release checks

Build both public packages and docs, run Contextual Empty tests and docs lint, and inspect dry-run package contents. Run browser smoke checks with the docs server for UI/theme changes. Verify the CSS package has no runtime icon dependency. Inspect the tarballs before publishing; a successful build is not proof that the right files are included.

No automatic publish on pushes to main. The workflow is manual and defaults to dry-run. Registry credentials are required only for publication. This task configures release tooling; it does not publish, create release tags, or claim that local versions are released.
