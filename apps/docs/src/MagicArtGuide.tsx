import { useState } from 'react'
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
} from 'lucide-react'
import AarSelect from './AarSelect'
import { sparkMagicStars } from './magic-spark'
import CodeBlock from './CodeBlock'

export default function MagicArtGuide() {
  // Spark controls
  const [sparkCount, setSparkCount] = useState(8)
  const [sparkColor, setSparkColor] = useState('var(--aar-primary)')
  const [lastSparkMsg, setLastSparkMsg] = useState('Click any button below to trigger subtle particle sparks')

  // Sidebar controls
  const [sidebarMode, setSidebarMode] = useState<'expanded' | 'rail' | 'closed'>('expanded')
  const [activeTab, setActiveTab] = useState('dashboard')

  // Dropdown option controls
  const [selectedPreset, setSelectedPreset] = useState('aurora')

  // Modal & Sheet controls
  const [modalOpen, setModalOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [waveKey, setWaveKey] = useState(0)

  const triggerSpark = (e: React.MouseEvent<HTMLButtonElement>, customColor?: string) => {
    const color = customColor || sparkColor
    sparkMagicStars(e, {
      count: sparkCount,
      color: color === 'multi' ? undefined : color,
      colors: color === 'multi' ? ['#a78bfa', '#34d399', '#f59e0b', '#ec4899', '#60a5fa'] : undefined,
    })
    setLastSparkMsg(`Triggered tactile micro-sparks with ${color === 'multi' ? 'multi-color spectrum' : color}!`)
  }

  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    triggerSpark(e)
    setWaveKey((k) => k + 1)
    setModalOpen(true)
  }

  return (
    <section className="lab-content package-docs">
      {/* Eyebrow & Intro */}
      <div className="package-setup">
        <p className="aar-eyebrow">Aar Craft · Micro-interaction &amp; Wave Mechanics</p>
        <h1 className="aar-title">Magic-Art: Frosted Glass &amp; Perimeter Wave Reveal</h1>
        <p
          className="aar-subtitle"
          style={{
            fontSize: '1.25rem',
            color: 'var(--aar-text-muted)',
            fontStyle: 'italic',
            margin: '0.5rem 0 1rem',
          }}
        >
          &ldquo;Semi-transparent frosted glass on open. Radiating perimeter waves that expand and dissolve.&rdquo;
        </p>
        <p>
          In <strong>Aar Craft</strong>, standard applications maintain a clean, solid, distraction-free aesthetic.
          When you enable <strong>Magic-Art</strong>, reveals gain an ethereal dimension:
        </p>
        <ul style={{ margin: '0.5rem 0 1rem 1.25rem', color: 'var(--aar-text-muted)', lineHeight: 1.7 }}>
          <li>
            <strong>Semi-transparent frosted glass surface</strong> (<code>backdrop-filter: blur(24px)</code>, 76% translucency).
          </li>
          <li>
            <strong>Perimeter Expanding Wave</strong>: The moment the modal opens, a luminous energy ripple{' '}
            <strong>originates directly from the modal's border</strong>, expands outward into the backdrop, and smoothly dissolves.
          </li>
          <li>
            <strong>Fluid frosted sidebar reveal</strong> with clean, contextual icons and border illumination.
          </li>
        </ul>
      </div>

      {/* Lab 1: Semi-Transparent Modal with Expanding Border Wave */}
      <div className="package-setup" style={{ marginTop: '2.5rem' }}>
        <h2 className="aar-heading">1. Modal Reveal: Frosted Glass &amp; Expanding Border Wave</h2>
        <p>
          Click below to open the modal. Notice how the semi-transparent frosted glass blooms into view, while an{' '}
          <strong>expanding ripple wave erupts directly from the border of the modal</strong>, travels outward, and dissolves.
        </p>

        <div
          className="aar-panel"
          style={{
            marginTop: '1rem',
            border: '1px solid var(--aar-border-strong)',
            background: 'var(--aar-surface-raised)',
          }}
        >
          <div className="aar-cluster" style={{ justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div className="aar-cluster" style={{ gap: '0.5rem' }}>
              <Layers size={18} style={{ color: 'var(--aar-primary)' }} />
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Interactive Modal Wave Specimen</h3>
            </div>
            <span className="aar-badge" data-tone="success">Perimeter Wave + 24px Glass</span>
          </div>

          <div className="aar-cluster" style={{ gap: '1rem' }}>
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
                triggerSpark(e)
                setSheetOpen(true)
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
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
            }}
          >
            {/* Backdrop */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at center, rgba(15, 17, 26, 0.68) 0%, rgba(5, 7, 12, 0.85) 100%)',
                backdropFilter: 'blur(10px) saturate(130%)',
                WebkitBackdropFilter: 'blur(10px) saturate(130%)',
              }}
              onClick={() => setModalOpen(false)}
            />

            {/* Modal Surface with Border Wave */}
            <div
              className="aar-dialog"
              data-magic-art="true"
              style={{
                position: 'relative',
                overflow: 'visible',
                zIndex: 1001,
                width: 'min(32rem, 100%)',
                animation: 'aar-magic-modal-bloom 340ms cubic-bezier(.16, 1, .3, 1) both',
              }}
            >
              {/* Concentric wave rings that expand outward from the border and dissolve */}
              <div className="aar-modal-wave-ring" key={`w1-${waveKey}`} aria-hidden="true" />
              <div className="aar-modal-wave-ring-secondary" key={`w2-${waveKey}`} aria-hidden="true" />
              <div className="aar-modal-wave-ring-tertiary" key={`w3-${waveKey}`} aria-hidden="true" />

              <div className="aar-cluster" style={{ justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div className="aar-cluster" style={{ gap: '0.5rem' }}>
                  <Layers size={18} style={{ color: 'var(--aar-primary)' }} />
                  <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Deployment Preferences</h3>
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

              <div
                style={{
                  padding: '0.75rem 1rem',
                  marginBottom: '1rem',
                  background: 'color-mix(in srgb, var(--aar-primary) 12%, transparent)',
                  borderRadius: 'var(--aar-radius-sm)',
                  border: '1px solid color-mix(in srgb, var(--aar-primary) 30%, transparent)',
                }}
              >
                <div className="aar-cluster" style={{ gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <Zap size={15} style={{ color: 'var(--aar-primary)' }} />
                  <strong style={{ fontSize: '0.85rem' }}>Perimeter Border Waves Active</strong>
                </div>
                <p style={{ margin: 0, color: 'var(--aar-text-muted)', fontSize: '0.8125rem' }}>
                  Luminous concentric waves originate directly from the border of this modal, expand 50px&ndash;100px outward, and dissolve into the backdrop.
                </p>
              </div>

              <div className="aar-stack" data-gap="3" style={{ marginBottom: '1.5rem' }}>
                <label className="aar-field">
                  <span>Target Environment</span>
                  <input className="aar-input" defaultValue="production-us-east" />
                </label>
                <label className="aar-field">
                  <span>Replication Level</span>
                  <select className="aar-input" defaultValue="high">
                    <option value="high">High Availability (3 Zones)</option>
                    <option value="single">Single Zone Studio</option>
                  </select>
                </label>
              </div>

              <div className="aar-cluster" style={{ justifyContent: 'space-between' }}>
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

                <div className="aar-cluster" style={{ gap: '0.75rem' }}>
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
                      triggerSpark(e)
                      setModalOpen(false)
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
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            {/* Backdrop */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.65)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
              onClick={() => setSheetOpen(false)}
            />

            {/* Sheet Surface */}
            <div
              className="aar-dialog"
              data-magic-art="true"
              data-placement="end"
              style={{
                position: 'relative',
                zIndex: 1001,
                width: 'min(26rem, 100%)',
                height: '100dvh',
                borderRadius: 0,
                animation: 'aar-magic-sheet-slide-end 340ms cubic-bezier(.16, 1, .3, 1) both',
              }}
            >
              <div className="aar-cluster" style={{ justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div className="aar-cluster" style={{ gap: '0.5rem' }}>
                  <Sliders size={18} style={{ color: 'var(--aar-primary)' }} />
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>System Inspection</h3>
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

              <p style={{ fontSize: '0.875rem', color: 'var(--aar-text-muted)' }}>
                Slide sheet renders as full-height frosted glass depth with a crisp luminous left edge.
              </p>

              <div className="aar-stack" data-gap="3" style={{ marginTop: '1.5rem' }}>
                <div className="aar-panel" style={{ background: 'color-mix(in srgb, var(--aar-surface) 50%, transparent)' }}>
                  <span className="aar-eyebrow">Glass Translucency</span>
                  <p style={{ margin: '0.25rem 0 0', fontWeight: 600 }}>76% Translucent Surface</p>
                </div>
                <div className="aar-panel" style={{ background: 'color-mix(in srgb, var(--aar-surface) 50%, transparent)' }}>
                  <span className="aar-eyebrow">Blur Filter</span>
                  <p style={{ margin: '0.25rem 0 0', fontWeight: 600 }}>24px Backdrop Blur</p>
                </div>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
                <button
                  type="button"
                  className="aar-button"
                  data-variant="primary"
                  style={{ width: '100%' }}
                  onClick={(e) => {
                    triggerSpark(e)
                    setSheetOpen(false)
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
      <div className="package-setup" style={{ marginTop: '3rem' }}>
        <h2 className="aar-heading">2. Frosted Glass Sidebar with Border Wave</h2>
        <p>
          While opening, the sidebar slides out with a <strong>semi-transparent frosted glass surface</strong>{' '}
          (<code>backdrop-filter: blur(16px)</code>), revealing content beneath it and casting a glowing boundary beam.
        </p>

        <div
          className="aar-panel"
          data-magic-art="true"
          style={{
            marginTop: '1rem',
            padding: 0,
            overflow: 'hidden',
            border: '1px solid var(--aar-border-strong)',
            borderRadius: 'var(--aar-radius-lg)',
            minHeight: '380px',
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(135deg, var(--aar-background) 0%, color-mix(in srgb, var(--aar-primary) 14%, var(--aar-background)) 100%)',
          }}
        >
          {/* Header */}
          <div className="aar-workspace-header" style={{ padding: '0.625rem 1rem' }}>
            <div className="aar-cluster" style={{ gap: '0.75rem' }}>
              <button
                type="button"
                className="aar-sidebar-toggle"
                onClick={() =>
                  setSidebarMode(
                    sidebarMode === 'expanded' ? 'rail' : sidebarMode === 'rail' ? 'closed' : 'expanded'
                  )
                }
                aria-label="Toggle sidebar width"
                title="Toggle sidebar mode"
              >
                <span className="aar-sidebar-toggle-icon" aria-hidden="true">
                  {sidebarMode === 'expanded' ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
                </span>
              </button>
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                Sidebar Mode: <code style={{ color: 'var(--aar-primary)' }}>{sidebarMode}</code>
              </span>
            </div>

            <div className="aar-cluster" style={{ gap: '0.5rem' }}>
              <button
                type="button"
                className="aar-button"
                data-variant={sidebarMode === 'expanded' ? 'primary' : 'quiet'}
                onClick={() => setSidebarMode('expanded')}
              >
                Expanded (16rem)
              </button>
              <button
                type="button"
                className="aar-button"
                data-variant={sidebarMode === 'rail' ? 'primary' : 'quiet'}
                onClick={() => setSidebarMode('rail')}
              >
                Rail (4.25rem)
              </button>
              <button
                type="button"
                className="aar-button"
                data-variant={sidebarMode === 'closed' ? 'primary' : 'quiet'}
                onClick={() => setSidebarMode('closed')}
              >
                Closed (0rem)
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="aar-workspace-body" style={{ flex: 1, minHeight: '300px' }}>
            <aside
              className="aar-sidebar"
              data-collapsed={sidebarMode === 'rail' ? 'rail' : sidebarMode === 'closed' ? 'closed' : 'false'}
              style={{
                width: sidebarMode === 'expanded' ? '14rem' : sidebarMode === 'rail' ? '4.25rem' : '0px',
                minWidth: sidebarMode === 'expanded' ? '14rem' : sidebarMode === 'rail' ? '4.25rem' : '0px',
              }}
            >
              <div className="aar-sidebar-nav">
                {[
                  { id: 'dashboard', icon: <LayoutDashboard size={17} />, label: 'Dashboard' },
                  { id: 'workflows', icon: <Sliders size={17} />, label: 'Workflows' },
                  { id: 'projects', icon: <FolderKanban size={17} />, label: 'Projects' },
                  { id: 'settings', icon: <Settings size={17} />, label: 'Settings' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="aar-sidebar-item"
                    data-active={activeTab === item.id ? 'true' : 'false'}
                    onClick={(e) => {
                      setActiveTab(item.id)
                      triggerSpark(e)
                    }}
                  >
                    <span className="aar-sidebar-icon" aria-hidden="true">{item.icon}</span>
                    <span className="aar-sidebar-label">{item.label}</span>
                  </button>
                ))}
              </div>

              <div className="aar-sidebar-footer">
                <span className="aar-hint" style={{ fontSize: '0.75rem', width: '100%', textAlign: 'center' }}>
                  {sidebarMode === 'expanded' ? 'Frosted Translucent Rail' : <Settings size={15} />}
                </span>
              </div>
            </aside>

            {/* Main view in demo */}
            <main className="aar-workspace-main" style={{ padding: '1.5rem', background: 'transparent' }}>
              <div style={{ padding: '1.25rem', background: 'var(--aar-surface)', borderRadius: 'var(--aar-radius-md)', border: '1px solid var(--aar-border)' }}>
                <h3 style={{ margin: 0 }}>Active Section: {activeTab.toUpperCase()}</h3>
                <p className="aar-hint" style={{ margin: '0.5rem 0' }}>
                  Notice the rich <strong>semi-transparent frosted glass backdrop</strong> of the sidebar as it smoothly slides
                  over the background canvas, complete with luminous edge shimmer!
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
            </main>
          </div>
        </div>
      </div>

      {/* Lab 3: Tactile Button Sparks */}
      <div className="package-setup" style={{ marginTop: '3rem' }}>
        <h2 className="aar-heading">3. Tactile Button Click Feedback</h2>
        <p>
          On button clicks, subtle particle bursts radiate outward from the pointer origin, giving tactile confirmation.
        </p>

        <div
          className="aar-panel"
          style={{
            marginTop: '1rem',
            border: '1px solid var(--aar-border-strong)',
            background: 'var(--aar-surface-raised)',
          }}
        >
          <div className="aar-cluster" style={{ justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span className="aar-badge" data-variant="primary">Configurable Sparks</span>
            <span className="aar-hint">{lastSparkMsg}</span>
          </div>

          <div
            className="aar-cluster"
            style={{
              gap: '1.25rem',
              padding: '0.75rem',
              background: 'var(--aar-surface-subtle)',
              borderRadius: 'var(--aar-radius-sm)',
              marginBottom: '1.25rem',
            }}
          >
            <label className="aar-field" style={{ margin: 0, minWidth: '120px' }}>
              <span>Particle Count: <strong>{sparkCount}</strong></span>
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
                { value: 'var(--aar-primary)', label: 'Theme Primary' },
                { value: '#34d399', label: 'Emerald Jade' },
                { value: '#f59e0b', label: 'Radiant Amber' },
                { value: '#ec4899', label: 'Rose Quartz' },
                { value: 'multi', label: 'Rainbow Spectrum' },
              ]}
            />
          </div>

          <div className="aar-cluster" style={{ gap: '1rem' }}>
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
              onClick={(e) => triggerSpark(e, '#f87171')}
            >
              <span>Destructive Spark</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lab 4: Option & Dropdown Cascading Animation */}
      <div className="package-setup" style={{ marginTop: '3rem' }}>
        <h2 className="aar-heading">4. Option &amp; Dropdown Cascading Animation</h2>
        <p>
          Dropdown menus and custom selects emerge with a gentle upward drift, spring scale, and semi-transparent frosted glass menu.
          Options cascade in with staggered 20ms delays, and hover states project a soft luminous highlight.
        </p>

        <div
          className="aar-panel aar-magic-options"
          data-magic-art="true"
          style={{
            marginTop: '1rem',
            border: '1px solid var(--aar-border-strong)',
            background: 'var(--aar-surface-raised)',
          }}
        >
          <div className="aar-cluster" style={{ justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div className="aar-cluster" style={{ gap: '0.5rem' }}>
              <Palette size={18} style={{ color: 'var(--aar-primary)' }} />
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Cascading Select Specimen</h3>
                <p className="aar-hint" style={{ margin: '0.25rem 0 0' }}>
                  Open the dropdown below to experience the staggered arrival with frosted glass menu depth.
                </p>
              </div>
            </div>
            <span className="aar-badge" data-tone="success">Selected: {selectedPreset}</span>
          </div>

          <div style={{ maxWidth: '280px' }}>
            <AarSelect
              label="Cluster Preset"
              value={selectedPreset}
              onChange={setSelectedPreset}
              options={[
                { value: 'aurora', label: 'Aurora Borealis (Jade & Cyan)' },
                { value: 'obsidian', label: 'Obsidian Void (Deep Slate)' },
                { value: 'parchment', label: 'Ancient Parchment (Vellum)' },
                { value: 'solaris', label: 'Solaris Flare (Radiant Gold)' },
                { value: 'nebula', label: 'Cosmic Nebula (Violet Aura)' },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Code Snippets */}
      <div className="package-setup" style={{ marginTop: '3rem' }}>
        <h2 className="aar-heading">5. Implementation Reference</h2>
        <p>
          Enabling Magic-Art or the expanding border wave requires zero runtime libraries:
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
        code={`import { sparkMagicStars } from '@techaaroorian-ui/aar-craft'

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
  )
}
