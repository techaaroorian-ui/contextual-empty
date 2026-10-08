import { useState } from 'react'
import {
  LayoutDashboard,
  FolderKanban,
  LineChart,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  Layers,
  X,
  Check,
  Building2,
  Wand2,
  RefreshCw,
  Maximize2,
  Sparkles,
} from 'lucide-react'
import AarSelect from './AarSelect'
import { sparkMagicStars } from './magic-spark'
import CodeBlock from './CodeBlock'

export default function PhilosophyGuide() {
  const [magicArtEnabled, setMagicArtEnabled] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeNav, setActiveNav] = useState('dashboard')
  const [sampleOption, setSampleOption] = useState('production')
  const [sparkCount, setSparkCount] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalWaveKey, setModalWaveKey] = useState(0)

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>, color?: string) => {
    if (magicArtEnabled) {
      sparkMagicStars(e, color ? { color } : undefined)
      setSparkCount((prev) => prev + 1)
    }
  }

  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleButtonClick(e)
    setModalWaveKey((k) => k + 1)
    setModalOpen(true)
  }

  return (
    <section className="lab-content package-docs">
      {/* Intro Header */}
      <div className="package-setup">
        <p className="aar-eyebrow">Aar Loom · Design Philosophy &amp; Architecture</p>
        <h1 className="aar-title">Clean Foundation, Optional Magic</h1>
        <p
          className="aar-subtitle"
          style={{
            fontSize: '1.25rem',
            color: 'var(--aar-text-muted)',
            fontStyle: 'italic',
            margin: '0.5rem 0 1rem',
          }}
        >
          &ldquo;Precision design for all applications. Subtle enchantment on demand.&rdquo;
        </p>
        <p>
          <strong>TechAaroorian UI</strong> and <strong>Aar Loom</strong> provide a proper, clean design and layout
          system engineered for <strong>all kinds of applications</strong>—from enterprise SaaS platforms,
          analytics dashboards, and developer consoles, to creative studios like Yuwbrndr.
        </p>
        <p>
          The <strong>magic-art philosophy is optional</strong>. Clean business applications need zero visual
          distraction, honest functional typography, and robust layout structures. When you choose to extend
          with Magic-Art, it becomes an <strong>opt-in layer of subtle animations</strong>: semi-transparent frosted
          glass, perimeter border waves that grow and dissolve, and tactile click sparks.
        </p>
      </div>

      {/* Mode Comparison Banner */}
      <div
        className="aar-panel"
        style={{
          marginTop: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          border: '1px solid var(--aar-border-strong)',
          background: 'var(--aar-surface-raised)',
        }}
      >
        <div>
          <span className="aar-badge" data-variant="primary" style={{ marginBottom: '0.5rem' }}>
            Interactive Demo Control
          </span>
          <h3 style={{ margin: 0, fontSize: '1.1rem' }}>
            Current Mode: {magicArtEnabled ? '✨ Magic-Art Enabled (Subtle Animations)' : '🏢 Clean Mode (Universal / Minimalist)'}
          </h3>
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: 'var(--aar-text-muted)' }}>
            Toggle below to see how components behave in a pure clean layout vs. with optional subtle micro-animations.
          </p>
        </div>

        <div className="aar-cluster" style={{ gap: '0.75rem' }}>
          <button
            type="button"
            className="aar-button"
            data-variant={!magicArtEnabled ? 'primary' : undefined}
            onClick={() => setMagicArtEnabled(false)}
          >
            <Building2 size={16} />
            <span>Clean Mode (Universal)</span>
          </button>
          <button
            type="button"
            className="aar-button"
            data-variant={magicArtEnabled ? 'primary' : undefined}
            onClick={(e) => {
              setMagicArtEnabled(true)
              sparkMagicStars(e)
            }}
          >
            <Wand2 size={16} />
            <span>Magic-Art (Animated)</span>
          </button>
        </div>
      </div>

      {/* 1. Universal Layout & Application Shell Demo */}
      <div className="package-setup" style={{ marginTop: '2.5rem' }}>
        <h2 className="aar-heading">1. Proper Clean Layout System for All Applications</h2>
        <p>
          Aar Loom provides rock-solid application shell primitives: responsive header, collapsible sidebar,
          flexible content canvas, multi-column split panes, and metric grids. Below is a live application shell:
        </p>

        {/* Live Application Workspace Preview */}
        <div
          className="aar-panel"
          data-magic-art={magicArtEnabled ? 'true' : 'false'}
          style={{
            padding: 0,
            overflow: 'hidden',
            border: '1px solid var(--aar-border)',
            borderRadius: 'var(--aar-radius-lg)',
            marginTop: '1.25rem',
            background: 'var(--aar-background)',
            minHeight: '440px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Top Header / Navbar */}
          <div className="aar-workspace-header" style={{ padding: '0.625rem 1rem' }}>
            <div className="aar-cluster" style={{ gap: '0.75rem' }}>
              <button
                type="button"
                className="aar-sidebar-toggle"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                aria-label="Toggle sidebar"
                title="Toggle sidebar"
              >
                <span className="aar-sidebar-toggle-icon" aria-hidden="true">
                  {sidebarCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
                </span>
              </button>
              <div style={{ fontWeight: 600, fontSize: '0.9375rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--aar-primary)' }}>◆</span>
                <span>Nova Workspace</span>
              </div>
            </div>

            <div className="aar-cluster" style={{ gap: '0.5rem' }}>
              <span className="aar-badge" data-tone="success">✓ Production Ready</span>
              <button
                type="button"
                className="aar-button"
                data-variant="primary"
                onClick={(e) => handleButtonClick(e)}
              >
                {magicArtEnabled ? <Sparkles size={16} /> : null}
                <span>{magicArtEnabled ? 'Spark Action' : '+ New Item'}</span>
              </button>
            </div>
          </div>

          {/* Workspace Body: Sidebar + Main Content */}
          <div className="aar-workspace-body" style={{ flex: 1, minHeight: '380px' }}>
            {/* Collapsible Sidebar */}
            <aside
              className="aar-sidebar"
              data-collapsed={sidebarCollapsed ? 'rail' : 'false'}
              style={{
                width: sidebarCollapsed ? '4.25rem' : '14rem',
                minWidth: sidebarCollapsed ? '4.25rem' : '14rem',
              }}
            >
              <div className="aar-sidebar-nav">
                {[
                  { id: 'dashboard', icon: <LayoutDashboard size={17} />, label: 'Dashboard', badge: '12' },
                  { id: 'projects', icon: <FolderKanban size={17} />, label: 'Projects', badge: '4' },
                  { id: 'analytics', icon: <LineChart size={17} />, label: 'Analytics' },
                  { id: 'settings', icon: <Settings size={17} />, label: 'Settings' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="aar-sidebar-item"
                    data-active={activeNav === item.id ? 'true' : 'false'}
                    onClick={() => setActiveNav(item.id)}
                  >
                    <span className="aar-sidebar-icon" aria-hidden="true">{item.icon}</span>
                    <span className="aar-sidebar-label">{item.label}</span>
                    {!sidebarCollapsed && item.badge && (
                      <span className="aar-badge" style={{ padding: '0.1rem 0.4rem', fontSize: '0.7rem' }}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="aar-sidebar-footer">
                {!sidebarCollapsed ? (
                  <span className="aar-hint" style={{ fontSize: '0.75rem' }}>
                    {magicArtEnabled ? 'Fluid transition on toggle' : 'Collapsible sidebar'}
                  </span>
                ) : (
                  <span className="aar-hint" style={{ textAlign: 'center', width: '100%', fontSize: '0.75rem' }}>
                    <Settings size={15} />
                  </span>
                )}
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="aar-workspace-main" style={{ padding: '1.25rem' }}>
              <div className="aar-page-header">
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem' }}>
                    {activeNav.charAt(0).toUpperCase() + activeNav.slice(1)} Overview
                  </h3>
                  <p className="aar-hint" style={{ margin: '0.25rem 0 0' }}>
                    Standard clean layout primitives working cleanly across themes and densities.
                  </p>
                </div>
                <div className="aar-cluster">
                  <AarSelect
                    compact
                    value={sampleOption}
                    onChange={setSampleOption}
                    options={[
                      { value: 'production', label: 'Production Env', shortLabel: 'Prod' },
                      { value: 'staging', label: 'Staging Cluster', shortLabel: 'Stage' },
                      { value: 'preview', label: 'Preview Branch', shortLabel: 'Preview' },
                    ]}
                  />
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="aar-grid" style={{ '--aar-grid-min': '10rem' } as React.CSSProperties}>
                <div className="aar-stat-card">
                  <span className="aar-stat-label">Total Requests</span>
                  <span className="aar-stat-value">148.2k</span>
                  <span className="aar-stat-delta" data-trend="up">↑ +14.2%</span>
                </div>
                <div className="aar-stat-card">
                  <span className="aar-stat-label">Avg Latency</span>
                  <span className="aar-stat-value">24ms</span>
                  <span className="aar-stat-delta" data-trend="up">↑ -4ms faster</span>
                </div>
                <div className="aar-stat-card">
                  <span className="aar-stat-label">System Health</span>
                  <span className="aar-stat-value">99.98%</span>
                  <span className="aar-stat-delta" data-trend="up">✓ Sealed</span>
                </div>
              </div>

              {/* Action and Demonstration Card */}
              <div className="aar-panel" style={{ background: 'var(--aar-surface)', border: '1px solid var(--aar-border)' }}>
                <div className="aar-cluster" style={{ justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Interactive Controls &amp; Spark Testing</h4>
                  <span className="aar-hint">Sparks triggered: {sparkCount}</span>
                </div>
                <p style={{ margin: '0 0 1rem', fontSize: '0.85rem', color: 'var(--aar-text-muted)' }}>
                  Click the buttons below. In Clean Mode, standard crisp tactile feedback is provided.
                  In Magic-Art Mode, stars burst outward from the click origin!
                </p>
                <div className="aar-cluster" style={{ gap: '0.75rem' }}>
                  <button
                    type="button"
                    className="aar-button"
                    data-variant="primary"
                    onClick={(e) => handleButtonClick(e)}
                  >
                    Spark Primary Stars
                  </button>
                  <button
                    type="button"
                    className="aar-button"
                    onClick={(e) => handleButtonClick(e, '#34d399')}
                  >
                    Spark Emerald Stars
                  </button>
                  <button
                    type="button"
                    className="aar-button"
                    data-variant="quiet"
                    onClick={(e) => handleButtonClick(e, '#f59e0b')}
                  >
                    Spark Amber Stars
                  </button>
                  <button
                    type="button"
                    className="aar-button"
                    data-variant="danger"
                    onClick={(e) => handleButtonClick(e, '#f87171')}
                  >
                    <span>Alert Spark</span>
                  </button>
                  <button
                    type="button"
                    className="aar-button"
                    data-variant="primary"
                    style={{ marginLeft: 'auto' }}
                    onClick={handleOpenModal}
                  >
                    <Layers size={16} />
                    <span>{magicArtEnabled ? 'Open Frosted Modal (Wave Effect)' : 'Open Standard Modal'}</span>
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>

        {/* Live Modal Dialog Comparison */}
        {modalOpen && (
          <div
            data-magic-art={magicArtEnabled ? 'true' : 'false'}
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
                background: magicArtEnabled
                  ? 'radial-gradient(circle at center, rgba(15, 17, 26, 0.65) 0%, rgba(5, 7, 12, 0.82) 100%)'
                  : 'rgba(0, 0, 0, 0.55)',
                backdropFilter: magicArtEnabled ? 'blur(10px) saturate(130%)' : 'blur(4px)',
                WebkitBackdropFilter: magicArtEnabled ? 'blur(10px) saturate(130%)' : 'blur(4px)',
              }}
              onClick={() => setModalOpen(false)}
            />

            {/* Dialog Card with Expanding Border Wave */}
            <div
              className="aar-dialog"
              data-magic-art={magicArtEnabled ? 'true' : 'false'}
              style={{
                position: 'relative',
                overflow: 'visible',
                zIndex: 1001,
                width: 'min(30rem, 100%)',
              }}
            >
              {/* Concentric expanding wave rings when Magic Art is active */}
              {magicArtEnabled && (
                <>
                  <div className="aar-modal-wave-ring" key={`pw1-${modalWaveKey}`} aria-hidden="true" />
                  <div className="aar-modal-wave-ring-secondary" key={`pw2-${modalWaveKey}`} aria-hidden="true" />
                  <div className="aar-modal-wave-ring-tertiary" key={`pw3-${modalWaveKey}`} aria-hidden="true" />
                </>
              )}

              <div className="aar-cluster" style={{ justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div className="aar-cluster" style={{ gap: '0.5rem' }}>
                  <Layers size={18} style={{ color: 'var(--aar-primary)' }} />
                  <h3 style={{ margin: 0, fontSize: '1.15rem' }}>
                    {magicArtEnabled ? 'Frosted Glass Modal (Perimeter Wave)' : 'Standard Clean Modal'}
                  </h3>
                </div>
                <button
                  type="button"
                  className="aar-icon-button"
                  data-variant="quiet"
                  onClick={() => setModalOpen(false)}
                >
                  <X size={16} />
                </button>
              </div>

              <p style={{ margin: '0 0 1rem', color: 'var(--aar-text-muted)', fontSize: '0.875rem' }}>
                {magicArtEnabled
                  ? 'In Magic-Art, the modal surface uses 76% semi-transparent frosted glass (backdrop-filter: blur(24px)). Upon opening, glowing concentric waves erupt from the modal border, expand 50px–100px outward, and dissolve.'
                  : 'In Clean Mode, the modal is completely solid and opaque with crisp borders and minimal drop shadow—ideal for enterprise environments.'}
              </p>

              {magicArtEnabled && (
                <div style={{ marginBottom: '1rem' }}>
                  <button
                    type="button"
                    className="aar-button"
                    data-variant="primary"
                    onClick={() => setModalWaveKey((k) => k + 1)}
                    title="Re-trigger the border expanding wave"
                  >
                    <RefreshCw size={14} />
                    <span>Trigger Wave Pulse ({modalWaveKey + 1})</span>
                  </button>
                </div>
              )}

              <div className="aar-cluster" style={{ justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  type="button"
                  className="aar-button"
                  data-variant="quiet"
                  onClick={() => setModalOpen(false)}
                >
                  Dismiss
                </button>
                <button
                  type="button"
                  className="aar-button"
                  data-variant="primary"
                  onClick={(e) => {
                    handleButtonClick(e)
                    setModalOpen(false)
                  }}
                >
                  <Check size={16} />
                  <span>Confirm</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. The Extendable Magic-Art Animations */}
      <div className="package-setup" style={{ marginTop: '3rem' }}>
        <h2 className="aar-heading">2. Distinct Reveals &amp; Subtle Animations</h2>
        <p>
          When enabled, Magic-Art enriches the clean UI with distinctive semi-transparent reveals and micro-animations:
        </p>

        <div className="aar-grid" style={{ '--aar-grid-min': '16rem', gap: '1.25rem', marginTop: '1.25rem' } as React.CSSProperties}>
          {/* Card 1: Button Click Sparks */}
          <div className="aar-card" style={{ padding: '1.25rem', border: '1px solid var(--aar-border-strong)' }}>
            <div className="aar-cluster" style={{ justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <Sparkles size={20} style={{ color: 'var(--aar-primary)' }} />
              <span className="aar-badge" data-variant="primary">Tactile Feedback</span>
            </div>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem' }}>1. Tactile Click Sparks</h3>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--aar-text-muted)' }}>
              On pointer click, subtle glowing particles radiate smoothly outward from the cursor origin with gentle dissipation.
            </p>
            <div style={{ marginTop: '1rem' }}>
              <button
                type="button"
                className="aar-button"
                data-variant="primary"
                style={{ width: '100%' }}
                onClick={(e) => sparkMagicStars(e)}
              >
                <Sparkles size={16} />
                <span>Test Click Spark</span>
              </button>
            </div>
          </div>

          {/* Card 2: Semi-Transparent Frosted Sidebar */}
          <div className="aar-card" style={{ padding: '1.25rem', border: '1px solid var(--aar-border-strong)' }}>
            <div className="aar-cluster" style={{ justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <PanelLeftOpen size={20} style={{ color: 'var(--aar-primary)' }} />
              <span className="aar-badge" data-variant="primary">Frosted Glass</span>
            </div>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem' }}>2. Frosted Sidebar Reveal</h3>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--aar-text-muted)' }}>
              Reveals as a <strong>semi-transparent frosted glass pane</strong> (<code>backdrop-filter: blur(16px)</code>) with a luminous vertical edge beam and a smooth flip toggle.
            </p>
            <div style={{ marginTop: '1rem' }}>
              <button
                type="button"
                className="aar-button"
                style={{ width: '100%' }}
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                {sidebarCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
                <span>{sidebarCollapsed ? 'Expand Sidebar' : 'Collapse to Rail'}</span>
              </button>
            </div>
          </div>

          {/* Card 3: Perimeter Border Wave Modal */}
          <div className="aar-card" style={{ padding: '1.25rem', border: '1px solid var(--aar-border-strong)' }}>
            <div className="aar-cluster" style={{ justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <Layers size={20} style={{ color: 'var(--aar-primary)' }} />
              <span className="aar-badge" data-variant="primary">Perimeter Wave</span>
            </div>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem' }}>3. Modal Perimeter Wave</h3>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--aar-text-muted)' }}>
              Modals reveal with <strong>semi-transparent 24px frosted blur</strong>. A radiant wave erupts from the modal border, expands outward, and dissolves into the backdrop.
            </p>
            <div style={{ marginTop: '1rem' }}>
              <button
                type="button"
                className="aar-button"
                style={{ width: '100%' }}
                onClick={handleOpenModal}
              >
                <Maximize2 size={16} />
                <span>Test Frosted Wave Modal</span>
              </button>
            </div>
          </div>

          {/* Card 3: Option & Dropdown Cascading Reveal */}
          <div className="aar-card" style={{ padding: '1.25rem', border: '1px solid var(--aar-border-strong)' }}>
            <div className="aar-cluster" style={{ justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem', color: 'var(--aar-primary)' }}>✧</span>
              <span className="aar-badge" data-variant="primary">Cascading Motion</span>
            </div>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem' }}>3. Option &amp; Dropdown Animation</h3>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--aar-text-muted)' }}>
              Dropdowns, selects, and popovers glide into view with a gentle scale transition. Options cascade
              with 20ms staggered delays, and hovered options project a soft ambient highlight.
            </p>
            <div style={{ marginTop: '1rem' }}>
              <AarSelect
                value={sampleOption}
                onChange={setSampleOption}
                options={[
                  { value: 'production', label: '✦ Production Cluster' },
                  { value: 'staging', label: '✧ Staging Environment' },
                  { value: 'preview', label: '⟡ Feature Branch Preview' },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Core Architectural Rules */}
      <div className="package-setup" style={{ marginTop: '3rem' }}>
        <h2 className="aar-heading">3. Architectural Principles</h2>
      </div>

      <div className="table-scroll">
        <table className="docs-table">
          <thead>
            <tr>
              <th style={{ width: '22%' }}>Rule</th>
              <th style={{ width: '38%' }}>Philosophy &amp; Meaning</th>
              <th style={{ width: '40%' }}>Practical Implementation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">I. Clean by Default</th>
              <td>
                The core library provides honest, utilitarian ergonomics suitable for any enterprise, SaaS, or admin app.
              </td>
              <td>
                Zero required fantasy symbols. Standard semantic HTML, 1px etched hairlines, and accessible contrast.
              </td>
            </tr>
            <tr>
              <th scope="row">II. Magic-Art is Optional</th>
              <td>
                Micro-animations add joy and tactile delight without compromising professional utility or performance.
              </td>
              <td>
                Opt-in via <code>data-magic-art="true"</code>, <code>.aar-magic-spark</code>, or helper functions.
              </td>
            </tr>
            <tr>
              <th scope="row">III. Precision over Ornament</th>
              <td>
                Modern mathematical elegance rather than heavy skeuomorphism or distracting decorative noise.
              </td>
              <td>
                Delicate 1px borders (<code>--aar-border</code>), crisp monospace metadata, and responsive layout primitives.
              </td>
            </tr>
            <tr>
              <th scope="row">IV. Respect for Accessibility</th>
              <td>
                All animations strictly respect user motion sensitivities and keyboard navigation standards.
              </td>
              <td>
                <code>prefers-reduced-motion: reduce</code> zeroes all star particles and layout transitions instantly.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 4. Code & Extensibility Guide */}
      <div className="package-setup" style={{ marginTop: '3rem' }}>
        <h2 className="aar-heading">4. How to Extend Your Application</h2>
        <p>
          Enabling Magic-Art or sparking stars requires only pure CSS or a single line of JavaScript:
        </p>
      </div>

      <CodeBlock
        title="1. Pure CSS Activation"
        language="html"
        code={`<!-- Enable Magic-Art animations across an entire container -->
<div class="aar-root" data-magic-art="true">
  <!-- Any button automatically gains subtle star sparks on click -->
  <button class="aar-button" data-variant="primary">Deploy Service</button>

  <!-- Animated collapsible sidebar -->
  <aside class="aar-sidebar" data-collapsed="false">
    <div class="aar-sidebar-nav">
      <a class="aar-sidebar-item" data-active="true">Dashboard</a>
    </div>
  </aside>
</div>

<!-- Or target a single button anywhere without container attributes -->
<button class="aar-button aar-magic-spark">Spark Button</button>`}
      />

      <CodeBlock
        title="2. React / TypeScript Helper (Zero Runtime Dependencies)"
        language="tsx"
        code={`import { sparkMagicStars } from '@techaaroorian-ui/aar-loom'

export function MyActionButton() {
  return (
    <button
      className="aar-button"
      data-variant="primary"
      onClick={(e) => {
        // Sparks stars radiating outward from click coordinates
        sparkMagicStars(e, { count: 8, color: '#a78bfa' })
        doAction()
      }}
    >
      Publish Artifact
    </button>
  )
}`}
      />
    </section>
  )
}
