Feature: E-Commerce Application Login Validation

    This Feture is to test the E-Comm Application login validation
    @Sanity
    @Regression
    Scenario: Sucessfull Login Validation
    Given User can Login to E-Commerce Application using email "sunboy1778527479445@hotmail.com" & password "Aftf12#32"
    Then Verify the login is Successfull.

    @Sanity
    @Negative
    @Regression
    Scenario: Login Error Validation
    Given User can Login to E-Commerce Application using email "sunboy1778527479445@hotmail.com1" & password "Aftf12#32"
    Then Verify Error Message is displayed

    @parameter
    Scenario Outline: Login Error Validation with multiple Value
    Given User can Login to E-Commerce Application using email "<email>" & password "<password>"
    Then Verify Error Message is displayed

    Examples:
        | email                             | password  | 
        | sunboy1778527479445@hotmail.com1  | Aftf12    | 
        | sunboy1778527479445@hotmail.com   | Aftf13    |
        | sunboy1778527479445@hotmail.co    | Aftf123   |
