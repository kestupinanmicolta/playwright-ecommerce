import { Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productCards: Locator;
  readonly cartIcon: Locator;
  readonly cartCount: Locator;
  readonly loginLink: Locator;
  readonly registerLink: Locator;
  readonly categoryFilter: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('[data-testid="search-query"]');
    this.searchButton = page.locator('[data-testid="search-submit"]');
    this.productCards = page.locator('[data-testid="product-card"]');
    this.cartIcon = page.locator('[data-testid="nav-cart"]');
    this.cartCount = page.locator('[data-testid="cart-count"]');
    this.loginLink = page.locator('[data-testid="nav-login"]');
    this.registerLink = page.locator('[data-testid="nav-register"]');
    this.categoryFilter = page.locator('[data-testid="category-filter"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async searchProduct(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }

  async getProductCount(): Promise<number> {
    return await this.productCards.count();
  }

  async clickProduct(index: number): Promise<void> {
    await this.productCards.nth(index).click();
  }

  async getCartCount(): Promise<string | null> {
    return await this.cartCount.textContent();
  }
}
