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

test("User can sort products and see correctly sorted list", async ({
  page,
}) => {
  const sortOptions = [
    { label: "Name (A to Z)", value: "az" },
    { label: "Name (Z to A)", value: "za" },
    { label: "Price (low to high)", value: "lohi" },
    { label: "Price (high to low)", value: "hilo" },
  ];
  const inventoryPage = new InventoryPage(page);

  let sortedItemsAZ = [];
  let sortedItemsZA = [];
  let sortedItemsLOHI = [];
  let sortedItemsHILO = [];
  let itemsCount = 0;

  await page.goto("/inventory.html");
  await expect(page).toHaveURL(/.*inventory\.html/);
  itemsCount = await inventoryPage.item.count();
  await expect(inventoryPage.itemsList).toBeVisible();
  for (const option of sortOptions) {
    await test.step(`Sort by "${option.label}"`, async () => {
      await inventoryPage.selectSortOption.selectOption({
        value: option.value,
      });
      const selectedSortOption =
        await inventoryPage.selectSortOption.inputValue();

      let actualItems = [];

      for (let i = 0; i < itemsCount; i++) {
        let item = inventoryPage.item.nth(i);
        let itemNameValue = await inventoryPage.getItemName(item).textContent();
        let itemPriceValue = Number(
          (await inventoryPage.getItemPrice(item).textContent())!.replace(
            "$",
            ""
          )
        );
        actualItems.push({
          itemName: itemNameValue,
          itemPrice: itemPriceValue,
        });
      }
      sortedItemsAZ = actualItems
        .slice()
        .sort((a, b) => a.itemName!.localeCompare(b.itemName!));
      sortedItemsZA = actualItems
        .slice()
        .sort((a, b) => b.itemName!.localeCompare(a.itemName!));
      sortedItemsLOHI = actualItems
        .slice()
        .sort((a, b) => a.itemPrice - b.itemPrice);
      sortedItemsHILO = actualItems
        .slice()
        .sort((a, b) => b.itemPrice - a.itemPrice);

      switch (selectedSortOption) {
        case "az":
          expect(actualItems).toEqual(sortedItemsAZ);
          break;
        case "za":
          expect(actualItems).toEqual(sortedItemsZA);
          break;
        case "lohi":
          expect(actualItems).toEqual(sortedItemsLOHI);
          break;
        case "hilo":
          expect(actualItems).toEqual(sortedItemsHILO);
          break;
      }
    });
  }
});
