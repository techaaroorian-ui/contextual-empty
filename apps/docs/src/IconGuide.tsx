import CodeBlock from "./CodeBlock";
import IconsExample from "./IconsExample";
import exampleSource from "./IconsExample.tsx?raw";

export default function IconGuide() {
  return (
    <section className="lab-content package-docs">
      <div className="intro">
        <div>
          <p className="aar-eyebrow">Collection guide / Icons</p>
          <h1 className="aar-title">Lucide icons</h1>
        </div>
        <div className="intro-copy">
          <p>One consistent icon family for your application.</p>
          <p className="aar-hint">
            Recommended integration, independent of Aar Craft. Logos remain
            custom brand assets.
          </p>
        </div>
      </div>
      <section className="aar-panel package-setup">
        <h2 className="aar-heading">Install in your application</h2>
        <CodeBlock
          title="Install Lucide"
          language="bash"
          code="npm install lucide-react"
        />
        <p>
          Import icons by name. Size, color, and strokeWidth can be set per
          icon. Lucide renders inline SVG and supports tree shaking.{" "}
          <a href="https://lucide.dev/guide/react">Official React guide</a>.
        </p>
        <p className="aar-hint">
          The example below also uses React, Aar Craft, and Contextual Empty.
          Their alpha registry release is pending; the docs currently use
          workspace dependencies. Neither public component package requires
          Lucide.
        </p>
      </section>
      <section className="aar-panel package-setup">
        <h2 className="aar-heading">Actions, status, and empty states</h2>
        <IconsExample />
        <CodeBlock title="IconsExample.tsx" code={exampleSource} />
        <p>
          Save this complete component in src, then import and render IconsExample in your React application using Aar Craft styles.
        </p>
        <p>
          Put the accessible name on an icon-only button. Hide decorative icons
          beside visible text from assistive technology.{" "}
          <a href="https://lucide.dev/how-to/accessibility">
            Lucide accessibility guide
          </a>
          .
        </p>
        <p>
          Keep icon meaning consistent. Shape and text explain a status; color
          reinforces it. Consumers supply Contextual Empty icons through its
          icon prop.
        </p>
      </section>
      <section className="aar-panel package-setup">
        <h2 className="aar-heading">Functional State Runes &amp; Icon Pairing</h2>
        <p>
          In the Arcane Atelier philosophy, Lucide icons represent <strong>nouns and actions</strong> (e.g. download, layers, settings), while minimal astronomical runes represent <strong>operational runtime states</strong>:
        </p>
        <div className="table-scroll">
          <table className="docs-table">
            <thead>
              <tr>
                <th>Rune</th>
                <th>Semantic Meaning</th>
                <th>Role in Studio Interfaces</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code style={{ fontSize: '1.25rem' }}>✧</code></td>
                <td><strong>Idle Potential</strong></td>
                <td>Available actions, dormant capabilities, secondary layers</td>
              </tr>
              <tr>
                <td><code style={{ fontSize: '1.25rem', color: 'var(--aar-primary)' }}>✦</code></td>
                <td><strong>Active Selection</strong></td>
                <td>Current illuminated tab, active preset, focused artboard</td>
              </tr>
              <tr>
                <td><code style={{ fontSize: '1.25rem', color: 'var(--aar-accent, #6366f1)' }}>⟡</code></td>
                <td><strong>Live Transmutation</strong></td>
                <td>Reactive computation, canvas re-render, processing state</td>
              </tr>
              <tr>
                <td><code style={{ fontSize: '1.25rem', color: '#10b981' }}>✓</code></td>
                <td><strong>The Seal (Resolved)</strong></td>
                <td>Export complete, URL state encoded, verified artifact</td>
              </tr>
              <tr>
                <td><code style={{ fontSize: '1.25rem', color: '#ef4444' }}>!</code></td>
                <td><strong>Rift Warning</strong></td>
                <td>Validation discrepancy, file intake quota exceeded, syntax error</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section className="aar-panel package-setup">
        <h2 className="aar-heading">Our recommended conventions</h2>
        <ul>
          <li>
            16–20 px for controls; 24–32 px for larger contextual illustrations.
          </li>
          <li>
            Use a consistent stroke width within a screen; start with 1.75 or 2.
          </li>
          <li>Inherit text color using currentColor.</li>
          <li>
            Give icon buttons a generous hit area—our docs use at least 44 px.
          </li>
          <li>Keep keyboard focus visible and label unfamiliar actions.</li>
        </ul>
        <p className="aar-hint">
          These are collection conventions, not requirements imposed by the CSS
          framework.
        </p>
      </section>
    </section>
  );
}
