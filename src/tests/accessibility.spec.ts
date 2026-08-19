import { expect, test } from '@playwright/test';
import { axeScan } from '../utils/accessibility';

test.describe('Accessibility Tests @accessibility', () => {
  test('homepage should have no accessibility violations', async ({ page }) => {
    await page.goto('/');
    const results = await axeScan(page);
    expect(results.violations).toEqual([]);
  });

  test('product page should have no accessibility violations', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-testid="product-card"]').first().click();
    await page.waitForLoadState('networkidle');
    const results = await axeScan(page);
    expect(results.violations).toEqual([]);
  });

  test('cart page should have no accessibility violations', async ({ page }) => {
    await page.goto('/#/cart');
    const results = await axeScan(page);
    expect(results.violations).toEqual([]);
  });

  test('login page should have no accessibility violations', async ({ page }) => {
    await page.goto('/#/login');
    const results = await axeScan(page);
    expect(results.violations).toEqual([]);
  });

  test('search functionality should be accessible', async ({ page }) => {
    await page.goto('/');
    const searchInput = page.locator('[data-testid="search-query"]');
    await expect(searchInput).toHaveAttribute('aria-label');
  });

  test('images should have alt text', async ({ page }) => {
    await page.goto('/');
    const images = page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('form inputs should have labels', async ({ page }) => {
    await page.goto('/#/login');
    const emailInput = page.locator('[data-testid="email"]');
    const passwordInput = page.locator('[data-testid="password"]');
    await expect(emailInput).toHaveAttribute('aria-label');
    await expect(passwordInput).toHaveAttribute('aria-label');
  });

  test('navigation should be keyboard accessible', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });
});
