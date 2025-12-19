import { Page, Locator, expect } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;

  readonly searchInput: Locator;
  readonly sortSelect: Locator;

  readonly minPrice: Locator;
  readonly maxPrice: Locator;
  readonly priceApplyBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.searchInput = page.locator('input[placeholder="Search"]');
    this.sortSelect = page.locator('select');

    this.minPrice = page.locator('input[name="price_min"], #price_min');
    this.maxPrice = page.locator('input[name="price_max"], #price_max');
    this.priceApplyBtn = page.locator('button:has-text("Apply"), button:has-text("Filter")');
  }

  async goto() {
    await this.page.goto('/');
  }

  async openFirstProduct() {
    await this.page.locator('.card').first().click();
  }

  async addToCartFromProductDetails() {
    await this.page.locator('button:has-text("Add to cart")').click();
  }

  async openCart() {
    await this.page.goto('/cart');
  }

  async sortAZ() {
    await this.sortSelect.selectOption({ value: 'name,asc' });
  }

  async sortPriceHighToLow() {
    await this.sortSelect.selectOption({ value: 'price,desc' });
  }

  async search(text: string) {
    await this.searchInput.fill(text);
    await this.searchInput.press('Enter');
  }

  async filterByCategory(categoryName: string) {
 
    await this.page.locator(`label:has-text("${categoryName}") input[type="checkbox"]`).check();
  }

  async filterByBrand(brandName: string) {
    await this.page.locator(`label:has-text("${brandName}") input[type="checkbox"]`).check();
  }

  async filterByPriceRange(min: string, max: string) {
    await this.minPrice.fill(min);
    await this.maxPrice.fill(max);
    
    
   
    if (await this.priceApplyBtn.count()) {
      await this.priceApplyBtn.first().click();
    } else {
      await this.maxPrice.press('Enter');
    }
  }

  async assertHasResults() {
  await expect(this.page.locator('.card').first()).toBeVisible();
}

}
