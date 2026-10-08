# @techaaroorian-ui/pan-zoom

Headless viewport calculation, auto-fit algorithms, and zoom management for creative workspaces and canvas editors.

## Features

- **Zero Dependencies**: Pure mathematical engine with no CSS or framework dependencies.
- **Auto-Fit Calculation**: Uniform scale calculation that cleanly fits content within any container.
- **Optional React Hook**: `usePanZoom` with `ResizeObserver` support and zoom controls.
- **Full Control**: Zoom stepping, bounds clamping, and panning coordinates.

## Installation

```bash
npm install @techaaroorian-ui/pan-zoom
```

## Quick Start (React)

```tsx
import { usePanZoom } from '@techaaroorian-ui/pan-zoom/react';

function CanvasWorkspace() {
  const {
    containerRef,
    zoom,
    renderedWidth,
    renderedHeight,
    zoomIn,
    zoomOut,
    resetZoom,
    autoFit,
    toggleAutoFit,
  } = usePanZoom({
    contentWidth: 1200,
    contentHeight: 627,
    padding: 32,
  });

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <header>
        <button onClick={zoomIn}>Zoom In</button>
        <button onClick={zoomOut}>Zoom Out</button>
        <button onClick={resetZoom}>100%</button>
        <button onClick={toggleAutoFit}>Auto-Fit: {autoFit ? 'ON' : 'OFF'}</button>
      </header>

      <div style={{ width: renderedWidth, height: renderedHeight }}>
        {/* Your artwork / canvas content */}
      </div>
    </div>
  );
}
```

## Core API (Framework-Agnostic)

```ts
import { calculateFit, clampZoom, stepZoom, createPanZoom } from '@techaaroorian-ui/pan-zoom';

const fitScale = calculateFit({
  containerWidth: 1024,
  containerHeight: 768,
  contentWidth: 1200,
  contentHeight: 627,
  padding: 32,
});
```

## License

MIT © Janarthanan Soundararajan
