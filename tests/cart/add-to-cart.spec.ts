import { test, expect } from "@playwright/test";
import { ProductsPage } from "../../pages/ProductsPage";
import { CartPage } from "../../pages/CartPage";

test.describe("Add to Cart – All Cases", () => {
  let productsPage: ProductsPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    await productsPage.goto();
  });

  test("Add single product to cart", async () => {
    await productsPage.openFirstProduct();
    await productsPage.addToCartFromProductDetails();

    await cartPage.goto();
    await expect(cartPage.removeButtons.first()).toBeVisible();
  });

  test("Cart persists after page refresh", async () => {
    await productsPage.openFirstProduct();
    await productsPage.addToCartFromProductDetails();

    await cartPage.goto();
    await cartPage.page.reload();

    await expect(cartPage.removeButtons.first()).toBeVisible();
  });

  test("Cart persists after navigation", async () => {
    await productsPage.openFirstProduct();
    await productsPage.addToCartFromProductDetails();

    await productsPage.goto();
    await cartPage.goto();

    await expect(cartPage.removeButtons.first()).toBeVisible();
  });
});


