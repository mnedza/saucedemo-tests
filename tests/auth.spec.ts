import { test, expect } from "@playwright/test";
import { InventoryPage } from "../pages/InventoryPage";

test("User can logout from the app", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await page.goto("/inventory.html");
  await expect(page).toHaveURL(/.*inventory\.html/);
  await inventoryPage.logout();
  await expect(page).toHaveURL("/");
});
