# Collection Picker

Framework-independent single-selection state with filtering and typeahead. Optional React 18+ hook implements a vertical listbox using `aria-activedescendant`. No CSS or dependency on Aar Loom.

```js
import { createPicker, reducePicker, visibleItems } from '@techaaroorian-ui/collection-picker';
const items = [{ id: 'poster', label: 'Poster' }, { id: 'slides', label: 'Slides' }];
let state = createPicker(items);
state = reducePicker(state, { type: 'navigate', direction: 'next' }, items);
state = reducePicker(state, { type: 'select' }, items);
const shown = visibleItems(items, state.query);
```

```tsx
import { useCollectionPicker } from '@techaaroorian-ui/collection-picker/react';
const picker = useCollectionPicker(items);
<input aria-label="Filter formats" value={picker.query}
  onChange={event => picker.setQuery(event.target.value)} />
<div {...picker.listboxProps} aria-label="Formats" className="aar-picker">
  {picker.visibleItems.map(item => (
    <div key={item.id} {...picker.getOptionProps(item)} className="aar-picker-option">
      {item.label}
    </div>
  ))}
</div>
```

Items require unique nonempty IDs and text labels; optional disabled flags exclude them from navigation and selection. Core commands: `query`, `navigate` (next/previous/first/last), `select` (explicit ID or active item), and `typeahead` (text and millisecond timestamp). Typeahead accumulates prefixes within 700ms; repeated initial letters cycle through matches. Arrow navigation stops at list boundaries.

Active focus and committed selection are separate. Filtering preserves selection, including when that choice is hidden; selection clears when its item is removed or disabled. `reconcilePicker` normalizes state when the source items change. The React hook normalizes each render and initializes selection only once; it is uncontrolled. Remount to reset or use the core for externally controlled state.

The React adapter handles Up/Down, Home/End, Enter/Space, and character typeahead; modifiers and IME composition are left alone. Tab leaves the list. Options are not separate tab stops; DOM focus stays on the labeled listbox. Pointer selection focuses the listbox. Provide visible focus styling, selected styling, and an announced empty-result message. The filter is a separate labeled input, not a combobox.

Options must not contain interactive buttons, links, or inputs. Cards with several actions require a different pattern. This alpha does not support multiselect, grouped options, virtualization, async loading, or custom filter functions. Native `<select>` remains a simpler choice for ordinary form fields.

With Aar Loom, use `aar-picker` and `aar-picker-option`. Other frameworks can connect the core to their reactive state and implement the same focus and keyboard contract. Browser tests cover the React adapter; core tests run without React or the DOM. Alpha APIs may change. ESM and TypeScript declarations.

Reference: [WAI-ARIA listbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/).
