import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

When('Hago click en el botón Filter', () => {
    cy.log('🔍 Ejecutando: Hago click en el botón Filter');
    cy.get('.price_slider_amount button').click();
});

Then('Verifico que puedo ver libros solo entre el rango de precio especificado', () => {
    cy.log('🔍 Ejecutando: Verifico que puedo ver libros solo entre el rango de precio especificado');
    cy.log('⚠️ Implementar: Verifico que puedo ver libros solo entre el rango de precio especificado'); // TODO: Implementar este step
});

When('Click any of the product links available in the product category', () => {
    cy.log('🔍 Ejecutando: Click any of the product links available in the product category');
    cy.log('⚠️ Implementar: Click any of the product links available in the product category'); // TODO: Implementar este step
});

Then('Verifico que now user can view only that particular product', () => {
    cy.log('🔍 Ejecutando: Verifico que now user can view only that particular product');
    cy.log('⚠️ Implementar: Verifico que now user can view only that particular product'); // TODO: Implementar este step
});

When('Click on Sort by Popularity item in Default sorting dropdown', () => {
    cy.log('🔍 Ejecutando: Click on Sort by Popularity item in Default sorting dropdown');
    cy.log('⚠️ Implementar: Click on Sort by Popularity item in Default sorting dropdown'); // TODO: Implementar este step
});

Then('Verifico que now user can view the popular products only', () => {
    cy.log('🔍 Ejecutando: Verifico que now user can view the popular products only');
    cy.log('⚠️ Implementar: Verifico que now user can view the popular products only'); // TODO: Implementar este step
});

When('Click on Sort by Average ratings in Default sorting dropdown', () => {
    cy.log('🔍 Ejecutando: Click on Sort by Average ratings in Default sorting dropdown');
    cy.log('⚠️ Implementar: Click on Sort by Average ratings in Default sorting dropdown'); // TODO: Implementar este step
});

When('Click on Sort by Newness ratings in Default sorting dropdown', () => {
    cy.log('🔍 Ejecutando: Click on Sort by Newness ratings in Default sorting dropdown');
    cy.log('⚠️ Implementar: Click on Sort by Newness ratings in Default sorting dropdown'); // TODO: Implementar este step
});

When('Click on Sort by Low to High Item in Default sorting dropdown', () => {
    cy.log('🔍 Ejecutando: Click on Sort by Low to High Item in Default sorting dropdown');
    cy.log('⚠️ Implementar: Click on Sort by Low to High Item in Default sorting dropdown'); // TODO: Implementar este step
});

When('Click on Sort by High to Low Item in Default sorting dropdown', () => {
    cy.log('🔍 Ejecutando: Click on Sort by High to Low Item in Default sorting dropdown');
    cy.log('⚠️ Implementar: Click on Sort by High to Low Item in Default sorting dropdown'); // TODO: Implementar este step
});

When('Click on read more button in home page', () => {
    cy.log('🔍 Ejecutando: Click on read more button in home page');
    cy.log('⚠️ Implementar: Click on read more button in home page'); // TODO: Implementar este step
});

When('Read More option indicates the Out Of Stock.', () => {
    cy.log('🔍 Ejecutando: Read More option indicates the Out Of Stock.');
    cy.log('⚠️ Implementar: Read More option indicates the Out Of Stock.'); // TODO: Implementar este step
});

When('User cannot add the product which has read more option as it was out of stock.', () => {
    cy.log('🔍 Ejecutando: User cannot add the product which has read more option as it was out of stock.');
    cy.log('⚠️ Implementar: User cannot add the product which has read more option as it was out of stock.'); // TODO: Implementar este step
});

When('Click on Sale written product in home page', () => {
    cy.log('🔍 Ejecutando: Click on Sale written product in home page');
    cy.log('⚠️ Implementar: Click on Sale written product in home page'); // TODO: Implementar este step
});

When('User can clearly view the actual price with old price striken for the sale written products', () => {
    cy.log('🔍 Ejecutando: User can clearly view the actual price with old price striken for the sale written products');
    cy.log('⚠️ Implementar: User can clearly view the actual price with old price striken for the sale written products'); // TODO: Implementar este step
});

When('Hago click en el botón Add To Basket para agregar el libro al carrito', () => {
    cy.log('🔍 Ejecutando: Hago click en el botón Add To Basket para agregar el libro al carrito');
    cy.get('.add_to_cart_button').click();
});

