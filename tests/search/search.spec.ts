
import { test, expect } from "@playwright/test";
import { ProductsPage } from "../../pages/ProductsPage";
import * as dotenv from "dotenv";

dotenv.config();

const searchText = process.env.SEARCH_TEXT;
if (!searchText) throw new Error("SEARCH_TEXT not defined in .env");

test.describe("Search Feature – All Cases", () => {
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    await productsPage.goto();
  });

  test("Search by valid keyword", async () => {
    await productsPage.search(searchText);
    await productsPage.assertHasResults(); 
  });

  test("Search is case-insensitive", async () => {
    await productsPage.search(searchText.toLowerCase());
    await productsPage.assertHasResults();
  });

  test("Search with no results", async ({ page }) => {
    await productsPage.search("zzzzzzzz");
    await expect(page.locator("text=No products found")).toBeVisible({ timeout: 10000 });
  });
});
