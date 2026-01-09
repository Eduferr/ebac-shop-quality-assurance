const { Then } = require('@cucumber/cucumber');
const { expect } = require('chai');

const { validarContratoCupom } = require('../../../helpers/contratoCupom.helper');
const { cupomSchema } = require('../../../schemas/cupom.schema');

Then(
  'o contrato do cupom retornado no GET deve estar de acordo com o esperado',
  function () {
    expect(this.response.status).to.eq(200);
    validarContratoCupom(this.response.body[0], cupomSchema);
  }
);

Then(
  'o contrato do cupom retornado no POST deve estar de acordo com o esperado',
  function () {
    expect(this.response.status).to.eq(201);
    validarContratoCupom(this.response.body, cupomSchema);
  }
);
