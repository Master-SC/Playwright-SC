const{expect,test}=require('@playwright/test');


// test.describe.configure({mode:"parallel"}) // Make the Test run in Parallel
// test.describe.configure({mode:"serial"}) // Used for interdependent test if one test fail rest will skipped. 

test('First Playwright Test', async ({browser})=>{

    const context = await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://www.google.com");
    await expect(page).toHaveTitle('Google')

    
});

//test.onkl is used to run only a specific test. 
test('Second Playwright Test', async ({page})=>{

    // If We don't need custom cookies and all then we don't need to 
    // create a context and page

    await page.goto("https://www.apple.com");
    await expect(page).toHaveTitle('Apple')
});


test("@Sanity Login Page Validation",async({page})=>{

    const userName = page.locator("input#username");
    const passWord = page.locator("input[type='password']") 
    const signInBtn = page.locator("input#signInBtn")
    const errorMsg = page.locator("[style*='block']")
    const infoText = page.locator('p[class*=text-white]')
    const productList = page.locator("h4.card-title a")

    const pageUrl = "https://rahulshettyacademy.com/loginpagePractise/"
    const loginPageTitle = "LoginPage Practise | Rahul Shetty Academy"
    const wrongUserId = "rahulshettyacadem"
    const wrongPwd = "Learning@830$3mK21"
    const homePageTitle = "ProtoCommerce"
    const loginErrorText = "Incorrect username/password."



    await page.goto(pageUrl);
    await expect(page).toHaveTitle(loginPageTitle);

    await userName.fill(wrongUserId);
    await passWord.fill(wrongPwd);
    await signInBtn.click();

    await expect(errorMsg).toContainText(loginErrorText)

    const loginPageText = (await infoText.innerText()).split(" ");

    await userName.fill(loginPageText[2]);
    await passWord.fill((loginPageText[6].split(')'))[0]);
    await signInBtn.click();

    await expect(page).toHaveTitle(homePageTitle)

    //Get the list of products in the page
    const firstElement = await (productList.first()).textContent();
    const thirdElement = await productList.nth(2).textContent();

    // If we only use this after loding the page it will fail as allTextContents doesn't have any inbuilt wait.
    const listElement= await productList.allTextContents();

    console.log(firstElement)
    console.log(thirdElement)
    console.log(listElement)
})


test("Auth Login Validation", async({page})=>{

    const registrationLink = page.locator('a.text-reset')
    const regisTitle = page.locator('h1.login-title')
    const firstName = page.locator('input#firstName')
    const lastName = page.locator('input#lastName')
    const userEmail = page.locator('input#userEmail')
    const userPhoneNum = page.locator('input#userMobile')
    const occupationSelect = page.locator('select[formcontrolname=occupation]')
    const genderBtn = page.locator('input[value=Male]')
    const userPwd = page.locator('input#userPassword')
    const userConfPwd = page.locator('input#confirmPassword')
    const ageCheckBox = page.locator('input[formcontrolname=required]')
    const registrationBtn = page.locator('input[value=Register]')
    const registrationSuccessMsg = page.locator('h1.headcolor')
    const loginPageRedirect = page.locator("button[routerlink='/auth']")
    const loginBtn = page.locator('input#login')
    const productName = page.locator('div.card-body h5 b')


    const now = new Date();
    const firstNameValue = 'Sameuel'+now.getMinutes();
    const lastNameValue = 'Matt'+now.getDay();
    const emailValue = 'sunboy'+now.getTime()+'@hotmail.com';
    const phoneNumberValue = '98765654'+now.getSeconds()
    const pwdValue = 'Aftf12#3'+now.getDay();


    const pageUrl = "https://rahulshettyacademy.com/client/#/auth/login"

    await page.goto(pageUrl);
    await expect(regisTitle).toHaveText('Log in')
    await registrationLink.click()
    await expect(regisTitle).toHaveText('Register')


    await firstName.fill(firstNameValue)
    await lastName.fill(lastNameValue)

    await userEmail.fill(emailValue)
    await userPhoneNum.fill(phoneNumberValue)
    await occupationSelect.selectOption('4: Scientist')
    await genderBtn.click()

    await userPwd.fill(pwdValue)
    await userConfPwd.fill(pwdValue)
    await ageCheckBox.click()
    await registrationBtn.click()

    await expect(registrationSuccessMsg).toHaveText('Account Created Successfully')

    await loginPageRedirect.click()
    await userEmail.fill(emailValue)
    await userPwd.fill(pwdValue)
    await loginBtn.click()

    console.log(emailValue)
    console.log(pwdValue)


    // This is one way to wait for the page to load
    // await page.waitForLoadState('networkidle');

    // This is another way to wait for the page to load 
    // await productName.first().waitFor()

    //This is the most effective way to have a assertion on the page
    //  so playwright can wait automaticaly
    await expect(page).toHaveTitle("Let's Shop")
    
    await expect(productName.first()).toHaveText('ADIDAS ORIGINAL')
    const listOfProduct = await productName.allTextContents()
    console.log(listOfProduct)
})



