class OrderHistoryPage{
    constructor(page){
        this.page=page
        this.orderHistoryPageHeader = page.locator('div.py-5 h1')
        this.orderNumberList = page.locator('tr.ng-star-inserted th')
    }

    async getOrderHistoryPageTitle(){
        await this.page.waitForLoadState('networkidle')
        return await this.orderHistoryPageHeader.textContent()   
    }

    async findOrderNumber(orderNumber){
        return await this.orderNumberList.filter({hasText:orderNumber})
                                    .isVisible();
    }
}

module.exports={OrderHistoryPage}