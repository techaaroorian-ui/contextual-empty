import { useState } from 'react';
import { Plus, Minus, Sparkles } from 'lucide-react';
import { usePanZoom } from '../../../packages/pan-zoom/src/react';

const PRESETS = [
  { name: 'LinkedIn Banner', width: 1200, height: 627 },
  { name: 'Instagram Square', width: 1080, height: 1080 },
  { name: 'Mobile Story', width: 1080, height: 1920 },
];

export default function PanZoomExample() {
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);

  const {
    containerRef,
    zoom,
    renderedWidth,
    renderedHeight,
    autoFit,
    toggleAutoFit,
    zoomIn,
    zoomOut,
    resetZoom,
  } = usePanZoom({
    contentWidth: selectedPreset.width,
    contentHeight: selectedPreset.height,
    padding: 24,
    initialAutoFit: true,
  });

  return (
    <div className="aar-stack" data-gap="3" style={{ width: '100%' }}>
      <div className="aar-cluster" data-align="between">
        <div className="aar-segmented" role="tablist">
          {PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              role="tab"
              aria-selected={selectedPreset.name === preset.name}
              onClick={() => setSelectedPreset(preset)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
            >
              {selectedPreset.name === preset.name && <Sparkles size={12} />}
              {preset.name} ({preset.width}×{preset.height})
            </button>
          ))}
        </div>

        <div className="aar-cluster">
          <button className="aar-icon-button" onClick={zoomOut} title="Zoom Out" aria-label="Zoom Out"><Minus size={14} /></button>
          <span className="aar-kbd">{Math.round(zoom * 100)}%</span>
          <button className="aar-icon-button" onClick={zoomIn} title="Zoom In" aria-label="Zoom In"><Plus size={14} /></button>
          <button className="aar-button" data-variant="quiet" onClick={resetZoom}>100%</button>
          <label className="aar-toggle">
            <input type="checkbox" checked={autoFit} onChange={toggleAutoFit} />
            <span>Auto-Fit</span>
          </label>
        </div>
      </div>

      <div
        ref={containerRef}
        className="aar-altar"
        data-corner-brackets="true"
        style={{
          width: '100%',
          height: '320px',
          border: '1px solid var(--aar-border)',
          borderRadius: 'var(--aar-radius-md)',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: `${renderedWidth}px`,
            height: `${renderedHeight}px`,
            background: 'var(--aar-surface)',
            border: '2px dashed var(--aar-primary)',
            borderRadius: 'var(--aar-radius-sm)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            textAlign: 'center',
            boxShadow: 'var(--aar-shadow-md)',
            transition: 'width 100ms ease, height 100ms ease',
          }}
        >
          <p className="aar-eyebrow" style={{ margin: 0 }}>Altar Canvas</p>
          <h4 className="aar-heading" style={{ margin: '.25rem 0', fontSize: '1rem' }}>
            {selectedPreset.name}
          </h4>
          <span className="aar-badge" data-tone="success">
            {renderedWidth}px × {renderedHeight}px @ {Math.round(zoom * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}
