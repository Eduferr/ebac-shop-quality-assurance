export const produtoOptions = {
  scenarios: {
    produto_load: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '20s', target: 10 },  // sobe até 10 VUs
        { duration: '1m', target: 10 },   // sustenta
        { duration: '10s', target: 0 },   // desce
      ],
      gracefulRampDown: '10s',
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'],      // <1% falhas
    http_req_duration: ['p(95)<5000'],   // p95 abaixo de 5s (ajuste conforme meta)
    checks: ['rate>0.99'],               // 99% checks ok
  },
};
