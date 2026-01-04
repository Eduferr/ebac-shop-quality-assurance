import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import CarrinhoActions from '../../pages/actions/CarrinhoActions';

let produto;

// ======================================================
// GIVEN (Contexto inicial)
// ======================================================

Given('que o usuário acessa a página de produtos', () => {
    cy.visit('/produtos');
});

// ======================================================
// WHEN (Ações do usuário)
// ======================================================

// ---------- Busca e seleção de produto ----------

When('busca um produto pelo nome na posição {int}', (posicao) => {
    cy.fixture('produtos').then((produtos) => {
        produto = produtos[posicao];
        CarrinhoActions.buscarProduto(produto.nome);
    });
});

When('seleciona suas características com quantidade {int}', (quantidade) => {
    CarrinhoActions.selecionarProdutoComQuantidade(
        produto,
        quantidade
    );
});

// ---------- Ações no carrinho ----------

When('adiciona o produto ao carrinho', () => {
    CarrinhoActions.adicionarAoCarrinho();
});

When('acessa o carrinho', () => {
    CarrinhoActions.verCarrinho();
});

When('tenta finalizar a compra', () => {
    CarrinhoActions.concluirCompra();
});

// ---------- Aplicação de cupom ----------

When('aplica o cupom de desconto {string}', (cupom) => {
    CarrinhoActions.aplicarCupom(cupom);
});

// ---------- Inclusão de produtos com quantidade ----------

When('adiciona um produto ao carrinho com quantidade {int}', function (quantidade) {
        this.quantidade = quantidade;

        cy.fixture('produtos').then((produtos) => {
            CarrinhoActions.adicionarProdutos(produtos, [
                { posicao: 0, quantidade }
            ]);
        });
    }
);

When('adiciona produtos ao carrinho com quantidades {int}, {int}, {int}', (q1, q2, q3) => {
        const posicoes = [
            { posicao: 4, quantidade: q1 },
            { posicao: 5, quantidade: q2 },
            { posicao: 6, quantidade: q3 }
        ];

        cy.fixture('produtos').then((produtos) => {
            CarrinhoActions.adicionarProdutos(produtos, posicoes);
        });
    }
);

// ======================================================
// THEN (Validações)
// ======================================================

Then('o sistema deve validar o limite de quantidade', function () {
    CarrinhoActions.validarLimiteQuantidade(this.quantidade);
});

Then('o sistema deve validar o limite de compra do carrinho', () => {
    CarrinhoActions.validarLimiteCompra();
});

Then('o sistema deve validar a aplicação do cupom {string}', (cupom) => {
    CarrinhoActions.validarAplicacaoCupom(cupom);
});
