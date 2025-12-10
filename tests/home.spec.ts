import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";


test("check if item is added to cart", async ({page}) => {
    const homePage = new HomePage(page);

    await test.step("Go to main page", async () => {
        await page.goto('/inventory.html');
        await expect(page).toHaveURL(/.*inventory\.html/);
    });
    
    await test.step("Press Sauce Labs Backpack add to cart button", async () => {
        await homePage.backPackItem.click();
    });

    await test.step("Press shoppingCartLink button", async () => {
        await homePage.shoppingCartLink.click();
    });

    await test.step("Press checkOut button", async () => {
        await homePage.checkOut.click();
    });

    await test.step("Fill your checkout information and press continue button", async () => {
        await homePage.firstName.fill('1');
        await homePage.lastName.fill('2');
        await homePage.postaLCode.fill('3');
        await homePage.continueButton.click();
    });

    await test.step("Go to the item details and check its name", async () => {
        await homePage.item4Link.click();
        await homePage.inventoryItem.click();
        await expect(homePage.inventoryItem).toContainText("Sauce Labs Backpack");
    });

});