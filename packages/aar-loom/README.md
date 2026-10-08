# Aar Loom

A CSS-only design and layout language. Use plain HTML, your own components, or any application framework. Aar Loom does not require TechAaroorian UI headless packages or a component library.

## Start with HTML

```css
@import "@techaaroorian-ui/aar-loom/index.css";
```

```html
<body class="aar-page-reset">
  <main class="aar-root" data-theme="system" data-density="comfortable">
    <section class="aar-container aar-stack aar-p-4" data-gap="6">
      <h1 class="aar-title">Your application</h1>
      <div class="aar-grid" data-min="18">
        <article class="aar-panel">Main work</article>
        <aside class="aar-panel">Supporting tools</aside>
      </div>
    </section>
  </main>
</body>
```

`aar-page-reset` is an explicit margin reset; the framework does not reset the global body. Applications own preference controls and persistence.

## Appearance, brand, expression, density

- `data-theme="light|dark|system"`: one default surface and text hierarchy for each appearance. System follows the browser preference.
- Brand identity: override semantic tokens such as `--aar-primary`, `--aar-on-primary`, and `--aar-focus`. There are no named palette variants. Give each appearance a readable foreground/background pair.
- `data-magic-art="true"`: optional expressive feedback. Core controls and layout work without it.
- `data-density="comfortable|compact"`: spacing and control density. Coarse pointers retain generous targets.

```css
[data-brand="your-brand"][data-theme="light"] {
  --aar-primary: #326954;
  --aar-on-primary: #ffffff;
  --aar-focus: #326954;
}
[data-brand="your-brand"][data-theme="dark"] {
  --aar-primary: #a8d6c4;
  --aar-on-primary: #142d25;
  --aar-focus: #a8d6c4;
}
```

Custom colors require contrast checks. Status roles remain distinct from brand accent. Nested explicit theme roots can choose independent appearances; ordinary markup inherits the surrounding tokens.

## Public layout classes

| Pattern | Classes / attributes |
| --- | --- |
| Application or documentation shell | `aar-site`, `aar-site-header`, `aar-site-footer` |
| Bounded content and reading measure | `aar-container`, `aar-prose`, `aar-section` |
| Vertical rhythm and wrapping peers | `aar-stack`, `aar-cluster`, `data-gap="1|2|3|4|6|8"` |
| Adaptive collection grid | `aar-grid`, `data-min="14|18|24"` |
| Work and supporting regions | `aar-split`, `aar-workspace`, `aar-workspace-main` |
| Knowledge portal navigation | `aar-guide-shell`, `aar-guide-sidebar`, `aar-guide-main` |
| Highlighted source frame | `aar-code`, `aar-code-toolbar`, `data-expanded="true"` |
| Spacing utilities | `aar-p-4`, `aar-mt-6`, `aar-gap-4` (quarter-rem scale) |

The default entry includes every public module. Advanced consumers can import `tokens.css`, `components.css`, `layouts.css`, `compositions.css`, `expression.css`, `code.css`, `magic-art.css`, and `utilities.css` separately. Use the default entry when composing modules to preserve layer order. The documentation uses only these package styles.

Runtime geometry uses documented CSS inputs rather than a private stylesheet: `--aar-grid-min`, `--aar-split-cols`, `--aar-order`, and `--aar-width`, `--aar-height`, `--aar-transform` with corresponding `aar-bind-*` classes. Consumers supply dimensions or transforms; CSS cannot calculate application state.

## Interaction boundaries

Component classes are convenient examples, not mandatory APIs. CSS supplies focus, selected-state appearance, responsive composition, and motion. Native HTML supplies button, select, and details behavior. Applications or headless adapters supply dialog dismissal, listbox navigation, uploads, drawing, and viewport state.

`aar-select-frame` wraps a native `select.aar-select` and an optional decorative `aar-select-chevron`. On fine-pointer devices, browsers supporting `appearance: base-select` get a themed option panel with a short fade and lift, selected checkmark, and rotating arrow. Touch devices and unsupported browsers retain their platform picker. Reduced motion disables the reveal transition.

Magic Art geometry and surface transitions use CSS/SVG. Star particle bursts need an application event handler; CSS classes alone cannot create particles. Respect reduced motion. The docs demonstrate an optional handler; Aar Loom ships no JavaScript runtime.

## Tailwind coexistence

The standard entry declares `theme, base, components, utilities`. Normal Tailwind utilities can override component-layer styles. Reduced-motion rules intentionally use `!important` to preserve the user's preference.

For Tailwind v3 import `@techaaroorian-ui/aar-loom/tailwind-v3.css`. The build includes all public modules under native `aar-theme`, `aar-components`, and `aar-utilities` layers; unlayered Tailwind utilities take precedence. Tailwind v4-specific token mapping is not shipped.

## Validate

From the repository root, run `npm run build --workspace packages/aar-loom`, `npm run build --workspace docs`, and `npm run test:visual --workspace docs` with the documentation dev server running. Review narrow layouts, both appearances, keyboard focus, custom colors, and reduced motion. The package is in alpha; the rename and new layout API require versioning before publication.
