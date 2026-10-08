# Ordered Collection

Headless ordered item state, extracted from Yuwbrndr's slide workflow. Framework-independent core; optional React hook. No CSS, renderer, generated IDs, or slide-specific data model.

```js
import { createCollection, reduceCollection } from '@techaaroorian-ui/ordered-collection';
let state = createCollection([{ id: 'cover', title: 'Cover' }]);
state = reduceCollection(state, {
  type: 'insert', afterId: 'cover', item: { id: 'details', title: 'Details' },
}, { minItems: 1, maxItems: 6 });
```

```tsx
import { useOrderedCollection } from '@techaaroorian-ui/ordered-collection/react';
const { items, selectedId, dispatch } = useOrderedCollection(initialItems, { minItems: 1, maxItems: 6 });
// Render ordinary labeled buttons; selection is application state.
// onClick={() => dispatch({ type: 'select', id: item.id })}
// aria-pressed={selectedId === item.id}
```

Commands: `select`, `insert` (append by default; optional `afterId`), `remove`, `move` (zero-based final index), and `update` (replace an item with the same ID). Insert selects the new item. Removing the selected item selects its next neighbor, or the previous neighbor at the end. Removing the final item selects null when allowed. Capacity, minimum, and missing-target operations are no-ops. Invalid IDs, duplicate IDs, malformed limits and fractional move indexes throw. Caller data is treated as immutable; the core does not deep-clone nested payloads. Duplication is an insert with a new ID and a caller-owned copy policy.

The hook reads initial items once. Keep min/max constraints consistent with the collection's current size; changes to options affect subsequent commands but do not automatically truncate existing data. React 18+ is required only for `/react`. Other frameworks can store reducer results in their own reactive state.

The core does not implement drag gestures, roving focus, tabs/listbox semantics, or persistence. Consumers choose appropriate native elements and keyboard/focus behavior; reordering must have non-drag alternatives.

Alpha: APIs may change. ESM and TypeScript declarations; no CommonJS build. No browser globals are accessed by the core.
