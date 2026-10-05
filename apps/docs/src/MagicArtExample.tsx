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
import "./MagicArtExample.css";

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
  const [theme, setTheme] = useState("night");
  const [accent, setAccent] = useState("violet");
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
      className="magic-art"
      data-tone={theme}
      data-accent={accent}
      data-phase={phase}
    >
      <header className="magic-mast">
        <span className="magic-sign" aria-hidden="true">
          ✧
        </span>
        <span>
          AAR CRAFT <small>INTERACTION ATELIER</small>
        </span>
        <div className="magic-theme">
          <button
            aria-label={
              theme === "night" ? "Use parchment theme" : "Use night theme"
            }
            onClick={() => setTheme(theme === "night" ? "parchment" : "night")}
          >
            {theme === "night" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <label>
            Accent
            <span className="magic-select">
              <span
                key={accent}
                className="magic-select-mark"
                aria-hidden="true"
              >
                ✦
              </span>
              <select
                aria-label="Magic accent"
                value={accent}
                onChange={(e) => setAccent(e.target.value)}
              >
                <option value="violet">Violet</option>
                <option value="jade">Jade</option>
              </select>
              <ChevronDown
                className="magic-select-chevron"
                size={16}
                aria-hidden="true"
              />
            </span>
          </label>
        </div>
      </header>
      <div className="magic-intro">
        <p className="magic-kicker">A STUDY IN INTENT & TRANSFORMATION</p>
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
      <div className="magic-workspace">
        <section className="magic-intent" aria-labelledby="magic-intent-title">
          <p className="magic-kicker">01 / DIRECT</p>
          <h2 id="magic-intent-title">Start with intent.</h2>
          <div className="magic-dial">
            <svg viewBox="0 0 260 260" aria-hidden="true">
              <circle cx="130" cy="130" r="109" />
              <circle cx="130" cy="130" r="88" />
              <path d="M130 10v20M250 130h-20M130 250v-20M10 130h20" />
            </svg>
            <div
              className="magic-needle"
              style={{ transform: `rotate(${intent * 120}deg)` }}
              aria-hidden="true"
            >
              <span />
            </div>
            <div className="magic-dial-core" aria-hidden="true">
              <Sparkles size={28} />
              <span>{current.mark}</span>
            </div>
            {intentions.map((item, i) => (
              <button
                key={item.name}
                className={`magic-orbit magic-orbit-${i}`}
                aria-pressed={intent === i}
                onClick={() => setIntent(i)}
              >
                <span>{item.mark}</span>
                {item.name}
              </button>
            ))}
          </div>
          <p className="magic-caption">
            The compass follows your choice.
            <br />
            Every direction is also a keyboard-accessible button.
          </p>
        </section>
        <section className="magic-stage" aria-labelledby="magic-stage-title">
          <div className="magic-stage-head">
            <span className="magic-kicker">02 / REVEAL</span>
            <button
              className="magic-tool-trigger"
              aria-expanded={tools}
              aria-controls="magic-tools"
              onClick={() => setTools(!tools)}
            >
              <Layers size={16} /> {tools ? "Hide tools" : "Reveal tools"}
            </button>
          </div>
          <div className="magic-artifact" data-texture={texture}>
            <div className="magic-glyph" aria-hidden="true">
              <svg viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="74" />
                <path d="M100 16 173 142H27ZM100 184 27 58h146Z" />
                <circle cx="100" cy="100" r="28" />
                <path d="M100 2v24M198 100h-24M100 198v-24M2 100h24" />
              </svg>
            </div>
            <div key={intent} className="magic-artifact-copy">
              <p className="magic-kicker">
                {current.name.toUpperCase()} / AAR CRAFT
              </p>
              <h2 id="magic-stage-title">{current.title}</h2>
              <p>{current.detail}</p>
            </div>
            <span className="magic-artifact-corner" aria-hidden="true">
              ✦
            </span>
          </div>
          <div id="magic-tools" className="magic-tools" hidden={!tools}>
            <span>Surface treatment</span>
            <button aria-pressed={texture} onClick={() => setTexture(!texture)}>
              {texture ? <Check size={16} /> : <Layers size={16} />} Etched
              geometry
            </button>
          </div>
          <p className="magic-caption">
            Tools unfold beside the work. Their state stays yours.
          </p>
        </section>
        <section
          className="magic-resolve"
          aria-labelledby="magic-resolve-title"
        >
          <p className="magic-kicker">03 / RESOLVE</p>
          <h2 id="magic-resolve-title">A visible transformation.</h2>
          <p>An action has a beginning, a passage, and a clear outcome.</p>
          <div className="magic-seal" aria-hidden="true">
            <span />
            <span />
            <div>
              {phase === "ready" ? <Check size={32} /> : <Sparkles size={28} />}
            </div>
          </div>
          <div className="magic-feedback" role="status">
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
            className="magic-primary"
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
          <button className="magic-reset" onClick={reset}>
            <RotateCcw size={14} /> Reset interaction
          </button>
          <p className="magic-caption">
            A timed visual demo, with no upload or backend operation.
          </p>
        </section>
      </div>
      <footer className="magic-foot">
        <span>DISCOVER → DIRECT → TRANSFORM</span>
        <p>Geometry carries identity. Motion carries meaning.</p>
        <span>EXPERIMENT 02</span>
      </footer>
    </div>
  );
}
