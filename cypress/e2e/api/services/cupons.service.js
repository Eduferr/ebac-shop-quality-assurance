class CuponsService {

    static getAuthHeader() {
        return {
            Authorization: `Basic ${Cypress.env('BASIC_AUTH')}`,
            accept: 'application/json'
        };
    }

    static listarCupons() {
        return cy.request({
            method: 'GET',
            url: '/wp-json/wc/v3/coupons',
            headers: this.getAuthHeader()
        });
    }

    static listarCupomPorId(id) {
        return cy.request({
            method: 'GET',
            url: `/wp-json/wc/v3/coupons/${id}`,
            headers: this.getAuthHeader()
        });
    }
}

export default CuponsService;
