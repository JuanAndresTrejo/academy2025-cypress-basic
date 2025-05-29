/**
 * 🚀 CYPRESS COMMANDS - Integración de Scripts de Procesamiento
 * 
 * Comandos que permiten usar los scripts de análisis directamente
 * en los flujos BDD Cucumber para casuística dinámica
 */

// ============================================================================
// COMANDOS DE SCRAPING Y ANÁLISIS
// ============================================================================

/**
 * Comando para mapear elementos de página y generar locators dinámicamente
 */
Cypress.Commands.add('mapPageElements', (options = {}) => {
    const { 
        includeNavigation = true, 
        includeButtons = true, 
        includeInputs = true,
        saveToFile = false 
    } = options;
    
    cy.window().then((win) => {
        const elements = {
            metadata: {
                url: win.location.href,
                timestamp: new Date().toISOString(),
                totalElements: 0
            },
            navigation: [],
            buttons: [],
            inputs: [],
            links: [],
            containers: []
        };
        
        // Mapear navegación
        if (includeNavigation) {
            cy.get('nav, .nav, .navbar, .navigation, header').then($nav => {
                $nav.each((index, nav) => {
                    const navElements = Cypress.$(nav).find('a, button, [role="button"]');
                    navElements.each((i, el) => {
                        const element = {
                            text: Cypress.$(el).text().trim(),
                            href: Cypress.$(el).attr('href'),
                            tag: el.tagName.toLowerCase(),
                            selectors: [
                                el.id ? `#${el.id}` : null,
                                el.className ? `.${el.className.split(' ')[0]}` : null,
                                `${el.tagName.toLowerCase()}:contains('${Cypress.$(el).text().trim()}')`
                            ].filter(Boolean),
                            isInteractive: true,
                            position: { x: el.offsetLeft, y: el.offsetTop }
                        };
                        elements.navigation.push(element);
                    });
                });
            });
        }
        
        // Mapear botones
        if (includeButtons) {
            cy.get('button, input[type="button"], input[type="submit"], .btn').then($buttons => {
                $buttons.each((index, btn) => {
                    const element = {
                        text: Cypress.$(btn).text().trim() || Cypress.$(btn).val(),
                        tag: btn.tagName.toLowerCase(),
                        type: Cypress.$(btn).attr('type'),
                        selectors: [
                            btn.id ? `#${btn.id}` : null,
                            btn.className ? `.${btn.className.split(' ')[0]}` : null,
                            `${btn.tagName.toLowerCase()}[type="${Cypress.$(btn).attr('type')}"]`
                        ].filter(Boolean),
                        isInteractive: true
                    };
                    elements.buttons.push(element);
                });
            });
        }
        
        // Mapear inputs
        if (includeInputs) {
            cy.get('input:not([type="button"]):not([type="submit"]), textarea, select').then($inputs => {
                $inputs.each((index, input) => {
                    const element = {
                        name: Cypress.$(input).attr('name'),
                        type: Cypress.$(input).attr('type') || 'text',
                        placeholder: Cypress.$(input).attr('placeholder'),
                        tag: input.tagName.toLowerCase(),
                        selectors: [
                            input.id ? `#${input.id}` : null,
                            input.name ? `[name="${input.name}"]` : null,
                            input.className ? `.${input.className.split(' ')[0]}` : null
                        ].filter(Boolean),
                        isInteractive: true
                    };
                    elements.inputs.push(element);
                });
            });
        }
        
        // Calcular total
        elements.metadata.totalElements = 
            elements.navigation.length + 
            elements.buttons.length + 
            elements.inputs.length;
        
        // Guardar en alias para uso posterior
        cy.wrap(elements).as('discoveredElements');
        
        // Guardar archivo si se solicita
        if (saveToFile) {
            cy.task('saveDiscoveredElements', elements);
        }
        
        cy.log(`📊 Elementos mapeados: ${elements.metadata.totalElements}`);
        cy.log(`🧭 Navegación: ${elements.navigation.length}`);
        cy.log(`🔘 Botones: ${elements.buttons.length}`);
        cy.log(`📝 Inputs: ${elements.inputs.length}`);
        
        return cy.wrap(elements);
    });
});

/**
 * Comando para generar steps dinámicamente basados en elementos descubiertos
 */
Cypress.Commands.add('generateDynamicSteps', (testCases, options = {}) => {
    cy.get('@discoveredElements').then((elements) => {
        // Crear steps dinámicos basados en elementos encontrados
        const dynamicSteps = [];
        
        // Generar steps de navegación
        elements.navigation.forEach(nav => {
            if (nav.text && nav.text.length > 0) {
                dynamicSteps.push(`When hago click en "${nav.text}"`);
                dynamicSteps.push(`Then verifico que navego a la sección "${nav.text}"`);
            }
        });
        
        // Generar steps de formularios
        elements.inputs.forEach(input => {
            if (input.name) {
                dynamicSteps.push(`When lleno el campo "${input.name}" con "{string}"`);
                dynamicSteps.push(`Then verifico que el campo "${input.name}" contiene el valor esperado`);
            }
        });
        
        // Generar steps de botones
        elements.buttons.forEach(btn => {
            if (btn.text && btn.text.length > 0) {
                dynamicSteps.push(`When hago click en el botón "${btn.text}"`);
                dynamicSteps.push(`Then verifico que el botón "${btn.text}" ejecuta la acción esperada`);
            }
        });
        
        cy.wrap(dynamicSteps).as('generatedSteps');
        cy.log(`🧠 Steps generados dinámicamente: ${dynamicSteps.length}`);
        
        return cy.wrap(dynamicSteps);
    });
});

