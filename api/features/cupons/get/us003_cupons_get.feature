#language: pt

Funcionalidade: Serviço de Cupons - EBAC SHOP

    Cenário: Listar todos os cupons cadastrados
        Dado que o admin realiza a requisição com autenticação valida
        Quando realizar a requisição de listagem de cupons
        Então a API deve retornar a lista de cupons com sucesso

    Cenário: Buscar cupom por ID com sucesso
        Dado que o admin realiza a requisição com autenticação valida
        E existe um cupom previamente cadastrado
        Quando realizar a requisição de consulta de cupom por ID
        Então a API deve retornar os dados do cupom consultado com sucesso

    Esquema do Cenário: Não permitir acesso à listagem de cupons - <descricao>
        Dado que o admin realiza a requisição com autenticação <tipo_auth>
        Quando realizar a requisição de listagem de cupons
        Então o acesso à listagem de cupons deve ser bloqueado
    Exemplos:
        | descricao | tipo_auth |
        | Sem autenticação  | sem_auth  |
        | Com autenticação inválida  | invalida  |