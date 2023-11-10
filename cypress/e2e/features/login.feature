Feature: 01 - Crowdar Academy 2023 - Login
  @login
  Scenario: El cliente ingresa a su cuenta
    Given  El cliente se logea exitosamente
  
  @login
  Scenario: El cliente ingresa mal su contraseña
    Given  El cliente no puede ingresar a su cuenta por su contraseña
  
  @login
  Scenario Outline: El cliente ingresa mal su email
    Given El cliente se dirige al login
    When El cliente ingresa su usuario '<user>' y contraseña '<pass>' 
    Then El cliente no puede ingresar a su cuenta por su email

        Examples:
          | user                       |   pass                |
          | germancorreopru@gmail.com  |   123456crowdar       |