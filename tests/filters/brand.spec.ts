import { test } from "@playwright/test";
import { ProductsPage } from "../../pages/ProductsPage";

test.describe("Filter by Brand", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

 
  test("User can filter products by brand", async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.filterByBrand("ForgeFlex Tools");
    await productsPage.assertHasResults();
  });

 
  test("User can filter by another brand", async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.filterByBrand("MightyCraft Hardware");
    await productsPage.assertHasResults();
  });

  
  test("User can filter by multiple brands", async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.filterByBrand("ForgeFlex Tools");
    await productsPage.filterByBrand("MightyCraft Hardware");
    await productsPage.assertHasResults();
  });

  
  test("User can remove brand filter", async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.filterByBrand("ForgeFlex Tools");
    await productsPage.assertHasResults();

    await productsPage.clearFilters();
    await productsPage.assertHasResults();
  });
});
