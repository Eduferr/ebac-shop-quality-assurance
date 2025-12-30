import { gerarCodigoCupom } from './utils/random.js';

class CuponsService {

    static getAuthHeader() {
        return {
            Authorization: `Basic ${Cypress.env('BASIC_AUTH')}`,
            accept: 'application/json'
        };
    }

    static listarCupons() {
        return cy.request({
            method: 'GET',
            url: '/wp-json/wc/v3/coupons',
            headers: this.getAuthHeader()
        });
    }

    static listarCupomPorId(id) {
        return cy.request({
            method: 'GET',
            url: `/wp-json/wc/v3/coupons/${id}`,
            headers: this.getAuthHeader()
        });
    }

    static criarCupom() {
        const codigoCupom = gerarCodigoCupom('cupomTeste');

        const body = {
            code: codigoCupom,
            amount: '10.00',
            discount_type: 'fixed_product',
            description: 'Cupom criado via teste automatizado'
        };

        return cy.request({
            method: 'POST',
            url: '/wp-json/wc/v3/coupons',
            headers: this.getAuthHeader(),
            body
        });
    }


}

export default CuponsService;
