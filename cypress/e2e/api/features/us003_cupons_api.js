import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import CuponsService from '../services/cupons.service.js';

let response;

/* ---------- GIVEN ---------- */
Given('que o admin está autenticado na API', () => {
    // Autenticação é implícita via header
});

/* ---------- WHEN ---------- */
When('realizar a requisição de listagem de cupons', () => {
    CuponsService.listarCupons().then((res) => {
        response = res;
    });
});

/* ---------- THEN ---------- */
Then('a API deve retornar a lista de cupons com sucesso', () => {
    expect(response.status).to.eq(200);
    expect(response.body).to.be.an('array');
});
