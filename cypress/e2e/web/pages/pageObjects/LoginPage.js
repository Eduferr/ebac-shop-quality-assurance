class LoginPage {

  getUsername() {
    return cy.get('#username');
  }

  getPassword() {
    return cy.get('#password');
  }

  getLoginButton() {
    return cy.get('[name="login"]');
  }

  getErrorMessage() {
    return cy.get('.woocommerce-error');
  }

  getAccountContent() {
    return cy.get('.woocommerce-MyAccount-content');
  }
}

export default new LoginPage();
