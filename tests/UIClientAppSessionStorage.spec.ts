

import {test,expect, Page} from "@playwright/test";

let webContext:any;


test.beforeEach(async ({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')

    await expect(page).toHaveTitle("Let's Shop")

    await page.locator('input#userEmail').fill("sunboy1778527479445@hotmail.com")
    await page.locator('input#userPassword').fill("Aftf12#32")
    await page.locator('input#login').click()
    await page.waitForLoadState('networkidle')
    webContext = await browser.newContext({storageState:'state.json'})




})

test('Order Place Flow', async()=>{

    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client/')

    await selectProduct(page,"ZARA COAT 3")
    await selectProduct(page,"ADIDAS ORIGINAL")
    // await page.locator('div.card-body button.w-10').nth(2).click()

    await page.waitForLoadState('domcontentloaded');

    await page.locator("button[routerlink='/dashboard/cart']").click()
    await page.waitForLoadState('domcontentloaded');


    await expect(page.locator('div.heading h1')).toHaveText('My Cart')
    await page.waitForTimeout(3000);

    // const productList1 = page.locator('div.cart ul.cartWrap')
    // const productCount1 = await productList1.count()
    // console.log(productCount1)

    const status = await verifyBasket(page,"ZARA COAT 3");
    await expect(status).toBeTruthy();

    await page.locator('li.totalRow button.btn-primary').click()

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
    await page.locator('div.actions a').click()

    await page.waitForLoadState('domcontentloaded')

    await expect(page.locator('td h1')).toHaveText(' Thankyou for the order. ')

    const order1= ((await page.locator('td.em-spacer-1 label.ng-star-inserted').nth(0).textContent()).split(' '))[2]
    const order2= ((await page.locator('td.em-spacer-1 label.ng-star-inserted').nth(1).textContent()).split(' '))[2]

   console.log('Order1 is # '+order1+'Order2 is #'+order2 )

   await page.locator("label[routerlink='/dashboard/myorders']").click()

   await page.waitForLoadState('domcontentloaded')

   await expect(page.locator('div.py-5 h1')).toHaveText('Your Orders')

   expect(await searchOrderNumber(page,order1)).toBeTruthy()
   expect(await searchOrderNumber(page,order2)).toBeTruthy()

})

test('Coupon Application Test', async()=>{

    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client/')

    await selectProduct(page,"ZARA COAT 3")
    await selectProduct(page,"ADIDAS ORIGINAL")
    // await page.locator('div.card-body button.w-10').nth(2).click()

    await page.waitForLoadState('domcontentloaded');

    await page.locator("button[routerlink='/dashboard/cart']").click()
    await page.waitForLoadState('domcontentloaded');


    await expect(page.locator('div.heading h1')).toHaveText('My Cart')
    await page.waitForTimeout(3000);

    // const productList1 = page.locator('div.cart ul.cartWrap')
    // const productCount1 = await productList1.count()
    // console.log(productCount1)

    const status = await verifyBasket(page,"ZARA COAT 3");
    await expect(status).toBeTruthy();

    await page.locator('li.totalRow button.btn-primary').click()

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

})

 async function selectProduct(page:Page,productName:string){
    const productList = page.locator("div.card-body");
    const productCount = await productList.count()
    console.log(productCount)

    for(let i=0;i<productCount;i++){
        if (await productList.nth(i).locator("h5 b").textContent()===productName){
            await productList.nth(i).locator("button.w-10").click()
            break;
        }
    }
}

async function verifyBasket(page:Page,productName:string){


    const productListN = await page.locator('ul.cartWrap')
    const productCountN = await productListN.count()
    console.log(productCountN)
    let status = false
    for(let i=0; i<productCountN;i++){
        if(await productListN.nth(i).locator('h3').textContent()===productName){
            status= true
            break
        }else{
            status= false
        }
    }
    return status
}

async function searchOrderNumber(page:Page,orderId:string) {

    const orderNumbers = await page.locator('tr.ng-star-inserted th')
    const orderCount = await orderNumbers.count();
    let orderStatus = false

    for(let i=0; i<orderCount; i++){
        const orderNumber = await orderNumbers.nth(i).textContent()
  
        if( orderNumber===orderId){
            orderStatus=true
            break
        } else{
            orderStatus=false
        }
    }
    return orderStatus
}