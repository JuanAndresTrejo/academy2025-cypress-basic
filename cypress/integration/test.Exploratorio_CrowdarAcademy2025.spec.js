// NativeExecutionRunner-CrowdarAcademy2023-Sliders.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
});


it('Test_Exploratorio', function() {
  cy.visit('https://practice.automationtesting.in/my-account/');
  cy.get('#username').clear('academyCypress_usuarioNormal@crowdaronline.com');
  cy.get('#username').type('academyCypress_usuarioNormal@crowdaronline.com');
  cy.get('#password').clear('Crowdar.2025!');
  cy.get('#password').type('Crowdar.2025!');
  cy.get(':nth-child(3) > .woocommerce-Button').click();
  cy.get('.woocommerce-MyAccount-navigation-link--dashboard > a').click();
  cy.get('#site-logo > a > img').click();
  // cy.get('.n2-ss-slide-34 > .n2-ss-slide-background > .n2-ss-slide-background-image').click();
  // cy.get('.n2-ss-slide-35 > .n2-ss-slide-background > .n2-ss-slide-background-image').click();
});