#language: pt

Funcionalidade: Serviço de Cupons - EBAC SHOP

    Cenário: Listar todos os cupons cadastrados
        Dado que o admin realiza a requisição com autenticação valida
        Quando realizar a requisição de listagem de cupons
        Então a API deve retornar a lista de cupons com sucesso

    Esquema do Cenário: Não permitir acesso à listagem de cupons - <descricao>
        Dado que o admin realiza a requisição com autenticação <tipo_auth>
        Quando realizar a requisição de listagem de cupons
        Então o acesso à listagem de cupons deve ser bloqueado
    Exemplos:
        | descricao | tipo_auth |
        | Sem autenticação  | sem_auth  |
        | Com autenticação inválida  | invalida  |

    Cenário: Permitir cadastro de cupom com sucesso
        Dado que o admin realiza a requisição com autenticação valida
        Quando realizar o cadastro de um novo cupom
        Então a API deve retornar o cupom criado com sucesso


    Cenário: Não permitir cadastro de cupom com nome duplicado
        Dado que o admin realiza a requisição com autenticação valida
        E já existe um cupom cadastrado com o nome "cupom_repetido"
        Quando tentar cadastrar um novo cupom com o mesmo nome "cupom_repetido"
        Então a API deve retornar erro informando que o nome do cupom já existe


    Esquema do Cenário: Não permitir cadastro de cupom com dados obrigatórios inválidos - <descricao>
        Dado que o admin realiza a requisição com autenticação valida
        Quando realizar o cadastro de um novo cupom com dados inválidos:
            | code          | <code>          |
            | amount        | <amount>        |
            | discount_type | <discount_type> |
            | description   | <description>   |
        Então a API deve retornar erro de validação no cadastro de cupom

    Exemplos:
        | descricao                  | code      | amount | discount_type  | description                         |
        | Código ausente             |           | 10.00  | fixed_product  | Cupom criado via teste automatizado |
        | Valor ausente              | DINAMICO  |        | fixed_product  | Cupom criado via teste automatizado |
        | Tipo de desconto inválido  | DINAMICO  | 10.00  | tipo_invalido  | Cupom criado via teste automatizado |
        | Descrição ausente          | DINAMICO  | 10.00  | fixed_product  |                                     |






