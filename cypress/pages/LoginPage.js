Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
});
/// <reference types="cypress" />
import LoginLocators from './locators/LoginLocators.json'

class LoginPage{

    visitarPagina = () => { 
        cy.visit('/my-account/');
    };

    doSuccesslogin = (json) => { 
    cy.get(LoginLocators.inpUsernameLogin).type(json.username);
    cy.get(LoginLocators.inpPassLogin).type(json.pass);
    cy.get(LoginLocators.btnIniciarSesionLogin).click();
};
    doFailedlogin = (json) => { 
    cy.get(LoginLocators.inpUsernameLogin).type(json.username);
    cy.get(LoginLocators.inpPassLogin).type(json.pass);
    cy.get(LoginLocators.btnIniciarSesionLogin).click(); 
    cy.get(LoginLocators.errorMessage).should('contain.text', 'Error');
};
    doLoginScenarioOutline = (user,pass) => { 
    cy.get(LoginLocators.inpUsernameLogin).type(user);
    cy.get(LoginLocators.inpPassLogin).type(pass);
    cy.get(LoginLocators.btnIniciarSesionLogin).click();
};
    failedLoginScenarioOutline = () => { 
    cy.get(LoginLocators.errorMessage).should('contain.text', 'Error');
};
}
export default new LoginPage(); 
