const request = require('supertest');
const { API_CONFIG } = require('../config/api.config');
const { gerarCodigoCupom } = require('../utils/random');

class CuponsService {
  static getHeaders(tipoAuth = 'valida') {
    if (tipoAuth === 'invalida') {
      return { Authorization: 'Basic token_invalido' };
    }

    if (tipoAuth === 'sem_auth') {
      return {};
    }

    return {
      Authorization: `Basic ${API_CONFIG.auth}`,
      accept: 'application/json'
    };
  }

  static listarCupons(tipoAuth = 'valida') {
    return request(API_CONFIG.baseUrl)
      .get('/wp-json/wc/v3/coupons')
      .set(this.getHeaders(tipoAuth));
  }

  static buscarCupomPorId(id, tipoAuth = 'valida') {
    return request(API_CONFIG.baseUrl)
      .get(`/wp-json/wc/v3/coupons/${id}`)
      .set(this.getHeaders(tipoAuth));
  }

  static criarCupom(tipoAuth = 'valida') {
    return request(API_CONFIG.baseUrl)
      .post('/wp-json/wc/v3/coupons')
      .set(this.getHeaders(tipoAuth))
      .send({
        code: gerarCodigoCupom('cupomEdu'),
        amount: '10.00',
        discount_type: 'fixed_product',
        description: 'Cupom criado via teste automatizado'
      });
  }

  static criarCupomComBody(body, tipoAuth = 'valida') {
    return request(API_CONFIG.baseUrl)
      .post('/wp-json/wc/v3/coupons')
      .set(this.getHeaders(tipoAuth))
      .send(body);
  }

  static criarCupomComRegrasDeNegocio(data) {
    const body = {};

    if (data.code === 'DINAMICO') {
      body.code = gerarCodigoCupom('cupomFerr');
    }
    if (data.amount) body.amount = data.amount;
    if (data.discount_type) body.discount_type = data.discount_type;
    if (data.description) body.description = data.description;

    return this.criarCupomComBody(body);
  }
}

module.exports = CuponsService;
