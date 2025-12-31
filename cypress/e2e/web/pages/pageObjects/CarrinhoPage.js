class CarrinhoPage {

    searchInput() {
        return cy.get('input[placeholder="Enter your search ..."]').eq(1);
    }

    searchButton() {
        return cy.get('.search .button-group');
    }

    sizeOption(tamanho) {
        return cy.get(`.button-variable-item-${tamanho}`);
    }

    colorOption(cor) {
        return cy.get(`.button-variable-item-${cor}`);
    }

    quantityInput() {
        return cy.get('[name="quantity"]');
    }

    addToCartButton() {
        return cy.get('.single_add_to_cart_button');
    }

    viewCartButton() {
        return cy.get('.woocommerce-message > .button');
    }

    checkoutButton() {
        return cy.get('.checkout-button');
    }

    loginLinkCheckout() {
        return cy.get('.showlogin');
    }

    paymentMethod() {
        return cy.get('[name="payment_method"]');
    }

    termsCheckbox() {
        return cy.get('[name="terms"]');
    }

    placeOrderButton() {
        return cy.get('[name="woocommerce_checkout_place_order"]');
    }

    orderSuccessMessage() {
        return cy.get('.woocommerce-notice');
    }

    successMessage() {
        return cy.get('.woocommerce-message');
    }

    errorMessage() {
        return cy.get('.woocommerce-error');
    }

    // Retorna o valor total do carrinho (posição 7)
    valorTotalCarrinho() {
        return cy
            .get('.woocommerce-Price-amount.amount')
            .eq(7)
            .invoke('text')
    }

    couponInput() {
        return cy.get('#coupon_code');
    }

    applyCouponButton() {
        return cy.get('[name="apply_coupon"]');
    }
}

export default new CarrinhoPage();
