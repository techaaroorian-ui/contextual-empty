import CodeBlock from './CodeBlock'
import quickstartHtml from './examples/aar-craft/index.html?raw'
import quickstartCss from './examples/aar-craft/styles.css?raw'
import { useState } from 'react'
import type { CSSProperties } from 'react'
import '../../../packages/aar-craft/src/index.css'
import './App.css'


const lessons = [
  ['Semantic color', 'Give colors a job', 'Surface, text, border, and primary describe roles. Replace a palette and those roles stay intact. Every strong background needs a readable foreground partner.'],
  ['Visual hierarchy', 'Make the next step obvious', 'Size, weight, spacing, and contrast establish reading order. Reserve the strongest fill for the main action. If every button is primary, none of them leads.'],
  ['Surface hierarchy', 'Separate without decorating', 'The background holds the workspace; panels group related content. Borders mark boundaries. Save elevation for overlapping or temporary content.'],
  ['Spacing and density', 'Use a rhythm', 'Our scale uses 4, 8, 12, 16, 24, and 32 pixels. Small gaps join related items; larger gaps separate ideas. Compact density changes controls and padding while keeping text readable.'],
  ['Interaction states', 'Explain what changed', 'Hover suggests an action; focus shows keyboard position; pressed confirms activation; selected persists. Errors need a written explanation as well as a color.'],
  ['Motion', 'Respond, then settle', 'Fast feedback makes a control feel responsive. Hover lifts by one pixel, pressing gently compresses, and new content settles over 220 milliseconds. Motion explains a change; reduced-motion preferences remove movement.'],
  ['Design language', 'Keep identity across themes', 'Typography, spacing, shape, surface roles, and interaction carry the identity across green, purple, or your brand. A palette is one expression of the language.'],
]

function Workbench() {
  const [query, setQuery] = useState('')
  const [ready, setReady] = useState(false)
  const [notice, setNotice] = useState('')
  const [projects, setProjects] = useState([
    { name: 'Interface foundations', kind: 'Design system', ready: false },
    { name: 'The learning workbench', kind: 'Education', ready: true },
    { name: 'A quieter PDF studio', kind: 'Productivity', ready: true },
  ])
  const visible = projects.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) && (!ready || p.ready))
  return <div className="workbench">
    <aside className="sidebar"><p className="aar-eyebrow">Your workspace</p><h3 className="aar-heading">Fieldnotes</h3><div className="sidebar-nav"><button className="aar-button" aria-pressed={!ready} onClick={() => setReady(false)}>All projects <span>{projects.length}</span></button><button className="aar-button" aria-pressed={ready} onClick={() => setReady(true)}>Ready <span>{projects.filter(p => p.ready).length}</span></button></div><p className="sidebar-note">Less visual noise.<br />More room to think.</p></aside>
    <section className="workspace"><div className="section-head"><div><p className="aar-eyebrow">Workspace / Projects</p><h2 className="aar-heading">Good ideas start here.</h2><p className="aar-hint">A real composition to test the language in context.</p></div><button className="aar-button" data-variant="primary" onClick={() => { setProjects([...projects, { name: `Untitled project ${projects.length + 1}`, kind: 'New project', ready: false }]); setNotice('Project created.'); setReady(false); setQuery('') }}>+ New project</button></div>
    <div className="stats">{[['Projects', String(projects.length).padStart(2, '0')], ['Ready to share', String(projects.filter(p => p.ready).length).padStart(2, '0')], ['Design principle', 'Clarity']].map(([label, value]) => <div className="aar-panel" key={label}><p className="aar-eyebrow">{label}</p><p className="stat-value">{value}</p></div>)}</div>
    <label className="aar-field">Find a project<input className="aar-input" type="search" placeholder="Search your projects…" value={query} onChange={e => setQuery(e.target.value)} /></label>
    <div className="project-list aar-stagger">{visible.map((p, index) => <article className="project aar-enter" style={{ '--aar-order': index } as CSSProperties} key={p.name}><span className="project-icon" aria-hidden="true">↗</span><div><h3>{p.name}</h3><p className="aar-hint">{p.kind}</p></div><span className="aar-badge" data-tone={p.ready ? 'success' : undefined}>{p.ready ? 'Ready' : 'In progress'}</span></article>)}</div>
    {!visible.length && <div className="aar-empty aar-enter"><h3 className="aar-heading">No matching projects</h3><p className="aar-hint">Try a different name or clear your filters.</p><button className="aar-button" onClick={() => { setQuery(''); setReady(false) }}>Clear filters</button></div>}
    <p className="aar-hint notice" role="status">{notice || 'Your ideas, organized. All demo changes are temporary.'}</p></section>
  </div>
}

