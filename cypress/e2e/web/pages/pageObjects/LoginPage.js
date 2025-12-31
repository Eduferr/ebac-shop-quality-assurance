class LoginPage {

  // =========================
  // Campos do formulário
  // =========================
  getUsername() {
    return cy.get('#username');
  }

  getPassword() {
    return cy.get('#password');
  }

  // =========================
  // Ações
  // =========================
  getLoginButton() {
    return cy.get('[name="login"]');
  }

  // =========================
  // Mensagens / feedback
  // =========================
  getErrorMessage() {
    return cy.get('.woocommerce-error');
  }

  // =========================
  // Conteúdo pós-login
  // =========================
  getAccountContent() {
    return cy.get('.woocommerce-MyAccount-content');
  }
}

export default new LoginPage();

