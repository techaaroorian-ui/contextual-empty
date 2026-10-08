import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const out = new URL('../visual-artifacts/yuwbrndr/', import.meta.url);
await mkdir(out, { recursive: true });
const browser = await chromium.launch();
const url = process.argv[2] || process.env.YUWBRNDR_URL || 'http://127.0.0.1:5174';
try {
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.addInitScript(() => localStorage.setItem('yuwbrndr-theme', 'light'));
  await page.goto(url);
  const exportButton = page.getByRole('button', { name: 'Export image', exact: true });
  await exportButton.waitFor();
  const settle = async () => page.evaluate(async () => {
    await Promise.all(document.getAnimations().filter(a => a.effect?.getComputedTiming().iterations !== Infinity).map(a => a.finished.catch(() => {})));
  });
  await settle();
  assert.equal(await exportButton.evaluate(el => getComputedStyle(el).backgroundColor), 'rgb(96, 67, 156)');
  assert.equal(await exportButton.evaluate(el => getComputedStyle(el).color), 'rgb(255, 255, 255)');
  // Static legacy product rules preserve geometry during component migration.
  assert.equal(await exportButton.evaluate(el => getComputedStyle(el).borderRadius), '8px');
  await exportButton.click();
  assert.equal(await exportButton.getAttribute('aria-expanded'), 'true');
  await page.getByRole('textbox', { name: 'Export file name' }).fill('aar-loom-study');
  await page.keyboard.press('Escape');
  assert.equal(await exportButton.getAttribute('aria-expanded'), 'false');
  assert.equal(await exportButton.evaluate(el => el === document.activeElement), true);
  await page.getByRole('button', { name: 'Start with a sample', exact: true }).click();
  await page.getByRole('button', { name: 'Close About dialog' }).click();
  await page.locator('iframe').first().waitFor();
  const artwork = await page.locator('iframe').first().getAttribute('srcdoc');
  await page.screenshot({ path: fileURLToPath(new URL('light.png', out)), fullPage: true });
  await page.getByRole('button', { name: 'Theme: light', exact: true }).click();
  await settle();
  assert.equal(await exportButton.evaluate(el => getComputedStyle(el).backgroundColor), 'rgb(197, 184, 255)');
  assert.equal(await page.locator('iframe').first().getAttribute('srcdoc'), artwork, 'App theme must not modify artwork');
  await page.screenshot({ path: fileURLToPath(new URL('dark.png', out)), fullPage: true });
  await page.getByRole('button', { name: 'Slide deck', exact: true }).click();
  assert.equal(await page.getByRole('button', { name: 'Slide deck', exact: true }).getAttribute('aria-pressed'), 'true');
  await page.getByRole('button', { name: 'Single design', exact: true }).click();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await exportButton.click();
  assert.equal(await page.locator('#export-options').evaluate(el => getComputedStyle(el).animationName), 'none');
  await page.keyboard.press('Escape');
  await page.setViewportSize({ width: 390, height: 844 });
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  await page.screenshot({ path: fileURLToPath(new URL('mobile.png', out)), fullPage: true });
  const touchPage = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await touchPage.goto(url);
  await touchPage.getByRole('button', { name: 'Export image', exact: true }).waitFor();
  assert.equal(await touchPage.getByRole('button', { name: 'Export image', exact: true }).evaluate(el => getComputedStyle(el).minHeight), '44px');
  await touchPage.screenshot({ path: fileURLToPath(new URL('mobile-touch.png', out)), fullPage: true });
  assert.deepEqual(errors, []);
  console.log('Yuwbrndr smoke passed: product CSS geometry, theme colors, artwork isolation, export options, mode selection, reduced motion, mobile layout, and touch targets.');
} finally { await browser.close(); }
