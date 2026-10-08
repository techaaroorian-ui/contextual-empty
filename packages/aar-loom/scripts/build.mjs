import { readFile, writeFile, mkdir } from 'node:fs/promises';

// Tailwind v3 consumes @layer components during PostCSS processing. Use a
// separately named native layer so the independently imported CSS survives.
const directory = new URL('../dist/', import.meta.url);
await mkdir(directory, { recursive: true });
const tokens = await readFile(new URL('../src/tokens.css', import.meta.url), 'utf8');
const components = await readFile(new URL('../src/components.css', import.meta.url), 'utf8');
await writeFile(new URL('tailwind-v3.css', directory),
  '/* Generated from src; do not edit. V3 unlayered utilities override this layer. */\n' +
  '@layer aar-theme, aar-components;\n' +
  tokens.replace('@layer theme {', '@layer aar-theme {') + '\n' +
  components.replace('@layer components {', '@layer aar-components {'));
