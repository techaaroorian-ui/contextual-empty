import { useOrderedCollection } from '@techaaroorian-ui/ordered-collection/react'
import InteractionExamples from './InteractionExamples'
import FileIntakeExample from './FileIntakeExample'

const initialItems = [{ id: 'cover', name: 'Cover' }, { id: 'details', name: 'Details' }]

export default function HeadlessGuide() {
  const collection = useOrderedCollection(initialItems, { minItems: 1, maxItems: 6 })
  const selected = collection.items.find(item => item.id === collection.selectedId)
  return <section className="lab-content package-docs">
    <div className="intro"><div><p className="aar-eyebrow">Collection packages / Headless</p><h1 className="aar-title">Headless building blocks</h1></div><div className="intro-copy"><p>Behavior extracted from real Yuwbrndr tasks, with your own markup and styles.</p><p className="aar-hint">Framework-independent cores. Optional React hooks. Alpha APIs under development.</p></div></div>
    <section className="aar-panel package-setup">
      <h2 className="aar-heading">Ordered Collection</h2>
      <code>@techaaroorian-ui/ordered-collection</code>
      <p>Selection, insertion, updates, removal, and reordering. This example uses ordinary buttons; it does not claim tabs or listbox keyboard behavior.</p>
      <div className="aar-toolbar" aria-label="Collection items">{collection.items.map(item => <button key={item.id} className="aar-button" aria-pressed={item.id === collection.selectedId} onClick={() => collection.dispatch({ type: 'select', id: item.id })}>{item.name}</button>)}</div>
      <div className="aar-toolbar">
        <button className="aar-button" disabled={collection.items.length >= 6} onClick={() => collection.dispatch({ type: 'insert', item: { id: crypto.randomUUID(), name: `Item ${collection.items.length + 1}` } })}>Add item</button>
        <button className="aar-button" disabled={!selected || collection.items.length >= 6} onClick={() => { if (selected) collection.dispatch({ type: 'insert', afterId: selected.id, item: { ...selected, id: crypto.randomUUID(), name: `${selected.name} copy` } }) }}>Duplicate selected</button>
        <button className="aar-button" disabled={!selected || collection.items.length <= 1} onClick={() => { if (selected) collection.dispatch({ type: 'remove', id: selected.id }) }}>Remove selected</button>
        <button className="aar-button" disabled={!selected || collection.items[0]?.id === selected.id} onClick={() => { if (selected) collection.dispatch({ type: 'move', id: selected.id, toIndex: 0 }) }}>Move selected to start</button>
      </div>
      <p className="aar-hint" role="status">Selected: {selected?.name ?? 'None'}. {collection.items.length} of 6 items.</p>
      <pre><code>{`// Plain JavaScript, Vue, Svelte, or another framework:
import { createCollection, reduceCollection } from '@techaaroorian-ui/ordered-collection';
let state = createCollection([{ id: 'cover', name: 'Cover' }]);
state = reduceCollection(state, { type: 'insert', item: { id: 'details', name: 'Details' } });

// React adapter:
import { useOrderedCollection } from '@techaaroorian-ui/ordered-collection/react';
const collection = useOrderedCollection(initialItems, { minItems: 1, maxItems: 6 });`}</code></pre>
    </section>
    <section className="aar-panel package-setup">
      <h2 className="aar-heading">File Intake</h2>
      <code>@techaaroorian-ui/file-intake</code>
      <p>Validate a whole batch before allocating URLs or uploading. This local example accepts up to five images, at most 2 MiB each. Files are not uploaded.</p>
      <FileIntakeExample />
      <pre><code>{`import { validateFiles } from '@techaaroorian-ui/file-intake';
const result = validateFiles(files, {
  maxFiles: 5, maxFileBytes: 2 * 1024 * 1024, accept: ['image/*'],
}, existingAssets.length);
// result.accepted is empty if any file fails.
// React: useFileDropzone({ ...limits, existingCount, onAccepted })
// supplies dropzoneProps, inputProps, open(), and drag/error state.`}</code></pre>
      <p className="aar-hint">MIME and extension checks use file metadata. Consumers own content validation, storage, URL cleanup, error localization, and accessible drop-zone behavior.</p>
    </section>
    <InteractionExamples />
    <section className="aar-panel package-setup"><h2 className="aar-heading">Independent of the design language</h2><p>These packages ship no CSS and do not depend on Aar Craft. This documentation applies Aar Craft as one example of consumer styling. Collection and intake cores work without React or browser globals; dialog behavior uses native browser APIs. Workspace docking and gesture-based widgets are future work.</p><p className="aar-hint">Until registry publication is verified, use workspace examples here. Alpha packages will be published under the alpha dist-tag rather than latest.</p></section>
  </section>
}
