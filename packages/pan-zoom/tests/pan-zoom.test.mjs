import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateFit,
  clampZoom,
  stepZoom,
  createPanZoom,
} from '../dist/index.js';

test('calculateFit: fits landscape content into container', () => {
  // Container: 1000x800 with 32px padding -> 936x736 avail
  // Content: 1200x627
  // ScaleX = 936/1200 = 0.78, ScaleY = 736/627 = 1.17
  // Min scale = 0.78
  const fit = calculateFit({
    containerWidth: 1000,
    containerHeight: 800,
    contentWidth: 1200,
    contentHeight: 627,
    padding: 32,
  });

  assert.equal(fit, 0.78);
});

test('calculateFit: fits tall portrait content constrained by height', () => {
  // Container: 800x600 with 20px padding -> 760x560 avail
  // Content: 600x1200
  // ScaleX = 760/600 = 1.26, ScaleY = 560/1200 = 0.46
  // Min scale = 0.46
  const fit = calculateFit({
    containerWidth: 800,
    containerHeight: 600,
    contentWidth: 600,
    contentHeight: 1200,
    padding: 20,
  });

  assert.equal(fit, 0.47); // 560 / 1200 = 0.4666... -> 0.47
});

test('calculateFit: respects maxScale (default 1.0)', () => {
  // Small content inside huge container should not upscale past 1.0 by default
  const fit = calculateFit({
    containerWidth: 2000,
    containerHeight: 2000,
    contentWidth: 400,
    contentHeight: 300,
  });

  assert.equal(fit, 1.0);
});

test('calculateFit: safe fallbacks on invalid or zero dimensions', () => {
  assert.equal(calculateFit({ containerWidth: 0, containerHeight: 0, contentWidth: 100, contentHeight: 100 }), 1.0);
  assert.equal(calculateFit({ containerWidth: 500, containerHeight: 500, contentWidth: -10, contentHeight: 100 }), 1.0);
  assert.equal(calculateFit({ containerWidth: NaN, containerHeight: 500, contentWidth: 100, contentHeight: 100 }), 1.0);
});

test('clampZoom: clamps within bounds', () => {
  assert.equal(clampZoom(0.05, { min: 0.1, max: 2.0 }), 0.1);
  assert.equal(clampZoom(3.5, { min: 0.1, max: 2.0 }), 2.0);
  assert.equal(clampZoom(1.2345), 1.23);
});

test('stepZoom: increments and decrements by step', () => {
  assert.equal(stepZoom(1.0, 'in', { step: 0.25 }), 1.25);
  assert.equal(stepZoom(1.0, 'out', { step: 0.25 }), 0.75);
});

test('createPanZoom: state machine manages zoom, pan, and subscriptions', () => {
  const pz = createPanZoom({ initialZoom: 1.0 });

  assert.equal(pz.getState().zoom, 1.0);
  assert.equal(pz.getState().autoFit, true);

  pz.zoomIn({ step: 0.1 });
  assert.equal(pz.getState().zoom, 1.1);
  assert.equal(pz.getState().autoFit, false); // manual zoom disables autoFit

  pz.pan(15, -25);
  assert.deepEqual(pz.getState().pan, { x: 15, y: -25 });

  pz.resetZoom();
  assert.equal(pz.getState().zoom, 1.0);
  assert.deepEqual(pz.getState().pan, { x: 0, y: 0 });
});
