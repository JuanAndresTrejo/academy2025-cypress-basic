import {Given, Then, When} from "@badeball/cypress-cucumber-preprocessor"
import LoginPage from '@pages/LoginPage'

Given('El cliente se logea exitosamente', () => {
    cy.fixture('examples/loginExitoso.json').then((json) => {
        cy.visit("/my-account/");
        LoginPage.doSuccesslogin(json);
    })
})

Given('El cliente no puede ingresar a su cuenta por su contraseña', () => {
    cy.fixture('examples/loginFallido.json').then((json) => {
        cy.visit("/my-account/");
        LoginPage.doFailedlogin(json);
    })
})

Given('El cliente se dirige al login', () => { 
    cy.visit("/my-account/");
})

When("El cliente ingresa su usuario {string} y contraseña {string}", (user,pass) => {
    LoginPage.doLoginScenarioOutline(user,pass);
})

Then('El cliente no puede ingresar a su cuenta por su email', () => {
    cy.fixture('examples/loginFallido.json').then((json) => {
    LoginPage.failedLoginScenarioOutline(json);     
    })
})


