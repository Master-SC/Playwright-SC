import { Page,Locator } from "@playwright/test"

export class OrderHistoryPage{
    page:Page;
    orderHistoryPageHeader:Locator;
    orderNumberList:Locator;

    constructor(page:Page){
        this.page=page
        this.orderHistoryPageHeader = page.locator('div.py-5 h1')
        this.orderNumberList = page.locator('tr.ng-star-inserted th')
    }

    async getOrderHistoryPageTitle():Promise<string>{
        await this.page.waitForLoadState('networkidle');
        return (await this.orderHistoryPageHeader.textContent()) ?? "";
    }

    async findOrderNumber(orderNumber:any):Promise<boolean>{
        return await this.orderNumberList.filter({hasText:orderNumber})
                                    .isVisible();
    }
}