import {Given, Then, When} from "@badeball/cypress-cucumber-preprocessor"
import RegistrosPage from '@pages/RegistrosPage';

Given("El cliente se dirige al registro", () => {
    cy.viewport(1920, 1080) 
    cy.visit("/my-account/");
  });

When('El cliente ingresa su correo para su registro', () => {
  cy.fixture('examples/registrosExitoso.json').then((json) => {
    RegistrosPage.successRegistroEmail(json);
})
  });  

When('El cliente ingresa su contraseña para su registro', () => {
    cy.fixture('examples/registrosExitoso.json').then((json) => {
        RegistrosPage.successRegistroPassword(json);
    })
  });  

Then('El cliente se registra exitosamente', () => {
    RegistrosPage.successRegistroValidacion();
})

When('El cliente ingresa su email {string}', (email) => {
  RegistrosPage.failRegistroEmail(email);
});

When('El cliente ingresa password {string}', (password) => {
  RegistrosPage.failRegistroPassword(password);
});

Then('El cliente observa un error', () => {
    RegistrosPage.validacion();
})
