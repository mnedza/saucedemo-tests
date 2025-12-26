import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";

test("Setup auth - standard user", async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login("standard_user", "secret_sauce");
  await expect(page).toHaveURL(/inventory.html/);
  await page.context().storageState({ path: "./storageState.json" });
});
