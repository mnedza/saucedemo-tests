import { Page, Locator, expect } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly inventoryList: Locator;
  readonly inventoryItem: Locator;
  readonly inventoryItemName: Locator;
  readonly priceTotalSubLabel: Locator;
  readonly priceTotalTax: Locator;
  readonly priceTotalValue: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.inventoryList = page.locator('[data-test="cart-list"]');
    this.inventoryItem = page.locator('[data-test="inventory-item"]');
    this.inventoryItemName = page.locator('[data-test="inventory-item-name"]');
    this.priceTotalSubLabel = page.locator('[data-test="subtotal-label"]');
    this.priceTotalTax = page.locator('[data-test="tax-label"]');
    this.priceTotalValue = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
  }

  async fillUserDataAndContinue(data: {
    firstName: string;
    lastName: string;
    postalCode: string;
  }) {
    await expect(this.firstName).toBeVisible();

    await this.firstName.fill(data.firstName);
    await this.lastName.fill(data.lastName);
    await this.postalCode.fill(data.postalCode);
    await this.continueButton.click();
  }

  async expectItemListVisible() {
    await expect(this.inventoryList).toBeVisible();
  }

  async expectItemWithName(name: string) {
    await expect(this.inventoryItemName).toHaveText(name);
  }

  async readSummaryValues() {
    const itemTotal = Number(
      (await this.priceTotalSubLabel.innerText()).replace("Item total: $", "")
    );
    const tax = Number(
      (await this.priceTotalTax.innerText()).replace("Tax: $", "")
    );
    const total = Number(
      (await this.priceTotalValue.innerText()).replace("Total: $", "")
    );

    return { itemTotal, tax, total };
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async expectCheckoutComplete() {
    await expect(this.completeHeader).toHaveText("Thank you for your order!");
  }

  async expectItemsCount(count: number) {
    await expect(this.inventoryItem).toHaveCount(count);
  }
}
