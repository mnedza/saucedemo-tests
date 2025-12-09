import { Page, Locator } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly userNameInput: Locator;
    readonly passInput: Locator;
    readonly loginButton: Locator;
    readonly expectedError: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userNameInput = page.locator('#user-name');
        this.passInput = page.locator('#password');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.expectedError = page.locator('[data-test="error"]');
    }

    async goto() {
        await this.page.goto("/")
    }

    async login(username: string, password: string) {
        await this.userNameInput.fill(username);
        await this.passInput.fill(password);
        await this.loginButton.click();
    }

    async getExpectedError() {
        return await this.expectedError.textContent();
    }

}