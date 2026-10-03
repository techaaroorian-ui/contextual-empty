# Aar Craft · Study 001

A CSS-only foundation for TechAaroorian UI. Working principle: **clarity through layers**.

Matte surfaces group content, typography establishes hierarchy, and strong color identifies actions. This is an initial specimen, not a finalized design language.

## Use

```css
@import "@techaaroorian-ui/aar-craft";
```

```html
<main class="aar-root" data-theme="light" data-palette="forest">
  <button class="aar-button" data-variant="primary">Create project</button>
</main>
```

Appearance: `light`, `dark`, or `system`. Palette: default forest or `iris`. Density: `comfortable` (default) or `compact`. Put attributes on the same theme root. Nested theme roots can reset to independent appearances.

The package does not change global body styles or require a runtime. Your application owns the theme picker and preference persistence. System appearance is handled by CSS media queries.

## Your own colors

Place consumer overrides in a stylesheet after the framework:

```css
[data-theme="my-brand"] {
  --aar-background: #f8fafc;
  --aar-surface: #ffffff;
  --aar-surface-subtle: #edf2f8;
  --aar-text: #172033;
  --aar-text-muted: #526078;
  --aar-border: #d7deea;
  --aar-primary: #2458a6;
  --aar-on-primary: #ffffff;
  --aar-focus: #2458a6;
}
```

Custom theme names start with light defaults. Override the remaining status tokens if needed: `success`, `success-surface`, `danger`, and `danger-surface`, all prefixed `--aar-`. For dark custom themes, define the full surface/text pairs and set `color-scheme: dark` on the root. Arbitrary palettes require contrast checking; CSS does not automatically choose a safe foreground.

## Tailwind coexistence

The default entry declares `theme, base, components, utilities` layer order. Component rules live in `components`, so normal utilities in `utilities` can override them. No `!important` is used in the package. Declare layer order before either framework import. Tailwind v4 token mapping is not yet shipped or verified.

For optional Tailwind v3 consumers, build the package with `npm run build --workspace packages/aar-craft` and import `@techaaroorian-ui/aar-craft/tailwind-v3.css` from the application entry. This generated CSS uses `aar-theme` and `aar-components` native layers so v3's PostCSS handling does not consume the framework's component rules. Existing unlayered Tailwind v3 utilities take precedence. This entry was initially exercised in Yuwbrndr before its interface moved to standalone CSS; ongoing compatibility fixtures remain roadmap work.

Yuwbrndr now consumes the standard entry with a local file dependency and no Tailwind compiler. A standalone checkout currently needs the sibling techaaroorian-ui repository. Publication will replace this with a versioned dependency.

## Motion

Controls use 140 ms feedback with `--aar-ease`. Pointer hover lifts buttons by 1 px; pressing compresses to 98%. Focus remains immediate, with a soft field halo. Color transitions preserve visual continuity when themes change.

Use `class="aar-enter"` on newly inserted content for a 220 ms fade with 6 px of movement. Entrance motion is opt-in, rather than automatically applied to every panel. The framework supplies CSS; the host decides when to insert content.

For a group, add `aar-stagger` to its parent and `style="--aar-order: 0"` (then 1, 2, etc.) to each `aar-enter` child. `--aar-stagger-step` defaults to 35 ms; delays cap at four steps. Try Replay motion in the Components view. Reduced-motion mode disables the sequence. Touch devices retain controls of at least 44 px even in compact density.

Customize `--aar-duration`, `--aar-duration-enter`, `--aar-ease`, `--aar-hover-offset`, `--aar-press-scale`, and `--aar-enter-offset`. Reduced-motion preferences zero durations and movement and disable entrance animations. Consumer motion overrides should also preserve that preference.

## Visual review

From the repository root run `npm run dev --workspace apps/docs`, then open the URL printed by Vite.

1. Inspect the workbench to judge hierarchy in context.
2. Open Components to inspect buttons, fields, status, typography, and empty states.
3. Compare light/dark, forest/iris, comfortable/compact, and custom primary/foreground pairs.
4. Use Tab and Shift+Tab, hover, and press controls. Inspect disabled and invalid specimens.
5. Resize to 390 px; inspect at 200% zoom and with reduced motion enabled.
6. Read Design lessons for the rules behind each choice.

The React docs app is only a demonstration host. The CSS package has no React dependency. Contextual Empty has separate documentation at `#/contextual-empty`; its Storybook stories remain available.
