const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const {
  addCucumberPreprocessorPlugin,
} = require('@badeball/cypress-cucumber-preprocessor');
const {
  createEsbuildPlugin,
} = require('@badeball/cypress-cucumber-preprocessor/esbuild');

require('dotenv').config();

const testType = process.env.TEST_TYPE || 'web';

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || 'http://lojaebac.ebaconline.art.br',

    specPattern:
      testType === 'api'
        ? 'cypress/e2e/api/features/**/*.feature'
        : 'cypress/e2e/web/features/**/*.feature',

    supportFile: 'cypress/support/e2e.js',

    async setupNodeEvents(on, config) {
      // REGISTRA O CUCUMBER
      await addCucumberPreprocessorPlugin(on, config);

      // REGISTRA O ESBUILD COM LOADER DE .FEATURE
      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // VARIÁVEIS DE AMBIENTE (devem ficar AQUI)
      config.env.USER = process.env.CYPRESS_USER;
      config.env.PASSWORD = process.env.CYPRESS_PASSWORD;

      return config;
    },
  },
});
