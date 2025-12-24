import { test } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';

test.describe('Cart Feature', () => {

  test('User can add product to cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // 👇 هاي الثلاثة لازم يكونوا داخل test
    await productsPage.goto();
    await productsPage.openFirstProduct();
    await productsPage.addToCartFromProductDetails();
    await productsPage.openCart();
  });

});
