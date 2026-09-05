import { AfterStep, Before, Status, AfterAll } from "@cucumber/cucumber";
import playwright from 'playwright';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { POManager } from "../../pageobjects/POManager";


declare global {
  var browser: Browser;
  var context: BrowserContext;
  var page: Page;
}

Before(async function(){
    const browser = await playwright.chromium.launch();
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page)
})

// Before({tags:'@Sanity'},async function(){
//     const browser = await playwright.chromium.launch();
//     const context = await browser.newContext();
//     this.page = await context.newPage();
//     this.poManager = new POManager(this.page)
// })

AfterStep(async function({result}){
    if(result.status===Status.FAILED)
        await this.page.screenshot({path:"screenshots/cucumber_screenshot1.png"})
})

AfterAll(async function () {
  if (globalThis.browser) {
    await globalThis.browser.close();
  }
});

// npx cucumber-js --tags '@parameter' --exit
// npx cucumber-js features/EcommerceLoginValidation.feature --parallel 2  --exit
//npx cucumber-js features/EcommerceLoginValidation.feature --parallel 2  --exit --format html:cucumber-report.html

//npx cucumber-js features/EcommerceLoginValidation.feature --parallel 2 --retry 2  --exit --format html:cucumber-report.html