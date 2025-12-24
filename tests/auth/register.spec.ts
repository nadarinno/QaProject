import { test } from '@playwright/test';
import { RegisterPage } from '../../pages/RegisterPage';

test.skip(({ browserName }) => browserName !== 'chromium');

test.describe('Register Feature', () => {
  test('User can register with valid data', async ({ page }) => {
    const registerPage = new RegisterPage(page);

  await registerPage.register({
  firstName: 'Test',
  lastName: 'User',
  dob: '1999-01-01',
  street: 'Main Street',
  postcode: '11118',
  city: 'Amman',
  state: 'Amman',
  country: 'Jordan',
  phone: '0799999999',
  email: `test${Date.now()}@email.com`,
  password: 'Password123!'
});


    await registerPage.assertRegistered();
  });
});
