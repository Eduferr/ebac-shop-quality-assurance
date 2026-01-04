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

    static criarCupomComRegrasDeNegocio(data) {
        const body = {};

        // ---- REGRA DO CODE ----
        if (data.code === 'DINAMICO') {
            body.code = gerarCodigoCupom('cupomFerr');
        }

        // Se code vier vazio → não envia
        if (data.amount) body.amount = data.amount;
        if (data.discount_type) body.discount_type = data.discount_type;
        if (data.description) body.description = data.description;

        return cy.request({
            method: 'POST',
            url: '/wp-json/wc/v3/coupons',
            headers: this.getAuthHeader(),
            body,
            failOnStatusCode: false
        });
    }


}

export default CuponsService;
