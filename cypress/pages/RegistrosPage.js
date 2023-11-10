Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  });
/// <reference types="cypress" />
  import RegistrosLocators from './locators/RegistrosLocators.json';
  import MiCuentaLocators from './locators/MiCuentaLocators.json';
  import LoginLocators from './locators/LoginLocators.json';
  
  class RegistrosPage {
    successRegistroEmail = (json) => { 
      const aleatoreo = cadenaAleatoria(8);
      cy.get(RegistrosLocators.email_Registro).type(aleatoreo+json.email);
  };

    successRegistroPassword= (json) => { 
      for (let i = 0; i <= 5; i++) { //Este "for" se puso por que el boton de registro en ocaciones no deja que que le clickiemos y asi logre que me dejara interactuar con el boton
        cy.get(RegistrosLocators.password_Registro).type(json.password);
      }
      cy.get(RegistrosLocators.boton_Registro).click({force: true});
  };

    successRegistroValidacion= () => { 
      cy.get(MiCuentaLocators.dashboard).should('contain.text', 'Hello')
  };


    failRegistroEmail = (email) => { 
      cy.get(RegistrosLocators.email_Registro).type(email);
  };

    failRegistroPassword = (password) => { 
      for (let i = 0; i <= 5; i++) { //Este "for" se puso por que el boton de registro en ocaciones no deja que que le clickiemos y asi logre que me dejara interactuar con el boton
      cy.get(RegistrosLocators.password_Registro).type(password);
      }
      cy.get(RegistrosLocators.boton_Registro).click({force: true});
  };
  
    validacion = () => { 
      cy.get(LoginLocators.errorMessage).should('contain.text', 'Error');
  };

  }

  function cadenaAleatoria(cantidad) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let r = '';
  
    for (let i = 0; i < cantidad; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      r += caracteres.charAt(indice);
    }
  
    return r;
  }
  
  export default new RegistrosPage();

  