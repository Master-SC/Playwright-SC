class LoginPage{
    constructor(page){
        this.page=page;
        this.email=page.locator('input#userEmail');
        this.password=page.locator('input#userPassword');
        this.loginBtn=page.locator('input#login');
        
    }

    async gotoUrl(url){
        await this.page.goto(url);
    }

    async customerValidLogin(email,password){
        await this.email.fill(email);
        await this.password.fill(password);
        await this.loginBtn.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

}

module.exports={LoginPage};