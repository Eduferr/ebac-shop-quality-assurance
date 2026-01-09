class CarrinhoPage {

    // =========================
    // Busca / navegação
    // =========================
    searchInput() {
        return cy.get('input[placeholder="Enter your search ..."]').eq(1);
    }

    searchButton() {
        return cy.get('.search .button-group');
    }

    // =========================
    // Configuração do produto
    // =========================
    sizeOption(tamanho) {
        return cy.get(`.button-variable-item-${tamanho}`);
    }

    colorOption(cor) {
        return cy.get(`.button-variable-item-${cor}`);
    }

    quantityInput() {
        return cy.get('[name="quantity"]');
    }

    // =========================
    // Ações de carrinho
    // =========================
    addToCartButton() {
        return cy.get('.single_add_to_cart_button');
    }

    viewCartButton() {
        return cy.get('.woocommerce-message > .button');
    }

    checkoutButton() {
        return cy.get('.checkout-button');
    }

    // =========================
    // Mensagens / feedback
    // =========================
    successMessage() {
        return cy.get('.woocommerce-message');
    }

    errorMessage() {
        return cy.get('.woocommerce-error');
    }

    // Mensagem genérica (sucesso ou erro) para validar aplicação de cupom
    noticeMessage() {
        return cy.get('.woocommerce-message, .woocommerce-error');
    }

    // =========================
    // Valores e cupons
    // =========================
    valorTotalCarrinho() {
        return cy.get('tr.order-total .woocommerce-Price-amount.amount');
    }

    couponInput() {
        return cy.get('#coupon_code');
    }

    applyCouponButton() {
        return cy.get('[name="apply_coupon"]');
    }

    // =========================
    // Conteúdo de checkout
    // =========================
    pageTitle() {
        return cy.get('.page-title');
    }

}
export default new CarrinhoPage();