function Specimens() {
  const [selected, setSelected] = useState(false)
  const [replay, setReplay] = useState(0)
  return <div className="specimens">
    <section className="aar-panel specimen"><p className="aar-eyebrow">01 / Actions</p><h2 className="aar-heading">A clear priority</h2><p className="aar-hint">Hover, click, and use Tab to inspect actual states.</p><div className="aar-toolbar"><button className="aar-button" data-variant="primary">Primary action</button><button className="aar-button">Secondary</button><button className="aar-button" data-variant="quiet">Quiet</button><button className="aar-button" data-variant="danger">Delete</button><button className="aar-button" disabled>Unavailable</button><button className="aar-button" aria-pressed={selected} onClick={() => setSelected(!selected)}>{selected ? '✓ Selected' : 'Select'}</button></div></section>
    <section className="aar-panel specimen"><p className="aar-eyebrow">02 / Inputs</p><h2 className="aar-heading">Explain what is needed</h2><label className="aar-field">Project name<input className="aar-input" placeholder="Give your idea a name" /></label><label className="aar-field">Email address<input className="aar-input" defaultValue="hello@" aria-invalid="true" aria-describedby="email-error" /><span className="aar-hint" data-tone="danger" id="email-error">Enter a complete address, such as hello@example.com.</span></label><label className="aar-field">Workspace ID<input className="aar-input" value="FIELD-001" disabled /></label></section>
    <section className="aar-panel specimen"><p className="aar-eyebrow">03 / Meaning</p><h2 className="aar-heading">Status beyond color</h2><div className="aar-toolbar"><span className="aar-badge">Draft</span><span className="aar-badge" data-tone="success">✓ Ready</span><span className="aar-badge" data-tone="danger">! Needs attention</span></div><p className="aar-hint">Words and symbols carry meaning even when colors are hard to distinguish.</p><div className="swatches">{['background', 'surface', 'surface-subtle', 'primary', 'text', 'border'].map(token => <div key={token}><span style={{ background: `var(--aar-${token})` }} /><code>{token}</code></div>)}</div></section>
    <section className="aar-panel specimen"><p className="aar-eyebrow">04 / Typography</p><h2 className="aar-title">Room to think.</h2><h3 className="aar-heading">A heading establishes a group.</h3><p>Body text explains the task in a comfortable reading rhythm.</p><p className="aar-hint">Supporting text adds context without competing.</p><p className="aar-eyebrow">Monospace identifies metadata</p></section>
    <section className="aar-panel specimen wide"><p className="aar-eyebrow">06 / Motion study</p><h2 className="aar-heading">A small rhythm, a clear arrival</h2><p className="aar-hint">Items arrive 35 ms apart. The delay caps at 140 ms, so the sequence stays brief.</p><div><button className="aar-button" onClick={() => setReplay(replay + 1)}>Replay motion</button></div><div className="motion-study aar-stagger" key={replay}>{['Context', 'Content', 'Action'].map((label, index) => <div className="aar-panel aar-enter" key={label} style={{ '--aar-order': index } as CSSProperties}><span className="aar-eyebrow">0{index + 1}</span><h3 className="aar-heading">{label}</h3></div>)}</div></section>
    <section className="aar-panel specimen wide"><p className="aar-eyebrow">05 / Empty state</p><div className="aar-empty"><span className="empty-icon" aria-hidden="true">+</span><h2 className="aar-heading">Make space for your next idea</h2><p className="aar-hint">Explain the situation and offer a useful next step.</p><button className="aar-button" data-variant="primary">Create your first project</button></div></section>
  </div>
}

