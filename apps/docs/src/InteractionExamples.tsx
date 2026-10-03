import { useDialog } from '@techaaroorian-ui/dialog/react'
import { useCollectionPicker } from '@techaaroorian-ui/collection-picker/react'

const choices = [
  { id: 'poster', label: 'Poster' },
  { id: 'slides', label: 'Slides' },
  { id: 'locked', label: 'Shared library (unavailable)', disabled: true },
  { id: 'story', label: 'Story' },
]

export default function InteractionExamples() {
  const { dialogRef, open: openDialog, close: closeDialog } = useDialog()
  const { dialogRef: sheetRef, open: openSheet, close: closeSheet } = useDialog({ dismissOutside: false })
  const picker = useCollectionPicker(choices)
  return <>
    <section className="aar-panel package-setup">
      <h2 className="aar-heading">Dialog and Sheet</h2><code>@techaaroorian-ui/dialog</code>
      <p>One native modal behavior, two presentations. The browser provides modality and focus containment. Escape closes either example; focus returns to its opener. The sheet requires explicit dismissal instead of a backdrop click.</p>
      <div className="aar-toolbar"><button className="aar-button" onClick={openDialog}>Open example dialog</button><button className="aar-button" onClick={openSheet}>Open example sheet</button></div>
      <dialog ref={dialogRef} className="aar-dialog" aria-labelledby="example-dialog-title" aria-describedby="example-dialog-description">
        <div className="package-setup"><h3 id="example-dialog-title" className="aar-heading">Export settings</h3><p id="example-dialog-description">A behavior example. This does not export a file.</p><label className="aar-field">Document name<input autoFocus className="aar-input" defaultValue="Untitled design" /></label><button className="aar-button" onClick={openSheet}>Open nested sheet</button><button className="aar-button" onClick={() => closeDialog()}>Close example dialog</button><form method="dialog"><button className="aar-button" value="applied">Apply example settings</button></form></div>
      </dialog>
      <dialog ref={sheetRef} className="aar-dialog" data-placement="end" aria-labelledby="example-sheet-title">
        <div className="package-setup"><h3 id="example-sheet-title" className="aar-heading">Document tools</h3><p>Sheet placement comes from Aar Craft. The headless package contains no styles.</p><button className="aar-button" onClick={() => closeSheet()}>Close example sheet</button></div>
      </dialog>
      <pre><code>{`import { useDialog } from '@techaaroorian-ui/dialog/react';
const { dialogRef, open: openDialog, close: closeDialog } = useDialog();
<button onClick={openDialog}>Open settings</button>
<dialog ref={dialogRef} className="aar-dialog" aria-labelledby="title">
  <h2 id="title">Settings</h2>
  <button onClick={() => closeDialog()}>Close</button>
</dialog>
// For a sheet, add data-placement="end" or "bottom".
// Plain JavaScript: bindDialog(element).open();`}</code></pre>
    </section>
    <section className="aar-panel package-setup">
      <h2 className="aar-heading">Collection Picker</h2><code>@techaaroorian-ui/collection-picker</code>
      <p>Single selection with filtering. Focus the list, use Up/Down, Home/End or type a label prefix; Enter or Space commits selection. Disabled items are skipped. Filtering preserves the committed choice.</p>
      <label className="aar-field" htmlFor="picker-filter">Filter formats<input id="picker-filter" className="aar-input" value={picker.query} onChange={event => picker.setQuery(event.target.value)} /></label>
      <span id="picker-label" className="aar-eyebrow">Available formats</span>
      <div {...picker.listboxProps} className="aar-picker" aria-labelledby="picker-label">{picker.visibleItems.map(item => <div key={item.id} {...picker.getOptionProps(item)} className="aar-picker-option">{item.label}</div>)}</div>
      <p className="aar-hint" role="status">{picker.visibleItems.length ? `${picker.visibleItems.length} formats shown. Selected format: ${choices.find(item => item.id === picker.selectedId)?.label ?? 'None'}.` : 'No matching formats. Clear the filter to see all options.'}</p>
      <pre><code>{`import { useCollectionPicker } from '@techaaroorian-ui/collection-picker/react';
const picker = useCollectionPicker(items);
<div {...picker.listboxProps} aria-label="Formats" className="aar-picker">
  {picker.visibleItems.map(item => (
    <div key={item.id} {...picker.getOptionProps(item)} className="aar-picker-option">
      {item.label}
    </div>
  ))}
</div>`}</code></pre>
      <p className="aar-hint">Options contain labels, not nested buttons or inputs. Use another pattern for cards with multiple actions. This is a listbox with a separate filter, not a combobox.</p>
    </section>
  </>
}
