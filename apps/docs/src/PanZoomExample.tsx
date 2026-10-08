import { useState } from "react";
import { Plus, Minus, Sparkles } from "lucide-react";
import { usePanZoom } from "../../../packages/pan-zoom/src/react";

const PRESETS = [
  { name: "LinkedIn Banner", width: 1200, height: 627 },
  { name: "Instagram Square", width: 1080, height: 1080 },
  { name: "Mobile Story", width: 1080, height: 1920 },
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
    <div className="aar-stack aar-w-100" data-gap="3">
      <div className="aar-cluster" data-align="between">
        <div className="aar-segmented" role="tablist">
          {PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              role="tab"
              aria-selected={selectedPreset.name === preset.name}
              onClick={() => setSelectedPreset(preset)}
              className="aar-display-inline-flex aar-items-center aar-gap-2"
            >
              {selectedPreset.name === preset.name && <Sparkles size={12} />}
              {preset.name} ({preset.width}×{preset.height})
            </button>
          ))}
        </div>

        <div className="aar-cluster">
          <button
            className="aar-icon-button"
            onClick={zoomOut}
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <Minus size={14} />
          </button>
          <span className="aar-kbd">{Math.round(zoom * 100)}%</span>
          <button
            className="aar-icon-button"
            onClick={zoomIn}
            title="Zoom In"
            aria-label="Zoom In"
          >
            <Plus size={14} />
          </button>
          <button
            className="aar-button"
            data-variant="quiet"
            onClick={resetZoom}
          >
            100%
          </button>
          <label className="aar-toggle">
            <input type="checkbox" checked={autoFit} onChange={toggleAutoFit} />
            <span>Auto-Fit</span>
          </label>
        </div>
      </div>

      <div
        ref={containerRef}
        className="aar-altar aar-w-100 aar-h-320px aar-border-1px-solid-border aar-radius-radius-md aar-position-relative"
        data-corner-brackets="true"
      >
        <div
          style={
            {
              "--aar-width": `${renderedWidth}px`,
              "--aar-height": `${renderedHeight}px`,
            } as React.CSSProperties
          }
          className="aar-bind-width aar-bind-height aar-bg-surface aar-border-2px-dashed-primary aar-radius-radius-sm aar-display-flex aar-direction-column aar-items-center aar-justify-center aar-p-4 aar-text-align-center aar-box-shadow-shadow-md aar-transition-width-100ms-ease-height-100ms-ease"
        >
          <p className="aar-eyebrow aar-m-0px">Altar Canvas</p>
          <h4 className="aar-heading aar-m-25rem-0 aar-text-1rem">
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
