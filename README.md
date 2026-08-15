# TechAaroorian UI

A collection of accessible, highly-composable, headless-first React UI components designed for enterprise applications.

This repository is managed as a Monorepo using NPM Workspaces.

## 📦 Packages

### [`@techaaroorian-ui/contextual-empty`](./packages/contextual-empty)

[![npm version](https://badge.fury.io/js/@techaaroorian-ui%2Fcontextual-empty.svg)](https://www.npmjs.com/package/@techaaroorian-ui/contextual-empty)

A contextual, composable empty-state system for React applications.

## 🏗️ Architecture

Our packages follow a strict set of engineering principles:

- **Zero Dependencies:** We rely on modern React and standard DOM APIs to keep bundle sizes ultra-lean.
- **Inversion of Control:** We provide compound primitives (Dot Notation) alongside fast presets, giving developers ultimate layout control.
- **Headless Styles:** Components ship with unopinionated CSS variables, ready to be themed by Tailwind, CSS Modules, or styled-components.
- **A11y First:** Built-in ARIA attributes and keyboard navigation.

## 🤝 Contributing

We love community contributions! Please read our [Contributing Guidelines](./CONTRIBUTING.md) to learn how to spin up the local development environment, run the Vitest test suite, and open a Pull Request.

## 📄 License

[MIT](LICENSE) © Janarthanan Soundararajan
