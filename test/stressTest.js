import http from 'k6/http';
import {check, sleep} from 'k6';

export const options = {
  // stages: [
  //   { duration : '30s', target :20 },
  //   { duration : '1m30s', target: 10},
  //   { duration : '20s', target: 0}
  // ]
  // vus: 10,
  // duration: '1m',
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s',
      duration: '120s',
      preAllocatedVUs: 500,
      maxVUs: 1000
    }
  },
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<2000'] // 95% of requests should be below 2sec
  }
};

export default function () {

  const products = http.get('http://localhost:8000/products');
  check(products, {
    'status was 200': (r) => r.status === 200
    // 'text verification': (r) => r.body.includes('Heir Force Ones')
  });

  const productInfo = http.get('http://localhost:8000/products/1');
  check(productInfo, {
    'status was 200': (r) => r.status === 200
    // 'text verification': (r) => r.body.includes('Camo Onesie')
  });

  const productStyles = http.get('http://localhost:8000/products/2/styles');
  check(productStyles, {
    'status was 200': (r) => r.status === 200
    // 'text verification': (r) => r.body.includes('Bright Future Sunglasses')
  });

  const related = http.get('http://localhost:8000/products/3/related');
  check(related, {
    'status was 200': (r) => r.status === 200
    // 'text verification': (r) => r.body.includes('Camo Onesie')
  });
}