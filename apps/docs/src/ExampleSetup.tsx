import CodeBlock from "./CodeBlock";
import aarLoom from "../../../packages/aar-loom/package.json";
import panZoom from "../../../packages/pan-zoom/package.json";
import orderedCollection from "../../../packages/ordered-collection/package.json";
import fileIntake from "../../../packages/file-intake/package.json";
import contextualEmpty from "../../../packages/contextual-empty/package.json";

export default function ExampleSetup() {
  const packages = [
    aarLoom,
    panZoom,
    orderedCollection,
    fileIntake,
    contextualEmpty,
  ];

  return (
    <section className="aar-panel aar-section">
      <h2 className="aar-heading">Run Complete Studio Examples</h2>
      <p>
        Each source below is an actual working component rendered in the
        preview. Save it under the shown filename in your React application's{" "}
        <code>src</code> directory. Imports, state machine mechanics, handlers,
        and markup are fully included.
      </p>
      <p className="aar-hint">
        These packages are built locally for the planned alpha release under the{" "}
        <code>@techaaroorian-ui/*</code> namespace. Install the exact matching
        versions in your React 18+ application:
      </p>
      <CodeBlock
        title="Install Studio Headless Packages"
        language="bash"
        code={`npm install react react-dom lucide-react\nnpm install ${packages.map((pkg) => `${pkg.name}@${pkg.version}`).join(" ")}`}
      />
      <p>
        Use this entry with an existing HTML root element. Change the component
        import to run another studio example:
      </p>
      <CodeBlock
        title="main.tsx"
        code={`import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import PanZoomExample from './PanZoomExample';

const root = document.getElementById('root');
if (!root) throw new Error('Add <div id="root"></div> to index.html');

createRoot(root).render(
  <StrictMode>
    <PanZoomExample />
  </StrictMode>
);`}
      />
      <p>
        All examples use only Aar Loom CSS for layout and appearance. No example
        stylesheet or framework components are required.
      </p>
      <CodeBlock
        title="Application CSS entry"
        language="tsx"
        code={"import '@techaaroorian-ui/aar-loom/index.css';"}
      />
    </section>
  );
}
