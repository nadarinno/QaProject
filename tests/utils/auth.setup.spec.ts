import { test as setup } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

setup('login once', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.login(
    process.env.EMAIL!,
    process.env.PASSWORD!
  );

  await page.context().storageState({ path: 'auth.json' });
});
