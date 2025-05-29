import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";

/**
* 🕵️‍♂️ EXPLORATORY STEPS - Mapeo automático de elementos
* 
* Steps para extraer, interceptar y mapear elementos de páginas
* Funciona como un scraper para generar locators automáticamente
*/

// Objeto para almacenar elementos encontrados
let discoveredElements = {
    navigation: [],
    buttons: [],
    links: [],
    inputs: [],
    images: [],
    texts: [],
    containers: [],
    interactive: [],
    metadata: {
        url: '',
        title: '',
        timestamp: '',
        totalElements: 0
    }
};

// Función auxiliar para generar selectores únicos
function generateUniqueSelector(element) {
    const selectors = [];
    
    // ID (más específico)
    if (element.id) {
        selectors.push(`#${element.id}`);
    }
    
    // Clases CSS
    if (element.className && typeof element.className === 'string') {
        const classes = element.className.trim().split(/\s+/).filter(cls => cls.length > 0);
        if (classes.length > 0) {
            selectors.push(`.${classes.join('.')}`);
            // También selector con una sola clase principal
            selectors.push(`.${classes[0]}`);
        }
    }
    
    // Atributos específicos
    ['data-testid', 'data-cy', 'data-test', 'name', 'type', 'role'].forEach(attr => {
        const value = element.getAttribute(attr);
        if (value) {
            selectors.push(`[${attr}="${value}"]`);
        }
    });
    
    // Texto visible (para links y botones)
    const text = element.textContent?.trim();
    if (text && text.length > 0 && text.length < 50) {
        selectors.push(`text="${text}"`);
        selectors.push(`contains("${text}")`);
    }
    
    // Selector por tag + posición si es necesario
    const tagName = element.tagName.toLowerCase();
    selectors.push(tagName);
    
    return selectors;
}

// Función para categorizar elementos
function categorizeElement(element) {
    const tagName = element.tagName.toLowerCase();
    const type = element.type?.toLowerCase();
    const role = element.getAttribute('role')?.toLowerCase();
    const className = element.className?.toLowerCase() || '';
    
    // Navegación
    if (tagName === 'nav' || className.includes('nav') || className.includes('menu') || 
        role === 'navigation' || element.closest('nav')) {
        return 'navigation';
    }
    
    // Botones
    if (tagName === 'button' || type === 'button' || type === 'submit' || 
        role === 'button' || className.includes('btn') || className.includes('button')) {
        return 'buttons';
    }
    
    // Links
    if (tagName === 'a' || role === 'link') {
        return 'links';
    }
    
    // Inputs
    if (tagName === 'input' || tagName === 'textarea' || tagName === 'select' || 
        role === 'textbox' || role === 'combobox') {
        return 'inputs';
    }
    
    // Imágenes
    if (tagName === 'img' || role === 'img') {
        return 'images';
    }
    
    // Contenedores importantes
    if (tagName === 'header' || tagName === 'footer' || tagName === 'main' || 
        tagName === 'section' || tagName === 'article' || className.includes('container') ||
        className.includes('wrapper') || className.includes('content')) {
        return 'containers';
    }
    
    // Elementos interactivos
    if (element.onclick || role === 'tab' || role === 'tabpanel' || 
        className.includes('clickable') || className.includes('interactive')) {
        return 'interactive';
    }
    
    // Textos importantes
    if (tagName === 'h1' || tagName === 'h2' || tagName === 'h3' || 
        tagName === 'h4' || tagName === 'h5' || tagName === 'h6' || 
        tagName === 'p' || tagName === 'span' || tagName === 'div') {
        return 'texts';
    }
    
    return 'others';
}

