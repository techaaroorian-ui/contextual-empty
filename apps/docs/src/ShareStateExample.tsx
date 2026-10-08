import { useState } from "react";
import { Share2 } from "lucide-react";
import {
  encodeShareState,
  decodeShareState,
} from "../../../packages/share-state/src/index";

export default function ShareStateExample() {
  const [title, setTitle] = useState("Arcane Atelier Study 001");
  const [snippet, setSnippet] = useState(
    '<section class="atelier-altar">Transmuted</section>',
  );
  const [encodedHash, setEncodedHash] = useState("");
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
      const decoded = await decodeShareState<{
        title: string;
        snippet: string;
        timestamp: number;
      }>(encodedHash);
      setDecodedOutput(JSON.stringify(decoded, null, 2));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Decoding failed");
    }
  };

  return (
    <div className="aar-stack aar-w-100" data-gap="3">
      <div
        className="aar-split"
        style={{ "--aar-split-cols": "1fr 1fr" } as React.CSSProperties}
      >
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
            <button
              type="button"
              className="aar-button aar-display-inline-flex aar-items-center aar-gap-2"
              data-variant="primary"
              onClick={handleCompress}
            >
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
                  {originalBytes}B ➔ {compressedBytes}B (
                  {Math.round((1 - compressedBytes / originalBytes) * 100)}%
                  saved)
                </span>
              </div>
              <div className="aar-font-family-font-mono aar-text-0-875rem aar-p-300 aar-bg-surface-subtle aar-radius-radius-sm aar-word-break-break-all">
                #share={encodedHash}
              </div>
              <div className="aar-cluster">
                <button
                  type="button"
                  className="aar-button"
                  onClick={handleDecode}
                >
                  ⟡ Decompress & Verify
                </button>
              </div>
            </>
          ) : (
            <p className="aar-hint">
              Click compress to generate a zero-server URL hash.
            </p>
          )}

          {decodedOutput && (
            <pre className="aar-font-family-font-mono aar-text-0-875rem aar-p-300 aar-bg-surface aar-border-1px-solid-border aar-radius-radius-sm aar-overflow-auto aar-m-0px">
              {decodedOutput}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
