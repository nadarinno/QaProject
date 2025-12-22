import { test, expect } from "@playwright/test";
import { ProductsPage } from "../../pages/ProductsPage";
import * as dotenv from "dotenv";

dotenv.config();

test.describe("Search Feature – All Cases", () => {
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    await productsPage.goto();
  });

  test("Search by valid keyword", async () => {
    await productsPage.search(process.env.SEARCH_TEXT!);
    await productsPage.assertHasResults();
  });

  test("Search is case-insensitive", async () => {
    await productsPage.search(process.env.SEARCH_TEXT!.toLowerCase());
    await productsPage.assertHasResults();
  });

  test("Search with no results", async ({ page }) => {
    await productsPage.search("zzzzzzzz");
    await expect(page.locator("text=No products found")).toBeVisible();
  });
});