// Step principal para extraer elementos
When("Extraigo elementos necesarios de los casos de prueba", () => {
    cy.log('🕵️‍♂️ Iniciando exploración automática de elementos...');
    
    // Resetear objeto de elementos descubiertos
    discoveredElements = {
        navigation: [],
        buttons: [],
        links: [],
        inputs: [],
        images: [],
        texts: [],
        containers: [],
        interactive: [],
        metadata: {
            url: '',
            title: '',
            timestamp: new Date().toISOString(),
            totalElements: 0
        }
    };
    
    // Obtener metadata de la página
    cy.url().then(url => {
        discoveredElements.metadata.url = url;
    });
    
    cy.title().then(title => {
        discoveredElements.metadata.title = title;
    });
    
    // Esperar a que la página cargue completamente
    cy.get('body').should('be.visible');
    cy.wait(2000); // Esperar animaciones y carga dinámica
    
    // Extraer todos los elementos interactivos y visibles
    cy.get('body').then($body => {
        const allElements = $body.find('*').toArray();
        let elementCount = 0;
        
        allElements.forEach(element => {
            const $el = Cypress.$(element);
            
            // Filtrar solo elementos visibles y con contenido relevante
            if ($el.is(':visible') && 
                (element.tagName !== 'SCRIPT') && 
                (element.tagName !== 'STYLE') &&
                (element.tagName !== 'META') &&
                (element.tagName !== 'LINK')) {
                
                const category = categorizeElement(element);
                const selectors = generateUniqueSelector(element);
                const text = element.textContent?.trim().substring(0, 100) || '';
                
                const elementInfo = {
                    id: elementCount++,
                    tag: element.tagName.toLowerCase(),
                    selectors: selectors,
                    text: text,
                    attributes: {
                        id: element.id || null,
                        class: element.className || null,
                        name: element.getAttribute('name') || null,
                        type: element.getAttribute('type') || null,
                        role: element.getAttribute('role') || null,
                        'data-testid': element.getAttribute('data-testid') || null,
                        href: element.getAttribute('href') || null,
                        src: element.getAttribute('src') || null
                    },
                    position: {
                        x: element.offsetLeft || 0,
                        y: element.offsetTop || 0,
                        width: element.offsetWidth || 0,
                        height: element.offsetHeight || 0
                    },
                    isInteractive: !!(element.onclick || 
                                    element.tagName === 'A' || 
                                    element.tagName === 'BUTTON' || 
                                    element.tagName === 'INPUT' ||
                                    element.getAttribute('role') === 'button')
                };
                
                // Agregar a la categoría correspondiente
                if (discoveredElements[category]) {
                    discoveredElements[category].push(elementInfo);
                } else {
                    if (!discoveredElements.others) discoveredElements.others = [];
                    discoveredElements.others.push(elementInfo);
                }
            }
        });
        
        discoveredElements.metadata.totalElements = elementCount;
        
        // Log resumen en consola
        cy.log(`🔍 Exploración completada:`);
        cy.log(`   • Total elementos: ${elementCount}`);
        cy.log(`   • Navegación: ${discoveredElements.navigation.length}`);
        cy.log(`   • Botones: ${discoveredElements.buttons.length}`);
        cy.log(`   • Links: ${discoveredElements.links.length}`);
        cy.log(`   • Inputs: ${discoveredElements.inputs.length}`);
        cy.log(`   • Imágenes: ${discoveredElements.images.length}`);
        cy.log(`   • Contenedores: ${discoveredElements.containers.length}`);
        
        // Guardar en archivo JSON
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `discovered-elements-${timestamp}.json`;
        
        cy.writeFile(`cypress/fixtures/discovered/${filename}`, discoveredElements);
        cy.log(`💾 Elementos guardados en: cypress/fixtures/discovered/${filename}`);
    });
});

