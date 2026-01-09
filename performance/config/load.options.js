export const loginOptions = {
  scenarios: {
    login_load: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '20s', target: 20 },
        { duration: '1m40s', target: 20 },
        { duration: '10s', target: 0 },
      ],
      gracefulRampDown: '10s',
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<5000'],
    http_req_failed: ['rate<0.01'],
    checks: ['rate>=0.99'],
  },
};
