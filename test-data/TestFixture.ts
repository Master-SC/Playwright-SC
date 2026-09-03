import {test as basetest} from '@playwright/test'

interface TestDataForOrder{
    url: string,
    userEmail:string,
    userPwd: string,
    loginPageTitle: string,
    listingPageTitle: string,
    product2: string,
    successfullToastMsg: string,
    cartPageTitle: string
}

export const customTest = basetest.extend<{testDataForOrder:TestDataForOrder}>(
    {
    testDataForOrder : {
    url: "https://rahulshettyacademy.com/client/#/auth/login",
    userEmail: "sunboy1778527479445@hotmail.com",
    userPwd: "Aftf12#32",
    loginPageTitle: "Let's Shop",
    listingPageTitle: "Automation Practice",
    product2: "ADIDAS ORIGINAL",
    successfullToastMsg: "Product Added To Cart",
    cartPageTitle: "My Cart"
    }
}
)