import CodeBlock from './CodeBlock'
import quickstartHtml from './examples/aar-craft/index.html?raw'
import quickstartCss from './examples/aar-craft/styles.css?raw'
import { useState } from 'react'
import type { CSSProperties } from 'react'
import '../../../packages/aar-craft/src/index.css'
import './App.css'

import AarSelect from './AarSelect'

const lessons = [
  ['The Arcane Atelier', 'Tools as digital alchemy', 'In creative engineering tools like Yuwbrndr, structured parameters deterministically transmute into visual artifacts. The workspace is your alchemy altar.'],
  ['Dual Realms', 'Atmospheric presence', 'Obsidian channels deep cosmic slate and starlight; Parchment channels tactile hand-pressed vellum and iron-gall ink. Each realm is deliberate, not a simple color invert.'],
  ['Precision over ornament', 'Etched geometry', 'No faux-leather, bevels, or novelty clutter. Delicate 1px hairlines and corner brackets (┌ ┐ └ ┘) frame the workspace like an astrolabe or precision laboratory instrument.'],
  ['Functional Runes', 'Symbols with operational truth', 'Runes communicate active runtime state, never random decoration: ✧ Idle potential, ✦ Active selection, ⟡ Live transmutation, ✓ Sealed artifact, ! Rift warning.'],
  ['Luminous intent', 'Atmospheric attention', 'Hover lifts controls by 1px. Focus-visible projects a soft aura (--aar-glow) rather than a jarring default browser outline. Contrast remains WCAG AAA compliant.'],
  ['Surface hierarchy', 'Separate without decorating', 'The background holds the atelier; panels group related instruments; the altar frames user artwork with zero style leakage.'],
  ['Motion and rhythm', 'Respond, then settle', 'Spring feedback gives immediate tactile confirmation. Micro-rotation on dropdown chevrons, 35ms staggered arrival capped at 140ms, and complete instant accessibility for prefers-reduced-motion.'],
]

function Workbench() {
  const [query, setQuery] = useState('')
  const [ready, setReady] = useState(false)
  const [notice, setNotice] = useState('')
  const [projects, setProjects] = useState([
    { name: 'Yuwbrndr Canvas Studio', kind: 'Creative Studio', ready: true },
    { name: 'Algorithmic Sketch Engine', kind: 'Generative Art', ready: true },
    { name: 'Design Tokens Grimoire', kind: 'Design System', ready: false },
  ])
  const visible = projects.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) && (!ready || p.ready))
  return <div className="workbench">
    <aside className="sidebar">
      <p className="aar-eyebrow">Studio Atelier</p>
      <h3 className="aar-heading">Grimoire</h3>
      <div className="sidebar-nav">
        <button className="aar-button" aria-pressed={!ready} onClick={() => setReady(false)}>All projects <span>{projects.length}</span></button>
        <button className="aar-button" aria-pressed={ready} onClick={() => setReady(true)}>✓ Sealed <span>{projects.filter(p => p.ready).length}</span></button>
      </div>
      <p className="sidebar-note">Code is modern spellcasting.<br />The workspace is your alchemy bench.</p>
    </aside>
    <section className="workspace">
      <div className="section-head">
        <div>
          <p className="aar-eyebrow">Workspace / Atelier</p>
          <h2 className="aar-heading">Active Incantations</h2>
          <p className="aar-hint">Real composition testing the Arcane Atelier design language in context.</p>
        </div>
        <button className="aar-button" data-variant="primary" onClick={() => { setProjects([...projects, { name: `Untitled incantation ${projects.length + 1}`, kind: 'New creation', ready: false }]); setNotice('Incantation created.'); setReady(false); setQuery('') }}>+ New project</button>
      </div>
      <div className="stats">{[['Active Projects', String(projects.length).padStart(2, '0')], ['Sealed Artifacts', String(projects.filter(p => p.ready).length).padStart(2, '0')], ['Philosophy', 'Arcane Atelier']].map(([label, value]) => <div className="aar-panel" key={label}><p className="aar-eyebrow">{label}</p><p className="stat-value">{value}</p></div>)}</div>
      <label className="aar-field">Find a project<input className="aar-input" type="search" placeholder="Search your projects…" value={query} onChange={e => setQuery(e.target.value)} /></label>
      <div className="project-list aar-stagger">{visible.map((p, index) => <article className="project aar-enter" style={{ '--aar-order': index } as CSSProperties} key={p.name}><span className="project-icon" aria-hidden="true">{p.ready ? '✦' : '✧'}</span><div><h3>{p.name}</h3><p className="aar-hint">{p.kind}</p></div><span className="aar-badge" data-tone={p.ready ? 'success' : undefined}>{p.ready ? '✓ Sealed' : '⟡ Transmuting'}</span></article>)}</div>
      {!visible.length && <div className="aar-empty aar-enter"><h3 className="aar-heading">No matching projects</h3><p className="aar-hint">Try a different name or clear your filters.</p><button className="aar-button" onClick={() => { setQuery(''); setReady(false) }}>Clear filters</button></div>}
      <p className="aar-hint notice" role="status">{notice || 'Your ideas, organized. All demo changes are temporary.'}</p>
    </section>
  </div>
}

