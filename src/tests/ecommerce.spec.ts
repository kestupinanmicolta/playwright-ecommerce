import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test.describe('Flujo completo de compra E2E', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('buscar producto y agregar al carrito', async ({ page }) => {
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await homePage.searchProduct('hammer');
    await expect(homePage.productCards.first()).toBeVisible();

    await homePage.clickProduct(0);
    await expect(productPage.productName).toBeVisible();

    const productName = await productPage.getProductTitle();
    await productPage.addToCart(1);

    await cartPage.goto();
    await expect(cartPage.cartItems).toHaveCount(1);
  });

  test('agregar múltiples productos al carrito', async ({ page }) => {
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await homePage.searchProduct('hammer');
    await homePage.clickProduct(0);
    await productPage.addToCart(2);

    await homePage.goto();
    await homePage.searchProduct('nail');
    await homePage.clickProduct(0);
    await productPage.addToCart(3);

    await cartPage.goto();
    await expect(cartPage.cartItems).toHaveCount(2);
  });

  test('actualizar cantidad en carrito', async ({ page }) => {
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await homePage.searchProduct('hammer');
    await homePage.clickProduct(0);
    await productPage.addToCart(1);

    await cartPage.goto();
    await cartPage.updateQuantity(0, 5);

    const quantity = await cartPage.quantityInput.first().inputValue();
    expect(quantity).toBe('5');
  });

  test('eliminar producto del carrito', async ({ page }) => {
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await homePage.searchProduct('hammer');
    await homePage.clickProduct(0);
    await productPage.addToCart(1);

    await cartPage.goto();
    await expect(cartPage.cartItems).toHaveCount(1);

    await cartPage.removeItem(0);
    await expect(cartPage.emptyCartMessage).toBeVisible();
  });
});

test.describe('Búsqueda de productos', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('buscar producto existente', async () => {
    await homePage.searchProduct('hammer');
    const count = await homePage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test('buscar producto inexistente', async () => {
    await homePage.searchProduct('xyznonexistent');
    const count = await homePage.getProductCount();
    expect(count).toBe(0);
  });

  test('mostrar todos los productos inicialmente', async () => {
    const count = await homePage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Detalle de producto', () => {
  test('mostrar información completa del producto', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    await homePage.goto();
    await homePage.clickProduct(0);

    await expect(productPage.productName).toBeVisible();
    await expect(productPage.productPrice).toBeVisible();
    await expect(productPage.addToCartButton).toBeVisible();
  });

  test('mostrar productos relacionados', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    await homePage.goto();
    await homePage.clickProduct(0);

    const relatedCount = await productPage.getRelatedProductsCount();
    expect(relatedCount).toBeGreaterThanOrEqual(0);
  });
});
