Feature: Carrinho de Compras

    # Scenario Outline: Validar limite de compra do produto - <Descricao>
    #     Given que o usuário acessa a página de produtos
    #     When busca um produto pelo nome na posição <posicao>
    #     And seleciona suas características com quantidade <quantidade>
    #     And adiciona o produto ao carrinho
    #     Then o sistema deve validar o limite de quantidade

    #     Examples:
    #         | Descricao           | posicao | quantidade |
    #         | Até 10 unidades     | 0       | 2          |
    #         | Mais de 10 unidades | 0       | 11         |


    Scenario Outline: Validar limite de valor total do carrinho - <Descricao>
        Given que o usuário acessa a página de produtos
        When busca um produto pelo nome na posição <posicao>
        And seleciona suas características com quantidade <quantidade>
        And adiciona o produto ao carrinho
        And acessa o carrinho
        And tenta finalizar a compra
        Then o sistema deve validar o limite de compra

        Examples:
            | Descricao             | posicao | quantidade |
            | Valor até R$ 990      | 1       | 10         |
            # | Valor acima de R$ 990 | 2       | 12         |












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

