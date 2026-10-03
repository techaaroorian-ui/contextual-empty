import { useState } from 'react';
import { validateFiles, type FileMetadata, type IntakeOptions, type IntakeResult } from './index.js';
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
