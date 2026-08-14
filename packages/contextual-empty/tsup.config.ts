import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"], // Supports both modern and legacy Node environments
  dts: true, // Automatically generates TypeScript declaration files (.d.ts)
  splitting: false,
  sourcemap: true,
  clean: true, // Cleans the dist folder before every build
  external: ["react", "react-dom"], // Strictly enforces our peerDependency rule
  minify: true, // Optimizes the bundle for production
});
