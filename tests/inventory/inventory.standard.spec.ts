import { test, expect } from "@playwright/test";
import { InventoryPage } from "../../pages/InventoryPage";
import { InventoryDetailsPage } from "../../pages/InventoryDetailsPage";
import { sortingCases } from "../../utils/sortingProducts";

test("User can view first product and its details and go back to inventory page", async ({
  page,
}) => {
  const inventoryPage = new InventoryPage(page);

  await page.goto("/inventory.html");
  await expect(page).toHaveURL(/.*inventory\.html/);
  await expect(inventoryPage.itemsList).toBeVisible();

  const firstItem = inventoryPage.item.first();
  const firstItemName = inventoryPage.getItemName(firstItem);

  await expect(firstItem).toBeVisible();
  await expect(firstItemName).toBeVisible();
  await firstItemName.click();

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
  await expect(page).toHaveURL(/.*inventory\.html/);
});

test("User can view all products and their details and go back to inventory page", async ({
  page,
}) => {
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

test("User can sort products and see correctly sorted list", async ({
  page,
}) => {
  const invPage = new InventoryPage(page);
  await page.goto("/inventory.html");
  await expect(page).toHaveURL(/.*inventory\.html/);
  await expect(invPage.itemsList).toBeVisible();

  const itemsCount = await invPage.item.count();
  const baseItems = await invPage.readActualItems(itemsCount);

  for (const { name, option, sortFn } of sortingCases) {
    await test.step(`User can sort items: ${name}`, async () => {
      const expected = sortFn(baseItems);
      await invPage.selectSortOption.selectOption(option);
      const uiSortedItems = await invPage.readActualItems(itemsCount);
      expect(uiSortedItems).toEqual(expected);
    });
  }
});
