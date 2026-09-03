import {test,expect,request} from '@playwright/test';
import {APIUtilis} from "../utilis/APIUtilis"

const loginPayload = {userEmail:"sunboy1779307134355@hotmail.com",userPassword:"Aftf12#34"}
const orderPayload = {orders:[{country:"United Kingdom",productOrderedId:"6960eac0c941646b7a8b3e68"}]}
const fakePayLoadOrders = {data:[],message:'No Orders'};
let response:any;


test.beforeAll( async ()=>{

    const apiContext = await request.newContext();
    const apiUtilis = new APIUtilis(apiContext,loginPayload);
    response = await apiUtilis.placeOrder(orderPayload);
})

test.beforeEach(  ()=>{

})

//We can Tag the tests using @API @Sanity to run we need to give the option --grep '@Sanity'

test('@API @Sanity API Response Interception Test', async({page})=>{


    await page.addInitScript(value =>{
        window.localStorage.setItem('token',value)
    },response.token)

    await page.goto('https://rahulshettyacademy.com/client/')

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6a0e128417ee3e78ba8c7680',
        async route=>{
            //Intercepting Response - API Response -> {Play write Fake API response}-> Browser -> Rendering Data
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoadOrders);
            route.fulfill({
                response,
                body,
            })
        }
    )


   await page.locator("button[routerlink='/dashboard/myorders']").click()
   await page.waitForLoadState('domcontentloaded');
   await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
   await expect(page.locator('.mt-4')).toHaveText(' You have No Orders to show at this time. Please Visit Back Us ')


//    expect(await searchOrderNumber(page,response.orderId)).toBeTruthy()
   await page.close()

})

 