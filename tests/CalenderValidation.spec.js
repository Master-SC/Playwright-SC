const {test,expect} =require("@playwright/test");


test('Calender Validation',async({page})=>{

    const year=2028;
    const month=5;
    const day=16;

    const datesList = [month,day,year];

    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    await page.locator('div.react-date-picker__inputGroup').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.getByText(year).click();
    await page.locator('button.react-calendar__year-view__months__month').nth(Number(month)-1).click();
    await page.locator("//button[contains(@class,'react-calendar__month-view__days__day') and not(contains(@class,'react-calendar__month-view__days__day--neighboringMonth'))]/abbr[text()='"+day+"']").click()
    const date= await page.locator("div.react-date-picker__inputGroup input[name='date']").getAttribute('value')

    expect(date).toBe(year+"-0"+month+"-"+day)

    const dates = page.locator('.react-date-picker__inputGroup input')

    for(let i=0; i<dates.count(); i++){
        const value = dates.nth(i).inputValue()
        expect(value).toEqual(datesList.get(i))
    }
})