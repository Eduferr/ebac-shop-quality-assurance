import http from 'k6/http';
import { check, sleep } from 'k6';
import { produtos } from '../payloads/produto.payload.js';

export default function produtoGetScenario() {
  const baseUrl = __ENV.BASE_URL || 'http://lojaebac.ebaconline.art.br';

  // escolhe um produto aleatório (se tiver mais de 1)
  const produto = produtos[Math.floor(Math.random() * produtos.length)];
  const url = `${baseUrl}${produto.path}`;

  const res = http.get(url, {
    tags: { name: 'GET Produto (PDP)' },
  });

  check(res, {
    'PDP retornou 200': (r) => r.status === 200,
    'HTML não vazio': (r) => !!r.body && r.body.length > 0,
    'Contém slug do produto': (r) => r.body.includes('typhon-performance-fleece-lined-jacket'),
  });

  // “think time” pequeno pra simular usuário navegando
  sleep(1);
}
