Feature: Carrinho de Compras

    Scenario Outline: Validar limite de compra do produto - <Descricao>
        Given que o usuário acessa a página de produtos
        When busca um produto pelo nome
        And seleciona suas características com quantidade <quantidade>
        And adiciona o produto ao carrinho
        Then o sistema deve validar o limite de quantidade

        Examples:
            | Descricao           | quantidade |
            | Até 10 unidades     | 2          |
            | Mais de 10 unidades | 11         |


# Scenario: Não permitir adicionar mais de 10 itens do mesmo produto
#     When seleciona a quantidade de 11 itens
#     And adiciona o produto ao carrinho
#     Then o sistema deve exibir mensagem de limite máximo de itens

# Scenario: Não permitir finalizar compra com valor acima de R$ 990
#     When adiciona produtos ao carrinho até ultrapassar R$ 990
#     And conclui a compra
#     Then o sistema deve bloquear a finalização do pedido
#     And deve exibir mensagem de valor máximo excedido

# Scenario Outline: Aplicar cupom de 10% para compras entre R$ 200 e R$ 600
#     When adiciona produtos ao carrinho com valor total de <valor>
#     And conclui a compra
#     Then o sistema deve aplicar cupom de desconto de 10%

#     Examples:
#         | valor |
#         | 250   |
#         | 400   |
#         | 600   |

# Scenario Outline: Aplicar cupom de 15% para compras acima de R$ 600
#     When adiciona produtos ao carrinho com valor total de <valor>
#     And conclui a compra
#     Then o sistema deve aplicar cupom de desconto de 15%

#     Examples:
#         | valor |
#         | 650   |
#         | 800   |
#         | 990   |

