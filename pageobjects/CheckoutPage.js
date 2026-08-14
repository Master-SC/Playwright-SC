class CheckoutPage {

    constructor(page) {
        this.page = page;
        this.paymentTitle = page.locator('div.payment div.payment__title')
        this.monthSelection = page.locator("(//div[@class='field small'])[1]/select[1]")
        this.yearSelection = page.locator("(//div[@class='field small'])[1]/select[2]")
        this.cvvField = page.locator("(//div[@class='field small'])[2]/input")
        this.nameOnCard = page.locator("(//div[@class='field'])[2]/input")
        this.couponField = page.locator('input[name=coupon]');
        this.applyCouponBtn = page.locator('button.mt-1');
        this.couponSuccessMsg = page.locator('p.mt-1');
        this.shippingEmailfield = page.locator('div.mt-5 label');
        this.countryInputField = page.locator('div.form-group input');
        this.countryDropDownList = page.locator('span.ng-star-inserted');
        this.placeOrderBtn = page.locator('div.actions a');

    }

    async getPaymentSectionTitle() {
        return await this.paymentTitle.nth(0).textContent();
    }

    async selectCardMonth(month) {
        if (Number.parseInt(month) > 12 || Number.parseInt(month) < 0) return "Error Input"
        if (typeof month !== "string") String.toString(month)
        await this.monthSelection.selectOption(month)
    }

    async selectCardYear(year) {
        if (Number.parseInt(year) > 31 || Number.parseInt(year) < 0) return "Error Input"
        if (typeof month !== "string") year.toString()
        await this.yearSelection.selectOption(year)
    }

    async cvvNumberFill(cvv) {
        await this.cvvField.fill(cvv)
    }

    async customerNameFill(fullname) {
        await this.nameOnCard.fill(fullname)
    }

    async applyCounponCode(coupon) {
        await this.couponField.fill(coupon)
        await this.applyCouponBtn.click()
        await this.page.waitForLoadState('domcontentloaded')
    }

    async couponApplySuccessMsg() {
        return await this.couponSuccessMsg.textContent()
    }

    async getShipperEmail() {
        return await this.shippingEmailfield.textContent()
    }

    async selectCountryFromDropDown(country) {
        await this.countryInputField.pressSequentially(country, { delay: 100 })
        await this.countryDropDownList.click()
    }

    async clickOnPlaceOrderButton() {
        await this.placeOrderBtn.click()
        await this.page.waitForLoadState('domcontentloaded')
    }

}

module.exports = { CheckoutPage }