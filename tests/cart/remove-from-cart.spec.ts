import { test } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';

test('User can remove product from cart', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await productsPage.goto();
  await productsPage.openFirstProduct();
  await productsPage.addToCartFromProductDetails();

  await cartPage.goto();
  await cartPage.removeFirstItem();
  await cartPage.assertEmpty();
});
