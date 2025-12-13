import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";
import LoginActions from "../pages/actions/LoginActions";
import LoginPage from "../pages/pageObjects/LoginPage";

// Contador de tentativas (escopo do arquivo)
let tentativaAtual = 0;

// Resetando o contador antes de CADA cenário
Before(() => {
  tentativaAtual = 0;
});

// Step que acessa a tela de login
Given("que o usuário acessa a tela de login", () => {
  LoginActions.acessarTelaLogin();
});

/* ---------- WHEN ---------- */

// Step para login com usuário ativo (usando .env)
When("realiza login com usuário ativo", () => {
  const usuario = Cypress.env("USER");
  const senha = Cypress.env("PASSWORD");

  LoginActions.realizarLogin(usuario, senha);
});

// Step para login com dados fornecidos pelo cenário (usuário e senha)
When(
  "realiza login com usuário {string} e senha {string}",
  (usuario, senha) => {
    tentativaAtual++; // Incrementando o contador de tentativas
    cy.log(`🟠Tentativa ${tentativaAtual}: login com usuário ${usuario}`);
    LoginActions.realizarLogin(usuario, senha);
  }
);

/* ---------- THEN ---------- */

// Validação de login bem-sucedido
Then("o login deve ser realizado com sucesso", () => {
  LoginPage.getAccountContent().should("be.visible");
});

// Validação de erro de login
Then("deve exibir mensagem de erro de login", () => {
  LoginPage.getErrorMessage()
    .should("be.visible")
    .and("contain.text", "Erro");
});

// Validação de bloqueio após 3 tentativas inválidas
Then("o sistema deve bloquear a conta por 15 minutos", () => {
  LoginPage.getErrorMessage()
    .should("be.visible")
    .and("contain.text", "Conta Bloqueada por 15 minutos");
});