/**
 * Comando para validar que los elementos mapeados funcionan correctamente
 */
Cypress.Commands.add('validateMappedElements', () => {
    cy.get('@discoveredElements').then((elements) => {
        let validElements = 0;
        let invalidElements = 0;
        
        // Validar navegación (simulado)
        elements.navigation.forEach(nav => {
            if (nav.selectors && nav.selectors.length > 0) {
                validElements++;
            } else {
                invalidElements++;
            }
        });
        
        cy.log(`✅ Elementos válidos: ${validElements}`);
        cy.log(`❌ Elementos inválidos: ${invalidElements}`);
        
        return cy.wrap({ valid: validElements, invalid: invalidElements });
    });
});

/**
 * Comando para simular extracción de casos de test
 */
Cypress.Commands.add('extractTestCasesToBDD', (selector = 'body') => {
    // Simular extracción de casos
    const mockSections = {
        "Home Page": [
            {
                titulo: "Home Page with three Sliders only",
                pasos: [
                    "Given navego a la sección \"Home Page\"",
                    "When ejecuto el caso \"Home Page with three Sliders only\"",
                    "Then verifico que el resultado es el esperado"
                ],
                seccion: "Home Page"
            }
        ],
        "Shop": [
            {
                titulo: "Filter by price functionality",
                pasos: [
                    "Given navego a la sección \"Shop\"",
                    "When ejecuto el caso \"Filter by price functionality\"",
                    "Then verifico que el resultado es el esperado"
                ],
                seccion: "Shop"
            }
        ]
    };
    
    cy.wrap(mockSections).as('extractedTestCases');
    cy.task('saveBDDTestCases', mockSections);
    
    const totalCases = Object.values(mockSections).reduce((sum, cases) => sum + cases.length, 0);
    cy.log(`📋 Casos extraídos (simulados): ${totalCases} en ${Object.keys(mockSections).length} secciones`);
    
    return cy.wrap(mockSections);
});

/**
 * Comando para generar feature file dinámicamente
 */
Cypress.Commands.add('generateDynamicFeature', (sectionName, testCases, options = {}) => {
    const { language = 'es', includeBackground = true } = options;
    
    const featureContent = `# language: ${language}
@dynamic @auto-generated
Característica: ${sectionName} - Casos dinámicos
  Como usuario del sistema
  Quiero ejecutar casos de prueba generados dinámicamente
  Para verificar funcionalidad de ${sectionName}

${includeBackground ? `  Antecedentes:
    Dado que navego al sitio web
    Y espero que la página esté cargada` : ''}

${testCases.map((testCase, index) => `  @caso-${index + 1}
  Escenario: ${testCase.titulo}
${testCase.pasos.map(paso => `    ${paso}`).join('\n')}`).join('\n\n')}
`;

    cy.task('saveDynamicFeature', {
        sectionName: sectionName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        content: featureContent
    });
    
    cy.wrap(featureContent).as('dynamicFeature');
    cy.log(`📄 Feature dinámico generado para: ${sectionName}`);
    
    return cy.wrap(featureContent);
});

/**
 * Comando para ejecutar flujo completo de análisis + generación
 */
Cypress.Commands.add('runFullAnalysisFlow', (options = {}) => {
    const { 
        mapElements = true,
        extractCases = true, 
        generateSteps = true,
        generateFeature = true,
        saveToDisk = true 
    } = options;
    
    cy.log('🚀 Iniciando flujo completo de análisis...');
    
    if (mapElements) {
        cy.mapPageElements({ saveToFile: saveToDisk });
    }
    
    if (extractCases) {
        cy.extractTestCasesToBDD();
    }
    
    if (generateSteps) {
        cy.get('@extractedTestCases').then((testCases) => {
            Object.entries(testCases).forEach(([section, cases]) => {
                if (generateFeature) {
                    cy.generateDynamicFeature(section, cases);
                }
            });
        });
    }
    
    cy.log('✅ Flujo completo de análisis completado');
});

/**
 * Comando para ejecutar el procesador unificado
 */
Cypress.Commands.add('runUnifiedProcessor', (options = {}) => {
    cy.task('executeUnifiedProcessor', options).then((result) => {
        cy.wrap(result).as('processorResult');
        cy.log(`📊 Procesador unificado completado`);
        cy.log(`📝 Locators generados: ${result.locatorsGenerated || 0}`);
        cy.log(`🏗️ Features creados: ${result.featuresCreated || 0}`);
        cy.log(`📄 Steps creados: ${result.stepsCreated || 0}`);
        
        return cy.wrap(result);
    });
});

export {};