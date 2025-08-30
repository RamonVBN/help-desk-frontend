import { defineConfig } from "@playwright/test"

export default defineConfig({
  testDir: "./src/tests/e2e",              
  timeout: 30 * 1000,
  use: {
    baseURL: "http://localhost:3000", 
    headless: true,
  },
})
