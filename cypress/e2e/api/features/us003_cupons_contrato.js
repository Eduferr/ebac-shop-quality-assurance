import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import CuponsService from '../services/cupons.service';
import { cupomSchema } from '../schemas/cupom.schema';

let response;

/* ================= GIVEN (Dado) ================= */

Given('que o admin está autenticado na API', () => { });


/* ================= WHEN (Quando) ================= */

When('realizar a requisição de listagem de cupons', () => {
    CuponsService.listarCupons().then((res) => {
        response = res;
    });
});


/* ================= THEN (Então) ================== */

Then('o contrato do cupom deve estar de acordo com o esperado', () => {
    expect(response.status).to.eq(200);

    const cupom = response.body[0]; // valida um item

    Object.keys(cupomSchema).forEach((campo) => {
        expect(cupom).to.have.property(campo);
        expect(typeof cupom[campo]).to.eq(cupomSchema[campo]);
    });
});
