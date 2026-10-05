import { useState } from 'react'
import { Plus, Search, TriangleAlert } from 'lucide-react'
import {
  ContextualEmptyState,
  FirstUseEmpty,
  SearchEmpty,
  ErrorEmpty,
} from '@techaaroorian-ui/contextual-empty'
import '@techaaroorian-ui/aar-craft/index.css'

export default function ContextualEmptyExample() {
  const [view, setView] = useState('first-use')
  const [notice, setNotice] = useState('')

  return (
    <div className="aar-root aar-stack" data-gap="4">
      <div className="aar-cluster" aria-label="Empty state examples">
        {[
          ['first-use', '✧ Canvas Empty (First Use)'],
          ['search', '⟡ Search Void'],
          ['error', '! Transmutation Error'],
          ['compound', '✦ Compound Altar'],
        ].map(([id, label]) => (
          <button
            className="aar-button"
            data-variant={view === id ? 'primary' : 'quiet'}
            aria-pressed={view === id}
            key={id}
            onClick={() => {
              setView(id)
              setNotice('')
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div key={view}>
        {view === 'first-use' && (
          <FirstUseEmpty
            className="aar-contextual-empty"
            title="Your canvas is empty"
            description="Initialize your first studio artboard or choose a preset to begin creating."
            actionText="Create artboard"
            icon={<Plus size={32} strokeWidth={1.75} aria-hidden="true" />}
            onCreate={() =>
              setNotice('Create action received: Initializing a new studio artboard.')
            }
          />
        )}

        {view === 'search' && (
          <SearchEmpty
            className="aar-contextual-empty"
            query="geometric pattern"
            icon={<Search size={32} strokeWidth={1.75} aria-hidden="true" />}
            onClear={() =>
              setNotice('Clear query action received: Restoring full grimoire asset list.')
            }
          />
        )}

        {view === 'error' && (
          <ErrorEmpty
            className="aar-contextual-empty"
            title="Transmutation interrupted"
            errorMessage="Unable to compile canvas parameters. Check your network or syntax and try again."
            actionText="Retry transmutation"
            icon={<TriangleAlert size={32} strokeWidth={1.75} aria-hidden="true" />}
            onRetry={() =>
              setNotice('Retry action received: Re-attempting reactive compilation.')
            }
          />
        )}

        {view === 'compound' && (
          <ContextualEmptyState className="aar-contextual-empty" type="error">
            <ContextualEmptyState.Icon>
              <span style={{ fontSize: '2rem', color: 'var(--aar-primary)' }}>⟡</span>
            </ContextualEmptyState.Icon>
            <ContextualEmptyState.Content>
              <h3 className="aar-heading">The Canvas Altar is Dormant</h3>
              <p className="aar-hint">No active layers or parameters are bound to this stage. Select a preset or type code to begin.</p>
            </ContextualEmptyState.Content>
            <ContextualEmptyState.Actions>
              <button
                className="aar-button"
                data-variant="primary"
                onClick={() => setNotice('Altar ignited: Loaded 1200×627 Social Banner preset.')}
              >
                ✦ Ignite Starter Preset
              </button>
            </ContextualEmptyState.Actions>
          </ContextualEmptyState>
        )}
      </div>

      <p className="aar-hint" role="status" style={{ minHeight: '1.5rem', marginTop: '1rem' }}>
        {notice || 'Select an empty state above, then trigger its recovery action.'}
      </p>
    </div>
  )
}
