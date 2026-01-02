import { test, expect } from "@playwright/test";
import { InventoryPage } from "../../pages/InventoryPage";
import { InventoryDetailsPage } from "../../pages/InventoryDetailsPage";
import { sortingCases } from "../../utils/sortingProducts";

test("User can view first product and its details and go back to inventory page", async ({
  page,
}) => {
  const inventoryPage = new InventoryPage(page);
  const detailsPage = new InventoryDetailsPage(page);

  await page.goto("/inventory.html");
  await expect(inventoryPage.itemsList).toBeVisible();

  await test.step("First item list view is correct", async () => {
    const item = inventoryPage.item.first();
    await inventoryPage.expectItemInListIsCorrect(item);
    await inventoryPage.getItemName(item).click();
  });

  await test.step("First item details view is correct", async () => {
    await detailsPage.expectDetailsAreCorrect();
    await detailsPage.detailsBackToProductsButton.click();
    await expect(page).toHaveURL(/.*inventory\.html/);
  });
});

test("User can view all products and their details and go back to inventory page", async ({
  page,
}) => {
  const inventoryPage = new InventoryPage(page);
  const detailsPage = new InventoryDetailsPage(page);

  await page.goto("/inventory.html");
  await expect(inventoryPage.itemsList).toBeVisible();

  const itemsCount = await inventoryPage.item.count();

  for (let i = 0; i < itemsCount; i++) {
    await test.step(`Item ${i + 1} list view is correct`, async () => {
      const item = inventoryPage.item.nth(i);
      await inventoryPage.expectItemInListIsCorrect(item);
      await inventoryPage.getItemName(item).click();
    });

    await test.step(`Item ${i + 1} details view is correct`, async () => {
      await detailsPage.expectDetailsAreCorrect();
      await detailsPage.detailsBackToProductsButton.click();
      await expect(page).toHaveURL(/.*inventory\.html/);
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
