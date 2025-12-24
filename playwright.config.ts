
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config({ path: path.resolve(__dirname, ".env") });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",

  fullyParallel: false,

  forbidOnly: !!process.env.CI,

  retries: 0,

  workers: 1,

  reporter: "html",

  use: {

    baseURL: 'https://practicesoftwaretesting.com',

    /* ✅ THIS IS THE IMPORTANT FIX */
    baseURL: process.env.BASE_URL,

    storageState: "auth.json",

    // storageState: "auth.json",

    /* Collect trace when retrying the failed test */

    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",

      use: { ...devices["Desktop Chrome"],headless: false },
    },
    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] ,headless: false},
    // },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] ,headless: false},
    },
  ],
});


  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },



