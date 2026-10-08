import { useEffect, useState, useSyncExternalStore } from "react";

import "@techaaroorian-ui/aar-loom/index.css";
import AarLoomDocs from "./AarLoomDocs";
import HeadlessGuide from "./HeadlessGuide";
import IconGuide from "./IconGuide";
import VersioningGuide from "./VersioningGuide";
import PhilosophyGuide from "./PhilosophyGuide";
import AarSelect from "./AarSelect";
import {
  Sun,
  Moon,
  Laptop,
  Sparkles,
  Building2,
  ArrowRight,
  LayoutGrid,
  Move,
  FolderArchive,
  Layers,
  UploadCloud,
} from "lucide-react";

import MagicArtGuide from "./MagicArtGuide";
import { initMagicSparkAutoListener } from "./magic-spark";

function subscribe(listener: () => void) {
  window.addEventListener("hashchange", listener);
  return () => window.removeEventListener("hashchange", listener);
}
const snapshot = () => window.location.hash || "#/";
const pages = [
  ["#/", "Overview"],
  ["#/aar-loom", "Aar Loom"],
  ["#/headless", "Headless"],
  ["#/guides/philosophy", "Philosophy"],
  ["#/guides/magic-art", "Magic Art"],
  ["#/guides/icons", "Icons"],
  ["#/guides/versioning", "Versioning"],
];

