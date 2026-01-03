import { test, expect } from "@playwright/test";
import { InventoryPage } from "../../pages/InventoryPage";
import { CartPage } from "../../pages/CartPage";
import { CheckoutPage } from "../../pages/CheckoutPage";

test("User can add first product to cart and see it correctly", async ({
  page,
}) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await inventoryPage.open();
  const itemName = await inventoryPage.addFirstItemToCart();
  await inventoryPage.expectCartBadgeCount(1);

  await inventoryPage.goToCart();
  await cartPage.expectItemWithNameIsVisible(itemName);
});

//   page,
// }) => {
//   const inventoryPage = new InventoryPage(page);
//   await page.goto("/inventory.html");
//   await expect(page).toHaveURL(/.*inventory\.html/);

//   await expect(inventoryPage.itemsList).toBeVisible();
//   let itemsCount = 0;
//   let itemButtonCount = 0;
//   itemsCount = await inventoryPage.item.count();
//   expect(itemsCount > 0);

//   for (let i = 0; i < itemsCount; i++) {
//     await test.step(`User can press Item ${
//       i + 1
//     } 'add to cart' button in Inventory Page`, async () => {
//       itemButtonCount = itemButtonCount + 1;
//       let item = inventoryPage.item.nth(i);
//       let itemButton = inventoryPage.getItemButton(item);
//       await itemButton.click();
//     });
//   }

//   let shoppingCartBadge;
//   await test.step("User can see that items added to cart count is equal to cartBadge Number", async () => {
//     shoppingCartBadge = await inventoryPage.shoopingCartBadge.innerText();
//     expect(Number(shoppingCartBadge)).toEqual(itemButtonCount);
//   });

//   await inventoryPage.gotoCart();
//   const cartPage = new CartPage(page);
//   const itemsCountInCartPage = await cartPage.cartItem.count();
//   expect(itemsCountInCartPage).toBe(itemsCount);

//   for (let i = 0; i < itemsCountInCartPage; i++) {
//     await test.step(`User can see Item ${i + 1} in Cart Page`, async () => {
//       const cartItem = cartPage.cartItem.nth(i);
//       await expect(cartItem).toBeVisible();
//     });
//   }
// });

test("User can add all items to cart and see them correctly", async ({
  page,
}) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await inventoryPage.open();
  const itemsCount = await inventoryPage.addAllItemsToCart();
  await inventoryPage.expectCartBadgeCount(itemsCount);

  await inventoryPage.goToCart();
  await cartPage.expectItemsCount(itemsCount);
});

test("User can remove product from cart", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await inventoryPage.open();
  await inventoryPage.addFirstItemToCart();
  await inventoryPage.goToCart();

  await cartPage.removeFirstItem();
  await cartPage.expectItemsCount(0);
});

test("User can complete checkout flow with one product", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await inventoryPage.open();

  const itemName = await inventoryPage.addFirstItemToCart();
  await inventoryPage.expectCartBadgeCount(1);

  await inventoryPage.goToCart();
  await cartPage.expectItemWithNameIsVisible(itemName);

  await cartPage.goToCheckoutStepOne();

  await checkoutPage.fillUserDataAndContinue({
    firstName: "Marcel",
    lastName: "Nędza",
    postalCode: "44-444",
  });

  await checkoutPage.expectItemListVisible();
  await checkoutPage.expectItemWithName(itemName);

  const { itemTotal, tax, total } = await checkoutPage.readSummaryValues();

  expect(tax).toBeCloseTo(itemTotal * 0.08, 2);
  expect(total).toBeCloseTo(itemTotal + tax, 2);

  await checkoutPage.finishCheckout();
  await checkoutPage.expectCheckoutComplete();
});

test("User can complete checkout flow with all products", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await inventoryPage.open();

  const itemsCount = await inventoryPage.addAllItemsToCart();
  await inventoryPage.expectCartBadgeCount(itemsCount);

  await inventoryPage.goToCart();
  await cartPage.expectItemsCount(itemsCount);

  await cartPage.goToCheckoutStepOne();

  await checkoutPage.fillUserDataAndContinue({
    firstName: "Marcel",
    lastName: "Nędza",
    postalCode: "44-444",
  });

  await checkoutPage.expectItemListVisible();
  const { itemTotal, tax, total } = await checkoutPage.readSummaryValues();

  expect(itemTotal).toBeGreaterThan(0);
  expect(tax).toBeCloseTo(itemTotal * 0.08, 2);
  expect(total).toBeCloseTo(itemTotal + tax, 2);
  await checkoutPage.expectItemsCount(itemsCount);
  await checkoutPage.finishCheckout();
  await checkoutPage.expectCheckoutComplete();
});
