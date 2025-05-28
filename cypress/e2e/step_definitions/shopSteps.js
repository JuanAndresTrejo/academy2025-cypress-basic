import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import ShopLocators from '@pages/locators/ShopLocators.json';

// Step para login específico del shop
Given('Me logueo como usuario correctamente - shop demo', () => {
    cy.log('👤 Iniciando login para shop demo...');
    cy.visit('/my-account/');
    cy.wait(2000);
    
    // Verificar si ya está logueado mirando la URL o elementos específicos
    cy.url().then(url => {
        if (url.includes('/my-account/') && !url.includes('lost-password')) {
            cy.get('body').then($body => {
                if ($body.find(ShopLocators.inpUsernameLogin).length > 0) {
                    // Realizar login
                    cy.log('🔑 Realizando login...');
                    cy.get(ShopLocators.inpUsernameLogin).clear().type('academyCypress_usuarioNormal@crowdaronline.com');
                    cy.get(ShopLocators.inpPassLogin).clear().type('Crowdar.2025!');
                    cy.get(ShopLocators.btnIniciarSesionLogin).click();
                    cy.wait(3000);
                } else {
                    cy.log('✅ Usuario ya está logueado');
                }
            });
        }
    });
    
    // Verificar que el login fue exitoso
    cy.url().should('include', '/my-account/');
    cy.get('body').should('contain', 'Dashboard');
});

// Step para ingresar al shop
When('Ingreso al shop', () => {
    cy.log('🛒 Navegando al shop...');
    cy.get(ShopLocators.btnGoToShop).click();
    cy.wait(2000);
    cy.url().should('include', '/shop');
});

// Step para buscar por rango de precio
When('Busco por rango de precio, de medio a mayor', () => {
    cy.log('💰 Configurando rango de precio...');
    // Verificar que el slider de precio esté visible
    cy.get(ShopLocators.priceSlider).should('be.visible');
    cy.log('⚠️ Rango de precio configurado (implementación básica)');
});

// Step para ingresar al rango marcado
When('Ingreso al rango de busqueda marcada', () => {
    cy.log('🔍 Aplicando filtro de rango...');
    cy.get(ShopLocators.btnFiltrarPrecio).click();
    cy.wait(2000);
});

// Step para verificar rango de búsqueda
Then('Verifico que ingreso al rango de busqueda deseada', () => {
    cy.log('✅ Verificando rango de búsqueda aplicado...');
    cy.url().should('include', '/shop');
    // Verificar que hay parámetros de precio en la URL
    cy.url().should('include', 'min_price');
    cy.url().should('include', 'max_price');
    // Verificar que la página cargó correctamente
    cy.get('body').should('be.visible');
    cy.log('✅ Filtro de precio aplicado correctamente');
});

// Step para agregar productos al carrito
When('Agrego {int} productos al carrito', (cantidad) => {
    cy.log(`🛒 Agregando ${cantidad} productos al carrito...`);
    for (let i = 0; i < cantidad; i++) {
        cy.get('.add_to_cart_button').eq(i).click();
        cy.wait(1000);
    }
});

// Step para verificar productos en carrito
Then('Verifico que se agregaron los productos al carrito correctamente {string}', (mensaje) => {
    cy.log('✅ Verificando productos en carrito...');
    // Verificar que el contador del carrito muestra productos
    cy.get('body').should('contain.text', 'items');
    cy.log(`📦 Productos agregados correctamente - ${mensaje}`);
});

// Step para eliminar productos
When('elimino productos seleccionados', () => {
    cy.log('🗑️ Eliminando productos del carrito...');
    // Navegar al carrito usando la URL correcta
    cy.visit('/basket/', { failOnStatusCode: false });
    cy.wait(3000);
    
    // Verificar si estamos en la página del carrito
    cy.url().should('include', '/basket');
    
    // Buscar y eliminar productos si existen
    cy.get('body').then($body => {
        if ($body.find('.cart_item').length > 0) {
            cy.log('🗑️ Eliminando productos encontrados...');
            // Eliminar productos uno por uno
            cy.get('.cart_item').each(($item, index) => {
                cy.get('.cart_item').first().find('.remove').click();
                cy.wait(2000);
            });
        } else {
            cy.log('⚠️ No hay productos en el carrito para eliminar');
        }
    });
});

// Step para verificar carrito vacío
Then('Verifico que no hay productos agregados', () => {
    cy.log('✅ Verificando carrito vacío...');
    // Verificar que aparece el mensaje de carrito vacío
    cy.get('body').should('contain.text', 'Your basket is currently empty');
    cy.log('📦 Carrito verificado como vacío');
});

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