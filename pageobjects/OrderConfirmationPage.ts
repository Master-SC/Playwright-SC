import { Page, Locator } from "@playwright/test"

export class OrderConfirmationPage {
    page: Page;
    orderConfirmHeader: Locator;
    OrderNumberField: Locator;
    OrderHistoryPageLink: Locator;

    constructor(page: Page) {
        this.page = page
        this.orderConfirmHeader = page.locator('td h1')
        this.OrderNumberField = page.locator('td.em-spacer-1 label.ng-star-inserted')
        this.OrderHistoryPageLink = page.locator("label[routerlink='/dashboard/myorders']")
    }

    async orderConfirmationPageHeader(): Promise<string> {
        await this.orderConfirmHeader.waitFor({ state: 'visible' });
        return (await this.orderConfirmHeader.textContent()) ?? "";
    }

    async getOrderNumber(): Promise<string> {
        const rawOrderNumberText: string | null = await this.OrderNumberField.textContent();
        if (!rawOrderNumberText) {
            throw new Error('Failed to extract text from OrderNumberField. The element might be empty or missing.')
        }

        const textParts: string[] = rawOrderNumberText.split(" ");

        if (textParts.length < 3) {
            throw new Error(`Unexpected order text format: "${rawOrderNumberText}". Expected at least 3 words.`)
        }

        return textParts[2]
    }

    async clickOnOrderHistoryPage():Promise<void> {
        await this.OrderHistoryPageLink.click()
        await this.page.waitForLoadState('domcontentloaded')
    }
}
