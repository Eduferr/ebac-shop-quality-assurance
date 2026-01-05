import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import CuponsService from '../services/cupons.service.js';

let response;
let authType;

// ======================================================
// GIVEN (Contexto / Estado do sistema)
// ======================================================

Given(
  'que o admin realiza a requisição com autenticação {word}',
  (tipoAuth) => {
    authType = tipoAuth;
  }
);

Given('existe um cupom previamente cadastrado', function () {
  CuponsService.criarCupom().then((res) => {
    expect(res.status).to.eq(201);
    this.cupomId = res.body.id;
  });
});

// ======================================================
// WHEN (Ações GET)
// ======================================================

When('realizar a requisição de listagem de cupons', () => {
  CuponsService.listarCupons(authType).then((res) => {
    response = res;
  });
});

When(
  'realizar a requisição de consulta de cupom por ID',
  function () {
    CuponsService.buscarCupomPorId(this.cupomId).then((res) => {
      this.response = res;
    });
  }
);

// ======================================================
// THEN (Validações GET)
// ======================================================

Then('a API deve retornar a lista de cupons com sucesso', () => {
  expect(response.status).to.eq(200);
  expect(response.body).to.be.an('array');
});

Then(
  'a API deve retornar os dados do cupom consultado com sucesso',
  function () {
    expect(this.response.status).to.eq(200);
    expect(this.response.body).to.have.property('id', this.cupomId);
    expect(this.response.body).to.have.property('code');
    expect(this.response.body).to.have.property('amount');
    expect(this.response.body).to.have.property('discount_type');
  }
);

Then('o acesso à listagem de cupons deve ser bloqueado', () => {
  expect([401, 500]).to.include(response.status);
  expect(response.body).to.have.property('message');
});
