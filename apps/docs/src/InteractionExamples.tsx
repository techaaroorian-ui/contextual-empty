import CodeBlock from "./CodeBlock";
import DialogExample from "./DialogExample";
import CollectionPickerExample from "./CollectionPickerExample";
import dialogSource from "./DialogExample.tsx?raw";
import pickerSource from "./CollectionPickerExample.tsx?raw";

export default function InteractionExamples() {
  return (
    <>
      <section className="aar-panel aar-section">
        <h2 className="aar-heading">Dialog and Sheet</h2>
        <code>@techaaroorian-ui/dialog</code>
        <p>
          One native modal behavior, two presentations. The browser provides
          modality and focus containment. Escape closes either example; focus
          returns to its opener. The sheet requires explicit dismissal instead
          of a backdrop click.
        </p>
        <DialogExample />
        <CodeBlock title="DialogExample.tsx" code={dialogSource} />
      </section>
      <section className="aar-panel aar-section">
        <h2 className="aar-heading">Collection Picker</h2>
        <code>@techaaroorian-ui/collection-picker</code>
        <p>
          Single selection with filtering. Focus the list, use Up/Down, Home/End
          or type a label prefix; Enter or Space commits selection. Disabled
          items are skipped. Filtering preserves the committed choice.
        </p>
        <CollectionPickerExample />
        <CodeBlock title="CollectionPickerExample.tsx" code={pickerSource} />
        <p className="aar-hint">
          Options contain labels, not nested buttons or inputs. Use another
          pattern for cards with multiple actions. This is a listbox with a
          separate filter, not a combobox.
        </p>
      </section>
    </>
  );
}
