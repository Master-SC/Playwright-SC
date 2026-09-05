import { test, expect } from "@playwright/test";
import { POManager } from "../pageobjects/POManager";
import dataset from '../test-data/TestDataSet1.json';


test('Order Place Flow', async ({ page }) => {

    const poManager:POManager = new POManager(page)
    const loginPage = poManager.getLoginPage();
    const productListingPage = poManager.getProductListingPage();
    const cartPage = poManager.getCartPage();
    const checkoutPage = poManager.getCheckoutPage()
    const orderConfirmationPage = poManager.getOrderConfirmationPage()
    const orderHistoryPage = poManager.getOrderHistoryPage()



    loginPage.gotoUrl(dataset.url);
    await expect(page).toHaveTitle(dataset.loginPageTitle)
    loginPage.customerValidLogin(dataset.userEmail, dataset.userPwd)
    expect(await productListingPage.getPageTitle()).toBe(dataset.listingPageTitle)


    productListingPage.selectProduct(dataset.product2);
    productListingPage.clickCartButton();

    expect(await cartPage.getCartPageTitle()).toBe(dataset.cartPageTitle)
    expect(await cartPage.cartProductName(dataset.product2)).toBeTruthy()
    await cartPage.checkoutBtnClick()

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

    expect(await orderConfirmationPage.orderConfirmationPageHeader()).toBe(dataset.successfulOrderMessage)
    const orderNumber:string = await orderConfirmationPage.getOrderNumber()

    await orderConfirmationPage.clickOnOrderHistoryPage()

    expect(await orderHistoryPage.getOrderHistoryPageTitle()).toBe(dataset.orderHistoryPageTItle)
    expect(await orderHistoryPage.findOrderNumber(orderNumber)).toBeTruthy()


})