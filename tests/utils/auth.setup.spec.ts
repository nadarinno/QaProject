
import { test as setup } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

setup('login once and seed state', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // 1️⃣ Login (cookies)
  await loginPage.login(
    process.env.EMAIL!,
    process.env.PASSWORD!
  );

  // 2️⃣ Go to products page (important!)
  await page.goto('https://practicesoftwaretesting.com/');
  await page.waitForLoadState('networkidle');

  // 3️⃣ Seed localStorage (cart + sort)
  await page.evaluate(() => {
    localStorage.setItem(
      'cart',
      JSON.stringify([{ id: 1, name: 'Seed Product' }])
    );
    localStorage.setItem('sort', 'az');
  });

  // 4️⃣ Save storage state (cookies + localStorage)
  await page.context().storageState({ path: 'auth.json' });
});
