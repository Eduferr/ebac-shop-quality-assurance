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

Given(
  'já existe um cupom cadastrado com o nome {string}',
  (codigo) => {
    CuponsService.criarCupomComBody({
      code: codigo,
      amount: '10.00',
      discount_type: 'fixed_product',
      description: 'Cupom previamente cadastrado'
    });
  }
);

// ======================================================
// WHEN (Ações executadas)
// ======================================================

// ---------- Listagem de cupons ----------

When('realizar a requisição de listagem de cupons', () => {
  CuponsService.listarCupons(authType).then((res) => {
    response = res;
  });
});

// ---------- Cadastro de cupom (sucesso) ----------

When('realizar o cadastro de um novo cupom', () => {
  CuponsService.criarCupom().then((res) => {
    response = res;
  });
});

// ---------- Cadastro de cupom com dados inválidos ----------

When('realizar o cadastro de um novo cupom com dados inválidos e código dinâmico:',
  (dataTable) => {
    const data = dataTable.rowsHash();

    CuponsService.criarCupomComBodyParcial({
      amount: data.amount || undefined,
      discount_type: data.discount_type || undefined,
      description: data.description || undefined
    }).then((res) => {
      response = res;
    });
  }
);

// ---------- Cadastro de cupom com nome duplicado ----------

When('tentar cadastrar um novo cupom com o mesmo nome {string}', (codigo) => {
    CuponsService.criarCupomComBody({
      code: codigo,
      amount: '15.00',
      discount_type: 'fixed_product',
      description: 'Tentativa de duplicação'
    }).then((res) => {
      response = res;
    });
  }
);

// ======================================================
// THEN (Validações / Resultados esperados)
// ======================================================

// ---------- Listagem de cupons ----------

Then('a API deve retornar a lista de cupons com sucesso', () => {
  expect(response.status).to.eq(200);
  expect(response.body).to.be.an('array');
});

Then('o acesso à listagem de cupons deve ser bloqueado', () => {
  expect([401, 500]).to.include(response.status);
  expect(response.body).to.have.property('message');
});

// ---------- Cadastro de cupom ----------

Then('a API deve retornar o cupom criado com sucesso', () => {
  expect(response.status).to.eq(201);
  expect(response.body).to.have.property('id');
  expect(response.body).to.have.property('code');
  expect(response.body.discount_type).to.eq('fixed_product');
});

// ---------- Nome de cupom duplicado ----------

Then('a API deve retornar erro informando que o nome do cupom já existe', () => {
  expect([400, 409]).to.include(response.status);
  expect(response.body.message).to.match(/exist|already/i);
});

// ---------- Validação de dados obrigatórios ----------

Then('a API deve retornar erro de validação no cadastro de cupom', () => {

  if (response.status === 201) {
    cy.log(
      '❌ FALHA DE REGRA DE NEGÓCIO: ' +
      'A API permitiu o cadastro do cupom mesmo com dados inválidos.'
    );
  }

  cy.then(() => {
    expect([400, 422]).to.include(response.status);
    expect(response.body).to.have.property('message');
  });

});
