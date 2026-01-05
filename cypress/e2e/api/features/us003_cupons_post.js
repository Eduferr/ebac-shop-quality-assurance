import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import CuponsService from '../services/cupons.service.js';

let response;
let authType;

// ======================================================
// GIVEN (Contexto / Estado do sistema)
// ======================================================

Given('que o admin realiza a requisição com autenticação {word}', (tipoAuth) => {
  authType = tipoAuth;
});


Given('já existe um cupom cadastrado com o nome {string}', (codigo) => {
    CuponsService.criarCupomComBody({
        code: codigo,
        amount: '10.00',
        discount_type: 'fixed_product',
        description: 'Cupom previamente cadastrado'
    });
}
);

// ======================================================
// WHEN (Ações POST)
// ======================================================

When('realizar o cadastro de um novo cupom', () => {
    CuponsService.criarCupom(authType).then((res) => {
        response = res;
    });
});

When('realizar o cadastro de um novo cupom com dados inválidos:', (dataTable) => {
    const data = dataTable.rowsHash();

    CuponsService.criarCupomComRegrasDeNegocio(data).then((res) => {
        response = res;
    });
}
);

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
// THEN (Validações POST)
// ======================================================

Then('a API deve retornar o cupom criado com sucesso', () => {
    expect(response.status).to.eq(201);
    expect(response.body).to.have.property('id');
    expect(response.body).to.have.property('code');
    expect(response.body.discount_type).to.eq('fixed_product');
});

Then('o cadastro de cupom deve ser bloqueado por autenticação inválida', () => {
    expect([401, 500]).to.include(response.status);
    expect(response.body).to.have.property('message');
}
);


Then('a API deve retornar erro informando que o nome do cupom já existe', () => {
    expect([400, 409]).to.include(response.status);
    expect(response.body.message).to.match(/exist|already/i);
}
);

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
}
);
