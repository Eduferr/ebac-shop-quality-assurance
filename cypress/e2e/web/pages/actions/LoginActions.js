import LoginPage from '../pageObjects/LoginPage';

class LoginActions {

  acessarTelaLogin() {
    cy.visit('minha-conta/');
  }

  preencherCredenciais(usuario, senha) {
    LoginPage.getUsername().clear().type(usuario);
    LoginPage.getPassword().clear().type(senha);
  }

  submeterLogin() {
    LoginPage.getLoginButton().click();
  }

  realizarLogin(usuario, senha) {
    this.preencherCredenciais(usuario, senha);
    this.submeterLogin();
  }
}

export default new LoginActions();
