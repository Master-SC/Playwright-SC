
import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import dataset from '../../test-data/TestDataSet1.json';



Given('User can Login to E-Commerce Application using email {string} & password {string}', { timeout: 300000 }, async function (userName, password) {
    // Write code here that turns the phrase above into concrete actions

    this.loginPage = this.poManager.getLoginPage();
    this.productListingPage = this.poManager.getProductListingPage();

    this.loginPage.gotoUrl(dataset.url);
    await expect(this.page).toHaveTitle(dataset.loginPageTitle)
    this.loginPage.customerValidLogin(userName, password)
    
});

When('User adds and {string} to the cart', async function (item) {
    // Write code here that turns the phrase above into concrete 
    expect(await this.productListingPage.getPageTitle()).toBe(dataset.listingPageTitle)
    this.productListingPage.selectProduct(item);
    this.productListingPage.clickCartButton();


});

Then('{string} is diplayed on the cart page', async function (item) {
    // Write code here that turns the phrase above into concrete actions
    const cartPage = this.poManager.getCartPage();
    expect(await cartPage.getCartPageTitle()).toBe(dataset.cartPageTitle)
    expect(await cartPage.cartProductName(item)).toBeTruthy()
    await cartPage.checkoutBtnClick()
});

When('User enter the valid shipping and payment details and place the Order', { timeout: 500000 }, async function () {
    // Write code here that turns the phrase above into concrete actions
    const checkoutPage = this.poManager.getCheckoutPage()
    this.orderConfirmationPage = this.poManager.getOrderConfirmationPage()
    expect(await checkoutPage.getPaymentSectionTitle()).toBe(dataset.paymentSectionTitle)
    await checkoutPage.selectCardMonth(dataset.pamentCardMonth)
    await checkoutPage.selectCardYear(dataset.paymentCardYear)
    await checkoutPage.cvvNumberFill(dataset.paymentCvv)
    await checkoutPage.customerNameFill(dataset.paymentcardName)
    await checkoutPage.applyCounponCode(dataset.couponCode)
    expect(await checkoutPage.couponApplySuccessMsg()).toBe(dataset.counponAppliedSuccessMsg)
    expect(await checkoutPage.getShipperEmail()).toBe(dataset.userEmail)
    await checkoutPage.selectCountryFromDropDown(dataset.shippingCountry)
    await checkoutPage.clickOnPlaceOrderButton()
    expect(await this.orderConfirmationPage.orderConfirmationPageHeader()).toBe(dataset.successfulOrderMessage)
    this.orderNumber = await this.orderConfirmationPage.getOrderNumber()
});

Then('Verify the order in Order history page', async function () {
    // Write code here that turns the phrase above into concrete actions


    const orderHistoryPage = this.poManager.getOrderHistoryPage()
    this.orderConfirmationPage.clickOnOrderHistoryPage()


    expect(await orderHistoryPage.getOrderHistoryPageTitle()).toBe(dataset.orderHistoryPageTItle)
    expect(await orderHistoryPage.findOrderNumber(this.orderNumber)).toBeTruthy()
});

Then('Verify the login is Successfull.',{timeout:50000}, async function () {
    expect(await this.productListingPage.getPageTitle()).toBe(dataset.listingPageTitle)
});

Then('Verify Error Message is displayed',{timeout:500000}, async function () {
    expect(await this.loginPage.loginPageError()).toBe(dataset.loginPageErrorMsg);
});