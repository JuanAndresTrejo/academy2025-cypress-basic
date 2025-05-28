Feature: Exploración Automática de Elementos - Scraper Inteligente

    Como QA automatizador
    Quiero mapear automáticamente todos los elementos de la página
    Para generar locators optimizados y tener un inventario completo

    Background:
        Given  Navego al sitio de automationtesting
    
    @exploratory @scraper @mapping
    Scenario: Exploración completa de la página home con mapeo de elementos
        When Ingreso user '<user>' y pass '<pass>' 
        And Intercepto y monitoreo requests de red durante la exploración
        And Mapeo la barra superior y navegación principal
        And Extraigo elementos necesarios de los casos de prueba
        Then Genero archivo de locators optimizados

        Examples:
          | user                                            |   pass                |
          | academyCypress_usuarioNormal@crowdaronline.com  |   Crowdar.2025!       |

    @exploratory @navigation @quick
    Scenario: Mapeo rápido de navegación principal
        When Ingreso user '<user>' y pass '<pass>'
        When Mapeo la barra superior y navegación principal
        Then Genero archivo de locators optimizados

        Examples:
          | user                                            |   pass                |
          | academyCypress_usuarioNormal@crowdaronline.com  |   Crowdar.2025!       |

    @exploratory @network @monitoring
    Scenario: Monitoreo de requests de red
        When Ingreso user '<user>' y pass '<pass>'
        When Intercepto y monitoreo requests de red durante la exploración
        And Navego por diferentes secciones del sitio
        Then Verifico que se capturaron los requests correctamente

        Examples:
          | user                                            |   pass                |
          | academyCypress_usuarioNormal@crowdaronline.com  |   Crowdar.2025!       |

    @exploratory @elements @detailed
    Scenario: Extracción detallada de todos los elementos
        When Ingreso user '<user>' y pass '<pass>'
        When Extraigo elementos necesarios de los casos de prueba
        Then Verifico que se encontraron elementos en todas las categorías
        And Verifico que los selectores generados son únicos

        Examples:
          | user                                            |   pass                |
          | academyCypress_usuarioNormal@crowdaronline.com  |   Crowdar.2025!       |

    @exploratory @complete @full-scan
    Scenario: Exploración completa con todos los pasos
        When Ingreso user '<user>' y pass '<pass>'
        When Realizo exploración completa de la página home
        Then Verifico que se generaron todos los archivos de mapeo
        And Verifico que los locators son válidos y utilizables 

        Examples:
          | user                                            |   pass                |
          | academyCypress_usuarioNormal@crowdaronline.com  |   Crowdar.2025!       |
