import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly email: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly togglePasswordButton: Locator;
  readonly forgotPasswordLink: Locator;

  constructor(page: Page) {
    this.page = page;

    // Login form fields
    this.email = page.locator("#email");
    this.password = page.locator("#password");
    this.loginButton = page.getByRole("button", { name: "Login" });

    // Error message
    this.errorMessage = page.locator(".alert-danger");

    // 👁️ Toggle password visibility (محدد بدقة داخل الفورم)
    this.togglePasswordButton = page
      .locator('[data-test="login-form"]')
      .locator('button.btn-outline-secondary');

    // 🔑 Forgot Password link
    this.forgotPasswordLink = page.getByRole("link", {
      name: /Forgot your Password/i,
    });
  }

  // Navigate to login page
  async goto() {
    await this.page.goto("/auth/login");
  }

  // Perform login
  async login(email: string, password: string) {
    await this.goto();
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  // Assertions
  async assertLoggedIn() {
    await expect(this.page).toHaveURL(/account/);
  }

  async assertLoginFailed() {
    await expect(this.errorMessage).toBeVisible();
  }

  async assertValidationErrors() {
    await expect(this.page.locator("text=Email is required")).toBeVisible();
    await expect(this.page.locator("text=Password is required")).toBeVisible();
  }

  // 👁️ Toggle password visibility
  async togglePasswordVisibility() {
    await this.togglePasswordButton.click();
  }

  async assertPasswordVisible() {
    await expect(this.password).toHaveAttribute("type", "text");
  }

  async assertPasswordHidden() {
    await expect(this.password).toHaveAttribute("type", "password");
  }

  // 🔑 Forgot Password
  async clickForgotPassword() {
    await this.forgotPasswordLink.click();
  }

  async assertForgotPasswordPage() {
    await expect(this.page).toHaveURL(/forgot-password/);
  }
}
