import { test } from "@playwright/test";
import { ProductsPage } from "../../pages/ProductsPage";

test.describe("Filter by Brand", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  // ✅ Existing test
  test("User can filter products by brand", async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.filterByBrand("ForgeFlex Tools");
    await productsPage.assertHasResults();
  });

  // 🟡 BONUS: Brand ثاني
  test("User can filter by another brand", async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.filterByBrand("MightyCraft Hardware");
    await productsPage.assertHasResults();
  });

  // 🟡 BONUS: أكثر من Brand
  test("User can filter by multiple brands", async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.filterByBrand("ForgeFlex Tools");
    await productsPage.filterByBrand("MightyCraft Hardware");
    await productsPage.assertHasResults();
  });

  // 🟡 BONUS: إزالة الفلتر
  test("User can remove brand filter", async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.filterByBrand("ForgeFlex Tools");
    await productsPage.assertHasResults();

    await productsPage.clearFilters();
    await productsPage.assertHasResults();
  });
});
