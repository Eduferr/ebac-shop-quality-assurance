import CarrinhoPage from '../pageObjects/CarrinhoPage';

class CarrinhoActions {

    buscarProduto(nome) {
        CarrinhoPage.searchInput().clear().type(nome);
        CarrinhoPage.searchButton().click();
    }

    selecionarCaracteristicas(tamanho, cor, quantidade) {
        CarrinhoPage.sizeOption(tamanho).click();
        CarrinhoPage.colorOption(cor).click();
        CarrinhoPage.quantityInput().clear().type(String(quantidade));
    }

    adicionarAoCarrinho() {
        CarrinhoPage.addToCartButton().click();
    }

    verCarrinho() {
        CarrinhoPage.viewCartButton().click();
    }

    concluirCompra() {
        CarrinhoPage.checkoutButton();
    }

    validarLimiteQuantidade(produto) {
        const { quantidade } = produto;

        if (quantidade <= 10) {
            // Comportamento esperado para sucesso
            CarrinhoPage.successMessage()
                .should('be.visible');
        } else {
            // Força falha com mensagem de regra de negócio
            throw new Error(
                'Regra de negócio violada: não é permitido inserir mais de 10 unidades do mesmo produto no carrinho.'
            );
        }
    }

    validarLimiteCompra(produto) {
        const { quantidade } = produto;

        if (quantidade <= 10) {
            // Comportamento esperado: acesso permitido ao Checkout
            cy.get('.page-title')
                .should('be.visible')
                .and('contain.text', 'Checkout');
        } else {
            // Regra de negócio não aplicada pelo sistema → falha forçada
            throw new Error(
                'Regra de negócio violada: o sistema permitiu avançar para o Checkout com valor total acima de R$ 990,00.'
            );
        }
    }
}

export default new CarrinhoActions();
