const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
      //baseUrl: 'https://example.com/',
      specPattern: 'cypress/e2e/**/*.{spec,test,cy}.{js,jsx,ts,tsx}',
      supportFile: 'cypress/support/e2e.js',
      viewportWidth: 1920,
      viewportHeight: 1080,
      video: true,
      screenshotOnRunFailure: true,
      retries: {
          runMode: 2,
          openMode: 0,
      },
      defaultCommandTimeout: 8000,
      requestTimeout: 10000,
      responseTimeout: 15000,
  },
});