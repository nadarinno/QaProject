import { test, expect } from "@playwright/test";
import { ProductsPage } from "../../pages/ProductsPage";

test.describe("Sort Products A–Z", () => {
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    await productsPage.goto();
  });

  test("Sort products alphabetically A–Z", async ({ page }) => {
    await productsPage.sortAZ();

    const names = await page.locator(".card-title").allTextContents();

     // 🔥 FIX: trim + lowercase
    const normalized = names.map(n => n.trim().toLowerCase());
    const sorted = [...normalized].sort();

   expect(normalized).toEqual(sorted);

  });

  test("Sort persists after refresh", async ({ page }) => {
    await productsPage.sortAZ();
    await page.reload();

    const names = await page.locator(".card-title").allTextContents();
    const sorted = [...names].sort();

    expect(names).toEqual(sorted);
  });

  test("Sort works with category filter", async ({ page }) => {
    await productsPage.filterByCategory("Hand Tools");
    await productsPage.sortAZ();

    const names = await page.locator(".card-title").allTextContents();
    const sorted = [...names].sort();

    expect(names).toEqual(sorted);
  });


});
