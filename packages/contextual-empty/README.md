# @techaaroorian-ui/contextual-empty

[![npm version](https://badge.fury.io/js/@techaaroorian-ui%2Fcontextual-empty.svg)](https://badge.fury.io/js/@techaaroorian-ui%2Fcontextual-empty)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A contextual, composable empty-state system for React applications.

Traditional empty states answer: *"Is there any data?"* **Contextual Empty States** answer: *"Why is there no data, and what should the user do next?"*

## Features

- 🧩 **Dual API:** Use quick Presets for speed, or Compound Primitives for ultimate control.
- ♿️ **A11y First:** Built-in ARIA support and semantic HTML.
- 🎨 **Headless Styles:** Ships with unopinionated base styles via CSS variables.
- ⚡️ **Zero Dependencies:** Ultra-lean bundle size.

## Installation

```bash
npm install @techaaroorian-ui/contextual-empty
```

## Usage (The Preset API)

For rapid development, use our built-in contextual presets:

```tsx
import { SearchEmpty } from '@techaaroorian-ui/contextual-empty';
import '@techaaroorian-ui/contextual-empty/dist/index.css';

function Dashboard() {
  return (
    <SearchEmpty 
      query="quantum metrics"
      onClear={() => handleClearFilters()} 
    />
  );
}
```

## Usage (The Primitive API)

For highly custom layouts, bypass the presets and use our Compound Components:

```tsx
import { ContextualEmptyState } from '@techaaroorian-ui/contextual-empty';

function CustomError() {
  return (
    <ContextualEmptyState type="error">
      <ContextualEmptyState.Icon>
        <MyCustomWarningSvg />
      </ContextualEmptyState.Icon>
      <ContextualEmptyState.Content>
        <h3>Connection Lost</h3>
        <p>Please check your internet and try again.</p>
      </ContextualEmptyState.Content>
      <ContextualEmptyState.Actions>
        <button onClick={retry}>Try Again</button>
      </ContextualEmptyState.Actions>
    </ContextualEmptyState>
  );
}
```
