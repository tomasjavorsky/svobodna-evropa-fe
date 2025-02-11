// vitest.config.js
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // Use global functions like `describe` and `it` without importing
    environment: "jsdom", // Use 'jsdom' for testing browser-like environments
    coverage: {
      reporter: ["text", "json", "html"], // Generate coverage reports
    },
  },
});
