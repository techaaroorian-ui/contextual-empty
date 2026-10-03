import { useState } from 'react'
import { Plus, Search, TriangleAlert } from 'lucide-react'
import { ContextualEmptyState, FirstUseEmpty, SearchEmpty, ErrorEmpty } from '@techaaroorian-ui/contextual-empty'

const presetCode = `import { SearchEmpty } from '@techaaroorian-ui/contextual-empty';
import '@techaaroorian-ui/aar-craft/index.css';

<SearchEmpty className="aar-contextual-empty" query="interface ideas" onClear={clearSearch} />`;
const compoundCode = `<ContextualEmptyState className="aar-contextual-empty" type="error">
  <ContextualEmptyState.Icon>!</ContextualEmptyState.Icon>
  <ContextualEmptyState.Content>
    <h3>Could not load projects</h3>
    <p>Check your connection and try again.</p>
  </ContextualEmptyState.Content>
  <ContextualEmptyState.Actions>
    <button onClick={retry}>Try again</button>
  </ContextualEmptyState.Actions>
</ContextualEmptyState>`;

export default function ContextualEmptyDocs() {
  const [view, setView] = useState('first-use')
  const [notice, setNotice] = useState('')
  return <section className="lab-content package-docs">
    <div className="intro"><div><p className="aar-eyebrow">React package</p><h1 className="aar-title">Contextual Empty</h1></div><div className="intro-copy"><p>Explain why a view is empty and offer a useful next step.</p><p className="aar-hint">Composable primitives, ready-made presets, and optional standalone styles.</p></div></div>
    <section className="aar-panel package-setup"><h2 className="aar-heading">Installation</h2><pre><code>npm install @techaaroorian-ui/contextual-empty</code></pre><p>Requires React and React DOM 18 or later. With Aar Craft, import its CSS and add aar-contextual-empty. Without Aar Craft, optionally import @techaaroorian-ui/contextual-empty/dist/index.css or provide your own styles.</p><pre><code>{presetCode}</code></pre></section>
    <section className="aar-panel package-setup"><h2 className="aar-heading">Live examples</h2><div className="aar-toolbar" aria-label="Empty state examples">{[['first-use', 'First use'], ['search', 'Search'], ['error', 'Error'], ['compound', 'Compound']].map(([id, label]) => <button className="aar-button" aria-pressed={view === id} key={id} onClick={() => { setView(id); setNotice('') }}>{label}</button>)}</div><div className="empty-demo" key={view}>
      {view === 'first-use' && <FirstUseEmpty className="aar-contextual-empty" itemName="Projects" icon={<Plus size={32} strokeWidth={1.75} aria-hidden="true" />} onCreate={() => setNotice('Create action received. Your application supplies the creation flow.')} />}
      {view === 'search' && <SearchEmpty className="aar-contextual-empty" query="interface ideas" icon={<Search size={32} strokeWidth={1.75} aria-hidden="true" />} onClear={() => setNotice('Clear-search action received. Your application clears the query.')} />}
      {view === 'error' && <ErrorEmpty className="aar-contextual-empty" icon={<TriangleAlert size={32} strokeWidth={1.75} aria-hidden="true" />} onRetry={() => setNotice('Retry action received. Your application supplies the request.')} />}
      {view === 'compound' && <ContextualEmptyState className="aar-contextual-empty" type="error"><ContextualEmptyState.Icon>!</ContextualEmptyState.Icon><ContextualEmptyState.Content><h3>Could not load projects</h3><p>Check your connection and try again.</p></ContextualEmptyState.Content><ContextualEmptyState.Actions><button className="aar-button" onClick={() => setNotice('Compound action received.')}>Try again</button></ContextualEmptyState.Actions></ContextualEmptyState>}
    </div><p className="aar-hint notice" role="status">{notice || 'Choose a state, then try its action.'}</p></section>
    <section className="aar-panel package-setup"><h2 className="aar-heading">Compose your own state</h2><p>The root accepts <code>type</code>, <code>className</code>, and children. Icon, Content, and Actions accept children and a className. The root exposes its type as <code>data-state</code>.</p><pre><code>{compoundCode}</code></pre></section>
    <section className="aar-panel package-setup"><h2 className="aar-heading">Available presets</h2><div className="table-scroll"><table className="docs-table"><thead><tr><th>Preset</th><th>Purpose</th><th>Action callback</th></tr></thead><tbody>{[['FirstUseEmpty', 'Nothing created yet', 'onCreate'], ['SearchEmpty', 'No search results', 'onClear'], ['FilterEmpty', 'No matching filters', 'onClearFilters'], ['PermissionEmpty', 'Access unavailable', 'onRequestAccess'], ['ErrorEmpty', 'Request failed', 'onRetry']].map(([name, purpose, action]) => <tr key={name}><td><code>{name}</code></td><td>{purpose}</td><td><code>{action}</code></td></tr>)}</tbody></table></div></section>
    <section className="aar-panel package-setup"><h2 className="aar-heading">Styling and accessibility</h2><p>Use className and CSS variables such as <code>--ce-gap</code>, <code>--ce-icon-size</code>, and <code>--ce-anim-duration</code>. Presets use native buttons, decorative icons are hidden from assistive technology, and base motion respects reduced-motion preferences.</p><p className="aar-hint">Aar Craft is optional. This documentation site uses it for presentation; the React package has its own styling contract. Your app owns focus management and announcements when results change.</p></section>
  </section>
}
