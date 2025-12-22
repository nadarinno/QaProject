import { test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";

test.describe("Login Feature", () => {

  // ✅ 1. Successful login
  test("User can login with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
      process.env.EMAIL!,
      process.env.PASSWORD!
    );

    await loginPage.assertLoggedIn();
  });

  // ❌ 2. Invalid password
  test("User cannot login with invalid password", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
      process.env.EMAIL!,
      "wrongPassword123"
    );

    await loginPage.assertLoginFailed();
  });

  // ❌ 3. Unregistered email
  test("User cannot login with unregistered email", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(
      "notregistered@email.com",
      "randomPassword"
    );

    await loginPage.assertLoginFailed();
  });

  // ❌ 4. Empty fields validation
  test("User cannot login with empty fields", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.loginButton.click();

    await loginPage.assertValidationErrors();
  });

  // 👁️ Toggle password visibility
  test("User can show and hide password", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.password.fill("password123");

    await loginPage.togglePasswordVisibility();
    await loginPage.assertPasswordVisible();

    await loginPage.togglePasswordVisibility();
    await loginPage.assertPasswordHidden();
  });

  // 🔑 Forgot Password
  test("User can navigate to Forgot Password page", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.clickForgotPassword();

    await loginPage.assertForgotPasswordPage();
  });
});
