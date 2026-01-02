import { Page, Locator, expect } from "@playwright/test";

export class InventoryDetailsPage {
  readonly page: Page;
  readonly inventoryItem: Locator;
  readonly inventoryImg: Locator;
  readonly inventoryName: Locator;
  readonly inventoryDesc: Locator;
  readonly inventoryPrice: Locator;
  readonly inventoryAddToCartButton: Locator;
  readonly detailsBackToProductsButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItem = page.locator('[data-test="inventory-item"]');
    this.inventoryImg = page.locator(".inventory_details_img");
    this.inventoryName = page.locator('[data-test="inventory-item-name"]');
    this.inventoryDesc = page.locator('[data-test="inventory-item-desc"]');
    this.inventoryPrice = page.locator('[data-test="inventory-item-price"]');
    this.inventoryAddToCartButton = page.locator('[data-test="add-to-cart"]');
    this.detailsBackToProductsButton = page.locator(
      '[data-test="back-to-products"]'
    );
  }

  async goto(itemName: Locator) {
    await itemName.click();
  }

  async expectDetailsAreCorrect() {
    await expect(this.inventoryItem).toBeVisible();
    await expect(this.inventoryImg).toBeVisible();
    await expect(this.inventoryName).toBeVisible();
    await expect(this.inventoryName).not.toHaveText("");
    await expect(this.inventoryDesc).toBeVisible();
    await expect(this.inventoryDesc).not.toHaveText("");
    await expect(this.inventoryPrice).toBeVisible();
    await expect(this.inventoryPrice).not.toHaveText("");
    await expect(this.inventoryAddToCartButton).toBeVisible();
    await expect(this.inventoryAddToCartButton).toHaveText("Add to cart");
  }
}