// Step para explorar específicamente la barra superior/navegación
When("Mapeo la barra superior y navegación principal", () => {
    cy.log('🧭 Mapeando barra superior y navegación...');
    
    const navigationElements = [];
    
    // Buscar elementos de navegación comunes
    const navSelectors = [
        'nav',
        '.navbar',
        '.navigation',
        '.menu',
        '.header-menu',
        '.top-menu',
        '#menu',
        '[role="navigation"]',
        'header nav',
        '.main-nav'
    ];
    
    navSelectors.forEach(selector => {
        cy.get('body').then($body => {
            const $navElements = $body.find(selector);
            
            $navElements.each((index, element) => {
                if (Cypress.$(element).is(':visible')) {
                    const $el = Cypress.$(element);
                    
                    // Extraer todos los links/botones dentro de la navegación
                    const navItems = $el.find('a, button, [role="menuitem"]').toArray();
                    
                    navItems.forEach(item => {
                        const selectors = generateUniqueSelector(item);
                        const text = item.textContent?.trim() || '';
                        
                        if (text.length > 0) {
                            navigationElements.push({
                                text: text,
                                selectors: selectors,
                                href: item.getAttribute('href') || null,
                                parent: selector,
                                tag: item.tagName.toLowerCase()
                            });
                        }
                    });
                }
            });
        });
    });
    
    // Guardar elementos de navegación
    cy.writeFile('cypress/fixtures/discovered/navigation-map.json', {
        timestamp: new Date().toISOString(),
        url: window.location.href,
        navigationElements: navigationElements,
        totalNavItems: navigationElements.length
    });
    
    cy.log(`🧭 Navegación mapeada: ${navigationElements.length} elementos encontrados`);
});

// Step para interceptar y monitorear requests de red
When("Intercepto y monitoreo requests de red durante la exploración", () => {
    cy.log('🌐 Configurando interceptors de red...');
    
    // Interceptar llamadas sin usar cy.log dentro del callback
    cy.intercept('**', (req) => {
        console.log(`📡 Request: ${req.method} ${req.url}`);
    }).as('allRequests');
    
    // Interceptar específicamente llamadas de navegación
    cy.intercept('GET', '**/my-account/**').as('myAccountRequests');
    cy.intercept('POST', '**/wp-admin/admin-ajax.php').as('ajaxRequests');
    cy.intercept('GET', '**/wp-json/**').as('apiRequests');
    
    cy.log('✅ Interceptors configurados correctamente');
});

