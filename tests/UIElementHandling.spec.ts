import {test,expect, Page} from "@playwright/test";

test('CheckBox and Select', async({page})=>{

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await page.locator('select.form-control').selectOption('consult')

    expect(await page.locator('select.form-control').inputValue()).toEqual('consult')

    await page.locator('span.radiotextsty').nth(1).click()

    await page.locator('button#okayBtn').click()
    await expect( page.locator('span.radiotextsty').nth(1)).toBeChecked()

    await page.locator('input#terms').click()
    await expect(page.locator('input#terms')).toBeChecked()
    await page.locator('input#terms').uncheck()
    expect(await page.locator('input#terms').isChecked()).toBeFalsy()

    await expect(page.locator("a[href*='documents-request']")).toHaveAttribute('class','blinkingText')

})

test('Window Handling', async ({browser})=>{

    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    const newPageLink=page.locator("a[href*='document']")
    const [newPage]= await Promise.all([

        // There are three page of promises pending, rejected & fulfilled
        // Before Clicking on the new page link the playwrite needs to wait for the 
        // new Page creation link 
            context.waitForEvent('page'),
            newPageLink.click()
        ])

    const text:any = await newPage.locator('p.red').textContent();
    console.log(text)

    const domain = ((text.split('@'))[1].split(' '))[0];
    console.log(domain)
    await page.locator('input#username').fill(domain)

    //inputValue to use when the element is not in the dom like we type something in the text boxS
    expect(await page.locator('input#username').inputValue()).toBe('rahulshettyacademy.com');

})