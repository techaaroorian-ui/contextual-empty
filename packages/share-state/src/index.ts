/**
 * @techaaroorian-ui/share-state
 * Zero-server URL state compression and share links using CompressionStream.
 */

export const COMPRESSED_PREFIX = 'v1z.';
export const UNCOMPRESSED_PREFIX = 'v1u.';
export const DEFAULT_MAX_ENCODED_LENGTH = 32_000;
export const DEFAULT_MAX_DECODED_BYTES = 256 * 1024; // 256 KB safety limit against decompression bombs
export const DEFAULT_MAX_URL_LENGTH = 32_768;

export class ShareStateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ShareStateError';
  }
}

export interface EncodeOptions {
  maxEncodedLength?: number;
  maxUrlLength?: number;
  compress?: boolean;
}

export interface DecodeOptions {
  maxEncodedLength?: number;
  maxDecodedBytes?: number;
}

/**
 * Converts a Uint8Array to a URL-safe Base64 string without padding.
 */
export function bytesToUrlSafeBase64(bytes: Uint8Array): string {
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + chunkSize)));
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Converts a URL-safe Base64 string back to a Uint8Array.
 */
export function urlSafeBase64ToBytes(base64: string, maxLength: number = DEFAULT_MAX_ENCODED_LENGTH): Uint8Array {
  if (!/^[A-Za-z0-9_-]+$/.test(base64) || base64.length > maxLength) {
    throw new ShareStateError('The shared state string is invalid or too large.');
  }

  let standard = base64.replace(/-/g, '+').replace(/_/g, '/');
  while (standard.length % 4 !== 0) {
    standard += '=';
  }
  const binary = atob(standard);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function readStreamWithLimit(
  stream: ReadableStream<Uint8Array>,
  maxBytes: number
): Promise<Uint8Array> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;

      total += value.byteLength;
      if (total > maxBytes) {
        await reader.cancel();
        throw new ShareStateError('The shared state exceeds safety limits.');
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const combined = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    combined.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return combined;
}

/**
 * Compresses and encodes an arbitrary object into a URL-safe string.
 */
export async function encodeShareState<T = unknown>(
  payload: T,
  options: EncodeOptions = {}
): Promise<string> {
  const json = JSON.stringify(payload);
  const jsonBytes = new TextEncoder().encode(json);
  const maxLength = options.maxEncodedLength ?? DEFAULT_MAX_ENCODED_LENGTH;

  if (options.compress !== false && typeof CompressionStream !== 'undefined') {
    try {
      const stream = new ReadableStream<Uint8Array>({
        start(controller) {
          controller.enqueue(jsonBytes);
          controller.close();
        },
      });
      const compressionStream = new CompressionStream('deflate-raw') as unknown as TransformStream<Uint8Array, Uint8Array>;
      const compressedStream = stream.pipeThrough(compressionStream);
      const compressedBytes = await readStreamWithLimit(compressedStream, jsonBytes.byteLength * 2 + 1024);
      const encoded = `${COMPRESSED_PREFIX}${bytesToUrlSafeBase64(compressedBytes)}`;

      if (encoded.length > maxLength) {
        throw new ShareStateError('The encoded state exceeds the maximum allowed length.');
      }
      return encoded;
    } catch (err) {
      if (err instanceof ShareStateError) throw err;
      // Fallback to uncompressed if stream failed
    }
  }

  const uncompressed = `${UNCOMPRESSED_PREFIX}${bytesToUrlSafeBase64(jsonBytes)}`;
  if (uncompressed.length > maxLength) {
    throw new ShareStateError('The encoded state exceeds the maximum allowed length.');
  }
  return uncompressed;
}

/**
 * Decodes and decompresses an encoded state string back into its original object.
 */
export async function decodeShareState<T = unknown>(
  encoded: string,
  options: DecodeOptions = {}
): Promise<T> {
  const maxBytes = options.maxDecodedBytes ?? DEFAULT_MAX_DECODED_BYTES;
  const maxLength = options.maxEncodedLength ?? DEFAULT_MAX_ENCODED_LENGTH;

  if (encoded.startsWith(COMPRESSED_PREFIX)) {
    const raw = encoded.slice(COMPRESSED_PREFIX.length);
    const bytes = urlSafeBase64ToBytes(raw, maxLength);

    if (typeof DecompressionStream === 'undefined') {
      throw new ShareStateError('DecompressionStream is not supported in this runtime.');
    }

    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(bytes);
        controller.close();
      },
    });

    const decompressionStream = new DecompressionStream('deflate-raw') as unknown as TransformStream<Uint8Array, Uint8Array>;
    const decompressedStream = stream.pipeThrough(decompressionStream);
    const decompressedBytes = await readStreamWithLimit(decompressedStream, maxBytes);
    const json = new TextDecoder().decode(decompressedBytes);
    return JSON.parse(json) as T;
  }

  if (encoded.startsWith(UNCOMPRESSED_PREFIX)) {
    const raw = encoded.slice(UNCOMPRESSED_PREFIX.length);
    const bytes = urlSafeBase64ToBytes(raw, maxLength);
    if (bytes.byteLength > maxBytes) {
      throw new ShareStateError('The state exceeds the maximum allowable decoded size.');
    }
    const json = new TextDecoder().decode(bytes);
    return JSON.parse(json) as T;
  }

  throw new ShareStateError('Unknown share state format.');
}

/**
 * Builds a full URL including the hash `#share={encoded}`.
 */
export async function createShareUrl<T = unknown>(
  payload: T,
  baseUrl?: string,
  options: EncodeOptions = {}
): Promise<string> {
  const encoded = await encodeShareState(payload, options);
  const base = baseUrl || (typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : '');
  const url = `${base}#share=${encoded}`;

  const maxUrlLen = options.maxUrlLength ?? DEFAULT_MAX_URL_LENGTH;
  if (url.length > maxUrlLen) {
    throw new ShareStateError(`Share URL length (${url.length}) exceeds browser limit (${maxUrlLen}).`);
  }
  return url;
}

/**
 * Extracts and decodes the state payload from a URL hash string.
 */
export async function decodeFromHash<T = unknown>(
  hash: string,
  options: DecodeOptions = {}
): Promise<T | null> {
  if (!hash) return null;
  const match = hash.match(/(?:^|[#&])share=([^&]+)/);
  if (!match || !match[1]) return null;

  try {
    return await decodeShareState<T>(match[1], options);
  } catch (err) {
    console.error('Failed to decode share state from hash:', err);
    return null;
  }
}
