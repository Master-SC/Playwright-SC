const { test,expect } = require("@playwright/test");

test('Order Place Flow', async({page})=>{

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')

    await expect(page).toHaveTitle("Let's Shop")

    await page.getByPlaceholder('email@example.com').fill("sunboy1778527479445@hotmail.com")
    await page.getByPlaceholder('enter your passsword').fill("Aftf12#32")
    await page.getByRole('button',{name:'Login'}).click()

    await page.waitForLoadState('domcontentloaded');

    await page.locator('.card-body b').first().waitFor()

    await selectProduct(page,"ZARA COAT 3")
    await selectProduct(page,"ADIDAS ORIGINAL")


    await page.waitForLoadState('domcontentloaded');

    await page.getByRole('listitem').getByRole('button',{name:'Cart'}).click()


    await page.waitForLoadState('domcontentloaded');


    await expect(page.locator('div.heading h1')).toHaveText('My Cart')

    await page.locator('.cartSection h3').first().waitFor()


    await verifyBasket(page,"ZARA COAT 3");
    await verifyBasket(page,"ADIDAS ORIGINAL");

    await page.getByRole('button',{name:'Checkout'}).click()
    // await page.locator('li.totalRow button.btn-primary').click()

    expect(await page.locator('div.payment div.payment__title').nth(0).textContent()).toBe(' Payment Method ')


    const monthSelect = page.locator("(//div[@class='field small'])[1]/select[1]")
    await monthSelect.selectOption('05')

    const yearSelect = page.locator("(//div[@class='field small'])[1]/select[2]")
    await yearSelect.selectOption('29')

    await page.locator("(//div[@class='field small'])[2]/input").fill("000")
    await page.locator("(//div[@class='field'])[2]/input").fill('John Begood')

    await page.locator('input[name=coupon]').fill('rahulshettyacademy')
    await page.locator('button.mt-1').click()

    await page.waitForLoadState('domcontentloaded')

    await expect(page.locator('p.mt-1')).toHaveText('* Coupon Applied')

    await expect(page.locator('div.mt-5 label')).toHaveText('sunboy1778527479445@hotmail.com')

    await page.locator('div.form-group input').pressSequentially('united Kingdom',{delay:100})

    await page.locator('span.ng-star-inserted').click()
    await page.getByText('PLACE ORDER').click()

    await page.waitForLoadState('domcontentloaded')

    await expect(page.locator('td h1')).toHaveText(' Thankyou for the order. ')

    const order1= ((await page.locator('td.em-spacer-1 label.ng-star-inserted').nth(0).textContent()).split(' '))[2]
    const order2= ((await page.locator('td.em-spacer-1 label.ng-star-inserted').nth(1).textContent()).split(' '))[2]

   console.log('Order1 is # '+order1+'Order2 is #'+order2 )

   await page.locator("label[routerlink='/dashboard/myorders']").click()

   await page.waitForLoadState('domcontentloaded')

   await expect(page.locator('div.py-5 h1')).toHaveText('Your Orders')


   await searchOrderNumber(page,order1)
   await searchOrderNumber(page,order2)

    // const basketProductCount = await page.locator("button[routerlink='/dashboard/cart'] label").textContent()
    // await expect(basketProductCount).toBe('1')
})

 async function selectProduct(page,productName){

    await page.locator('div.card-body').filter({hasText:productName}).getByRole('button',{name:' Add To Cart'}).click()

}

async function verifyBasket(page,productName){
    expect(await page.locator('div.infoWrap').filter({hasText:productName}).isVisible()).toBeTruthy()
}

async function searchOrderNumber(page,orderId) {

    expect(page.locator('tr.ng-star-inserted th').filter({hasText:orderId}).isVisible()).toBeTruthy( )

}
