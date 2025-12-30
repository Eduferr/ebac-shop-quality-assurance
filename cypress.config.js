const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const {
  addCucumberPreprocessorPlugin,
} = require('@badeball/cypress-cucumber-preprocessor');
const {
  createEsbuildPlugin,
} = require('@badeball/cypress-cucumber-preprocessor/esbuild');

require('dotenv').config();

//Para verificar se a variável de autenticação está sendo carregada corretamente
//console.log('BASIC_AUTH no config:', process.env.BASIC_AUTH);

const testType = process.env.TEST_TYPE || 'web';

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || 'http://lojaebac.ebaconline.art.br',

    // Carrega WEB + API
    specPattern: [
      'cypress/e2e/web/features/**/*.feature',
      'cypress/e2e/api/features/**/*.feature'
    ],

    supportFile: 'cypress/support/e2e.js',

    async setupNodeEvents(on, config) {
      // registra o plugin do cucumber
      await addCucumberPreprocessorPlugin(on, config);

      // registrar o preprocessor do esbuild
      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // variáveis de ambiente UI a partir do .env
      config.env.USER = process.env.CYPRESS_USER;
      config.env.PASSWORD = process.env.CYPRESS_PASSWORD;

      // Variavel de ambiente API a partir do .env
      config.env.BASIC_AUTH = process.env.BASIC_AUTH;

      return config;
    },
  },
});
