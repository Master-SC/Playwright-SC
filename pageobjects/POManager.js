const { LoginPage } = require('../pageobjects/LoginPage')
const { CartPage } = require('../pageobjects/CartPage')
const { CheckoutPage } = require('../pageobjects/CheckoutPage')
const { OrderConfirmationPage } = require('../pageobjects/OrderConfirmationPage')
const { OrderHistoryPage } = require('../pageobjects/OrderHistoryPage')
const { ProductListingPage } = require('../pageobjects/ProductListingPage')


class POManager {

    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page)
        this.cartPage = new CartPage(this.page)
        this.checkoutPage = new CheckoutPage(this.page)
        this.orderConfirmationPage = new OrderConfirmationPage(this.page)
        this.orderHistoryPage = new OrderHistoryPage(this.page)
        this.productListingPage = new ProductListingPage(this.page)
    }

    getLoginPage() {
        return this.loginPage;
    }
    getCartPage() {
        return this.cartPage;
    }
    getCheckoutPage() {
        return this.checkoutPage;
    }
    getOrderConfirmationPage() {
        return this.orderConfirmationPage;
    }
    getOrderHistoryPage() {
        return this.orderHistoryPage;
    }
    getProductListingPage() {
        return this.productListingPage
    }
}

module.exports = { POManager }