import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test("Check first item details", async ({ page }) => {});
test("Check last item details", async ({ page }) => {});

test("Check all items - list and details", async ({ page }) => {
  const homePage = new HomePage(page);
  await test.step("Go to items list view - inventory page", async () => {
    await page.goto("/inventory.html");
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  await test.step("Items list is visible", async () => {
    expect(homePage.itemsList).toBeVisible();
  });

  await test.step("Every item is visible - list view check", async () => {
    const itemsCount = await homePage.item.count();
    for (let i = 0; i < itemsCount; i++) {
      const item = homePage.item.nth(i);
      const itemImg = homePage.getItemImg(item);
      const itemName = homePage.getItemName(item);
      const itemDesc = homePage.getItemDesc(item);
      const itemPrice = homePage.getItemPrice(item);
      const itemButton = homePage.getItemButton(item);
      await expect(homePage.item.nth(i)).toBeVisible();

      await test.step(`Item ${i} img is visible & correct`, async () => {
        await expect(itemImg).toBeVisible();
      });

      await test.step(`Item ${i} name: ${itemName} is visible & correct`, async () => {
        await expect(itemName).toBeVisible();
        await expect(itemName).not.toHaveText("");
      });

      await test.step(`Item ${i} description: ${itemDesc} is visible & correct`, async () => {
        await expect(itemDesc).toBeVisible();
        await expect(itemDesc).not.toHaveText("");
      });

      await test.step(`Item ${i} price: ${itemDesc} is visible & correct`, async () => {
        await expect(itemPrice).toBeVisible();
        await expect(itemPrice).not.toHaveText("");
      });

      await test.step(`Item ${i} button 'add to cart' is visible`, async () => {
        await expect(itemButton).toBeVisible();
        await expect(itemButton).toHaveText("Add to cart");
      });
    }
  });

  await test.step(`Every item is visible - details item page view`, async () => {
    await test.step("Go to item details", async () => {});
  });

  await test.step("image is visible - item details view", async () => {});

  await test.step("image is correct - item details view", async () => {});

  await test.step("Item name is correct - item details view", async () => {});

  await test.step("Item description is correct - item details view", async () => {});

  await test.step("Item price is correct - item details view", async () => {});

  await test.step("Item button 'add to cart' is visible - item details view", async () => {});
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