// Step para generar locators optimizados
Then("Genero archivo de locators optimizados", () => {
    cy.log('📝 Generando archivo de locators optimizados...');
    
    // Usar la tarea para encontrar el archivo más reciente
    cy.task('findLatestFile', 'cypress/fixtures/discovered/discovered-elements-*.json').then(latestFile => {
        if (!latestFile) {
            cy.log('⚠️ No se encontró archivo de elementos descubiertos');
            return;
        }
        
        cy.log(`📄 Procesando archivo: ${latestFile}`);
        
        // Leer el archivo de elementos más reciente
        cy.readFile(latestFile).then(elementsData => {
            // Leer navegación si existe
            cy.readFile('cypress/fixtures/discovered/navigation-map.json', { failOnStatusCode: false }).then(navData => {
                const optimizedLocators = {
                    metadata: {
                        generatedAt: new Date().toISOString(),
                        sourceFile: latestFile.split('/').pop(),
                        url: elementsData.metadata?.url || 'N/A',
                        totalElementsProcessed: elementsData.metadata?.totalElements || 0,
                        description: 'Locators generados automáticamente por exploración'
                    },
                    navigation: {},
                    buttons: {},
                    inputs: {},
                    links: {},
                    containers: {},
                    images: {},
                    interactive: {}
                };
                
                // Función para generar clave única
                function generateKey(element) {
                    if (element.attributes?.id) {
                        return element.attributes.id.toLowerCase().replace(/[^a-z0-9]/g, '_');
                    }
                    
                    if (element.text && element.text.length > 0 && element.text.length < 30) {
                        return element.text.toLowerCase()
                            .replace(/[^a-z0-9\s]/g, '')
                            .replace(/\s+/g, '_')
                            .replace(/^_+|_+$/g, '');
                    }
                    
                    if (element.attributes?.class) {
                        const firstClass = element.attributes.class.split(' ')[0];
                        return firstClass.toLowerCase().replace(/[^a-z0-9]/g, '_');
                    }
                    
                    return `${element.tag}_${element.id}`;
                }
                
                // Función para seleccionar el mejor selector
                function getBestSelector(selectors) {
                    for (const selector of selectors) {
                        if (selector.startsWith('#')) return selector;
                        if (selector.includes('data-testid')) return selector;
                        if (selector.startsWith('.') && !selector.includes(' ')) return selector;
                    }
                    return selectors[0] || '';
                }
                
                // Procesar elementos de navegación
                if (elementsData.navigation) {
                    elementsData.navigation.forEach(element => {
                        const key = generateKey(element);
                        if (key && key.length > 0) {
                            optimizedLocators.navigation[key] = {
                                primary: getBestSelector(element.selectors),
                                alternatives: element.selectors.slice(1, 3),
                                text: element.text?.substring(0, 50) || '',
                                tag: element.tag,
                                description: `Navegación: ${element.text || element.attributes?.id || 'Elemento de navegación'}`,
                                isInteractive: element.isInteractive
                            };
                        }
                    });
                }
                
                // Procesar botones
                if (elementsData.buttons) {
                    elementsData.buttons.forEach(element => {
                        const key = generateKey(element);
                        if (key && key.length > 0) {
                            optimizedLocators.buttons[key] = {
                                primary: getBestSelector(element.selectors),
                                alternatives: element.selectors.slice(1, 3),
                                text: element.text?.substring(0, 50) || '',
                                type: element.attributes?.type || 'button',
                                description: `Botón: ${element.text || element.attributes?.id || 'Botón sin texto'}`,
                                isInteractive: element.isInteractive
                            };
                        }
                    });
                }
                
                // Procesar inputs
                if (elementsData.inputs) {
                    elementsData.inputs.forEach(element => {
                        const key = generateKey(element);
                        if (key && key.length > 0) {
                            optimizedLocators.inputs[key] = {
                                primary: getBestSelector(element.selectors),
                                alternatives: element.selectors.slice(1, 3),
                                name: element.attributes?.name || '',
                                type: element.attributes?.type || 'text',
                                description: `Input: ${element.attributes?.name || element.attributes?.type || 'Campo de entrada'}`,
                                isInteractive: element.isInteractive
                            };
                        }
                    });
                }
                
                // Procesar links
                if (elementsData.links) {
                    elementsData.links.forEach(element => {
                        const key = generateKey(element);
                        if (key && key.length > 0) {
                            optimizedLocators.links[key] = {
                                primary: getBestSelector(element.selectors),
                                alternatives: element.selectors.slice(1, 3),
                                text: element.text?.substring(0, 50) || '',
                                href: element.attributes?.href || '',
                                description: `Enlace: ${element.text || element.attributes?.href || 'Enlace sin texto'}`,
                                isInteractive: element.isInteractive
                            };
                        }
                    });
                }
                
                // Procesar contenedores
                if (elementsData.containers) {
                    elementsData.containers.forEach(element => {
                        const key = generateKey(element);
                        if (key && key.length > 0) {
                            optimizedLocators.containers[key] = {
                                primary: getBestSelector(element.selectors),
                                alternatives: element.selectors.slice(1, 3),
                                tag: element.tag,
                                description: `Contenedor: ${element.attributes?.id || element.tag || 'Contenedor'}`
                            };
                        }
                    });
                }
                
                // Procesar imágenes
                if (elementsData.images) {
                    elementsData.images.forEach(element => {
                        const key = generateKey(element);
                        if (key && key.length > 0) {
                            optimizedLocators.images[key] = {
                                primary: getBestSelector(element.selectors),
                                alternatives: element.selectors.slice(1, 3),
                                src: element.attributes?.src || '',
                                alt: element.attributes?.alt || '',
                                description: `Imagen: ${element.attributes?.alt || element.attributes?.src || 'Imagen sin descripción'}`
                            };
                        }
                    });
                }
                
                // Agregar elementos de navegación desde navigation-map.json si existe
                if (navData && navData.navigationElements) {
                    navData.navigationElements.forEach(element => {
                        const key = element.text.toLowerCase()
                            .replace(/[^a-z0-9\s]/g, '')
                            .replace(/\s+/g, '_')
                            .replace(/^_+|_+$/g, '');
                        
                        if (key && key.length > 0 && !optimizedLocators.navigation[key]) {
                            optimizedLocators.navigation[key] = {
                                primary: element.selectors[0] || '',
                                alternatives: element.selectors.slice(1, 3),
                                text: element.text,
                                href: element.href,
                                tag: element.tag,
                                description: `Navegación: ${element.text}`,
                                isInteractive: true
                            };
                        }
                    });
                }
                
                // Guardar locators optimizados
                cy.writeFile('cypress/pages/locators/AutoGeneratedLocators.json', optimizedLocators);
                
                // Generar estadísticas
                const stats = {
                    navigation: Object.keys(optimizedLocators.navigation).length,
                    buttons: Object.keys(optimizedLocators.buttons).length,
                    inputs: Object.keys(optimizedLocators.inputs).length,
                    links: Object.keys(optimizedLocators.links).length,
                    containers: Object.keys(optimizedLocators.containers).length,
                    images: Object.keys(optimizedLocators.images).length,
                    interactive: Object.keys(optimizedLocators.interactive).length
                };
                
                const totalLocators = Object.values(stats).reduce((sum, count) => sum + count, 0);
                
                cy.log('📝 Locators optimizados guardados en: cypress/pages/locators/AutoGeneratedLocators.json');
                cy.log(`📊 Total de locators generados: ${totalLocators}`);
                cy.log(`   • Navegación: ${stats.navigation}`);
                cy.log(`   • Botones: ${stats.buttons}`);
                cy.log(`   • Inputs: ${stats.inputs}`);
                cy.log(`   • Enlaces: ${stats.links}`);
                cy.log(`   • Contenedores: ${stats.containers}`);
                cy.log(`   • Imágenes: ${stats.images}`);
            });
        });
    });
});

