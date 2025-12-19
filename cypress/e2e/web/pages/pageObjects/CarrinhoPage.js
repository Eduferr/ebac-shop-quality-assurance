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
        cy.get('.checkout-button').click();
        cy.get('.showlogin').click();
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

    successMessage() {
        return cy.get('.woocommerce-message');
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
}

export default new CarrinhoPage();
