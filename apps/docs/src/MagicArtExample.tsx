import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Layers,
  Moon,
  RotateCcw,
  Sparkles,
  Sun,
} from "lucide-react";

const intentions = [
  {
    name: "Compose",
    title: "Give an idea its shape.",
    detail: "A quiet composition. A clear place to begin.",
    mark: "01",
  },
  {
    name: "Refine",
    title: "Find the essential.",
    detail: "Bring the useful forward. Let the rest recede.",
    mark: "02",
  },
  {
    name: "Deliver",
    title: "Make the next step clear.",
    detail: "Resolve the work into something ready to share.",
    mark: "03",
  },
];

export default function MagicArtExample() {
  const [intent, setIntent] = useState(0);
  const [theme, setTheme] = useState("dark");
  const [accent, setAccent] = useState("default");
  const [tools, setTools] = useState(false);
  const [texture, setTexture] = useState(true);
  const [phase, setPhase] = useState<"idle" | "working" | "ready">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  function transform() {
    setPhase("working");
    timer.current = setTimeout(() => {
      setPhase("ready");
      timer.current = null;
    }, 1100);
  }
  function reset() {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    setPhase("idle");
  }
  const current = intentions[intent];
  return (
    <div
      className="aar-root aar-magic-art"
      data-theme={theme}
      data-magic-art="true"
      style={accent === "custom" ? { "--aar-primary":"#a8d6c4", "--aar-on-primary":"#142d25", "--aar-focus":"#a8d6c4" } as React.CSSProperties : undefined}
      data-phase={phase}
    >
      <header className="aar-magic-mast">
        <span className="aar-magic-sign" aria-hidden="true">
          ✧
        </span>
        <span>
          AAR LOOM <small>INTERACTION ATELIER</small>
        </span>
        <div className="aar-magic-theme">
          <button
            aria-label={
              theme === "dark" ? "Use light appearance" : "Use dark appearance"
            }
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <label>
            Accent
            <span className="aar-magic-select">
              <span
                key={accent}
                className="aar-magic-select-mark"
                aria-hidden="true"
              >
                ✦
              </span>
              <select
                aria-label="Magic accent"
                value={accent}
                onChange={(e) => setAccent(e.target.value)}
              >
                <option value="default">Default accent</option>
                <option value="custom">Custom brand example</option>
              </select>
              <ChevronDown
                className="aar-magic-select-chevron"
                size={16}
                aria-hidden="true"
              />
            </span>
          </label>
        </div>
      </header>
      <div className="aar-magic-intro">
        <p className="aar-magic-kicker">A STUDY IN INTENT & TRANSFORMATION</p>
        <h1>
          Ordinary actions.
          <br />
          <em>A little wonder.</em>
        </h1>
        <p>
          Choose a direction. Reveal what matters.
          <br />
          Watch a thought take form.
        </p>
      </div>
      <div className="aar-magic-workspace">
        <section className="magic-intent" aria-labelledby="magic-intent-title">
          <p className="aar-magic-kicker">01 / DIRECT</p>
          <h2 id="magic-intent-title">Start with intent.</h2>
          <div className="aar-magic-dial">
            <svg viewBox="0 0 260 260" aria-hidden="true">
              <circle cx="130" cy="130" r="109" />
              <circle cx="130" cy="130" r="88" />
              <path d="M130 10v20M250 130h-20M130 250v-20M10 130h20" />
            </svg>
            <div
              className="aar-magic-needle aar-bind-transform"
              style={
                {
                  "--aar-transform": `rotate(${intent * 120}deg)`,
                } as React.CSSProperties
              }
              aria-hidden="true"
            >
              <span />
            </div>
            <div className="aar-magic-dial-core" aria-hidden="true">
              <Sparkles size={28} />
              <span>{current.mark}</span>
            </div>
            {intentions.map((item, i) => (
              <button
                key={item.name}
                className={`aar-magic-orbit aar-magic-orbit-${i}`}
                aria-pressed={intent === i}
                onClick={() => setIntent(i)}
              >
                <span>{item.mark}</span>
                {item.name}
              </button>
            ))}
          </div>
          <p className="aar-magic-caption">
            The compass follows your choice.
            <br />
            Every direction is also a keyboard-accessible button.
          </p>
        </section>
        <section
          className="aar-magic-stage"
          aria-labelledby="magic-stage-title"
        >
          <div className="aar-magic-stage-head">
            <span className="aar-magic-kicker">02 / REVEAL</span>
            <button
              className="aar-magic-tool-trigger"
              aria-expanded={tools}
              aria-controls="aar-magic-tools"
              onClick={() => setTools(!tools)}
            >
              <Layers size={16} /> {tools ? "Hide tools" : "Reveal tools"}
            </button>
          </div>
          <div className="aar-magic-artifact" data-texture={texture}>
            <div className="aar-magic-glyph" aria-hidden="true">
              <svg viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="74" />
                <path d="M100 16 173 142H27ZM100 184 27 58h146Z" />
                <circle cx="100" cy="100" r="28" />
                <path d="M100 2v24M198 100h-24M100 198v-24M2 100h24" />
              </svg>
            </div>
            <div key={intent} className="aar-magic-artifact-copy">
              <p className="aar-magic-kicker">
                {current.name.toUpperCase()} / AAR LOOM
              </p>
              <h2 id="magic-stage-title">{current.title}</h2>
              <p>{current.detail}</p>
            </div>
            <span className="aar-magic-artifact-corner" aria-hidden="true">
              ✦
            </span>
          </div>
          <div id="aar-magic-tools" className="aar-magic-tools" hidden={!tools}>
            <span>Surface treatment</span>
            <button aria-pressed={texture} onClick={() => setTexture(!texture)}>
              {texture ? <Check size={16} /> : <Layers size={16} />} Etched
              geometry
            </button>
          </div>
          <p className="aar-magic-caption">
            Tools unfold beside the work. Their state stays yours.
          </p>
        </section>
        <section
          className="aar-magic-resolve"
          aria-labelledby="magic-resolve-title"
        >
          <p className="aar-magic-kicker">03 / RESOLVE</p>
          <h2 id="magic-resolve-title">A visible transformation.</h2>
          <p>An action has a beginning, a passage, and a clear outcome.</p>
          <div className="aar-magic-seal" aria-hidden="true">
            <span />
            <span />
            <div>
              {phase === "ready" ? <Check size={32} /> : <Sparkles size={28} />}
            </div>
          </div>
          <div className="aar-magic-feedback" role="status">
            <strong>
              {phase === "idle"
                ? "Ready when you are"
                : phase === "working"
                  ? "Shaping the composition…"
                  : "Composition ready"}
            </strong>
            <p>
              {phase === "ready"
                ? "The transformation is complete."
                : phase === "working"
                  ? "Your action is in progress."
                  : "Try the interaction below."}
            </p>
          </div>
          <button
            className="aar-magic-primary"
            onClick={transform}
            disabled={phase !== "idle"}
          >
            {phase === "ready"
              ? "Complete"
              : phase === "working"
                ? "Transforming"
                : "Transform composition"}
            <ArrowUpRight size={18} />
          </button>
          <button className="aar-magic-reset" onClick={reset}>
            <RotateCcw size={14} /> Reset interaction
          </button>
          <p className="aar-magic-caption">
            A timed visual demo, with no upload or backend operation.
          </p>
        </section>
      </div>
      <footer className="aar-magic-foot">
        <span>DISCOVER → DIRECT → TRANSFORM</span>
        <p>Geometry carries identity. Motion carries meaning.</p>
        <span>EXPERIMENT 02</span>
      </footer>
    </div>
  );
}
