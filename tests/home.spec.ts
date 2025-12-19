import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test("Check first item details", async ({ page }) => {});
test("Check last item details", async ({ page }) => {});

test("Check all items details", async ({ page }) => {
  const homePage = new HomePage(page);

  await test.step("Items list is visible", async () => {
    await expect(homePage.itemsList).toBeVisible();
  });

  await test.step("Every item is visible - items list view & every item details", async () => {
    let itemsCount = 0;

    await test.step("Go to items list view", async () => {
      await page.goto("/inventory.html");
      await expect(page).toHaveURL(/.*inventory\.html/);
      itemsCount = await homePage.item.count();
    });

    await test.step("Check all items - visible and correct", async () => {});

    for (let i = 0; i < itemsCount; i++) {
      const item = homePage.item.nth(i);
      const itemImg = homePage.getItemImg(item);
      const itemName = homePage.getItemName(item);
      const itemDesc = homePage.getItemDesc(item);
      const itemPrice = homePage.getItemPrice(item);
      const itemButton = homePage.getItemButton(item);
      const itemInventory = homePage.getItemInventory(item);
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
      await expect(itemInventory).toBeVisible();
      await expect(itemImg).toBeVisible();
      await expect(itemName).toBeVisible();
      await expect(itemName).not.toHaveText("");
      await expect(itemDesc).toBeVisible();
      await expect(itemDesc).not.toHaveText("");
      await expect(itemPrice).toBeVisible();
      await expect(itemPrice).not.toHaveText("");
    }
  });
});

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
