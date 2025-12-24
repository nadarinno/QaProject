import { test } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';

test.describe('Remove From Cart Feature', () => {

  test('User can remove product from cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    await productsPage.gotoHome();

    await productsPage.addFirstProductToCart();
    await cartPage.goto();

    await cartPage.assertHasItems();

    await cartPage.removeFirstItem();

    await cartPage.assertEmpty();
  });

});
