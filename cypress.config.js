// Importa o helper do Cypress para definir a configuração
const { defineConfig } = require("cypress");
// Preprocessador para permitir o uso de bundler (esbuild). Necessário para que o Cucumber funcione com arquivos .feature
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
// Plugin principal do Cucumber (versão moderna v24+)
const { addCucumberPreprocessorPlugin, } = require("@badeball/cypress-cucumber-preprocessor");
// Plugin que integra o Cucumber com o esbuild. Responsável por compilar os arquivos .feature
const { createEsbuildPlugin, } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

// Carrega variáveis do arquivo .env para process.env
require("dotenv").config();

// Define o tipo de teste (web ou api). Se não for informado, assume WEB como padrão
const testType = process.env.TEST_TYPE || "web";

module.exports = defineConfig({
  e2e: {
    // URL base do sistema testado. Permite usar cy.visit('/') nos testes
    baseUrl: process.env.BASE_URL || "http://lojaebac.ebaconline.art.br",

    // Define dinamicamente onde o Cypress deve procurar os arquivos .feature
    // WEB  → cypress/e2e/web/features || API  → cypress/e2e/api/features
    specPattern:
      testType === "api"
        ? "cypress/e2e/api/features/**/*.feature"
        : "cypress/e2e/web/features/**/*.feature",

    // Função executada antes da inicialização dos testes. Usada para registrar plugins e configurações globais
    async setupNodeEvents(on, config) {

      // Variáveis de ambiente acessíveis nos testes via Cypress.env(). Ex: Cypress.env('USER')
      config.env.USER = process.env.CYPRESS_USER;
      config.env.PASSWORD = process.env.CYPRESS_PASSWORD;

      // Configuração do Cucumber (v24+)
      // nonGlobalStepDefinitions: true indica que os arquivos de step devem estar na MESMA pasta da feature
      // (colocalização: feature + step juntos)
      // config.env.cucumber = {
      //   nonGlobalStepDefinitions: true,
      // };

      // Registra o plugin do Cucumber no Cypress. Deve ser chamado antes do bundler
      await addCucumberPreprocessorPlugin(on, config);

      // Define o preprocessador de arquivos. Usa esbuild para compilar os arquivos .feature e .js
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // Retorna o config final para o Cypress
      return config;
    },
  },
});
