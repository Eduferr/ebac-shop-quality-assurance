/* Schema de validação do objeto Cupom retornado pela API.
 * Define os tipos esperados para cada propriedade do cupom. */

const cupomSchema = {
  id: 'number',
  code: 'string',
  amount: 'string',
  discount_type: 'string',
  description: 'string'
};

module.exports = { cupomSchema };


