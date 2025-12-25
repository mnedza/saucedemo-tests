import { test, expect } from "@playwright/test";
import { InventoryPage } from "../pages/InventoryPage";

test("User can logout from the app", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await test.step("User go the to main page", async () => {
    await page.goto("/inventory.html");
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  await test.step("User logout from the app", async () => {
    await inventoryPage.logout();
    await expect(page).toHaveURL("/");
  });
});
