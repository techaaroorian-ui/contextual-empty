import { useEffect, useState, useSyncExternalStore } from 'react'
import './App.css'
import './CollectionDocs.css'
import '../../../packages/aar-craft/src/index.css'
import AarCraftDocs from './AarCraftDocs'
import HeadlessGuide from './HeadlessGuide'
import IconGuide from './IconGuide'
import VersioningGuide from './VersioningGuide'
import PhilosophyGuide from './PhilosophyGuide'
import AarSelect from './AarSelect'
import {
  Sun,
  Moon,
  Laptop,
  Sparkles,
  Scroll,
  Gem,
  TreePine,
  Building2,
  ArrowRight,
  LayoutGrid,
  Move,
  FolderArchive,
  Layers,
  UploadCloud,
} from 'lucide-react'

import MagicArtGuide from './MagicArtGuide'
import { initMagicSparkAutoListener } from './magic-spark'

function subscribe(listener: () => void) {
  window.addEventListener('hashchange', listener)
  return () => window.removeEventListener('hashchange', listener)
}
const snapshot = () => window.location.hash || '#/'
const pages = [
  ['#/', 'Overview'],
  ['#/aar-craft', 'Aar Craft'],
  ['#/headless', 'Headless'],
  ['#/guides/philosophy', 'Philosophy'],
  ['#/guides/magic-art', 'Magic Art'],
  ['#/guides/icons', 'Icons'],
  ['#/guides/versioning', 'Versioning'],
]

