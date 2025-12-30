#language: pt

Funcionalidade: Serviço de Cupons - EBAC SHOP

    Cenário: Listar todos os cupons cadastrados
        Dado que o admin está autenticado na API
        Quando realizar a requisição de listagem de cupons
        Então a API deve retornar a lista de cupons com sucesso

    Cenário: Cadastrar um novo cupom com sucesso
        Dado que o admin está autenticado na API
        Quando realizar o cadastro de um novo cupom
        Então a API deve retornar o cupom criado com sucesso