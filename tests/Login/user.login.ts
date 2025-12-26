import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { attemptLogin } from "../../utils/login";

test("User can log in with valid credentials", async ({ page }) => {
  await attemptLogin(page, "standard_user", "secret_sauce");
  await expect(page).toHaveURL(/inventory.html/);
});

test("User cannot log in with invalid credentials and sees error message", async ({
  page,
}) => {
  const login = new LoginPage(page);
  attemptLogin(page, "incorrect_credentials", "incorrect_credentials");
  await expect(page).not.toHaveURL(/inventory.html/);
  await expect(login.expectedError).toHaveText(
    "Epic sadface: Username and password do not match any user in this service"
  );
});

test("User cannot log in with empty username and sees error message", async ({
  page,
}) => {
  const login = new LoginPage(page);
  attemptLogin(page, "", "incorrect_credentials");
  await expect(page).not.toHaveURL(/inventory.html/);
  await expect(login.expectedError).toHaveText(
    "Epic sadface: Username is required"
  );
});

test("User cannot log in with empty password and sees error message", async ({
  page,
}) => {
  const login = new LoginPage(page);
  attemptLogin(page, "incorrect_credentials", "");
  await expect(page).not.toHaveURL(/inventory.html/);
  await expect(login.expectedError).toHaveText(
    "Epic sadface: Password is required"
  );
});

test("Locked out user cannot log in and sees error message", async ({
  page,
}) => {
  const login = new LoginPage(page);
  attemptLogin(page, "locked_out_user", "secret_sauce");
  await expect(page).not.toHaveURL(/inventory.html/);
  await expect(login.expectedError).toHaveText(
    "Epic sadface: Sorry, this user has been locked out."
  );
});
