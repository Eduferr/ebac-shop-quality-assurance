import { gerarCodigoCupom } from '../utils/random';

class CuponsService {

    /* Retorna o header de autenticação para as requisições da API. */
    static getAuthHeader() {
        return {
            Authorization: `Basic ${Cypress.env('BASIC_AUTH')}`,
            accept: 'application/json'
        };
    }

    /* Realiza a requisição para listar todos os cupons cadastrados. */
    static listarCupons() {
        return cy.request({
            method: 'GET',
            url: '/wp-json/wc/v3/coupons',
            headers: this.getAuthHeader()
        });
    }

    /* Cria um novo cupom via API com código gerado dinamicamente. */
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
