import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  calculateFit,
  clampZoom,
  stepZoom,
  DEFAULT_MIN_ZOOM,
  DEFAULT_MAX_ZOOM,
  DEFAULT_ZOOM_STEP,
  type ZoomBounds,
  type PanPoint,
} from './index.js';

export interface UsePanZoomOptions {
  contentWidth: number;
  contentHeight: number;
  padding?: number;
  initialZoom?: number;
  initialAutoFit?: boolean;
  minZoom?: number;
  maxZoom?: number;
  step?: number;
}

export interface UsePanZoomReturn {
  containerRef: React.RefObject<HTMLDivElement | null>;
  zoom: number;
  pan: PanPoint;
  autoFit: boolean;
  renderedWidth: number;
  renderedHeight: number;
  setZoom: (zoom: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  setAutoFit: (enabled: boolean) => void;
  toggleAutoFit: () => void;
  panBy: (deltaX: number, deltaY: number) => void;
  recalculateFit: () => void;
}

export function usePanZoom(options: UsePanZoomOptions): UsePanZoomReturn {
  const {
    contentWidth,
    contentHeight,
    padding = 32,
    initialZoom = 1.0,
    initialAutoFit = true,
    minZoom = DEFAULT_MIN_ZOOM,
    maxZoom = DEFAULT_MAX_ZOOM,
    step = DEFAULT_ZOOM_STEP,
  } = options;

  const [zoom, setZoomState] = useState<number>(() => clampZoom(initialZoom, { min: minZoom, max: maxZoom }));
  const [pan, setPan] = useState<PanPoint>({ x: 0, y: 0 });
  const [autoFit, setAutoFitState] = useState<boolean>(initialAutoFit);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const bounds: ZoomBounds = useMemo(
    () => ({ min: minZoom, max: maxZoom, step }),
    [minZoom, maxZoom, step]
  );

  const recalculateFit = useCallback(() => {
    const el = containerRef.current;
    if (!el || contentWidth <= 0 || contentHeight <= 0) return;

    const containerWidth = el.clientWidth;
    const containerHeight = el.clientHeight;

    if (containerWidth > 0 && containerHeight > 0) {
      const fit = calculateFit({
        containerWidth,
        containerHeight,
        contentWidth,
        contentHeight,
        padding,
        minScale: bounds.min,
        maxScale: 1.0,
      });
      setZoomState(fit);
    }
  }, [contentWidth, contentHeight, padding, bounds.min]);

  // Handle ResizeObserver & window resize for auto-fit
  useEffect(() => {
    if (!autoFit) return;

    recalculateFit();

    const el = containerRef.current;
    let observer: ResizeObserver | null = null;

    if (el && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => {
        recalculateFit();
      });
      observer.observe(el);
    }

    const handleResize = () => recalculateFit();
    window.addEventListener('resize', handleResize);

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [autoFit, recalculateFit]);

  const setZoom = useCallback(
    (newZoom: number) => {
      setZoomState(clampZoom(newZoom, bounds));
      setAutoFitState(false);
    },
    [bounds]
  );

  const zoomIn = useCallback(() => {
    setZoomState((prev) => stepZoom(prev, 'in', bounds));
    setAutoFitState(false);
  }, [bounds]);

  const zoomOut = useCallback(() => {
    setZoomState((prev) => stepZoom(prev, 'out', bounds));
    setAutoFitState(false);
  }, [bounds]);

  const resetZoom = useCallback(() => {
    setZoomState(1.0);
    setPan({ x: 0, y: 0 });
    setAutoFitState(false);
  }, []);

  const setAutoFit = useCallback(
    (enabled: boolean) => {
      setAutoFitState(enabled);
      if (enabled) {
        setPan({ x: 0, y: 0 });
        recalculateFit();
      }
    },
    [recalculateFit]
  );

  const toggleAutoFit = useCallback(() => {
    setAutoFitState((prev) => {
      const next = !prev;
      if (next) {
        setPan({ x: 0, y: 0 });
        recalculateFit();
      }
      return next;
    });
  }, [recalculateFit]);

  const panBy = useCallback((deltaX: number, deltaY: number) => {
    setPan((prev) => ({
      x: Math.round(prev.x + deltaX),
      y: Math.round(prev.y + deltaY),
    }));
  }, []);

  const renderedWidth = Math.round(contentWidth * zoom);
  const renderedHeight = Math.round(contentHeight * zoom);

  return {
    containerRef,
    zoom,
    pan,
    autoFit,
    renderedWidth,
    renderedHeight,
    setZoom,
    zoomIn,
    zoomOut,
    resetZoom,
    setAutoFit,
    toggleAutoFit,
    panBy,
    recalculateFit,
  };
}
