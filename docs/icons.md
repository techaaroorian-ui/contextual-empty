# Icons across TechAaroorian UI

Lucide is the recommended icon family for consuming applications and the collection docs. It is optional and is not a dependency of either public package. Brand logos remain separate custom assets. Aar Craft defines CSS anatomy; the application supplies icon SVGs.

Install `lucide-react` in a React consumer and import named icons. Start with 16–20 px for controls and 24–32 px for empty states, using a consistent stroke width. These are collection conventions, not framework requirements.

```tsx
import { Download, Settings, Search } from 'lucide-react';

<button onClick={download}>
  <Download size={18} strokeWidth={1.75} aria-hidden="true" />
  Download
</button>

<button aria-label="Open settings" onClick={openSettings}>
  <Settings size={20} aria-hidden="true" />
</button>

<SearchEmpty
  query="drafts"
  icon={<Search size={32} aria-hidden="true" />}
  onClear={clearSearch}
/>
```

Use visible labels where possible. Label the button rather than its decorative icon; keep keyboard focus visible and give the wrapper a usable hit area. Use words and shape as well as color for status. Non-React consumers can use Lucide SVG assets or framework-specific packages.

Live guide: `#/guides/icons`.

Sources: [Lucide React](https://lucide.dev/guide/react), [accessibility guidance](https://lucide.dev/how-to/accessibility).
