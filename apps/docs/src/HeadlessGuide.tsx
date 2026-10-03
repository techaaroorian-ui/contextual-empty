import CodeBlock from "./CodeBlock";
import ExampleSetup from "./ExampleSetup";
import OrderedCollectionExample from "./OrderedCollectionExample";
import FileIntakeExample from "./FileIntakeExample";
import InteractionExamples from "./InteractionExamples";
import orderedSource from "./OrderedCollectionExample.tsx?raw";
import fileSource from "./FileIntakeExample.tsx?raw";

export default function HeadlessGuide() {
  return (
    <section className="lab-content package-docs">
      <div className="intro">
        <div>
          <p className="aar-eyebrow">Collection packages / Headless</p>
          <h1 className="aar-title">Headless building blocks</h1>
        </div>
        <div className="intro-copy">
          <p>
            Behavior extracted from real Yuwbrndr tasks, with your own markup
            and styles.
          </p>
          <p className="aar-hint">
            Framework-independent cores. Optional React hooks. Complete,
            copyable React examples.
          </p>
        </div>
      </div>
      <ExampleSetup />
      <section className="aar-panel package-setup">
        <h2 className="aar-heading">Ordered Collection</h2>
        <code>@techaaroorian-ui/ordered-collection</code>
        <p>
          Selection, insertion, updates, removal, and reordering. This example
          uses ordinary buttons; it does not claim tabs or listbox keyboard
          behavior.
        </p>
        <OrderedCollectionExample />
        <CodeBlock title="OrderedCollectionExample.tsx" code={orderedSource} />
      </section>
      <section className="aar-panel package-setup">
        <h2 className="aar-heading">File Intake</h2>
        <code>@techaaroorian-ui/file-intake</code>
        <p>
          Validate a whole batch before allocating URLs or uploading. This local
          example accepts up to five images, at most 2 MiB each. Files are not
          uploaded.
        </p>
        <FileIntakeExample />
        <CodeBlock title="FileIntakeExample.tsx" code={fileSource} />
        <p className="aar-hint">
          This is the complete preview source, including previews, URL cleanup,
          removal, count limits, and error feedback. Consumers own uploads and
          content validation.
        </p>
      </section>
      <InteractionExamples />
      <section className="aar-panel package-setup">
        <h2 className="aar-heading">Independent of the design language</h2>
        <p>
          These packages ship no CSS and do not depend on Aar Craft. This
          documentation applies Aar Craft as one example of consumer styling.
          Collection and intake cores work without React or browser globals;
          dialog behavior uses native browser APIs. Workspace docking and
          gesture-based widgets are future work.
        </p>
        <p className="aar-hint">
          Until registry publication is verified, use workspace examples here.
          Alpha packages will be published under the alpha dist-tag rather than
          latest.
        </p>
      </section>
    </section>
  );
}
