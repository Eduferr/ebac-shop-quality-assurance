/* Gera um código de cupom dinâmico para uso em testes automatizados.
 * Combina um nome base com um número aleatório, evitando duplicidade. */

export function gerarCodigoCupom(nomeBase = 'cupom') {
  const numero = Math.floor(Math.random() * 100);
  return `${nomeBase}${numero}`;
}
