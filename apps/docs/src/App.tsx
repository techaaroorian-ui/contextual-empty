import { useEffect, useState, useSyncExternalStore } from 'react'
import './App.css'
import './CollectionDocs.css'
import '../../../packages/aar-craft/src/index.css'
import AarCraftDocs from './AarCraftDocs'
import ContextualEmptyDocs from './ContextualEmptyDocs'
import IconGuide from './IconGuide'
import VersioningGuide from './VersioningGuide'
import HeadlessGuide from './HeadlessGuide'
import PhilosophyGuide from './PhilosophyGuide'
import AarSelect from './AarSelect'

function subscribe(listener: () => void) {
  window.addEventListener('hashchange', listener)
  return () => window.removeEventListener('hashchange', listener)
}
const snapshot = () => window.location.hash || '#/'
const pages = [
  ['#/', 'Overview'],
  ['#/aar-craft', 'Aar Craft'],
  ['#/contextual-empty', 'Contextual Empty'],
  ['#/headless', 'Headless'],
  ['#/guides/philosophy', 'Philosophy'],
  ['#/guides/icons', 'Icons'],
  ['#/guides/versioning', 'Versioning'],
]

export default function App() {
  const route = useSyncExternalStore(subscribe, snapshot)
  const known = pages.some(([path]) => path === route)
  const title = pages.find(([path]) => path === route)?.[1] || 'Page not found'

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
    document.title = `${title} · TechAaroorian UI · Arcane Atelier`
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
              { value: 'light', label: '☀️ Light', shortLabel: '☀️ Light' },
              { value: 'dark', label: '🌙 Dark', shortLabel: '🌙 Dark' },
              { value: 'system', label: '💻 System', shortLabel: '💻 System' },
            ]}
          />
          <AarSelect
            compact
            menuAlign="right"
            value={palette}
            onChange={handlePaletteChange}
            options={[
              { value: 'obsidian', label: '✦ Obsidian (Night Atelier)', shortLabel: '✦ Obsidian' },
              { value: 'parchment', label: '✧ Parchment (Ancient Vellum)', shortLabel: '✧ Parchment' },
              { value: 'jade', label: '⟡ Celestial Jade', shortLabel: '⟡ Jade' },
              { value: 'forest', label: '🌿 Forest (Botanical)', shortLabel: '🌿 Forest' },
              { value: 'iris', label: '🔮 Iris (Mystic)', shortLabel: '🔮 Iris' },
            ]}
          />
        </div>
      </header>

      <main id="docs-content" tabIndex={-1}>
        {route === '#/guides/philosophy' ? (
          <PhilosophyGuide />
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
          <ContextualEmptyDocs />
        ) : known ? (
          <section className="lab-content collection-home">
            <div className="intro">
              <div>
                <p className="aar-eyebrow">The Arcane Atelier · Studio Ergonomics</p>
                <h1 className="aar-title">
                  Code is modern spellcasting.<br />
                  <span>The workspace is your alchemy bench.</span>
                </h1>
              </div>
              <div className="intro-copy">
                <p>
                  TechAaroorian UI fuses <strong>modern software ergonomics</strong> with the depth of the Arcane Atelier. In creative tools like Yuwbrndr, structured parameters deterministically transmute in real-time into visual artifacts.
                </p>
                <p className="aar-hint">
                  Pure CSS foundations, headless viewport math, and zero-server state sharing.
                </p>
              </div>
            </div>

            {/* The Transmutation Cycle Ribbon */}
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
                    <span style={{ color: 'var(--aar-text-muted)' }}>✧</span>
                    <strong>1. Incantation</strong>
                    <span className="aar-hint">(Code &amp; Sliders)</span>
                  </div>
                  <span style={{ color: 'var(--aar-border-strong)' }}>➔</span>
                  <div className="aar-cluster" style={{ gap: '0.5rem' }}>
                    <span style={{ color: 'var(--aar-primary)' }}>⟡</span>
                    <strong>2. The Altar</strong>
                    <span className="aar-hint">(Canvas Viewport)</span>
                  </div>
                  <span style={{ color: 'var(--aar-border-strong)' }}>➔</span>
                  <div className="aar-cluster" style={{ gap: '0.5rem' }}>
                    <span style={{ color: '#10b981' }}>✓</span>
                    <strong>3. The Seal</strong>
                    <span className="aar-hint">(High-DPI Artifact)</span>
                  </div>
                </div>

                <a className="aar-button" data-variant="quiet" href="#/guides/philosophy" style={{ fontSize: '0.8125rem' }}>
                  Read Design Philosophy →
                </a>
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
                <span className="empty-package-mark" aria-hidden="true">
                  [ ⟡ ]
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
                <span className="empty-package-mark" aria-hidden="true">
                  #share=v1z…
                </span>
                <p className="aar-eyebrow">Zero-Server State Sharing</p>
                <h2 className="aar-heading">Share State</h2>
                <p>
                  Encodes and compresses studio state directly into URL hash fragments via browser-native deflate compression. No database required.
                </p>
                <code>@techaaroorian-ui/share-state</code>
                <a className="aar-button" href="#/headless">
                  Explore Share State →
                </a>
              </article>

              <article className="aar-panel package-card">
                <span className="empty-package-mark" aria-hidden="true">
                  [ + ]
                </span>
                <p className="aar-eyebrow">Composable React Component</p>
                <h2 className="aar-heading">Contextual Empty</h2>
                <p>
                  Explain first use, empty canvas stages, and recovery flows with a clear next action instead of dead-end placeholders.
                </p>
                <code>@techaaroorian-ui/contextual-empty</code>
                <a className="aar-button" href="#/contextual-empty">
                  Explore Contextual Empty →
                </a>
              </article>
            </div>

            {/* Runes & Principles Note */}
            <section className="collection-note" style={{ maxWidth: '48rem' }}>
              <h2 className="aar-heading">Built for High-Precision Creative Studios</h2>
              <p>
                Whether you need a full aesthetic shell with <strong>Aar Craft</strong>, infinite canvas positioning with <strong>Pan &amp; Zoom</strong>, or serverless persistence with <strong>Share State</strong>, each package is modular, independently tested, and production-ready.
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
