#language: pt

Funcionalidade: Contrato da API de Cupons

    # Teste de contrato método GET da API de Cupons
    Cenário: Validar contrato do cupom retornado pela API
        Dado que o admin está autenticado na API
        Quando realizar a requisição de listagem de cupons
        Então o contrato do cupom retornado no GET deve estar de acordo com o esperado

    # Teste de contrato método POST da API de Cupons
    Cenário: Validar contrato do cupom retornado no cadastro
            Dado que o admin está autenticado na API
            Quando realizar o cadastro de um novo cupom
            Então o contrato do cupom retornado no POST deve estar de acordo com o esperado
    # Idealmente, também validar contrato do cupom retornado no POST