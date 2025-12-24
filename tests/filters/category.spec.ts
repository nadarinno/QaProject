import { test } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';

test.use({ storageState: 'auth.json' });

test.describe('Filter by Category', () => {
  test('User can filter products by category', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.goto();
    await productsPage.filterByCategory('Hammer');
    await productsPage.assertHasResults();
  });
});
