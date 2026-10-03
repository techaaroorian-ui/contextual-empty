# Component behavior and styling

TechAaroorian UI packages own behavior and documented markup/state contracts. Aar Craft owns optional appearance and layout. Headless packages do not import Aar Craft, icons, or a visual stylesheet.

| Consumer | Styles to load |
| --- | --- |
| Aar Craft application | Aar Craft CSS once, with documented component classes |
| Custom design system | Consumer CSS for the headless markup/state contract |
| Contextual Empty without a design system | Optional contextual-empty/dist/index.css |

Contextual Empty's existing stylesheet is retained as a standalone option. It is not imported automatically by the bundled JavaScript. Aar Craft consumers can skip it and pass `className="aar-contextual-empty"` to a preset or compound root. The adapter styles only that opt-in class and its documented descendants. It does not require the React package at runtime.

```tsx
import '@techaaroorian-ui/aar-craft/index.css';
import { SearchEmpty } from '@techaaroorian-ui/contextual-empty';

<div className="aar-root" data-theme="dark">
  <SearchEmpty className="aar-contextual-empty" query="drafts" onClear={clearSearch} />
</div>
```

Do not import both standalone Contextual Empty CSS and its Aar Craft styling for the same component. The standalone stylesheet is unlayered and can override layered design-language rules. Choose one styling owner.

Dialog/sheet and collection picker ship no styles. Aar Craft supplies `aar-dialog`, optional `data-placement="end"` or `"bottom"`, `aar-picker`, and `aar-picker-option`. Their state attributes remain semantic: `[open]`, `[aria-selected]`, `[aria-disabled]`, and `[data-active]`. A picker active outline indicates the option being explored; filled selection indicates the committed choice.

Behavior may require browser primitives such as the native dialog's hidden/top-layer rules. Preserve those rules in custom CSS; headless does not mean removing the browser's accessibility behavior. Product-specific compositions, artwork, and syntax highlighting remain consumer responsibilities.
