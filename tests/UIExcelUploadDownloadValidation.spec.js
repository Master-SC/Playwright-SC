const{test,expect} = require('@playwright/test')
import {UpdateValueOfACellOnADifferentColumn } from '../excelUtils/excelDemo.js'




test.describe("These tests are to Validate Excel Modification and File Upload DownLoad", async ()=>{


    test("UploadDownLoadExcelAndValidateUIData", async ({page})=>{
        const textSearch = "Apple";
        const valueToBeUpdated = "390"

        await page.goto("https://rahulshettyacademy.com/upload-download-test/")
        await expect(page).toHaveTitle("RS Web Table Automation Page")
        const downloadPromise = page.waitForEvent('download');
        await page.getByRole("button",{name:"Download"}).click()
        const downlod = await downloadPromise;
        await downlod.saveAs("C:\\Users\\shiba\\Downloads\\"+downlod.suggestedFilename())
      
        await UpdateValueOfACellOnADifferentColumn(textSearch, valueToBeUpdated,{row:0,column:2} ,"C:\\Users\\shiba\\Downloads\\download.xlsx")
        await page.locator('#fileinput').click()
        await page.locator('#fileinput').setInputFiles("C:\\Users\\shiba\\Downloads\\download.xlsx")
        await expect(page.locator("div.rdt_Table")).toBeVisible()

        const textLocator = await page.getByText(textSearch)
        const desiredRow = await page.getByRole('row').filter({has:textLocator});
        await expect(desiredRow.locator("div#cell-4-undefined div")).toHaveText(valueToBeUpdated)







    })




})