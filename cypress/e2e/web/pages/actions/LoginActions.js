import LoginPage from '../pageObjects/LoginPage';

class LoginActions {

  // =========================
  // Estado
  // =========================
  tentativaAtual = 0;

  
  // =========================
  // Navegação
  // =========================
  acessarTelaLogin() {
    cy.visit('minha-conta/');
  }


  // =========================
  // Ações básicas (baixo nível)
  // =========================
  preencherCredenciais(usuario, senha) {
    LoginPage.getUsername().clear().type(usuario);
    LoginPage.getPassword().clear().type(senha);
  }

  submeterLogin() {
    LoginPage.getLoginButton().click();
  }


  // =========================
  // Ações compostas (fluxos)
  // =========================
  realizarLogin(usuario, senha) {
    this.preencherCredenciais(usuario, senha);
    this.submeterLogin();
  }

  realizarLoginInvalido(usuario, senha) {
    this.realizarLogin(usuario, senha);
  }

  realizarTentativasLogin(usuario, senha, quantidade = 3) {
    for (let i = 0; i < quantidade; i++) {
      this.tentativaAtual++;

      cy.log(`🟠 Tentativa ${this.tentativaAtual}: login com usuário ${usuario}`);

      this.realizarLogin(usuario, senha);

      cy.wait(300);
    }
  }

  tentarLoginValidoParaBloqueio() {
    this.tentativaAtual++;

    const usuario = Cypress.env('USER');
    const senha = Cypress.env('PASSWORD');

    cy.log(`🔴 Tentativa ${this.tentativaAtual}: login com usuário válido`);

    this.realizarLogin(usuario, senha);
  }


  // =========================
  // Validações
  // =========================
  validarErroLogin(usuario) {
    const mensagensEsperadas = [
      `Erro: O usuário ${usuario} não está registrado neste site.`,
      `Erro: A senha informada para o usuário ${usuario} está incorreta`
    ];

    LoginPage.getErrorMessage()
      .should('be.visible')
      .invoke('text')
      .then((texto) => {
        const mensagemEncontrada = mensagensEsperadas.find((msg) =>
          texto.includes(msg)
        );

        expect(mensagemEncontrada).to.not.be.undefined;
      });
  }

  validarContaBloqueada() {
    const mensagemEsperada =
      'Usuário bloqueado após 3 tentativas, aguarde 15 minutos para logar';

    cy.get('body').then(($body) => {
      const existeErro = $body.find('.woocommerce-error').length > 0;

      if (!existeErro) {
        throw new Error(
          'Falha de segurança: Após 3 tentativas inválidas e consecutivas, ' +
          'o sistema permitiu login na 4ª tentativa, violando a regra de bloqueio.'
        );
      }

      LoginPage.getErrorMessage()
        .should('be.visible')
        .invoke('text')
        .should('contain', mensagemEsperada);
    });
  }
}

export default new LoginActions();
