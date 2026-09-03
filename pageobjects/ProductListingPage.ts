import { Page,Locator } from "@playwright/test";
export class ProductListingPage {
    page:Page;
    pageTitle:Locator;
    productCard:Locator;
    cartButton:Locator;
    toastMessage:Locator;

    constructor(page:Page) {
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

    async selectProduct(productName:string):Promise<void> {

        await await this.page.locator("div.card-body")
              .filter({ hasText: productName })
              .getByRole('button', { name: ' Add To Cart' })
              .click();
    }

    async clickCartButton():Promise<void> {
        await this.cartButton.scrollIntoViewIfNeeded()
        await this.cartButton.click()
        await this.page.waitForLoadState('domcontentloaded');
    }

     async getProductAddedMsg():Promise<Locator>{
        return await this.toastMessage
    }

}

module.exports = {ProductListingPage}