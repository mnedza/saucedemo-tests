import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL: "https://www.saucedemo.com",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "auth",
      testMatch: /.*auth\.setup\.ts/,
    },
    {
      name: "chromium",
      testMatch: /.*\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        storageState: "./storageState.json",
      },
      dependencies: ["auth"],
    },
    {
      name: "login-tests",
      testMatch: /.*user\.login\.ts/,
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
