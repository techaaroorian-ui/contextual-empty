# Dialog

Headless behavior for native modal `<dialog>` elements. A sheet uses the same behavior with different consumer styling. No CSS, renderer, or runtime framework dependency; optional React 18+ hook at `/react`.

```js
import { bindDialog } from '@techaaroorian-ui/dialog';
const controller = bindDialog(document.querySelector('dialog'), {
  dismissOutside: true,
  onOpenChange: open => console.log(open),
});
openButton.addEventListener('click', () => controller.open());
closeButton.addEventListener('click', () => controller.close());
// When the owning view is removed:
controller.destroy();
```

```tsx
import { useDialog } from '@techaaroorian-ui/dialog/react';
const { dialogRef, open, close } = useDialog({ dismissOutside: true });
<button onClick={open}>Open settings</button>
<dialog ref={dialogRef} aria-labelledby="settings-title" className="aar-dialog">
  <h2 id="settings-title">Settings</h2>
  <button onClick={() => close()}>Close</button>
</dialog>
```

Keep the dialog mounted and initially closed. Do not supply a React `open` prop or open it with `show()`; the controller uses `showModal()`. The native browser handles top-layer modality, background inertness, and focus containment. Set an accessible label using `aria-labelledby` or `aria-label`. Set `autofocus` on a suitable child if the first focusable element is not appropriate. Include an explicit close button. Native Escape/cancel, close(), and dialog-form submissions synchronize state and restore focus to the opener if it still exists.

Backdrop dismissal requires primary-pointer down and up outside the content rectangle; a drag starting inside does not dismiss. Set `dismissOutside: false` for flows needing explicit dismissal; Escape remains available. The controller does not block dismissal for unsaved edits. Destroy removes listeners, closes the surface, and restores focus; destroyed controllers cannot reopen. Do not bind multiple controllers to the same element. In React, keep dismissOutside stable while open; changing it rebinds and closes the dialog.

The browser API does not access globals at module import, but binding requires a mounted native dialog with `showModal` support. No legacy polyfill is included. This package does not implement global scroll locking, animation orchestration, routing, or confirmations. Nested dialogs are supported by the browser and are tested in the docs examples. Device and assistive technology verification is still needed before a stable release.

With Aar Loom, import its CSS once and use `aar-dialog`; add `data-placement="end"` or `"bottom"` for a sheet. Without Aar Loom, provide your own CSS. Do not add `display: block` to a closed dialog.

Browser interaction tests live in `apps/docs/scripts/visual-smoke.mjs`; run the docs server and `npm run test:visual --workspace apps/docs`. Alpha APIs may change. ESM and TypeScript declarations.

Reference: [native dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog).
