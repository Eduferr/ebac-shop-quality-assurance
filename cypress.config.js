const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

require("dotenv").config();

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || "http://lojaebac.ebaconline.art.br",
    specPattern: "cypress/e2e/web/features/**/*.feature",

    async setupNodeEvents(on, config) {

      config.env.USER = process.env.CYPRESS_USER;
      config.env.PASSWORD = process.env.CYPRESS_PASSWORD;

      config.env.cucumber = {
        stepDefinitions: [
          "cypress/e2e/web/features/step_definitions/**/*.js",
        ],
      };

      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },
  },
});
