import { test, expect } from "@playwright/test";
import { InventoryPage } from "../../pages/InventoryPage";
import { CartPage } from "../../pages/CartPage";

test("User can add first product to cart and see it correctly", async ({
  page,
}) => {
  const inventoryPage = new InventoryPage(page);
  await page.goto("/inventory.html");
  await expect(page).toHaveURL(/.*inventory\.html/);
  await expect(inventoryPage.itemsList).toBeVisible();

  const cartPage = new CartPage(page);
  const firstItem = inventoryPage.item.nth(0);

  const firstInventoryItemName = await inventoryPage
    .getItemName(firstItem)
    .innerText();

  const addButton = inventoryPage.getItemButton(firstItem);

  await test.step("'Add to Cart' changes text to 'Remove', CartBadge appears and shows 1", async () => {
    await addButton.click();
    const removeButton = inventoryPage.getIRemovetemButton(firstItem);
    await expect(removeButton).toBeVisible();
    const shoppingCartBadge = await inventoryPage.shoopingCartBadge.innerText();
    expect(shoppingCartBadge).toEqual("1");
  });

  await inventoryPage.gotoCart();
  await expect(cartPage.cartList).toBeVisible();

  const firstCartItemName = cartPage.getItemName(cartPage.cartItem.first());

  await expect(firstCartItemName).toHaveText(firstInventoryItemName!);
});

test("User can add all items to cart and see them correctly", async ({
  page,
}) => {});
