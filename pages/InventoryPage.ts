import { Page, Locator, expect } from "@playwright/test";
import { InventoryItem } from "../types/InventoryItem";

export class InventoryPage {
  readonly page: Page;
  readonly burgerButton: Locator;
  readonly menuWrapper: Locator;
  readonly logoutSidebar: Locator;
  readonly itemsList: Locator;
  readonly item: Locator;
  readonly itemDetailsButton: Locator;
  readonly backToProductsItem: Locator;
  readonly inventoryContainer: Locator;
  readonly selectSortOption: Locator;
  readonly shoopingCartLink: Locator;
  readonly shoopingCartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.burgerButton = page.locator("#react-burger-menu-btn");
    this.menuWrapper = page.locator(".bm-menu-wrap");
    this.logoutSidebar = page.locator('[data-test="logout-sidebar-link"]');
    this.itemsList = page.locator('[data-test="inventory-list"]');
    this.item = page.locator('[data-test="inventory-item"]');
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    this.itemDetailsButton = page.locator('[data-test="add-to-cart"]');
    this.backToProductsItem = page.locator('[data-test="back-to-products"]');
    this.selectSortOption = page.locator(
      '[data-test="product-sort-container"]'
    );

    // cart icon
    this.shoopingCartLink = page.locator('[data-test="shopping-cart-link"]');
    this.shoopingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  getItemImg(item: Locator) {
    return item.locator("img");
  }

  getItemName(item: Locator) {
    return item.locator('[data-test="inventory-item-name"]');
  }

  getItemDesc(item: Locator) {
    return item.locator('[data-test="inventory-item-desc"]');
  }

  getItemPrice(item: Locator) {
    return item.locator('[data-test="inventory-item-price"]');
  }

  getItemButton(item: Locator) {
    return item.locator("button", { hasText: "Add to cart" });
  }

  getIRemovetemButton(item: Locator) {
    return item.locator("button", { hasText: "Remove" });
  }

  getItemInventory(item: Locator) {
    return item.locator('[data-test="inventory-item"]');
  }

  async open() {
    await this.page.goto("/inventory.html");
    await expect(this.itemsList).toBeVisible();
  }

  async logout() {
    await this.burgerButton.click();
    await this.logoutSidebar.click();
  }

  async goToCart() {
    await this.shoopingCartLink.click();
  }

  async readActualItems(itemsCount: number): Promise<InventoryItem[]> {
    let items: InventoryItem[] = [];

    for (let i = 0; i < itemsCount; i++) {
      let item = this.item.nth(i);
      const itemName = await this.getItemName(item).textContent();
      if (itemName === null) {
        throw new Error("Item name is null");
      }

      let itemPrice = Number(
        (await this.getItemPrice(item).textContent())!.replace("$", "")
      );
      items.push({ itemName, itemPrice });
    }

    return items;
  }

  async expectItemInListIsCorrect(item: Locator) {
    await expect(item).toBeVisible();
    await expect(this.getItemImg(item)).toBeVisible();
    await expect(this.getItemName(item)).toBeVisible();
    await expect(this.getItemName(item)).not.toHaveText("");
    await expect(this.getItemDesc(item)).toBeVisible();
    await expect(this.getItemDesc(item)).not.toHaveText("");
    await expect(this.getItemPrice(item)).toBeVisible();
    await expect(this.getItemPrice(item)).not.toHaveText("");
    await expect(this.getItemButton(item)).toBeVisible();
    await expect(this.getItemButton(item)).toHaveText("Add to cart");
  }

  async addFirstItemToCart(): Promise<string> {
    const firstItem = this.item.first();
    const itemName = await this.getItemName(firstItem).innerText();

    await this.getItemButton(firstItem).click();
    await expect(this.getIRemovetemButton(firstItem)).toBeVisible();

    return itemName;
  }

  async addAllItemsToCart(): Promise<number> {
    const itemsCount = await this.item.count();

    for (let i = 0; i < itemsCount; i++) {
      const item = this.item.nth(i);
      await this.getItemButton(item).click();
      await expect(this.getIRemovetemButton(item)).toBeVisible();
    }

    return itemsCount;
  }

  async expectCartBadgeCount(expected: number) {
    if (expected === 0) {
      await expect(this.shoopingCartBadge).toHaveCount(0);
    } else {
      await expect(this.shoopingCartBadge).toHaveText(String(expected));
    }
  }
}
