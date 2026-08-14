const { expect } = require("@playwright/test");
const {customtest} = require("../test-data/TestFixture.js");
const { POManager } = require('../pageobjects/POManager');

customtest('Order Place Flow with Fixture', async ({ page, testDataForOrder }) => {

    const poManager = new POManager(page)
    const loginPage = poManager.getLoginPage();
    const productListingPage = poManager.getProductListingPage();
    const cartPage = poManager.getCartPage();
    const checkoutPage = poManager.getCheckoutPage()
    const orderConfirmationPage = poManager.getOrderConfirmationPage()
    const orderHistoryPage = poManager.getOrderHistoryPage()



    await loginPage.gotoUrl(testDataForOrder.url);
    await expect(page).toHaveTitle(testDataForOrder.loginPageTitle)
    await loginPage.customerValidLogin(testDataForOrder.userEmail, testDataForOrder.userPwd)
    expect(await productListingPage.getPageTitle()).toBe(testDataForOrder.listingPageTitle)


    await productListingPage.selectProduct(testDataForOrder.product2);
    await productListingPage.clickCartButton();

    expect(await cartPage.getCartPageTitle()).toBe(testDataForOrder.cartPageTitle)
    expect(await cartPage.cartProductName(testDataForOrder.product2)).toBeTruthy()

})