import { Page, Locator, expect } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;

  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly dob: Locator;
  readonly street: Locator;
  readonly postalCode: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly country: Locator;
  readonly phone: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly registerBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstName = page.getByPlaceholder('First name');
    this.lastName = page.getByPlaceholder('Your last name');
    this.dob = page.getByPlaceholder('YYYY-MM-DD');
    this.street = page.getByPlaceholder('Your Street');
    this.postalCode = page.getByPlaceholder('Your Postcode');
    this.city = page.getByPlaceholder('Your City');
    this.state = page.getByPlaceholder('Your State');
    this.country = page.locator('select');
    this.phone = page.getByPlaceholder('Your phone');
    this.email = page.getByPlaceholder('Your email');
    this.password = page.getByPlaceholder('Your password');
    this.registerBtn = page.getByRole('button', { name: 'Register' });
  }

  async goto() {
    await this.page.goto('/auth/register');
  }

  async register(user: any) {
    await this.goto();

    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.dob.fill(user.dob);
    await this.street.fill(user.street);
    await this.postalCode.fill(user.postcode);
    await this.city.fill(user.city);
    await this.state.fill(user.state);
    await this.country.selectOption({ label: user.country });
    await this.phone.fill(user.phone);
    await this.email.fill(user.email);
    await this.password.fill(user.password);

    await this.registerBtn.click();
  }

  async assertRegistered() {
    await expect(this.page).toHaveURL(/login|account/);
  }
}
