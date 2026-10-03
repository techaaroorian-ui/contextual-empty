import CodeBlock from "./CodeBlock";
import ContextualEmptyExample from "./ContextualEmptyExample";
import exampleSource from "./ContextualEmptyExample.tsx?raw";
import layoutCss from "./example-setup.css?raw";

export default function ContextualEmptyDocs() {
  return (
    <section className="lab-content package-docs">
      <div className="intro">
        <div>
          <p className="aar-eyebrow">React package</p>
          <h1 className="aar-title">Contextual Empty</h1>
        </div>
        <div className="intro-copy">
          <p>Explain why a view is empty and offer a useful next step.</p>
          <p className="aar-hint">
            Composable primitives, ready-made presets, and optional standalone
            styles.
          </p>
        </div>
      </div>
      <section className="aar-panel package-setup">
        <h2 className="aar-heading">Installation</h2>
        <CodeBlock
          title="Install dependencies after alpha publication"
          language="bash"
          code="npm install react react-dom lucide-react @techaaroorian-ui/contextual-empty@alpha @techaaroorian-ui/aar-craft@alpha"
        />
        <p>
          Requires React and React DOM 18 or later. Alpha publication is
          pending; the docs use workspace packages. With Aar Craft, import its
          CSS and add aar-contextual-empty. Without Aar Craft, optionally import
          @techaaroorian-ui/contextual-empty/dist/index.css or provide your own
          styles.
        </p>
      </section>
      <section className="aar-panel package-setup">
        <h2 className="aar-heading">Live examples and complete source</h2>
        <ContextualEmptyExample />
        <CodeBlock title="ContextualEmptyExample.tsx" code={exampleSource} />
        <p>
          Save the component and this stylesheet in src. Import and render
          ContextualEmptyExample in an existing React application. The source
          includes all four states, icon imports, callbacks, and status
          feedback.
        </p>
        <CodeBlock title="example-setup.css" language="css" code={layoutCss} />
      </section>
      <section className="aar-panel package-setup">
        <h2 className="aar-heading">Compose your own state</h2>
        <p>
          The root accepts type, className, and children. Icon, Content, and
          Actions accept children and a className. The root exposes its type as
          data-state. Choose Compound in the preview; its complete
          implementation is included above.
        </p>
      </section>
      <section className="aar-panel package-setup">
        <h2 className="aar-heading">Available presets</h2>
        <div className="table-scroll">
          <table className="docs-table">
            <thead>
              <tr>
                <th>Preset</th>
                <th>Purpose</th>
                <th>Action callback</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["FirstUseEmpty", "Nothing created yet", "onCreate"],
                ["SearchEmpty", "No search results", "onClear"],
                ["FilterEmpty", "No matching filters", "onClearFilters"],
                ["PermissionEmpty", "Access unavailable", "onRequestAccess"],
                ["ErrorEmpty", "Request failed", "onRetry"],
              ].map(([name, purpose, action]) => (
                <tr key={name}>
                  <td>
                    <code>{name}</code>
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
      <section className="aar-panel package-setup">
        <h2 className="aar-heading">Styling and accessibility</h2>
        <p>
          Presets use native buttons and decorative icons are hidden from
          assistive technology. Standalone styling accepts CSS variables such as
          --ce-gap, --ce-icon-size, and --ce-anim-duration and respects reduced
          motion.
        </p>
        <p className="aar-hint">
          Aar Craft is optional. Use one styling owner for each component. Your
          app owns focus management and announcements when results change.
        </p>
      </section>
    </section>
  );
}
