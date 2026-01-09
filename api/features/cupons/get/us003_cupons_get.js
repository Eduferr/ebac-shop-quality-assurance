const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const CuponsService = require('../../../services/cupons.service');

Given('existe um cupom previamente cadastrado', async function () {
  const res = await CuponsService.criarCupom('valida');
  this.cupomId = res.body.id;
});

When(
  'realizar a requisição de consulta de cupom por ID',
  async function () {
    this.response = await CuponsService.buscarCupomPorId(
      this.cupomId,
      this.authType
    );
  }
);

Then('a API deve retornar a lista de cupons com sucesso', function () {
  expect(this.response.status).to.eq(200);
  expect(this.response.body).to.be.an('array');
});

Then(
  'a API deve retornar os dados do cupom consultado com sucesso',
  function () {
    expect(this.response.status).to.eq(200);
    expect(this.response.body.id).to.eq(this.cupomId);
  }
);

Then('o acesso à listagem de cupons deve ser bloqueado', function () {
  expect([401, 500]).to.include(this.response.status);
});
