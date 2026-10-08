# File Intake

Atomic file batch validation extracted from Yuwbrndr's asset uploads. Framework-independent core and optional React hook. No CSS, upload service, object URLs, or storage policy.

## Compact drop-zone interaction

```tsx
import { useFileDropzone } from '@techaaroorian-ui/file-intake/react';
const { dropzoneProps, inputProps, open, errors, isDragging } = useFileDropzone({
  maxFiles: 5,
  maxFileBytes: 2 * 1024 * 1024,
  accept: ['image/png', 'image/jpeg', 'image/webp'],
  existingCount: assets.length,
  disabled: assets.length >= 5,
  onAccepted: files => addAssets(files),
});
<div {...dropzoneProps} className="aar-dropzone" role="group" aria-label="Image intake">
  <span>Drop images here</span>
  <button onClick={open}>Choose images</button>
  <input {...inputProps} className="aar-visually-hidden" tabIndex={-1} aria-label="Image files" />
</div>
```

The hook supplies file-only drop handling, nested drag tracking, a chooser trigger, same-file reselection, and the latest validation result. Render errors in an announced, persistent region; label the file input and provide a native button as the keyboard/touch alternative. Browser selection and drops use the same atomic validation and existingCount. onAccepted runs only for valid, nonempty batches. `clear()` clears validation feedback, not the application's asset list.

For other frameworks, `bindFileDropzone(element, options)` supplies the browser behavior. Pass onResult, optional onDragChange, and getter callbacks for existingCount and disabled; call destroy() on unmount. It ignores non-file drags, prevents dropped files navigating the page within the bound target, and skips disabled intake. Provide a separate native input wired to validateFiles. The core validator remains usable without browser globals.

Aar Loom provides compact `aar-file-intake`, `aar-dropzone`, `aar-file-list`, `aar-file-row`, `aar-file-details`, and `aar-file-preview` anatomy. The docs demonstrate retained assets, per-file removal, count limits, and local raster previews. These are consumer-owned composition and resource handling: the package does not allocate preview URLs or store assets. Preview URLs must be revoked on removal/unmount. Do not nest action buttons inside a clickable drop-zone button.

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
