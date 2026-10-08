import CodeBlock from './CodeBlock'
import aarCraft from '../../../packages/aar-loom/package.json'
import contextualEmpty from '../../../packages/contextual-empty/package.json'
import orderedCollection from '../../../packages/ordered-collection/package.json'
import fileIntake from '../../../packages/file-intake/package.json'
import dialog from '../../../packages/dialog/package.json'
import collectionPicker from '../../../packages/collection-picker/package.json'

export default function VersioningGuide() {
  return <section className="lab-content package-docs">
    <div className="intro"><div><p className="aar-eyebrow">Collection guide / Releases</p><h1 className="aar-title">Versions & releases</h1></div><div className="intro-copy"><p>Independent packages, explicit changes, deliberate releases.</p><p className="aar-hint">The documentation site is private and does not share a package version.</p></div></div>
    <section className="aar-panel package-setup"><h2 className="aar-heading">Current manifest versions</h2><div className="table-scroll"><table className="docs-table"><thead><tr><th>Package</th><th>Version</th><th>Stage</th></tr></thead><tbody>{[aarCraft, contextualEmpty, orderedCollection, fileIntake, dialog, collectionPicker].map(pkg => <tr key={pkg.name}><td><code>{pkg.name}</code></td><td>{pkg.version}</td><td>Initial development</td></tr>)}</tbody></table></div><p className="aar-hint">These values come directly from package.json. They describe this checkout, not registry publication status.</p></section>
    <section className="aar-panel package-setup"><h2 className="aar-heading">What changes a version?</h2><p>During 0.x development, our convention is patch for compatible features and fixes; minor for breaking contracts. At 1.0 and later: patch for fixes, minor for compatible features, major for breaking changes. See <a href="https://semver.org/">Semantic Versioning</a>.</p><p>CSS contracts include tokens, class names, attributes, theme scope, exported paths, and interaction behavior. React contracts include exports, props, callbacks, and documented DOM/CSS hooks. Breaking changes need migration notes.</p><p className="aar-hint">Docs, logos, and guide-only changes do not bump public packages. Each package has an independent version. Alpha builds are published to the alpha channel after validation.</p></section>
    <section className="aar-panel package-setup"><h2 className="aar-heading">Record, version, verify, publish</h2><CodeBlock title="Release commands" language="bash" code={`npm run changeset          # record the affected package and consumer impact
npm run changeset:status   # inspect pending changes
npm run version:packages   # update versions, changelogs, and lockfile
npm run release:check      # builds, tests, lint, and package dry runs
# Review and commit the release diff before publishing.
npm run release            # deliberate publication; requires registry credentials`} /><p>The manual release workflow defaults to dry-run. A merge into main no longer publishes packages automatically. <a href="https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md">Changesets workflow</a>.</p></section>
    <section className="aar-panel package-setup"><h2 className="aar-heading">Preview channels</h2><p>Use a prerelease channel such as alpha for experimental releases. Keep production consumers on reviewed stable releases, and never reuse a version already published. The framework and component packages can reach 1.0 independently.</p></section>
  </section>
}
