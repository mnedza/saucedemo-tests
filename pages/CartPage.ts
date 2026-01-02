import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartList: Locator;
  readonly cartItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartList = page.locator(".cart_list");
    this.cartItem = page.locator('[data-test="inventory-item"]');
  }
  getItemName(item: Locator): Locator {
    return item.locator(".inventory_item_name");
  }

  async removeFirstItem() {
    await expect(this.cartItem.first()).toBeVisible();

    const removeButton = this.cartItem
      .first()
      .locator("button:has-text('Remove')");

    await expect(removeButton).toBeVisible();
    await removeButton.click();
  }

  async expectItemWithNameIsVisible(itemName: string) {
    const itemNameLocator = this.cartItem.locator(
      '[data-test="inventory-item-name"]',
      { hasText: itemName }
    );

    await expect(itemNameLocator).toBeVisible();
  }

  async expectItemsCount(expected: number) {
    await expect(this.cartItem).toHaveCount(expected);
  }
}
