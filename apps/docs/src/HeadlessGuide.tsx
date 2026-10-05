import CodeBlock from './CodeBlock'
import ExampleSetup from './ExampleSetup'
import OrderedCollectionExample from './OrderedCollectionExample'
import FileIntakeExample from './FileIntakeExample'
import InteractionExamples from './InteractionExamples'
import PanZoomExample from './PanZoomExample'
import ShareStateExample from './ShareStateExample'
import orderedSource from './OrderedCollectionExample.tsx?raw'
import fileSource from './FileIntakeExample.tsx?raw'
import panZoomSource from './PanZoomExample.tsx?raw'
import shareStateSource from './ShareStateExample.tsx?raw'

export default function HeadlessGuide() {
  return (
    <section className="lab-content package-docs">
      <div className="intro">
        <div>
          <p className="aar-eyebrow">Studio Primitives · Headless Packages</p>
          <h1 className="aar-title">Headless Studio Engines</h1>
        </div>
        <div className="intro-copy">
          <p>
            Pure mathematical models, reactive state machines, and viewport positioning engines extracted from production studio workflows like <strong>Yuwbrndr</strong>.
          </p>
          <p className="aar-hint">
            Framework-independent cores, optional React 18/19 hooks, and complete, copyable specimens with zero styling lock-in.
          </p>
        </div>
      </div>

      <ExampleSetup />

      {/* 1. The Canvas Altar Engine: Pan & Zoom */}
      <section className="aar-panel package-setup">
        <div className="aar-cluster" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h2 className="aar-heading">1. The Canvas Altar Engine</h2>
          <span className="aar-badge" data-variant="primary">Viewport Math</span>
        </div>
        <code>@techaaroorian-ui/pan-zoom</code>
        <p>
          Calculates infinite canvas coordinates, boundary constraints, and zoom stepping for creative studios. Recalculates viewport bounds dynamically with container <code>ResizeObserver</code>:
        </p>
        <ul style={{ margin: '0.25rem 0 0.75rem', paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--aar-text-muted)' }}>
          <li><strong><code>calculateFit(container, content, maxScale)</code></strong>: Computes optimal scale and centered offset.</li>
          <li><strong><code>clampZoom(scale, bounds)</code></strong>: Clamps zoom within precision limits (e.g. 0.1x to 5.0x).</li>
          <li><strong><code>usePanZoom(containerRef, contentSize, options)</code></strong>: Full React hook with reactive state and auto-fit.</li>
        </ul>
        <PanZoomExample />
        <CodeBlock title="PanZoomExample.tsx" code={panZoomSource} />
      </section>

      {/* 2. The Seal of Resolution: Share State */}
      <section className="aar-panel package-setup">
        <div className="aar-cluster" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h2 className="aar-heading">2. The Seal of Resolution (Serverless Sharing)</h2>
          <span className="aar-badge" data-variant="primary">URL Compression</span>
        </div>
        <code>@techaaroorian-ui/share-state</code>
        <p>
          Cryptographic state persistence without backend servers or databases. Uses native browser <code>CompressionStream('deflate-raw')</code> to generate URL-safe Base64 hash fragments:
        </p>
        <ul style={{ margin: '0.25rem 0 0.75rem', paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--aar-text-muted)' }}>
          <li><strong>Zero-Server Architecture</strong>: State lives entirely in the URL hash (<code>#share=v1z...</code>).</li>
          <li><strong>Safe Quotas</strong>: Enforces a 256 KiB uncompressed payload ceiling to protect browser performance.</li>
          <li><strong><code>useShareState(initialState)</code></strong>: React hook managing URL synchronization and fallback state.</li>
        </ul>
        <ShareStateExample />
        <CodeBlock title="ShareStateExample.tsx" code={shareStateSource} />
      </section>

      {/* 3. The Slide & Layer Grimoire: Ordered Collection */}
      <section className="aar-panel package-setup">
        <div className="aar-cluster" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h2 className="aar-heading">3. Slide &amp; Layer Grimoire</h2>
          <span className="aar-badge">Sequence Engine</span>
        </div>
        <code>@techaaroorian-ui/ordered-collection</code>
        <p>
          Deterministic state machine for multi-slide presentations, canvas layers, and undoable timelines. Handles selection, insertion, move reordering, and safe boundary clamping:
        </p>
        <OrderedCollectionExample />
        <CodeBlock title="OrderedCollectionExample.tsx" code={orderedSource} />
      </section>

      {/* 4. Asset Intake Gate: File Intake */}
      <section className="aar-panel package-setup">
        <div className="aar-cluster" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h2 className="aar-heading">4. Asset Intake Gate</h2>
          <span className="aar-badge">Batch Validation</span>
        </div>
        <code>@techaaroorian-ui/file-intake</code>
        <p>
          Validates entire batches of images or creative assets atomically before allocating object URLs or GPU memory. Rejects corrupted files or quota overflows before resource allocation:
        </p>
        <FileIntakeExample />
        <CodeBlock title="FileIntakeExample.tsx" code={fileSource} />
      </section>

      {/* 5 & 6. Dialog & Collection Picker */}
      <InteractionExamples />

      {/* Architectural Independence */}
      <section className="aar-panel package-setup">
        <h2 className="aar-heading">Zero-CSS Architecture &amp; Framework Decoupling</h2>
        <p>
          These packages ship <strong>zero CSS</strong> and do not depend on Aar Craft, Tailwind, or any design system. You can pair them with Aar Craft, your existing design system, or raw inline styles.
        </p>
        <p className="aar-hint">
          All packages run completely headless with pure state machines and mathematical models, making them rock-solid across web workers, Node.js scripts, and modern browser viewports.
        </p>
      </section>
    </section>
  )
}
