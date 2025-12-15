import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test("Check first item details", async ({ page }) => {});
test("Check every item details", async ({ page }) => {});
test("Check last item details", async ({ page }) => {});

test("logout from the app", async ({ page }) => {
  const homePage = new HomePage(page);
  await test.step("Go to main page", async () => {
    await page.goto("/inventory.html");
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  await test.step("Logout from the app", async () => {
    await homePage.logout();
    await expect(page).toHaveURL("/");
  });
});
