import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: false,
  workers: 1,
  use: { baseURL: 'http://127.0.0.1:8788', browserName: 'chromium', trace: 'retain-on-failure' },
  webServer: {
    command: 'yarn wrangler d1 migrations apply LEADS --env dev --local --persist-to .wrangler/test-state && yarn wrangler dev --env dev --local --port 8788 --persist-to .wrangler/test-state',
    url: 'http://127.0.0.1:8788',
    reuseExistingServer: false,
    timeout: 60000
  }
})
