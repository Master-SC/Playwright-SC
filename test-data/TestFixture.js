const base = require('@playwright/test');

exports.customtest = base.test.extend(
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