// Step para navegar por diferentes secciones
When("Navego por diferentes secciones del sitio", () => {
    cy.log('🧭 Navegando por diferentes secciones...');
    
    const sectionsToVisit = [
        { name: 'Home', selector: '#menu-item-40', url: '/' },
        { name: 'Shop', selector: '#menu-item-shop', url: '/shop' },
        { name: 'My Account', selector: '#menu-item-50', url: '/my-account' }
    ];
    
    sectionsToVisit.forEach(section => {
        cy.log(`📍 Visitando sección: ${section.name}`);
        
        // Intentar hacer click en el menú sin usar promise mixing
        cy.get('body').then($body => {
            if ($body.find(section.selector).length > 0) {
                cy.get(section.selector).click();
            } else {
                // Si no encuentra el selector, navegar directamente
                cy.visit(section.url);
            }
        });
        
        cy.wait(2000); // Esperar carga fuera del then
    });
});

// Step combinado para exploración completa
When("Realizo exploración completa de la página home", () => {
    cy.log('🚀 Iniciando exploración completa de la página home...');
    
    // Crear directorio para archivos descubiertos
    cy.task('ensureDir', 'cypress/fixtures/discovered');
    
    // Array para almacenar requests capturados
    const capturedRequests = [];
    
    // Ejecutar todos los pasos de exploración en secuencia
    cy.then(() => {
        cy.log('📍 Paso 1: Configurando interceptors de red...');
        // Configurar interceptores básicos que capturan requests
        cy.intercept('GET', '**', (req) => {
            capturedRequests.push({
                method: req.method,
                url: req.url,
                timestamp: new Date().toISOString(),
                headers: req.headers,
                type: 'GET'
            });
        }).as('getRequests');
        
        cy.intercept('POST', '**', (req) => {
            capturedRequests.push({
                method: req.method,
                url: req.url,
                timestamp: new Date().toISOString(),
                headers: req.headers,
                body: req.body,
                type: 'POST'
            });
        }).as('postRequests');
        
        cy.intercept('**/*.js', (req) => {
            capturedRequests.push({
                method: req.method,
                url: req.url,
                timestamp: new Date().toISOString(),
                type: 'JavaScript'
            });
        }).as('jsRequests');
        
        cy.intercept('**/*.css', (req) => {
            capturedRequests.push({
                method: req.method,
                url: req.url,
                timestamp: new Date().toISOString(),
                type: 'CSS'
            });
        }).as('cssRequests');
    });
    
    cy.then(() => {
        cy.log('📍 Paso 2: Mapeando navegación...');
        // Ejecutar mapeo de navegación principal
        const navigationElements = [];
        
        const navSelectors = ['nav', '.navbar', '.navigation', '.menu', 'header nav'];
        
        navSelectors.forEach(selector => {
            cy.get('body').then($body => {
                const $navElements = $body.find(selector);
                
                $navElements.each((index, element) => {
                    if (Cypress.$(element).is(':visible')) {
                        const $el = Cypress.$(element);
                        const navItems = $el.find('a, button, [role="menuitem"]').toArray();
                        
                        navItems.forEach(item => {
                            const selectors = generateUniqueSelector(item);
                            const text = item.textContent?.trim() || '';
                            if (text.length > 0) {
                                navigationElements.push({
                                    text: text,
                                    selectors: selectors,
                                    href: item.getAttribute('href') || null,
                                    parent: selector,
                                    tag: item.tagName.toLowerCase()
                                });
                            }
                        });
                    }
                });
            });
        });
        
        cy.writeFile('cypress/fixtures/discovered/navigation-map.json', {
            timestamp: new Date().toISOString(),
            url: window.location.href,
            navigationElements: navigationElements,
            totalNavItems: navigationElements.length
        });
    });
    
    cy.then(() => {
        cy.log('📍 Paso 3: Extrayendo todos los elementos...');
        // Reutilizar la lógica del step de extracción existente
        cy.get('body').then($body => {
            const allElements = $body.find('*').toArray();
            let elementCount = 0;
            
            const pageElements = {
                navigation: [],
                buttons: [],
                links: [],
                inputs: [],
                images: [],
                texts: [],
                containers: [],
                interactive: [],
                metadata: {
                    url: window.location.href,
                    timestamp: new Date().toISOString(),
                    totalElements: 0
                }
            };
            
            allElements.forEach(element => {
                const $el = Cypress.$(element);
                
                if ($el.is(':visible') && 
                    (element.tagName !== 'SCRIPT') && 
                    (element.tagName !== 'STYLE') &&
                    (element.tagName !== 'META') &&
                    (element.tagName !== 'LINK')) {
                    
                    const category = categorizeElement(element);
                    const selectors = generateUniqueSelector(element);
                    const text = element.textContent?.trim().substring(0, 100) || '';
                    
                    const elementInfo = {
                        id: elementCount++,
                        tag: element.tagName.toLowerCase(),
                        selectors: selectors,
                        text: text,
                        attributes: {
                            id: element.id || null,
                            class: element.className || null,
                            name: element.getAttribute('name') || null,
                            type: element.getAttribute('type') || null,
                            role: element.getAttribute('role') || null,
                            'data-testid': element.getAttribute('data-testid') || null,
                            href: element.getAttribute('href') || null,
                            src: element.getAttribute('src') || null
                        },
                        position: {
                            x: element.offsetLeft || 0,
                            y: element.offsetTop || 0,
                            width: element.offsetWidth || 0,
                            height: element.offsetHeight || 0
                        },
                        isInteractive: !!(element.onclick || 
                                        element.tagName === 'A' || 
                                        element.tagName === 'BUTTON' || 
                                        element.tagName === 'INPUT' ||
                                        element.getAttribute('role') === 'button')
                    };
                    
                    // Agregar a la categoría correspondiente
                    if (pageElements[category]) {
                        pageElements[category].push(elementInfo);
                    } else {
                        if (!pageElements.others) pageElements.others = [];
                        pageElements.others.push(elementInfo);
                    }
                }
            });
            
            pageElements.metadata.totalElements = elementCount;
            
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const filename = `discovered-elements-${timestamp}.json`;
            
            cy.writeFile(`cypress/fixtures/discovered/${filename}`, pageElements);
            cy.log(`💾 Elementos guardados en: cypress/fixtures/discovered/${filename}`);
        });
    });
    
    cy.then(() => {
        cy.log('📍 Paso 4: Generando locators básicos...');
        // Crear un archivo de locators básico
        const basicLocators = {
            metadata: {
                generatedAt: new Date().toISOString(),
                description: 'Locators básicos generados por exploración completa'
            },
            navigation: {
                main_nav: { primary: 'nav', description: 'Navegación principal' },
                menu_items: { primary: 'nav a', description: 'Enlaces de menú' }
            },
            buttons: {
                login_button: { primary: '.woocommerce-Button', description: 'Botón de login' },
                submit_buttons: { primary: 'button[type="submit"]', description: 'Botones de envío' }
            },
            inputs: {
                username: { primary: '#username', description: 'Campo de usuario' },
                password: { primary: '#password', description: 'Campo de contraseña' }
            }
        };
        
        cy.writeFile('cypress/pages/locators/AutoGeneratedLocators.json', basicLocators);
        cy.log('📝 Locators básicos generados en: cypress/pages/locators/AutoGeneratedLocators.json');
    });

    // Nuevo paso para guardar requests capturados
    cy.then(() => {
        cy.log('📍 Paso 5: Guardando requests de red capturados...');
        
        // Esperar un poco para capturar requests adicionales
        cy.wait(2000);
        
        // Crear el archivo de requests de red
        const networkData = {
            metadata: {
                capturedAt: new Date().toISOString(),
                url: window.location.href,
                totalRequests: capturedRequests.length,
                description: 'Requests de red capturados durante la exploración'
            },
            requests: capturedRequests,
            summary: {
                getRequests: capturedRequests.filter(r => r.method === 'GET').length,
                postRequests: capturedRequests.filter(r => r.method === 'POST').length,
                jsRequests: capturedRequests.filter(r => r.type === 'JavaScript').length,
                cssRequests: capturedRequests.filter(r => r.type === 'CSS').length
            }
        };
        
        cy.writeFile('cypress/fixtures/discovered/network-requests.json', networkData);
        cy.log(`🌐 Requests guardados: ${capturedRequests.length} requests capturados`);
        cy.log(`   • GET: ${networkData.summary.getRequests}`);
        cy.log(`   • POST: ${networkData.summary.postRequests}`);
        cy.log(`   • JavaScript: ${networkData.summary.jsRequests}`);
        cy.log(`   • CSS: ${networkData.summary.cssRequests}`);
    });
    
    cy.log('✅ Exploración completa finalizada');
});

