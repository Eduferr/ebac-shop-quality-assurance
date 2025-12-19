import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import CarrinhoActions from '../../pages/actions/CarrinhoActions';
import LoginActions from '../../pages/actions/LoginActions';

let produto;

/* ---------- GIVEN ---------- */
Given('que o usuário acessa a página de produtos', () => {
    cy.visit('/produtos');
});

/* ---------- WHEN ---------- */
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

/* ---------- THEN ---------- */

Then('o sistema deve validar o limite de quantidade', () => {
    CarrinhoActions.validarLimiteQuantidade(produto);
});

Then('o sistema deve validar o limite de compra', () => {
    CarrinhoActions.validarLimiteCompra(produto);
});




