import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

// test("logout", async ({ page }) => {
//     const homePage = new HomePage(page);

//     await homePage.logout();
//     await expect(page).toHaveURL("/");
// })

test("check if item is added to cart", async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.burgerButton.click();
    await homePage.shoppingCartLink.click();
    await homePage.checkOut.click();
    await homePage.firstName.click();
    await homePage.firstName.fill('1');
    await homePage.lastName.click();
    await homePage.lastName.fill('2');
    await homePage.postaLCode.click();
    await homePage.postaLCode.fill('3');
    await homePage.continueButton.click();
    await homePage.item4Link.click();
    await homePage.inventoryItem.click();

    await expect(homePage.inventoryItem).toContainText("Sauce Labs Backpack");
});