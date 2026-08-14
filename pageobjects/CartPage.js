class CartPage{
    constructor(page){
        this.page=page;
        this.cartPageTitle=page.locator("div.heading h1");
        this.itemList = page.locator('ul.cartWrap');
        this.checkoutBtn = page.locator('li.totalRow button.btn-primary')
    }

    async getCartPageTitle(){
        await this.page.waitForLoadState('networkidle')
        return await this.cartPageTitle.textContent();
    }

    async cartProductName(productName){

        return await this.itemList.filter({ hasText: productName })

    }

    async checkoutBtnClick(){
        await this.checkoutBtn.click()
        await this.page.waitForLoadState('networkidle')
    }


}

module.exports={CartPage}