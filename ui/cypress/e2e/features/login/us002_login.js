import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginActions from "../../core/actions/LoginActions";

// ======================================================
// GIVEN – Contexto inicial
// ======================================================

Given("que o usuário acessa a tela de login", () => {
  LoginActions.acessarTelaLogin();
});

// ======================================================
// WHEN – Ações do usuário
// ======================================================

// Login com credenciais válidas
When("realiza login com usuário Válido", () => {
  const usuario = Cypress.env("USER");
  const senha = Cypress.env("PASSWORD");

  LoginActions.realizarLogin(usuario, senha);
});

// Login com credenciais informadas (inválidas)
When("realiza login com usuário {string} e senha {string}", (usuario, senha) => {
    LoginActions.realizarLoginInvalido(usuario, senha);
  }
);

// Tentativas consecutivas inválidas
When("realiza {int} tentativas de login com usuário {string} e senha {string}", (quantidade, usuario, senha) => {
    LoginActions.realizarTentativasLogin(usuario, senha, quantidade);
  }
);

// Login correto após bloqueio
When("realiza login correto para testar o bloqueio", () => {
  LoginActions.tentarLoginValidoParaBloqueio();
});

// ======================================================
// THEN – Resultados esperados
// ======================================================

// Login realizado com sucesso
Then("o login deve ser realizado com sucesso", () => {
  LoginActions.validarLoginComSucesso();
});

// Mensagem de erro de login
Then("deve exibir mensagem de erro de login para o usuário {string}", (usuario) => {
    LoginActions.validarErroLogin(usuario);
  }
);

// Permitir nova tentativa de login
Then("permitir nova tentativa de login", () => {
  LoginActions.validarPermiteNovaTentativa();
});

// Bloqueio de conta
Then("deve exibir mensagem informando que a conta está bloqueada por 15 minutos", () => {
    LoginActions.validarContaBloqueada();
  }
);
