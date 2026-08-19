import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly totalPrice: Locator;
  readonly checkoutButton: Locator;
  readonly removeButton: Locator;
  readonly quantityInput: Locator;
  readonly emptyCartMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('[data-testid="cart-item"]');
    this.totalPrice = page.locator('[data-testid="total-price"]');
    this.checkoutButton = page.locator('[data-testid="checkout"]');
    this.removeButton = page.locator('[data-testid="remove-item"]');
    this.quantityInput = page.locator('[data-testid="cart-quantity"]');
    this.emptyCartMessage = page.locator('[data-testid="empty-cart"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/#/cart');
  }

  async getCartItemsCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async getTotalPrice(): Promise<string | null> {
    return await this.totalPrice.textContent();
  }

  async removeItem(index: number): Promise<void> {
    await this.removeButton.nth(index).click();
  }

  async updateQuantity(index: number, quantity: number): Promise<void> {
    await this.quantityInput.nth(index).fill(quantity.toString());
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async isCartEmpty(): Promise<boolean> {
    return await this.emptyCartMessage.isVisible();
  }
}
