import { useState, useEffect, useCallback } from 'react';
import {
  decodeFromHash,
  createShareUrl,
  type EncodeOptions,
  type DecodeOptions,
  ShareStateError,
} from './index.js';

export interface UseShareStateOptions extends DecodeOptions {
  onLoaded?: (payload: unknown) => void;
  clearHashOnLoad?: boolean;
}

export interface UseShareStateReturn<T> {
  loadedPayload: T | null;
  isLoading: boolean;
  error: Error | null;
  generateShareUrl: (payload: T, baseUrl?: string, options?: EncodeOptions) => Promise<string>;
  copyShareUrl: (payload: T, baseUrl?: string, options?: EncodeOptions) => Promise<string>;
  clearError: () => void;
}

export function useShareState<T = unknown>(options: UseShareStateOptions = {}): UseShareStateReturn<T> {
  const [loadedPayload, setLoadedPayload] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const { onLoaded, clearHashOnLoad = false, ...decodeOptions } = options;

  useEffect(() => {
    let active = true;

    async function checkHash() {
      if (typeof window === 'undefined') return;
      const hash = window.location.hash;
      if (!hash || !hash.includes('share=')) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await decodeFromHash<T>(hash, decodeOptions);
        if (!active) return;

        if (result) {
          setLoadedPayload(result);
          onLoaded?.(result);

          if (clearHashOnLoad) {
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
          }
        }
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err : new ShareStateError('Failed to load shared state.'));
      } finally {
        if (active) setIsLoading(false);
      }
    }

    checkHash();

    const handleHashChange = () => checkHash();
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      active = false;
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [clearHashOnLoad, onLoaded]);

  const generateShareUrl = useCallback(
    async (payload: T, baseUrl?: string, encodeOpts?: EncodeOptions): Promise<string> => {
      return createShareUrl(payload, baseUrl, encodeOpts);
    },
    []
  );

  const copyShareUrl = useCallback(
    async (payload: T, baseUrl?: string, encodeOpts?: EncodeOptions): Promise<string> => {
      const url = await createShareUrl(payload, baseUrl, encodeOpts);

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        return url;
      }

      const textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const copied = document.execCommand('copy');
      textarea.remove();

      if (!copied) {
        throw new ShareStateError('Clipboard access is unavailable.');
      }
      return url;
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  return {
    loadedPayload,
    isLoading,
    error,
    generateShareUrl,
    copyShareUrl,
    clearError,
  };
}
