const { test, expect } = require("@playwright/test")
const { request } = require("node:http")

test.describe("Network Interception Tests", async () => {

    test("Block CSS to Load", async ({ page }) => {

        page.route("**/*{.css}", route => route.abort())
        await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
        await expect(page).toHaveTitle("Let's Shop")
        await page.locator('input#userEmail').fill("sunboy1778527479445@hotmail.com")
        await page.locator('input#userPassword').fill("Aftf12#32")
        await page.locator('input#login').click()
        await expect(page.locator("nav a.blinkingText")).toHaveText("Get Shortlisted by Recruiters - Take QA Skill Assessments on TechSmartHire");

    })


    test("Block Images to Load", async ({ page }) => {

        page.route("**/*{.jpeg,.jpg}", route => route.abort())
        await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
        await expect(page).toHaveTitle("Let's Shop")
        await page.locator('input#userEmail').fill("sunboy1778527479445@hotmail.com")
        await page.locator('input#userPassword').fill("Aftf12#32")
        await page.locator('input#login').click()
        await expect(page.locator("nav a.blinkingText")).toHaveText("Get Shortlisted by Recruiters - Take QA Skill Assessments on TechSmartHire");
    })

    test("Log All the network request and response during execution", async ({ page }) => {
        page.route("**/*{.jpeg,.jpg}", route => route.abort())
        page.on("request", request => console.log(request.url()) )
        page.on("response", response => console.log(response.url(),response.status()))

        await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
        await expect(page).toHaveTitle("Let's Shop")
        await page.locator('input#userEmail').fill("sunboy1778527479445@hotmail.com")
        await page.locator('input#userPassword').fill("Aftf12#32")
        await page.locator('input#login').click()

        await page.locator("button[routerlink='/dashboard/myorders']").click();
        await expect(page.locator("h1")).toHaveText("Your Orders")
        await page.locator("button:has-text('View')").first().click()

    })




})