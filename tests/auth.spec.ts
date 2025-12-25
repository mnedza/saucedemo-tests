import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test("User can logout from the app", async ({ page }) => {
  const homePage = new HomePage(page);
  await test.step("User go the to main page", async () => {
    await page.goto("/inventory.html");
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  await test.step("User logout from the app", async () => {
    await homePage.logout();
    await expect(page).toHaveURL("/");
  });
});
