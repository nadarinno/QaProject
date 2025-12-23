
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

    await productsPage.productCards.first().waitFor({ state: "visible", timeout: 10000 });

    const pricesText = await page.locator(".card .price").allTextContents();
    const prices = pricesText.map(p =>
      Number(p.replace(/[^0-9.]/g, "").trim())
    );

    if (prices.some(isNaN)) throw new Error(`Failed to parse prices: ${pricesText}`);

    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });
});
