# @techaaroorian-ui/share-state

Zero-server client-side state compression and shareable URL generation via native browser `CompressionStream`.

## Features

- **Zero-Server Sharing**: Encode application state directly into URL hash fragments without any databases or accounts.
- **Native Compression**: Uses browser `CompressionStream('deflate-raw')` for up to 80% size reduction on JSON/HTML payloads.
- **Safety Limits**: Guards against decompression bombs and URL length limits.
- **Optional React Hook**: `useShareState` for instant hash synchronization and one-click copy links.

## Installation

```bash
npm install @techaaroorian-ui/share-state
```

## Quick Start (React)

```tsx
import { useShareState } from '@techaaroorian-ui/share-state/react';

function DesignStudio() {
  const { loadedPayload, copyShareUrl } = useShareState({
    onLoaded: (state) => {
      console.log('Restored state from URL:', state);
    },
  });

  const handleShare = async () => {
    const url = await copyShareUrl({ code: '<h1>Hello World</h1>', theme: 'obsidian' });
    alert(`Link copied to clipboard: ${url}`);
  };

  return <button onClick={handleShare}>Share Design</button>;
}
```

## License

MIT © Janarthanan Soundararajan
