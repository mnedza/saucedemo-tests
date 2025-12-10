import { Page, Locator } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly burgerButton: Locator;
    readonly menuWrapper: Locator;
    readonly logoutSidebar: Locator;

    readonly backPackItem: Locator;
    readonly shoppingCartLink: Locator;
    readonly checkOut: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postaLCode: Locator;
    readonly continueButton: Locator;
    readonly item4Link: Locator;
    readonly inventoryItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.burgerButton = page.locator("#react-burger-menu-btn");
        this.menuWrapper = page.locator(".bm-menu-wrap");
        this.logoutSidebar = page.locator('[data-test="logout-sidebar-link"]');
        this.backPackItem = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
        this.checkOut = page.locator('[data-test="checkout"]');
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postaLCode = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]')
        this.item4Link = page.locator('[data-test="item-4-title-link"]')
        this.inventoryItem = page.locator('[data-test="inventory-item-name"]')
    }

    async goto() {
        await this.page.goto("/");
    }

    async logout() {
        await this.burgerButton.click();
        await this.logoutSidebar.click();
    }
}