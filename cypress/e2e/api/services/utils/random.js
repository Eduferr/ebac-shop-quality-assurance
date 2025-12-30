export function gerarCodigoCupom(nomeBase = 'cupom') {
  const numero = Math.floor(Math.random() * 50);
  return `${nomeBase}${numero}`;
}
