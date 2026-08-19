import { expect, test } from '@playwright/test';

test.describe('Visual Regression Tests @visual', () => {
  test('homepage screenshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('homepage.png', {
      maxDiffPixelRatio: 0.05,
    });
  });

  test('product page screenshot', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-testid="product-card"]').first().click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('product-page.png', {
      maxDiffPixelRatio: 0.05,
    });
  });

  test('cart page screenshot', async ({ page }) => {
    await page.goto('/#/cart');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('cart-page.png', {
      maxDiffPixelRatio: 0.05,
    });
  });

  test('login page screenshot', async ({ page }) => {
    await page.goto('/#/login');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('login-page.png', {
      maxDiffPixelRatio: 0.05,
    });
  });

  test('mobile homepage screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('mobile-homepage.png', {
      maxDiffPixelRatio: 0.05,
    });
  });
});
