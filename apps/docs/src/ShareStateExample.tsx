import { useState } from 'react';
import { Share2 } from 'lucide-react';
import { encodeShareState, decodeShareState } from '../../../packages/share-state/src/index';

export default function ShareStateExample() {
  const [title, setTitle] = useState('Arcane Atelier Study 001');
  const [snippet, setSnippet] = useState('<section class="atelier-altar">Transmuted</section>');
  const [encodedHash, setEncodedHash] = useState('');
  const [originalBytes, setOriginalBytes] = useState(0);
  const [compressedBytes, setCompressedBytes] = useState(0);
  const [decodedOutput, setDecodedOutput] = useState<string | null>(null);

  const handleCompress = async () => {
    const payload = { title, snippet, timestamp: Date.now() };
    const rawJson = JSON.stringify(payload);
    setOriginalBytes(new TextEncoder().encode(rawJson).byteLength);

    const encoded = await encodeShareState(payload);
    setEncodedHash(encoded);
    setCompressedBytes(new TextEncoder().encode(encoded).byteLength);
    setDecodedOutput(null);
  };

  const handleDecode = async () => {
    if (!encodedHash) return;
    try {
      const decoded = await decodeShareState<{ title: string; snippet: string; timestamp: number }>(encodedHash);
      setDecodedOutput(JSON.stringify(decoded, null, 2));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Decoding failed');
    }
  };

  return (
    <div className="aar-stack" data-gap="3" style={{ width: '100%' }}>
      <div className="aar-split" style={{ '--aar-split-cols': '1fr 1fr' } as React.CSSProperties}>
        <div className="aar-stack" data-gap="2">
          <label className="aar-field">
            <span>Project Title</span>
            <input
              type="text"
              className="aar-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="aar-field">
            <span>Canvas Snippet</span>
            <input
              type="text"
              className="aar-input"
              value={snippet}
              onChange={(e) => setSnippet(e.target.value)}
            />
          </label>
          <div>
            <button type="button" className="aar-button" data-variant="primary" onClick={handleCompress} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <Share2 size={14} /> Compress into URL Hash
            </button>
          </div>
        </div>

        <div className="aar-stack" data-gap="2">
          {encodedHash ? (
            <>
              <div className="aar-cluster" data-align="between">
                <span className="aar-eyebrow">Compressed Payload</span>
                <span className="aar-badge" data-tone="success">
                  {originalBytes}B ➔ {compressedBytes}B ({Math.round((1 - compressedBytes / originalBytes) * 100)}% saved)
                </span>
              </div>
              <div
                style={{
                  fontFamily: 'var(--aar-font-mono)',
                  fontSize: '.75rem',
                  padding: '.75rem',
                  background: 'var(--aar-surface-subtle)',
                  borderRadius: 'var(--aar-radius-sm)',
                  wordBreak: 'break-all',
                }}
              >
                #share={encodedHash}
              </div>
              <div className="aar-cluster">
                <button type="button" className="aar-button" onClick={handleDecode}>
                  ⟡ Decompress & Verify
                </button>
              </div>
            </>
          ) : (
            <p className="aar-hint">Click compress to generate a zero-server URL hash.</p>
          )}

          {decodedOutput && (
            <pre
              style={{
                fontFamily: 'var(--aar-font-mono)',
                fontSize: '.75rem',
                padding: '.75rem',
                background: 'var(--aar-surface)',
                border: '1px solid var(--aar-border)',
                borderRadius: 'var(--aar-radius-sm)',
                overflow: 'auto',
                margin: 0,
              }}
            >
              {decodedOutput}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
