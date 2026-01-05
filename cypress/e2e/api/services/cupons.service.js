import { gerarCodigoCupom } from '../utils/random';

class CuponsService {

    // ======================================================
    // HEADERS / AUTENTICAÇÃO
    // ======================================================

    /* Retorna o header de autenticação */
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
    // MÉTODOS GET (CONSULTA)
    // ======================================================

    /* Lista todos os cupons */
    static listarCupons(tipoAuth = 'valida') {
        return cy.request({
            method: 'GET',
            url: '/wp-json/wc/v3/coupons',
            headers: this.getAuthHeader(tipoAuth),
            failOnStatusCode: false
        });
    }

    /* Busca cupom por ID */
    static buscarCupomPorId(id, tipoAuth = 'valida') {
        return cy.request({
            method: 'GET',
            url: `/wp-json/wc/v3/coupons/${id}`,
            headers: this.getAuthHeader(tipoAuth),
            failOnStatusCode: false
        });
    }

    // ======================================================
    // MÉTODOS POST (CRIAÇÃO SIMPLES)
    // ======================================================

    /* Cria cupom padrão */
    static criarCupom(tipoAuth = 'valida') {
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
            headers: this.getAuthHeader(tipoAuth),
            body,
            failOnStatusCode: false
        });
    }

    /* Cria cupom com body controlado na step */
    static criarCupomComBody(body) {
        return cy.request({
            method: 'POST',
            url: '/wp-json/wc/v3/coupons',
            headers: this.getAuthHeader(),
            body,
            failOnStatusCode: false
        });
    }

    // ======================================================
    // MÉTODOS POST COMPOSTOS (REGRA DE NEGÓCIO)
    // ======================================================

    static criarCupomComRegrasDeNegocio(data) {
        const body = {};

        // ---- REGRA DO CODE ----
        if (data.code === 'DINAMICO') {
            body.code = gerarCodigoCupom('cupomFerr');
        }

        // Se vier preenchido, envia
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