function AarCraftDocs() {
  const [theme, setTheme] = useState('light')
  const [palette, setPalette] = useState('forest')
  const [density, setDensity] = useState('comfortable')
  const [view, setView] = useState('workbench')
  const [primary, setPrimary] = useState('#2458a6')
  const [onPrimary, setOnPrimary] = useState('#ffffff')
  const [compare, setCompare] = useState(false)
  const colors = palette === 'custom' ? { '--aar-primary': primary, '--aar-on-primary': onPrimary, '--aar-focus': primary } as CSSProperties : undefined
  return <div className="aar-root lab package-lab" data-theme={theme} data-palette={palette} data-density={density} style={colors}>
    <section className="lab-content"><section className="intro"><div><div className="package-logo"><img src={`${import.meta.env.BASE_URL}brand/aar-craft.png`} alt="Aar Craft" /></div><p className="aar-eyebrow">Aar Craft / CSS design language</p><h1 className="aar-title">Less noise.<br /><span>More intention.</span></h1></div><div className="intro-copy"><p>A CSS-only language for thoughtful tools. Precise surfaces, purposeful color, and space to focus.</p><p className="aar-hint">Change the expression. Keep the underlying rules.</p></div></section>
    <section className="aar-panel package-setup"><h2 className="aar-heading">Getting started</h2><p>Import the CSS, opt in with <code>aar-root</code>, and choose a theme. No React runtime is required.</p><p>Copy these complete index.html and styles.css files into a project with npm CSS import support, such as Vite. Registry publication of the package is pending.</p><CodeBlock title="index.html" language="html" code={quickstartHtml} /><CodeBlock title="styles.css" language="css" code={quickstartCss} /><p className="aar-hint">Customize semantic variables such as --aar-primary and --aar-on-primary. Explore the live theme controls below.</p></section>
    <section className="aar-panel controls" aria-label="Visual testing controls"><label className="aar-field">Appearance<select aria-label="Appearance" className="aar-input" value={theme} onChange={e => setTheme(e.target.value)}><option value="light">Light</option><option value="dark">Dark</option><option value="system">System</option></select></label><label className="aar-field">Palette<select aria-label="Palette" className="aar-input" value={palette} onChange={e => setPalette(e.target.value)}><option value="forest">Forest</option><option value="iris">Iris</option><option value="custom">Your colors</option></select></label><label className="aar-field">Density<select aria-label="Density" className="aar-input" value={density} onChange={e => setDensity(e.target.value)}><option value="comfortable">Comfortable</option><option value="compact">Compact</option></select></label>{palette === 'custom' && <><label className="aar-field">Primary<input className="aar-input color-input" type="color" value={primary} onChange={e => setPrimary(e.target.value)} /></label><label className="aar-field">On primary<input className="aar-input color-input" type="color" value={onPrimary} onChange={e => setOnPrimary(e.target.value)} /></label></>}<label className="compare-control"><input type="checkbox" checked={compare} onChange={e => setCompare(e.target.checked)} />Compare light & dark</label></section>
    {palette === 'custom' && <p className="aar-hint color-note">Choose a readable primary / on-primary pair. Custom colors apply to both appearances and are not automatically contrast-safe.</p>}
    <nav className="lab-nav" aria-label="Playground sections">{[['workbench', 'Workbench'], ['specimens', 'Components'], ['learn', 'Design lessons']].map(([id, label]) => <button className="aar-button" key={id} aria-pressed={view === id} onClick={() => setView(id)}>{label}</button>)}</nav>
    <div id="playground" className="aar-enter" key={view} tabIndex={-1}>{view === 'workbench' || view === 'specimens' ? <div className={compare ? 'comparison' : ''}>{(compare ? ['light', 'dark'] : [theme]).map(appearance => <section className="aar-root preview" key={appearance} data-theme={appearance} data-palette={palette} data-density={density} style={colors} aria-label={`${appearance} preview`}><div className="preview-label"><span className="aar-eyebrow">{view === 'workbench' ? 'In context' : 'Component specimens'}</span><span className="aar-eyebrow">{appearance} / {palette}</span></div>{view === 'workbench' ? <Workbench /> : <Specimens />}</section>)}</div> : view === 'learn' ? <section className="lessons">{lessons.map(([concept, title, text], index) => <article className="aar-panel lesson" key={concept}><span className="lesson-number">0{index + 1}</span><p className="aar-eyebrow">{concept}</p><h2 className="aar-heading">{title}</h2><p>{text}</p></article>)}</section> : null}</div>
    <section className="review"><div><p className="aar-eyebrow">How to look</p><h2 className="aar-heading">Test the rules, then the details.</h2></div><ol><li><b>Hierarchy</b> — Can you identify the main action at a glance?</li><li><b>Theme</b> — Compare surfaces, text, and controls in both appearances.</li><li><b>Interaction</b> — Tab through controls; inspect focus, hover, pressed, and disabled.</li><li><b>Resilience</b> — Resize to mobile, zoom to 200%, and try longer text.</li></ol></section>
    <footer className="lab-footer"><span>Aar Craft / A language in progress</span><span>CSS foundation. No runtime dependency.</span></footer></section>
  </div>
}
export default AarCraftDocs
