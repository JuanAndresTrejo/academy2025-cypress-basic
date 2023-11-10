import {Given, Then, When} from "@badeball/cypress-cucumber-preprocessor"
import LoginPage from '@pages/LoginPage'
import MiCuentaPage from '@pages/MiCuentaPage'

Given("El cliente se encuentra en el login", () => {
    cy.viewport(1920, 1080) 
    cy.visit("/my-account/");
  });

When('El cliente ingresa a su cuenta', () => {
  cy.fixture('examples/loginExitoso.json').then((json) => {
    LoginPage.doSuccesslogin(json);
    })
  });  

Then('El cliente ve su Dashborad', () => {
    MiCuentaPage.dashboard();
});

Then('El cliente ve sus Ordenes', () => {
    MiCuentaPage.order();
})

Then('El cliente esta fuera de su cuenta', () => {
    MiCuentaPage.logout();
});

