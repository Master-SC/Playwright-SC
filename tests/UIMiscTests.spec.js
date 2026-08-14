const{test,expect} = require('@playwright/test')

test('Test Misc Functions', async({page})=>{

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await expect(page.locator('input#displayed-text')).toBeVisible()
    await page.locator('input#hide-textbox').click()
    await expect(page.locator('input#displayed-text')).toBeHidden()

    //JS Alert 

    page.on('dialog',dialog=> {
        console.log('msg :: '+dialog.message());
        dialog.dismiss();
    })
    await page.locator('#confirmbtn').click()

    //Hover 
    await page.locator('button#mousehover').hover();

    //swith to frame
    const framesPage = page.frameLocator('#courses-iframe');
    //Click only on  visible element
    await framesPage.locator("li a[href='lifetime-access']:visible").click()

    const text = await framesPage.locator(".text h2").textContent()
    console.log((text.split(' '))[1])







})