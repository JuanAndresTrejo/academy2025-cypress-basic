Feature: 02 - Crowdar Academy 2025 - Shop Store

    Background:
        Given Me logueo como usuario correctamente - shop demo
    @shop @rangoPrecio
    Scenario: Buscar por rango de precio
        Given Ingreso user '<user>' y pass '<pass>' 
        When Ingreso al shop
        And Busco por rango de precio, de medio a mayor
        * Ingreso al rango de busqueda marcada
        Then Verifico que ingreso al rango de busqueda deseada

        Examples:
          | user                                            |   pass                |
          | academyCypress_usuarioNormal@crowdaronline.com  |   Crowdar.2023!       |