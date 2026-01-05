export function validarContratoCupom(cupom, schema) {
    // Percorre todos os campos definidos no schema do cupom
    Object.keys(schema).forEach((campo) => {
        // Verifica se o objeto cupom possui o campo esperado
        expect(cupom).to.have.property(campo);
        // Verifica se o tipo do campo retornado corresponde ao tipo definido no schema
        expect(typeof cupom[campo]).to.eq(schema[campo]);
    });
}
