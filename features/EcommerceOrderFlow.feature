Feature: E-Commerce Application Validation

    @Regression
    Scenario: Place an Order
    Given User can Login to E-Commerce Application using email "sunboy1778527479445@hotmail.com" & password "Aftf12#32"
    When User adds and "ADIDAS ORIGINAL" to the cart
    Then "ADIDAS ORIGINAL" is diplayed on the cart page
    When User enter the valid shipping and payment details and place the Order
    Then Verify the order in Order history page