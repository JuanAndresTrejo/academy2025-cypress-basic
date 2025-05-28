Feature: 02 - Crowdar Academy 2025 - Shop Store

    Background:
        Given Me logueo como usuario correctamente - shop demo
    @focus @shop @rangoPrecio @detalle
    Scenario: Buscar por rango de precio
        Given Ingreso user '<user>' y pass '<pass>' 
        When Ingreso al shop
        And Busco por rango de precio, de medio a mayor
        * Ingreso al rango de busqueda marcada
        Then Verifico que ingreso al rango de busqueda deseada

        Examples:
          | user                                            |   pass                |
          | academyCypress_usuarioNormal@crowdaronline.com  |   Crowdar.2025!       |

    @focus @shop @rangoPrecio @detalle
    Scenario: Interceptar Carrito de compras
        Given Ingreso user '<user>' y pass '<pass>' 
        When Ingreso al shop
        And Agrego 3 productos al carrito
        Then Verifico que se agregaron los productos al carrito correctamente 'Moved Permanently'

        Examples:
          | user                                            |   pass                |
          | academyCypress_usuarioNormal@crowdaronline.com  |   Crowdar.2025!       |

    @focus @shop @rangoPrecio @detalle
    Scenario: Vaciar Carrito de compras
        Given Ingreso user '<user>' y pass '<pass>' 
        When Ingreso al shop
        And Agrego 3 productos al carrito
        Then Verifico que se agregaron los productos al carrito correctamente 'Moved Permanently'
        And elimino productos seleccionados
        Then Verifico que no hay productos agregados

        Examples:
          | user                                            |   pass                |
          | academyCypress_usuarioNormal@crowdaronline.com  |   Crowdar.2025!       |