#language: pt

Funcionalidade: Carrinho de Compras

    Contexto:
        Dado que o usuário acessa a página de produtos

    Esquema do Cenário: Validar limite de compra do produto - <Descricao>        
        Quando busca um produto pelo nome na posição <posicao>
        E seleciona suas características com quantidade <quantidade>
        E adiciona o produto ao carrinho
        Então o sistema deve validar o limite de quantidade

        Exemplos:
            | Descricao                             | posicao | quantidade |
            | Até 10 unidades - Compra válida       | 0       | 2          |
            | Mais de 10 unidades - Compra inválida | 0       | 11         |


    Esquema do Cenário: Validar limite de valor total - <Descricao>
        Quando busca um produto pelo nome na posição <posicao>
        E seleciona suas características com quantidade <quantidade>
        E adiciona o produto ao carrinho
        E acessa o carrinho
        E tenta finalizar a compra
        Então o sistema deve validar o limite de compra

        Exemplos:
            | Descricao                             | posicao | quantidade |
            | Até R$ 990,00 - Compra válida         | 1       | 10         |
            | Acima de R$ 990,00 - Compra inválida  | 2       | 12         |
