import CodeBlock from './CodeBlock'
import layoutCss from './example-setup.css?raw'
import aarCraft from '../../../packages/aar-craft/package.json'
import panZoom from '../../../packages/pan-zoom/package.json'
import orderedCollection from '../../../packages/ordered-collection/package.json'
import fileIntake from '../../../packages/file-intake/package.json'
import contextualEmpty from '../../../packages/contextual-empty/package.json'

export default function ExampleSetup() {
  const packages = [
    aarCraft,
    panZoom,
    orderedCollection,
    fileIntake,
    contextualEmpty,
  ]

  return (
    <section className="aar-panel package-setup">
      <h2 className="aar-heading">Run Complete Studio Examples</h2>
      <p>
        Each source below is an actual working component rendered in the preview. Save it under the shown filename in your React application's <code>src</code> directory. Imports, state machine mechanics, handlers, and markup are fully included.
      </p>
      <p className="aar-hint">
        These packages are built locally and published under the <code>@techaaroorian-ui/*</code> namespace. Install the exact matching versions in your React 18+ application:
      </p>
      <CodeBlock
        title="Install Studio Headless Packages"
        language="bash"
        code={`npm install react react-dom lucide-react\nnpm install ${packages.map((pkg) => `${pkg.name}@${pkg.version}`).join(' ')}`}
      />
      <p>
        Use this entry with an existing HTML root element. Change the component import to run another studio example:
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
        All component examples share this studio layout stylesheet for positioning and Arcane Atelier styling:
      </p>
      <CodeBlock title="example-setup.css" language="css" code={layoutCss} />
    </section>
  )
}
