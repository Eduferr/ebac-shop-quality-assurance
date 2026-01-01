#language: pt

Funcionalidade: Carrinho de Compras

    Contexto:
        Dado que o usuário acessa a página de produtos

    # Esquema do Cenário: Validar limite de compra do produto | <descricao>        
    #     Quando busca um produto pelo nome na posição <posicao>
    #     E seleciona suas características com quantidade <quantidade>
    #     E adiciona o produto ao carrinho
    #     Então o sistema deve validar o limite de quantidade

    # Exemplos:
    #     | descricao                             | posicao | quantidade |
    #     | Até 10 unidades - Compra válida       | 0       | 2          |
    #     | Mais de 10 unidades - Compra inválida | 0       | 11         |



    Esquema do Cenário: Validar limite de valor total | <descricao>
        Quando busca um produto pelo nome na posição <posicao>
        E seleciona suas características com quantidade <quantidade>
        E adiciona o produto ao carrinho
        E acessa o carrinho
        E tenta finalizar a compra
        Então o sistema deve validar o limite de compra

    Exemplos:
        | descricao                             | posicao | quantidade |
        | Até R$ 990,00 - Compra válida         | 1       | 10         |
        | Acima de R$ 990,00 - Compra inválida  | 2       | 12         |



    # Esquema do Cenário: Validar aplicação de cupom no carrinho | <descricao>
    #     Quando adiciona produtos ao carrinho com quantidades <q1>, <q2>, <q3>
    #     E acessa o carrinho
    #     E aplica o cupom de desconto "<cupom>"
    #     Então o sistema deve validar a aplicação do cupom "<cupom>"

    # Exemplos:
    #     | descricao                                             | q1 | q2 | q3 | cupom     |
    #     | Cupom 10% inválido - Valor abaixo de R$ 200           | 1  | 1  | 1  | techugo10 |
    #     | Cupom 10% válido - Valor entre R$ 200 e R$ 600        | 2  | 2  | 2  | techugo10 |
    #     | Cupom 10% inválido - Valor acima de R$ 600            | 3  | 3  | 4  | techugo10 |
    #     | Cupom 15% inválido - Valor igual ou menor que R$ 600  | 3  | 3  | 3  | techugo15 |
    #     | Cupom 15% válido - Valor acima de R$ 600              | 3  | 3  | 4  | techugo15 |




