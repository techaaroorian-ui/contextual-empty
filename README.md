# TechAaroorian UI

Alpha release preparation now includes framework-independent Ordered Collection and File Intake packages with optional React hooks. Their [interactive examples](./apps/docs/src/HeadlessGuide.tsx) are at `#/headless`; see [extraction and release scope](./docs/headless-extraction.md). The workspace itself remains private; public packages publish independently.

A CSS-only design language for thoughtful tools, with optional companion packages.

The first Aar Loom study explores **clarity through layers**: semantic color, precise surfaces, purposeful typography, and consistent interaction states. Components use the `aar-` prefix and support custom theme colors.

## Documentation

Run `npm run dev --workspace apps/docs` and open the Vite URL. The collection overview links to dedicated package documentation: `#/aar-loom` for the CSS language and visual lab, and `#/contextual-empty` for React installation, presets, composition, styling, and live examples. Hash routes support direct links and reloads on static hosting.

Collection guides: `#/guides/icons` covers optional Lucide integration, and `#/guides/versioning` explains independent package releases. Lucide is a docs dependency, not an Aar Loom dependency. See [release policy](./docs/versioning.md) for Changesets commands and public contracts.

With the server running, run `npm run test:visual --workspace apps/docs` to check browser behavior and capture review screenshots in `apps/docs/visual-artifacts/`. Screenshots are review artifacts, not approved regression baselines.

Start with the [CSS package guide](./packages/aar-loom/README.md) and [design concepts](./docs/design-language.md). The CSS foundation has no runtime dependency. React powers only the documentation playground and existing companion component.

The [roadmap](./docs/roadmap.md) starts with Yuwbrndr adoption, followed by component migration, refinement through real workflows, a second product, and a versioned release. With Yuwbrndr running on port 5174, run `node apps/docs/scripts/yuwbrndr-smoke.mjs` for integration checks and screenshots.

This repository is managed as a Monorepo using NPM Workspaces.

## 📦 Packages

### [`@techaaroorian-ui/aar-loom`](./packages/aar-loom)

Theme tokens, buttons, fields, panels, toolbars, badges, typography, and empty-state styling. Light/dark/system appearance, forest/iris palettes, and compact density. Consumer overrides define custom themes.

### [`@techaaroorian-ui/contextual-empty`](./packages/contextual-empty)

[![npm version](https://badge.fury.io/js/@techaaroorian-ui%2Fcontextual-empty.svg)](https://www.npmjs.com/package/@techaaroorian-ui/contextual-empty)

A contextual, composable empty-state system for React applications.

## 🏗️ Architecture

The existing React companion packages follow these principles; the new CSS foundation uses semantic theme tokens and layered component styles:

- **Zero Dependencies:** We rely on modern React and standard DOM APIs to keep bundle sizes ultra-lean.
- **Inversion of Control:** We provide compound primitives (Dot Notation) alongside fast presets, giving developers ultimate layout control.
- **Headless Styles:** Components ship with unopinionated CSS variables, ready to be themed by Tailwind, CSS Modules, or styled-components.
- **A11y First:** Built-in ARIA attributes and keyboard navigation.

## 🤝 Contributing

We love community contributions! Please read our [Contributing Guidelines](./CONTRIBUTING.md) to learn how to spin up the local development environment, run the Vitest test suite, and open a Pull Request.

## 📄 License

[MIT](LICENSE) © Janarthanan Soundararajan
