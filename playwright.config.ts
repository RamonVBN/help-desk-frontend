import { defineConfig } from "@playwright/test"

const PORT = process.env.PORT || 3000

export default defineConfig({
  testDir: "./src/tests/e2e",
  timeout: 30 * 1000,

  use: {
    baseURL: `http://localhost:${PORT}`,
    headless: true,
  },

  webServer: {
    command: 'E2E_MOCKS=enabled npm run dev',
    url: `http://localhost:${PORT}`,
    reuseExistingServer: false,
    timeout: 120 * 1000,
  },
})