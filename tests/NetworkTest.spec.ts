import {test,expect} from '@playwright/test'

test("Security Testing by intercepting network call", async ({ page }) => {


    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
    await expect(page).toHaveTitle("Let's Shop")
    await page.locator('input#userEmail').fill("sunboy1778527479445@hotmail.com")
    await page.locator('input#userPassword').fill("Aftf12#32")
    await page.locator('input#login').click()

    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await expect(page.locator("h1")).toHaveText("Your Orders")

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", route =>
        route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=64ce67ea7244490f9597bff6"}))

    await page.locator("button:has-text('View')").first().click()
    await expect(page.locator("p.blink_me")).toHaveText("You are not authorize to view this order")
})