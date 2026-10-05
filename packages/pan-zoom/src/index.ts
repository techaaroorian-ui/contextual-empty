/**
 * @techaaroorian-ui/pan-zoom
 * Framework-independent viewport calculation, auto-fit, and zoom management.
 */

export interface FitOptions {
  containerWidth: number;
  containerHeight: number;
  contentWidth: number;
  contentHeight: number;
  padding?: number;
  minScale?: number;
  maxScale?: number;
}

export interface ZoomBounds {
  min?: number;
  max?: number;
  step?: number;
}

export interface PanPoint {
  x: number;
  y: number;
}

export interface PanZoomState {
  zoom: number;
  pan: PanPoint;
  autoFit: boolean;
}

export const DEFAULT_MIN_ZOOM = 0.1;
export const DEFAULT_MAX_ZOOM = 3.0;
export const DEFAULT_ZOOM_STEP = 0.1;

/**
 * Calculates the optimal uniform scale factor to fit content within a container.
 */
export function calculateFit(options: FitOptions): number {
  const {
    containerWidth,
    containerHeight,
    contentWidth,
    contentHeight,
    padding = 32,
    minScale = DEFAULT_MIN_ZOOM,
    maxScale = 1.0,
  } = options;

  if (
    !Number.isFinite(containerWidth) ||
    !Number.isFinite(containerHeight) ||
    !Number.isFinite(contentWidth) ||
    !Number.isFinite(contentHeight) ||
    contentWidth <= 0 ||
    contentHeight <= 0 ||
    containerWidth <= 0 ||
    containerHeight <= 0
  ) {
    return 1.0;
  }

  const availableWidth = Math.max(0, containerWidth - padding * 2);
  const availableHeight = Math.max(0, containerHeight - padding * 2);

  if (availableWidth === 0 || availableHeight === 0) {
    return minScale;
  }

  const scaleX = availableWidth / contentWidth;
  const scaleY = availableHeight / contentHeight;
  const rawFit = Math.min(scaleX, scaleY);

  const clamped = Math.min(maxScale, Math.max(minScale, rawFit));
  return Math.round(clamped * 100) / 100;
}

/**
 * Clamps a zoom value to within defined min/max bounds.
 */
export function clampZoom(
  zoom: number,
  bounds: ZoomBounds = {}
): number {
  const min = bounds.min ?? DEFAULT_MIN_ZOOM;
  const max = bounds.max ?? DEFAULT_MAX_ZOOM;

  if (!Number.isFinite(zoom)) return 1.0;
  const clamped = Math.min(max, Math.max(min, zoom));
  return Math.round(clamped * 100) / 100;
}

/**
 * Steps the zoom level in or out by a given increment.
 */
export function stepZoom(
  currentZoom: number,
  direction: 'in' | 'out',
  bounds: ZoomBounds = {}
): number {
  const step = bounds.step ?? DEFAULT_ZOOM_STEP;
  const delta = direction === 'in' ? step : -step;
  return clampZoom(currentZoom + delta, bounds);
}

/**
 * Creates a standalone state machine for pan and zoom interactions.
 */
export function createPanZoom(initial?: Partial<PanZoomState>) {
  let state: PanZoomState = {
    zoom: initial?.zoom ?? 1.0,
    pan: initial?.pan ?? { x: 0, y: 0 },
    autoFit: initial?.autoFit ?? true,
  };

  const listeners = new Set<(state: PanZoomState) => void>();

  function notify() {
    for (const listener of listeners) {
      listener({ ...state, pan: { ...state.pan } });
    }
  }

  return {
    getState: (): PanZoomState => ({ ...state, pan: { ...state.pan } }),
    setZoom: (newZoom: number, bounds?: ZoomBounds) => {
      state.zoom = clampZoom(newZoom, bounds);
      state.autoFit = false;
      notify();
    },
    zoomIn: (bounds?: ZoomBounds) => {
      state.zoom = stepZoom(state.zoom, 'in', bounds);
      state.autoFit = false;
      notify();
    },
    zoomOut: (bounds?: ZoomBounds) => {
      state.zoom = stepZoom(state.zoom, 'out', bounds);
      state.autoFit = false;
      notify();
    },
    resetZoom: () => {
      state.zoom = 1.0;
      state.pan = { x: 0, y: 0 };
      notify();
    },
    fit: (options: Omit<FitOptions, 'minScale' | 'maxScale'>, bounds?: ZoomBounds) => {
      state.zoom = calculateFit({
        ...options,
        minScale: bounds?.min,
        maxScale: bounds?.max,
      });
      state.pan = { x: 0, y: 0 };
      state.autoFit = true;
      notify();
    },
    pan: (deltaX: number, deltaY: number) => {
      state.pan = {
        x: Math.round(state.pan.x + deltaX),
        y: Math.round(state.pan.y + deltaY),
      };
      notify();
    },
    toggleAutoFit: () => {
      state.autoFit = !state.autoFit;
      notify();
    },
    subscribe: (listener: (state: PanZoomState) => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}
