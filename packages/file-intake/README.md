# File Intake

Atomic file batch validation extracted from Yuwbrndr's asset uploads. Framework-independent core and optional React hook. No CSS, upload service, object URLs, or storage policy.

```js
import { validateFiles } from '@techaaroorian-ui/file-intake';
const result = validateFiles(input.files, {
  maxFiles: 5,
  maxFileBytes: 2 * 1024 * 1024,
  accept: ['image/*', '.png'],
}, existingAssets.length);
if (result.errors.length === 0) {
  // Create object URLs or upload accepted files only after full validation.
}
```

```tsx
import { useFileIntake } from '@techaaroorian-ui/file-intake/react';
const intake = useFileIntake({ maxFiles: 5, maxFileBytes: 2 * 1024 * 1024 });
// intake.validate(event.currentTarget.files ?? [], existingAssets.length)
// intake.errors: render persistent, labeled error feedback.
// intake.clear(): clear the latest validation result.
```

Pass an iterable of files or metadata objects with `name`, `size`, and `type`. FileList works directly. Limits default to unlimited. `maxFiles` includes existing items. Byte limits are inclusive. Accept patterns support exact MIME types, MIME families (`image/*`), and case-insensitive extensions (`.png`). Any error rejects the whole batch. Empty input produces an empty successful result. Errors have `count`, `size`, `type`, or `metadata` codes for caller-owned messages. Malformed limits throw.

MIME/extension checks use supplied metadata, not file contents. Validate again at any upload service. Create and revoke object URLs in the consuming application; this package allocates none. The hook retains references to the last batch until the next validation or clear. It does not keep a running asset collection.

Consumers provide a labeled file input, optional drop handling, progress, and storage. Always offer file selection as an alternative to dragging. React 18+ is required only for `/react`; the core works without React or browser globals.

Alpha: APIs may change. ESM and TypeScript declarations; no CommonJS build.
