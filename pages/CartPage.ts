import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartRows: Locator;
  readonly removeButtons: Locator;
  readonly emptyMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // حسب صورة السلة: جدول
    this.cartRows = page.locator('table tbody tr');

    // حسب الصورة: زر أحمر فيه X (btn-danger)
    this.removeButtons = page.locator('button.btn-danger');

    this.emptyMessage = page.getByText('Your cart is empty');
  }

  async goto() {
    await this.page.goto('/cart');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async assertHasItems() {
    await expect(this.cartRows.first()).toBeVisible({ timeout: 15000 });
    await expect(this.removeButtons.first()).toBeVisible({ timeout: 15000 });
  }

  async removeFirstItem() {
    await expect(this.removeButtons.first()).toBeVisible({ timeout: 15000 });
    await this.removeButtons.first().click();
  }

  async assertEmpty() {
    await expect(this.emptyMessage).toBeVisible({ timeout: 15000 });
  }
}
