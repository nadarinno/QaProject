
import { test, expect } from '@playwright/test';
import { ProductsPage } from "../../pages/ProductsPage";
import { CartPage } from '../../pages/CartPage';

test.describe('Add To Cart Feature', () => {

  test.beforeEach(async ({ page }) => {
    const productPage = new ProductsPage(page);
    await productPage.gotoHome();
  });

  test('Add product to cart and verify cart update', async ({ page }) => {
    const productPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productPage.gotoHome();
    const addedName = await productPage.addFirstProductToCart();

    await expect(page.getByRole('alert')).toContainText('Product added to shopping cart.');

  });

});

