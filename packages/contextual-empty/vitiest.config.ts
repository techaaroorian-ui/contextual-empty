import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom", // Simulates a browser environment
    setupFiles: ["./vitest.setup.ts"], // Runs before our tests
    globals: true,
  },
});
