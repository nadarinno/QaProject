
import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly removeButtons: Locator;
  readonly emptyMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.removeButtons = page.locator('button:has-text("Remove")');
    this.emptyMessage = page.locator('text=Your cart is empty');
  }

  async goto() {
    await this.page.goto("/cart");
  }

  async removeFirstItem() {
    await expect(this.removeButtons.first()).toBeVisible({ timeout: 10000 });
    await this.removeButtons.first().click();
  }

  async removeAllItems() {
    while (await this.removeButtons.count()) {
      await this.removeButtons.first().click();
    }
  }

  async assertEmpty() {
    await expect(this.emptyMessage).toBeVisible({ timeout: 10000 });
  }


async assertHasItems() {
 await this.page.locator('[data-test="add-to-cart"]').click();


 await expect(this.page.locator('button:has-text("Remove")').first()).toBeVisible({ timeout: 10000 });
}


}
