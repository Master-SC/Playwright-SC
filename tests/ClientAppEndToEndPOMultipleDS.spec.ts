import {expect, test} from '@playwright/test'
import {POManager} from '../pageobjects/POManager'
const datasets = JSON.parse(JSON.stringify(require('../test-data/MultipleTestDataSet.json')))


for (const dataset of datasets) {
    test(`Order Place Flow with Product ${dataset.product2}`, async ({ page }) => {

        const poManager = new POManager(page)
        const loginPage = poManager.getLoginPage();
        const productListingPage = poManager.getProductListingPage();
        const cartPage = poManager.getCartPage();
        const checkoutPage = poManager.getCheckoutPage()
        const orderConfirmationPage = poManager.getOrderConfirmationPage()
        const orderHistoryPage = poManager.getOrderHistoryPage()



        await loginPage.gotoUrl(dataset.url);
        await expect(page).toHaveTitle(dataset.loginPageTitle)
        await loginPage.customerValidLogin(dataset.userEmail, dataset.userPwd)
        expect(await productListingPage.getPageTitle()).toBe(dataset.listingPageTitle)


        await productListingPage.selectProduct(dataset.product2);
        await productListingPage.clickCartButton();

        expect(await cartPage.getCartPageTitle()).toBe(dataset.cartPageTitle)
        expect(await cartPage.cartProductName(dataset.product2)).toBeVisible()
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
        const orderNumber = await orderConfirmationPage.getOrderNumber()
        await orderConfirmationPage.clickOnOrderHistoryPage()

        expect(await orderHistoryPage.getOrderHistoryPageTitle()).toBe(dataset.orderHistoryPageTItle)
        expect(await orderHistoryPage.findOrderNumber(orderNumber)).toBeTruthy()


    })
}


//Tests in a Sigle js/ts File will will run sequencially 
// Different Tests file in a Folder will run Parralel By default 5 parrael works will run i.e 5 files in a folder
// we can set the worker in config file as well 