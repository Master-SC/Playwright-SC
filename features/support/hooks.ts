import {
  Before,
  BeforeAll,
  After,
  AfterStep,
  AfterAll,
  Status
} from "@cucumber/cucumber";
import { chromium, Browser, BrowserContext, Page } from "@playwright/test";
import { POManager } from "../../pageobjects/POManager";

declare global {
  var browser: Browser;
  var context: BrowserContext;
  var page: Page;
}

BeforeAll(async function () {
  globalThis.browser = await chromium.launch({
    headless: true
  });
});

Before(async function () {
  this.context = await globalThis.browser.newContext();
  this.page = await this.context.newPage();
  this.poManager = new POManager(this.page);
});

After(async function () {
  if (this.context) {
    await this.context.close();
  }
});

AfterStep(async function ({ result }) {
  if (result?.status === Status.FAILED && this.page) {
    const screenshotPath = `screenshots/${Date.now()}-failed-step.png`;
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
  }
});

AfterAll(async function () {
  if (globalThis.browser) {
    await globalThis.browser.close();
  }
});

// Before({tags:'@Sanity'},async function(){
//     const browser = await playwright.chromium.launch();
//     const context = await browser.newContext();
//     this.page = await context.newPage();
//     this.poManager = new POManager(this.page)
// })

// npx cucumber-js --tags '@parameter' --exit
// npx cucumber-js features/EcommerceLoginValidation.feature --parallel 2  --exit
//npx cucumber-js features/EcommerceLoginValidation.feature --parallel 2  --exit --format html:cucumber-report.html

//npx cucumber-js features/EcommerceLoginValidation.feature --parallel 2 --retry 2  --exit --format html:cucumber-report.html