export default function App() {
  const route = useSyncExternalStore(subscribe, snapshot);
  const isContextualEmpty = route === "#/contextual-empty";
  const known = pages.some(([path]) => path === route) || isContextualEmpty;
  const title = isContextualEmpty
    ? "Contextual Empty · Headless"
    : pages.find(([path]) => path === route)?.[1] || "Page not found";

  const [theme, setTheme] = useState<"light" | "dark" | "system">(() => {
    const saved = localStorage.getItem("aar-docs-theme");
    if (saved === "light" || saved === "dark" || saved === "system")
      return saved;
    const legacyRealm = localStorage.getItem("aar-docs-realm");
    if (legacyRealm === "parchment") return "light";
    return "dark";
  });

  const [palette, setPalette] = useState<string>(() => {
    return localStorage.getItem("aar-docs-palette") === "custom"
      ? "custom"
      : "default";
  });

  const [magic, setMagic] = useState(false);
  const [density, setDensity] = useState("comfortable");
  const [primary, setPrimary] = useState("#65468b");
  const [onPrimary, setOnPrimary] = useState("#ffffff");
  const brandColors =
    palette === "custom"
      ? ({
          "--aar-primary": primary,
          "--aar-on-primary": onPrimary,
          "--aar-focus": primary,
        } as React.CSSProperties)
      : undefined;

  const handleThemeChange = (nextTheme: string) => {
    setTheme(nextTheme as "light" | "dark" | "system");
    localStorage.setItem("aar-docs-theme", nextTheme);
  };

  const handlePaletteChange = (nextPalette: string) => {
    setPalette(nextPalette);
    localStorage.setItem("aar-docs-palette", nextPalette);
  };

  useEffect(() => {
    document.title = `${title} · TechAaroorian UI · Universal Design System`;
    const cleanup = initMagicSparkAutoListener();
    return cleanup;
  }, [title]);

  return (
    <div
      className="aar-root aar-site"
      data-theme={theme}
      data-magic-art={magic || undefined}
      data-density={density}
      style={brandColors}
    >
      <a
        className="aar-button aar-skip-link"
        href="#docs-content"
        onClick={(event) => {
          event.preventDefault();
          const content = document.getElementById("docs-content");
          content?.focus();
          content?.scrollIntoView();
        }}
      >
        Skip to documentation
      </a>

      <header className="aar-site-header">
        <a className="aar-brand" href="#/">
          <span className="aar-brand-icon">
            <img
              src={`${import.meta.env.BASE_URL}brand/techaaroorian-ui.png`}
              alt=""
            />
          </span>
          <span>
            TechAaroorian <b>UI</b>
          </span>
        </a>

        <nav aria-label="Documentation packages">
          {pages.map(([path, label]) => (
            <a
              key={path}
              className="aar-button"
              data-variant="quiet"
              href={path}
              aria-current={route === path ? "page" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="aar-site-controls">
          <AarSelect
            label="Appearance"
            compact
            menuAlign="right"
            value={theme}
            onChange={handleThemeChange}
            options={[
              {
                value: "light",
                label: (
                  <>
                    <Sun size={13} /> Light
                  </>
                ),
                shortLabel: (
                  <>
                    <Sun size={13} /> Light
                  </>
                ),
              },
              {
                value: "dark",
                label: (
                  <>
                    <Moon size={13} /> Dark
                  </>
                ),
                shortLabel: (
                  <>
                    <Moon size={13} /> Dark
                  </>
                ),
              },
              {
                value: "system",
                label: (
                  <>
                    <Laptop size={13} /> System
                  </>
                ),
                shortLabel: (
                  <>
                    <Laptop size={13} /> System
                  </>
                ),
              },
            ]}
          />
          <AarSelect
            label="Accent"
            compact
            menuAlign="right"
            value={palette}
            onChange={handlePaletteChange}
            options={[
              { value: "default", label: "Default accent" },
              { value: "custom", label: "Custom colors" },
            ]}
          />
          <AarSelect
            label="Density"
            compact
            value={density}
            onChange={setDensity}
            options={[
              { value: "comfortable", label: "Comfortable" },
              { value: "compact", label: "Compact" },
            ]}
          />
          <button
            className="aar-button"
            aria-pressed={magic}
            onClick={() => setMagic(!magic)}
          >
            Magic Art
          </button>
          {palette === "custom" && (
            <>
              <label className="aar-field">
                Primary
                <input
                  className="aar-input aar-color-input"
                  type="color"
                  value={primary}
                  onChange={(e) => setPrimary(e.target.value)}
                />
              </label>
              <label className="aar-field">
                On primary
                <input
                  className="aar-input aar-color-input"
                  type="color"
                  value={onPrimary}
                  onChange={(e) => setOnPrimary(e.target.value)}
                />
              </label>
            </>
          )}
        </div>
      </header>

      <main id="docs-content" tabIndex={-1}>
        {route === "#/guides/philosophy" ? (
          <PhilosophyGuide />
        ) : route === "#/guides/magic-art" ? (
          <MagicArtGuide />
        ) : route === "#/headless" ? (
          <HeadlessGuide />
        ) : route === "#/guides/icons" ? (
          <IconGuide />
        ) : route === "#/guides/versioning" ? (
          <VersioningGuide />
        ) : route === "#/aar-loom" ? (
          <AarLoomDocs
            theme={theme}
            palette={palette}
            onThemeChange={handleThemeChange}
            onPaletteChange={handlePaletteChange}
          />
        ) : route === "#/contextual-empty" ? (
          <HeadlessGuide initialSection="contextual-empty" />
        ) : known ? (
          <section className="aar-container aar-landing">
            <div className="aar-intro">
              <div>
                <p className="aar-eyebrow">
                  Clean Design System · Optional Magic Art
                </p>
                <h1 className="aar-title">
                  A design language.
                  <br />
                  <span>Your building blocks.</span>
                </h1>
              </div>
              <div className="aar-intro-copy">
                <p>
                  TechAaroorian UI and Aar Loom provide a{" "}
                  <strong>proper, clean design and layout system</strong> for
                  all kinds of applications—from enterprise SaaS dashboards to
                  creative engineering tools. Magic-Art is an{" "}
                  <strong>optional, extendable layer</strong> of subtle
                  animations: button star sparks, fluid collapsible sidebars,
                  and cascading options.
                </p>
                <p className="aar-hint">
                  Pure CSS foundations, zero runtime dependencies, and
                  accessible ergonomics.
                </p>
              </div>
            </div>

            {/* Architecture Ribbon */}
            <div className="aar-card aar-cycle-ribbon aar-p-1-25rem-1-5rem aar-mb-8 aar-border-1px-solid-border-strong aar-bg-surface-raised aar-radius-radius-md">
              <div className="aar-cluster aar-justify-space-between aar-flex-wrap-wrap aar-gap-4">
                <div className="aar-cluster aar-gap-6 aar-flex-wrap-wrap">
                  <div className="aar-cluster aar-gap-2">
                    <span className="aar-ink-primary aar-display-inline-flex aar-items-center">
                      <Building2 size={16} />
                    </span>
                    <strong>1. Clean Design System</strong>
                    <span className="aar-hint">(Universal Foundation)</span>
                  </div>
                  <span className="aar-ink-border-strong aar-display-inline-flex aar-items-center">
                    <ArrowRight size={13} />
                  </span>
                  <div className="aar-cluster aar-gap-2">
                    <span className="aar-ink-primary aar-display-inline-flex aar-items-center">
                      <LayoutGrid size={16} />
                    </span>
                    <strong>2. Layout Primitives</strong>
                    <span className="aar-hint">
                      (Sidebars, Headers &amp; Grids)
                    </span>
                  </div>
                  <span className="aar-ink-border-strong aar-display-inline-flex aar-items-center">
                    <ArrowRight size={13} />
                  </span>
                  <div className="aar-cluster aar-gap-2">
                    <span className="aar-ink-primary aar-display-inline-flex aar-items-center">
                      <Sparkles size={16} />
                    </span>
                    <strong>3. Optional Magic-Art</strong>
                    <span className="aar-hint">(Subtle Animations)</span>
                  </div>
                </div>

                <div className="aar-cluster aar-gap-2">
                  <a
                    className="aar-button aar-text-0-875rem"
                    data-variant="quiet"
                    href="#/guides/philosophy"
                  >
                    Design Philosophy →
                  </a>
                  <a
                    className="aar-button aar-text-0-875rem aar-display-inline-flex aar-items-center aar-gap-2"
                    data-variant="primary"
                    href="#/guides/magic-art"
                  >
                    <Sparkles size={13} /> Magic Art Lab →
                  </a>
                </div>
              </div>
            </div>

            {/* Core Package Grid */}
            <div className="aar-card-grid">
              <article
                className="aar-panel aar-feature-card"
                data-corner-brackets="true"
              >
                <div className="aar-wordmark">
                  <img
                    src={`${import.meta.env.BASE_URL}brand/aar-loom.svg`}
                    alt="Aar Loom logo"
                  />
                </div>
                <p className="aar-eyebrow">Pure CSS Design Language</p>
                <h2 className="aar-heading">Aar Loom</h2>
                <p>
                  CSS-only layout, typography, surfaces, and state styling.
                  Use plain HTML or your own components. Choose Light, Dark,
                  or System and provide your own brand colors.
                </p>
                <code>@techaaroorian-ui/aar-loom</code>
                <a
                  className="aar-button"
                  data-variant="primary"
                  href="#/aar-loom"
                >
                  Explore Aar Loom →
                </a>
              </article>

              <article className="aar-panel aar-feature-card">
                <span
                  className="aar-empty-package-mark aar-display-inline-flex aar-items-center aar-justify-center"
                  aria-hidden="true"
                >
                  <FolderArchive size={26} />
                </span>
                <p className="aar-eyebrow">Headless Studio Component</p>
                <h2 className="aar-heading">Contextual Empty</h2>
                <p>
                  Explain first use, empty canvas stages, and recovery flows
                  with a clear next action instead of dead-end placeholders.
                </p>
                <code>@techaaroorian-ui/contextual-empty</code>
                <a className="aar-button" href="#/contextual-empty">
                  Explore Contextual Empty →
                </a>
              </article>

              <article className="aar-panel aar-feature-card">
                <span
                  className="aar-empty-package-mark aar-display-inline-flex aar-items-center aar-justify-center"
                  aria-hidden="true"
                >
                  <Move size={26} />
                </span>
                <p className="aar-eyebrow">Headless Studio Viewport Math</p>
                <h2 className="aar-heading">Pan &amp; Zoom</h2>
                <p>
                  Calculates auto-fit dimensions, boundary constraints, and zoom
                  stepping for creative canvas stages with zero framework bloat.
                </p>
                <code>@techaaroorian-ui/pan-zoom</code>
                <a className="aar-button" href="#/headless">
                  Explore Pan &amp; Zoom →
                </a>
              </article>

              <article className="aar-panel aar-feature-card">
                <span
                  className="aar-empty-package-mark aar-display-inline-flex aar-items-center aar-justify-center"
                  aria-hidden="true"
                >
                  <Layers size={26} />
                </span>
                <p className="aar-eyebrow">Deterministic Sequence Engine</p>
                <h2 className="aar-heading">Ordered Collection</h2>
                <p>
                  Deterministic state machine for multi-slide presentations,
                  canvas layers, and undoable timelines with zero UI lock-in.
                </p>
                <code>@techaaroorian-ui/ordered-collection</code>
                <a className="aar-button" href="#/headless">
                  Explore Ordered Collection →
                </a>
              </article>

              <article className="aar-panel aar-feature-card">
                <span
                  className="aar-empty-package-mark aar-display-inline-flex aar-items-center aar-justify-center"
                  aria-hidden="true"
                >
                  <UploadCloud size={26} />
                </span>
                <p className="aar-eyebrow">Atomic Batch Intake</p>
                <h2 className="aar-heading">File Intake</h2>
                <p>
                  Validates batches of images or creative assets atomically
                  before allocating object URLs or GPU memory.
                </p>
                <code>@techaaroorian-ui/file-intake</code>
                <a className="aar-button" href="#/headless">
                  Explore File Intake →
                </a>
              </article>
            </div>

            {/* Runes & Principles Note */}
            <section className="aar-prose aar-max-w-48rem">
              <h2 className="aar-heading">
                Built for High-Precision Creative Studios
              </h2>
              <p>
                Whether you need a full aesthetic shell with{" "}
                <strong>Aar Loom</strong>, actionable recovery states with{" "}
                <strong>Contextual Empty</strong>, infinite canvas positioning
                with <strong>Pan &amp; Zoom</strong>, or deterministic layer
                control with <strong>Ordered Collection</strong>, each engine is
                modular and production-ready.
              </p>
            </section>
          </section>
        ) : (
          <section className="aar-container aar-content">
            <h1 className="aar-title">Page not found</h1>
            <a className="aar-button" href="#/">
              Return to overview
            </a>
          </section>
        )}
      </main>

      <footer className="aar-site-footer">
        <span>TechAaroorian UI · The Arcane Atelier</span>
        <span>Precision software ergonomics &amp; headless studio tools</span>
      </footer>
    </div>
  );
}
