Feature: Carrinho de Compras

    Scenario Outline: Validar limite de compra do produto - <Descricao>
        Given que o usuário acessa a página de produtos
        When busca um produto pelo nome na posição <posicao>
        And seleciona suas características com quantidade <quantidade>
        And adiciona o produto ao carrinho
        Then o sistema deve validar o limite de quantidade

        Examples:
            | Descricao           | posicao | quantidade |
            | Até 10 unidades     | 0       | 2          |
            | Mais de 10 unidades | 0       | 11         |


    Scenario Outline: Validar limite de valor total - <Descricao>
        Given que o usuário acessa a página de produtos
        When busca um produto pelo nome na posição <posicao>
        And seleciona suas características com quantidade <quantidade>
        And adiciona o produto ao carrinho
        And acessa o carrinho
        And tenta finalizar a compra
        Then o sistema deve validar o limite de compra

        Examples:
            | Descricao                         | posicao | quantidade |
            | Até R$ 990,00 - Compra válida        | 1       | 10         |
            | Acima de R$ 990,00 - Compra Inválida | 2       | 12         |


