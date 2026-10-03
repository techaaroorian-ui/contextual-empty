export interface FileMetadata { name: string; size: number; type: string }
export interface IntakeOptions { maxFiles?: number; maxFileBytes?: number; accept?: readonly string[] }
export type IntakeErrorCode = 'count' | 'size' | 'type' | 'metadata';
export interface IntakeError<T> { code: IntakeErrorCode; file?: T; message: string }
export interface IntakeResult<T> { accepted: readonly T[]; errors: readonly IntakeError<T>[] }
function accepts(file: FileMetadata, patterns: readonly string[]) {
  const name = file.name.toLowerCase(), mime = file.type.toLowerCase();
  return patterns.length === 0 || patterns.some(raw => {
    const pattern = raw.toLowerCase().trim();
    if (pattern.startsWith('.')) return name.endsWith(pattern);
    if (pattern.endsWith('/*')) return mime.startsWith(pattern.slice(0, -1));
    return mime === pattern;
  });
}
export function validateFiles<T extends FileMetadata>(files: Iterable<T>, options: IntakeOptions = {}, existingCount = 0): IntakeResult<T> {
  const batch = [...files], errors: IntakeError<T>[] = [];
  const max = options.maxFiles ?? Infinity, bytes = options.maxFileBytes ?? Infinity;
  if (!Number.isInteger(existingCount) || existingCount < 0 || !(max === Infinity || Number.isInteger(max) && max >= 0) || bytes < 0 || Number.isNaN(bytes)) throw new RangeError('Invalid intake limits');
  if (batch.length === 0) return { accepted: [], errors };
  if (existingCount + batch.length > max) errors.push({ code: 'count', message: `Maximum ${max} files; ${existingCount} already present.` });
  for (const file of batch) {
    if (!Number.isFinite(file.size) || file.size < 0) errors.push({ code: 'metadata', file, message: `Invalid size for "${file.name}".` });
    else if (file.size > bytes) errors.push({ code: 'size', file, message: `"${file.name}" exceeds ${bytes} bytes.` });
    if (!accepts(file, options.accept ?? [])) errors.push({ code: 'type', file, message: `"${file.name}" is not an accepted file type.` });
  }
  return { accepted: errors.length ? [] : batch, errors };
}
