import CodeBlock from "./CodeBlock";
import layoutCss from "./example-setup.css?raw";
import aarCraft from "../../../packages/aar-craft/package.json";
import orderedCollection from "../../../packages/ordered-collection/package.json";
import fileIntake from "../../../packages/file-intake/package.json";
import dialog from "../../../packages/dialog/package.json";
import collectionPicker from "../../../packages/collection-picker/package.json";

export default function ExampleSetup() {
  const packages = [
    aarCraft,
    orderedCollection,
    fileIntake,
    dialog,
    collectionPicker,
  ];
  return (
    <section className="aar-panel package-setup">
      <h2 className="aar-heading">Run the complete examples</h2>
      <p>
        Each source below is the actual component rendered in the preview. Save
        it under the shown filename in your React application's src directory.
        Imports, state, handlers, and markup are included.
      </p>
      <p className="aar-hint">
        These alpha packages are prepared locally; registry publication is
        pending. The docs run using workspace dependencies. After publication,
        install the exact matching versions below in a React 18+ application.
      </p>
      <CodeBlock
        title="Install dependencies after publication"
        language="bash"
        code={`npm install react react-dom lucide-react\nnpm install ${packages.map((pkg) => `${pkg.name}@${pkg.version}`).join(" ")}`}
      />
      <p>
        Use this entry with an existing HTML root element. Change the component
        import to run another example.
      </p>
      <CodeBlock
        title="main.tsx"
        code={`import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import FileIntakeExample from './FileIntakeExample';

const root = document.getElementById('root');
if (!root) throw new Error('Add <div id="root"></div> to index.html');

createRoot(root).render(
  <StrictMode>
    <FileIntakeExample />
  </StrictMode>
);`}
      />
      <p>
        All component examples import this shared experimental stylesheet for
        layout and the magic-art styling. It builds on Aar Craft without changing
        the published framework CSS.
      </p>
      <CodeBlock title="example-setup.css" language="css" code={layoutCss} />
    </section>
  );
}
