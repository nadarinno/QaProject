import { test } from '@playwright/test';
import { ProductsPage } from "../../pages/ProductsPage";
import { CartPage } from '../../pages/CartPage';

test.describe('Add To Cart Feature', () => {

  test.beforeEach(async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
  });

  test('User can add product to cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.addFirstProductToCart();
    await cartPage.goto();
    await cartPage.assertHasItems();
  });

});
