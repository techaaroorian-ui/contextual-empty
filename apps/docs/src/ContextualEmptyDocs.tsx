import CodeBlock from "./CodeBlock";
import ContextualEmptyExample from "./ContextualEmptyExample";
import exampleSource from "./ContextualEmptyExample.tsx?raw";

export default function ContextualEmptyDocs() {
  return (
    <section className="aar-container aar-content">
      <div className="aar-intro">
        <div>
          <p className="aar-eyebrow">
            Studio Primitives · Composable React Package
          </p>
          <h1 className="aar-title">Contextual Empty</h1>
        </div>
        <div className="aar-intro-copy">
          <p>
            Never leave users at a visual dead-end. Guide creators through
            dormant canvas stages, search voids, and transmutation errors with
            clear, actionable next steps.
          </p>
          <p className="aar-hint">
            Composable primitives, ready-made studio presets, and zero-leak
            standalone CSS.
          </p>
        </div>
      </div>

      <section className="aar-panel aar-section">
        <h2 className="aar-heading">Installation</h2>
        <CodeBlock
          title="Install dependencies"
          language="bash"
          code="npm install react react-dom lucide-react @techaaroorian-ui/contextual-empty@alpha @techaaroorian-ui/aar-loom@alpha"
        />
        <p>
          Requires React 18 or later. With Aar Loom, import its CSS and add the{" "}
          <code>aar-contextual-empty</code> class. Without Aar Loom, import{" "}
          <code>@techaaroorian-ui/contextual-empty/dist/index.css</code> or
          supply your own tokens.
        </p>
      </section>

      <section className="aar-panel aar-section">
        <h2 className="aar-heading">Studio Empty States in Context</h2>
        <ContextualEmptyExample />
        <CodeBlock title="ContextualEmptyExample.tsx" code={exampleSource} />
        <p>
          Save the component in <code>src</code>. Import and render{" "}
          <code>ContextualEmptyExample</code> in an existing React application
          with Aar Loom CSS.
        </p>
      </section>

      <section className="aar-panel aar-section">
        <h2 className="aar-heading">Studio Presets Matrix</h2>
        <div className="aar-table-scroll">
          <table className="aar-reference-table">
            <thead>
              <tr>
                <th>Preset</th>
                <th>Studio Metaphor</th>
                <th>Purpose</th>
                <th>Action Callback</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "FirstUseEmpty",
                  "✧ The Dormant Altar",
                  "No artboards or layers created yet",
                  "onCreate",
                ],
                [
                  "SearchEmpty",
                  "⟡ The Search Void",
                  "No matching assets or syntax in grimoire",
                  "onClear",
                ],
                [
                  "FilterEmpty",
                  "✧ Filter Isolation",
                  "Active tag filters yield zero results",
                  "onClearFilters",
                ],
                [
                  "PermissionEmpty",
                  "✦ Restricted Sanctum",
                  "Workspace requires elevated permissions",
                  "onRequestAccess",
                ],
                [
                  "ErrorEmpty",
                  "! The Rift Warning",
                  "Reactive transmutation or export failure",
                  "onRetry",
                ],
              ].map(([name, metaphor, purpose, action]) => (
                <tr key={name}>
                  <td>
                    <code>{name}</code>
                  </td>
                  <td>
                    <strong>{metaphor}</strong>
                  </td>
                  <td>{purpose}</td>
                  <td>
                    <code>{action}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="aar-panel aar-section">
        <h2 className="aar-heading">Composable Primitives</h2>
        <p>Build custom studio empty states with full compound components:</p>
        <CodeBlock
          title="Compound Altar Empty State"
          language="tsx"
          code={`<ContextualEmptyState className="aar-contextual-empty" type="first-use">
  <ContextualEmptyState.Icon>
    <span className="aar-text-2rem aar-ink-primary">⟡</span>
  </ContextualEmptyState.Icon>
  <ContextualEmptyState.Content>
    <h3>The Canvas Altar is Dormant</h3>
    <p>Select a starter preset or begin typing code to ignite the canvas.</p>
  </ContextualEmptyState.Content>
  <ContextualEmptyState.Actions>
    <button className="aar-button" data-variant="primary" onClick={igniteStarter}>
      ✦ Ignite Starter Preset
    </button>
  </ContextualEmptyState.Actions>
</ContextualEmptyState>`}
        />
      </section>

      <section className="aar-panel aar-section">
        <h2 className="aar-heading">Accessibility &amp; Restraint</h2>
        <p>
          Decorative state icons are hidden from screen readers via{" "}
          <code>aria-hidden="true"</code>. Action buttons use native HTML
          buttons and support full keyboard navigation. When results or views
          transition, live regions announce status updates reliably without
          jarring the viewport.
        </p>
      </section>
    </section>
  );
}
