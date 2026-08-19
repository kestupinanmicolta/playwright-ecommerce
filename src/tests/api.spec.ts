import { expect, test } from '@playwright/test';

test.describe('API Tests @api', () => {
  test('GET /products should return products list', async ({ request }) => {
    const response = await request.get('/api/products');
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
    expect(data.length).toBeGreaterThan(0);
  });

  test('GET /products/:id should return single product', async ({ request }) => {
    const response = await request.get('/api/products/1');
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('name');
    expect(data).toHaveProperty('price');
  });

  test('GET /products/:id with invalid id should return 404', async ({ request }) => {
    const response = await request.get('/api/products/99999');
    expect(response.status()).toBe(404);
  });

  test('GET /categories should return categories list', async ({ request }) => {
    const response = await request.get('/api/categories');
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
  });

  test('POST /cart should add item to cart', async ({ request }) => {
    const response = await request.post('/api/cart', {
      data: {
        productId: 1,
        quantity: 1,
      },
    });
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    expect(data).toHaveProperty('id');
  });

  test('response time should be under 2 seconds', async ({ request }) => {
    const startTime = Date.now();
    await request.get('/api/products');
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    expect(responseTime).toBeLessThan(2000);
  });

  test('API should return proper content type', async ({ request }) => {
    const response = await request.get('/api/products');
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
  });
});
