import { useState } from 'react'
import { ArrowRight, Check, Download, Plus, Search, Settings, TriangleAlert } from 'lucide-react'
import { SearchEmpty } from '@techaaroorian-ui/contextual-empty'

const actionCode = `import { Download, Settings } from 'lucide-react';

<button className="product-button" onClick={download}>
  <Download size={18} strokeWidth={1.75} aria-hidden="true" />
  Download
</button>

<button className="product-icon-button" aria-label="Open settings">
  <Settings size={20} aria-hidden="true" />
</button>`;
const emptyCode = `import { Search } from 'lucide-react';
import { SearchEmpty } from '@techaaroorian-ui/contextual-empty';
import '@techaaroorian-ui/contextual-empty/dist/index.css';

<SearchEmpty
  query="drafts"
  icon={<Search size={32} strokeWidth={1.75} aria-hidden="true" />}
  onClear={clearSearch}
/>`;

export default function IconGuide() {
  const [message, setMessage] = useState('Try an action below.')
  return <section className="lab-content package-docs">
    <div className="intro"><div><p className="aar-eyebrow">Collection guide / Icons</p><h1 className="aar-title">Lucide icons</h1></div><div className="intro-copy"><p>One consistent icon family for your application.</p><p className="aar-hint">Recommended integration, independent of Aar Craft. Logos remain custom brand assets.</p></div></div>
    <section className="aar-panel package-setup"><h2 className="aar-heading">Install in your application</h2><pre><code>npm install lucide-react</code></pre><p>Import the icons you use by name. Size, color, and strokeWidth can be set per icon. Lucide renders inline SVG and supports tree shaking. <a href="https://lucide.dev/guide/react">Official React guide</a>.</p><p className="aar-hint">This docs app uses Lucide. Neither Aar Craft nor Contextual Empty requires it. Non-React apps can use Lucide SVG assets or its framework-specific packages.</p></section>
    <section className="aar-panel package-setup"><h2 className="aar-heading">Actions and labels</h2><div className="aar-toolbar"><button className="aar-button" onClick={() => setMessage('Download action received; this example does not export a file.')}><Download size={18} strokeWidth={1.75} aria-hidden="true" />Download</button><button className="aar-button" aria-label="Open settings" onClick={() => setMessage('Settings action received.')}><Settings size={20} aria-hidden="true" /></button><button className="aar-button" onClick={() => setMessage('Create action received.')}><Plus size={18} aria-hidden="true" />Create project</button></div><p className="aar-hint" role="status">{message}</p><pre><code>{actionCode}</code></pre><p>Put the accessible name on an icon-only button. Hide decorative icons beside visible text from assistive technology. <a href="https://lucide.dev/how-to/accessibility">Lucide accessibility guide</a>.</p></section>
    <section className="aar-panel package-setup"><h2 className="aar-heading">Status uses words too</h2><div className="aar-toolbar"><span className="aar-badge" data-tone="success"><Check size={14} aria-hidden="true" />Saved</span><span className="aar-badge" data-tone="danger"><TriangleAlert size={14} aria-hidden="true" />Needs attention</span><span className="aar-badge"><ArrowRight size={14} aria-hidden="true" />Next step</span></div><p>Keep icon meaning consistent across screens. Shape and text explain a status; color reinforces it.</p></section>
    <section className="aar-panel package-setup"><h2 className="aar-heading">With Contextual Empty</h2><div className="empty-demo"><SearchEmpty query="drafts" icon={<Search size={32} strokeWidth={1.75} aria-hidden="true" />} onClear={() => setMessage('Search clear action received.')} /></div><pre><code>{emptyCode}</code></pre><p className="aar-hint">The consumer supplies the icon through the existing icon prop. No package coupling is needed.</p></section>
    <section className="aar-panel package-setup"><h2 className="aar-heading">Our recommended conventions</h2><ul><li>16–20 px for controls; 24–32 px for larger contextual illustrations.</li><li>Use a consistent stroke width within a screen; start with 1.75 or 2.</li><li>Inherit text color using currentColor.</li><li>Give icon buttons a generous hit area—our docs use at least 44 px.</li><li>Keep keyboard focus visible and use labels for unfamiliar actions.</li></ul><p className="aar-hint">These are collection conventions, not requirements imposed by the CSS framework.</p></section>
  </section>
}
