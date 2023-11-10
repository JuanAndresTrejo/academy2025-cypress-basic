Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
});
/// <reference types="cypress" />
import MiCuentaLocators from './locators/MiCuentaLocators.json';

class MiCuentaPage {
  dashboard = () => { 
    cy.get(MiCuentaLocators.clickDashboard).click({force: true});
    cy.get(MiCuentaLocators.dashboard).should('contain.text', 'Hello');
};

   order = () => { 
    cy.get(MiCuentaLocators.clickOrder).click();
    cy.get(MiCuentaLocators.order).should('be.visible');
};

  logout = () => { 
    cy.get(MiCuentaLocators.clicklogout).click();
    cy.get(MiCuentaLocators.logout).should('be.visible');
};
}

export default new MiCuentaPage();
