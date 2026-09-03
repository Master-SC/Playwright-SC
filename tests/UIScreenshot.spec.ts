import {test,expect} from "@playwright/test"

test.describe("Screenshot Taking Ways", async ()=>{


    test("Take the full page screenshot", async ({page})=>{
        await page.goto("https://eventhub.rahulshettyacademy.com")

        await page.locator("a:has-text('Register')").click()
        await expect(page.locator("h1.text-xl")).toBeVisible()
        await page.screenshot({path:'screenshots/screenshot.png'})
        await page.locator("div.w-full").screenshot({path:'screenshots/LocatorScreenshot.png'})
    })

    test("Ui Visual Testing Page Wise", async ({page})=>{

        await page.goto("https://www.yahoo.com/")
        expect(await page.screenshot()).toMatchSnapshot()

    })

    test("Visual Validation Element Level ", async ({page})=>{

        await page.goto("https://eventhub.rahulshettyacademy.com")
        await page.locator("a:has-text('Register')").click()
        await expect(page.locator("h1.text-xl")).toBeVisible()
        expect(await page.locator("div.w-full").screenshot()).toMatchSnapshot("screenshots/LocatorScreenshot.png")
    })
})
