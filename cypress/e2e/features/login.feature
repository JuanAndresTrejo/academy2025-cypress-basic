Feature: 01 - Crowdar Academy 2025 - Login
  @login
  Scenario: Login como admin
    Given  Me logueo como admin correctamente
  
  @login
  Scenario: Login como usuario normal
    Given  Me logueo como usuario correctamente
  
  @login
  Scenario Outline: Login usuario - Escenario Outline 
    Given Navego al sitio automationtesting
    When Me logueo como usuario con user '<user>' y pass '<pass>' 
    Then Valido saludo de bienvenida en el Título

        Examples:
          | user                                            |   pass                |
          | academyCypress_usuarioNormal@crowdaronline.com  |   Crowdar.2025!       |