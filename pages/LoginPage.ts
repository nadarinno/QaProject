import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly email: Locator;
  readonly password: Locator;
  readonly submit: Locator;

  constructor(page: Page) {
    this.page = page;
    this.email = page.locator('#email');
    this.password = page.locator('#password');
    this.submit = page.locator('button[type="submit"]');
  }

  async goto() {
    await this.page.goto('/auth/login');
  }

  async login(email: string, password: string) {
    await this.goto();
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submit.click();
  }

  async assertLoggedIn() {
    await expect(this.page).toHaveURL(/\/$/);
  }
}
