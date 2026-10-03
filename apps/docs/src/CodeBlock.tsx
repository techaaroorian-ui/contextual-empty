import { useId, useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import javascript from "highlight.js/lib/languages/javascript";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import bash from "highlight.js/lib/languages/bash";
import "./CodeBlock.css";

hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("css", css);
hljs.registerLanguage("bash", bash);

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch {
    const active = document.activeElement as HTMLElement | null;
    const selection = window.getSelection();
    const ranges = selection
      ? Array.from({ length: selection.rangeCount }, (_, index) =>
          selection.getRangeAt(index).cloneRange(),
        )
      : [];
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.readOnly = true;
    textarea.tabIndex = -1;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.append(textarea);
    try {
      textarea.select();
      if (!document.execCommand("copy"))
        throw new Error("Clipboard unavailable");
    } finally {
      textarea.remove();
      active?.focus({ preventScroll: true });
      selection?.removeAllRanges();
      ranges.forEach((range) => selection?.addRange(range));
    }
  }
}

export default function CodeBlock({
  code,
  language = "tsx",
  title = "Example.tsx",
}: {
  code: string;
  language?: "tsx" | "typescript" | "javascript" | "html" | "css" | "bash";
  title?: string;
}) {
  const source = code.replace(/\r\n/g, "\n").trimEnd();
  const grammar =
    language === "tsx" ? "typescript" : language === "html" ? "xml" : language;
  const highlighted = useMemo(
    () =>
      hljs.highlight(source, { language: grammar, ignoreIllegals: true }).value,
    [source, grammar],
  );
  const [outcome, setOutcome] = useState<{
    source: string;
    state: "copied" | "error";
  } | null>(null);
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  const feedback = outcome?.source === source ? outcome.state : null;
  return (
    <figure className="docs-code" data-expanded={expanded ? "true" : undefined}>
      <figcaption className="docs-code-toolbar">
        <span>
          <strong>{title}</strong>
          <small>{language.toUpperCase()}</small>
        </span>
        <div>
          <button
            className="aar-button"
            data-variant="quiet"
            aria-controls={id}
            aria-expanded={expanded}
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? "Collapse code area" : "Expand code area"}
          </button>
          <button
            className="aar-button"
            data-variant="quiet"
            aria-label={`Copy ${title}`}
            onClick={async () => {
              try {
                await copyText(source);
                setOutcome({ source, state: "copied" });
              } catch {
                setOutcome({ source, state: "error" });
              }
            }}
          >
            {feedback === "copied" ? (
              <Check size={16} aria-hidden="true" />
            ) : (
              <Copy size={16} aria-hidden="true" />
            )}
            {feedback === "copied" ? "Copied" : "Copy"}
          </button>
        </div>
      </figcaption>
      <span className="aar-visually-hidden" aria-live="polite">
        {feedback === "copied" ? `Copied ${title}` : ""}
      </span>
      {feedback === "error" && (
        <p className="docs-code-error" aria-live="polite">
          Copy failed. Select the code below and copy it manually.
        </p>
      )}
      <pre id={id} tabIndex={0} aria-label={`${title} source code`}>
        <code
          className={`hljs language-${language}`}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
    </figure>
  );
}
