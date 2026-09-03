import {test,expect,request, Page, Locator} from '@playwright/test';
import {APIUtilis} from "../utilis/APIUtilis"



const loginPayload = {userEmail:"sunboy1779307134355@hotmail.com",userPassword:"Aftf12#34"}
const orderPayload = {orders:[{country:"United Kingdom",productOrderedId:"6960eac0c941646b7a8b3e68"}]}
let response:any;


test.beforeAll( async ()=>{

    const apiContext = await request.newContext();
    const apiUtilis = new APIUtilis(apiContext,loginPayload);
    response = await apiUtilis.placeOrder(orderPayload);
})

test.beforeEach(  ()=>{

})

test('@API Order Place Flow Hybrid API UI', async({page})=>{


    await page.addInitScript(value =>{
        window.localStorage.setItem('token',value)
    },response.token)

    await page.goto('https://rahulshettyacademy.com/client/')


   await page.locator("button[routerlink='/dashboard/myorders']").click()
   await page.waitForLoadState('domcontentloaded')
   await expect(page.locator('div.py-5 h1')).toHaveText('Your Orders')


   expect(await searchOrderNumber(page,response.orderId)).toBeTruthy()
   await page.close()

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

    const orderNumbers:Locator = await page.locator('tr.ng-star-inserted th')
    const orderCount:number = await orderNumbers.count();
    let orderStatus:boolean = false

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