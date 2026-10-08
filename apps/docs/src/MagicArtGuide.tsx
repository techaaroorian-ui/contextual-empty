import { useState } from "react";
import {
  Sparkles,
  LayoutDashboard,
  Sliders,
  FolderKanban,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  X,
  Check,
  Layers,
  Palette,
  Maximize2,
  RefreshCw,
  Zap,
} from "lucide-react";
import AarSelect from "./AarSelect";
import { sparkMagicStars } from "./magic-spark";
import CodeBlock from "./CodeBlock";

export default function MagicArtGuide() {
  // Spark controls
  const [sparkCount, setSparkCount] = useState(8);
  const [sparkColor, setSparkColor] = useState("var(--aar-primary)");
  const [lastSparkMsg, setLastSparkMsg] = useState(
    "Click any button below to trigger subtle particle sparks",
  );

  // Sidebar controls
  const [sidebarMode, setSidebarMode] = useState<
    "expanded" | "rail" | "closed"
  >("expanded");
  const [activeTab, setActiveTab] = useState("dashboard");

  // Dropdown option controls
  const [selectedPreset, setSelectedPreset] = useState("aurora");

  // Modal & Sheet controls
  const [modalOpen, setModalOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [waveKey, setWaveKey] = useState(0);

  const triggerSpark = (
    e: React.MouseEvent<HTMLButtonElement>,
    customColor?: string,
  ) => {
    const color = customColor || sparkColor;
    sparkMagicStars(e, {
      count: sparkCount,
      color: color === "multi" ? undefined : color,
      colors:
        color === "multi"
          ? ["#a78bfa", "#34d399", "#f59e0b", "#ec4899", "#60a5fa"]
          : undefined,
    });
    setLastSparkMsg(
      `Triggered tactile micro-sparks with ${color === "multi" ? "multi-color spectrum" : color}!`,
    );
  };

  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    triggerSpark(e);
    setWaveKey((k) => k + 1);
    setModalOpen(true);
  };

  return (
    <section className="aar-container aar-content">
      {/* Eyebrow & Intro */}
      <div className="aar-section">
        <p className="aar-eyebrow">
          Aar Loom · Micro-interaction &amp; Wave Mechanics
        </p>
        <h1 className="aar-title">
          Magic-Art: Frosted Glass &amp; Perimeter Wave Reveal
        </h1>
        <p className="aar-subtitle aar-text-1-25rem aar-ink-text-muted aar-font-style-italic aar-m-0-5rem-0-1rem">
          &ldquo;Semi-transparent frosted glass on open. Radiating perimeter
          waves that expand and dissolve.&rdquo;
        </p>
        <p>
          In <strong>Aar Loom</strong>, standard applications maintain a clean,
          solid, distraction-free aesthetic. When you enable{" "}
          <strong>Magic-Art</strong>, reveals gain an ethereal dimension:
        </p>
        <ul className="aar-m-0-5rem-0-1rem-1-25rem aar-ink-text-muted aar-line-height-1-7">
          <li>
            <strong>Semi-transparent frosted glass surface</strong> (
            <code>backdrop-filter: blur(24px)</code>, 76% translucency).
          </li>
          <li>
            <strong>Perimeter Expanding Wave</strong>: The moment the modal
            opens, a luminous energy ripple{" "}
            <strong>originates directly from the modal's border</strong>,
            expands outward into the backdrop, and smoothly dissolves.
          </li>
          <li>
            <strong>Fluid frosted sidebar reveal</strong> with clean, contextual
            icons and border illumination.
          </li>
        </ul>
      </div>

      {/* Lab 1: Semi-Transparent Modal with Expanding Border Wave */}
      <div className="aar-section aar-mt-10">
        <h2 className="aar-heading">
          1. Modal Reveal: Frosted Glass &amp; Expanding Border Wave
        </h2>
        <p>
          Click below to open the modal. Notice how the semi-transparent frosted
          glass blooms into view, while an{" "}
          <strong>
            expanding ripple wave erupts directly from the border of the modal
          </strong>
          , travels outward, and dissolves.
        </p>

        <div className="aar-panel aar-mt-4 aar-border-1px-solid-border-strong aar-bg-surface-raised">
          <div className="aar-cluster aar-justify-space-between aar-mb-5">
            <div className="aar-cluster aar-gap-2">
              <Layers size={18} className="aar-ink-primary" />
              <h3 className="aar-m-0px aar-text-1-1rem">
                Interactive Modal Wave Specimen
              </h3>
            </div>
            <span className="aar-badge" data-tone="success">
              Perimeter Wave + 24px Glass
            </span>
          </div>

          <div className="aar-cluster aar-gap-4">
            <button
              type="button"
              className="aar-button"
              data-variant="primary"
              onClick={handleOpenModal}
            >
              <Maximize2 size={16} />
              <span>Open Modal (Border Wave Effect)</span>
            </button>
            <button
              type="button"
              className="aar-button"
              onClick={(e) => {
                triggerSpark(e);
                setSheetOpen(true);
              }}
            >
              <PanelLeftOpen size={16} />
              <span>Open Frosted Slide Sheet</span>
            </button>
          </div>
        </div>

        {/* Live Magic Art Modal with Expanding Border Wave */}
        {modalOpen && (
          <div
            data-magic-art="true"
            className="aar-position-fixed aar-inset-0px aar-z-index-1000 aar-display-flex aar-items-center aar-justify-center aar-p-4"
          >
            {/* Backdrop */}
            <div
              className="aar-position-absolute aar-inset-0px aar-bg-radial-gradient-circle-at-center-rgba-15-17-26-0-68-0-rgba-5-7-12-0-85-100 aar-backdrop-filter-blur-10px-saturate-130 aar--webkit-backdrop-filter-blur-10px-saturate-130"
              onClick={() => setModalOpen(false)}
            />

            {/* Modal Surface with Border Wave */}
            <div
              className="aar-dialog aar-position-relative aar-overflow-visible aar-z-index-1001 aar-w-min-32rem-100 aar-animation-aar-magic-modal-bloom-340ms-cubic-bezier-16-1-3-1-both"
              data-magic-art="true"
            >
              {/* Concentric wave rings that expand outward from the border and dissolve */}
              <div
                className="aar-modal-wave-ring"
                key={`w1-${waveKey}`}
                aria-hidden="true"
              />
              <div
                className="aar-modal-wave-ring-secondary"
                key={`w2-${waveKey}`}
                aria-hidden="true"
              />
              <div
                className="aar-modal-wave-ring-tertiary"
                key={`w3-${waveKey}`}
                aria-hidden="true"
              />

              <div className="aar-cluster aar-justify-space-between aar-mb-3">
                <div className="aar-cluster aar-gap-2">
                  <Layers size={18} className="aar-ink-primary" />
                  <h3 className="aar-m-0px aar-text-1-2rem">
                    Deployment Preferences
                  </h3>
                </div>
                <button
                  type="button"
                  className="aar-icon-button"
                  data-variant="quiet"
                  onClick={() => setModalOpen(false)}
                  aria-label="Close modal"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="aar-p-0-75rem-1rem aar-mb-4 aar-bg-color-mix-in-srgb-primary-12-transparent aar-radius-radius-sm aar-border-1px-solid-color-mix-in-srgb-primary-30-transparent">
                <div className="aar-cluster aar-gap-2 aar-mb-1">
                  <Zap size={15} className="aar-ink-primary" />
                  <strong className="aar-text-0-875rem">
                    Perimeter Border Waves Active
                  </strong>
                </div>
                <p className="aar-m-0px aar-ink-text-muted aar-text-0-875rem">
                  Luminous concentric waves originate directly from the border
                  of this modal, expand 50px&ndash;100px outward, and dissolve
                  into the backdrop.
                </p>
              </div>

              <div className="aar-stack aar-mb-6" data-gap="3">
                <label className="aar-field">
                  <span>Target Environment</span>
                  <input
                    className="aar-input"
                    defaultValue="production-us-east"
                  />
                </label>
                <label className="aar-field">
                  <span>Replication Level</span>
                  <select className="aar-input" defaultValue="high">
                    <option value="high">High Availability (3 Zones)</option>
                    <option value="single">Single Zone Studio</option>
                  </select>
                </label>
              </div>

              <div className="aar-cluster aar-justify-space-between">
                <button
                  type="button"
                  className="aar-button"
                  data-variant="primary"
                  onClick={() => setWaveKey((k) => k + 1)}
                  title="Re-trigger the border expanding wave"
                >
                  <RefreshCw size={14} />
                  <span>Pulse Wave Again ({waveKey + 1})</span>
                </button>

                <div className="aar-cluster aar-gap-3">
                  <button
                    type="button"
                    className="aar-button"
                    data-variant="quiet"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="aar-button"
                    data-variant="primary"
                    onClick={(e) => {
                      triggerSpark(e);
                      setModalOpen(false);
                    }}
                  >
                    <Check size={16} />
                    <span>Apply Changes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Live Magic Art End Sheet */}
        {sheetOpen && (
          <div
            data-magic-art="true"
            className="aar-position-fixed aar-inset-0px aar-z-index-1000 aar-display-flex aar-justify-flex-end"
          >
            {/* Backdrop */}
            <div
              className="aar-position-absolute aar-inset-0px aar-bg-rgba-0-0-0-0-65 aar-backdrop-filter-blur-8px aar--webkit-backdrop-filter-blur-8px"
              onClick={() => setSheetOpen(false)}
            />

            {/* Sheet Surface */}
            <div
              className="aar-dialog aar-position-relative aar-z-index-1001 aar-w-min-26rem-100 aar-h-100dvh aar-radius-0px aar-animation-aar-magic-sheet-slide-end-340ms-cubic-bezier-16-1-3-1-both"
              data-magic-art="true"
              data-placement="end"
            >
              <div className="aar-cluster aar-justify-space-between aar-mb-4">
                <div className="aar-cluster aar-gap-2">
                  <Sliders size={18} className="aar-ink-primary" />
                  <h3 className="aar-m-0px aar-text-1-1rem">
                    System Inspection
                  </h3>
                </div>
                <button
                  type="button"
                  className="aar-icon-button"
                  data-variant="quiet"
                  onClick={() => setSheetOpen(false)}
                >
                  <X size={16} />
                </button>
              </div>

              <p className="aar-text-0-875rem aar-ink-text-muted">
                Slide sheet renders as full-height frosted glass depth with a
                crisp luminous left edge.
              </p>

              <div className="aar-stack aar-mt-6" data-gap="3">
                <div className="aar-panel aar-bg-color-mix-in-srgb-surface-50-transparent">
                  <span className="aar-eyebrow">Glass Translucency</span>
                  <p className="aar-m-0-25rem-0-0 aar-weight-600">
                    76% Translucent Surface
                  </p>
                </div>
                <div className="aar-panel aar-bg-color-mix-in-srgb-surface-50-transparent">
                  <span className="aar-eyebrow">Blur Filter</span>
                  <p className="aar-m-0-25rem-0-0 aar-weight-600">
                    24px Backdrop Blur
                  </p>
                </div>
              </div>

              <div className="aar-mt-auto aar-pt-8">
                <button
                  type="button"
                  className="aar-button aar-w-100"
                  data-variant="primary"

                  onClick={(e) => {
                    triggerSpark(e);
                    setSheetOpen(false);
                  }}
                >
                  <Check size={16} />
                  <span>Done</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lab 2: Semi-Transparent Frosted Glass Sidebar Reveal */}
      <div className="aar-section aar-mt-12">
        <h2 className="aar-heading">
          2. Frosted Glass Sidebar with Border Wave
        </h2>
        <p>
          While opening, the sidebar slides out with a{" "}
          <strong>semi-transparent frosted glass surface</strong> (
          <code>backdrop-filter: blur(16px)</code>), revealing content beneath
          it and casting a glowing boundary beam.
        </p>

        <div
          className="aar-panel aar-mt-4 aar-p-0px aar-overflow-hidden aar-border-1px-solid-border-strong aar-radius-radius-lg aar-min-h-380px aar-display-flex aar-direction-column aar-bg-linear-gradient-135deg-background-0-color-mix-in-srgb-primary-14-background-100"
          data-magic-art="true"
        >
          {/* Header */}
          <div className="aar-workspace-header aar-p-0-625rem-1rem">
            <div className="aar-cluster aar-gap-3">
              <button
                type="button"
                className="aar-sidebar-toggle"
                onClick={() =>
                  setSidebarMode(
                    sidebarMode === "expanded"
                      ? "rail"
                      : sidebarMode === "rail"
                        ? "closed"
                        : "expanded",
                  )
                }
                aria-label="Toggle sidebar width"
                title="Toggle sidebar mode"
              >
                <span className="aar-sidebar-toggle-icon" aria-hidden="true">
                  {sidebarMode === "expanded" ? (
                    <PanelLeftClose size={16} />
                  ) : (
                    <PanelLeftOpen size={16} />
                  )}
                </span>
              </button>
              <span className="aar-weight-600 aar-text-0-9rem">
                Sidebar Mode:{" "}
                <code className="aar-ink-primary">{sidebarMode}</code>
              </span>
            </div>

            <div className="aar-cluster aar-gap-2">
              <button
                type="button"
                className="aar-button"
                data-variant={sidebarMode === "expanded" ? "primary" : "quiet"}
                onClick={() => setSidebarMode("expanded")}
              >
                Expanded (16rem)
              </button>
              <button
                type="button"
                className="aar-button"
                data-variant={sidebarMode === "rail" ? "primary" : "quiet"}
                onClick={() => setSidebarMode("rail")}
              >
                Rail (4.25rem)
              </button>
              <button
                type="button"
                className="aar-button"
                data-variant={sidebarMode === "closed" ? "primary" : "quiet"}
                onClick={() => setSidebarMode("closed")}
              >
                Closed (0rem)
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="aar-workspace-body aar-flex-1 aar-min-h-300px">
            <aside
              className="aar-sidebar aar-bind-width aar-bind-min-width"
              data-collapsed={
                sidebarMode === "rail"
                  ? "rail"
                  : sidebarMode === "closed"
                    ? "closed"
                    : "false"
              }
              style={
                {
                  "--aar-width":
                    sidebarMode === "expanded"
                      ? "14rem"
                      : sidebarMode === "rail"
                        ? "4.25rem"
                        : "0px",
                  "--aar-min-width":
                    sidebarMode === "expanded"
                      ? "14rem"
                      : sidebarMode === "rail"
                        ? "4.25rem"
                        : "0px",
                } as React.CSSProperties
              }
            >
              <div className="aar-sidebar-nav">
                {[
                  {
                    id: "dashboard",
                    icon: <LayoutDashboard size={17} />,
                    label: "Dashboard",
                  },
                  {
                    id: "workflows",
                    icon: <Sliders size={17} />,
                    label: "Workflows",
                  },
                  {
                    id: "projects",
                    icon: <FolderKanban size={17} />,
                    label: "Projects",
                  },
                  {
                    id: "settings",
                    icon: <Settings size={17} />,
                    label: "Settings",
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="aar-sidebar-item"
                    data-active={activeTab === item.id ? "true" : "false"}
                    onClick={(e) => {
                      setActiveTab(item.id);
                      triggerSpark(e);
                    }}
                  >
                    <span className="aar-sidebar-icon" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span className="aar-sidebar-label">{item.label}</span>
                  </button>
                ))}
              </div>

              <div className="aar-sidebar-footer">
                <span className="aar-hint aar-text-0-875rem aar-w-100 aar-text-align-center">
                  {sidebarMode === "expanded" ? (
                    "Frosted Translucent Rail"
                  ) : (
                    <Settings size={15} />
                  )}
                </span>
              </div>
            </aside>

            {/* Main view in demo */}
            <section className="aar-workspace-main aar-p-6 aar-bg-transparent">
              <div className="aar-p-5 aar-bg-surface aar-radius-radius-md aar-border-1px-solid-border">
                <h3 className="aar-m-0px">
                  Active Section: {activeTab.toUpperCase()}
                </h3>
                <p className="aar-hint aar-m-0-5rem-0">
                  Notice the rich{" "}
                  <strong>semi-transparent frosted glass backdrop</strong> of
                  the sidebar as it smoothly slides over the background canvas,
                  complete with luminous edge shimmer!
                </p>
                <button
                  type="button"
                  className="aar-button"
                  data-variant="primary"
                  onClick={(e) => triggerSpark(e)}
                >
                  <Sparkles size={16} />
                  <span>Click to Test Interaction</span>
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Lab 3: Tactile Button Sparks */}
      <div className="aar-section aar-mt-12">
        <h2 className="aar-heading">3. Tactile Button Click Feedback</h2>
        <p>
          On button clicks, subtle particle bursts radiate outward from the
          pointer origin, giving tactile confirmation.
        </p>

        <div className="aar-panel aar-mt-4 aar-border-1px-solid-border-strong aar-bg-surface-raised">
          <div className="aar-cluster aar-justify-space-between aar-mb-4">
            <span className="aar-badge" data-variant="primary">
              Configurable Sparks
            </span>
            <span className="aar-hint">{lastSparkMsg}</span>
          </div>

          <div className="aar-cluster aar-gap-5 aar-p-3 aar-bg-surface-subtle aar-radius-radius-sm aar-mb-5">
            <label className="aar-field aar-m-0px aar-min-w-120px">
              <span>
                Particle Count: <strong>{sparkCount}</strong>
              </span>
              <input
                type="range"
                className="aar-range"
                min={4}
                max={20}
                value={sparkCount}
                onChange={(e) => setSparkCount(Number(e.target.value))}
              />
            </label>

            <AarSelect
              compact
              label="Aura Tone"
              value={sparkColor}
              onChange={setSparkColor}
              options={[
                { value: "var(--aar-primary)", label: "Theme Primary" },
                { value: "#34d399", label: "Emerald Jade" },
                { value: "#f59e0b", label: "Radiant Amber" },
                { value: "#ec4899", label: "Rose Quartz" },
                { value: "multi", label: "Rainbow Spectrum" },
              ]}
            />
          </div>

          <div className="aar-cluster aar-gap-4">
            <button
              type="button"
              className="aar-button"
              data-variant="primary"
              onClick={(e) => triggerSpark(e)}
            >
              <Sparkles size={16} />
              <span>Primary Spark</span>
            </button>
            <button
              type="button"
              className="aar-button"
              onClick={(e) => triggerSpark(e)}
            >
              <span>Standard Action</span>
            </button>
            <button
              type="button"
              className="aar-button"
              data-variant="quiet"
              onClick={(e) => triggerSpark(e)}
            >
              <span>Quiet Utility</span>
            </button>
            <button
              type="button"
              className="aar-button"
              data-variant="danger"
              onClick={(e) => triggerSpark(e, "#f87171")}
            >
              <span>Destructive Spark</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lab 4: Option & Dropdown Cascading Animation */}
      <div className="aar-section aar-mt-12">
        <h2 className="aar-heading">4. Select feedback</h2>
        <p>
          Dropdown menus and custom selects emerge with a gentle upward drift,
          spring scale, and semi-transparent frosted glass menu. Options cascade
          in with staggered 20ms delays, and hover states project a soft
          luminous highlight.
        </p>

        <div
          className="aar-panel aar-magic-options aar-mt-4 aar-border-1px-solid-border-strong aar-bg-surface-raised"
          data-magic-art="true"
        >
          <div className="aar-cluster aar-justify-space-between aar-mb-5">
            <div className="aar-cluster aar-gap-2">
              <Palette size={18} className="aar-ink-primary" />
              <div>
                <h3 className="aar-m-0px aar-text-1-1rem">
                  Native select specimen
                </h3>
                <p className="aar-hint aar-m-0-25rem-0-0">
                  Open the dropdown below to experience the staggered arrival
                  with frosted glass menu depth.
                </p>
              </div>
            </div>
            <span className="aar-badge" data-tone="success">
              Selected: {selectedPreset}
            </span>
          </div>

          <div className="aar-max-w-280px">
            <AarSelect
              label="Cluster Preset"
              value={selectedPreset}
              onChange={setSelectedPreset}
              options={[
                { value: "aurora", label: "Aurora Borealis (Jade & Cyan)" },
                { value: "obsidian", label: "Obsidian Void (Deep Slate)" },
                { value: "parchment", label: "Ancient Parchment (Vellum)" },
                { value: "solaris", label: "Solaris Flare (Radiant Gold)" },
                { value: "nebula", label: "Cosmic Nebula (Violet Aura)" },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Code Snippets */}
      <div className="aar-section aar-mt-12">
        <h2 className="aar-heading">5. Implementation Reference</h2>
        <p>
          Magic Art surface and wave styling uses CSS. Particle effects
          additionally require an application event handler, as shown below:
        </p>
      </div>

      <CodeBlock
        title="HTML / CSS Data Attribute"
        language="html"
        code={`<!-- Opt in at the application root or component container -->
<div class="aar-root" data-magic-art="true">
  <!-- Modal with semi-transparent frosted glass & expanding border wave -->
  <dialog class="aar-dialog" open>
    <!-- Optional second concentric wave ring -->
    <span class="aar-dialog-wave" aria-hidden="true"></span>
    <h3>Settings</h3>
  </dialog>

  <!-- Collapsible sidebar with semi-transparent frosted glass reveal -->
  <aside class="aar-sidebar" data-collapsed="false">...</aside>
</div>`}
      />

      <CodeBlock
        title="Zero-dependency React / TS Helper"
        language="tsx"
        code={`import { sparkMagicStars } from '@techaaroorian-ui/aar-loom'

export function InteractiveButton() {
  return (
    <button
      className="aar-button"
      data-variant="primary"
      onClick={(e) => {
        sparkMagicStars(e, { count: 8, color: '#a78bfa' })
        handleSubmit()
      }}
    >
      Confirm Action
    </button>
  )
}`}
      />
    </section>
  );
}
