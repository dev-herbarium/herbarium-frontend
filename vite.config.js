// /vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

/**
 * The "defineConfig" helper function provides autocompletion & type checking for
 * this Vite configuration. It is a best practice to wrap this config object with it.
 * 👉 For more info please read: https://vite.dev/config/
 */
export default defineConfig({
  // This is the core configuration for Vite.
  plugins: [
    // This is the official plugin for React, using the SWC compiler for speed.
    // It is required for Vite to understand & process JSX.
    react(),
  ],
  // This is the configuration for Vitest.
  // The "test" property is a special key that Vitest recognizes.
  test: {
    environment: "jsdom",

    // The "globals" option when set to "true", automatically provides test APIs like
    // "describe", "it", "expect", "test", and "beforeEach" without needing to import them.
    // This makes the test files cleaner & more concise.
    globals: true,

    // The "setupFiles" option points to a file that runs once before each test suite.
    // This is where we configure things like "global test setups" or "custom matchers".
    // Here, it is use to import the "@testing-library/jest-dom" matchers.
    setupFiles: ["./setupTests.js"],

    // The "coverage" option is for configuring code coverage reports.
    coverage: {
      // The "provider" specifies which coverage engine to use, "v8" is the default.
      provider: "v8",

      // "reporter" is an array of report formats to generate.
      // "text" outputs a summary to the console.
      // "json" generates JSON file.
      // "html" generates a full, browsable HTML report.
      reporter: ["text", "json", "html"],

      // Define what files to include in coverage reports.
      // This targets all JS/JSX files inside the 'src' folder.
      include: ["src/**/*.{js,jsx}"],

      // Define files/folders to exclude from coverage reports.
      exclude: ["src/main.jsx", "**/node_modules/**", "**/coverage/**"],

      // "reportsDirectory" specifies the folder where the reports will be saved.
      reportsDirectory: "./coverage",
    },
  },
});
