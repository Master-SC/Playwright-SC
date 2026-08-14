class APIUtilis{

    constructor(apiContext,loginPayload){
        this.apiContext = apiContext;
        this.loginPayload=loginPayload;
    }


    async getToken(){

        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{
            data:this.loginPayload
        })
        
        // expect(loginResponse.ok()).toBeTruthy()
        const loginResponseJson = await loginResponse.json();
        const loginToken = loginResponseJson.token;

        return loginToken;
    }

    async placeOrder(orderPayload){
        let response = {};
        response.token=await this.getToken();
             
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
            data:orderPayload,
            headers:{
                'Authorization':response.token,
                'Content-type':'application/json'
                }  
        })
        
            //  expect(orderResponse.ok()).toBeTruthy()
             const orderResponseJson = await orderResponse.json();
             const orderId = orderResponseJson.orders[0];
             response.orderId=orderId;
             return response;

    }

}

module.exports={APIUtilis}