import { useDialog } from "@techaaroorian-ui/dialog/react";
import "@techaaroorian-ui/aar-craft/index.css";
import "./example-setup.css";

export default function DialogExample() {
  const { dialogRef, open: openDialog, close: closeDialog } = useDialog();
  const {
    dialogRef: sheetRef,
    open: openSheet,
    close: closeSheet,
  } = useDialog({ dismissOutside: false });
  return (
    <div className="aar-root">
      <div className="aar-toolbar">
        <button className="aar-button" onClick={openDialog}>
          Open example dialog
        </button>
        <button className="aar-button" onClick={openSheet}>
          Open example sheet
        </button>
      </div>
      <dialog
        ref={dialogRef}
        className="aar-dialog"
        aria-labelledby="example-dialog-title"
        aria-describedby="example-dialog-description"
      >
        <div className="example-stack">
          <h3 id="example-dialog-title" className="aar-heading">
            Export settings
          </h3>
          <p id="example-dialog-description">
            A behavior example. This does not export a file.
          </p>
          <label className="aar-field">
            Document name
            <input
              autoFocus
              className="aar-input"
              defaultValue="Untitled design"
            />
          </label>
          <button className="aar-button" onClick={openSheet}>
            Open nested sheet
          </button>
          <button className="aar-button" onClick={() => closeDialog()}>
            Close example dialog
          </button>
          <form method="dialog">
            <button className="aar-button" value="applied">
              Apply example settings
            </button>
          </form>
        </div>
      </dialog>
      <dialog
        ref={sheetRef}
        className="aar-dialog"
        data-placement="end"
        aria-labelledby="example-sheet-title"
      >
        <div className="example-stack">
          <h3 id="example-sheet-title" className="aar-heading">
            Document tools
          </h3>
          <p>
            Sheet placement comes from Aar Craft. The headless package contains
            no styles.
          </p>
          <button className="aar-button" onClick={() => closeSheet()}>
            Close example sheet
          </button>
        </div>
      </dialog>
    </div>
  );
}
