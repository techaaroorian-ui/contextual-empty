# Package change records

Run `npm run changeset` for a user-facing package change. Select only affected packages, choose the version bump, and describe the effect for consumers. Docs-only and logo-only edits do not need a package changeset.

Before 1.0, our policy is patch for compatible additions/fixes and minor for breaking contract changes. Use prerelease channels for preview work; do not assume 0.x releases are stable. See `docs/versioning.md`.

Run `npm run version:packages` to apply pending records, generate package changelogs, and synchronize the npm lockfile. Review and commit the resulting release diff. Publishing is a separate explicit step.
