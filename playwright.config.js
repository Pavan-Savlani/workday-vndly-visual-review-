const { defineConfig } = require('@playwright/test');
try { process.loadEnvFile('.env'); } catch {}

module.exports = defineConfig({
  testDir: './tests',
  timeout: 180000,
  workers: 1,
  reporter: 'list',
  use: { headless: true, baseURL: process.env.APP_URL || 'http://localhost:4280' },
  webServer: {
    command: 'node server.mjs',
    url: 'http://localhost:4280/index.html',
    reuseExistingServer: true,
  },
});
