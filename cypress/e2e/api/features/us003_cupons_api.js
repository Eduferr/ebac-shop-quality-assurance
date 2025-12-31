import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import CuponsService from '../services/cupons.service.js';

let response;

/* ================= GIVEN (Dado) ================= */

Given('que o admin está autenticado na API', () => {
  // Autenticação é implícita via header
});


/* ================= WHEN (Quando) ================= */

When('realizar a requisição de listagem de cupons', () => {
  CuponsService.listarCupons().then((res) => {
    response = res;
  });
});

When('realizar o cadastro de um novo cupom', () => {
  CuponsService.criarCupom().then((res) => {
    response = res;
  });
});


/* ================= THEN (Então) ================== */

Then('a API deve retornar a lista de cupons com sucesso', () => {
  expect(response.status).to.eq(200);
  expect(response.body).to.be.an('array');
});

Then('a API deve retornar o cupom criado com sucesso', () => {
  expect(response.status).to.eq(201);
  expect(response.body).to.have.property('id');
  expect(response.body).to.have.property('code');
  expect(response.body.discount_type).to.eq('fixed_product');
});


