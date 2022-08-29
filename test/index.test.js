const supertest = require('supertest');
const server = require('../server/index.js');
const db = require('../models/index.js');

const request = supertest(server);

describe('GET /', () => {
  describe('test server connection', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request.get('/');
      expect(response.statusCode).toBe(200);
    });
    test('should respond with a hello world', async () => {
      const response = await request.get('/');
      expect(response.body.data).toBe('hello world');
    });
    //header type test
  });
});

describe('GET /products', () => {
  describe('retrieves the list of products', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request.get('/products');
      expect(response.statusCode).toBe(200);
    });
    test('should return list of 5 products by default', async () => {
      const response = await request.get('/products');
      const data = response.body;
      expect(data.length).toEqual(5);
    });
    test('should return correct default product information', async () => {
      const response = await request.get('/products');
      expect(response.body[0].id).toBe(1);
      expect(response.body[1].slogan).toBe('You\'ve got to wear shades');
      expect(response.body[2].name).toBe('Morning Joggers');
      expect(response.body[3].default_price).toBe(65)
      expect(response.body[4].category).toBe('Kicks');
    });
  });
});

describe('GET /products/:pId', () => {
  describe('returns all product level information for a specified product id', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request.get('/products/1');
      expect(response.statusCode).toBe(200);
    });
    test('should return product level information', async () => {
      const response = await request.get('/products/1');
      expect(response.body.name).toBe('Camo Onesie');
      expect(response.body.features).toBeDefined();
    });
    test('should return features and related feature/value', async () => {
      const response = await request.get('/products/1');
      expect(Array.isArray(response.body.features)).toBe(true);
      expect(response.body.features[0].feature).toBeDefined();
      expect(response.body.features[0].values).toBeDefined();
    });
  });
});

describe('GET /products/:pId/styles', () => {
  describe('returns all the styles available for the given product', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request.get('/products/1/styles');
      expect(response.statusCode).toBe(200);
    }, 10000);
    test('should return styles related information with product_id and correct number of results', async () => {
      const response = await request.get('/products/1/styles');
      expect(response.body.product_id).toBeDefined();
      expect(Array.isArray(response.body.results)).toBe(true);
      expect(response.body.results.length).toBe(6);
    }, 10000);
    test('results array should contain style information with photos and skus', async () => {
      const response = await request.get('/products/1/styles');
      //styles
      expect(response.body.results[0].style_id).toBeDefined();
      //photos
      expect(Array.isArray(response.body.results[0].photos)).toBe(true);
      expect(response.body.results[0].photos[0].thumbnail_url).toBeDefined();
      expect(response.body.results[0].photos[0].url).toBeDefined();
      //skus
      const skuObj = response.body.results[0].skus;
      expect(typeof skuObj).toBe('object');
      expect(skuObj['1'].quantity).toBeDefined();
      expect(skuObj['1'].size).toBeDefined();
    }, 10000);
  });
});

describe ('GET /products/:pId/related', () => {
  describe('returns the id\'s of products related to the product specified', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request.get('/products/1/related');
      expect(response.statusCode).toBe(200);
    });
    test('should return related product ids', async () => {
      const response = await request.get('/products/1/related');
      const data = response.body;
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(4);
      expect(typeof data[0]).toBe('number');
    })
  })
})