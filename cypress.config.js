const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || 'http://lojaebac.ebaconline.art.br',

    // Testes de UI (Web)
    specPattern: ['ui/cypress/e2e/features/**/*.feature'],
    supportFile: 'ui/cypress/support/e2e.js',
    fixturesFolder: 'ui/cypress/fixtures',

    // ALLURE – caminho correto (PASTA, não arquivo)
    env: {
      allure: true,
      allureResultsPath: 'allure/ui-tests/ui-results',
    },

    async setupNodeEvents(on, config) {
      // Cucumber
      await addCucumberPreprocessorPlugin(on, config);

      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // REGISTRO OBRIGATÓRIO DO ALLURE
      allureWriter(on, config);

      // Variáveis de ambiente UI
      config.env.USER = process.env.CYPRESS_USER;
      config.env.PASSWORD = process.env.CYPRESS_PASSWORD;

      return config;
    },
  },

  // DESATIVA screenshots e vídeos padrão do Cypress
  screenshotOnRunFailure: false,
  screenshotsFolder: false,
  video: false,
});