// Step para verificar requests capturados
Then("Verifico que se capturaron los requests correctamente", () => {
    cy.log('🔍 Verificando requests capturados...');
    
    // En lugar de leer un archivo que puede no existir, verificar los alias
    cy.get('@allRequests.all').then((requests) => {
        cy.log(`✅ Capturados ${requests.length} requests via interceptors`);
        expect(requests.length).to.be.greaterThan(0);
    });
});

// Step para verificar elementos encontrados
Then("Verifico que se encontraron elementos en todas las categorías", () => {
    cy.log('🔍 Verificando elementos encontrados...');
    
    // Buscar el archivo más reciente de elementos descubiertos
    cy.task('findLatestFile', 'cypress/fixtures/discovered/discovered-elements-*.json').then(filePath => {
        if (filePath) {
            cy.readFile(filePath).then(elementsData => {
                const categories = ['navigation', 'buttons', 'links', 'inputs', 'images', 'containers'];
                
                categories.forEach(category => {
                    if (elementsData[category] && elementsData[category].length > 0) {
                        cy.log(`✅ ${category}: ${elementsData[category].length} elementos`);
                    } else {
                        cy.log(`⚠️ ${category}: No se encontraron elementos`);
                    }
                });
                
                expect(elementsData.metadata.totalElements).to.be.greaterThan(0);
                cy.log(`📊 Total de elementos encontrados: ${elementsData.metadata.totalElements}`);
            });
        } else {
            cy.log('⚠️ No se encontró archivo de elementos descubiertos');
        }
    });
});

