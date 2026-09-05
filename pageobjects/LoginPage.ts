import { Page, Locator } from "@playwright/test";

export class LoginPage {

    page: Page;
    email: Locator;
    password: Locator;
    loginBtn: Locator;
    errorMsg:Locator;


    constructor(page: Page) {
        this.page = page;
        this.email = page.locator('input#userEmail');
        this.password = page.locator('input#userPassword');
        this.loginBtn = page.locator('input#login');
        this.errorMsg = page.locator('div#toast-container div div[role=alert]')

    }

    async gotoUrl(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async customerValidLogin(email: string, password: string): Promise<void> {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.loginBtn.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async loginPageError(): Promise<string>{
       return await this.errorMsg.innerText();
    }

}