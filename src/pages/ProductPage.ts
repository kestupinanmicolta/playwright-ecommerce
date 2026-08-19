import { Locator, Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly productDescription: Locator;
  readonly addToCartButton: Locator;
  readonly quantityInput: Locator;
  readonly relatedProducts: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator('[data-testid="product-name"]');
    this.productPrice = page.locator('[data-testid="product-price"]');
    this.productDescription = page.locator('[data-testid="product-description"]');
    this.addToCartButton = page.locator('[data-testid="add-to-cart"]');
    this.quantityInput = page.locator('[data-testid="quantity"]');
    this.relatedProducts = page.locator('[data-testid="related-product"]');
  }

  async getProductTitle(): Promise<string | null> {
    return await this.productName.textContent();
  }

  async getProductPrice(): Promise<string | null> {
    return await this.productPrice.textContent();
  }

  async addToCart(quantity: number = 1): Promise<void> {
    await this.quantityInput.fill(quantity.toString());
    await this.addToCartButton.click();
  }

  async getRelatedProductsCount(): Promise<number> {
    return await this.relatedProducts.count();
  }
}
