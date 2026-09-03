import { Page,Locator } from "@playwright/test";

export class CartPage{
    page:Page;
    cartPageTitle:Locator;
    itemList:Locator;
    checkoutBtn:Locator;

    constructor(page:Page){
        this.page=page;
        this.cartPageTitle=page.locator("div.heading h1");
        this.itemList = page.locator('ul.cartWrap');
        this.checkoutBtn = page.locator('li.totalRow button.btn-primary')
    }

    async getCartPageTitle():Promise<string>{
        await this.page.waitForLoadState('networkidle')
        return (await this.cartPageTitle.textContent()) ?? "";
    }

    async cartProductName(productName:string):Promise<Locator>{

        return this.itemList.filter({ hasText: productName })

    }

    async checkoutBtnClick():Promise<void>{
        await this.checkoutBtn.click()
        await this.page.waitForLoadState('networkidle')
    }


}
