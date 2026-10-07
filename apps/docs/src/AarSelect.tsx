import { useState, useRef, useEffect } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

export interface AarSelectOption {
  value: string
  label: ReactNode
  shortLabel?: ReactNode
}

export interface AarSelectProps {
  label?: string
  value: string
  options: AarSelectOption[]
  onChange: (value: string) => void
  style?: CSSProperties
  compact?: boolean
  menuAlign?: 'left' | 'right'
}

export default function AarSelect({
  label,
  value,
  options,
  onChange,
  style,
  compact = false,
  menuAlign = 'left',
}: AarSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false)
    }
    if (isOpen) {
      document.addEventListener('pointerdown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const selectedOption = options.find((opt) => opt.value === value) || options[0]

  return (
    <div
      className={label ? 'aar-field' : undefined}
      style={{ minWidth: compact ? '9.5rem' : '11rem', ...style }}
    >
      {label && <span>{label}</span>}
      <div className="aar-dropdown" data-open={isOpen} ref={containerRef}>
        <button
          type="button"
          className="aar-dropdown-trigger"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          style={compact ? { padding: '0.35rem 0.75rem', height: '2.25rem', fontSize: '0.8125rem' } : undefined}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            {(compact && selectedOption?.shortLabel) ? selectedOption.shortLabel : selectedOption?.label}
          </span>
          <span className="aar-dropdown-arrow" aria-hidden="true">
            <ChevronDown size={13} strokeWidth={2.4} />
          </span>
        </button>

        {isOpen && (
          <div
            className="aar-dropdown-menu"
            role="listbox"
            style={menuAlign === 'right' ? { left: 'auto', right: 0, minWidth: 'max-content' } : undefined}
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className="aar-dropdown-item"
                role="option"
                aria-selected={opt.value === value}
                onClick={() => {
                  onChange(opt.value)
                  setIsOpen(false)
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>{opt.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
