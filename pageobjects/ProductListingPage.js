class ProductListingPage {
    constructor(page) {
        this.page = page
        this.pageTitle = page.locator('div.mt-1 p');
        this.productCard = page.locator("div.card-body");
        this.cartButton = page.locator("button[routerlink='/dashboard/cart']")
        this.toastMessage = page.locator("#toast-container")
    }

    async getPageTitle() {
        const titleText = await this.pageTitle.textContent();
        await this.page.waitForLoadState('networkidle')
        return titleText;
    }

    async selectProduct(productName) {

        await await this.page.locator("div.card-body")
              .filter({ hasText: productName })
              .getByRole('button', { name: ' Add To Cart' })
              .click();
    }

    async clickCartButton() {
        await this.cartButton.scrollIntoViewIfNeeded()
        await this.cartButton.click()
        await this.page.waitForLoadState('domcontentloaded');
    }

     async getProductAddedMsg(){
        return await this.toastMessage
    }

}

module.exports = {ProductListingPage}