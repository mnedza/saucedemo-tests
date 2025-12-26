import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";

test.describe("Standard user", () => {
  test("User can log in with valid credentials", async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login("standard_user", "secret_sauce");
    await expect(page).toHaveURL(/inventory.html/);
  });
});

test.describe("Invalid credentials", () => {
  test("User cannot log in and sees error message", async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login("incorrect_credentials", "incorrect_credentials");

    await expect(page).not.toHaveURL(/inventory.html/);
    await expect(login.expectedError).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });
});
