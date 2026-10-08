import { readFile, writeFile, mkdir } from "node:fs/promises";

// Tailwind v3 consumes its own @layer names. Keep every public module in native layers.
const directory = new URL("../dist/", import.meta.url);
await mkdir(directory, { recursive: true });
const modules = [
  "tokens",
  "components",
  "layouts",
  "compositions",
  "expression",
  "code",
  "magic-art",
  "utilities",
];
const sources = await Promise.all(
  modules.map((name) =>
    readFile(new URL(`../src/${name}.css`, import.meta.url), "utf8"),
  ),
);
const css = sources
  .join("\n")
  .replace(/@layer theme\s*\{/g, "@layer aar-theme {")
  .replace(/@layer components\s*\{/g, "@layer aar-components {")
  .replace(/@layer utilities\s*\{/g, "@layer aar-utilities {");
await writeFile(
  new URL("tailwind-v3.css", directory),
  "/* Generated from all public source modules; do not edit. */\n@layer aar-theme, aar-components, aar-utilities;\n" +
    css,
);
