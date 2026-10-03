import CodeBlock from "./CodeBlock";
import IconsExample from "./IconsExample";
import exampleSource from "./IconsExample.tsx?raw";
import layoutCss from "./example-setup.css?raw";

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
          Save this complete component and its layout stylesheet in src, then
          import and render IconsExample in your React application.
        </p>
        <CodeBlock title="example-setup.css" language="css" code={layoutCss} />
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
