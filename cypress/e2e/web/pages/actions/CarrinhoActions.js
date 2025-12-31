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
        CarrinhoPage.checkoutButton().click();
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

    validarLimiteCompra() {
        CarrinhoPage.valorTotalCarrinho().then((text) => {

            const valorTotal = Number(
                text
                    .replace(/\s/g, '')
                    .replace('R$', '')
                    .replace(/\./g, '')
                    .replace(',', '.')
            );

            if (Number.isNaN(valorTotal)) {
                throw new Error(
                    `Falha ao converter valor monetário: "${text}"`
                );
            }

            if (valorTotal <= 990) {
                cy.get('.page-title')
                    .should('be.visible')
                    .and('contain.text', 'Checkout');
            } else {
                throw new Error(
                    `Regra de negócio violada: o sistema permitiu avançar para o Checkout com valor total de R$ ${valorTotal.toFixed(2)}, excedendo o limite de R$ 990,00.`
                );
            }
        });
    }

    aplicarCupom(cupom) {
        cy.get('#coupon_code')
            .clear()
            .type(cupom);

        cy.get('[name="apply_coupon"]').click();
    }

validarAplicacaoCupom(cupom) {

    // Aguarda até aparecer mensagem de sucesso OU erro
    cy.get('.woocommerce-message, .woocommerce-error', { timeout: 10000 })
        .should('be.visible')
        .then(($el) => {

            const texto = $el.text();

            /* ===============================
               SUCESSO
            ================================ */
            if ($el.hasClass('woocommerce-message')) {
                expect(texto).to.contain(
                    'Código de cupom aplicado com sucesso.'
                );
                return;
            }

            /* ===============================
               ERRO
            ================================ */
            if ($el.hasClass('woocommerce-error')) {

                if (cupom === 'techugo10') {
                    expect(texto).to.satisfy((msg) =>
                        msg.includes('O valor mínimo do pedido para este cupom é R$200,00') ||
                        msg.includes('O valor máximo que pode ser gasto para este cupom é de R$600,00')
                    );
                    return;
                }

                if (cupom === 'techugo15') {
                    expect(texto).to.contain(
                        'O valor mínimo do pedido para este cupom é R$601,00'
                    );
                    return;
                }
            }

            throw new Error(
                'Mensagem inesperada retornada pelo sistema ao aplicar cupom.'
            );
        });
}





}
export default new CarrinhoActions();
