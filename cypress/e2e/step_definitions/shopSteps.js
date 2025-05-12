import {Given, Then, When} from "@badeball/cypress-cucumber-preprocessor"
import ShopPage from '@pages/ShopPage'

Given("Me logueo como usuario correctamente - shop demo", () => {
    cy.viewport(1920, 1080) // Calibramos viewport con resolucion de pantalla 1920px x 1080px
    cy.visit("/my-account/");
  });

When('Ingreso user {string} y pass {string}', (user,pass) => {
     ShopPage.doLoginScenarioOutlineShop(user,pass);
  });  

Then('Ingreso al shop', () => {
     //ShopPage.clickShop();
     ShopPage.clickBotonStoreShop();
});

Then('Busco por rango de precio, de medio a mayor', () => {
    ShopPage.slidePrecio();
})

Then('Ingreso al rango de busqueda marcada', () => {
    ShopPage.clickFiltrarBusqueda();
})

Then('Verifico que ingreso al rango de busqueda deseada', () => {
    ShopPage.verificarRangoBusquedaShop();
})

