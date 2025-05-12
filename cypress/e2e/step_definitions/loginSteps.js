import {Given, Then, When} from "@badeball/cypress-cucumber-preprocessor"
import LoginPage from '@pages/LoginPage'
import HomePage from '@pages/HomePage'



Given('Me logueo como usuario correctamente', () => {
    cy.fixture('examples/LoginExample.json').then((json) => {
        cy.visit("/my-account/");
        //LoginPage.visitarPagina();
        LoginPage.doLogin(json);
       

    })
})

Given('Me logueo como admin correctamente', () => {
    cy.fixture('examples/LoginAdminExample.json').then((json) => {
        cy.visit("/my-account/");
        //LoginPage.visitarPagina();
        LoginPage.doLoginAdmin(json);

    })
})

Given('Navego al sitio automationtesting', () => {
    //LoginPage.visitarPagina();     
    cy.visit("/my-account/");
})

When('Me logueo como usuario con user {string} y pass {string}', (user,pass) => {
    LoginPage.doLoginScenarioOutline(user,pass);
})

Then('Valido saludo de bienvenida en el Título', () => {
    HomePage.verificarHome();     
})


