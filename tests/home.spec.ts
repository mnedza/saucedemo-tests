import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { InventoryDetailsPage } from "../pages/InventoryDetailsPage";

test("User can view all products and their details", async ({ page }) => {
  const homePage = new HomePage(page);

  let itemsCount = 0;
  await page.goto("/inventory.html");
  await expect(page).toHaveURL(/.*inventory\.html/);
  itemsCount = await homePage.item.count();
  await expect(homePage.itemsList).toBeVisible();

  for (let i = 0; i < itemsCount; i++) {
    await test.step(`Item ${i + 1} list view is correct`, async () => {
      const item = homePage.item.nth(i);
      const itemImg = homePage.getItemImg(item);
      const itemName = homePage.getItemName(item);
      const itemDesc = homePage.getItemDesc(item);
      const itemPrice = homePage.getItemPrice(item);
      const itemButton = homePage.getItemButton(item);

      await expect(homePage.item.nth(i)).toBeVisible();
      await expect(itemImg).toBeVisible();
      await expect(itemName).toBeVisible();
      await expect(itemName).not.toHaveText("");
      await expect(itemDesc).toBeVisible();
      await expect(itemDesc).not.toHaveText("");
      await expect(itemPrice).toBeVisible();
      await expect(itemPrice).not.toHaveText("");
      await expect(itemButton).toBeVisible();
      await expect(itemButton).toHaveText("Add to cart");
      await itemName.click();
    });

    await test.step(`Item ${i + 1} details view is correct`, async () => {
      const details = new InventoryDetailsPage(page);
      await expect(details.inventoryItem).toBeVisible();
      await expect(details.inventoryImg).toBeVisible();
      await expect(details.inventoryName).toBeVisible();
      await expect(details.inventoryName).not.toHaveText("");
      await expect(details.inventoryDesc).toBeVisible();
      await expect(details.inventoryDesc).not.toHaveText("");
      await expect(details.inventoryPrice).toBeVisible();
      await expect(details.inventoryPrice).not.toHaveText("");
      await expect(details.inventoryAddToCartButton).toBeVisible();
      await expect(details.inventoryAddToCartButton).toHaveText("Add to cart");
      await details.detailsBackToProductsButton.click();
    });
  }
});

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