Then('Verifico que puedo ver ese libro en el menú', () => {
    cy.log('🔍 Ejecutando: Verifico que puedo ver ese libro en el menú');
    cy.log('⚠️ Implementar: Verifico que puedo ver ese libro en el menú'); // TODO: Implementar este step
});

When('Now click on View Basket link which navigates to proceed to check out page.', () => {
    cy.log('🔍 Ejecutando: Now click on View Basket link which navigates to proceed to check out page.');
    cy.log('⚠️ Implementar: Now click on View Basket link which navigates to proceed to check out page.'); // TODO: Implementar este step
});

When('Now user can find total and subtotal values just above the Proceed to Checkout button.', () => {
    cy.log('🔍 Ejecutando: Now user can find total and subtotal values just above the Proceed to Checkout button.');
    cy.log('⚠️ Implementar: Now user can find total and subtotal values just above the Proceed to Checkout button.'); // TODO: Implementar este step
});

When('The total always < subtotal because taxes are added in the subtotal', () => {
    cy.log('🔍 Ejecutando: The total always < subtotal because taxes are added in the subtotal');
    cy.log('⚠️ Implementar: The total always < subtotal because taxes are added in the subtotal'); // TODO: Implementar este step
});

When('Now click on Proceed to Check out button which navigates to payment gateway page.', () => {
    cy.log('🔍 Ejecutando: Now click on Proceed to Check out button which navigates to payment gateway page.');
    cy.log('⚠️ Implementar: Now click on Proceed to Check out button which navigates to payment gateway page.'); // TODO: Implementar este step
});

Then('Verifico que user can view billing details,order details,additional details and payment gateway details.', () => {
    cy.log('🔍 Ejecutando: Verifico que user can view billing details,order details,additional details and payment gateway details.');
    cy.log('⚠️ Implementar: Verifico que user can view billing details,order details,additional details and payment gateway details.'); // TODO: Implementar este step
});

When('Now user can fill his details in billing details form and can opt any payment in the payment gateway like Direct bank transfer,cheque,cash or paypal.', () => {
    cy.log('🔍 Ejecutando: Now user can fill his details in billing details form and can opt any payment in the payment gateway like Direct bank transfer,cheque,cash or paypal.');
    cy.log('⚠️ Implementar: Now user can fill his details in billing details form and can opt any payment in the payment gateway like Direct bank transfer,cheque,cash or paypal.'); // TODO: Implementar este step
});

When('Hago click en el botón Place Order', () => {
    cy.log('🔍 Ejecutando: Hago click en el botón Place Order');
    cy.log('⚠️ Implementar: Hago click en el botón Place Order'); // TODO: Implementar este step
});

When('On clicking place order button user completes his process where the page navigates to Order confirmation page with order details,bank details,customer details and billing details.', () => {
    cy.log('🔍 Ejecutando: On clicking place order button user completes his process where the page navigates to Order confirmation page with order details,bank details,customer details and billing details.');
    cy.log('⚠️ Implementar: On clicking place order button user completes his process where the page navigates to Order confirmation page with order details,bank details,customer details and billing details.'); // TODO: Implementar este step
});

When('Hago click en el enlace Item', () => {
    cy.log('🔍 Ejecutando: Hago click en el enlace Item');
    cy.log('⚠️ Implementar: Hago click en el enlace Item'); // TODO: Implementar este step
});

When('On clicking place order button user completes his process where the page navigates to Order confirmation pagewith order details,bank details,customer details and billing details', () => {
    cy.log('🔍 Ejecutando: On clicking place order button user completes his process where the page navigates to Order confirmation pagewith order details,bank details,customer details and billing details');
    cy.log('⚠️ Implementar: On clicking place order button user completes his process where the page navigates to Order confirmation pagewith order details,bank details,customer details and billing details'); // TODO: Implementar este step
});

When('The tax rate variers for India compared to other countries', () => {
    cy.log('🔍 Ejecutando: The tax rate variers for India compared to other countries');
    cy.log('⚠️ Implementar: The tax rate variers for India compared to other countries'); // TODO: Implementar este step
});

Then('Verifico que tax rate for indian should be 2% and for abroad it should be 5%', () => {
    cy.log('🔍 Ejecutando: Verifico que tax rate for indian should be 2% and for abroad it should be 5%');
    cy.log('⚠️ Implementar: Verifico que tax rate for indian should be 2% and for abroad it should be 5%'); // TODO: Implementar este step
});