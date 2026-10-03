import { useEffect, useRef, useState } from "react";
import { useFileDropzone } from "@techaaroorian-ui/file-intake/react";
import { FileImage, Upload, X } from "lucide-react";
import "@techaaroorian-ui/aar-craft/index.css";

function FilePreview({ file }: { file: File }) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);
  const raster = ["image/png", "image/jpeg", "image/webp"].includes(file.type);
  useEffect(() => {
    const image = imageRef.current;
    if (!raster || !image) return;
    const url = URL.createObjectURL(file);
    image.src = url;
    return () => URL.revokeObjectURL(url);
  }, [file, raster]);
  return raster && !failed ? (
    <img
      ref={imageRef}
      className="aar-file-preview"
      alt=""
      onError={() => setFailed(true)}
    />
  ) : (
    <FileImage size={22} aria-hidden="true" />
  );
}

export default function FileIntakeExample() {
  const [files, setFiles] = useState<{ id: string; file: File }[]>([]);
  const { dropzoneProps, inputProps, open, errors, clear, isDragging } =
    useFileDropzone({
      maxFiles: 5,
      maxFileBytes: 2 * 1024 * 1024,
      accept: ["image/png", "image/jpeg", "image/webp", "image/svg+xml"],
      existingCount: files.length,
      disabled: files.length >= 5,
      onAccepted: (batch) =>
        setFiles((current) => [
          ...current,
          ...batch.map((file) => ({ id: crypto.randomUUID(), file })),
        ]),
    });
  return (
    <div className="aar-root aar-file-intake">
      <div className="aar-toolbar">
        <h3 className="aar-heading">Image assets</h3>
        <span className="aar-badge">{files.length} / 5</span>
      </div>
      <div
        {...dropzoneProps}
        className="aar-dropzone"
        role="group"
        aria-label="Image drop zone"
        aria-describedby="intake-help intake-result"
      >
        <Upload size={22} aria-hidden="true" />
        <strong>
          {files.length >= 5
            ? "All five slots are filled"
            : isDragging
              ? "Release to add images"
              : "Drop images here"}
        </strong>
        <span id="intake-help" className="aar-hint">
          PNG, JPG, SVG or WebP · 2 MiB per file
        </span>
        <button
          type="button"
          className="aar-button"
          onClick={open}
          disabled={files.length >= 5}
        >
          Choose images
        </button>
        <input
          {...inputProps}
          className="aar-visually-hidden"
          tabIndex={-1}
          aria-label="Image files"
        />
      </div>
      <div
        id="intake-result"
        role="status"
        className="aar-hint"
        data-tone={errors.length ? "danger" : undefined}
      >
        {errors.length ? (
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error.message}</li>
            ))}
          </ul>
        ) : files.length ? (
          `Accepted ${files.length} file(s). Stored locally for this example.`
        ) : (
          "No files selected. Files stay on your device."
        )}
      </div>
      {files.length > 0 && (
        <ul className="aar-file-list">
          {files.map(({ id, file }) => (
            <li key={id} className="aar-file-row">
              <FilePreview file={file} />
              <div className="aar-file-details">
                <strong title={file.name}>{file.name}</strong>
                <span className="aar-hint">
                  {file.size < 1024
                    ? `${file.size} B`
                    : `${(file.size / 1024).toFixed(1)} KiB`}
                </span>
              </div>
              <button
                className="aar-button"
                data-variant="quiet"
                aria-label={`Remove ${file.name}`}
                onClick={() => {
                  setFiles((current) =>
                    current.filter((item) => item.id !== id),
                  );
                  clear();
                }}
              >
                <X size={16} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
      {(files.length > 0 || errors.length > 0) && (
        <button
          className="aar-button"
          data-variant="quiet"
          onClick={() => {
            setFiles([]);
            clear();
          }}
        >
          Clear file result
        </button>
      )}
    </div>
  );
}
