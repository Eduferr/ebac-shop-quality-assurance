import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";
import LoginActions from "../../pages/actions/LoginActions";
import LoginPage from "../../pages/pageObjects/LoginPage";

// =========================
// GIVEN (Dado)
// =========================

// Acesso à tela de login
Given("que o usuário acessa a tela de login", () => {
  LoginActions.acessarTelaLogin();
});

// =========================
// WHEN (Quando)
// =========================

// Login com usuário válido (credenciais do .env)
When("realiza login com usuário Válido", () => {
  const usuario = Cypress.env("USER");
  const senha = Cypress.env("PASSWORD");

  LoginActions.realizarLogin(usuario, senha);
});

// Login com usuário e senha informados (inválidos)
When(
  "realiza login com usuário {string} e senha {string}",
  (usuario, senha) => {
    LoginActions.realizarLoginInvalido(usuario, senha);
  }
);

// Realiza múltiplas tentativas inválidas de login
When(
  "realiza 3 tentativas de login com usuário {string} e senha {string}",
  (usuario, senha) => {
    LoginActions.realizarTentativasLogin(usuario, senha);
  }
);

// Tenta login válido após exceder o limite de tentativas
When("realiza login correto para testar o bloqueio", () => {
  LoginActions.tentarLoginValidoParaBloqueio();
});

// =========================
// THEN (Então)
// =========================

// Validação de login realizado com sucesso
Then("o login deve ser realizado com sucesso", () => {
  LoginPage.getAccountContent().should("be.visible");
});

// Validação de erro de login (usuário não cadastrado ou senha inválida)
Then(
  "deve exibir mensagem de erro de login para o usuário {string}",
  (usuario) => {
    LoginActions.validarErroLogin(usuario);
  }
);

// Validação de bloqueio após tentativas consecutivas inválidas
Then(
  "deve exibir mensagem informando que a conta está bloqueada por 15 minutos",
  () => {
    LoginActions.validarContaBloqueada();
  }
);


