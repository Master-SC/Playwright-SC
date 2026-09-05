import { AfterStep, Before, Status } from "@cucumber/cucumber";
import playwright from 'playwright'
import { POManager } from "../../pageobjects/POManager";

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

// npx cucumber-js --tags '@parameter' --exit
// npx cucumber-js features/EcommerceLoginValidation.feature --parallel 2  --exit
//npx cucumber-js features/EcommerceLoginValidation.feature --parallel 2  --exit --format html:cucumber-report.html

//npx cucumber-js features/EcommerceLoginValidation.feature --parallel 2 --retry 2  --exit --format html:cucumber-report.html