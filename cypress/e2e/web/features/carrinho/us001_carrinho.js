import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import CarrinhoActions from '../../pages/actions/CarrinhoActions';
import LoginActions from '../../pages/actions/LoginActions';

let produto;

/* ---------- GIVEN ---------- */
Given('que o usuário acessa a página de produtos', () => {
    cy.visit('/produtos');
});

/* ---------- WHEN ---------- */
When('busca um produto pelo nome', () => {
    cy.fixture('produtos').then((produtos) => {
        produto = produtos[0];
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


/* ---------- THEN ---------- */




Then('o sistema deve validar o limite de quantidade', () => {
    CarrinhoActions.validarLimiteQuantidade(produto);
});


