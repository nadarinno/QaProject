
import { Page, Locator, expect } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;

  readonly searchInput: Locator;
  readonly sortSelect: Locator;
  readonly productCards: Locator;
  readonly productPrices: Locator;
  readonly priceSliders: Locator;

  constructor(page: Page) {
    this.page = page;

    this.searchInput = page.locator('input[placeholder="Search"]');
    this.sortSelect = page.locator("select");
    this.productCards = page.locator(".card");
    this.productPrices = page.locator(".card .price");
    this.priceSliders = page.getByRole("slider");
  }

  // ---------------- NAVIGATION ----------------
  async goto() {
    await this.page.goto("/");
    await this.page.waitForLoadState("networkidle");
  }

  async openFirstProduct() {
    await this.productCards.first().click();
    await this.page.waitForLoadState("networkidle");
  }
   async openCart() {
  await this.page.goto("/cart");
  await this.page.waitForLoadState("networkidle");
}

  // ---------------- CART ----------------

async gotoHome() {
    await this.page.goto('/');
  }

async addFirstProductToCart(): Promise<string> {
  await this.page.goto('/');

  const firstHeading = this.page.getByRole('heading', { level: 5 }).first();
  await firstHeading.waitFor({ state: 'visible', timeout: 10000 });

  const rawName = await firstHeading.textContent();
  const productName = rawName ? rawName.trim() : 'Unknown Product';

  await firstHeading.click();
  await this.page.waitForLoadState('networkidle', { timeout: 10000 });

 
  let addButton = this.page.getByRole('button', { name: /Add to cart/i }).first();
  if (await addButton.count() === 0) {
    
    addButton = this.page.locator('[data-test="add-to-cart"], #btn-add-to-cart').first();
  }

  await expect(addButton).toBeVisible({ timeout: 15000 });
  await addButton.click();

  
  const alert = this.page.getByRole('alert');
  await expect(alert).toBeVisible({ timeout: 10000 });

  return productName;
}

  // ---------------- SEARCH & SORT ----------------
  async search(text: string) {
    await this.searchInput.fill(text);
    await this.searchInput.press("Enter");
    await this.page.waitForLoadState("networkidle");
  }

  async sortAZ() {
    await this.sortSelect.selectOption({ value: "name,asc" });
    await this.page.waitForTimeout(1000); 
  }

  async sortPriceHighToLow() {
    await this.sortSelect.selectOption({ value: "price,desc" });
    await this.page.waitForTimeout(1000);
  }

  // ---------------- FILTERS ----------------
  async filterByCategory(categoryName: string) {
    const checkbox = this.page.locator(`label:has-text("${categoryName}") input[type="checkbox"]`);
    await checkbox.check();
    await this.page.waitForTimeout(1000); 
  }

  async filterByBrand(brandName: string) {
    const checkbox = this.page.locator(`label:has-text("${brandName}") input[type="checkbox"]`);
    await checkbox.check();
    await this.page.waitForTimeout(1000);
  }

  async filterByPriceRangeSteps(minSteps: number, maxSteps: number) {
    await expect(this.priceSliders).toHaveCount(2);

    const minSlider = this.priceSliders.nth(0);
    const maxSlider = this.priceSliders.nth(1);

    await minSlider.focus();
    for (let i = 0; i < minSteps; i++) await this.page.keyboard.press("ArrowRight");

    await maxSlider.focus();
    for (let i = 0; i < maxSteps; i++) await this.page.keyboard.press("ArrowLeft");

    await this.page.waitForTimeout(500);
  }

  async filterByMediumPriceRange() {
    await this.filterByPriceRangeSteps(15, 15);
  }

  async filterByNarrowPriceRange() {
    await this.filterByPriceRangeSteps(30, 30);
  }

  // ---------------- ASSERTIONS ----------------
  async assertHasResults() {
    await expect(this.productCards.first()).toBeVisible({ timeout: 10000 });
  }

  async assertPricesWithinRange(min: number, max: number) {
    const prices = await this.productPrices.allTextContents();
    for (const priceText of prices) {
      const price = Number(priceText.replace("$", "").trim());
      expect(price).toBeGreaterThanOrEqual(min);
      expect(price).toBeLessThanOrEqual(max);
    }
  }

  // ---------------- SORT RESTORE ----------------
  async restoreSort() {
    await this.page.evaluate(() => {
      const sort = localStorage.getItem("sort");
      const select = document.querySelector("select") as HTMLSelectElement;
      if (!select) return;

      if (sort === "az") {
        select.value = "name,asc";
        select.dispatchEvent(new Event("change", { bubbles: true }));
      }
      if (sort === "price-desc") {
        select.value = "price,desc";
        select.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });

    await this.page.waitForTimeout(1000); 
  }

  // ---------------- UTILITIES ----------------
  async clearFilters() {
    await this.page.reload();
    await this.page.waitForLoadState("networkidle");
  }
}

