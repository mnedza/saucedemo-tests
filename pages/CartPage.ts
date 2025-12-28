import { Page, Locator } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartList: Locator;
  readonly cartItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartList = page.locator(".cart_list");
    this.cartItem = page.locator(".cart_item");
  }
  getItemName(item: Locator): Locator {
    return item.locator(".inventory_item_name");
  }
}