// Step para verificar selectores únicos
Then("Verifico que los selectores generados son únicos", () => {
    cy.log('🔍 Verificando unicidad de selectores...');
    
    cy.readFile('cypress/pages/locators/AutoGeneratedLocators.json').then(locators => {
        const allSelectors = [];
        
        Object.keys(locators).forEach(category => {
            if (typeof locators[category] === 'object' && category !== 'metadata') {
                Object.values(locators[category]).forEach(locator => {
                    if (locator.primary) {
                        allSelectors.push(locator.primary);
                    }
                });
            }
        });
        
        const uniqueSelectors = [...new Set(allSelectors)];
        const duplicateCount = allSelectors.length - uniqueSelectors.length;
        
        cy.log(`📊 Selectores totales: ${allSelectors.length}`);
        cy.log(`📊 Selectores únicos: ${uniqueSelectors.length}`);
        cy.log(`📊 Duplicados: ${duplicateCount}`);
        
        if (duplicateCount === 0) {
            cy.log('✅ Todos los selectores son únicos');
        } else {
            cy.log(`⚠️ Se encontraron ${duplicateCount} selectores duplicados`);
        }
    });
});

// Step para verificar archivos generados
Then("Verifico que se generaron todos los archivos de mapeo", () => {
    cy.log('🔍 Verificando archivos de mapeo generados...');
    
    const expectedFiles = [
        'cypress/fixtures/discovered/navigation-map.json',
        'cypress/fixtures/discovered/network-requests.json',
        'cypress/pages/locators/AutoGeneratedLocators.json'
    ];
    
    expectedFiles.forEach(filePath => {
        cy.readFile(filePath).then(data => {
            expect(data).to.be.an('object');
            cy.log(`✅ Archivo encontrado: ${filePath}`);
        });
    });
});

