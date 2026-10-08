import loomPackage from "../../../packages/aar-loom/package.json";
import AarSelect from "./AarSelect";
import CodeBlock from "./CodeBlock";
import quickstartHtml from "./examples/aar-loom/index.html?raw";
import quickstartCss from "./examples/aar-loom/styles.css?raw";
import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import "@techaaroorian-ui/aar-loom/index.css";

import {
  Check,
  Search,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Settings,
  Sliders,
  Sparkles,
  Info,
  MoreHorizontal,
  Rocket,
  FileCode,
  Palette,
  Zap,
  FormInput,
  ChevronDown,
  Layout,
  Tag,
  MessageSquare,
  Ruler,
  ClipboardList,
  Layers,
  FlaskConical,
  BookOpen,
  Globe,
  Plus,
  Minus,
  RotateCcw,
  X,
  FileDown,
  FileImage,
  Copy,
  Trash2,
  TrendingUp,
  FileText,
  Clock,
} from "lucide-react";

const lessons = [
  [
    "The Arcane Atelier",
    "Tools as digital alchemy",
    "In creative engineering tools like Yuwbrndr, structured parameters deterministically transmute into visual artifacts. The workspace is your alchemy altar.",
  ],
  [
    "Theme roles",
    "Atmospheric presence",
    "Light and Dark have distinct surface and text hierarchies. System follows the browser preference. Brand accents are semantic overrides rather than extra theme modes.",
  ],
  [
    "Precision over ornament",
    "Etched geometry",
    "No faux-leather, bevels, or novelty clutter. Delicate 1px hairlines and corner brackets (┌ ┐ └ ┘) frame the workspace like an astrolabe or precision laboratory instrument.",
  ],
  [
    "Functional Runes",
    "Symbols with operational truth",
    "Runes communicate active runtime state, never random decoration: ✧ Idle potential, ✦ Active selection, ⟡ Live transmutation, ✓ Sealed artifact, ! Rift warning.",
  ],
  [
    "Luminous intent",
    "Atmospheric attention",
    "Hover lifts controls by 1px. Focus-visible projects a soft aura (--aar-glow) rather than a jarring default browser outline. Contrast remains WCAG AAA compliant.",
  ],
  [
    "Surface hierarchy",
    "Separate without decorating",
    "The background holds the atelier; panels group related instruments; the altar frames user artwork with zero style leakage.",
  ],
  [
    "Motion and rhythm",
    "Respond, then settle",
    "Spring feedback gives immediate tactile confirmation. Micro-rotation on dropdown chevrons, 35ms staggered arrival capped at 140ms, and complete instant accessibility for prefers-reduced-motion.",
  ],
];

function Workbench() {
  const [query, setQuery] = useState("");
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");
  const [projects, setProjects] = useState([
    { name: "Yuwbrndr Canvas Studio", kind: "Creative Studio", ready: true },
    { name: "Algorithmic Sketch Engine", kind: "Generative Art", ready: true },
    { name: "Design Tokens Grimoire", kind: "Design System", ready: false },
  ]);
  const visible = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) && (!ready || p.ready),
  );
  return (
    <div className="aar-workbench">
      <aside className="aar-workbench-sidebar">
        <p className="aar-eyebrow">Studio Atelier</p>
        <h3 className="aar-heading">Grimoire</h3>
        <div className="aar-sidebar-nav">
          <button
            className="aar-button"
            aria-pressed={!ready}
            onClick={() => setReady(false)}
          >
            All projects <span>{projects.length}</span>
          </button>
          <button
            className="aar-button aar-display-inline-flex aar-items-center aar-gap-2"
            aria-pressed={ready}
            onClick={() => setReady(true)}
          >
            <Check size={13} /> Sealed{" "}
            <span>{projects.filter((p) => p.ready).length}</span>
          </button>
        </div>
        <p className="aar-sidebar-note">
          Code is modern spellcasting.
          <br />
          The workspace is your alchemy bench.
        </p>
      </aside>
      <section className="aar-work-area">
        <div className="aar-section-head">
          <div>
            <p className="aar-eyebrow">Workspace / Atelier</p>
            <h2 className="aar-heading">Active Incantations</h2>
            <p className="aar-hint">
              Real composition testing the Arcane Atelier design language in
              context.
            </p>
          </div>
          <button
            className="aar-button aar-display-inline-flex aar-items-center aar-gap-2"
            data-variant="primary"
            onClick={() => {
              setProjects([
                ...projects,
                {
                  name: `Untitled incantation ${projects.length + 1}`,
                  kind: "New creation",
                  ready: false,
                },
              ]);
              setNotice("Incantation created.");
              setReady(false);
              setQuery("");
            }}
          >
            <Plus size={14} /> New project
          </button>
        </div>
        <div className="aar-metrics">
          {[
            ["Active Projects", String(projects.length).padStart(2, "0")],
            [
              "Sealed Artifacts",
              String(projects.filter((p) => p.ready).length).padStart(2, "0"),
            ],
            ["Philosophy", "Arcane Atelier"],
          ].map(([label, value]) => (
            <div className="aar-panel" key={label}>
              <p className="aar-eyebrow">{label}</p>
              <p className="aar-metric-value">{value}</p>
            </div>
          ))}
        </div>
        <label className="aar-field">
          Find a project
          <input
            className="aar-input"
            type="search"
            placeholder="Search your projects…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <div className="aar-item-list aar-stagger">
          {visible.map((p, index) => (
            <article
              className="aar-item-row aar-enter"
              style={{ "--aar-order": index } as CSSProperties}
              key={p.name}
              tabIndex={0}
              role="button"
              aria-label={`${p.name}, ${p.kind}, ${p.ready ? "Sealed" : "Transmuting"}`}
              onClick={() => setNotice(`Selected "${p.name}".`)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setNotice(`Selected "${p.name}".`);
                }
              }}
            >
              <span
                className="aar-item-mark aar-display-inline-flex aar-items-center aar-justify-center"
                aria-hidden="true"
              >
                {p.ready ? (
                  <Sparkles size={14} />
                ) : (
                  <Sparkles size={14} className="aar-opacity-0-35" />
                )}
              </span>
              <div>
                <h3>{p.name}</h3>
                <p className="aar-hint">{p.kind}</p>
              </div>
              <span
                className="aar-badge aar-display-inline-flex aar-items-center aar-gap-2"
                data-tone={p.ready ? "success" : undefined}
              >
                {p.ready ? <Check size={12} /> : <Sparkles size={12} />}
                {p.ready ? "Sealed" : "Transmuting"}
              </span>
            </article>
          ))}
        </div>
        {!visible.length && (
          <div className="aar-empty aar-enter">
            <h3 className="aar-heading">No matching projects</h3>
            <p className="aar-hint">
              Try a different name or clear your filters.
            </p>
            <button
              className="aar-button"
              onClick={() => {
                setQuery("");
                setReady(false);
              }}
            >
              Clear filters
            </button>
          </div>
        )}
        <p className="aar-hint aar-notice" role="status">
          {notice || "Your ideas, organized. All demo changes are temporary."}
        </p>
      </section>
    </div>
  );
}

