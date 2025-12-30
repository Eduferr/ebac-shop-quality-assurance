Feature: Contrato da API de Cupons

    Scenario: Validar contrato do cupom retornado pela API
        Given que o admin está autenticado na API
        When realizar a requisição de listagem de cupons
        Then o contrato do cupom deve estar de acordo com o esperado
