import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly burgerButton: Locator;
  readonly menuWrapper: Locator;
  readonly logoutSidebar: Locator;
  readonly shoppingCartLink: Locator;

  readonly itemsList: Locator;
  readonly item: Locator;
  readonly itemImg: Locator;
  readonly itemName: Locator;
  readonly itemDesc: Locator;
  readonly itemPrice: Locator;
  readonly itemButton: Locator;
  readonly itemDetailsButton: Locator;
  readonly backToProductsItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.burgerButton = page.locator("#react-burger-menu-btn");
    this.menuWrapper = page.locator(".bm-menu-wrap");
    this.logoutSidebar = page.locator('[data-test="logout-sidebar-link"]');

    // items - home page
    this.itemsList = page.locator('[data-test="inventory-list"]');
    this.item = page.locator('[data-test="inventory-item"]');
    // this.itemImg = page.locator('inventory-item-img"]');
    this.itemName = page.locator('[data-test="inventory-item-name"]');
    this.itemDesc = page.locator('[data-test="inventory-item-desc"]');
    this.itemPrice = page.locator('[data-test="inventory-item-price"]');
    // this.itemButton = page.locator("");

    // item details
    this.itemDetailsButton = page.locator('[data-test="add-to-cart"]');
    this.backToProductsItem = page.locator('[data-test="back-to-products"]');
  }

  async goto() {
    await this.page.goto("/");
  }

  async logout() {
    await this.burgerButton.click();
    await this.logoutSidebar.click();
  }
}
