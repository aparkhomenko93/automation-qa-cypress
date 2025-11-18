const { defineConfig } = require("cypress");

module.exports = defineConfig({
    reporter: 'mochawesome',
    reporterOptions: {
        reportDir: 'cypress/results',
        overwrite: false,
        html: false,
        json: true,
    },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
      baseUrl: 'https://qauto2.forstudy.space',
      env: {
          userLogin: "guest",
          userPassword: "welcome2qauto"
      },
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