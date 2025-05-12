Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
});
/// <reference types="cypress" />
import ShopLocators from './locators/ShopLocators.json';

class ShopPage {
  elements = {
    btnGoToShop : () => cy.get("#menu-item-40 > a"),
  };

  clickShop() {
    this.elements.btnGoToShop().click();
  }
  visitarPaginaShop = () =>{
    cy.visit('/shop/');
  }
  
  doLoginScenarioOutlineShop = (user,pass) => { //realiza el login en la aplicacion de acuerdo a los datos cargados en el escenario Outline, parametrizando así variables
    cy.get(ShopLocators.inpUsernameLogin).type(user);
    cy.get(ShopLocators.inpPassLogin).type(pass);
    cy.get(ShopLocators.btnIniciarSesionLogin).click();
  } 

  clickBotonStoreShop = () => {
    //cy.wait(800);
    //cy.get(ShopLocators.btnGoToShop, {timeout:10000}).should('be.visible');
    //cy.get(ShopLocators.btnGoToShop, {timeout:10000}).click({force: true});
    //cy.get(ShopLocators.btnGoToShop).should('be.visible');
    cy.get(ShopLocators.btnGoToShop).click({force: true});
}

  verificarPaginaShop = () => { //verifica que la pagina Shop cargue correctamente
    cy.get(ShopLocators.shopBradcrum).should('be.visible');
  };
  
  slidePrecio = () => {
    cy.get(ShopLocators.priceSlider)
    .invoke("val", 23000)
    .trigger("change")
    .click({ force: true })
  };

  slidePrecioMayor = () => {
  const currentValue  = 20000;
  const targetValue = 35000;
  const increment = 500;
  const steps = (targetValue - currentValue) / increment;
  const arrows = '{rightarrow}'.repeat(steps); 

  cy.get(ShopLocators.priceMax)
    .should('have.attr', 'left: 0%', 20000)
    .type(arrows)

  cy.get(ShopLocators.priceMin)
    .should('have.attr', 'left: 100%', 35000)
  };
  
  clickFiltrarBusqueda = () => {
  cy.get('.price_slider_amount > .button')
  .click({ force: true })
  };
  
  verificarRangoBusquedaShop = () => { 
    cy.get(ShopLocators.rangoBuscar).should('be.visible');
    cy.get(ShopLocators.rangoDesde).should('text', '₹324');
    cy.get(ShopLocators.rangoHasta).should('text', '₹500');
  };
}

export default new ShopPage();
