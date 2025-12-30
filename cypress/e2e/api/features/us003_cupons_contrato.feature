#language: pt

Funcionalidade: Contrato da API de Cupons

    Cenário: Validar contrato do cupom retornado pela API
        Dado que o admin está autenticado na API
        Quando realizar a requisição de listagem de cupons
        Então o contrato do cupom deve estar de acordo com o esperado