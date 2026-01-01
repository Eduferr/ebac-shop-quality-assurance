import CarrinhoPage from '../pageObjects/CarrinhoPage';

class CarrinhoActions {

    // =========================
    // Ações básicas de navegação e busca
    // =========================
    buscarProduto(nome) {
        CarrinhoPage.searchInput().clear().type(nome);
        CarrinhoPage.searchButton().click();
    }

    verCarrinho() {
        CarrinhoPage.viewCartButton().click();
    }

    concluirCompra() {
        CarrinhoPage.checkoutButton().click();
    }

    // =========================
    // Ações de seleção e interação
    // =========================
    selecionarCaracteristicas(tamanho, cor, quantidade) {
        CarrinhoPage.sizeOption(tamanho).click();
        CarrinhoPage.colorOption(cor).click();
        CarrinhoPage.quantityInput().clear().type(String(quantidade));
    }

    adicionarAoCarrinho() {
        CarrinhoPage.addToCartButton().click();
    }

    selecionarProdutoComQuantidade(produto, quantidade) {
        produto.quantidade = quantidade;

        this.selecionarCaracteristicas(
            produto.tamanho,
            produto.cor,
            quantidade
        );
    }

    // =========================
    // Fluxos compostos
    // =========================
    adicionarMultiplosProdutos(produtos, posicoes) {
        posicoes.forEach(({ posicao, quantidade }) => {
            if (quantidade <= 0) return;

            const produtoAtual = produtos[posicao];

            this.buscarProduto(produtoAtual.nome);
            this.selecionarCaracteristicas(
                produtoAtual.tamanho,
                produtoAtual.cor,
                quantidade
            );
            this.adicionarAoCarrinho();
        });
    }

    // =========================
    // Validações de regras de negócio
    // =========================
    validarLimiteQuantidade(produto) {
        const { quantidade } = produto;

        if (quantidade <= 10) {
            CarrinhoPage.successMessage()
                .should('be.visible');
        } else {
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
                CarrinhoPage.pageTitle()
                    .should('be.visible')
                    .and('contain.text', 'Checkout');
            } else {
                throw new Error(
                    `Regra de negócio violada: o sistema permitiu avançar para o Checkout com valor total de R$ ${valorTotal.toFixed(2)}, excedendo o limite de R$ 990,00.`
                );
            }
        });
    }

    // =========================
    // Cupons de desconto
    // =========================
    aplicarCupom(cupom) {
        CarrinhoPage.couponInput()
            .clear()
            .type(cupom);

        CarrinhoPage.applyCouponButton().click();
    }

    validarAplicacaoCupom(cupom) {
        CarrinhoPage.noticeMessage()
            .should('be.visible')
            .then(($el) => {

                const texto = $el.text();

                if ($el.hasClass('woocommerce-message')) {
                    expect(texto).to.contain(
                        'Código de cupom aplicado com sucesso.'
                    );
                    return;
                }

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
