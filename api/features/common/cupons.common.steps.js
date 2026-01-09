const { Given, When } = require('@cucumber/cucumber');
const CuponsService = require('../../services/cupons.service');

let response;
let authType;

Given(
  'que o admin realiza a requisição com autenticação {word}',
  function (tipoAuth) {
    authType = tipoAuth;
    this.authType = tipoAuth;
  }
);

Given('que o admin está autenticado na API', function () {
  this.authType = 'valida';
});

When('realizar a requisição de listagem de cupons', async function () {
  response = await CuponsService.listarCupons(this.authType);
  this.response = response;
});

When('realizar o cadastro de um novo cupom', async function () {
  response = await CuponsService.criarCupom(this.authType);
  this.response = response;
});
