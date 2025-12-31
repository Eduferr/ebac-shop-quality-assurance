import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import CarrinhoActions from '../../pages/actions/CarrinhoActions';

let produto;

/* ================= GIVEN (Dado) ================= */

Given('que o usuário acessa a página de produtos', () => {
    cy.visit('/produtos');
});


/* ================= WHEN (Quando) ================= */

When('busca um produto pelo nome na posição {int}', (posicao) => {
    cy.fixture('produtos').then((produtos) => {
        produto = produtos[posicao];
        CarrinhoActions.buscarProduto(produto.nome);
    });
});


When(
    'seleciona suas características com quantidade {int}',
    (quantidade) => {
        produto.quantidade = quantidade;

        CarrinhoActions.selecionarCaracteristicas(
            produto.tamanho,
            produto.cor,
            quantidade
        );
    }
);

When('adiciona o produto ao carrinho', () => {
    CarrinhoActions.adicionarAoCarrinho();
});

When('acessa o carrinho', () => {
    CarrinhoActions.verCarrinho();
});

When('tenta finalizar a compra', () => {
    CarrinhoActions.concluirCompra();
});

When('aplica o cupom de desconto {string}', (cupom) => {
    CarrinhoActions.aplicarCupom(cupom);
});

When(
    'adiciona produtos ao carrinho com quantidades {int}, {int}, {int}',
    (q1, q2, q3) => {

        const posicoes = [
            { posicao: 4, quantidade: q1 },
            { posicao: 5, quantidade: q2 },
            { posicao: 6, quantidade: q3 },
        ];

        cy.fixture('produtos').then((produtos) => {

            posicoes.forEach(({ posicao, quantidade }) => {
                if (quantidade <= 0) return;
                const produtoAtual = produtos[posicao];
                CarrinhoActions.buscarProduto(produtoAtual.nome);
                CarrinhoActions.selecionarCaracteristicas(
                    produtoAtual.tamanho,
                    produtoAtual.cor,
                    quantidade
                );
                CarrinhoActions.adicionarAoCarrinho();
            });
        });
    }
);


/* ================= THEN (Então) ================== */

Then('o sistema deve validar o limite de quantidade', () => {
    CarrinhoActions.validarLimiteQuantidade(produto);
});

Then('o sistema deve validar o limite de compra', () => {
    CarrinhoActions.validarLimiteCompra(produto);
});

Then('o sistema deve validar a aplicação do cupom {string}', (cupom) => {
    CarrinhoActions.validarAplicacaoCupom(cupom);
}
);





