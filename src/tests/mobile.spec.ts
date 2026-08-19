import { test, expect } from '@playwright/test';

test.describe('Mobile Tests', () => {
  test('homepage should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const searchInput = page.locator('[data-testid="search-query"]');
    await expect(searchInput).toBeVisible();

    const productCards = page.locator('[data-testid="product-card"]');
    const count = await productCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('navigation should work on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const cartIcon = page.locator('[data-testid="nav-cart"]');
    await expect(cartIcon).toBeVisible();
  });

  test('product page should be readable on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.locator('[data-testid="product-card"]').first().click();

    const productName = page.locator('[data-testid="product-name"]');
    await expect(productName).toBeVisible();

    const addToCartButton = page.locator('[data-testid="add-to-cart"]');
    await expect(addToCartButton).toBeVisible();
  });

  test('cart should be usable on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/#/cart');

    const checkoutButton = page.locator('[data-testid="checkout"]');
    await expect(checkoutButton).toBeVisible();
  });

  test('search should work on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const searchInput = page.locator('[data-testid="search-query"]');
    await searchInput.fill('hammer');
    await page.locator('[data-testid="search-submit"]').click();

    const productCards = page.locator('[data-testid="product-card"]');
    const count = await productCards.count();
    expect(count).toBeGreaterThan(0);
  });
});
