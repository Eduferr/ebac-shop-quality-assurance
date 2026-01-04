import { gerarCodigoCupom } from '../utils/random';

class CuponsService {

    // ======================================================
    // HEADERS / AUTENTICAÇÃO
    // ======================================================

    /* Retorna o header de autenticação (padrão: válida) */
    static getAuthHeader(tipoAuth = 'valida') {

        if (tipoAuth === 'invalida') {
            return {
                Authorization: 'Basic token_invalido',
                accept: 'application/json'
            };
        }

        if (tipoAuth === 'sem_auth') {
            return {
                Authorization: '',
                accept: 'application/json'
            };
        }

        return {
            Authorization: `Basic ${Cypress.env('BASIC_AUTH')}`,
            accept: 'application/json'
        };
    }

    // ======================================================
    // CONSULTA / LISTAGEM
    // ======================================================

    /* Realiza a requisição para listar todos os cupons cadastrados */
    static listarCupons(tipoAuth = 'valida') {
        return cy.request({
            method: 'GET',
            url: '/wp-json/wc/v3/coupons',
            headers: this.getAuthHeader(tipoAuth),
            failOnStatusCode: false
        });
    }

    // ======================================================
    // CADASTRO DE CUPONS
    // ======================================================

    /* Criação padrão */
    static criarCupom() {
        const codigoCupom = gerarCodigoCupom('cupomEdu');

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
            body,
            failOnStatusCode: false
        });
    }

    /* Criação com body totalmente controlado na step */
    static criarCupomComBody(body) {
        return cy.request({
            method: 'POST',
            url: '/wp-json/wc/v3/coupons',
            headers: this.getAuthHeader(),
            body,
            failOnStatusCode: false
        });
    }

    /* Criação com código dinâmico + body parcial controlado na step (dados inválidos) */
    static criarCupomComBodyParcial(bodyParcial) {
        return cy.request({
            method: 'POST',
            url: '/wp-json/wc/v3/coupons',
            headers: this.getAuthHeader(),
            body: {
                code: gerarCodigoCupom('cupomFerr'),
                ...bodyParcial
            },
            failOnStatusCode: false
        });
    }

}

export default CuponsService;
