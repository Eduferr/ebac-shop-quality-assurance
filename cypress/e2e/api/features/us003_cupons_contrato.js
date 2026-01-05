import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import CuponsService from '../services/cupons.service';
import { cupomSchema } from '../schemas/cupom.schema';
import { validarContratoCupom } from '../helpers/contratoCupom.helper';

let response;

// ======================================================
// GIVEN — CONTEXTO / ESTADO DO SISTEMA
// ======================================================

Given('que o admin está autenticado na API', () => {
  // Autenticação válida é o comportamento padrão do CuponsService
});

// ======================================================
// WHEN — AÇÕES (REQUISIÇÕES)
// ======================================================

// ---------- GET | Listagem de cupons ----------
When('realizar a requisição de listagem de cupons', () => {
  CuponsService.listarCupons().then((res) => {
    response = res;
  });
});

// ---------- POST | Cadastro de cupom ----------
When('realizar o cadastro de um novo cupom', () => {
  CuponsService.criarCupom().then((res) => {
    response = res;
  });
});

// ======================================================
// THEN — VALIDAÇÕES / CONTRATO DA API
// ======================================================

// ---------- Contrato GET ----------
Then(
  'o contrato do cupom retornado no GET deve estar de acordo com o esperado',
  () => {
    expect(response.status).to.eq(200);

    // Valida o contrato de um item da lista retornada
    const cupom = response.body[0];
    validarContratoCupom(cupom, cupomSchema);
  }
);

// ---------- Contrato POST ----------
Then(
  'o contrato do cupom retornado no POST deve estar de acordo com o esperado',
  () => {
    expect(response.status).to.eq(201);

    // Valida o contrato do objeto retornado no cadastro
    validarContratoCupom(response.body, cupomSchema);
  }
);