function SizeScaleSpecimen() {
  const [size, setSize] = useState<"xs" | "sm" | "md" | "lg" | "xl">("md");
  const sizes: Array<"xs" | "sm" | "md" | "lg" | "xl"> = [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
  ];
  const sizeLabels = {
    xs: "Extra Small (28px)",
    sm: "Small (36px)",
    md: "Medium · Default (44px)",
    lg: "Large (52px)",
    xl: "Extra Large (60px)",
  };

  return (
    <section className="aar-panel aar-specimen aar-wide">
      <div className="aar-cluster aar-justify-space-between aar-items-flex-start aar-flex-wrap-wrap aar-gap-4">
        <div>
          <p className="aar-eyebrow">08 / Universal Size Scale</p>
          <h2 className="aar-heading">Proportion Across Every Instrument</h2>
          <p className="aar-hint">
            Standardized 5-tier size scale (<code>xs</code>, <code>sm</code>,{" "}
            <code>md</code>, <code>lg</code>, <code>xl</code>) applicable to
            buttons, icon controls, text inputs, selects, badges, and modals.
          </p>
        </div>
        <div className="aar-segmented" role="tablist">
          {sizes.map((s) => (
            <button
              key={s}
              type="button"
              role="tab"
              aria-selected={size === s}
              onClick={() => setSize(s)}
            >
              {s.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="aar-mt-6 aar-p-5 aar-bg-surface-subtle aar-radius-radius-md aar-border-1px-solid-border">
        <p className="aar-eyebrow aar-mb-4">
          Live Dynamic Specimen · Active Size:{" "}
          <strong>data-size=&quot;{size}&quot;</strong> ({sizeLabels[size]})
        </p>
        <div className="aar-cluster aar-gap-4 aar-items-center aar-flex-wrap-wrap">
          <button
            type="button"
            className="aar-button"
            data-variant="primary"
            data-size={size}
          >
            <Sparkles
              size={
                size === "xs"
                  ? 12
                  : size === "sm"
                    ? 14
                    : size === "lg"
                      ? 18
                      : size === "xl"
                        ? 20
                        : 16
              }
            />
            <span>Primary Button</span>
          </button>
          <button type="button" className="aar-button" data-size={size}>
            Secondary
          </button>
          <button
            type="button"
            className="aar-icon-button"
            data-size={size}
            title="Settings"
            aria-label="Settings"
          >
            <Settings
              size={
                size === "xs"
                  ? 12
                  : size === "sm"
                    ? 14
                    : size === "lg"
                      ? 18
                      : size === "xl"
                        ? 20
                        : 16
              }
            />
          </button>
          <span className="aar-badge" data-tone="success" data-size={size}>
            <Check size={size === "xs" ? 10 : 12} />
            <span>Badge</span>
          </span>
          <label
            className="aar-switch"
            data-size={size === "xl" ? "lg" : size === "xs" ? "sm" : size}
          >
            <input type="checkbox" defaultChecked />
            <span className="aar-switch-track">
              <span className="aar-switch-thumb" />
            </span>
            <span className="aar-text-0-875rem">Switch</span>
          </label>
        </div>

        <div
          className="aar-grid aar-mt-5 aar-gap-4"
          style={{ "--aar-grid-min": "14rem" } as React.CSSProperties}
        >
          <label className="aar-field" data-size={size}>
            <span className="aar-field-label">
              Field with data-size=&quot;{size}&quot;
            </span>
            <input
              className="aar-input"
              data-size={size}
              defaultValue="Interactive size scaling"
            />
          </label>
          <label className="aar-field" data-size={size}>
            <span className="aar-field-label">
              Select with data-size=&quot;{size}&quot;
            </span>
            <select
              className="aar-input"
              data-size={size}
              defaultValue="option1"
            >
              <option value="option1">High Throughput Node</option>
              <option value="option2">Edge Replicated</option>
            </select>
          </label>
        </div>
      </div>

      <div className="aar-mt-8">
        <p className="aar-eyebrow aar-mb-3">
          All Sizes Side-by-Side Comparison
        </p>
        <div className="aar-stack" data-gap="3">
          {sizes.map((s) => (
            <div
              key={s}
              className="aar-cluster aar-justify-space-between aar-p-0-625rem-1rem aar-bind-background aar-bind-border aar-radius-radius-sm aar-items-center aar-flex-wrap-wrap aar-gap-3"
              style={
                {
                  "--aar-background":
                    size === s
                      ? "color-mix(in srgb, var(--aar-primary) 8%, var(--aar-surface))"
                      : "var(--aar-surface)",
                  "--aar-border": `1px solid ${size === s ? "var(--aar-primary)" : "var(--aar-border)"}`,
                } as React.CSSProperties
              }
            >
              <div className="aar-cluster aar-gap-3 aar-min-w-8rem">
                <span className="aar-badge" data-size="xs">
                  {s.toUpperCase()}
                </span>
                <span className="aar-hint">{sizeLabels[s]}</span>
              </div>
              <div className="aar-cluster aar-gap-2 aar-items-center">
                <button
                  type="button"
                  className="aar-button"
                  data-variant="primary"
                  data-size={s}
                >
                  Deploy
                </button>
                <button type="button" className="aar-button" data-size={s}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="aar-icon-button"
                  data-size={s}
                  aria-label="Configure"
                >
                  <Sliders
                    size={
                      s === "xs"
                        ? 12
                        : s === "sm"
                          ? 14
                          : s === "lg"
                            ? 18
                            : s === "xl"
                              ? 20
                              : 16
                    }
                  />
                </button>
                <input
                  className="aar-input aar-w-130px"
                  data-size={s}
                  defaultValue={`data-size="${s}"`}
                  readOnly
                />
                <span className="aar-badge" data-size={s}>
                  Tag
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FormVariantsSpecimen() {
  const [variant, setVariant] = useState<
    "outline" | "filled" | "flushed" | "ghost"
  >("outline");
  const [layout, setLayout] = useState<"vertical" | "horizontal" | "floating">(
    "vertical",
  );
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [switchState, setSwitchState] = useState(true);
  const [checkState, setCheckState] = useState(true);

  return (
    <section className="aar-panel aar-specimen aar-wide">
      <div className="aar-cluster aar-justify-space-between aar-items-flex-start aar-flex-wrap-wrap aar-gap-4">
        <div>
          <p className="aar-eyebrow">
            09 / Form Variants &amp; Layout Instruments
          </p>
          <h2 className="aar-heading">
            Style, Structure &amp; Selection Controls
          </h2>
          <p className="aar-hint">
            Modular form architecture: 4 visual input styles (
            <code>outline</code>, <code>filled</code>, <code>flushed</code>,{" "}
            <code>ghost</code>), layout engines, input groups, validation tones,
            and accessible selection primitives.
          </p>
        </div>
      </div>

      {/* Part 1: Visual Input Variants */}
      <div className="aar-mt-6">
        <div className="aar-cluster aar-justify-space-between aar-mb-3 aar-items-center">
          <p className="aar-eyebrow">1. Visual Input Variants (data-variant)</p>
          <div className="aar-segmented" role="tablist">
            {(["outline", "filled", "flushed", "ghost"] as const).map((v) => (
              <button
                key={v}
                type="button"
                role="tab"
                aria-selected={variant === v}
                onClick={() => setVariant(v)}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div
          className="aar-grid aar-gap-4"
          style={{ "--aar-grid-min": "15rem" } as React.CSSProperties}
        >
          <label className="aar-field">
            <span className="aar-field-label">
              <span>Text Field</span>
              <span className="aar-hint aar-text-0-875rem">
                (data-variant=&quot;{variant}&quot;)
              </span>
            </span>
            <input
              className="aar-input"
              data-variant={variant}
              placeholder={`Enter text in ${variant} style...`}
              defaultValue={
                variant === "outline"
                  ? "Standard Border"
                  : variant === "filled"
                    ? "Subtle Surface Fill"
                    : variant === "flushed"
                      ? "Clean Underline Only"
                      : "Frameless Ghost"
              }
            />
          </label>

          <label className="aar-field">
            <span className="aar-field-label">
              <span>Native Select</span>
              <span className="aar-hint aar-text-0-875rem">
                (data-variant=&quot;{variant}&quot;)
              </span>
            </span>
            <select
              className="aar-input"
              data-variant={variant}
              defaultValue="us-east"
            >
              <option value="us-east">US East (N. Virginia)</option>
              <option value="eu-west">EU West (Frankfurt)</option>
              <option value="ap-south">AP South (Mumbai)</option>
            </select>
          </label>

          <label className="aar-field">
            <span className="aar-field-label">
              <span>Textarea</span>
              <span className="aar-hint aar-text-0-875rem">
                (data-variant=&quot;{variant}&quot;)
              </span>
            </span>
            <textarea
              className="aar-textarea"
              data-variant={variant}
              rows={2}
              placeholder="Multi-line input..."
              defaultValue="Configured manifest description"
            />
          </label>
        </div>
      </div>

      {/* Part 2: Form Layouts */}
      <div className="aar-mt-10">
        <div className="aar-cluster aar-justify-space-between aar-mb-3 aar-items-center">
          <p className="aar-eyebrow">2. Form Layouts (data-layout)</p>
          <div className="aar-segmented" role="tablist">
            {(["vertical", "horizontal", "floating"] as const).map((l) => (
              <button
                key={l}
                type="button"
                role="tab"
                aria-selected={layout === l}
                onClick={() => setLayout(l)}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="aar-p-5 aar-bg-surface aar-border-1px-solid-border aar-radius-radius-md">
          {layout === "floating" ? (
            <div className="aar-stack" data-gap="3">
              <div className="aar-field-floating">
                <input
                  className="aar-input"
                  id="fl-user"
                  placeholder=" "
                  defaultValue="janarthanan"
                />
                <label htmlFor="fl-user">Workspace Username</label>
              </div>
              <div className="aar-field-floating">
                <input
                  className="aar-input"
                  id="fl-email"
                  type="email"
                  placeholder=" "
                  defaultValue="dev@techaaroorian.com"
                />
                <label htmlFor="fl-email">Primary Email Address</label>
              </div>
            </div>
          ) : (
            <div className="aar-stack" data-gap="3">
              <label
                className="aar-field"
                data-layout={layout === "horizontal" ? "horizontal" : undefined}
              >
                <span className="aar-field-label">
                  <span>Organization Name</span>
                  <span className="aar-required">*</span>
                </span>
                <div>
                  <input
                    className="aar-input"
                    defaultValue="TechAaroorian Studios"
                  />
                  <span className="aar-field-hint">
                    Public handle used for repository namespaces.
                  </span>
                </div>
              </label>

              <label
                className="aar-field"
                data-layout={layout === "horizontal" ? "horizontal" : undefined}
              >
                <span className="aar-field-label">
                  <span>Routing Domain</span>
                </span>
                <div>
                  <div className="aar-input-group">
                    <span className="aar-input-addon">https://</span>
                    <input className="aar-input" defaultValue="craft" />
                    <span className="aar-input-addon">.aar.design</span>
                  </div>
                  <span className="aar-field-hint">
                    Automatic SSL edge termination enabled.
                  </span>
                </div>
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Part 3: Input Groups & Adornments */}
      <div className="aar-mt-10">
        <p className="aar-eyebrow aar-mb-3">
          3. Input Groups, Prefixes, Suffixes &amp; Addons
        </p>
        <div
          className="aar-grid aar-gap-4"
          style={{ "--aar-grid-min": "15rem" } as React.CSSProperties}
        >
          <label className="aar-field">
            <span className="aar-field-label">Prefix Search Icon</span>
            <div className="aar-input-group">
              <span className="aar-input-prefix">
                <Search size={15} />
              </span>
              <input
                className="aar-input"
                placeholder="Search components, tokens, guides..."
              />
            </div>
          </label>

          <label className="aar-field">
            <span className="aar-field-label">Suffix Password Action</span>
            <div className="aar-input-group">
              <input
                className="aar-input"
                type={showPassword ? "text" : "password"}
                defaultValue="secret-passphrase-2026"
              />
              <span className="aar-input-suffix">
                <button
                  type="button"
                  className="aar-icon-button"
                  data-variant="quiet"
                  data-size="xs"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </span>
            </div>
          </label>

          <label className="aar-field">
            <span className="aar-field-label">Addon Button Segment</span>
            <div className="aar-input-group">
              <input
                className="aar-input"
                placeholder="Enter coupon or token..."
                defaultValue="DEV-PREVIEW-2026"
              />
              <button
                type="button"
                className="aar-button aar-border-start-start-radius-0px aar-border-end-start-radius-0px aar-border-left-none"
                data-variant="primary"
              >
                Apply
              </button>
            </div>
          </label>
        </div>
      </div>

      {/* Part 4: Form Validation & Status States (Anti-CLS & Subgrid Alignment) */}
      <div className="aar-mt-10">
        <div className="aar-cluster aar-justify-space-between aar-mb-3 aar-items-center">
          <div>
            <p className="aar-eyebrow">
              4. Validation Feedback States &amp; Anti-CLS Alignment
            </p>
            <p className="aar-hint aar-m-0px">
              Use <code>.aar-form-row</code> (CSS Subgrid) and{" "}
              <code>.aar-field-feedback</code> to prevent Cumulative Layout
              Shift (CLS) when feedback toggles.
            </p>
          </div>
          <span className="aar-badge" data-tone="success">
            Subgrid Aligned · 0px CLS
          </span>
        </div>

        <div className="aar-form-row aar-gap-0-1rem">
          <label className="aar-field" data-tone="danger">
            <span className="aar-field-label">
              <span>Database Host (Invalid)</span>
              <span className="aar-required">*</span>
            </span>
            <input
              className="aar-input"
              data-tone="danger"
              defaultValue="db.invalid-port:9999"
              aria-invalid="true"
            />
            <div className="aar-field-feedback" data-reserve="2">
              <span className="aar-field-error">
                <AlertCircle size={14} />
                <span>Connection refused: Host unreachable.</span>
              </span>
            </div>
          </label>

          <label className="aar-field" data-tone="success">
            <span className="aar-field-label">API Key (Verified)</span>
            <input
              className="aar-input"
              data-tone="success"
              defaultValue="aar_live_99f381ad792"
            />
            <div className="aar-field-feedback" data-reserve="2">
              <span className="aar-field-success">
                <CheckCircle2 size={14} />
                <span>Key authorized with root administrative scopes.</span>
              </span>
            </div>
          </label>

          <label className="aar-field" data-tone="warning">
            <span className="aar-field-label">Disk Allocation (Warning)</span>
            <input
              className="aar-input"
              data-tone="warning"
              defaultValue="94% (470 GB / 500 GB)"
            />
            <div className="aar-field-feedback" data-reserve="2">
              <span className="aar-field-hint aar-ink-warning">
                <AlertTriangle size={14} />
                <span>Storage volume exceeds recommended 85% headroom.</span>
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* Part 5: Selection Controls */}
      <div className="aar-mt-10">
        <p className="aar-eyebrow aar-mb-3">
          5. Selection Controls: Checkboxes, Radios, Switches &amp; Choice Cards
        </p>
        <div
          className="aar-grid aar-gap-5"
          style={{ "--aar-grid-min": "16rem" } as React.CSSProperties}
        >
          <div className="aar-panel">
            <p className="aar-eyebrow aar-mb-3">Checkboxes &amp; Radios</p>
            <div className="aar-stack" data-gap="3">
              <label className="aar-checkbox">
                <input
                  type="checkbox"
                  checked={checkState}
                  onChange={(e) => setCheckState(e.target.checked)}
                />
                <span className="aar-checkbox-box" />
                <span>Enable Automated Backups</span>
              </label>
              <label className="aar-checkbox">
                <input type="checkbox" defaultChecked={false} />
                <span className="aar-checkbox-box" />
                <span>Enable Dark Launch Canary</span>
              </label>
              <div className="aar-border-top-1px-solid-border aar-m-0-25rem-0" />
              <label className="aar-radio">
                <input type="radio" name="node_env" defaultChecked />
                <span className="aar-radio-circle" />
                <span>Edge Serverless Runtime</span>
              </label>
              <label className="aar-radio">
                <input type="radio" name="node_env" />
                <span className="aar-radio-circle" />
                <span>Dedicated Container Cluster</span>
              </label>
            </div>
          </div>

          <div className="aar-panel">
            <p className="aar-eyebrow aar-mb-3">
              Accessible Toggle Switches (.aar-switch)
            </p>
            <div className="aar-stack" data-gap="3">
              <label className="aar-switch" data-size="sm">
                <input type="checkbox" defaultChecked />
                <span className="aar-switch-track">
                  <span className="aar-switch-thumb" />
                </span>
                <span>Small Switch (data-size=&quot;sm&quot;)</span>
              </label>
              <label className="aar-switch" data-size="md">
                <input
                  type="checkbox"
                  checked={switchState}
                  onChange={(e) => setSwitchState(e.target.checked)}
                />
                <span className="aar-switch-track">
                  <span className="aar-switch-thumb" />
                </span>
                <span>Medium Switch (Default)</span>
              </label>
              <label className="aar-switch" data-size="lg">
                <input type="checkbox" defaultChecked />
                <span className="aar-switch-track">
                  <span className="aar-switch-thumb" />
                </span>
                <span>Large Switch (data-size=&quot;lg&quot;)</span>
              </label>
            </div>
          </div>

          <div className="aar-panel aar-grid-column-1-1">
            <p className="aar-eyebrow aar-mb-3">
              Interactive Choice Cards (.aar-choice-card)
            </p>
            <div
              className="aar-grid aar-gap-3"
              style={{ "--aar-grid-min": "14rem" } as React.CSSProperties}
            >
              {[
                {
                  id: "starter",
                  title: "Developer Studio",
                  desc: "1 Node · 4 GB RAM · 10 GB Storage",
                  tag: "Free",
                  price: "$0 / mo",
                },
                {
                  id: "pro",
                  title: "Team Atelier",
                  desc: "4 Nodes · 16 GB RAM · Edge CDN Cache",
                  tag: "Recommended",
                  price: "$29 / mo",
                },
                {
                  id: "enterprise",
                  title: "Global Enterprise",
                  desc: "Dedicated Cluster · Custom SLA · 99.99%",
                  tag: "High Scale",
                  price: "$199 / mo",
                },
              ].map((c) => (
                <div
                  key={c.id}
                  className="aar-choice-card"
                  data-selected={selectedPlan === c.id}
                  onClick={() => setSelectedPlan(c.id)}
                >
                  <div className="aar-cluster aar-justify-space-between aar-mb-0-35rem">
                    <span
                      className="aar-badge"
                      data-tone={c.id === "pro" ? "success" : undefined}
                      data-size="xs"
                    >
                      {c.tag}
                    </span>
                    <strong className="aar-text-1rem aar-ink-primary">
                      {c.price}
                    </strong>
                  </div>
                  <h4 className="aar-m-0-25rem-0 aar-text-1-05rem">
                    {c.title}
                  </h4>
                  <p className="aar-hint aar-m-0px">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PureHtmlUiSuiteSpecimen() {
  const [striped, setStriped] = useState(true);
  const [hover, setHover] = useState(true);
  const [bordered, setBordered] = useState(false);
  const [tableDensity, setTableDensity] = useState<"sm" | "md" | "lg">("md");
  const [selectedArtifacts, setSelectedArtifacts] = useState<string[]>([
    "art-1",
    "art-3",
  ]);
  const [activeTab, setActiveTab] = useState("overview");
  const [tabVariant, setTabVariant] = useState<"underline" | "pills">(
    "underline",
  );
  const [page, setPage] = useState(2);

  interface ArtifactRow {
    id: string;
    name: string;
    realm: string;
    status: string;
    tone: "success" | "info" | "warning" | "danger";
    res: string;
    latency: string;
  }

  const artifacts: ArtifactRow[] = [
    {
      id: "art-1",
      name: "Yuwbrndr Canvas Atelier",
      realm: "Dark",
      status: "Sealed",
      tone: "success",
      res: "1200×627",
      latency: "14ms",
    },
    {
      id: "art-2",
      name: "Algorithmic Sketch Graph",
      realm: "Jade",
      status: "Transmuting",
      tone: "info",
      res: "1080×1080",
      latency: "28ms",
    },
    {
      id: "art-3",
      name: "Grimoire Design System",
      realm: "Light",
      status: "Review Needed",
      tone: "warning",
      res: "Vector SVG",
      latency: "4ms",
    },
    {
      id: "art-4",
      name: "Spectral Shimmer Shader",
      realm: "Custom",
      status: "Deprecated",
      tone: "danger",
      res: "WebGL 2.0",
      latency: "62ms",
    },
  ];

  const toggleSelect = (id: string) => {
    setSelectedArtifacts((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selectedArtifacts.length === artifacts.length) {
      setSelectedArtifacts([]);
    } else {
      setSelectedArtifacts(artifacts.map((a) => a.id));
    }
  };

  return (
    <section className="aar-panel aar-specimen aar-wide aar-mt-10">
      <div>
        <p className="aar-eyebrow">Pure HTML &amp; CSS Component Suite</p>
        <h2 className="aar-heading">
          Full UI Coverage with Zero JavaScript Dependencies
        </h2>
        <p className="aar-hint">
          Every component below is built exclusively using semantic HTML5
          elements (<code>&lt;table&gt;</code>, <code>&lt;details&gt;</code>,{" "}
          <code>&lt;summary&gt;</code>, <code>&lt;progress&gt;</code>,{" "}
          <code>&lt;nav&gt;</code>) and <code>aar-loom</code> CSS classes. No
          React components, zero bundle overhead, universal portability.
        </p>
      </div>

      {/* 1. Pure HTML Data Table */}
      <div className="aar-mt-8">
        <div className="aar-cluster aar-justify-space-between aar-items-center aar-mb-4 aar-flex-wrap-wrap aar-gap-3">
          <div>
            <h3 className="aar-heading aar-text-1-125rem">
              1. Data Tables &amp; Data Grids (table.aar-table)
            </h3>
            <p className="aar-hint aar-m-0px">
              Built-in zebra striping, row hover, column alignment, sticky
              header, and row selection.
            </p>
          </div>
          <div className="aar-cluster aar-gap-2 aar-flex-wrap-wrap">
            <label className="aar-toggle aar-text-0-875rem">
              <input
                type="checkbox"
                checked={striped}
                onChange={(e) => setStriped(e.target.checked)}
              />
              <span>Striped</span>
            </label>
            <label className="aar-toggle aar-text-0-875rem">
              <input
                type="checkbox"
                checked={hover}
                onChange={(e) => setHover(e.target.checked)}
              />
              <span>Hover</span>
            </label>
            <label className="aar-toggle aar-text-0-875rem">
              <input
                type="checkbox"
                checked={bordered}
                onChange={(e) => setBordered(e.target.checked)}
              />
              <span>Bordered</span>
            </label>
            <div className="aar-segmented" role="tablist">
              {(["sm", "md", "lg"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-selected={tableDensity === s}
                  onClick={() => setTableDensity(s)}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="aar-table-container">
          <table
            className="aar-table"
            data-striped={striped ? "true" : undefined}
            data-hover={hover ? "true" : undefined}
            data-bordered={bordered ? "true" : undefined}
            data-size={tableDensity}
          >
            <thead>
              <tr>
                <th className="aar-w-40px aar-text-align-center">
                  <input
                    type="checkbox"
                    className="aar-checkbox"
                    checked={selectedArtifacts.length === artifacts.length}
                    onChange={toggleSelectAll}
                    aria-label="Select all rows"
                  />
                </th>
                <th>Artifact Name</th>
                <th>Realm</th>
                <th>Status</th>
                <th>Resolution</th>
                <th data-align="end">Compute Latency</th>
                <th className="aar-text-align-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {artifacts.map((art) => {
                const isSelected = selectedArtifacts.includes(art.id);
                return (
                  <tr key={art.id} aria-selected={isSelected}>
                    <td className="aar-text-align-center">
                      <input
                        type="checkbox"
                        className="aar-checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(art.id)}
                        aria-label={`Select ${art.name}`}
                      />
                    </td>
                    <td>
                      <div className="aar-weight-600">{art.name}</div>
                      <div className="aar-hint aar-text-0-875rem">
                        ID: {art.id}
                      </div>
                    </td>
                    <td>
                      <span className="aar-badge" data-size="xs">
                        {art.realm}
                      </span>
                    </td>
                    <td>
                      <span
                        className="aar-badge aar-display-inline-flex aar-items-center aar-gap-1"
                        data-tone={art.tone}
                        data-size="xs"
                      >
                        {art.tone === "success" ? (
                          <Check size={11} />
                        ) : art.tone === "warning" ? (
                          <AlertTriangle size={11} />
                        ) : (
                          <Sparkles size={11} />
                        )}
                        {art.status}
                      </span>
                    </td>
                    <td>
                      <code>{art.res}</code>
                    </td>
                    <td className="aar-num" data-align="end">
                      <strong>{art.latency}</strong>
                    </td>
                    <td className="aar-text-align-center">
                      <details className="aar-menu">
                        <summary
                          className="aar-button"
                          data-size="xs"
                          data-variant="quiet"
                          aria-label="Row actions"
                        >
                          <MoreHorizontal size={14} />
                        </summary>
                        <div className="aar-menu-dropdown" data-align="end">
                          <button
                            type="button"
                            className="aar-menu-item aar-display-flex aar-items-center aar-gap-2"
                          >
                            <Copy size={13} /> Duplicate
                          </button>
                          <button
                            type="button"
                            className="aar-menu-item aar-display-flex aar-items-center aar-gap-2"
                          >
                            <Eye size={13} /> Inspect Altars
                          </button>
                          <hr className="aar-menu-divider" />
                          <button
                            type="button"
                            className="aar-menu-item aar-display-flex aar-items-center aar-gap-2"
                            data-danger="true"
                          >
                            <Trash2 size={13} /> Archive
                          </button>
                        </div>
                      </details>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Alerts & Status Banners */}
      <div className="aar-mt-10">
        <h3 className="aar-heading aar-text-1-125rem aar-mb-1">
          2. Alerts, Callouts &amp; Status Banners (.aar-alert)
        </h3>
        <p className="aar-hint aar-mb-4">
          Tone variants for contextual feedback: info, success, warning, and
          danger with icons and actions.
        </p>

        <div className="aar-stack" data-gap="3">
          <div className="aar-alert" data-tone="info">
            <span className="aar-alert-icon">
              <Info size={18} />
            </span>
            <div className="aar-alert-content">
              <div className="aar-alert-title">
                Atelier Synchronization Active
              </div>
              <div className="aar-alert-description">
                Changes are continuously persisted to local IndexedDB storage.
                Network sync resumes on reconnection.
              </div>
            </div>
            <button
              type="button"
              className="aar-button"
              data-size="xs"
              data-variant="quiet"
            >
              Dismiss
            </button>
          </div>

          <div className="aar-alert" data-tone="success">
            <span className="aar-alert-icon">
              <CheckCircle2 size={18} />
            </span>
            <div className="aar-alert-content">
              <div className="aar-alert-title">
                Transmutation Sealed Successfully
              </div>
              <div className="aar-alert-description">
                Vector artifact exported at 2× Retina scale. 128 assets
                generated without raster blur.
              </div>
              <div className="aar-alert-actions">
                <button
                  type="button"
                  className="aar-button"
                  data-variant="primary"
                  data-size="xs"
                >
                  Download Archive
                </button>
                <button type="button" className="aar-button" data-size="xs">
                  View in Altar
                </button>
              </div>
            </div>
          </div>

          <div className="aar-alert" data-tone="warning">
            <span className="aar-alert-icon">
              <AlertTriangle size={18} />
            </span>
            <div className="aar-alert-content">
              <div className="aar-alert-title">
                High Density Canvas Memory Threshold
              </div>
              <div className="aar-alert-description">
                The active composition contains over 4,000 algorithmic nodes.
                Hardware acceleration is recommended.
              </div>
            </div>
          </div>

          <div className="aar-alert" data-tone="danger">
            <span className="aar-alert-icon">
              <AlertCircle size={18} />
            </span>
            <div className="aar-alert-content">
              <div className="aar-alert-title">
                Rift Encountered: Invalid Shader Syntax
              </div>
              <div className="aar-alert-description">
                Line 42: Variable 'u_luminescence' is undefined. Falling back to
                default appearance.
              </div>
              <div className="aar-alert-actions">
                <button
                  type="button"
                  className="aar-button"
                  data-variant="danger"
                  data-size="xs"
                >
                  Revert to Sealed
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Disclosures & Accordions */}
      <div className="aar-mt-10">
        <h3 className="aar-heading aar-text-1-125rem aar-mb-1">
          3. Disclosures &amp; Accordions (Pure HTML &lt;details&gt;)
        </h3>
        <p className="aar-hint aar-mb-4">
          Zero JavaScript required. Fully accessible, keyboard-navigable
          expand/collapse with CSS-animated chevron.
        </p>

        <div className="aar-accordion-group">
          <details className="aar-accordion" open>
            <summary className="aar-accordion-summary">
              <span>
                Why choose pure HTML + aar-loom over heavy component libraries?
              </span>
              <span className="aar-accordion-chevron">
                <ChevronDown size={14} />
              </span>
            </summary>
            <div className="aar-accordion-body">
              Pure HTML + aar-loom gives you 100% decoupling from framework
              lock-in. You can use standard HTML in React, Vue, Svelte, Astro,
              plain PHP, or static files. There are zero megabytes of JS
              dependencies, zero hydration mismatches, and instant initial
              paint.
            </div>
          </details>

          <details className="aar-accordion">
            <summary className="aar-accordion-summary">
              <span>
                How do native &lt;details&gt; menus and accordions stay
                accessible?
              </span>
              <span className="aar-accordion-chevron">
                <ChevronDown size={14} />
              </span>
            </summary>
            <div className="aar-accordion-body">
              HTML5 &lt;details&gt; and &lt;summary&gt; have browser-native ARIA
              roles built in. Screen readers announce them as collapsible
              regions, the Space and Enter keys toggle them out of the box, and
              no polyfill is needed.
            </div>
          </details>

          <details className="aar-accordion">
            <summary className="aar-accordion-summary">
              <span>How does Magic-Art integrate with clean applications?</span>
              <span className="aar-accordion-chevron">
                <ChevronDown size={14} />
              </span>
            </summary>
            <div className="aar-accordion-body">
              Magic-Art is strictly opt-in via{" "}
              <code>data-magic-art=&quot;true&quot;</code> or dedicated classes.
              Clean SaaS apps run with zero sparkle animations by default,
              keeping designs crisp, fast, and professional.
            </div>
          </details>
        </div>
      </div>

      {/* 4. Pure HTML Dropdown Menus & CSS Tooltips */}
      <div className="aar-mt-10">
        <h3 className="aar-heading aar-text-1-125rem aar-mb-1">
          4. Pure HTML Dropdown Menus &amp; CSS Tooltips (Zero JS)
        </h3>
        <p className="aar-hint aar-mb-4">
          Interactive click-to-open dropdowns using HTML5 &lt;details
          class=&quot;aar-menu&quot;&gt; and pure CSS hover tooltips with
          [data-tooltip].
        </p>

        <div className="aar-cluster aar-gap-6 aar-items-center aar-flex-wrap-wrap">
          {/* Dropdown Menu */}
          <details className="aar-menu">
            <summary
              className="aar-button aar-display-inline-flex aar-items-center aar-gap-2"
              data-variant="primary"
            >
              <span>Export Artifacts</span>
              <ChevronDown size={14} />
            </summary>
            <div className="aar-menu-dropdown">
              <span className="aar-menu-header">Vector Formats</span>
              <button
                type="button"
                className="aar-menu-item aar-display-flex aar-items-center aar-gap-2"
              >
                <FileDown size={13} /> Export as SVG
              </button>
              <button
                type="button"
                className="aar-menu-item aar-display-flex aar-items-center aar-gap-2"
              >
                <FileDown size={13} /> Export as PDF
              </button>
              <span className="aar-menu-header aar-mt-1">Raster Formats</span>
              <button
                type="button"
                className="aar-menu-item aar-display-flex aar-items-center aar-gap-2"
              >
                <FileImage size={13} /> Export as PNG (2× Retina)
              </button>
              <button
                type="button"
                className="aar-menu-item aar-display-flex aar-items-center aar-gap-2"
              >
                <FileImage size={13} /> Export as WebP
              </button>
              <hr className="aar-menu-divider" />
              <button
                type="button"
                className="aar-menu-item aar-display-flex aar-items-center aar-gap-2"
                data-danger="true"
              >
                <Trash2 size={13} /> Clear Cache
              </button>
            </div>
          </details>

          {/* Secondary Menu */}
          <details className="aar-menu">
            <summary className="aar-button aar-display-inline-flex aar-items-center aar-gap-2">
              <span>Atelier Settings</span>
              <ChevronDown size={14} />
            </summary>
            <div className="aar-menu-dropdown">
              <button type="button" className="aar-menu-item">
                Toggle Grid Snapping
              </button>
              <button type="button" className="aar-menu-item">
                Show Safe Margins
              </button>
              <hr className="aar-menu-divider" />
              <button type="button" className="aar-menu-item">
                Keyboard Shortcuts (<span className="aar-kbd">?</span>)
              </button>
            </div>
          </details>

          {/* CSS Tooltips */}
          <button
            type="button"
            className="aar-button"
            data-tooltip="Saves active canvas state to local cache"
            data-tooltip-pos="top"
          >
            Hover for Top Tooltip
          </button>

          <button
            type="button"
            className="aar-button"
            data-variant="quiet"
            data-tooltip="WCAG AAA contrast verified"
            data-tooltip-pos="bottom"
          >
            Hover for Bottom Tooltip
          </button>
        </div>
      </div>

      {/* 5. Navigation Tabs & Breadcrumbs */}
      <div className="aar-mt-10">
        <h3 className="aar-heading aar-text-1-125rem aar-mb-1">
          5. Navigation Tabs &amp; Breadcrumbs
        </h3>
        <p className="aar-hint aar-mb-4">
          Pure semantic navigation structures with underline and pill variants.
        </p>

        {/* Breadcrumb */}
        <nav className="aar-breadcrumb aar-mb-5" aria-label="Hierarchy">
          <ol className="aar-breadcrumb-list">
            <li className="aar-breadcrumb-item">
              <a href="#grimoire" className="aar-breadcrumb-link">
                Grimoire Atelier
              </a>
              <span className="aar-breadcrumb-separator">/</span>
            </li>
            <li className="aar-breadcrumb-item">
              <a href="#projects" className="aar-breadcrumb-link">
                Yuwbrndr Projects
              </a>
              <span className="aar-breadcrumb-separator">/</span>
            </li>
            <li className="aar-breadcrumb-item" aria-current="page">
              Canvas Studio
            </li>
          </ol>
        </nav>

        {/* Tabs switcher */}
        <div className="aar-cluster aar-justify-space-between aar-items-center aar-mb-3">
          <span className="aar-eyebrow">Tab Variant:</span>
          <div className="aar-segmented" role="tablist">
            <button
              type="button"
              aria-selected={tabVariant === "underline"}
              onClick={() => setTabVariant("underline")}
            >
              Underline
            </button>
            <button
              type="button"
              aria-selected={tabVariant === "pills"}
              onClick={() => setTabVariant("pills")}
            >
              Pills
            </button>
          </div>
        </div>

        <nav
          className="aar-tabs"
          data-variant={tabVariant === "pills" ? "pills" : undefined}
          aria-label="Studio views"
        >
          <button
            type="button"
            className="aar-tab"
            aria-selected={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
          >
            <span className="aar-cluster aar-gap-2 aar-items-center">
              <Sparkles size={14} /> Atelier Overview
            </span>
            <span className="aar-badge" data-size="xs">
              12
            </span>
          </button>
          <button
            type="button"
            className="aar-tab"
            aria-selected={activeTab === "parameters"}
            onClick={() => setActiveTab("parameters")}
          >
            <span className="aar-cluster aar-gap-2 aar-items-center">
              <Sliders size={14} /> Parameters
            </span>
          </button>
          <button
            type="button"
            className="aar-tab"
            aria-selected={activeTab === "transmutations"}
            onClick={() => setActiveTab("transmutations")}
          >
            <span className="aar-cluster aar-gap-2 aar-items-center">
              <Check size={14} /> Transmutations
            </span>
          </button>
          <button
            type="button"
            className="aar-tab"
            aria-selected={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
          >
            <span className="aar-cluster aar-gap-2 aar-items-center">
              <Settings size={14} /> Settings
            </span>
          </button>
        </nav>
      </div>

      {/* 6. Avatars, Progress & Metric Stat Cards */}
      <div className="aar-mt-10">
        <h3 className="aar-heading aar-text-1-125rem aar-mb-1">
          6. Avatars, Progress Bars &amp; Metric Cards
        </h3>
        <p className="aar-hint aar-mb-4">
          Essential primitives for SaaS portals, user dashboards, and
          collaborative studio workspaces.
        </p>

        <div
          className="aar-grid aar-gap-5"
          style={{ "--aar-grid-min": "16rem" } as React.CSSProperties}
        >
          {/* Stat Card 1 */}
          <div className="aar-stat-card">
            <div className="aar-stat-label">Active Canvas Renderers</div>
            <div className="aar-stat-value">1,429</div>
            <div className="aar-stat-meta">
              <span
                className="aar-stat-delta aar-display-inline-flex aar-items-center aar-gap-1"
                data-trend="up"
              >
                <TrendingUp size={12} /> +18.4%
              </span>
              <span className="aar-hint aar-text-0-875rem">vs last epoch</span>
            </div>
          </div>

          {/* Stat Card 2 */}
          <div className="aar-stat-card">
            <div className="aar-stat-label">Frame Latency (p99)</div>
            <div className="aar-stat-value">
              14.2<span className="aar-text-1-125rem aar-weight-500">ms</span>
            </div>
            <div className="aar-stat-meta">
              <span className="aar-stat-delta" data-trend="down">
                ↓ -4.1ms
              </span>
              <span className="aar-hint aar-text-0-875rem">60 FPS locked</span>
            </div>
          </div>

          {/* Avatars & Progress Block */}
          <div className="aar-card aar-p-5">
            <div className="aar-eyebrow aar-mb-2">
              Collaborators &amp; Quota
            </div>
            <div className="aar-cluster aar-justify-space-between aar-items-center aar-mb-4">
              <div className="aar-avatar-group">
                <div className="aar-avatar" data-size="sm" title="Jana">
                  <span>JA</span>
                  <span className="aar-avatar-status" data-status="online" />
                </div>
                <div className="aar-avatar" data-size="sm" title="Aar">
                  <span>AR</span>
                  <span className="aar-avatar-status" data-status="busy" />
                </div>
                <div className="aar-avatar" data-size="sm" title="Yuw">
                  <span>YW</span>
                  <span className="aar-avatar-status" data-status="away" />
                </div>
                <div
                  className="aar-avatar aar-bg-primary aar-ink-on-primary"
                  data-size="sm"
                >
                  <span>+4</span>
                </div>
              </div>
              <span className="aar-badge" data-size="xs" data-tone="success">
                4 Online
              </span>
            </div>

            <div className="aar-stack" data-gap="1">
              <div className="aar-cluster aar-justify-space-between aar-text-0-875rem">
                <span className="aar-hint">Storage Quota</span>
                <strong>72% (7.2 / 10 GB)</strong>
              </div>
              <progress
                className="aar-progress"
                value={72}
                max={100}
                data-tone="success"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 7. Pagination */}
      <div className="aar-mt-10">
        <div className="aar-cluster aar-justify-space-between aar-items-center aar-flex-wrap-wrap aar-gap-4">
          <div>
            <h3 className="aar-heading aar-text-1-125rem aar-mb-1">
              7. Pagination (nav.aar-pagination)
            </h3>
            <p className="aar-hint aar-m-0px">
              Clean accessible pagination for large data tables and search
              catalogs.
            </p>
          </div>

          <nav className="aar-pagination" aria-label="Table pagination">
            <ul className="aar-pagination-list">
              <li>
                <button
                  type="button"
                  className="aar-pagination-btn"
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                  aria-label="Previous page"
                >
                  ←
                </button>
              </li>
              {[1, 2, 3, 4, 5].map((p) => (
                <li key={p}>
                  <button
                    type="button"
                    className="aar-pagination-btn"
                    aria-current={page === p ? "page" : undefined}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  className="aar-pagination-btn"
                  disabled={page >= 5}
                  onClick={() => setPage(page + 1)}
                  aria-label="Next page"
                >
                  →
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* 8. Pure HTML Code Example Block */}
      <div className="aar-mt-10">
        <p className="aar-eyebrow">Zero Framework Lock-in</p>
        <h3 className="aar-heading aar-text-1-125rem aar-mb-2">
          Pure Semantic HTML Snippets
        </h3>
        <p className="aar-hint aar-mb-4">
          Copy directly into any HTML, JSX, Vue, Svelte, or Astro file without
          importing a single React component:
        </p>

        <CodeBlock
          title="pure-html-specimens.html"
          language="html"
          code={`<!-- 1. Pure HTML Data Table -->
<div class="aar-table-container">
  <table class="aar-table" data-striped="true" data-hover="true">
    <thead>
      <tr>
        <th>Artifact</th>
        <th>Status</th>
        <th data-align="end">Compute Time</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Canvas Atelier</strong></td>
        <td><span class="aar-badge" data-tone="success">✓ Sealed</span></td>
        <td class="aar-num">14ms</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- 2. Pure HTML Click-to-Open Dropdown (Zero JS) -->
<details class="aar-menu">
  <summary class="aar-button" data-variant="primary">Actions ▾</summary>
  <div class="aar-menu-dropdown">
    <button class="aar-menu-item">✦ Duplicate</button>
    <button class="aar-menu-item">⟡ Export PNG</button>
    <hr class="aar-menu-divider">
    <button class="aar-menu-item" data-danger="true">✕ Delete</button>
  </div>
</details>

<!-- 3. Pure HTML Accordion (Zero JS) -->
<details class="aar-accordion">
  <summary class="aar-accordion-summary">
    <span>Expandable section</span>
    <span class="aar-accordion-chevron">▾</span>
  </summary>
  <div class="aar-accordion-body">
    Accessible content revealed natively by the browser.
  </div>
</details>

<!-- 4. Pure CSS Tooltip (Zero JS) -->
<button class="aar-button" data-tooltip="Instant tooltip message" data-tooltip-pos="top">
  Hover for Tooltip
</button>`}
        />
      </div>
    </section>
  );
}

const TOKEN_CATEGORIES = [
  {
    category: "Surfaces & Elevation",
    tokens: [
      { name: "--aar-background", role: "Viewport / Atelier canvas backdrop" },
      { name: "--aar-surface", role: "Default panel and card base surface" },
      {
        name: "--aar-surface-subtle",
        role: "Muted wells, hover fills, secondary groups",
      },
      {
        name: "--aar-surface-raised",
        role: "Modals, dropdown menus, elevated altars",
      },
      {
        name: "--aar-surface-overlay",
        role: "Topmost floating tooltips and popovers",
      },
    ],
  },
  {
    category: "Hairline Structure & Ink",
    tokens: [
      { name: "--aar-border", role: "1px etched structural boundary" },
      {
        name: "--aar-border-strong",
        role: "Active selection and highlighted edges",
      },
      { name: "--aar-text", role: "High-contrast primary typography" },
      {
        name: "--aar-text-muted",
        role: "Secondary metadata, captions, inactive runes",
      },
    ],
  },
  {
    category: "Interaction & Luminous Intent",
    tokens: [
      {
        name: "--aar-primary",
        role: "Primary command buttons, active star runes (✦)",
      },
      {
        name: "--aar-on-primary",
        role: "High-contrast label on primary fills",
      },
      { name: "--aar-focus", role: "Keyboard navigation focus indicator" },
      {
        name: "--aar-glow",
        role: "Atmospheric halo cast upon focused controls",
      },
    ],
  },
  {
    category: "Operational States",
    tokens: [
      {
        name: "--aar-success",
        role: "The Seal (✓), verified export, valid state",
      },
      {
        name: "--aar-success-surface",
        role: "Success confirmation badge & toast surface",
      },
      {
        name: "--aar-danger",
        role: "Rift warning (!), quota breach, syntax error",
      },
      {
        name: "--aar-danger-surface",
        role: "Critical alert badge & error message surface",
      },
    ],
  },
];

function PalettesAndColors({
  currentPalette,
  onSelectPalette,
}: {
  currentPalette: string;
  onSelectPalette: (value: string) => void;
}) {
  return (
    <section className="aar-panel aar-stack" data-gap="4">
      <p className="aar-eyebrow">Appearance, identity, expression</p>
      <h2 className="aar-heading">One theme model. Your own brand.</h2>
      <p>
        Light, Dark, and System choose appearance. Default or Custom chooses
        brand colors. Magic Art is an independent visual expression; density
        controls spacing. Components are optional: use these tokens and layout
        classes with ordinary HTML or your own framework.
      </p>
      <div className="aar-cluster">
        <button
          className="aar-button"
          aria-pressed={currentPalette === "default"}
          onClick={() => onSelectPalette("default")}
        >
          Default accent
        </button>
        <button
          className="aar-button"
          aria-pressed={currentPalette === "custom"}
          onClick={() => onSelectPalette("custom")}
        >
          Use custom colors
        </button>
      </div>
      <div className="aar-grid" data-min="18">
        {TOKEN_CATEGORIES.map((category) => (
          <section key={category.category} className="aar-card aar-stack">
            <h3 className="aar-heading">{category.category}</h3>
            {category.tokens.map((token) => (
              <div key={token.name} className="aar-stack" data-gap="1">
                <code>{token.name}</code>
                <p className="aar-hint">{token.role}</p>
              </div>
            ))}
          </section>
        ))}
      </div>
      <CodeBlock
        title="Plain HTML, no components required"
        language="html"
        code={`<main class="aar-root aar-page-reset" data-theme="system" data-density="comfortable">
  <section class="aar-container aar-stack" data-gap="6">
    <h1 class="aar-title">Your application</h1>
    <div class="aar-grid" data-min="18">
      <article class="aar-panel">Main task</article>
      <aside class="aar-panel">Supporting tools</aside>
    </div>
  </section>
</main>`}
      />
      <CodeBlock
        title="Your brand colors (optional token overrides)"
        language="css"
        code={`/* Supply a readable foreground for each primary color. */
[data-brand="your-brand"][data-theme="light"] {
  --aar-primary: #326954;
  --aar-on-primary: #ffffff;
  --aar-focus: #326954;
}
[data-brand="your-brand"][data-theme="dark"] {
  --aar-primary: #a8d6c4;
  --aar-on-primary: #142d25;
  --aar-focus: #a8d6c4;
}`}
      />
    </section>
  );
}

interface AarLoomDropdownSelectProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (val: string) => void;
}

function AarLoomDropdownSelect({
  label,
  value,
  onChange,
  options,
}: AarLoomDropdownSelectProps) {
  return (
    <AarSelect
      label={label}
      value={value}
      onChange={onChange}
      options={options}
    />
  );
}

function IntroDocSection() {
  return (
    <section className="aar-guide-section" id="aar-intro">
      <div className="aar-panel">
        <div className="aar-cluster aar-gap-2 aar-mb-2 aar-flex-wrap-wrap">
          <span
            className="aar-badge aar-display-inline-flex aar-items-center aar-gap-2"
            data-variant="primary"
          >
            <Sparkles size={11} /> {loomPackage.version}
          </span>
          <span
            className="aar-badge aar-display-inline-flex aar-items-center aar-gap-2"
            data-tone="success"
          >
            <Check size={11} /> Zero Dependencies
          </span>
          <span className="aar-badge">Pure CSS</span>
          <span className="aar-badge">MIT License</span>
          <span className="aar-badge" data-tone="warning">
            AI-Friendly HTML
          </span>
        </div>
        <h2 className="aar-title aar-text-2-25rem aar-m-0-5rem-0">
          Aar Loom Architecture
        </h2>
        <p className="aar-text-1-125rem aar-ink-text-muted aar-line-height-1-6 aar-max-w-52rem">
          A standalone, framework-agnostic CSS design system built for creative
          engineering tools, dashboards, and ateliers. Engineered with 1px
          etched hairlines, Light, Dark, and System appearance, corner-bracket
          altars, and honest functional runes.
        </p>

        <div
          className="aar-grid aar-gap-4 aar-mt-6"
          style={{ "--aar-grid-min": "15rem" } as React.CSSProperties}
        >
          <div className="aar-card aar-p-4">
            <h4 className="aar-m-0-0-0-25rem aar-text-0-9375rem">
              Zero Runtime Lock-in
            </h4>
            <p className="aar-hint aar-m-0px">
              Use directly with static HTML, React, Vue, Svelte, Astro, Angular,
              or backend templating. No JavaScript bundle required.
            </p>
          </div>
          <div className="aar-card aar-p-4">
            <h4 className="aar-m-0-0-0-25rem aar-text-0-9375rem">
              Semantic HTML &amp; AI-Ready
            </h4>
            <p className="aar-hint aar-m-0px">
              Structured with native HTML5 tags, standard <code>.aar-*</code>{" "}
              classes, and clean data attributes that AI models and screen
              readers parse effortlessly.
            </p>
          </div>
          <div className="aar-card aar-p-4">
            <h4 className="aar-m-0-0-0-25rem aar-text-0-9375rem">
              Contrast &amp; Accessibility
            </h4>
            <p className="aar-hint aar-m-0px">
              Readable default text pairs in light and dark appearance, with
              visible keyboard focus. Validate custom brand colors for contrast.
            </p>
          </div>
        </div>
      </div>

      <div className="aar-panel">
        <p className="aar-eyebrow">Installation &amp; Setup</p>
        <h3 className="aar-heading">How to Use in Any Web Application</h3>
        <p className="aar-hint aar-mb-4">
          Choose between npm package import or direct CDN link.
        </p>

        <CodeBlock
          title="Terminal (npm)"
          language="bash"
          code={`# Install via npm or pnpm
npm install @techaaroorian-ui/aar-loom`}
        />

        <div className="aar-mt-5">
          <CodeBlock
            title="main.js / index.ts (ESM / Bundler)"
            language="javascript"
            code={`// Import the complete design system in your application entry
import '@techaaroorian-ui/aar-loom/index.css';`}
          />
        </div>

        <div className="aar-mt-5">
          <CodeBlock
            title="index.html (Direct CDN)"
            language="html"
            code={`<!-- Add to the <head> of your HTML file -->
<link rel="stylesheet" href="https://unpkg.com/@techaaroorian-ui/aar-loom/index.css" />

<!-- Apply .aar-root to your container with desired appearance and brand colors -->
<body class="aar-root" data-theme="dark" >
  <button class="aar-button" data-variant="primary">✦ Hello Atelier</button>
</body>`}
          />
        </div>
      </div>
    </section>
  );
}

function ButtonsDocSection() {
  const [selected, setSelected] = useState(false);
  const [btnSize, setBtnSize] = useState<"xs" | "sm" | "md" | "lg" | "xl">(
    "md",
  );

  return (
    <section className="aar-guide-section" id="buttons">
      <div className="aar-panel">
        <p className="aar-eyebrow">Core Instruments / 01</p>
        <h2 className="aar-heading">Buttons &amp; Action Triggers</h2>
        <p className="aar-hint aar-mb-6">
          Clear action hierarchy. Hover lifts controls by 1px (
          <code>--aar-hover-offset</code>), press scales gently (
          <code>--aar-press-scale</code>), and focus projects an atmospheric
          aura.
        </p>

        {/* Live Interactive Specimen */}
        <div className="aar-specimen-box">
          <div className="aar-cluster aar-justify-space-between aar-items-center aar-mb-4">
            <span className="aar-eyebrow">Live Interactive Specimen</span>
            <div className="aar-segmented" role="tablist">
              {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  role="tab"
                  aria-selected={btnSize === s}
                  onClick={() => setBtnSize(s)}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="aar-specimen-preview">
            <div className="aar-stack" data-gap="3">
              <div className="aar-cluster aar-gap-3 aar-flex-wrap-wrap aar-items-center">
                <button
                  type="button"
                  className="aar-button aar-display-inline-flex aar-items-center aar-gap-2"
                  data-variant="primary"
                  data-size={btnSize}
                >
                  <Sparkles size={14} /> Primary Action
                </button>
                <button
                  type="button"
                  className="aar-button"
                  data-size={btnSize}
                >
                  Secondary Action
                </button>
                <button
                  type="button"
                  className="aar-button"
                  data-variant="quiet"
                  data-size={btnSize}
                >
                  Quiet Action
                </button>
                <button
                  type="button"
                  className="aar-button"
                  data-variant="danger"
                  data-size={btnSize}
                >
                  Delete Artifact
                </button>
                <button
                  type="button"
                  className="aar-button"
                  disabled
                  data-size={btnSize}
                >
                  Unavailable
                </button>
                <button
                  type="button"
                  className="aar-button"
                  data-size={btnSize}
                  aria-pressed={selected}
                  onClick={() => setSelected(!selected)}
                >
                  {selected ? (
                    <span className="aar-cluster aar-gap-2 aar-items-center">
                      <Check size={14} /> Selected
                    </span>
                  ) : (
                    "Toggle Press"
                  )}
                </button>
              </div>

              <div className="aar-cluster aar-gap-3 aar-items-center aar-flex-wrap-wrap">
                <span className="aar-hint">Icon Controls:</span>
                <button
                  type="button"
                  className="aar-icon-button"
                  data-size={btnSize}
                  aria-label="Add project"
                  title="Add project"
                >
                  <Plus size={16} />
                </button>
                <button
                  type="button"
                  className="aar-icon-button"
                  data-size={btnSize}
                  aria-label="Remove item"
                  title="Remove item"
                >
                  <Minus size={16} />
                </button>
                <button
                  type="button"
                  className="aar-icon-button"
                  data-variant="quiet"
                  data-size={btnSize}
                  aria-label="Refresh"
                  title="Refresh"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  type="button"
                  className="aar-icon-button"
                  data-variant="primary"
                  data-size={btnSize}
                  aria-label="Magic action"
                  title="Magic action"
                >
                  <Sparkles size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Reference Table */}
          <div className="aar-table-scroll aar-mb-6">
            <table className="aar-reference-table">
              <thead>
                <tr>
                  <th>Class / Attribute</th>
                  <th>Role</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>.aar-button</code>
                  </td>
                  <td>Base button styling with standard padding and font</td>
                  <td>Default secondary styling</td>
                </tr>
                <tr>
                  <td>
                    <code>data-variant</code>
                  </td>
                  <td>Action hierarchy and color intent</td>
                  <td>
                    <code>primary</code> | <code>quiet</code> |{" "}
                    <code>danger</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>data-size</code>
                  </td>
                  <td>Standardized size scaling</td>
                  <td>
                    <code>xs</code> (28px) | <code>sm</code> (36px) |{" "}
                    <code>md</code> (44px) | <code>lg</code> (52px) |{" "}
                    <code>xl</code> (60px)
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>.aar-icon-button</code>
                  </td>
                  <td>Square 1:1 icon control container</td>
                  <td>
                    Supports same <code>data-variant</code> and{" "}
                    <code>data-size</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>aria-pressed</code>
                  </td>
                  <td>Toggleable pressed state feedback</td>
                  <td>
                    <code>true</code> | <code>false</code>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Copyable HTML Code Block */}
          <CodeBlock
            title="buttons-usage.html"
            language="html"
            code={`<!-- Primary Action Button -->
<button class="aar-button" data-variant="primary">✦ Primary Action</button>

<!-- Secondary Action Button -->
<button class="aar-button">Secondary Action</button>

<!-- Quiet (Ghost) Button -->
<button class="aar-button" data-variant="quiet">Quiet Action</button>

<!-- Destructive Action Button -->
<button class="aar-button" data-variant="danger">Delete Artifact</button>

<!-- Disabled Button -->
<button class="aar-button" disabled>Unavailable</button>

<!-- Toggle Pressed Button -->
<button class="aar-button" aria-pressed="true">✓ Selected</button>

<!-- Sized Buttons (xs, sm, md, lg, xl) -->
<button class="aar-button" data-variant="primary" data-size="sm">Small Action</button>
<button class="aar-button" data-variant="primary" data-size="lg">Large Action</button>

<!-- 1:1 Icon Button -->
<button class="aar-icon-button" aria-label="Settings" title="Settings">⚙</button>`}
          />
        </div>
      </div>
    </section>
  );
}

function InputsDocSection() {
  const [emailVal, setEmailVal] = useState("hello@atelier");
  const [showPassword, setShowPassword] = useState(false);
  const [inputSize, setInputSize] = useState<"xs" | "sm" | "md" | "lg" | "xl">(
    "md",
  );

  return (
    <section className="aar-guide-section" id="inputs">
      <div className="aar-panel">
        <p className="aar-eyebrow">Core Instruments / 02</p>
        <h2 className="aar-heading">Inputs &amp; Form Controls</h2>
        <p className="aar-hint aar-mb-6">
          Accessible form intake wrapped with <code>.aar-field</code>, distinct
          labels, validation hints, checkboxes, radios, and range sliders.
        </p>

        <div className="aar-specimen-box">
          <div className="aar-cluster aar-justify-space-between aar-items-center aar-mb-4">
            <span className="aar-eyebrow">Live Interactive Specimen</span>
            <div className="aar-segmented" role="tablist">
              {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  role="tab"
                  aria-selected={inputSize === s}
                  onClick={() => setInputSize(s)}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="aar-specimen-preview">
            {/* Synchronized 3-Column Form Row (Subgrid Alignment: 0px CLS & Baseline Aligned) */}
            <div className="aar-form-row aar-gap-0-1-25rem aar-mb-5">
              {/* Text Input */}
              <label className="aar-field">
                <span className="aar-field-label">Project Name</span>
                <input
                  className="aar-input"
                  data-size={inputSize}
                  type="text"
                  placeholder="e.g. Algorithmic Grimoire"
                />
                <div className="aar-field-feedback">
                  <span className="aar-hint">
                    Unique name for your creative workspace.
                  </span>
                </div>
              </label>

              {/* Email with Validation */}
              <label
                className="aar-field"
                data-tone={!emailVal.includes(".") ? "danger" : "success"}
              >
                <span className="aar-field-label">Atelier Email</span>
                <input
                  className="aar-input"
                  data-size={inputSize}
                  data-tone={!emailVal.includes(".") ? "danger" : "success"}
                  type="email"
                  value={emailVal}
                  onChange={(e) => setEmailVal(e.target.value)}
                  aria-invalid={!emailVal.includes(".")}
                  aria-describedby="email-spec-error"
                />
                <div className="aar-field-feedback">
                  {!emailVal.includes(".") ? (
                    <span
                      className="aar-hint aar-display-inline-flex aar-items-center aar-gap-2"
                      data-tone="danger"
                      id="email-spec-error"
                    >
                      <AlertCircle size={13} /> Enter a complete domain, e.g.
                      hello@example.com
                    </span>
                  ) : (
                    <span
                      className="aar-hint aar-display-inline-flex aar-items-center aar-gap-2"
                      data-tone="success"
                    >
                      <Check size={13} /> Valid email syntax
                    </span>
                  )}
                </div>
              </label>

              {/* Password with peek */}
              <label className="aar-field">
                <span className="aar-field-label">Passphrase</span>
                <div className="aar-position-relative">
                  <input
                    className="aar-input aar-pr-10 aar-w-100"
                    data-size={inputSize}
                    type={showPassword ? "text" : "password"}
                    defaultValue="arcane-spell-123"
                  />
                  <button
                    type="button"
                    className="aar-icon-button aar-position-absolute aar-right-0-25rem aar-top-50 aar-transform-translatey-50 aar-border-none aar-bg-transparent"
                    data-variant="quiet"
                    onClick={() => setShowPassword(!showPassword)}

                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <Eye size={15} /> : <EyeOff size={15} />}
                  </button>
                </div>
                <div className="aar-field-feedback">
                  <span className="aar-hint">
                    Encrypted studio master passphrase.
                  </span>
                </div>
              </label>
            </div>

            {/* Range Slider */}
            <label className="aar-field">
              <span className="aar-field-label">
                Canvas Viewport Scale (100%)
              </span>
              <input
                type="range"
                className="aar-range"
                min="50"
                max="200"
                defaultValue="100"
              />
            </label>

            <div className="aar-cluster aar-gap-6 aar-mt-5 aar-flex-wrap-wrap">
              <label className="aar-checkbox">
                <input type="checkbox" defaultChecked />
                <span>Auto-seal generated artifacts</span>
              </label>

              <label className="aar-radio">
                <input type="radio" name="demo-radio" defaultChecked />
                <span>Vector SVG</span>
              </label>
              <label className="aar-radio">
                <input type="radio" name="demo-radio" />
                <span>Raster PNG</span>
              </label>

              <label className="aar-switch">
                <input type="checkbox" defaultChecked />
                <span>GPU Acceleration</span>
              </label>
            </div>
          </div>

          <CodeBlock
            title="inputs-usage.html"
            language="html"
            code={`<!-- Standard Text Input with Field Wrapper -->
<label class="aar-field">
  <span class="aar-field-label">Project Name</span>
  <input class="aar-input" type="text" placeholder="e.g. Algorithmic Grimoire" />
  <span class="aar-hint">Unique name for your creative workspace.</span>
</label>

<!-- Input with Error Validation State -->
<label class="aar-field">
  <span class="aar-field-label">Email Address</span>
  <input class="aar-input" type="email" value="invalid@" aria-invalid="true" aria-describedby="err-1" />
  <span class="aar-hint" data-tone="danger" id="err-1">! Enter a complete address.</span>
</label>

<!-- Checkbox -->
<label class="aar-checkbox">
  <input type="checkbox" checked />
  <span>Auto-seal generated artifacts</span>
</label>

<!-- Radio Controls -->
<label class="aar-radio">
  <input type="radio" name="export-format" checked />
  <span>Vector SVG</span>
</label>
<label class="aar-radio">
  <input type="radio" name="export-format" />
  <span>Raster PNG</span>
</label>

<!-- Toggle Switch -->
<label class="aar-switch">
  <input type="checkbox" checked />
  <span>GPU Acceleration</span>
</label>

<!-- Precision Range Slider -->
<label class="aar-field">
  <span class="aar-field-label">Scale (100%)</span>
  <input type="range" class="aar-range" min="50" max="200" value="100" />
</label>`}
          />
        </div>
      </div>
    </section>
  );
}

function SelectsDocSection() {
  const [selectedVal, setSelectedVal] = useState("social");

  return (
    <section className="aar-guide-section" id="selects">
      <div className="aar-panel">
        <p className="aar-eyebrow">Core Instruments / 03</p>
        <h2 className="aar-heading">Selects, Menus &amp; Dropdowns</h2>
        <p className="aar-hint aar-mb-6">
          Three tiers of selection: native styled <code>.aar-select</code>,
          zero-JS click-to-open <code>details.aar-menu</code>, and custom
          animated <code>.aar-dropdown</code>.
        </p>

        <div className="aar-specimen-box">
          <div className="aar-specimen-preview">
            <div
              className="aar-grid aar-gap-6"
              style={{ "--aar-grid-min": "16rem" } as React.CSSProperties}
            >
              {/* Native Select */}
              <label className="aar-field">
                <span className="aar-field-label">
                  1. Native Styled Select (.aar-select)
                </span>
                <select
                  className="aar-select"
                  value={selectedVal}
                  onChange={(e) => setSelectedVal(e.target.value)}
                >
                  <option value="social">Social Banner (1200×627)</option>
                  <option value="post">Square Post (1080×1080)</option>
                  <option value="story">Story Deck (1080×1920)</option>
                </select>
                <span className="aar-hint">
                  Uses native browser picker with custom etched arrow.
                </span>
              </label>

              {/* Zero-JS Details Menu */}
              <div className="aar-stack" data-gap="1">
                <span className="aar-field-label">
                  2. Zero-JS Menu (details.aar-menu)
                </span>
                <details className="aar-menu">
                  <summary
                    className="aar-button aar-display-inline-flex aar-items-center aar-gap-2"
                    data-variant="primary"
                  >
                    <span>Actions Menu</span>
                    <ChevronDown size={14} />
                  </summary>
                  <div className="aar-menu-dropdown">
                    <button
                      type="button"
                      className="aar-menu-item aar-display-flex aar-items-center aar-gap-2"
                      onClick={() => setSelectedVal("social")}
                    >
                      <Sparkles size={13} /> Social Banner
                    </button>
                    <button
                      type="button"
                      className="aar-menu-item aar-display-flex aar-items-center aar-gap-2"
                      onClick={() => setSelectedVal("post")}
                    >
                      <Sparkles size={13} /> Square Post
                    </button>
                    <button
                      type="button"
                      className="aar-menu-item aar-display-flex aar-items-center aar-gap-2"
                      onClick={() => setSelectedVal("story")}
                    >
                      <Sparkles size={13} /> Story Deck
                    </button>
                    <hr className="aar-menu-divider" />
                    <button
                      type="button"
                      className="aar-menu-item aar-display-flex aar-items-center aar-gap-2"
                      data-danger="true"
                      onClick={() => setSelectedVal("social")}
                    >
                      <RotateCcw size={13} /> Reset Selection
                    </button>
                  </div>
                </details>
                <span className="aar-hint">
                  Natively toggled by the browser without JavaScript.
                </span>
              </div>

              {/* Custom Animated Dropdown */}
              <AarLoomDropdownSelect
                label="3. Animated Dropdown (.aar-dropdown)"
                value={selectedVal}
                onChange={setSelectedVal}
                options={[
                  { value: "social", label: "Social Banner (1200×627)" },
                  { value: "post", label: "Square Post (1080×1080)" },
                  { value: "story", label: "Story Deck (1080×1920)" },
                ]}
              />
            </div>
          </div>

          <CodeBlock
            title="selects-usage.html"
            language="html"
            code={`<!-- Tier 1: Refined Native Select -->
<label class="aar-field">
  <span class="aar-field-label">Preset</span>
  <select class="aar-select">
    <option value="social">✦ Social Banner (1200×627)</option>
    <option value="square">✦ Square Post (1080×1080)</option>
    <option value="story">✦ Story Deck (1080×1920)</option>
  </select>
</label>

<!-- Tier 2: Zero-JS Click Dropdown Menu -->
<details class="aar-menu">
  <summary class="aar-button" data-variant="primary">Actions ▾</summary>
  <div class="aar-menu-dropdown">
    <button type="button" class="aar-menu-item">✦ Duplicate</button>
    <button type="button" class="aar-menu-item">⟡ Export PNG</button>
    <hr class="aar-menu-divider" />
    <button type="button" class="aar-menu-item" data-danger="true">✕ Delete</button>
  </div>
</details>

<!-- Tier 3: Custom Animated Dropdown (React / HTML structure) -->
<div class="aar-dropdown" data-open="false">
  <button type="button" class="aar-dropdown-trigger" aria-haspopup="listbox">
    <span>✦ Social Banner</span>
    <span class="aar-dropdown-arrow">▾</span>
  </button>
  <div class="aar-dropdown-menu" role="listbox">
    <button type="button" class="aar-dropdown-item" role="option">✦ Social Banner</button>
    <button type="button" class="aar-dropdown-item" role="option">✦ Square Post</button>
  </div>
</div>`}
          />
        </div>
      </div>
    </section>
  );
}

function SurfacesDocSection() {
  return (
    <section className="aar-guide-section" id="surfaces">
      <div className="aar-panel">
        <p className="aar-eyebrow">Core Instruments / 04</p>
        <h2 className="aar-heading">Cards, Panels &amp; Canvas Altar</h2>
        <p className="aar-hint aar-mb-6">
          Boundary definition without heavy clutter. Cards support selection
          rings, compact density, and etched corner brackets.
        </p>

        <div className="aar-specimen-box">
          <div className="aar-specimen-preview">
            <div className="aar-stack" data-gap="3">
              {/* Altar with Corner Brackets */}
              <div
                className="aar-altar aar-min-h-140px aar-display-flex aar-items-center aar-justify-center aar-bg-surface-subtle aar-radius-radius-md"
                data-corner-brackets="true"
              >
                <div className="aar-text-align-center">
                  <span className="aar-display-inline-flex aar-items-center aar-justify-center aar-m-0-auto-0-5rem aar-ink-primary">
                    <Sparkles size={28} />
                  </span>
                  <h4 className="aar-m-0-25rem-0 aar-text-1-1rem">
                    The Canvas Altar (.aar-altar)
                  </h4>
                  <p className="aar-hint aar-m-0px">
                    Framed with etched corner brackets (
                    <code>data-corner-brackets=&quot;true&quot;</code>). Artwork
                    rendered with zero chrome distortion.
                  </p>
                </div>
              </div>

              {/* Grid of Cards */}
              <div
                className="aar-grid aar-gap-4"
                style={{ "--aar-grid-min": "14rem" } as React.CSSProperties}
              >
                <div className="aar-card aar-p-5" data-selected="true">
                  <div className="aar-cluster aar-justify-space-between">
                    <span className="aar-eyebrow">Active Preset</span>
                    <span
                      className="aar-badge aar-display-inline-flex aar-items-center aar-gap-2"
                      data-variant="primary"
                    >
                      <Check size={11} /> Selected
                    </span>
                  </div>
                  <h4 className="aar-m-0-5rem-0-0-25rem aar-text-1-1rem">
                    Social Banner
                  </h4>
                  <p className="aar-hint">
                    1200×627 · Optimized for LinkedIn and Twitter feeds.
                  </p>
                </div>

                <div className="aar-card aar-p-5">
                  <span className="aar-eyebrow">Available Preset</span>
                  <h4 className="aar-m-0-5rem-0-0-25rem aar-text-1-1rem">
                    Square Post
                  </h4>
                  <p className="aar-hint">
                    1080×1080 · High-contrast 1:1 Instagram frame.
                  </p>
                </div>

                <div className="aar-card aar-p-4" data-compact="true">
                  <span className="aar-eyebrow">Compact Card</span>
                  <h4 className="aar-m-0-25rem-0 aar-text-0-95rem">
                    Story Deck
                  </h4>
                  <p className="aar-hint aar-m-0px">1080×1920 · 6 Slides</p>
                </div>
              </div>
            </div>
          </div>

          <CodeBlock
            title="surfaces-usage.html"
            language="html"
            code={`<!-- Base Interactive Card -->
<div class="aar-card">
  <span class="aar-eyebrow">Template</span>
  <h4 class="aar-heading">Square Post</h4>
  <p class="aar-hint">1080×1080 Aspect Ratio</p>
</div>

<!-- Selected Card with Active Halo Ring -->
<div class="aar-card" data-selected="true">
  <div class="aar-cluster aar-justify-space-between">
    <span class="aar-eyebrow">Active Preset</span>
    <span class="aar-badge" data-variant="primary">✦ Selected</span>
  </div>
  <h4 class="aar-heading">Social Banner</h4>
  <p class="aar-hint">1200×627 Retina</p>
</div>

<!-- Elevation Panel -->
<section class="aar-panel">
  <h3 class="aar-heading">Instrument Panel</h3>
  <p class="aar-hint">Grouped control instruments</p>
</section>

<!-- The Arcane Canvas Altar with Corner Brackets (┌ ┐ └ ┘) -->
<div class="aar-altar" data-corner-brackets="true">
  <div class="aar-altar-canvas">
    <!-- User artwork stage rendered cleanly here -->
  </div>
</div>`}
          />
        </div>
      </div>
    </section>
  );
}

function BadgesDocSection() {
  return (
    <section className="aar-guide-section" id="badges">
      <div className="aar-panel">
        <p className="aar-eyebrow">Core Instruments / 05</p>
        <h2 className="aar-heading">Badges, Runes &amp; Status Indicators</h2>
        <p className="aar-hint aar-mb-6">
          Functional runes carry meaning beyond color alone: Active selection,
          Sealed artifact, Live transmutation, Rift alert.
        </p>

        <div className="aar-specimen-box">
          <div className="aar-specimen-preview">
            <div className="aar-stack" data-gap="2">
              <div className="aar-cluster aar-gap-3 aar-flex-wrap-wrap aar-items-center">
                <span className="aar-badge aar-display-inline-flex aar-items-center aar-gap-2">
                  <FileText size={11} /> Inactive Draft
                </span>
                <span
                  className="aar-badge aar-display-inline-flex aar-items-center aar-gap-2"
                  data-variant="primary"
                >
                  <Sparkles size={11} /> Active Selection
                </span>
                <span
                  className="aar-badge aar-display-inline-flex aar-items-center aar-gap-2"
                  data-tone="success"
                >
                  <Check size={11} /> Sealed Artifact
                </span>
                <span
                  className="aar-badge aar-display-inline-flex aar-items-center aar-gap-2"
                  data-tone="danger"
                >
                  <AlertCircle size={11} /> Rift Warning
                </span>
                <span
                  className="aar-badge aar-display-inline-flex aar-items-center aar-gap-2"
                  data-tone="warning"
                >
                  <Clock size={11} /> Transmuting (14ms)
                </span>
                <span className="aar-kbd">⌘K</span>
                <span className="aar-kbd">Ctrl+S</span>
              </div>

              <div className="aar-cluster aar-gap-3 aar-flex-wrap-wrap aar-items-center aar-mt-3">
                <span className="aar-hint">Size Tiers:</span>
                <span
                  className="aar-badge aar-display-inline-flex aar-items-center aar-gap-1"
                  data-size="xs"
                  data-tone="success"
                >
                  <Check size={10} /> XS
                </span>
                <span
                  className="aar-badge aar-display-inline-flex aar-items-center aar-gap-1"
                  data-size="sm"
                  data-tone="success"
                >
                  <Check size={11} /> SM
                </span>
                <span
                  className="aar-badge aar-display-inline-flex aar-items-center aar-gap-2"
                  data-size="md"
                  data-tone="success"
                >
                  <Check size={12} /> MD (Default)
                </span>
                <span
                  className="aar-badge aar-display-inline-flex aar-items-center aar-gap-2"
                  data-size="lg"
                  data-tone="success"
                >
                  <Check size={14} /> LG
                </span>
              </div>
            </div>
          </div>

          <CodeBlock
            title="badges-usage.html"
            language="html"
            code={`<!-- Default Neutral Badge -->
<span class="aar-badge">✧ Draft</span>

<!-- Primary Active Badge -->
<span class="aar-badge" data-variant="primary">✦ Active</span>

<!-- Success Tone (Sealed / Ready) -->
<span class="aar-badge" data-tone="success">✓ Sealed</span>

<!-- Danger Tone (Error / Quota Alert) -->
<span class="aar-badge" data-tone="danger">! Needs Attention</span>

<!-- Warning Tone (Transmuting / Working) -->
<span class="aar-badge" data-tone="warning">⟡ Transmuting</span>

<!-- Keyboard Shortcut Tag -->
<span class="aar-kbd">⌘K</span>

<!-- Size Scale Variations -->
<span class="aar-badge" data-size="xs" data-tone="success">XS Badge</span>
<span class="aar-badge" data-size="lg" data-tone="success">LG Badge</span>`}
          />
        </div>
      </div>
    </section>
  );
}

function DialogsDocSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="aar-guide-section" id="dialogs">
      <div className="aar-panel">
        <p className="aar-eyebrow">Core Instruments / 06</p>
        <h2 className="aar-heading">Dialogs, Modals &amp; Sheets</h2>
        <p className="aar-hint aar-mb-6">
          HTML5 native <code>&lt;dialog&gt;</code> element with semi-transparent
          atmospheric backdrop and wave reveal animations.
        </p>

        <div className="aar-specimen-box">
          <div className="aar-specimen-preview">
            <div className="aar-cluster aar-justify-space-between aar-items-center aar-flex-wrap-wrap aar-gap-4">
              <div>
                <h4 className="aar-m-0-0-0-25rem aar-text-1-1rem">
                  HTML5 Native &lt;dialog class=&quot;aar-dialog&quot;&gt;
                </h4>
                <p className="aar-hint aar-m-0px">
                  Supports native Escape key handling, backdrop click closure,
                  and accessible focus traps.
                </p>
              </div>
              <button
                type="button"
                className="aar-button"
                data-variant="primary"
                onClick={() => setModalOpen(true)}
              >
                ✦ Open Modal Specimen
              </button>
            </div>

            {/* Specimen Dialog Modal */}
            {modalOpen && (
              <div
                className="aar-position-fixed aar-inset-0px aar-z-index-9999 aar-display-grid aar-place-items-center aar-bg-rgba-10-14-23-0-72 aar-backdrop-filter-blur-6px aar-p-4"
                onClick={() => setModalOpen(false)}
              >
                <div
                  className="aar-dialog aar-dialog-wave aar-w-min-500px-95vw aar-bg-surface-raised aar-radius-radius-md aar-border-1px-solid-border aar-p-6 aar-box-shadow-shadow-lg"
                  data-size="md"

                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="aar-dialog-header aar-display-flex aar-justify-space-between aar-items-center aar-mb-4">
                    <h3 className="aar-m-0px aar-text-1-25rem">
                      Seal Creative Artifact
                    </h3>
                    <button
                      type="button"
                      className="aar-icon-button"
                      data-variant="quiet"
                      onClick={() => setModalOpen(false)}
                      aria-label="Close dialog"
                    >
                      <X size={15} />
                    </button>
                  </div>
                  <div className="aar-dialog-body aar-mb-6">
                    <p className="aar-ink-text-muted aar-line-height-1-6 aar-m-0px">
                      You are about to export this canvas incantation at 2×
                      Retina resolution. Color profiles and artwork isolation
                      will be preserved in the resulting PNG.
                    </p>
                  </div>
                  <div className="aar-dialog-footer aar-display-flex aar-justify-flex-end aar-gap-3">
                    <button
                      type="button"
                      className="aar-button"
                      onClick={() => setModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="aar-button aar-display-inline-flex aar-items-center aar-gap-2"
                      data-variant="primary"
                      onClick={() => setModalOpen(false)}
                    >
                      <Check size={14} /> Confirm Seal
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <CodeBlock
            title="dialog-usage.html"
            language="html"
            code={`<!-- HTML5 Native Dialog Modal -->
<dialog class="aar-dialog aar-dialog-wave" data-size="md">
  <div class="aar-dialog-header">
    <h3>Seal Creative Artifact</h3>
    <button type="button" class="aar-icon-button" data-variant="quiet" aria-label="Close">✕</button>
  </div>
  
  <div class="aar-dialog-body">
    <p>Export canvas at 2× Retina with artwork isolation.</p>
  </div>
  
  <div class="aar-dialog-footer">
    <button type="button" class="aar-button" onclick="this.closest('dialog').close()">Cancel</button>
    <button type="button" class="aar-button" data-variant="primary">✓ Confirm Seal</button>
  </div>
</dialog>

<!-- JavaScript to show natively -->
<script>
  const dialog = document.querySelector('dialog.aar-dialog');
  dialog.showModal(); // Opens with native focus trap and backdrop
</script>`}
          />
        </div>
      </div>
    </section>
  );
}

function LayoutDocSection() {
  return (
    <section className="aar-panel aar-stack" data-gap="6">
      <p className="aar-eyebrow">Framework-independent foundations</p>
      <h2 className="aar-heading">Layouts without framework components</h2>
      <p>
        Use ordinary HTML, your own components, or another library. Aar Loom
        supplies spacing, typography, surfaces, responsive compositions, and
        state styling. Headless behavior packages are optional.
      </p>
      <div className="aar-table-scroll">
        <table className="aar-reference-table">
          <thead>
            <tr>
              <th>Composition</th>
              <th>Public classes</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                "Page",
                "aar-site, aar-site-header, aar-site-footer",
                "An application or documentation shell",
              ],
              [
                "Content",
                "aar-container, aar-prose, aar-section",
                "Bounded reading width and vertical rhythm",
              ],
              [
                "Stack / cluster",
                'aar-stack, aar-cluster; data-gap="4"',
                "Related content in a column or wrapping row",
              ],
              [
                "Grid / split",
                'aar-grid data-min="18", aar-split',
                "Collections and supporting work regions",
              ],
              [
                "Guide",
                "aar-guide-shell, aar-guide-sidebar, aar-guide-main",
                "Navigation beside content, stacked on narrow screens",
              ],
              [
                "Code",
                "aar-code, aar-code-toolbar",
                "Scrollable highlighted source with an expandable reading area",
              ],
              [
                "Spacing",
                "aar-p-4, aar-gap-4, aar-mt-6",
                "Spacing scale in quarter-rem steps",
              ],
            ].map(([name, classes, purpose]) => (
              <tr key={name}>
                <th scope="row">{name}</th>
                <td>
                  <code>{classes}</code>
                </td>
                <td>{purpose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="aar-grid" data-min="18">
        <article className="aar-panel aar-stack">
          <h3 className="aar-heading">Main work</h3>
          <p>The strongest region holds the task.</p>
        </article>
        <aside className="aar-panel aar-stack">
          <h3 className="aar-heading">Supporting tools</h3>
          <p>This region stacks naturally when space is limited.</p>
        </aside>
      </div>
      <CodeBlock
        title="Plain HTML layout"
        language="html"
        code={`<main class="aar-root aar-page-reset" data-theme="system">
  <section class="aar-container aar-stack aar-p-4" data-gap="6">
    <h1 class="aar-title">Your application</h1>
    <div class="aar-grid" data-min="18">
      <article class="aar-panel">Main work</article>
      <aside class="aar-panel">Supporting tools</aside>
    </div>
  </section>
</main>`}
      />
      <p className="aar-hint">
        Import @techaaroorian-ui/aar-loom/index.css. No extra layout stylesheet
        is needed. Custom properties are reserved for brand colors and
        content-driven dimensions such as canvas zoom.
      </p>
    </section>
  );
}

function QuickstartDocSection() {
  return (
    <section className="aar-guide-section" id="quickstart">
      <div className="aar-panel">
        <p className="aar-eyebrow">Getting Started / Template</p>
        <h2 className="aar-heading">Complete Starter Template</h2>
        <p className="aar-hint aar-mb-6">
          Copy these complete <code>index.html</code> and{" "}
          <code>styles.css</code> files into any web project.
        </p>

        <CodeBlock title="index.html" language="html" code={quickstartHtml} />
        <div className="aar-mt-6">
          <CodeBlock title="styles.css" language="css" code={quickstartCss} />
        </div>
      </div>
    </section>
  );
}

export interface DocNavItem {
  id: string;
  label: string;
  icon: ReactNode;
  badge?: string;
}

export interface DocNavGroup {
  title: string;
  items: DocNavItem[];
}

// Side Navigation Groupings (Open Source Standards)
const DOC_NAV_GROUPS: DocNavGroup[] = [
  {
    title: "Getting Started",
    items: [
      {
        id: "aar-intro",
        label: "Overview & Install",
        icon: <Rocket size={15} />,
        badge: "Start",
      },
      {
        id: "quickstart",
        label: "Starter Template",
        icon: <FileCode size={15} />,
        badge: "HTML",
      },
    ],
  },
  {
    title: "Design Tokens",
    items: [
      {
        id: "colors",
        label: "Theme & Tokens",
        icon: <Palette size={15} />,
        badge: "Tokens",
      },
    ],
  },
  {
    title: "Core Components",
    items: [
      {
        id: "buttons",
        label: "Buttons & Triggers",
        icon: <Zap size={15} />,
        badge: "CSS",
      },
      {
        id: "inputs",
        label: "Inputs & Form Controls",
        icon: <FormInput size={15} />,
        badge: "Forms",
      },
      {
        id: "selects",
        label: "Selects & Menus",
        icon: <ChevronDown size={15} />,
        badge: "Menus",
      },
      {
        id: "surfaces",
        label: "Cards & Canvas Altar",
        icon: <Layout size={15} />,
        badge: "Cards",
      },
      {
        id: "badges",
        label: "Badges & Runes",
        icon: <Tag size={15} />,
        badge: "Tags",
      },
      {
        id: "dialogs",
        label: "Dialogs & Modals",
        icon: <MessageSquare size={15} />,
        badge: "Modals",
      },
    ],
  },
  {
    title: "UI Patterns",
    items: [
      {
        id: "layout",
        label: "Layout primitives",
        icon: <Layout size={15} />,
        badge: "HTML",
      },
      {
        id: "scale",
        label: "Universal Size Scale",
        icon: <Ruler size={15} />,
        badge: "xs-xl",
      },
      {
        id: "forms",
        label: "Advanced Form Patterns",
        icon: <ClipboardList size={15} />,
        badge: "Demo",
      },
      {
        id: "html-suite",
        label: "Extended UI Suite",
        icon: <Layers size={15} />,
        badge: "Tables/Tabs",
      },
    ],
  },
  {
    title: "Laboratory",
    items: [
      {
        id: "aar-workbench",
        label: "Studio Workbench",
        icon: <FlaskConical size={15} />,
        badge: "Interactive",
      },
      {
        id: "learn",
        label: "Design Lessons",
        icon: <BookOpen size={15} />,
        badge: "Principles",
      },
    ],
  },
  {
    title: "Full View",
    items: [
      {
        id: "all",
        label: "View All Components",
        icon: <Globe size={15} />,
        badge: "Full",
      },
    ],
  },
];

export interface AarLoomDocsProps {
  theme?: string;
  palette?: string;
  onThemeChange?: (theme: string) => void;
  onPaletteChange?: (palette: string) => void;
}

function AarLoomDocs({
  theme: externalTheme,
  palette: externalPalette,
  onThemeChange,
  onPaletteChange,
}: AarLoomDocsProps = {}) {
  const [internalTheme, setInternalTheme] = useState("light");
  const [internalPalette, setInternalPalette] = useState("default");
  const theme = externalTheme ?? internalTheme;
  const palette = externalPalette ?? internalPalette;
  const setTheme = onThemeChange ?? setInternalTheme;
  const setPalette = onPaletteChange ?? setInternalPalette;
  const [density, setDensity] = useState("comfortable");
  const [view, setView] = useState("aar-intro");
  const [navSearch, setNavSearch] = useState("");
  const [primary, setPrimary] = useState("#2458a6");
  const [onPrimary, setOnPrimary] = useState("#ffffff");
  const [compare, setCompare] = useState(false);
  const colors =
    palette === "custom"
      ? ({
          "--aar-primary": primary,
          "--aar-on-primary": onPrimary,
          "--aar-focus": primary,
        } as CSSProperties)
      : undefined;

  // Active section title lookup for breadcrumb
  const allNavItems = DOC_NAV_GROUPS.flatMap((g) => g.items);
  const activeItem = allNavItems.find((i) => i.id === view) || {
    label: "Documentation",
    icon: <Sparkles size={15} />,
  };

  return (
    <div
      className="aar-root aar-page aar-page-body"
      data-theme={theme}
      data-density={density}
      style={colors}
    >
      <section className="aar-container">
        {/* Arcane Atelier Hero Header */}
        <section className="aar-intro">
          <div>
            <div className="aar-wordmark">
              <img
                src={`${import.meta.env.BASE_URL}brand/aar-loom.svg`}
                alt="Aar Loom"
              />
            </div>
            <p className="aar-eyebrow">Aar Loom · Pure CSS Design System</p>
            <h1 className="aar-title">
              The Arcane Atelier.
              <br />
              <span>Precision over ornament.</span>
            </h1>
          </div>
          <div className="aar-intro-copy">
            <p>
              A CSS-only language for creative engineering tools. 1px etched
              hairlines, Light, Dark, and System appearance, corner-bracket
              altars, and honest functional runes.
            </p>
            <p className="aar-hint">
              Zero runtime dependencies. Works with React, Vue, Svelte, or
              static HTML.
            </p>
          </div>
        </section>

        {/* Live Visual Testing Controls */}
        <section
          className="aar-panel aar-control-bar"
          aria-label="Visual testing controls"
        >
          <AarLoomDropdownSelect
            label="Appearance"
            value={theme}
            onChange={(val) => setTheme(val)}
            options={[
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
              { value: "system", label: "System" },
            ]}
          />
          <AarLoomDropdownSelect
            label="Accent"
            value={palette}
            onChange={(val) => setPalette(val)}
            options={[
              { value: "default", label: "Default accent" },
              { value: "custom", label: "Your colors" },
            ]}
          />
          <AarLoomDropdownSelect
            label="Density"
            value={density}
            onChange={(val) => setDensity(val)}
            options={[
              { value: "comfortable", label: "Comfortable" },
              { value: "compact", label: "Compact" },
            ]}
          />
          {palette === "custom" && (
            <>
              <label className="aar-field">
                <span className="aar-field-label">Primary</span>
                <input
                  className="aar-input aar-color-input"
                  type="color"
                  value={primary}
                  onChange={(e) => setPrimary(e.target.value)}
                />
              </label>
              <label className="aar-field">
                <span className="aar-field-label">On primary</span>
                <input
                  className="aar-input aar-color-input"
                  type="color"
                  value={onPrimary}
                  onChange={(e) => setOnPrimary(e.target.value)}
                />
              </label>
            </>
          )}
          <label className="aar-compare-control">
            <input
              type="checkbox"
              checked={compare}
              onChange={(e) => setCompare(e.target.checked)}
            />
            Compare light &amp; dark
          </label>
        </section>
        {palette === "custom" && (
          <p className="aar-hint aar-color-note">
            Choose a readable primary / on-primary pair. Custom colors apply to
            both appearances and are not automatically contrast-safe.
          </p>
        )}

        {/* Documentation Shell: Sticky Side Nav + Main Content */}
        <div className="aar-guide-shell">
          {/* Side Navigation */}
          <aside
            className="aar-guide-sidebar"
            aria-label="Aar Loom Documentation Navigation"
          >
            <div className="aar-guide-sidebar-header">
              <input
                type="search"
                className="aar-input aar-w-100 aar-text-0-875rem aar-h-2-1rem"

                placeholder="Filter components…"
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
              />
            </div>

            <div className="aar-guide-sidebar-content">
              {DOC_NAV_GROUPS.map((group) => {
                const filteredItems = group.items.filter(
                  (item) =>
                    !navSearch ||
                    item.label.toLowerCase().includes(navSearch.toLowerCase()),
                );
                if (filteredItems.length === 0) return null;
                return (
                  <div key={group.title} className="aar-mb-2">
                    <p className="aar-guide-sidebar-group">{group.title}</p>
                    {filteredItems.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className="aar-guide-nav-item"
                        data-active={view === item.id}
                        onClick={() => {
                          setView(item.id);
                          const main = document.getElementById(
                            "aar-docs-main-content",
                          );
                          if (main) {
                            const top =
                              main.getBoundingClientRect().top +
                              window.scrollY -
                              80;
                            window.scrollTo({ top, behavior: "smooth" });
                          }
                        }}
                      >
                        <span className="aar-text-0-95rem aar-w-1-25rem aar-text-align-center aar-display-inline-flex aar-items-center aar-justify-center aar-flex-shrink-0">
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="aar-badge" data-size="xs">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          </aside>

          {/* Main Content Area */}
          <section className="aar-guide-main" id="aar-docs-main-content">
            {/* Breadcrumb Header */}
            <div className="aar-cluster aar-justify-space-between aar-items-center aar-border-bottom-1px-solid-border aar-pb-3">
              <div className="aar-cluster aar-gap-2 aar-text-0-875rem">
                <span className="aar-hint">Aar Loom</span>
                <span className="aar-ink-text-muted">/</span>
                <strong className="aar-ink-primary">{activeItem.label}</strong>
              </div>
              {view !== "all" && (
                <button
                  type="button"
                  className="aar-button aar-text-0-875rem aar-p-0-25rem-0-5rem aar-display-inline-flex aar-items-center aar-gap-2"
                  data-variant="quiet"

                  onClick={() => setView("all")}
                >
                  <Globe size={13} /> View all sections
                </button>
              )}
            </div>

            {/* Light / Dark Dual Realm Comparison Wrapper */}
            <div className={compare ? "aar-comparison" : ""}>
              {(compare ? ["light", "dark"] : [theme]).map((appearance) => (
                <div
                  key={appearance}
                  className="aar-root"
                  data-theme={appearance}
                              data-density={density}
                  style={colors}
                >
                  {compare && (
                    <div className="aar-p-0-5rem-1rem aar-bg-surface-subtle aar-radius-radius-sm aar-mb-4 aar-weight-600 aar-text-0-875rem aar-display-inline-flex aar-items-center aar-gap-2">
                      <Sparkles size={13} /> Appearance Preview:{" "}
                      {appearance.toUpperCase()} / {palette.toUpperCase()}
                    </div>
                  )}

                  {/* Section Views */}
                  {view === "aar-intro" && <IntroDocSection />}
                  {view === "quickstart" && <QuickstartDocSection />}
                  {view === "layout" && <LayoutDocSection />}
                  {view === "buttons" && <ButtonsDocSection />}
                  {view === "inputs" && <InputsDocSection />}
                  {view === "selects" && <SelectsDocSection />}
                  {view === "surfaces" && <SurfacesDocSection />}
                  {view === "badges" && <BadgesDocSection />}
                  {view === "dialogs" && <DialogsDocSection />}
                  {view === "scale" && <SizeScaleSpecimen />}
                  {view === "forms" && <FormVariantsSpecimen />}
                  {view === "html-suite" && <PureHtmlUiSuiteSpecimen />}
                  {view === "colors" && (
                    <PalettesAndColors
                      currentPalette={palette}
                      onSelectPalette={setPalette}
                    />
                  )}
                  {view === "aar-workbench" && <Workbench />}
                  {view === "learn" && (
                    <section className="aar-lessons">
                      {lessons.map(([concept, title, text], index) => (
                        <article className="aar-panel aar-lesson" key={concept}>
                          <span className="aar-lesson-number">
                            0{index + 1}
                          </span>
                          <p className="aar-eyebrow">{concept}</p>
                          <h2 className="aar-heading">{title}</h2>
                          <p>{text}</p>
                        </article>
                      ))}
                    </section>
                  )}

                  {/* All Sections Sequentially */}
                  {view === "all" && (
                    <div className="aar-stack" data-gap="4">
                      <IntroDocSection />
                      <QuickstartDocSection />
                      <ButtonsDocSection />
                      <InputsDocSection />
                      <SelectsDocSection />
                      <SurfacesDocSection />
                      <BadgesDocSection />
                      <DialogsDocSection />
                      <SizeScaleSpecimen />
                      <FormVariantsSpecimen />
                      <PureHtmlUiSuiteSpecimen />
                      <PalettesAndColors
                        currentPalette={palette}
                        onSelectPalette={setPalette}
                      />
                      <Workbench />
                      <section className="aar-lessons">
                        {lessons.map(([concept, title, text], index) => (
                          <article
                            className="aar-panel aar-lesson"
                            key={concept}
                          >
                            <span className="aar-lesson-number">
                              0{index + 1}
                            </span>
                            <p className="aar-eyebrow">{concept}</p>
                            <h2 className="aar-heading">{title}</h2>
                            <p>{text}</p>
                          </article>
                        ))}
                      </section>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Quality Review Guidelines */}
        <section className="aar-review aar-mt-12">
          <div>
            <p className="aar-eyebrow">Quality Criteria</p>
            <h2 className="aar-heading">Test the rules, then the details.</h2>
          </div>
          <ol>
            <li>
              <b>Hierarchy</b> — Can you identify the main action at a glance?
            </li>
            <li>
              <b>Theme</b> — Compare surfaces, text, and controls in both
              appearances.
            </li>
            <li>
              <b>Interaction</b> — Tab through controls; inspect focus, hover,
              pressed, and disabled.
            </li>
            <li>
              <b>Resilience</b> — Resize to mobile, zoom to 200%, and try longer
              text.
            </li>
          </ol>
        </section>

        <footer className="aar-lab-footer">
          <span>Aar Loom / Pure CSS Open Source Design System</span>
          <span>
            Zero runtime dependencies · MIT License · Machine-Readable HTML
          </span>
        </footer>
      </section>
    </div>
  );
}
export default AarLoomDocs;
