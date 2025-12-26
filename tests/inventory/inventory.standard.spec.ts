import { test, expect } from "@playwright/test";
import { InventoryPage } from "../../pages/InventoryPage";
import { InventoryDetailsPage } from "../../pages/InventoryDetailsPage";

test("User can view all products and their details", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  let itemsCount = 0;
  await page.goto("/inventory.html");
  await expect(page).toHaveURL(/.*inventory\.html/);
  itemsCount = await inventoryPage.item.count();
  await expect(inventoryPage.itemsList).toBeVisible();

  for (let i = 0; i < itemsCount; i++) {
    await test.step(`Item ${i + 1} list view is correct`, async () => {
      const item = inventoryPage.item.nth(i);
      const itemImg = inventoryPage.getItemImg(item);
      const itemName = inventoryPage.getItemName(item);
      const itemDesc = inventoryPage.getItemDesc(item);
      const itemPrice = inventoryPage.getItemPrice(item);
      const itemButton = inventoryPage.getItemButton(item);

      await expect(inventoryPage.item.nth(i)).toBeVisible();
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

