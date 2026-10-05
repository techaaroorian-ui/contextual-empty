import { useState } from 'react'

export default function PhilosophyGuide() {
  const [activeCycle, setActiveCycle] = useState<'incantation' | 'altar' | 'seal'>('altar')
  const [realm, setRealm] = useState<'obsidian' | 'parchment'>('obsidian')

  return (
    <section className="lab-content package-docs">
      <div className="package-setup">
        <p className="aar-eyebrow">Aar Craft · Design Philosophy</p>
        <h1 className="aar-title">The Arcane Atelier</h1>
        <p className="aar-subtitle" style={{ fontSize: '1.25rem', color: 'var(--aar-text-muted)', fontStyle: 'italic', margin: '0.5rem 0 1rem' }}>
          &ldquo;Code is modern spellcasting. The workspace is your alchemy bench.&rdquo;
        </p>
        <p>
          Aar Craft fuses <strong>modern software ergonomics</strong> with the precision and atmospheric depth of an <strong>Arcane Atelier</strong> (Tech-Mage / Digital Alchemy). In creative engineering tools like Yuwbrndr, creators write structured parameters and logic that deterministically transmute in real-time into visual artifacts.
        </p>
        <p>
          Rather than superficial fantasy ornament or skeuomorphic kitsch, Aar Craft channels the spirit of <strong>astrolabes, sacred geometry, alchemical manuscripts, and precision laboratory instruments</strong>: 1px etched hairlines, obsidian slate surfaces, crisp parchment vellum, luminous focus auras, and clean functional state runes.
        </p>
      </div>

      {/* The Transmutation Cycle */}
      <div className="package-setup" style={{ marginTop: '2.5rem' }}>
        <h2 className="aar-heading">1. The Transmutation Cycle</h2>
        <p>
          Every creative tool and studio surface built with Aar Craft is organized around three deterministic stages:
        </p>

        <div className="aar-segmented" role="tablist" aria-label="Transmutation Stages" style={{ marginBottom: '1.25rem' }}>
          <button
            type="button"
            className="aar-segmented-item"
            data-active={activeCycle === 'incantation'}
            onClick={() => setActiveCycle('incantation')}
          >
            ✧ 1. Incantation (Inputs)
          </button>
          <button
            type="button"
            className="aar-segmented-item"
            data-active={activeCycle === 'altar'}
            onClick={() => setActiveCycle('altar')}
          >
            ⟡ 2. The Altar (Canvas)
          </button>
          <button
            type="button"
            className="aar-segmented-item"
            data-active={activeCycle === 'seal'}
            onClick={() => setActiveCycle('seal')}
          >
            ✓ 3. The Seal (Artifact)
          </button>
        </div>

        <div className="aar-card" style={{ padding: '1.5rem', border: '1px solid var(--aar-border-strong)', background: 'var(--aar-surface-raised)' }}>
          {activeCycle === 'incantation' && (
            <div className="aar-stack" style={{ gap: '0.75rem' }}>
              <div className="aar-cluster" style={{ justifyContent: 'space-between' }}>
                <span className="aar-badge" data-variant="primary">Stage 1 · Intent</span>
                <span className="aar-hint">Monospace Precision</span>
              </div>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>The Incantation (Code, Sliders &amp; Form Fields)</h3>
              <p style={{ margin: 0, color: 'var(--aar-text-muted)' }}>
                The author's intent is expressed cleanly without visual friction. Inputs use clear monospace typography, strict boundaries, and non-distracting controls so creative logic remains the focus.
              </p>
              <div className="aar-cluster" style={{ gap: '0.5rem', marginTop: '0.5rem' }}>
                <code style={{ fontSize: '0.85rem' }}>&lt;input class="aar-input" /&gt;</code>
                <code style={{ fontSize: '0.85rem' }}>&lt;div class="aar-segmented" /&gt;</code>
                <code style={{ fontSize: '0.85rem' }}>&lt;input type="range" class="aar-range" /&gt;</code>
              </div>
            </div>
          )}

          {activeCycle === 'altar' && (
            <div className="aar-stack" style={{ gap: '0.75rem' }}>
              <div className="aar-cluster" style={{ justifyContent: 'space-between' }}>
                <span className="aar-badge" data-variant="primary">Stage 2 · Live Transformation</span>
                <span className="aar-hint">Framed Geometry</span>
              </div>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>The Altar of Transmutation (The Viewport)</h3>
              <p style={{ margin: 0, color: 'var(--aar-text-muted)' }}>
                The canvas is the focal, central altar of the studio. It is framed with quiet precision—matte elevation, etched corner brackets (<code style={{ padding: '0 4px' }}>data-corner-brackets="true"</code>), and pan-zoom math isolated from surrounding chrome.
              </p>
              <div
                className="aar-altar"
                data-corner-brackets="true"
                style={{
                  minHeight: '120px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--aar-surface)',
                  margin: '0.5rem 0',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '1.75rem' }}>⟡</span>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.9rem', color: 'var(--aar-text-muted)' }}>
                    Artwork rendered in isolated coordinates
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeCycle === 'seal' && (
            <div className="aar-stack" style={{ gap: '0.75rem' }}>
              <div className="aar-cluster" style={{ justifyContent: 'space-between' }}>
                <span className="aar-badge" data-variant="primary">Stage 3 · Resolution</span>
                <span className="aar-hint">Definitive State</span>
              </div>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>The Seal of Resolution (Export &amp; Share)</h3>
              <p style={{ margin: 0, color: 'var(--aar-text-muted)' }}>
                Completing, publishing, or sharing the work is the definitive ceremony. Success states, compressed URL sharing (<code style={{ padding: '0 4px' }}>@techaaroorian-ui/share-state</code>), and high-DPI renders provide unmistakable, confident feedback.
              </p>
              <div className="aar-cluster" style={{ gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" className="aar-button" data-variant="primary">
                  <span>✓</span>
                  <span>Seal &amp; Export</span>
                </button>
                <span className="aar-hint">Clean, verified artifact resolution.</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Visual Grammar & Rules */}
      <div className="package-setup" style={{ marginTop: '2.5rem' }}>
        <h2 className="aar-heading">2. Core Architectural Rules</h2>
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
              <th scope="row">I. Precision over Ornament</th>
              <td>
                Magic in mathematics and science is exacting. No faux-leather, skeumorphism, or decorative novelty noise.
              </td>
              <td>
                Delicate 1px etched hairlines (<code style={{ fontSize: '0.8rem' }}>--aar-border</code>). Surfaces group related workflows without heavy drop-shadows or clutter.
              </td>
            </tr>
            <tr>
              <th scope="row">II. Dual Realms</th>
              <td>
                Two deliberate atmospheres: <strong>Obsidian</strong> (deep cosmic void) and <strong>Parchment</strong> (warm tactile vellum).
              </td>
              <td>
                Configured cleanly with <code style={{ fontSize: '0.8rem' }}>data-theme="dark|light"</code> and <code style={{ fontSize: '0.8rem' }}>data-palette="obsidian|parchment|jade"</code>.
              </td>
            </tr>
            <tr>
              <th scope="row">III. Luminous Intent</th>
              <td>
                Instead of harsh default browser rings, interaction acknowledges user attention through focused illumination.
              </td>
              <td>
                Hover lifts controls by 1px. Focus states project a soft, atmospheric aura via <code style={{ fontSize: '0.8rem' }}>--aar-glow</code> while remaining WCAG AAA contrast compliant.
              </td>
            </tr>
            <tr>
              <th scope="row">IV. Functional Runes</th>
              <td>
                Symbols are used exclusively to communicate active runtime state, never as arbitrary decoration.
              </td>
              <td>
                Strict rune vocabulary: <code style={{ padding: '0 4px' }}>✧</code> Available, <code style={{ padding: '0 4px' }}>✦</code> Active, <code style={{ padding: '0 4px' }}>⟡</code> Transmuting, <code style={{ padding: '0 4px' }}>✓</code> Sealed.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Functional Runes Showcase */}
      <div className="package-setup" style={{ marginTop: '2.5rem' }}>
        <h2 className="aar-heading">3. The Functional Rune Vocabulary</h2>
        <p>
          State markers give users instant, universal understanding across complex multi-panel tools:
        </p>

        <div className="aar-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div className="aar-card" style={{ padding: '1rem', border: '1px solid var(--aar-border)' }}>
            <div className="aar-cluster" style={{ alignItems: 'baseline', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem', color: 'var(--aar-text-muted)' }}>✧</span>
              <strong>Idle / Potential</strong>
            </div>
            <p style={{ margin: '0.5rem 0 0', fontSize: '0.85rem', color: 'var(--aar-text-muted)' }}>
              Represents an available capability, dormant parameter, or secondary action.
            </p>
          </div>

          <div className="aar-card" style={{ padding: '1rem', border: '1px solid var(--aar-border-strong)' }}>
            <div className="aar-cluster" style={{ alignItems: 'baseline', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem', color: 'var(--aar-primary)' }}>✦</span>
              <strong>Active / Selected</strong>
            </div>
            <p style={{ margin: '0.5rem 0 0', fontSize: '0.85rem', color: 'var(--aar-text-muted)' }}>
              Marks the currently selected layer, tool mode, or illuminated view.
            </p>
          </div>

          <div className="aar-card" style={{ padding: '1rem', border: '1px solid var(--aar-border)' }}>
            <div className="aar-cluster" style={{ alignItems: 'baseline', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem', color: 'var(--aar-accent, #6366f1)' }}>⟡</span>
              <strong>Transmuting</strong>
            </div>
            <p style={{ margin: '0.5rem 0 0', fontSize: '0.85rem', color: 'var(--aar-text-muted)' }}>
              Indicates dynamic calculation, rendering pass, or real-time compilation.
            </p>
          </div>

          <div className="aar-card" style={{ padding: '1rem', border: '1px solid var(--aar-border)' }}>
            <div className="aar-cluster" style={{ alignItems: 'baseline', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem', color: '#10b981' }}>✓</span>
              <strong>The Seal (Resolved)</strong>
            </div>
            <p style={{ margin: '0.5rem 0 0', fontSize: '0.85rem', color: 'var(--aar-text-muted)' }}>
              Confirms cryptographic verification, export readiness, or permanent save.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Realm Swatch */}
      <div className="package-setup" style={{ marginTop: '2.5rem' }}>
        <h2 className="aar-heading">4. Realm Exploration (Atmospheric Tones)</h2>
        <p>
          Toggle between the two primary realms to see how Aar Craft balances density, readability, and contrast:
        </p>

        <div className="aar-segmented" role="tablist" style={{ marginBottom: '1.25rem', width: 'fit-content' }}>
          <button
            type="button"
            className="aar-segmented-item"
            data-active={realm === 'obsidian'}
            onClick={() => setRealm('obsidian')}
          >
            ✦ Obsidian Realm (Dark)
          </button>
          <button
            type="button"
            className="aar-segmented-item"
            data-active={realm === 'parchment'}
            onClick={() => setRealm('parchment')}
          >
            ✧ Parchment Realm (Light)
          </button>
        </div>

        <div
          className="aar-root aar-panel"
          data-theme={realm === 'obsidian' ? 'dark' : 'light'}
          data-palette={realm === 'obsidian' ? 'obsidian' : 'parchment'}
          style={{
            padding: '1.75rem',
            borderRadius: 'var(--aar-radius-lg)',
            border: '1px solid var(--aar-border-strong)',
            transition: 'background-color 0.25s ease, color 0.25s ease',
          }}
        >
          <div className="aar-stack" style={{ gap: '1.25rem' }}>
            <div className="aar-cluster" style={{ justifyContent: 'space-between' }}>
              <div>
                <p className="aar-eyebrow" style={{ margin: 0 }}>
                  {realm === 'obsidian' ? 'Midnight Slate & Starlight' : 'Hand-Pressed Vellum & Iron-Gall Ink'}
                </p>
                <h3 style={{ margin: '0.25rem 0 0', fontSize: '1.2rem' }}>
                  {realm === 'obsidian' ? 'Obsidian Atelier' : 'Parchment Script'}
                </h3>
              </div>
              <span className="aar-badge" data-variant="primary">
                {realm === 'obsidian' ? 'Low-Light Studio' : 'High-Clarity Document'}
              </span>
            </div>

            <div className="aar-cluster" style={{ gap: '1rem' }}>
              <button type="button" className="aar-button" data-variant="primary">
                <span>✦</span> Primary Seal
              </button>
              <button type="button" className="aar-button">
                <span>✧</span> Standard Action
              </button>
              <button type="button" className="aar-button" data-variant="quiet">
                Quiet Utility
              </button>
            </div>

            <div
              className="aar-altar"
              data-corner-brackets="true"
              style={{
                padding: '1.25rem',
                textAlign: 'center',
                background: 'var(--aar-surface-raised)',
              }}
            >
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--aar-text-muted)' }}>
                Etched corner brackets frame the canvas in both realms with zero pixel distortion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
