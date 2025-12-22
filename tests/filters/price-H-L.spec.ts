import { test, expect } from "@playwright/test";
import { ProductsPage } from "../../pages/ProductsPage";

test.describe("Sort by Price High → Low", () => {
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    await productsPage.goto();
  });

  test("Products sorted by price descending", async ({ page }) => {
    await productsPage.sortPriceHighToLow();

    const pricesText = await page.locator(".card .price").allTextContents();
    const prices = pricesText.map(p => Number(p.replace("$", "")));

    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });
});
