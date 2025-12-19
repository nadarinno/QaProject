import { Page, Locator, expect } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly dob: Locator;
  readonly address: Locator;
  readonly postcode: Locator;
  readonly city: Locator;
  readonly state: Locator;
  readonly country: Locator;
  readonly phone: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly registerBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstName = page.locator('#first_name');
    this.lastName = page.locator('#last_name');
    this.dob = page.locator('#dob');
    this.address = page.locator('#address');
    this.postcode = page.locator('#postcode');
    this.city = page.locator('#city');
    this.state = page.locator('#state');
    this.country = page.locator('#country');
    this.phone = page.locator('#phone');
    this.email = page.locator('#email');
    this.password = page.locator('#password');

    this.registerBtn = page.locator('button[type="submit"]');
  }

  async goto() {
    await this.page.goto('/auth/register');
  }

  async register(data: {
    firstName: string;
    lastName: string;
    dob: string; 
    address: string;
    postcode: string;
    city: string;
    state: string;
    country: string;
    phone: string;
    email: string;
    password: string;
  }) {
    await this.goto();

    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.dob.fill(data.dob);
    await this.address.fill(data.address);
    await this.postcode.fill(data.postcode);
    await this.city.fill(data.city);
    await this.state.fill(data.state);
    await this.country.fill(data.country);
    await this.phone.fill(data.phone);
    await this.email.fill(data.email);
    await this.password.fill(data.password);

    await this.registerBtn.click();
  }

  async assertRegisterSuccess() {
    await expect(this.page).toHaveURL(/auth\/login|\/$/);
  }
}