export default function App() {
  const route = useSyncExternalStore(subscribe, snapshot)
  const isContextualEmpty = route === '#/contextual-empty'
  const known = pages.some(([path]) => path === route) || isContextualEmpty
  const title = isContextualEmpty
    ? 'Contextual Empty · Headless'
    : pages.find(([path]) => path === route)?.[1] || 'Page not found'

  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
    const saved = localStorage.getItem('aar-docs-theme')
    if (saved === 'light' || saved === 'dark' || saved === 'system') return saved
    const legacyRealm = localStorage.getItem('aar-docs-realm')
    if (legacyRealm === 'parchment') return 'light'
    return 'dark'
  })

  const [palette, setPalette] = useState<string>(() => {
    return localStorage.getItem('aar-docs-palette') || localStorage.getItem('aar-docs-realm') || 'obsidian'
  })

  const handleThemeChange = (nextTheme: string) => {
    setTheme(nextTheme as 'light' | 'dark' | 'system')
    localStorage.setItem('aar-docs-theme', nextTheme)
  }

  const handlePaletteChange = (nextPalette: string) => {
    setPalette(nextPalette)
    localStorage.setItem('aar-docs-palette', nextPalette)
  }

  useEffect(() => {
    document.title = `${title} · TechAaroorian UI · Universal Design System`
    const cleanup = initMagicSparkAutoListener()
    return cleanup
  }, [title])

  return (
    <div className="aar-root collection" data-theme={theme} data-palette={palette}>
      <a
        className="aar-button skip-link"
        href="#docs-content"
        onClick={(event) => {
          event.preventDefault()
          const content = document.getElementById('docs-content')
          content?.focus()
          content?.scrollIntoView()
        }}
      >
        Skip to documentation
      </a>

      <header className="collection-header">
        <a className="collection-brand" href="#/">
          <span className="collection-icon">
            <img src={`${import.meta.env.BASE_URL}brand/techaaroorian-ui.png`} alt="" />
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
              aria-current={route === path ? 'page' : undefined}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="header-controls">
          <AarSelect
            compact
            menuAlign="right"
            value={theme}
            onChange={handleThemeChange}
            options={[
              {
                value: 'light',
                label: <><Sun size={13} /> Light</>,
                shortLabel: <><Sun size={13} /> Light</>,
              },
              {
                value: 'dark',
                label: <><Moon size={13} /> Dark</>,
                shortLabel: <><Moon size={13} /> Dark</>,
              },
              {
                value: 'system',
                label: <><Laptop size={13} /> System</>,
                shortLabel: <><Laptop size={13} /> System</>,
              },
            ]}
          />
          <AarSelect
            compact
            menuAlign="right"
            value={palette}
            onChange={handlePaletteChange}
            options={[
              {
                value: 'obsidian',
                label: <><Sparkles size={13} /> Obsidian (Night Atelier)</>,
                shortLabel: <><Sparkles size={13} /> Obsidian</>,
              },
              {
                value: 'parchment',
                label: <><Scroll size={13} /> Parchment (Ancient Vellum)</>,
                shortLabel: <><Scroll size={13} /> Parchment</>,
              },
              {
                value: 'jade',
                label: <><Gem size={13} /> Celestial Jade</>,
                shortLabel: <><Gem size={13} /> Jade</>,
              },
              {
                value: 'forest',
                label: <><TreePine size={13} /> Forest (Botanical)</>,
                shortLabel: <><TreePine size={13} /> Forest</>,
              },
              {
                value: 'iris',
                label: <><Sparkles size={13} /> Iris (Mystic)</>,
                shortLabel: <><Sparkles size={13} /> Iris</>,
              },
            ]}
          />
        </div>
      </header>

      <main id="docs-content" tabIndex={-1}>
        {route === '#/guides/philosophy' ? (
          <PhilosophyGuide />
        ) : route === '#/guides/magic-art' ? (
          <MagicArtGuide />
        ) : route === '#/headless' ? (
          <HeadlessGuide />
        ) : route === '#/guides/icons' ? (
          <IconGuide />
        ) : route === '#/guides/versioning' ? (
          <VersioningGuide />
        ) : route === '#/aar-craft' ? (
          <AarCraftDocs
            theme={theme}
            palette={palette}
            onThemeChange={handleThemeChange}
            onPaletteChange={handlePaletteChange}
          />
        ) : route === '#/contextual-empty' ? (
          <HeadlessGuide initialSection="contextual-empty" />
        ) : known ? (
          <section className="lab-content collection-home">
            <div className="intro">
              <div>
                <p className="aar-eyebrow">Clean Design System · Optional Magic Art</p>
                <h1 className="aar-title">
                  Precision Layouts for All Applications.<br />
                  <span>Subtle enchantment when you want it.</span>
                </h1>
              </div>
              <div className="intro-copy">
                <p>
                  TechAaroorian UI and Aar Craft provide a <strong>proper, clean design and layout system</strong> for all kinds of applications—from enterprise SaaS dashboards to creative engineering tools. Magic-Art is an <strong>optional, extendable layer</strong> of subtle animations: button star sparks, fluid collapsible sidebars, and cascading options.
                </p>
                <p className="aar-hint">
                  Pure CSS foundations, zero runtime dependencies, and accessible ergonomics.
                </p>
              </div>
            </div>

            {/* Architecture Ribbon */}
            <div
              className="aar-card cycle-ribbon"
              style={{
                padding: '1.25rem 1.5rem',
                marginBottom: '2rem',
                border: '1px solid var(--aar-border-strong)',
                background: 'var(--aar-surface-raised)',
                borderRadius: 'var(--aar-radius-md)',
              }}
            >
              <div className="aar-cluster" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div className="aar-cluster" style={{ gap: '1.5rem', flexWrap: 'wrap' }}>
                  <div className="aar-cluster" style={{ gap: '0.5rem' }}>
                    <span style={{ color: 'var(--aar-primary)', display: 'inline-flex', alignItems: 'center' }}><Building2 size={16} /></span>
                    <strong>1. Clean Design System</strong>
                    <span className="aar-hint">(Universal Foundation)</span>
                  </div>
                  <span style={{ color: 'var(--aar-border-strong)', display: 'inline-flex', alignItems: 'center' }}><ArrowRight size={13} /></span>
                  <div className="aar-cluster" style={{ gap: '0.5rem' }}>
                    <span style={{ color: 'var(--aar-primary)', display: 'inline-flex', alignItems: 'center' }}><LayoutGrid size={16} /></span>
                    <strong>2. Layout Primitives</strong>
                    <span className="aar-hint">(Sidebars, Headers &amp; Grids)</span>
                  </div>
                  <span style={{ color: 'var(--aar-border-strong)', display: 'inline-flex', alignItems: 'center' }}><ArrowRight size={13} /></span>
                  <div className="aar-cluster" style={{ gap: '0.5rem' }}>
                    <span style={{ color: '#10b981', display: 'inline-flex', alignItems: 'center' }}><Sparkles size={16} /></span>
                    <strong>3. Optional Magic-Art</strong>
                    <span className="aar-hint">(Subtle Animations)</span>
                  </div>
                </div>

                <div className="aar-cluster" style={{ gap: '0.5rem' }}>
                  <a className="aar-button" data-variant="quiet" href="#/guides/philosophy" style={{ fontSize: '0.8125rem' }}>
                    Design Philosophy →
                  </a>
                  <a className="aar-button" data-variant="primary" href="#/guides/magic-art" style={{ fontSize: '0.8125rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Sparkles size={13} /> Magic Art Lab →
                  </a>
                </div>
              </div>
            </div>

            {/* Core Package Grid */}
            <div className="package-grid">
              <article className="aar-panel package-card" data-corner-brackets="true">
                <div className="package-logo">
                  <img src={`${import.meta.env.BASE_URL}brand/aar-craft.png`} alt="Aar Craft logo" />
                </div>
                <p className="aar-eyebrow">Pure CSS Design Language</p>
                <h2 className="aar-heading">Aar Craft</h2>
                <p>
                  Zero runtime dependencies. Atmospheric Obsidian &amp; Parchment realms, etched hairlines, corner-bracket altars, and animated studio dropdowns.
                </p>
                <code>@techaaroorian-ui/aar-craft</code>
                <a className="aar-button" data-variant="primary" href="#/aar-craft">
                  Explore Aar Craft →
                </a>
              </article>

              <article className="aar-panel package-card">
                <span className="empty-package-mark" aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FolderArchive size={26} />
                </span>
                <p className="aar-eyebrow">Headless Studio Component</p>
                <h2 className="aar-heading">Contextual Empty</h2>
                <p>
                  Explain first use, empty canvas stages, and recovery flows with a clear next action instead of dead-end placeholders.
                </p>
                <code>@techaaroorian-ui/contextual-empty</code>
                <a className="aar-button" href="#/contextual-empty">
                  Explore Contextual Empty →
                </a>
              </article>

              <article className="aar-panel package-card">
                <span className="empty-package-mark" aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Move size={26} />
                </span>
                <p className="aar-eyebrow">Headless Studio Viewport Math</p>
                <h2 className="aar-heading">Pan &amp; Zoom</h2>
                <p>
                  Calculates auto-fit dimensions, boundary constraints, and zoom stepping for creative canvas stages with zero framework bloat.
                </p>
                <code>@techaaroorian-ui/pan-zoom</code>
                <a className="aar-button" href="#/headless">
                  Explore Pan &amp; Zoom →
                </a>
              </article>

              <article className="aar-panel package-card">
                <span className="empty-package-mark" aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Layers size={26} />
                </span>
                <p className="aar-eyebrow">Deterministic Sequence Engine</p>
                <h2 className="aar-heading">Ordered Collection</h2>
                <p>
                  Deterministic state machine for multi-slide presentations, canvas layers, and undoable timelines with zero UI lock-in.
                </p>
                <code>@techaaroorian-ui/ordered-collection</code>
                <a className="aar-button" href="#/headless">
                  Explore Ordered Collection →
                </a>
              </article>

              <article className="aar-panel package-card">
                <span className="empty-package-mark" aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <UploadCloud size={26} />
                </span>
                <p className="aar-eyebrow">Atomic Batch Intake</p>
                <h2 className="aar-heading">File Intake</h2>
                <p>
                  Validates batches of images or creative assets atomically before allocating object URLs or GPU memory.
                </p>
                <code>@techaaroorian-ui/file-intake</code>
                <a className="aar-button" href="#/headless">
                  Explore File Intake →
                </a>
              </article>
            </div>

            {/* Runes & Principles Note */}
            <section className="collection-note" style={{ maxWidth: '48rem' }}>
              <h2 className="aar-heading">Built for High-Precision Creative Studios</h2>
              <p>
                Whether you need a full aesthetic shell with <strong>Aar Craft</strong>, actionable recovery states with <strong>Contextual Empty</strong>, infinite canvas positioning with <strong>Pan &amp; Zoom</strong>, or deterministic layer control with <strong>Ordered Collection</strong>, each engine is modular and production-ready.
              </p>
            </section>
          </section>
        ) : (
          <section className="lab-content package-docs">
            <h1 className="aar-title">Page not found</h1>
            <a className="aar-button" href="#/">
              Return to overview
            </a>
          </section>
        )}
      </main>

      <footer className="collection-footer">
        <span>TechAaroorian UI · The Arcane Atelier</span>
        <span>Precision software ergonomics &amp; headless studio tools</span>
      </footer>
    </div>
  )
}
