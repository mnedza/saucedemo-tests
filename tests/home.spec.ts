import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test("Check first item details", async ({ page }) => {
  const homePage = new HomePage(page);
  await test.step("Go to items list view - inventory page", async () => {
    await page.goto("/inventory.html");
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  await test.step("image is visible - list view", async () => {});

  await test.step("image is correct - list view", async () => {});

  await test.step("Item name is correct - list view", async () => {});

  await test.step("Item description is correct - list view", async () => {});

  await test.step("Item price is correct - list view", async () => {});

  await test.step("Item button 'add to cart' is visible - list view", async () => {});

  await test.step("Go to item details", async () => {});

  await test.step("image is visible - item details view", async () => {});

  await test.step("image is correct - item details view", async () => {});

  await test.step("Item name is correct - item details view", async () => {});

  await test.step("Item description is correct - item details view", async () => {});

  await test.step("Item price is correct - item details view", async () => {});

  await test.step("Item button 'add to cart' is visible - item details view", async () => {});
});

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
