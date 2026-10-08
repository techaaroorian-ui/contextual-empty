import { useState } from "react";
import type { ReactNode } from "react";
import CodeBlock from "./CodeBlock";
import ExampleSetup from "./ExampleSetup";
import PanZoomExample from "./PanZoomExample";
import OrderedCollectionExample from "./OrderedCollectionExample";
import ContextualEmptyExample from "./ContextualEmptyExample";
import FileIntakeExample from "./FileIntakeExample";

import panZoomSource from "./PanZoomExample.tsx?raw";
import orderedSource from "./OrderedCollectionExample.tsx?raw";
import contextualSource from "./ContextualEmptyExample.tsx?raw";
import fileSource from "./FileIntakeExample.tsx?raw";

import {
  Sparkles,
  Layers,
  Move,
  FolderArchive,
  UploadCloud,
  FileCode,
  Globe,
  Search,
  TriangleAlert,
  ShieldAlert,
  Filter,
  Plus,
  BookOpen,
  Cpu,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
  badge?: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const HEADLESS_NAV_GROUPS: NavGroup[] = [
  {
    title: "Getting Started",
    items: [
      {
        id: "overview",
        label: "Architecture & Engine Cores",
        icon: <BookOpen size={15} />,
      },
      {
        id: "quickstart",
        label: "Installation & Setup",
        icon: <FileCode size={15} />,
      },
    ],
  },
  {
    title: "Studio Engines",
    items: [
      {
        id: "contextual-empty",
        label: "Contextual Empty",
        icon: <FolderArchive size={15} />,
        badge: "States",
      },
      {
        id: "pan-zoom",
        label: "Pan & Zoom Math",
        icon: <Move size={15} />,
        badge: "Viewport",
      },
      {
        id: "ordered-collection",
        label: "Ordered Collection",
        icon: <Layers size={15} />,
        badge: "Sequence",
      },
      {
        id: "file-intake",
        label: "File Intake",
        icon: <UploadCloud size={15} />,
        badge: "Atomic",
      },
    ],
  },
];

/* --- Section Components --- */

function OverviewSection() {
  return (
    <section className="aar-guide-section" id="overview">
      <div className="aar-panel">
        <p className="aar-eyebrow">Headless Philosophy / 01</p>
        <h2 className="aar-heading">Decoupled Studio Engines</h2>
        <p className="aar-hint aar-mb-6">
          Pure mathematical models, deterministic state machines, and viewport
          positioning engines extracted from high-scale creative workflows like{" "}
          <strong>Yuwbrndr</strong>.
        </p>

        <div className="aar-card-grid aar-grid-template-columns-repeat-auto-fit-minmax-240px-1fr aar-gap-4 aar-mb-7">
          <div className="aar-card aar-p-5">
            <div className="aar-cluster aar-gap-2 aar-mb-2">
              <span className="aar-ink-primary">
                <Cpu size={18} />
              </span>
              <strong className="aar-text-0-9375rem">Zero-CSS Guarantee</strong>
            </div>
            <p className="aar-hint aar-text-0-875rem aar-m-0px">
              Zero styling lock-in. Compatible with Aar Loom, Tailwind, Vanilla
              CSS, or internal corporate design systems.
            </p>
          </div>

          <div className="aar-card aar-p-5">
            <div className="aar-cluster aar-gap-2 aar-mb-2">
              <span className="aar-ink-primary">
                <Zap size={18} />
              </span>
              <strong className="aar-text-0-9375rem">
                Pure Math &amp; State
              </strong>
            </div>
            <p className="aar-hint aar-text-0-875rem aar-m-0px">
              Calculations run in plain TypeScript. Zero framework bloat,
              instant reactivity, and seamless Web Worker offloading.
            </p>
          </div>

          <div className="aar-card aar-p-5">
            <div className="aar-cluster aar-gap-2 aar-mb-2">
              <span className="aar-ink-primary">
                <ShieldCheck size={18} />
              </span>
              <strong className="aar-text-0-9375rem">
                A11y &amp; Standards
              </strong>
            </div>
            <p className="aar-hint aar-text-0-875rem aar-m-0px">
              Built strictly on WAI-ARIA authoring practices, native HTML5 APIs,
              keyboard focus rings, and screen-reader announcements.
            </p>
          </div>
        </div>

        <h3 className="aar-heading aar-text-1-125rem aar-mb-3">
          Studio Engines Matrix
        </h3>
        <div className="aar-table-scroll">
          <table className="aar-reference-table">
            <thead>
              <tr>
                <th>Package</th>
                <th>Category</th>
                <th>Core Export</th>
                <th>Primary Role</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>@techaaroorian-ui/contextual-empty</code>
                </td>
                <td>
                  <span
                    className="aar-badge"
                    data-size="xs"
                    data-variant="primary"
                  >
                    Feedback
                  </span>
                </td>
                <td>
                  <code>ContextualEmptyState, Presets</code>
                </td>
                <td>
                  Actionable recovery states for dormant stages, search voids,
                  and transmutation rifts
                </td>
              </tr>
              <tr>
                <td>
                  <code>@techaaroorian-ui/pan-zoom</code>
                </td>
                <td>
                  <span
                    className="aar-badge"
                    data-size="xs"
                    data-variant="primary"
                  >
                    Viewport
                  </span>
                </td>
                <td>
                  <code>usePanZoom, calculateFit</code>
                </td>
                <td>
                  Virtual canvas transforms, auto-fit centering &amp; zoom
                  stepping
                </td>
              </tr>
              <tr>
                <td>
                  <code>@techaaroorian-ui/ordered-collection</code>
                </td>
                <td>
                  <span className="aar-badge" data-size="xs">
                    Sequence
                  </span>
                </td>
                <td>
                  <code>useOrderedCollection</code>
                </td>
                <td>
                  Deterministic layer/slide reordering, insertion, and boundary
                  clamping
                </td>
              </tr>
              <tr>
                <td>
                  <code>@techaaroorian-ui/file-intake</code>
                </td>
                <td>
                  <span className="aar-badge" data-size="xs">
                    Intake
                  </span>
                </td>
                <td>
                  <code>useFileIntake</code>
                </td>
                <td>
                  Atomic batch validation of files prior to object URL
                  allocation
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function QuickstartSection() {
  return (
    <section className="aar-guide-section" id="quickstart">
      <ExampleSetup />
    </section>
  );
}

function ContextualEmptySection() {
  return (
    <section className="aar-guide-section" id="contextual-empty">
      <div className="aar-panel">
        <div className="aar-cluster aar-justify-space-between aar-items-baseline">
          <div>
            <p className="aar-eyebrow">Studio Engine / 01</p>
            <h2 className="aar-heading">Contextual Empty States</h2>
          </div>
          <span className="aar-badge" data-variant="primary">
            Composable Primitives
          </span>
        </div>
        <code>@techaaroorian-ui/contextual-empty</code>
        <p className="aar-hint aar-mt-2 aar-mb-5">
          Never leave users at a dead-end. Guide creators through dormant canvas
          stages, search voids, and transmutation errors with clear, actionable
          next steps:
        </p>

        <div className="aar-specimen-box">
          <div className="aar-specimen-preview aar-p-4">
            <ContextualEmptyExample />
          </div>
          <CodeBlock
            title="ContextualEmptyExample.tsx"
            code={contextualSource}
          />
        </div>

        <h3 className="aar-heading aar-text-1rem aar-mt-6 aar-mb-3">
          Presets Matrix
        </h3>
        <div className="aar-table-scroll">
          <table className="aar-reference-table">
            <thead>
              <tr>
                <th>Preset Component</th>
                <th>Studio Metaphor</th>
                <th>Trigger Condition</th>
                <th>Primary Callback</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>FirstUseEmpty</code>
                </td>
                <td>
                  <span className="aar-cluster aar-gap-2">
                    <Plus size={14} className="aar-ink-primary" />
                    <strong>Dormant Stage</strong>
                  </span>
                </td>
                <td>No artboards or layers created yet in project</td>
                <td>
                  <code>onCreate</code>
                </td>
              </tr>
              <tr>
                <td>
                  <code>SearchEmpty</code>
                </td>
                <td>
                  <span className="aar-cluster aar-gap-2">
                    <Search size={14} className="aar-ink-primary" />
                    <strong>Search Void</strong>
                  </span>
                </td>
                <td>No matching assets or syntax in repository</td>
                <td>
                  <code>onClear</code>
                </td>
              </tr>
              <tr>
                <td>
                  <code>FilterEmpty</code>
                </td>
                <td>
                  <span className="aar-cluster aar-gap-2">
                    <Filter size={14} className="aar-ink-primary" />
                    <strong>Filter Isolation</strong>
                  </span>
                </td>
                <td>Active tag filters yield zero results</td>
                <td>
                  <code>onClearFilters</code>
                </td>
              </tr>
              <tr>
                <td>
                  <code>PermissionEmpty</code>
                </td>
                <td>
                  <span className="aar-cluster aar-gap-2">
                    <ShieldAlert size={14} className="aar-ink-primary" />
                    <strong>Restricted Sanctum</strong>
                  </span>
                </td>
                <td>Workspace requires elevated access level</td>
                <td>
                  <code>onRequestAccess</code>
                </td>
              </tr>
              <tr>
                <td>
                  <code>ErrorEmpty</code>
                </td>
                <td>
                  <span className="aar-cluster aar-gap-2">
                    <TriangleAlert size={14} className="aar-ink-primary" />
                    <strong>Rift Warning</strong>
                  </span>
                </td>
                <td>Reactive compilation or asset export failure</td>
                <td>
                  <code>onRetry</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="aar-heading aar-text-1rem aar-mt-6 aar-mb-3">
          Compound Customization
        </h3>
        <CodeBlock
          title="Compound Altar Custom Empty State"
          language="tsx"
          code={`import { ContextualEmptyState } from '@techaaroorian-ui/contextual-empty'
import { Sparkles } from 'lucide-react'

export function CustomEmptyAltar({ onIgnite }: { onIgnite: () => void }) {
  return (
    <ContextualEmptyState className="aar-contextual-empty" type="first-use">
      <ContextualEmptyState.Icon>
        <Sparkles size={32} color="var(--aar-primary)" aria-hidden="true" />
      </ContextualEmptyState.Icon>
      <ContextualEmptyState.Content>
        <h3>The Canvas Altar is Dormant</h3>
        <p>Select a starter preset or begin typing code to ignite the canvas.</p>
      </ContextualEmptyState.Content>
      <ContextualEmptyState.Actions>
        <button className="aar-button" data-variant="primary" onClick={onIgnite}>
          Ignite Starter Preset
        </button>
      </ContextualEmptyState.Actions>
    </ContextualEmptyState>
  )
}`}
        />
      </div>
    </section>
  );
}

function PanZoomSection() {
  return (
    <section className="aar-guide-section" id="pan-zoom">
      <div className="aar-panel">
        <div className="aar-cluster aar-justify-space-between aar-items-baseline">
          <div>
            <p className="aar-eyebrow">Studio Engine / 02</p>
            <h2 className="aar-heading">Pan &amp; Zoom Engine</h2>
          </div>
          <span className="aar-badge" data-variant="primary">
            Viewport Math
          </span>
        </div>
        <code>@techaaroorian-ui/pan-zoom</code>
        <p className="aar-hint aar-mt-2 aar-mb-5">
          Calculates infinite canvas coordinates, boundary constraints, and zoom
          stepping for creative studios. Recalculates viewport bounds
          dynamically via <code>ResizeObserver</code>:
        </p>

        <div className="aar-specimen-box">
          <div className="aar-specimen-preview aar-p-4">
            <PanZoomExample />
          </div>
          <CodeBlock title="PanZoomExample.tsx" code={panZoomSource} />
        </div>

        <h3 className="aar-heading aar-text-1rem aar-mt-6 aar-mb-3">
          API Reference
        </h3>
        <div className="aar-table-scroll">
          <table className="aar-reference-table">
            <thead>
              <tr>
                <th>Function / Hook</th>
                <th>Parameters</th>
                <th>Return Value</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>calculateFit</code>
                </td>
                <td>
                  <code>containerSize, contentSize, maxScale = 1</code>
                </td>
                <td>
                  <code>{`{ scale, x, y }`}</code>
                </td>
                <td>
                  Computes centered uniform aspect fit for any rectangular
                  canvas.
                </td>
              </tr>
              <tr>
                <td>
                  <code>clampZoom</code>
                </td>
                <td>
                  <code>scale, minScale = 0.1, maxScale = 5.0</code>
                </td>
                <td>
                  <code>number</code>
                </td>
                <td>
                  Restricts zoom multiplication factors within precision limits.
                </td>
              </tr>
              <tr>
                <td>
                  <code>usePanZoom</code>
                </td>
                <td>
                  <code>containerRef, contentSize, options</code>
                </td>
                <td>
                  <code>{`{ transform, zoomIn, zoomOut, reset, setPan }`}</code>
                </td>
                <td>
                  Full reactive hook with resize monitoring and gesture
                  coordination.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function OrderedCollectionSection() {
  return (
    <section className="aar-guide-section" id="ordered-collection">
      <div className="aar-panel">
        <div className="aar-cluster aar-justify-space-between aar-items-baseline">
          <div>
            <p className="aar-eyebrow">Studio Engine / 03</p>
            <h2 className="aar-heading">
              Ordered Collection (Slide &amp; Layer Grimoire)
            </h2>
          </div>
          <span className="aar-badge">Sequence Engine</span>
        </div>
        <code>@techaaroorian-ui/ordered-collection</code>
        <p className="aar-hint aar-mt-2 aar-mb-5">
          Deterministic state machine for multi-slide presentations, canvas
          layers, and undoable timelines. Handles selection, insertion, move
          reordering, and boundary clamping:
        </p>

        <div className="aar-specimen-box">
          <div className="aar-specimen-preview aar-p-4">
            <OrderedCollectionExample />
          </div>
          <CodeBlock
            title="OrderedCollectionExample.tsx"
            code={orderedSource}
          />
        </div>
      </div>
    </section>
  );
}

function FileIntakeSection() {
  return (
    <section className="aar-guide-section" id="file-intake">
      <div className="aar-panel">
        <div className="aar-cluster aar-justify-space-between aar-items-baseline">
          <div>
            <p className="aar-eyebrow">Studio Engine / 04</p>
            <h2 className="aar-heading">Asset Intake Gate (File Intake)</h2>
          </div>
          <span className="aar-badge">Batch Validation</span>
        </div>
        <code>@techaaroorian-ui/file-intake</code>
        <p className="aar-hint aar-mt-2 aar-mb-5">
          Validates batches of images or creative assets atomically before
          allocating object URLs or GPU memory. Rejects corrupted files or quota
          overflows before resource allocation:
        </p>

        <div className="aar-specimen-box">
          <div className="aar-specimen-preview aar-p-4">
            <FileIntakeExample />
          </div>
          <CodeBlock title="FileIntakeExample.tsx" code={fileSource} />
        </div>
      </div>
    </section>
  );
}

/* --- Main Export Component --- */

interface HeadlessGuideProps {
  initialSection?: string;
}

export default function HeadlessGuide({
  initialSection = "overview",
}: HeadlessGuideProps) {
  const [view, setView] = useState(initialSection);
  const [prevInitial, setPrevInitial] = useState(initialSection);
  const [navSearch, setNavSearch] = useState("");

  if (initialSection !== prevInitial) {
    setPrevInitial(initialSection);
    setView(initialSection);
  }

  // Active section title lookup for breadcrumb
  const allNavItems = HEADLESS_NAV_GROUPS.flatMap((g) => g.items);
  const activeItem = allNavItems.find((i) => i.id === view) || {
    label: "Headless Engines",
    icon: <Sparkles size={15} />,
  };

  return (
    <section className="aar-container aar-content">
      {/* Hero Header */}
      <div className="aar-intro">
        <div>
          <p className="aar-eyebrow">Studio Primitives · Headless Packages</p>
          <h1 className="aar-title">Headless Studio Engines</h1>
        </div>
        <div className="aar-intro-copy">
          <p>
            Pure mathematical models, reactive state machines, and viewport
            positioning engines extracted from production studio workflows like{" "}
            <strong>Yuwbrndr</strong>.
          </p>
          <p className="aar-hint">
            Framework-independent cores, optional React 18/19 hooks, and
            complete, copyable specimens with zero styling lock-in.
          </p>
        </div>
      </div>

      {/* Documentation Shell: Sticky Side Nav + Main Content */}
      <div className="aar-guide-shell">
        {/* Side Navigation */}
        <aside
          className="aar-guide-sidebar"
          aria-label="Headless Documentation Navigation"
        >
          <div className="aar-guide-sidebar-header">
            <input
              type="search"
              className="aar-input aar-w-100 aar-text-0-875rem aar-h-2-1rem"

              placeholder="Filter engines…"
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
            />
          </div>

          <div className="aar-guide-sidebar-content">
            {HEADLESS_NAV_GROUPS.map((group) => {
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
          <div className="aar-cluster aar-justify-space-between aar-items-center aar-border-bottom-1px-solid-border aar-pb-3 aar-mb-6">
            <div className="aar-cluster aar-gap-2 aar-text-0-875rem">
              <span className="aar-hint">Headless</span>
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
                <Globe size={13} /> View all engines
              </button>
            )}
          </div>

          {/* Views */}
          {view === "overview" && <OverviewSection />}
          {view === "quickstart" && <QuickstartSection />}
          {view === "contextual-empty" && <ContextualEmptySection />}
          {view === "pan-zoom" && <PanZoomSection />}
          {view === "ordered-collection" && <OrderedCollectionSection />}
          {view === "file-intake" && <FileIntakeSection />}

          {/* Sequential All Views */}
          {view === "all" && (
            <div className="aar-stack" data-gap="4">
              <OverviewSection />
              <QuickstartSection />
              <ContextualEmptySection />
              <PanZoomSection />
              <OrderedCollectionSection />
              <FileIntakeSection />
            </div>
          )}
        </section>
      </div>

      {/* Architectural Independence Footer Panel */}
      <section className="aar-panel aar-section aar-mt-10">
        <h2 className="aar-heading">
          Zero-CSS Architecture &amp; Framework Decoupling
        </h2>
        <p>
          These packages ship <strong>zero CSS</strong> and do not depend on Aar
          Loom, Tailwind, or any design system. You can pair them with Aar Loom,
          your existing design system, or raw inline styles.
        </p>
        <p className="aar-hint">
          All packages run completely headless with pure state machines and
          mathematical models, making them rock-solid across web workers,
          Node.js scripts, and modern browser viewports.
        </p>
      </section>
    </section>
  );
}