function Specimens() {
  const [selected, setSelected] = useState(false)
  const [sampleOption, setSampleOption] = useState('social')
  const [replay, setReplay] = useState(0)
  return <div className="specimens">
    <section className="aar-panel specimen"><p className="aar-eyebrow">01 / Actions</p><h2 className="aar-heading">A clear priority</h2><p className="aar-hint">Hover, click, and use Tab to inspect actual states.</p><div className="aar-toolbar"><button className="aar-button" data-variant="primary">Primary action</button><button className="aar-button">Secondary</button><button className="aar-button" data-variant="quiet">Quiet</button><button className="aar-button" data-variant="danger">Delete</button><button className="aar-button" disabled>Unavailable</button><button className="aar-button" aria-pressed={selected} onClick={() => setSelected(!selected)}>{selected ? '✓ Selected' : 'Select'}</button></div></section>
    <section className="aar-panel specimen"><p className="aar-eyebrow">02 / Inputs & Selects</p><h2 className="aar-heading">Explain what is needed</h2><label className="aar-field">Project name<input className="aar-input" placeholder="Give your idea a name" /></label><label className="aar-field">Artifact type (Refined native select)<select className="aar-input"><option>Social Banner (1200×627)</option><option>Square Post (1080×1080)</option><option>Story Deck (1080×1920)</option></select></label><AarSelect label="Preset (Animated Dropdown)" value={sampleOption} onChange={setSampleOption} options={[{ value: 'social', label: '✦ Social Banner' }, { value: 'whiteboard', label: '✦ Whiteboard Sketch' }, { value: 'carousel', label: '✦ Carousel Deck' }]} /><label className="aar-field">Email address<input className="aar-input" defaultValue="hello@" aria-invalid="true" aria-describedby="email-error" /><span className="aar-hint" data-tone="danger" id="email-error">Enter a complete address, such as hello@example.com.</span></label></section>
    <section className="aar-panel specimen"><p className="aar-eyebrow">03 / Meaning</p><h2 className="aar-heading">Status beyond color</h2><div className="aar-toolbar"><span className="aar-badge">Draft</span><span className="aar-badge" data-tone="success">✓ Ready</span><span className="aar-badge" data-tone="danger">! Needs attention</span></div><p className="aar-hint">Words and symbols carry meaning even when colors are hard to distinguish.</p><div className="swatches">{['background', 'surface', 'surface-subtle', 'primary', 'text', 'border'].map(token => <div key={token}><span style={{ background: `var(--aar-${token})` }} /><code>{token}</code></div>)}</div></section>
    <section className="aar-panel specimen"><p className="aar-eyebrow">04 / Typography</p><h2 className="aar-title">Room to think.</h2><h3 className="aar-heading">A heading establishes a group.</h3><p>Body text explains the task in a comfortable reading rhythm.</p><p className="aar-hint">Supporting text adds context without competing.</p><p className="aar-eyebrow">Monospace identifies metadata</p></section>
    <section className="aar-panel specimen wide"><p className="aar-eyebrow">06 / Motion study</p><h2 className="aar-heading">A small rhythm, a clear arrival</h2><p className="aar-hint">Items arrive 35 ms apart. The delay caps at 140 ms, so the sequence stays brief.</p><div><button className="aar-button" onClick={() => setReplay(replay + 1)}>Replay motion</button></div><div className="motion-study aar-stagger" key={replay}>{['Context', 'Content', 'Action'].map((label, index) => <div className="aar-panel aar-enter" key={label} style={{ '--aar-order': index } as CSSProperties}><span className="aar-eyebrow">0{index + 1}</span><h3 className="aar-heading">{label}</h3></div>)}</div></section>
    <section className="aar-panel specimen wide"><p className="aar-eyebrow">07 / Studio Instruments &amp; Canvas Altar</p><h2 className="aar-heading">Precision controls for creative tools</h2><p className="aar-hint">Dials, switches, ranges, and framed altar viewports designed for high-density studios like Yuwbrndr.</p><div className="aar-stack" data-gap="4"><div className="aar-cluster" data-align="between"><div className="aar-segmented" role="tablist"><button type="button" aria-selected="true" role="tab">✦ Incantation (Code)</button><button type="button" aria-selected="false" role="tab">Canvas Altar</button></div><div className="aar-cluster"><button className="aar-icon-button" aria-label="Zoom in" title="Zoom in">＋</button><button className="aar-icon-button" aria-label="Zoom out" title="Zoom out">－</button><button className="aar-icon-button" data-variant="quiet" aria-label="Reset zoom" title="Reset zoom">⟲</button><span className="aar-kbd">⌘K</span></div></div>
    {/* Live Canvas Altar with Corner Brackets */}
    <div className="aar-altar" data-corner-brackets="true" style={{ minHeight: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--aar-surface-subtle)', borderRadius: 'var(--aar-radius-md)' }}>
      <div style={{ textAlign: 'center' }}>
        <span style={{ fontSize: '2rem', color: 'var(--aar-primary)' }}>⟡</span>
        <h4 style={{ margin: '0.25rem 0', fontSize: '1rem' }}>The Canvas Altar (.aar-altar)</h4>
        <p className="aar-hint">Framed with etched corner brackets (data-corner-brackets="true"). Artwork rendered with zero chrome distortion.</p>
      </div>
    </div>
    <div className="aar-split" style={{ '--aar-split-cols': '1fr 1fr' } as CSSProperties}><div className="aar-stack" data-gap="2"><label className="aar-field"><span>Canvas Scale <span className="aar-kbd">100%</span></span><input type="range" className="aar-range" defaultValue={100} min={50} max={200} /></label><label className="aar-toggle"><input type="checkbox" defaultChecked /><span>Auto-fit altar to workspace</span></label></div><div className="aar-stack" data-gap="2"><div className="aar-toast" data-tone="success"><span>✓</span><span>Seal confirmed: PNG exported at 2x Retina.</span></div><div className="aar-toast"><span>⟡</span><span>16ms reactive transmutation.</span></div></div></div><div className="aar-grid" style={{ '--aar-grid-min': '9rem' } as CSSProperties}><div className="aar-card" data-selected="true"><p className="aar-eyebrow">LinkedIn 1200×627</p><h4 className="aar-heading" style={{ fontSize: '1rem', marginTop: '.25rem' }}>Social Banner</h4><p className="aar-hint">✦ Active Preset</p></div><div className="aar-card"><p className="aar-eyebrow">Square 1080×1080</p><h4 className="aar-heading" style={{ fontSize: '1rem', marginTop: '.25rem' }}>Instagram Post</h4><p className="aar-hint">✧ 1:1 Aspect</p></div><div className="aar-card"><p className="aar-eyebrow">Slide Deck 16:9</p><h4 className="aar-heading" style={{ fontSize: '1rem', marginTop: '.25rem' }}>Carousel Deck</h4><p className="aar-hint">✧ 6 Slides</p></div></div></div></section>
    <section className="aar-panel specimen wide"><p className="aar-eyebrow">05 / Empty state</p><div className="aar-empty"><span className="empty-icon" aria-hidden="true">+</span><h2 className="aar-heading">Make space for your next idea</h2><p className="aar-hint">Explain the situation and offer a useful next step.</p><button className="aar-button" data-variant="primary">Create your first project</button></div></section>
  </div>
}

const PALETTE_DEFINITIONS = [
  {
    id: 'obsidian',
    name: '✦ Obsidian',
    subtitle: 'Night Atelier · Deep Focus',
    description: 'Deep cosmic slate and starlight typography. Engineered for dark-mode creative studios, reducing eye fatigue during extended composition.',
    swatches: [
      { name: 'Void Background', hex: '#0f111a' },
      { name: 'Midnight Surface', hex: '#161826' },
      { name: 'Raised Surface', hex: '#1c2032' },
      { name: 'Hairline Border', hex: '#2e354f' },
      { name: 'Radiant Violet', hex: '#a78bfa' },
      { name: 'Starlight Text', hex: '#f0f3fa' },
    ],
  },
  {
    id: 'parchment',
    name: '✧ Parchment',
    subtitle: 'Ancient Vellum · Tactile Script',
    description: 'Warm hand-pressed vellum and crisp paper surfaces with iron-gall ink. Provides high contrast and tactile editorial clarity.',
    swatches: [
      { name: 'Vellum Background', hex: '#f5f2eb' },
      { name: 'Paper Surface', hex: '#fffdf9' },
      { name: 'Subtle Well', hex: '#eee9dd' },
      { name: 'Sepia Hairline', hex: '#dcd4c3' },
      { name: 'Royal Violet', hex: '#6d28d9' },
      { name: 'Charcoal Ink', hex: '#26212b' },
    ],
  },
  {
    id: 'jade',
    name: '⟡ Celestial Jade',
    subtitle: 'Algorithmic Precision · Mint Halo',
    description: 'Emerald depths paired with glowing mint runes. Perfect for generative tools, algorithmic graphs, and data visualization ateliers.',
    swatches: [
      { name: 'Deep Emerald', hex: '#1f6b52' },
      { name: 'Celestial Mint', hex: '#6ee7b7' },
      { name: 'Emerald Text', hex: '#a7f3d0' },
      { name: 'Dark Sage', hex: '#064e3b' },
    ],
  },
  {
    id: 'forest',
    name: '🌿 Forest',
    subtitle: 'Botanical Calm · Organic Harmony',
    description: 'Natural olive hues and calm botanical accents. Grounded and quiet for documentation, editorial reading, and content organization.',
    swatches: [
      { name: 'Olive Green', hex: '#365c29' },
      { name: 'Meadow Light', hex: '#b7dc9b' },
      { name: 'Sage Surface', hex: '#eceee7' },
      { name: 'Dark Ink', hex: '#20271e' },
    ],
  },
  {
    id: 'iris',
    name: '🔮 Iris',
    subtitle: 'Mystic Spectrum · Expressive Studio',
    description: 'Classic royal iris and lavender glow. Expressive and punchy for creative showcases and interactive demonstrations.',
    swatches: [
      { name: 'Royal Iris', hex: '#6546a3' },
      { name: 'Lavender Glow', hex: '#d1bbff' },
      { name: 'Night Purple', hex: '#30204c' },
    ],
  },
]

const TOKEN_CATEGORIES = [
  {
    category: 'Surfaces & Elevation',
    tokens: [
      { name: '--aar-background', role: 'Viewport / Atelier canvas backdrop' },
      { name: '--aar-surface', role: 'Default panel and card base surface' },
      { name: '--aar-surface-subtle', role: 'Muted wells, hover fills, secondary groups' },
      { name: '--aar-surface-raised', role: 'Modals, dropdown menus, elevated altars' },
      { name: '--aar-surface-overlay', role: 'Topmost floating tooltips and popovers' },
    ],
  },
  {
    category: 'Hairline Structure & Ink',
    tokens: [
      { name: '--aar-border', role: '1px etched structural boundary' },
      { name: '--aar-border-strong', role: 'Active selection and highlighted edges' },
      { name: '--aar-text', role: 'High-contrast primary typography' },
      { name: '--aar-text-muted', role: 'Secondary metadata, captions, inactive runes' },
    ],
  },
  {
    category: 'Interaction & Luminous Intent',
    tokens: [
      { name: '--aar-primary', role: 'Primary command buttons, active star runes (✦)' },
      { name: '--aar-on-primary', role: 'High-contrast label on primary fills' },
      { name: '--aar-focus', role: 'Keyboard navigation focus indicator' },
      { name: '--aar-glow', role: 'Atmospheric halo cast upon focused controls' },
    ],
  },
  {
    category: 'Operational States',
    tokens: [
      { name: '--aar-success', role: 'The Seal (✓), verified export, valid state' },
      { name: '--aar-success-surface', role: 'Success confirmation badge & toast surface' },
      { name: '--aar-danger', role: 'Rift warning (!), quota breach, syntax error' },
      { name: '--aar-danger-surface', role: 'Critical alert badge & error message surface' },
    ],
  },
]

function PalettesAndColors({ currentPalette, onSelectPalette }: { currentPalette: string; onSelectPalette: (p: string) => void }) {
  return (
    <div className="aar-stack" data-gap="4">
      {/* Active Theme Tokens Matrix */}
      <section className="aar-panel">
        <p className="aar-eyebrow">Aar Craft / Design System Tokens</p>
        <h2 className="aar-heading">Active Token Roles in Viewport</h2>
        <p className="aar-hint">Live CSS variables rendered by your currently selected theme and palette.</p>
        
        <div className="aar-grid" style={{ '--aar-grid-min': '18rem', gap: '1.25rem', marginTop: '1.5rem' } as CSSProperties}>
          {TOKEN_CATEGORIES.map((cat) => (
            <div key={cat.category} className="aar-card" style={{ padding: '1.25rem' }}>
              <h3 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 600 }}>{cat.category}</h3>
              <div className="aar-stack" data-gap="2">
                {cat.tokens.map((token) => (
                  <div key={token.name} className="aar-cluster" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="aar-cluster" style={{ gap: '0.75rem' }}>
                      <span
                        style={{
                          width: '1.75rem',
                          height: '1.75rem',
                          borderRadius: 'var(--aar-radius-sm)',
                          border: '1px solid var(--aar-border)',
                          background: `var(${token.name})`,
                          boxShadow: 'var(--aar-shadow-sm)',
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <code style={{ fontSize: '0.8rem', fontWeight: 600 }}>{token.name}</code>
                        <p style={{ margin: '0.1rem 0 0', fontSize: '0.75rem', color: 'var(--aar-text-muted)' }}>{token.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The 5 Signature Arcane Palettes */}
      <section className="aar-panel">
        <p className="aar-eyebrow">The Arcane Atelier Palettes</p>
        <h2 className="aar-heading">Five Curated Atmospheric Realities</h2>
        <p className="aar-hint">Aar Craft does not use plain generic colors. Each palette is tuned for contrast, harmony, and creative stamina.</p>

        <div className="aar-grid" style={{ '--aar-grid-min': '20rem', gap: '1.25rem', marginTop: '1.5rem' } as CSSProperties}>
          {PALETTE_DEFINITIONS.map((pal) => (
            <article
              key={pal.id}
              className="aar-card"
              data-selected={currentPalette === pal.id}
              style={{
                padding: '1.5rem',
                border: currentPalette === pal.id ? '2px solid var(--aar-primary)' : '1px solid var(--aar-border)',
                position: 'relative',
              }}
            >
              <div className="aar-cluster" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>{pal.name}</h3>
                {currentPalette === pal.id && <span className="aar-badge" data-variant="primary">✦ Active</span>}
              </div>
              <p className="aar-eyebrow" style={{ margin: '0.25rem 0 0.5rem', fontSize: '0.75rem' }}>{pal.subtitle}</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--aar-text-muted)', lineHeight: 1.5, margin: '0 0 1rem' }}>{pal.description}</p>
              
              <div className="aar-cluster" style={{ gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                {pal.swatches.map((sw) => (
                  <div key={sw.name} title={`${sw.name}: ${sw.hex}`} style={{ textAlign: 'center' }}>
                    <span
                      style={{
                        display: 'block',
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: 'var(--aar-radius-sm)',
                        background: sw.hex,
                        border: '1px solid var(--aar-border)',
                        boxShadow: 'var(--aar-shadow-sm)',
                      }}
                    />
                    <code style={{ fontSize: '0.6875rem', display: 'block', marginTop: '0.25rem' }}>{sw.hex}</code>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="aar-button"
                data-variant={currentPalette === pal.id ? 'primary' : undefined}
                style={{ width: '100%' }}
                onClick={() => onSelectPalette(pal.id)}
              >
                {currentPalette === pal.id ? '✓ Currently Active' : `Activate ${pal.name}`}
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export interface AarCraftDocsProps {
  theme?: string
  palette?: string
  onThemeChange?: (theme: string) => void
  onPaletteChange?: (palette: string) => void
}

function AarCraftDocs({
  theme: externalTheme,
  palette: externalPalette,
  onThemeChange,
  onPaletteChange,
}: AarCraftDocsProps = {}) {
  const [internalTheme, setInternalTheme] = useState('light')
  const [internalPalette, setInternalPalette] = useState('obsidian')
  const theme = externalTheme ?? internalTheme
  const palette = externalPalette ?? internalPalette
  const setTheme = onThemeChange ?? setInternalTheme
  const setPalette = onPaletteChange ?? setInternalPalette
  const [density, setDensity] = useState('comfortable')
  const [view, setView] = useState('workbench')
  const [primary, setPrimary] = useState('#2458a6')
  const [onPrimary, setOnPrimary] = useState('#ffffff')
  const [compare, setCompare] = useState(false)
  const colors = palette === 'custom' ? { '--aar-primary': primary, '--aar-on-primary': onPrimary, '--aar-focus': primary } as CSSProperties : undefined
  return <div className="aar-root lab package-lab" data-theme={theme} data-palette={palette} data-density={density} style={colors}>
    <section className="lab-content"><section className="intro"><div><div className="package-logo"><img src={`${import.meta.env.BASE_URL}brand/aar-craft.png`} alt="Aar Craft" /></div><p className="aar-eyebrow">Aar Craft · Pure CSS Design System</p><h1 className="aar-title">The Arcane Atelier.<br /><span>Precision over ornament.</span></h1></div><div className="intro-copy"><p>A CSS-only language for creative engineering tools. 1px etched hairlines, dual Obsidian &amp; Parchment realms, corner-bracket altars, and honest functional runes.</p><p className="aar-hint">Zero runtime dependencies. Works with React, Vue, Svelte, or static HTML.</p></div></section>
    <section className="aar-panel package-setup"><h2 className="aar-heading">Getting started</h2><p>Import the CSS, opt in with <code>aar-root</code>, and choose a theme. No React runtime is required.</p><p>Copy these complete index.html and styles.css files into a project with npm CSS import support, such as Vite. Registry publication of the package is pending.</p><CodeBlock title="index.html" language="html" code={quickstartHtml} /><CodeBlock title="styles.css" language="css" code={quickstartCss} /><p className="aar-hint">Customize semantic variables such as --aar-primary and --aar-on-primary. Explore the live theme controls below.</p></section>
    <section className="aar-panel controls" aria-label="Visual testing controls">
      <AarSelect
        label="Appearance"
        value={theme}
        onChange={setTheme}
        options={[
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark' },
          { value: 'system', label: 'System' },
        ]}
      />
      <AarSelect
        label="Palette"
        value={palette}
        onChange={setPalette}
        options={[
          { value: 'obsidian', label: 'Obsidian (Night Atelier)' },
          { value: 'parchment', label: 'Parchment (Ancient Vellum)' },
          { value: 'jade', label: 'Celestial Jade' },
          { value: 'forest', label: 'Forest' },
          { value: 'iris', label: 'Iris' },
          { value: 'custom', label: 'Your colors' },
        ]}
      />
      <AarSelect
        label="Density"
        value={density}
        onChange={setDensity}
        options={[
          { value: 'comfortable', label: 'Comfortable' },
          { value: 'compact', label: 'Compact' },
        ]}
      />
      {palette === 'custom' && <><label className="aar-field">Primary<input className="aar-input color-input" type="color" value={primary} onChange={e => setPrimary(e.target.value)} /></label><label className="aar-field">On primary<input className="aar-input color-input" type="color" value={onPrimary} onChange={e => setOnPrimary(e.target.value)} /></label></>}
      <label className="compare-control"><input type="checkbox" checked={compare} onChange={e => setCompare(e.target.checked)} />Compare light & dark</label>
    </section>
    {palette === 'custom' && <p className="aar-hint color-note">Choose a readable primary / on-primary pair. Custom colors apply to both appearances and are not automatically contrast-safe.</p>}
    <nav className="lab-nav" aria-label="Playground sections">
      {[
        ['workbench', 'Studio Workbench'],
        ['specimens', 'Components'],
        ['colors', 'Palettes & Colors'],
        ['learn', 'Design Lessons'],
      ].map(([id, label]) => (
        <button className="aar-button" key={id} aria-pressed={view === id} onClick={() => setView(id)}>
          {label}
        </button>
      ))}
    </nav>
    <div id="playground" className="aar-enter" key={view} tabIndex={-1}>
      {view === 'workbench' || view === 'specimens' ? (
        <div className={compare ? 'comparison' : ''}>
          {(compare ? ['light', 'dark'] : [theme]).map((appearance) => (
            <section
              className="aar-root preview"
              key={appearance}
              data-theme={appearance}
              data-palette={palette}
              data-density={density}
              style={colors}
              aria-label={`${appearance} preview`}
            >
              <div className="preview-label">
                <span className="aar-eyebrow">{view === 'workbench' ? 'In context' : 'Component specimens'}</span>
                <span className="aar-eyebrow">{appearance} / {palette}</span>
              </div>
              {view === 'workbench' ? <Workbench /> : <Specimens />}
            </section>
          ))}
        </div>
      ) : view === 'colors' ? (
        <PalettesAndColors currentPalette={palette} onSelectPalette={setPalette} />
      ) : view === 'learn' ? (
        <section className="lessons">
          {lessons.map(([concept, title, text], index) => (
            <article className="aar-panel lesson" key={concept}>
              <span className="lesson-number">0{index + 1}</span>
              <p className="aar-eyebrow">{concept}</p>
              <h2 className="aar-heading">{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </section>
      ) : null}
    </div>
    <section className="review"><div><p className="aar-eyebrow">How to look</p><h2 className="aar-heading">Test the rules, then the details.</h2></div><ol><li><b>Hierarchy</b> — Can you identify the main action at a glance?</li><li><b>Theme</b> — Compare surfaces, text, and controls in both appearances.</li><li><b>Interaction</b> — Tab through controls; inspect focus, hover, pressed, and disabled.</li><li><b>Resilience</b> — Resize to mobile, zoom to 200%, and try longer text.</li></ol></section>
    <footer className="lab-footer"><span>Aar Craft / A language in progress</span><span>CSS foundation. No runtime dependency.</span></footer></section>
  </div>
}
export default AarCraftDocs
