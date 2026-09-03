import { LoginPage } from "./LoginPage"
import { CartPage } from "./CartPage"
import { CheckoutPage } from "./CheckoutPage"
import { OrderConfirmationPage } from "./OrderConfirmationPage"
import { OrderHistoryPage } from "./OrderHistoryPage"
import { ProductListingPage } from "./ProductListingPage"
import { Page } from "@playwright/test"

export class POManager {

    page:Page;
    loginPage:LoginPage;
    cartPage:CartPage;
    checkoutPage:CheckoutPage;
    orderConfirmationPage:OrderConfirmationPage;
    orderHistoryPage:OrderHistoryPage;
    productListingPage:ProductListingPage;

    constructor(page:Page) {
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
