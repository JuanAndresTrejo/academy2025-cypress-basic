Feature: 03 - Crowdar Academy 2023 - Registro

  Background:
    Given El cliente se dirige al registro

  @Registro
  Scenario: El cliente se registra exitosamente
    When El cliente ingresa su correo para su registro 
    When  El cliente ingresa su contraseña para su registro
    Then El cliente se registra exitosamente

  @Registro
  Scenario Outline: El cliente no se puede registrar
    When El cliente ingresa su email '<email>' 
    When El cliente ingresa password '<password>'
    Then El cliente observa un error

    @Registro
    Examples:
      | email            | password      | 
      | correoprueb@mail | 123456crowdar | 