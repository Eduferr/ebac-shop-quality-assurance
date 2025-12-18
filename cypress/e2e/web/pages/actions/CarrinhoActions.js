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
}

export default new CarrinhoActions();
