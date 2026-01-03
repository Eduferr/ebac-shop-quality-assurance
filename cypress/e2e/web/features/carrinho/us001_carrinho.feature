#language: pt

Funcionalidade: Carrinho de Compras

    Contexto:
        Dado que o usuário acessa a página de produtos

    Esquema do Cenário: Validar limite de compra de um produto | <descricao>
        Quando adiciona um produto ao carrinho com quantidade <quantidade>
        Então o sistema deve validar o limite de quantidade
    Exemplos:
        | descricao                             | quantidade |
        | Até 10 unidades - Compra válida       | 10         |
        | Mais de 10 unidades - Compra inválida | 11         |


    # O boundary testing exato do valor R$ 990,00 não pôde ser realizado em nível de interface Web, 
    # em razão dos preços fixos do catálogo não permitirem combinações que atinjam exatamente 
    # o valor limite. Assim, foram adotados testes de fronteira aproximada (near-boundary), 
    # validando comportamentos imediatamente abaixo e acima do limite definido pela regra de negócio.
    Esquema do Cenário: Validar limite de valor total do carrinho | <descricao>
        Quando adiciona produtos ao carrinho com quantidades <q1>, <q2>, <q3>
        E acessa o carrinho
        E tenta finalizar a compra
        Então o sistema deve validar o limite de compra do carrinho
    Exemplos:
        | descricao                             | q1 | q2 | q3 |
        | Até R$ 990,00 - Compra válida         | 4  | 6  | 5  |
        | Acima de R$ 990,00 - Compra inválida  | 4  | 7  | 4  |


    Esquema do Cenário: Validar aplicação de cupom no carrinho | <descricao>
        Quando adiciona produtos ao carrinho com quantidades <q1>, <q2>, <q3>
        E acessa o carrinho
        E aplica o cupom de desconto "<cupom>"
        Então o sistema deve validar a aplicação do cupom "<cupom>"
    Exemplos:
        | descricao                                             | q1 | q2 | q3 | cupom     |
        | Cupom 10% inválido - Valor abaixo de R$ 200           | 1  | 1  | 1  | techugo10 |
        | Cupom 10% válido - Valor entre R$ 200 e R$ 600        | 2  | 2  | 2  | techugo10 |
        | Cupom 10% inválido - Valor acima de R$ 600            | 3  | 3  | 4  | techugo10 |
        | Cupom 15% inválido - Valor igual ou menor que R$ 600  | 3  | 3  | 3  | techugo15 |
        | Cupom 15% válido - Valor acima de R$ 600              | 3  | 3  | 4  | techugo15 |