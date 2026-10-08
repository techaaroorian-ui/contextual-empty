import { useCallback, useEffect, useRef, useState, type ChangeEvent } from 'react';
import { bindFileDropzone, validateFiles, type FileMetadata, type IntakeOptions, type IntakeResult } from './index.js';
export function useFileIntake<T extends FileMetadata = File>(options: IntakeOptions = {}) {
  const [result, setResult] = useState<IntakeResult<T>>({ accepted: [], errors: [] });
  return {
    ...result,
    validate(files: Iterable<T>, existingCount = 0) {
      const next = validateFiles(files, options, existingCount); setResult(next); return next;
    },
    clear() { setResult({ accepted: [], errors: [] }); },
  };
}

export interface FileDropzoneOptions extends IntakeOptions {
  existingCount?: number;
  disabled?: boolean;
  onAccepted?: (files: readonly File[]) => void;
}
export function useFileDropzone(options: FileDropzoneOptions = {}) {
  const dropzoneRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const latest = useRef(options);
  const [isDragging, setDragging] = useState(false);
  const [result, setResult] = useState<IntakeResult<File>>({ accepted: [], errors: [] });
  useEffect(() => { latest.current = options; });
  const receive = useCallback((next: IntakeResult<File>) => {
    setResult(next);
    if (next.accepted.length) latest.current.onAccepted?.(next.accepted);
  }, []);
  useEffect(() => {
    const element = dropzoneRef.current;
    if (!element) return;
    const bound = bindFileDropzone(element, {
      get maxFiles() { return latest.current.maxFiles; },
      get maxFileBytes() { return latest.current.maxFileBytes; },
      get accept() { return latest.current.accept; },
      existingCount: () => latest.current.existingCount ?? 0,
      disabled: () => latest.current.disabled ?? false,
      onResult: receive, onDragChange: setDragging,
    });
    return () => bound.destroy();
  }, [receive]);
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!options.disabled) receive(validateFiles(event.currentTarget.files ?? [], options, options.existingCount ?? 0));
    event.currentTarget.value = '';
  };
  return {
    ...result, isDragging,
    dropzoneProps: { ref: dropzoneRef, 'data-drag-active': isDragging ? 'true' : undefined, 'aria-disabled': options.disabled || undefined },
    inputProps: { ref: inputRef, type: 'file' as const, multiple: true, accept: options.accept?.join(','), disabled: options.disabled, onChange },
    open: useCallback(() => { if (!latest.current.disabled) inputRef.current?.click(); }, []),
    clear: useCallback(() => setResult({ accepted: [], errors: [] }), []),
  };
}
