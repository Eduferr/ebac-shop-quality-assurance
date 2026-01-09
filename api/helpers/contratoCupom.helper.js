const { expect } = require('chai');

function validarContratoCupom(cupom, schema) {
    Object.keys(schema).forEach((campo) => {
        expect(cupom).to.have.property(campo);
        expect(typeof cupom[campo]).to.eq(schema[campo]);
    });
}

module.exports = { validarContratoCupom };
