class OrderConfirmationPage{

    constructor(page){
        this.page = page
        this.orderConfirmHeader = page.locator('td h1')
        this.OrderNumberField = page.locator('td.em-spacer-1 label.ng-star-inserted')
        this.OrderHistoryPageLink = page.locator("label[routerlink='/dashboard/myorders']")
    }

    async orderConfirmationPageHeader(){
        return await this.orderConfirmHeader.textContent()
    }

    async getOrderNumber(){
        return  ((await this.OrderNumberField.textContent()).split(" "))[2]
    }

    async clickOnOrderHistoryPage(){
        await this.OrderHistoryPageLink.click()
        await this.page.waitForLoadState('domcontentloaded')
    }
}

module.exports={OrderConfirmationPage}