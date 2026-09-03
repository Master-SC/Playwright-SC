import { Page,Locator } from "@playwright/test";

export class CheckoutPage {
    page:Page;
    paymentTitle:Locator;
    monthSelection:Locator;
    yearSelection:Locator;
    cvvField:Locator;
    nameOnCard:Locator;
    couponField:Locator;
    applyCouponBtn:Locator;
    couponSuccessMsg:Locator;
    shippingEmailfield:Locator;
    countryInputField:Locator;
    countryDropDownList:Locator;
    placeOrderBtn:Locator;


    constructor(page:Page) {
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

    async getPaymentSectionTitle():Promise<string> {
        return (await this.paymentTitle.nth(0).textContent()) ?? "";
    }

    async selectCardMonth(month:string):Promise<void> {

        const monthNum:number = Number.parseInt(month,10)
        if(monthNum>12 || monthNum<1 || Number.isNaN(monthNum)) {
            throw new Error(`Invalid month input :'${month}' should be between 1 & 12`)
        } 

        const formattedMonth:string = monthNum<10 ? `0${monthNum}` : `${monthNum}`
        await this.monthSelection.selectOption(formattedMonth)
    }

    async selectCardYear(year:string):Promise<void> {

        const yearNum = Number.parseInt(year,10)
        if(yearNum>31 || yearNum<26 || Number.isNaN(yearNum)){
            throw new Error(`Invalid year input:'${year}' should be between 26 and 31`)
        }
        const formattedYear:string = `${yearNum}`
        await this.yearSelection.selectOption(formattedYear)
    }

    async cvvNumberFill(cvv:string):Promise<void> {
        await this.cvvField.fill(cvv)
    }

    async customerNameFill(fullname:string):Promise<void> {
        await this.nameOnCard.fill(fullname)
    }

    async applyCounponCode(coupon:string):Promise<void> {
        await this.couponField.fill(coupon)
        await this.applyCouponBtn.click()
        await this.page.waitForLoadState('domcontentloaded')
    }

    async couponApplySuccessMsg():Promise<string | null> {
        return await this.couponSuccessMsg.textContent()
    }

    async getShipperEmail():Promise<string | null> {
        return await this.shippingEmailfield.textContent()
    }

    async selectCountryFromDropDown(country:string):Promise<void> {
        await this.countryInputField.pressSequentially(country, { delay: 100 })
        await this.countryDropDownList.click()
    }

    async clickOnPlaceOrderButton():Promise<void> {
        await this.placeOrderBtn.click()
        await this.page.waitForLoadState('domcontentloaded')
    }

}