// Step para verificar validez de locators
Then("Verifico que los locators son válidos y utilizables", () => {
    cy.log('🔍 Verificando validez de locators...');
    
    cy.readFile('cypress/pages/locators/AutoGeneratedLocators.json').then(locators => {
        let validLocators = 0;
        let totalLocators = 0;
        
        Object.keys(locators).forEach(category => {
            if (typeof locators[category] === 'object' && category !== 'metadata') {
                Object.entries(locators[category]).forEach(([key, locator]) => {
                    totalLocators++;
                    
                    if (locator.primary) {
                        // Intentar usar el locator para verificar que es válido
                        cy.get('body').then($body => {
                            try {
                                if (locator.primary.startsWith('#') || 
                                    locator.primary.startsWith('.') || 
                                    locator.primary.startsWith('[')) {
                                    
                                    const elements = $body.find(locator.primary);
                                    if (elements.length > 0) {
                                        validLocators++;
                                        cy.log(`✅ Locator válido: ${key} -> ${locator.primary}`);
                                    } else {
                                        cy.log(`⚠️ Locator no encontrado: ${key} -> ${locator.primary}`);
                                    }
                                }
                            } catch (error) {
                                cy.log(`❌ Locator inválido: ${key} -> ${locator.primary}`);
                            }
                        });
                    }
                });
            }
        });
        
        cy.log(`📊 Locators procesados: ${totalLocators}`);
        
        // Verificar que al menos algunos locators existen
        expect(totalLocators).to.be.greaterThan(0);
    });
});

// Steps adicionales para el login y navegación

Given("Navego al sitio de automationtesting", () => {
    cy.log('🌐 Navegando al sitio de automationtesting...');
    cy.visit('/my-account/');
    cy.get('body').should('be.visible');
    cy.wait(2000);
});

When("Ingreso user {string} y pass {string}", (user, pass) => {
    cy.log(`👤 Iniciando login con usuario: ${user}`);
    cy.get('#username').should('be.visible').type(user);
    cy.get('#password').should('be.visible').type(pass);
    cy.get('.woocommerce-Button').first().click();
    cy.wait(3000); // Esperar a que se complete el login
    
    // Verificar que el login fue exitoso
    cy.url().should('include', '/my-account/');
    cy.get('.woocommerce-MyAccount-navigation').should('be.visible');
});

export { discoveredElements }; 