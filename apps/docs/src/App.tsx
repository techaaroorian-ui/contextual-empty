import { useEffect, useSyncExternalStore } from 'react'
import './App.css'
import './CollectionDocs.css'
import '../../../packages/aar-craft/src/index.css'
import AarCraftDocs from './AarCraftDocs'
import ContextualEmptyDocs from './ContextualEmptyDocs'
import IconGuide from './IconGuide'
import VersioningGuide from './VersioningGuide'
import HeadlessGuide from './HeadlessGuide'

function subscribe(listener: () => void) {
  window.addEventListener('hashchange', listener)
  return () => window.removeEventListener('hashchange', listener)
}
const snapshot = () => window.location.hash || '#/'
const pages = [['#/', 'Overview'], ['#/aar-craft', 'Aar Craft'], ['#/contextual-empty', 'Contextual Empty'], ['#/headless', 'Headless'], ['#/guides/icons', 'Icons'], ['#/guides/versioning', 'Versioning']]

export default function App() {
  const route = useSyncExternalStore(subscribe, snapshot)
  const known = pages.some(([path]) => path === route)
  const title = pages.find(([path]) => path === route)?.[1] || 'Page not found'
  useEffect(() => { document.title = `${title} · TechAaroorian UI` }, [title])
  return <div className="aar-root collection" data-theme="light">
    <a className="aar-button skip-link" href="#docs-content" onClick={event => { event.preventDefault(); const content = document.getElementById('docs-content'); content?.focus(); content?.scrollIntoView(); }}>Skip to documentation</a>
    <header className="collection-header"><a className="collection-brand" href="#/"><span className="collection-icon"><img src={`${import.meta.env.BASE_URL}brand/techaaroorian-ui.png`} alt="" /></span><span>TechAaroorian <b>UI</b></span></a><nav aria-label="Documentation packages">{pages.map(([path, label]) => <a key={path} className="aar-button" data-variant="quiet" href={path} aria-current={route === path ? 'page' : undefined}>{label}</a>)}</nav></header>
    <main id="docs-content" tabIndex={-1}>
      {route === '#/headless' ? <HeadlessGuide /> : route === '#/guides/icons' ? <IconGuide /> : route === '#/guides/versioning' ? <VersioningGuide /> : route === '#/aar-craft' ? <AarCraftDocs /> : route === '#/contextual-empty' ? <ContextualEmptyDocs /> : known ? <section className="lab-content collection-home"><div className="intro"><div><p className="aar-eyebrow">Tools for building thoughtful interfaces</p><h1 className="aar-title">TechAaroorian UI</h1></div><div className="intro-copy"><p>A collection of focused UI packages. Choose a design language, a composable component, or both.</p><p className="aar-hint">Each package has its own purpose and documentation.</p></div></div><div className="package-grid"><article className="aar-panel package-card"><div className="package-logo"><img src={`${import.meta.env.BASE_URL}brand/aar-craft.png`} alt="Aar Craft logo" /></div><p className="aar-eyebrow">CSS design language</p><h2 className="aar-heading">Aar Craft</h2><p>Opinionated components with custom themes, purposeful motion, and no runtime dependency.</p><code>@techaaroorian-ui/aar-craft</code><a className="aar-button" data-variant="primary" href="#/aar-craft">Explore Aar Craft →</a></article><article className="aar-panel package-card"><span className="empty-package-mark" aria-hidden="true">[ + ]</span><p className="aar-eyebrow">Composable React component</p><h2 className="aar-heading">Contextual Empty</h2><p>Explain first use, missing results, errors, and other empty states with a useful next action.</p><code>@techaaroorian-ui/contextual-empty</code><a className="aar-button" href="#/contextual-empty">Explore Contextual Empty →</a></article></div><section className="collection-note"><h2 className="aar-heading">Independent packages. One collection.</h2><p>Contextual Empty can use your existing styles. Aar Craft works with plain HTML and any application framework. Combine them when they fit your product.</p></section></section> : <section className="lab-content package-docs"><h1 className="aar-title">Page not found</h1><a className="aar-button" href="#/">Return to overview</a></section>}
    </main><footer className="collection-footer"><span>TechAaroorian UI</span><span>Design languages & composable components</span></footer>
  </div>
}
