import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";
import LoginActions from "../../pages/actions/LoginActions";
import LoginPage from "../../pages/pageObjects/LoginPage";

// ======================================================
// GIVEN (Contexto inicial)
// ======================================================

// ---------- Acesso à tela de login ----------

Given("que o usuário acessa a tela de login", () => {
  LoginActions.acessarTelaLogin();
});

// ======================================================
// WHEN (Ações do usuário)
// ======================================================

// ---------- Login com credenciais válidas ----------

When("realiza login com usuário Válido", () => {
  const usuario = Cypress.env("USER");
  const senha = Cypress.env("PASSWORD");

  LoginActions.realizarLogin(usuario, senha);
});

// ---------- Login com credenciais informadas (inválidas) ----------

When("realiza login com usuário {string} e senha {string}", (usuario, senha) => {
    LoginActions.realizarLoginInvalido(usuario, senha);
  }
);

// ---------- Tentativas consecutivas inválidas ----------

When("realiza 3 tentativas de login com usuário {string} e senha {string}", (usuario, senha) => {
    LoginActions.realizarTentativasLogin(usuario, senha);
  }
);

// ---------- Login após bloqueio ----------

When("realiza login correto para testar o bloqueio", () => {
  LoginActions.tentarLoginValidoParaBloqueio();
});

// ======================================================
// THEN (Validações / Resultados esperados)
// ======================================================

// ---------- Login realizado com sucesso ----------

Then("o login deve ser realizado com sucesso", () => {
  LoginPage.getAccountContent().should("be.visible");
});

// ---------- Mensagem de erro de login ----------

Then("deve exibir mensagem de erro de login para o usuário {string}", (usuario) => {
    LoginActions.validarErroLogin(usuario);
  }
);

// ---------- Bloqueio de conta ----------

Then("deve exibir mensagem informando que a conta está bloqueada por 15 minutos", () => {
    LoginActions.validarContaBloqueada();
  }
);
