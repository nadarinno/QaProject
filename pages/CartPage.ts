import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart-item');
  }

  async goto() {
    await this.page.goto('/cart');
  }

  async removeFirstItem() {
    const item = this.cartItems.first();
    await expect(item).toBeVisible();
    await item.locator('button.btn-danger').click();
  }

  async assertEmpty() {
    await expect(this.page.getByText('Continue Shopping')).toBeVisible();
  }
}
