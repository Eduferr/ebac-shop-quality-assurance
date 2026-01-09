const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const CuponsService = require('../../../services/cupons.service');

Given(
  'já existe um cupom cadastrado com o nome {string}',
  async function (codigo) {
    await CuponsService.criarCupomComBody({
      code: codigo,
      amount: '10.00',
      discount_type: 'fixed_product',
      description: 'Cupom previamente cadastrado'
    });
  }
);

When(
  'tentar cadastrar um novo cupom com o mesmo nome {string}',
  async function (codigo) {
    this.response = await CuponsService.criarCupomComBody(
      {
        code: codigo,
        amount: '15.00',
        discount_type: 'fixed_product'
      },
      this.authType
    );
  }
);

When(
  'realizar o cadastro de um novo cupom com dados inválidos:',
  async function (dataTable) {
    this.response = await CuponsService.criarCupomComRegrasDeNegocio(
      dataTable.rowsHash()
    );
  }
);

Then('a API deve retornar o cupom criado com sucesso', function () {
  expect(this.response.status).to.eq(201);
});

Then(
  'o cadastro de cupom deve ser bloqueado por autenticação inválida',
  function () {
    expect([401, 500]).to.include(this.response.status);
  }
);

Then(
  'a API deve retornar erro informando que o nome do cupom já existe',
  function () {
    expect([400, 409]).to.include(this.response.status);
  }
);

Then(
  'a API deve retornar erro de validação no cadastro de cupom',
  function () {
    expect([400, 422]).to.include(this.response.status);
  }
);
