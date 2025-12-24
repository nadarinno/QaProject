import { test } from "@playwright/test";
import { ProductsPage } from "../../pages/ProductsPage";

test.describe("Filter by Price Range", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  
  test("User can filter products by medium price range", async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.filterByMediumPriceRange();
    await productsPage.assertHasResults();
  });

  test("All products prices are within allowed price range", async ({
    page,
  }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.filterByMediumPriceRange();
    await productsPage.assertPricesWithinRange(1, 200);
  });

  test("User can filter products using narrow price range", async ({
    page,
  }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.filterByNarrowPriceRange();
    await productsPage.assertHasResults();
  });
});
