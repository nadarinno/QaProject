import { Page, Locator, expect } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;

  // Common
  readonly searchInput: Locator;
  readonly sortSelect: Locator;
  readonly productCards: Locator;
  readonly productPrices: Locator;

  // Price range (Slider)
  readonly priceSliders: Locator; //zaina

  constructor(page: Page) {
    this.page = page;

    this.searchInput = page.locator('input[placeholder="Search"]');
    this.sortSelect = page.locator("select");

    this.productCards = page.locator(".card");
    this.productPrices = page.locator(".card .price");

    // Price range sliders
    this.priceSliders = page.getByRole("slider"); //zaina
  }

  // ===============================
  // NAVIGATION
  // ===============================

  async goto() {
    await this.page.goto("/");
  }

 async openFirstProduct() {
  await expect(this.productCards.first()).toBeVisible();
  await this.productCards.first().click();
}

  async openCart() {
    await this.page.goto("/cart");
  }

  // ===============================
  // CART
  // ===============================

async addToCartFromProductDetails() {
  await this.page
    .locator('button', { hasText: 'Add to cart' })
    .first()
    .click();
}



  // ===============================
  // SEARCH & SORT
  // ===============================

  async search(text: string) {
    await this.searchInput.fill(text);
    await this.searchInput.press("Enter");
  }

  async sortAZ() {
    await this.sortSelect.selectOption({ value: "name,asc" });
  }

  async sortPriceHighToLow() {
    await this.sortSelect.selectOption({ value: "price,desc" });
  }

  // ===============================
  // FILTERS
  // ===============================

  // Category
  async filterByCategory(categoryName: string) {
  await this.page
    .locator('label', { hasText: categoryName })
    .locator('input[type="checkbox"]')
    .check();
}


  //------------------------------------------------------------------------------------
  // Brand //zaina
  async filterByBrand(brandName: string) {
    await this.page
      .locator(`label:has-text("${brandName}") input[type="checkbox"]`)
      .check();
  }
  // ===============================
  // PRICE RANGE // zaina
  // ===============================

  // Generic slider movement
  async filterByPriceRangeSteps(minSteps: number, maxSteps: number) {
    await expect(this.priceSliders).toHaveCount(2);

    const minSlider = this.priceSliders.nth(0); // min price
    const maxSlider = this.priceSliders.nth(1); // max price

    await minSlider.focus();
    for (let i = 0; i < minSteps; i++) {
      await this.page.keyboard.press("ArrowRight");
    }

    await maxSlider.focus();
    for (let i = 0; i < maxSteps; i++) {
      await this.page.keyboard.press("ArrowLeft");
    }
  }

  // Medium range
  async filterByMediumPriceRange() {
    await this.filterByPriceRangeSteps(15, 15);
  }

  // Narrow range
  async filterByNarrowPriceRange() {
    await this.filterByPriceRangeSteps(30, 30);
  }

  // ===============================
  // ASSERTIONS
  // ===============================

  async assertHasResults() {
    await expect(this.productCards.first()).toBeVisible();
  }

  async assertPricesWithinRange(min: number, max: number) {
    const prices = await this.productPrices.allTextContents();

    for (const priceText of prices) {
      const price = Number(priceText.replace("$", ""));
      expect(price).toBeGreaterThanOrEqual(min);
      expect(price).toBeLessThanOrEqual(max);
    }
  }

  // ===============================
  // UTILITIES
  // ===============================

  async clearFilters() {
    await this.page.reload();
  }
}
